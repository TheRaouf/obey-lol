/* Level 120 — Look Into My Eyes (Magic Matinee)
 * Bossworth swings a pocket watch: "When I snap, you will press the big red button and stay forever."
 * The hypnotist's poster: whoever stares at the watch obeys. Raise the shiny tray (he says it's for biscuits)
 * so it reflects the watch back at him; he is hypnotised. Then pick the command card OPEN THE DOOR.
 * Staring at the watch or pressing the red button: traps. Other commands: harmless nopes.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CMDS = [
    { id: 'cmdDance', text: 'Do a little dance' },
    { id: 'cmdDoor', text: 'Open the door' },
    { id: 'cmdHonk', text: 'Honk like a goose' }
  ];

  OBEY.registerLevel({
    id: 'look-into-my-eyes',
    num: 120,
    title: 'Look Into My Eyes',
    objective: 'Get out of the hypnotist\'s act.',
    intro: 'Look into my watch… you are getting sleepy… When I snap my fingers you will press the big red button and stay in my show FOREVER. Ignore the tray. It\'s for biscuits.',
    introMood: 'suspicious',
    actions: ['tap', 'choice'],
    par: 2,
    hints: [
      'Read the hypnotist\'s poster: whoever stares at the watch obeys.',
      'Something shiny could make the watch stare back at Bossworth.',
      'Raise the silver tray to reflect the watch at him, then choose "Open the door".'
    ],
    wrong: ['Staring at the watch hypnotises you (trap).', 'Pressing the big red button traps you in the show (trap).', 'Silly commands work, but do not open the door (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'You hypnotised the hypnotist. Very meta. Very rude.',
    trick: 'The poster said whoever looks at the watch obeys, so the "biscuit tray" turned the watch into Bossworth\'s problem.',

    init: function () { return { tray: false, tilt: -14, danced: false }; },

    onStart: function (s, api) {
      api.every(900, function () { s.tilt = -s.tilt; });
    },

    view: function (s) {
      var out = [
        O('poster', 4, 4, 44, 26, { kind: 'static', text: 'THE GREAT BOSSWORTH\nHypnotist rule no. 1: whoever stares at the watch obeys.', label: 'Poster: whoever stares at the watch obeys', cls: 'book-card' }),
        O('watch', 56, 2, 28, 34, { art: 'e-watch', artOpts: { tilt: s.tray ? 0 : s.tilt }, label: 'Swinging pocket watch (stare at it)' }),
        O('tray', 52, 40, 30, s.tray ? 32 : 18, { art: 'e-tray', artOpts: { raised: s.tray }, label: s.tray ? 'Silver tray, raised: it reflects the watch at Bossworth' : 'Very shiny silver tray ("for biscuits")' }),
        O('door', 84, 38, 14, 36, { kind: 'static', art: 'door', artOpts: { sign: 'OUT', small: true }, label: 'Locked stage door' })
      ];
      if (!s.tray) {
        out.push(O('red', 8, 54, 30, 24, { art: 'bigbutton', label: 'Big red button ("stay forever")' }));
      } else {
        out.push(O('cmdTitle', 4, 32, 44, 8, { kind: 'static', text: 'Bossworth is hypnotised. Command him:', label: '', cls: 'tag-card' }));
        CMDS.forEach(function (c, i) {
          out.push(O(c.id, 4, 43 + i * 11, 44, 9.5, { text: c.text, label: 'Command: ' + c.text, cls: 'btn-card option' }));
        });
      }
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'watch':
          api.fail('You stare at the watch. You cluck like a chicken for six minutes. Wake up! From the top.');
          return true;
        case 'red':
          api.fail('*SNAP* You press the button. You are now a permanent cast member. Just kidding — the show resets. For now.');
          return true;
        case 'tray':
          if (s.tray) { api.say('…yes… master… I await… commands… (who is this voice? it\'s me)', 'sleep'); return true; }
          s.tray = true;
          api.defy('tray');
          api.say('Why is there a watch in the tray… swinging… so… sleepy… I obey the… person… with the tray…', 'sleep');
          return true;
        case 'cmdDoor':
          api.complete({ line: '*snap* WHAT? Why is the door open? Why are my knees sore from… honking? WHAT DID YOU MAKE ME DO?', mood: 'panicked' });
          return true;
        case 'cmdDance':
        case 'cmdHonk':
          api.nope(a.target);
          api.say(a.target === 'cmdDance' ? '(Bossworth does a small, sad shuffle. Majestic. Useless.)' : '(HONK. HONK. A goose outside honks back. The door stays shut.)', 'sleep');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'tray' }, { tap: 'cmdDoor' }],
    checks: [
      { name: 'stare at the watch', steps: [{ tap: 'watch' }], expect: 'fail' },
      { name: 'press the big red button', steps: [{ tap: 'red' }], expect: 'fail' },
      { name: 'make him dance', steps: [{ tap: 'tray' }, { tap: 'cmdDance' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
