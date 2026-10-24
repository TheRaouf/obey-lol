/* Level 109 — Falling for It
 * A vacuum chamber holds a bowling ball and a feather. The lab report asks which lands first.
 * Bossworth: "heavy falls faster, answer the ball, no need to TEST anything".
 * Press RELEASE to run the experiment: in a vacuum they land together. Answer "Same time".
 * Wrong: ball (trap), feather (trap), tapping the sealed chamber (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ANSWERS = [
    { id: 'ans-ball', text: 'The bowling ball' },
    { id: 'ans-feather', text: 'The feather' },
    { id: 'ans-same', text: 'Same time' }
  ];

  OBEY.registerLevel({
    id: 'falling-for-it',
    num: 109,
    title: 'Falling for It',
    objective: 'Fill in the lab report correctly.',
    intro: 'Heavy things fall faster. Everybody knows that. Answer "the bowling ball" and let\'s move on. No need to actually TEST anything. Testing is for people who are wrong.',
    introMood: 'pleased',
    actions: ['tap', 'experiment', 'choice'],
    par: 2,
    hints: [
      'You have a working experiment right in front of you. Why guess?',
      'Press RELEASE and watch both objects. Note what the chamber is full of (or empty of).',
      'Release them, see them land together in the vacuum, then answer "Same time".'
    ],
    wrong: ['Answering the bowling ball is a trap.', 'Answering the feather is a trap.', 'The sealed chamber cannot be opened (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Tested, observed, recorded. Galileo would be proud. Bossworth is not.',
    trick: 'With no air to slow the feather, gravity pulls everything down at the same rate, and the experiment showed it.',

    init: function () { return { dropped: false }; },

    view: function (s) {
      var objs = [
        O('chamber', 4, 4, 44, 50, { art: 'd-chamber', artOpts: { dropped: s.dropped }, label: s.dropped ? 'Vacuum chamber: the ball and the feather are both lying on the bottom' : 'Vacuum chamber: a bowling ball and a feather held at the top' }),
        O('release', 8, 58, 36, 13, { text: s.dropped ? 'Released!' : 'RELEASE BOTH', label: s.dropped ? 'Both released' : 'Release the ball and the feather together', cls: 'btn-card big' + (s.dropped ? ' ghost' : ' accent') }),
        O('gauge', 4, 76, 44, 10, { kind: 'static', text: 'Chamber air: NONE (vacuum)', label: 'Chamber air: none, it is a vacuum', cls: 'panel-card ok' }),
        O('result', 4, 88, 44, 10, { kind: 'static', text: s.dropped ? 'Landed: together!' : 'Landed: not tested yet', label: s.dropped ? 'Result: both landed together' : 'Result: not tested yet', cls: 'tag-card' }),
        O('report', 54, 4, 42, 30, { kind: 'static', text: 'LAB REPORT\nIn this vacuum chamber, which lands first?', label: 'Lab report: in this vacuum chamber, which lands first?', cls: 'book-card' })
      ];
      ANSWERS.forEach(function (ans, i) {
        objs.push(O(ans.id, 54, 40 + i * 16, 42, 13, { text: ans.text, label: 'Answer: ' + ans.text, cls: 'btn-card' + (ans.id === 'ans-ball' ? ' accent' : '') }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'release':
          if (s.dropped) { api.say('Already dropped. They\'re still lying there. Together. Smugly.', 'annoyed'); return true; }
          s.dropped = true;
          api.say('Whoosh… thud. They landed TOGETHER? The camera must be faulty. Or the feather cheated.', 'surprised');
          return true;
        case 'chamber':
          api.nope();
          api.say('It\'s sealed. Open it and you let the air in, and then the feather WOULD lose. Which I\'d prefer.', 'suspicious');
          return true;
        case 'ans-ball':
          api.fail(s.dropped ? 'You SAW them land together and still wrote "ball"? Loyal. Wrong, but loyal. Report shredded.' : 'Report submitted: "bowling ball". The peer reviewers laughed so hard the chamber fogged up. Try again.');
          return true;
        case 'ans-feather':
          api.fail('The FEATHER? Even I didn\'t say that. The report is returned with a single drawing of a confused bird. Try again.');
          return true;
        case 'ans-same':
          api.defy('no-test');
          api.complete({ line: s.dropped ? 'Same time. You tested it. You LOOKED. With your EYES. Science is so pushy.' : 'Same time. Without even testing. Fine. You\'re right, which is somehow worse.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'release' }, { tap: 'ans-same' }],
    alternatives: { 'already-knew': [{ tap: 'ans-same' }] },
    checks: [
      { name: 'the ball is a trap', steps: [{ tap: 'ans-ball' }], expect: 'fail' },
      { name: 'the feather is a trap', steps: [{ tap: 'release' }, { tap: 'ans-feather' }], expect: 'fail' },
      { name: 'opening the chamber is a nope', steps: [{ tap: 'chamber' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
