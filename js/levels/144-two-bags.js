/* Level 144 — Two Bags (Checkout Chaos)
 * Two carrier bags, each MAX 5 kg. Potatoes 4 kg, beans 3 kg, milk 2 kg, bread 1 kg: 10 kg in all.
 * Bossworth pairs potatoes with milk (6 kg). The only split: potatoes + bread, beans + milk.
 * Overfilling a bag: trap (it splits). Asking for a third bag: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var MAX = 5;
  var ITEMS = [
    { id: 'potatoes', name: 'potatoes', kg: 4, art: 'f-potatoes' },
    { id: 'beans', name: 'tins of beans', kg: 3, art: 'f-tin', opts: { word: 'BEANS' } },
    { id: 'milk', name: 'milk', kg: 2, art: 'f-milk' },
    { id: 'bread', name: 'bread', kg: 1, art: 'f-bread' }
  ];
  function load(s, b) { return ITEMS.reduce(function (t, it) { return t + (s.in[it.id] === b ? it.kg : 0); }, 0); }
  function names(s, b) { return ITEMS.filter(function (it) { return s.in[it.id] === b; }).map(function (it) { return it.name; }); }

  OBEY.registerLevel({
    id: 'two-bags',
    num: 144,
    title: 'Two Bags',
    objective: 'Pack all the shopping into the two bags without splitting one.',
    intro: 'Potatoes and milk go together. Best friends. Bread and beans in the other one. That\'s just good manners. Bags are strong, the label is just being modest.',
    introMood: 'neutral',
    actions: ['drag', 'maths', 'logic'],
    par: 4,
    hints: [
      'Read the bag label and the weight under each item.',
      'Ten kilos in total and two 5 kg bags: each bag must hold exactly 5 kg.',
      'Potatoes (4) with bread (1) in one bag; beans (3) with milk (2) in the other.'
    ],
    wrong: ['Putting more than 5 kg in a bag splits it (trap).', 'There is no third bag (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Five kilos each. Two happy bags.',
    trick: 'Ten kilos into two 5 kg bags only works as an exact split, so the 4 kg potatoes needed the 1 kg bread, not Bossworth\'s 2 kg milk.',

    init: function () { return { in: {} }; },

    view: function (s) {
      var out = [
        O('sign', 4, 3, 46, 10, { kind: 'static', text: 'PACK YOUR BAGS', label: 'Sign: pack your bags', cls: 'sign-card' }),
        O('max', 52, 3, 44, 10, { kind: 'static', text: 'Each bag: MAX 5 kg', label: 'Bag label: each bag holds five kilograms at most', cls: 'tag-card' }),
        O('counter', 2, 32, 96, 35, { kind: 'static', art: 'f-counter', label: '' })
      ];
      ITEMS.forEach(function (it, i) {
        var x = 6 + i * 23.5;
        out.push(O(it.id, x, 17, 17, 17, { art: it.art, artOpts: it.opts, label: it.name + ', ' + it.kg + ' kg (drag into a bag)', drag: true, hidden: !!s.in[it.id] }));
        out.push(O(it.id + 'Kg', x, 44, 17, 9, { kind: 'static', text: it.kg + ' kg', label: '', cls: 'tag-card', hidden: !!s.in[it.id] }));
      });
      [1, 2].forEach(function (b) {
        var kg = load(s, b), n = names(s, b);
        out.push(O('bag' + b, b === 1 ? 6 : 70, 68, 24, 29.4, { art: 'f-carrier', artOpts: { full: kg > 0 }, label: 'Bag ' + b + ', holding ' + kg + ' kg' + (n.length ? ' (' + n.join(', ') + ')' : ''), zone: true, free: true }));
        out.push(O('tag' + b, 32, b === 1 ? 70 : 84, 36, 11, { kind: 'static', text: 'Bag ' + b + ': ' + kg + ' of 5 kg', label: 'Bag ' + b + ' holds ' + kg + ' of 5 kilograms', cls: 'tag-card' }));
      });
      out.push(O('third', 30, 55, 40, 10, { text: 'Ask for a 3rd bag', label: 'Ask the cashier for a third bag', cls: 'btn-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        var it = ITEMS.filter(function (x) { return x.id === a.target; })[0];
        if (!it || (a.zone !== 'bag1' && a.zone !== 'bag2')) return false;
        var b = a.zone === 'bag1' ? 1 : 2, kg = load(s, b) + it.kg;
        if (kg > MAX) {
          api.fail('RRRRIP. ' + kg + ' kg in a 5 kg bag. The bottom gives way and the ' + it.name + ' bounce across the car park. Bossworth blames the bag\'s modesty.');
          return true;
        }
        s.in[it.id] = b;
        if (ITEMS.every(function (x) { return s.in[x.id]; })) {
          api.complete({ line: 'Five kilos each. Perfectly balanced. Potatoes and BREAD? They\'ve never even met. I don\'t approve, but the bags do.', mood: 'defeated' });
        } else if (it.id === 'potatoes') {
          api.say('Potatoes in. Now the milk, with its best friend. Go on.', 'pleased');
        } else {
          api.say('Bag ' + b + ': ' + kg + ' kilos. The bag is coping. For now.', 'suspicious');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'third') {
        api.nope('third');
        api.say('No more bags. The bag-for-life machine is having a lie-down. Two bags, ten kilos. Good luck.', 'pleased');
        return true;
      }
      if (a.target === 'bag1' || a.target === 'bag2') {
        api.say('A bag. It says 5 kg on it. Bags exaggerate.', 'neutral');
        return true;
      }
      return false;
    },

    solution: [{ drop: ['potatoes', 'bag1'] }, { drop: ['bread', 'bag1'] }, { drop: ['beans', 'bag2'] }, { drop: ['milk', 'bag2'] }],
    checks: [
      { name: 'Bossworth\'s best friends', steps: [{ drop: ['potatoes', 'bag1'] }, { drop: ['milk', 'bag1'] }], expect: 'fail' },
      { name: 'beans with the potatoes', steps: [{ drop: ['beans', 'bag2'] }, { drop: ['potatoes', 'bag2'] }], expect: 'fail' },
      { name: 'a third bag', steps: [{ tap: 'third' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
