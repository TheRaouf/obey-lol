'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadGame } = require('./load');

const OBEY = loadGame();
const S = OBEY.save;
const P = OBEY.progress;
const L = OBEY.LEVEL_COUNT;

function fresh() { return S.defaults(); }
function completeAll(s, stars) {
  for (let n = 1; n <= L; n++) P.completeLevel(s, n, { stars: stars || 3 });
  return s;
}
function memStorage() {
  const m = {};
  return { getItem: (k) => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: (k) => { delete m[k]; }, _m: m };
}

/* ------------------------------------------------------------ progression */
test('new save: only level 1 playable, locked levels refused', () => {
  const s = fresh();
  assert.equal(P.canPlay(s, 1), true);
  assert.equal(P.canPlay(s, 2), false);
  assert.equal(P.canPlay(s, L), false);
  assert.equal(P.canPlay(s, 0), false);
  assert.equal(P.canPlay(s, L + 1), false);
  assert.equal(P.completeLevel(s, 5, { stars: 3 }), null, 'cannot complete a locked level');
  assert.deepEqual(s.completed, []);
});

test('completing a level unlocks the next and Continue points to it', () => {
  const s = fresh();
  P.completeLevel(s, 1, { stars: 2 });
  assert.equal(s.highestUnlocked, 2);
  assert.equal(P.nextLevel(s), 2);
  P.completeLevel(s, 2, { stars: 1 });
  assert.equal(P.nextLevel(s), 3);
  completeAll(s);
  assert.equal(s.highestUnlocked, L);
  assert.equal(P.nextLevel(s), null);
});

test('best stars are preserved; replays cannot lower them', () => {
  const s = fresh();
  let ev = P.completeLevel(s, 1, { stars: 3 });
  assert.equal(ev[0].firstTime, true);
  P.completeLevel(s, 1, { stars: 1 });
  assert.equal(s.bestStars[1], 3);
  P.completeLevel(s, 2, { stars: 1 });
  ev = P.completeLevel(s, 2, { stars: 2 });
  assert.equal(ev[0].improved, true);
  assert.equal(s.bestStars[2], 2);
  assert.equal(P.totalStars(s), 5);
  assert.deepEqual(s.completed, [1, 2], 'no duplicate completion entries');
});

test('star values are clamped to 1..3', () => {
  const s = fresh();
  P.completeLevel(s, 1, { stars: 9 });
  assert.equal(s.bestStars[1], 3);
  const t = fresh();
  P.completeLevel(t, 1, { stars: -4 });
  assert.equal(t.bestStars[1], 1);
});

/* ---------------------------------------------------------------- secrets */
test('secrets are recorded exactly once; unknown ids ignored', () => {
  const s = fresh();
  assert.equal(P.discoverSecret(s, 'plant-whisperer')[0].count, 1);
  assert.deepEqual(P.discoverSecret(s, 'plant-whisperer'), []);
  assert.deepEqual(P.discoverSecret(s, 'nope'), []);
  assert.deepEqual(s.secrets, ['plant-whisperer']);
});

test('15 secrets with unique ids, names and hints', () => {
  assert.equal(OBEY.SECRETS.length, 15);
  assert.equal(new Set(OBEY.SECRET_IDS).size, 15);
  assert.equal(new Set(OBEY.SECRETS.map((s) => s.name)).size, 15);
  assert.equal(new Set(OBEY.SECRETS.map((s) => s.how)).size, 15, 'unique conditions');
  OBEY.SECRETS.forEach((s) => assert.ok(s.desc && s.hint && s.level >= 1 && s.level <= 14));
});

/* -------------------------------------------------------- costumes/themes */
test('8 costumes and 4 themes with expected ids', () => {
  assert.deepEqual(OBEY.COSTUMES.map((c) => c.id), ['classic', 'royal', 'alien', 'detective', 'wizard', 'robot', 'dino', 'ninja']);
  assert.deepEqual(OBEY.THEMES.map((t) => t.id), ['classic', 'candy', 'ocean', 'sunset']);
});

