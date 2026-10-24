/* Loads the DOM-free game core and level definitions into an isolated VM context for Node tests. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');

function scriptOrder() {
  // Mirror the order used in index.html, so tests load exactly what the browser loads.
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const srcs = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map((m) => m[1]);
  return srcs.filter((s) => s.startsWith('js/core/') || s.startsWith('js/levels/'));
}

function loadGame() {
  // Run in this realm (each test file is its own Node process) so arrays/objects compare
  // structurally with node:assert. The scripts attach to globalThis.OBEY because `window` is absent.
  if (typeof window !== 'undefined') throw new Error('Unit tests expect a non-browser environment');
  if (globalThis.OBEY) return globalThis.OBEY;
  for (const rel of scriptOrder()) {
    const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    vm.runInThisContext(code, { filename: rel });
  }
  return globalThis.OBEY;
}

/** Plays a list of steps ({tap}, {drop}, {hold}, {wait}) against a runtime driven by a fake clock. */
function play(rt, clock, steps) {
  for (const step of steps) {
    if (step.tap) rt.dispatch({ type: 'tap', target: step.tap });
    else if (step.drop) rt.dispatch({ type: 'drop', target: step.drop[0], zone: step.drop[1] });
    else if (step.hold) {
      rt.dispatch({ type: 'holdstart', target: step.hold[0] });
      clock.advance(step.hold[1]);
      rt.dispatch({ type: 'holdend', target: step.hold[0] });
    } else if (step.wait) clock.advance(step.wait);
  }
}

/** Creates a runtime for level `num` with a fake clock and recording hooks. */
function makeRuntime(OBEY, num, ctx) {
  const clock = OBEY.createFakeClock();
  const log = { secrets: [], completed: null, changes: 0 };
  const def = OBEY.getLevel(num);
  const rt = new OBEY.LevelRuntime(def, {
    clock,
    ctx: Object.assign({ replay: false, secrets: [], choices: {}, allSecrets: false }, ctx || {}),
    hooks: {
      onChange: () => { log.changes++; },
      onSecret: (id, isNew) => { if (isNew) log.secrets.push(id); },
      onComplete: (r) => { log.completed = r; }
    }
  });
  rt.start();
  return { rt, clock, log, def };
}

function normalizePath(p) {
  if (Array.isArray(p)) return { steps: p };
  return p;
}

module.exports = { loadGame, play, makeRuntime, normalizePath, ROOT };
