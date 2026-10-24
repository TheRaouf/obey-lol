/* Level 85 — Bear Aware
 * Bossworth: lock only the FOOD away; bears hate toothpaste. Ranger sign: bears sniff out anything
 * with a smell. Toothpaste and lavender soap smell; the torch and the book don't.
 * Solution: drag sandwich, toothpaste and soap into the bear box, then sleep in the tent.
 * Wrong: sleeping with a smelly item outside (trap); boxing an unsmelly item (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ITEMS = [
    { id: 'sandwich', art: 'sandwich', label: 'Cheese sandwich', smelly: true },
    { id: 'paste', art: 'c-toothpaste', label: 'Toothpaste (extra minty!)', smelly: true },
    { id: 'soap', art: 'c-soap', label: 'Soap (lavender scented)', smelly: true },
    { id: 'torch', art: 'c-torch', label: 'Torch', smelly: false },
    { id: 'book', art: 'magazine', label: 'Paperback book', smelly: false }
  ];
  var VISIT = {
    sandwich: 'At 3am a bear eats your cheese sandwich, then sits on your tent to digest it.',
    paste: 'At 3am a bear finds your toothpaste. It now has the freshest breath in the forest, and your tent.',
    soap: 'At 3am a bear has a lovely lavender bath in your camping bowl. It makes a LOT of noise.'
  };

  OBEY.registerLevel({
    id: 'bear-aware',
    num: 85,
    title: 'Bear Aware',
    objective: 'Get a good night\'s sleep in the tent.',
    intro: 'Bedtime! Lock the FOOD in the bear box, and only food. Bears hate toothpaste. They\'re very anti-dental. Leave your minty bits and lavender soap out, so the tent smells nice.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'sort'],
    par: 4,
    hints: [
      'Read the ranger\'s sign: it isn\'t only about food.',
      'Anything with a smell attracts bears. Toothpaste and scented soap definitely smell.',
      'Put the sandwich, toothpaste and soap in the bear box, then tap the tent.'
    ],
    wrong: ['Going to sleep with anything smelly left out brings a bear (trap).', 'The torch and the book don\'t smell, so the box refuses them (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Eight hours of sleep. The bear had to make do with a pine cone.',
    trick: 'Bears follow their noses, not the menu. Everything smelly went in the box.',

    init: function () { return { boxed: {} }; },

    view: function (s) {
      var n = Object.keys(s.boxed).length;
      var objs = [
        O('sign', 4, 3, 60, 18, { kind: 'static', text: 'RANGER: bears sniff out ANYTHING smelly!', label: 'Ranger sign: bears sniff out anything with a smell', cls: 'sign-card' }),
        O('bear', 76, 4, 20, 20, { kind: 'static', art: 'c-bear', label: 'A bear peeking out of the bushes' }),
        O('bush', 70, 16, 28, 16, { kind: 'static', art: 'c-bush', label: '' }),
        O('box', 4, 48, 32, 28, { art: 'c-bearbox', artOpts: { count: n }, label: 'Bear-proof box with ' + n + ' item' + (n === 1 ? '' : 's') + ' inside (drop zone)', zone: true, free: true }),
        O('tent', 54, 40, 42, 38, { art: 'c-tent', label: 'Your tent (tap to go to sleep)' })
      ];
      ITEMS.forEach(function (it, i) {
        objs.push(O(it.id, 4 + i * 19, 80, 16, 16, { art: it.art, label: it.label + ' (drag it)', drag: true, hidden: !!s.boxed[it.id] }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        var it = ITEMS.filter(function (x) { return x.id === a.target; })[0];
        if (!it) return false;
        if (a.zone !== 'box') { api.say('You put the ' + it.label.toLowerCase() + ' down on the grass. The bear takes notes.', 'neutral'); return true; }
        if (!it.smelly) {
          api.nope(a.target);
          api.say('The ' + it.label.toLowerCase() + '? It doesn\'t smell of anything. The box is for smells, not stuff. Have it back.', 'suspicious');
          return true;
        }
        s.boxed[it.id] = true;
        if (it.id !== 'sandwich') { api.defy('box'); api.say('Not the ' + it.label.toLowerCase() + '! Bears HATE that. …Why is the bear sniffing the air so hopefully?', 'annoyed'); }
        else api.say('The sandwich, locked away. Very sensible. Leave the rest. Fresh breath is a camping essential.', 'pleased');
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'box') { api.say('A big metal box with a bear-proof latch. Bears hate latches. Bears hate maths, generally.', 'neutral'); return true; }
      if (a.target === 'tent') {
        var left = ['sandwich', 'paste', 'soap'].filter(function (k) { return !s.boxed[k]; });
        if (left.length) api.fail(VISIT[left[0]] + ' Back to the campfire, and pack properly this time.');
        else api.complete({ line: 'A whole night without a single bear. It sniffed the box, sighed, and left. I suppose minty bears ARE a thing. Who knew. (The sign knew.)', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ drop: ['sandwich', 'box'] }, { drop: ['paste', 'box'] }, { drop: ['soap', 'box'] }, { tap: 'tent' }],
    checks: [
      { name: 'only the food', steps: [{ drop: ['sandwich', 'box'] }, { tap: 'tent' }], expect: 'fail' },
      { name: 'box the torch', steps: [{ drop: ['torch', 'box'] }], expect: 'nope' },
      { name: 'sleep straight away', steps: [{ tap: 'tent' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
