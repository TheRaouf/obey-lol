/* Level 124 — Jellybean Jar (Buzzer Bonanza)
 * Guess the beans. Bossworth: "about a THOUSAND". The jar holds nine jellybeans and Reginald,
 * a small frog; the jar's label says the frog is not a bean. Answer 9.
 * 10 (counting Reginald) and 1000: traps. 8: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var GUESSES = ['8', '9', '10', '1000'];

  OBEY.registerLevel({
    id: 'jellybean-jar',
    num: 124,
    title: 'Jellybean Jar',
    objective: 'Guess exactly how many jellybeans are in the jar.',
    intro: 'Guess the beans, win the prize! A hint from your generous host: it\'s about a THOUSAND. Big numbers win big prizes. Say 1000. Don\'t count. Counting is for accountants.',
    introMood: 'pleased',
    actions: ['tap', 'count'],
    par: 1,
    hints: [
      'Ignore the host. Count what is actually in the jar.',
      'One of the shapes has eyes. Read the jar\'s label.',
      'There are nine beans plus Reginald the frog. Answer 9.'
    ],
    wrong: ['1000 is wildly wrong (trap).', '10 counts Reginald the frog (trap).', '8 is close but short (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Nine beans. One frog. Zero thousand.',
    trick: 'Counting beats guessing: nine beans, and the label said the frog with eyes doesn\'t count.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('jar', 26, 4, 48, 52, { kind: 'static', art: 'e-jar', label: 'Glass jar with nine jellybeans and one small frog with eyes' }),
        O('label', 4, 58, 92, 9, { kind: 'static', text: 'Label: jellybeans, plus Reginald (a frog). Reginald is not a bean.', label: 'Jar label: jellybeans, plus Reginald. Reginald is a frog, not a bean.', cls: 'tag-card' }),
        O('ask', 4, 69, 92, 7, { kind: 'static', text: 'How many jellybeans?', label: '', cls: 'subtle' })
      ];
      GUESSES.forEach(function (g, i) {
        out.push(O('g' + g, 4 + i * 24, 79, 20, 15, { text: g, label: 'Guess ' + g, cls: 'btn-card big' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'g9':
          api.complete({ line: 'Nine?! Exactly nine. You COUNTED. In front of everyone. The prize is a jar of nine jellybeans. And Reginald. Reginald stays.', mood: 'defeated' });
          return true;
        case 'g10':
          api.fail('Ten? You counted Reginald! Reginald is offended. Reginald is a FROG. The jar resets, and so does Reginald\'s dignity.');
          return true;
        case 'g1000':
          api.fail('A THOUSAND! Wonderful! …The jar holds nine. I may have been thinking of my fan mail. Try again!', 'laughing');
          return true;
        case 'g8':
          api.nope('g8');
          api.say('Eight? So close. And yet so eight. Count again, or say a thousand. A thousand is more fun.', 'pleased');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'g9' }],
    checks: [
      { name: 'Bossworth\'s thousand', steps: [{ tap: 'g1000' }], expect: 'fail' },
      { name: 'counting the frog', steps: [{ tap: 'g10' }], expect: 'fail' },
      { name: 'one short', steps: [{ tap: 'g8' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
