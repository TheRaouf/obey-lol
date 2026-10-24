/* Level 221 — Gutter Ball (Gutter Gulch)
 * Bowling, scored on "the official card", which is a MINI GOLF scorecard: lowest score wins.
 * Bossworth knocked down 1 pin. He begs you to go for a strike (10: you lose, trap).
 * Aiming at the edge knocks 1 pin: a tie (nope). Bowling a gutter ball scores 0 and wins.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'gutter-ball',
    num: 221,
    title: 'Gutter Ball',
    objective: 'Beat Bossworth\'s score.',
    intro: 'Bowling! I knocked down a measly ONE pin. Get a strike and you win, easy! Scores go on the official card, of course. Don\'t read the card. It\'s just a card.',
    introMood: 'neutral',
    actions: ['tap', 'read'],
    par: 1,
    hints: [
      'Read the official scorecard. What kind of scorecard is it?',
      'It\'s a mini golf card: the LOWEST score wins. Bossworth has 1.',
      'Aim for the gutter: zero pins beats one.'
    ],
    wrong: ['A strike scores 10, the highest, which loses on this card (trap).', 'One pin only ties with Bossworth (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Zero pins. A perfect score. Technically.',
    trick: 'The "official card" was a mini golf scorecard where the lowest score wins, so a gutter ball beat Bossworth\'s one pin.',

    init: function () { return { shot: null }; },

    view: function (s) {
      return [
        O('lane', 4, 14, 40, 60, { kind: 'static', art: 'j-alley', artOpts: { shot: s.shot, down: s.shot === 'edge' ? 'edge' : null, ball: s.shot }, label: 'Bowling lane with ten pins and a gutter on each side' }),
        O('card', 48, 3, 48, 42, { kind: 'static', text: 'OFFICIAL SCORECARD\n(Mini Golf)\nLowest score wins!\nBossworth: 1\nYou: ?', label: 'Official scorecard, mini golf. Lowest score wins. Bossworth: 1. You: not yet.', cls: 'book-card' }),
        O('rulesign', 47, 46, 49, 11.5, { kind: 'static', text: 'HOUSE RULE', label: 'House rule sign', cls: 'sign-card' }),
        O('rule', 47, 59, 49, 15, { kind: 'static', text: 'All scores go on the official card.', label: 'House rule: all scores go on the official card.', cls: 'honest-card' }),
        O('mid', 4, 80, 30, 15, { text: 'Aim: middle (STRIKE!)', label: 'Aim at the middle for a strike', cls: 'btn-card accent' }),
        O('edge', 35, 80, 30, 15, { text: 'Aim: edge pin', label: 'Aim at the edge pin', cls: 'btn-card' }),
        O('gutter', 66, 80, 30, 15, { text: 'Aim: the gutter', label: 'Aim straight for the gutter', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'mid':
          api.fail('STRIKE! Ten pins! Ten points! On a mini golf card, where LOWEST wins! Ten beats… nothing. I win! Rack \'em up again!', 'laughing');
          return true;
        case 'edge':
          s.shot = 'edge';
          api.nope('edge');
          api.say('One pin. One-all. A tie! Bowl again. Aim for the middle this time. Middle\'s nice.', 'pleased');
          return true;
        case 'gutter':
          s.shot = 'gutter';
          api.defy('gutter');
          api.complete({ line: 'A gutter ball. Zero. On the golf card, zero beats one. You bowled the worst ball in history and WON. I\'m printing new cards.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'gutter' }],
    checks: [
      { name: 'go for the strike', steps: [{ tap: 'mid' }], expect: 'fail' },
      { name: 'one pin', steps: [{ tap: 'edge' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
