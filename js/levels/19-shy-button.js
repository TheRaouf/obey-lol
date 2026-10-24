/* Level 19 — The Shy Button
 * The button runs away whenever you try to press it while you're "looking". Cover your eyes,
 * wait while it tiptoes back and falls asleep, then press it.
 * Wrong: chasing the button (nope; it hops to a new spot).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SPOTS = [[42, 38], [72, 18], [10, 22], [70, 62], [14, 62]];
  var SNEAK_MS = 2500;

  OBEY.registerLevel({
    id: 'shy-button',
    num: 19,
    title: 'The Shy Button',
    objective: 'Press the shy button.',
    intro: 'Press the button! Quick! Chase it! Faster! Never stop chasing! This is what life is!',
    introMood: 'pleased',
    actions: ['tap', 'wait', 'restraint'],
    par: 2,
    hints: [
      'Chasing never works on shy things.',
      'Shy things come out when nobody is looking.',
      'Tap "Cover your eyes", wait a few seconds, then press the sleeping button.'
    ],
    wrong: ['Tapping the button while it can see you makes it run away.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Patience beat panic. Bossworth is taking notes.',

    init: function () { return { spot: 0, eyes: false, back: false, runs: 0 }; },

    view: function (s) {
      var p = s.back ? [42, 46] : SPOTS[s.spot];
      return [
        O('shy', p[0], p[1], 16, 16, { art: 'shybutton', artOpts: { asleep: s.back }, label: s.back ? 'Shy button, fast asleep' : 'Shy button (it is watching you)', hidden: s.eyes && !s.back }),
        O('peek', 8, 34, 84, 14, { kind: 'static', text: '(peeking through your fingers) …something is tiptoeing back…', label: 'Peeking through your fingers: something is tiptoeing back', cls: 'speech-card', hidden: !s.eyes || s.back }),
        O('eyes', 26, 84, 48, 12, { text: s.eyes ? 'Eyes covered' : 'Cover your eyes', label: 'Cover your eyes', cls: 'btn-card', disabled: s.eyes })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'shy') {
        if (s.back) {
          api.complete({ line: '*click* You pressed it while it SLEPT. That\'s… honestly very effective. Slightly villainous.', mood: 'surprised' });
          return true;
        }
        s.spot = (s.spot + 1) % SPOTS.length;
        s.runs++;
        api.nope('shy');
        api.say(['It ran! Chase it! CHASE IT!', 'Faster! It\'s getting away!', 'Ha! You\'ll never catch it like that! (Keep trying.)'][s.runs % 3], 'laughing');
        return true;
      }
      if (a.target === 'eyes') {
        s.eyes = true;
        api.defy('eyes');
        api.say('You COVERED YOUR EYES? Who covers their eyes during a chase?! …Wait. Is it… coming back?', 'surprised');
        api.after(SNEAK_MS, function () {
          s.back = true;
          api.say('It tiptoed back and fell asleep. Don\'t you DARE press a sleeping button.', 'panicked');
        });
        return true;
      }
      return false;
    },

    solution: [{ tap: 'eyes' }, { wait: 2700 }, { tap: 'shy' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
