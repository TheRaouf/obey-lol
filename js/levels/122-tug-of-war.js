/* Level 122 — Tug of War (Buzzer Bonanza)
 * Sports day. You versus nine strongmen. Bossworth: "PULL! Never let go!"
 * Referee's board: dragged over the centre line = you lose; land in the mud = you lose.
 * The mud is right behind Team Bossworth. Let go and they fall into it.
 * First PULL: you slide a step (nope). Second PULL: dragged over the line (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'tug-of-war',
    num: 122,
    title: 'Tug of War',
    objective: 'Win the tug of war.',
    intro: 'Sports day! Tug of war: you versus nine strongmen. PULL with all your might! And never, EVER let go. Letting go is for quitters. And geniuses.',
    introMood: 'pleased',
    actions: ['tap', 'choice'],
    par: 1,
    hints: [
      'You can\'t out-pull nine strongmen. Read the referee\'s board.',
      'Look at what is right behind Team Bossworth.',
      'Let go of the rope: they tumble backwards into their own mud.'
    ],
    wrong: ['Pulling once only slides you towards the line (nope).', 'Pulling again drags you over the centre line (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Nine strongmen, one mud bath, zero effort.',
    trick: 'With nine strongmen leaning back over a mud pit, the strongest move was to stop pulling.',

    init: function () { return { slid: 0, let: false }; },

    view: function (s) {
      var you = 6 + s.slid * 8;
      var out = [
        O('rules', 2, 1, 60, 29, { kind: 'static', text: 'REFEREE\'S RULES\n1. Dragged over the centre line? You lose.\n2. Land in the mud? You lose.', label: 'Referee rules: dragged over the centre line, you lose. Land in the mud, you lose.', cls: 'book-card' }),
        O('score', 63, 1, 34, 27, { kind: 'static', text: 'Team You: 1\nTeam Bossworth: 9 strongmen', label: 'Team You: one. Team Bossworth: nine strongmen.', cls: 'plaque-card' }),
        O('line', 41, 40, 2, 34, { kind: 'static', label: 'Centre line', cls: 'keypad-bg' }),
        O('rope', you + 8, 54, 60 - s.slid * 8, 5, { kind: 'static', art: 'e-rope', label: '' }),
        O('you', you, 44, 12, 22, { kind: 'static', art: 'hero', label: 'You, holding the rope' })
      ];
      for (var i = 0; i < 3; i++) {
        out.push(O('strong' + i, 50 + i * 9, 38, 14, 30, { kind: 'static', art: 'e-strongman', artOpts: { color: ['#ffb347', '#ff8c1a', '#e0a96d'][i] }, label: i === 0 ? 'Team Bossworth: nine strongmen leaning back' : '' }));
      }
      out.push(O('x3', 46, 30.5, 42, 8.5, { kind: 'static', text: '+6 more strongmen', label: '', cls: 'tag-card' }));
      out.push(O('mud', 80, 56, 19, 14, { kind: 'static', art: 'e-mud', label: 'A mud pit right behind Team Bossworth' }));
      out.push(O('mudTag', 81, 71, 17, 6, { kind: 'static', text: 'MUD', label: '', cls: 'tag-card' }));
      out.push(O('pull', 6, 82, 40, 13, { text: 'PULL!', label: 'Pull the rope', cls: 'btn-card accent big' }));
      out.push(O('letgo', 54, 82, 40, 13, { text: 'Let go', label: 'Let go of the rope', cls: 'btn-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'pull') {
        if (s.slid === 0) {
          s.slid = 1;
          api.nope('pull');
          api.say('You pull! They pull back. Nine times harder. You slide a step towards the line. PULL MORE!', 'pleased');
        } else {
          api.fail('You pull again. Nine strongmen pull again. You fly over the centre line like a kite. Rule 1. Reset!');
        }
        return true;
      }
      if (a.target === 'letgo') {
        api.defy('letgo');
        api.complete({ line: 'You LET GO?! Nine strongmen fly backwards into the mud. SPLOOSH. Rule 2. We… lost. To a quitter. A genius quitter.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ tap: 'letgo' }],
    alternatives: { 'one-pull-then-let-go': [{ tap: 'pull' }, { tap: 'letgo' }] },
    checks: [
      { name: 'pull once', steps: [{ tap: 'pull' }], expect: 'nope' },
      { name: 'pull twice', steps: [{ tap: 'pull' }, { tap: 'pull' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
