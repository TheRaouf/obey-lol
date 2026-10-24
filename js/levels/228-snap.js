/* Level 228 — Snap! (Checkmate Chalet)
 * Turn cards onto the pile. The rule card: SNAP when the top two cards show the same NUMBER.
 * Bossworth: "Snap on the same COLOUR!" The first flip puts 9♦ on 4♥ (both red: his false snap,
 * trap if you snap). The second puts 9♣ on 9♦: same number, SNAP wins. Missed snaps can be caught
 * later (5♠ then 5♥); running out of cards without a snap is a trap.
 * Solution: flip, flip, SNAP.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DECK = [['4', 'hearts'], ['9', 'diamonds'], ['9', 'clubs'], ['5', 'spades'], ['5', 'hearts'], ['7', 'clubs'], ['2', 'diamonds']];
  var NAME = { hearts: 'hearts', diamonds: 'diamonds', clubs: 'clubs', spades: 'spades' };
  function cardName(c) { return c[0] + ' of ' + NAME[c[1]] + (c[1] === 'hearts' || c[1] === 'diamonds' ? ' (red)' : ' (black)'); }

  OBEY.registerLevel({
    id: 'snap',
    num: 228,
    title: 'Snap!',
    objective: 'Win the game of snap.',
    intro: 'Snap! Turn the cards, and shout SNAP when two match. Same COLOUR, of course. Red on red, snap! Everyone knows that. Don\'t read the card. Cards are for playing.',
    introMood: 'annoyed',
    actions: ['tap', 'read', 'sequence'],
    par: 3,
    hints: [
      'Read the rule card on the table. What has to match?',
      'Snap needs the same NUMBER, not the same colour. 9 of diamonds on 4 of hearts is not a snap.',
      'Turn two cards (9 of diamonds, then 9 of clubs), then press SNAP.'
    ],
    wrong: ['Snapping on a colour match is a false snap (trap).', 'Snapping with only one card down does nothing (nope).', 'Running out of cards without a snap loses (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Nine on nine. Snap. The referee is "checking the rules".',
    trick: 'Snap means the same number, so you ignored Bossworth\'s red-on-red and waited for the nines.',

    init: function () { return { n: 1 }; },

    view: function (s) {
      var top = DECK[s.n - 1], under = s.n > 1 ? DECK[s.n - 2] : null, left = DECK.length - s.n;
      return [
        O('baize', 0, 0, 100, 100, { kind: 'static', art: 'j-baize' }),
        O('rule', 4, 3, 92, 14, { kind: 'static', text: 'SNAP! when the top two cards show the SAME NUMBER.', label: 'Rule: snap when the top two cards show the same number.', cls: 'book-card' }),
        O('deck', 6, 24, 22, 32, { art: 'card', artOpts: { up: false }, label: left ? 'Deck, ' + left + ' cards left (tap to turn one)' : 'Deck, empty' }),
        O('left', 6, 58, 22, 8, { kind: 'static', text: 'Deck: ' + left, label: '', cls: 'tag-card' }),
        O('under', 36, 24, 22, 32, { kind: 'static', art: under ? 'j-pcard' : null, artOpts: under ? { n: under[0], suit: under[1] } : {}, label: under ? 'Card underneath: ' + cardName(under) : '', hidden: !under }),
        O('under-tag', 36, 58, 22, 8, { kind: 'static', text: 'under', label: '', cls: 'tag-card' }),
        O('top', 64, 24, 22, 32, { kind: 'static', art: 'j-pcard', artOpts: { n: top[0], suit: top[1] }, label: 'Top card: ' + cardName(top) }),
        O('top-tag', 64, 58, 22, 8, { kind: 'static', text: 'top', label: '', cls: 'tag-card' }),
        O('snap', 18, 74, 64, 20, { text: 'SNAP!', label: 'Shout snap', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'deck') {
        if (s.n >= DECK.length) {
          api.fail('No cards left and not a single snap. I win on, er, cards! Shuffle up!', 'laughing');
          return true;
        }
        s.n++;
        var top = DECK[s.n - 1], under = DECK[s.n - 2];
        var red = function (c) { return c[1] === 'hearts' || c[1] === 'diamonds'; };
        if (top[0] === under[0]) api.say('Hm? A ' + top[0] + ' on a ' + under[0] + '. Different colours. Boring. Nothing to see. Turn another!', 'suspicious');
        else if (red(top) === red(under)) api.say((red(top) ? 'Red' : 'Black') + ' on ' + (red(top) ? 'red' : 'black') + '! SNAP! Hit it! Hit it NOW!', 'panicked');
        else api.say('No match. Turn another. Faster!', 'neutral');
        return true;
      }
      if (a.target !== 'snap') return false;
      if (s.n < 2) {
        api.nope('snap');
        api.say('Snap with one card? It can\'t match itself. Well. It could. Not allowed.', 'annoyed');
        return true;
      }
      var t = DECK[s.n - 1], u = DECK[s.n - 2];
      if (t[0] === u[0]) {
        api.defy('number');
        api.complete({ line: 'SNAP? Two different colours! That\'s not… "same number"? Who wrote that card? …The card wrote the card. Fine. You win the pile.', mood: 'defeated' });
      } else {
        api.fail('SNAP! …The ' + t[0] + ' and the ' + u[0] + ' are not the same number. False snap! You pick up the whole pile. Deal again!', 'laughing');
      }
      return true;
    },

    solution: [{ tap: 'deck' }, { tap: 'deck' }, { tap: 'snap' }],
    alternatives: { 'second-chance': [{ tap: 'deck' }, { tap: 'deck' }, { tap: 'deck' }, { tap: 'deck' }, { tap: 'snap' }] },
    checks: [
      { name: 'snap on red', steps: [{ tap: 'deck' }, { tap: 'snap' }], expect: 'fail' },
      { name: 'snap too early', steps: [{ tap: 'snap' }], expect: 'nope' },
      { name: 'never snap', steps: [{ tap: 'deck' }, { tap: 'deck' }, { tap: 'deck' }, { tap: 'deck' }, { tap: 'deck' }, { tap: 'deck' }, { tap: 'deck' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
