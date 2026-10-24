/* Full campaign through the real UI: all 16 levels, map progression, stars, endings. */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const H = require('./helpers');

let browser, server, base;
const report = { levels: [], endings: {} };

test.before(async () => { browser = await H.launch(); server = await H.startServer(); base = server.url; });
test.after(async () => {
  await browser.close(); server.srv.close();
  fs.mkdirSync(path.join(__dirname, 'results'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'results', 'campaign.json'), JSON.stringify(report, null, 2));
});

async function completeOverlay(page) {
  await page.waitForSelector('#complete:not([hidden]) .complete-card');
  const label = await page.locator('#complete .big-stars').getAttribute('aria-label');
  return Number(/^(\d)/.exec(label)[1]);
}

test('first launch: tutorial, then a full 16-level campaign via the UI, ending in the Hero ending', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base);
  const defs = await H.levelDefs(page);
  assert.equal(defs.length, 16);

  // Play from the main menu: the tutorial shows first.
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await page.waitForSelector('.tutorial');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('[data-t="press"]').click();
  await page.waitForSelector('text=Questioning instructions is allowed here');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Start playing' }).click();
  await page.waitForSelector('#screen-level:not([hidden])');
  assert.equal(await page.evaluate(() => OBEY_TEST.save().tutorialDone), true);

  for (const d of defs) {
    const rt = await page.evaluate(() => OBEY_TEST.runtime());
    assert.equal(rt.level, d.num, 'on level ' + d.num);
    assert.equal(rt.status, 'playing');
    await H.playSteps(page, d.solution, 'mouse');
    const stars = await completeOverlay(page);
    const r = await page.evaluate(() => OBEY_TEST.runtime());
    assert.equal(r.status, 'complete', 'L' + d.num + ' complete');
    const save = await page.evaluate(() => OBEY_TEST.save());
    assert.ok(save.completed.includes(d.num));
    assert.equal(save.bestStars[d.num], stars);
    report.levels.push({ level: d.num, id: d.id, stars, actions: r.result.actions, par: r.result.par, hints: r.result.hints, path: 'intended solution (mouse)' });
    if (d.num === 1) await H.shot(page, 'level-complete');
    if (d.num < 16) {
      assert.equal(save.highestUnlocked, d.num + 1);
      await page.getByRole('button', { name: 'Next level' }).click();
      await page.waitForFunction((n) => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === n, d.num + 1);
    } else {
      assert.equal(r.result.ending, 'hero');
      await page.getByRole('button', { name: 'See your ending' }).click();
    }
  }

  // Hero ending sequence.
  await page.waitForSelector('.ending-hero');
  await H.shot(page, 'ending-hero');
  for (let i = 0; i < 10 && await page.locator('[data-end-next]').count(); i++) await page.locator('[data-end-next]').click();
  await page.waitForSelector('.ending-final');
  assert.match(await page.locator('.ending-final').innerText(), /Hero ending/);
  const save = await page.evaluate(() => OBEY_TEST.save());
  assert.deepEqual(save.endings.seen, ['hero']);
  assert.ok(save.achievements['heroic-finish']);
  assert.ok(save.achievements['full-campaign']);
  assert.ok(save.achievements['first-steps']);
  assert.ok(save.achievements['professional-disobeyer'], 'defiance=' + save.stats.defiance);
  assert.ok(save.achievements['perfect-performance'], 'all 3-star: ' + JSON.stringify(save.bestStars));
  report.endings.hero = 'passed';

  // Map shows all 16 completed with stars.
  await page.getByRole('button', { name: 'Adventure map' }).click();
  await page.waitForSelector('#screen-map:not([hidden])');
  assert.equal(await page.locator('.map-node.node-done').count(), 16);
  assert.equal(await page.locator('.map-node.node-locked').count(), 0);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('map progression: locked levels cannot be opened; completing unlocks the next node immediately', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(0) });
  await page.evaluate(() => { location.hash = 'map'; });
  await page.waitForSelector('#screen-map:not([hidden])');
  assert.equal(await page.locator('.map-node.node-locked').count(), 15);
  assert.equal(await page.locator('.map-node.is-current').count(), 1);
  // Clicking a locked node is refused.
  await page.locator('.map-node[data-level="5"]').click({ force: true }); // aria-disabled: Playwright treats it as disabled
  await page.waitForSelector('.toast >> text=Level 5 is locked');
  assert.equal(await page.evaluate(() => OBEY_TEST.screen()), 'map');
  // Deep-linking a locked level is refused too.
  await page.evaluate(() => { location.hash = 'level/5'; });
  await page.waitForFunction(() => location.hash === '#map');
  assert.equal(await page.evaluate(() => OBEY_TEST.runtime()), null);
  // Complete level 1, return to the map.
  await page.locator('.map-node[data-level="1"]').click();
  await H.playSteps(page, [{ tap: 'red' }, { tap: 'blue' }]);
  await page.waitForSelector('#complete:not([hidden])');
  await page.locator('#complete').getByRole('button', { name: 'Map' }).click();
  await page.waitForSelector('#screen-map:not([hidden])');
  assert.equal(await page.locator('.map-node.node-done').count(), 1);
  assert.equal(await page.locator('.map-node.node-locked').count(), 14);
  assert.match(await page.locator('.map-node[data-level="2"]').getAttribute('aria-label'), /next up/);
  await H.shot(page, 'adventure-map');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('replay: worse result keeps the best stars; better result improves them', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(0) });
  await page.evaluate(() => { location.hash = 'level/1'; });
  await page.waitForSelector('#stage [data-obj="red"]');
  // 1-star run: two hints + extra actions.
  await page.locator('#hint-btn').click();
  await page.locator('#hint-btn').click();
  for (let i = 0; i < 3; i++) await page.locator(H.sel('red')).click();
  await page.locator(H.sel('blue')).click();
  await page.waitForSelector('#complete:not([hidden])');
  let s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.bestStars[1], 1);
  // Replay perfectly → 3 stars.
  await page.getByRole('button', { name: 'Replay' }).click();
  await H.playSteps(page, [{ tap: 'red' }, { tap: 'blue' }]);
  await page.waitForSelector('#complete:not([hidden])');
  s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.bestStars[1], 3);
  assert.match(await page.locator('.score-why').innerText(), /New best/);
  // Replay badly again → stays 3.
  await page.getByRole('button', { name: 'Replay' }).click();
  await page.locator('#hint-btn').click();
  await page.locator('#hint-btn').click();
  await H.playSteps(page, [{ tap: 'red' }, { tap: 'blue' }]);
  await page.waitForSelector('#complete:not([hidden])');
  s = await page.evaluate(() => OBEY_TEST.save());
  assert.equal(s.bestStars[1], 3);
  assert.deepEqual(s.completed, [1]);
  assert.match(await page.locator('.score-why').innerText(), /best is still 3/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('alternative paths: every recorded choice can be made through the UI', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(15) });
  const defs = await H.levelDefs(page);
  const runs = [[9, 'prank', { gift: 'prank' }], [10, 'potato', { rule: 'potato' }], [14, 'graffiti', { sign: 'graffiti' }], [15, 'why', { trust: 'why' }]];
  for (const [n, alt, expect] of runs) {
    await page.evaluate((x) => { location.hash = 'level/' + x; }, n);
    await page.waitForFunction((x) => OBEY_TEST.runtime() && OBEY_TEST.runtime().level === x && OBEY_TEST.runtime().status === 'playing', n);
    await H.playSteps(page, defs[n - 1].alternatives[alt]);
    await page.waitForSelector('#complete:not([hidden])');
    const s = await page.evaluate(() => OBEY_TEST.save());
    for (const k of Object.keys(expect)) assert.equal(s.choices[k], expect[k], `L${n} ${k}`);
    await page.evaluate(() => { location.hash = 'map'; });
    await page.waitForSelector('#screen-map:not([hidden])');
  }
  // Level 15 now reflects chaos choices in its intro.
  await page.evaluate(() => { location.hash = 'level/15'; });
  await page.waitForSelector('#stage [data-obj="gearA"]');
  assert.match(await page.locator('#line').innerText(), /potato/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Chaos ending via dragging the fuse; endings gallery replay', async () => {
  const { page, errors, ctx } = await H.openGame(browser, base, { seed: H.saveWith(15) });
  await page.evaluate(() => { location.hash = 'level/16'; });
  await page.waitForSelector('#stage [data-obj="fuse"]');
  assert.equal(await page.locator(H.sel('quill')).isHidden(), true);
  await page.locator(H.sel('obey')).click();
  assert.match(await page.locator('#line').innerText(), /OBEYED/);
  await H.drag(page, 'fuse', 'machine');
  await page.waitForSelector('#complete:not([hidden])');
  await page.getByRole('button', { name: 'See your ending' }).click();
  await page.waitForSelector('.ending-chaos');
  await page.locator('[data-end-next]').click();
  await H.shot(page, 'ending-chaos');
  await page.locator('[data-end-skip]').click();
  await page.waitForSelector('.ending-final');
  assert.match(await page.locator('.ending-final').innerText(), /Chaos ending/);
  let s = await page.evaluate(() => OBEY_TEST.save());
  assert.deepEqual(s.endings.seen, ['chaos']);
  assert.ok(s.achievements['chaos-enthusiast']);
  assert.ok(!s.achievements['heroic-finish']);
  // Gallery → replay.
  await page.getByRole('button', { name: 'Endings gallery' }).click();
  await page.waitForSelector('#screen-achievements:not([hidden])');
  await page.locator('.gallery-chaos').getByRole('button', { name: 'Replay ending' }).click();
  await page.waitForSelector('.ending-chaos .ending-talk');
  // Unseen endings cannot be opened by URL.
  await page.evaluate(() => { location.hash = 'ending/secret'; });
  await page.waitForFunction(() => location.hash === '#achievements');
  report.endings.chaos = 'passed';
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Secret Master ending requires all 15 secrets and Level 16', async () => {
  const all = (await (async () => {
    const { page, ctx } = await H.openGame(browser, base);
    const ids = await page.evaluate(() => OBEY.SECRET_IDS);
    await ctx.close();
    return ids;
  })());
  // 14 secrets: no quill.
  let o = await H.openGame(browser, base, { seed: H.saveWith(15, (d) => { d.secrets = all.slice(0, 14); return d; }) });
  await o.page.evaluate(() => { location.hash = 'level/16'; });
  await o.page.waitForSelector('#stage [data-obj="wrench"]');
  assert.equal(await o.page.locator(H.sel('quill')).isHidden(), true);
  assert.equal(await o.page.evaluate(() => OBEY.progress.recordEnding(OBEY_TEST.save(), 'secret')), null);
  await o.ctx.close();
  // 15 secrets: quill → ending with a written instruction.
  o = await H.openGame(browser, base, { seed: H.saveWith(15, (d) => { d.secrets = all.slice(); return d; }) });
  const { page, errors, ctx } = o;
  await page.evaluate(() => { location.hash = 'level/16'; });
  await page.waitForSelector('#stage [data-obj="quill"]');
  await page.locator(H.sel('quill')).click();
  await page.waitForSelector('#complete:not([hidden])');
  await page.getByRole('button', { name: 'See your ending' }).click();
  await page.waitForSelector('.ending-secret');
  await H.shot(page, 'ending-secret-master');
  await page.locator('[data-end-skip]').click();
  await page.locator('[data-end-choice="2"]').click();
  await page.locator('[data-end-next]').click();
  await page.waitForSelector('.ending-final');
  assert.match(await page.locator('.ending-final').innerText(), /Have fun/);
  const s = await page.evaluate(() => OBEY_TEST.save());
  assert.deepEqual(s.endings.seen, ['secret']);
  assert.ok(s.achievements.ghostwriter);
  report.endings.secret = 'passed';
  assert.deepEqual(errors, []);
  await ctx.close();
});