test('costume and theme unlocks follow their rules', () => {
  const s = fresh();
  assert.equal(P.selectCostume(s, 'royal'), null, 'locked costume cannot be selected');
  for (let n = 1; n <= 4; n++) P.completeLevel(s, n, { stars: 1 });
  assert.ok(s.costumes.unlocked.includes('royal'));
  assert.ok(!s.costumes.unlocked.includes('detective'));
  P.completeLevel(s, 5, { stars: 1 });
  assert.ok(s.themes.unlocked.includes('candy'));
  ['plant-whisperer', 'empty-corner'].forEach((id) => P.discoverSecret(s, id));
  assert.ok(!s.costumes.unlocked.includes('alien'));
  const ev = P.discoverSecret(s, 'countdown');
  assert.ok(ev.some((e) => e.type === 'costume' && e.id === 'alien'));
  assert.ok(P.selectCostume(s, 'alien'));
  assert.equal(s.costumes.selected, 'alien');
  assert.ok(s.costumes.worn.includes('alien'));
  assert.equal(P.selectTheme(s, 'sunset'), null);
  assert.ok(P.selectTheme(s, 'candy'));
  assert.equal(s.themes.selected, 'candy');
});

test('wizard needs 20 stars, sunset 30 stars, ninja the final level', () => {
  const s = fresh();
  for (let n = 1; n <= 10; n++) P.completeLevel(s, n, { stars: 2 }); // 20 stars
  assert.ok(s.costumes.unlocked.includes('wizard'));
  assert.ok(!s.themes.unlocked.includes('sunset'));
  for (let n = 11; n <= 15; n++) P.completeLevel(s, n, { stars: 2 }); // 30 stars
  for (let n = 16; n < L; n++) P.completeLevel(s, n, { stars: 1 });
  assert.ok(s.themes.unlocked.includes('sunset'));
  assert.ok(!s.costumes.unlocked.includes('ninja'));
  P.completeLevel(s, L, { stars: 1 });
  assert.ok(s.costumes.unlocked.includes('ninja'));
});

/* ----------------------------------------------------------- achievements */
function has(s, id) { return !!s.achievements[id]; }

test('achievement: first-steps', () => {
  const s = fresh();
  assert.ok(!has(s, 'first-steps'));
  P.completeLevel(s, 1, { stars: 1 });
  assert.ok(has(s, 'first-steps'));
});

test('achievement: professional-disobeyer needs 10 defies', () => {
  const s = fresh();
  P.completeLevel(s, 1, { stars: 1, defies: 9 });
  assert.ok(!has(s, 'professional-disobeyer'));
  P.completeLevel(s, 1, { stars: 1, defies: 1 });
  assert.ok(has(s, 'professional-disobeyer'));
});

test('achievement: perfect-performance needs 3 stars on every level', () => {
  const s = completeAll(fresh(), 3);
  assert.ok(has(s, 'perfect-performance'));
  const t = fresh();
  for (let n = 1; n <= L; n++) P.completeLevel(t, n, { stars: n === 7 ? 2 : 3 });
  assert.ok(!has(t, 'perfect-performance'));
  P.completeLevel(t, 7, { stars: 3 });
  assert.ok(has(t, 'perfect-performance'));
});

test('achievements: secret-agent, collector, secret-master thresholds', () => {
  const s = fresh();
  OBEY.SECRET_IDS.forEach((id, i) => {
    P.discoverSecret(s, id);
    const n = i + 1;
    assert.equal(has(s, 'secret-agent'), n >= 1);
    assert.equal(has(s, 'collector'), n >= 8);
    assert.equal(has(s, 'secret-master'), n >= 15);
  });
});

test('achievement: costume-party requires wearing all 8', () => {
  const s = completeAll(fresh(), 3);
  OBEY.SECRET_IDS.forEach((id) => P.discoverSecret(s, id));
  const ids = OBEY.COSTUMES.map((c) => c.id);
  ids.slice(0, 7).forEach((id) => P.selectCostume(s, id));
  assert.ok(!has(s, 'costume-party'));
  P.selectCostume(s, 'ninja');
  assert.ok(has(s, 'costume-party'));
});

test('achievement: full-campaign', () => {
  const s = fresh();
  for (let n = 1; n < L; n++) P.completeLevel(s, n, { stars: 1 });
  assert.ok(!has(s, 'full-campaign'));
  P.completeLevel(s, L, { stars: 1 });
  assert.ok(has(s, 'full-campaign'));
});

