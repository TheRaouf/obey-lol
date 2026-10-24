/* Phase B regression tests: one test per defect found by the independent QA review (D1–D9 + latent). */
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
const focused = (page) => page.evaluate(() => document.activeElement && (document.activeElement.getAttribute('data-obj') || document.activeElement.id || document.activeElement.tagName));

test('D1: keyboard focus stays on the object used, including across timer re-renders', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(35) });
  await goLevel(page, 11);
  await page.locator(H.sel('btn-blue')).focus();
  await page.keyboard.press('Enter');
  assert.equal(await focused(page), 'btn-blue');
  await goLevel(page, 5);
  await page.locator(H.sel('st3')).focus();
  await page.keyboard.press('Enter');
  assert.equal(await focused(page), 'st3');
  await goLevel(page, 13);
  await page.locator(H.sel('panel')).focus();
  await page.keyboard.press('Enter');
  await page.locator(H.sel('k4')).focus();
  await page.keyboard.press('Enter');
  assert.equal(await focused(page), 'k4');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  assert.equal(await focused(page), 'k5');
  // L6: the 1.5 s queue interval must not steal focus from the bell.
  await goLevel(page, 6);
  await page.locator(H.sel('bell')).focus();
  await page.clock.runFor(12000);
  assert.equal(await focused(page), 'bell');
  await page.keyboard.press('Enter');
  await page.waitForSelector('#complete:not([hidden])');
  // L35: when the used object disappears, focus moves to the next usable object (not <body>).
  await goLevel(page, 35);
  await page.locator(H.sel('gearA')).focus();
  await page.keyboard.press('Enter');
  const f = await focused(page);
  assert.notEqual(f, 'BODY');
  assert.ok(await page.evaluate(() => document.getElementById('stage').contains(document.activeElement)));
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('D2: releasing a keyboard hold early cancels it; key state never gets stuck', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(35) });
  await goLevel(page, 36);
  await page.locator(H.sel('wrench')).focus();
  await page.keyboard.down(' ');
  await page.clock.runFor(850);
  await page.keyboard.up(' ');
  await page.clock.runFor(4000);
  assert.equal((await page.evaluate(() => OBEY_TEST.runtime())).status, 'playing', 'early release must not repair');
  await goLevel(page, 14);
  await H.playSteps(page, [{ drop: ['battery', 'socket'] }], 'keyboard');
  await page.locator(H.sel('charge')).focus();
  await page.keyboard.down(' ');
  await page.clock.runFor(950);
  await page.keyboard.up(' ');
  await page.clock.runFor(4000);
  assert.equal((await page.evaluate(() => OBEY_TEST.runtime())).state.charged, false, 'meter reset on early release');
  // Hold Enter on the gift, Tab away, release: the gift must still work afterwards.
  await goLevel(page, 9);
  await page.locator(H.sel('gift')).focus();
  await page.keyboard.down('Enter');
  await page.clock.runFor(600);
  await page.keyboard.press('Tab');
  await page.keyboard.up('Enter');
  await page.locator(H.sel('gift')).focus();
  await page.keyboard.press('Enter');
  assert.match(await page.locator('#pick-status').innerText(), /Holding/, 'gift can be picked up again');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('D3: pointer hold released outside the stage ends the hold', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(35) });
  await goLevel(page, 36);
  const box = await page.locator(H.sel('wrench')).boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.clock.runFor(900);
  await page.mouse.move(2, 2, { steps: 5 });
  await page.mouse.up();
  await page.clock.runFor(4000);
  assert.equal((await page.evaluate(() => OBEY_TEST.runtime())).status, 'playing');
  // A proper hold still works afterwards.
  await H.playSteps(page, [{ hold: ['wrench', 2200] }]);
  await page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('D4: completion card is modal — Tab cannot reach the level underneath', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(35) });
  await goLevel(page, 12);
  await page.locator(H.sel('lever')).click();
  await page.waitForSelector('#complete:not([hidden])');
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const inside = await page.evaluate(() => document.getElementById('complete').contains(document.activeElement) || document.activeElement === document.body);
    assert.ok(inside, 'focus escaped the completion card at Tab #' + (i + 1));
  }
  // Leaving the level clears the inert state.
  await page.locator('#complete').getByRole('button', { name: 'Map' }).click();
  await goLevel(page, 1);
  assert.equal(await page.evaluate(() => document.querySelector('.level-body').hasAttribute('inert')), false);
  assert.deepEqual(errors, []);
  await ctx.close();
});

