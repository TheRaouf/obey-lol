'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadGame, play, makeRuntime, normalizePath } = require('./load');

const OBEY = loadGame();
const LEVELS = OBEY.levels;

test('exactly 16 levels are registered, numbered 1..16 in order', () => {
  assert.equal(LEVELS.length, 16);
  LEVELS.forEach((d, i) => assert.equal(d.num, i + 1, `slot ${i}`));
});

test('level ids are unique, stable, kebab-case', () => {
  const ids = LEVELS.map((d) => d.id);
  assert.equal(new Set(ids).size, 16);
  ids.forEach((id) => assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/));
});

test('every level has the full specification', () => {
  for (const d of LEVELS) {
    assert.ok(d.title && d.objective, d.id);
    assert.ok(typeof d.intro === 'string' || typeof d.intro === 'function', d.id + ' intro');
    assert.equal(d.hints.length, 3, d.id + ' hints');
    d.hints.forEach((h) => assert.ok(h.length > 5));
    assert.ok(Number.isInteger(d.par) && d.par >= 0, d.id + ' par');
    assert.ok(Array.isArray(d.actions) && d.actions.length, d.id + ' actions');
    assert.ok(Array.isArray(d.wrong) && d.wrong.length, d.id + ' wrong actions');
    assert.ok(typeof d.done === 'string', d.id + ' completion text');
    assert.ok(Array.isArray(d.solution) && d.solution.length, d.id + ' solution path');
    assert.ok(typeof d.endingNote === 'string', d.id + ' ending note');
  }
});

test('levels are not copies of each other (distinct object sets and action mixes)', () => {
  const sigs = LEVELS.map((d) => {
    const { rt } = makeRuntime(OBEY, d.num);
    return rt.objects().map((o) => o.id).sort().join(',');
  });
  assert.equal(new Set(sigs).size, 16);
  const mechanics = new Set(LEVELS.flatMap((d) => d.actions));
  for (const m of ['tap', 'drag', 'hold', 'wait', 'choice', 'sequence']) assert.ok(mechanics.has(m), 'mechanic ' + m);
});

test('object ids are unique within each level view and have accessible labels when interactive', () => {
  for (const d of LEVELS) {
    const { rt } = makeRuntime(OBEY, d.num, { replay: true, allSecrets: true });
    const objs = rt.objects();
    assert.equal(new Set(objs.map((o) => o.id)).size, objs.length, d.id);
    for (const o of objs) {
      if (o.kind !== 'static') assert.ok(o.label && o.label.length > 1, `${d.id}/${o.id} label`);
      for (const k of ['x', 'y', 'w', 'h']) assert.ok(o[k] >= 0 && o[k] <= 100, `${d.id}/${o.id} ${k}`);
      assert.ok(o.x + o.w <= 100.5 && o.y + o.h <= 100.5, `${d.id}/${o.id} inside stage`);
    }
  }
});

