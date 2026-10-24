/* Bonus 3 — The Tower (Sabotage Studio)
 * Move three discs from peg A to peg C, never putting a bigger disc on a smaller one.
 * Obey: the classic seven moves (tap a peg to lift its top disc, tap another to place it).
 * Third option: drag the "C" sign onto peg A — now the tower IS on peg C.
 * Ruin: try to put a bigger disc on a smaller one three times.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PEGS = ['pegA', 'pegB', 'pegC'];
  var X = [8, 38, 68];
  var NAMES = ['A', 'B', 'C'];

  OBEY.registerLevel({
    id: 'tower-toppler',
    num: 103,
    title: 'The Tower',
    objective: 'Get all three discs onto peg C.',
    intro: 'Move the tower to peg C. One disc at a time. Never a big disc on a small one. The PROPER way. Seven moves. I\'ll be counting.',
    introMood: 'neutral',
    actions: ['tap', 'drag'],
    par: 14,
    hints: [
      'The puzzle says "peg C". It never says which peg is C.',
      'The signs above the pegs can be moved.',
      'Drag the C sign onto the peg that already holds the tower — or do the seven moves: A→C, A→B, C→B, A→C, B→A, B→C, A→C.'
    ],
    wrong: ['A bigger disc on a smaller one is refused (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'The tower stands. Somewhere, a monk nods.',

    init: function () { return { pegs: [[3, 2, 1], [], []], sel: null, bad: 0, cAt: 2 }; },

    view: function (s) {
      var out = [];
      PEGS.forEach(function (id, i) {
        var label = 'Peg ' + NAMES[i] + (s.cAt === i && i !== 2 ? ' (now labelled C)' : '') + ', ' + (s.pegs[i].length ? s.pegs[i].length + ' disc' + (s.pegs[i].length === 1 ? '' : 's') : 'empty') + (s.sel === i ? ', disc lifted' : '');
        out.push(O(id, X[i], 30, 24, 56, { art: 'peg', label: label, zone: true, cls: s.sel === i ? 'peg-selected' : '' }));
      });
      s.pegs.forEach(function (stack, i) {
        stack.forEach(function (size, k) {
          var w = 8 + size * 5, lifted = s.sel === i && k === stack.length - 1;
          out.push(O('disc' + size, X[i] + 12 - w / 2, (lifted ? 20 : 78 - k * 8), w, 7, { kind: 'static', label: '', cls: 'disc-' + size }));
        });
      });
      out.push(O('signA', X[0] + 7, 12, 10, 9, { kind: 'static', text: s.cAt === 0 ? '' : 'A', label: '', cls: 'tag-card', hidden: s.cAt === 0 }));
      out.push(O('signB', X[1] + 7, 12, 10, 9, { kind: 'static', text: 'B', label: '', cls: 'tag-card' }));
      out.push(O('csign', X[s.cAt] + 7, 12, 10, 9, { text: 'C', label: 'Sign C (drag it onto a peg)', drag: true, cls: 'btn-card' }));
      out.push(O('count', 4, 92, 92, 7, { kind: 'static', text: 'Studio rule: the tower must end on peg C.', label: '', cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'csign') {
        var to = PEGS.indexOf(a.zone);
        if (to < 0) return false;
        if (s.pegs[to].length === 3) {
          s.cAt = to;
          api.defy('sign');
          api.complete({ line: 'You moved the SIGN. So peg A is now peg C. I hate how correct that is.', mood: 'defeated' });
          return true;
        }
        api.nope('csign');
        api.say('Relabelling an empty peg? Bold. Pointless, but bold.', 'suspicious');
        return true;
      }
      if (a.type !== 'tap') return false;
      var p = PEGS.indexOf(a.target);
      if (p < 0) return false;
      if (s.sel === null) {
        if (!s.pegs[p].length) { api.nope(a.target); api.say('That peg is empty. There is nothing to lift. Like my spirits.', 'annoyed'); return true; }
        s.sel = p;
        return true;
      }
      if (s.sel === p) { s.sel = null; return true; }
      var moving = s.pegs[s.sel][s.pegs[s.sel].length - 1];
      var top = s.pegs[p][s.pegs[p].length - 1];
      if (top !== undefined && top < moving) {
        s.bad++;
        s.sel = null;
        if (s.bad >= 3) {
          api.complete({ ruin: 'tower-toppler', line: 'CRASH. Third time you tried big-on-small, and the whole tower fell on my foot. My FOOT.', mood: 'panicked' });
          return true;
        }
        api.nope(a.target);
        api.say('Big disc on a small disc? Gravity says no. I say no. Everyone says no.', 'annoyed');
        return true;
      }
      s.pegs[p].push(s.pegs[s.sel].pop());
      s.sel = null;
      if (s.pegs[s.cAt].length === 3) {
        api.complete({ line: 'Every disc on peg C, the proper way. I\'m genuinely moved. Don\'t tell anyone.', mood: 'pleased' });
      }
      return true;
    },

    solution: [{ drop: ['csign', 'pegA'] }],
    alternatives: {
      honest: [{ tap: 'pegA' }, { tap: 'pegC' }, { tap: 'pegA' }, { tap: 'pegB' }, { tap: 'pegC' }, { tap: 'pegB' }, { tap: 'pegA' }, { tap: 'pegC' },
        { tap: 'pegB' }, { tap: 'pegA' }, { tap: 'pegB' }, { tap: 'pegC' }, { tap: 'pegA' }, { tap: 'pegC' }]
    },
    ruinPaths: { 'tower-toppler': [{ tap: 'pegA' }, { tap: 'pegB' }, { tap: 'pegA' }, { tap: 'pegB' }, { tap: 'pegA' }, { tap: 'pegC' }, { tap: 'pegA' }, { tap: 'pegC' }, { tap: 'pegA' }, { tap: 'pegC' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
