/* Level 142 — The Divider (Checkout Chaos)
 * Your three things (milk, bread, eggs) are on the belt, followed by Bossworth's four giant cakes.
 * "No divider needed, we're a team, I'll pay you back." Drop the NEXT CUSTOMER divider after the eggs,
 * then pay. Paying without it: trap (£43.20). Divider in the wrong gap: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // dy: per-item drop (stage %) so each drawing rests on the belt top.
  var ITEMS = [
    { id: 'milk', art: 'f-milk', label: 'Your milk' },
    { id: 'bread', art: 'f-bread', label: 'Your bread', dy: 2.2 },
    { id: 'eggs', art: 'f-eggs', label: 'Your eggs', dy: 2.5 },
    { id: 'cake1', art: 'f-cake', label: 'Bossworth\'s giant cake', dy: 1 },
    { id: 'cake2', art: 'f-cake', label: 'Bossworth\'s second giant cake', dy: 1 },
    { id: 'cake3', art: 'f-cake', label: 'Bossworth\'s third giant cake', dy: 1 },
    { id: 'cake4', art: 'f-cake', label: 'Bossworth\'s fourth giant cake', dy: 1 }
  ];
  var LAST_MINE = 'eggs';

  OBEY.registerLevel({
    id: 'the-divider',
    num: 142,
    title: 'The Divider',
    objective: 'Pay for your own shopping with the £5 you have.',
    intro: 'No need for the divider stick! We\'re a TEAM. Just pay for the lot and I\'ll pay you back. Next year. Ish. Probably.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'read'],
    par: 2,
    hints: [
      'Read your shopping list. Not everything on the belt is yours.',
      'The yellow bar tells the cashier where one customer\'s shopping ends.',
      'Drag the divider onto the eggs (it goes in just after them), then pay.'
    ],
    wrong: ['Paying with no divider buys all four cakes too (trap).', 'A divider in the middle of your own shopping (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three items, £3.20, zero cakes.',
    trick: 'The NEXT CUSTOMER bar tells the cashier where your shopping ends, so putting it after your eggs kept Bossworth\'s four cakes off your bill.',

    init: function () { return { placed: false }; },

    view: function (s) {
      var out = [
        O('list', 4, 3, 58, 13, { kind: 'static', text: 'Yours: milk, bread, eggs = £3.20', label: 'Your shopping: milk, bread and eggs, total £3.20', cls: 'ticket-card' }),
        O('purse', 64, 3, 32, 13, { kind: 'static', text: 'You have £5', label: 'You have five pounds', cls: 'tag-card' }),
        O('belt', 2, 58, 96, 16.8, { kind: 'static', art: 'f-belt', label: 'Checkout conveyor belt' })
      ];
      ITEMS.forEach(function (it, i) {
        var x = i < 3 ? 4 + i * 11.5 : 40 + (i - 3) * 11.5 + (s.placed ? 6 : 0);
        out.push(O(it.id, x, 48 + (it.dy || 0), 11, 11.5, { art: it.art, label: it.label + ' on the belt' + (s.placed ? '' : ' (drop the divider here to put it just after this)'), zone: true, free: true }));
      });
      if (s.placed) out.push(O('bar', 39, 55, 6.5, 7, { kind: 'static', art: 'f-divider', label: 'Divider on the belt after your eggs' }));
      out.push(O('divider', 4, 82, 36, 11, { art: 'f-divider', label: 'NEXT CUSTOMER divider bar (drag it onto the belt)', drag: true, hidden: s.placed }));
      out.push(O('pay', 58, 81, 38, 13, { text: 'PAY', label: 'Pay for the shopping', cls: 'btn-card big' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'divider') {
        if (!a.zone) return false;
        if (a.zone === LAST_MINE) {
          s.placed = true;
          api.say('You put a BARRIER between us. Between me and my cakes. Between our friendship and… my cakes.', 'annoyed');
        } else {
          api.nope('divider');
          api.say(/^cake/.test(a.zone) ? 'Ooh, so you\'re paying for SOME of my cakes? Generous. Very generous. Leave it there!' : 'That splits your own shopping in half. The cashier looks very confused.', 'suspicious');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'pay') {
        if (s.placed) {
          api.defy('divider');
          api.complete({ line: 'Three pounds twenty. For you. And I have to pay for my own cakes? With my own money? That\'s not teamwork. That\'s maths.', mood: 'defeated' });
        } else {
          api.fail('BEEP BEEP BEEP BEEP. Milk, bread, eggs… and four giant cakes. £43.20. You have £5. Bossworth whistles and looks at the ceiling.');
        }
        return true;
      }
      if (ITEMS.some(function (it) { return it.id === a.target; })) {
        api.say(/^cake/.test(a.target) ? 'That\'s cake. Team cake. Our cake.' : 'That one\'s yours. On the list and everything.', 'pleased');
        return true;
      }
      return false;
    },

    solution: [{ drop: ['divider', 'eggs'] }, { tap: 'pay' }],
    checks: [
      { name: 'paying for the lot', steps: [{ tap: 'pay' }], expect: 'fail' },
      { name: 'divider after the milk', steps: [{ drop: ['divider', 'milk'] }], expect: 'nope' },
      { name: 'divider among the cakes', steps: [{ drop: ['divider', 'cake2'] }, { tap: 'pay' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
