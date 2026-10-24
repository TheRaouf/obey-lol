/* Level 217 — Heads I Win (Whistle Woods)
 * Coin toss: "Heads I win, tails you lose." Calling heads or tails loses either way (trap).
 * The plaque says the caller states the deal. Say the same deal yourself and you win either way.
 * Wrong: calling heads or tails (trap); inspecting the coin (nope: it's a normal coin).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'heads-i-win',
    num: 217,
    title: 'Heads I Win',
    objective: 'Win the coin toss for kick-off.',
    intro: 'As referee I\'ll run the coin toss. Totally fair: heads I win, tails you lose. Call it! Heads or tails? Go on. Any time.',
    introMood: 'pleased',
    actions: ['tap', 'wordplay', 'choice'],
    par: 1,
    hints: [
      'Say his deal out loud slowly. What happens to you on heads? On tails?',
      'The coin is fine. The deal is the trick, and the plaque says the caller says the deal.',
      'Be the caller: say "Heads I win, tails you lose" yourself.'
    ],
    wrong: ['Calling heads or tails loses either way (trap).', 'The coin itself is perfectly normal (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Heads you won. Tails he lost. Same thing. Lovely.',
    trick: '"Heads I win, tails you lose" wins for whoever says it, so you said it first.',

    init: function () { return { side: 'heads', seen: false }; },

    view: function (s) {
      return [
        O('grass', 0, 74, 100, 26, { kind: 'static', art: 'j-grass' }),
        O('deal', 4, 3, 60, 14, { kind: 'static', text: '"Heads I win, tails you lose."', label: 'Bossworth\'s deal: heads I win, tails you lose.', cls: 'speech-card' }),
        O('plaque', 66, 3, 30, 22, { kind: 'static', text: 'TOSS RULE: the caller says the deal.', label: 'Toss rule: the caller says the deal.', cls: 'plaque-card' }),
        O('ref', 6, 50, 24, 24, { kind: 'static', art: 'j-boss', artOpts: { whistle: true }, label: 'Bossworth, the self-appointed referee' }),
        O('table', 34, 64, 40, 10, { kind: 'static', art: 'table' }),
        O('coin', 44, 46, 20, 18, { art: 'j-coin', artOpts: { side: s.side }, label: 'The coin, showing ' + s.side + (s.seen ? '. Heads on one side, tails on the other.' : ''), free: true }),
        O('o-heads', 4, 77, 44, 10, { text: 'Call heads', label: 'Call heads', cls: 'btn-card' }),
        O('o-tails', 52, 77, 44, 10, { text: 'Call tails', label: 'Call tails', cls: 'btn-card' }),
        O('o-look', 4, 89, 44, 10, { text: 'Check the coin', label: 'Check both sides of the coin', cls: 'btn-card' }),
        O('o-deal', 52, 89, 44, 10, { text: 'YOU: "Heads I win, tails you lose!"', label: 'Say the deal yourself: heads I win, tails you lose', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'coin':
          s.side = s.side === 'heads' ? 'tails' : 'heads';
          api.say('You flip it over. ' + (s.side === 'heads' ? 'Heads.' : 'Tails.') + ' A coin. Doing coin things.', 'neutral');
          return true;
        case 'o-heads':
          api.fail('You call heads. *ting* …HEADS! Heads I win! What a fair toss. Shall we do it again? We shall.', 'laughing');
          return true;
        case 'o-tails':
          api.fail('You call tails. *ting* …TAILS! Tails you lose! Fair and square. Square and fair. Again!', 'laughing');
          return true;
        case 'o-look':
          s.seen = true;
          s.side = 'tails';
          api.nope('o-look');
          api.say('Heads on one side, tails on the other. A perfectly honest coin! The coin was never the problem. Ahem.', 'suspicious');
          return true;
        case 'o-deal':
          api.defy('deal');
          api.complete({ line: 'Deal! Wait. "Heads I win"… you win. "Tails you lose"… I lose. Who invented this deal? …I did. Your kick-off.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'o-deal' }],
    checks: [
      { name: 'call heads', steps: [{ tap: 'o-heads' }], expect: 'fail' },
      { name: 'call tails', steps: [{ tap: 'o-tails' }], expect: 'fail' },
      { name: 'check the coin', steps: [{ tap: 'o-look' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
