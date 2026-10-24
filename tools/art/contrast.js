#!/usr/bin/env node
/* Art QA: WCAG 2.x contrast for the theme tokens and fixed colours, plus colour-vision-deficiency
 * (CVD) separation for colour-coded sets (bible §5.2, §5.3, §17). No dependencies.
 *
 *   node tools/art/contrast.js [--json out.json] [--fails] [--strict]
 *
 * Tokens are parsed from css/style.css (`:root, [data-theme="classic"]`, each `[data-theme="…"]`
 * and `html[data-contrast="high"]`, which is layered over Classic). Opacity cases are alpha-composited
 * first. CVD uses the Machado 2009 matrices (severity 1.0) in linear RGB and reports the smallest
 * pairwise CIE76 ΔE in each set (< 10 hard to tell apart, < 20 weak).
 * --fails prints only failing rows; --strict exits 1 if any row fails. */
'use strict';
const fs = require('fs');
const path = require('path');
const L = require('./lib.js');

const CSS = fs.readFileSync(path.join(L.ROOT, 'css', 'style.css'), 'utf8');

/** Collects the custom properties of every rule whose selector is exactly `sel`. */
function block(sel) {
  const esc = sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('^\\s*' + esc + '\\s*\\{([^}]*)\\}', 'gm');
  const out = {};
  let m;
  while ((m = re.exec(CSS))) for (const t of m[1].matchAll(/--([\w-]+):\s*([^;]+);/g)) out[t[1]] = t[2].trim();
  return out;
}
const themes = {
  classic: block(':root, [data-theme="classic"]'),
  candy: block('[data-theme="candy"]'),
  ocean: block('[data-theme="ocean"]'),
  sunset: block('[data-theme="sunset"]')
};
themes['high-contrast'] = Object.assign({}, themes.classic, block('html[data-contrast="high"]'));

