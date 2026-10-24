/* Level 181 — Breadstick Bars (Feast Fiasco)
 * Bossworth throws you in "the dungeon", which is really the castle pantry. Six bars: three are iron
 * (smooth, riveted), three are giant breadsticks (knobbly, seeded, crumbs below). Eat the two
 * neighbouring breadsticks (bars 2 and 3) to make a gap wide enough, then squeeze through.
 * Wrong: biting an iron bar (trap); calling the guard (nope, he is on holiday until spring).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BARS = ['iron', 'bread', 'bread', 'iron', 'bread', 'iron'];
  var X0 = 14, GAPX = 12;

  function gapOpen(s) { for (var i = 0; i < BARS.length - 1; i++) if (s.eaten[i] && s.eaten[i + 1]) return i; return -1; }

  OBEY.registerLevel({
    id: 'breadstick-bars',
    num: 181,
    title: 'Breadstick Bars',
    objective: 'Escape the dungeon.',
    intro: 'Welcome to my dungeon! Those bars are solid iron, every one of them. Sit tight until the guard comes back. Spring, I think. Possibly a later spring.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'count'],
    par: 3,
    hints: [
      'Look closely at the bars. Are they really all the same?',
      'Some bars are knobbly, seeded and leaving crumbs. This dungeon is a pantry. You need a gap two bars wide.',
      'Eat bar 2 and bar 3 (the neighbouring breadsticks), then squeeze through the gap.'
    ],
    wrong: ['Biting an iron bar hurts (trap).', 'Calling the guard does nothing — he is away until spring (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'You ate your way out of my dungeon. It was a pantry. I knew it was a pantry. Everyone knew.',
    trick: 'The "dungeon" was the pantry: half the bars were giant breadsticks, and eating two side by side made a gap wide enough to leave.',

    init: function () { return { eaten: [false, false, false, false, false, false] }; },

    view: function (s) {
      var g = gapOpen(s);
      var out = [
        O('sign', 4, 4, 46, 13, { kind: 'static', text: 'DUNGEON (formerly PANTRY)', label: 'Sign: dungeon, formerly pantry', cls: 'sign-card' }),
        O('shelf', 56, 10, 40, 6, { kind: 'static', art: 'h-shelf', label: '' }),
        O('jar1', 60, 2, 10, 10, { kind: 'static', art: 'h-jar', artOpts: { color: '#ff6f91' }, label: 'Jar of jam' }),
        O('jar2', 72, 2, 10, 10, { kind: 'static', art: 'h-jar', artOpts: { color: '#ffd23f' }, label: 'Jar of honey' }),
        O('jar3', 84, 2, 10, 10, { kind: 'static', art: 'h-jar', artOpts: { color: '#5fd98a' }, label: 'Jar of pickles' })
      ];
      BARS.forEach(function (t, i) {
        out.push(O('bar' + (i + 1), X0 + i * GAPX, 44, 9, 32, { art: 'h-bar', artOpts: { type: t, eaten: s.eaten[i] }, disabled: s.eaten[i], label: 'Bar ' + (i + 1) + ': ' + (s.eaten[i] ? 'eaten (just crumbs)' : (t === 'bread' ? 'knobbly golden bar with seeds and crumbs underneath' : 'smooth grey bar with rivets')) }));
        out.push(O('n' + (i + 1), X0 + i * GAPX, 78, 9, 8, { kind: 'static', text: String(i + 1), label: '', cls: 'tag-card' }));
      });
      out.push(O('squeeze', X0 + (g < 0 ? 0 : g) * GAPX - 1, 88, 22, 9, { text: 'Squeeze through', label: 'Squeeze through the gap', cls: 'btn-card big', hidden: g < 0 }));
      out.push(O('guard', 82, 22, 16, 18, { kind: 'static', text: 'Guard: back in spring', label: 'Note: guard back in spring', cls: 'tag-card' }));
      out.push(O('bell', 84, 44, 13, 16, { art: 'h-bell', label: 'Bell to call the guard' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'bell') { api.nope('bell'); api.say('Ding-a-ling. Nobody comes. It is not spring. I did tell you.', 'pleased'); return true; }
      if (a.target === 'squeeze') {
        if (gapOpen(s) < 0) return false;
        api.complete({ line: 'You squeezed out between the jam and the pickles. My dungeon has been eaten. I will be using iron next time. ALL iron.', mood: 'defeated' });
        return true;
      }
      var m = /^bar(\d)$/.exec(a.target);
      if (!m) return false;
      var i = Number(m[1]) - 1;
      if (s.eaten[i]) return true;
      if (BARS[i] === 'iron') {
        api.fail('CLANG. You bit a real iron bar. Ow. Your teeth ring like a bell. Back to the corner of the cell with you.');
        return true;
      }
      s.eaten[i] = true;
      api.defy('bars');
      if (gapOpen(s) >= 0) api.say('Crunch, crunch. Two breadsticks gone side by side. That is a gap. A PERSON-SIZED gap. Who baked my bars?!', 'panicked');
      else api.say('CRUNCH. You ate a bar. It was a breadstick. One gap is not enough to squeeze through. Stop it.', 'surprised');
      return true;
    },

    solution: [{ tap: 'bar2' }, { tap: 'bar3' }, { tap: 'squeeze' }],
    checks: [
      { name: 'bite an iron bar', steps: [{ tap: 'bar1' }], expect: 'fail' },
      { name: 'call the guard', steps: [{ tap: 'bell' }], expect: 'nope' },
      { name: 'a lone breadstick is not enough', steps: [{ tap: 'bar5' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
