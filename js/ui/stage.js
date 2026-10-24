/* OBEY? LOL. — level stage renderer and unified input layer.
 *
 * Renders the objects returned by a level's view() into absolutely positioned elements,
 * reusing elements by id (no full rerenders). Translates input into engine actions:
 *   tap      — click / Enter / Space / touch tap
 *   drag     — pointer drag onto a drop zone, OR tap-to-pick-up then tap a zone (keyboard & touch friendly)
 *   hold     — press and hold (pointer or Space/Enter) → holdstart … holdend
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var HOLD_DELAY = 350, DRAG_SLOP = 8;

  function Stage(el, opts) {
    this.el = el;
    this.opts = opts; // { dispatch(action), narratorEl, narratorZone(): bool, onPick(obj|null), onFeedback(kind) }
    this.nodes = new Map();
    this.objs = [];
    this.byId = {};
    this.held = null;
    this.ptr = null;
    this.key = null;
    this.suppressClick = false;
    this.fx = {};          // transient effect classes per object id (e.g. nope shake)
    this.guideIds = [];    // objects highlighted by "Show me how"
    this.assist = null;    // hold assist: id of the object being held by tap-to-start / tap-to-stop
    this._bind();
  }

  Stage.prototype._bind = function () {
    var self = this;
    this.h = {
      click: function (e) { self._onClick(e); },
      down: function (e) { self._onDown(e); },
      move: function (e) { self._onMove(e); },
      up: function (e) { self._onUp(e, false); },
      cancel: function (e) { self._onUp(e, true); },
      keydown: function (e) { self._onKeyDown(e); },
      keyup: function (e) { self._onKeyUp(e); },
      ctx: function (e) { if (e.target.closest && e.target.closest('[data-obj]')) e.preventDefault(); }
    };
    this.el.addEventListener('click', this.h.click);
    this.el.addEventListener('pointerdown', this.h.down);
    this.el.addEventListener('pointermove', this.h.move);
    this.el.addEventListener('pointerup', this.h.up);
    this.el.addEventListener('pointercancel', this.h.cancel);
    this.el.addEventListener('keydown', this.h.keydown);
    this.el.addEventListener('keyup', this.h.keyup);
    this.el.addEventListener('contextmenu', this.h.ctx);
    // Releases can happen outside the stage (pointer slid away, focus moved): listen on window too.
    this.h.winUp = function (e) { if (self.ptr && e.pointerId === self.ptr.pid) self._onUp(e, e.type === 'pointercancel'); };
    this.h.winKeyUp = function (e) { if (self.key && isActivate(e)) self._finishKey(e); };
    this.h.blur = function () { self._abortGestures(); };
    root.addEventListener('pointerup', this.h.winUp, true);
    root.addEventListener('pointercancel', this.h.winUp, true);
    root.addEventListener('keyup', this.h.winKeyUp, true);
    root.addEventListener('blur', this.h.blur);
  };

  /** Ends any in-progress hold/drag (sending holdend) and clears gesture state. */
  Stage.prototype._abortGestures = function () {
    var p = this.ptr, k = this.key;
    this.ptr = null; this.key = null;
    if (p) {
      if (p.timer) clearTimeout(p.timer);
      if (p.el) { p.el.style.transform = ''; p.el.classList.remove('dragging'); }
      if (p.holding) this.opts.dispatch({ type: 'holdend', target: p.id });
    }
    if (k) {
      if (k.timer) clearTimeout(k.timer);
      if (k.holding) this.opts.dispatch({ type: 'holdend', target: k.id });
    }
  };

  /** Called on level restart: drops held items and any gesture in progress. */
  Stage.prototype.reset = function () {
    this.assist = null;
    var p = this.ptr, k = this.key;
    if (p && p.timer) clearTimeout(p.timer);
    if (k && k.timer) clearTimeout(k.timer);
    if (p && p.el) { p.el.style.transform = ''; p.el.classList.remove('dragging'); }
    this.ptr = null; this.key = null; this.suppressClick = false;
    if (this.held) { this.held = null; this.opts.onPick && this.opts.onPick(null); }
  };

  Stage.prototype.destroy = function () {
    var e = this.el, h = this.h;
    e.removeEventListener('click', h.click);
    e.removeEventListener('pointerdown', h.down);
    e.removeEventListener('pointermove', h.move);
    e.removeEventListener('pointerup', h.up);
    e.removeEventListener('pointercancel', h.cancel);
    e.removeEventListener('keydown', h.keydown);
    e.removeEventListener('keyup', h.keyup);
    e.removeEventListener('contextmenu', h.ctx);
    root.removeEventListener('pointerup', h.winUp, true);
    root.removeEventListener('pointercancel', h.winUp, true);
    root.removeEventListener('keyup', h.winKeyUp, true);
    root.removeEventListener('blur', h.blur);
    if (this.ptr && this.ptr.timer) clearTimeout(this.ptr.timer);
    if (this.key && this.key.timer) clearTimeout(this.key.timer);
    this.nodes.forEach(function (n) { n.remove(); });
    this.nodes.clear();
    this.held = null;
  };

  function isInteractive(o) { return o.kind !== 'static'; }

  Stage.prototype.render = function (objs) {
    var self = this;
    var seen = {};
    this.objs = objs;
    this.byId = {};
    objs.forEach(function (o) { self.byId[o.id] = o; });
    if (this.held && (!this.byId[this.held] || this.byId[this.held].hidden)) this._setHeld(null);
    var active = document.activeElement;
    var focusedId = active && this.el.contains(active) ? active.getAttribute('data-obj') : null;

    objs.forEach(function (o, i) {
      seen[o.id] = true;
      var node = self.nodes.get(o.id);
      var tag = isInteractive(o) ? 'BUTTON' : 'DIV';
      if (node && node.tagName !== tag) { node.remove(); node = null; }
      if (!node) {
        node = document.createElement(tag);
        node.setAttribute('data-obj', o.id);
        if (tag === 'BUTTON') node.type = 'button';
        self.el.appendChild(node);
        self.nodes.set(o.id, node);
      }
      self._update(node, o, i);
    });
    this.nodes.forEach(function (node, id) {
      if (!seen[id]) { node.remove(); self.nodes.delete(id); }
    });
    // Keep DOM order equal to view order so keyboard tab order follows the level layout.
    // Only move nodes that are out of place: moving a node blurs it and drops pointer capture.
    var cursor = this.el.firstElementChild;
    objs.forEach(function (o) {
      var node = self.nodes.get(o.id);
      if (node === cursor) { cursor = cursor.nextElementSibling; return; }
      self.el.insertBefore(node, cursor);
    });
    if (focusedId) this._restoreFocus(focusedId);
    this._syncNarratorZone();
  };

  Stage.prototype._update = function (node, o, i) {
    var held = this.held;
    var isZoneGhost = o.kind === 'zone';
    var dropTarget = !!(held && o.zone && o.id !== held);
    var hidden = !!o.hidden || (isZoneGhost && !held);
    node.hidden = hidden;
    var st = node.style;
    st.left = o.x + '%'; st.top = o.y + '%'; st.width = o.w + '%'; st.height = o.h + '%';
    st.zIndex = (this.ptr && this.ptr.id === o.id && this.ptr.moved) ? 500 : String(i + 1);

    var cls = ['obj'];
    if (o.kind === 'static') cls.push('obj-static');
    if (isZoneGhost) cls.push('zone-ghost');
    if (o.art) cls.push('has-art', 'art-' + o.art);
    if (o.text && !o.art) cls.push('has-text');
    if (o.drag) cls.push('is-drag');
    if (o.hold) cls.push('is-hold');
    if (dropTarget) cls.push('drop-target');
    if (held === o.id) cls.push('is-held');
    if (this.ptr && this.ptr.id === o.id && this.ptr.moved) cls.push('dragging');
    if ((this.ptr && this.ptr.id === o.id && this.ptr.holding) || (this.key && this.key.id === o.id && this.key.holding) || this.assist === o.id) cls.push('holding');
    if (o.cls) cls.push(o.cls);
    if (this.fx[o.id]) cls.push(this.fx[o.id]);
    if (this.guideIds.indexOf(o.id) >= 0) cls.push('guide-target');
    var className = cls.join(' ');
    if (node.className !== className) node.className = className;

    var html = '';
    if (o.art) html += OBEY.art.object(o.art, o.artOpts);
    if (o.text) html += '<span class="obj-text">' + OBEY.util.escape(o.text) + '</span>';
    if (node._html !== html) { node.innerHTML = html; node._html = html; }

    if (isInteractive(o)) {
      var label = o.label || o.text || o.id;
      if (dropTarget) label = 'Place ' + (this.byId[held] ? this.byId[held].label.split(' (')[0] : 'item') + ' here: ' + label;
      if (held === o.id) label = label + ' (picked up — choose where to put it, or press again to put it back)';
      if (node.getAttribute('aria-label') !== label) node.setAttribute('aria-label', label);
      node.disabled = !!o.disabled;
      if (o.hold) node.setAttribute('aria-describedby', this._assistOn() && !o.drag ? 'hold-help-assist' : 'hold-help'); else node.removeAttribute('aria-describedby');
      if (held === o.id || (o.hold && this.assist === o.id)) node.setAttribute('aria-pressed', 'true'); else node.removeAttribute('aria-pressed');
    } else if (o.label) {
      node.setAttribute('role', 'img');
      node.setAttribute('aria-label', o.label);
      node.removeAttribute('aria-hidden');
    } else {
      node.removeAttribute('role');
      node.removeAttribute('aria-label');
      node.setAttribute('aria-hidden', 'true');
    }
  };

  Stage.prototype._syncNarratorZone = function () {
    var n = this.opts.narratorEl;
    if (!n) return;
    var target = !!(this.held && this.opts.narratorZone());
    n.classList.toggle('drop-target', target);
  };

  function usable(n) { return n && !n.hidden && !n.disabled && n.tagName === 'BUTTON' && n.offsetParent !== null; }

  /** Keeps focus on the object the player used; if it vanished, moves to the next usable one. */
  Stage.prototype._restoreFocus = function (id) {
    var node = this.nodes.get(id);
    if (usable(node)) {
      if (document.activeElement !== node) node.focus({ preventScroll: true });
      return;
    }
    var ids = this.objs.map(function (o) { return o.id; });
    var start = Math.max(0, ids.indexOf(id));
    for (var i = 1; i <= ids.length; i++) {
      var n = this.nodes.get(ids[(start + i) % ids.length]);
      if (usable(n)) { n.focus({ preventScroll: true }); return; }
    }
    this.el.setAttribute('tabindex', '-1');
    this.el.focus({ preventScroll: true });
  };

  /** Shake an object and pop a "NOPE" sticker on it (harmless wrong move). */
  Stage.prototype.nope = function (id) {
    var self = this;
    var node = id ? this.nodes.get(id) : null;
    if (!node || node.hidden) { this.el.classList.remove('stage-nope'); void this.el.offsetWidth; this.el.classList.add('stage-nope'); return; }
    this.fx[id] = 'nope-shake';
    node.classList.remove('nope-shake'); void node.offsetWidth; node.classList.add('nope-shake');
    var st = document.createElement('span');
    st.className = 'nope-sticker';
    st.setAttribute('aria-hidden', 'true');
    st.textContent = ['NOPE', 'NAH', 'UH-UH', 'NOPE!'][Math.floor(Math.random() * 4)];
    node.appendChild(st);
    setTimeout(function () { st.remove(); if (self.fx[id] === 'nope-shake') { delete self.fx[id]; node.classList.remove('nope-shake'); } }, 900);
  };

  Stage.prototype._assistOn = function () { return !!(this.opts.holdAssist && this.opts.holdAssist()); };

  /** Easy mode "warmer" sparkle on an object that is part of the solution. */
  Stage.prototype.warm = function (id) {
    var node = this.nodes.get(id);
    if (!node || node.hidden) return;
    var self = this;
    this.fx[id] = 'warm-glow';
    node.classList.remove('warm-glow'); void node.offsetWidth; node.classList.add('warm-glow');
    setTimeout(function () { if (self.fx[id] === 'warm-glow') { delete self.fx[id]; node.classList.remove('warm-glow'); } }, 900);
  };

  /** Highlights the objects the guide wants the player to use (empty array clears). */
  Stage.prototype.setGuide = function (ids) {
    this.guideIds = ids || [];
    this.render(this.objs);
    if (this.opts.narratorEl) this.opts.narratorEl.classList.toggle('guide-target', this.guideIds.indexOf('narrator') >= 0);
  };

  Stage.prototype.focusFirst = function () {
    var first = this.el.querySelector('button[data-obj]:not([hidden]):not([disabled])');
    if (first) first.focus({ preventScroll: true });
  };

  Stage.prototype._setHeld = function (id) {
    this.held = id;
    this.opts.onPick && this.opts.onPick(id ? this.byId[id] : null);
    this.render(this.objs);
  };

  Stage.prototype.cancelPick = function () { if (this.held) this._setHeld(null); };

  /** Shared tap logic for click / keyboard / narrator. Returns nothing. */
  Stage.prototype.tap = function (id) {
    var o = id === 'narrator' ? { id: 'narrator', zone: this.opts.narratorZone() } : this.byId[id];
    if (!o) return;
    if (this.held) {
      var held = this.held;
      if (id === held) { this._setHeld(null); this.opts.onFeedback && this.opts.onFeedback('drop'); return; }
      if (o.zone) {
        this.held = null;
        this.opts.onPick && this.opts.onPick(null);
        this.opts.onFeedback && this.opts.onFeedback('drop');
        this.opts.dispatch({ type: 'drop', target: held, zone: id });
        return;
      }
      this.held = null;
      this.opts.onPick && this.opts.onPick(null);
    }
    if (o.drag) {
      this.opts.onFeedback && this.opts.onFeedback('pick');
      this._setHeld(id);
      return;
    }
    if (o.hold && !o.drag && this._assistOn()) {
      // Hold assist: first tap starts holding, the next tap lets go.
      if (this.assist === id) { this.assist = null; this.opts.dispatch({ type: 'holdend', target: id }); }
      else {
        if (this.assist) this.opts.dispatch({ type: 'holdend', target: this.assist });
        this.assist = id;
        this.opts.dispatch({ type: 'holdstart', target: id });
      }
      this.render(this.objs);
      return;
    }
    this.opts.dispatch({ type: 'tap', target: id });
  };

  Stage.prototype._onClick = function (e) {
    var b = e.target.closest('button[data-obj]');
    if (!b || !this.el.contains(b)) return;
    // A click that follows a drag/hold gesture (or keyboard hold) is not a tap.
    if (this.suppressClick) { this.suppressClick = false; e.preventDefault(); return; }
    this.tap(b.getAttribute('data-obj'));
  };

  /* ---------------------------------------------------------- pointer input */
  Stage.prototype._onDown = function (e) {
    this.suppressClick = false;
    if (e.button !== undefined && e.button !== 0) return;
    var b = e.target.closest('button[data-obj]');
    if (!b) return;
    var id = b.getAttribute('data-obj'), o = this.byId[id];
    if (!o || !(o.drag || o.hold) || b.disabled) return;
    if (o.hold && !o.drag && this._assistOn()) return; // the click handles it
    var self = this;
    try { b.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    this.ptr = { id: id, el: b, pid: e.pointerId, x0: e.clientX, y0: e.clientY, moved: false, holding: false, timer: null };
    if (o.hold) {
      this.ptr.timer = setTimeout(function () {
        if (!self.ptr || self.ptr.id !== id || self.ptr.moved) return;
        self.ptr.timer = null;
        self.ptr.holding = true;
        if (self.held) { self.held = null; self.opts.onPick && self.opts.onPick(null); }
        self.opts.dispatch({ type: 'holdstart', target: id });
      }, HOLD_DELAY);
    }
  };

  Stage.prototype._onMove = function (e) {
    var p = this.ptr;
    if (!p || e.pointerId !== p.pid) return;
    var dx = e.clientX - p.x0, dy = e.clientY - p.y0;
    var o = this.byId[p.id];
    if (!p.moved && o && o.drag && Math.hypot(dx, dy) > DRAG_SLOP) {
      if (p.holding) { p.holding = false; this.opts.dispatch({ type: 'holdend', target: p.id }); }
      p.moved = true;
      if (p.timer) { clearTimeout(p.timer); p.timer = null; }
      if (this.held) { this.held = null; this.opts.onPick && this.opts.onPick(null); }
      p.el.classList.add('dragging');
      p.el.style.zIndex = 500;
      this.opts.onFeedback && this.opts.onFeedback('pick');
      this._highlightZones(p.id);
    }
    if (p.moved) {
      p.el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      e.preventDefault();
    }
  };

  Stage.prototype._highlightZones = function (dragId) {
    var self = this;
    this.objs.forEach(function (o) {
      var n = self.nodes.get(o.id);
      if (!n) return;
      var on = !!(o.zone && o.id !== dragId);
      n.classList.toggle('drop-target', on);
      if (o.kind === 'zone') n.hidden = !on || !!o.hidden;
    });
    if (this.opts.narratorEl) this.opts.narratorEl.classList.toggle('drop-target', !!this.opts.narratorZone());
  };

  Stage.prototype._zoneAt = function (x, y, dragId) {
    var n = this.opts.narratorEl;
    if (n && this.opts.narratorZone()) {
      var r = n.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return 'narrator';
    }
    // Topmost zone wins: iterate in reverse view order.
    for (var i = this.objs.length - 1; i >= 0; i--) {
      var o = this.objs[i];
      if (!o.zone || o.id === dragId || o.hidden) continue;
      var node = this.nodes.get(o.id);
      if (!node) continue;
      var rr = node.getBoundingClientRect();
      if (rr.width && x >= rr.left && x <= rr.right && y >= rr.top && y <= rr.bottom) return o.id;
    }
    return null;
  };

  Stage.prototype._onUp = function (e, cancelled) {
    var p = this.ptr;
    if (!p || e.pointerId !== p.pid) return;
    this.ptr = null;
    if (p.timer) clearTimeout(p.timer);
    if (p.moved) {
      var r = p.el.getBoundingClientRect();
      var zone = cancelled ? null : this._zoneAt(r.left + r.width / 2, r.top + r.height / 2, p.id);
      p.el.style.transform = '';
      p.el.classList.remove('dragging');
      this.suppressClick = true;
      this.opts.onFeedback && this.opts.onFeedback('drop');
      if (this.opts.narratorEl) this.opts.narratorEl.classList.remove('drop-target');
      if (!cancelled) this.opts.dispatch({ type: 'drop', target: p.id, zone: zone });
      this.render(this.objs);
      return;
    }
    if (p.holding) {
      this.suppressClick = true;
      this.opts.dispatch({ type: 'holdend', target: p.id });
      this.render(this.objs);
    }
    // Otherwise: a plain tap; the following click event handles it.
  };

  /* --------------------------------------------------------- keyboard hold */
  function isActivate(e) { return e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar'; }

  Stage.prototype._onKeyDown = function (e) {
    this.suppressClick = false;
    if (e.key === 'Escape' && this.held) { this.cancelPick(); e.preventDefault(); return; }
    if (!isActivate(e)) return;
    var b = e.target.closest && e.target.closest('button[data-obj]');
    if (!b) return;
    var id = b.getAttribute('data-obj'), o = this.byId[id];
    if (!o || !o.hold || b.disabled) return;
    if (this._assistOn() && !o.drag) return; // Enter/Space become a normal click (start / stop)
    e.preventDefault();
    if (e.repeat || (this.key && this.key.id === id)) return;
    var self = this;
    this.key = { id: id, holding: false, timer: setTimeout(function () {
      if (!self.key || self.key.id !== id) return;
      self.key.timer = null;
      self.key.holding = true;
      if (self.held) { self.held = null; self.opts.onPick && self.opts.onPick(null); }
      self.opts.dispatch({ type: 'holdstart', target: id });
    }, HOLD_DELAY) };
  };

  Stage.prototype._onKeyUp = function (e) {
    if (!isActivate(e) || !this.key) return;
    this._finishKey(e);
  };

  Stage.prototype._finishKey = function (e) {
    var k = this.key;
    if (!k) return;
    e.preventDefault();
    this.key = null;
    this.suppressClick = true;
    if (k.timer) { clearTimeout(k.timer); this.tap(k.id); return; }
    if (k.holding) this.opts.dispatch({ type: 'holdend', target: k.id });
    this.render(this.objs);
  };

  OBEY.Stage = Stage;
})(typeof window !== 'undefined' ? window : globalThis);
