/* Shared helpers for the art QA scripts in tools/art/ (bible §17). Dev-only: needs Playwright. */
'use strict';
const path = require('path');
const { create } = require('../serve.js');

const ROOT = path.resolve(__dirname, '..', '..');
// Read the level count from the game so new level packs are covered automatically.
const LEVEL_COUNT = Number(/OBEY\.LEVEL_COUNT = (\d+)/.exec(require('fs').readFileSync(path.join(ROOT, 'js/core/ns.js'), 'utf8'))[1]);
const ALL_LEVELS = '1-' + LEVEL_COUNT + ',1001-1004';

/** "1-5,9,1001-1004" -> [1,2,3,4,5,9,1001,...] */
function parseList(spec) {
  const out = [];
  for (const part of String(spec || ALL_LEVELS).split(',')) {
    if (!part.trim()) continue;
    const [a, b] = part.split('-').map(Number);
    for (let i = a; i <= (b || a); i++) out.push(i);
  }
  return out;
}

/** --key value / --flag pairs -> object. */
function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) o[k] = argv[++i]; else o[k] = true;
    } else o._.push(a);
  }
  return o;
}

function viewport(spec, def) {
  const m = String(spec || def || '1180x900').match(/^(\d+)x(\d+)$/);
  if (!m) throw new Error('viewport must look like 1180x900');
  return { width: +m[1], height: +m[2] };
}

function pack(n) {
  return n > 1000 ? 'Bonus' : n <= 32 ? 'Core' : n <= 52 ? 'A' : n <= 72 ? 'B' : n <= 92 ? 'C' : n <= 112 ? 'D' : n <= 132 ? 'E' : 'Final';
}

/** Starts the static server and a browser page with every level completed (so replay props show).
 *  opts: { viewport, theme, contrast: 'high', motion: 'reduce' } */
async function open(opts = {}) {
  let chromium;
  try { ({ chromium } = require('playwright')); } catch (e) { throw new Error('Playwright is needed: npm install'); }
  const srv = create();
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch();
  const vp = opts.viewport || { width: 1180, height: 900 };
  const touch = vp.width < 1000;
  const page = await browser.newPage({ viewport: vp, hasTouch: touch, isMobile: vp.width < 500, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${srv.address().port}/index.html?test=1`);
  await page.waitForSelector('.screen:not([hidden])');
  await page.evaluate((o) => {
    const d = OBEY.save.defaults();
    for (let i = 1; i <= OBEY.LEVEL_COUNT; i++) { d.completed.push(i); d.bestStars[i] = 3; }
    d.highestUnlocked = OBEY.LEVEL_COUNT; d.tutorialDone = true; d.seenVersion = OBEY.VERSION;
    d.themes.unlocked = ['classic', 'candy', 'ocean', 'sunset']; d.themes.selected = o.theme || 'classic';
    if (o.contrast) d.settings.contrast = o.contrast;
    if (o.motion) d.settings.motion = o.motion;
    OBEY_TEST.seed(d);
  }, { theme: opts.theme, contrast: opts.contrast, motion: opts.motion });
  async function level(n, wait) {
    await page.evaluate((x) => { location.hash = 'level/' + x; }, n);
    await page.waitForFunction((x) => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === x, n, { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(wait == null ? 350 : wait);
  }
  async function close() { await browser.close(); srv.close(); }
  return { page, browser, errors, level, close };
}

module.exports = { ROOT, ALL_LEVELS, parseList, args, viewport, pack, open };
