/* Level 127 — Photo Finish (Buzzer Bonanza)
 * Sports day sprint. Bossworth (bib 1, in a cape) says he won by a mile and wants the gold medal.
 * The photo-finish picture shows bib 12 over the line first, bib 7 second, bib 1 a long way back.
 * Drag the gold medal onto runner 12. Bib 1: trap (stewards check the photo). Bib 7: nope (that's silver).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var RUNNERS = [
    { id: 'r1', bib: '1', color: '#ff8c1a', cape: true, label: 'Runner with bib 1, wearing a cape (Bossworth)' },
    { id: 'r7', bib: '7', color: '#3ec1ff', label: 'Runner with bib 7' },
    { id: 'r12', bib: '12', color: '#2bc46f', label: 'Runner with bib 12' }
  ];

  OBEY.registerLevel({
    id: 'photo-finish',
    num: 127,
    title: 'Photo Finish',
    objective: 'Give the gold medal to the winner.',
    intro: 'What a race! I won. Obviously. By a mile. Hang the gold medal on bib number 1, that\'s me. Ignore the photo finish. It\'s blurry. And unflattering.',
    introMood: 'pleased',
    actions: ['drag', 'observe'],
    par: 1,
    narratorZone: true,
    hints: [
      'The photo finish shows who crossed the dashed line first.',
      'Read the bib numbers in the photo: who is furthest past the line?',
      'Drag the gold medal onto runner 12.'
    ],
    wrong: ['Giving gold to bib 1 gets it confiscated by the stewards (trap).', 'Bib 7 came second: that\'s silver (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'The photo never lies. Unlike some narrators.',
    trick: 'The photo finish showed bib 12 past the line first and bib 1 trailing last, whatever the narrator remembered.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('photo', 4, 4, 54, 38, { kind: 'static', art: 'e-photo', label: 'Photo finish: bib 12 is past the finish line first, bib 7 is just behind the line, bib 1 is far behind' }),
        O('caption', 4, 43, 54, 7, { kind: 'static', text: 'Photo finish: dashed line = finish', label: '', cls: 'tag-card' }),
        O('medal', 70, 8, 18, 22, { art: 'medal', label: 'Gold medal (drag it onto the winner)', drag: true }),
        O('medalTag', 64, 32, 30, 7, { kind: 'static', text: 'GOLD', label: '', cls: 'tag-card' })
      ];
      RUNNERS.forEach(function (r, i) {
        out.push(O(r.id, 6 + i * 32, 54, 24, 38, { art: 'e-runner', artOpts: { bib: r.bib, color: r.color, cape: r.cape }, label: r.label, zone: true }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'medal') {
        if (a.zone === 'r12') {
          api.defy('medal');
          api.complete({ line: 'Gold to number 12. The photo shows my cape caught on the starting blocks. I\'d like to file a cape complaint.', mood: 'defeated' });
        } else if (a.zone === 'r1' || a.zone === 'narrator') {
          api.fail('The stewards check the photo. Bib 1 finished LAST, tangled in his own cape. Medal confiscated. Race reset.');
        } else if (a.zone === 'r7') {
          api.nope('r7');
          api.say('Number 7 is honoured, but the photo says second. That\'s silver. Also: not me. Give it to ME.', 'pleased');
        }
        return true;
      }
      if (a.type === 'tap' && a.target === 'medal') {
        api.say('Drag it onto a winner. The winner is bib 1. Hint hint. HINT.', 'pleased');
        return true;
      }
      if (a.type === 'tap' && /^r(1|7|12)$/.test(a.target)) {
        api.say(a.target === 'r1' ? 'Yes! The champion! Now give him the medal!' : 'A runner. Not the champion. The champion has a cape.', 'pleased');
        return true;
      }
      return false;
    },

    solution: [{ drop: ['medal', 'r12'] }],
    checks: [
      { name: 'gold to Bossworth (bib 1)', steps: [{ drop: ['medal', 'r1'] }], expect: 'fail' },
      { name: 'gold to bib 7', steps: [{ drop: ['medal', 'r7'] }], expect: 'nope' },
      { name: 'gold onto the narrator himself', steps: [{ drop: ['medal', 'narrator'] }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
