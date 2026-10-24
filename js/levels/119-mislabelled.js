/* Level 119 — Mislabelled (Magic Matinee)
 * Three magic boxes labelled KEY, RABBIT and KEY + RABBIT. A stagehand's note says every label is wrong.
 * Only the "KEY + RABBIT" box has a peephole: it shows just a rabbit. So that box is RABBIT,
 * the "KEY" box must be KEY + RABBIT, and the "RABBIT" box holds only the key. Open it.
 * Opening a box with a rabbit in it lets the rabbit escape (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BOXES = [
    { id: 'boxKey', label: 'KEY', holds: 'both', color: '#9b5de5' },
    { id: 'boxRabbit', label: 'RABBIT', holds: 'key', color: '#3ec1ff' },
    { id: 'boxBoth', label: 'KEY + RABBIT', holds: 'rabbit', color: '#ff8c1a' }
  ];

  OBEY.registerLevel({
    id: 'mislabelled',
    num: 119,
    title: 'Mislabelled Boxes',
    objective: 'Get the key without letting a rabbit escape.',
    intro: 'Three boxes, three labels, all written by me, so all perfectly accurate. The key is in the box marked KEY. Obviously. Open it and stop dawdling.',
    introMood: 'pleased',
    actions: ['tap', 'logic'],
    par: 1,
    hints: [
      'Read the stagehand\'s note. Then look through the only peephole.',
      'Every label is wrong. The KEY + RABBIT box can\'t hold both — the peephole shows what it really holds.',
      'The peephole shows only a rabbit, so the box marked KEY has both and the box marked RABBIT has just the key. Open RABBIT.'
    ],
    wrong: ['The box marked KEY holds the key AND a rabbit, which escapes with it (trap).', 'The box marked KEY + RABBIT holds only a rabbit (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Logic: the only magic that works every time.',
    trick: 'Every label was wrong, so one peek into the KEY + RABBIT box (just a rabbit) pinned down all three: the key was alone in the box marked RABBIT.',

    init: function () { return { peeked: false }; },

    view: function (s) {
      var out = [
        O('note', 4, 4, 56, 27, { kind: 'static', text: 'Stagehand\'s note: Bossworth wrote these labels. EVERY label is wrong. Each box holds a key, a rabbit, or both.', label: 'Stagehand note: every label is wrong. Each box holds a key, a rabbit, or both.', cls: 'book-card' }),
        O('peek', 62, 6, 34, 16, { text: s.peeked ? 'Peephole: one rabbit. Just a rabbit.' : 'Look through the peephole', label: s.peeked ? 'Peephole on the KEY + RABBIT box: you see only a rabbit' : 'Peephole on the KEY + RABBIT box (look through it)', cls: 'btn-card' + (s.peeked ? ' ghost' : ''), free: true })
      ];
      BOXES.forEach(function (b, i) {
        var x = 4 + i * 32;
        out.push(O(b.id, x, 36, 28, 30, { art: 'e-magicbox', artOpts: { color: b.color, peephole: b.id === 'boxBoth' }, label: 'Magic box labelled ' + b.label + (b.id === 'boxBoth' ? ' (it has the peephole)' : '') }));
        out.push(O(b.id + '-tag', x + 2, 68, 24, 9, { kind: 'static', text: b.label, label: '', cls: 'tag-card' }));
      });
      out.push(O('arrow', 70, 24, 22, 8, { kind: 'static', text: '↓ peephole', label: '', cls: 'subtle' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'peek') {
        s.peeked = true;
        api.say('A rabbit looks back at you. Through MY peephole. In MY box. That proves nothing. Open the KEY box.', 'suspicious');
        return true;
      }
      var box = BOXES.filter(function (b) { return b.id === a.target; })[0];
      if (!box) return false;
      if (box.holds === 'key') {
        api.defy('label');
        api.complete({ line: 'The key! In the RABBIT box! …Fine. My labels are "creatively accurate". That\'s a magic term.', mood: 'defeated' });
      } else if (box.holds === 'both') {
        api.fail('The key is in there… and so is a rabbit, who grabs it and hops off. All the boxes reset. Rabbits love keys.');
      } else {
        api.fail('Just a rabbit. It escapes in a puff of fluff. Boxes reset. I said open the KEY box.');
      }
      return true;
    },

    solution: [{ tap: 'peek' }, { tap: 'boxRabbit' }],
    checks: [
      { name: 'trust the KEY label', steps: [{ tap: 'boxKey' }], expect: 'fail' },
      { name: 'open the KEY + RABBIT box', steps: [{ tap: 'boxBoth' }], expect: 'fail' },
      { name: 'peeking alone', steps: [{ tap: 'peek' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
