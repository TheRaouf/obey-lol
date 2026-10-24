/* Level 28 — Swamp Stones
 * Cross the swamp one column at a time. Stones with bubbles are sinking; Bossworth calls them
 * "jacuzzis". Safe path: bottom, top, top, bottom. Each stone has a text label, so bubbles are
 * never conveyed by image alone. Jumping more than one column: nope. Sinking stone: trap.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // SAFE[col] = which row is safe ('t' or 'b').
  var SAFE = ['b', 't', 't', 'b'];

  OBEY.registerLevel({
    id: 'swamp-stones',
    num: 28,
    title: 'Swamp Stones',
    objective: 'Cross the swamp to the far bank.',
    intro: 'Hop across on the bubbly stones! They\'re jacuzzis. Very relaxing. The flat dry ones are… boring.',
    introMood: 'pleased',
    actions: ['tap', 'observe', 'sequence'],
    par: 4,
    hints: [
      'Bubbles in a swamp usually mean something is sinking.',
      'Step only on stones without bubbles, one column at a time.',
      'Tap: bottom stone, top stone, top stone, bottom stone.'
    ],
    wrong: ['Bubbly stones sink (trap).', 'You can only hop to the next column.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Dry feet. Damp narrator.',

    init: function () { return { col: -1, row: 'b' }; },

    view: function (s) {
      var objs = [
        O('swamp', 0, 30, 100, 50, { kind: 'static', art: 'swamp' }),
        O('bankL', 0, 30, 10, 50, { kind: 'static', art: 'bank', label: 'Near bank' }),
        O('bankR', 90, 30, 10, 50, { kind: 'static', art: 'bank', label: 'Far bank' })
      ];
      for (var c = 0; c < 4; c++) {
        ['t', 'b'].forEach(function (r) {
          var bubbly = SAFE[c] !== r;
          objs.push(O('s' + (c + 1) + r, 12 + c * 20, r === 't' ? 34 : 56, 16, 18, { art: 'stone', artOpts: { bubbly: bubbly }, label: 'Stone, column ' + (c + 1) + ', ' + (r === 't' ? 'top' : 'bottom') + (bubbly ? ', bubbling' : ', flat and dry') }));
        });
      }
      var hx = s.col < 0 ? 1 : 14 + s.col * 20, hy = s.col < 0 ? 40 : (s.row === 't' ? 24 : 46);
      objs.push(O('hero', hx, hy, 10, 14, { kind: 'static', art: 'hero', label: s.col < 0 ? 'You are on the near bank' : 'You are on column ' + (s.col + 1) + ', ' + (s.row === 't' ? 'top' : 'bottom'), cls: 'hero-sprite' }));
      objs.push(O('legend', 6, 84, 88, 10, { kind: 'static', text: 'Bubbles mean "jacuzzi" (Bossworth) or "sinking" (science).', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      var m = a.type === 'tap' && /^s([1-4])([tb])$/.exec(a.target);
      if (!m) return false;
      var col = Number(m[1]) - 1, row = m[2];
      if (col !== s.col + 1) { api.nope(); api.say(col <= s.col ? 'That\'s behind you. Onwards!' : 'Too far to jump! One stone at a time.', 'pleased'); return true; }
      if (SAFE[col] !== row) {
        api.fail('SPLOOSH! The "jacuzzi" was a sinking stone. You are now part of the swamp. Back to the bank!');
        return true;
      }
      s.col = col; s.row = row;
      if (col === 3) api.complete({ line: 'Across without a single bubble bath. You ignored my spa recommendations. Rude. Correct.', mood: 'defeated' });
      else api.say(['Boring dry stone. Try a bubbly one next!', 'Still dry. How dull.', 'One more! Go bubbly! Live a little!'][col], 'annoyed');
      return true;
    },

    solution: [{ tap: 's1b' }, { tap: 's2t' }, { tap: 's3t' }, { tap: 's4b' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
