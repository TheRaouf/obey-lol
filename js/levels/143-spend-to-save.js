/* Level 143 — Spend to Save (Checkout Chaos)
 * Basket: £18.50. Coupon: £5 off when you spend £20 or more. Add the £1.50 bananas: £20.00 − £5 =
 * £15.00, less than you'd pay now. Gum (80p) doesn't reach £20: trap. Bossworth's £6 cake:
 * £24.50 − £5 = £19.50, more than now: trap. Paying £18.50 as it is: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BASE = 1850, LIMIT = 2000, OFF = 500;
  var ADD = [
    { id: 'gum', name: 'gum', p: 80, art: 'f-gum', text: 'Gum 80p', cls: 'btn-card big' },
    { id: 'bananas', name: 'bananas', p: 150, art: 'f-bananas', text: 'Bananas £1.50', cls: 'btn-card big' },
    { id: 'cake', name: 'giant cake', p: 600, art: 'f-cake', text: 'Giant cake £6', cls: 'btn-card accent' }
  ];
  function money(p) { return '£' + (p / 100).toFixed(2); }

  OBEY.registerLevel({
    id: 'spend-to-save',
    num: 143,
    title: 'Spend to Save',
    objective: 'Pay LESS than £18.50 for your basket.',
    intro: 'The coupon! Add my giant cake, it\'s basically FREE with the coupon. Or some gum, that\'ll tip you over. Whatever you do, don\'t buy more bananas. Bananas are a trap.',
    introMood: 'suspicious',
    actions: ['tap', 'maths'],
    par: 2,
    hints: [
      'Read the coupon. How much do you need to spend before it works?',
      'You\'re £1.50 short of £20. Which extra item gets you there for the least money?',
      'Add the bananas (£18.50 + £1.50 = £20, minus £5 = £15), then pay.'
    ],
    wrong: ['Gum leaves you short of £20, so you pay more (trap).', 'The £6 cake makes the bill bigger even after the coupon (trap).', 'Paying £18.50 as it is isn\'t paying less (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'More shopping, smaller bill.',
    trick: 'The coupon only worked from £20, so adding £1.50 of bananas took £5 off and made the whole bill cheaper than buying less.',

    init: function () { return { added: {} }; },

    view: function (s) {
      var total = BASE;
      ADD.forEach(function (it) { if (s.added[it.id]) total += it.p; });
      var pay = total >= LIMIT ? total - OFF : total;
      var out = [
        O('screen', 4, 3, 54, 15, { kind: 'static', text: 'Total ' + money(total) + (total >= LIMIT ? '\nCoupon −£5: ' + money(pay) : '\nTo pay: ' + money(pay)), label: 'Till screen: total ' + money(total) + ', to pay ' + money(pay), cls: 'display-card' }),
        O('coupon', 60, 3, 36, 18, { kind: 'static', text: '£5 OFF when you spend £20+', label: 'Coupon: five pounds off when you spend twenty pounds or more', cls: 'ticket-card' }),
        O('basket', 4, 21, 54, 9, { kind: 'static', text: 'In the basket: £18.50', label: 'Your basket comes to £18.50', cls: 'tag-card' })
      ];
      ADD.forEach(function (it, i) {
        out.push(O(it.id + 'Shelf', 4 + i * 31.5, 53.5, 29, 5.8, { kind: 'static', art: 'shelf', label: '' }));
        out.push(O(it.id + 'Art', 6 + i * 31.5, 36, 25, 18, { kind: 'static', art: it.art, label: it.name + ' on the impulse shelf' + (s.added[it.id] ? ' (added)' : '') }));
        out.push(O(it.id, 4 + i * 31.5, 62, 29, 13, { text: s.added[it.id] ? 'Added' : it.text, label: 'Add ' + it.name + ' for ' + money(it.p) + (s.added[it.id] ? ' (already added)' : ''), cls: it.cls, disabled: !!s.added[it.id] }));
      });
      out.push(O('pay', 52, 81, 44, 13, { text: 'PAY ' + money(pay), label: 'Pay ' + money(pay), cls: 'btn-card big' }));
      out.push(O('aim', 4, 81, 44, 13, { kind: 'static', text: 'Beat £18.50', label: 'Goal: pay less than £18.50', cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var it = ADD.filter(function (x) { return x.id === a.target; })[0];
      if (it) {
        s.added[it.id] = true;
        api.say({ gum: 'Gum! Tiny! Cheap! Definitely enough to reach twenty. Probably. Don\'t check.', bananas: 'BANANAS? I said bananas are a trap. Why is the screen going down?', cake: 'MY CAKE! It\'s practically free! Don\'t look at the screen.' }[it.id], it.id === 'bananas' ? 'panicked' : 'pleased');
        return true;
      }
      if (a.target === 'pay') {
        var total = BASE;
        ADD.forEach(function (x) { if (s.added[x.id]) total += x.p; });
        var pay = total >= LIMIT ? total - OFF : total;
        if (pay < BASE) {
          api.defy('coupon');
          api.complete({ line: money(pay) + '. You bought MORE and paid LESS. That\'s not shopping, that\'s witchcraft. Can I have a banana?', mood: 'defeated' });
        } else if (pay === BASE) {
          api.nope('pay');
          api.say('£18.50. Exactly what it was. Congratulations on achieving nothing. Now add my cake.', 'pleased');
        } else {
          api.fail(money(pay) + '?! That\'s MORE than £18.50. ' + (total >= LIMIT ? 'The coupon came off, but the cake cost more than it saved.' : 'The gum didn\'t even reach £20, so the coupon stayed in Bossworth\'s pocket.') + ' Everything goes back.');
        }
        return true;
      }
      return false;
    },

    solution: [{ tap: 'bananas' }, { tap: 'pay' }],
    alternatives: { 'gum-and-bananas': [{ tap: 'gum' }, { tap: 'bananas' }, { tap: 'pay' }] },
    checks: [
      { name: 'Bossworth\'s "free" cake', steps: [{ tap: 'cake' }, { tap: 'pay' }], expect: 'fail' },
      { name: 'just gum', steps: [{ tap: 'gum' }, { tap: 'pay' }], expect: 'fail' },
      { name: 'paying as it is', steps: [{ tap: 'pay' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
