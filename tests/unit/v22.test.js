/* Unit tests for 2.2: 136 levels, save schema v5 (renumbering of the Final Factory and the bonus pack),
 * the 25 new chapters and their ruins. Per-level behaviour of the 100 new levels is in levels.test.js. */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadGame } = require('./load');

const OBEY = loadGame();
const S = OBEY.save, P = OBEY.progress, X = OBEY.extras;

function v4Save() {
  // A finished 2.1 campaign: 1–36 done, bonus pack done, finale details everywhere.
  const d = S.defaults();
  d.version = 4;
  d.completed = []; for (let n = 1; n <= 36; n++) { d.completed.push(n); d.bestStars[n] = n === 35 ? 2 : 3; d.bestDifficulty[n] = n === 36 ? 'hard' : 'medium'; }
  d.highestUnlocked = 36;
  d.bestActions = { 5: 4, 34: 7, 36: 3, 101: 2 };
  d.bestTime = { 36: 61000, 101: 9000 };
  d.clean = [33, 4, 104];
  d.stats.noHint = [1, 35]; d.stats.flawless = [36];
  d.bonus = { completed: [101, 104], bestStars: { 101: 3, 104: 1 } };
  d.daily.practice = { key: '2026-10-20', n: 34 };
  d.ruins = ['terms-agreer', 'tip-top'];
  d.jigsaw = ['jig-9'];
  d.endings = { seen: ['hero'], history: [{ id: 'hero', at: 5 }] };
  d.choices = { trust: 'yes' };
  return d;
}

test('registry: 136 campaign levels, bonus pack at 1001–1004, version 2.3.0, schema 5', () => {
  assert.equal(OBEY.VERSION, '2.3.0');
  assert.equal(S.SCHEMA, 5);
  assert.equal(OBEY.LEVEL_COUNT, 136);
  assert.equal(OBEY.levels.filter(Boolean).length, 136);
  assert.deepEqual(OBEY.bonusLevels.map((d) => d.num), [1001, 1002, 1003, 1004]);
  assert.equal(OBEY.levelLabel(1003), 'Bonus 3');
  assert.equal(OBEY.levelLabel(103), 'Level 103');
});

test('save v4 → v5: Final Factory 33–36 → 133–136 and bonus 101–104 → 1001–1004 in every field', () => {
  const res = S.parse(JSON.stringify(v4Save()));
  assert.equal(res.status, 'migrated');
  const d = res.data;
  assert.equal(d.version, 5);
  assert.deepEqual(d.completed, [...Array(32).keys()].map((i) => i + 1).concat([133, 134, 135, 136]));
  assert.equal(d.bestStars[135], 2);
  assert.equal(d.bestStars[35], undefined);
  assert.equal(d.bestDifficulty[136], 'hard');
  assert.deepEqual(d.bestActions, { 5: 4, 134: 7, 136: 3, 1001: 2 });
  assert.deepEqual(d.bestTime, { 136: 61000, 1001: 9000 });
  assert.deepEqual(d.clean.slice().sort((a, b) => a - b), [4, 133, 1004]);
  assert.deepEqual(d.stats.noHint, [1, 135]);
  assert.deepEqual(d.stats.flawless, [136]);
  assert.deepEqual(d.bonus, { completed: [1001, 1004], bestStars: { 1001: 3, 1004: 1 } });
  assert.deepEqual(d.daily.practice, { key: '2026-10-20', n: 134 });
  // Ids, endings and choices are untouched; the finale is still marked as finished.
  assert.deepEqual(d.ruins, ['terms-agreer', 'tip-top']);
  assert.deepEqual(d.jigsaw, ['jig-9']);
  assert.deepEqual(d.endings.seen, ['hero']);
  assert.deepEqual(d.choices, { trust: 'yes' });
  // The returning player continues with the first new level; the old finale stays replayable.
  assert.equal(d.highestUnlocked, 33);
  assert.equal(P.nextLevel(d), 33);
  assert.ok(P.canPlay(d, 33) && !P.canPlay(d, 34));
  assert.ok(P.canPlay(d, 136), 'finished finale stays replayable');
  assert.ok(P.canPlay(d, 1001), 'bonus pack stays open');
});

test('save v4 → v5: a mid-campaign 2.1 save keeps its place', () => {
  const d = S.defaults();
  d.version = 4; d.completed = [1, 2, 3, 4, 5]; d.highestUnlocked = 6;
  for (const n of d.completed) d.bestStars[n] = 3;
  const v = S.parse(JSON.stringify(d)).data;
  assert.deepEqual(v.completed, [1, 2, 3, 4, 5]);
  assert.equal(v.highestUnlocked, 6);
  assert.equal(P.nextLevel(v), 6);
});

test('save v4 → v5: a player stopped inside the old Final Factory resumes at Level 33', () => {
  const d = S.defaults();
  d.version = 4; d.completed = []; for (let n = 1; n <= 34; n++) { d.completed.push(n); d.bestStars[n] = 3; }
  d.highestUnlocked = 35;
  const v = S.parse(JSON.stringify(d)).data;
  assert.equal(v.highestUnlocked, 33);
  assert.ok(v.completed.includes(133) && v.completed.includes(134));
  assert.ok(!v.completed.includes(33));
});

test('a v5 save is not renumbered again', () => {
  const d = S.defaults();
  d.completed = [1, 2, 33, 34]; d.highestUnlocked = 35;
  for (const n of d.completed) d.bestStars[n] = 3;
  const res = S.parse(JSON.stringify(d));
  assert.equal(res.status, 'ok');
  assert.deepEqual(res.data.completed, [1, 2, 33, 34]);
});

test('2.2 chapters: 25 new ones between Static Summit and the Final Factory, each with exactly one in-level ruin', () => {
  const names = OBEY.CHAPTERS.map((c) => c.name);
  assert.equal(names.indexOf('Static Summit'), 7);
  assert.equal(names.indexOf('Final Factory'), 33);
  const fresh = OBEY.CHAPTERS.slice(8, 33);
  assert.equal(fresh.length, 25);
  for (const c of fresh) {
    const ruins = c.levels.flatMap((n) => X.ruinsFor(n));
    assert.equal(ruins.length, 1, c.name);
    const r = ruins[0];
    assert.ok(r.clue && r.clue.length > 10 && r.name, r.id);
    assert.ok(OBEY.getLevel(r.level).ruinPaths[r.id], r.id + ' has a ruin path in its level');
  }
  assert.ok(OBEY.TROPHY_IDS.includes('cup-final-factory') && OBEY.TROPHY_IDS.includes('cup-postcard-paradise'));
});

test('2.2 text: the finale, achievements and ninja costume point at Level 136', () => {
  OBEY.ENDINGS.forEach((e) => assert.match(e.condition, /Level 136/));
  assert.equal(OBEY.COSTUMES.find((c) => c.id === 'ninja').unlock.value, 136);
  assert.match(OBEY.ACHIEVEMENTS.find((a) => a.id === 'full-campaign').desc, /136 levels/);
  assert.match(OBEY.TROPHIES.find((t) => t.id === 'platinum-bossworth').desc, /every chapter/);
  assert.equal(X.getRuin('terms-agreer').level, 133);
  assert.equal(X.JIGSAW.find((j) => j.id === 'jig-9').level, 134);
});
