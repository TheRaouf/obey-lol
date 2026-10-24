/* Level 39 — Whiteboard Wipe
 * The door code is on the whiteboard for a few seconds, then the cleaner wipes it. Bossworth "remembers" it
 * wrongly (● ▲ ■ ▲ — a trap). The real code is ▲ ● ■ ▲. Forgot? The cleaner's "before" photo shows the board
 * again for a moment (costs one action). The shape pad only wakes once the board is clean.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CODE = ['▲', '●', '■', '▲'];
  var LIE = ['●', '▲', '■', '▲'];
  var SHAPES = [{ id: 'tri', s: '▲', cls: 'green', name: 'triangle' }, { id: 'circ', s: '●', cls: 'purple', name: 'circle' }, { id: 'sq', s: '■', cls: 'orange', name: 'square' }];
  var SHOW_MS = 4000, PEEK_MS = 2500;

  OBEY.registerLevel({
    id: 'whiteboard-wipe',
    num: 39,
    title: 'Whiteboard Wipe',
    objective: 'Enter the door code from the whiteboard.',
    intro: 'The door code\'s on the whiteboard. Don\'t bother memorising it. I have a photographic memory. Well. Photo-ish. Photo-adjacent.',
    introMood: 'neutral',
    actions: ['memory', 'tap', 'wait'],
    par: 4,
    hints: [
      'Memorise the board before the cleaner gets to it. Bossworth\'s memory is decorative.',
      'Forgot it? The cleaner\'s "before" photo shows the board again.',
      'The code is triangle, circle, square, triangle.'
    ],
    wrong: ['Entering Bossworth\'s remembered code sets off the alarm (trap).', 'Any other wrong code is rejected (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Code accepted. My photographic memory is being sent for repairs.',
    trick: 'Bossworth\'s "photographic memory" swapped two shapes — your own memory (or the photo) was the real record.',

    init: function () { return { wiped: false, peek: false, entry: [] }; },

    onStart: function (s, api) {
      api.after(SHOW_MS, function () {
        s.wiped = true;
        api.say('Cleaner: "Squeaky clean!" …Right, the code. I remember it perfectly: circle, triangle, square, triangle. Definitely. Probably.', 'pleased');
      });
    },

    view: function (s) {
      var visible = !s.wiped || s.peek;
      var objs = [
        O('board', 4, 4, 60, 32, { kind: 'static', text: '', label: '', cls: 'book-card' }),
        O('boardtitle', 8, 6, 52, 8, { kind: 'static', text: visible ? 'DOOR CODE' : 'squeaky clean ✨', label: '', cls: 'tag-card' }),
        O('code', 8, 16, 52, 18, { kind: 'static', text: visible ? CODE.join(' ') : '', label: visible ? 'Whiteboard: door code triangle, circle, square, triangle' : 'Whiteboard, wiped clean', cls: 'shape-btn' }),
        O('photo', 70, 6, 26, 22, { text: '📷\nCleaner\'s\n"before" photo', label: 'The cleaner\'s before photo of the whiteboard', cls: 'btn-card', hidden: !s.wiped }),
        O('bucket', 84, 80, 12, 12, { kind: 'static', art: 'bucket', label: 'Cleaner\'s bucket' }),
        O('entry', 4, 40, 60, 12, { kind: 'static', text: s.wiped ? (s.entry.length ? s.entry.join(' ') : 'enter code') : 'pad asleep…', label: 'Code entry: ' + (s.entry.join(' ') || 'empty'), cls: 'display-card' }),
        O('door', 66, 56, 18, 36, { kind: 'static', art: 'door', artOpts: { sign: 'CODE', small: true }, label: 'Door with a shape lock' })
      ];
      SHAPES.forEach(function (sh, i) {
        objs.push(O(sh.id, 4 + i * 21, 58, 18, 18, { text: sh.s, label: 'Shape button: ' + sh.name, cls: 'shape-btn ' + sh.cls, disabled: !s.wiped }));
      });
      objs.push(O('clear', 4, 82, 60, 11, { text: 'Clear', label: 'Clear the code', cls: 'btn-card ghost', free: true, disabled: !s.wiped }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'clear') { s.entry = []; return true; }
      if (a.target === 'photo') {
        if (s.peek) return true;
        s.peek = true;
        api.say('A photo of the board? Cheating! That\'s… that\'s just remembering with extra steps.', 'annoyed');
        api.after(PEEK_MS, function () { s.peek = false; });
        return true;
      }
      var sh = SHAPES.filter(function (x) { return x.id === a.target; })[0];
      if (!sh) return false;
      s.entry.push(sh.s);
      if (s.entry.length < CODE.length) return true;
      var said = s.entry.join(' ');
      s.entry = [];
      if (said === CODE.join(' ')) {
        api.defy('code');
        api.complete({ line: 'Triangle, circle… so I swapped two. Two out of four is fifty percent. That\'s a pass in MY school.', mood: 'defeated' });
      } else if (said === LIE.join(' ')) {
        api.fail('WEE-OO! That was my version. The door disagrees with my memory. Rudely. The cleaner rewrites the board for you.');
      } else {
        api.nope(a.target);
        api.say('"' + said + '"? Bzzt. Wrong code. And it wasn\'t even MY wrong code.', 'pleased');
      }
      return true;
    },

    solution: [{ wait: 4500 }, { tap: 'tri' }, { tap: 'circ' }, { tap: 'sq' }, { tap: 'tri' }],
    alternatives: { photo: [{ wait: 4500 }, { tap: 'photo' }, { wait: 3000 }, { tap: 'tri' }, { tap: 'circ' }, { tap: 'sq' }, { tap: 'tri' }] },
    checks: [
      { name: 'trust Bossworth\'s memory', steps: [{ wait: 4500 }, { tap: 'circ' }, { tap: 'tri' }, { tap: 'sq' }, { tap: 'tri' }], expect: 'fail' },
      { name: 'random code', steps: [{ wait: 4500 }, { tap: 'sq' }, { tap: 'sq' }, { tap: 'sq' }, { tap: 'sq' }], expect: 'nope' },
      { name: 'pad asleep before the wipe', steps: [{ tap: 'tri' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
