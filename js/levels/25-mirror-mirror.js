/* Level 25 — Mirror, Mirror
 * The sign says "Press the GREEN CIRCLE". The mirror shows backwards writing that, read properly,
 * says the sign is lying and to press the PURPLE SQUARE. Bossworth insists mirrors lie.
 * Wrong: green circle or orange triangle (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var MIRROR = 'THE SIGN IS LYING.\nPRESS THE PURPLE SQUARE.';

  OBEY.registerLevel({
    id: 'mirror-mirror',
    num: 25,
    title: 'Mirror, Mirror',
    objective: 'Press the right shape.',
    intro: 'Read the sign. Press what it says. Ignore the mirror. Mirrors are liars. Everything backwards is a lie. Including this sentence read backwards.',
    introMood: 'neutral',
    actions: ['read', 'tap'],
    par: 1,
    hints: [
      'The mirror has writing on it. Try reading it backwards.',
      'The mirror says the sign is lying.',
      'Press the purple square.'
    ],
    wrong: ['The green circle and orange triangle are traps.'],
    secrets: [],
    endingNote: 'None.',
    done: 'The mirror told the truth. Bossworth needs a new mirror.',

    init: function () { return {}; },

    view: function () {
      return [
        O('sign', 4, 6, 44, 20, { kind: 'static', text: 'SIGN:\nPress the GREEN CIRCLE.', label: 'Sign: press the green circle', cls: 'plaque-card' }),
        O('mirror', 54, 2, 42, 52, { kind: 'static', art: 'mirror', label: 'Mirror' }),
        O('mtext', 58, 14, 34, 28, { kind: 'static', text: MIRROR, label: 'Backwards writing on the mirror. Read normally it says: the sign is lying, press the purple square.', cls: 'mirror-text' }),
        O('green', 6, 64, 26, 26, { text: '●', label: 'Green circle', cls: 'shape-btn green' }),
        O('purple', 37, 64, 26, 26, { text: '■', label: 'Purple square', cls: 'shape-btn purple' }),
        O('orange', 68, 64, 26, 26, { text: '▲', label: 'Orange triangle', cls: 'shape-btn orange' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'purple') {
        api.defy('purple');
        api.complete({ line: 'You believed the MIRROR? Over a perfectly good sign that I definitely did not write myself?', mood: 'defeated' });
        return true;
      }
      if (a.target === 'green') { api.fail('SPLAT! The green circle was a custard cannon. Signs can lie too, you know. Especially mine.'); return true; }
      if (a.target === 'orange') { api.fail('BZZZT! The triangle is pointy AND wrong. Read everything. Even the backwards stuff.'); return true; }
      return false;
    },

    solution: [{ tap: 'purple' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
