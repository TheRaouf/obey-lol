/* OBEY? LOL. — application controller: boot, routing, level screen, persistence,
 * feedback (toasts/sounds), dialogs, tutorial, settings application and the test hook. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var A = OBEY.art, E = OBEY.util.escape, P = OBEY.progress, U = OBEY.util;
  var doc = root.document;

  var App = {
    save: null,
    store: null,
    loadStatus: 'new',
    screen: null,
    runtime: null,
    stage: null,
    levelNum: null,
    lastLevel: null,
    allowedEnding: null,
    endingCleanup: null,
    pendingAfterTutorial: null
  };

  var SCREENS = ['menu', 'map', 'level', 'secrets', 'costumes', 'themes', 'achievements', 'settings', 'credits', 'ending'];

  /* ------------------------------------------------------------ persistence */
  App.persist = function () { App.store.save(App.save); };

  /* -------------------------------------------------------------- settings */
  var mq = root.matchMedia ? root.matchMedia('(prefers-reduced-motion: reduce)') : null;
  App.applySettings = function () {
    var st = App.save.settings, html = doc.documentElement;
    html.setAttribute('data-theme', App.save.themes.selected);
    var reduce = st.motion === 'reduce' || (st.motion === 'system' && mq && mq.matches);
    html.classList.toggle('reduce-motion', !!reduce);
    html.setAttribute('data-text', st.textSize);
    OBEY.audio.setEnabled(st.sound);
  };
  App.reducedMotion = function () { return doc.documentElement.classList.contains('reduce-motion'); };

  /* ----------------------------------------------------------------- toasts */
  App.toast = function (text, kind) {
    var box = doc.getElementById('toasts');
    var t = doc.createElement('div');
    t.className = 'toast toast-' + (kind || 'info');
    var ic = { secret: 'eye', achievement: 'star', unlock: 'check', info: 'question', warn: 'lock' }[kind || 'info'];
    t.innerHTML = A.icon(ic) + '<span>' + E(text) + '</span>';
    box.appendChild(t);
    while (box.children.length > 4) box.removeChild(box.firstChild);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 4200);
  };

  /** Turns progress events into feedback. */
  App.announce = function (events) {
    (events || []).forEach(function (ev) {
      if (ev.type === 'secret') {
        var s = OBEY.getSecret(ev.id);
        App.toast('Secret found: ' + s.name + ' (' + ev.count + '/15)', 'secret');
        OBEY.audio.play('secret');
      } else if (ev.type === 'achievement') {
        var a = OBEY.ACHIEVEMENTS.filter(function (x) { return x.id === ev.id; })[0];
        App.toast('Achievement unlocked: ' + a.name, 'achievement');
        OBEY.audio.play('achievement');
      } else if (ev.type === 'costume') {
        App.toast('New costume: ' + OBEY.COSTUMES.filter(function (c) { return c.id === ev.id; })[0].name, 'unlock');
        OBEY.audio.play('unlock');
      } else if (ev.type === 'theme') {
        App.toast('New theme: ' + OBEY.THEMES.filter(function (c) { return c.id === ev.id; })[0].name, 'unlock');
        OBEY.audio.play('unlock');
      }
    });
  };

  /* ----------------------------------------------------------------- dialog */
  App.confirm = function (opts) {
    return new Promise(function (resolve) {
      var rootEl = doc.getElementById('modal-root');
      var prev = doc.activeElement;
      var wrap = doc.createElement('div');
      wrap.className = 'modal-backdrop';
      wrap.innerHTML = '<div class="modal panel" role="alertdialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-body">' +
        '<h2 id="modal-title">' + E(opts.title) + '</h2><p id="modal-body">' + E(opts.body) + '</p>' +
        '<div class="btn-row"><button class="btn" data-m="no">' + E(opts.cancel || 'Cancel') + '</button>' +
        '<button class="btn ' + (opts.danger ? 'danger' : 'primary') + '" data-m="yes">' + E(opts.ok || 'OK') + '</button></div></div>';
      rootEl.appendChild(wrap);
      App.inertApp(true);
      var btns = wrap.querySelectorAll('button');
      btns[0].focus();
      function done(v) {
        if (!wrap.parentNode) return;
        App.removeOverlayCloser(cancelOnNav);
        wrap.remove();
        App.inertApp(false);
        doc.removeEventListener('keydown', key, true);
        if (prev && prev.focus && doc.contains(prev)) prev.focus();
        resolve(v);
      }
      function key(e) {
        if (e.key === 'Escape') { e.preventDefault(); done(false); }
        if (e.key === 'Tab') {
          var first = btns[0], last = btns[btns.length - 1];
          if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
      function cancelOnNav() { done(false); }
      App.addOverlayCloser(cancelOnNav);
      doc.addEventListener('keydown', key, true);
      wrap.addEventListener('click', function (e) {
        var b = e.target.closest('[data-m]');
        if (b) { OBEY.audio.play('ui'); done(b.getAttribute('data-m') === 'yes'); } else if (e.target === wrap) done(false);
      });
    });
  };
  /** Closes any open confirm dialog or tutorial (e.g. when the browser Back button navigates). */
  App.closeOverlays = function () {
    (App.overlayClosers || []).slice().forEach(function (f) { f(); });
    App.overlayClosers = [];
  };
  App.addOverlayCloser = function (f) { (App.overlayClosers = App.overlayClosers || []).push(f); };
  App.removeOverlayCloser = function (f) { App.overlayClosers = (App.overlayClosers || []).filter(function (g) { return g !== f; }); };

  App.inertApp = function (on) {
    var app = doc.getElementById('app');
    if (on) { app.setAttribute('inert', ''); app.setAttribute('aria-hidden', 'true'); } else { app.removeAttribute('inert'); app.removeAttribute('aria-hidden'); }
  };

  /* --------------------------------------------------------------- routing */
  App.go = function (route) {
    var h = '#' + route;
    if (root.location.hash === h) App.route(); else root.location.hash = h;
  };

  App.route = function () {
    var h = (root.location.hash || '').replace(/^#\/?/, '');
    var parts = h.split('/');
    var name = parts[0] || 'menu';
    if (SCREENS.indexOf(name) < 0) name = 'menu';
    if (name === 'level') {
      var n = Number(parts[1]);
      if (!P.canPlay(App.save, n)) {
        App.toast(Number.isInteger(n) && n >= 1 && n <= 16 ? 'Level ' + n + ' is locked. Finish Level ' + (n - 1) + ' first.' : 'That level does not exist.', 'warn');
        root.location.replace('#map');
        return;
      }
      return App.show('level', n);
    }
    if (name === 'ending') {
      var id = parts[1];
      if (App.save.endings.seen.indexOf(id) < 0 && App.allowedEnding !== id) { root.location.replace('#achievements'); return; }
      return App.show('ending', id);
    }
    App.show(name);
  };

  App.show = function (name, arg) {
    // Leaving a level always tears down its timers and listeners.
    if (App.screen === 'level') App.leaveLevel();
    App.closeOverlays();
    if (App.screen === 'ending' && App.endingCleanup) { App.endingCleanup(); App.endingCleanup = null; }
    SCREENS.forEach(function (s) {
      var el = doc.getElementById('screen-' + s);
      el.hidden = s !== name;
    });
    App.screen = name;
    doc.getElementById('app').setAttribute('data-screen', name);
    var el = doc.getElementById('screen-' + name);
    if (name === 'level') App.enterLevel(arg);
    else if (name === 'ending') { App.endingCleanup = OBEY.endings.render(App, el, arg); }
    else OBEY.screens[name](App, el);
    if (name !== 'level' && name !== 'ending') {
      root.scrollTo(0, 0);
      var h = el.querySelector('h1');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }
    doc.title = name === 'level' ? 'Level ' + arg + ': ' + OBEY.getLevel(arg).title + ' — OBEY? LOL.' : 'OBEY? LOL.' + (name === 'menu' ? '' : ' — ' + name[0].toUpperCase() + name.slice(1));
  };

  App.refresh = function () { if (App.screen && App.screen !== 'level' && App.screen !== 'ending') OBEY.screens[App.screen](App, doc.getElementById('screen-' + App.screen)); };

  /* ----------------------------------------------------------------- level */
  App.enterLevel = function (n) {
    var def = OBEY.getLevel(n);
    var el = doc.getElementById('screen-level');
    App.levelNum = n;
    App.lastLevel = n;
    var s = App.save;
    var costume = OBEY.COSTUMES.filter(function (c) { return c.id === s.costumes.selected; })[0];
    el.innerHTML = `
      <header class="topbar level-bar">
        <button class="chip-btn" data-act="nav" data-to="map">${A.icon('map')}<span>Map</span></button>
        <h1 class="level-title"><span class="lvl-num">Level ${n}</span><span class="lvl-name">${E(def.title)}</span></h1>
        <div class="topbar-end tools">
          <button class="chip-btn" data-act="hint" id="hint-btn">${A.icon('hint')}<span>Hint</span></button>
          <button class="chip-btn" data-act="restart" aria-label="Restart level">${A.icon('restart')}<span>Restart</span></button>
          <button class="chip-btn icon-only" data-act="nav" data-to="settings" aria-label="Settings">${A.icon('gear')}</button>
        </div>
      </header>
      <div class="level-body">
        <aside class="narrator-panel" aria-label="Narrator">
          <button class="narrator-btn" id="narrator" type="button" aria-label="Bossworth, the narrator (poke him)"></button>
          <div class="bubble bubble-narrator" id="bubble"><span class="speaker">Bossworth</span><p id="line" aria-live="polite"></p></div>
        </aside>
        <div class="stage-col">
          <p class="objective"><b>Goal:</b> ${E(def.objective)}</p>
          <div class="stage" id="stage" role="group" aria-label="Level ${n} play area"></div>
          <p class="pick-status" id="pick-status" aria-live="polite"></p>
          <div class="hint-box" id="hint-box" hidden></div>
          <p class="score-rule small">Stars: ${E(OBEY.scoring.describe(def.par).join(' · '))}</p>
        </div>
      </div>
      <p id="hold-help" class="visually-hidden">Press and hold. With a keyboard, hold Space or Enter.</p>
      <div class="complete-backdrop" id="complete" hidden></div>`;

    App.renderCache = {};
    var narratorEl = doc.getElementById('narrator');
    narratorEl.addEventListener('click', function () { if (App.stage) App.stage.tap('narrator'); });

    var rt = new OBEY.LevelRuntime(def, {
      ctx: {
        replay: P.isCompleted(s, n),
        secrets: s.secrets.slice(),
        choices: U.clone(s.choices),
        costume: s.costumes.selected,
        costumeAside: costume ? costume.aside : '',
        allSecrets: s.secrets.length === OBEY.SECRETS.length
      },
      hooks: {
        onChange: function () { App.renderLevel(); },
        onSecret: function (id) {
          var ev = P.discoverSecret(App.save, id);
          if (ev.length) { App.persist(); App.announce(ev); }
        },
        onComplete: function (result) { App.onLevelComplete(result); }
      }
    });
    App.runtime = rt;
    App.stage = new OBEY.Stage(doc.getElementById('stage'), {
      narratorEl: narratorEl,
      narratorZone: function () { return !!def.narratorZone; },
      dispatch: function (a) {
        if (!App.runtime || App.runtime.status !== 'playing') return;
        var accepted = App.runtime.dispatch(a);
        if (accepted && a.type === 'tap') OBEY.audio.play('tap');
        if (accepted && a.type === 'drop') OBEY.audio.play('drop');
        if (App.runtime.stats.fails !== App.renderCache.fails) {
          if (App.renderCache.fails !== undefined) { OBEY.audio.play('fail'); App.flashStage(); }
          App.renderCache.fails = App.runtime.stats.fails;
        }
      },
      onPick: function (o) {
        var ps = doc.getElementById('pick-status');
        if (ps) ps.textContent = o ? 'Holding: ' + o.label.split(' (')[0] + '. Choose where to put it, or select it again to put it back.' : '';
      },
      onFeedback: function (k) { OBEY.audio.play(k); }
    });
    rt.start();
    App.renderCache.fails = 0;
    var tapFirst = !App.firstLevelFocusDone;
    App.firstLevelFocusDone = true;
    var h1 = el.querySelector('h1');
    h1.setAttribute('tabindex', '-1');
    if (tapFirst || doc.activeElement === doc.body || !el.contains(doc.activeElement)) h1.focus({ preventScroll: true });
    root.scrollTo(0, 0);
  };

  /** While the completion card is open, everything else on the level screen is inert. */
  App.setLevelInert = function (on) {
    var el = doc.getElementById('screen-level');
    ['.level-bar', '.level-body'].forEach(function (sel) {
      var n = el.querySelector(sel);
      if (!n) return;
      if (on) n.setAttribute('inert', ''); else n.removeAttribute('inert');
    });
    var skip = doc.querySelector('.skip-link');
    if (skip) { if (on) skip.setAttribute('inert', ''); else skip.removeAttribute('inert'); }
  };

  App.flashStage = function () {
    var st = doc.getElementById('stage');
    if (!st) return;
    st.classList.remove('flash-fail');
    void st.offsetWidth;
    st.classList.add('flash-fail');
  };

  App.renderLevel = function () {
    var rt = App.runtime;
    if (!rt || App.screen !== 'level') return;
    var c = App.renderCache;
    var key = App.save.costumes.selected + '|' + rt.mood + '|' + rt.overlay;
    if (c.narr !== key) {
      c.narr = key;
      var n = doc.getElementById('narrator');
      n.innerHTML = A.narrator(App.save.costumes.selected, rt.mood, rt.overlay);
      n.setAttribute('data-mood', rt.mood);
    }
    if (c.lineId !== rt.lineId) {
      c.lineId = rt.lineId;
      var line = doc.getElementById('line');
      line.textContent = rt.line;
      var b = doc.getElementById('bubble');
      b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
      b.setAttribute('data-mood', rt.mood);
      if (c.lineId > 1) OBEY.audio.play('narrator');
    }
    App.stage.render(rt.objects());
    var hb = doc.getElementById('hint-btn');
    var left = rt.def.hints.length - rt.hintIndex;
    hb.querySelector('span').textContent = left > 0 ? 'Hint (' + left + ')' : 'Hints used';
  };

  App.leaveLevel = function () {
    App.setLevelInert(false);
    if (App.runtime) App.runtime.destroy();
    if (App.stage) App.stage.destroy();
    App.runtime = null;
    App.stage = null;
    App.levelNum = null;
  };

  App.showHint = function () {
    var rt = App.runtime;
    if (!rt) return;
    var h = rt.hint();
    if (!h) return;
    OBEY.audio.play('ui');
    var box = doc.getElementById('hint-box');
    box.hidden = false;
    box.innerHTML = '<p><b>Hint ' + h.tier + ' of ' + h.total + ':</b> ' + E(h.text) + '</p><p class="small">' +
      (rt.stats.hints === 1 ? 'Using a hint caps this attempt at 2 stars.' : 'Two or more hints cap this attempt at 1 star.') + '</p>';
    box.setAttribute('role', 'status');
  };

  App.restartLevel = function () {
    if (!App.runtime) return;
    OBEY.audio.play('ui');
    App.stage.reset();
    var box = doc.getElementById('hint-box');
    box.hidden = true; box.innerHTML = '';
    App.renderCache.fails = 0;
    App.runtime.restart();
    App.toast('Level restarted.', 'info');
  };

  App.onLevelComplete = function (result) {
    var n = result.level;
    var events = P.completeLevel(App.save, n, result) || [];
    var endingEv = null;
    if (result.ending) {
      endingEv = P.recordEnding(App.save, result.ending);
      if (endingEv) { events = events.concat(endingEv); App.allowedEnding = result.ending; }
    }
    App.persist();
    OBEY.audio.play('success');
    setTimeout(function () { OBEY.audio.play('stamp'); }, 250);
    App.renderLevel();
    App.showComplete(result, events);
    App.announce(events.filter(function (e) { return e.type !== 'level' && e.type !== 'ending'; }));
  };

  App.showComplete = function (r, events) {
    var def = OBEY.getLevel(r.level);
    var lev = events.filter(function (e) { return e.type === 'level'; })[0] || {};
    var box = doc.getElementById('complete');
    var reasons = [];
    reasons.push(r.actions + (r.actions === 1 ? ' action' : ' actions') + ' (par ' + r.par + ')');
    reasons.push(r.hints ? r.hints + (r.hints === 1 ? ' hint' : ' hints') : 'no hints');
    if (r.fails) reasons.push(r.fails + (r.fails === 1 ? ' restart from a trap' : ' restarts from traps'));
    var best = App.save.bestStars[r.level];
    var unlocks = events.filter(function (e) { return e.type === 'costume' || e.type === 'theme' || e.type === 'achievement'; }).map(function (e) {
      var src = e.type === 'costume' ? OBEY.COSTUMES : (e.type === 'theme' ? OBEY.THEMES : OBEY.ACHIEVEMENTS);
      var item = src.filter(function (x) { return x.id === e.id; })[0];
      return '<li>' + A.icon(e.type === 'achievement' ? 'star' : 'check') + (e.type === 'costume' ? 'New costume: ' : e.type === 'theme' ? 'New theme: ' : 'Achievement: ') + E(item.name) + '</li>';
    }).join('');
    var isFinal = r.level === 16 && r.ending;
    var nextBtn = isFinal
      ? '<button class="btn primary" data-act="see-ending" data-id="' + r.ending + '">See your ending</button>'
      : (r.level < 16 ? '<button class="btn primary" data-act="open-level" data-level="' + (r.level + 1) + '">Next level</button>' : '');
    box.innerHTML = '<div class="complete-card panel" role="dialog" aria-modal="true" aria-labelledby="complete-title">' +
      '<p class="stamp" aria-hidden="true">' + (r.defies ? 'DISOBEYED' : 'SOLVED') + '</p>' +
      '<h2 id="complete-title" tabindex="-1">Level ' + r.level + ' complete</h2>' +
      '<div class="big-stars" role="img" aria-label="' + r.stars + ' of 3 stars this time">' + A.stars(r.stars) + '</div>' +
      '<p class="score-why">' + E(reasons.join(', ')) + '.' + (lev.improved ? ' New best!' : (best > r.stars ? ' Your best is still ' + best + ' stars.' : '')) + '</p>' +
      '<p class="closing">“' + E(def.done) + '”</p>' +
      (unlocks ? '<ul class="unlock-list">' + unlocks + '</ul>' : '') +
      '<div class="btn-row center">' + nextBtn +
      '<button class="btn" data-act="replay-level">Replay</button>' +
      '<button class="btn" data-act="nav" data-to="map">Map</button></div></div>';
    box.hidden = false;
    App.setLevelInert(true);
    var t = box.querySelector('.btn.primary') || box.querySelector('.btn');
    if (t) t.focus({ preventScroll: true });
  };

  /* --------------------------------------------------------------- tutorial */
  var TUT = [
    { title: 'Meet Bossworth', body: 'He narrates every level and tells you exactly what to do. He is confident. He is loud. He is not always honest.' },
    { title: 'Try it', body: 'Bossworth says: "Do NOT press the button below." Go on — find out what happens.', interactive: true },
    { title: 'Your tools', body: 'Tap or click things. Some things can be dragged (or picked up with a tap and placed with another tap). Some need a press and hold. Hint and Restart are always at the top. Some solutions mean obeying, some mean disobeying, some mean neither.' }
  ];

  App.tutorial = function (then) {
    var rootEl = doc.getElementById('modal-root');
    var step = 0, pressed = false;
    var wrap = doc.createElement('div');
    wrap.className = 'modal-backdrop';
    rootEl.appendChild(wrap);
    App.inertApp(true);
    function draw() {
      var t = TUT[step];
      wrap.innerHTML = '<div class="modal panel tutorial" role="dialog" aria-modal="true" aria-labelledby="tut-title">' +
        '<p class="small">Tutorial ' + (step + 1) + ' of ' + TUT.length + '</p>' +
        '<div class="tut-row"><div class="narrator-mini" aria-hidden="true">' + A.narrator(App.save.costumes.selected, step === 1 ? (pressed ? 'annoyed' : 'suspicious') : 'pleased') + '</div>' +
        '<div><h2 id="tut-title">' + E(t.title) + '</h2><p>' + E(t.body) + '</p></div></div>' +
        (t.interactive ? '<div class="tut-try"><button class="tut-button" data-t="press" aria-label="The button Bossworth told you not to press">' + A.object('smallbutton', { color: 'red' }) + '</button><p class="tut-result" aria-live="polite">' +
          (pressed ? 'Nothing exploded. Bossworth is sulking. Questioning instructions is allowed here.' : '') + '</p></div>' : '') +
        '<div class="btn-row"><button class="btn ghost" data-t="skip">Skip tutorial</button>' +
        '<button class="btn primary" data-t="next"' + (t.interactive && !pressed ? ' aria-describedby="tut-need"' : '') + '>' + (step === TUT.length - 1 ? 'Start playing' : 'Next') + '</button></div>' +
        (t.interactive && !pressed ? '<p class="small" id="tut-need">(You can also just press Next. Nobody is watching. Except Bossworth.)</p>' : '') + '</div>';
      var f = wrap.querySelector('[data-t="press"]') || wrap.querySelector('[data-t="next"]');
      f.focus();
    }
    function close() {
      App.removeOverlayCloser(close);
      wrap.remove();
      App.inertApp(false);
      doc.removeEventListener('keydown', esc, true);
    }
    function finish() {
      App.save.tutorialDone = true;
      App.persist();
      close();
      if (then) then();
    }
    App.addOverlayCloser(close);
    function esc(e) { if (e.key === 'Escape') { e.preventDefault(); finish(); } }
    doc.addEventListener('keydown', esc, true);
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-t]');
      if (!b) return;
      var a = b.getAttribute('data-t');
      OBEY.audio.play('ui');
      if (a === 'skip') return finish();
      if (a === 'press') { pressed = true; draw(); var r = wrap.querySelector('[data-t="next"]'); if (r) r.focus(); return; }
      if (a === 'next') { if (step === TUT.length - 1) return finish(); step++; draw(); }
    });
    draw();
  };

  App.startCampaign = function (n) {
    var go = function () { App.go('level/' + n); };
    if (!App.save.tutorialDone) App.tutorial(go); else go();
  };

  /* ---------------------------------------------------------------- actions */
  var ACTIONS = {
    nav: function (b) { App.go(b.getAttribute('data-to')); },
    play: function () {
      var s = App.save;
      if (!P.hasProgress(s) && !s.completed.length) return App.startCampaign(1);
      var next = P.nextLevel(s);
      if (next) App.go('level/' + next); else App.go('map');
    },
    'new-game': function () {
      if (!P.hasProgress(App.save)) return App.startCampaign(1);
      App.confirm({
        title: 'Start a new game?',
        body: 'Your levels, stars, secrets and choices will be reset. Achievements, costumes, themes, endings and settings are kept.',
        ok: 'Start new game', danger: true
      }).then(function (yes) {
        if (!yes) return;
        App.save = P.newGame(App.save);
        App.persist();
        App.applySettings();
        App.toast('New game started.', 'info');
        App.startCampaign(1);
      });
    },
    'open-level': function (b) {
      var n = Number(b.getAttribute('data-level'));
      if (!P.canPlay(App.save, n)) { App.toast('Level ' + n + ' is locked. Finish Level ' + (n - 1) + ' first.', 'warn'); return; }
      App.go('level/' + n);
    },
    'replay-level': function () { if (App.levelNum) App.show('level', App.levelNum); },
    hint: function () { App.showHint(); },
    restart: function () { App.restartLevel(); },
    'see-ending': function (b) { App.go('ending/' + b.getAttribute('data-id')); },
    'replay-ending': function (b) { App.go('ending/' + b.getAttribute('data-id')); },
    costume: function (b) {
      var ev = P.selectCostume(App.save, b.getAttribute('data-id'));
      if (!ev) return;
      App.persist(); App.announce(ev); App.refresh();
      var sel = doc.querySelector('.wardrobe-card.selected h2'); if (sel) { sel.setAttribute('tabindex', '-1'); sel.focus(); }
    },
    theme: function (b) {
      if (!P.selectTheme(App.save, b.getAttribute('data-id'))) return;
      App.persist(); App.applySettings(); App.refresh();
      var sel = doc.querySelector('.theme-card.selected h2'); if (sel) { sel.setAttribute('tabindex', '-1'); sel.focus(); }
    },
    'toggle-sound': function () {
      App.save.settings.sound = !App.save.settings.sound;
      App.persist(); App.applySettings(); App.refresh();
      doc.querySelector('[data-act="toggle-sound"]').focus();
      OBEY.audio.play('ui');
    },
    tutorial: function () { App.tutorial(null); },
    'reset-all': function () {
      App.confirm({ title: 'Reset all progress?', body: 'This erases every level, star, secret, costume, theme, achievement and ending. Settings are kept. This cannot be undone.', ok: 'Erase everything', danger: true })
        .then(function (yes) {
          if (!yes) return;
          App.save = P.resetAll(App.save);
          App.persist(); App.applySettings();
          App.toast('All progress erased.', 'info');
          App.go('menu');
        });
    }
  };

  function onClick(e) {
    var b = e.target.closest('[data-act]');
    if (!b || b.tagName === 'INPUT') return;
    if (b.getAttribute('aria-disabled') === 'true' && b.getAttribute('data-act') !== 'open-level') return;
    var fn = ACTIONS[b.getAttribute('data-act')];
    if (!fn) return;
    e.preventDefault();
    if (b.getAttribute('data-act') !== 'toggle-sound') OBEY.audio.play('ui');
    fn(b);
  }

  function onChange(e) {
    var t = e.target;
    if (t.getAttribute && t.getAttribute('data-act') === 'setting') {
      App.save.settings[t.getAttribute('data-key')] = t.value;
      App.persist(); App.applySettings();
    }
  }

  function onKey(e) {
    if (e.key === 'Escape' && App.screen === 'level' && App.stage && !doc.querySelector('.modal-backdrop')) {
      if (App.stage.held) App.stage.cancelPick();
    }
  }

  /* ------------------------------------------------------------------- boot */
  function boot() {
    var storage = null;
    try { storage = root.localStorage; } catch (e) { storage = null; }
    App.store = OBEY.save.createStore(storage);
    var res = App.store.load();
    App.save = res.data;
    App.loadStatus = res.status;
    // Re-grant anything earned under rules that changed between versions.
    var ev = P.evaluate(App.save);
    if (ev.length || res.status === 'new') App.persist();
    App.applySettings();
    if (mq && mq.addEventListener) mq.addEventListener('change', App.applySettings);

    // Browsers only allow audio after a gesture.
    var unlock = function () { OBEY.audio.unlock(); doc.removeEventListener('pointerdown', unlock, true); doc.removeEventListener('keydown', unlock, true); };
    doc.addEventListener('pointerdown', unlock, true);
    doc.addEventListener('keydown', unlock, true);

    doc.addEventListener('click', onClick);
    doc.addEventListener('change', onChange);
    doc.addEventListener('keydown', onKey);
    root.addEventListener('hashchange', App.route);
    var boot = doc.getElementById('boot');
    if (boot) boot.remove();
    if (res.status === 'recovered') setTimeout(function () { App.toast('Your save could not be read, so a fresh one was started.', 'warn'); }, 300);
    if (!App.store.persistent) setTimeout(function () { App.toast('Storage is blocked here: progress lasts only until you close this tab.', 'warn'); }, 600);
    App.route();
    installTestHook();
  }

  /* -------------------------------------------- test hook (only with ?test=1) */
  function installTestHook() {
    if (!/[?&]test=1\b/.test(root.location.search)) return;
    root.OBEY_TEST = {
      save: function () { return U.clone(App.save); },
      seed: function (obj) { App.save = OBEY.save.validate(obj); P.evaluate(App.save); App.persist(); App.applySettings(); App.route(); },
      runtime: function () {
        var rt = App.runtime;
        return rt ? { level: rt.def.num, status: rt.status, state: U.clone(rt.state), stats: U.clone(rt.stats), line: rt.line, mood: rt.mood, overlay: rt.overlay, result: rt.result ? U.clone(rt.result) : null } : null;
      },
      objects: function () { return App.runtime ? U.clone(App.runtime.objects()) : []; },
      screen: function () { return App.screen; },
      persistent: function () { return App.store.persistent; }
    };
  }

  OBEY.app = App;
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
