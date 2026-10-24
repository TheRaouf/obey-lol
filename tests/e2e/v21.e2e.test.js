/* 2.1 browser tests: ruins, skips, jigsaw, Sabotage Studio, Daily Dare, U.N.D.O., asides, fake
 * game over, chapter cards and reviews, completion extras, sharing, save codes, profiles,
 * accessibility options, hold assist, captions, haptics, music, keyboard shortcuts and the
 * installable/offline app. */
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
const rtState = (page) => page.evaluate(() => OBEY_TEST.runtime());
const save = (page) => page.evaluate(() => OBEY_TEST.save());
const seen = (d) => { d.seenVersion = '2.4.1'; return d; };
const withSave = (n, extra) => H.saveWith(n, (d) => seen(extra ? extra(d) : d));
const CLIP = H.ENGINE === 'chromium' ? ['clipboard-read', 'clipboard-write'] : [];

test('ruin it: pressing the red button 8 times ruins Level 1, files it, and marks the map', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(0, (d) => { d.tutorialDone = true; return d; }) });
  await goLevel(page, 1);
  for (let i = 0; i < 7; i++) await page.locator(H.sel('red')).click();
  assert.equal((await rtState(page)).status, 'playing', 'not before 8 presses');
  await page.locator(H.sel('red')).click();
  await page.waitForSelector('#complete:not([hidden])');
  assert.match(await page.locator('#complete .stamp').innerText(), /RUINED/);
  assert.match(await page.locator('#complete h2').innerText(), /Level 1 ruined/);
  assert.match(await page.locator('#complete').innerText(), /Button Masher/);
  const s = await save(page);
  assert.deepEqual(s.ruins, ['button-masher']);
  assert.ok(s.completed.includes(1), 'a ruin finishes the level');
  await page.evaluate(() => { location.hash = 'sabotage'; });
  await page.waitForSelector('#screen-sabotage:not([hidden])');
  assert.match(await page.locator('.note-card.ruined').first().innerText(), /Button Masher/);
  await page.evaluate(() => { location.hash = 'map'; });
  assert.equal(await page.locator('.map-node[data-level="1"] .node-ruined').count(), 1);
  assert.match(await page.locator('.map-node[data-level="1"]').getAttribute('aria-label'), /ruined/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('skip: "Let it be" opens the next level, marks the skipped one, and Continue moves on', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(2) });
  await goLevel(page, 3);
  await page.locator('#skip-btn').click();
  await page.getByRole('button', { name: 'Let it be' }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 4);
  const s = await save(page);
  assert.deepEqual(s.skipped, [3]);
  assert.equal(s.highestUnlocked, 4);
  await page.evaluate(() => { location.hash = 'map'; });
  await page.waitForSelector('#screen-map:not([hidden])');
  assert.match(await page.locator('.map-node[data-level="3"]').innerText(), /Skipped/);
  assert.match(await page.locator('.map-side').innerText(), /Play Level 4/);
  // Solving the skipped level later clears the mark.
  await goLevel(page, 3);
  assert.equal(await page.locator('#skip-btn').count(), 0, 'no skip button on an already skipped level');
  await page.clock.runFor(10500);
  await page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual((await save(page)).skipped, []);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('jigsaw: a piece hides only on replays of a finished level; finding it is saved once', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(3) });
  await goLevel(page, 4);
  assert.equal(await page.locator('[data-obj="jig-1"]').count(), 0, 'not on a first run');
  await page.locator(H.sel('lamp')).click();
  await page.locator(H.sel('painting')).click();
  await page.locator(H.sel('door')).click();
  await page.waitForSelector('#complete:not([hidden])');
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.waitForSelector('[data-obj="jig-1"]');
  const actionsBefore = (await rtState(page)).stats.actions;
  await page.locator('[data-obj="jig-1"]').click();
  await page.waitForSelector('[data-obj="jig-1"]', { state: 'detached' });
  assert.deepEqual((await save(page)).jigsaw, ['jig-1']);
  assert.equal((await rtState(page)).stats.actions, actionsBefore, 'collecting a piece is free');
  await page.evaluate(() => { location.hash = 'sabotage'; });
  assert.match(await page.locator('.jigsaw-panel').innerText(), /replay/);
  assert.match(await page.locator('.jigsaw-picture').getAttribute('aria-label'), /1 of 9 pieces/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Sabotage Studio: locked before Level 12; bonus levels play, ruin, and keep their own results', async () => {
  let o = await H.openGame(browser, base, { seed: withSave(11) });
  await o.page.evaluate(() => { location.hash = 'sabotage'; });
  await o.page.waitForSelector('#screen-sabotage:not([hidden])');
  assert.match(await o.page.locator('#screen-sabotage').innerText(), /Opens after you finish Level 12/);
  await o.page.evaluate(() => { location.hash = 'level/1001'; });
  await o.page.waitForSelector('#screen-map:not([hidden])');
  await o.ctx.close();

  o = await H.openGame(browser, base, { seed: withSave(12) });
  const page = o.page;
  await page.evaluate(() => { location.hash = 'sabotage'; });
  await page.getByRole('button', { name: /Bonus 2: Ninety-Nine/ }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 1002);
  assert.match(await page.locator('.lvl-num').innerText(), /Bonus 2/);
  await page.locator(H.sel('toggle')).click();
  await page.clock.runFor(5000);
  await page.locator(H.sel('unplug')).click();
  await page.waitForSelector('#complete:not([hidden])');
  assert.match(await page.locator('#complete h2').innerText(), /Bonus 2 complete/);
  let s = await save(page);
  assert.deepEqual(s.bonus.completed, [1002]);
  assert.equal(s.bonus.bestStars[1002], 3);
  assert.ok(!s.completed.includes(1002));
  // Bonus 1: flip-flopping between the two buttons ruins it.
  await goLevel(page, 1001);
  for (let i = 0; i < 6; i++) await page.locator(H.sel(i % 2 ? 'btnB' : 'btnA')).click();
  await page.waitForSelector('#complete:not([hidden])');
  assert.match(await page.locator('#complete .stamp').innerText(), /RUINED/);
  s = await save(page);
  assert.ok(s.ruins.includes('label-peeler'));
  assert.deepEqual(o.errors, []);
  await o.ctx.close();
});

