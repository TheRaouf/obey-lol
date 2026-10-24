/* Level 179 — Knight Moves (Royal Rumpus)
 * Bossworth's chess-floor hall. The rule plaque: visitors move like a knight (two squares one way,
 * one to the side). You start on b1; the exit door is on d4; a snoozing guard occupies c2.
 * Bossworth says to walk straight up the middle. Shortest route: b1 → d2 → b3 → d4.
 * Wrong: any non-knight step (nope); landing on the guard's square (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FILES = 'abcd', X0 = 22, Y0 = 20, T = 14;
  var START = [1, 0], GUARD = [2, 1], DOOR = [3, 3];

  function name(c, r) { return FILES[c] + (r + 1); }
  function same(a, b) { return a[0] === b[0] && a[1] === b[1]; }

  OBEY.registerLevel({
    id: 'knight-moves',
    num: 179,
    title: 'Knight Moves',
    objective: 'Cross the chess hall to the door.',
    intro: 'My royal chess hall! Just walk straight up the middle to the door, one square at a time, like a normal person. Ignore the plaque. Plaques are for peasants.',
    introMood: 'neutral',
    actions: ['tap', 'logic'],
    par: 3,
    hints: [
      'The plaque says how visitors are allowed to move in this hall.',
      'A knight moves two squares in a straight line, then one to the side. The door is two knight-moves away from a square you can reach.',
      'Hop to d2, then b3, then the door on d4.'
    ],
    wrong: ['A normal step onto a neighbouring square is refused (nope).', 'You cannot land on the snoozing guard (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three L-shaped hops and out. You moved like a knight. I moved like a king: not at all.',
    trick: 'The hall only allowed knight moves — two squares then one to the side — so the door was three hops away, not one straight walk.',

    init: function () { return { at: START.slice(), hops: 0 }; },

    view: function (s) {
      var out = [
        O('floor', 0, 0, 100, 100, { kind: 'static', art: 'h-flagstones', label: '' }),
        O('plaque', 4, 3, 92, 14, { kind: 'static', text: 'VISITORS MOVE LIKE A KNIGHT: two squares, then one to the side', label: 'Plaque: visitors move like a knight, two squares in a line then one to the side', cls: 'plaque-card' })
      ];
      for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
          var here = [c, r], occ = '', desc = '';
          if (same(here, s.at)) { occ = 'you'; desc = ' (you are here)'; }
          else if (same(here, GUARD)) { occ = 'guard'; desc = ' (a guard is snoozing here)'; }
          else if (same(here, DOOR)) { occ = 'door'; desc = ' (the exit door)'; }
          out.push(O('t' + name(c, r), X0 + c * T, Y0 + (3 - r) * T, T, T, { art: 'h-chesstile', artOpts: { dark: (c + r) % 2 === 0, occ: occ }, label: 'Square ' + name(c, r) + desc }));
        }
      }
      for (var i = 0; i < 4; i++) {
        out.push(O('fl' + i, X0 + i * T, Y0 + 4 * T + 1, T, 8, { kind: 'static', text: FILES[i], label: '', cls: 'tag-card' }));
        out.push(O('rk' + i, X0 - 10, Y0 + (3 - i) * T + 3, 9, 8, { kind: 'static', text: String(i + 1), label: '', cls: 'tag-card' }));
      }
      out.push(O('hops', 80, 46, 17, 13, { kind: 'static', text: 'Hops: ' + s.hops, label: 'Hops so far: ' + s.hops, cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap' || a.target[0] !== 't') return false;
      var c = FILES.indexOf(a.target[1]), r = Number(a.target[2]) - 1;
      if (c < 0 || !(r >= 0 && r < 4)) return false;
      var dc = Math.abs(c - s.at[0]), dr = Math.abs(r - s.at[1]);
      if (dc === 0 && dr === 0) { api.say('You are already standing there. Very firmly.', 'neutral'); return true; }
      if (!((dc === 1 && dr === 2) || (dc === 2 && dr === 1))) {
        api.nope(a.target);
        api.say('BZZT. The tile refuses. "Knight moves only, please." Well, I said walk normally. The floor disagrees with me. Rude floor.', 'annoyed');
        return true;
      }
      if (c === GUARD[0] && r === GUARD[1]) {
        api.nope(a.target);
        api.say('There is a snoozing guard on that square. You cannot land on a guard. Not even a sleepy one.', 'pleased');
        return true;
      }
      s.at = [c, r]; s.hops++;
      api.defy('straight');
      if (c === DOOR[0] && r === DOOR[1]) {
        api.complete({ line: 'Hop, hop, hop, out. You crossed my hall in L-shapes. I walked it in a straight line once and the floor sent me home.', mood: 'defeated' });
        return true;
      }
      api.say(s.hops === 1 ? 'An L-shaped hop. Showing off, are we.' : 'Another hop. The floor seems to LIKE you.', 'suspicious');
      return true;
    },

    solution: [{ tap: 'td2' }, { tap: 'tb3' }, { tap: 'td4' }],
    checks: [
      { name: 'walk straight up like Bossworth says', steps: [{ tap: 'tb2' }], expect: 'nope' },
      { name: 'land on the guard', steps: [{ tap: 'ta3' }, { tap: 'tc2' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
