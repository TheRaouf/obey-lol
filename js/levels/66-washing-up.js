/* Level 66 — Washing Up
 * "Start with the gravy pan — get the worst over with!" The kitchen rule says cleanest first, so the water
 * stays clean. Grime is visible: glass (spotless) → mug (one smudge) → plate (three splodges) → pan (gunk).
 * Tap them in that order. Wrong: washing anything dirtier first turns the water to gravy (trap); re-washing
 * a clean item (nope). Ruin: tip the WHOLE bottle of washing-up liquid into the sink (bubble-avalanche).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DISHES = [
    { id: 'pan', kind: 'pan', grime: 3, x: 4, name: 'gravy pan', desc: 'Gravy pan, thick with gunk' },
    { id: 'glass', kind: 'glass', grime: 0, x: 28, name: 'glass', desc: 'Glass, nearly spotless' },
    { id: 'plate', kind: 'plate', grime: 2, x: 52, name: 'plate', desc: 'Plate with three splodges' },
    { id: 'mug', kind: 'mug', grime: 1, x: 76, name: 'mug', desc: 'Mug with one smudge' }
  ];

  OBEY.registerLevel({
    id: 'washing-up',
    num: 66,
    title: 'Washing Up',
    objective: 'Wash all four things without ruining the water.',
    intro: 'Washing up! Start with the gravy pan. Get the worst over with! The water will be fine. Water is very forgiving. Unlike me.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'observe', 'sequence'],
    par: 4,
    hints: [
      'Read the kitchen rule above the dishes.',
      'Cleanest first: count the dirty marks on each item.',
      'Tap the glass, then the mug, then the plate, then the gravy pan.'
    ],
    wrong: ['Washing something dirtier before something cleaner turns the water to gravy (trap).', 'Re-washing a clean item is pointless (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Four sparkling things and water you could almost drink. Please don\'t.',
    trick: 'The kitchen rule beat Bossworth\'s "worst first": cleanest first keeps the water clean to the end.',

    init: function () { return { clean: {} }; },

    view: function (s) {
      var n = Object.keys(s.clean).length;
      var objs = [
        O('counter', 4, 42, 92, 18, { kind: 'static', art: 'table' }),
        O('rule', 4, 3, 92, 13, { kind: 'static', text: 'Kitchen rule: wash the CLEANEST thing first, so the water stays clean for the rest.', label: 'Kitchen rule: wash the cleanest thing first so the water stays clean', cls: 'honest-card' })
      ];
      DISHES.forEach(function (d) {
        var c = !!s.clean[d.id];
        objs.push(O(d.id, d.x, 24, 20, 28, { art: 'b-dish', artOpts: { kind: d.kind, grime: d.grime, clean: c }, label: c ? 'The ' + d.name + ', sparkling clean' : d.desc + ' (tap to wash it)' }));
      });
      objs.push(O('sink', 4, 52, 64, 34, { art: 'b-sink', artOpts: { water: 'clean' }, zone: true, free: true, label: 'Sink of warm soapy water' }));
      objs.push(O('soap', 76, 52, 18, 29, { art: 'b-soap', drag: true, label: 'Washing-up liquid, the whole bottle (drag it)' }));
      objs.push(O('soaptag', 72, 82, 26, 13, { kind: 'static', text: 'One squirt is plenty!', label: 'Bottle label: one squirt is plenty', cls: 'tag-card' }));
      objs.push(O('count', 4, 88, 64, 9, { kind: 'static', text: 'Washed: ' + n + ' of 4', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'soap') {
        if (a.zone !== 'sink') return true;
        api.complete({ ruin: 'bubble-avalanche', line: 'The WHOLE bottle?! FOAM! Foam everywhere! It\'s up to my eyebrows! The kitchen is a cloud! I can\'t find the floor! I can\'t find MYSELF!', mood: 'panicked' });
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'sink') { api.say('Lovely clean water. Pop the pan in! It\'ll be fine! Water forgives!', 'pleased'); return true; }
      var d = DISHES.filter(function (x) { return x.id === a.target; })[0];
      if (!d) return false;
      if (s.clean[d.id]) { api.nope(); api.say('It\'s already sparkling. You can\'t wash it cleaner. That\'s not how clean works.', 'neutral'); return true; }
      var min = Math.min.apply(null, DISHES.filter(function (x) { return !s.clean[x.id]; }).map(function (x) { return x.grime; }));
      if (d.grime > min) {
        api.fail(d.id === 'pan' ? 'In goes the gravy pan… and the whole sink turns into brown soup. Now the glass will taste of gravy forever. New water!' : 'You washed the ' + d.name + ' too early. The water goes murky and everything after it comes out smeary. New water!');
        return true;
      }
      s.clean[d.id] = true;
      if (Object.keys(s.clean).length === DISHES.length) {
        api.defy('pan');
        api.complete({ line: 'Pan last, and the water\'s still clear? So the rule on the wall was RIGHT? Who wrote that rule? …The owners. Hmph.', mood: 'defeated' });
      } else api.say(['The glass? That was already clean! Waste of water! …Fine.', 'The mug. Coward. Do the pan!', 'Plate done. Now, finally, my beloved pan.'][Object.keys(s.clean).length - 1], 'annoyed');
      return true;
    },

    solution: [{ tap: 'glass' }, { tap: 'mug' }, { tap: 'plate' }, { tap: 'pan' }],
    checks: [
      { name: 'pan first', steps: [{ tap: 'pan' }], expect: 'fail' },
      { name: 'plate before mug', steps: [{ tap: 'glass' }, { tap: 'plate' }], expect: 'fail' },
      { name: 'rewash the glass', steps: [{ tap: 'glass' }, { tap: 'glass' }], expect: 'nope' }
    ],
    ruinPaths: { 'bubble-avalanche': [{ drop: ['soap', 'sink'] }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
