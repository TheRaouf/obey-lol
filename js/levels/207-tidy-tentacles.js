/* Level 207 — Tidy Tentacles (Coral Caverns)
 * Four numbered chests. Chest 2 opens the gate. Octo tidies everything the instant it lands, and his
 * tidy log shows his rule: 1 goes to 4, 2 to 3, 4 to 1 (he swaps ends: n becomes 5 − n).
 * Bossworth: put the key in chest 2. Put it in chest 3 and Octo tidies it into chest 2.
 * Wrong: chest 2 (trap: tidied into 3, locked), chests 1 and 4 (nope: tidied to the other end).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'tidy-tentacles',
    num: 207,
    title: 'Tidy Tentacles',
    objective: 'Get the key into chest 2.',
    intro: 'Simple job: put the key in chest 2, and the gate opens. Ignore the octopus. He\'s decorative. He just likes things… tidy.',
    introMood: 'neutral',
    actions: ['drag', 'logic', 'read'],
    par: 1,
    hints: [
      'Octo moves anything you put down. His log shows where things end up.',
      'Look at the numbers in the log: 1 went to 4, 2 to 3, 4 to 1. He swaps them end for end.',
      'Drop the key in chest 3. Octo will tidy it into chest 2.'
    ],
    wrong: ['Putting the key in chest 2 gets it tidied into chest 3 (trap).', 'Chests 1 and 4 get it tidied to the other end (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Key in chest 2, gate open, octopus satisfied. Everything in its wrong place, which is its right place.',
    trick: 'Octo\'s log showed he always swaps chests end for end, so the key had to go into chest 3 to be tidied into chest 2.',

    init: function () { return { keyIn: 0 }; },

    view: function (s) {
      var out = [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-sea', cls: 'backdrop' }),
        O('log', 4, 3, 46, 32, { kind: 'static', text: 'OCTO\'S TIDY LOG\nstarfish: 1 ➜ 4\nboot: 2 ➜ 3\ncrab: 4 ➜ 1', label: 'Octo\'s tidy log: starfish put in chest 1 was moved to 4. Boot put in 2 was moved to 3. Crab put in 4 was moved to 1.', cls: 'ticket-card' }),
        O('gate', 54, 3, 42, 15, { kind: 'static', text: s.keyIn === 2 ? 'GATE: OPEN' : 'Chest 2 opens the gate', label: s.keyIn === 2 ? 'The gate is open' : 'Sign: chest 2 opens the gate', cls: 'sign-card' }),
        O('octo', 52, 17, 44, 35, { kind: 'static', art: 'i-octopus', label: 'Octo the octopus, watching every chest' }),
        O('key', 6, 40, 18, 11, { art: 'key', label: 'The gate key (drag it into a chest)', drag: true, hidden: s.keyIn === 2 })
      ];
      for (var n = 1; n <= 4; n++) {
        out.push(O('chest' + n, 4 + (n - 1) * 24, 56, 20, 19, { art: 'i-chest', artOpts: { n: n, open: true, key: s.keyIn === n }, label: 'Chest ' + n + (n === 2 ? ' (opens the gate)' : ''), zone: true }));
      }
      out.push(O('bed', 4, 82, 92, 10, { kind: 'static', text: 'Octo tidies whatever you put down.', label: '', cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && /^chest[1-4]$/.test(a.target)) {
        api.say('An open chest. It wants something put in it. Octo wants to tidy whatever that is.', 'neutral');
        return true;
      }
      if (a.type !== 'drop' || a.target !== 'key') return false;
      var m = /^chest([1-4])$/.exec(a.zone || '');
      if (!m) { api.say('The key settles on the sand. Octo eyes it. Twitchy.', 'neutral'); return true; }
      var n = Number(m[1]), to = 5 - n;
      if (to === 2) {
        s.keyIn = 2;
        api.defy('chest-2');
        api.complete({ line: 'You put it in chest 3 and Octo "tidied" it into chest 2. The gate opens. You out-tidied a tidier. Monstrous.', mood: 'defeated' });
        return true;
      }
      if (n === 2) { api.fail('Plop, into chest 2… and WHOOSH, Octo tidies it into chest 3. Chest 3 slams and locks. Read his log!'); return true; }
      api.nope();
      api.say('Into chest ' + n + '… and Octo whisks it to chest ' + to + '. Then hands it back to you, because you look confused.', 'annoyed');
      return true;
    },

    solution: [{ drop: ['key', 'chest3'] }],
    checks: [
      { name: 'chest 2 is a trap', steps: [{ drop: ['key', 'chest2'] }], expect: 'fail' },
      { name: 'chest 1 is a nope', steps: [{ drop: ['key', 'chest1'] }], expect: 'nope' },
      { name: 'chest 4 is a nope', steps: [{ drop: ['key', 'chest4'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
