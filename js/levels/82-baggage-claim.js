/* Level 82 — Baggage Claim
 * Five suitcases go round the carousel, four of them black. Only one matches every detail on
 * your claim tag (black, yellow ribbon, gold star sticker). The carousel keeps moving; tap any time.
 * Solution: tap the matching bag. Wrong: other black bags (nope); Bossworth's pink bag (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BAGS = [
    { id: 'bagA', color: '#2d2850', ribbon: null, star: true, desc: 'Black suitcase, no ribbon, gold star sticker' },
    { id: 'bagB', color: '#2d2850', ribbon: '#ffd23f', star: false, desc: 'Black suitcase, yellow ribbon, no sticker' },
    { id: 'bagC', color: '#2d2850', ribbon: '#e5243b', star: true, desc: 'Black suitcase, red ribbon, gold star sticker' },
    { id: 'bagD', color: '#2d2850', ribbon: '#ffd23f', star: true, desc: 'Black suitcase, yellow ribbon, gold star sticker' },
    { id: 'bagE', color: '#ff6f91', ribbon: '#ffd23f', star: true, desc: 'Pink suitcase, yellow ribbon, gold star sticker' }
  ];
  var GAGS = {
    bagA: 'You unzip it: forty identical socks and a harmonica. Not yours. No ribbon, see?',
    bagB: 'Inside: a wetsuit and a jar of pickled onions. It has the ribbon but no star. Back it goes.',
    bagC: 'A red ribbon. Inside: a ventriloquist\'s dummy, which says "put me down". You do.'
  };

  OBEY.registerLevel({
    id: 'baggage-claim',
    num: 82,
    title: 'Baggage Claim',
    objective: 'Collect YOUR suitcase from the carousel.',
    intro: 'Your bag is the black one. Grab the first black bag you see! All black suitcases are basically the same. That\'s why everybody buys them. Quick, before someone else gets it!',
    introMood: 'pleased',
    actions: ['tap', 'compare'],
    par: 1,
    hints: [
      'Your claim tag describes your bag in more detail than "black".',
      'You need all three: black case, yellow ribbon AND a gold star sticker.',
      'Tap the black suitcase that has both a yellow ribbon and a star (it keeps moving round, any time is fine).'
    ],
    wrong: ['Grabbing a black bag that doesn\'t match the tag gets you a stranger\'s pants (nope).', 'Taking the pink suitcase upsets its owner, Bossworth (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Reunited with your bag. It seems pleased to see you. Bags can\'t smile, but still.',
    trick: 'All the bags were black. Only one matched every detail on your claim tag.',

    init: function () { return { k: 0 }; },

    onStart: function (s, api) { api.every(2500, function () { s.k = (s.k + 1) % 5; }); },

    view: function (s) {
      var objs = [
        O('tag', 4, 4, 52, 18, { kind: 'static', text: 'YOUR CLAIM TAG:\nblack case · yellow ribbon · gold star sticker', label: 'Your claim tag: black case, yellow ribbon, gold star sticker', cls: 'ticket-card' }),
        O('sign', 60, 5, 36, 14, { kind: 'static', text: 'Carousel 3 · from Sunnyvale', label: 'Sign: carousel 3, flight from Sunnyvale', cls: 'plaque-card' }),
        O('belt', 0, 50, 100, 18, { kind: 'static', art: 'c-belt', label: 'Moving luggage carousel' })
      ];
      BAGS.forEach(function (b, i) {
        var slot = (i + s.k) % 5;
        objs.push(O(b.id, 2 + slot * 20, 36, 16, 22, { art: 'c-suitcase', artOpts: { color: b.color, ribbon: b.ribbon, star: b.star }, label: b.desc }));
      });
      objs.push(O('note', 14, 78, 72, 10, { kind: 'static', text: 'The carousel keeps turning. Tap a bag to claim it.', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'bagD') {
        api.defy('bag');
        api.complete({ line: 'Black, yellow ribbon, gold star. You READ the tag? Who reads tags? I just take whichever bag looks most like me.', mood: 'defeated' });
        return true;
      }
      if (a.target === 'bagE') {
        api.fail('That\'s MY bag! Pink is a perfectly serious colour. Security escorts you back to the start of the carousel.', 'annoyed');
        return true;
      }
      if (GAGS[a.target]) { api.nope(a.target); api.say(GAGS[a.target], 'laughing'); return true; }
      return false;
    },

    solution: [{ tap: 'bagD' }],
    checks: [
      { name: 'first black bag', steps: [{ tap: 'bagA' }], expect: 'nope' },
      { name: 'ribbon but no star', steps: [{ tap: 'bagB' }], expect: 'nope' },
      { name: 'Bossworth\'s pink bag', steps: [{ tap: 'bagE' }], expect: 'fail' },
      { name: 'still works after a while', steps: [{ wait: 9000 }, { tap: 'bagD' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
