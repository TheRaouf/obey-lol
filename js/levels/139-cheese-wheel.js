/* Level 139 — Cheese Wheel (Deli Dilemma)
 * Mum's list says 500 g of cheddar; the whole wheel weighs 2 kg and is marked into 8 equal wedges.
 * 500 g is a quarter. Bossworth calls half "a little sliver".
 * 1/2: trap (a kilo). 1/8: nope (250 g). Ruin: ask for the whole wheel — it rolls off after him.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CUTS = [
    { id: 'c8', text: '1/8', label: 'Cut one eighth of the wheel', cls: 'btn-card big' },
    { id: 'c4', text: '1/4', label: 'Cut one quarter of the wheel', cls: 'btn-card big' },
    { id: 'c2', text: '1/2', label: 'Cut half of the wheel', cls: 'btn-card accent' },
    { id: 'all', text: 'All of it', label: 'Take the whole wheel', cls: 'btn-card big' }
  ];

  OBEY.registerLevel({
    id: 'cheese-wheel',
    num: 139,
    title: 'Cheese Wheel',
    objective: 'Ask the deli for exactly what Mum\'s list says.',
    intro: 'Cheese! Mum wants "a little sliver". Ask for HALF the wheel. Half is basically a sliver. In cheese terms. Trust me, I\'m practically a cheese.',
    introMood: 'pleased',
    actions: ['tap', 'maths', 'read'],
    par: 1,
    hints: [
      'Ignore Bossworth\'s idea of a sliver. Read the list and the deli sign.',
      'The whole wheel is 2 kg, which is 2000 g. How many 500 g pieces fit in it?',
      'Four pieces of 500 g make 2 kg, so ask for a quarter (1/4).'
    ],
    wrong: ['Half the wheel is a whole kilo, double the list (trap).', 'One eighth is only 250 g (nope).', 'The whole wheel is a terrible idea (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Five hundred grams on the nose.',
    trick: 'The wheel weighed 2 kg, so the 500 g on Mum\'s list was exactly a quarter, two of the eight wedges, and nowhere near Bossworth\'s "sliver" of half.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('list', 4, 3, 52, 11, { kind: 'static', text: 'Mum\'s list: 500 g cheddar', label: 'Mum\'s list: 500 grams of cheddar', cls: 'ticket-card' }),
        O('wheel', 58, 3, 38, 11, { kind: 'static', text: 'Whole wheel: 2 kg', label: 'Deli sign: the whole wheel weighs 2 kilograms', cls: 'tag-card' }),
        O('cheese', 30, 17, 34, 34, { kind: 'static', art: 'f-cheese', label: 'A whole wheel of cheddar, marked into 8 equal wedges' }),
        O('wedges', 68, 24, 28, 16, { kind: 'static', text: 'Marked in 8 equal wedges', label: 'Note: the wheel is marked in 8 equal wedges', cls: 'tag-card' }),
        O('case', 4, 48, 92, 33.7, { kind: 'static', art: 'f-glasscase', label: '' })
      ];
      CUTS.forEach(function (c, i) {
        out.push(O(c.id, 4 + i * 23.5, 84, 21, 12, { text: c.text, label: c.label, cls: c.cls }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'c4':
          api.complete({ line: 'A quarter. 500 grams exactly. Mum will be thrilled. I wanted a cheese the size of a car tyre. Nobody listens to the cheese.', mood: 'defeated' });
          return true;
        case 'c2':
          api.fail('THUNK. Half a wheel: one whole kilo. Mum\'s list said 500 g. The deli lady wraps it, unwraps it, and sighs. Back to the counter.');
          return true;
        case 'c8':
          api.nope('c8');
          api.say('One eighth? That\'s 250 g. A nibble. A mouse would ask for more. And you\'re no mouse. Probably.', 'annoyed');
          return true;
        case 'all':
          api.complete({ ruin: 'big-cheese', line: 'The WHOLE wheel? It\'s rolling off the counter — it\'s heading for aisle four — it\'s CHASING ME. Why is cheese so FAST?', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'c4' }],
    ruinPaths: { 'big-cheese': [{ tap: 'all' }] },
    checks: [
      { name: 'Bossworth\'s "sliver"', steps: [{ tap: 'c2' }], expect: 'fail' },
      { name: 'one wedge', steps: [{ tap: 'c8' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
