/* Level 138 — Last Croissant (Deli Dilemma)
 * One croissant left on the counter, and a lady with an umbrella has her eye on it. Bossworth: "Grab
 * it! Nobody's baking more." The oven window shows a whole tray baking. Ring for the baker: a fresh
 * tray comes out (the lady takes the last one, happily), then take one from the tray.
 * Grabbing the last one: trap. Hiding it: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'last-croissant',
    num: 138,
    title: 'Last Croissant',
    objective: 'Get Bossworth a croissant without a scuffle.',
    intro: 'The LAST croissant! That lady is eyeing it. Grab it! Elbows out! Nobody is baking more. The baker went home in 1998. I checked.',
    introMood: 'panicked',
    actions: ['tap', 'observe'],
    par: 2,
    hints: [
      'Is it really the last one? Look around the bakery.',
      'Look through the oven window. Someone is definitely still baking.',
      'Ring the bell for the baker, then take a croissant from the fresh tray.'
    ],
    wrong: ['Grabbing the last croissant ends in an umbrella duel (trap).', 'Hiding it behind the bread fools nobody (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A warm croissant, and nobody got umbrella\'d.',
    trick: 'The oven window showed a whole tray baking, so ringing for the baker beat fighting over the "last" croissant.',

    init: function () { return { fresh: false }; },

    view: function (s) {
      return [
        O('sign', 4, 3, 44, 10, { kind: 'static', text: 'BAKERY', label: 'Sign: bakery', cls: 'sign-card' }),
        O('bellTag', 50, 3, 46, 10, { kind: 'static', text: 'Ring for the baker', label: 'Sign: ring the bell for the baker', cls: 'tag-card' }),
        O('oven', 58, 36, 38, 38, { kind: 'static', art: 'f-oven', artOpts: { full: !s.fresh }, label: s.fresh ? 'Bakery oven, now empty' : 'Bakery oven. Through its window: a whole tray of croissants baking.' }),
        O('lady', 4, 59, 10, 15, { kind: 'static', art: 'f-shopper', artOpts: { color: '#9b5de5', carry: 'basket' }, label: s.fresh ? 'A lady, happily munching the last croissant' : 'A lady with an umbrella, eyeing the last croissant' }),
        O('case', 15, 60, 40, 14.7, { kind: 'static', art: 'f-glasscase', label: '' }),
        O('last', 25, 49.5, 18, 11.3, { art: 'f-croissant', label: 'The last croissant on the counter', hidden: s.fresh }),
        O('tray', 17, 49.5, 36, 12, { art: 'f-tray', label: 'A fresh tray of warm croissants (take one)', hidden: !s.fresh }),
        O('hide', 4, 84, 44, 12, { text: 'Hide it behind the bread', label: 'Hide the last croissant behind the bread', cls: 'btn-card accent' }),
        O('bell', 52, 84, 44, 12, { text: 'Ring the bell', label: 'Ring the bell for the baker', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'last':
          api.fail('You lunge. So does she. Her umbrella hooks the croissant first. "Manners, young one." Bossworth applauds her. Traitor. Back to the start.');
          return true;
        case 'hide':
          api.nope('hide');
          api.say('She watched you do it. She is now hiding it back. This could go on for hours. I\'d watch that.', 'pleased');
          return true;
        case 'bell':
          if (s.fresh) {
            api.nope('bell');
            api.say('Ding again? The baker is right here. She\'s giving you a look. It\'s a floury look.', 'annoyed');
          } else {
            s.fresh = true;
            api.say('DING. Out comes the baker… with a whole TRAY. The lady takes the last one and smiles at you. Where did all these come from? Ovens? Since when?', 'surprised');
          }
          return true;
        case 'tray':
          api.defy('bell');
          api.complete({ line: 'A warm one. Warmer than the last one. Fine. Ringing a bell beats an umbrella duel. I still say I\'d have won.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'bell' }, { tap: 'tray' }],
    checks: [
      { name: 'Bossworth\'s grab', steps: [{ tap: 'last' }], expect: 'fail' },
      { name: 'hiding it', steps: [{ tap: 'hide' }], expect: 'nope' },
      { name: 'ringing twice', steps: [{ tap: 'bell' }, { tap: 'bell' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
