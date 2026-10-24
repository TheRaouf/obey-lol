/* Secrets, cosmetics, achievements, persistence, settings, input methods and robustness — in a real browser. */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const H = require('./helpers');

let browser, server, base;
const matrix = [];

test.before(async () => { browser = await H.launch(); server = await H.startServer(); base = server.url; });
test.after(async () => {
  await browser.close(); server.srv.close();
  fs.mkdirSync(path.join(__dirname, 'results'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'results', 'secrets.json'), JSON.stringify(matrix, null, 2));
});

async function goLevel(page, n) {
  await page.evaluate((x) => { location.hash = 'level/' + x; }, n);
  await page.waitForFunction((x) => { const r = OBEY_TEST.runtime(); return r && r.level === x && r.status === 'playing'; }, n);
}

/* ------------------------------------------------------------------ secrets */
test('all 15 secrets: discoverable via the UI, counted once, persisted after reload', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(235) });
  const defs = await H.levelDefs(page);
  const secrets = await page.evaluate(() => OBEY.SECRETS);
  for (const sec of secrets) {
    const d = defs[sec.level - 1];
    const p = Array.isArray(d.secretPaths[sec.id]) ? { steps: d.secretPaths[sec.id] } : d.secretPaths[sec.id];
    const before = (await page.evaluate(() => OBEY_TEST.save())).secrets.length;
    await goLevel(page, sec.level);
    await H.playSteps(page, p.steps);
    await page.waitForSelector(`.toast >> text=Secret found: ${sec.name}`);
    let s = await page.evaluate(() => OBEY_TEST.save());
    assert.ok(s.secrets.includes(sec.id), sec.id);
    assert.equal(s.secrets.length, before + 1, sec.id + ' counted once');
    // Replay the level and trigger it again: no duplicate.
    await page.evaluate(() => { location.hash = 'map'; });
    await page.waitForSelector('#screen-map:not([hidden])');
    await goLevel(page, sec.level);
    await H.playSteps(page, p.steps);
    s = await page.evaluate(() => OBEY_TEST.save());
    assert.equal(s.secrets.filter((x) => x === sec.id).length, 1, sec.id + ' not duplicated');
    assert.equal(s.secrets.length, before + 1);
    matrix.push({ id: sec.id, level: sec.level, trigger: sec.how, expected: 'toast + saved once', result: 'pass', replayDuplicate: 'none' });
  }
  // Persist across reload.
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.secrets.length, 15);
  assert.ok(s.achievements['secret-master'] && s.achievements.collector && s.achievements['secret-agent']);
  assert.ok(s.costumes.unlocked.includes('alien') && s.costumes.unlocked.includes('dino'));
  await page.evaluate(() => { location.hash = 'secrets'; });
  await page.waitForSelector('#screen-secrets:not([hidden])');
  assert.equal(await page.locator('.note-card.found').count(), 15);
  await H.shot(page, 'secret-field-notes');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('field notes: undiscovered secrets show clues only for reached levels', async () => {
  const { page, ctx, errors } = await H.openGame(browser, base, { seed: H.saveWith(2, (d) => { d.secrets = ['plant-whisperer']; return d; }) });
  await page.evaluate(() => { location.hash = 'secrets'; });
  await page.waitForSelector('#screen-secrets:not([hidden])');
  assert.equal(await page.locator('.note-card.found').count(), 1);
  const text = await page.locator('.note-grid').innerText();
  assert.match(text, /Clue: Level 2 has a corner/);
  assert.match(text, /Reach Level 14 to unlock a clue/);
  assert.doesNotMatch(text, /Warnings always have fine print/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

/* --------------------------------------------------------- costumes/themes */
test('costumes: locked ones cannot be worn; all 8 selectable, visible and persistent', async () => {
  let o = await H.openGame(browser, base, { seed: H.saveWith(0) });
  await o.page.evaluate(() => { location.hash = 'costumes'; });
  await o.page.waitForSelector('#screen-costumes:not([hidden])');
  assert.equal(await o.page.locator('[data-act="costume"]').count(), 0, 'nothing to wear on a fresh save');
  assert.equal(await o.page.locator('.wardrobe-card.locked').count(), 7);
  await o.ctx.close();

  const ids = ['classic', 'royal', 'alien', 'detective', 'wizard', 'robot', 'dino', 'ninja'];
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(236, (d) => { d.costumes.unlocked = ids.slice(); return d; }) });
  await page.evaluate(() => { location.hash = 'costumes'; });
  await page.waitForSelector('#screen-costumes:not([hidden])');
  const svgs = new Set();
  for (const id of ids.slice(1)) {
    await page.locator(`[data-act="costume"][data-id="${id}"]`).click();
    await page.waitForSelector(`.wardrobe-card.selected [class*="costume-${id}"]`);
    svgs.add(await page.locator('.wardrobe-card.selected .wardrobe-art').innerHTML());
    // Narrator in a level wears it too.
    if (id === 'wizard' || id === 'robot') {
      await goLevel(page, 2);
      assert.equal(await page.locator(`#narrator svg.costume-${id}`).count(), 1);
      assert.match(await page.locator('#line').innerText(), id === 'robot' ? /^BEEP/ : /wand/);
      await page.evaluate(() => { location.hash = 'costumes'; });
      await page.waitForSelector('#screen-costumes:not([hidden])');
    }
  }
  assert.equal(svgs.size, 7, 'each costume renders differently');
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.costumes.selected, 'ninja');
  assert.ok(s.achievements['costume-party']);
  await H.shot(page, 'costume-selection');
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).costumes.selected, 'ninja');
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.waitForSelector('#screen-menu:not([hidden])');
  assert.equal(await page.locator('.menu-narrator svg.costume-ninja').count(), 1);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('themes: unlock rules, selection changes real presentation, persistence', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(5) });
  await page.evaluate(() => { location.hash = 'themes'; });
  await page.waitForSelector('#screen-themes:not([hidden])');
  assert.equal(await page.locator('[data-act="theme"]').count(), 1, 'only candy unlocked after level 5');
  await H.seed(page, H.saveWith(236));
  await page.evaluate(() => { location.hash = 'themes'; });
  await page.waitForSelector('[data-act="theme"][data-id="sunset"]');
  const looks = {};
  for (const id of ['candy', 'ocean', 'sunset', 'classic']) {
    await page.locator(`[data-act="theme"][data-id="${id}"]`).click();
    await page.waitForFunction((t) => document.documentElement.getAttribute('data-theme') === t, id);
    looks[id] = await page.evaluate(() => {
      const cs = getComputedStyle(document.body);
      return cs.backgroundColor + '|' + getComputedStyle(document.querySelector('.theme-card.selected')).backgroundColor + '|' + cs.getPropertyValue('--accent');
    });
    if (id === 'ocean') {
      await goLevel(page, 1);
      const stageBg = await page.evaluate(() => getComputedStyle(document.getElementById('stage')).backgroundImage);
      assert.match(stageBg, /227, 247, 252/, 'stage uses ocean colours');
      await page.evaluate(() => { location.hash = 'themes'; });
      await page.waitForSelector('#screen-themes:not([hidden])');
    }
    if (id === 'sunset') await H.shot(page, 'theme-selection');
  }
  assert.equal(new Set(Object.values(looks)).size, 4, JSON.stringify(looks));
  await page.locator('[data-act="theme"][data-id="ocean"]').click();
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  assert.equal(await page.evaluate(() => document.documentElement.getAttribute('data-theme')), 'ocean');
  assert.deepEqual(errors, []);
  await ctx.close();
});

