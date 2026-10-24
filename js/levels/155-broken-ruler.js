/* Level 155 — Broken Ruler (Chalkboard Chasm)
 * How long is the pencil? Bossworth: read the number at the pointy end, 9. The class ruler has snapped:
 * its first mark is 2, so a pencil from the 2 mark to the 9 mark is 9 − 2 = 7 cm.
 * Wrong: 9 (the end number) and 11 (adding the 2) are traps.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ANS = ['7', '9', '11'];

  OBEY.registerLevel({
    id: 'broken-ruler',
    num: 155,
    title: 'Broken Ruler',
    objective: 'Measure the pencil.',
    intro: 'Maths! How long is the pencil? Easy: read the number at the pointy end. It\'s nine. Write nine and look clever. I always look clever.',
    introMood: 'neutral',
    actions: ['tap', 'measure'],
    par: 1,
    hints: [
      'Where does the pencil start? Look at the left end of the ruler.',
      'This ruler snapped off: its first mark is 2, not 0.',
      'The pencil runs from 2 to 9, so it is 9 − 2 = 7 cm.'
    ],
    wrong: ['Answering 9 (the number at the tip) is a trap.', 'Answering 11 is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Seven centimetres, measured with half a ruler and a whole brain.',
    trick: 'The ruler had snapped off at 2, so you measured from 2 to 9 and got 7, instead of reading the end number.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('q', 4, 3, 92, 10, { kind: 'static', text: 'Q: How long is the pencil, in cm?', label: 'Question: how long is the pencil, in centimetres?', cls: 'plaque-card' }),
        O('tag', 4, 16, 52, 8, { kind: 'static', text: 'The class ruler. It has seen things.', label: '', cls: 'tag-card' }),
        O('measure', 4, 33, 92, 30, { kind: 'static', art: 'g-measure', label: 'A ruler snapped off at the left: its first mark is 2, then 3, 4 and so on up to 12. The pencil lies from the 2 mark to the 9 mark.' }),
        O('desk', 7, 58, 86, 19, { kind: 'static', art: 'table' }),
        O('ask', 4, 78, 44, 7, { kind: 'static', text: 'Your answer:', label: '', cls: 'tag-card' })
      ];
      ANS.forEach(function (n, i) {
        out.push(O('a' + n, 6 + i * 31, 86, 26, 11, { text: n + ' cm', label: 'Answer ' + n + ' centimetres', cls: 'btn-card big' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^a(\d+)$/.exec(a.target);
      if (!m) return false;
      if (m[1] === '7') {
        api.defy('seven');
        api.complete({ line: 'Seven? The pencil ends at NINE. …Starting at TWO. Because someone snapped the ruler. Doing a sword fight. I have no idea who. (It was me.)', mood: 'defeated' });
      } else if (m[1] === '9') {
        api.fail('Nine! Red pen: "This ruler starts at 2." The pencil doesn\'t start at zero, because the ruler doesn\'t. Measure again!');
      } else {
        api.fail('Eleven? You ADDED the broken bit. The pencil got longer while you were measuring it. Measure again!');
      }
      return true;
    },

    solution: [{ tap: 'a7' }],
    checks: [
      { name: 'Bossworth\'s nine', steps: [{ tap: 'a9' }], expect: 'fail' },
      { name: 'adding the stub', steps: [{ tap: 'a11' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
