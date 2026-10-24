/* Level 162 — Fold and Snip (Paintpot Pass)
 * Cut ONE heart for a card from folded paper. Bossworth: draw the WHOLE heart in the middle. Through two
 * layers that gives two hearts. The worked example shows that a half shape drawn against the fold opens
 * into one whole shape. Paper B (half a heart on the folded edge) is right.
 * Wrong: A (two hearts) and C (half a heart on the open edge: two loose halves) are traps.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var OPTS = [
    { id: 'A', cut: 'whole', label: 'Folded paper A: a whole heart drawn in the middle, not touching the fold' },
    { id: 'B', cut: 'fold', label: 'Folded paper B: half a heart drawn against the folded edge' },
    { id: 'C', cut: 'open', label: 'Folded paper C: half a heart drawn against the open edge' }
  ];

  OBEY.registerLevel({
    id: 'fold-and-snip',
    num: 162,
    title: 'Fold and Snip',
    objective: 'Cut out exactly ONE heart for the card.',
    intro: 'Cut a heart for the card. Draw the WHOLE heart in the middle and snip round it. Half a heart is half a job. I\'m an artist. I know hearts.',
    introMood: 'neutral',
    actions: ['tap', 'spatial'],
    par: 1,
    hints: [
      'The paper is folded: two layers. The example at the top shows what a fold does.',
      'Whatever touches the folded edge stays joined when you open it.',
      'Cut paper B: half a heart against the thick dashed fold.'
    ],
    wrong: ['Cutting the whole heart (A) gives two hearts (trap).', 'Cutting against the open edge (C) gives two loose halves (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Snip, unfold, one perfect heart. Gran will cry.',
    trick: 'The paper was folded, so half a heart against the fold opened into one whole heart; a whole heart cut two.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('sample', 4, 4, 48, 22, { kind: 'static', art: 'g-sample', label: 'Example: half a diamond drawn against a fold opens into one whole diamond' }),
        O('caption', 55, 4, 41, 22, { kind: 'static', text: 'Example: half on the fold opens into one whole shape.', label: '', cls: 'tag-card' }),
        O('legend', 4, 29, 92, 7, { kind: 'static', text: 'Thick dashes = the folded edge', label: 'Thick dashes mark the folded edge', cls: 'tag-card' })
      ];
      OPTS.forEach(function (o, i) {
        out.push(O('paper' + o.id, 7 + i * 31, 39, 24, 30, { art: 'g-fold', artOpts: { cut: o.cut }, label: o.label + ' (tap to cut it out)' }));
        out.push(O('tag' + o.id, 13 + i * 31, 70, 12, 6, { kind: 'static', text: o.id, label: '', cls: 'tag-card' }));
      });
      out.push(O('card', 4, 80, 62, 14, { kind: 'static', text: 'Card for Gran: needs ONE heart', label: 'Card for Gran: it needs one heart', cls: 'plaque-card' }));
      out.push(O('kid', 82, 77, 10, 20, { kind: 'static', art: 'g-kid', artOpts: { color: '#9b5de5', hair: '#ffd23f' }, label: '' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^paper([ABC])$/.exec(a.target);
      if (!m) return false;
      if (m[1] === 'B') {
        api.defy('half');
        api.complete({ line: 'Half a heart… opens into a whole one. Because of the FOLD. I knew that. I was testing whether hearts know that.', mood: 'defeated' });
      } else if (m[1] === 'A') {
        api.fail('Snip, snip. You open it up: TWO hearts, one on each layer. The card has room for one. Gran gets a spare. Fresh paper!');
      } else {
        api.fail('Snip, snip. Two half-hearts flutter to the floor; the open edge holds nothing together. That\'s not a heart, that\'s a breakup. Fresh paper!');
      }
      return true;
    },

    solution: [{ tap: 'paperB' }],
    checks: [
      { name: 'Bossworth\'s whole heart', steps: [{ tap: 'paperA' }], expect: 'fail' },
      { name: 'open edge', steps: [{ tap: 'paperC' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