/* ------------------------------------------------------------- achievements */
test('achievements screen: locked/unlocked states and progress match the save', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(3, (d) => { d.secrets = ['polly', 'countdown']; return d; }) });
  await page.evaluate(() => { location.hash = 'achievements'; });
  await page.waitForSelector('#screen-achievements:not([hidden])');
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.ok(s.achievements['first-steps'] && s.achievements['secret-agent']);
  assert.ok(!s.achievements.collector && !s.achievements['full-campaign']);
  assert.equal(await page.locator('.ach.got').count(), Object.keys(s.achievements).length);
  assert.match(await page.locator('.ach', { hasText: 'Collector' }).innerText(), /2\/8/);
  assert.match(await page.locator('.ach', { hasText: 'Full Campaign' }).innerText(), /3\/236/);
  assert.equal(await page.locator('.ending-card.seen').count(), 0);
  await H.shot(page, 'achievements');
  assert.deepEqual(errors, []);
  await ctx.close();
});

/* -------------------------------------------------------------- menu/nav */
test('every main menu control works and returns to the menu', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(1) });
  await page.evaluate(() => { location.hash = 'menu'; });
  await H.shot(page, 'main-menu');
  const items = [['Adventure map', 'map'], ['Secret field notes', 'secrets'], ['Narrator costumes', 'costumes'], ['Themes', 'themes'], ['Achievements', 'achievements'], ['Trophy room', 'trophies'], ['Settings', 'settings'], ['Credits', 'credits']];
  for (const [label, screen] of items) {
    await page.locator('.menu-nav').getByRole('button', { name: new RegExp('^' + label) }).click();
    await page.waitForSelector(`#screen-${screen}:not([hidden])`);
    assert.equal(await page.evaluate(() => OBEY_TEST.screen()), screen);
    if (screen === 'settings') await H.shot(page, 'settings');
    await page.locator(`#screen-${screen}`).getByRole('button', { name: 'Menu' }).click();
    await page.waitForSelector('#screen-menu:not([hidden])');
  }
  // Continue resumes at the next uncompleted level.
  await page.getByRole('button', { name: 'Continue: Level 2' }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 2);
  // Browser back returns to the menu without losing progress.
  await page.goBack();
  await page.waitForSelector('#screen-menu:not([hidden])');
  assert.deepEqual((await page.evaluate(() => OBEY_TEST.save())).completed, [1]);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('New Game: cancel keeps progress; confirm resets the campaign but keeps cosmetics', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(8, (d) => { d.secrets = ['polly']; return d; }) });
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.waitForSelector('#screen-menu:not([hidden])');
  await page.getByRole('button', { name: 'New game' }).click();
  await page.waitForSelector('[role="alertdialog"]');
  await page.keyboard.press('Escape');
  await page.waitForSelector('[role="alertdialog"]', { state: 'detached' });
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).completed.length, 8);
  await page.getByRole('button', { name: 'New game' }).click();
  await page.getByRole('button', { name: 'Start new game' }).click();
  await H.chooseDifficulty(page, 'hard');
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 1);
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).difficulty, 'hard');
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.deepEqual(s.completed, []);
  assert.deepEqual(s.secrets, []);
  assert.equal(s.highestUnlocked, 1);
  assert.ok(s.costumes.unlocked.includes('detective'), 'cosmetics kept');
  assert.ok(s.achievements['first-steps'], 'achievements kept');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Reset all progress requires confirmation', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(4) });
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByRole('button', { name: 'Reset all progress' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).completed.length, 4);
  await page.getByRole('button', { name: 'Reset all progress' }).click();
  await page.getByRole('button', { name: 'Erase everything' }).click();
  await page.waitForSelector('#screen-menu:not([hidden])');
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.deepEqual(s.completed, []);
  assert.deepEqual(s.costumes.unlocked, ['classic']);
  assert.deepEqual(s.achievements, {});
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  assert.deepEqual((await page.evaluate(() => OBEY_TEST.save())).completed, []);
  assert.deepEqual(errors, []);
  await ctx.close();
});

