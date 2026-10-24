#!/usr/bin/env node
/* Level lab: validates and plays new level files in isolation, optionally rendering screenshots.
 *
 *   node tools/level-lab.js js/levels/045-foo.js [more files...] [--art js/ui/art-pack-a.js] [--shots DIR]
 *
 * Checks for every level file given:
 *  - required fields, 3 hints, par >= 0, unique ids, `trick` sentence, `wrong` list, kebab-case id
 *  - every interactive object has a label; objects stay inside the stage (0..100%); art keys exist
 *  - solution completes with 3 stars on Easy, Medium and Hard (and is not a ruin)
 *  - every `alternatives` path completes; every `ruinPaths` path completes with that ruin id
 *  - every `checks` entry behaves as declared: { name, steps, expect: 'fail'|'nope'|'complete'|'playing' }
 *  - at least one wrong move is a trap (api.fail) or a harmless nope, declared in `checks`
 * With --shots DIR it also renders each level (1024×1024 stage screenshot) via Playwright.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const files = [], arts = [];
let shots = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--art') arts.push(args[++i]);
  else if (args[i] === '--shots') shots = args[++i];
  else files.push(args[i]);
}
if (!files.length) { console.error('Usage: node tools/level-lab.js <level files...> [--art file] [--shots dir]'); process.exit(2); }

global.window = undefined;
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const core = [...html.matchAll(/<script src="(js\/core\/[^"]+)"/g)].map((m) => m[1]);
for (const f of core.concat(['js/ui/art.js', 'js/ui/art-extra.js'], arts)) vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f });
const OBEY = globalThis.OBEY;
const before = new Set(OBEY.levels.filter(Boolean).map((d) => d.num));
for (const f of files) vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f });
const defs = OBEY.levels.filter((d) => d && !before.has(d.num));

let uiProblems = [];
function play(rt, clock, steps) {
  for (const st of steps) {
    // In the real UI a tap on a draggable object picks it up instead of sending a tap.
    if (st.tap) { const o = rt.objects().find((x) => x.id === st.tap); if (o && o.drag && !o.hidden) uiProblems.push(`step "tap ${st.tap}" can't happen in the UI: ${st.tap} is draggable at that moment (a tap picks it up)`); }
    if (st.tap) rt.dispatch({ type: 'tap', target: st.tap });
    else if (st.drop) rt.dispatch({ type: 'drop', target: st.drop[0], zone: st.drop[1] });
    else if (st.hold) { rt.dispatch({ type: 'holdstart', target: st.hold[0] }); clock.advance(st.hold[1]); rt.dispatch({ type: 'holdend', target: st.hold[0] }); }
    else if (st.wait) clock.advance(st.wait);
  }
}
function runtime(def, diff, ctx) {
  const clock = OBEY.createFakeClock();
  const log = { done: null };
  const rt = new OBEY.LevelRuntime(def, { clock, ctx: Object.assign({ replay: false, secrets: [], choices: {}, difficulty: diff || 'medium' }, ctx || {}), hooks: { onComplete: (r) => { log.done = r; } } });
  rt.start();
  return { rt, clock, log };
}

let problems = 0, checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) { problems++; console.log('  ✗ ' + msg); } };

for (const def of defs.sort((a, b) => a.num - b.num)) {
  console.log(`L${def.num} ${def.id} — ${def.title}`);
  ['id', 'num', 'title', 'objective', 'intro', 'par', 'hints', 'init', 'view', 'on', 'done', 'solution', 'wrong', 'trick'].forEach((k) => ok(def[k] !== undefined, 'missing field ' + k));
  ok(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(def.id), 'id must be kebab-case');
  ok(Array.isArray(def.hints) && def.hints.length === 3 && def.hints.every((h) => typeof h === 'string' && h.length > 8), 'exactly 3 real hints');
  ok(typeof def.trick === 'string' && def.trick.length > 15, 'trick sentence');
  ok(Array.isArray(def.checks) && def.checks.some((c) => c.expect === 'fail' || c.expect === 'nope'), 'declare at least one wrong move in checks (expect fail or nope)');
  const { rt } = runtime(def);
  const objs = rt.objects();
  const ids = objs.map((o) => o.id);
  ok(new Set(ids).size === ids.length, 'object ids unique in view');
  for (const o of objs) {
    if (o.kind !== 'static') ok(!!(o.label || o.text), `object ${o.id} needs a label`);
    ok(o.x >= 0 && o.y >= 0 && o.x + o.w <= 100.5 && o.y + o.h <= 100.5, `object ${o.id} outside the stage (${o.x},${o.y},${o.w},${o.h})`);
    if (o.art) ok(OBEY.art.hasObject(o.art), `object ${o.id}: unknown art "${o.art}"`);
    if (o.kind !== 'static' && o.w * o.h < 30 && !o.free) ok(false, `object ${o.id} is very small (${o.w}×${o.h}%): hard to tap on phones`);
  }
  for (const diff of ['easy', 'medium', 'hard']) {
    const r = runtime(def, diff);
    play(r.rt, r.clock, def.solution);
    ok(r.log.done && r.log.done.stars === 3 && !r.log.done.ruin, `solution must finish with 3★ on ${diff} (got ${r.log.done ? r.log.done.stars + '★' : 'not finished'})`);
  }
  for (const [k, p] of Object.entries(def.alternatives || {})) {
    const r = runtime(def);
    play(r.rt, r.clock, Array.isArray(p) ? p : p.steps);
    ok(r.log.done, `alternative ${k} must finish the level`);
  }
  for (const [k, p] of Object.entries(def.ruinPaths || {})) {
    const r = runtime(def);
    play(r.rt, r.clock, p);
    ok(r.log.done && r.log.done.ruin === k, `ruin path ${k} must finish with ruin "${k}"`);
  }
  for (const c of def.checks || []) {
    const r = runtime(def);
    const f0 = r.rt.stats.fails, n0 = r.rt.nopes;
    play(r.rt, r.clock, c.steps);
    const got = r.log.done ? 'complete' : (r.rt.stats.fails > f0 ? 'fail' : (r.rt.nopes > n0 ? 'nope' : 'playing'));
    ok(got === c.expect, `check "${c.name}": expected ${c.expect}, got ${got}`);
  }
  for (const m of new Set(uiProblems)) ok(false, m);
  uiProblems = [];
  // Leaving must cancel timers.
  const r = runtime(def);
  r.rt.destroy();
  ok(r.rt.timeouts.size === 0 && r.rt.intervals.size === 0, 'destroy() must leave no timers');
}

console.log(`\n${defs.length} level(s), ${checks} checks, ${problems} problem(s).`);

if (shots) {
  (async () => {
    const { chromium } = require('playwright');
    const { create } = require('./serve.js');
    fs.mkdirSync(shots, { recursive: true });
    const page = 'lab-' + process.pid + '.html';
    fs.writeFileSync(path.join(ROOT, page), html.replace('<script src="js/ui/art-extra.js"></script>', '<script src="js/ui/art-extra.js"></script>\n' + arts.map((f) => `<script src="${f}"></script>`).join('\n')));
    // Level files must load before the UI; art packs after art-extra.js.
    let page2 = fs.readFileSync(path.join(ROOT, page), 'utf8');
    page2 = page2.replace('<script src="js/levels/b1-red-means-blue.js"></script>', files.map((f) => `<script src="${f}"></script>`).join('\n') + '\n<script src="js/levels/b1-red-means-blue.js"></script>');
    fs.writeFileSync(path.join(ROOT, page), page2);
    const srv = create(); await new Promise((res) => srv.listen(0, '127.0.0.1', res));
    const b = await chromium.launch();
    const p = await b.newPage({ viewport: { width: 1180, height: 900 } });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(`http://127.0.0.1:${srv.address().port}/${page}?test=1`);
    await p.waitForSelector('.screen:not([hidden])');
    await p.evaluate(() => { const d = OBEY.save.defaults(); for (let i = 1; i <= OBEY.LEVEL_COUNT; i++) { d.completed.push(i); d.bestStars[i] = 3; } d.highestUnlocked = OBEY.LEVEL_COUNT; d.tutorialDone = true; d.seenVersion = OBEY.VERSION; OBEY_TEST.seed(d); });
    for (const def of defs) {
      await p.evaluate((n) => { location.hash = 'level/' + n; }, def.num);
      await p.waitForTimeout(500);
      await p.screenshot({ path: path.join(shots, `L${def.num}-${def.id}.png`) });
    }
    console.log('Screenshots in ' + shots + (errs.length ? '\nPage errors: ' + errs.join(' | ') : ''));
    await b.close(); srv.close();
    fs.unlinkSync(path.join(ROOT, page));
    process.exit(problems ? 1 : 0);
  })();
} else process.exit(problems ? 1 : 0);
