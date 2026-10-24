/* 2.0 QA regression tests: one per defect found by the second independent review (QA2-D1…D11). */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const H = require('./helpers');

let browser, server, base;
test.before(async () => { browser = await H.launch(); server = await H.startServer(); base = server.url; });
test.after(async () => { await browser.close(); server.srv.close(); });

async function goLevel(page, n) {
  await page.evaluate((x) => { location.hash = 'level/' + x; }, n);
  await page.waitForFunction((x) => { const r = OBEY_TEST.runtime(); return r && r.level === x && r.status === 'playing'; }, n);
}
const withDiff = (n, diff, extra) => H.saveWith(n, (d) => { d.difficulty = diff; return extra ? extra(d) : d; });
const status = (page) => page.evaluate(() => OBEY_TEST.runtime());

test('QA2-D1: a move outside the walkthrough restarts it, so following it always solves the level', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(235, 'easy') });
  // L24: deviate, then follow the guide.
  await goLevel(page, 24);
  await page.locator('#guide-btn').click();
  await page.locator(H.sel('lampR')).click();
  await page.waitForSelector('#guide-box .guide-note');
  assert.match(await page.locator('#guide-box').innerText(), /not part of the walkthrough/);
  assert.match(await page.locator('#guide-box').innerText(), /step 1 of 2/);
  await H.playSteps(page, [{ drop: ['fish', 'cat'] }, { tap: 'lampR' }]);
  await page.waitForSelector('#complete:not([hidden])');
  // L32: the walkthrough must never lead into the all-lights-on trap.
  await goLevel(page, 32);
  await page.locator('#guide-btn').click();
  await page.locator(H.sel('b2')).click();
  await H.playSteps(page, [{ tap: 'b1' }, { tap: 'b5' }]);
  await page.waitForSelector('#complete:not([hidden])');
  assert.equal((await status(page)).result.fails, 0);
  // L15: interleaved wrong presses can't strand the guide.
  await goLevel(page, 15);
  await page.locator('#guide-btn').click();
  await page.locator(H.sel('down')).click();
  await page.locator(H.sel('up')).click();
  assert.match(await page.locator('#guide-box').innerText(), /step 1 of 5/);
  await H.playSteps(page, [{ tap: 'down' }, { tap: 'down' }, { tap: 'down' }, { tap: 'door' }, { tap: 'door' }]);
  await page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D2: a hold that is too short does not advance the walkthrough', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(235, 'easy') });
  await goLevel(page, 22);
  await page.locator('#guide-btn').click();
  await H.hold(page, 'fan', 1900);
  assert.match(await page.locator('#guide-box').innerText(), /step 1 of 2/);
  assert.equal((await status(page)).state.wet, true);
  await H.hold(page, 'fan', 2200);
  assert.match(await page.locator('#guide-box').innerText(), /step 2 of 2/);
  assert.equal((await status(page)).state.wet, false);
  await page.locator(H.sel('door')).click();
  await page.waitForSelector('#complete:not([hidden])');
  assert.equal((await status(page)).result.fails, 0);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D3/D4: migrated 1.x save — continue order, final level unlocks, replaying the finale skips nothing', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, {
    initScript: () => {
      if (sessionStorage.getItem('m')) return;
      sessionStorage.setItem('m', '1');
      const done = []; const stars = {};
      for (let n = 1; n <= 16; n++) { done.push(n); stars[n] = 3; }
      localStorage.setItem('obeylol.save', JSON.stringify({ version: 2, highestUnlocked: 16, completed: done, bestStars: stars, secrets: [], tutorialDone: true, endings: { seen: ['hero'], history: [{ id: 'hero', at: 1 }] }, settings: { sound: true } }));
    }
  });
  let s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.highestUnlocked, 15);
  await goLevel(page, 235);
  await H.playSteps(page, [{ tap: 'gearA' }, { tap: 'rug' }, { tap: 'gearB' }, { tap: 'narrator' }, { tap: 'yes' }]);
  await page.waitForSelector('#complete:not([hidden])');
  s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.highestUnlocked, 15, 'replaying 235 does not open Levels 16–234');
  await page.evaluate(() => { location.hash = 'map'; });
  await page.waitForSelector('#screen-map:not([hidden])');
  assert.equal(await page.locator('.map-node[data-level="20"].node-locked').count(), 1);
  assert.match(await page.locator('.map-side').innerText(), /Play Level 15/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D5: on Hard, the Level 3 walkthrough waits for the full 15-second countdown', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(2, 'hard') });
  await goLevel(page, 3);
  for (let i = 0; i < 3; i++) await page.locator(H.sel('button')).click();
  await page.locator('#guide-btn').click();
  assert.match(await page.locator('#guide-box li.current').innerText(), /Wait about 16 seconds/);
  await page.clock.runFor(15800);
  await page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D6: stopping the walkthrough gives a normally scored attempt and keeps the guide available', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(24, 'medium') });
  await goLevel(page, 25);
  await page.locator(H.sel('green')).click();
  await page.locator('#wrong-card').getByRole('button', { name: 'Show me how' }).click();
  await page.locator('#guide-box').getByRole('button', { name: 'Stop guide' }).click();
  assert.equal(await page.locator('#guide-box').isHidden(), true);
  assert.ok(!(await page.locator('#guide-btn').evaluate((b) => b.classList.contains('locked-chip'))), 'still available');
  await page.locator(H.sel('purple')).click();
  await page.waitForSelector('#complete:not([hidden])');
  const r = (await status(page)).result;
  assert.equal(r.guided, false);
  assert.equal(r.stars, 3);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D7: the difficulty picker returns focus and marks the current choice for assistive tech', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(3, 'hard') });
  await page.evaluate(() => { location.hash = 'menu'; });
  const change = page.locator('.diff-line').getByRole('button', { name: 'Change' });
  await change.focus();
  await page.keyboard.press('Enter');
  await page.waitForSelector('.difficulty-modal');
  assert.equal(await page.locator('[data-d="hard"]').getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('[data-d="easy"]').getAttribute('aria-pressed'), 'false');
  await page.keyboard.press('Escape');
  assert.ok(await page.evaluate(() => document.activeElement && /Change/.test(document.activeElement.textContent)), 'focus back on Change');
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).difficulty, 'hard');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D8: the trap card is announced and scrolled into view', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(11, 'medium') });
  await goLevel(page, 12);
  await page.locator(H.sel('left')).click();
  await page.waitForSelector('#wrong-card:not([hidden])');
  assert.equal(await page.locator('#wrong-card').getAttribute('role'), 'alert');
  await page.waitForTimeout(600);
  const inView = await page.locator('#wrong-card').evaluate((c) => { const r = c.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight + 1; });
  assert.ok(inView, 'card visible without manual scrolling');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D9: the walkthrough panel is not rebuilt on every timer tick', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(26, 'easy') });
  await goLevel(page, 27);
  await page.locator('#guide-btn').click();
  await page.waitForSelector('#guide-box:not([hidden])');
  await page.evaluate(() => { window.__mut = 0; new MutationObserver((m) => { window.__mut += m.length; }).observe(document.getElementById('guide-box'), { childList: true, subtree: true, characterData: true }); });
  await page.clock.runFor(10000);
  assert.equal(await page.evaluate(() => window.__mut), 0);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D10: the "nope" sticker shows even when the object changes its picture', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(16, 'medium') });
  await goLevel(page, 17);
  await page.locator(H.sel('d1')).click();
  await page.waitForSelector('#stage [data-obj="d1"] .nope-sticker');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA2-D11: Escape in the New Game difficulty picker still starts the new game', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(4, 'easy') });
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.getByRole('button', { name: 'New game' }).click();
  await page.getByRole('button', { name: 'Start new game' }).click();
  await page.waitForSelector('.difficulty-modal');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 1);
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).difficulty, 'easy');
  assert.deepEqual(errors, []);
  await ctx.close();
});
