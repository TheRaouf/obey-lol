/* Level 90 — Tracks in the Snow
 * Three trails of footprints cross each other in the snow. Bossworth says follow the big boot prints
 * (his own, from this morning). Trace them: the big boots end at the thin ice, the paws at a kennel,
 * the small boots at the ski lodge.
 * Solution: follow the small boot prints. Wrong: big boots (trap, thin ice), paw prints (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'tracks-in-the-snow',
    num: 90,
    title: 'Tracks in the Snow',
    objective: 'Follow a trail of footprints to the ski lodge.',
    intro: 'Lost in the snow? Follow the BIG boot prints. They\'re mine, from this morning. I walked straight to the cosy lodge and had cocoa. I think. My socks were oddly wet afterwards.',
    introMood: 'pleased',
    actions: ['tap', 'trace'],
    par: 1,
    hints: [
      'The trails cross over each other. Trace each one from start to finish with your eye.',
      'The big boot prints end somewhere icy. Which trail actually reaches the lodge?',
      'Follow the small boot prints: they start on the right and end at the lodge on the left.'
    ],
    wrong: ['The big boot prints lead onto the thin ice (trap).', 'The paw prints lead to a dog kennel (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Cocoa at the lodge. Bossworth\'s socks are drying by the fire.',
    trick: 'The trails crossed to confuse you. Tracing them showed only the small boots reached the lodge.',

    init: function () { return {}; },

    view: function () {
      return [
        O('snow', 0, 0, 100, 100, { kind: 'static', art: 'c-snow', cls: 'backdrop' }),
        O('lodge', 5, 3, 24, 21, { kind: 'static', art: 'c-lodge', label: 'The ski lodge, top left' }),
        O('snowman', 29, 8, 11, 16, { kind: 'static', art: 'c-snowman', artOpts: { hat: 'top', scarf: 'red', nose: 'carrot' }, label: 'A snowman in a top hat, pointing nowhere helpful' }),
        O('kennel', 40, 5, 20, 19, { kind: 'static', art: 'c-kennel', label: 'A dog kennel, top middle' }),
        O('ice', 70, 6, 26, 16, { kind: 'static', art: 'c-icepond', label: 'A frozen pond with cracks, top right' }),
        O('icetag', 72, 20, 22, 6, { kind: 'static', text: 'THIN ICE!', label: 'Sign: thin ice', cls: 'tag-card' }),
        O('tracks', 4, 26, 92, 48, { kind: 'static', art: 'c-tracks', label: 'Three crossing trails. Big boot prints wind from the left start to the thin ice on the right. Paw prints wiggle from the middle start to the kennel. Small boot prints run from the right start to the lodge on the left.' }),
        O('big', 4, 76, 26, 13, { text: 'Big boots', label: 'Follow the big boot prints (start on the left)', cls: 'btn-card' }),
        O('paw', 37, 76, 26, 13, { text: 'Paw prints', label: 'Follow the paw prints (start in the middle)', cls: 'btn-card' }),
        O('small', 70, 76, 26, 13, { text: 'Small boots', label: 'Follow the small boot prints (start on the right)', cls: 'btn-card' }),
        O('legend', 4, 91, 92, 7, { kind: 'static', text: 'Each trail starts just above its button.', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'big':
          api.fail('You follow the big boots… round the bend… onto the pond. CRACK. Cold feet, wet socks, and suddenly Bossworth\'s morning makes sense. Back to the start.');
          return true;
        case 'paw':
          api.nope('paw');
          api.say('The paw prints lead to a kennel. A small dog looks up from its biscuit, deeply unimpressed. Not a lodge.', 'laughing');
          return true;
        case 'small':
          api.defy('tracks');
          api.complete({ line: 'The small boots go right to the lodge door! So MY prints went… onto the pond. That explains the socks. And the frog in my pocket.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'small' }],
    checks: [
      { name: 'Bossworth\'s big boots', steps: [{ tap: 'big' }], expect: 'fail' },
      { name: 'paw prints', steps: [{ tap: 'paw' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
