/* Level 199 — Lifebuoy Lob (Lighthouse Lookout)
 * Bossworth fell off the lighthouse steps. The current flows to the right (arrows, sign). He says throw
 * the ring right at his face. Drop it upstream (left of him) and the current carries it into his arms.
 * Wrong: at him (trap: bonk), downstream (nope: it floats away and a spare appears), poking him (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'lifebuoy-lob',
    num: 199,
    title: 'Lifebuoy Lob',
    objective: 'Get the lifebuoy to Bossworth.',
    intro: '*glub* I slipped off the lighthouse steps! Throw the ring RIGHT AT ME. Aim for my face! I am a superb catcher. *glub*',
    introMood: 'panicked',
    actions: ['drag', 'observe'],
    par: 1,
    hints: [
      'Look which way the water is moving.',
      'Whatever you throw will drift with the current, to the right.',
      'Drag the lifebuoy into the water just to the LEFT of Bossworth (upstream).'
    ],
    wrong: ['Throwing it at his head bonks him (trap).', 'Throwing it downstream lets it float away (nope).', 'Poking him does not help (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Rescued. Damp. Dignified. Two out of three.',
    trick: 'The current carries everything to the right, so a ring thrown upstream of him drifted straight into his arms.',

    init: function () { return { saved: false }; },

    view: function (s) {
      return [
        O('tip', 4, 4, 56, 18, { kind: 'static', text: 'LIFEGUARD TIP: the current carries anything you throw', label: 'Lifeguard tip: the current carries anything you throw', cls: 'honest-card' }),
        O('surface', 0, 46, 100, 10, { kind: 'static', art: 'i-surface', label: '' }),
        O('sea', 0, 54, 100, 46, { kind: 'static', art: 'i-sea', artOpts: { nobed: true } }),
        O('lhrock', 68, 46, 30, 10, { kind: 'static', art: 'i-rock', label: '' }),
        O('lh', 74, 4, 18, 46, { kind: 'static', art: 'i-lighthouse', label: 'The lighthouse' }),
        O('current', 30, 88, 66, 8, { kind: 'static', text: 'CURRENT ➜ ➜ ➜', label: 'The current flows to the right', cls: 'tag-card' }),
        O('jetty', 0, 46, 28, 30, { kind: 'static', art: 'i-pier', label: 'Jetty' }),
        O('up', 30, 60, 20, 22, { kind: 'zone', zone: true, label: 'Water to the left of Bossworth (upstream)' }),
        O('him', 52, 56, 24, 22, { art: 'i-swimmer', artOpts: { ring: s.saved }, label: 'Bossworth, bobbing in the sea', zone: true }),
        O('down', 78, 60, 18, 22, { kind: 'zone', zone: true, label: 'Water to the right of Bossworth (downstream)' }),
        O('ring', 6, 36, 18, 18, { art: 'i-lifering', label: 'Lifebuoy (drag it into the water)', drag: true, hidden: s.saved })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'him') {
        api.nope();
        api.say('Don\'t POKE me! Throw something! Preferably round and floaty!', 'panicked');
        return true;
      }
      if (a.type !== 'drop' || a.target !== 'ring') return false;
      if (a.zone === 'him') {
        api.fail('BONK! Right on the nose, as ordered. I see stars. And a crab. Throw it where the water will carry it to me!');
        return true;
      }
      if (a.zone === 'down') {
        api.nope();
        api.say('Splash! …and off it floats, away from me, towards France. Luckily the keeper has a spare.', 'panicked');
        return true;
      }
      if (a.zone === 'up') {
        s.saved = true;
        api.defy('face');
        api.complete({ line: 'You threw it NEXT to me and the current brought it right into my arms. Not at my face. I\'m almost disappointed.', mood: 'defeated' });
        return true;
      }
      api.say('The ring stays on the jetty. It is not a good swimmer either.', 'neutral');
      return true;
    },

    solution: [{ drop: ['ring', 'up'] }],
    checks: [
      { name: 'throwing it at him is a trap', steps: [{ drop: ['ring', 'him'] }], expect: 'fail' },
      { name: 'downstream is a nope', steps: [{ drop: ['ring', 'down'] }], expect: 'nope' },
      { name: 'poking him is a nope', steps: [{ tap: 'him' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
