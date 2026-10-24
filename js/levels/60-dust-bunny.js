/* Level 60 — Dust Bunny
 * "Hoover up that dust bunny under the sofa." It has ears, whiskers and a twitching nose, and there's a
 * MISSING poster for a grey fluffy rabbit who loves carrots. Lure the bunny home (carrot → hutch), then
 * press and hold the vacuum to clean up the real dust it was sitting on.
 * Wrong: vacuuming while the bunny is there (trap); feeding the carrot to the bunny where it sits (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SUCK_MS = 1500;

  OBEY.registerLevel({
    id: 'dust-bunny',
    num: 60,
    title: 'Dust Bunny',
    objective: 'Vacuum up the dust. Only the dust.',
    intro: 'See that big grey dust bunny under the sofa? Hold the vacuum button and hoover it up. Ignore the twitching. Dust twitches. Science.',
    introMood: 'pleased',
    actions: ['drag', 'hold', 'observe'],
    par: 2,
    hints: [
      'Read the poster on the wall, then look very closely at the "dust bunny".',
      'That\'s Mr Flopsy, and his hutch is empty. Rabbits follow carrots.',
      'Drag the carrot into the hutch, then press and hold the vacuum to clean the real dust.'
    ],
    wrong: ['Vacuuming while the bunny is under the sofa is a trap.', 'Giving the carrot to the bunny where it sits doesn\'t move it (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One rabbit rehomed, one floor de-fluffed, one narrator corrected.',
    trick: 'The "dust bunny" was a real bunny; a carrot sent it home before you vacuumed.',

    init: function () { return { home: false, sucking: false, timer: null }; },

    view: function (s) {
      return [
        O('carrot', 4, 4, 14, 20, { art: 'b-carrot', drag: true, hidden: s.home, label: 'A carrot (drag it)' }),
        O('poster', 22, 4, 44, 22, { kind: 'static', text: 'MISSING: Mr Flopsy.\nGrey. Fluffy. Twitchy nose.\nLoves carrots.', label: 'Poster: missing, Mr Flopsy. Grey, fluffy, twitchy nose. Loves carrots.', cls: 'honest-card' }),
        O('hutch', 70, 4, 26, 28, { art: 'b-hutch', artOpts: { bunny: s.home }, zone: true, free: true, label: s.home ? 'Rabbit hutch, Mr Flopsy inside munching' : 'Rabbit hutch, door open, empty' }),
        O('sofa', 4, 32, 60, 30, { kind: 'static', art: 'b-sofa', label: 'Sofa' }),
        O('bunny', 16, 62, 30, 22, { art: 'b-bunny', artOpts: { twitch: true }, zone: true, free: true, hidden: s.home, label: 'Grey fluffy "dust bunny" with long ears and a twitching nose' }),
        O('dust', 18, 70, 26, 14, { kind: 'static', art: 'b-dust', hidden: !s.home, label: 'A real pile of dust' }),
        O('vacuum', 66, 52, 30, 40, { art: 'b-vacuum', artOpts: { on: s.sucking }, hold: true, label: 'Vacuum cleaner (press and hold to vacuum under the sofa)' }),
        O('tip', 4, 88, 56, 9, { kind: 'static', text: 'Vacuum: hold to hoover.', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'carrot') {
        if (a.zone === 'hutch') {
          s.home = true;
          api.say('The dust bunny just… hopped into the hutch. Dust doesn\'t hop. Since when does dust HOP?', 'surprised');
        } else if (a.zone === 'bunny') {
          api.nope();
          api.say('It sniffs the carrot, then looks pointedly at the empty hutch. Even the dust has standards.', 'suspicious');
        }
        return true;
      }
      if (a.type === 'tap' && a.target === 'bunny') { api.say('Don\'t poke the dust. It twitches. That\'s normal for dust. Probably.', 'suspicious'); return true; }
      if (a.type === 'tap' && a.target === 'hutch') { api.say('An empty hutch. Unrelated. Completely. Stop connecting things.', 'annoyed'); return true; }
      if (a.target !== 'vacuum') return false;
      if (a.type === 'tap') { api.say('Press and HOLD. Vacuums need commitment, like toast.', 'neutral'); return true; }
      if (a.type === 'holdstart') {
        s.sucking = true;
        s.timer = api.after(SUCK_MS, function () {
          s.timer = null; s.sucking = false;
          if (!s.home) {
            api.fail('VWOOMPH! The "dust" goes up the tube, kicks its way out of the bag and thumps you on the shin. Ouch. Let\'s try that again.');
          } else {
            api.defy('bunny');
            api.complete({ line: 'Clean floor. Happy rabbit. I would like it on record that the rabbit was very convincingly dusty.', mood: 'defeated' });
          }
        });
        return true;
      }
      if (a.type === 'holdend') {
        s.sucking = false;
        if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('A little vroom. Hold it longer if you mean it.', 'neutral'); }
        return true;
      }
      return false;
    },

    solution: [{ drop: ['carrot', 'hutch'] }, { hold: ['vacuum', 1800] }],
    checks: [
      { name: 'vacuum the bunny', steps: [{ hold: ['vacuum', 1800] }], expect: 'fail' },
      { name: 'carrot to the bunny', steps: [{ drop: ['carrot', 'bunny'] }], expect: 'nope' },
      { name: 'short vroom', steps: [{ hold: ['vacuum', 500] }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
