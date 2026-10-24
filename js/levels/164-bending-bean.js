/* Level 164 — Bending Bean (Paintpot Pass)
 * Science fair: the bean plant must reach the prize rosette, up and to its right. It already leans
 * left, towards the lamp. The project poster: plants grow towards the light. Move the lamp to the right
 * and wait; the bean bends over to the rosette.
 * Wrong: shouting at the plant (nope); a whole bottle of Super-Gro shoots it straight up (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var STEP = 1500;

  OBEY.registerLevel({
    id: 'bending-bean',
    num: 164,
    title: 'Bending Bean',
    objective: 'Make the bean plant reach the prize rosette.',
    intro: 'Judging in two minutes! Make the bean reach the prize ribbon. Plants grow when you shout at them; tap it and yell GROW! Or tip the whole bottle of Super-Gro on it!',
    introMood: 'panicked',
    actions: ['drag', 'wait'],
    par: 1,
    hints: [
      'Which way is the bean leaning right now, and what is on that side?',
      'The poster says plants grow towards the light.',
      'Drag the lamp to the right-hand side, then wait a few seconds.'
    ],
    wrong: ['Shouting at the plant does nothing (nope).', 'Pouring on the Super-Gro is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'The bean leaned, the bean reached, the bean won.',
    trick: 'Plants grow towards the light, as the poster said, so moving the lamp beside the rosette steered the bean to it.',

    init: function () { return { lamp: 'L', lean: -1, timer: null }; },

    view: function (s) {
      var right = s.lamp === 'R';
      return [
        O('poster', 4, 3, 50, 14, { kind: 'static', text: 'Our project: plants grow TOWARDS the light', label: 'Project poster: plants grow towards the light', cls: 'plaque-card' }),
        O('rosette', 56, 12, 12, 18, { kind: 'static', art: 'g-rosette', label: 'Prize rosette, pinned up to the right of the plant' }),
        O('table', 22, 70, 56, 12, { kind: 'static', art: 'table' }),
        O('spotL', 2, 28, 20, 66, { kind: 'zone', label: 'Floor to the left of the table', zone: true }),
        O('spotR', 78, 28, 20, 66, { kind: 'zone', label: 'Floor to the right of the table', zone: true }),
        O('bean', 36, 26, 28, 46, { art: 'g-bean', artOpts: { lean: s.lean }, label: 'Bean plant in a pot, leaning ' + (s.lean < 0 ? 'left' : s.lean > 0 ? 'right' : 'straight up') + (s.lean >= 2 ? ', touching the rosette' : ''), zone: true }),
        O('gro', 66, 57, 10, 14.5, { art: 'g-gro', label: 'Bottle of Super-Gro plant food (drag it)', drag: true }),
        O('lamp', right ? 80 : 4, 30, 16, 64, { art: 'lamp', artOpts: { on: true }, label: 'Lamp, switched on, on the ' + (right ? 'right' : 'left') + ' (drag it)', drag: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'lamp') {
        var side = a.zone === 'spotR' ? 'R' : a.zone === 'spotL' ? 'L' : null;
        if (!side || side === s.lamp) return true;
        s.lamp = side;
        if (s.timer) { api.cancel(s.timer); s.timer = null; }
        if (side === 'L') { s.lean = -1; api.say('Back on the left. The bean droops back towards it. Loyal little bean.', 'neutral'); return true; }
        api.defy('lamp');
        api.say('Moving the LAMP? Lamps aren\'t fertiliser! Shout at it! …Is it… turning?', 'suspicious');
        s.timer = api.every(STEP, function () {
          s.lean++;
          if (s.lean >= 2) {
            api.cancel(s.timer); s.timer = null;
            api.complete({ line: 'It leaned all the way over and touched the rosette. Because of a LAMP. The judges loved it. Nobody asked me about shouting.', mood: 'defeated' });
          } else api.say(s.lean === 0 ? 'Straight up now. It\'s thinking about it.' : 'Leaning right! Towards the light! Towards the PRIZE!', 'surprised');
        });
        return true;
      }
      if (a.type === 'drop' && a.target === 'gro') {
        if (a.zone === 'bean') api.fail('Glug glug. The bean shoots straight UP, through a ceiling tile, and waves at the art room. Very tall. Not sideways at all. New bean!');
        return true;
      }
      if (a.type === 'tap' && a.target === 'bean') {
        api.nope('bean');
        api.say('You yell "GROW!" at the bean. The bean does not grow. The judges look worried about you.', 'pleased');
        return true;
      }
      return false;
    },

    solution: [{ drop: ['lamp', 'spotR'] }, { wait: 4600 }],
    checks: [
      { name: 'shout at the bean', steps: [{ tap: 'bean' }], expect: 'nope' },
      { name: 'Super-Gro', steps: [{ drop: ['gro', 'bean'] }], expect: 'fail' },
      { name: 'lamp moved back', steps: [{ drop: ['lamp', 'spotR'] }, { wait: 1600 }, { drop: ['lamp', 'spotL'] }, { wait: 5000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
