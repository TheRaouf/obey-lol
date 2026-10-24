/* iPad checks: every iPad size in both orientations, Split View / Slide Over widths, touch play,
 * rotating mid-level, a hardware keyboard, and Safari-specific touch hygiene.
 * Run with BROWSER=webkit to use WebKit (Safari's engine) — the GitHub Actions workflow does. */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const H = require('./helpers');

// [width, height, name]. Landscape and portrait for each iPad family.
const IPADS = [
  [1024, 768, 'iPad 9.7" landscape'], [768, 1024, 'iPad 9.7" portrait'],
  [1180, 820, 'iPad Air / 10.9" landscape'], [820, 1180, 'iPad Air / 10.9" portrait'],
  [1194, 834, 'iPad Pro 11" landscape'], [834, 1194, 'iPad Pro 11" portrait'],
  [1366, 1024, 'iPad Pro 12.9" landscape'], [1024, 1366, 'iPad Pro 12.9" portrait'],
  [1133, 744, 'iPad mini landscape'], [744, 1133, 'iPad mini portrait']
];
// Split View and Slide Over window sizes (narrow and medium app windows on iPad).
const SPLITS = [[320, 1024, 'Slide Over'], [375, 1024, 'Split View 1/3'], [507, 768, 'Split View 1/2 (9.7")'], [678, 1024, 'Split View 1/2 (12.9")'], [694, 834, 'Split View 2/3 (11")'], [981, 1024, 'Split View 2/3 (12.9")']];
const results = [];

let browser, server, base;
test.before(async () => { browser = await H.launch(); server = await H.startServer(); base = server.url; });
test.after(async () => {
  await browser.close(); server.srv.close();
  fs.mkdirSync(path.join(__dirname, 'results'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'results', 'ipad-' + H.ENGINE + '.json'), JSON.stringify(results, null, 2));
});

const LEVELS = [];
for (let n = 1; n <= 236; n++) LEVELS.push(n);
LEVELS.push(1001, 1002, 1003, 1004);
const seed = H.saveWith(236, (d) => { d.seenVersion = '2.5.0'; return d; });

// WebKit (Safari) ignores hash navigations after ~200 in quick succession on one page — a browser
// anti-abuse limit no player reaches. With 240 levels per iPad size, reload the page every 150 visits.
const visits = new WeakMap();
async function enter(page, n, errors) {
  const v = (visits.get(page) || 0) + 1;
  visits.set(page, v);
  if (v % 150 === 0) { await page.reload(); await page.waitForSelector('.screen:not([hidden])'); }
  await page.evaluate((x) => { location.hash = 'level/' + x; }, n);
  try {
    await page.waitForFunction((x) => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === x, n, { timeout: 15000 });
  } catch (e) {
    const st = await page.evaluate(() => ({ hash: location.hash, screen: OBEY_TEST.screen(), level: OBEY_TEST.runtime() && OBEY_TEST.runtime().level })).catch((x) => ({ evalError: x.message }));
    throw new Error(`Level ${n} did not open: ${JSON.stringify(st)}; page errors: ${(errors || []).slice(-3).join(' | ') || 'none'}`);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

for (const [w, h, name] of IPADS) {
  test(`${name} (${w}×${h}): every level's stage fits on screen without scrolling; no sideways overflow`, async () => {
    const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: w, height: h }, hasTouch: true, isMobile: true, seed });
    const bad = [];
    for (const n of LEVELS) {
      await enter(page, n, errors);
      const r = await page.evaluate(() => {
        const st = document.getElementById('stage').getBoundingClientRect();
        const el = document.scrollingElement;
        return { top: st.top, bottom: st.bottom, left: st.left, right: st.right, w: st.width, ih: innerHeight, iw: innerWidth, over: el.scrollWidth > el.clientWidth + 1 };
      });
      if (r.over) bad.push(`L${n}: sideways overflow`);
      if (r.left < 0 || r.right > r.iw + 1) bad.push(`L${n}: stage off the side`);
      if (r.bottom > r.ih + 1) bad.push(`L${n}: stage bottom ${Math.round(r.bottom)} > ${r.ih}`);
      if (r.w < Math.min(w, h) * 0.5) bad.push(`L${n}: stage too small (${Math.round(r.w)}px)`);
    }
    for (const s of ['menu', 'map', 'settings', 'daily', 'stats', 'sabotage', 'trophies', 'achievements']) {
      await page.evaluate((x) => { location.hash = x; }, s);
      await page.waitForSelector(`#screen-${s}:not([hidden])`);
      if (!(await H.noHorizontalOverflow(page)).ok) bad.push(`${s}: sideways overflow`);
    }
    assert.deepEqual(bad, []);
    if (w === 1024 && h === 768) await enter(page, 15), await page.waitForTimeout(600), await page.screenshot({ path: path.join(H.SHOTS, 'ipad-landscape.png') });
    if (w === 820) await enter(page, 15), await page.waitForTimeout(600), await page.screenshot({ path: path.join(H.SHOTS, 'ipad-portrait.png') });
    results.push({ device: name, viewport: `${w}x${h}`, levels: LEVELS.length, stageFitsOnScreen: true, engine: H.ENGINE });
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}

for (const [w, h, name] of SPLITS) {
  test(`${name} (${w}×${h}): levels and screens have no sideways overflow and the stage stays square and visible`, async () => {
    const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: w, height: h }, hasTouch: true, isMobile: true, seed });
    for (const n of LEVELS) {
      await enter(page, n);
      assert.ok((await H.noHorizontalOverflow(page)).ok, `L${n} overflow`);
      const st = await page.locator('#stage').boundingBox();
      assert.ok(Math.abs(st.width - st.height) < 2 && st.x >= 0 && st.x + st.width <= w + 1, `L${n} stage`);
    }
    for (const s of ['menu', 'map', 'settings', 'daily', 'stats', 'sabotage']) {
      await page.evaluate((x) => { location.hash = x; }, s);
      await page.waitForSelector(`#screen-${s}:not([hidden])`);
      assert.ok((await H.noHorizontalOverflow(page)).ok, s + ' overflow');
    }
    results.push({ device: name, viewport: `${w}x${h}`, levels: LEVELS.length, engine: H.ENGINE });
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}

