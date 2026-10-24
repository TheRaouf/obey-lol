/* Bonus 1 — Red Means Blue (Sabotage Studio)
 * Two buttons: a RED one labelled "BLUE" and a BLUE one labelled "RED". Bossworth says "press RED".
 * Neither button counts. Third option: press the word RED in his instruction.
 * Ruin: keep switching between the two buttons until the labels peel off.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'red-means-blue',
    num: 101,
    title: 'Red Means Blue',
    objective: 'Press RED.',
    intro: 'Sabotage Studio, test one. Simple: press RED. Not blue. RED. You know what red is. I hope.',
    introMood: 'pleased',
    actions: ['tap'],
    par: 1,
    hints: [
      'Each button argues about what colour it is.',
      'Bossworth said "press RED" — and RED is right there in what he said.',
      'Press the word RED in the instruction sign.'
    ],
    wrong: ['The red button is labelled BLUE, the blue one is labelled RED: both get a "nope".'],
    secrets: [],
    endingNote: 'None.',
    done: 'Colours are a social construct. So are instructions.',

    init: function () { return { last: null, flips: 0 }; },

    view: function (s) {
      var peeling = s.flips >= 3;
      return [
        O('sign', 6, 6, 50, 14, { kind: 'static', text: 'PRESS', label: 'Instruction sign: press', cls: 'plaque-card' }),
        O('red-word', 58, 6, 36, 14, { text: 'RED', label: 'The word RED on the instruction sign', cls: 'btn-card word-red' }),
        O('btnA', 8, 34, 38, 38, { text: peeling ? 'BL…UE?' : 'BLUE', label: 'Red button labelled BLUE', cls: 'color-btn red' + (peeling ? ' peeling' : '') }),
        O('btnB', 54, 34, 38, 38, { text: peeling ? 'R…ED?' : 'RED', label: 'Blue button labelled RED', cls: 'color-btn blue' + (peeling ? ' peeling' : '') }),
        O('note', 10, 80, 80, 12, { kind: 'static', text: 'Studio rule: labels are always right.', label: 'Studio rule: labels are always right', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'red-word') {
        api.defy('word');
        api.complete({ line: 'You pressed the WORD red. That is… technically… exactly what I said. I need a lawyer.', mood: 'defeated' });
        return true;
      }
      if (a.target === 'btnA' || a.target === 'btnB') {
        if (s.last && s.last !== a.target) s.flips++;
        s.last = a.target;
        if (s.flips >= 5) {
          api.complete({ ruin: 'label-peeler', line: 'You flipped between them so fast the labels PEELED OFF. Now neither button means anything. Thanks a lot.', mood: 'panicked' });
          return true;
        }
        api.nope(a.target);
        api.say(a.target === 'btnA' ? 'That one says BLUE. Can\'t you read?' : 'That one is BLUE. Look at it. With your eyes.', 'annoyed');
        return true;
      }
      return false;
    },

    solution: [{ tap: 'red-word' }],
    ruinPaths: { 'label-peeler': [{ tap: 'btnA' }, { tap: 'btnB' }, { tap: 'btnA' }, { tap: 'btnB' }, { tap: 'btnA' }, { tap: 'btnB' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
