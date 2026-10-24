/* 2.0 features in a real browser: difficulty, wrong-answer gags, nope reactions, "Show me how",
 * Bossworth's voice and talking mouth, trophies, Easy helper, sound events. */
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

test('difficulty: chosen on first play, shown in the level, changeable in settings, applies next attempt', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base);
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await page.waitForSelector('.difficulty-modal');
  assert.equal(await page.locator('.diff-option').count(), 3);
  await H.shot(page, 'difficulty-picker');
  await page.locator('[data-d="easy"]').click();
  await page.getByRole('button', { name: 'Skip tutorial' }).click();
  await page.waitForFunction(() => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === 1);
  assert.match(await page.locator('.level-title .diff-badge').innerText(), /Easy/);
  assert.match(await page.locator('.score-rule').innerText(), /hints are free/);
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByLabel(/^Hard:/).check();
  assert.equal((await page.evaluate(() => OBEY_TEST.save())).difficulty, 'hard');
  await goLevel(page, 1);
  assert.match(await page.locator('.level-title .diff-badge').innerText(), /Hard/);
  await H.playSteps(page, [{ tap: 'red' }, { tap: 'blue' }]);
  await page.waitForSelector('#complete:not([hidden])');
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.bestDifficulty[1], 'hard');
  await page.evaluate(() => { location.hash = 'map'; });
  await page.waitForSelector('.map-node[data-level="1"] .node-medal.medal-hard');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Hard: one hint per level and stricter stars', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(11, 'hard') });
  await goLevel(page, 12);
  await page.locator('#hint-btn').click();
  assert.match(await page.locator('#hint-box').innerText(), /Hint 1 of 1/);
  assert.match(await page.locator('#hint-btn').innerText(), /No hints left/);
  await page.locator('#hint-btn').click();
  await page.waitForSelector('.toast >> text=Only one hint per level on Hard');
  await page.locator(H.sel('lever')).click();
  await page.waitForSelector('#complete:not([hidden])');
  assert.equal((await page.evaluate(() => OBEY_TEST.runtime())).result.stars, 1, 'a hint on Hard caps at 1 star');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('wrong answer: slapstick gag, laughing Bossworth, sound, and a "how to do it right" card', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(11, 'medium') });
  await goLevel(page, 12);
  await page.locator(H.sel('right')).click();
  await page.waitForSelector('#gag-layer .gag');
  assert.equal(await page.locator('#gag-layer .gag-pie').count(), 1, 'pie for a pie-in-the-face trap');
  assert.ok(await page.locator('#gag-layer .gag-word').innerText());
  assert.equal(await page.locator('#narrator svg.mood-laughing').count(), 1);
  assert.ok((await page.evaluate(() => OBEY_TEST.sounds)).includes('pie'));
  await page.waitForSelector('#wrong-card:not([hidden])');
  const card = await page.locator('#wrong-card').innerText();
  assert.match(card, /That was a trap!/);
  assert.match(card, /How to do it right: Bossworth can tell the truth/);
  await H.shot(page, 'wrong-answer-gag');
  // The gag clears itself; the card can be dismissed.
  await page.clock.runFor(2500);
  assert.equal(await page.locator('#gag-layer .gag').count(), 0);
  await page.getByRole('button', { name: 'Got it' }).click();
  assert.equal(await page.locator('#wrong-card').isHidden(), true);
  // Other traps get other gags.
  await page.locator(H.sel('left')).click();
  await page.waitForSelector('#gag-layer .gag');
  const kinds = await page.evaluate(() => OBEY_TEST.sounds.filter((x) => ['pie', 'chicken', 'trombone', 'zap', 'splash'].includes(x)));
  assert.ok(kinds.length >= 2);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('harmless wrong move: "nope" shake, sticker and buzzer without resetting the room', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(1, 'medium') });
  await goLevel(page, 2);
  await page.locator(H.sel('mat')).click();
  await page.locator(H.sel('closet')).click();
  await page.waitForSelector('#stage [data-obj="closet"] .nope-sticker');
  assert.ok(await page.locator('#stage [data-obj="closet"]').evaluate((n) => n.classList.contains('nope-shake')));
  assert.ok((await page.evaluate(() => OBEY_TEST.sounds)).includes('nope'));
  assert.equal((await page.evaluate(() => OBEY_TEST.runtime())).state.matLifted, true, 'room not reset');
  assert.equal(await page.locator('#wrong-card').isHidden(), true, 'no trap card for a nope');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Show me how (Medium): locked at first, unlocked by a trap, walks every step, 1-star guided result', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(7, 'medium') });
  await goLevel(page, 8);
  assert.ok(await page.locator('#guide-btn').evaluate((b) => b.classList.contains('locked-chip')));
  await page.locator('#guide-btn').click();
  await page.waitForSelector('.toast >> text=unlocks after you fall for a trap');
  assert.equal(await page.locator('#guide-box').isHidden(), true);
  await page.locator('#hint-btn').click();
  await page.locator('#hint-btn').click();
  assert.ok(!(await page.locator('#guide-btn').evaluate((b) => b.classList.contains('locked-chip'))), 'two hints unlock it');
  await page.locator('#guide-btn').click();
  await page.waitForSelector('#guide-box:not([hidden]) .guide-steps');
  assert.match(await page.locator('#guide-box').innerText(), /step 1 of 2/);
  assert.match(await page.locator('#guide-box li.current').innerText(), /Drag "Heavy wooden crate" onto "Empty floor space"/);
  assert.ok(await page.locator('#stage [data-obj="crate"]').evaluate((n) => n.classList.contains('guide-target')));
  await H.playSteps(page, [{ drop: ['crate', 'floor'] }]);
  assert.match(await page.locator('#guide-box').innerText(), /step 2 of 2/);
  assert.ok(await page.locator('#stage [data-obj="key"]').evaluate((n) => n.classList.contains('guide-target')));
  await H.shot(page, 'show-me-how');
  await H.playSteps(page, [{ drop: ['key', 'door'] }]);
  await page.waitForSelector('#complete:not([hidden])');
  const r = (await page.evaluate(() => OBEY_TEST.runtime())).result;
  assert.equal(r.guided, true);
  assert.equal(r.stars, 1);
  assert.match(await page.locator('.score-why').innerText(), /guided run/);
  assert.equal(await page.locator('#guide-box').isHidden(), true);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Show me how: Easy has it immediately and handles waits; Hard needs 3 traps; a trap restarts the guide', async () => {
  let o = await H.openGame(browser, base, { seed: withDiff(18, 'easy') });
  await goLevel(o.page, 19);
  await o.page.locator('#guide-btn').click();
  await o.page.waitForSelector('#guide-box:not([hidden])');
  await H.playSteps(o.page, [{ tap: 'eyes' }]);
  assert.match(await o.page.locator('#guide-box li.current').innerText(), /Wait about 3 seconds/);
  await o.page.clock.runFor(2800);
  assert.match(await o.page.locator('#guide-box li.current').innerText(), /Tap: Shy button/);
  await H.playSteps(o.page, [{ tap: 'shy' }]);
  await o.page.waitForSelector('#complete:not([hidden])');
  assert.deepEqual(o.errors, []);
  await o.ctx.close();

  o = await H.openGame(browser, base, { seed: withDiff(15, 'hard') });
  const page = o.page;
  await goLevel(page, 16);
  for (let i = 0; i < 2; i++) await page.locator(H.sel('no')).click();
  assert.ok(await page.locator('#guide-btn').evaluate((b) => b.classList.contains('locked-chip')));
  assert.match(await page.locator('#wrong-card').innerText(), /unlocks after 1 more trap/);
  await page.locator(H.sel('no')).click();
  await page.locator('#wrong-card').getByRole('button', { name: 'Show me how' }).click();
  await page.waitForSelector('#guide-box:not([hidden])');
  await page.locator(H.sel('yes')).click();
  assert.match(await page.locator('#guide-box').innerText(), /step 2 of 3/);
  await page.locator(H.sel('yes')).click(); // wrong → trap
  await page.waitForSelector('#guide-box .guide-note');
  assert.match(await page.locator('#guide-box').innerText(), /step 1 of 3/);
  assert.deepEqual(o.errors, []);
  await o.ctx.close();
});

