/* Level 3 — Hands Off
 * Teaches: restraint; doing nothing can be a deliberate action.
 * Solution: touch nothing for 10 seconds while Bossworth begs you to press the button.
 * Wrong: pressing the button → soft fail and the countdown restarts.
 * Secret: personal-space (poke Bossworth during the countdown — it does not count as touching the puzzle).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var START = 10;
  var NAGS = {
    8: ['Why aren\'t you pressing it?! It\'s RIGHT THERE.', 'panicked'],
    6: ['Press it! I\'m begging you! Professionally!', 'panicked'],
    4: ['If you don\'t press it, something TERRIBLE will happen. Probably. Maybe.', 'panicked'],
    2: ['Please? Pretty please? With a button on top?', 'panicked']
  };

  OBEY.registerLevel({
    id: 'hands-off',
    num: 3,
    title: 'Hands Off',
    objective: 'Survive the countdown.',
    intro: 'QUICK! Press the button before the timer hits zero! PRESS IT! NOW!',
    introMood: 'panicked',
    actions: ['tap', 'wait'],
    par: 0,
    hints: [
      'Not every instruction is a request. Look at the sign.',
      'What happens if you do nothing at all?',
      'Don\'t touch the button. Just wait for the timer to reach zero.'
    ],
    wrong: ['Pressing the button fails the test of restraint and restarts the countdown.'],
    hardNote: 'On Hard the countdown is 15 seconds.',
    secrets: ['personal-space'],
    endingNote: 'None.',
    done: 'Doing nothing: officially a strategy.',

    init: function (ctx) { return { t: ctx && ctx.difficulty === 'hard' ? START + 5 : START }; },

    onStart: function (s, api) {
      api.every(1000, function () {
        s.t = Math.max(0, s.t - 1);
        if (NAGS[s.t]) api.say(NAGS[s.t][0], NAGS[s.t][1]);
        if (s.t === 0) {
          api.defy('ignored-button');
          api.complete({ line: '…You didn\'t press it. You just… sat there. Is that ALLOWED?! Ugh. Level complete.', mood: 'defeated' });
        }
      });
    },

    view: function (s) {
      return [
        O('sign', 30, 4, 40, 12, { kind: 'static', text: 'HANDS OFF', label: 'Sign: HANDS OFF', cls: 'sign-card' }),
        O('timer', 38, 20, 24, 16, { kind: 'static', text: String(s.t), label: 'Countdown: ' + s.t + ' seconds', cls: 'timer-card' + (s.t <= 3 ? ' urgent' : ''), live: true }),
        O('button', 28, 42, 44, 44, { art: 'bigbutton', artOpts: { color: 'green', text: 'PRESS ME' }, label: 'Big green button labelled PRESS ME' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'button') {
        api.fail('TOO EAGER! That was a test of restraint, and you pressed it. Countdown restarted.', 'laughing');
        return true;
      }
      if (a.target === 'narrator') {
        api.secret('personal-space');
        api.say('Hey! "Hands off" includes ME! …The countdown is still going, by the way.', 'annoyed');
        return true;
      }
      return false;
    },

    solution: [{ wait: 10500 }],
    /** Walkthrough path for the current difficulty (Hard counts down from 15). */
    guide: function (ctx) { return [{ wait: ctx && ctx.difficulty === 'hard' ? 15500 : 10500 }]; },
    secretPaths: { 'personal-space': [{ tap: 'narrator' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