for (const d of LEVELS) {
  test(`L${d.num} ${d.id}: intended solution completes the level exactly once`, () => {
    const { rt, clock, log } = makeRuntime(OBEY, d.num);
    play(rt, clock, d.solution);
    assert.ok(log.completed, 'completed');
    assert.equal(log.completed.level, d.num);
    assert.ok(log.completed.stars >= 1 && log.completed.stars <= 3);
    // Further input after completion is ignored (no double completion).
    const before = log.completed;
    assert.equal(rt.dispatch({ type: 'tap', target: d.solution.find((s) => s.tap)?.tap || 'narrator' }), false);
    assert.equal(log.completed, before);
    assert.equal(rt.timeouts.size + rt.intervals.size, 0, 'timers cancelled on completion');
  });

  test(`L${d.num} ${d.id}: restart gives a clean state and cancels timers`, () => {
    const { rt, clock, log } = makeRuntime(OBEY, d.num);
    const fresh = JSON.stringify(rt.state);
    play(rt, clock, d.solution.slice(0, Math.max(0, d.solution.length - 1)));
    rt.hint();
    rt.restart();
    assert.equal(JSON.stringify(rt.state), fresh);
    assert.equal(rt.stats.actions, 0);
    assert.equal(rt.stats.hints, 0);
    assert.equal(rt.status, 'playing');
    // Solution still works after restart.
    play(rt, clock, d.solution);
    assert.ok(log.completed);
  });

  test(`L${d.num} ${d.id}: hints are graduated and never change level state`, () => {
    const { rt } = makeRuntime(OBEY, d.num);
    const before = JSON.stringify(rt.state);
    const h1 = rt.hint(), h2 = rt.hint(), h3 = rt.hint(), h4 = rt.hint();
    assert.deepEqual([h1.tier, h2.tier, h3.tier, h4.tier], [1, 2, 3, 3]);
    assert.equal(rt.stats.hints, 3, 'hint count caps at 3');
    assert.notEqual(h1.text, h3.text);
    assert.equal(JSON.stringify(rt.state), before);
    assert.equal(rt.status, 'playing');
  });

  test(`L${d.num} ${d.id}: leaving the level (destroy) stops all timers`, () => {
    const { rt, clock, log } = makeRuntime(OBEY, d.num);
    rt.destroy();
    clock.advance(120000);
    assert.equal(log.completed, null);
    assert.equal(clock.pending(), 0);
  });
}

test('every declared secret path triggers exactly its secret, once', () => {
  let count = 0;
  for (const d of LEVELS) {
    for (const [id, raw] of Object.entries(d.secretPaths || {})) {
      const p = normalizePath(raw);
      const { rt, clock, log } = makeRuntime(OBEY, d.num, { replay: !!p.replay });
      play(rt, clock, p.steps);
      assert.deepEqual(log.secrets, [id], `${d.id} → ${id}`);
      // Repeating the trigger does not report a new discovery.
      play(rt, clock, p.steps);
      assert.deepEqual(log.secrets, [id], `${d.id} → ${id} not duplicated`);
      count++;
    }
  }
  assert.equal(count, 15);
});

test('secret definitions map 1:1 to level secret paths', () => {
  const fromLevels = LEVELS.flatMap((d) => Object.keys(d.secretPaths || {}));
  assert.deepEqual([...fromLevels].sort(), [...OBEY.SECRET_IDS].sort());
  for (const s of OBEY.SECRETS) {
    const d = OBEY.getLevel(s.level);
    assert.ok(d.secrets.includes(s.id), `${s.id} listed on level ${s.level}`);
  }
});

test('deja-vu note only exists on replay', () => {
  const first = makeRuntime(OBEY, 1, { replay: false });
  assert.equal(first.rt.findObject('note').hidden, true);
  assert.equal(first.rt.dispatch({ type: 'tap', target: 'note' }), false);
  const again = makeRuntime(OBEY, 1, { replay: true });
  assert.equal(again.rt.findObject('note').hidden, false);
});

test('star scoring: par, hints and extra actions', () => {
  const S = OBEY.scoring.stars;
  assert.equal(S(2, 0, 2), 3);
  assert.equal(S(3, 0, 2), 2);
  assert.equal(S(2, 1, 2), 2);
  assert.equal(S(6, 1, 2), 2);
  assert.equal(S(7, 0, 2), 1);
  assert.equal(S(2, 2, 2), 1);
  assert.equal(S(0, 0, 0), 3);
  assert.equal(S(0, 0, 0), S(0, 0, 0), 'deterministic');
});

test('free objects (decor/secrets/narrator) do not cost actions', () => {
  const { rt } = makeRuntime(OBEY, 1);
  rt.dispatch({ type: 'tap', target: 'plant' });
  rt.dispatch({ type: 'tap', target: 'narrator' });
  assert.equal(rt.stats.actions, 0);
  rt.dispatch({ type: 'tap', target: 'red' });
  assert.equal(rt.stats.actions, 1);
});

