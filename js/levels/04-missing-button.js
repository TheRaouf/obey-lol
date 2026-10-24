/* Level 4 — The Missing Button
 * Teaches: environmental observation; an unexpected object is interactive.
 * Solution: switch off the lamp (glowing paint appears on the painting), press the painting, open the door.
 * Wrong: pressing the painting with the lights on; trying the locked door.
 * Secret: glow-code (with the lights off, tap the glowing numbers 4·2·7 — used again in Level 13).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'missing-button',
    num: 4,
    title: 'The Missing Button',
    objective: 'Open the door.',
    intro: 'Press the button to open the door. …Wait. Where\'s the button? SOMEONE STOLE MY BUTTON.',
    introMood: 'surprised',
    actions: ['tap'],
    par: 3,
    hints: [
      'Look around the whole room, not just at the door.',
      'Some things only show up in the dark.',
      'Turn off the lamp, press the painting, then open the door.'
    ],
    wrong: ['The painting does nothing with the lights on.', 'The door stays locked until the button is pressed.'],
    secrets: ['glow-code'],
    endingNote: 'None. (The glowing code matters later.)',
    done: 'The button was art all along.',

    init: function () { return { dark: false, doorOpen: false }; },

    view: function (s) {
      return [
        O('room', 0, 0, 100, 100, { kind: 'static', art: 'darkness', artOpts: { on: s.dark }, cls: 'backdrop', label: '' }),
        O('rug', 30, 82, 40, 12, { kind: 'static', art: 'rug' }),
        O('lamp', 4, 28, 18, 58, { art: 'lamp', artOpts: { on: !s.dark }, label: s.dark ? 'Floor lamp (off)' : 'Floor lamp (on)' }),
        O('painting', 32, 10, 30, 30, { art: 'painting', artOpts: { glow: s.dark }, label: s.dark ? 'Painting of a button, glowing text reads PRESS ME' : 'Painting of a red button' }),
        O('code', 34, 56, 26, 10, { text: '4 · 2 · 7', label: 'Faint glowing numbers on the wall', free: true, hidden: !s.dark, cls: 'glow-text' }),
        O('door', 70, 30, 24, 56, { art: 'door', artOpts: { open: s.doorOpen, keyhole: !s.doorOpen }, label: s.doorOpen ? 'Open door' : 'Locked door' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'lamp':
          s.dark = !s.dark;
          if (s.dark) api.say('Hey! Who turned off the lights? I can\'t see my… oh. Oh no. Not the glow paint.', 'panicked');
          else api.say('Ah, light. Much better. Nothing glowing here. Nothing at all.', 'pleased');
          return true;
        case 'painting':
          if (s.dark) {
            s.doorOpen = true;
            api.say('You pressed the painting. The painting WAS the button. I am an artist, technically.', 'defeated');
          } else {
            api.nope();
            api.say('It\'s a painting of a button. Very avant-garde. Not clickable. Probably.', 'neutral');
          }
          return true;
        case 'code':
          api.secret('glow-code');
          api.say('4… 2… 7. Forget you saw that. Especially later. In a broken room. Forget it HARDER.', 'suspicious');
          return true;
        case 'door':
          if (s.doorOpen) api.complete({ line: 'Fine. Go. Take your art appreciation with you.', mood: 'annoyed' });
          else { api.nope(); api.say('Locked. You\'d need a button. Which is missing. Tragic.', 'pleased'); }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'lamp' }, { tap: 'painting' }, { tap: 'door' }],
    secretPaths: { 'glow-code': [{ tap: 'lamp' }, { tap: 'code' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
