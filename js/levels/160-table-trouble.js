/* Level 160 — Table Trouble (Bookworm Bog)
 * Bossworth filled in a 6–9 times-table square and says it's perfect. 7 × 8 says 54 (it's 56): the row
 * and column patterns jump. 54 also appears, correctly, at 6 × 9. Tap the wrong square to fix it.
 * Wrong: handing it in as it is (trap); tapping a correct square (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var N = [6, 7, 8, 9];
  function val(r, c) { return r === 7 && c === 8 ? 54 : r * c; }

  OBEY.registerLevel({
    id: 'table-trouble',
    num: 160,
    title: 'Table Trouble',
    objective: 'Find and fix the wrong answer in the times-table square.',
    intro: 'I\'ve done the times-table square for you. Every answer correct, obviously; I\'m a maths genius. Hand it in. Don\'t check it. Checking is rude.',
    introMood: 'pleased',
    actions: ['tap', 'pattern'],
    par: 1,
    hints: [
      'Each row should go up by the same step every time.',
      'Look along the 7 row: 42, 49, … then a jump that is too small.',
      '7 × 8 is 56, not 54. Tap the 54 in the 7 row.'
    ],
    wrong: ['Handing in the square as it is is a trap.', 'Tapping a correct answer is a nope.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Seven eights are fifty-six. Always have been.',
    trick: 'The 7 row should climb by 7 each time, and 49 to 54 to 63 broke the pattern; the other 54, at 6 × 9, was right.',

    init: function () { return { fixed: false }; },

    view: function (s) {
      var out = [
        O('title', 4, 3, 92, 8, { kind: 'static', text: 'Times-table square (answers by Bossworth)', label: '', cls: 'tag-card' }),
        O('corner', 14, 13, 15, 11, { kind: 'static', text: '×', label: '', cls: 'display-card' })
      ];
      N.forEach(function (c, j) { out.push(O('hc' + c, 14 + (j + 1) * 17, 13, 15, 11, { kind: 'static', text: String(c), label: 'Column ' + c, cls: 'display-card' })); });
      N.forEach(function (r, i) {
        out.push(O('hr' + r, 14, 26 + i * 13, 15, 11, { kind: 'static', text: String(r), label: 'Row ' + r, cls: 'display-card' }));
        N.forEach(function (c, j) {
          var v = r === 7 && c === 8 && s.fixed ? 56 : val(r, c);
          out.push(O('c' + r + c, 14 + (j + 1) * 17, 26 + i * 13, 15, 11, { text: String(v), label: r + ' times ' + c + ': ' + v, cls: 'btn-card big' }));
        });
      });
      out.push(O('note', 4, 82, 46, 14, { kind: 'static', text: 'Spot a wrong answer? Tap it to fix it.', label: '', cls: 'tag-card' }));
      out.push(O('handin', 54, 82, 42, 14, { text: 'Hand it in!', label: 'Hand in the square as it is', cls: 'btn-card accent' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'handin') {
        api.fail('The teacher marks it: "7 × 8 = 54? See me." Bossworth slides the paper back to you. "See YOU," he says. Check it this time.');
        return true;
      }
      var m = /^c(\d)(\d)$/.exec(a.target);
      if (!m) return false;
      var r = Number(m[1]), c = Number(m[2]);
      if (r === 7 && c === 8) {
        s.fixed = true;
        api.complete({ line: 'Fifty-SIX? Seven eights are fifty-six? I was thinking of six nines. They\'re very similar. They\'re both… numbers.', mood: 'defeated' });
        return true;
      }
      api.nope(a.target);
      api.say(r + ' × ' + c + ' = ' + (r * c) + '. That one\'s right. HA. Told you I\'m a genius. Hand it in.', 'pleased');
      return true;
    },

    solution: [{ tap: 'c78' }],
    checks: [
      { name: 'hand it in', steps: [{ tap: 'handin' }], expect: 'fail' },
      { name: 'the honest 54', steps: [{ tap: 'c69' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