test('Daily Dare: today\'s level, a met dare starts a streak, the menu remembers it', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(236) });
  await page.evaluate(() => { location.hash = 'daily'; });
  await page.waitForSelector('#screen-daily:not([hidden])');
  const n = await page.evaluate(() => OBEY.extras.dareLevel(OBEY_TEST.save(), OBEY.extras.dateKey()));
  assert.match(await page.locator('.dare-card h2').innerText(), new RegExp('Level ' + n + ':'));
  await page.getByRole('button', { name: /Take the dare/ }).click();
  await page.waitForFunction((x) => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === x, n);
  assert.match(await page.locator('#aside').innerText(), /Daily Dare: finish at par/);
  const def = (await H.levelDefs(page)).find((d) => d.num === n);
  await H.playSteps(page, def.solution);
  await page.waitForSelector('#complete:not([hidden])');
  const won = (await rtState(page)).result.ending === null;
  assert.match(await page.locator('#complete').innerText(), /Daily Dare complete! Streak: 1 day/);
  void won;
  const s = await save(page);
  assert.equal(s.daily.streak, 1);
  assert.equal(s.daily.done.length, 1);
  await page.evaluate(() => { location.hash = 'menu'; });
  assert.match(await page.locator('.menu-nav').innerText(), /done today/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('U.N.D.O. introduces itself at Level 9, leaks one chapter chat, and tips a ruin after a trap', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(11) });
  await goLevel(page, 9);
  await page.clock.runFor(4000);
  const chat = page.locator('#undo-chat');
  assert.match(await chat.innerText(), /U\.N\.D\.O\. v0\.9 online/);
  assert.match(await chat.innerText(), /CLIVE/);
  let s = await save(page);
  assert.ok(s.counters.undoMet && s.counters.chats.includes('trick-tower'));
  await goLevel(page, 12);
  await page.clock.runFor(3000);
  assert.doesNotMatch(await chat.innerText(), /v0\.9 online/, 'intro only once');
  await page.locator(H.sel('left')).click(); // trap
  assert.match(await page.locator('#undo-chat').innerText(), /Psst\. The doors run on a limited supply/);
  await page.locator('#undo-chat [data-act="toggle-undo"]').click();
  assert.equal(await page.locator('#undo-chat .undo-log').isVisible(), false);
  assert.equal(await page.locator('#undo-chat [data-act="toggle-undo"]').getAttribute('aria-expanded'), 'false');
  s = await save(page);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('narrator asides: replay line, "let me finish", idle lines, nudge offer with a working hint button', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(5) });
  await goLevel(page, 1);
  assert.match(await page.locator('#aside').innerText(), /again|Replaying|Second time|Back/i, 'replay aside');
  await page.locator(H.sel('red')).click(); // acting immediately during the long intro
  assert.match(await page.locator('#aside').innerText(), /finish|mid-sentence|paragraph/i);
  await page.clock.runFor(16000);
  const idle = await page.locator('#aside').innerText();
  assert.ok(idle.length > 10);
  await goLevel(page, 5);
  await page.locator(H.sel('swA')).click();
  await page.locator(H.sel('swC')).click();
  assert.match(await page.locator('#aside').innerText(), /Want a nudge/);
  await page.locator('#aside').getByRole('button', { name: 'Show a hint' }).click();
  await page.waitForSelector('#hint-box:not([hidden])');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('fake game over appears once after 3 traps (non-blocking), then the game carries on', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(17) });
  await goLevel(page, 18);
  for (let i = 0; i < 3; i++) await page.locator(H.sel('bell')).click();
  await page.waitForSelector('.fake-over');
  assert.match(await page.locator('.fake-over').innerText(), /GAME OVER/);
  assert.equal(await page.locator('#fx-layer').evaluate((e) => getComputedStyle(e).pointerEvents), 'none');
  await page.locator(H.sel('drum')).click(); // still playable underneath
  await page.clock.runFor(1800);
  assert.match(await page.locator('.fake-over').innerText(), /Just kidding/);
  await page.clock.runFor(2000);
  assert.equal(await page.locator('.fake-over').count(), 0);
  assert.ok((await save(page)).counters.fakeOver);
  for (let i = 0; i < 3; i++) await page.locator(H.sel('bell')).click();
  assert.equal(await page.locator('.fake-over').count(), 0, 'only once');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('chapter card on a new chapter, and a performance review when the chapter is finished', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(3) });
  await goLevel(page, 4);
  await page.locator(H.sel('lamp')).click();
  await page.locator(H.sel('painting')).click();
  await page.locator(H.sel('door')).click();
  await page.waitForSelector('#complete:not([hidden])');
  assert.match(await page.locator('#complete .roast').innerText(), /Performance review — Button Bay: 12 of 12 stars/);
  await page.locator('#complete').getByRole('button', { name: 'Next level' }).click();
  await page.waitForSelector('.chapter-card');
  assert.match(await page.locator('.chapter-card').innerText(), /Chapter 2\s*Mind Maze/);
  assert.deepEqual((await save(page)).counters.cards, ['mind-maze']);
  await page.clock.runFor(2000);
  await goLevel(page, 1);
  await goLevel(page, 5);
  assert.equal(await page.locator('.chapter-card').count(), 0, 'once per chapter');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('completion extras: the trick, personal best, share text, and "Replay on Hard"', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(11), permissions: CLIP });
  await goLevel(page, 12);
  await page.locator(H.sel('lever')).click();
  await page.waitForSelector('#complete:not([hidden])');
  const card = page.locator('#complete');
  assert.match(await card.innerText(), /The trick: Both doors were bluffs/);
  assert.match(await card.innerText(), /Personal best: 1 action/);
  if (H.ENGINE === 'chromium') {
    await card.getByRole('button', { name: 'Share' }).click();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    assert.match(text, /OBEY\? LOL\. — Level 12: The Double Bluff\n⭐⭐⭐/);
    assert.ok(text.includes('https://theraouf.github.io/obey-lol/'));
  }
  await card.getByRole('button', { name: 'Replay on Hard' }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().status === 'playing');
  assert.equal((await save(page)).difficulty, 'hard');
  assert.match(await page.locator('.diff-badge').innerText(), /Hard/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('save code: copy from Settings, load it back (after a reset) with a confirmation', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(7, (d) => { d.profileName = 'Raouf'; return d; }) });
  const code = await page.evaluate(() => OBEY.extras.exportCode(OBEY_TEST.save()));
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.waitForSelector('#screen-settings:not([hidden])');
  await page.getByRole('button', { name: 'Reset all progress' }).click();
  assert.equal(await page.getByRole('button', { name: 'Copy my save code first' }).count(), 1);
  await page.getByRole('button', { name: 'Erase everything' }).click();
  await page.waitForSelector('#screen-menu:not([hidden])');
  assert.equal((await save(page)).completed.length, 0);
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.locator('#import-code').fill('not a code');
  await page.getByRole('button', { name: 'Load save code' }).click();
  await page.waitForSelector('.toast-warn');
  await page.locator('#import-code').fill(code);
  await page.getByRole('button', { name: 'Load save code' }).click();
  await page.getByRole('button', { name: 'Load save' }).click();
  await page.waitForSelector('#screen-menu:not([hidden])');
  const s = await save(page);
  assert.equal(s.completed.length, 7);
  assert.equal(s.profileName, 'Raouf');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('profiles: up to 3 players with separate progress and names', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(5) });
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.locator('#profile-name').fill('Adam');
  await page.locator('#profile-name').press('Tab');
  assert.equal((await save(page)).profileName, 'Adam');
  await page.getByRole('button', { name: 'Play as Player 2' }).click();
  await page.waitForSelector('#screen-menu:not([hidden])');
  assert.equal(await page.evaluate(() => OBEY_TEST.slot()), 2);
  assert.equal((await save(page)).completed.length, 0);
  assert.ok(await page.evaluate(() => localStorage.getItem('obeylol.save.p2')));
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  assert.equal(await page.evaluate(() => OBEY_TEST.slot()), 2, 'the active player is remembered');
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByRole('button', { name: 'Play as Adam' }).click();
  await page.waitForSelector('#screen-menu:not([hidden])');
  const s = await save(page);
  assert.equal(s.completed.length, 5);
  assert.match(await page.locator('.trust-line').innerText(), /playing as Adam/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('accessibility options: high contrast, extra-large text, plain font, left-handed layout', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(3) });
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByLabel(/High contrast/).check();
  await page.getByLabel('Extra large').check();
  await page.getByLabel('Plain font everywhere').check();
  await page.getByLabel(/Left-handed layout/).check();
  const html = await page.evaluate(() => ({ c: document.documentElement.dataset.contrast, t: document.documentElement.dataset.text, f: document.documentElement.dataset.font, h: document.documentElement.dataset.hand, fs: parseFloat(getComputedStyle(document.body).fontSize), bg: getComputedStyle(document.body).backgroundColor }));
  assert.deepEqual([html.c, html.t, html.f, html.h, html.fs], ['high', 'xl', 'plain', 'left', 23]);
  assert.equal(html.bg, 'rgb(255, 255, 255)');
  await goLevel(page, 2);
  const narr = await page.locator('.narrator-panel').boundingBox();
  const stage = await page.locator('#stage').boundingBox();
  assert.ok(narr.x > stage.x, 'narrator on the right for left-handed players');
  assert.ok((await H.noHorizontalOverflow(page)).ok);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('hold assist: tap to start holding, tap again to let go (Wet Paint), also with the keyboard', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(21, (d) => { d.settings.holdAssist = true; return d; }) });
  await goLevel(page, 22);
  assert.equal(await page.locator(H.sel('fan')).getAttribute('aria-describedby'), 'hold-help-assist');
  await page.locator(H.sel('fan')).click();
  assert.equal(await page.locator(H.sel('fan')).getAttribute('aria-pressed'), 'true');
  await page.clock.runFor(2400);
  await page.locator(H.sel('fan')).click();
  assert.equal((await rtState(page)).state.wet, false);
  await page.locator(H.sel('door')).click();
  await page.waitForSelector('#complete:not([hidden])');
  // Keyboard: Enter starts and stops the hold.
  await page.getByRole('button', { name: 'Replay', exact: true }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().status === 'playing');
  await page.locator(H.sel('fan')).focus();
  await page.keyboard.press('Enter');
  await page.clock.runFor(2400);
  await page.keyboard.press('Enter');
  assert.equal((await rtState(page)).state.wet, false);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('sound captions show every effect as text; vibration is requested on traps when supported', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, {
    seed: withSave(11, (d) => { d.settings.captions = true; d.settings.sound = false; return d; }),
    initScript: () => { window.__buzz = []; navigator.vibrate = (p) => { window.__buzz.push(p); return true; }; }
  });
  await goLevel(page, 12);
  await page.locator(H.sel('right')).click();
  await page.waitForSelector('#captions:not([hidden])');
  assert.match(await page.locator('#captions').innerText(), /\[(splat!|sad trombone|rubber chicken squawk|electric zap|sploosh)\]/);
  assert.ok((await page.evaluate(() => window.__buzz)).length >= 1);
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByRole('switch', { name: 'Vibration' }).click();
  await goLevel(page, 12);
  const before = (await page.evaluate(() => window.__buzz)).length;
  await page.locator(H.sel('right')).click();
  assert.equal((await page.evaluate(() => window.__buzz)).length, before, 'no vibration when switched off');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('chapter music plays only in levels and stops when leaving; volumes are saved', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(3, (d) => { d.settings.music = true; return d; }) });
  await page.mouse.click(5, 5);
  await goLevel(page, 2);
  assert.equal(await page.evaluate(() => OBEY.audio.musicOn()), true);
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.waitForSelector('#screen-settings:not([hidden])');
  await page.waitForFunction(() => OBEY.audio.musicOn() === false);
  await page.getByLabel('Effects volume').fill('30');
  await page.getByLabel('Effects volume').dispatchEvent('change');
  assert.equal((await save(page)).settings.sfxVol, 30);
  assert.equal(await page.evaluate(() => OBEY.audio.volume('sfx')), 30);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('keyboard shortcuts: H, R, G, M, N and ? work; arrow keys move along the map', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(5, (d) => { d.difficulty = 'easy'; return d; }) });
  await goLevel(page, 2);
  await page.keyboard.press('h');
  await page.waitForSelector('#hint-box:not([hidden])');
  await page.keyboard.press('g');
  await page.waitForSelector('#guide-box:not([hidden])');
  await page.keyboard.press('r');
  await page.waitForSelector('#guide-box', { state: 'hidden' });
  await H.playSteps(page, [{ tap: 'mat' }, { tap: 'key' }, { tap: 'closet' }]);
  await page.waitForSelector('#complete:not([hidden])');
  await page.keyboard.press('n');
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 3);
  await page.keyboard.press('?');
  await page.waitForSelector('table.keys');
  await page.keyboard.press('Escape');
  await page.keyboard.press('m');
  await page.waitForSelector('#screen-map:not([hidden])');
  await page.locator('.map-node[data-level="3"]').focus();
  await page.keyboard.press('ArrowDown');
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('data-level')), '4');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('data-level')), '2');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('"Point me": the last hint highlights the first thing to use; Easy sparkles on correct moves', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(3, (d) => { d.difficulty = 'easy'; return d; }) });
  await goLevel(page, 4);
  for (let i = 0; i < 3; i++) await page.locator('#hint-btn').click();
  assert.ok(await page.locator(H.sel('lamp')).evaluate((b) => b.classList.contains('guide-target')));
  await page.clock.runFor(3600);
  assert.ok(!(await page.locator(H.sel('lamp')).evaluate((b) => b.classList.contains('guide-target'))));
  await page.locator(H.sel('lamp')).click();
  assert.ok(await page.locator(H.sel('lamp')).evaluate((b) => b.classList.contains('warm-glow')));
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('menu: what\'s new (once), next goal, trust line; stats file and joke achievements', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(3) });
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.waitForSelector('.whats-new');
  assert.match(await page.locator('.goal-line').innerText(), /Next goal: Finish Level 4 to unlock the Royal costume/);
  assert.match(await page.locator('.trust-line').innerText(), /No ads · no tracking · works offline/);
  await page.getByRole('button', { name: 'Got it' }).click();
  assert.equal(await page.locator('.whats-new').count(), 0);
  assert.equal((await save(page)).seenVersion, '2.4.1');
  for (let i = 0; i < 10; i++) { await page.evaluate(() => { location.hash = 'settings'; }); await page.waitForSelector('#screen-settings:not([hidden])'); await page.evaluate(() => { location.hash = 'menu'; }); await page.waitForSelector('#screen-menu:not([hidden])'); }
  assert.ok((await save(page)).achievements['settings-enthusiast']);
  await page.evaluate(() => { location.hash = 'credits'; });
  await page.waitForSelector('#screen-credits:not([hidden])');
  assert.ok((await save(page)).achievements['credits-reader']);
  await page.evaluate(() => { location.hash = 'stats'; });
  await page.waitForSelector('#screen-stats:not([hidden])');
  assert.match(await page.locator('#screen-stats').innerText(), /Bossworth's review of you/);
  assert.match(await page.locator('#screen-stats').innerText(), /Levels finished\s*3 of 236/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('brand-new players do not see "What\'s new"; they get an intern number', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, {});
  await page.evaluate(() => { location.hash = 'menu'; });
  await page.waitForSelector('#screen-menu:not([hidden])');
  assert.equal(await page.locator('.whats-new').count(), 0);
  const s = await save(page);
  assert.ok(s.intern >= 10 && s.intern <= 99);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('endings show Bossworth\'s review of you, the bet payoff, and a spoiler-free share button', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withSave(235) });
  await goLevel(page, 236);
  await H.playSteps(page, [{ hold: ['wrench', 2200] }]);
  await page.waitForSelector('#complete:not([hidden])');
  await page.getByRole('button', { name: 'See your ending' }).click();
  for (let i = 0; i < 40 && !(await page.locator('.ending-final').count()); i++) {
    if (await page.locator('[data-end-next]').count()) await page.locator('[data-end-next]').click(); else await page.waitForTimeout(100);
  }
  await page.waitForSelector('.ending-final');
  assert.match(await page.locator('.ending-final').innerText(), /Bossworth's review of you/);
  assert.match(await page.locator('.ending-final').innerText(), /owes Clive a cake/);
  assert.equal(await page.getByRole('button', { name: 'Share (no spoilers)' }).count(), 1);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('installable app: manifest over http, service worker caches the game, and it reloads offline', async () => {
  if (H.ENGINE !== 'chromium') return; // service-worker offline reload is verified in Chromium
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '?test=1&sw=1');
  await page.waitForSelector('.screen:not([hidden])');
  assert.equal(await page.locator('link[rel="manifest"]').count(), 1);
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 15000 }).catch(async () => { await page.reload(); await page.waitForFunction(() => navigator.serviceWorker.controller, null, { timeout: 15000 }); });
  const manifest = await page.evaluate(() => fetch('manifest.webmanifest').then((r) => r.json()));
  assert.equal(manifest.display, 'standalone');
  await ctx.setOffline(true);
  await page.reload();
  await page.waitForSelector('.screen:not([hidden])');
  await page.evaluate(() => { location.hash = 'level/1'; });
  await page.waitForSelector('#stage [data-obj="red"]');
  await ctx.setOffline(false);
  assert.deepEqual(errors, []);
  await ctx.close();
});