test('perfect play earns 3 stars on every level', () => {
  for (const d of LEVELS) {
    const { rt, clock, log } = makeRuntime(OBEY, d.num);
    // Use the shortest declared path: solution minus optional extra steps for L7.
    const path = d.num === 7 ? d.secretPaths['tutorial-dropout'] : (d.num === 2 || d.num === 4 ? d.solution : d.solution);
    play(rt, clock, path);
    assert.equal(log.completed.stars, 3, `${d.id} actions=${log.completed.actions} par=${d.par}`);
  }
});

test('L3: pressing the button fails softly and restarts the countdown; stars drop', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 3);
  clock.advance(5000);
  rt.dispatch({ type: 'tap', target: 'button' });
  assert.equal(rt.state.t, 10);
  assert.equal(rt.stats.fails, 1);
  clock.advance(9000);
  assert.equal(log.completed, null);
  clock.advance(1500);
  assert.ok(log.completed);
  assert.equal(log.completed.stars, 2);
});

test('L5: wrong switches fail softly, logic answer is B', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 5);
  play(rt, clock, [{ tap: 'swA' }]);
  assert.equal(log.completed, null);
  assert.equal(rt.status, 'playing');
  play(rt, clock, [{ tap: 'swC' }, { tap: 'swB' }]);
  assert.ok(log.completed);
});

test('L6: ringing early pushes the queue back; no deadline after #17', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 6);
  clock.advance(3000);
  const s = rt.state.serving;
  rt.dispatch({ type: 'tap', target: 'bell' });
  assert.equal(rt.state.serving, s - 1);
  clock.advance(20000);
  assert.equal(rt.state.serving, 17);
  assert.equal(log.completed, null);
  rt.dispatch({ type: 'tap', target: 'bell' });
  assert.ok(log.completed);
});

test('L9: opening the gift fails; both gift choices complete and record the choice', () => {
  let r = makeRuntime(OBEY, 9);
  play(r.rt, r.clock, [{ tap: 'bow' }]);
  assert.equal(r.rt.stats.fails, 1);
  assert.equal(r.log.completed, null);
  play(r.rt, r.clock, r.def.alternatives.prank);
  assert.equal(r.log.completed.choices.gift, 'prank');
  r = makeRuntime(OBEY, 9);
  play(r.rt, r.clock, r.def.solution);
  assert.equal(r.log.completed.choices.gift, 'return');
  // A short hold does not reveal the secret.
  r = makeRuntime(OBEY, 9);
  play(r.rt, r.clock, [{ hold: ['gift', 900] }]);
  assert.deepEqual(r.log.secrets, []);
  assert.equal(r.rt.stats.actions, 0, 'shaking is free');
});

test('L10: sandwich rule keeps the door locked; potato path records chaos choice', () => {
  let r = makeRuntime(OBEY, 10);
  play(r.rt, r.clock, [{ tap: 'pen' }, { tap: 'w-snack' }, { tap: 'door' }]);
  assert.equal(r.log.completed, null);
  r = makeRuntime(OBEY, 10);
  play(r.rt, r.clock, r.def.alternatives.potato);
  assert.equal(r.log.completed.choices.rule, 'potato');
  assert.equal(r.rt.overlay, 'potato');
});

test('L11: a wrong colour clears the entry', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 11);
  play(rt, clock, [{ tap: 'btn-blue' }, { tap: 'btn-yellow' }]);
  assert.equal(rt.state.entry.length, 0);
  play(rt, clock, [{ tap: 'door' }]);
  assert.equal(log.completed, null);
  assert.equal(rt.overlay, 'gag');
});

test('L12: always disobeying fails; trusting the lever succeeds', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 12);
  play(rt, clock, [{ tap: 'left' }, { tap: 'right' }]);
  assert.equal(rt.stats.fails, 2);
  assert.equal(log.completed, null);
  play(rt, clock, [{ tap: 'lever' }]);
  assert.ok(log.completed);
});

