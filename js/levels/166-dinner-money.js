/* Level 166 — Dinner Money (Lunchbox Lane)
 * Lunch costs 85p. Bossworth: just hand over the £2 coin, they'll give change. The sign on the till:
 * EXACT MONEY ONLY, no change. Make 85p exactly: 50p + 20p + 10p + 5p, then Pay.
 * Wrong: paying more than 85p (trap: no change); paying less (nope). Tapping the dish takes the coins back.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var COINS = [
    { id: 'c200', name: '£2', v: 200 }, { id: 'c50', name: '50p', v: 50 }, { id: 'c20a', name: '20p', v: 20 }, { id: 'c20b', name: '20p', v: 20 },
    { id: 'c10', name: '10p', v: 10 }, { id: 'c5', name: '5p', v: 5 }, { id: 'c2', name: '2p', v: 2 }, { id: 'c1', name: '1p', v: 1 }
  ];
  var PRICE = 85;
  function money(p) { return p >= 100 ? '£' + (p / 100).toFixed(2) : p + 'p'; }
  function total(s) { return s.dish.reduce(function (t, id) { return t + COINS.filter(function (c) { return c.id === id; })[0].v; }, 0); }

  OBEY.registerLevel({
    id: 'dinner-money',
    num: 166,
    title: 'Dinner Money',
    objective: 'Pay for your lunch.',
    intro: 'Lunch is 85p. Just give them the big £2 coin; they\'ll sort out the change. That\'s what change is FOR. Big coin, big smile, big lunch.',
    introMood: 'suspicious',
    actions: ['drag', 'tap', 'count'],
    par: 5,
    hints: [
      'Read the sign on the till before you hand over anything.',
      'No change is given, so the dish must hold exactly 85p.',
      'Put 50p, 20p, 10p and 5p in the dish, then press Pay.'
    ],
    wrong: ['Paying more than 85p is a trap: the till gives no change.', 'Paying less than 85p is a nope.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Fifty, twenty, ten, five. Exactly 85p and not a penny lost.',
    trick: 'The till gave no change, so you had to count out exactly 85p instead of handing over the £2 coin.',

    init: function () { return { dish: [] }; },

    view: function (s) {
      var t = total(s);
      var out = [
        O('menu', 4, 3, 44, 15, { kind: 'static', text: 'Today: pasta + pudding\n85p', label: 'Menu board: pasta and pudding, 85p', cls: 'display-card' }),
        O('sign', 52, 3, 44, 15, { kind: 'static', text: 'EXACT MONEY ONLY.\nNo change given!', label: 'Sign on the till: exact money only, no change given', cls: 'sign-card' }),
        O('paid', 4, 22, 44, 9, { kind: 'static', text: 'In the dish: ' + money(t), label: 'In the dish: ' + money(t), cls: 'tag-card' }),
        O('kid', 6, 48, 18, 30, { kind: 'static', art: 'g-kid', artOpts: { color: '#3ec1ff', hair: '#9a6b3f' }, label: '' }),
        O('counter', 28, 62, 70, 14, { kind: 'static', art: 'table' }),
        O('till', 60, 37, 34, 26, { kind: 'static', art: 'g-till', label: 'Till' }),
        O('dish', 31, 52, 26, 11, { art: 'g-dish', artOpts: { n: s.dish.length }, label: 'Payment dish with ' + money(t) + ' (drop coins here; tap to take them back)', zone: true, free: true }),
        O('pay', 74, 78, 22, 20, { text: 'Pay', label: 'Pay with what is in the dish', cls: 'btn-card big' })
      ];
      COINS.forEach(function (c, i) {
        out.push(O(c.id, 4 + (i % 4) * 17, 78 + Math.floor(i / 4) * 11, 14, 9, { text: c.name, label: c.name + ' coin (drag it)', cls: 'btn-card big', drag: true, hidden: s.dish.indexOf(c.id) >= 0 }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        var c = COINS.filter(function (x) { return x.id === a.target; })[0];
        if (!c) return false;
        if (a.zone === 'dish' && s.dish.indexOf(c.id) < 0) {
          s.dish.push(c.id);
          if (c.id === 'c200') api.say('The big one! Lovely. Pay, pay, pay!', 'pleased');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'dish') {
        if (s.dish.length) { s.dish = []; api.say('Coins back in your pocket. Indecisive. I like it. Now the £2.', 'neutral'); }
        return true;
      }
      if (a.target !== 'pay') return false;
      var t = total(s);
      if (!t) { api.nope('pay'); api.say('You hand over a dish of nothing. The dinner lady hands you a plate of nothing. Fair.', 'pleased'); return true; }
      if (t < PRICE) { api.nope('pay'); api.say(money(t) + '? That\'s ' + money(PRICE - t) + ' short. The dinner lady taps the price with a ladle.', 'suspicious'); return true; }
      if (t > PRICE) {
        api.fail('The till swallows ' + money(t) + ' and pings. "No change, love. It says so on the sign." You get one pasta and a lesson. Your coins are back in your pocket, somehow. Again!');
        return true;
      }
      api.defy('exact');
      api.complete({ line: 'Exactly 85p? The dinner lady is MOVED. She says nobody ever reads the sign. I never read the sign! I\'m a nobody!', mood: 'defeated' });
      return true;
    },

    solution: [{ drop: ['c50', 'dish'] }, { drop: ['c20a', 'dish'] }, { drop: ['c10', 'dish'] }, { drop: ['c5', 'dish'] }, { tap: 'pay' }],
    checks: [
      { name: 'Bossworth\'s £2', steps: [{ drop: ['c200', 'dish'] }, { tap: 'pay' }], expect: 'fail' },
      { name: 'short', steps: [{ drop: ['c50', 'dish'] }, { drop: ['c20a', 'dish'] }, { tap: 'pay' }], expect: 'nope' },
      { name: 'overpay with small coins', steps: [{ drop: ['c50', 'dish'] }, { drop: ['c20a', 'dish'] }, { drop: ['c20b', 'dish'] }, { tap: 'pay' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
