/* Browser-test helpers: local server, page factory with error capture, and UI drivers that play
 * level steps through the real interface (mouse, keyboard or touch). */
'use strict';
const path = require('path');
const fs = require('fs');
const playwright = require('playwright');
/** BROWSER=webkit runs the suite in WebKit (Safari's engine); the default is Chromium. */
const ENGINE = process.env.BROWSER === 'webkit' ? 'webkit' : (process.env.BROWSER === 'firefox' ? 'firefox' : 'chromium');
const { create } = require('../../tools/serve.js');

const ROOT = path.resolve(__dirname, '..', '..');
const SHOTS = path.join(ROOT, 'docs', 'screenshots');
const HOLD_DELAY = 350;

async function startServer() {
  const srv = create();
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  return { srv, url: `http://127.0.0.1:${srv.address().port}/index.html` };
}

/**
 * Opens the game. opts: { viewport, test (bool, default true), clock (bool, default true),
 * seed (save object or function(defaults)), hasTouch, reducedMotion, initScript }
 */
async function openGame(browser, base, opts = {}) {
  const ctx = await browser.newContext({
    viewport: opts.viewport || { width: 1365, height: 900 },
    hasTouch: !!opts.hasTouch,
    isMobile: !!opts.isMobile && ENGINE !== 'firefox',
    permissions: opts.permissions || [],
    reducedMotion: opts.reducedMotion || 'no-preference'
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console.error: ' + m.text()); });
  page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()));
  page.on('request', (r) => { if (!r.url().startsWith('http://127.0.0.1') && !r.url().startsWith('file:') && !r.url().startsWith('data:')) errors.push('external request: ' + r.url()); });
  if (opts.initScript) await page.addInitScript(opts.initScript);
  if (opts.clock !== false) await page.clock.install();
  const url = base + (opts.test === false ? '' : '?test=1') + (opts.hash || '');
  await page.goto(url);
  await page.waitForSelector('.screen:not([hidden])');
  if (opts.seed) await seed(page, opts.seed);
  return { ctx, page, errors };
}

/** Seeds a save. `s` is a save object or a Node-side function(defaults) -> save. */
async function seed(page, s) {
  let data = s;
  if (typeof s === 'function') data = s(await page.evaluate(() => OBEY.save.defaults()));
  await page.evaluate((d) => OBEY_TEST.seed(d), data);
}

/** Save with levels 1..n completed (3 stars), tutorial done, plus optional extras. */
function saveWith(n, extra) {
  return (d) => {
    for (let i = 1; i <= n; i++) { d.completed.push(i); d.bestStars[i] = 3; }
    d.highestUnlocked = Math.min(36, n + 1);
    d.tutorialDone = true;
    return extra ? extra(d) : d;
  };
}

const sel = (id) => (id === 'narrator' ? '#narrator' : `#stage [data-obj="${id}"]`);

async function center(page, selector) {
  const loc = page.locator(selector);
  await loc.scrollIntoViewIfNeeded();
  const b = await loc.boundingBox();
  if (!b) throw new Error('No box for ' + selector);
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}

async function drag(page, id, zone) {
  const a = await center(page, sel(id));
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  await page.mouse.move(a.x + 14, a.y + 14, { steps: 3 });
  // Zones such as "floor" only appear once a drag is in progress.
  const b = await center(page, zone ? sel(zone) : '#stage');
  await page.mouse.move(b.x, b.y, { steps: 10 });
  await page.mouse.up();
}

async function hold(page, id, ms) {
  const a = await center(page, sel(id));
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  await page.clock.runFor(HOLD_DELAY + ms);
  await page.mouse.up();
}

/** Plays declared level steps through the real UI. mode: 'mouse' | 'keyboard'. */
async function playSteps(page, steps, mode = 'mouse') {
  for (const step of steps) {
    if (step.tap) {
      if (mode === 'keyboard') { await page.locator(sel(step.tap)).focus(); await page.keyboard.press('Enter'); } else await page.locator(sel(step.tap)).click();
    } else if (step.drop) {
      if (mode === 'keyboard') {
        await page.locator(sel(step.drop[0])).focus(); await page.keyboard.press('Enter');
        await page.locator(sel(step.drop[1])).focus(); await page.keyboard.press('Enter');
      } else await drag(page, step.drop[0], step.drop[1]);
    } else if (step.hold) {
      if (mode === 'keyboard') {
        await page.locator(sel(step.hold[0])).focus();
        await page.keyboard.down(' ');
        await page.clock.runFor(HOLD_DELAY + step.hold[1]);
        await page.keyboard.up(' ');
      } else await hold(page, step.hold[0], step.hold[1]);
    } else if (step.wait) {
      await page.clock.runFor(step.wait);
    }
  }
}

async function levelDefs(page) {
  return page.evaluate(() => OBEY.levels.map((d) => ({
    num: d.num, id: d.id, solution: d.solution, alternatives: d.alternatives || {},
    secretPaths: d.secretPaths, par: d.par, title: d.title
  })));
}

async function shot(page, name) {
  fs.mkdirSync(SHOTS, { recursive: true });
  await page.waitForTimeout(800); // let CSS entrance animations (real time) settle
  await page.screenshot({ path: path.join(SHOTS, name + '.png') });
}

async function noHorizontalOverflow(page) {
  return page.evaluate(() => {
    const el = document.scrollingElement;
    return { ok: el.scrollWidth <= el.clientWidth + 1, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
  });
}

async function launch() { return playwright[ENGINE].launch(); }

/** The 2.0 first-play flow asks for a difficulty before the tutorial. */
async function chooseDifficulty(page, id) {
  await page.waitForSelector('.difficulty-modal');
  await page.locator('[data-d="' + (id || 'medium') + '"]').click();
  await page.waitForSelector('.difficulty-modal', { state: 'detached' });
}

module.exports = { ENGINE, chooseDifficulty, FINAL: 36, startServer, openGame, seed, saveWith, playSteps, drag, hold, levelDefs, shot, noHorizontalOverflow, launch, sel, ROOT, SHOTS };
