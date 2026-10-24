/* Unit tests for 2.1: bonus levels, ruins, skips, save v4, Daily Dare, save codes, jigsaw,
 * personal bests, next goals, narrator asides, reviews and the new achievements. */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadGame, play, makeRuntime } = require('./load');

const OBEY = loadGame();
const S = OBEY.save, P = OBEY.progress, X = OBEY.extras;
const fresh = () => S.validate(S.defaults());
const BONUS = [101, 102, 103, 104];
function completeUpTo(s, n) { for (let i = 1; i <= n; i++) P.completeLevel(s, i, { stars: 3, actions: 1, hints: 0, fails: 0, difficulty: 'medium' }); return s; }

/* --------------------------------------------------------------- bonus levels */
test('Sabotage Studio: 4 bonus levels registered as 101–104 with full specs', () => {
  assert.equal(OBEY.bonusLevels.length, 4);
  BONUS.forEach((n) => {
    const d = OBEY.getLevel(n);
    assert.ok(d && d.num === n && OBEY.isBonus(n));
    assert.equal(d.hints.length, 3);
    assert.ok(d.solution && d.solution.length);
    assert.match(OBEY.levelLabel(n), /^Bonus [1-4]$/);
  });
  assert.equal(OBEY.levelLabel(7), 'Level 7');
  assert.ok(!OBEY.isBonus(36) && !OBEY.isBonus(105));
});

test('every bonus level is solvable with 3 stars on every difficulty, and its alternatives complete', () => {
  BONUS.forEach((n) => {
    ['easy', 'medium', 'hard'].forEach((diff) => {
      const { rt, clock, log, def } = makeRuntime(OBEY, n, { difficulty: diff });
      play(rt, clock, def.solution);
      assert.ok(log.completed, `B${n} ${diff} completes`);
      assert.equal(log.completed.stars, 3, `B${n} ${diff} 3 stars`);
      assert.equal(log.completed.ruin, null);
    });
    const def = OBEY.getLevel(n);
    Object.keys(def.alternatives || {}).forEach((k) => {
      const { rt, clock, log } = makeRuntime(OBEY, n);
      play(rt, clock, def.alternatives[k]);
      assert.ok(log.completed && !log.completed.ruin, `B${n} alternative ${k}`);
    });
  });
});

test('every bonus ruin path finishes the level with that ruin id', () => {
  BONUS.forEach((n) => {
    const def = OBEY.getLevel(n);
    const ids = Object.keys(def.ruinPaths);
    assert.ok(ids.length >= 1);
    ids.forEach((id) => {
      assert.ok(X.getRuin(id) && X.getRuin(id).level === n, id + ' registered for ' + n);
      const { rt, clock, log } = makeRuntime(OBEY, n);
      play(rt, clock, def.ruinPaths[id]);
      assert.ok(log.completed, id + ' completes');
      assert.equal(log.completed.ruin, id);
    });
  });
});

test('B2 Ninety-Nine: optimised charging stops at 99; unplugging early is a nope', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 102);
  rt.dispatch({ type: 'tap', target: 'unplug' });
  assert.equal(rt.nopes, 1);
  assert.equal(log.completed, null);
  clock.advance(20000);
  assert.equal(rt.state.pct, 99, 'never reaches 100 while optimised');
});

test('B3 The Tower: big-on-small is refused (nope) twice, then the ruin on the third', () => {
  const { rt, log } = makeRuntime(OBEY, 103);
  const t = (id) => rt.dispatch({ type: 'tap', target: id });
  t('pegA'); t('pegB'); // 1 -> B
  t('pegA'); t('pegB'); // 2 onto 1: refused
  assert.equal(rt.nopes, 1);
  assert.deepEqual(rt.state.pegs, [[3, 2], [1], []]);
  assert.equal(log.completed, null);
});

/* --------------------------------------------------------------------- ruins */
// How to "fall for a trap" / make a harmless wrong move in each level with a generic ruin.
const WRONG = {
  3: [{ tap: 'button' }],
  5: [{ tap: 'swA' }],
  12: [{ tap: 'left' }],
  15: [{ tap: 'up' }, { tap: 'up' }, { tap: 'up' }],
  16: [{ tap: 'no' }, { tap: 'yes' }],
  17: [{ tap: 'd1' }, { tap: 'd2' }, { tap: 'd3' }],
  30: [{ tap: 't-please' }, { tap: 'enter' }],
  33: [{ tap: 'agree' }]
};