test('achievements are awarded once (timestamps never change)', () => {
  const s = fresh();
  P.completeLevel(s, 1, { stars: 1 });
  const t = s.achievements['first-steps'];
  const ev = P.completeLevel(s, 1, { stars: 3 });
  assert.equal(s.achievements['first-steps'], t);
  assert.ok(!ev.some((e) => e.type === 'achievement' && e.id === 'first-steps'));
});

/* ---------------------------------------------------------------- endings */
test('endings require the final level; hero and chaos record and award achievements', () => {
  const s = fresh();
  assert.equal(P.recordEnding(s, 'hero'), null);
  completeAll(s, 1);
  const ev = P.recordEnding(s, 'hero');
  assert.ok(ev.some((e) => e.type === 'achievement' && e.id === 'heroic-finish'));
  assert.ok(!has(s, 'chaos-enthusiast'));
  P.recordEnding(s, 'chaos');
  assert.ok(has(s, 'chaos-enthusiast'));
  assert.deepEqual(s.endings.seen, ['hero', 'chaos']);
  assert.equal(s.endings.history.length, 2);
  P.recordEnding(s, 'hero');
  assert.equal(s.endings.seen.length, 2, 'seen is unique');
  assert.equal(s.endings.history.length, 3, 'history logs replays');
});

test('Secret Master ending is impossible without all 15 secrets', () => {
  const s = completeAll(fresh(), 1);
  OBEY.SECRET_IDS.slice(0, 14).forEach((id) => P.discoverSecret(s, id));
  assert.equal(P.recordEnding(s, 'secret'), null);
  assert.ok(!s.endings.seen.includes('secret'));
  assert.ok(!has(s, 'ghostwriter'));
  P.discoverSecret(s, OBEY.SECRET_IDS[14]);
  const ev = P.recordEnding(s, 'secret');
  assert.ok(ev);
  assert.ok(has(s, 'ghostwriter'));
});

test('Secret Master ending also requires completing the final level', () => {
  const s = fresh();
  for (let n = 1; n < L; n++) P.completeLevel(s, n, { stars: 1 });
  OBEY.SECRET_IDS.forEach((id) => P.discoverSecret(s, id));
  assert.equal(P.recordEnding(s, 'secret'), null);
  assert.equal(P.recordEnding(s, 'bogus'), null);
});

test('karma: hero choices positive, chaos negative', () => {
  const s = fresh();
  P.completeLevel(s, 1, { stars: 1, choices: { gift: 'return', rule: 'door', bad: 'x' } });
  assert.equal(P.karma(s), 2);
  assert.equal(s.choices.bad, undefined, 'unknown choices ignored');
  P.completeLevel(s, 1, { stars: 1, choices: { gift: 'prank', sign: 'graffiti', trust: 'why' } });
  assert.equal(P.karma(s), -2);
});

/* ------------------------------------------------------------ save / load */
test('round trip through storage preserves everything', () => {
  const st = S.createStore(memStorage());
  assert.equal(st.persistent, true);
  const s = completeAll(fresh(), 2);
  P.discoverSecret(s, 'polly');
  P.selectCostume(s, 'royal');
  P.selectTheme(s, 'candy');
  P.recordEnding(s, 'chaos');
  s.tutorialDone = true;
  s.settings.sound = false;
  s.settings.motion = 'reduce';
  st.save(s);
  const r = st.load();
  assert.equal(r.status, 'ok');
  assert.deepEqual(r.data, S.validate(JSON.parse(JSON.stringify(s))));
  assert.equal(r.data.totalStars, L * 2);
  assert.equal(r.data.costumes.selected, 'royal');
  assert.equal(r.data.themes.selected, 'candy');
  assert.equal(r.data.settings.motion, 'reduce');
  assert.equal(r.data.tutorialDone, true);
  assert.deepEqual(r.data.endings.seen, ['chaos']);
});

test('empty storage → new defaults', () => {
  const r = S.createStore(memStorage()).load();
  assert.equal(r.status, 'new');
  assert.deepEqual(r.data, S.defaults());
});

