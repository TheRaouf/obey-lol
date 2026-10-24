/* Level 119 — Talent Show (Curtain Call)
 * Pick an act. The rules board: under 10 seconds, no juggling, must include a hat.
 * Bossworth pushes the 45-second opera. Only the 9-second tap dance in a top hat passes every rule.
 * Opera / juggling: gonged (trap). Mime with no hat: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ACTS = [
    { id: 'actOpera', text: 'Opera, wearing a hat\n45 seconds' },
    { id: 'actJuggle', text: 'Juggling hats\n8 seconds' },
    { id: 'actMime', text: 'Silent mime\n5 seconds' },
    { id: 'actDance', text: 'Tap dance in a top hat\n9 seconds' }
  ];

  OBEY.registerLevel({
    id: 'talent-show',
    num: 119,
    title: 'Talent Show',
    objective: 'Get an act past the judges.',
    intro: 'Talent show! Perform the OPERA. Forty-five glorious seconds. The rules board is less "rules", more gentle suggestions written by cowards.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'choice'],
    par: 1,
    hints: [
      'Check each act against all three rules on the board.',
      'Too long, juggling, or hatless: each breaks a rule. Only one act breaks none.',
      'Choose the tap dance in a top hat: 9 seconds, no juggling, has a hat.'
    ],
    wrong: ['The opera is far too long: gonged (trap).', 'Juggling is banned: gonged (trap).', 'The mime has no hat (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three yeses and a slightly confused pigeon.',
    trick: 'Only one act passed all three rules on the board; Bossworth\'s favourite failed the very first one.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('rules', 4, 4, 56, 32, { kind: 'static', text: 'TALENT SHOW RULES\n1. Acts must last under 10 seconds.\n2. No juggling. (We remember 2019.)\n3. Every act must include a hat.', label: 'Rules: 1, under 10 seconds. 2, no juggling. 3, every act must include a hat.', cls: 'book-card' }),
        O('judges', 64, 4, 32, 32, { kind: 'static', text: 'JUDGES\nLady Hatworth\nMr Stopwatch\nA pigeon', label: 'Judges: Lady Hatworth, Mr Stopwatch, and a pigeon', cls: 'plaque-card' }),
        O('curtainL', 0, 40, 10, 56, { kind: 'static', art: 'e-curtain' }),
        O('curtainR', 90, 40, 10, 56, { kind: 'static', art: 'e-curtain', artOpts: { flip: true } }),
        O('pick', 14, 40, 72, 8, { kind: 'static', text: 'Choose your act:', label: '', cls: 'tag-card' })
      ];
      ACTS.forEach(function (a, i) {
        out.push(O(a.id, 14 + (i % 2) * 37, 51 + Math.floor(i / 2) * 22, 35, 18, { text: a.text, label: 'Act: ' + a.text.replace('\n', ', '), cls: 'btn-card' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'actOpera':
          api.fail('GONNNG! Mr Stopwatch stopped listening at second ten. You were on second eleven of forty-five. Next contestant: also you.');
          return true;
        case 'actJuggle':
          api.fail('GONNNG! Juggling. Lady Hatworth faints. The pigeon remembers 2019. Back to the wings!');
          return true;
        case 'actMime':
          api.nope('actMime');
          api.say('A lovely mime. The judges hold up rule 3. You mime putting on a hat. They are not fooled.', 'pleased');
          return true;
        case 'actDance':
          api.complete({ line: 'Nine seconds, a top hat, zero juggling. Three yeses. …My opera would have been ELEVEN yeses. Over forty-five seconds.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'actDance' }],
    checks: [
      { name: 'Bossworth\'s opera', steps: [{ tap: 'actOpera' }], expect: 'fail' },
      { name: 'juggling', steps: [{ tap: 'actJuggle' }], expect: 'fail' },
      { name: 'hatless mime', steps: [{ tap: 'actMime' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