function contrast(a, b) {
  const lum = (c) => { const v = c.map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

test('D5: dark-scene buttons and sunset legends are readable', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(36, (d) => { d.endings.seen = ['chaos']; d.themes.unlocked.push('sunset'); d.themes.selected = 'sunset'; return d; }) });
  await page.evaluate(() => { location.hash = 'ending/chaos'; });
  await page.waitForSelector('[data-end-skip]');
  const c = await page.locator('[data-end-skip]').evaluate((b) => getComputedStyle(b).color);
  const rgb = c.match(/\d+/g).map(Number);
  assert.ok(contrast(rgb, [28, 22, 64]) >= 4.5, 'skip button vs dark stripes: ' + c);
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.waitForSelector('legend');
  const bg = await page.locator('legend').first().evaluate((l) => getComputedStyle(l).backgroundColor);
  assert.notEqual(bg, 'rgba(0, 0, 0, 0)', 'legend has its own background');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('D7: Replay from the completion card counts as a replay (Déjà Vu note appears)', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(0) });
  await goLevel(page, 1);
  assert.equal(await page.locator(H.sel('note')).isHidden(), true);
  await H.playSteps(page, [{ tap: 'red' }, { tap: 'blue' }]);
  await page.waitForSelector('#complete:not([hidden])');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime().status === 'playing');
  assert.equal(await page.locator('#complete').isHidden(), true);
  await page.locator(H.sel('note')).click();
  await page.waitForSelector('.toast >> text=Déjà Vu');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('D8: browser Back closes an open confirm dialog and the tutorial', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(3) });
  await goLevel(page, 2);
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.waitForSelector('#screen-menu:not([hidden])');
  await page.getByRole('button', { name: 'New game' }).click();
  await page.waitForSelector('[role="alertdialog"]');
  await page.goBack();
  await page.waitForFunction(() => OBEY_TEST.screen() === 'level');
  assert.equal(await page.locator('.modal-backdrop').count(), 0);
  assert.equal(await page.evaluate(() => document.getElementById('app').hasAttribute('inert')), false);
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).completed.length, 3, 'nothing reset');
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByRole('button', { name: 'Replay the tutorial' }).click();
  await page.waitForSelector('.tutorial');
  await page.goBack();
  await page.waitForFunction(() => OBEY_TEST.screen() === 'level');
  assert.equal(await page.locator('.tutorial').count(), 0);
  assert.equal(await page.evaluate(() => document.getElementById('app').hasAttribute('inert')), false);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('D9: pressing on the gift and then dragging it still delivers it', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(8) });
  await goLevel(page, 9);
  const g = await page.locator(H.sel('gift')).boundingBox();
  const m = await page.locator(H.sel('mailbox')).boundingBox();
  await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
  await page.mouse.down();
  await page.clock.runFor(500);
  await page.mouse.move(m.x + m.width / 2, m.y + m.height / 2, { steps: 12 });
  await page.mouse.up();
  await page.waitForSelector('#complete:not([hidden])');
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).choices.gift, 'return');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('latent: re-entering the same level never runs two attempts at once', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(2) });
  await goLevel(page, 3);
  await page.clock.runFor(3000);
  await page.evaluate(() => OBEY.app.show('level', 3));
  await page.clock.runFor(11000);
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.stats.levelsFinished, 1);
  assert.deepEqual(errors, []);
  await ctx.close();
});
