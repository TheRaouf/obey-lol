/* Level 20 — Weight of Words
 * Every word weighs one kilo per letter. Balance HEAVY (5 kg) by putting words on the right pan.
 * Bossworth pushes MASSIVE (7) — too heavy. Correct: TINY (4) + A (1).
 * Wrong: going over 5 kg is a trap (the scale catapults everything).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var WORDS = { A: 1, TINY: 4, MASSIVE: 7, NOTHING: 7 };
  var ORDER = ['A', 'TINY', 'MASSIVE', 'NOTHING'];
  var TRAY = { A: [6, 12], TINY: [20, 20], MASSIVE: [42, 28], NOTHING: [72, 24] };
  var TARGET = 5;

  OBEY.registerLevel({
    id: 'weight-of-words',
    num: 20,
    title: 'Weight of Words',
    objective: 'Balance the scale.',
    intro: 'Balance the scale! Put MASSIVE on it. Heavy needs something massive. It is the obvious choice. Obviously.',
    introMood: 'pleased',
    actions: ['drag', 'count', 'logic'],
    par: 2,
    hints: [
      'Read the sign: weight depends on the letters, not the meaning.',
      'HEAVY weighs 5. MASSIVE and NOTHING weigh 7 each. You need exactly 5 on the right.',
      'Drag TINY (4) and A (1) onto the right pan.'
    ],
    wrong: ['Going over 5 kg tips the scale (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Balanced. Words have weight. Bossworth\'s have more.',

    init: function () { return { pan: [] }; },

    view: function (s) {
      var total = s.pan.reduce(function (t, w) { return t + WORDS[w]; }, 0);
      var objs = [
        O('rule', 4, 2, 92, 10, { kind: 'static', text: 'Sign: every word weighs 1 kg per letter.', label: 'Sign: every word weighs one kilogram per letter', cls: 'tag-card' }),
        O('scale', 6, 14, 88, 44, { kind: 'static', art: 'scale', artOpts: { tilt: total === TARGET ? 0 : (total < TARGET ? -1 : 1) }, label: 'Scale. Left pan: HEAVY, 5 kilograms. Right pan: ' + (s.pan.length ? s.pan.join(' and ') : 'empty') + ', ' + total + ' kilograms' }),
        O('left', 10, 30, 30, 9, { kind: 'static', text: 'HEAVY (5)', cls: 'tag-card' }),
        O('pan', 58, 26, 34, 18, { kind: 'zone', label: 'Right pan of the scale', zone: true }),
        O('panlist', 58, 44, 34, 9, { kind: 'static', text: (s.pan.length ? s.pan.join(' + ') : 'empty') + ' = ' + total, label: '', cls: 'tag-card' })
      ];
      ORDER.forEach(function (w) {
        var t = TRAY[w];
        objs.push(O('w-' + w, t[0], 74, t[1], 14, { text: w, label: 'Word block ' + w, drag: true, cls: 'btn-card big', hidden: s.pan.indexOf(w) >= 0 }));
      });
      objs.push(O('tray', 4, 90, 92, 6, { kind: 'static', text: 'word tray', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'drop' || !/^w-/.test(a.target)) return false;
      var w = a.target.slice(2);
      if (a.zone !== 'pan') { api.nope(a.target); api.say('That word wandered back to the tray. Words are like that.', 'neutral'); return true; }
      s.pan.push(w);
      var total = s.pan.reduce(function (t, x) { return t + WORDS[x]; }, 0);
      if (total === TARGET) {
        api.complete({ line: 'Perfectly balanced. TINY plus A equals HEAVY. Language is broken and you broke it further.', mood: 'defeated' });
      } else if (total > TARGET) {
        api.fail(w === 'NOTHING'
          ? 'NOTHING weighs SEVEN KILOS?! The scale launches HEAVY into orbit. Words are heavier than they look.'
          : 'CLANG! Too heavy! The scale catapults HEAVY across the room. Massive was, in fact, massive.');
      } else {
        api.say('The scale wobbles. ' + total + ' kilos. Not quite.', 'suspicious');
      }
      return true;
    },

    solution: [{ drop: ['w-TINY', 'pan'] }, { drop: ['w-A', 'pan'] }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
