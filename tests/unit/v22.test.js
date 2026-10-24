/* Unit tests for 2.2 and 2.4: 136 → 236 levels, save schemas v5 and v6 (renumbering of the Final Factory and
 * the bonus pack), the 50 new chapters and their ruins. Per-level behaviour of the 100 new levels is in levels.test.js. */
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

test('registry: 236 campaign levels, bonus pack at 1001–1004, version matches package.json, schema 6', () => {
  assert.equal(OBEY.VERSION, require('../../package.json').version);
  assert.equal(S.SCHEMA, 6);
  assert.equal(OBEY.LEVEL_COUNT, 236);
  assert.equal(OBEY.FINAL, 236);
  assert.equal(OBEY.levels.filter(Boolean).length, 236);
  assert.deepEqual(OBEY.bonusLevels.map((d) => d.num), [1001, 1002, 1003, 1004]);
  assert.equal(OBEY.levelLabel(1003), 'Bonus 3');
  assert.equal(OBEY.levelLabel(103), 'Level 103');
});

test('save v4 (2.1) → current: Final Factory 33–36 → 233–236 and bonus 101–104 → 1001–1004 in every field', () => {
  const res = S.parse(JSON.stringify(v4Save()));
  assert.equal(res.status, 'migrated');
  const d = res.data;
  assert.equal(d.version, S.SCHEMA);
  assert.deepEqual(d.completed, [...Array(32).keys()].map((i) => i + 1).concat([233, 234, 235, 236]));
  assert.equal(d.bestStars[235], 2);
  assert.equal(d.bestStars[35], undefined);
  assert.equal(d.bestStars[135], undefined);
  assert.equal(d.bestDifficulty[236], 'hard');
  assert.deepEqual(d.bestActions, { 5: 4, 234: 7, 236: 3, 1001: 2 });
  assert.deepEqual(d.bestTime, { 236: 61000, 1001: 9000 });
  assert.deepEqual(d.clean.slice().sort((a, b) => a - b), [4, 233, 1004]);
  assert.deepEqual(d.stats.noHint, [1, 235]);
  assert.deepEqual(d.stats.flawless, [236]);
  assert.deepEqual(d.bonus, { completed: [1001, 1004], bestStars: { 1001: 3, 1004: 1 } });
  assert.deepEqual(d.daily.practice, { key: '2026-10-20', n: 234 });
  // Ids, endings and choices are untouched; the finale is still marked as finished.
  assert.deepEqual(d.ruins, ['terms-agreer', 'tip-top']);
  assert.deepEqual(d.jigsaw, ['jig-9']);
  assert.deepEqual(d.endings.seen, ['hero']);
  assert.deepEqual(d.choices, { trust: 'yes' });
  // The returning player continues with the first level added in 2.2; the old finale stays replayable.
  assert.equal(d.highestUnlocked, 33);
  assert.equal(P.nextLevel(d), 33);
  assert.ok(P.canPlay(d, 33) && !P.canPlay(d, 34));
  assert.ok(P.canPlay(d, 236), 'finished finale stays replayable');
  assert.ok(P.canPlay(d, 1001), 'bonus pack stays open');
});

function v5Save() {
  // A finished 2.2/2.3 campaign: 1–136 done (Final Factory at 133–136), bonus pack done.
  const d = S.defaults();
  d.version = 5;
  d.completed = []; for (let n = 1; n <= 136; n++) { d.completed.push(n); d.bestStars[n] = n === 135 ? 2 : 3; d.bestDifficulty[n] = n === 136 ? 'hard' : 'medium'; }
  d.highestUnlocked = 136;
  d.bestActions = { 5: 4, 120: 6, 134: 7, 136: 3, 1001: 2 };
  d.bestTime = { 136: 61000 };
  d.clean = [133, 4, 1004];
  d.stats.noHint = [1, 135]; d.stats.flawless = [136];
  d.bonus = { completed: [1001, 1004], bestStars: { 1001: 3, 1004: 1 } };
  d.daily.practice = { key: '2026-10-20', n: 134 };
  d.ruins = ['terms-agreer', 'gull-buffet']; d.jigsaw = ['jig-9'];
  d.endings = { seen: ['chaos'], history: [{ id: 'chaos', at: 5 }] };
  return d;
}