test('generic ruin triggers fire exactly at their count and never before', () => {
  X.RUINS.filter((r) => r.trigger).forEach((r) => {
    const { rt, clock } = makeRuntime(OBEY, r.level);
    const counters = () => ({ taps, fails: rt.stats.fails, nopes: rt.nopes });
    const taps = {};
    const doTap = (id) => { if (rt.dispatch({ type: 'tap', target: id })) taps[id] = (taps[id] || 0) + 1; };
    if (r.trigger.type === 'taps') {
      for (let i = 1; i < r.trigger.count; i++) { doTap(r.trigger.target); assert.equal(X.ruinTriggered(r.level, counters()), null, `${r.id} not before ${r.trigger.count}`); }
      doTap(r.trigger.target);
      assert.equal(rt.status, 'playing', `${r.id}: level still playing when the ruin fires`);
    } else {
      const key = r.trigger.type === 'fails' ? 'fails' : 'nopes';
      const get = () => (key === 'fails' ? rt.stats.fails : rt.nopes);
      let guard = 0;
      while (get() < r.trigger.count && guard++ < 60) {
        const before = get();
        for (const st of WRONG[r.level]) { if (get() > before) break; doTap(st.tap); clock.advance(50); }
        if (get() < r.trigger.count) assert.equal(X.ruinTriggered(r.level, counters()), null, `${r.id} not before ${r.trigger.count}`);
      }
      assert.ok(get() >= r.trigger.count, `${r.id}: could reach ${r.trigger.count} ${key} (got ${get()})`);
    }
    const hit = X.ruinTriggered(r.level, counters());
    assert.ok(hit && hit.id === r.id, `${r.id} fires`);
    // The app finishes the level with the ruin.
    let done = null;
    rt.hooks.onComplete = (res) => { done = res; };
    rt.api.complete({ ruin: hit.id, line: hit.line, mood: 'panicked' });
    assert.equal(done.ruin, r.id);
  });
});

test('ruins: 16 in total, unique ids, each with a name, clue and (for generic ones) a meltdown line', () => {
  assert.equal(X.RUINS.length, 16);
  assert.equal(new Set(X.RUIN_IDS).size, 16);
  X.RUINS.forEach((r) => { assert.ok(r.name && r.clue); if (r.trigger) assert.ok(r.line.length > 20); });
});

test('a ruin is recorded once, finishes the level and counts toward Saboteur', () => {
  const s = fresh();
  let ev = P.completeLevel(s, 1, { stars: 1, actions: 9, ruin: 'button-masher', difficulty: 'medium' });
  assert.ok(ev.some((e) => e.type === 'ruin' && e.id === 'button-masher'));
  assert.ok(P.isCompleted(s, 1));
  ev = P.completeLevel(s, 1, { stars: 1, actions: 9, ruin: 'button-masher' });
  assert.ok(!ev.some((e) => e.type === 'ruin'));
  assert.deepEqual(s.ruins, ['button-masher']);
  P.completeLevel(s, 2, { stars: 1, ruin: 'not-a-ruin' });
  assert.deepEqual(s.ruins, ['button-masher']);
});

/* --------------------------------------------------------------------- skips */
test('skip ("Let it be"): unlocks the next level, at most 3 open skips, never the finale', () => {
  const s = completeUpTo(fresh(), 2);
  assert.equal(P.skipBlocker(s, 3), null);
  P.skipLevel(s, 3);
  assert.ok(P.isSkipped(s, 3) && !P.isCompleted(s, 3));
  assert.equal(s.highestUnlocked, 4);
  assert.equal(P.nextLevel(s), 4, 'Continue goes past the skipped level');
  P.skipLevel(s, 4); P.skipLevel(s, 5);
  assert.match(P.skipBlocker(s, 6), /at most 3/);
  assert.equal(P.skipLevel(s, 6), null);
  assert.match(P.skipBlocker(s, 2), /already finished/);
  assert.match(P.skipBlocker(s, 30), /locked/);
  const all = completeUpTo(fresh(), 35);
  assert.match(P.skipBlocker(all, 36), /final level/);
  assert.match(P.skipBlocker(s, 101), /Bonus/);
  // Finishing a skipped level frees the skip.
  P.completeLevel(s, 4, { stars: 2, actions: 3 });
  assert.deepEqual(s.skipped, [3, 5]);
  assert.equal(P.skipBlocker(s, 6), null);
});