/* -------------------------------------------------------- level mechanics */
test('hints are graduated and do not change the level; restart gives a clean attempt', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(1) });
  await goLevel(page, 2);
  await page.locator(H.sel('mat')).click();
  const before = await page.evaluate(() => OBEY_TEST.runtime().state);
  for (const n of [1, 2, 3]) {
    await page.locator('#hint-btn').click();
    assert.match(await page.locator('#hint-box').innerText(), new RegExp('Hint ' + n + ' of 3'));
  }
  assert.match(await page.locator('#hint-btn').innerText(), /No hints left/);
  assert.deepEqual(await page.evaluate(() => OBEY_TEST.runtime().state), before);
  await page.getByRole('button', { name: 'Restart level' }).click();
  const r = await page.evaluate(() => OBEY_TEST.runtime());
  assert.equal(r.state.matLifted, false);
  assert.equal(r.stats.hints, 0);
  assert.equal(await page.locator('#hint-box').isHidden(), true);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('timers stop when leaving a level (no completion in the background)', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(2) });
  await goLevel(page, 3);
  await page.clock.runFor(3000);
  await page.evaluate(() => { location.hash = 'map'; });
  await page.waitForSelector('#screen-map:not([hidden])');
  await page.clock.runFor(20000);
  assert.ok(!(await page.evaluate(() => OBEY_TEST.save())).completed.includes(3));
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('rapid repeated input completes once and rewards once', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(11) });
  await goLevel(page, 12);
  await page.evaluate(() => { const b = document.querySelector('#stage [data-obj="lever"]'); for (let i = 0; i < 20; i++) b.click(); });
  await page.waitForSelector('#complete:not([hidden])');
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.completed.filter((n) => n === 12).length, 1);
  assert.equal(s.stats.levelsFinished, 1);
  assert.equal(await page.locator('.complete-card').count(), 1);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('keyboard only: tap, pick-and-place and hold all work', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(235) });
  const defs = await H.levelDefs(page);
  for (const n of [2, 8, 9, 14, 236]) {
    await goLevel(page, n);
    await H.playSteps(page, defs[n - 1].solution, 'keyboard');
    await page.waitForSelector('#complete:not([hidden])');
    // Focus moves into the completion dialog.
    assert.ok(await page.evaluate(() => document.getElementById('complete').contains(document.activeElement)), 'focus in dialog L' + n);
    await page.evaluate(() => { location.hash = 'map'; });
    await page.waitForSelector('#screen-map:not([hidden])');
  }
  // Tab reaches stage objects and focus is visible.
  await goLevel(page, 1);
  let found = false;
  for (let i = 0; i < 15 && !found; i++) {
    await page.keyboard.press('Tab');
    found = await page.evaluate(() => document.activeElement && document.activeElement.getAttribute('data-obj') === 'red');
  }
  assert.ok(found, 'Tab reaches the red button');
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  assert.notEqual(outline, 'none', 'visible focus indicator');
  // Escape cancels a pick-up.
  await goLevel(page, 8);
  await page.locator(H.sel('key')).focus();
  await page.keyboard.press('Enter');
  assert.match(await page.locator('#pick-status').innerText(), /Holding/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#pick-status').innerText(), '');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('touch input: tap, tap-to-place and press-and-hold on a phone viewport', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(13), viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await goLevel(page, 1);
  await page.locator(H.sel('red')).tap();
  await page.locator(H.sel('blue')).tap();
  await page.waitForSelector('#complete:not([hidden])');
  await goLevel(page, 8);
  await page.locator(H.sel('crate')).tap();
  await page.locator(H.sel('floor')).tap();
  await page.locator(H.sel('key')).tap();
  await page.locator(H.sel('door')).tap();
  await page.waitForSelector('#complete:not([hidden])');
  // Press-and-hold via touch events on the gift (secret).
  await goLevel(page, 9);
  const box = await page.locator(H.sel('gift')).boundingBox();
  const cdp = await ctx.newCDPSession(page);
  const pt = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [pt] });
  await page.clock.runFor(2600);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForSelector('.toast >> text=Secret found: Shake It');
  // Gift dropped on Bossworth by tap-to-place.
  await page.locator(H.sel('gift')).tap();
  await page.locator('#narrator').tap();
  await page.waitForSelector('#complete:not([hidden])');
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).choices.gift, 'prank');
  assert.deepEqual(errors, []);
  await ctx.close();
});

