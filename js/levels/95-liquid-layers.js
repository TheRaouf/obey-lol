/* Level 95 — Liquid Layers
 * Build a density tower: pour the densest liquid first. Each bottle shows its density.
 * Bossworth wants the "fancy" olive oil at the bottom. Pouring anything lighter than the
 * layer below it mixes the column into beige soup (trap).
 * Order: honey 1.42, dish soap 1.06, water 1.00, olive oil 0.92.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var LIQ = {
    oil: { name: 'Olive oil', short: 'Oil', d: 0.92, color: '#f3e27a' },
    water: { name: 'Water', short: 'Water', d: 1.00, color: '#7dd3ea' },
    honey: { name: 'Honey', short: 'Honey', d: 1.42, color: '#ffb020' },
    soap: { name: 'Dish soap', short: 'Soap', d: 1.06, color: '#2bc46f' }
  };
  var SHELF = ['oil', 'water', 'honey', 'soap'];

  OBEY.registerLevel({
    id: 'liquid-layers',
    num: 95,
    title: 'Liquid Layers',
    objective: 'Build a neat four-layer density tower.',
    intro: 'Make a pretty density tower! Pour the olive oil first. It\'s the fanciest, so it gets the bottom. The bottom is the VIP section.',
    introMood: 'pleased',
    actions: ['drag', 'ordering'],
    par: 4,
    hints: [
      'Heavy liquids sink, light ones float. Fancy has nothing to do with it.',
      'Each bottle shows its density in g/ml. The biggest number belongs at the bottom.',
      'Pour honey, then dish soap, then water, then olive oil.'
    ],
    wrong: ['Pouring a lighter liquid before a heavier one mixes everything (trap).', 'Dropping a bottle anywhere but the column does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Four perfect stripes. Science has never looked so much like a pudding.',
    trick: 'Denser liquids sink, so the tower only stays neat if you pour from the biggest density number to the smallest.',

    init: function () { return { poured: [] }; },

    view: function (s) {
      var objs = [
        O('poster', 2, 1, 33, 64, { kind: 'static', text: 'DENSITY 101\n(in g/ml)\nBig number: sinks.\nSmall number: floats.\nPour the bottom layer first.', label: 'Poster: density in grams per millilitre. Big number sinks, small number floats. Pour the bottom layer first.', cls: 'book-card' }),
        O('bench', 34, 47, 32, 28, { kind: 'static', art: 'table', artOpts: { tall: true } }),
        O('column', 36, 3, 28, 62, { art: 'd-column', artOpts: { layers: s.poured.map(function (k) { return LIQ[k].color; }) }, label: 'Tall column' + (s.poured.length ? ' with ' + s.poured.map(function (k) { return LIQ[k].name; }).join(', then ') : ', empty'), zone: true }),
        O('stack', 67, 4, 31, 56, { kind: 'static', text: 'TOWER\n(top first)\n' + (s.poured.length ? s.poured.slice().reverse().map(function (k) { return LIQ[k].name; }).join('\n') : '(empty)'), label: 'Tower so far: ' + (s.poured.map(function (k) { return LIQ[k].name; }).join(', ') || 'empty'), cls: 'plaque-card' })
      ];
      SHELF.forEach(function (k, i) {
        var x = 4 + i * 24;
        objs.push(O('b-' + k, x + 3, 66, 14, 22, { art: 'd-bottle', artOpts: { color: LIQ[k].color }, label: LIQ[k].name + ', density ' + LIQ[k].d.toFixed(2) + ' g/ml', drag: true, hidden: s.poured.indexOf(k) >= 0 }));
        objs.push(O('t-' + k, x - 1, 89, 22, 9, { kind: 'static', text: LIQ[k].short + ' ' + LIQ[k].d.toFixed(2), label: '', cls: 'tag-card', hidden: s.poured.indexOf(k) >= 0 }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'column') {
        api.nope();
        api.say('Tapping glassware. Very scientific. Try pouring something.', 'annoyed');
        return true;
      }
      if (a.type !== 'drop') return false;
      var m = /^b-(\w+)$/.exec(a.target);
      if (!m || !LIQ[m[1]]) return false;
      var k = m[1];
      if (a.zone !== 'column') {
        api.nope(a.target);
        api.say('The bottle goes back on the bench. The column remains empty-ish.', 'neutral');
        return true;
      }
      var below = s.poured[s.poured.length - 1];
      if (below && LIQ[k].d > LIQ[below].d) {
        api.fail('GLORP. ' + LIQ[k].name + ' is heavier than ' + LIQ[below].name.toLowerCase() + ', so it sank straight through. Beige soup. Rinse and repeat!');
        return true;
      }
      s.poured.push(k);
      if (s.poured.length === 1 && k !== 'oil') api.defy('oil');
      if (s.poured.length === 4) {
        api.complete({ line: 'Four flawless layers. The oil is on TOP. Like a… like a crown. Fine. That works.', mood: 'defeated' });
      } else api.say(['That\'s not the oil. The oil is crying.', 'Another layer. It\'s… sitting nicely. Suspiciously nicely.', 'One more. Surely THIS one is the oil.'][s.poured.length - 1], 'suspicious');
      return true;
    },

    solution: [{ drop: ['b-honey', 'column'] }, { drop: ['b-soap', 'column'] }, { drop: ['b-water', 'column'] }, { drop: ['b-oil', 'column'] }],
    checks: [
      { name: 'oil first then honey is a trap', steps: [{ drop: ['b-oil', 'column'] }, { drop: ['b-honey', 'column'] }], expect: 'fail' },
      { name: 'dropping a bottle on the floor is a nope', steps: [{ drop: ['b-water', null] }], expect: 'nope' },
      { name: 'oil first alone is still playing', steps: [{ drop: ['b-oil', 'column'] }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