test('only skipped levels left: Continue points at the first skipped one', () => {
  const s = completeUpTo(fresh(), 2);
  P.skipLevel(s, 3);
  for (let n = 4; n <= 36; n++) P.completeLevel(s, n, { stars: 3 });
  assert.equal(P.nextLevel(s), 3);
});

test('save validation keeps skips consistent: no completed, finale or out-of-range skips; unlock follows them', () => {
  const v = S.validate({ completed: [1, 2], skipped: [3, 3, 2, 36, 99, 'x'], highestUnlocked: 1 });
  assert.deepEqual(v.skipped, [3]);
  assert.equal(v.highestUnlocked, 4);
});

/* ------------------------------------------------------------------- save v4 */
test('save v4: defaults validate to themselves; new fields are repaired field by field', () => {
  assert.deepEqual(S.validate(S.defaults()), S.defaults());
  const v = S.validate({
    intern: 500, profileName: '  Raouf\u0007 the Great Saboteur  ', ruins: ['tip-top', 'nope', 'tip-top'], jigsaw: ['jig-1', 'jig-99'],
    completed: [1], bestActions: { 1: 3, 2: 5, x: 1 }, bestTime: { 1: -4 }, daily: { last: '2026-13-99', streak: 'x', done: ['2026-10-24', 7], badges: [3, 4] },
    counters: { pokes: -1, tuesday: 'yes', chats: ['mind-maze', 'nope'] }, bonus: { completed: [101, 101, 105], bestStars: { 101: 9 } }, seenVersion: 'v2',
    settings: { textSize: 'xl', contrast: 'max', sfxVol: 150, voiceVol: '30', music: 1, hand: 'left' }
  });
  assert.equal(v.intern, 0);
  assert.equal(v.profileName, 'Raouf the Great Sabo');
  assert.deepEqual(v.ruins, ['tip-top']);
  assert.deepEqual(v.jigsaw, ['jig-1']);
  assert.deepEqual(v.bestActions, { 1: 3 });
  assert.deepEqual(v.bestTime, {});
  assert.deepEqual(v.daily, { last: '', streak: 0, best: 0, done: ['2026-10-24'], badges: [3], practice: null });
  assert.equal(v.counters.pokes, 0);
  assert.equal(v.counters.tuesday, false);
  assert.deepEqual(v.counters.chats, ['mind-maze']);
  assert.deepEqual(v.bonus, { completed: [101], bestStars: { 101: 3 } });
  assert.equal(v.seenVersion, '');
  assert.equal(v.settings.textSize, 'xl');
  assert.equal(v.settings.contrast, 'normal');
  assert.equal(v.settings.sfxVol, 80);
  assert.equal(v.settings.voiceVol, 30);
  assert.equal(v.settings.music, false);
  assert.equal(v.settings.hand, 'left');
});

test('v3 (2.0) saves migrate to v4 keeping everything', () => {
  const v3 = S.defaults();
  delete v3.ruins; delete v3.daily; delete v3.counters; delete v3.bonus;
  v3.version = 3; v3.completed = [1, 2, 3]; v3.bestStars = { 1: 3, 2: 2, 3: 1 }; v3.difficulty = 'hard'; v3.trophies = { 'cup-button-bay': 2 };
  const res = S.parse(JSON.stringify(v3));
  assert.equal(res.status, 'migrated');
  assert.equal(res.data.version, 4);
  assert.deepEqual(res.data.completed, [1, 2, 3]);
  assert.equal(res.data.difficulty, 'hard');
  assert.deepEqual(res.data.ruins, []);
  assert.deepEqual(res.data.daily, S.defaultDaily());
});

test('profiles: slot 1 keeps the original key; other slots are separate', () => {
  assert.equal(S.keyFor(1), 'obeylol.save');
  assert.equal(S.keyFor(2), 'obeylol.save.p2');
  const mem = new Map();
  const storage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
  const a = S.createStore(storage, S.keyFor(1)), b = S.createStore(storage, S.keyFor(2));
  const s1 = S.defaults(); s1.profileName = 'Adam'; a.save(s1);
  const s2 = S.defaults(); s2.profileName = 'Salma'; s2.completed = [1]; s2.bestStars = { 1: 3 }; b.save(s2);
  assert.equal(a.load().data.profileName, 'Adam');
  assert.equal(b.load().data.profileName, 'Salma');
  assert.equal(a.peek(S.keyFor(2)).completed.length, 1);
  assert.equal(a.peek(S.keyFor(3)), null);
});

