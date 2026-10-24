'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadGame } = require('./load');

const OBEY = loadGame();
const S = OBEY.save;
const P = OBEY.progress;

function fresh() { return S.defaults(); }
function completeAll(s, stars) {
  for (let n = 1; n <= 16; n++) P.completeLevel(s, n, { stars: stars || 3 });
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
  assert.equal(P.canPlay(s, 16), false);
  assert.equal(P.canPlay(s, 0), false);
  assert.equal(P.canPlay(s, 17), false);
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
  assert.equal(s.highestUnlocked, 16);
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

test('wizard needs 20 stars, sunset 30 stars, ninja level 16', () => {
  const s = fresh();
  for (let n = 1; n <= 10; n++) P.completeLevel(s, n, { stars: 2 }); // 20 stars
  assert.ok(s.costumes.unlocked.includes('wizard'));
  assert.ok(!s.themes.unlocked.includes('sunset'));
  for (let n = 11; n <= 15; n++) P.completeLevel(s, n, { stars: 2 }); // 30 stars
  assert.ok(s.themes.unlocked.includes('sunset'));
  assert.ok(!s.costumes.unlocked.includes('ninja'));
  P.completeLevel(s, 16, { stars: 1 });
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

test('achievement: perfect-performance needs 3 stars on all 16', () => {
  const s = completeAll(fresh(), 3);
  assert.ok(has(s, 'perfect-performance'));
  const t = fresh();
  for (let n = 1; n <= 16; n++) P.completeLevel(t, n, { stars: n === 7 ? 2 : 3 });
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
  for (let n = 1; n <= 15; n++) P.completeLevel(s, n, { stars: 1 });
  assert.ok(!has(s, 'full-campaign'));
  P.completeLevel(s, 16, { stars: 1 });
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
test('endings require level 16; hero and chaos record and award achievements', () => {
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

test('Secret Master ending also requires completing level 16', () => {
  const s = fresh();
  for (let n = 1; n <= 15; n++) P.completeLevel(s, n, { stars: 1 });
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
  assert.equal(r.data.totalStars, 32);
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
    version: 2, highestUnlocked: 'lots', completed: [1, 2, 2, 99, 'x', -1], bestStars: { 1: 7, 2: 'two', 5: 3 },
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
  assert.deepEqual(v.settings, { sound: true, motion: 'system', textSize: 'large' });
});

test('non-object saves (array, number, null string) recover', () => {
  for (const raw of ['[]', '42', 'null', '"hi"', 'true']) {
    const r = S.parse(raw);
    assert.equal(r.status, 'recovered', raw);
    assert.deepEqual(r.data, S.defaults());
  }
});

test('v1 legacy saves migrate to v2 and are re-saved', () => {
  const mem = memStorage();
  mem.setItem(S.KEY, JSON.stringify({ version: 1, level: 4, stars: { 1: 3, 2: 2, 3: 1 }, secretsFound: ['plant-whisperer', 'bogus'], sound: false }));
  const st = S.createStore(mem);
  const r = st.load();
  assert.equal(r.status, 'migrated');
  assert.equal(r.data.version, 2);
  assert.deepEqual(r.data.completed, [1, 2, 3]);
  assert.equal(r.data.highestUnlocked, 4);
  assert.equal(r.data.totalStars, 6);
  assert.deepEqual(r.data.secrets, ['plant-whisperer']);
  assert.equal(r.data.settings.sound, false);
  assert.equal(r.data.tutorialDone, true);
  assert.equal(JSON.parse(mem.getItem(S.KEY)).version, 2, 'migrated data written back');
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
  assert.equal(OBEY.ACHIEVEMENTS.length, 11);
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
