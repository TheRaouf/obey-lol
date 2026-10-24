/* Level 98 — Bits and Bulbs
 * A binary lock: four bulbs worth 8, 4, 2 and 1. The door code is 10. Bossworth says to switch
 * on ten bulbs (there are four), so "just switch on all of them". All four is 15 (trap).
 * Correct: light the 8 and the 2, press ENTER.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var VALS = [8, 4, 2, 1];
  var CODE = 10;

  OBEY.registerLevel({
    id: 'bits-and-bulbs',
    num: 98,
    title: 'Bits and Bulbs',
    objective: 'Enter the door code on the bulb lock.',
    intro: 'The door code is TEN. So switch on TEN bulbs. There are only four? Then switch on all four and shout "TEN" confidently. That\'s how I passed physics.',
    introMood: 'pleased',
    actions: ['tap', 'counting', 'logic'],
    par: 3,
    hints: [
      'Each bulb has a number above it. The lock adds them up.',
      'Which of 8, 4, 2 and 1 add up to exactly 10?',
      'Light the 8 bulb and the 2 bulb, then press ENTER.'
    ],
    wrong: ['Entering any total other than 10 sets off the lock (trap).', 'Pressing ENTER with every bulb off does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One-zero-one-zero. Ten, in a language only bulbs and nerds speak.',
    trick: 'It was a binary lock: lit bulbs add their values, and 8 + 2 makes 10 with only two bulbs.',

    init: function () { return { on: [false, false, false, false] }; },

    view: function (s) {
      var total = 0;
      s.on.forEach(function (v, i) { if (v) total += VALS[i]; });
      var objs = [
        O('plaque', 4, 4, 92, 11, { kind: 'static', text: 'BINARY LOCK: the lit bulbs add up', label: 'Plaque: binary lock, the lit bulbs add up', cls: 'plaque-card' }),
        O('code', 4, 18, 44, 13, { kind: 'static', text: 'DOOR CODE: ' + CODE, label: 'Door code: ' + CODE, cls: 'display-card' }),
        O('total', 52, 18, 44, 13, { kind: 'static', text: 'Lit total: ' + total, label: 'Lit total: ' + total, cls: 'panel-card' + (total === CODE ? ' ok' : '') })
      ];
      VALS.forEach(function (v, i) {
        var x = 6 + i * 24;
        objs.push(O('v' + v, x, 36, 18, 10, { kind: 'static', text: String(v), label: '', cls: 'tag-card' }));
        objs.push(O('b' + v, x, 48, 18, 28, { art: 'bulb', artOpts: { on: s.on[i] }, label: 'Bulb worth ' + v + ', ' + (s.on[i] ? 'on' : 'off') }));
      });
      objs.push(O('enter', 30, 84, 40, 13, { text: 'ENTER', label: 'Enter the code', cls: 'btn-card accent big' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^b(8|4|2|1)$/.exec(a.target);
      if (m) {
        var i = VALS.indexOf(Number(m[1]));
        s.on[i] = !s.on[i];
        return true;
      }
      if (a.target !== 'enter') return false;
      var total = 0;
      s.on.forEach(function (v, k) { if (v) total += VALS[k]; });
      if (total === CODE) {
        api.defy('all-four');
        api.complete({ line: 'Two bulbs. TWO. And the lock says ten. Counting has betrayed me.', mood: 'defeated' });
      } else if (!total) {
        api.nope();
        api.say('Zero bulbs. Zero is not ten. Even I know that one.', 'pleased');
      } else {
        api.fail(total === 15
          ? 'All four bulbs: FIFTEEN. The lock blows a raspberry and resets. I may have been wrong about physics.'
          : 'The lock counts ' + total + '. Not ten. BZZT. Everything resets.');
      }
      return true;
    },

    solution: [{ tap: 'b8' }, { tap: 'b2' }, { tap: 'enter' }],
    checks: [
      { name: 'all four bulbs is a trap', steps: [{ tap: 'b8' }, { tap: 'b4' }, { tap: 'b2' }, { tap: 'b1' }, { tap: 'enter' }], expect: 'fail' },
      { name: 'empty entry is a nope', steps: [{ tap: 'enter' }], expect: 'nope' },
      { name: 'toggling a bulb back off is fine', steps: [{ tap: 'b4' }, { tap: 'b4' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