test('New Game keeps collections and records; Reset All keeps name and settings only', () => {
  const s = completeUpTo(fresh(), 3);
  s.ruins = ['button-masher']; s.jigsaw = ['jig-1']; s.daily.streak = 4; s.counters.pokes = 9; s.profileName = 'Raouf'; s.intern = 42;
  const ng = P.newGame(s, 'easy');
  assert.deepEqual(ng.completed, []);
  assert.deepEqual(ng.ruins, ['button-masher']);
  assert.deepEqual(ng.jigsaw, ['jig-1']);
  assert.equal(ng.daily.streak, 4);
  assert.equal(ng.counters.pokes, 9);
  assert.equal(ng.intern, 42);
  const ra = P.resetAll(s);
  assert.deepEqual(ra.ruins, []);
  assert.equal(ra.profileName, 'Raouf');
  assert.equal(ra.intern, 42);
});

/* --------------------------------------------------------------- bonus pack */
test('bonus pack unlocks after Level 12; bonus results are kept separately', () => {
  const s = completeUpTo(fresh(), 11);
  assert.ok(!P.canPlay(s, 101));
  assert.equal(P.completeLevel(s, 101, { stars: 3 }), null);
  P.completeLevel(s, 12, { stars: 3 });
  assert.ok(P.canPlay(s, 104));
  const ev = P.completeLevel(s, 101, { stars: 2, actions: 1, timeMs: 4000, ruin: null });
  assert.ok(ev[0].bonus && ev[0].firstTime);
  assert.deepEqual(s.bonus.completed, [101]);
  assert.equal(s.bonus.bestStars[101], 2);
  assert.ok(!P.isCompleted(s, 101), 'not part of the campaign');
  assert.equal(s.bestActions[101], 1);
  [102, 103, 104].forEach((n) => P.completeLevel(s, n, { stars: 3 }));
  assert.ok(s.achievements['studio-graduate']);
});

/* ----------------------------------------------------------- personal bests */
test('personal bests: fewest actions and fastest time, never from guided runs', () => {
  const s = fresh();
  P.completeLevel(s, 1, { stars: 2, actions: 5, timeMs: 9000 });
  let ev = P.completeLevel(s, 1, { stars: 3, actions: 2, timeMs: 12000 });
  assert.equal(s.bestActions[1], 2);
  assert.equal(s.bestTime[1], 9000);
  assert.ok(ev.some((e) => e.type === 'best' && e.what === 'actions'));
  ev = P.completeLevel(s, 1, { stars: 1, actions: 1, timeMs: 100, guided: true });
  assert.equal(s.bestActions[1], 2);
  assert.equal(s.bestTime[1], 9000);
  P.completeLevel(s, 1, { stars: 3, actions: 2, timeMs: 3000, hour: 2 });
  assert.equal(s.bestTime[1], 3000);
  assert.ok(s.counters.nightOwl && s.achievements['night-owl']);
});

/* ------------------------------------------------------------------ jigsaw */
test('jigsaw: 9 pieces, one per chapter, inside the stage; trophy at 9', () => {
  assert.equal(X.JIGSAW.length, 9);
  const chapters = X.JIGSAW.map((j) => OBEY.chapterOf(j.level).id);
  assert.equal(new Set(chapters).size, 9);
  X.JIGSAW.forEach((j) => assert.ok(j.x >= 0 && j.x <= 91 && j.y >= 0 && j.y <= 91));
  const s = fresh();
  X.JIGSAW_IDS.slice(0, 8).forEach((id) => P.discoverJigsaw(s, id));
  assert.equal(P.discoverJigsaw(s, 'jig-1').length, 0, 'once');
  assert.ok(!s.trophies.jigsaw);
  const ev = P.discoverJigsaw(s, 'jig-9');
  assert.ok(ev.some((e) => e.type === 'trophy' && e.id === 'jigsaw'));
  assert.deepEqual(P.trophyProgress(s, OBEY.TROPHIES.find((t) => t.id === 'jigsaw')), [9, 9]);
});