/* -------------------------------------------------------- persistence */
test('progress, settings, cosmetics, achievements and endings survive reload', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(236, (d) => { d.endings.seen = ['hero']; d.endings.history = [{ id: 'hero', at: 1 }]; d.themes.unlocked.push('ocean'); d.themes.selected = 'ocean'; d.settings.sound = false; d.settings.textSize = 'large'; return d; }) });
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.completed.length, 236);
  assert.deepEqual(s.endings.seen, ['hero']);
  assert.equal(s.settings.sound, false);
  assert.equal(await page.evaluate(() => document.documentElement.getAttribute('data-text')), 'large');
  assert.equal(await page.evaluate(() => document.documentElement.getAttribute('data-theme')), 'ocean');
  assert.ok(s.achievements['full-campaign'], 'achievements granted from seeded progress on boot');
  assert.ok(await page.evaluate(() => OBEY_TEST.persistent()));
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('malformed save data does not crash; the game starts fresh and keeps a backup', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { initScript: () => { if (!sessionStorage.getItem('x')) { sessionStorage.setItem('x', '1'); localStorage.setItem('obeylol.save', '{{{garbage'); } } });
  await page.waitForSelector('#screen-menu:not([hidden])');
  await page.clock.runFor(1000);
  await page.waitForSelector('.toast >> text=could not be read');
  assert.equal(await page.evaluate(() => localStorage.getItem('obeylol.save.corrupt')), '{{{garbage');
  assert.deepEqual((await page.evaluate(() => OBEY_TEST.save())).completed, []);
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await H.chooseDifficulty(page);
  await page.waitForSelector('.tutorial');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('obsolete v1 save is migrated', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { initScript: () => { if (!sessionStorage.getItem('y')) { sessionStorage.setItem('y', '1'); localStorage.setItem('obeylol.save', JSON.stringify({ version: 1, level: 3, stars: { 1: 2, 2: 3 }, secretsFound: ['polly'], sound: false })); } } });
  const s = await page.evaluate(() => OBEY_TEST.save());
  const schema = await page.evaluate(() => OBEY.save.SCHEMA);
  assert.equal(s.version, schema);
  assert.equal(schema, 7);
  assert.deepEqual(s.completed, [1, 2]);
  assert.equal(s.highestUnlocked, 3);
  assert.equal(s.settings.sound, false);
  assert.equal(JSON.parse(await page.evaluate(() => localStorage.getItem('obeylol.save'))).version, schema);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('storage that throws: game still runs with an in-memory save and a warning', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, {
    initScript: () => {
      const bad = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); }, removeItem() { throw new Error('denied'); } };
      Object.defineProperty(window, 'localStorage', { get() { return bad; } });
    }
  });
  await page.clock.runFor(1000);
  await page.waitForSelector('.toast >> text=Storage is blocked');
  assert.equal(await page.evaluate(() => OBEY_TEST.persistent()), false);
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await H.chooseDifficulty(page);
  await page.getByRole('button', { name: 'Skip tutorial' }).click();
  await H.playSteps(page, [{ tap: 'red' }, { tap: 'blue' }]);
  await page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual((await page.evaluate(() => OBEY_TEST.save())).completed, [1]);
  await page.evaluate(() => { location.hash = 'settings'; });
  assert.match(await page.locator('#screen-settings').innerText(), /blocking storage/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('tutorial: skippable, saved, replayable from settings', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base);
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await H.chooseDifficulty(page);
  await page.getByRole('button', { name: 'Skip tutorial' }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 1);
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).tutorialDone, true);
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 1);
  assert.equal(await page.locator('.tutorial').count(), 0, 'not shown again');
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByRole('button', { name: 'Replay the tutorial' }).click();
  await page.waitForSelector('.tutorial');
  await page.keyboard.press('Escape');
  await page.waitForSelector('.tutorial', { state: 'detached' });
  assert.deepEqual(errors, []);
  await ctx.close();
});

