'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadGame, play, makeRuntime, normalizePath } = require('./load');

const OBEY = loadGame();
const LEVELS = OBEY.levels;

test('exactly 236 levels are registered, numbered 1..236 in order', () => {
  assert.equal(LEVELS.length, 236);
  assert.equal(OBEY.LEVEL_COUNT, 236);
  LEVELS.forEach((d, i) => assert.equal(d.num, i + 1, `slot ${i}`));
});

test('level ids are unique, stable, kebab-case', () => {
  const ids = LEVELS.map((d) => d.id);
  assert.equal(new Set(ids).size, 236);
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
  assert.equal(new Set(sigs).size, 236);
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

test('Finale-1 (the trust level): the question only appears after all three gears; intro reflects choices', () => {
  const r = makeRuntime(OBEY, OBEY.fromEnd(1), { choices: { gift: 'prank', rule: 'potato' } });
  assert.match(r.rt.line, /bonked me/);
  assert.match(r.rt.line, /potato/);
  assert.equal(r.rt.findObject('yes').hidden, true);
  assert.equal(r.rt.dispatch({ type: 'tap', target: 'yes' }), false);
  play(r.rt, r.clock, r.def.alternatives.why);
  assert.equal(r.log.completed.choices.trust, 'why');
  const nice = makeRuntime(OBEY, OBEY.fromEnd(1), { choices: { gift: 'return', rule: 'door', sign: 'fix' } });
  assert.match(nice.rt.line, /nice to me/);
});

test('Finale (the Instruction Machine): three outcomes; quill only with all secrets; OBEY does not end the game', () => {
  let r = makeRuntime(OBEY, OBEY.FINAL);
  assert.equal(r.rt.findObject('quill').hidden, true);
  assert.equal(r.rt.dispatch({ type: 'tap', target: 'quill' }), false);
  play(r.rt, r.clock, [{ tap: 'obey' }, { tap: 'obey' }]);
  assert.equal(r.log.completed, null);
  play(r.rt, r.clock, [{ hold: ['wrench', 900] }]);
  assert.equal(r.log.completed, null, 'short hold does not repair');
  play(r.rt, r.clock, r.def.solution);
  assert.equal(r.log.completed.ending, 'hero');
  r = makeRuntime(OBEY, OBEY.FINAL);
  play(r.rt, r.clock, r.def.alternatives.chaos);
  assert.equal(r.log.completed.ending, 'chaos');
  r = makeRuntime(OBEY, OBEY.FINAL, { allSecrets: true });
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

/* ------------------------------------------------------------------ 2.0 */
test('every level completes with 3 stars on Easy, Medium and Hard via its intended path', () => {
  for (const d of LEVELS) {
    for (const diff of ['easy', 'medium', 'hard']) {
      const { rt, clock, log } = makeRuntime(OBEY, d.num, { difficulty: diff });
      const path = d.num === 3 && diff === 'hard' ? [{ wait: 15500 }] : d.solution;
      play(rt, clock, path);
      assert.ok(log.completed, `${d.id} on ${diff}`);
      assert.equal(log.completed.stars, 3, `${d.id} on ${diff}`);
      assert.equal(log.completed.difficulty, diff);
    }
  }
});

test('every alternative path (choices, patient routes, endings) completes', () => {
  let count = 0;
  for (const d of LEVELS) {
    for (const [k, raw] of Object.entries(d.alternatives || {})) {
      const p = normalizePath(raw);
      const { rt, clock, log } = makeRuntime(OBEY, d.num, { allSecrets: !!p.allSecrets });
      play(rt, clock, p.steps);
      assert.ok(log.completed, `${d.id} alternative ${k}`);
      count++;
    }
  }
  assert.equal(count, 49, '8 from 1.x/2.0, 20 in the 2.2 levels, 21 in the 2.4 levels');
});

test('Hard: only one hint tier; a trap costs 2 extra actions', () => {
  const { rt, clock } = makeRuntime(OBEY, 12, { difficulty: 'hard' });
  assert.equal(rt.hintLimit(), 1);
  const h1 = rt.hint(), h2 = rt.hint();
  assert.equal(h1.tier, 1); assert.equal(h2.tier, 1); assert.equal(h1.total, 1);
  assert.equal(rt.stats.hints, 1);
  play(rt, clock, [{ tap: 'left' }]);
  assert.equal(rt.stats.fails, 1);
  assert.equal(rt.stats.actions, 3, '1 tap + 2 penalty');
  const m = makeRuntime(OBEY, 12, { difficulty: 'medium' });
  play(m.rt, m.clock, [{ tap: 'left' }]);
  assert.equal(m.rt.stats.actions, 1);
  assert.equal(m.rt.hintLimit(), 3);
});

test('Hard-mode room tweaks: longer countdown (L3), harsher queue (L6), faster flood (L27)', () => {
  let r = makeRuntime(OBEY, 3, { difficulty: 'hard' });
  assert.equal(r.rt.state.t, 15);
  r = makeRuntime(OBEY, 6, { difficulty: 'hard' });
  r.clock.advance(6000);
  play(r.rt, r.clock, [{ tap: 'bell' }]);
  assert.equal(r.rt.state.serving, 12);
  r = makeRuntime(OBEY, 27, { difficulty: 'hard' });
  r.clock.advance(15000);
  assert.equal(r.rt.stats.fails, 1, 'room floods within 15 s on Hard');
  assert.equal(r.rt.state.flood, 0, 'trap resets the water');
  r = makeRuntime(OBEY, 27, { difficulty: 'medium' });
  r.clock.advance(15000);
  assert.equal(r.rt.stats.fails, 0);
  assert.equal(r.rt.state.flood, 7);
});

test('guided runs (Show me how) always score 1 star and are flagged', () => {
  const { rt, clock, log } = makeRuntime(OBEY, 1);
  rt.restart({ guided: true });
  play(rt, clock, [{ tap: 'red' }, { tap: 'blue' }]);
  assert.equal(log.completed.stars, 1);
  assert.equal(log.completed.guided, true);
  rt.restart();
  assert.equal(rt.guided, false, 'a normal restart clears guided mode');
});

test('nope reactions count harmless wrong moves without resetting the room', () => {
  const { rt, clock } = makeRuntime(OBEY, 2);
  play(rt, clock, [{ tap: 'closet' }]);
  assert.equal(rt.nopes, 1);
  assert.equal(rt.nopeTarget, 'closet');
  assert.equal(rt.stats.fails, 0);
  play(rt, clock, [{ tap: 'mat' }]);
  assert.equal(rt.state.matLifted, true);
});

test('traps report a laughing narrator and remember the fail text', () => {
  const { rt, clock } = makeRuntime(OBEY, 16);
  play(rt, clock, [{ tap: 'no' }]);
  assert.equal(rt.mood, 'laughing');
  assert.match(rt.lastFail.text, /TRUTH/);
  assert.equal(rt.state.q, 0);
});

test('new levels: wrong moves behave as documented', () => {
  let r = makeRuntime(OBEY, 15); // volume
  play(r.rt, r.clock, [{ tap: 'door' }, { tap: 'up' }, { tap: 'up' }, { tap: 'up' }]);
  assert.equal(r.rt.nopes, 1); assert.equal(r.rt.stats.fails, 1); assert.equal(r.rt.state.vol, 3);
  r = makeRuntime(OBEY, 17); // sock
  play(r.rt, r.clock, [{ tap: 'd3' }, { tap: 'cat' }, { drop: ['sock', 'narrator'] }]);
  assert.equal(r.log.completed, null); assert.equal(r.rt.nopes, 2);
  r = makeRuntime(OBEY, 18); // simon
  play(r.rt, r.clock, [{ tap: 'drum' }, { tap: 'bell' }]);
  assert.equal(r.rt.stats.fails, 1); assert.equal(r.rt.state.i, 0);
  r = makeRuntime(OBEY, 19); // shy
  play(r.rt, r.clock, [{ tap: 'shy' }, { tap: 'shy' }]);
  assert.equal(r.rt.state.runs, 2); assert.equal(r.log.completed, null);
  play(r.rt, r.clock, [{ tap: 'eyes' }]);
  assert.equal(r.rt.findObject('shy').hidden, true);
  r = makeRuntime(OBEY, 20); // scale
  play(r.rt, r.clock, [{ drop: ['w-MASSIVE', 'pan'] }]);
  assert.equal(r.rt.stats.fails, 1); assert.deepEqual(r.rt.state.pan, []);
  play(r.rt, r.clock, [{ drop: ['w-A', null] }]);
  assert.equal(r.rt.nopes, 1);
  r = makeRuntime(OBEY, 21); // nap
  play(r.rt, r.clock, [{ tap: 'door' }, { tap: 'back' }]);
  assert.equal(r.rt.state.hour, 11); assert.equal(r.rt.nopes, 1);
  play(r.rt, r.clock, [{ tap: 'fwd' }, { tap: 'fwd' }, { tap: 'fwd' }, { tap: 'fwd' }]);
  assert.equal(r.rt.state.hour, 3); assert.equal(r.rt.overlay, 'sleep');
  r = makeRuntime(OBEY, 22); // paint
  play(r.rt, r.clock, [{ tap: 'door' }]);
  assert.equal(r.rt.stats.fails, 1);
  play(r.rt, r.clock, [{ hold: ['fan', 900] }]);
  assert.equal(r.rt.state.wet, true);
  r = makeRuntime(OBEY, 23); // gravity
  play(r.rt, r.clock, [{ tap: 'key' }, { tap: 'door' }]);
  assert.equal(r.rt.nopes, 2); assert.equal(r.rt.state.drift, 1);
  r = makeRuntime(OBEY, 24); // copycat
  play(r.rt, r.clock, [{ tap: 'lampR' }]);
  assert.deepEqual([r.rt.state.L, r.rt.state.R], [false, true]); assert.equal(r.log.completed, null);
  r = makeRuntime(OBEY, 25); // mirror
  play(r.rt, r.clock, [{ tap: 'green' }, { tap: 'orange' }]);
  assert.equal(r.rt.stats.fails, 2);
  r = makeRuntime(OBEY, 26); // twins
  play(r.rt, r.clock, [{ tap: 'q-boss' }]);
  assert.equal(r.rt.findObject('q-meta').disabled, true, 'only one question');
  play(r.rt, r.clock, [{ tap: 'leftdoor' }]);
  assert.equal(r.rt.stats.fails, 1);
  r = makeRuntime(OBEY, 27); // drip
  play(r.rt, r.clock, [{ hold: ['valve', 2500] }]);
  assert.equal(r.log.completed, null); assert.equal(r.rt.nopes, 1);
  r = makeRuntime(OBEY, 28); // swamp
  play(r.rt, r.clock, [{ tap: 's2t' }, { tap: 's1t' }]);
  assert.equal(r.rt.nopes, 1); assert.equal(r.rt.stats.fails, 1);
  r = makeRuntime(OBEY, 29); // tv
  play(r.rt, r.clock, [{ tap: 'hatch' }, { tap: 'chdown' }]);
  assert.equal(r.rt.nopes, 1); assert.equal(r.rt.state.ch, 4);
  r = makeRuntime(OBEY, 30); // password
  play(r.rt, r.clock, [{ tap: 't-password' }, { tap: 'enter' }]);
  assert.equal(r.rt.stats.fails, 1); assert.deepEqual(r.rt.state.entry, []);
  r = makeRuntime(OBEY, 31); // cards
  assert.equal(r.rt.dispatch({ type: 'tap', target: 'cardJ' }), false, 'no picking while shuffling');
  r.clock.advance(5200);
  assert.equal(r.rt.state.pos.J, 1, 'joker ends in the middle');
  play(r.rt, r.clock, [{ tap: 'cardB' }]);
  assert.equal(r.rt.stats.fails, 1);
  r = makeRuntime(OBEY, 32); // lights
  play(r.rt, r.clock, [{ tap: 'b3' }, { tap: 'b2' }]);
  assert.equal(r.log.completed, null);
  r = makeRuntime(OBEY, OBEY.fromEnd(3)); // contract
  play(r.rt, r.clock, [{ tap: 'flap' }, { tap: 'agree' }]);
  assert.equal(r.rt.nopes, 1); assert.equal(r.rt.stats.fails, 1);
  r = makeRuntime(OBEY, OBEY.fromEnd(2)); // quiz
  play(r.rt, r.clock, [{ tap: 'opt2' }, { tap: 'opt1' }]);
  assert.equal(r.rt.stats.fails, 1); assert.equal(r.rt.state.q, 0);
});

test('L32 lights: making every bulb light up is a trap', () => {
  const { rt, clock } = makeRuntime(OBEY, 32);
  play(rt, clock, [{ tap: 'b3' }]);
  assert.deepEqual(rt.state.b, [1, 0, 1, 0, 1], 'a bulb flips itself and its neighbours');
  rt.state.b = [1, 0, 0, 0, 1];
  play(rt, clock, [{ tap: 'b3' }]); // → all five on
  assert.equal(rt.stats.fails, 1);
  assert.deepEqual(rt.state.b, [1, 1, 0, 1, 1], 'reset to the start pattern');
});

test('QA2-D5: Level 3 walkthrough path matches the Hard countdown', () => {
  const d = OBEY.getLevel(3);
  assert.deepEqual(d.guide({ difficulty: 'hard' }), [{ wait: 15500 }]);
  assert.deepEqual(d.guide({ difficulty: 'easy' }), [{ wait: 10500 }]);
  const { rt, clock, log } = makeRuntime(OBEY, 3, { difficulty: 'hard' });
  play(rt, clock, d.guide({ difficulty: 'hard' }));
  assert.ok(log.completed);
});

/* ---------------------------------------------------------------- 2.2 levels */
const NEW = LEVELS.filter((d) => d.num >= 33 && d.num <= 232); // 2.2 (33–132) and 2.4 (133–232)

test('the 200 levels added in 2.2 (33–132) and 2.4 (133–232) sit between Static Summit and the Final Factory', () => {
  assert.equal(NEW.length, 200);
  assert.deepEqual([3, 2, 1, 0].map((k) => OBEY.getLevel(OBEY.fromEnd(k)).id), ['terms-and-conditions', 'the-rehearsal', 'last-instruction', 'final-decision']);
  assert.equal(OBEY.CHAPTERS.length, 59);
  OBEY.CHAPTERS.forEach((c, i) => { assert.equal(c.levels.length, 4, c.id); assert.deepEqual(c.levels, [1, 2, 3, 4].map((k) => i * 4 + k), c.id); });
  assert.equal(new Set(OBEY.CHAPTERS.map((c) => c.name)).size, 59, 'chapter names unique');
});

for (const d of NEW) {
  test(`L${d.num} ${d.id}: declared wrong moves behave as documented; 3★ on every difficulty`, () => {
    assert.ok(typeof d.trick === 'string' && d.trick.length > 15, 'trick');
    assert.ok(d.checks.some((c) => c.expect === 'fail' || c.expect === 'nope'), 'at least one trap or nope');
    for (const c of d.checks) {
      const { rt, clock, log } = makeRuntime(OBEY, d.num);
      const f0 = rt.stats.fails, n0 = rt.nopes;
      play(rt, clock, c.steps);
      const got = log.completed ? 'complete' : (rt.stats.fails > f0 ? 'fail' : (rt.nopes > n0 ? 'nope' : 'playing'));
      assert.equal(got, c.expect, c.name);
    }
    for (const diff of ['easy', 'medium', 'hard']) {
      const { rt, clock, log } = makeRuntime(OBEY, d.num, { difficulty: diff });
      play(rt, clock, d.solution);
      assert.equal(log.completed && log.completed.stars, 3, diff);
    }
    for (const [k, p] of Object.entries(d.ruinPaths || {})) {
      const { rt, clock, log } = makeRuntime(OBEY, d.num);
      play(rt, clock, p);
      assert.equal(log.completed && log.completed.ruin, k, 'ruin ' + k);
      assert.ok(OBEY.extras.getRuin(k), 'ruin registered: ' + k);
    }
  });
}

test('every scripted tap is possible in the real UI (a tap on a draggable object only picks it up)', () => {
  const bad = [];
  const all = LEVELS.concat(OBEY.bonusLevels);
  for (const d of all) {
    const paths = [['solution', d.solution]]
      .concat(Object.entries(d.alternatives || {}).map(([k, p]) => ['alt ' + k, normalizePath(p).steps]))
      .concat(Object.entries(d.ruinPaths || {}).map(([k, p]) => ['ruin ' + k, p]))
      .concat((d.checks || []).map((c) => ['check ' + c.name, c.steps]));
    for (const [name, steps] of paths) {
      const { rt, clock } = makeRuntime(OBEY, d.num);
      for (const st of steps) {
        if (st.tap) { const o = rt.objects().find((x) => x.id === st.tap); if (o && o.drag && !o.hidden) bad.push(`L${d.num} ${name}: tap ${st.tap}`); }
        play(rt, clock, [st]);
      }
    }
  }
  assert.deepEqual(bad, []);
});