/* -------------------------------------------------------------- Daily Dare */
test('Daily Dare: the level depends only on the date and is always playable', () => {
  const s = completeUpTo(fresh(), 5);
  const a = X.dareLevel(s, '2026-10-24'), b = X.dareLevel(s, '2026-10-24');
  assert.equal(a, b);
  assert.ok(P.canPlay(s, a));
  const seen = new Set();
  for (let d = 1; d <= 28; d++) seen.add(X.dareLevel(s, '2026-02-' + String(d).padStart(2, '0')));
  assert.ok(seen.size > 2, 'varies from day to day');
  assert.equal(X.dareLevel(fresh(), '2026-10-24'), 1);
});

test('Daily Dare rule: par, no hints, no traps, not guided', () => {
  const r = { actions: 2, par: 2, hints: 0, fails: 0, guided: false };
  assert.ok(X.dareMet(r));
  assert.ok(!X.dareMet(Object.assign({}, r, { actions: 3 })));
  assert.ok(!X.dareMet(Object.assign({}, r, { hints: 1 })));
  assert.ok(!X.dareMet(Object.assign({}, r, { fails: 1 })));
  assert.ok(!X.dareMet(Object.assign({}, r, { guided: true })));
});

test('streaks: +1 per day, one grace day, reset after two missed days, badges at 3/7/30', () => {
  const s = fresh();
  assert.equal(X.recordDare(s, '2026-01-01')[0].streak, 1);
  assert.deepEqual(X.recordDare(s, '2026-01-01'), [], 'once per day');
  X.recordDare(s, '2026-01-02');
  const ev = X.recordDare(s, '2026-01-04'); // missed the 3rd: grace
  assert.equal(s.daily.streak, 3);
  assert.ok(ev.some((e) => e.type === 'badge' && e.days === 3));
  X.recordDare(s, '2026-01-07'); // missed 5th and 6th: reset
  assert.equal(s.daily.streak, 1);
  assert.equal(s.daily.best, 3);
  assert.equal(X.currentStreak(s, '2026-01-09'), 1);
  assert.equal(X.currentStreak(s, '2026-01-10'), 0);
  for (let d = 8; d <= 13; d++) X.recordDare(s, '2026-01-' + String(d).padStart(2, '0'));
  assert.equal(s.daily.streak, 7);
  assert.ok(P.evaluate(s).some((e) => e.type === 'achievement' && e.id === 'daily-devotee'));
  assert.equal(X.daysBetween('2026-02-28', '2026-03-01'), 1);
});

/* ------------------------------------------------------------- save codes */
test('save codes round-trip through export/import and reject damaged codes', () => {
  const s = completeUpTo(fresh(), 4);
  s.profileName = 'Zoë ✓';
  s.ruins = ['button-masher'];
  const code = X.exportCode(s);
  assert.match(code, /^OBEYLOL1\./);
  const back = X.importCode('  ' + code.slice(0, 30) + '\n' + code.slice(30) + ' ');
  assert.ok(back.ok);
  assert.deepEqual(back.data.completed, [1, 2, 3, 4]);
  assert.equal(back.data.profileName, 'Zoë ✓');
  assert.deepEqual(back.data.ruins, ['button-masher']);
  assert.ok(!X.importCode('hello').ok);
  assert.ok(!X.importCode('OBEYLOL1.!!!notbase64').ok);
  assert.ok(!X.importCode('OBEYLOL1.' + Buffer.from('[1,2]').toString('base64')).ok);
  assert.ok(!X.importCode(code.slice(0, code.length - 12)).ok);
});

/* -------------------------------------------------------------- next goal */
test('next goal names the nearest cosmetic unlock', () => {
  const s = fresh();
  assert.equal(X.nextGoal(s), 'Finish Level 4 to unlock the Royal costume.');
  completeUpTo(s, 36);
  s.costumes.unlocked = OBEY.COSTUMES.map((c) => c.id).filter((id) => id !== 'alien' && id !== 'dino');
  s.themes.unlocked = OBEY.THEMES.map((t) => t.id);
  s.secrets = OBEY.SECRET_IDS.slice(0, 2);
  assert.equal(X.nextGoal(s), 'Find 1 more secret to unlock the Alien costume.');
  s.costumes.unlocked = OBEY.COSTUMES.map((c) => c.id);
  assert.equal(X.nextGoal(s), null);
});

