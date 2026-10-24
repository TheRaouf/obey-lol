#!/usr/bin/env node
/* Art QA: rendered outline weight of every stage art object (bible §3.3, §17; review 2.3 E97).
 *
 *   node tools/art/strokes.js [--levels 1-136,1001-1004] [--viewport 1180x900] [--json out.json] [--strict]
 *
 * For each non-stretch `svg.art` on the stage it takes the house outline (the 4-unit ink stroke; the
 * 3-unit one, or else the thickest ink stroke, when there is none), reads its *computed* stroke-width
 * (so the --ow normaliser in js/ui/stage.js is included) and multiplies by the px per viewBox unit.
 * Prints per-pack stats and every outline under 2.5 px or over 7 px.
 * Target: 3–6 px for 95 % of objects at a 640 px stage. --strict exits 1 if the target is missed. */
'use strict';
const fs = require('fs');
const L = require('./lib.js');

(async () => {
  const a = L.args(process.argv.slice(2));
  const g = await L.open({ viewport: L.viewport(a.viewport) });
  const out = {};
  for (const n of L.parseList(a.levels)) {
    await g.level(n);
    out[n] = await g.page.evaluate(() => {
      const stage = document.querySelector('#stage');
      const sw = stage ? stage.clientWidth : 0;
      return [...document.querySelectorAll('#stage [data-obj]:not([hidden]) > svg.art')]
        .filter((sv) => sv.getAttribute('preserveAspectRatio') !== 'none')
        .map((sv) => {
          const vb = sv.viewBox.baseVal, box = sv.getBoundingClientRect();
          if (!vb || !vb.width || !box.width) return null;
          const slice = /slice/.test(sv.getAttribute('preserveAspectRatio') || '');
          const k = (slice ? Math.max : Math.min)(box.width / vb.width, box.height / vb.height);
          const inked = [...sv.querySelectorAll('[stroke]')].filter((e) => /--ink/.test(e.getAttribute('stroke')));
          const id = sv.parentElement.getAttribute('data-obj');
          if (!inked.length) return { id, none: true };
          // The house outline is the 4-unit stroke (3 for detail-only drawings). Bespoke widths (8, 10,
          // 22 … a lever shaft, a wire) are deliberate lines, so they only count when nothing else is inked.
          const width = (e) => parseFloat(getComputedStyle(e).strokeWidth) || 0;
          const house = inked.filter((e) => e.getAttribute('stroke-width') === '4');
          const detail = inked.filter((e) => e.getAttribute('stroke-width') === '3');
          const pickFrom = house.length ? house : detail.length ? detail : inked;
          const w = Math.max(...pickFrom.map(width));
          return { id, kind: house.length ? 'outline' : detail.length ? 'detail' : 'bespoke', bespoke: +(Math.max(...inked.map(width)) * k).toFixed(2), art: (sv.parentElement.className.match(/\bart-(\S+)/) || [])[1] || '', px: +(w * k).toFixed(2), btn: sv.parentElement.tagName === 'BUTTON', ow: sv.parentElement.style.getPropertyValue('--ow') || '' };
        }).filter(Boolean).concat([{ stage: sw }]);
    });
  }
  if (a.json) fs.writeFileSync(a.json, JSON.stringify(out, null, 1));
  const stats = {}, flagged = [], noInk = [];
  let all = [], stageW = 0;
  for (const n of Object.keys(out)) {
    for (const o of out[n]) {
      if (o.stage != null) { stageW = o.stage; continue; }
      if (o.none) { noInk.push('L' + n + ' ' + o.id); continue; }
      (stats[L.pack(+n)] = stats[L.pack(+n)] || []).push(o.px);
      all.push(o.px);
      if (o.px < 2.5 || o.px > 7) flagged.push(`L${n} ${o.id} (${o.art}) ${o.px}px${o.btn ? ' button' : ''}${o.ow ? ' ow=' + o.ow : ''}${o.kind !== 'outline' ? ' (' + o.kind + ' stroke)' : ''}${o.px < 2.5 ? ' THIN' : ' THICK'}`);
    }
  }
  const q = (s, p) => s[Math.min(s.length - 1, Math.floor(s.length * p))];
  console.log(`Rendered ink outline, stage ${stageW}px wide (${L.viewport(a.viewport).width}x${L.viewport(a.viewport).height})`);
  for (const k of Object.keys(stats)) {
    const s = stats[k].sort((x, y) => x - y);
    console.log(`${k.padEnd(6)} n ${String(s.length).padStart(3)}  min ${s[0]}  p10 ${q(s, .1)}  med ${q(s, .5)}  p90 ${q(s, .9)}  max ${s[s.length - 1]}  <2.5 ${s.filter((x) => x < 2.5).length}  >7 ${s.filter((x) => x > 7).length}`);
  }
  const inBand = all.filter((x) => x >= 3 && x <= 6).length / (all.length || 1);
  console.log(`In the 3–6 px band: ${(inBand * 100).toFixed(1)} % of ${all.length} objects (target 95 % at a 640 px stage)`);
  console.log(flagged.length ? 'Outside 2.5–7 px:\n  ' + flagged.join('\n  ') : 'Nothing outside 2.5–7 px.');
  if (noInk.length) console.log('No ink outline (check these are meant to be outline-free):\n  ' + noInk.join(', '));
  if (g.errors.length) console.log('Page errors: ' + g.errors.join(' | '));
  await g.close();
  if (a.strict && (inBand < 0.95 || g.errors.length)) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exit(1); });