test('L13: the gap sends you back; wrong code does not reveal the secret', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 13);
  play(rt, clock, [{ tap: 'left' }, { tap: 'left' }]);
  assert.equal(rt.state.pos, 0);
  play(rt, clock, [{ tap: 'panel' }, { tap: 'k1' }, { tap: 'k2' }, { tap: 'k3' }]);
  assert.deepEqual(log.secrets, []);
  assert.equal(rt.stats.actions, 2, 'keypad presses are free');
});

test('L14: charging without battery does nothing; early release resets', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 14);
  play(rt, clock, [{ hold: ['charge', 2500] }]);
  assert.equal(rt.state.charged, false);
  play(rt, clock, [{ drop: ['battery', 'socket'] }, { hold: ['charge', 800] }]);
  assert.equal(rt.state.charged, false);
  play(rt, clock, [{ hold: ['charge', 2100] }, { wait: 3100 }]);
  assert.equal(rt.state.green, true);
  play(rt, clock, [{ tap: 'opt-doodle' }]);
  assert.equal(log.completed.choices.sign, 'graffiti');
});

test('L15: the question only appears after all three gears; intro reflects choices', () => {
  const r = makeRuntime(OBEY, 15, { choices: { gift: 'prank', rule: 'potato' } });
  assert.match(r.rt.line, /bonked me/);
  assert.match(r.rt.line, /potato/);
  assert.equal(r.rt.findObject('yes').hidden, true);
  assert.equal(r.rt.dispatch({ type: 'tap', target: 'yes' }), false);
  play(r.rt, r.clock, r.def.alternatives.why);
  assert.equal(r.log.completed.choices.trust, 'why');
  const nice = makeRuntime(OBEY, 15, { choices: { gift: 'return', rule: 'door', sign: 'fix' } });
  assert.match(nice.rt.line, /nice to me/);
});

test('L16: three outcomes; quill only with all secrets; OBEY does not end the game', () => {
  let r = makeRuntime(OBEY, 16);
  assert.equal(r.rt.findObject('quill').hidden, true);
  assert.equal(r.rt.dispatch({ type: 'tap', target: 'quill' }), false);
  play(r.rt, r.clock, [{ tap: 'obey' }, { tap: 'obey' }]);
  assert.equal(r.log.completed, null);
  play(r.rt, r.clock, [{ hold: ['wrench', 900] }]);
  assert.equal(r.log.completed, null, 'short hold does not repair');
  play(r.rt, r.clock, r.def.solution);
  assert.equal(r.log.completed.ending, 'hero');
  r = makeRuntime(OBEY, 16);
  play(r.rt, r.clock, r.def.alternatives.chaos);
  assert.equal(r.log.completed.ending, 'chaos');
  r = makeRuntime(OBEY, 16, { allSecrets: true });
  play(r.rt, r.clock, r.def.alternatives.secret.steps);
  assert.equal(r.log.completed.ending, 'secret');
});

test('rapid repeated input on completion is safe', () => {
  const { rt, log } = makeRuntime(OBEY, 12);
  let completions = 0;
  rt.hooks.onComplete = () => { completions++; };
  for (let i = 0; i < 25; i++) rt.dispatch({ type: 'tap', target: 'lever' });
  assert.equal(completions, 1);
  assert.equal(log.completed, null, 'original hook replaced');
});

test('unmatched holdend and unknown targets are ignored', () => {
  const { rt } = makeRuntime(OBEY, 14);
  assert.equal(rt.dispatch({ type: 'holdend', target: 'charge' }), false);
  assert.equal(rt.dispatch({ type: 'tap', target: 'does-not-exist' }), false);
  assert.equal(rt.dispatch({ type: 'tap' }), false);
});

test('costume aside is prefixed to the intro, but not on the silent level', () => {
  const r = makeRuntime(OBEY, 2, { costumeAside: 'BEEP.' });
  assert.match(r.rt.line, /^BEEP\. /);
  const s = makeRuntime(OBEY, 11, { costumeAside: 'BEEP.' });
  assert.equal(s.rt.line, '…');
});