test('save v5 (2.2–2.3) → v6: Final Factory 133–136 → 233–236; levels 33–132 and the bonus pack unchanged', () => {
  const res = S.parse(JSON.stringify(v5Save()));
  assert.equal(res.status, 'migrated');
  const d = res.data;
  assert.equal(d.version, 6);
  assert.deepEqual(d.completed, [...Array(132).keys()].map((i) => i + 1).concat([233, 234, 235, 236]));
  assert.equal(d.bestStars[235], 2);
  assert.equal(d.bestStars[133], undefined, 'the new Level 133 is not marked done');
  assert.equal(d.bestDifficulty[236], 'hard');
  assert.deepEqual(d.bestActions, { 5: 4, 120: 6, 234: 7, 236: 3, 1001: 2 });
  assert.deepEqual(d.bestTime, { 236: 61000 });
  assert.deepEqual(d.clean.slice().sort((a, b) => a - b), [4, 233, 1004]);
  assert.deepEqual(d.stats.noHint, [1, 235]);
  assert.deepEqual(d.stats.flawless, [236]);
  assert.deepEqual(d.bonus, { completed: [1001, 1004], bestStars: { 1001: 3, 1004: 1 } });
  assert.deepEqual(d.daily.practice, { key: '2026-10-20', n: 234 });
  assert.deepEqual(d.ruins, ['terms-agreer', 'gull-buffet']);
  assert.deepEqual(d.endings.seen, ['chaos']);
  // A player who had finished 2.3 continues with the first 2.4 level.
  assert.equal(d.highestUnlocked, 133);
  assert.equal(P.nextLevel(d), 133);
  assert.ok(P.canPlay(d, 133) && !P.canPlay(d, 134));
  assert.ok(P.canPlay(d, 236), 'finished finale stays replayable');
});

test('save v5 → v6: a mid-campaign 2.2 save keeps its place', () => {
  const d = S.defaults();
  d.version = 5; d.completed = []; for (let n = 1; n <= 80; n++) { d.completed.push(n); d.bestStars[n] = 3; }
  d.highestUnlocked = 81;
  const v = S.parse(JSON.stringify(d)).data;
  assert.equal(v.completed.length, 80);
  assert.equal(v.highestUnlocked, 81);
  assert.equal(P.nextLevel(v), 81);
});

test('save v4 → current: a player stopped inside the old Final Factory resumes at Level 33', () => {
  const d = S.defaults();
  d.version = 4; d.completed = []; for (let n = 1; n <= 34; n++) { d.completed.push(n); d.bestStars[n] = 3; }
  d.highestUnlocked = 35;
  const v = S.parse(JSON.stringify(d)).data;
  assert.equal(v.highestUnlocked, 33);
  assert.ok(v.completed.includes(233) && v.completed.includes(234));
  assert.ok(!v.completed.includes(33) && !v.completed.includes(133));
});

test('a v6 save is not renumbered again', () => {
  const d = S.defaults();
  d.completed = [1, 2, 133, 134]; d.highestUnlocked = 135;
  for (const n of d.completed) d.bestStars[n] = 3;
  const res = S.parse(JSON.stringify(d));
  assert.equal(res.status, 'ok');
  assert.deepEqual(res.data.completed, [1, 2, 133, 134]);
});

test('chapters: 50 added in 2.2 and 2.4 between Static Summit and the Final Factory, each with exactly one in-level ruin', () => {
  const names = OBEY.CHAPTERS.map((c) => c.name);
  assert.equal(names.indexOf('Static Summit'), 7);
  assert.equal(names.indexOf('Final Factory'), 58);
  const added = OBEY.CHAPTERS.slice(8, 58);
  assert.equal(added.length, 50);
  for (const c of added) {
    const ruins = c.levels.flatMap((n) => X.ruinsFor(n));
    assert.equal(ruins.length, 1, c.name);
    const r = ruins[0];
    assert.ok(r.clue && r.clue.length > 10 && r.name, r.id);
    assert.ok(OBEY.getLevel(r.level).ruinPaths[r.id], r.id + ' has a ruin path in its level');
  }
  assert.ok(OBEY.TROPHY_IDS.includes('cup-final-factory') && OBEY.TROPHY_IDS.includes('cup-postcard-paradise') && OBEY.TROPHY_IDS.includes('cup-podium-party'));
});

test('text: the finale, achievements and ninja costume point at the last level (236)', () => {
  OBEY.ENDINGS.forEach((e) => assert.match(e.condition, /Level 236/));
  assert.equal(OBEY.COSTUMES.find((c) => c.id === 'ninja').unlock.value, 236);
  assert.match(OBEY.ACHIEVEMENTS.find((a) => a.id === 'full-campaign').desc, /236 levels/);
  assert.match(OBEY.TROPHIES.find((t) => t.id === 'platinum-bossworth').desc, /every chapter/);
  assert.equal(X.getRuin('terms-agreer').level, 233);
  assert.equal(X.JIGSAW.find((j) => j.id === 'jig-9').level, 234);
  assert.equal(X.trickFor(236), 'You chose how to fix the machine. Bossworth just held the wrench.');
});