function hex(h) {
  h = h.trim().replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function col(v) {
  v = String(v).trim();
  if (v === 'transparent') return [255, 255, 255, 0];
  if (v === 'white' || v === '#fff') return [255, 255, 255, 1];
  if (v[0] === '#') return hex(v).concat(1);
  const m = v.match(/rgba?\(([^)]*)\)/);
  if (m) { const p = m[1].split(',').map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
  throw new Error('Unparsed colour ' + v);
}
const over = (fg, a, bg) => [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a)).concat(1);
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
function cr(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
const tok = (t, n) => col(themes[t][n]);
const r2 = (x) => Math.round(x * 100) / 100;

// [fg, bg, use, required]
const PAIRS = [
  ['ink', 'paper', 'body text on slips/cards/bubbles', 4.5],
  ['ink', 'paper-2', 'text on locked/secondary cards', 4.5],
  ['muted', 'paper', '.small, .score-why, help text, locked node titles', 4.5],
  ['muted', 'paper-2', 'muted text on secondary cards, locked node numerals', 4.5],
  ['ink', 'stage', 'stage text objects on the wall band', 4.5],
  ['ink', 'stage-floor', 'stage text objects on the floor band', 4.5],
  ['on-bg', 'bg', 'screen titles, level title, tagline on page background', 4.5],
  ['on-bg', 'bg-2', 'on-bg text over background dots', 4.5],
  ['accent-ink', 'accent', 'primary buttons, current map node, LOL stamp', 4.5],
  ['accent', 'paper', 'stamps, speaker name, wrong-title, cc-title', 3.0],
  ['ink', 'accent-2', 'hint box, done map node, toast-achievement, hint badge', 4.5],
  ['good', 'paper', 'stamp-mini "found", dare ok text, hero end stamp', 4.5],
  ['paper', 'ink', 'danger button, node-flag, run-timer', 4.5],
  ['muted', 'paper', 'unearned star outline (.star-off) — non-text', 3.0],
  ['ink', 'stage', 'object outlines against stage — non-text', 3.0],
  ['accent', 'stage', 'drop-target/zone-ghost outline on stage — non-text', 3.0],
  ['good', 'stage', 'guide-target outline on stage — non-text', 3.0],
  ['good', 'paper-2', 'progress bar fill on its track — non-text', 3.0]
];

const out = { tokens: {}, special: [], fixed: [], cvd: [] };
for (const t of Object.keys(themes)) {
  out.tokens[t] = PAIRS.filter((p) => themes[t][p[0]] && themes[t][p[1]]).map(([fg, bg, use, req]) => [fg, bg, r2(cr(tok(t, fg), tok(t, bg))), req, use]);
}

const SUN = '#ffc145';
for (const t of Object.keys(themes)) {
  const ink = tok(t, 'ink'), paper = tok(t, 'paper'), stage = tok(t, 'stage'), bg = tok(t, 'bg'), onbg = tok(t, 'on-bg'), muted = tok(t, 'muted'), a2 = tok(t, 'accent-2');
  const S = (name, v, req) => out.special.push([t, name, r2(v), req]);
  S('.obj.subtle (ink @ .75) on stage', cr(over(ink, 0.75, stage), stage), 4.5);
  S('.obj.fine-print (ink @ .8) on stage', cr(over(ink, 0.8, stage), stage), 4.5);
  S('.region-label (ink @ .55) on paper (map)', cr(over(ink, 0.55, paper), paper), 3.0);
  S('.score-rule / .trust-line / .lvl-num (on-bg @ .85) on bg', cr(over(onbg, 0.85, bg), bg), 4.5);
  S('.map-help (on-bg) on bg (map side, no panel)', cr(onbg, bg), 4.5);
  S('hard shadows on bg (ink; #ffc145 in Sunset, E72) — non-text', cr(t === 'sunset' ? hex(SUN) : ink, bg), 3.0);
  S('.guide-steps li (muted) on #e8fff3', cr(muted, hex('#e8fff3')), 4.5);
  S('.hint-box .small (ink @ .8) on accent-2', cr(over(ink, 0.8, a2), a2), 4.5);
  S('accent (guide-note) on #fff0f0 wrong-card', cr(tok(t, 'accent'), hex('#fff0f0')), 4.5);
  S('white text on --good (hold-btn.done, day.hit)', cr([255, 255, 255], tok(t, 'good')), 4.5);
  S('.bubble[annoyed/panicked] ink on #fff4f4', cr(ink, hex('#fff4f4')), 4.5);
  S('star fill #ffd23f against its 1.6 px ink outline — non-text', cr(hex('#ffd23f'), ink), 3.0);
  S('star outline (ink) on paper — non-text', cr(ink, paper), 3.0);
  if (t === 'sunset') {
    S('Sunset hard shadow #ffc145 on bg — non-text', cr(hex(SUN), bg), 3.0);
    S('Sunset hard shadow #ffc145 on bg-2 — non-text', cr(hex(SUN), tok(t, 'bg-2')), 3.0);
  }
}
const sunOn = tok('sunset', 'on-bg');
out.sunsetGradient = ['#2c1340', '#6b2a63', '#a8455f'].map((s) => [s, r2(cr(sunOn, hex(s)))]);

const FIXED = [
  ['#7dffb2', '#1c1640', '.display-card text', 4.5],
  ['#7dffb2', '#2d2850', '.panel-card / glow text on dark', 4.5],
  ['#ffde3b', '#2d2850', '.panel-lights text', 4.5],
  ['#ff6b6b', '#2d2850', '.panel-lights.wrong', 4.5],
  ['#d8ffe9', '#1b1838', '.undo-chat body text', 4.5],
  ['#c8f5dc', '#1b1838', '.undo-head .small', 4.5],
  ['#ffe08a', '#1b1838', '.undo-msg.leak', 4.5],
  ['#ffffff', '#2d2850', '.roast, .toast-secret', 4.5],
  ['#ffffff', '#e5243b', '.color-btn.red label (white; ink text-shadow helps)', 4.5],
  ['#1c1640', '#ffc31f', '.color-btn.yellow label (ink, 2.3 E90)', 4.5],
  ['#ffffff', '#2f6fe4', '.color-btn.blue label (white)', 4.5],
  ['#1c1640', '#fffdf6', '.shape-btn glyph outline (3 px ink stroke) on paper — non-text', 3.0],
  ['#d61e35', '#fffdf6', '.word-red text on paper', 4.5],
  ['#b34700', '#ffffff', '.word-red text, high contrast', 4.5],
  ['#1c1640', '#d08a4b', '.medal-easy "E" ink on bronze (2.3 E91)', 4.5],
  ['#1c1640', '#c9d1dc', '.medal-medium', 4.5],
  ['#9a6b00', '#fffdf6', '.tier-3/4 .trophy-tier text', 4.5],
  ['#ffffff', '#e5243b', '.node-ruined / .nope-sticker white on classic accent', 4.5],
  ['#e5243b', '#000000', '.fo-title red on black (fake game over)', 3.0],
  ['#ffde3b', '#1c1640', '.ending-chaos title', 3.0],
  ['#ffffff', '#1c1640', '.ending-chaos body text on stripe A', 4.5],
  ['#ffd23f', '#140f33', '.ending-secret title', 3.0],
  ['#1c1640', '#ffb877', '.ending-hero text mid-gradient', 4.5],
  ['#1c1640', '#8fd3ff', '.ending-hero text bottom of gradient', 4.5],
  ['#ffc145', '#1c1640', '.ending-chaos/secret hard shadow on dark — non-text', 3.0],
  ['#1c1640', '#fff3c4', '.ticket-card / .aside-phone / .bonus-line', 4.5],
  ['#1c1640', '#fff8dd', '.book-card', 4.5],
  ['#1c1640', '#e8fff3', '.honest-card / .guide-box / .aside-dare', 4.5]
];
for (const [fg, bg, use, req] of FIXED) out.fixed.push([fg, bg, r2(cr(hex(fg), hex(bg))), req, use]);
const glass = hex('#cfefff');
out.fixed.push(['#2d2850@.8', '#cfefff', r2(cr(over(hex('#2d2850'), 0.8, glass), glass)), 4.5, '.mirror-text effective']);
out.fixed.push(['#ffffff', 'rgba(0,0,0,.82)/white', r2(cr([255, 255, 255], over([0, 0, 0], 0.82, [255, 255, 255]))), 4.5, '.captions worst case']);

// ---------------------------------------------------------------- colour-vision deficiency
const MACHADO = {
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  tritan: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]]
};
const unlin = (c) => { c = Math.max(0, Math.min(1, c)); return 255 * (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055); };
function sim(rgb, kind) { const l = rgb.slice(0, 3).map(lin), m = MACHADO[kind]; return [0, 1, 2].map((i) => unlin(m[i][0] * l[0] + m[i][1] * l[1] + m[i][2] * l[2])); }
function lab(rgb) {
  const [r, g, b] = rgb.slice(0, 3).map(lin);
  const X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, Y = 0.2126 * r + 0.7152 * g + 0.0722 * b, Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
}
const dE = (a, b) => { const A = lab(a), B = lab(b); return Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]); };
const CVD = [
  ['L1 big red vs small blue button', ['#e5243b', '#3a86ff']],
  ['L25 shape buttons green/purple/orange', ['#2bc46f', '#9b5de5', '#ff8c1a']],
  ['B1 colour-btn red vs blue', ['#e5243b', '#2f6fe4']],
  ['footprints red/yellow/blue', ['#e5243b', '#ffc31f', '#2f6fe4']],
  ['Hanoi discs 1/2/3', ['#ff6f91', '#ffd23f', '#3ec1ff']],
  ['composure bar calm/twitchy/frazzled/meltdown', ['#0e8456', '#f5b400', '#ff7a29', '#d61e35']],
  ['difficulty borders easy/medium/hard', ['#0e8456', '#f5b400', '#d61e35']],
  ['light off vs on (L32 gate)', ['#5b5480', '#2bf07f']],
  ['panel-lights normal/wrong/ok', ['#ffde3b', '#ff6b6b', '#7dffb2']],
  ['medals easy/medium/hard', ['#d08a4b', '#c9d1dc', '#ffd23f']],
  ['map region tints (Classic, over paper)', ['region-1', 'region-2', 'region-3', 'region-4']]
];
for (const [name, cols] of CVD) {
  const paper = tok('classic', 'paper');
  const rgbs = cols.map((c) => (c[0] === '#' ? hex(c) : (() => { const v = tok('classic', c); return over(v, v[3], paper); })()));
  const row = { set: name, colours: cols };
  for (const kind of ['normal', 'protan', 'deutan', 'tritan']) {
    const s = kind === 'normal' ? rgbs : rgbs.map((c) => sim(c, kind));
    let min = Infinity;
    for (let i = 0; i < s.length; i++) for (let j = i + 1; j < s.length; j++) min = Math.min(min, dE(s[i], s[j]));
    row[kind] = Math.round(min * 10) / 10;
  }
  out.cvd.push(row);
}

