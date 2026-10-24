/* 2.5 browser tests: the sound & music controls in the game interface — the speaker chip on every top bar,
 * the menu slip, the S shortcut, live switches and volumes, and music outside levels (not in endings). */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const H = require('./helpers');

let browser, server, base;
test.before(async () => { browser = await H.launch(); server = await H.startServer(); base = server.url; });
test.after(async () => { await browser.close(); server.srv.close(); });

const VERSION = require('../../package.json').version;
const withSave = (n, extra) => H.saveWith(n, (d) => { d.seenVersion = VERSION; return extra ? extra(d) : d; });
const save = (page) => page.evaluate(() => OBEY_TEST.save());
async function goLevel(page, n) {
  await page.evaluate((x) => { location.hash = 'level/' + x; }, n);
  await page.waitForFunction((x) => { const r = OBEY_TEST.runtime(); return r && r.level === x && r.status === 'playing'; }, n);
}

test('a speaker chip sits on the level bar and every back-bar screen; the menu has a Sound & music slip', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(5) });
  await goLevel(page, 3);
  assert.equal(await page.locator('#screen-level .sound-chip').count(), 1);
  assert.match(await page.locator('#screen-level .sound-chip').getAttribute('aria-label'), /Sound and music \(sound and music on\)/);
  for (const s of ['map', 'settings', 'trophies', 'achievements', 'daily', 'stats']) {
    await page.evaluate((x) => { location.hash = x; }, s);
    await page.waitForSelector(`#screen-${s}:not([hidden])`);
    assert.equal(await page.locator(`#screen-${s} .sound-chip`).count(), 1, s);
  }
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.waitForSelector('#screen-menu:not([hidden])');
  assert.match(await page.locator('.menu-nav [data-act="sound-panel"]').innerText(), /Sound & music\s*Music on/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('the panel switches sound effects and music live, saves volumes, and updates the chips', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(5) });
  await page.mouse.click(5, 5); // first gesture: audio may start
  await goLevel(page, 3);
  assert.equal(await page.evaluate(() => OBEY.audio.musicOn()), true, 'music on by default in a level');
  await page.locator('#screen-level .sound-chip').click();
  const panel = page.locator('.sound-panel');
  await panel.waitFor();
  assert.match(await panel.locator('.sp-now').innerText(), /Now playing: Button Bay theme/);
  // Music off.
  await panel.getByRole('switch', { name: 'Music' }).click();
  assert.equal((await save(page)).settings.music, false);
  assert.equal(await page.evaluate(() => OBEY.audio.musicOn()), false);
  assert.equal(await panel.getByRole('switch', { name: 'Music' }).getAttribute('aria-checked'), 'false');
  assert.match(await page.locator('#screen-level .sound-chip').getAttribute('aria-label'), /sound on, music off/);
  // Volumes change live and are saved on release.
  await panel.getByLabel('Effects volume').fill('35');
  await panel.getByLabel('Effects volume').dispatchEvent('change');
  assert.equal(await page.evaluate(() => OBEY.audio.volume('sfx')), 35);
  assert.equal((await save(page)).settings.sfxVol, 35);
  // Voice choice.
  await panel.getByRole('radio', { name: 'Off' }).check();
  assert.equal((await save(page)).settings.voice, 'off');
  // Sound effects off mutes everything; the chip shows the muted speaker.
  await panel.getByRole('switch', { name: 'Sound effects' }).click();
  assert.equal((await save(page)).settings.sound, false);
  assert.equal(await page.evaluate(() => OBEY.audio.isEnabled()), false);
  assert.match(await page.locator('#screen-level .sound-chip').getAttribute('aria-label'), /sound off/);
  // Music back on and sound back on: music resumes.
  await panel.getByRole('switch', { name: 'Music' }).click();
  await panel.getByRole('switch', { name: 'Sound effects' }).click();
  assert.equal(await page.evaluate(() => OBEY.audio.musicOn()), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.sound-panel').count(), 0);
  assert.equal(await page.locator('#app').getAttribute('inert'), null, 'the page is usable again');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('S opens the panel from anywhere but an ending; music plays on the menu and map and stops in endings', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(H.FINAL, (d) => { d.endings.seen = ['hero']; d.endings.history = [{ id: 'hero', at: 1 }]; return d; }) });
  await page.mouse.click(5, 5);
  await page.evaluate(() => { location.hash = 'map'; });
  await page.waitForSelector('#screen-map:not([hidden])');
  await page.waitForFunction(() => OBEY.audio.musicOn() === true);
  await page.keyboard.press('s');
  await page.locator('.sound-panel').waitFor();
  await page.getByRole('button', { name: 'Done' }).click();
  assert.equal(await page.locator('.sound-panel').count(), 0);
  await page.evaluate(() => { location.hash = 'ending/hero'; });
  await page.waitForSelector('.ending-hero');
  await page.waitForFunction(() => OBEY.audio.musicOn() === false);
  assert.deepEqual(errors, []);
  await ctx.close();
});
