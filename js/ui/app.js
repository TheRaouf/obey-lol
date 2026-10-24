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

  function diffName(id) { var d = OBEY.DIFFICULTIES.filter(function (x) { return x.id === id; })[0]; return d ? d.name : 'Medium'; }
  App.diffName = diffName;

  var SCREENS = ['menu', 'map', 'level', 'secrets', 'costumes', 'themes', 'achievements', 'trophies', 'settings', 'credits', 'stats', 'daily', 'sabotage', 'ending'];

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
    html.setAttribute('data-contrast', st.contrast);
    html.setAttribute('data-font', st.font);
    html.setAttribute('data-hand', st.hand);
    OBEY.audio.setEnabled(st.sound);
    OBEY.audio.setVoice(st.voice);
    OBEY.audio.setVolume('sfx', st.sfxVol);
    OBEY.audio.setVolume('voice', st.voiceVol);
    OBEY.audio.setVolume('music', st.musicVol);
    if (App.syncMusic) App.syncMusic();
    var cap = doc.getElementById('captions');
    if (cap && !st.captions) { cap.hidden = true; cap.textContent = ''; }
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

  /* --------------------------------------------------------- reward sounds */
  // 2.3 E81: reward sounds never stack. Each starts at least REWARD_GAP ms after the previous one
  // started (bible §9.2: simultaneous voices sum ≤ 0.35). The request is made at once (so the test hook
  // and captions see it); the sound itself, and its caption, start when its slot comes up.
  var REWARD_GAP = 380;
  App.rewardAt = 0;
  /** Plays a reward sound in the queue. minDelay (ms): not before this long from now. */
  App.playReward = function (name, minDelay) {
    var now = Date.now();
    var at = Math.max(now + (minDelay || 0), App.rewardAt + REWARD_GAP);
    App.rewardAt = at;
    OBEY.audio.play(name, at > now ? { delay: at - now } : undefined);
    return at - now;
  };

  /** Turns progress events into feedback. */
  App.announce = function (events) {
    (events || []).forEach(function (ev) {
      if (ev.type === 'secret') {
        var s = OBEY.getSecret(ev.id);
        App.toast('Secret found: ' + s.name + ' (' + ev.count + '/15)', 'secret');
        App.playReward('secret');
      } else if (ev.type === 'achievement') {
        var a = OBEY.ACHIEVEMENTS.filter(function (x) { return x.id === ev.id; })[0];
        App.toast('Achievement unlocked: ' + a.name, 'achievement');
        App.playReward('achievement');
      } else if (ev.type === 'costume') {
        App.toast('New costume: ' + OBEY.COSTUMES.filter(function (c) { return c.id === ev.id; })[0].name, 'unlock');
        App.playReward('unlock');
      } else if (ev.type === 'trophy') {
        var t = OBEY.TROPHIES.filter(function (x) { return x.id === ev.id; })[0];
        App.toast((ev.upgraded ? 'Trophy upgraded: ' : 'Trophy won: ') + t.name + ' (' + OBEY.TROPHY_TIERS[ev.tier] + ')', 'achievement');
        App.playReward('trophy');
      } else if (ev.type === 'theme') {
        App.toast('New theme: ' + OBEY.THEMES.filter(function (c) { return c.id === ev.id; })[0].name, 'unlock');
        App.playReward('unlock');
      } else if (ev.type === 'ruin') {
        App.toast('Level ruined: ' + OBEY.extras.getRuin(ev.id).name + ' (' + ev.count + '/' + OBEY.extras.RUINS.length + ')', 'secret');
      } else if (ev.type === 'jigsaw') {
        App.toast('Jigsaw piece found! (' + ev.count + '/9)', 'secret');
        App.playReward('secret');
      } else if (ev.type === 'badge') {
        App.toast('Daily Dare badge: ' + ev.days + '-day streak!', 'achievement');
        App.playReward('achievement');
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
        (opts.extra ? '<p class="small">' + E(opts.extra.note || '') + '</p>' : '') +
        '<div class="btn-row"><button class="btn" data-m="no">' + E(opts.cancel || 'Cancel') + '</button>' +
        (opts.extra ? '<button class="btn" data-m="extra">' + E(opts.extra.label) + '</button>' : '') +
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
        if (!App.isTopModal(wrap)) return;
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
        if (b && b.getAttribute('data-m') === 'extra') { OBEY.audio.play('ui'); opts.extra.onClick(b); return; }
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

  /** Dialogs make the app inert (counted, so stacked dialogs work) and pause any running level. */
  App.inertDepth = 0;
  App.inertApp = function (on) {
    var app = doc.getElementById('app');
    App.inertDepth = Math.max(0, App.inertDepth + (on ? 1 : -1));
    var block = App.inertDepth > 0;
    if (block) { app.setAttribute('inert', ''); app.setAttribute('aria-hidden', 'true'); } else { app.removeAttribute('inert'); app.removeAttribute('aria-hidden'); }
    var clock = App.runtime && App.runtime.clock;
    if (clock && clock.pause) { if (block) clock.pause(); else clock.resume(); }
  };
  /** True when `wrap` is the top-most dialog (only it reacts to Escape/Tab). */
  App.isTopModal = function (wrap) { var r = doc.getElementById('modal-root'); return r && r.lastElementChild === wrap; };

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
        App.toast(OBEY.isBonus(n) ? 'The Sabotage Studio opens after Level ' + P.BONUS_UNLOCK_LEVEL + '.' : (Number.isInteger(n) && n >= 1 && n <= OBEY.LEVEL_COUNT ? 'Level ' + n + ' is locked. Finish Level ' + (n - 1) + ' first.' : 'That level does not exist.'), 'warn');
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
    if (App.onScreen) App.onScreen(name);
    var el = doc.getElementById('screen-' + name);
    if (name === 'level') App.enterLevel(arg);
    else if (name === 'ending') { App.endingCleanup = OBEY.endings.render(App, el, arg); }
    else OBEY.screens[name](App, el);
    if (name !== 'level' && name !== 'ending') {
      root.scrollTo(0, 0);
      var h = el.querySelector('h1');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }
    doc.title = name === 'level' ? OBEY.levelLabel(arg) + ': ' + OBEY.getLevel(arg).title + ' — OBEY? LOL.' : 'OBEY? LOL.' + (name === 'menu' ? '' : ' — ' + name[0].toUpperCase() + name.slice(1));
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
        <h1 class="level-title"><span class="lvl-num">${OBEY.levelLabel(n)} <span class="diff-badge diff-${s.difficulty}">${E(diffName(s.difficulty))}</span>${s.settings.timer ? ' <span class="run-timer" id="run-timer" role="timer" aria-label="Time on this attempt">0:00.0</span>' : ''}</span><span class="lvl-name">${E(def.title)}</span></h1>
        <div class="topbar-end tools">
          <button class="chip-btn" data-act="hint" id="hint-btn" aria-keyshortcuts="H">${A.icon('hint')}<span>Hint</span><b class="count-badge" aria-hidden="true"></b></button>
          <button class="chip-btn" data-act="guide" id="guide-btn" aria-keyshortcuts="G">${A.icon('eye')}<span>Show me how</span></button>
          <button class="chip-btn" data-act="restart" aria-label="Restart level" aria-keyshortcuts="R">${A.icon('restart')}<span>Restart</span></button>
          ${P.skipBlocker(s, n) ? '' : `<button class="chip-btn" data-act="skip" id="skip-btn">${A.icon('skip')}<span>Skip</span></button>`}
          <button class="chip-btn icon-only" data-act="nav" data-to="settings" aria-label="Settings">${A.icon('gear')}</button>
        </div>
      </header>
      <div class="level-body">
        <aside class="narrator-panel" aria-label="Narrator">
          <button class="narrator-btn" id="narrator" type="button" aria-label="Bossworth, the narrator (poke him)"></button>
          <div class="narrator-text">
            <div class="bubble bubble-narrator" id="bubble"><span class="speaker">Bossworth</span><p id="line" aria-live="polite"></p></div>
            <p class="aside" id="aside" aria-live="polite" hidden></p>
            <div class="composure" id="composure"></div>
          </div>
        </aside>
        <div class="stage-col">
          <p class="objective"><b>Goal:</b> ${E(def.objective)}</p>
          <div class="stage-wrap">
            <div class="stage" id="stage" role="group" aria-label="Level ${n} play area"></div>
            <div class="gag-layer" id="gag-layer" aria-hidden="true"></div>
          </div>
          <p class="pick-status" id="pick-status" aria-live="polite"></p>
          <div class="wrong-card" id="wrong-card" hidden></div>
          <div class="guide-box" id="guide-box" hidden></div>
          <div class="hint-box" id="hint-box" hidden></div>
          <p class="score-rule small">Stars on ${E(diffName(s.difficulty))}: ${E(OBEY.scoring.describe(def.par, s.difficulty).join('; '))}.${def.hardNote && s.difficulty === 'hard' ? ' ' + E(def.hardNote) : ''}</p>
        </div>
        ${OBEY.extras.undoActive(n) ? '<section class="undo-chat" id="undo-chat" aria-label="U.N.D.O. chat"></section>' : ''}
      </div>
      <p id="hold-help" class="visually-hidden">Press and hold. With a keyboard, hold Space or Enter.</p>
      <p id="hold-help-assist" class="visually-hidden">Hold assist is on: press once to start holding, press again to let go.</p>
      <div class="complete-backdrop" id="complete" hidden></div>`;

    App.renderCache = {};
    var narratorEl = doc.getElementById('narrator');
    narratorEl.addEventListener('click', function () { if (App.stage) App.stage.tap('narrator'); });

    var rt = new OBEY.LevelRuntime(def, {
      clock: OBEY.createPausableClock(),
      ctx: {
        replay: OBEY.isBonus(n) ? s.bonus.completed.indexOf(n) >= 0 : P.isCompleted(s, n),
        secrets: s.secrets.slice(),
        choices: U.clone(s.choices),
        costume: s.costumes.selected,
        costumeAside: costume ? costume.aside : '',
        allSecrets: s.secrets.length === OBEY.SECRETS.length,
        difficulty: s.difficulty,
        intern: s.intern
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
        if (App.handleExtraTap && App.handleExtraTap(a)) return;
        var rtNow = App.runtime;
        var failsBefore = rtNow.stats.fails;
        var stateBefore = App.guide ? JSON.stringify(rtNow.state) : null;
        var accepted = rtNow.dispatch(a);
        if (rtNow.stats.fails !== failsBefore) accepted = false; // a trap never counts as a guide step
        else if (accepted && App.guide && rtNow.status === 'playing') a._changed = JSON.stringify(rtNow.state) !== stateBefore;
        if (accepted && a.type === 'tap') OBEY.audio.play(a.target === 'narrator' ? 'boing' : 'tap'); // 2.3 E85: poking Bossworth
        if (accepted && a.type === 'drop') OBEY.audio.play('drop');
        if (accepted && a.type === 'holdstart') App.holdSound(a.target);
        if (a.type === 'holdend') App.holdSound(null);
        App.afterAction(a, accepted);
        if (App.afterDispatch) App.afterDispatch(a, accepted);
      },
      onPick: function (o) {
        var ps = doc.getElementById('pick-status');
        if (ps) ps.textContent = o ? 'Holding: ' + o.label.split(' (')[0] + '. Choose where to put it, or select it again to put it back.' : '';
      },
      onFeedback: function (k) { OBEY.audio.play(k); },
      holdAssist: function () { return !!App.save.settings.holdAssist; }
    });
    App.guide = null;
    App.newAttempt();
    rt.start();
    App.renderCache.fails = 0;
    App.renderCache.nopes = 0;
    App.armIdleHelp();
    if (App.levelStarted) App.levelStarted(n);
    App.updateGuideButton();
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
      App.lineStartedAt = Date.now();
      var b = doc.getElementById('bubble');
      b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
      b.setAttribute('data-mood', rt.mood);
      App.speakLine(rt.line, rt.mood);
    }
    App.stage.render(App.extraObjects ? rt.objects().concat(App.extraObjects()) : rt.objects());
    // Traps and harmless wrong moves can also come from timers, so check after every change
    // (after rendering, so effects attach to the final DOM).
    if (rt.stats.fails !== c.fails) { if (c.fails !== undefined && rt.stats.fails > c.fails) App.onFail(); c.fails = rt.stats.fails; }
    if (rt.nopes !== c.nopes) { if (c.nopes !== undefined && rt.nopes > c.nopes) App.onNope(rt.nopeTarget); c.nopes = rt.nopes; }
    var hb = doc.getElementById('hint-btn');
    var left = rt.hintLimit() - rt.hintIndex;
    hb.querySelector('span').textContent = left > 0 ? 'Hint (' + left + ')' : 'No hints left';
    // 2.3 E8: the count stays visible on phones, where the label is hidden (styled by E86).
    var badge = hb.querySelector('.count-badge');
    if (badge) { badge.textContent = String(Math.max(0, left)); badge.classList.toggle('empty', left <= 0); }
    hb.setAttribute('aria-label', left > 0 ? 'Hint, ' + left + ' left' : 'No hints left');
    if (App.guide) App.renderGuide();
    App.updateGuideButton();
  };

  /* ------------------------------------------------------ voice & mouth */
  App.speakLine = function (text, mood) {
    var n = doc.getElementById('narrator');
    var ms = OBEY.audio.speak(text, App.save.costumes.selected, mood);
    if (!n || App.reducedMotion() || !text || text === '…') return;
    n.classList.add('talking');
    clearTimeout(App.talkTimer);
    App.talkTimer = setTimeout(function () { n.classList.remove('talking'); }, ms);
  };

  /* ------------------------------------------------------- hold sounds */
  // 2.3 E78: the hum runs for the whole hold. A charging button (.hold-btn, whose bar fills in 2 s)
  // dings when the bar is full; letting go early cuts the hum.
  App.HOLD_MS = 2000;
  App.holdSound = function (target) {
    clearTimeout(App.holdTimer);
    App.holdTimer = null;
    if (!target) { OBEY.audio.stopHold(); return; }
    OBEY.audio.play('hold');
    var rt = App.runtime, o = rt && rt.findObject(target);
    if (!o || !/\bhold-btn\b/.test(o.cls || '')) return;
    App.holdTimer = setTimeout(function () {
      App.holdTimer = null;
      var now = App.runtime;
      if (now !== rt || !rt.holds || rt.holds[target] === undefined) return;
      OBEY.audio.play('charged');
    }, App.HOLD_MS);
  };

  /* ------------------------------------------------- wrong-answer feedback */
  var GAGS = ['pie', 'chicken', 'trombone', 'zap', 'splash'];
  App.pickGag = function (text, count) {
    var t = String(text || '').toLowerCase();
    var g = null;
    if (/pie|splat|splodge|custard|cream/.test(t)) g = 'pie';
    else if (/chicken|honk/.test(t)) g = 'chicken';
    else if (/bzz|zap|alarm|wee-oo|electric/.test(t)) g = 'zap';
    else if (/sploosh|splash|glug|swamp|pool|gap/.test(t)) g = 'splash';
    else g = GAGS[(App.levelNum * 3 + count) % GAGS.length];
    // Never the same generic gag twice in a row (themed gags stay themed).
    if (g === App.lastGag && !/pie|splat|chicken|honk|bzz|zap|alarm|sploosh|splash|glug|swamp|pool|gap|custard|cream|electric|wee-oo|splodge/.test(t)) g = GAGS[(GAGS.indexOf(g) + 1) % GAGS.length];
    App.lastGag = g;
    return g;
  };

  /** A trap was triggered: slapstick gag over the stage, then a "how to do it right" card. */
  App.onFail = function () {
    var rt = App.runtime;
    if (!rt) return;
    var f = rt.lastFail || { text: rt.line, count: rt.stats.fails };
    var gag = App.pickGag(f.text, f.count);
    OBEY.audio.play(gag);
    var layer = doc.getElementById('gag-layer');
    var word = ['WRONG!', 'OOPS!', 'BONK!', 'NOPE!', 'HA!'][f.count % 5];
    layer.innerHTML = '<div class="gag gag-' + gag + '">' + A.object(gag) + '<span class="gag-word">' + word + '</span></div>';
    clearTimeout(App.gagTimer);
    App.gagTimer = setTimeout(function () { layer.innerHTML = ''; }, 1900);
    App.flashStage();
    App.holdSound(null);
    App.stage.reset();
    if (App.buzz) App.buzz([60, 40, 90]);
    if (App.afterFail) App.afterFail();
    if (App.guide) { App.guide.i = 0; App.guide.holdAt = 0; App.guide.waiting = false; App.guideShownStep = null; App.guide.note = 'That was a trap. The walkthrough starts again from step 1.'; App.renderGuide(); }
    App.showWrongCard();
  };

  App.onNope = function (target) {
    OBEY.audio.play('nope');
    if (App.stage) App.stage.nope(target);
    if (App.buzz) App.buzz(25);
    if (App.afterNope) App.afterNope();
  };

  App.showWrongCard = function () {
    var rt = App.runtime, card = doc.getElementById('wrong-card');
    if (!rt || !card) return;
    var d = App.save.difficulty;
    var tip = d === 'easy' ? rt.def.hints[2] : (d === 'medium' ? rt.def.hints[0] : null);
    var avail = App.guideAvailable();
    card.innerHTML = '<p class="wrong-title">' + A.icon('question') + '<b>That was a trap!</b></p>' +
      '<p>' + (tip ? '<b>How to do it right:</b> ' + E(tip) : 'No free tips on Hard. ' + (avail ? '"Show me how" is unlocked if you want it.' : '"Show me how" unlocks after ' + (3 - rt.stats.fails) + ' more ' + (3 - rt.stats.fails === 1 ? 'trap' : 'traps') + '.')) + '</p>' +
      '<div class="btn-row">' + (avail && !App.guide ? '<button class="btn primary" data-act="guide">Show me how</button>' : '') +
      '<button class="btn" data-act="dismiss-wrong">Got it</button></div>';
    card.setAttribute('role', 'alert');
    card.hidden = false;
    if (card.scrollIntoView) card.scrollIntoView({ block: 'nearest' });
  };
  App.hideWrongCard = function () { var c = doc.getElementById('wrong-card'); if (c) { c.hidden = true; c.innerHTML = ''; } };

  /* --------------------------------------------------------- Show me how */
  App.guideAvailable = function () {
    var rt = App.runtime;
    if (!rt) return false;
    if (App.guide || App.guideUnlockedFor === App.levelNum) return true;
    var d = App.save.difficulty;
    if (d === 'easy') return true;
    if (d === 'hard') return rt.stats.fails >= 3;
    return rt.stats.fails >= 1 || rt.hintIndex >= 2;
  };
  App.guideRule = function () {
    var d = App.save.difficulty;
    return d === 'easy' ? '' : (d === 'hard' ? '"Show me how" unlocks on Hard after falling for 3 traps in one attempt.' : '"Show me how" unlocks after you fall for a trap or use 2 hints.');
  };
  App.updateGuideButton = function () {
    var b = doc.getElementById('guide-btn');
    if (!b) return;
    var on = App.guideAvailable();
    b.classList.toggle('locked-chip', !on);
    b.setAttribute('aria-label', on ? (App.guide ? 'Stop the walkthrough' : 'Show me how: a step-by-step walkthrough') : 'Show me how (locked). ' + App.guideRule());
    b.querySelector('span').textContent = App.guide ? 'Stop guide' : 'Show me how';
  };

  function objLabel(id) {
    if (id === 'narrator') return 'Bossworth';
    var o = App.runtime && App.runtime.findObject(id);
    return o ? (o.label || o.text || id).split(' (')[0] : id;
  }
  App.describeStep = function (st) {
    if (st.tap) return 'Tap: ' + objLabel(st.tap) + '.';
    if (st.drop) return 'Drag "' + objLabel(st.drop[0]) + '" onto "' + objLabel(st.drop[1]) + '" (or tap it, then tap the target).';
    if (st.hold) return 'Press and hold "' + objLabel(st.hold[0]) + '" for about ' + Math.round(st.hold[1] / 1000) + ' seconds (keyboard: hold Space).';
    return 'Wait about ' + Math.max(1, Math.round(st.wait / 1000)) + ' seconds. Don\'t touch anything!';
  };
  App.stepTargets = function (st) {
    if (!st) return [];
    if (st.tap) return [st.tap];
    if (st.drop) return [st.drop[0], st.drop[1]];
    if (st.hold) return [st.hold[0]];
    return [];
  };

  App.startGuide = function () {
    var rt = App.runtime;
    if (!rt) return;
    if (!App.guideAvailable()) { App.toast(App.guideRule(), 'warn'); return; }
    App.guideUnlockedFor = App.levelNum;
    App.hideWrongCard();
    App.stage.reset();
    clearTimeout(App.gagTimer);
    doc.getElementById('gag-layer').innerHTML = '';
    App.newAttempt();
    rt.restart({ guided: true });
    App.renderCache.fails = 0; App.renderCache.nopes = 0;
    App.guide = { steps: App.guideSteps(), i: 0, holdAt: 0 };
    App.renderGuide();
    App.updateGuideButton();
    App.toast('Walkthrough on. A guided run earns 1 star.', 'info');
  };

  App.guideSteps = function () {
    var def = App.runtime.def;
    return (def.guide ? def.guide(App.runtime.ctx) : def.solution).slice();
  };

  /** Player pressed "Stop guide": end the walkthrough and start a fresh, normally scored attempt. */
  App.endGuideByPlayer = function () {
    App.stopGuide();
    if (App.runtime && App.runtime.status === 'playing') {
      App.stage.reset();
      App.renderCache.fails = 0; App.renderCache.nopes = 0;
      App.newAttempt();
      App.runtime.restart();
      App.toast('Walkthrough stopped. Fresh attempt: stars count normally again.', 'info');
    }
  };

  /** The room no longer matches the walkthrough: start the guided attempt over. */
  App.resyncGuide = function (why) {
    var rt = App.runtime;
    if (!rt || !App.guide) return;
    clearTimeout(App.guideWaitTimer);
    App.stage.reset();
    App.renderCache.fails = 0; App.renderCache.nopes = 0;
    App.guide = { steps: App.guideSteps(), i: 0, holdAt: 0, note: why };
    App.guideShownStep = null; App.guideSig = null;
    rt.restart({ guided: true });
    App.renderGuide();
  };

  App.stopGuide = function () {
    App.guide = null;
    clearTimeout(App.guideWaitTimer);
    var box = doc.getElementById('guide-box');
    if (box) { box.hidden = true; box.innerHTML = ''; }
    if (App.stage) App.stage.setGuide([]);
    App.updateGuideButton();
  };

  App.renderGuide = function (note) {
    var g = App.guide, rt = App.runtime, box = doc.getElementById('guide-box');
    if (!g || !rt || !box) return;
    note = note || g.note;
    var items = g.steps.map(function (st, i) {
      return '<li class="' + (i < g.i ? 'done' : (i === g.i ? 'current' : '')) + '">' + (i < g.i ? A.icon('check') : '') + E(App.describeStep(st)) + '</li>';
    }).join('');
    var cur = g.steps[g.i];
    var sig = g.i + '|' + note + '|' + items;
    if (App.guideSig === sig && !box.hidden) { App.guideTimers(g, cur); return; }
    App.guideSig = sig;
    box.innerHTML = '<p class="guide-title"><b>Show me how</b> <span class="small">step ' + Math.min(g.i + 1, g.steps.length) + ' of ' + g.steps.length + '</span></p>' +
      (note ? '<p class="guide-note">' + E(note) + '</p>' : '') +
      '<ol class="guide-steps">' + items + '</ol>' +
      '<p class="small"><b>Why it works:</b> ' + E(rt.def.hints[2]) + '</p>' +
      '<div class="btn-row"><button class="btn" data-act="guide">Stop guide</button></div>';
    box.hidden = false;
    box.setAttribute('aria-live', 'polite');
    var key = g.i;
    if (App.guideShownStep !== key) { App.guideShownStep = key; App.stage.setGuide(App.stepTargets(cur)); }
    App.guideTimers(g, cur);
  };

  App.guideTimers = function (g, cur) {
    if (cur && cur.wait && !g.waiting) {
      g.waiting = true;
      clearTimeout(App.guideWaitTimer);
      App.guideWaitTimer = setTimeout(function () {
        if (App.guide !== g) return;
        g.waiting = false;
        g.i++;
        App.renderGuide();
      }, cur.wait);
    }
  };

  /** Advances the walkthrough when the player performs the expected step. */
  App.guideAdvance = function (a) {
    var g = App.guide;
    if (!g) return;
    var st = g.steps[g.i];
    if (!st) return;
    var ok = false, part = false;
    var now = App.runtime.clock.now();
    if (st.tap) ok = a.type === 'tap' && a.target === st.tap;
    else if (st.drop) ok = a.type === 'drop' && a.target === st.drop[0] && a.zone === st.drop[1];
    else if (st.hold && a.target === st.hold[0]) {
      // Part of the step: starting the hold, or letting go too early (the room resets itself).
      part = a.type === 'holdstart' || a.type === 'holdend';
      if (a.type === 'holdstart') g.holdAt = now;
      // The level reacts at 2 s; the walkthrough asks for (and checks) a little longer.
      if (a.type === 'holdend' && g.holdAt) { ok = now - g.holdAt >= st.hold[1] - 150; g.holdAt = 0; }
    }
    if (ok) { g.i++; g.holdAt = 0; g.note = null; App.guideShownStep = null; App.renderGuide(); return; }
    // Any other move that changed the room makes the remaining steps wrong: start over.
    if (!part && a._changed) App.resyncGuide('That move was not part of the walkthrough, so it starts again from step 1.');
  };

  App.afterAction = function (a, accepted) {
    App.armIdleHelp();
    if (accepted) App.guideAdvance(a);
  };

  /* ------------------------------------------ Easy: Bossworth's helper */
  App.armIdleHelp = function () {
    clearTimeout(App.idleTimer);
    if (App.armIdleAsides) App.armIdleAsides();
    if (App.save.difficulty !== 'easy') return;
    App.idleTimer = setTimeout(function () {
      var rt = App.runtime;
      if (!rt || rt.status !== 'playing' || App.guide || App.screen !== 'level') return;
      if (rt.hintIndex >= rt.hintLimit()) return;
      App.showHint(true);
      App.armIdleHelp();
    }, 25000);
  };

  App.leaveLevel = function () {
    App.setLevelInert(false);
    App.stopGuide();
    clearTimeout(App.idleTimer); clearTimeout(App.talkTimer); clearTimeout(App.gagTimer); clearTimeout(App.pointTimer);
    App.holdSound(null);
    if (App.levelLeft) App.levelLeft();
    OBEY.audio.stopVoice();
    if (App.runtime) App.runtime.destroy();
    if (App.stage) App.stage.destroy();
    App.runtime = null;
    App.stage = null;
    App.levelNum = null;
  };

  App.showHint = function (fromHelper) {
    var rt = App.runtime;
    if (!rt) return;
    if (rt.hintIndex >= rt.hintLimit() && !fromHelper) {
      App.toast(App.save.difficulty === 'hard' ? 'Only one hint per level on Hard.' : 'No hints left. Try "Show me how".', 'info');
    }
    var h = rt.hint();
    if (!h) return;
    OBEY.audio.play('ui');
    var box = doc.getElementById('hint-box');
    box.hidden = false;
    var d = App.save.difficulty;
    var cost = d === 'easy' ? 'Hints are free on Easy.' : (d === 'hard' ? 'On Hard, a hint caps this attempt at 1 star.' : (rt.stats.hints === 1 ? 'Using a hint caps this attempt at 2 stars.' : 'Two or more hints cap this attempt at 1 star.'));
    var point = h.tier === h.total && !App.guide; // the last hint available on this difficulty
    box.innerHTML = '<p><b>' + (fromHelper ? 'Bossworth\'s helper (you seemed stuck) — hint ' : 'Hint ') + h.tier + ' of ' + h.total + ':</b> ' + E(h.text) + '</p><p class="small">' + cost + (point ? ' The first thing to use is highlighted for a few seconds.' : '') + '</p>';
    box.setAttribute('role', 'status');
    App.updateGuideButton();
    if (point) App.pointMe();
  };

  /** Highlights the first object of the solution for a few seconds ("Point me"). */
  App.pointMe = function () {
    var ids = App.stepTargets(App.nextSolutionStep ? App.nextSolutionStep() : App.guideSteps()[0]);
    if (!ids.length || !App.stage) return;
    App.stage.setGuide(ids);
    clearTimeout(App.pointTimer);
    App.pointTimer = setTimeout(function () { if (App.stage && !App.guide) App.stage.setGuide([]); }, 3500);
  };

  /** Per-attempt counters for ruins, nudges, timing and asides. */
  App.newAttempt = function () {
    App.att = { taps: {}, start: Date.now(), nudged: false, finished: false, tipShown: false };
  };

  App.restartLevel = function () {
    if (!App.runtime) return;
    OBEY.audio.play('ui');
    App.newAttempt();
    App.stage.reset();
    App.stopGuide();
    App.hideWrongCard();
    var box = doc.getElementById('hint-box');
    box.hidden = true; box.innerHTML = '';
    App.renderCache.fails = 0;
    App.renderCache.nopes = 0;
    App.runtime.restart();
    App.armIdleHelp();
    App.toast('Level restarted.', 'info');
  };

  App.onLevelComplete = function (result) {
    var n = result.level;
    result.timeMs = App.att ? Date.now() - App.att.start : 0;
    result.hour = new Date().getHours();
    var events = P.completeLevel(App.save, n, result) || [];
    if (App.afterComplete) events = events.concat(App.afterComplete(result, events) || []);
    var endingEv = null;
    if (result.ending) {
      endingEv = P.recordEnding(App.save, result.ending);
      if (endingEv) { events = events.concat(endingEv); App.allowedEnding = result.ending; }
    }
    App.persist();
    App.stopGuide();
    App.hideWrongCard();
    clearTimeout(App.idleTimer);
    App.holdSound(null);
    App.playReward('success');
    // 2.3 E79: the thud waits for the SOLVED stamp to land (stamp-card: .15 s delay + .45 s overshoot).
    App.playReward('stamp', App.STAMP_LAND_MS);
    App.renderLevel();
    App.showComplete(result, events);
    App.playStarChimes(result.stars);
    App.announce(events.filter(function (e) { return e.type !== 'level' && e.type !== 'ending' && e.type !== 'ruin' && e.type !== 'best' && e.type !== 'dare' && e.type !== 'roast'; }));
  };

  App.STAMP_LAND_MS = 520;
  // 2.3 E80 ↔ E68: the stars pop in at 0 / 120 / 240 ms (.big-stars .icon:nth-child animation-delay);
  // each chime sounds STAR_POP_MS later, when that star's overshoot peaks: 120 / 240 / 360 ms.
  App.STAR_DELAYS_MS = [0, 120, 240];
  App.STAR_POP_MS = 120;
  App.playStarChimes = function (n) {
    for (var i = 0; i < Math.min(3, n || 0); i++) OBEY.audio.play('star' + (i + 1), { delay: App.STAR_DELAYS_MS[i] + App.STAR_POP_MS });
  };

  App.showComplete = function (r, events) {
    var def = OBEY.getLevel(r.level);
    var lev = events.filter(function (e) { return e.type === 'level'; })[0] || {};
    var box = doc.getElementById('complete');
    var reasons = [];
    reasons.push(r.actions + (r.actions === 1 ? ' action' : ' actions') + ' (par ' + r.par + ')');
    reasons.push(r.hints ? r.hints + (r.hints === 1 ? ' hint' : ' hints') : 'no hints');
    if (r.fails) reasons.push(r.fails + (r.fails === 1 ? ' trap' : ' traps'));
    reasons.push(diffName(r.difficulty) + ' difficulty');
    if (r.guided) reasons.push('guided run (1 star max)');
    var best = App.save.bestStars[r.level];
    var unlocks = events.filter(function (e) { return ['costume', 'theme', 'achievement', 'trophy'].indexOf(e.type) >= 0; }).map(function (e) {
      var src = { costume: OBEY.COSTUMES, theme: OBEY.THEMES, achievement: OBEY.ACHIEVEMENTS, trophy: OBEY.TROPHIES }[e.type];
      var item = src.filter(function (x) { return x.id === e.id; })[0];
      var pre = { costume: 'New costume: ', theme: 'New theme: ', achievement: 'Achievement: ', trophy: (e.upgraded ? 'Trophy upgraded: ' : 'Trophy: ') }[e.type];
      return '<li class="unlock-' + e.type + '">' + A.icon(e.type === 'achievement' || e.type === 'trophy' ? 'star' : 'check') + pre + E(item.name) + (e.type === 'trophy' ? ' (' + OBEY.TROPHY_TIERS[e.tier] + ')' : '') + '</li>';
    }).join('');
    var isFinal = r.level === OBEY.LEVEL_COUNT && r.ending;
    var isBonus = OBEY.isBonus(r.level);
    var nextN = isBonus ? (r.level < OBEY.BONUS_BASE + OBEY.BONUS_COUNT ? r.level + 1 : null) : (r.level < OBEY.LEVEL_COUNT ? r.level + 1 : null);
    var nextBtn = isFinal
      ? '<button class="btn primary" data-act="see-ending" data-id="' + r.ending + '">See your ending</button>'
      : (nextN ? '<button class="btn primary" data-act="open-level" data-level="' + nextN + '" aria-keyshortcuts="N">Next level</button>' : (isBonus ? '<button class="btn primary" data-act="nav" data-to="sabotage">Sabotage file</button>' : ''));
    if (isBonus) best = App.save.bonus.bestStars[r.level];
    var extra = App.completeExtras ? App.completeExtras(r, events) : { top: '', bottom: '', buttons: '' };
    box.innerHTML = '<div class="complete-card panel" role="dialog" aria-modal="true" aria-labelledby="complete-title">' +
      '<p class="stamp' + (r.ruin ? ' stamp-ruined' : '') + '" aria-hidden="true">' + (r.ruin ? 'RUINED' : (r.defies ? 'DISOBEYED' : 'SOLVED')) + '</p>' +
      '<h2 id="complete-title" tabindex="-1">' + OBEY.levelLabel(r.level) + (r.ruin ? ' ruined' : ' complete') + '</h2>' +
      '<div class="big-stars" role="img" aria-label="' + r.stars + ' of 3 stars this time">' + A.stars(r.stars) + '</div>' +
      '<p class="score-why">' + E(reasons.join(', ')) + '.' + (lev.improved ? ' New best!' : (best > r.stars ? ' Your best is still ' + best + ' stars.' : '')) + '</p>' +
      extra.top +
      '<p class="closing">“' + E(r.ruin ? OBEY.extras.getRuin(r.ruin).name + ': ' + (r.line || def.done) : def.done) + '”</p>' +
      (unlocks ? '<ul class="unlock-list">' + unlocks + '</ul>' : '') +
      extra.bottom +
      '<div class="btn-row center">' + nextBtn +
      '<button class="btn" data-act="replay-level">Replay</button>' +
      extra.buttons +
      '<button class="btn" data-act="nav" data-to="' + (isBonus ? 'sabotage' : 'map') + '">' + (isBonus ? 'Studio' : 'Map') + '</button></div></div>';
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
    function esc(e) { if (App.isTopModal(wrap) && e.key === 'Escape') { e.preventDefault(); finish(); } }
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

  App.startCampaign = function (n, askDifficulty) {
    var go = function () { App.go('level/' + n); };
    var afterDiff = function () { if (!App.save.tutorialDone) App.tutorial(go); else go(); };
    if (askDifficulty || !App.save.tutorialDone) App.pickDifficulty(afterDiff); else afterDiff();
  };

  /* --------------------------------------------------- difficulty picker */
  App.pickDifficulty = function (then) {
    var rootEl = doc.getElementById('modal-root');
    var prev = doc.activeElement;
    var wrap = doc.createElement('div');
    wrap.className = 'modal-backdrop';
    var cur = App.save.difficulty;
    wrap.innerHTML = '<div class="modal panel difficulty-modal" role="dialog" aria-modal="true" aria-labelledby="diff-title">' +
      '<h2 id="diff-title">Choose a difficulty</h2><p class="small">You can change it any time in Settings.</p>' +
      '<div class="diff-options" role="group" aria-label="Difficulty">' +
      OBEY.DIFFICULTIES.map(function (d) {
        return '<button class="diff-option diff-' + d.id + (d.id === cur ? ' current' : '') + '" data-d="' + d.id + '" aria-pressed="' + (d.id === cur) + '">' +
          '<span class="diff-name">' + E(d.name) + (d.id === cur ? ' <em>(current)</em>' : (d.id === 'medium' ? ' <em>(recommended)</em>' : '')) + '</span><span class="diff-blurb">' + E(d.blurb) + '</span></button>';
      }).join('') + '</div></div>';
    rootEl.appendChild(wrap);
    App.inertApp(true);
    var btns = wrap.querySelectorAll('[data-d]');
    (wrap.querySelector('.diff-option.current') || btns[1]).focus();
    function close() {
      App.removeOverlayCloser(close);
      wrap.remove();
      App.inertApp(false);
      doc.removeEventListener('keydown', key, true);
      if (prev && prev.focus && doc.contains(prev)) prev.focus();
    }
    function key(e) {
      if (!App.isTopModal(wrap)) return;
      // Escape keeps the current difficulty and carries on (e.g. a New Game still starts).
      if (e.key === 'Escape') { e.preventDefault(); close(); if (then) then(); }
      if (e.key === 'Tab') {
        var first = btns[0], last = btns[btns.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    App.addOverlayCloser(close);
    doc.addEventListener('keydown', key, true);
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('[data-d]');
      if (!b) return;
      OBEY.audio.play('ui');
      P.setDifficulty(App.save, b.getAttribute('data-d'));
      App.persist();
      close();
      if (then) then();
    });
  };

  /* ---------------------------------------------------------------- actions */
  var ACTIONS = {
    nav: function (b) { App.go(b.getAttribute('data-to')); },
    play: function () {
      var s = App.save;
      if (!P.hasProgress(s) && !s.completed.length) return App.startCampaign(1, !s.tutorialDone);
      var next = P.nextLevel(s);
      if (next) App.go('level/' + next); else App.go('map');
    },
    'new-game': function () {
      if (!P.hasProgress(App.save)) return App.startCampaign(1, true);
      App.confirm({
        title: 'Start a new game?',
        body: 'Your levels, stars, secrets and choices will be reset. Achievements, trophies, costumes, themes, endings and settings are kept. You will choose a difficulty next.',
        ok: 'Start new game', danger: true
      }).then(function (yes) {
        if (!yes) return;
        App.save = P.newGame(App.save);
        App.persist();
        App.applySettings();
        App.toast('New game started.', 'info');
        App.startCampaign(1, true);
      });
    },
    'open-level': function (b) {
      var n = Number(b.getAttribute('data-level'));
      if (!P.canPlay(App.save, n)) { App.toast('Level ' + n + ' is locked. Finish Level ' + (n - 1) + ' first.', 'warn'); return; }
      App.go('level/' + n);
    },
    'replay-level': function () { if (App.levelNum) App.show('level', App.levelNum); },
    hint: function () { App.showHint(); },
    guide: function () { if (App.guide) App.endGuideByPlayer(); else App.startGuide(); },
    'dismiss-wrong': function () { App.hideWrongCard(); var st = doc.getElementById('stage'); if (App.stage) App.stage.focusFirst(); else if (st) st.focus(); },
    difficulty: function () { App.pickDifficulty(function () { App.refresh(); App.toast('Difficulty: ' + diffName(App.save.difficulty) + '. It applies from your next attempt.', 'info'); }); },
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
      OBEY.audio.play('toggle', { off: !App.save.settings.sound });
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

  App.actions = ACTIONS;

  /** The sound a [data-act] click makes (2.3 E85); null when the action plays its own. */
  App.clickSound = function (b) {
    var act = b.getAttribute('data-act');
    if (act === 'toggle-sound' || act === 'toggle-setting') return null; // they play `toggle` with the new state
    if (act === 'costume') return 'wear';
    if (act === 'theme') return 'paint';
    if (act === 'open-level' && !P.canPlay(App.save, Number(b.getAttribute('data-level')))) return 'locked';
    return 'ui';
  };

  function onClick(e) {
    var b = e.target.closest('[data-act]');
    if (!b || b.tagName === 'INPUT') return;
    if (b.getAttribute('aria-disabled') === 'true' && b.getAttribute('data-act') !== 'open-level') return;
    var fn = ACTIONS[b.getAttribute('data-act')];
    if (!fn) return;
    e.preventDefault();
    var snd = App.clickSound(b);
    if (snd) OBEY.audio.play(snd);
    fn(b);
  }

  function onChange(e) {
    var t = e.target;
    if (t.getAttribute && t.getAttribute('data-act') === 'setting') {
      var k = t.getAttribute('data-key');
      if (k === 'difficulty') {
        P.setDifficulty(App.save, t.value);
        App.toast('Difficulty: ' + diffName(t.value) + '. It applies from your next attempt.', 'info');
      } else if (t.type === 'range' || t.type === 'number') {
        App.save.settings[k] = Math.max(0, Math.min(100, Math.round(Number(t.value) || 0)));
      } else if (t.type === 'checkbox') {
        App.save.settings[k] = !!t.checked;
      } else {
        App.save.settings[k] = t.value;
      }
      App.persist(); App.applySettings();
      if (App.onSettingChanged) App.onSettingChanged(k, t);
      if (k === 'voice') { OBEY.audio.unlock(); App.speakLine(t.value === 'off' ? '' : 'Testing, testing. This is my voice. Magnificent, isn\'t it?', 'pleased'); }
    }
  }

  function onKey(e) {
    if (e.key === 'Escape' && App.screen === 'level' && App.stage && !doc.querySelector('.modal-backdrop')) {
      if (App.stage.held) App.stage.cancelPick();
    }
    if (App.shortcut) App.shortcut(e);
  }

  /* ------------------------------------------------------------------- boot */
  function boot() {
    var storage = null;
    try { storage = root.localStorage; } catch (e) { storage = null; }
    App.storage = storage;
    App.slot = App.activeSlot ? App.activeSlot() : 1;
    App.store = OBEY.save.createStore(storage, OBEY.save.keyFor(App.slot));
    var res = App.store.load();
    App.save = res.data;
    App.loadStatus = res.status;
    // Re-grant anything earned under rules that changed between versions.
    var ev = P.evaluate(App.save);
    if (ev.length || res.status === 'new') App.persist();
    if (App.beforeFirstRender) App.beforeFirstRender(res);
    App.applySettings();
    if (mq && mq.addEventListener) mq.addEventListener('change', App.applySettings);

    // Browsers only allow audio after a gesture.
    // iOS/iPadOS need the audio context created and resumed inside a touchend/click.
    // Keep priming on every gesture until the context really runs (iOS ignores pointerdown).
    var unlock = function () {
      OBEY.audio.prime();
      if (!OBEY.audio.running() && OBEY.audio.isEnabled()) return;
      ['pointerdown', 'keydown', 'touchend', 'click'].forEach(function (t) { doc.removeEventListener(t, unlock, true); });
    };
    ['pointerdown', 'keydown', 'touchend', 'click'].forEach(function (t) { doc.addEventListener(t, unlock, true); });

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
    if (App.afterBoot) App.afterBoot(res);
  }
  App.boot = boot;

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
      persistent: function () { return App.store.persistent; },
      guide: function () { return App.guide ? { i: App.guide.i, steps: App.guide.steps.length } : null; },
      attempt: function () { return App.att ? U.clone(App.att) : null; },
      slot: function () { return App.slot; },
      sounds: sounds,
      spoken: spoken
    };
  }
  var sounds = [], spoken = [];
  if (/[?&]test=1\b/.test(root.location.search)) {
    // Record which sounds/voice lines the game asks for (tests can't hear audio).
    var origPlay = OBEY.audio.play, origSpeak = OBEY.audio.speak;
    OBEY.audio.play = function (name) { sounds.push(name); if (sounds.length > 300) sounds.shift(); return origPlay.apply(this, arguments); };
    OBEY.audio.speak = function (text, costume, mood) { spoken.push({ text: text, costume: costume, mood: mood, mode: OBEY.audio.voiceMode() }); if (spoken.length > 100) spoken.shift(); return origSpeak.apply(this, arguments); };
  }

  OBEY.app = App;
  // Booting happens in app-extra.js (loaded last), so every feature is in place first.
})(window);
