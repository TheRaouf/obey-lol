/* Level 227 — Broadside (Checkmate Chalet)
 * A 5×5 sea battle. Bossworth's last ship is 3 squares long and straight. The squares already fired at
 * (misses, •) leave only ONE straight run of three untouched squares: B2, C2, D2.
 * Bossworth: "It's NOT in row 2. Fire at E5!" A miss is a nope; the third miss is a trap.
 * Solution: fire at B2, C2, D2 (any order).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var COLS = 'ABCDE';
  // Squares already missed before the level starts.
  var MISSED = ['A1', 'B1', 'C1', 'D1', 'A2', 'E2', 'A3', 'B3', 'C3', 'E3', 'B4', 'D4', 'E4', 'B5', 'D5'];
  var SHIP = ['B2', 'C2', 'D2'];
  var SPARE = 3;

  OBEY.registerLevel({
    id: 'broadside',
    num: 227,
    title: 'Broadside',
    objective: 'Sink Bossworth\'s last ship.',
    intro: 'Sea battle! My last ship is hidden somewhere. It is definitely NOT in row 2. Fire at E5, the lovely corner. Trust me. I\'m an admiral now.',
    introMood: 'neutral',
    actions: ['tap', 'logic'],
    par: 3,
    hints: [
      'The ship is three squares in a straight line, and it can\'t sit on a square that was already a miss.',
      'Check every row and column for three untouched squares in a row. There is only one place.',
      'Fire at B2, C2 and D2.'
    ],
    wrong: ['A shot into empty sea is a miss (nope).', 'The third miss uses up your spare shells (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three hits, one sinking, one admiral demoted.',
    trick: 'The old misses left exactly one straight run of three open squares, so the ship had to be in row 2, whatever the admiral said.',

    init: function () { return { shots: {}, misses: 0, hits: 0 }; },

    view: function (s) {
      var out = [];
      for (var c = 0; c < 5; c++) out.push(O('col' + c, 16 + c * 16, 2, 15, 7, { kind: 'static', text: COLS[c], label: '', cls: 'tag-card' }));
      for (var r = 0; r < 5; r++) {
        var y = 11 + r * 12.4;
        out.push(O('row' + r, 4, y, 10, 11.4, { kind: 'static', text: String(r + 1), label: '', cls: 'tag-card' }));
        for (var c2 = 0; c2 < 5; c2++) {
          var id = COLS[c2] + (r + 1), x = 16 + c2 * 16;
          var old = MISSED.indexOf(id) >= 0, shot = s.shots[id];
          if (old || shot === 'miss') out.push(O(id, x, y, 15, 11.4, { kind: 'static', text: '•', label: 'Square ' + id + ': miss', cls: 'tag-card' }));
          else if (shot === 'hit') out.push(O(id, x, y, 15, 11.4, { kind: 'static', text: 'HIT', label: 'Square ' + id + ': hit', cls: 'display-card ready' }));
          else out.push(O(id, x, y, 15, 11.4, { text: '', label: 'Square ' + id + ': not fired at yet', cls: 'btn-card' }));
        }
      }
      out.push(O('rule', 4, 75, 92, 12, { kind: 'static', text: 'Last ship: 3 squares in a straight line. • = already missed.', label: 'Bossworth\'s last ship is 3 squares in a straight line. Dots are squares already missed.', cls: 'book-card' }));
      out.push(O('shells', 4, 89, 92, 8, { kind: 'static', text: 'Spare shells: ' + (SPARE - s.misses) + '   Hits: ' + s.hits + ' of 3', label: '', cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap' || !/^[A-E][1-5]$/.test(a.target)) return false;
      var id = a.target;
      if (MISSED.indexOf(id) >= 0 || s.shots[id]) return false;
      if (SHIP.indexOf(id) >= 0) {
        s.shots[id] = 'hit';
        s.hits++;
        if (s.hits === 3) {
          api.complete({ line: 'Glub glub glub. My flagship! In row 2! Where I said it wasn\'t! An admiral\'s word is… apparently just a word.', mood: 'defeated' });
        } else {
          api.defy('row2');
          api.say(s.hits === 1 ? 'HIT?! In row 2? That\'s… a different ship. A decoy. A rowing boat.' : 'Another hit! Stop shooting at row 2! It\'s… sensitive!', 'panicked');
        }
        return true;
      }
      s.misses++;
      if (s.misses >= SPARE) {
        api.fail('Splash. Splash. SPLASH. Out of shells! My fleet sails on, undefeated. Reload and try thinking this time!', 'laughing');
        return true;
      }
      s.shots[id] = 'miss';
      api.nope(id);
      api.say(id === 'E5' ? 'Splash! E5 was empty? How strange. Must have sailed off. Try… anywhere but row 2.' : 'Splash! Empty sea. My ship is laughing at you. Quietly. Ships are quiet.', 'pleased');
      return true;
    },

    solution: [{ tap: 'B2' }, { tap: 'C2' }, { tap: 'D2' }],
    checks: [
      { name: 'fire at E5', steps: [{ tap: 'E5' }], expect: 'nope' },
      { name: 'three misses', steps: [{ tap: 'E5' }, { tap: 'A4' }, { tap: 'C4' }], expect: 'fail' },
      { name: 'any order', steps: [{ tap: 'D2' }, { tap: 'B2' }, { tap: 'C2' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
