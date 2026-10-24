/* Level 11 — The Silent Level
 * Bossworth is gagged; the puzzle is conveyed by visual clues only.
 * Footprints lead from the door to the panel: blue ■, red ▲, yellow ●, red ▲.
 * Each colour also has its own shape and a text label, so colour is never the only cue.
 * Solution: press the panel buttons in footprint order, then open the door.
 * Wrong: a wrong button flashes ✗ and clears the entry. Secret: silent-partner (tap the mouse hole).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SEQ = ['blue', 'red', 'yellow', 'red'];
  var SHAPE = { red: '▲', yellow: '●', blue: '■' };
  var NAME = { red: 'red triangle', yellow: 'yellow circle', blue: 'blue square' };

  OBEY.registerLevel({
    id: 'silent-level',
    num: 11,
    title: 'The Silent Level',
    objective: '…',
    intro: '',
    silent: true,
    overlay: 'gag',
    introMood: 'annoyed',
    actions: ['tap', 'observe', 'sequence'],
    par: 5,
    hints: [
      'Follow the footsteps.',
      'Each footprint matches one panel button by colour and shape.',
      'Press ■ blue, ▲ red, ● yellow, ▲ red — then the door.'
    ],
    wrong: ['Pressing a button out of order flashes ✗ and clears the entry.'],
    secrets: ['silent-partner'],
    endingNote: 'None.',
    done: 'Solved in silence. Bossworth is speechless (literally).',

    init: function () { return { entry: [], wrong: 0, open: false, mouse: false }; },

    view: function (s) {
      var objs = [
        O('door', 4, 8, 24, 48, { art: 'door', artOpts: { open: s.open }, label: s.open ? 'Open door' : 'Closed door' }),
        O('mousehole', 86, 84, 10, 10, { art: 'mousehole', artOpts: { mouse: s.mouse }, label: 'Tiny mouse hole', free: true })
      ];
      SEQ.forEach(function (c, i) {
        objs.push(O('fp' + i, 14 + i * 16, 80 - (i % 2) * 4, 13, 13, { kind: 'static', art: 'footprint', artOpts: { color: c, shape: SHAPE[c], n: i + 1 }, label: 'Footprint ' + (i + 1) + ': ' + NAME[c] }));
      });
      ['red', 'yellow', 'blue'].forEach(function (c, i) {
        objs.push(O('btn-' + c, 50 + i * 16, 12, 14, 14, { text: SHAPE[c], label: 'Panel button: ' + NAME[c], cls: 'color-btn ' + c }));
      });
      var dots = SEQ.map(function (_, i) { return i < s.entry.length ? '●' : '○'; }).join(' ');
      objs.push(O('progress', 50, 30, 46, 10, { kind: 'static', text: s.open ? '✓ ✓ ✓ ✓' : (s.flash ? '✗' : dots), label: s.open ? 'Panel: sequence accepted' : 'Panel progress: ' + s.entry.length + ' of 4' + (s.flash ? ', wrong, cleared' : ''), cls: 'panel-lights' + (s.flash ? ' wrong' : '') + (s.open ? ' ok' : ''), live: true }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^btn-(red|yellow|blue)$/.exec(a.target);
      if (m) {
        if (s.open) return true;
        s.flash = false;
        if (SEQ[s.entry.length] === m[1]) {
          s.entry.push(m[1]);
          if (s.entry.length === SEQ.length) s.open = true;
        } else {
          s.entry = [];
          s.wrong++;
          api.nope();
          s.flash = true;
        }
        return true;
      }
      if (a.target === 'door') {
        if (s.open) {
          api.overlay(null);
          api.complete({ line: 'MMMPH— *peels tape* — finally! You solved it without me. I\'ve never felt so unnecessary.', mood: 'defeated' });
        }
        return true;
      }
      if (a.target === 'mousehole') {
        s.mouse = true;
        api.secret('silent-partner');
        return true;
      }
      if (a.target === 'narrator') {
        api.say('Mmmph! Mmmph mmph!', 'annoyed');
        return true;
      }
      return false;
    },

    solution: [{ tap: 'btn-blue' }, { tap: 'btn-red' }, { tap: 'btn-yellow' }, { tap: 'btn-red' }, { tap: 'door' }],
    secretPaths: { 'silent-partner': [{ tap: 'mousehole' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
