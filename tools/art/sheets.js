#!/usr/bin/env node
/* Art QA: contact sheets of stage renders (bible §10, §17). Playwright only: no Python or PIL.
 *
 *   node tools/art/sheets.js [--levels 1-136,1001-1004] [--viewport 1180x900] [--theme classic]
 *                            [--contrast high] [--motion reduce] [--wait 2300]
 *                            [--out art-sheets] [--per 6] [--cols 3] [--scale 0.6]
 *   node tools/art/sheets.js --from <dir of S<n>.png> [--out …] [--per …] [--cols …] [--scale …]
 *
 * The first form shoots each level's stage to <out>/stages/S<n>.png (after --wait ms, so intro
 * animations settle), then composes them. The second only composes PNGs that already exist.
 * Sheets are written to <out>/sheet-00.png, sheet-01.png, … each tile labelled "L<n> title [mood]". */
'use strict';
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

(async () => {
  const a = L.args(process.argv.slice(2));
  const out = path.resolve(a.out || 'art-sheets');
  const per = +(a.per || 6), cols = +(a.cols || 3), scale = +(a.scale || 0.6);
  const nums = L.parseList(a.levels);
  let src = a.from ? path.resolve(a.from) : path.join(out, 'stages');
  const meta = {};
  const g = await L.open(a.from ? {} : { viewport: L.viewport(a.viewport), theme: a.theme, contrast: a.contrast, motion: a.motion });
  if (!a.from) {
    fs.mkdirSync(src, { recursive: true });
    for (const n of nums) {
      await g.level(n, +(a.wait || 2300));
      meta[n] = await g.page.evaluate(() => ({
        title: (document.querySelector('.lvl-name') || {}).textContent || '',
        mood: (document.querySelector('.narrator-btn') || { getAttribute: () => '' }).getAttribute('data-mood') || ''
      }));
      const st = await g.page.$('#stage');
      if (st) await st.screenshot({ path: path.join(src, `S${n}.png`) });
    }
    fs.writeFileSync(path.join(src, 'meta.json'), JSON.stringify(meta, null, 1));
  } else if (fs.existsSync(path.join(src, 'meta.json'))) Object.assign(meta, JSON.parse(fs.readFileSync(path.join(src, 'meta.json'), 'utf8')));

  const have = nums.filter((n) => fs.existsSync(path.join(src, `S${n}.png`)));
  fs.mkdirSync(out, { recursive: true });
  const page = await g.browser.newPage({ deviceScaleFactor: 1 });
  let sheets = 0;
  for (let i = 0; i < have.length; i += per) {
    const group = have.slice(i, i + per);
    const tiles = group.map((n) => {
      const b64 = fs.readFileSync(path.join(src, `S${n}.png`)).toString('base64');
      const m = meta[n] || {};
      const label = `L${n}${m.title ? ' ' + m.title : ''}${m.mood ? ' [' + m.mood + ']' : ''}`;
      return `<figure><img src="data:image/png;base64,${b64}"><figcaption>${esc(label)}</figcaption></figure>`;
    }).join('');
    await page.setContent(`<!doctype html><meta charset="utf-8"><style>
      body { margin: 0; background: #fff; font: 700 13px system-ui, sans-serif; }
      main { display: inline-grid; grid-template-columns: repeat(${cols}, auto); gap: 6px; padding: 6px; }
      figure { margin: 0; position: relative; }
      img { display: block; zoom: ${scale}; }
      figcaption { position: absolute; left: 0; top: 0; background: #000; color: #fff; padding: 1px 6px; }
    </style><main>${tiles}</main>`);
    await page.waitForFunction(() => [...document.images].every((im) => im.complete));
    const box = await (await page.$('main')).boundingBox();
    await page.setViewportSize({ width: Math.ceil(box.width), height: Math.ceil(box.height) });
    await (await page.$('main')).screenshot({ path: path.join(out, `sheet-${String(sheets).padStart(2, '0')}.png`) });
    sheets++;
  }
  console.log(`${have.length} stage(s) on ${sheets} sheet(s) in ${out}`);
  if (g.errors.length) console.log('Page errors: ' + g.errors.join(' | '));
  await g.close();
})().catch((e) => { console.error(e); process.exit(1); });
