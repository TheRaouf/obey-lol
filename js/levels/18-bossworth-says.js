/* Level 18 — Bossworth Says
 * Only commands that start with "Bossworth says" count. Correct order: drum, horn, drum.
 * Obeying a command without the prefix (the bell, or the horn "again") is a trap.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var LIST = '1. Bossworth says: tap the drum.\n2. Tap the bell.\n3. Bossworth says: tap the horn.\n4. Tap the horn again.\n5. Bossworth says: tap the drum.';
  var SEQ = ['drum', 'horn', 'drum'];

  OBEY.registerLevel({
    id: 'bossworth-says',
    num: 18,
    title: 'Bossworth Says',
    objective: 'Follow the command list correctly.',
    intro: 'Let\'s play a game! Do everything on my list, in order. Everything. Every single thing. Go!',
    introMood: 'pleased',
    actions: ['tap', 'read', 'sequence'],
    par: 3,
    hints: [
      'This is a very old playground game.',
      'Only commands that begin with "Bossworth says" count. Commands 2 and 4 are traps.',
      'Tap the drum, then the horn, then the drum.'
    ],
    wrong: ['Tapping the bell, tapping the horn twice, or anything out of order is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'You only obeyed when Bossworth said so. He is weirdly proud.',

    init: function () { return { i: 0 }; },

    view: function (s) {
      return [
        O('list', 4, 3, 92, 44, { kind: 'static', text: LIST, label: 'Command list. ' + LIST.replace(/\n/g, ' '), cls: 'book-card' }),
        O('progress', 36, 49, 28, 8, { kind: 'static', text: ['○ ○ ○', '● ○ ○', '● ● ○', '● ● ●'][s.i], label: s.i + ' of 3 correct commands done', cls: 'panel-lights' }),
        O('drum', 4, 60, 30, 34, { art: 'drum', label: 'Drum' }),
        O('bell', 38, 62, 24, 30, { art: 'bell', label: 'Bell' }),
        O('horn', 66, 60, 30, 34, { art: 'horn', label: 'Horn' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap' || ['drum', 'bell', 'horn'].indexOf(a.target) < 0) return false;
      if (a.target === SEQ[s.i]) {
        s.i++;
        if (s.i === SEQ.length) api.complete({ line: '…you didn\'t do number 2 OR number 4. Because I didn\'t SAY so. You beat Bossworth Says. Nobody beats Bossworth Says.', mood: 'defeated' });
        else api.say(a.target === 'drum' ? '*BOOM* Lovely.' : '*HONK* Magnificent.', 'pleased');
      } else {
        api.fail(a.target === 'bell'
          ? '*DING* — Did Bossworth say "tap the bell"? He did NOT. You\'re out! Start again.'
          : 'Ah ah ah! Bossworth did not say that! You\'re out! Start again.');
      }
      return true;
    },

    solution: [{ tap: 'drum' }, { tap: 'horn' }, { tap: 'drum' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
