/* Level 206 — Shell Game (Coral Caverns)
 * Octo the octopus runs a shell game: three shells, "find the pearl". Seven arms are on the table; the
 * eighth is curled up beside him with something round and white inside. Every shell is empty.
 * Tap the curled tentacle to reveal the pearl.
 * Wrong: lifting a shell (trap: empty, Octo wins your hat), poking Octo's sign (nope).
 * Ruin: tickle Octo: he laughs, inks the whole reef, and Bossworth comes out dyed black.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'shell-game',
    num: 206,
    title: 'Shell Game',
    objective: 'Find Octo\'s pearl.',
    intro: 'Follow the pearl! I watched every move: it\'s under the MIDDLE shell. Definitely the middle. Pick it and win! Octopuses can\'t cheat. They don\'t have… hands.',
    introMood: 'suspicious',
    actions: ['tap', 'observe'],
    par: 1,
    hints: [
      'Count Octo\'s arms. Are they all on the table?',
      'One arm is curled up beside him, holding something round and white.',
      'Tap the curled-up tentacle instead of any shell.'
    ],
    wrong: ['Every shell is empty (trap: Octo wins).', 'The sign is just a sign (nope).', 'Tickling Octo inks the whole reef (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Caught red-tentacled. Octo hands over the pearl and pretends it was a magic trick.',
    trick: 'The pearl was never under a shell: Octo\'s eighth arm was curled round it, so the third option was to check the arm.',

    init: function () { return { lifted: -1, found: false }; },

    view: function (s) {
      var out = [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-sea', cls: 'backdrop' }),
        O('sign', 4, 3, 44, 15, { text: 'OCTO\'S SHELL GAME\nNo cheating!', label: 'Sign: Octo\'s shell game, no cheating', cls: 'plaque-card' }),
        O('octo', 22, 18, 50, 40, { kind: 'static', art: 'i-octopus', artOpts: { seven: true }, label: 'Octo the octopus: seven arms on the table' }),
        O('arm', 62, 18, 18, 24, { art: 'i-tentacle', artOpts: { open: s.found }, label: s.found ? 'Octo\'s eighth arm, holding out a pearl' : 'Octo\'s eighth arm, curled up around something round and white' }),
        O('rock', 8, 58, 84, 18, { kind: 'static', art: 'i-slab', label: '' })
      ];
      for (var i = 0; i < 3; i++) {
        out.push(O('shell' + i, 18 + i * 24, 49, 16, 14, { art: 'i-shell', artOpts: { up: s.lifted === i }, label: 'Shell ' + (i + 1) + (i === 1 ? ' (the middle one)' : '') }));
      }
      out.push(O('ask', 4, 82, 62, 11, { kind: 'static', text: 'Pick a shell, any shell…', label: '', cls: 'speech-card' }));
      out.push(O('tickle', 70, 81, 26, 13, { text: 'Tickle Octo', label: 'Tickle the octopus', cls: 'btn-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^shell([0-2])$/.exec(a.target);
      if (m) {
        api.fail('You lift shell ' + (Number(m[1]) + 1) + '. Empty! Octo cackles and wins your hat. All three are empty, by the way. Count his arms.');
        return true;
      }
      switch (a.target) {
        case 'sign':
          api.nope();
          api.say('"No cheating!" signed by Octo. With which arm, I wonder.', 'suspicious');
          return true;
        case 'arm':
          s.found = true;
          api.defy('middle');
          api.complete({ line: 'The curled-up arm! It was holding the pearl the whole time. Seven arms to shuffle, one to cheat. I respect it.', mood: 'defeated' });
          return true;
        case 'tickle':
          api.complete({ ruin: 'inked-captain', line: 'Octo giggles so hard he INKS. The whole reef goes black. You grab the pearl in the gloom. I come out dyed navy blue. Permanently. I look like a bruise.', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'arm' }],
    ruinPaths: { 'inked-captain': [{ tap: 'tickle' }] },
    checks: [
      { name: 'the middle shell is a trap', steps: [{ tap: 'shell1' }], expect: 'fail' },
      { name: 'the left shell is a trap', steps: [{ tap: 'shell0' }], expect: 'fail' },
      { name: 'the sign is a nope', steps: [{ tap: 'sign' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
