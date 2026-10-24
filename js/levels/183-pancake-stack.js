/* Level 183 — Pancake Stack (Feast Fiasco)
 * The royal breakfast rule: smallest pancake on top, biggest at the bottom. The stack arrives as
 * 4, 1, 3, 2 (top to bottom). The only tool is a spatula: slide it under any pancake and it flips that
 * pancake and everything above it. Bossworth wants biggest on top and suggests using your fingers.
 * Solution (3 flips): under 2 (→ 2,3,1,4), under 3 (→ 3,2,1,4), under 1 (→ 1,2,3,4).
 * Wrong: fingers on hot pancakes (trap); flipping only the top pancake changes nothing (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var START = [4, 1, 3, 2], Y0 = 30, ROW = 10;

  function sorted(st) { return st.join() === '1,2,3,4'; }

  OBEY.registerLevel({
    id: 'pancake-stack',
    num: 183,
    title: 'Pancake Stack',
    objective: 'Stack the pancakes by the royal breakfast rule.',
    intro: 'Royal pancakes go BIGGEST on top, so everyone can see how big they are. Forget the spatula — just rearrange them with your fingers. Quick, I am peckish.',
    introMood: 'neutral',
    actions: ['tap', 'logic', 'sequence'],
    par: 3,
    hints: [
      'The breakfast rule card beats Bossworth: smallest on top. And the spatula flips a whole chunk of the stack at once.',
      'Get the biggest pancake to the bottom first: flip it to the top, then flip the whole stack. Then do the same for the next size.',
      'Slide the spatula under pancake 2, then under pancake 3, then under pancake 1.'
    ],
    wrong: ['Grabbing hot pancakes with your fingers is a trap.', 'Flipping only the top pancake changes nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Smallest on top, biggest at the bottom. A tidy little tower. I ate it in one bite. It was perfect.',
    trick: 'A spatula flips everything above it, so you flipped each biggest-left pancake to the top and then down into place: three flips sorted the stack.',

    init: function () { return { stack: START.slice(), flips: 0 }; },

    view: function (s) {
      var out = [
        O('rule', 4, 4, 52, 22, { kind: 'static', text: 'ROYAL BREAKFAST RULE\nSmallest on top, biggest at the bottom.', label: 'Royal breakfast rule: smallest on top, biggest at the bottom.', cls: 'book-card' }),
        O('tip', 60, 4, 36, 22, { kind: 'static', text: 'Spatula flips the pancake you pick AND all above it.', label: 'Tip: the spatula flips the pancake you pick and every pancake above it.', cls: 'tag-card' }),
        O('table', 14, 72, 72, 12, { kind: 'static', art: 'table', label: '' }),
        O('plate', 16, 68, 68, 6, { kind: 'static', art: 'h-plate', label: '' }),
        O('flips', 76, 46, 20, 12, { kind: 'static', text: 'Flips: ' + s.flips, label: 'Flips so far: ' + s.flips, cls: 'tag-card' })
      ];
      s.stack.forEach(function (n, i) {
        var where = i === 0 ? 'on top' : (i === 3 ? 'at the bottom' : (i + 1) + ' from the top');
        out.push(O('p' + n, 16, Y0 + i * ROW, 58, ROW, { art: 'h-pancake', artOpts: { n: n }, label: 'Pancake ' + n + ', ' + where + ' (slide the spatula under it)' }));
      });
      out.push(O('fingers', 4, 86, 40, 11, { text: 'Use your fingers', label: 'Rearrange the pancakes with your fingers', cls: 'btn-card accent' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'fingers') {
        api.fail('OW! HOT! You juggle a pancake, drop the lot, and the royal cook makes a fresh stack. Spatulas exist for a reason.');
        return true;
      }
      var m = /^p([1-4])$/.exec(a.target);
      if (!m) return false;
      var i = s.stack.indexOf(Number(m[1]));
      if (i === 0) {
        api.nope(a.target);
        api.say('You flipped just the top pancake. It landed… exactly where it was. Riveting cookery.', 'pleased');
        return true;
      }
      s.stack = s.stack.slice(0, i + 1).reverse().concat(s.stack.slice(i + 1));
      s.flips++;
      if (sorted(s.stack)) {
        api.defy('biggest');
        api.complete({ line: 'Smallest on top. Biggest at the bottom. Not my way. The cook is weeping with joy. I am weeping for other reasons.', mood: 'defeated' });
        return true;
      }
      api.say(s.stack[0] === 4 ? 'Biggest on top! Yes! Leave it there! …Why are you sliding the spatula under the whole stack?' : 'Flip. The stack is now ' + s.stack.join(', ') + ', top to bottom. Hungry yet?', s.stack[0] === 4 ? 'pleased' : 'suspicious');
      return true;
    },

    solution: [{ tap: 'p2' }, { tap: 'p3' }, { tap: 'p1' }],
    checks: [
      { name: 'use your fingers', steps: [{ tap: 'fingers' }], expect: 'fail' },
      { name: 'flip only the top pancake', steps: [{ tap: 'p4' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
