/* Level 107 — Prove You're Human
 * A captcha: "Select ALL squares with part of a ROCKET". The rocket spans five squares
 * (nose, body, fins and both fin tips). Bossworth says only the pointy tip counts.
 * Tap squares to toggle them, then VERIFY. Any other selection fails the captcha (trap).
 * Verifying with nothing selected is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // Row-major 3×3 grid.
  var PARTS = ['star', 'nose', 'planet', 'moon', 'body', 'satellite', 'finL', 'fins', 'finR'];
  var NAMES = { star: 'a star', nose: 'the rocket\'s pointy nose', planet: 'a ringed planet', moon: 'a cratered moon', body: 'the rocket\'s body and window',
    satellite: 'a satellite', finL: 'the tip of a red rocket fin', fins: 'the rocket\'s fins and flame', finR: 'the tip of a red rocket fin' };
  var ROCKET = [1, 4, 6, 7, 8];

  OBEY.registerLevel({
    id: 'prove-youre-human',
    num: 107,
    title: 'Prove You\'re Human',
    objective: 'Pass the captcha.',
    intro: 'Captcha time! Prove you\'re human. Just tap the pointy tip of the rocket. One square. Nobody counts the fins. Fins are basically optional.',
    introMood: 'pleased',
    actions: ['tap', 'observe', 'counting'],
    par: 6,
    hints: [
      'Read the captcha\'s own instruction, word for word.',
      'ALL squares with PART of a rocket. Follow the rocket from nose to fins, including the bits that poke into neighbouring squares.',
      'Select the nose, the body, the fins and both fin tips (five squares), then VERIFY.'
    ],
    wrong: ['Verifying with any other selection fails the captcha (trap).', 'Verifying with nothing selected does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Verified human. Bossworth remains unverified.',
    trick: 'The captcha asked for every square containing part of the rocket, and the fin tips poked into the bottom corner squares.',

    init: function () { return { sel: [false, false, false, false, false, false, false, false, false] }; },

    view: function (s) {
      var objs = [
        O('ask', 4, 2, 92, 11, { kind: 'static', text: 'Select ALL squares with part of a ROCKET', label: 'Captcha: select all squares with part of a rocket', cls: 'panel-card ok' })
      ];
      PARTS.forEach(function (p, i) {
        var col = i % 3, row = Math.floor(i / 3);
        objs.push(O('c' + i, 17 + col * 22, 15 + row * 22, 21, 21, { art: 'd-tile', artOpts: { part: p, sel: s.sel[i] }, label: 'Square ' + (i + 1) + ': ' + NAMES[p] + (s.sel[i] ? ', selected' : '') }));
      });
      var n = s.sel.filter(Boolean).length;
      objs.push(O('count', 4, 86, 44, 11, { kind: 'static', text: n + ' selected', label: n + ' squares selected', cls: 'tag-card' }));
      objs.push(O('verify', 54, 85, 42, 13, { text: 'VERIFY', label: 'Verify the captcha', cls: 'btn-card accent big' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^c(\d)$/.exec(a.target);
      if (m) { var i = Number(m[1]); s.sel[i] = !s.sel[i]; return true; }
      if (a.target !== 'verify') return false;
      var picked = [];
      s.sel.forEach(function (v, k) { if (v) picked.push(k); });
      if (!picked.length) { api.nope(); api.say('You selected nothing. Very Zen. Not very human.', 'pleased'); return true; }
      if (picked.join() === ROCKET.join()) {
        api.defy('tip-only');
        api.complete({ line: 'Verified. Fins and all. The computer says you\'re human. I\'m still deciding.', mood: 'defeated' });
        return true;
      }
      if (picked.join() === '1') api.fail('Captcha FAILED. "Fins are part of the rocket, human." Our records now list you as a toaster. Try again.');
      else api.fail('Captcha FAILED. The grid shuffles its feelings and starts again. Count every bit of rocket.');
      return true;
    },

    solution: [{ tap: 'c1' }, { tap: 'c4' }, { tap: 'c6' }, { tap: 'c7' }, { tap: 'c8' }, { tap: 'verify' }],
    checks: [
      { name: 'just the tip is a trap', steps: [{ tap: 'c1' }, { tap: 'verify' }], expect: 'fail' },
      { name: 'forgetting the fin tips is a trap', steps: [{ tap: 'c1' }, { tap: 'c4' }, { tap: 'c7' }, { tap: 'verify' }], expect: 'fail' },
      { name: 'empty verify is a nope', steps: [{ tap: 'verify' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
