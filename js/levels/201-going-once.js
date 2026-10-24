/* Level 201 — Going Once (Mackerel Market)
 * A Dutch auction: the price starts at 90 and drops by 10 every second until someone bids, stopping at
 * the reserve (10). You have 15 coins and the only other bidder is asleep. Bossworth: bid NOW.
 * Wait for the price to reach 10, then bid. Waiting longer is fine: the price stays at 10.
 * Wrong: bidding above 15 (trap: you can't pay), poking the seal (nope).
 * Ruin: sell Bossworth's submarine to the stall that buys submarines, then bid.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var START = 90, STEP = 10, FLOOR = 10, TICK = 1000, PURSE = 15;

  OBEY.registerLevel({
    id: 'going-once',
    num: 201,
    title: 'Going Once',
    objective: 'Win the prize kipper at the auction.',
    intro: 'The prize kipper! Only 90 coins! BID NOW, before someone else grabs it. Quick, quick, the crowd is ruthless!',
    introMood: 'panicked',
    actions: ['wait', 'read', 'tap'],
    par: 1,
    hints: [
      'Read how this auction works. Which way does the price go?',
      'The price only goes down, and the only other bidder is fast asleep. Check your purse.',
      'Wait until the price drops to 10 (you have 15), then bid.'
    ],
    wrong: ['Bidding more than you have leaves you unable to pay (trap).', 'The sleeping seal is not bidding (nope).', 'Selling the submarine to pay for a kipper (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Ten coins for a prize kipper. I\'d have paid ninety. That\'s why I\'m not allowed a purse.',
    trick: 'In a Dutch auction the price only falls, and nobody else was bidding, so waiting brought it down to a price you could pay.',

    init: function () { return { price: START, purse: PURSE, sold: false }; },

    onStart: function (s, api) {
      api.every(TICK, function () {
        if (s.price > FLOOR) {
          s.price -= STEP;
          if (s.price === FLOOR) api.say('Ten coins?! That\'s practically stealing. From me. Somehow.', 'annoyed');
        }
      });
    },

    view: function (s) {
      return [
        O('rules', 4, 4, 52, 24, { kind: 'static', text: 'DUTCH AUCTION\nThe price drops until someone bids. First bid wins and pays that price.', label: 'Dutch auction: the price drops until someone bids. The first bid wins and pays that price.', cls: 'honest-card' }),
        O('price', 60, 4, 36, 14, { kind: 'static', text: 'PRICE: ' + s.price, label: 'Current price: ' + s.price + ' coins', cls: 'display-card' }),
        O('purse', 60, 20, 36, 9, { kind: 'static', text: 'Your purse: ' + s.purse, label: 'Your purse holds ' + s.purse + ' coins', cls: 'tag-card' }),
        O('stall', 4, 34, 40, 40, { kind: 'static', art: 'i-stall', label: '' }),
        O('kipper', 12, 49, 24, 13, { kind: 'static', art: 'fish', label: 'Lot 7: one prize kipper' }),
        O('lot', 10, 64, 28, 8, { kind: 'static', text: 'LOT 7', label: '', cls: 'tag-card' }),
        O('seal', 48, 58, 22, 16, { art: 'i-seal', artOpts: { asleep: true }, label: 'The only other bidder, a seal, fast asleep' }),
        O('subsign', 74, 34, 22, 20, { kind: 'static', text: 'WE BUY SUBS! 200', label: 'Stall sign: we buy submarines, 200 coins', cls: 'plaque-card' }),
        O('sell', 74, 57, 22, 15, { text: s.sold ? 'Sold!' : 'Sell the sub', label: 'Sell Bossworth\'s submarine for 200 coins', cls: 'btn-card' + (s.sold ? ' ghost' : ''), disabled: s.sold }),
        O('bid', 4, 80, 92, 14, { text: 'BID!', label: 'Bid at the current price of ' + s.price + ' coins', cls: 'btn-card big accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'seal':
          api.nope();
          api.say('Zzzz. The seal is not bidding. The seal is dreaming of kippers. Free ones.', 'neutral');
          return true;
        case 'sell':
          s.sold = true; s.purse += 200;
          api.say('You SOLD my SUBMARINE? For a KIPPER? …Well, now we can afford it, I suppose. Bid! Bid before I cry!', 'panicked');
          return true;
        case 'bid':
          if (s.sold) {
            api.complete({ ruin: 'sold-the-sub', line: 'You won the kipper! With the money from my submarine. I am now a captain with no boat and one fish. I shall live in the kipper.', mood: 'panicked' });
            return true;
          }
          if (s.price > s.purse) {
            api.fail('SOLD for ' + s.price + '! …You have 15 coins. You spend the afternoon washing the fish market floor. The price was still falling!');
            return true;
          }
          api.defy('bid-now');
          api.complete({ line: 'SOLD, for ten coins! You waited. While I screamed. Is that a strategy? It worked. I hate that it worked.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ wait: 8500 }, { tap: 'bid' }],
    alternatives: { 'very-patient': [{ wait: 30000 }, { tap: 'bid' }] },
    ruinPaths: { 'sold-the-sub': [{ tap: 'sell' }, { tap: 'bid' }] },
    checks: [
      { name: 'bidding at 90 is a trap', steps: [{ tap: 'bid' }], expect: 'fail' },
      { name: 'bidding at 40 is still a trap', steps: [{ wait: 5200 }, { tap: 'bid' }], expect: 'fail' },
      { name: 'poking the seal is a nope', steps: [{ tap: 'seal' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