test('malformed JSON recovers safely and backs up the corrupt data', () => {
  const mem = memStorage();
  mem.setItem(S.KEY, '{not json!!');
  const st = S.createStore(mem);
  const r = st.load();
  assert.equal(r.status, 'recovered');
  assert.deepEqual(r.data, S.defaults());
  assert.equal(mem.getItem(S.BACKUP_KEY), '{not json!!');
});

test('wrong-typed fields are repaired field by field', () => {
  const bad = {
    version: 2, highestUnlocked: 'lots', completed: [1, 2, 2, 999, 'x', -1], bestStars: { 1: 7, 2: 'two', 5: 3 },
    secrets: ['polly', 'polly', 'fake', 42], costumes: { unlocked: ['royal', 'evil'], selected: 'evil', worn: 'all' },
    themes: { unlocked: 'candy', selected: 'candy' }, achievements: { 'first-steps': 'yes', fake: 1, collector: 123 },
    endings: { seen: ['hero', 'nope'], history: [{ id: 'hero', at: 5 }, null, { id: 'x' }] },
    tutorialDone: 'true', choices: { gift: 'prank', rule: 'banana' }, stats: { defiance: -5 }, settings: { sound: 'no', motion: 'fast', textSize: 'large' }
  };
  const v = S.validate(bad);
  assert.deepEqual(v.completed, [1, 2]);
  assert.equal(v.highestUnlocked, 3);
  assert.deepEqual(v.bestStars, { 1: 3, 2: 1 });
  assert.equal(v.totalStars, 4);
  assert.deepEqual(v.secrets, ['polly']);
  assert.deepEqual(v.costumes.unlocked, ['classic', 'royal']);
  assert.equal(v.costumes.selected, 'classic');
  assert.deepEqual(v.themes.unlocked, ['classic']);
  assert.equal(v.themes.selected, 'classic');
  assert.deepEqual(Object.keys(v.achievements), ['collector']);
  assert.deepEqual(v.endings.seen, ['hero']);
  assert.equal(v.endings.history.length, 1);
  assert.equal(v.tutorialDone, false);
  assert.deepEqual(v.choices, { gift: 'prank' });
  assert.equal(v.stats.defiance, 0);
  assert.deepEqual(v.settings, Object.assign(S.defaultSettings(), { textSize: 'large' }));
});

test('non-object saves (array, number, null string) recover', () => {
  for (const raw of ['[]', '42', 'null', '"hi"', 'true']) {
    const r = S.parse(raw);
    assert.equal(r.status, 'recovered', raw);
    assert.deepEqual(r.data, S.defaults());
  }
});

test('v1 legacy saves migrate to the current schema and are re-saved', () => {
  const mem = memStorage();
  mem.setItem(S.KEY, JSON.stringify({ version: 1, level: 4, stars: { 1: 3, 2: 2, 3: 1 }, secretsFound: ['plant-whisperer', 'bogus'], sound: false }));
  const st = S.createStore(mem);
  const r = st.load();
  assert.equal(r.status, 'migrated');
  assert.equal(r.data.version, S.SCHEMA);
  assert.deepEqual(r.data.completed, [1, 2, 3]);
  assert.equal(r.data.highestUnlocked, 4);
  assert.equal(r.data.totalStars, 6);
  assert.deepEqual(r.data.secrets, ['plant-whisperer']);
  assert.equal(r.data.settings.sound, false);
  assert.equal(r.data.tutorialDone, true);
  assert.equal(JSON.parse(mem.getItem(S.KEY)).version, S.SCHEMA, 'migrated data written back');
  assert.equal(JSON.parse(mem.getItem(S.KEY)).migratedFrom, undefined);
});

test('storage that throws falls back to memory without crashing', () => {
  const throwing = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); }, removeItem() { throw new Error('denied'); } };
  const st = S.createStore(throwing);
  assert.equal(st.persistent, false);
  const s = fresh();
  P.completeLevel(s, 1, { stars: 3 });
  assert.equal(st.save(s), false);
  const r = st.load();
  assert.deepEqual(r.data.completed, [1], 'in-memory fallback keeps session progress');
  const none = S.createStore(undefined);
  assert.equal(none.persistent, false);
  assert.equal(none.load().status, 'new');
});