test('touch play on iPad: tap, tap-to-pick/tap-to-place, press-and-hold with a finger', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: 1024, height: 768 }, hasTouch: true, isMobile: true, seed });
  await enter(page, 8);
  await page.locator(H.sel('crate')).tap();
  await page.locator(H.sel('floor')).tap();
  await page.locator(H.sel('key')).tap();
  await page.locator(H.sel('door')).tap();
  await page.waitForSelector('#complete:not([hidden])');
  await enter(page, 22);
  // A real finger hold: touchstart … touchend dispatched as pointer events.
  const box = await page.locator(H.sel('fan')).boundingBox();
  const cdp = H.ENGINE === 'chromium' ? await ctx.newCDPSession(page) : null;
  if (cdp) {
    const pt = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [pt] });
    await page.clock.runFor(350 + 2300);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    assert.equal((await page.evaluate(() => OBEY_TEST.runtime())).state.wet, false, 'held long enough with a finger');
    await page.locator(H.sel('door')).tap();
    await page.waitForSelector('#complete:not([hidden])');
  }
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('rotating the iPad mid-level keeps the attempt, the held item and focus', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: 1024, height: 768 }, hasTouch: true, isMobile: true, seed });
  await enter(page, 8);
  await page.locator(H.sel('crate')).tap();
  const before = await page.evaluate(() => OBEY_TEST.runtime());
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(100);
  assert.match(await page.locator('#pick-status').innerText(), /Holding: Heavy wooden crate/);
  assert.deepEqual((await page.evaluate(() => OBEY_TEST.runtime())).stats, before.stats);
  await page.locator(H.sel('floor')).tap();
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.locator(H.sel('key')).tap();
  await page.locator(H.sel('door')).tap();
  await page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Magic Keyboard on iPad: shortcuts and full keyboard play', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: 1180, height: 820 }, hasTouch: true, isMobile: true, seed });
  await enter(page, 4);
  await page.keyboard.press('h');
  await page.waitForSelector('#hint-box:not([hidden])');
  await H.playSteps(page, [{ tap: 'lamp' }, { tap: 'painting' }, { tap: 'door' }], 'keyboard');
  await page.waitForSelector('#complete:not([hidden])');
  await page.keyboard.press('n');
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 5);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Safari touch hygiene: no double-tap zoom, no long-press menu or text selection on game controls', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: 1024, height: 768 }, hasTouch: true, isMobile: true, seed });
  await enter(page, 22);
  const css = await page.evaluate(() => {
    const fan = document.querySelector('#stage [data-obj="fan"]');
    const cs = getComputedStyle(fan), html = getComputedStyle(document.documentElement);
    return { htmlTouch: html.touchAction, objTouch: cs.touchAction, select: cs.userSelect || cs.webkitUserSelect, callout: cs.webkitTouchCallout };
  });
  assert.equal(css.htmlTouch, 'manipulation');
  assert.ok(['none', 'manipulation'].includes(css.objTouch));
  assert.equal(css.select, 'none');
  // -webkit-touch-callout only exists in iOS Safari (desktop/Linux WebKit and Chromium drop it), so check
  // that the stylesheet declares it for game controls; real iPad behaviour is on the device checklist.
  const sheet = await page.evaluate(() => fetch('css/style.css').then((r) => r.text()));
  assert.match(sheet, /\.obj[^{]*\{[^}]*-webkit-touch-callout:\s*none/);
  if (css.callout !== undefined) assert.equal(css.callout, 'none');
  const meta = await page.evaluate(() => ({
    viewport: document.querySelector('meta[name="viewport"]').content,
    capable: document.querySelector('meta[name="apple-mobile-web-app-capable"]').content,
    icon: document.querySelector('link[rel="apple-touch-icon"]').getAttribute('href')
  }));
  assert.match(meta.viewport, /viewport-fit=cover/);
  assert.equal(meta.capable, 'yes');
  assert.ok(fs.existsSync(path.join(H.ROOT, meta.icon)));
  assert.deepEqual(errors, []);
  await ctx.close();
});
