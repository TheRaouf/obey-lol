/* Level 141 — Pick a Queue (Checkout Chaos)
 * Three tills. Till 1 has one shopper (86 items). Till 2 is EXPRESS, 5 items max, and you have 12.
 * Till 3 has two shoppers with 9 and 7 items. Count items, not people: Till 3.
 * Till 1: trap (forty minutes). Till 2: nope (not express). Ruin: push in at the front.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // lane: [shopper x positions, item counts, carry]
  var LANES = [
    { xs: [13.5], n: [86], carry: 'trolley', cols: ['#9b5de5'] },
    { xs: [36.5, 45.5, 54.5], n: [2, 3, 1], carry: 'basket', cols: ['#5fd98a', '#ff77b4', '#7fb2ff'] },
    { xs: [73, 84], n: [9, 7], carry: 'basket', cols: ['#ffd23f', '#3ec1ff'] }
  ];

  OBEY.registerLevel({
    id: 'pick-a-queue',
    num: 141,
    title: 'Pick a Queue',
    objective: 'Join the queue that gets you through the till fastest.',
    intro: 'Till 1! Only ONE person in it! Shortest queue wins. Or the express one, nobody actually counts. Quick, before someone else spots it!',
    introMood: 'pleased',
    actions: ['tap', 'count', 'read'],
    par: 1,
    hints: [
      'A queue is only as quick as the shopping in it. Look at the numbers above each shopper.',
      'Add up the items in each queue, and check whether you\'re allowed in the express lane with 12 items.',
      'Till 1 has 86 items; Till 2 is express only (5 max); Till 3 has 9 + 7 = 16. Join Till 3.'
    ],
    wrong: ['Till 1\'s one shopper has 86 items and a coupon book (trap).', 'Till 2 is express, five items max, and you have twelve (nope).', 'Pushing in is rude and ends in disgrace (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Sixteen items ahead of you, and through in no time.',
    trick: 'Queues move at the speed of their shopping, not their people: one person with 86 items is slower than two with 16.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('s1', 4, 3, 28, 10, { kind: 'static', text: 'Till 1', label: 'Till 1', cls: 'sign-card' }),
        O('s2', 36, 3, 28, 10, { kind: 'static', text: 'Till 2', label: 'Till 2', cls: 'sign-card' }),
        O('s3', 68, 3, 28, 10, { kind: 'static', text: 'Till 3', label: 'Till 3', cls: 'sign-card' }),
        O('legend', 4, 16, 28, 14, { kind: 'static', text: 'Tags = items each', label: 'The tags above shoppers show how many items each one has', cls: 'tag-card' }),
        O('express', 36, 16, 28, 14, { kind: 'static', text: 'EXPRESS: 5 items max', label: 'Till 2 is express: five items or fewer', cls: 'tag-card' }),
        O('you', 68, 16, 28, 14, { kind: 'static', text: 'You: 12 items', label: 'You have a trolley with 12 items', cls: 'tag-card' })
      ];
      LANES.forEach(function (l, li) {
        l.xs.forEach(function (x, k) {
          out.push(O('n' + li + k, x, 50, 9, 8, { kind: 'static', text: String(l.n[k]), label: 'Shopper at till ' + (li + 1) + ' with ' + l.n[k] + ' items', cls: 'tag-card' }));
          out.push(O('p' + li + k, x, 60.5, 9, 13.5, { kind: 'static', art: 'f-shopper', artOpts: { color: l.cols[k], carry: li === 0 ? 'trolley' : l.carry }, label: '' }));
        });
      });
      out.push(O('coupons', 4, 34, 28, 11, { kind: 'static', text: '…and coupons!', label: 'The till 1 shopper is also holding a thick book of coupons', cls: 'speech-card' }));
      ['Till 1', 'Till 2', 'Till 3', 'Push in'].forEach(function (t, i) {
        out.push(O(i < 3 ? 'join' + (i + 1) : 'push', 4 + i * 23.5, 84, 21, 12, { text: i < 3 ? 'Join ' + (i + 1) : t, label: i < 3 ? 'Join the queue for till ' + (i + 1) : 'Push in at the front of a queue', cls: i === 0 ? 'btn-card accent' : (i < 3 ? 'btn-card big' : 'btn-card') }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'join1':
          api.fail('One person… with 86 items. And a coupon for every single one. Forty minutes later the frozen peas have thawed. Back to the start.');
          return true;
        case 'join2':
          api.nope('join2');
          api.say('The express till lady points at the sign, then at your twelve items, then at the sign again. Express means five. Even I can count to five.', 'annoyed');
          return true;
        case 'join3':
          api.defy('queue');
          api.complete({ line: 'Two people, sixteen items, and we\'re through before Till 1 has scanned her first coupon. I chose Till 1. Remember that. Actually, forget it.', mood: 'defeated' });
          return true;
        case 'push':
          api.complete({ ruin: 'queue-jumper', line: 'You pushed in! Everyone TUTTED. At ME. The whole shop tutted at me. I will never be able to show my face at Till 3 again.', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'join3' }],
    ruinPaths: { 'queue-jumper': [{ tap: 'push' }] },
    checks: [
      { name: 'the one-person queue', steps: [{ tap: 'join1' }], expect: 'fail' },
      { name: 'the express lane', steps: [{ tap: 'join2' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
