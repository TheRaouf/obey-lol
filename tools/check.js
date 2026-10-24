#!/usr/bin/env node
/* Static checks: JS syntax, HTML/CSS references, external dependencies, dead actions,
 * art keys used by levels, leftover TODOs, required files. Exit code 1 on any failure. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const problems = [];
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) problems.push(msg); };
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

function walk(dir, ext) {
  const out = [];
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(rel, ext));
    else if (!ext || ext.includes(path.extname(e.name))) out.push(rel);
  }
  return out;
}

// 1. JavaScript syntax
const jsFiles = walk('js', ['.js']).concat(walk('tests', ['.js']), walk('tools', ['.js']));
for (const f of jsFiles) {
  try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' }); ok(true); } catch (e) { ok(false, `Syntax error in ${f}: ${e.stderr}`); }
}

// 2. HTML structure and references
const html = read('index.html');
ok(/^<!doctype html>/i.test(html), 'index.html: missing doctype');
ok(/<html lang="en"/.test(html), 'index.html: missing lang');
ok(/<meta name="viewport"/.test(html), 'index.html: missing viewport meta');
ok(/<title>[^<]+<\/title>/.test(html), 'index.html: missing title');
const refs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map((m) => m[1]);
for (const r of refs) ok(fs.existsSync(path.join(ROOT, r)), `index.html references missing file ${r}`);
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
ok(new Set(ids).size === ids.length, 'index.html: duplicate ids');
const jsInHtml = refs.filter((r) => r.endsWith('.js'));
for (const f of walk('js', ['.js'])) ok(jsInHtml.includes(f.split(path.sep).join('/')), `JS file not loaded by index.html: ${f}`);

// 3. CSS references
const css = read('css/style.css');
for (const m of css.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
  if (m[1].startsWith('data:')) continue;
  ok(fs.existsSync(path.join(ROOT, 'css', m[1])), `style.css references missing ${m[1]}`);
}
let depth = 0;
for (const ch of css) { if (ch === '{') depth++; if (ch === '}') depth--; if (depth < 0) break; }
ok(depth === 0, 'style.css: unbalanced braces');

// 4. No runtime network dependencies in shipped code
const shipped = walk('js', ['.js']).concat(['index.html', 'css/style.css']);
for (const f of shipped) {
  const src = read(f);
  const urls = [...src.matchAll(/https?:\/\/[^\s'"`)]+/g)].map((m) => m[0]).filter((u) => !u.startsWith('http://www.w3.org/'));
  ok(urls.length === 0, `${f}: external URL(s) ${urls.join(', ')}`);
  ok(!/\bfetch\(|XMLHttpRequest|WebSocket|navigator\.sendBeacon/.test(src), `${f}: network API usage`);
  ok(!/\b(TODO|FIXME|XXX|lorem ipsum)\b/i.test(src), `${f}: leftover TODO/placeholder`);
}

// 5. Every data-act used in the UI has a handler
const uiSrc = walk('js/ui', ['.js']).map(read).join('\n');
const acts = new Set([...uiSrc.matchAll(/data-act="([a-z-]+)"/g)].map((m) => m[1]));
const appSrc = read('js/ui/app.js');
for (const a of acts) {
  if (a === 'setting') { ok(/data-act'\) === 'setting'/.test(appSrc), 'setting handler missing'); continue; }
  ok(new RegExp(`(^|[\\s{,])'?${a}'?\\s*:\\s*function`, 'm').test(appSrc), `data-act="${a}" has no handler in app.js`);
}

// 6. Load the core + levels and validate art keys / object definitions
global.window = undefined;
for (const f of jsInHtml.filter((r) => r.startsWith('js/core/') || r.startsWith('js/levels/') || r === 'js/ui/art.js')) {
  vm.runInThisContext(read(f), { filename: f });
}
const OBEY = globalThis.OBEY;
ok(OBEY.levels.length === OBEY.LEVEL_COUNT && OBEY.LEVEL_COUNT === 36, 'expected 36 levels');
for (const d of OBEY.levels) {
  const rt = new OBEY.LevelRuntime(d, { clock: OBEY.createFakeClock(), ctx: { replay: true, allSecrets: true } }).start();
  for (const o of rt.objects()) {
    if (o.art) ok(OBEY.art.hasObject(o.art), `L${d.num}/${o.id}: unknown art "${o.art}"`);
  }
}

// 7. Required project files
for (const f of ['README.md', 'CHANGELOG.md', 'RELEASE-NOTES.md', 'TEST-REPORT.md', 'FEATURE-ROADMAP.md', 'LICENSE', 'ASSETS.md', 'package.json', 'assets/icon.svg', 'assets/fonts/OFL-BagelFatOne.txt', 'assets/fonts/OFL-AtkinsonHyperlegible.txt']) {
  ok(fs.existsSync(path.join(ROOT, f)), `missing required file ${f}`);
}

if (problems.length) {
  console.error(`Static checks: ${problems.length} problem(s) in ${checks} checks`);
  problems.forEach((p) => console.error(' - ' + p));
  process.exit(1);
}
console.log(`Static checks passed: ${checks} checks, ${jsFiles.length} JS files, ${refs.length} HTML references, ${acts.size} UI actions.`);
