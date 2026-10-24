#!/usr/bin/env node
/* Turns failing tests in a node:test TAP log into GitHub Actions error annotations, so CI failures can be
 * read from the public check-run annotations even when the raw job log is unavailable.
 *   node tools/tap-annotate.js e2e.tap */
'use strict';
const fs = require('fs');
const lines = fs.readFileSync(process.argv[2], 'utf8').split('\n');
let n = 0;
for (let i = 0; i < lines.length && n < 20; i++) {
  const m = /^not ok \d+ - (.*)$/.exec(lines[i]);
  if (!m || /\.test\.js$/.test(m[1])) continue;
  const detail = lines.slice(i + 1, i + 40).filter((l) => /error:|expected:|actual:|^\s+[-+] |\.test\.js:\d+|waiting for|Timeout|L\d+/.test(l)).map((l) => l.trim()).join(' | ').slice(0, 1500);
  const esc = (s) => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  console.log(`::error title=${esc(m[1].slice(0, 120))}::${esc(detail || m[1])}`);
  n++;
}
const sum = lines.filter((l) => /^# (tests|pass|fail) /.test(l)).join(', ');
if (sum) console.log(`::notice title=Summary::${sum}`);
