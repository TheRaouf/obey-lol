/* 2.1 QA regression tests: one per defect from the third independent review (QA3-D1…D19). */
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
const withSave = (n, extra) => H.saveWith(n, (d) => { d.seenVersion = '2.5.0'; return extra ? extra(d) : d; });
const save = (page) => page.evaluate(() => OBEY_TEST.save());

test('QA3-D1: with storage blocked, switching players and back keeps progress', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, {
    initScript: () => { const deny = () => { throw new Error('denied'); }; Object.defineProperty(window, 'localStorage', { get: deny }); }
  });
  await H.seed(page, withSave(5));
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByRole('button', { name: 'Play as Player 2' }).click();
  await page.waitForSelector('#screen-menu:not([hidden])');
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByRole('button', { name: 'Play as Player 1' }).click();
  await page.waitForSelector('#screen-menu:not([hidden])');
  assert.equal((await save(page)).completed.length, 5);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA3-D2: timed levels pause behind dialogs, so Skip cannot misreport a finished level', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(2) });
  await goLevel(page, 3);
  await page.locator('#skip-btn').click();
  await page.clock.runFor(20000); // the 10 s countdown would have finished
  assert.equal((await page.evaluate(() => OBEY_TEST.runtime())).status, 'playing');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.clock.runFor(10600);
  await page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA3-D3/D14: Easy sparkle and "Point me" follow the solution — never wrong moves or finished steps', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(22, (d) => { d.difficulty = 'easy'; return d; }) });
  await goLevel(page, 23);
  const warm = () => page.evaluate(() => OBEY_TEST.sounds.filter((x) => x === 'warmer').length);
  const w0 = await warm();
  await page.locator(H.sel('key')).click(); // floating key: a nope
  await page.locator(H.sel('door')).click(); // locked: a nope
  assert.equal(await warm(), w0);
  await page.locator(H.sel('lever')).click();
  assert.equal(await warm(), w0 + 1);
  for (let i = 0; i < 3; i++) await page.locator('#hint-btn').click();
  assert.ok(await page.locator(H.sel('key')).evaluate((b) => b.classList.contains('guide-target')), 'points at the next step, not the lever');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA3-D4: hold assist leaves drag-and-hold objects holdable from the keyboard (Level 9 secret)', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(8, (d) => { d.settings.holdAssist = true; return d; }) });
  await goLevel(page, 9);
  assert.equal(await page.locator(H.sel('gift')).getAttribute('aria-describedby'), 'hold-help');
  await page.locator(H.sel('gift')).focus();
  await page.keyboard.down(' ');
  await page.clock.runFor(2600);
  await page.keyboard.up(' ');
  assert.ok((await save(page)).secrets.includes('shaken'));
  assert.deepEqual(errors, []);
  await ctx.close();
});

for (const [w, h] of [[694, 768], [584, 820], [844, 390], [1180, 500], [667, 375]]) {
  test(`QA3-D5: the stage fits without scrolling in a ${w}×${h} window`, async () => {
    const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: w, height: h }, hasTouch: true, isMobile: true, seed: withSave(236) });
    for (const n of [9, 15, 26, 81, 89, 233]) {
      await goLevel(page, n);
      await page.evaluate(() => window.scrollTo(0, 0));
      const r = await page.evaluate(() => { const b = document.getElementById('stage').getBoundingClientRect(); return { bottom: b.bottom, ih: innerHeight, w: b.width, over: document.scrollingElement.scrollWidth > innerWidth + 1 }; });
      assert.ok(r.bottom <= r.ih + 1, `L${n}: stage bottom ${Math.round(r.bottom)} > ${r.ih}`);
      assert.ok(!r.over, `L${n}: sideways overflow`);
      assert.ok(r.w >= 200, `L${n}: stage too small (${Math.round(r.w)})`);
    }
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}

test('QA3-D6/D17: sliders stay usable and the menu never scrolls sideways at 320 px with extra-large text', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { viewport: { width: 320, height: 700 }, hasTouch: true, isMobile: true, seed: withSave(3, (d) => { d.settings.textSize = 'xl'; d.seenVersion = ''; return d; }) });
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.waitForSelector('#screen-menu:not([hidden])');
  assert.ok((await H.noHorizontalOverflow(page)).ok, 'menu');
  await page.evaluate(() => { location.hash = 'settings'; });
  const widths = await page.locator('input[type="range"]').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().width));
  assert.ok(widths.every((x) => x >= 180), 'slider tracks: ' + widths.join(', '));
  assert.ok((await H.noHorizontalOverflow(page)).ok, 'settings');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA3-D9/D16: bonus label in Settings; corrupt profile save warns when switching', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(12) });
  await page.evaluate(() => localStorage.setItem('obeylol.save.p2', '{broken'));
  await goLevel(page, 1004);
  await page.evaluate(() => { location.hash = 'settings'; });
  assert.equal(await page.getByRole('button', { name: 'Back to Bonus 4' }).count(), 1);
  await page.getByRole('button', { name: 'Play as Player 2' }).click();
  await page.waitForSelector('.toast-warn');
  assert.match(await page.locator('.toast-warn').last().innerText(), /could not be read/);
  assert.deepEqual(errors.filter((e) => !/broken/.test(e)), []);
  await ctx.close();
});

test('QA3-D10: "you did this PROPERLY before" only after a proper finish', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(0, (d) => { d.tutorialDone = true; return d; }) });
  await goLevel(page, 1);
  for (let i = 0; i < 8; i++) await page.locator(H.sel('red')).click();
  await page.waitForSelector('#complete:not([hidden])');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime().status === 'playing');
  for (let i = 0; i < 8; i++) await page.locator(H.sel('red')).click();
  await page.waitForSelector('#complete:not([hidden])');
  assert.doesNotMatch(await page.locator('#complete').innerText(), /PROPERLY before/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA3-D12/D13: music follows the chapter; no U.N.D.O. tip after the level is finished', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(12, (d) => { d.settings.music = true; return d; }) });
  await page.mouse.click(5, 5);
  await goLevel(page, 12);
  const ch1 = await page.evaluate(() => OBEY.audio.musicChapter());
  await page.locator(H.sel('lever')).click();
  await page.waitForSelector('#complete:not([hidden])');
  await page.clock.runFor(25000);
  assert.doesNotMatch(await page.locator('#undo-chat .undo-log').innerText(), /Psst/, 'no sabotage tip after finishing');
  await page.locator('#complete').getByRole('button', { name: 'Next level' }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 13);
  assert.notEqual(await page.evaluate(() => OBEY.audio.musicChapter()), ch1);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA3-D15: a dialog opened from a dialog keeps the page inert; Escape closes only the top one', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(5) });
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByRole('button', { name: 'Reset all progress' }).click();
  await page.evaluate(() => { navigator.clipboard.writeText = () => Promise.reject(new Error('no')); });
  await page.getByRole('button', { name: 'Copy my save code first' }).click();
  await page.waitForSelector('#tm-text');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.modal-backdrop').count(), 1, 'the confirm is still open');
  assert.equal(await page.locator('#app').getAttribute('inert'), '');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.modal-backdrop').count(), 0);
  assert.equal(await page.locator('#app').getAttribute('inert'), null);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('QA3-D18: U.N.D.O. header text is readable in high-contrast mode', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(10, (d) => { d.settings.contrast = 'high'; return d; }) });
  await goLevel(page, 10);
  const col = await page.locator('.undo-head .small').evaluate((e) => getComputedStyle(e).color);
  assert.notEqual(col, 'rgb(0, 0, 0)');
  assert.deepEqual(errors, []);
  await ctx.close();
});
