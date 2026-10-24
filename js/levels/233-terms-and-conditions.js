/* Level 233 — Terms and Conditions
 * "Just click I AGREE." Reading the whole contract (Read more ×2) reveals Clause 9: the reader may
 * leave through the cat flap. Clicking I AGREE is a trap (you become Bossworth's intern).
 * Wrong: the cat flap before reading Clause 9 (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PAGES = [
    'TERMS OF OBEDIENCE (page 1 of 3)\n1. The reader agrees to obey.\n2. Obeying is fun.\n3. See clause 1.',
    'Page 2 of 3\n4. Bossworth is always right.\n5. If Bossworth is wrong, see clause 4.\n6–8. [boring legal noises]',
    'Page 3 of 3\n9. The reader may leave through the cat flap at any time.\n10. Nobody reads this far anyway.'
  ];

  OBEY.registerLevel({
    id: 'terms-and-conditions',
    num: 233,
    title: 'Terms and Conditions',
    objective: 'Get out of the contract.',
    intro: 'Before the finale, a little paperwork. Just click I AGREE. Nobody reads these. Nobody. Ever.',
    introMood: 'pleased',
    actions: ['read', 'tap'],
    par: 3,
    hints: [
      'Bossworth really doesn\'t want you to read it.',
      'There are three pages. The last clause matters.',
      'Press "Read more" twice, then use the cat flap.'
    ],
    wrong: ['Clicking I AGREE is a trap.', 'The cat flap only works once you have read Clause 9.'],
    secrets: [],
    endingNote: 'None.',
    trick: 'Reading the terms revealed Clause 9: the cat flap.',
    done: 'You read the fine print. Lawyers everywhere weep with joy.',

    init: function () { return { page: 0 }; },

    view: function (s) {
      return [
        O('contract', 4, 2, 92, 52, { kind: 'static', text: PAGES[s.page], label: 'Contract. ' + PAGES[s.page].replace(/\n/g, ' '), cls: 'book-card' }),
        O('more', 4, 58, 44, 12, { text: 'Read more ▾', label: 'Read the next page', cls: 'btn-card', disabled: s.page >= PAGES.length - 1 }),
        O('agree', 52, 58, 44, 12, { text: 'I AGREE', label: 'I agree', cls: 'btn-card accent' }),
        O('flap', 70, 76, 24, 20, { art: 'catflap', label: 'Cat flap in the wall' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'more':
          s.page = Math.min(PAGES.length - 1, s.page + 1);
          api.say(s.page === 2 ? 'Stop reading! Page three is… blank. Very blank. Totally blank.' : 'Why are you READING it? Click agree! Agreeing is fun! (Clause 2.)', 'panicked');
          return true;
        case 'agree':
          api.fail('Wonderful! You agreed to obey forever. You are now Bossworth\'s intern. Day one: fetch coffee. …Okay, let\'s pretend that didn\'t happen.');
          return true;
        case 'flap':
          if (s.page < 2) { api.nope(); api.say('It\'s a cat flap. You\'re not a cat. Are you allowed? Nobody knows. (Page three knows.)', 'pleased'); }
          else { api.defy('contract'); api.complete({ line: 'Clause 9. CLAUSE NINE. I put that in as a joke! Who reads to clause nine?!', mood: 'defeated' }); }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'more' }, { tap: 'more' }, { tap: 'flap' }],
    checks: [
      { name: 'click I AGREE', steps: [{ tap: 'agree' }], expect: 'fail' },
      { name: 'the cat flap before Clause 9', steps: [{ tap: 'flap' }], expect: 'nope' },
      { name: 'the cat flap after one page', steps: [{ tap: 'more' }, { tap: 'flap' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
