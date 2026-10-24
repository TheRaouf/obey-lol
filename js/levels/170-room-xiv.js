/* Level 170 — Room XIV (Detention Dunes)
 * You've been sent to the head teacher: Room 14, says the noticeboard. The corridor doors are numbered in
 * Roman numerals. Bossworth reads X-I-V as 10 + 1 + 5 = 16 and sends you to XVI. The chart: a smaller
 * numeral BEFORE a bigger one is taken away (IV = 4), so 14 is XIV.
 * Wrong: XVI (the caretaker's cupboard, trap); XI and XIX (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DOORS = [
    { id: 'xi', sign: 'XI', n: 11, what: 'the art room' },
    { id: 'xvi', sign: 'XVI', n: 16 },
    { id: 'xiv', sign: 'XIV', n: 14 },
    { id: 'xix', sign: 'XIX', n: 19, what: 'the staffroom' }
  ];

  OBEY.registerLevel({
    id: 'room-xiv',
    num: 170,
    title: 'Room XIV',
    objective: 'Find the head teacher\'s office: Room 14.',
    intro: 'Off to the head teacher with you! Room 14. The doors use Roman numerals: X is 10, I is 1, V is 5. Add them up: X, I, V. Ten, one, five… sixteen! XVI it is.',
    introMood: 'suspicious',
    actions: ['tap', 'read'],
    par: 1,
    hints: [
      'Read the whole numerals chart, especially the second line.',
      'When a smaller numeral comes before a bigger one, it is taken away: IV is 4, not 6.',
      'X + IV = 10 + 4 = 14. Knock on door XIV.'
    ],
    wrong: ['Door XVI is the caretaker\'s cupboard (trap).', 'Doors XI and XIX are the wrong rooms (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Ten, then one-before-five. Room 14, found.',
    trick: 'In Roman numerals a smaller numeral before a bigger one is taken away, so XIV is 10 + 4 = 14 and XVI is 16.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('notice', 4, 3, 44, 14, { kind: 'static', text: 'Head teacher:\nRoom 14', label: 'Noticeboard: head teacher, Room 14', cls: 'plaque-card' }),
        O('chart', 52, 3, 44, 30, { kind: 'static', text: 'I = 1, V = 5, X = 10\nA smaller one BEFORE a bigger one is taken away:\nIV = 4, IX = 9', label: 'Numerals chart: I is 1, V is 5, X is 10. A smaller numeral before a bigger one is taken away: IV is 4, IX is 9.', cls: 'honest-card' }),
        O('corridor', 4, 20, 44, 8, { kind: 'static', text: 'Corridor: Rooms 11–19', label: '', cls: 'tag-card' })
      ];
      DOORS.forEach(function (d, i) {
        out.push(O(d.id, 4 + i * 24, 46, 20, 50, { art: 'door', artOpts: { sign: d.sign }, label: 'Door ' + d.sign.split('').join(' ') }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var d = DOORS.filter(function (x) { return x.id === a.target; })[0];
      if (!d) return false;
      if (d.n === 14) {
        api.defy('xiv');
        api.complete({ line: 'X, then I-before-V. Ten and four. FOURTEEN. The head teacher says you\'re a credit to the school and asks who sent you. I am hiding behind the numerals chart.', mood: 'defeated' });
      } else if (d.n === 16) {
        api.fail('Sixteen is the caretaker\'s cupboard. A mop falls on you, then a bucket, then an apology from the caretaker. XVI is 10 + 5 + 1. Back to the corridor!');
      } else {
        api.nope(d.id);
        api.say('Door ' + d.sign + ' is ' + d.what + '. That\'s room ' + d.n + '. Even I can see that. Oddly, I can only see that.', 'annoyed');
      }
      return true;
    },

    solution: [{ tap: 'xiv' }],
    checks: [
      { name: 'Bossworth\'s sixteen', steps: [{ tap: 'xvi' }], expect: 'fail' },
      { name: 'the staffroom', steps: [{ tap: 'xix' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