// ---------------------------------------------------------------- report
const a = L.args(process.argv.slice(2));
if (a.json) fs.writeFileSync(a.json, JSON.stringify(out, null, 1));
let fails = 0;
const mark = (r, req) => { const ok = r >= req; if (!ok) fails++; return ok ? 'PASS' : 'FAIL'; };
const show = (ok) => !a.fails || !ok;
console.log('## Token contrast');
for (const [t, rows] of Object.entries(out.tokens)) {
  console.log('### ' + t);
  for (const [fg, bg, r, req, use] of rows) { const m = mark(r, req); if (show(m === 'PASS')) console.log(`  ${fg.padStart(10)} on ${bg.padEnd(11)} ${r.toFixed(2).padStart(6)}  ${m} (need ${req})  ${use}`); }
}
console.log('## Special cases');
for (const [t, n, r, req] of out.special) { const m = mark(r, req); if (show(m === 'PASS')) console.log(`  ${t.padEnd(13)} ${r.toFixed(2).padStart(6)} ${m} need ${req}  ${n}`); }
console.log('## Sunset gradient, on-bg over each stop: ' + out.sunsetGradient.map((s) => `${s[0]} ${s[1]}`).join(' · '));
for (const s of out.sunsetGradient) mark(s[1], 4.5);
console.log('## Fixed colours');
for (const [fg, bg, r, req, use] of out.fixed) { const m = mark(r, req); if (show(m === 'PASS')) console.log(`  ${fg.padStart(12)} on ${bg.padEnd(12)} ${r.toFixed(2).padStart(6)} ${m} need ${req}  ${use}`); }
console.log('## CVD: smallest pairwise ΔE (CIE76); < 10 hard to tell apart, < 20 weak (shape or label must carry it)');
for (const r of out.cvd) console.log(`  ${r.set.padEnd(46)} normal ${String(r.normal).padStart(5)}  protan ${String(r.protan).padStart(5)}  deutan ${String(r.deutan).padStart(5)}  tritan ${String(r.tritan).padStart(5)}`);
console.log(fails ? `${fails} contrast row(s) fail.` : 'All contrast rows pass.');
if (a.strict && fails) process.exitCode = 1;
