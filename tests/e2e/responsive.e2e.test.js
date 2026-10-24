/* Responsive layout checks at the five required viewports, plus resize handling. */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const H = require('./helpers');

const VIEWPORTS = [[320, 700], [390, 844], [768, 1024], [1365, 900], [1920, 1080]];
const SCREENS = ['menu', 'map', 'secrets', 'costumes', 'themes', 'achievements', 'trophies', 'settings', 'credits'];
let browser, server, base;
const results = [];

test.before(async () => { browser = await H.launch(); server = await H.startServer(); base = server.url; });
test.after(async () => {
  await browser.close(); server.srv.close();
  fs.mkdirSync(path.join(__dirname, 'results'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'results', 'responsive.json'), JSON.stringify(results, null, 2));
});

async function checkLayout(page, label) {
  const o = await H.noHorizontalOverflow(page);
  assert.ok(o.ok, `${label}: horizontal overflow ${o.scrollWidth} > ${o.clientWidth}`);
  const issues = await page.evaluate(() => {
    const out = [];
    const vw = document.documentElement.clientWidth;
    const scr = document.querySelector('.screen:not([hidden])');
    // Controls must be inside the viewport horizontally and big enough to tap.
    for (const b of scr.querySelectorAll('button, input, [role="switch"]')) {
      if (b.offsetParent === null) continue;
      const r = b.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.left < -1 || r.right > vw + 1) out.push('offscreen: ' + (b.getAttribute('aria-label') || b.textContent.trim()).slice(0, 40));
      const isStage = b.hasAttribute('data-obj');
      const min = isStage ? 22 : 24;
      if (r.height < min && r.width < 44) out.push(`small: ${(b.getAttribute('aria-label') || b.textContent.trim()).slice(0, 40)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
    // Readable text: nothing visible smaller than 10px.
    for (const el of scr.querySelectorAll('p, span, h1, h2, h3, li, button, label')) {
      if (el.offsetParent === null || !el.textContent.trim()) continue;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      // The Level 14 "fine print" is deliberately small (a secret) but kept at >= 9px.
      const min = el.closest('.fine-print') ? 9 : 10;
      if (fs < min) out.push('tiny text ' + fs + 'px: ' + el.textContent.trim().slice(0, 30));
    }
    // Stage text must stay inside its card (QA defect D6).
    for (const o of document.querySelectorAll('#stage .obj:not([hidden])')) {
      const t = o.querySelector('.obj-text');
      if (!t || o.classList.contains('has-art')) continue;
      const r = o.getBoundingClientRect(), q = t.getBoundingClientRect();
      const over = Math.max(q.right - r.right, r.left - q.left, q.bottom - r.bottom, r.top - q.top);
      if (over > 1.5) out.push(`text overflow ${Math.round(over)}px in ${o.dataset.obj}`);
    }
    return out;
  });
  assert.deepEqual(issues, [], label);
}

for (const [w, h] of VIEWPORTS) {
  test(`viewport ${w}x${h}: all main screens, levels and overlays fit`, async () => {
    const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: w, height: h }, seed: H.saveWith(35, (d) => { d.endings.seen = ['hero', 'chaos']; d.endings.history = [{ id: 'hero', at: 1 }]; return d; }), hasTouch: w < 800, isMobile: w < 800 });
    const dir = path.join(H.SHOTS, 'responsive');
    fs.mkdirSync(dir, { recursive: true });
    for (const s of SCREENS) {
      await page.evaluate((x) => { location.hash = x; }, s);
      await page.waitForSelector(`#screen-${s}:not([hidden])`);
      await checkLayout(page, `${w} ${s}`);
      if (['menu', 'map', 'settings'].includes(s)) await page.waitForTimeout(800), await page.screenshot({ path: path.join(dir, `${s}-${w}x${h}.png`) });
    }
    for (let n = 1; n <= 36; n++) {
      await page.evaluate((x) => { location.hash = 'level/' + x; }, n);
      await page.waitForFunction((x) => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === x, n);
      if (n === 13) await page.locator(H.sel('panel')).click();
      if (n === 10) await page.locator(H.sel('pen')).click();
      if (n === 7) await page.locator(H.sel('honest')).click();
      if (n === 6) await page.clock.runFor(8000);
      await checkLayout(page, `${w} level ${n}`);
      // The stage stays square and fully visible horizontally.
      const st = await page.locator('#stage').boundingBox();
      assert.ok(Math.abs(st.width - st.height) < 2, 'square stage');
      assert.ok(st.x >= 0 && st.x + st.width <= w, 'stage inside viewport');
      if (n === 9 || n === 13) await page.waitForTimeout(500), await page.screenshot({ path: path.join(dir, `level${n}-${w}x${h}.png`) });
    }
    // Wrong-answer card, gag and "Show me how" at this size.
    await page.evaluate(() => { location.hash = 'level/12'; });
    await page.waitForSelector('#stage [data-obj="right"]');
    await page.locator(H.sel('right')).click();
    await page.waitForSelector('#wrong-card:not([hidden])');
    await checkLayout(page, `${w} wrong card`);
    await page.locator('#wrong-card').getByRole('button', { name: 'Show me how' }).click();
    await page.waitForSelector('#guide-box:not([hidden])');
    await checkLayout(page, `${w} guide`);
    if (w === 390) await page.waitForTimeout(400), await page.screenshot({ path: path.join(dir, `guide-${w}x${h}.png`), fullPage: true });
    // Difficulty picker.
    await page.evaluate(() => { location.hash = 'menu'; });
    await page.waitForSelector('#screen-menu:not([hidden])');
    await page.locator('.diff-line').getByRole('button', { name: 'Change' }).click();
    await page.waitForSelector('.difficulty-modal');
    const o2 = await H.noHorizontalOverflow(page);
    assert.ok(o2.ok, 'difficulty modal overflow');
    const mb = await page.locator('.difficulty-modal').boundingBox();
    assert.ok(mb.x >= 0 && mb.x + mb.width <= w + 1, 'modal inside viewport');
    await page.keyboard.press('Escape');
    // Completion overlay and an ending at this size.
    await page.evaluate(() => { location.hash = 'level/12'; });
    await page.waitForSelector('#stage [data-obj="lever"]');
    await page.locator(H.sel('lever')).click();
    await page.waitForSelector('#complete:not([hidden])');
    await checkLayout(page, `${w} complete overlay`);
    const btns = await page.locator('#complete button').evaluateAll((bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return r.bottom <= innerHeight + 1 && r.right <= innerWidth + 1; }));
    assert.ok(btns.every(Boolean), 'overlay buttons reachable without scrolling the page sideways');
    await page.evaluate(() => { location.hash = 'ending/hero'; });
    await page.waitForSelector('.ending-hero');
    await checkLayout(page, `${w} ending`);
    results.push({ viewport: `${w}x${h}`, screens: SCREENS.length, levels: 36, overlay: true, ending: true, result: 'pass' });
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}

test('resizing the window keeps the layout valid', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(3) });
  await page.evaluate(() => { location.hash = 'level/4'; });
  await page.waitForSelector('#stage [data-obj="lamp"]');
  for (const [w, h] of [[1365, 900], [360, 740], [900, 700], [320, 700], [1920, 1080]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(50);
    await checkLayout(page, 'resize ' + w);
    const st = await page.locator('#stage').boundingBox();
    assert.ok(Math.abs(st.width - st.height) < 2);
  }
  // The level still plays after resizing.
  await H.playSteps(page, [{ tap: 'lamp' }, { tap: 'painting' }, { tap: 'door' }]);
  await page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual(errors, []);
  await ctx.close();
});
