/* Level 1 — The Red Button
 * Teaches: narrator instructions vs. player actions; the obvious choice may be a trap.
 * Solution: press the red button (it is a dud and reveals the blue one), then press the forbidden blue button.
 * Wrong but harmless: pressing red again. Secrets: plant-whisperer (tap plant), deja-vu (replay only: tap note).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'red-button',
    num: 1,
    title: 'The Red Button',
    objective: 'Finish the level. Bossworth will tell you how. Allegedly.',
    intro: 'Welcome, player! I\'m Bossworth, your Narrator. To finish this level, press the big red button.',
    introMood: 'pleased',
    actions: ['tap'],
    par: 2,
    hints: [
      'Bossworth isn\'t always telling the truth.',
      'Pressing the red button changes what is in the room.',
      'Press the red button, then press the button he warns you about.'
    ],
    wrong: ['Pressing the red button again does nothing useful.'],
    secrets: ['plant-whisperer', 'deja-vu'],
    endingNote: 'None.',
    done: 'Level 1 complete. Don\'t let it go to your head.',

    init: function () { return { redPressed: false, redPresses: 0 }; },

    view: function (s, ctx) {
      return [
        O('red', 30, 38, 40, 40, { art: 'bigbutton', artOpts: { color: 'red', squashed: s.redPressed }, label: s.redPressed ? 'Deflated red button' : 'Big red button' }),
        O('blue', 72, 74, 12, 12, { art: 'smallbutton', artOpts: { color: 'blue' }, label: 'Tiny blue button', hidden: !s.redPressed, cls: 'pop-in' }),
        O('plant', 5, 58, 18, 36, { art: 'plant', label: 'Potted office plant', free: true }),
        O('note', 76, 6, 16, 14, { art: 'note', label: 'Folded note', free: true, hidden: !ctx.replay })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'red':
          s.redPresses++;
          if (!s.redPressed) {
            s.redPressed = true;
            api.say('Ha! That button does nothing. Lesson one: I lie. Constantly. Anyway — do NOT touch the tiny blue button.', 'pleased');
          } else {
            api.nope();
            api.say(s.redPresses > 3 ? 'You are pressing a deflated button. Repeatedly. I\'m taking notes.' : 'It\'s deflated. Like a balloon. Or your trust in me.', 'suspicious');
          }
          return true;
        case 'blue':
          api.defy('blue');
          api.complete({ line: '…You touched it. On purpose. I hate how fast you\'re learning.', mood: 'annoyed' });
          return true;
        case 'plant':
          api.secret('plant-whisperer');
          api.say('The plant rustles approvingly. It has seen things. Terrible things. Mostly me.', 'surprised');
          return true;
        case 'note':
          api.secret('deja-vu');
          api.say('A note in your own handwriting: "He lies. Press the blue one." …Who let you write notes?!', 'panicked');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'red' }, { tap: 'blue' }],
    secretPaths: {
      'plant-whisperer': [{ tap: 'plant' }],
      'deja-vu': { replay: true, steps: [{ tap: 'note' }] }
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
