/* Level 23 — Zero Gravity
 * Everything floats. The key drifts away whenever you reach for it. Pull the forbidden gravity
 * lever: everything falls, the key lands on the floor, take it and unlock the door.
 * Wrong: grabbing the floating key (nope), the door without the key (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DRIFT = [[40, 12], [62, 6], [20, 8]];

  OBEY.registerLevel({
    id: 'zero-gravity',
    num: 23,
    title: 'Zero Gravity',
    objective: 'Unlock the door.',
    intro: 'Welcome to zero gravity! Everything floats! Whatever you do, do NOT touch the gravity lever. I just got everything floating so nicely.',
    introMood: 'pleased',
    actions: ['tap', 'experiment'],
    par: 3,
    hints: [
      'Floating things are hard to catch.',
      'What would happen if gravity came back?',
      'Pull the gravity lever, pick up the key from the floor, then open the door.'
    ],
    wrong: ['Grabbing the key while it floats makes it drift away.', 'The door is locked without the key.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Gravity: restored. Dignity: Bossworth\'s, not so much.',

    init: function () { return { gravity: false, drift: 0, hasKey: false }; },

    view: function (s) {
      var g = s.gravity;
      var k = g ? [44, 84] : DRIFT[s.drift];
      return [
        O('mug', g ? 30 : 8, g ? 86 : 30, 10, 8, { kind: 'static', art: 'mug', cls: g ? '' : 'floaty' }),
        O('book', g ? 16 : 30, g ? 88 : 40, 12, 7, { kind: 'static', art: 'magazine', cls: g ? '' : 'floaty slow' }),
        O('key', k[0], k[1], 12, 8, { art: 'key', label: g ? 'Key on the floor' : 'Floating key', hidden: s.hasKey, cls: g ? '' : 'floaty' }),
        O('lever', 6, 52, 18, 32, { art: 'lever', artOpts: { down: g }, label: g ? 'Gravity lever (on)' : 'Gravity lever (off)', disabled: g }),
        O('label', 2, 45, 32, 7, { kind: 'static', text: g ? 'GRAVITY: ON' : 'GRAVITY: OFF', label: '', cls: 'tag-card' }),
        O('inv', 30, 62, 36, 8, { kind: 'static', text: s.hasKey ? 'You carry: key' : 'Pockets: empty', label: s.hasKey ? 'Inventory: key' : 'Inventory: empty', cls: 'tag-card' }),
        O('door', 70, 40, 24, 50, { art: 'door', artOpts: { keyhole: true }, label: 'Locked door' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'key':
          if (!s.gravity) {
            s.drift = (s.drift + 1) % DRIFT.length;
            api.nope('key');
            api.say('Whoosh! It floated away. Zero-G keys are notoriously shy.', 'laughing');
          } else {
            s.hasKey = true;
            api.say('You picked up the key from the floor. Like a normal person. In a normal room. Ugh.', 'annoyed');
          }
          return true;
        case 'lever':
          s.gravity = true;
          api.defy('gravity');
          api.say('NOOO— *CLATTER* *THUD* *CLONK*. Everything fell. My mug. My magazine. My will to narrate.', 'panicked');
          return true;
        case 'door':
          if (!s.hasKey) { api.nope(); api.say('Locked. You need a key. A key that is definitely floating out of reach forever.', 'pleased'); }
          else api.complete({ line: 'Unlocked with a key that obeyed gravity. Unlike you, who obeys nothing.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'lever' }, { tap: 'key' }, { tap: 'door' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
