/* Level 190 — Invisible Ink (Spellbook Spire)
 * The wizard left a "blank" note on his desk next to a lit candle and an ink pot labelled LEMON JUICE
 * (secret ink). Lemon-juice writing appears when warmed. Hold the note to the candle: "Spare key in
 * my LEFT boot." Take the key from the left boot and unlock the door.
 * Wrong: Bossworth's cauldron (trap); binning the note (nope, the bin spits it out); the right boot (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'invisible-ink',
    num: 190,
    title: 'Invisible Ink',
    objective: 'Find the wizard\'s spare key and unlock the door.',
    intro: 'That note is blank. Bin it. The spare key is in the cauldron, obviously — wizards keep everything in the cauldron. Roll up your sleeve.',
    introMood: 'suspicious',
    actions: ['drag', 'tap', 'read'],
    par: 3,
    hints: [
      'Look at what the wizard writes his notes with.',
      'Lemon-juice writing is invisible until it is warmed. There is a lit candle on the desk.',
      'Drag the note onto the candle, read it, take the key from the left boot, then open the door.'
    ],
    wrong: ['Reaching into the cauldron is a trap.', 'The enchanted bin spits the note back out (nope).', 'The right boot only holds an old sock (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Unlocked with a key from a boot, found with a note written in lemon. Wizards are disgusting.',
    trick: 'The ink pot said lemon juice, and lemon-juice writing appears when it is warmed, so holding the "blank" note to the candle revealed where the key was.',

    init: function () { return { revealed: false, key: false }; },

    view: function (s) {
      return [
        O('ink', 4, 4, 50, 10, { kind: 'static', text: 'Ink pot: LEMON JUICE (secret ink)', label: 'Ink pot label: lemon juice, secret ink', cls: 'tag-card' }),
        O('msg', 4, 17, 56, 15, { kind: 'static', text: '"Spare key: in my LEFT boot. — W."', label: 'The warmed note reads: spare key in my left boot, signed W.', cls: 'book-card', hidden: !s.revealed }),
        O('owl', 82, 4, 14, 18, { kind: 'static', art: 'h-owl', label: 'The wizard\'s owl, watching' }),
        O('table', 4, 66, 48, 12, { kind: 'static', art: 'table', label: '' }),
        O('note', 6, 48, 20, 22, { art: 'h-parchment', artOpts: { revealed: s.revealed }, drag: !s.revealed, label: s.revealed ? 'The wizard\'s note, brown writing showing' : 'A blank-looking note (drag it somewhere)' }),
        O('pot', 28, 56, 9, 11, { kind: 'static', art: 'h-jar', artOpts: { color: '#ffe066' }, label: 'Ink pot of lemon juice' }),
        O('candle', 38, 44, 12, 26, { art: 'h-candle', artOpts: { lit: true }, zone: true, free: true, label: 'Lit candle on the desk' }),
        O('cauldron', 54, 52, 24, 24, { art: 'h-cauldron', label: 'Bubbling cauldron' }),
        O('door', 80, 40, 18, 36, { art: 'door', artOpts: { sign: 'LOCKED', keyhole: true }, label: 'Locked tower door' + (s.key ? ' (you have the key)' : '') }),
        O('bin', 6, 82, 12, 15, { art: 'h-bin', zone: true, free: true, label: 'Waste-paper bin' }),
        O('lboot', 52, 82, 14, 14, { art: 'h-boot', artOpts: { key: !s.key }, label: 'Left boot' + (s.key ? ' (empty now)' : '') }),
        O('rboot', 70, 82, 14, 14, { art: 'h-boot', label: 'Right boot' }),
        O('pocket', 24, 86, 24, 10, { kind: 'static', text: s.key ? 'You carry: a key' : 'Pockets: empty', label: s.key ? 'You carry the spare key' : 'Your pockets are empty', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'note') {
        if (a.zone === 'candle') {
          s.revealed = true;
          api.defy('bin');
          api.say('You warmed the blank note and… brown writing appeared. Lemon juice? That is cheating. That is SCIENCE cheating.', 'panicked');
          return true;
        }
        if (a.zone === 'bin') {
          api.nope('bin');
          api.say('The enchanted bin coughs the note straight back out. It is a very fussy bin. It only eats rubbish.', 'annoyed');
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'cauldron':
          api.fail('You plunge your arm into the cauldron. Lukewarm newt soup up to the elbow, no key. The owl hoots with laughter. Wash up and start again.');
          return true;
        case 'rboot':
          api.nope('rboot');
          api.say('An old sock. A wizard\'s old sock. You will never be the same.', 'pleased');
          return true;
        case 'lboot':
          if (s.key) { api.say('Just a boot now. A key-less boot.', 'neutral'); return true; }
          s.key = true;
          api.say(s.revealed ? 'The key, right where the lemon said. I am going to ban lemons.' : 'You found the key in the left boot? Lucky guess. Very lucky. Suspiciously lucky.', 'annoyed');
          return true;
        case 'door':
          if (!s.key) { api.nope('door'); api.say('Locked. Try the cauldron. I insist.', 'pleased'); return true; }
          api.complete({ line: 'Click. Out you go. The cauldron is still waiting for you. It is a little hurt.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ drop: ['note', 'candle'] }, { tap: 'lboot' }, { tap: 'door' }],
    checks: [
      { name: 'reach into the cauldron', steps: [{ tap: 'cauldron' }], expect: 'fail' },
      { name: 'bin the blank note', steps: [{ drop: ['note', 'bin'] }], expect: 'nope' },
      { name: 'right boot', steps: [{ tap: 'rboot' }], expect: 'nope' },
      { name: 'locked door', steps: [{ tap: 'door' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