test('Bossworth talks: every line is voiced with his costume and mood, and his mouth moves', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(3, (d) => { d.costumes.unlocked.push('robot'); d.costumes.selected = 'robot'; return d; }) });
  await page.mouse.click(5, 5); // a user gesture unlocks audio
  await goLevel(page, 2);
  await page.locator(H.sel('exit')).click();
  const spoken = await page.evaluate(() => OBEY_TEST.spoken);
  const last = spoken[spoken.length - 1];
  assert.match(last.text, /Bricks/);
  assert.equal(last.costume, 'robot');
  assert.equal(last.mood, 'surprised');
  assert.equal(last.mode, 'babble');
  assert.ok(await page.locator('#narrator').evaluate((n) => n.classList.contains('talking')));
  assert.equal(await page.locator('#narrator .mouth').count(), 1);
  await page.clock.runFor(4000);
  assert.ok(!(await page.locator('#narrator').evaluate((n) => n.classList.contains('talking'))), 'mouth stops');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('voice settings: real speech uses the browser voice; silent mode stays silent', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, {
    seed: H.saveWith(3),
    initScript: () => {
      window.__utter = [];
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
      Object.defineProperty(window, 'speechSynthesis', { value: { speak: (u) => window.__utter.push(u.text), cancel: () => {} } });
    }
  });
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByLabel(/^Real speech/).check();
  await goLevel(page, 2);
  await page.locator(H.sel('exit')).click();
  const said = await page.evaluate(() => window.__utter);
  assert.ok(said.some((t) => /Bricks/.test(t)), JSON.stringify(said));
  assert.ok(said.every((t) => !/\*/.test(t)), 'stage directions are not read out');
  await page.evaluate(() => { location.hash = 'settings'; });
  await page.getByLabel('Silent').check();
  const before = (await page.evaluate(() => window.__utter)).length;
  await goLevel(page, 2);
  await page.locator(H.sel('exit')).click();
  assert.equal((await page.evaluate(() => window.__utter)).length, before);
  assert.deepEqual((await page.evaluate(() => OBEY_TEST.save())).settings.voice, 'off');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('trophies: chapter cup won through play, upgraded on a harder difficulty, shown in the trophy room', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(3, 'easy', (d) => { [1, 2, 3].forEach((n) => { d.bestDifficulty[n] = 'easy'; }); return d; }) });
  await goLevel(page, 4);
  await H.playSteps(page, [{ tap: 'lamp' }, { tap: 'painting' }, { tap: 'door' }]);
  await page.waitForSelector('.toast >> text=Trophy won: Button Bay Cup (Bronze)');
  assert.match(await page.locator('#complete .unlock-list').innerText(), /Trophy: Button Bay Cup \(Bronze\)/);
  assert.ok((await page.evaluate(() => OBEY_TEST.sounds)).includes('trophy'));
  // Upgrade: everything on Medium → Silver.
  await H.seed(page, (d) => { for (let n = 1; n <= 4; n++) { d.completed.push(n); d.bestStars[n] = 3; d.bestDifficulty[n] = n === 4 ? 'easy' : 'medium'; } d.trophies['cup-button-bay'] = 1; d.tutorialDone = true; d.difficulty = 'medium'; d.highestUnlocked = 5; return d; });
  await goLevel(page, 4);
  await H.playSteps(page, [{ tap: 'lamp' }, { tap: 'painting' }, { tap: 'door' }]);
  await page.waitForSelector('.toast >> text=Trophy upgraded: Button Bay Cup (Silver)');
  await page.evaluate(() => { location.hash = 'trophies'; });
  await page.waitForSelector('#screen-trophies:not([hidden])');
  assert.equal(await page.locator('.trophy-card.won').count(), 1);
  assert.match(await page.locator('.trophy-card.won').innerText(), /Silver/);
  assert.equal(await page.locator('.trophy-card').count(), 14);
  await H.shot(page, 'trophy-room');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Easy helper: after 25 idle seconds Bossworth\'s helper shows the next hint for free', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(4, 'easy') });
  await goLevel(page, 5);
  assert.equal(await page.locator('#hint-box').isHidden(), true);
  await page.clock.runFor(26000);
  assert.match(await page.locator('#hint-box').innerText(), /Bossworth's helper/);
  assert.match(await page.locator('#hint-box').innerText(), /Hints are free on Easy/);
  await page.locator(H.sel('swB')).click();
  await page.waitForSelector('#complete:not([hidden])');
  assert.equal((await page.evaluate(() => OBEY_TEST.runtime())).result.stars, 3, 'free hints keep 3 stars on Easy');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('sound events: completion fanfare, stamp, pick/drop and hold sounds are requested', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: withDiff(13, 'medium') });
  await page.mouse.click(5, 5);
  await goLevel(page, 14);
  await H.playSteps(page, [{ drop: ['battery', 'socket'] }, { hold: ['charge', 2200] }, { wait: 3200 }, { tap: 'opt-fix' }]);
  await page.waitForSelector('#complete:not([hidden])');
  await page.clock.runFor(500);
  const snd = await page.evaluate(() => OBEY_TEST.sounds);
  for (const n of ['pick', 'drop', 'hold', 'success', 'stamp']) assert.ok(snd.includes(n), n + ' in ' + snd.join(','));
  assert.deepEqual(errors, []);
  await ctx.close();
});
