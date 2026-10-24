/* Level 7 — The Fake Tutorial
 * The "tutorial" is the puzzle: NEXT loops forever. The tip box can be closed with ×, revealing the real exit.
 * Accessibility: an always-visible "Honest help" button explains the real situation in plain words
 * (it is free and does not affect stars, so players who need genuine instructions are never stuck).
 * Wrong: pressing NEXT forever. Secret: tutorial-dropout (finish without pressing NEXT even once).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TIPS = [
    'Tip 1: Press NEXT to continue.',
    'Tip 2: To jump, press NEXT.',
    'Tip 3: To win, press NEXT.',
    'Tip 4: NEXT is your best friend.',
    'Tip 5: Have you tried pressing NEXT?',
    'Tip 6: Almost done! (We are not almost done.)',
    'Tip 7: Tutorials are skippable in real games. Not this one. Press NEXT.',
    'Tip 8: Press NEXT to return to Tip 1.'
  ];

  OBEY.registerLevel({
    id: 'fake-tutorial',
    num: 7,
    title: 'The Fake Tutorial',
    objective: 'Complete the tutorial. Or… finish the level some other way.',
    intro: 'Welcome to the official Tutorial! It will teach you everything. Just keep pressing NEXT. Forever.',
    introMood: 'pleased',
    actions: ['tap', 'read'],
    par: 2,
    hints: [
      'Tutorials can be closed… can\'t they?',
      'The tip box has more than one button on it.',
      'Close the tip box with × and use what is behind it.'
    ],
    wrong: ['NEXT cycles through tips forever.'],
    secrets: ['tutorial-dropout'],
    endingNote: 'None.',
    done: 'Tutorial skipped. Lesson learned anyway.',

    init: function () { return { tip: 0, pressedNext: false, closed: false, honest: false }; },

    view: function (s) {
      return [
        O('exit', 34, 24, 32, 52, { art: 'door', artOpts: { sign: 'REAL EXIT' }, label: 'Real exit door', hidden: !s.closed }),
        O('box', 10, 14, 80, 62, { kind: 'static', text: TIPS[s.tip % TIPS.length], label: 'Tutorial tip: ' + TIPS[s.tip % TIPS.length], cls: 'tutorial-card', hidden: s.closed, live: true }),
        O('next', 56, 60, 28, 12, { text: 'NEXT ▸', label: 'NEXT', hidden: s.closed, cls: 'btn-card accent' }),
        O('close', 80, 15, 9, 9, { text: '×', label: 'Close tutorial box', hidden: s.closed, cls: 'btn-card small' }),
        O('honest', 6, 82, 50, 12, { text: 'Honest help (really)', label: 'Honest help', free: true, cls: 'btn-card ghost', hidden: s.honest }),
        O('honestnote', 4, 80, 92, 18, { kind: 'static', text: 'Honest note: NEXT loops forever. Close the tip box with × (top-right of the box) to find the real exit behind it.', label: 'Honest note: NEXT loops forever. Close the tip box with the × button to find the real exit behind it.', hidden: !s.honest, cls: 'honest-card', live: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'next':
          s.pressedNext = true;
          s.tip++;
          api.say(['Great job! Keep going!', 'You\'re a natural at pressing things!', 'So much learning is happening right now.', 'Next! Next! Next!'][s.tip % 4], 'pleased');
          return true;
        case 'close':
          s.closed = true;
          api.defy('close-tutorial');
          api.say('NO! You closed the tutorial! Now you\'ll never learn how to… oh. There\'s a door back there. I forgot about the door.', 'panicked');
          return true;
        case 'honest':
          s.honest = true;
          api.say('Who added an honest help button?! Legal made me do it. Ugh.', 'annoyed');
          return true;
        case 'exit':
          if (!s.pressedNext) api.secret('tutorial-dropout');
          api.complete({ line: s.pressedNext ? 'You skipped my tutorial. I worked on it for MINUTES.' : 'You didn\'t press NEXT even ONCE? Not even out of politeness?', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'close' }, { tap: 'exit' }],
    alternatives: { viaNext: [{ tap: 'next' }, { tap: 'next' }, { tap: 'close' }, { tap: 'exit' }] },
    secretPaths: { 'tutorial-dropout': [{ tap: 'close' }, { tap: 'exit' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
