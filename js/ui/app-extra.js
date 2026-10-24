/* OBEY? LOL. — 2.1 features layered on the app controller: narrator asides (idle, replay, callbacks,
 * phone calls, "let me finish"), ruins, jigsaw pieces, the U.N.D.O. sidekick, chapter cards and
 * reviews, the fake game over, the Daily Dare, sharing, profiles, save codes, keyboard shortcuts,
 * captions, haptics, chapter music, the installable/offline app, and booting. Loaded last. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, App = OBEY.app, X = OBEY.extras, P = OBEY.progress, A = OBEY.art, E = OBEY.util.escape;
  var doc = root.document;
  var TEST = /[?&]test=1\b/.test(root.location.search);

  function counters() { return App.save.counters; }
  function pick(list) { return list[Math.floor(Math.random() * list.length) % list.length]; }

  /* --------------------------------------------------------------- asides */
  /** Shows a short line under Bossworth's bubble. opts: { button: label, act, kind } */
  App.setAside = function (text, opts) {
    var el = doc.getElementById('aside');
    if (!el) return;
    opts = opts || {};
    el.className = 'aside' + (opts.kind ? ' aside-' + opts.kind : '');
    el.innerHTML = E(text) + (opts.button ? ' <button class="btn small-btn" data-act="' + opts.act + '">' + E(opts.button) + '</button>' : '');
    el.hidden = false;
  };

  App.armIdleAsides = function () {
    (App.idleAsideTimers || []).forEach(clearTimeout);
    App.idleAsideTimers = [15000, 40000, 90000].map(function (ms, tier) {
      return setTimeout(function () {
        var rt = App.runtime;
        if (!rt || rt.status !== 'playing' || App.guide || App.screen !== 'level') return;
        App.setAside(pick(X.IDLE[tier]), { kind: 'idle' });
      }, ms);
    });
  };

  /* ------------------------------------------------------------ level visit */
  App.levelStarted = function (n) {
    var s = App.save, rt = App.runtime;
    App.visit = { n: n, tipShown: false, finishShown: false, timers: [] };
    if (App.dare && App.dare.n !== n) App.dare = null;
    App.renderComposure();
    // Chapter title card (first visit to a chapter's first level).
    var ch = OBEY.chapterOf(n);
    if (ch && ch.levels[0] === n && counters().cards.indexOf(ch.id) < 0) {
      counters().cards.push(ch.id);
      App.persist();
      App.chapterCard('Chapter ' + (OBEY.CHAPTERS.indexOf(ch) + 1), ch.name, OBEY.CHAPTERS.indexOf(ch));
    }
    if (App.dare && App.dare.n === n) App.setAside('Daily Dare: finish at par (' + rt.def.par + ' actions) with no hints and no traps.', { kind: 'dare' });
    else {
      var line = X.openingAside(s, n, { replay: rt.ctx.replay });
      if (line) App.setAside(line);
    }
    App.startUndo(n);
    // Bossworth sometimes takes a phone call and ignores you (never in the first levels or bonus pack).
    if (!OBEY.isBonus(n) && n > 3 && !TEST && Math.random() < 0.18) App.schedulePhone();
    if (s.settings.timer) {
      App.timerInt = setInterval(function () {
        var el = doc.getElementById('run-timer');
        if (!el || !App.att || !App.runtime || App.runtime.status !== 'playing') return;
        el.textContent = App.formatTime(Date.now() - App.att.start, true);
      }, 100);
    }
    App.syncMusic();
  };

  App.levelLeft = function () {
    if (App.visit) App.visit.timers.forEach(clearTimeout);
    (App.idleAsideTimers || []).forEach(clearTimeout);
    clearInterval(App.timerInt);
    clearTimeout(App.fxTimer);
    var fx = doc.getElementById('fx-layer');
    if (fx) fx.innerHTML = '';
    App.visit = null;
    setTimeout(App.syncMusic, 0);
  };

  App.formatTime = function (ms, tenths) {
    var t = Math.max(0, ms) / 1000, m = Math.floor(t / 60), sec = t - m * 60;
    return m + ':' + (sec < 10 ? '0' : '') + (tenths ? sec.toFixed(1) : Math.floor(sec));
  };

  App.renderComposure = function () {
    var el = doc.getElementById('composure');
    if (!el) return;
    var v = X.composure(App.save), tier = X.composureTier(v);
    var post = P.isCompleted(App.save, OBEY.LEVEL_COUNT);
    el.innerHTML = '<span class="small">Bossworth\'s composure: <b>' + (post ? 'recovering' : tier) + '</b></span>' +
      '<div class="bar small comp-' + tier + '" role="progressbar" aria-label="Bossworth\'s composure" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + v + '"><span style="width:' + v + '%"></span></div>';
  };

  App.schedulePhone = function () {
    var lines = pick(X.PHONE), v = App.visit;
    v.timers.push(setTimeout(function () {
      if (!App.runtime || App.runtime.status !== 'playing' || App.guide) return;
      OBEY.audio.play('phone');
      App.setAside(lines[0], { kind: 'phone' });
      counters().phoneCalls++;
      v.timers.push(setTimeout(function () { if (App.visit === v) App.setAside(lines[1], { kind: 'phone' }); }, 3500));
    }, 9000));
  };

  /* 2.3 E54/E66: each pack family has a landmark icon (drawn by art-extra.js). Chapter indexes are 0-based. */
  App.landmarkIcon = function (chIndex) {
    // One source of truth: art-extra.js maps chapters to pack landmarks (the finale by its id).
    return chIndex >= 0 && A.chapterIcon ? A.chapterIcon(chIndex) || null : null;
  };
  /** The icon's SVG, or '' when that icon has not been drawn (an empty <svg> is not shown). */
  App.landmarkSvg = function (chIndex, cls) {
    var k = App.landmarkIcon(chIndex);
    if (!k) return '';
    var svg = A.icon(k, cls);
    return /<svg[^>]*><\/svg>$/.test(svg) ? '' : svg;
  };

  App.chapterCard = function (kicker, title, chIndex) {
    var fx = doc.getElementById('fx-layer');
    App.playReward('chapter');
    var icon = typeof chIndex === 'number' ? App.landmarkSvg(chIndex, 'cc-icon') : '';
    fx.innerHTML = '<div class="chapter-card' + (icon ? ' has-icon' : '') + '">' + icon +
      '<span class="cc-kicker cc-stamp">' + E(kicker) + '</span><span class="cc-title">' + E(title) + '</span></div>';
    clearTimeout(App.fxTimer);
    App.fxTimer = setTimeout(function () { fx.innerHTML = ''; }, 1900);
  };

  /* ------------------------------------------------------------- U.N.D.O. */
  App.startUndo = function (n) {
    var box = doc.getElementById('undo-chat');
    if (!box) return;
    box.innerHTML = '<p class="undo-head">' + A.undoBot(true) + '<b>U.N.D.O.</b> <span class="small">sidekick program</span>' +
      '<button class="btn small-btn" data-act="toggle-undo" aria-expanded="true">Hide</button></p><ol class="undo-log" aria-live="polite"></ol>';
    var c = counters();
    var msgs = X.undoMessages(App.save, n, c.chats);
    var ch = OBEY.chapterOf(n);
    if (msgs.length) {
      c.undoMet = true;
      if (ch && X.UNDO_CHATS[ch.id] && c.chats.indexOf(ch.id) < 0) c.chats.push(ch.id);
      App.persist();
    }
    msgs.forEach(function (m, i) {
      App.visit.timers.push(setTimeout(function () { App.undoSay(m.who, m.text, m.leak); }, 400 + i * 900));
    });
    if (!msgs.length) App.undoSay('U.N.D.O.', pick(['Watching. Taking notes. Mostly about him.', 'I\'m here if you want to break something.', 'Bossworth thinks I\'m uninstalled. Shh.']));
    // A sabotage tip after a while, even without mistakes.
    App.visit.timers.push(setTimeout(App.undoTip, 20000));
  };

  App.undoSay = function (who, text, leak) {
    var log = doc.querySelector('#undo-chat .undo-log');
    if (!log) return;
    // 2.3 E84: U.N.D.O. bleeps on each of its messages; a leaked chat glitches once as it starts.
    var last = log.lastElementChild;
    if (!leak) OBEY.audio.play('undo');
    else if (!last || !last.classList.contains('leak')) OBEY.audio.play('glitch');
    var li = doc.createElement('li');
    li.className = 'undo-msg' + (leak ? ' leak' : '') + (who === 'U.N.D.O.' ? ' from-undo' : '');
    li.innerHTML = '<b>' + E(who) + ':</b> ' + E(text);
    log.appendChild(li);
    while (log.children.length > 8) log.removeChild(log.firstChild);
    log.scrollTop = log.scrollHeight; // 2.3 E71: keep the newest message in view
    var box = doc.getElementById('undo-chat');
    box.classList.remove('glitch'); void box.offsetWidth; box.classList.add('glitch');
  };

  App.undoTip = function () {
    if (!App.visit || App.visit.tipShown || !doc.getElementById('undo-chat')) return;
    if (!App.runtime || App.runtime.status !== 'playing') return;
    var tip = X.undoTip(App.save, App.levelNum);
    if (!tip) return;
    App.visit.tipShown = true;
    App.undoSay('U.N.D.O.', 'Psst. ' + tip);
  };

  /* ------------------------------------------------------- jigsaw pieces */
  function jigsawHere() {
    var j = X.jigsawFor(App.levelNum);
    var rt = App.runtime;
    if (!j || !rt || !rt.ctx.replay || App.save.jigsaw.indexOf(j.id) >= 0 || rt.guided) return null;
    return j;
  }
  App.extraObjects = function () {
    var j = jigsawHere();
    if (!j) return [];
    var num = X.JIGSAW_IDS.indexOf(j.id) + 1;
    return [OBEY.obj(j.id, j.x, j.y, 9, 9, { art: 'jigsaw', artOpts: { n: num }, label: 'A small jigsaw piece', cls: 'jigsaw-piece' })];
  };
  App.handleExtraTap = function (a) {
    if (App.att) App.att.pre = { at: App.lineStartedAt || 0, text: App.runtime ? App.runtime.line : '' };
    if (!/^jig-/.test(a.target || '')) return false;
    if (a.type !== 'tap') return true;
    var ev = P.discoverJigsaw(App.save, a.target);
    if (ev.length) { App.persist(); App.announce(ev); App.renderLevel(); }
    return true;
  };

  /* -------------------------------------------------- after every action */
  App.afterDispatch = function (a, accepted) {
    var rt = App.runtime, att = App.att;
    if (!rt || !att) return;
    if (accepted && a.type === 'tap') att.taps[a.target] = (att.taps[a.target] || 0) + 1;
    if (accepted && a.target === 'narrator' && a.type === 'tap') {
      counters().pokes++;
      var ev = P.evaluate(App.save);
      App.persist();
      if (ev.length) App.announce(ev);
    }
    if (rt.status !== 'playing') return;
    // "Let me finish!" — acting while a long line is still being spoken.
    var pre = att.pre;
    if (accepted && a.target !== 'narrator' && App.visit && !App.visit.finishShown && pre && pre.text && pre.text.length > 70 &&
      Date.now() - pre.at < Math.min(2500, OBEY.audio.talkTime(pre.text) * 0.6) && !App.guide) {
      App.visit.finishShown = true;
      App.setAside(pick(X.FINISH), { kind: 'finish' });
    }
    // Track progress through the intended solution; Easy sparkles only on the right next move.
    if (accepted && App.matchesNextStep(a)) {
      att.solIdx = (att.solIdx || 0) + 1;
      if (App.save.difficulty === 'easy' && !App.guide && !rt.guided) { App.stage.warm(a.target); OBEY.audio.play('warmer'); }
    }
    // Ruins: deliberately terrible ways to finish.
    if (!App.guide && !rt.guided) {
      var r = X.ruinTriggered(App.levelNum, { taps: att.taps, fails: rt.stats.fails, nopes: rt.nopes });
      if (r) { OBEY.audio.play('ruin'); rt.api.complete({ ruin: r.id, line: r.line, mood: 'panicked' }); }
    }
  };

  /** The next step of the intended solution the player hasn't done yet (waits are skipped). */
  App.nextSolutionStep = function () {
    var rt = App.runtime, steps = (rt && rt.def.solution) || [], i = (App.att && App.att.solIdx) || 0;
    while (steps[i] && steps[i].wait) i++;
    return steps[i] || null;
  };
  App.matchesNextStep = function (a) {
    var rt = App.runtime, att = App.att;
    if (!rt || !att) return false;
    var steps = rt.def.solution || [], i = att.solIdx || 0;
    while (steps[i] && steps[i].wait) { i++; att.solIdx = i; }
    var st = steps[i];
    if (!st) return false;
    if (st.tap) return a.type === 'tap' && a.target === st.tap;
    if (st.drop) return a.type === 'drop' && a.target === st.drop[0] && a.zone === st.drop[1];
    if (st.hold) return a.type === 'holdend' && a.target === st.hold[0] && (a.ms || 0) >= st.hold[1] - 150;
    return false;
  };

  function maybeNudge() {
    var rt = App.runtime, att = App.att;
    if (!rt || !att || att.nudged || App.guide || rt.status !== 'playing') return;
    if (rt.hintIndex >= rt.hintLimit()) return;
    if (rt.stats.fails >= 2 || rt.nopes >= 3) { att.nudged = true; App.setAside(X.NUDGE, { button: 'Show a hint', act: 'hint', kind: 'nudge' }); }
  }

  App.afterFail = function () {
    if (App.att) App.att.solIdx = 0; // a trap resets the room
    maybeNudge();
    App.undoTip();
    var rt = App.runtime;
    var hasFailRuin = X.ruinsFor(App.levelNum).some(function (r) { return r.trigger && r.trigger.type === 'fails'; });
    if (rt && rt.stats.fails >= 3 && !counters().fakeOver && !App.guide && !rt.guided && !hasFailRuin) {
      counters().fakeOver = true;
      App.persist();
      App.fakeGameOver();
    }
  };
  App.afterNope = function () { maybeNudge(); if (App.runtime && App.runtime.nopes >= 2) App.undoTip(); };

  App.fakeGameOver = function () {
    var fx = doc.getElementById('fx-layer');
    OBEY.audio.play('gameover');
    fx.innerHTML = '<div class="fake-over"><p class="fo-title">GAME OVER</p><p class="fo-sub">Intern #' + (App.save.intern || 17) + ', you\'re fired.</p></div>';
    clearTimeout(App.fxTimer);
    App.fxTimer = setTimeout(function () {
      var sub = fx.querySelector('.fo-sub');
      if (sub) sub.textContent = '…Just kidding. HR says I\'m not allowed to fire interns. Carry on.';
      App.fxTimer = setTimeout(function () { fx.innerHTML = ''; }, 1800);
    }, 1700);
    App.setAside('GAME OVER! …Just kidding. You can keep playing. Unfortunately.', { kind: 'phone' });
  };

  /* ------------------------------------------------------ level complete */
  App.afterComplete = function (r) {
    var s = App.save, c = counters(), ev = [];
    c.playMs += Math.max(0, r.timeMs || 0);
    if (new Date().getDay() === 2) c.tuesday = true;
    if (App.dare && App.dare.n === r.level && App.dare.key === X.dateKey()) {
      r.dare = X.dareMet(r) ? 'met' : 'missed';
      if (r.dare === 'met') { ev = ev.concat(X.recordDare(s, App.dare.key)); r.dareStreak = s.daily.streak; }
    }
    var ch = OBEY.isBonus(r.level) ? null : OBEY.chapterOf(r.level);
    if (ch && ch.levels.every(function (n) { return P.isCompleted(s, n); }) && c.roasted.indexOf(ch.id) < 0) {
      c.roasted.push(ch.id);
      r.roast = X.chapterRoast(s, ch.id);
      setTimeout(function () { App.playReward('chapter'); }, 700);
    }
    return ev.concat(P.evaluate(s));
  };

  App.completeExtras = function (r, events) {
    var s = App.save, top = '', bottom = '', buttons = '';
    var lev = events.filter(function (e) { return e.type === 'level'; })[0] || {};
    var ruinsHere = X.ruinsFor(r.level).map(function (x) { return x.id; });
    var firstClean = events.some(function (e) { return e.type === 'clean-first'; });
    if (r.ruin && s.clean.indexOf(r.level) >= 0) top += '<p class="bonus-line"><b>Bossworth:</b> You did this one PROPERLY before. And now you come back… to RUIN it?</p>';
    else if (!r.ruin && !r.guided && firstClean && !lev.firstTime && ruinsHere.some(function (id) { return s.ruins.indexOf(id) >= 0; })) top += '<p class="bonus-line"><b>Bossworth:</b> You did it properly this time. After what you did before. …Thank you. I mean it.</p>';
    if (!r.ruin && X.trickFor(r.level)) top += '<p class="trick"><b>The trick:</b> ' + E(X.trickFor(r.level)) + '</p>';
    if (r.ruin) top += '<p class="trick"><b>U.N.D.O.:</b> Ruin logged in your Sabotage file. ' + s.ruins.length + ' of ' + X.RUINS.length + ' found.</p>';
    var ba = s.bestActions[r.level], bt = s.bestTime[r.level];
    var bests = events.filter(function (e) { return e.type === 'best'; });
    if (ba !== undefined || bt !== undefined) {
      top += '<p class="small bests">Personal best: ' + (ba !== undefined ? ba + (ba === 1 ? ' action' : ' actions') : '') + (bt !== undefined ? ' · ' + App.formatTime(bt, true) : '') +
        (bests.length ? ' — <b>new best ' + bests.map(function (b) { return b.what; }).join(' and ') + '!</b>' : '') + '</p>';
    }
    if (r.roast) bottom += '<div class="roast"><p><b>' + E(r.roast) + '</b></p></div>';
    if (r.dare === 'met') bottom += '<p class="dare-result ok">Daily Dare complete! Streak: ' + r.dareStreak + ' day' + (r.dareStreak === 1 ? '' : 's') + '. <button class="btn small-btn" data-act="share-dare">Share</button></p>';
    if (r.dare === 'missed') bottom += '<p class="dare-result">Daily Dare not met (it needs ' + r.par + ' actions or fewer, no hints, no traps). Replay to try again.</p>';
    buttons += '<button class="btn" data-act="share-result">' + A.icon('share') + 'Share</button>';
    if (!OBEY.isBonus(r.level) && r.difficulty !== 'hard' && !r.ending) {
      var harder = r.difficulty === 'easy' ? 'medium' : 'hard';
      buttons += '<button class="btn" data-act="harder" data-d="' + harder + '">Replay on ' + App.diffName(harder) + '</button>';
    }
    App.lastResult = r;
    return { top: top, bottom: bottom, buttons: buttons };
  };

  /* ------------------------------------------------------------- sharing */
  App.share = function (text, what) {
    var done = function () { App.toast((what || 'Result') + ' copied. Paste it anywhere.', 'info'); };
    if (root.navigator.share && root.matchMedia && root.matchMedia('(pointer: coarse)').matches) {
      root.navigator.share({ text: text }).catch(function () { /* cancelled */ });
      return;
    }
    if (root.navigator.clipboard && root.navigator.clipboard.writeText) {
      root.navigator.clipboard.writeText(text).then(done, function () { App.showTextModal('Copy this', text); });
      return;
    }
    App.showTextModal('Copy this', text);
  };

  /** A modal with read-only text selected for copying. */
  App.showTextModal = function (title, text) {
    var rootEl = doc.getElementById('modal-root'), prev = doc.activeElement;
    var wrap = doc.createElement('div');
    wrap.className = 'modal-backdrop';
    wrap.innerHTML = '<div class="modal panel" role="dialog" aria-modal="true" aria-labelledby="tm-title"><h2 id="tm-title">' + E(title) + '</h2>' +
      '<textarea class="code-box" id="tm-text" readonly rows="5" aria-label="' + E(title) + '"></textarea><div class="btn-row"><button class="btn primary" data-tm="close">Done</button></div></div>';
    rootEl.appendChild(wrap);
    App.inertApp(true);
    var ta = wrap.querySelector('textarea');
    ta.value = text; ta.focus(); ta.select();
    function close() { App.removeOverlayCloser(close); wrap.remove(); App.inertApp(false); doc.removeEventListener('keydown', key, true); if (prev && prev.focus && doc.contains(prev)) prev.focus(); }
    function key(e) { if (App.isTopModal(wrap) && e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); } }
    App.addOverlayCloser(close);
    doc.addEventListener('keydown', key, true);
    wrap.addEventListener('click', function (e) { if (e.target.closest('[data-tm]') || e.target === wrap) close(); });
  };

  App.copySaveCode = function () { App.share(X.exportCode(App.save), 'Save code'); };

  /* ------------------------------------------------------------- profiles */
  App.activeSlot = function () {
    try { var v = Number(root.localStorage.getItem(OBEY.save.ACTIVE_KEY)); return v >= 1 && v <= OBEY.save.PROFILES ? v : 1; } catch (e) { return 1; }
  };
  App.profileSummary = function (slot) {
    var data = slot === App.slot ? App.save : App.store.peek(OBEY.save.keyFor(slot));
    if (!data) return { slot: slot, name: 'Player ' + slot, empty: true, done: 0, stars: 0 };
    return { slot: slot, name: data.profileName || 'Player ' + slot, empty: false, done: data.completed.length, stars: P.totalStars(data) };
  };
  App.switchProfile = function (slot) {
    slot = Number(slot);
    if (!(slot >= 1 && slot <= OBEY.save.PROFILES) || slot === App.slot) return;
    App.persist();
    try { root.localStorage.setItem(OBEY.save.ACTIVE_KEY, String(slot)); } catch (e) { /* memory only */ }
    App.slot = slot;
    App.store = OBEY.save.createStore(App.storage, OBEY.save.keyFor(slot));
    var res = App.store.load();
    App.save = res.data;
    App.loadStatus = res.status;
    App.dare = null;
    App.lastLevel = null;
    App.beforeFirstRender(res);
    App.persist();
    App.applySettings();
    App.toast('Now playing as ' + (App.save.profileName || 'Player ' + slot) + '.', 'info');
    if (res.status === 'recovered') App.toast('That player\'s save could not be read, so a fresh one was started. The damaged copy was kept.', 'warn');
    App.go('menu');
  };

  /* ------------------------------------------------------- boot additions */
  App.beforeFirstRender = function (res) {
    var s = App.save, c = s.counters;
    if (!s.intern) s.intern = 10 + Math.floor(Math.random() * 90);
    var now = Date.now();
    if (c.lastSeen) c.awayDays = Math.max(c.awayDays, Math.floor((now - c.lastSeen) / 86400000));
    c.lastSeen = now;
    if (new Date().getDay() === 2) c.tuesday = true;
    if (res && res.status === 'new') s.seenVersion = OBEY.VERSION;
    var ev = P.evaluate(s);
    App.persist();
    if (ev.length) setTimeout(function () { App.announce(ev); }, 900);
  };

  App.onScreen = function (name) {
    var c = counters();
    if (name === 'settings') c.settingsOpens++;
    if (name === 'credits') c.creditsViews++;
    if (name === 'settings' || name === 'credits') {
      var ev = P.evaluate(App.save);
      App.persist();
      if (ev.length) App.announce(ev);
    }
    if (name !== 'level') setTimeout(App.syncMusic, 0);
  };

  App.syncMusic = function () {
    var st = App.save && App.save.settings;
    if (!st) return;
    // 2.5: music plays on every screen except the endings (they have their own moment). In a level it is that
    // chapter's tune; elsewhere it is the tune of the chapter you are up to, so the map sounds like where you are.
    var inLevel = App.screen === 'level' && App.levelNum;
    var want = st.music && st.sound && !doc.hidden && App.screen && App.screen !== 'ending';
    if (want) {
      var n = inLevel ? App.levelNum : (P.nextLevel(App.save) || OBEY.LEVEL_COUNT);
      // 2.3 E76: the bonus pack has its own "studio" loop (-1) instead of borrowing chapter 9's.
      var ch = OBEY.isBonus(n) ? -1 : Math.max(0, OBEY.CHAPTERS.indexOf(OBEY.chapterOf(n)));
      if (OBEY.audio.musicOn() && OBEY.audio.musicChapter() !== ch) OBEY.audio.stopMusic();
      if (!OBEY.audio.musicOn()) OBEY.audio.startMusic(ch);
    } else OBEY.audio.stopMusic();
  };

  App.buzz = function (pattern) {
    if (!App.save.settings.haptics || !root.navigator.vibrate) return;
    try { root.navigator.vibrate(pattern); } catch (e) { /* unsupported */ }
  };

  function showCaption(name) {
    if (!App.save || !App.save.settings.captions || !X.CAPTIONS[name]) return;
    var el = doc.getElementById('captions');
    if (!el) return;
    // Keep the last two captions, so a sound that follows another doesn't hide it.
    var now = Date.now(), text = '[' + X.CAPTIONS[name] + ']';
    var recent = (App.capRecent || []).filter(function (c) { return now - c.at < 1800 && c.text !== text; });
    recent.push({ text: text, at: now }); // a repeat (e.g. three star chimes) refreshes instead of stacking
    App.capRecent = recent.slice(-2);
    el.textContent = App.capRecent.map(function (c) { return c.text; }).join(' ');
    el.hidden = false;
    clearTimeout(App.capTimer);
    App.capTimer = setTimeout(function () { el.hidden = true; }, 1800);
  }

  App.afterBoot = function () {
    OBEY.audio.setOnPlay(showCaption);
    // Keep saves safe from automatic clean-up where the browser allows it (e.g. Safari's storage eviction).
    if (root.navigator.storage && root.navigator.storage.persist && !TEST) {
      try { root.navigator.storage.persist().catch(function () { /* not granted */ }); } catch (e) { /* ignore */ }
    }
    doc.addEventListener('visibilitychange', function () {
      if (doc.hidden) { OBEY.audio.stopMusic(); } else { OBEY.audio.resume(); App.syncMusic(); }
    });
    doc.addEventListener('change', function (e) {
      var t = e.target;
      if (t && t.id === 'profile-name') {
        App.save.profileName = String(t.value || '').replace(/[\u0000-\u001f]/g, '').trim().slice(0, 20);
        App.persist();
        App.toast('Name saved: ' + (App.save.profileName || 'Player ' + App.slot) + '.', 'info');
      }
    });
    doc.addEventListener('input', function (e) {
      var t = e.target;
      if (t && t.type === 'range' && t.nextElementSibling && t.nextElementSibling.tagName === 'OUTPUT') t.nextElementSibling.textContent = t.value + '%';
    });
    App.installPwa();
  };

  /* ---------------------------------------------- installable / offline app */
  App.installPwa = function () {
    var proto = root.location.protocol;
    var swOk = /[?&]sw=1\b/.test(root.location.search) || (!TEST && (proto === 'https:' || /^(localhost|127\.0\.0\.1)$/.test(root.location.hostname)));
    if (proto !== 'http:' && proto !== 'https:') return; // file:// has no manifest or service worker
    var link = doc.createElement('link');
    link.rel = 'manifest'; link.href = 'manifest.webmanifest';
    doc.head.appendChild(link);
    if (!swOk || !root.navigator.serviceWorker) return;
    root.navigator.serviceWorker.register('sw.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var w = reg.installing;
        if (!w) return;
        w.addEventListener('statechange', function () {
          if (w.state === 'installed' && root.navigator.serviceWorker.controller) App.toast('A new version was downloaded. It will be used the next time you open the game.', 'info');
        });
      });
    }).catch(function () { /* offline install not available */ });
  };

  /* ------------------------------------------------------ keyboard shortcuts */
  var KEYS = [['S', 'Sound & music controls'], ['H', 'Hint'], ['R', 'Restart the level'], ['G', 'Show me how (when unlocked)'], ['M', 'Map'], ['N', 'Next level (on the completion card)'], ['Esc', 'Put down a held item / close a dialog'], ['Arrow keys', 'Move between levels on the map'], ['?', 'This list']];
  App.shortcut = function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (doc.querySelector('.modal-backdrop')) return;
    var k = e.key;
    if (k === '?') { e.preventDefault(); return App.keysHelp(); }
    if ((k === 's' || k === 'S') && App.screen !== 'ending') { e.preventDefault(); return App.soundPanel(); }
    if (App.screen === 'map' && /^Arrow/.test(k) && t && t.classList && t.classList.contains('map-node')) {
      var nodes = Array.prototype.slice.call(doc.querySelectorAll('#screen-map .map-node'));
      var i = nodes.indexOf(t), d = (k === 'ArrowDown' || k === 'ArrowRight') ? 1 : -1;
      var nx = nodes[Math.max(0, Math.min(nodes.length - 1, i + d))];
      if (nx) { e.preventDefault(); nx.focus(); nx.scrollIntoView({ block: 'nearest' }); }
      return;
    }
    if (App.screen !== 'level') return;
    var complete = doc.getElementById('complete');
    if (complete && !complete.hidden) {
      if (k === 'n' || k === 'N') { var nb = complete.querySelector('[data-act="open-level"]'); if (nb) { e.preventDefault(); nb.click(); } }
      return;
    }
    var map = { h: 'hint-btn', g: 'guide-btn' };
    var lk = k.toLowerCase();
    if (map[lk]) { e.preventDefault(); doc.getElementById(map[lk]).click(); }
    else if (lk === 'r') { e.preventDefault(); App.restartLevel(); }
    else if (lk === 'm') { e.preventDefault(); App.go('map'); }
  };
  App.keysHelp = function () {
    App.showInfo('Keyboard shortcuts', '<table class="keys"><tbody>' + KEYS.map(function (k) { return '<tr><th scope="row"><kbd>' + E(k[0]) + '</kbd></th><td>' + E(k[1]) + '</td></tr>'; }).join('') + '</tbody></table>');
  };
  /** A simple information dialog with trusted HTML content. */
  App.showInfo = function (title, html) {
    var rootEl = doc.getElementById('modal-root'), prev = doc.activeElement;
    var wrap = doc.createElement('div');
    wrap.className = 'modal-backdrop';
    wrap.innerHTML = '<div class="modal panel" role="dialog" aria-modal="true" aria-labelledby="info-title"><h2 id="info-title">' + E(title) + '</h2>' + html + '<div class="btn-row"><button class="btn primary" data-info="close">Close</button></div></div>';
    rootEl.appendChild(wrap);
    App.inertApp(true);
    wrap.querySelector('[data-info]').focus();
    function close() { App.removeOverlayCloser(close); wrap.remove(); App.inertApp(false); doc.removeEventListener('keydown', key, true); if (prev && prev.focus && doc.contains(prev)) prev.focus(); }
    function key(e) { if (App.isTopModal(wrap) && e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); } }
    App.addOverlayCloser(close);
    doc.addEventListener('keydown', key, true);
    wrap.addEventListener('click', function (e) { if (e.target.closest('[data-info]') || e.target === wrap) close(); });
  };

  App.onSettingChanged = function (k, t) {
    if (k === 'honesty') App.toast('Honesty set to ' + t.value + '%. Noted. Ignored.', 'info');
    if (k === 'music') App.syncMusic();
  };

  /* ---------------------------------------------------------------- actions */
  var ACT = App.actions;
  ACT.skip = function () {
    var n = App.levelNum, why = P.skipBlocker(App.save, n);
    if (why) { App.toast(why, 'warn'); return; }
    App.confirm({ title: 'Skip ' + OBEY.levelLabel(n) + '?', body: 'Bossworth will pretend this never happened. The next level unlocks, and this one stays on the map marked "skipped" so you can solve it later. You can have up to ' + P.MAX_SKIPS + ' skipped levels at once.', ok: 'Let it be' })
      .then(function (yes) {
        if (!yes) return;
        if (!App.runtime || App.runtime.status !== 'playing' || App.levelNum !== n) { App.toast('No need — the level is already finished.', 'info'); return; }
        P.skipLevel(App.save, n);
        App.persist();
        App.toast(OBEY.levelLabel(n) + ' skipped. It will wait for you.', 'info');
        App.go('level/' + (n + 1));
      });
  };
  ACT['share-result'] = function () { var r = App.lastResult; if (r) App.share(X.shareLevel(r, OBEY.getLevel(r.level))); };
  ACT['share-dare'] = function () { var r = App.lastResult; if (r && App.dare) App.share(X.shareDare(App.dare.key, r.level, App.save.daily.streak), 'Daily Dare result'); };
  ACT['share-ending'] = function (b) { App.share(X.shareEnding(App.save, b.getAttribute('data-id')), 'Ending'); };
  ACT.harder = function (b) {
    P.setDifficulty(App.save, b.getAttribute('data-d'));
    App.persist();
    App.toast('Difficulty: ' + App.diffName(App.save.difficulty) + '.', 'info');
    App.show('level', App.levelNum);
  };
  ACT['daily-play'] = function () {
    var key = X.dateKey(), d = X.dareFor(App.save, key);
    if (d.practice) { App.save.daily.practice = { key: key, n: d.n }; App.persist(); }
    App.dare = { key: key, n: d.n, practice: d.practice };
    App.go('level/' + App.dare.n);
  };
  ACT['copy-code'] = function () { App.copySaveCode(); };
  ACT['load-code'] = function () {
    var ta = doc.getElementById('import-code');
    var res = X.importCode(ta ? ta.value : '');
    if (!res.ok) { App.toast(res.error, 'warn'); return; }
    App.confirm({ title: 'Load this save?', body: 'This replaces the progress of ' + (App.save.profileName || 'Player ' + App.slot) + ' in this browser with the save from the code: ' + res.data.completed.length + ' levels, ' + P.totalStars(res.data) + ' stars.', ok: 'Load save', danger: true })
      .then(function (yes) {
        if (!yes) return;
        App.save = res.data;
        App.persist(); App.applySettings();
        App.toast('Save loaded.', 'info');
        App.go('menu');
      });
  };
  ACT['switch-profile'] = function (b) { App.switchProfile(b.getAttribute('data-slot')); };
  ACT['keys-help'] = function () { App.keysHelp(); };
  ACT['dismiss-whatsnew'] = function () { App.save.seenVersion = OBEY.VERSION; App.persist(); App.refresh(); var p = doc.querySelector('.slip-primary'); if (p) p.focus(); };
  ACT['toggle-undo'] = function (b) {
    var box = doc.getElementById('undo-chat'), open = b.getAttribute('aria-expanded') === 'true';
    box.classList.toggle('collapsed', open);
    b.setAttribute('aria-expanded', String(!open));
    b.textContent = open ? 'Show' : 'Hide';
  };
  ACT['toggle-setting'] = function (b) {
    var k = b.getAttribute('data-key');
    App.save.settings[k] = !App.save.settings[k];
    OBEY.audio.play('toggle', { off: !App.save.settings[k] }); // 2.3 E85
    App.persist(); App.applySettings(); App.refresh();
    var again = doc.querySelector('[data-act="toggle-setting"][data-key="' + k + '"]');
    if (again) again.focus();
    if (k === 'facade') App.toast(App.save.settings[k] ? 'Cheerful façade restored. *smiles through teeth*' : 'Façade off. Bossworth is now visibly tired. (Nothing else changes.)', 'info');
  };
  // New Game and Reset offer to copy the save code first.
  var EXTRA = { label: 'Copy my save code first', note: 'Tip: copy your save code first if you might want this progress back.', onClick: function () { App.copySaveCode(); } };
  ACT['new-game'] = function () {
    if (!P.hasProgress(App.save)) return App.startCampaign(1, true);
    App.confirm({
      title: 'Start a new game?',
      body: 'Your levels, stars, secrets and choices will be reset. Achievements, trophies, costumes, themes, endings, your Sabotage file, Daily Dare streak and settings are kept. You will choose a difficulty next.',
      ok: 'Start new game', danger: true, extra: EXTRA
    }).then(function (yes) {
      if (!yes) return;
      App.save = P.newGame(App.save);
      App.persist(); App.applySettings();
      App.toast('New game started.', 'info');
      App.startCampaign(1, true);
    });
  };
  ACT['reset-all'] = function () {
    App.confirm({ title: 'Reset all progress?', body: 'This erases every level, star, secret, costume, theme, achievement and ending for this player. Settings are kept. This cannot be undone.', ok: 'Erase everything', danger: true, extra: EXTRA })
      .then(function (yes) {
        if (!yes) return;
        App.save = P.resetAll(App.save);
        App.persist(); App.applySettings();
        App.toast('All progress erased.', 'info');
        App.go('menu');
      });
  };


  /* ------------------------------------------------------- 2.5 sound & music */
  // A speaker chip on every screen's top bar (and a slip on the menu) opens a small panel with the sound
  // effects, Bossworth's voice and the music: switches, volumes and a test sound. Changes apply live and save.
  function soundState() {
    var st = App.save.settings;
    return !st.sound ? { icon: 'soundOff', text: 'Sound off' } : (st.music ? { icon: 'music', text: 'Sound and music on' } : { icon: 'sound', text: 'Sound on, music off' });
  }
  App.soundChip = function () {
    if (!App.save) return '';
    var st = soundState();
    return '<button class="chip-btn icon-only sound-chip" data-act="sound-panel" aria-haspopup="dialog" aria-keyshortcuts="S" aria-label="Sound and music (' + E(st.text.toLowerCase()) + ')" title="Sound & music (S)">' + A.icon(st.icon) + '</button>';
  };
  App.refreshSoundChips = function () {
    var st = soundState();
    Array.prototype.forEach.call(doc.querySelectorAll('.sound-chip'), function (b) {
      b.innerHTML = A.icon(st.icon);
      b.setAttribute('aria-label', 'Sound and music (' + st.text.toLowerCase() + ')');
    });
  };
  var VOICES = [['babble', 'Babble'], ['speech', 'Real speech'], ['off', 'Off']];
  App.soundPanel = function () {
    if (doc.querySelector('.sound-panel')) return;
    var rootEl = doc.getElementById('modal-root'), prev = doc.activeElement;
    OBEY.audio.unlock();
    var wrap = doc.createElement('div');
    wrap.className = 'modal-backdrop';
    function sw(key, label) {
      var on = !!App.save.settings[key];
      return '<button class="switch" role="switch" aria-checked="' + on + '" data-sp-toggle="' + key + '" aria-label="' + E(label) + '"><span class="knob"></span><span class="switch-text">' + (on ? 'On' : 'Off') + '</span></button>';
    }
    function slider(key, label) {
      var v = App.save.settings[key];
      return '<label class="slider"><span>' + E(label) + '</span><input type="range" min="0" max="100" step="5" value="' + v + '" data-sp-range="' + key + '" aria-label="' + E(label) + '"><output>' + v + '%</output></label>';
    }
    var st = App.save.settings;
    wrap.innerHTML = '<div class="modal panel sound-panel" role="dialog" aria-modal="true" aria-labelledby="sp-title">' +
      '<h2 id="sp-title">' + A.icon('music') + ' Sound &amp; music</h2>' +
      '<section class="sp-row"><div class="sp-head"><h3>Sound effects</h3>' + sw('sound', 'Sound effects') + '</div>' + slider('sfxVol', 'Effects volume') +
      '<button class="btn small-btn" data-sp-test="sfx">' + A.icon('play') + ' Test</button></section>' +
      '<section class="sp-row"><div class="sp-head"><h3>Bossworth\'s voice</h3></div><div class="sp-voices" role="radiogroup" aria-label="Voice">' +
      VOICES.map(function (v) { return '<label class="radio"><input type="radio" name="sp-voice" value="' + v[0] + '"' + (st.voice === v[0] ? ' checked' : '') + ' data-sp-voice><span>' + v[1] + '</span></label>'; }).join('') + '</div>' +
      slider('voiceVol', 'Voice volume') + '</section>' +
      '<section class="sp-row"><div class="sp-head"><h3>Music</h3>' + sw('music', 'Music') + '</div>' + slider('musicVol', 'Music volume') +
      '<p class="small sp-now" aria-live="polite"></p></section>' +
      '<p class="small">Every puzzle can be solved with sound off. More options (captions, vibration) are in Settings.</p>' +
      '<div class="btn-row"><button class="btn primary" data-sp-close>Done</button></div></div>';
    rootEl.appendChild(wrap);
    App.inertApp(true);
    var panel = wrap.querySelector('.sound-panel');
    function nowPlaying() {
      var el = panel.querySelector('.sp-now'), s2 = App.save.settings;
      if (!s2.sound) el.textContent = 'Sound effects are off, so the music is off too.';
      else if (!s2.music) el.textContent = 'Music is off.';
      else if (OBEY.audio.musicOn()) {
        var ch = OBEY.audio.musicChapter();
        var name = ch === -1 ? 'Sabotage Studio' : (OBEY.CHAPTERS[ch] ? OBEY.CHAPTERS[ch].name : '');
        el.textContent = 'Now playing: ' + (name ? name + ' theme' : 'the chapter theme') + '.';
      } else el.textContent = 'Music starts after your first tap and plays everywhere except the endings.';
    }
    function sync() {
      Array.prototype.forEach.call(panel.querySelectorAll('[data-sp-toggle]'), function (b) {
        var on = !!App.save.settings[b.getAttribute('data-sp-toggle')];
        b.setAttribute('aria-checked', String(on));
        b.querySelector('.switch-text').textContent = on ? 'On' : 'Off';
      });
      panel.querySelector('[data-sp-range="musicVol"]').disabled = !App.save.settings.sound || !App.save.settings.music;
      panel.querySelector('[data-sp-range="sfxVol"]').disabled = !App.save.settings.sound;
      App.refreshSoundChips();
      nowPlaying();
    }
    function save() { App.persist(); App.applySettings(); sync(); }
    panel.addEventListener('click', function (e) {
      var t = e.target.closest('[data-sp-toggle]');
      if (t) {
        var k = t.getAttribute('data-sp-toggle');
        App.save.settings[k] = !App.save.settings[k];
        save();
        OBEY.audio.play('toggle', { off: !App.save.settings[k] });
        return;
      }
      if (e.target.closest('[data-sp-test]')) { OBEY.audio.play('success'); return; }
      if (e.target.closest('[data-sp-close]')) close();
    });
    panel.addEventListener('input', function (e) {
      var r = e.target.getAttribute && e.target.getAttribute('data-sp-range');
      if (!r) return;
      var v = Math.max(0, Math.min(100, Math.round(Number(e.target.value) || 0)));
      App.save.settings[r] = v;
      e.target.parentNode.querySelector('output').textContent = v + '%';
      OBEY.audio.setVolume(r === 'sfxVol' ? 'sfx' : r === 'voiceVol' ? 'voice' : 'music', v);
    });
    panel.addEventListener('change', function (e) {
      var t = e.target;
      if (t.getAttribute('data-sp-range')) { save(); if (t.getAttribute('data-sp-range') === 'sfxVol') OBEY.audio.play('tap'); return; }
      if (t.hasAttribute('data-sp-voice')) {
        App.save.settings.voice = t.value; save();
        App.speakLine(t.value === 'off' ? '' : 'Testing, testing. This is my voice. Magnificent, isn\'t it?', 'pleased');
      }
    });
    function close() {
      App.removeOverlayCloser(close); wrap.remove(); App.inertApp(false);
      doc.removeEventListener('keydown', key, true);
      if (App.screen === 'menu' && App.refresh) App.refresh();
      if (prev && prev.focus && doc.contains(prev)) prev.focus();
    }
    function key(e) { if (App.isTopModal(wrap) && e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); } }
    App.addOverlayCloser(close);
    doc.addEventListener('keydown', key, true);
    wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
    sync();
    panel.querySelector('[data-sp-toggle="sound"]').focus();
  };
  ACT['sound-panel'] = function () { App.soundPanel(); };

  /* ------------------------------------------------------------------- boot */
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', App.boot); else App.boot();
})(window);
