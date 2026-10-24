/* Level 204 — Packed Like Sardines (Mackerel Market)
 * The tinning counter. Four sardines lie in an open tin, all head up. Bossworth: all facing the same
 * way, like a marching band, then squash the lid down. The tin's label shows how they really go:
 * head, tail, head, tail. Flip sardine 2 and 4 (or 1 and 3), then close the lid.
 * Wrong: closing with two heads side by side (trap: the lid pops), Squash harder (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  function alternating(d) { for (var i = 1; i < d.length; i++) if (d[i] === d[i - 1]) return false; return true; }

  OBEY.registerLevel({
    id: 'packed-like-sardines',
    num: 204,
    title: 'Packed Like Sardines',
    objective: 'Get the lid on the sardine tin.',
    intro: 'Sardines go in all facing the same way, like a marching band. Very smart. Then close the lid, and if it sticks, squash harder!',
    introMood: 'pleased',
    actions: ['tap', 'observe', 'logic'],
    par: 3,
    hints: [
      'The tin has a label. It\'s a picture of how they go in.',
      'Fat heads side by side take up too much room. Heads and tails take turns on the label.',
      'Flip sardines 2 and 4 so they go head, tail, head, tail. Then close the lid.'
    ],
    wrong: ['Closing the lid with two heads side by side pops it off (trap).', 'Squashing harder only bends the lid (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Lid on, first try. Head, tail, head, tail. The sardines look smug about it. They\'ve done this before.',
    trick: 'A sardine\'s head is wider than its tail, so packing them head to tail, like the picture on the label, made them fit.',

    init: function () { return { down: [false, false, false, false], bent: 0 }; },

    view: function (s) {
      var out = [
        O('sign', 4, 4, 52, 14, { kind: 'static', text: 'SARDINE TINNING COUNTER', label: 'Sign: sardine tinning counter', cls: 'plaque-card' }),
        O('label', 66, 3, 30, 20, { kind: 'static', art: 'i-tinlabel', label: 'The tin\'s label: a picture of four sardines going head, tail, head, tail' }),
        O('labeltag', 66, 24, 30, 8, { kind: 'static', text: 'Tin label', label: '', cls: 'tag-card' }),
        O('table', 4, 62, 92, 14, { kind: 'static', art: 'table', label: '' }),
        O('tin', 8, 36.5, 84, 28, { kind: 'static', art: 'i-tin', label: 'An open sardine tin' })
      ];
      s.down.forEach(function (d, i) {
        out.push(O('f' + (i + 1), 16 + i * 17.5, 36.5, 16, 28, { art: 'i-sardine', artOpts: { down: d }, label: 'Sardine ' + (i + 1) + ', head ' + (d ? 'down' : 'up') + ' (tap to flip)' }));
      });
      out.push(O('squash', 4, 80, 44, 14, { text: 'Squash harder', label: 'Squash the lid down harder', cls: 'btn-card big accent' }));
      out.push(O('close', 52, 80, 44, 14, { text: 'Close the lid', label: 'Close the lid', cls: 'btn-card big' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^f([1-4])$/.exec(a.target);
      if (m) {
        var i = Number(m[1]) - 1;
        s.down[i] = !s.down[i];
        api.say(s.down[i] ? 'You turned one upside down? It\'s out of step! The band will fall apart!' : 'Back in step. Good sardine.', s.down[i] ? 'annoyed' : 'pleased');
        return true;
      }
      if (a.target === 'squash') {
        api.nope();
        s.bent++;
        api.say('SQUASH! The lid bends. The sardines don\'t. Fish are tougher than tin, apparently.', 'annoyed');
        return true;
      }
      if (a.target === 'close') {
        if (!alternating(s.down)) {
          api.fail('CLANG! Two fat heads side by side, and the lid pops off. Sardines everywhere. A seagull says thank you. Look at the label!');
          return true;
        }
        api.defy('marching-band');
        api.complete({ line: 'Click. The lid shuts like a dream. Head, tail, head, tail. That\'s not a marching band, that\'s a conga line. I\'ll allow it.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ tap: 'f2' }, { tap: 'f4' }, { tap: 'close' }],
    alternatives: { 'odd-ones': [{ tap: 'f1' }, { tap: 'f3' }, { tap: 'close' }] },
    checks: [
      { name: 'all the same way is a trap', steps: [{ tap: 'close' }], expect: 'fail' },
      { name: 'squashing is a nope', steps: [{ tap: 'squash' }], expect: 'nope' },
      { name: 'flipping only one is a trap', steps: [{ tap: 'f2' }, { tap: 'close' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
