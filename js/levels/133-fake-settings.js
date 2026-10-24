/* Level 133 — Fake Settings (Pixel Palace)
 * A settings panel drawn inside the stage. Bossworth: switch to EASY, leave Brightness alone, and
 * "Exit door" does nothing. The Exit door row is greyed out: "needs Brightness 100%".
 * Brightness cycles 10% → 50% → 100%; then switch Exit door ON and walk through the door in the preview.
 * Difficulty EASY: nope ("coming soon"). Reset to defaults: trap. Fake Close button: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BRIGHT = [10, 50, 100];

  OBEY.registerLevel({
    id: 'fake-settings',
    num: 133,
    title: 'Fake Settings',
    objective: 'Find the way out through the settings.',
    intro: 'Struggling? Here are my Settings. Switch Difficulty to EASY! Leave Brightness alone, it\'s moody on purpose. And "Exit door" does nothing. Purely cosmetic.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'sequence'],
    par: 4,
    hints: [
      'One setting is greyed out. Read why.',
      'The Exit door setting needs Brightness at 100%.',
      'Tap Brightness twice (to 100%), switch Exit door ON, then tap the door in the preview.'
    ],
    wrong: ['EASY mode is "coming soon" (nope).', 'Reset to defaults undoes everything (trap).', 'The Close button is only a drawing of one (nope).', 'The Exit door setting is locked until Brightness is 100% (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Settings: adjusted. Narrator: annoyed.',
    trick: 'The greyed-out row said exactly what it needed, so the "cosmetic" Exit door setting only had to wait for Brightness 100%.',

    init: function () { return { bright: 0, door: false }; },

    view: function (s) {
      var b = BRIGHT[s.bright], full = b === 100;
      var out = [
        O('title', 4, 4, 92, 10, { kind: 'static', text: 'SETTINGS (official, real, genuine)', label: 'Settings panel', cls: 'panel-card' }),
        O('l-diff', 4, 17, 44, 10, { kind: 'static', text: 'Difficulty', label: '', cls: 'tag-card' }),
        O('diff', 50, 17, 46, 10, { text: 'Normal ▸', label: 'Difficulty: Normal (tap to change)', cls: 'btn-card' }),
        O('l-bright', 4, 29, 44, 10, { kind: 'static', text: 'Brightness', label: '', cls: 'tag-card' }),
        O('bright', 50, 29, 46, 10, { text: b + '%' + (b === 10 ? ' (moody)' : '') + ' ▸', label: 'Brightness: ' + b + ' percent (tap to change)', cls: 'btn-card' }),
        O('l-door', 4, 41, 44, 10, { kind: 'static', text: 'Exit door', label: '', cls: 'tag-card' }),
        O('door', 50, 41, 46, 10, { text: s.door ? 'ON ▸' : (full ? 'OFF ▸' : 'OFF (needs Brightness 100%)'), label: 'Exit door: ' + (s.door ? 'on' : 'off') + (full ? '' : ', greyed out, needs Brightness 100 percent'), cls: 'btn-card' + (full ? '' : ' ghost') }),
        O('preview', 4, 55, 58, 41, { kind: 'static', text: s.door ? '' : (full ? 'Room preview:\nempty. Very empty.' : 'Room preview:\ntoo dark to see'), label: s.door ? 'Room preview with an exit door in it' : 'Room preview', cls: full ? 'tag-card' : 'panel-card' }),
        O('reset', 66, 58, 30, 14, { text: 'Reset to defaults', label: 'Reset to defaults', cls: 'btn-card' }),
        O('close', 66, 76, 30, 14, { text: 'Close ✕', label: 'Close settings', cls: 'btn-card accent' })
      ];
      if (s.door) out.push(O('exit', 24, 58, 18, 36, { art: 'door', artOpts: { sign: 'EXIT' }, label: 'Exit door in the room preview' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'diff':
          api.nope('diff');
          api.say('EASY mode is coming soon! It has been coming soon since 1998. Keep tapping, it builds anticipation.', 'pleased');
          return true;
        case 'bright':
          s.bright = (s.bright + 1) % BRIGHT.length;
          if (s.bright !== 2 && s.door) s.door = false;
          api.say(s.bright === 2 ? 'MY EYES. It was moody! It was atmospheric! Now it\'s a dentist\'s office.' : (s.bright === 1 ? 'Fifty percent. Less moody. Put it back.' : 'Back to moody. Thank you.'), s.bright === 2 ? 'panicked' : 'annoyed');
          return true;
        case 'door':
          if (BRIGHT[s.bright] !== 100) {
            api.nope('door');
            api.say('Greyed out. See? Does nothing. Purely cosmetic. Don\'t read the brackets.', 'pleased');
            return true;
          }
          s.door = !s.door;
          if (s.door) api.defy('door');
          api.say(s.door ? 'A DOOR appeared in the preview. A cosmetic door. Don\'t walk through cosmetics.' : 'Off again. Good. Leave it off.', s.door ? 'panicked' : 'pleased');
          return true;
        case 'reset':
          api.fail('RESET TO DEFAULTS. Everything goes back the way I like it. Including you. Hello again!');
          return true;
        case 'close':
          api.nope('close');
          api.say('That\'s a drawing of a Close button. I drew it. It closes nothing. Except your options.', 'laughing');
          return true;
        case 'exit':
          api.complete({ line: 'You walked through a SETTING. That\'s not how settings work! …Is it? Who designed these settings? Oh. Me. Again.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'bright' }, { tap: 'bright' }, { tap: 'door' }, { tap: 'exit' }],
    checks: [
      { name: 'switch to EASY', steps: [{ tap: 'diff' }], expect: 'nope' },
      { name: 'exit door while moody', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'reset to defaults', steps: [{ tap: 'bright' }, { tap: 'reset' }], expect: 'fail' },
      { name: 'the fake close button', steps: [{ tap: 'close' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
