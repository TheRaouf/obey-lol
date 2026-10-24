/* Level 61 — Secret Knock
 * Locked out. Bossworth swears the secret knock is three quick knocks. The note taped by the door says
 * LONG, short, short, LONG. Tap the door for a short knock, press and hold it for a long knock.
 * Wrong: a knock out of pattern clears the entry (nope); the doorbell wakes the baby next door (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CODE = ['L', 'S', 'S', 'L'];
  var LONG_MS = 400;
  var SYM = { L: '—', S: '•' };

  OBEY.registerLevel({
    id: 'secret-knock',
    num: 61,
    title: 'Secret Knock',
    objective: 'Get back into the house.',
    intro: 'Locked out! Luckily our secret knock is three quick knocks. Knock knock knock. I invented it, so I\'d know. Don\'t read the note. The note is jealous of me.',
    introMood: 'pleased',
    actions: ['tap', 'hold', 'read', 'sequence'],
    par: 4,
    hints: [
      'Read the note taped beside the door. It has both long and short knocks.',
      'A tap on the door is a short knock. Pressing and holding is a long knock.',
      'Hold the door, tap it, tap it, then hold it again: LONG, short, short, LONG.'
    ],
    wrong: ['A knock that breaks the pattern clears your attempt (nope).', 'Ringing the doorbell wakes the baby next door (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Knock, knock. Who\'s there? You. Inside. Finally.',
    trick: 'Bossworth\'s "three quick knocks" was wrong; the note\'s long-short-short-long rhythm needed holds as well as taps.',

    init: function () { return { entry: [] }; },

    view: function (s) {
      var shown = s.entry.map(function (k) { return SYM[k]; }).join('  ');
      return [
        O('bell', 4, 8, 22, 14, { text: 'Doorbell', label: 'Doorbell button', cls: 'btn-card' }),
        O('legend', 4, 30, 22, 26, { kind: 'static', text: 'Tap door = short knock\nHold door = LONG knock', label: 'Tap the door for a short knock, hold it for a long knock', cls: 'tag-card' }),
        O('door', 32, 6, 36, 72, { art: 'door', artOpts: { sign: 'HOME' }, hold: true, label: 'Front door (tap = short knock, press and hold = long knock)' }),
        O('note', 74, 8, 22, 40, { kind: 'static', text: 'SECRET KNOCK\n\n— • • —\n\nlong, short, short, long', label: 'Note taped by the door: secret knock is long, short, short, long', cls: 'ticket-card' }),
        O('prog', 24, 82, 52, 12, { kind: 'static', text: shown || 'knocks: …', label: 'Your knocks so far: ' + (s.entry.length ? s.entry.map(function (k) { return k === 'L' ? 'long' : 'short'; }).join(', ') : 'none'), cls: 'panel-lights' })
      ];
    },

    on: function (a, s, api) {
      if (a.target === 'bell' && a.type === 'tap') {
        api.fail('DING-DONG! Next door, a baby wakes up and begins an opera. Three neighbours glare. Bossworth hides in a hedge. Start again — quietly.');
        return true;
      }
      if (a.target !== 'door') return false;
      if (a.type === 'holdstart') return true;
      var k;
      if (a.type === 'tap') k = 'S';
      else if (a.type === 'holdend') k = a.ms >= LONG_MS ? 'L' : 'S';
      else return false;
      if (CODE[s.entry.length] !== k) {
        s.entry = [];
        api.nope();
        api.say(k === 'S' ? 'Knock! …A voice inside: "That\'s not the knock." Told you three quick ones. Do three quick ones.' : 'Thuuud. A voice inside: "Nope. Wrong rhythm." Try again.', 'pleased');
        return true;
      }
      s.entry.push(k);
      if (s.entry.length === CODE.length) {
        api.defy('knock');
        api.complete({ line: 'The door swings open. Long-short-short-long? That\'s not my knock! That\'s… a much better knock. I\'m changing my knock.', mood: 'defeated' });
      } else api.say(['Thud… that was LONG. Long is wrong. Quick ones!', 'Ugh, now you\'re doing a rhythm.', 'Don\'t you dare finish that rhythm.'][s.entry.length - 1], 'annoyed');
      return true;
    },

    solution: [{ hold: ['door', 800] }, { tap: 'door' }, { tap: 'door' }, { hold: ['door', 800] }],
    checks: [
      { name: 'three quick knocks', steps: [{ tap: 'door' }, { tap: 'door' }, { tap: 'door' }], expect: 'nope' },
      { name: 'ring the doorbell', steps: [{ tap: 'bell' }], expect: 'fail' },
      { name: 'long long', steps: [{ hold: ['door', 800] }, { hold: ['door', 800] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