test('storage that fails on write after probing (quota) keeps memory copy', () => {
  const mem = memStorage();
  let n = 0;
  const flaky = { getItem: mem.getItem, removeItem: mem.removeItem, setItem: (k, v) => { if (++n > 1) throw new Error('quota'); mem.setItem(k, v); } };
  const st = S.createStore(flaky);
  assert.equal(st.persistent, true);
  const s = fresh(); s.tutorialDone = true;
  assert.equal(st.save(s), false);
  assert.match(st.lastError, /quota/);
});

/* --------------------------------------------------------- New Game/reset */
test('New Game resets campaign but keeps cosmetics, achievements, endings, settings', () => {
  let s = completeAll(fresh(), 3);
  OBEY.SECRET_IDS.forEach((id) => P.discoverSecret(s, id));
  P.recordEnding(s, 'secret');
  P.selectCostume(s, 'ninja');
  s.settings.sound = false;
  s.tutorialDone = true;
  s = P.newGame(s);
  assert.deepEqual(s.completed, []);
  assert.equal(s.highestUnlocked, 1);
  assert.deepEqual(s.secrets, []);
  assert.deepEqual(s.choices, {});
  assert.equal(s.costumes.selected, 'ninja');
  assert.ok(s.achievements['ghostwriter']);
  assert.deepEqual(s.endings.seen, ['secret']);
  assert.equal(s.settings.sound, false);
  assert.equal(s.tutorialDone, true);
  // And it survives validation (e.g. after reload).
  const v = S.validate(JSON.parse(JSON.stringify(s)));
  assert.equal(v.costumes.selected, 'ninja');
  assert.deepEqual(v.endings.seen, ['secret']);
});

test('Reset All keeps only settings', () => {
  const s = completeAll(fresh(), 3);
  s.settings.textSize = 'large';
  const r = P.resetAll(s);
  const d = S.defaults(); d.settings.textSize = 'large';
  assert.deepEqual(r, d);
});

test('data integrity: achievements, endings, unlock descriptions', () => {
  assert.equal(OBEY.ACHIEVEMENTS.length, 21);
  for (const id of ['first-steps', 'professional-disobeyer', 'perfect-performance', 'secret-agent', 'collector', 'secret-master', 'costume-party', 'full-campaign', 'chaos-enthusiast', 'heroic-finish']) {
    assert.ok(OBEY.ACHIEVEMENT_IDS.includes(id), id);
  }
  assert.deepEqual(OBEY.ENDING_IDS, ['hero', 'chaos', 'secret']);
  OBEY.COSTUMES.concat(OBEY.THEMES).forEach((c) => assert.notEqual(OBEY.describeUnlock(c.unlock), 'Unknown'));
});

test('one full campaign run can earn Professional Disobeyer', () => {
  const { makeRuntime, play } = require('./load');
  let total = 0;
  for (const d of OBEY.levels) {
    const r = makeRuntime(OBEY, d.num);
    play(r.rt, r.clock, d.solution);
    total += r.log.completed.defies;
  }
  assert.ok(total >= 10, 'defies in one run: ' + total);
});

/* ------------------------------------------------------------------ 2.0 */
test('v2 (16-level) saves migrate: finale 15/16 → 135/136 (via 35/36 in 2.0), unlock stops at the first new level', () => {
  const mem = memStorage();
  const v2 = { version: 2, highestUnlocked: 16, completed: [...Array(16).keys()].map((i) => i + 1), bestStars: {}, secrets: ['polly'],
    costumes: { unlocked: ['classic', 'royal'], selected: 'royal', worn: ['classic', 'royal'] }, themes: { unlocked: ['classic'], selected: 'classic' },
    achievements: { 'first-steps': 5 }, endings: { seen: ['hero'], history: [{ id: 'hero', at: 9 }] }, tutorialDone: true, choices: { trust: 'yes' },
    stats: { defiance: 12, hintsUsed: 1, levelsFinished: 16 }, settings: { sound: false, motion: 'reduce', textSize: 'normal' } };
  for (let n = 1; n <= 16; n++) v2.bestStars[n] = n === 16 ? 2 : 3;
  mem.setItem(S.KEY, JSON.stringify(v2));
  const r = S.createStore(mem).load();
  assert.equal(r.status, 'migrated');
  const d = r.data;
  assert.equal(d.version, S.SCHEMA);
  assert.deepEqual(d.completed, [...Array(14).keys()].map((i) => i + 1).concat([135, 136]));
  assert.equal(d.bestStars[136], 2);
  assert.equal(d.bestStars[16], undefined);
  assert.equal(d.highestUnlocked, 15);
  assert.equal(P.nextLevel(d), 15);
  assert.ok(P.canPlay(d, 136), 'finished finale stays replayable');
  assert.ok(!P.canPlay(d, 20));
  assert.equal(d.bestDifficulty[136], 'medium');
  assert.equal(d.difficulty, 'medium');
  assert.deepEqual(d.endings.seen, ['hero']);
  assert.equal(d.costumes.selected, 'royal');
  assert.equal(d.settings.sound, false);
  assert.equal(d.settings.voice, 'babble');
  assert.equal(JSON.parse(mem.getItem(S.KEY)).version, S.SCHEMA);
});

