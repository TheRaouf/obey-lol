/* Level 100 — Like Poles
 * A key rides a cart in a glass tube; the cart's magnet shows N towards the dock. Bossworth
 * quotes the law correctly ("opposites attract, likes repel") then applies it backwards: he wants
 * S facing the cart. Flip the magnet so N faces the cart, drop it in the dock: the cart is pushed
 * to the far end and the key drops into the lock.
 * Wrong: docking with S facing (trap: the cart is pulled back), tapping the tube (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'like-poles',
    num: 100,
    title: 'Like Poles',
    objective: 'Push the key cart to the far end of the tube.',
    intro: 'Opposites attract, likes repel. I basically invented that. So put the magnet in the dock with S facing the cart\'s N, and off it zooms. Trust the lab coat.',
    introMood: 'suspicious',
    actions: ['tap', 'drag', 'physics'],
    par: 2,
    hints: [
      'He said the rule correctly. Did he apply it correctly?',
      'The cart shows N towards the dock. To PUSH it away, the dock needs the same pole facing it.',
      'Tap Flip so the N end is on the right, then drag the magnet into the dock.'
    ],
    wrong: ['Docking the magnet with S facing the cart pulls the cart back (trap).', 'Tapping the glass tube does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Repelled with style. Unlike my guests.',
    trick: 'Bossworth quoted the law right but used it backwards: like poles repel, so the dock needed N facing the cart\'s N.',

    init: function () { return { flip: false, docked: false }; },

    view: function (s) {
      var facing = s.flip ? 'N' : 'S';
      return [
        O('dock', 2, 16, 18, 26, { text: 'MAGNET\nDOCK', label: 'Magnet dock at the left end of the tube (its right side faces the cart)', cls: 'tag-card', zone: true }),
        O('tube', 22, 18, 74, 22, { art: 'd-tube', label: 'Sealed glass tube' }),
        O('cart', s.docked ? 76 : 24, 20, 18, 16, { kind: 'static', art: 'd-cart', label: 'Cart carrying a key, its magnet shows N towards the dock' }),
        O('rule', 4, 48, 40, 16, { kind: 'static', text: 'N meets N: push\nS meets S: push\nN meets S: pull', label: 'Rule: N meets N pushes, S meets S pushes, N meets S pulls', cls: 'honest-card' }),
        O('magnet', 6, 70, 32, 16, { art: 'd-magnet', artOpts: { flip: s.flip }, label: 'Bar magnet, right end is ' + facing + ' (drag it to the dock)', drag: true }),
        O('flip', 6, 88, 32, 10, { text: 'Flip magnet', label: 'Flip the magnet end to end', cls: 'btn-card' }),
        O('face', 46, 70, 22, 16, { kind: 'static', text: 'Right end: ' + facing, label: 'The right end of the magnet is ' + facing, cls: 'panel-card' }),
        O('door', 74, 46, 22, 48, { kind: 'static', art: 'door', artOpts: { sign: 'KEY CHUTE', small: true, keyhole: true }, label: 'Door: unlocks when the key reaches the end of the tube' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'tap') {
        if (a.target === 'flip') { s.flip = !s.flip; return true; }
        if (a.target === 'tube') { api.nope(); api.say('Sealed. Unbreakable. Very expensive. Please stop tapping it.', 'annoyed'); return true; }
        if (a.target === 'dock') { api.say('The dock wants a magnet in it. Not a finger.', 'neutral'); return true; }
        return false;
      }
      if (a.type !== 'drop' || a.target !== 'magnet') return false;
      if (a.zone !== 'dock') { api.say('You set the magnet down. Nearby paperclips get nervous.', 'neutral'); return true; }
      if (!s.flip) {
        api.fail('CLANG! S meets N: they ATTRACT. The cart shot backwards and glued itself to the dock. Opposites attract. As I said. Correctly. Start again.');
        return true;
      }
      s.docked = true;
      api.defy('s-facing');
      api.complete({ line: 'N meets N. WHOOSH. The cart flies to the far end and the key drops in the lock. That\'s… what I said. Mirror-image. Broadly.', mood: 'defeated' });
      return true;
    },

    solution: [{ tap: 'flip' }, { drop: ['magnet', 'dock'] }],
    checks: [
      { name: 'S facing the cart is a trap', steps: [{ drop: ['magnet', 'dock'] }], expect: 'fail' },
      { name: 'tapping the tube is a nope', steps: [{ tap: 'tube' }], expect: 'nope' },
      { name: 'flipping twice then docking is a trap', steps: [{ tap: 'flip' }, { tap: 'flip' }, { drop: ['magnet', 'dock'] }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
