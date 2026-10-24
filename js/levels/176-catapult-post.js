/* Level 176 — Catapult Post (Moat Mayhem)
 * The castle door is barred from inside. A porter sits at a high window with a sign: LETTERS ONLY.
 * Bossworth wants the rock catapulted at the door. Load the polite letter instead, launch it, and the
 * porter unbars the door. Ruin: load yourself and launch — straight into Bossworth's royal bath.
 * Wrong: the rock bounces back (trap); launching an empty catapult or knocking on a barred door (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ITEMS = { letter: 'a polite letter', rock: 'a big rock', you: 'you' };

  OBEY.registerLevel({
    id: 'catapult-post',
    num: 176,
    title: 'Catapult Post',
    objective: 'Get the barred castle door opened.',
    intro: 'The door is barred from inside. Simple: load the big rock into the catapult and knock that door flat. Siege-style. Very royal.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'read'],
    par: 3,
    hints: [
      'Someone up in the window could open the door. Read what they accept.',
      'The porter takes letters only, and there happens to be a letter on the ground.',
      'Drag the letter onto the catapult, press LAUNCH, then go through the door.'
    ],
    wrong: ['A rock bounces off the wall and back at you (trap).', 'Launching nothing, or knocking on the barred door, does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Letter delivered by catapult. Royal Mail has never been faster or more alarming.',
    trick: 'The porter\'s sign said letters only, so a polite letter by catapult opened the door that a rock never would.',

    init: function () { return { load: null, open: false }; },

    view: function (s) {
      return [
        O('window', 66, 4, 28, 28, { kind: 'static', art: 'h-window', artOpts: { porter: s.open ? 'happy' : 'peek', letter: s.open }, label: s.open ? 'High window: the porter is reading your letter' : 'High window with a porter peering out' }),
        O('psign', 46, 6, 18, 18, { kind: 'static', text: 'PORTER: letters only', label: 'Sign by the window: porter, letters only', cls: 'tag-card' }),
        O('door', 70, 38, 24, 38, { art: 'door', artOpts: { sign: s.open ? 'OPEN' : 'BARRED', open: s.open }, label: s.open ? 'Castle door, open' : 'Castle door, barred from inside' }),
        O('cata', 26, 46, 32, 30, { art: 'h-catapult', artOpts: { load: s.load }, zone: true, label: s.load ? 'Catapult loaded with ' + ITEMS[s.load] : 'Empty catapult (drop something in the cup)' }),
        O('you', 6, 56, 12, 20, { art: 'hero', drag: true, hidden: s.load === 'you', label: 'You (yes, you could get in the catapult)' }),
        O('letter', 28, 84, 14, 11, { art: 'h-letter', drag: true, hidden: s.load === 'letter' || s.open, label: 'Letter: "Dear porter, please open the door. Thank you!"' }),
        O('rock', 46, 83, 14, 12, { art: 'h-rock', drag: true, hidden: s.load === 'rock', label: 'A big rock' }),
        O('launch', 4, 84, 20, 11, { text: 'LAUNCH', label: 'Launch the catapult', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (!ITEMS[a.target] || a.zone !== 'cata') return false;
        s.load = a.target;
        api.say(a.target === 'rock' ? 'Yes! The rock! Launch it! Siege time!' : (a.target === 'you' ? 'You climbed INTO the catapult? I mean… technically that is a siege.' : 'A letter? In a catapult? Who writes letters in a SIEGE?'), a.target === 'rock' ? 'pleased' : 'suspicious');
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'launch') {
        if (!s.load) { api.nope('launch'); api.say('You launched… air. Very aerodynamic. Zero effect.', 'annoyed'); return true; }
        if (s.load === 'rock') {
          api.fail('THWUNK. The rock bounces off the wall and rolls right back to you. Porter: "LETTERS ONLY!" Back to the start.');
          return true;
        }
        if (s.load === 'you') {
          api.complete({ ruin: 'human-cannonball', line: 'You flew through the porter\'s window, across my throne room and into MY ROYAL BATH. I was IN it. Get out. GET OUT.', mood: 'panicked' });
          return true;
        }
        s.load = null; s.open = true;
        api.defy('rock');
        api.say('The letter sails in. The porter reads it, says "How polite!" and unbars the door. A letter. In a siege. Unbelievable.', 'annoyed');
        return true;
      }
      if (a.target === 'door') {
        if (!s.open) { api.nope('door'); api.say('Barred from inside. Knocking on it is adorable.', 'pleased'); return true; }
        api.complete({ line: 'In through the front door, by appointment. Nobody besieges like that.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ drop: ['letter', 'cata'] }, { tap: 'launch' }, { tap: 'door' }],
    ruinPaths: { 'human-cannonball': [{ drop: ['you', 'cata'] }, { tap: 'launch' }] },
    checks: [
      { name: 'launch the rock', steps: [{ drop: ['rock', 'cata'] }, { tap: 'launch' }], expect: 'fail' },
      { name: 'launch an empty catapult', steps: [{ tap: 'launch' }], expect: 'nope' },
      { name: 'knock on the barred door', steps: [{ tap: 'door' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