test('difficulty star rules', () => {
  const st = OBEY.scoring.stars;
  // easy: hints free, +2 actions
  assert.equal(st(4, 3, 2, 'easy', 0), 3);
  assert.equal(st(5, 0, 2, 'easy', 0), 2);
  assert.equal(st(11, 0, 2, 'easy', 0), 1);
  // medium unchanged
  assert.equal(st(2, 0, 2, 'medium', 3), 3);
  assert.equal(st(2, 1, 2, 'medium', 0), 2);
  // hard: no hint and no trap for 3
  assert.equal(st(2, 0, 2, 'hard', 0), 3);
  assert.equal(st(2, 0, 2, 'hard', 1), 2);
  assert.equal(st(4, 0, 2, 'hard', 0), 2);
  assert.equal(st(5, 0, 2, 'hard', 0), 1);
  assert.equal(st(2, 1, 2, 'hard', 0), 1);
  // guided runs always 1
  for (const d of ['easy', 'medium', 'hard']) assert.equal(st(0, 0, 2, d, 0, true), 1);
  for (const d of ['easy', 'medium', 'hard']) assert.equal(OBEY.scoring.describe(3, d).length, 3);
});

test('per-level best difficulty only goes up; trophies follow the lowest difficulty in a chapter', () => {
  const s = fresh();
  for (let n = 1; n <= 4; n++) P.completeLevel(s, n, { stars: 3, difficulty: 'easy' });
  assert.equal(s.trophies['cup-button-bay'], 1, 'bronze');
  P.completeLevel(s, 1, { stars: 3, difficulty: 'hard' });
  assert.equal(s.bestDifficulty[1], 'hard');
  P.completeLevel(s, 1, { stars: 3, difficulty: 'easy' });
  assert.equal(s.bestDifficulty[1], 'hard', 'never downgrades');
  assert.equal(s.trophies['cup-button-bay'], 1, 'still bronze: levels 2-4 easy');
  let ev = [];
  for (const n of [2, 3, 4]) ev = ev.concat(P.completeLevel(s, n, { stars: 3, difficulty: 'medium' }));
  assert.equal(s.trophies['cup-button-bay'], 2, 'silver');
  assert.ok(ev.some((e) => e.type === 'trophy' && e.upgraded && e.tier === 2));
  for (const n of [2, 3, 4]) P.completeLevel(s, n, { stars: 3, difficulty: 'hard' });
  assert.equal(s.trophies['cup-button-bay'], 3, 'gold');
  assert.ok(!s.trophies['cup-mind-maze']);
});

