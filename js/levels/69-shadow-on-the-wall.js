/* Level 69 — Shadow on the Wall
 * Bedtime, and a huge horned figure looms on the bedroom wall. Bossworth: "A BURGLAR! Call the police!"
 * The night lamp shines past the coat stand, which wears Bossworth's tall hat (brim = "horns") and long
 * coat (= "body"). Move the hat and coat into the wardrobe and the shadow shrinks to a harmless pole.
 * Then go to sleep. Wrong: calling the police (trap); switching the lamp off (nope, too scary);
 * going to sleep while the "burglar" still looms (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'shadow-on-the-wall',
    num: 69,
    title: 'Shadow on the Wall',
    objective: 'Get to sleep without anybody calling the police.',
    intro: 'Don\'t panic, but there\'s a GIANT HORNED BURGLAR on the bedroom wall! Call the police! Hide! I\'d hide, but I\'m the narrator. Narrators can\'t hide. We\'re too important.',
    introMood: 'panicked',
    actions: ['observe', 'drag', 'experiment'],
    par: 3,
    hints: [
      'A shape on a wall next to a lamp is usually a shadow. What is standing between the lamp and the wall?',
      'The "horns" match the hat\'s brim, and the "body" matches the long coat on the stand.',
      'Drag the hat and the coat into the wardrobe, then go to sleep.'
    ],
    wrong: ['Calling the police is a trap (very embarrassing).', 'Switching off the night lamp makes everything scarier (nope).', 'Trying to sleep with the "burglar" still there doesn\'t work (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'The burglar was a hat. The hat has been dealt with. Sleep tight.',
    trick: 'The "burglar" was the coat stand\'s shadow; tidying the hat and coat away shrank it to a pole.',

    init: function () { return { hat: true, coat: true }; },

    view: function (s) {
      var scary = s.hat || s.coat;
      return [
        O('window', 4, 4, 22, 24, { kind: 'static', art: 'b-window', artOpts: { night: true }, label: 'Window, night outside' }),
        O('lamp', 6, 32, 12, 42, { art: 'lamp', artOpts: { on: true }, label: 'Night lamp, shining towards the wall (tap to switch it off)' }),
        O('stand', 32, 22, 18, 66, { kind: 'static', art: 'b-coatstand', artOpts: {}, label: 'Coat stand between the lamp and the wall' }),
        O('hat', 31, 17, 20, 11, { art: 'b-hat', drag: true, hidden: !s.hat, label: 'Bossworth\'s tall hat with a wide brim, on top of the coat stand (drag it)' }),
        O('coat', 34, 31, 14, 30, { art: 'b-coat', drag: true, hidden: !s.coat, label: 'Long coat hanging on the coat stand (drag it)' }),
        O('shadow', 58, 4, 38, 64, { kind: 'static', art: 'b-shadow', artOpts: { hat: s.hat, coat: s.coat }, label: scary ? 'Huge shadow on the wall: a horned head' + (s.coat ? ' and a broad body' : '') : 'Shadow on the wall: just a thin pole with two hooks' }),
        O('wardrobe', 22, 84, 30, 13, { art: 'drawer', artOpts: { n: '' }, zone: true, free: true, label: 'Wardrobe drawer' }),
        O('police', 58, 72, 38, 11, { text: 'Call the police', label: 'Phone the police', cls: 'btn-card' }),
        O('sleep', 58, 86, 38, 11, { text: 'Go to sleep', label: 'Go to sleep', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (a.zone !== 'wardrobe') return true;
        if (a.target === 'hat') { s.hat = false; api.say(s.coat ? 'The burglar… lost his horns? Burglars don\'t just take their horns off. Unless he\'s relaxing. That\'s worse.' : 'And the head\'s gone. It\'s just… a pole. A pole burglar. Hmm.', 'surprised'); }
        else if (a.target === 'coat') { s.coat = false; api.say(s.hat ? 'The burglar has lost a lot of weight very suddenly. Still has horns, though! Horns!' : 'It\'s a pole now. A skinny pole. I was never scared. I was being thorough.', 'surprised'); }
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'police':
          api.fail('Two officers arrive, shine a torch at the wall and arrest… a coat stand. They take a statement from the hat. Everybody leaves. Back to bedtime.');
          return true;
        case 'lamp':
          api.nope();
          api.say('Click. Pitch darkness. Now EVERYTHING could be a burglar. You click it straight back on. Good call. I didn\'t scream. That was the floorboards.', 'panicked');
          return true;
        case 'sleep':
          if (s.hat || s.coat) { api.nope(); api.say('You lie down and stare at the ' + (s.hat ? 'horned' : 'headless') + ' figure. It stares back. Nobody sleeps.', 'suspicious'); return true; }
          api.defy('police');
          api.complete({ line: 'The burglar was my hat and my coat. Which means I was the burglar all along. Don\'t think about it. Goodnight.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ drop: ['hat', 'wardrobe'] }, { drop: ['coat', 'wardrobe'] }, { tap: 'sleep' }],
    checks: [
      { name: 'call the police', steps: [{ tap: 'police' }], expect: 'fail' },
      { name: 'lamp off', steps: [{ tap: 'lamp' }], expect: 'nope' },
      { name: 'sleep with the hat still up', steps: [{ drop: ['coat', 'wardrobe'] }, { tap: 'sleep' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