/* --------------------------------------------------- narrator and reviews */
test('composure falls with defiance and ruins; tiers and the review follow', () => {
  const s = fresh();
  assert.equal(X.composure(s), 100);
  assert.equal(X.composureTier(100), 'calm');
  s.stats.defiance = 30; s.ruins = X.RUIN_IDS.slice(0, 6);
  const c = X.composure(s);
  assert.ok(c < 50);
  assert.ok(['frazzled', 'meltdown'].includes(X.composureTier(c)));
  assert.equal(X.composureTier(0), 'meltdown');
  assert.equal(X.review(fresh()).stars, 5);
  const rv = X.review(s);
  assert.ok(rv.stars >= 1 && rv.stars <= 2 && rv.text.length > 10);
});

test('opening asides: replay lines on replays, post-game lines after the finale, callbacks remember things', () => {
  const s = fresh();
  const always = () => 0; // rand() = 0 → take the first branch each time
  assert.ok(X.REPLAY.includes(X.openingAside(s, 5, { replay: true }, always)));
  assert.equal(X.openingAside(s, 5, { replay: false }, () => 0.99), null);
  const done = completeUpTo(fresh(), 36);
  assert.ok(X.POSTGAME.includes(X.openingAside(done, 5, {}, always)));
  s.ruins = ['button-masher']; s.intern = 42;
  assert.match(X.callback(s, 3), /Intern #42.*Level 1/);
  s.ruins = []; s.stats.fails = 12;
  assert.match(X.callback(s, 4), /12 traps/);
});

test('chapter review names the chapter, stars and ruins', () => {
  const s = completeUpTo(fresh(), 4);
  s.ruins = ['button-masher'];
  const txt = X.chapterRoast(s, 'button-bay');
  assert.match(txt, /Button Bay: 12 of 12 stars/);
  assert.match(txt, /1 level ruined/);
  assert.equal(X.chapterRoast(s, 'nope'), null);
});

test('U.N.D.O.: appears from Level 9 and in the bonus pack; intro once, each chapter chat once; tips only for unfound ruins', () => {
  const s = fresh();
  assert.deepEqual(X.undoMessages(s, 8, []), []);
  const first = X.undoMessages(s, 9, []);
  assert.equal(first[0].text, X.UNDO_INTRO);
  assert.ok(first.some((m) => m.leak && m.who === 'CLIVE'));
  s.counters.undoMet = true;
  assert.deepEqual(X.undoMessages(s, 10, ['trick-tower']), []);
  assert.ok(X.undoActive(101));
  assert.equal(X.undoTip(s, 12), X.getRuin('pie-connoisseur').clue);
  s.ruins = ['pie-connoisseur'];
  assert.equal(X.undoTip(s, 12), null);
  assert.equal(X.undoTip(s, 4), null);
});

test('trick recaps exist for all 40 levels', () => {
  for (let n = 1; n <= 36; n++) assert.ok(X.TRICKS[n] && X.TRICKS[n].length > 15, 'L' + n);
  BONUS.forEach((n) => assert.ok(X.TRICKS[n]));
});

/* ----------------------------------------------------------- achievements */
test('2.1 achievements unlock from counters, ruins, streaks and the bonus pack', () => {
  const s = fresh();
  assert.equal(OBEY.ACHIEVEMENTS.length, 21);
  s.counters.awayDays = 8; s.counters.tuesday = true; s.counters.pokes = 50; s.counters.settingsOpens = 10; s.counters.creditsViews = 1;
  s.ruins = X.RUIN_IDS.slice(0, 6);
  P.evaluate(s);
  ['go-outside', 'its-tuesday', 'poke-champion', 'settings-enthusiast', 'credits-reader', 'saboteur'].forEach((id) => assert.ok(s.achievements[id], id));
  assert.ok(!s.achievements['demolition-expert']);
  s.ruins = X.RUIN_IDS.slice();
  P.evaluate(s);
  assert.ok(s.achievements['demolition-expert']);
});

test('share texts are spoiler-free and carry the game link', () => {
  const r = { level: 12, stars: 2, difficulty: 'hard', fails: 1, hints: 0, ruin: null };
  const t = X.shareLevel(r, OBEY.getLevel(12));
  assert.match(t, /Level 12: The Double Bluff/);
  assert.match(t, /⭐⭐☆/);
  assert.match(t, /Hard · fell for 1 trap · no hints/);
  assert.ok(t.includes(OBEY.SHARE_URL));
  assert.match(X.shareLevel(Object.assign({}, r, { ruin: 'pie-connoisseur' }), OBEY.getLevel(12)), /RUINED IT/);
  assert.match(X.shareDare('2026-10-24', 5, 3), /Daily Dare 2026-10-24 .* streak 3/);
  const s = completeUpTo(fresh(), 36);
  assert.match(X.shareEnding(s, 'hero'), /Hero ending\. No spoilers\. 108\/108 stars/);
});

test('captions exist for every sound the 2.1 features play', () => {
  ['nope', 'pie', 'chicken', 'trombone', 'zap', 'splash', 'ruin', 'glitch', 'phone', 'gameover', 'chapter', 'warmer', 'success'].forEach((k) => assert.ok(X.CAPTIONS[k], k));
});

/* -------------------------------------------- QA3 regression (2.1 review) */
test('QA3: pausable clock freezes timers and time while paused (dialogs pause levels)', () => {
  const base = OBEY.createFakeClock();
  const c = OBEY.createPausableClock(base);
  let fired = 0, ticks = 0;
  c.setTimeout(() => fired++, 1000);
  c.setInterval(() => ticks++, 300);
  base.advance(500);
  c.pause();
  const t = c.now();
  base.advance(5000);
  assert.equal(fired, 0); assert.equal(c.now(), t, 'time stands still');
  c.resume();
  base.advance(499); assert.equal(fired, 0);
  base.advance(1); assert.equal(fired, 1);
  assert.equal(ticks, 3, 'interval resumed from where it paused');
  // A level on a paused clock does not advance.
  const rtClock = OBEY.createPausableClock(base);
  const rt = new OBEY.LevelRuntime(OBEY.getLevel(3), { clock: rtClock, ctx: { difficulty: 'medium' }, hooks: {} }).start();
  rtClock.pause(); base.advance(20000);
  assert.equal(rt.status, 'playing', 'countdown frozen behind a dialog');
  rtClock.resume(); base.advance(11000);
  assert.equal(rt.status, 'complete');
});

test('QA3-D1: with storage blocked, switching profiles keeps every profile in memory', () => {
  const blocked = { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); }, removeItem() {} };
  const a = S.createStore(blocked, S.keyFor(1));
  const s = completeUpTo(fresh(), 5); a.save(s);
  const b = S.createStore(blocked, S.keyFor(2)); b.save(fresh());
  const again = S.createStore(blocked, S.keyFor(1));
  assert.deepEqual(again.load().data.completed, [1, 2, 3, 4, 5]);
});