/* ------------------------------------------------------- settings / a11y */
test('sound toggle, reduced motion (system and manual), text size', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('reduce-motion')), true, 'follows system preference');
  await page.evaluate(() => { location.hash = 'settings'; });
  const sw = page.getByRole('switch', { name: 'Sound effects' });
  assert.equal(await sw.getAttribute('aria-checked'), 'true');
  await sw.click();
  assert.equal(await page.getByRole('switch', { name: 'Sound effects' }).getAttribute('aria-checked'), 'false');
  assert.equal(await page.evaluate(() => OBEY.audio.isEnabled()), false);
  await page.getByLabel('Full motion').check();
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('reduce-motion')), false);
  await page.getByLabel('Reduce motion').check();
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('reduce-motion')), true);
  const dur = await page.evaluate(() => getComputedStyle(document.querySelector('.slip, .btn')).transitionDuration);
  assert.ok(parseFloat(dur) < 0.01, 'transitions disabled: ' + dur);
  await page.getByLabel('Large', { exact: true }).check();
  const fs1 = await page.evaluate(() => parseFloat(getComputedStyle(document.body).fontSize));
  assert.equal(fs1, 20);
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  const s = await page.evaluate(() => OBEY_TEST.save().settings);
  assert.deepEqual({ sound: s.sound, voice: s.voice, motion: s.motion, textSize: s.textSize }, { sound: false, voice: 'babble', motion: 'reduce', textSize: 'large' });
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('interactive stage objects have accessible names; no image-only buttons', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(235, (d) => { d.secrets = []; return d; }) });
  for (let n = 1; n <= 236; n++) {
    await goLevel(page, n);
    const bad = await page.evaluate(() => [...document.querySelectorAll('button')].filter((b) => b.offsetParent !== null && !(b.getAttribute('aria-label') || b.textContent.trim())).map((b) => b.outerHTML.slice(0, 80)));
    assert.deepEqual(bad, [], 'L' + n);
  }
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('the game runs from file:// (no server) with saving', async () => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('requestfailed', (r) => errors.push('failed ' + r.url()));
  await page.goto('file://' + path.join(H.ROOT, 'index.html'));
  await page.waitForSelector('#screen-menu:not([hidden])');
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await H.chooseDifficulty(page);
  await page.getByRole('button', { name: 'Skip tutorial' }).click();
  await page.locator(H.sel('red')).click();
  await page.locator(H.sel('blue')).click();
  await page.waitForSelector('#complete:not([hidden])');
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('obeylol.save')).completed);
  assert.deepEqual(saved, [1]);
  const fontsOk = await page.evaluate(async () => { await document.fonts.ready; return document.fonts.check('20px "Bagel Fat One"'); });
  assert.ok(fontsOk, 'bundled font loads from file://');
  assert.deepEqual(errors, []);
  await ctx.close();
});
