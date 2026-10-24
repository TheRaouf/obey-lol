/* Level 136 — Toy Inside (Aisle Antics)
 * Three identical 500 g cereal boxes; one hides a free toy, so it weighs a little more. The aisle has a
 * balance scale: weigh any two boxes once. Heavier side = toy; balanced = the third box (C).
 * Buying a box without the toy: trap. Opening boxes in the shop: trap. A taken pan: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BOXES = ['A', 'B', 'C'], TOY = 'C', HOME = { A: 5, B: 17, C: 29 };
  var COL = { A: '#ffd23f', B: '#5fd98a', C: '#7fb2ff' };
  function weight(b) { return b === TOY ? 520 : 500; }

  OBEY.registerLevel({
    id: 'toy-inside',
    num: 136,
    title: 'Toy Inside',
    objective: 'Buy the cereal box with the free toy in it.',
    intro: 'Free toy in one of these boxes! It\'s box A. I can feel it. I have a gift for toys. Don\'t weigh anything, scales are for vegetables and people with doubts.',
    introMood: 'suspicious',
    actions: ['drag', 'tap', 'logic'],
    par: 3,
    hints: [
      'The boxes look the same, but a toy weighs something.',
      'Put one box on each pan of the scale. The heavier side sinks. If they balance, think about the box you didn\'t weigh.',
      'Weigh A against B: they balance, so the toy is in C. Buy box C.'
    ],
    wrong: ['Buying a box without the toy (trap).', 'Opening boxes in the aisle (trap).', 'A pan that already holds a box (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One box, one toy, one weighing.',
    trick: 'A toy adds weight, so a single weighing on the balance found it: when two boxes balance, the toy is in the third.',

    init: function () { return { at: { A: 'home', B: 'home', C: 'home' } }; },

    view: function (s) {
      var on = function (side) { return BOXES.filter(function (b) { return s.at[b] === side; })[0]; };
      var L = on('L'), R = on('R');
      var wl = L ? weight(L) : 0, wr = R ? weight(R) : 0;
      var tilt = wr > wl ? 1 : (wl > wr ? -1 : 0);
      var read = !L && !R ? 'Scale: empty' : (tilt === 0 ? 'Scale: balanced' : (tilt < 0 ? 'Left pan is heavier' : 'Right pan is heavier'));
      var out = [
        O('sign', 4, 3, 58, 10, { kind: 'static', text: 'FREE TOY in 1 box!', label: 'Sign: a free toy in one of the three boxes', cls: 'sign-card' }),
        O('net', 64, 3, 32, 10, { kind: 'static', text: 'Each box: 500 g', label: 'Every box holds 500 grams of cereal', cls: 'tag-card' }),
        O('shelf', 4, 32.5, 37, 7.4, { kind: 'static', art: 'shelf', label: '' }),
        O('home', 3, 15, 39, 19, { kind: 'zone', zone: true, label: 'Back on the shelf' }),
        O('desk', 36, 64, 60, 22, { kind: 'static', art: 'f-counter', label: '' }),
        O('scale', 42, 43, 48, 24, { kind: 'static', art: 'scale', artOpts: { tilt: tilt }, label: 'Balance scale. ' + read + '.' }),
        O('panL', 37, 34, 24, 24, { kind: 'zone', zone: true, label: 'Left pan of the scale' }),
        O('panR', 70, 34, 24, 24, { kind: 'zone', zone: true, label: 'Right pan of the scale' }),
        O('read', 40, 88, 52, 9, { kind: 'static', text: read, label: read, cls: 'tag-card' }),
        O('open', 4, 44, 30, 11, { text: 'Open them all', label: 'Open every box to look inside', cls: 'btn-card accent' })
      ];
      BOXES.forEach(function (b, i) {
        var where = s.at[b], x = HOME[b], y = 17.4;
        if (where === 'L') { x = 43.9; y = 39.9 + tilt * 2; }
        if (where === 'R') { x = 77.1; y = 39.9 - tilt * 2; }
        out.push(O('box' + b, x, y, 11, 15.6, { art: 'f-cereal', artOpts: { letter: b, color: COL[b] }, label: 'Cereal box ' + b + (where === 'home' ? ', on the shelf' : ', on the ' + (where === 'L' ? 'left' : 'right') + ' pan'), drag: true }));
        out.push(O('buy' + b, 4, 58 + i * 13, 30, 11, { text: 'Buy box ' + b, label: 'Buy cereal box ' + b, cls: 'btn-card big' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        var m = /^box([ABC])$/.exec(a.target);
        if (!m) return false;
        var b = m[1], to = a.zone === 'panL' ? 'L' : (a.zone === 'panR' ? 'R' : (a.zone === 'home' ? 'home' : null));
        if (!to) return false;
        if (to !== 'home' && BOXES.some(function (x) { return x !== b && s.at[x] === to; })) {
          api.nope(a.target);
          api.say('That pan already has a box. One box per pan. Even I know that, and I don\'t believe in scales.', 'annoyed');
          return true;
        }
        s.at[b] = to;
        var L = BOXES.filter(function (x) { return s.at[x] === 'L'; })[0], R = BOXES.filter(function (x) { return s.at[x] === 'R'; })[0];
        if (L && R) {
          if (weight(L) === weight(R)) api.say('Balanced. See? No toy in either. Scales are useless. …Unless that tells you something about the other box. Which it doesn\'t.', 'suspicious');
          else api.say('One side sank. Probably a heavy cornflake. Ignore it.', 'panicked');
        } else if (to !== 'home') api.say('A box on a scale. Thrilling. Now buy A.', 'neutral');
        return true;
      }
      if (a.type !== 'tap') return false;
      var buy = /^buy([ABC])$/.exec(a.target);
      if (buy) {
        if (buy[1] === TOY) {
          api.defy('toy');
          api.complete({ line: 'Box C. With a toy. A tiny plastic … me? It\'s a tiny plastic Bossworth! I take back everything I said about scales.', mood: 'surprised' });
        } else {
          api.fail('Box ' + buy[1] + ' at the till, opened in the car park: cornflakes, cornflakes, and more cornflakes. No toy. Bossworth wails all the way back to the aisle.');
        }
        return true;
      }
      if (a.target === 'open') {
        api.fail('RRRIP. You opened all three boxes in the aisle. A manager arrives. "You open it, you buy it." Bossworth hides behind the beans.');
        return true;
      }
      return false;
    },

    solution: [{ drop: ['boxA', 'panL'] }, { drop: ['boxB', 'panR'] }, { tap: 'buyC' }],
    alternatives: { 'a-against-c': [{ drop: ['boxA', 'panL'] }, { drop: ['boxC', 'panR'] }, { tap: 'buyC' }] },
    checks: [
      { name: 'Bossworth\'s box A', steps: [{ tap: 'buyA' }], expect: 'fail' },
      { name: 'opening the boxes', steps: [{ tap: 'open' }], expect: 'fail' },
      { name: 'a full pan', steps: [{ drop: ['boxA', 'panL'] }, { drop: ['boxB', 'panL'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