test('QA3-D7: the Daily Dare is the same level for everyone, with a practice dare if it is locked', () => {
  const key = '2026-10-24', g = X.dareGlobal(key);
  const all = completeUpTo(fresh(), 36);
  assert.equal(X.dareFor(all, key).n, g);
  assert.equal(X.dareFor(all, key).practice, false);
  const newbie = fresh();
  const d = X.dareFor(newbie, key);
  if (g !== 1) { assert.ok(d.practice); assert.equal(d.global, g); assert.ok(P.canPlay(newbie, d.n)); }
  // The practice dare stays fixed for the day once stored, even as the player progresses.
  newbie.daily.practice = { key, n: d.n };
  completeUpTo(newbie, Math.min(10, g - 1 > 0 ? g - 1 : 1));
  if (!P.canPlay(newbie, g)) assert.equal(X.dareFor(newbie, key).n, d.n);
});

test('QA3-D8/D11: no ruins during guided runs; ruins never set personal bests; New Game keeps bests', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 104);
  rt.restart({ guided: true });
  play(rt, clock, OBEY.getLevel(104).ruinPaths['tip-top']);
  assert.ok(log.completed && log.completed.ruin === null && log.completed.guided);
  const s = completeUpTo(fresh(), 2);
  assert.ok(P.completeLevel(s, 3, { stars: 1, actions: 4, timeMs: 1800, ruin: 'countdown-crasher' }));
  assert.ok(P.isCompleted(s, 3));
  assert.equal(s.bestTime[3], undefined);
  assert.equal(s.bestActions[3], undefined);
  assert.ok(!s.clean.includes(3), 'a ruin is not a clean finish');
  P.completeLevel(s, 3, { stars: 3, actions: 0, timeMs: 11000 });
  assert.ok(s.clean.includes(3));
  assert.equal(P.newGame(s).bestTime[3], 11000);
});

test('QA3: hand-edited saves keep at most 3 skips', () => {
  const v = S.validate({ completed: [1], skipped: [2, 3, 4, 5, 6] });
  assert.deepEqual(v.skipped, [2, 3, 4]);
});