test('special trophies: clean sweep, flawless, hard boiled, good sport, platinum', () => {
  const s = fresh();
  for (let n = 1; n <= 9; n++) P.completeLevel(s, n, { stars: 3, hints: 0, fails: 0, difficulty: 'hard' });
  assert.ok(!s.trophies['clean-sweep'] && !s.trophies.flawless);
  P.completeLevel(s, 10, { stars: 3, hints: 0, fails: 0, difficulty: 'hard' });
  assert.ok(s.trophies['clean-sweep'] && s.trophies.flawless);
  assert.ok(!s.trophies['hard-boiled']);
  P.completeLevel(s, 11, { stars: 3, difficulty: 'hard' });
  P.completeLevel(s, 12, { stars: 3, difficulty: 'hard' });
  assert.equal(s.trophies['hard-boiled'], 3);
  // guided runs and repeats don't count towards clean sweep
  const t = fresh();
  for (let n = 1; n <= 10; n++) P.completeLevel(t, n, { stars: 1, hints: 0, guided: true });
  P.completeLevel(t, 1, { stars: 3, hints: 0 });
  assert.equal(t.stats.noHint.length, 1);
  assert.ok(!t.trophies['clean-sweep']);
  // good sport counts total traps
  P.completeLevel(t, 1, { stars: 1, fails: 24 });
  assert.ok(!t.trophies['good-sport']);
  P.completeLevel(t, 1, { stars: 1, fails: 1 });
  assert.equal(t.trophies['good-sport'], 1);
  // platinum = gold everywhere
  const u = fresh();
  for (let n = 1; n <= L; n++) P.completeLevel(u, n, { stars: 3, difficulty: n === L ? 'medium' : 'hard' });
  assert.ok(!u.trophies['platinum-bossworth']);
  P.completeLevel(u, L, { stars: 3, difficulty: 'hard' });
  assert.equal(u.trophies['platinum-bossworth'], 4);
  assert.equal(OBEY.TROPHIES.length, 40, '34 chapter cups + 5 specials + jigsaw');
});

test('New Game keeps trophies and takes the new difficulty', () => {
  let s = fresh();
  for (let n = 1; n <= 4; n++) P.completeLevel(s, n, { stars: 3, difficulty: 'hard' });
  s = P.newGame(s, 'easy');
  assert.equal(s.trophies['cup-button-bay'], 3);
  assert.equal(s.difficulty, 'easy');
  assert.deepEqual(s.bestDifficulty, {});
  assert.equal(P.setDifficulty(s, 'impossible'), false);
});

test('validation repairs difficulty, trophies, stats lists and voice', () => {
  const v = S.validate({ completed: [1, 2], bestDifficulty: { 1: 'hard', 2: 'nightmare', 9: 'easy' }, difficulty: 'extreme',
    trophies: { 'cup-button-bay': 9, flawless: 2, fake: 3 }, stats: { noHint: [1, 1, 999, 'x'], flawless: 'no', fails: -3 }, settings: { voice: 'robot' } });
  assert.deepEqual(v.bestDifficulty, { 1: 'hard', 2: 'medium' });
  assert.equal(v.difficulty, 'medium');
  assert.deepEqual(v.trophies, { flawless: 2 });
  assert.deepEqual(v.stats.noHint, [1]);
  assert.deepEqual(v.stats.flawless, []);
  assert.equal(v.stats.fails, 0);
  assert.equal(v.settings.voice, 'babble');
});

/* -------------------------------------------- 2.0 QA regressions (unlocks) */
test('QA2-D3: migrated save with old L15 (now 135) done unlocks 136 after finishing 134', () => {
  const s = fresh();
  for (let n = 1; n <= 14; n++) P.completeLevel(s, n, { stars: 3 });
  s.completed.push(135); s.bestStars[135] = 3; s.highestUnlocked = 15;
  for (let n = 15; n <= 134; n++) P.completeLevel(s, n, { stars: 3 });
  assert.equal(s.highestUnlocked, 136);
  assert.equal(P.nextLevel(s), 136, 'Continue goes to the final level, not "all done"');
  assert.ok(P.canPlay(s, 136));
});

test('QA2-D4: replaying a migrated finale does not unlock the new levels', () => {
  const s = fresh();
  for (let n = 1; n <= 14; n++) P.completeLevel(s, n, { stars: 3 });
  s.completed.push(35, 36); s.bestStars[35] = 3; s.bestStars[36] = 3; s.highestUnlocked = 15;
  P.completeLevel(s, 35, { stars: 3 });
  P.completeLevel(s, 36, { stars: 3, ending: 'hero' });
  assert.equal(s.highestUnlocked, 15);
  assert.ok(!P.canPlay(s, 20));
  assert.equal(P.nextLevel(s), 15);
});
