/* Level 131 — Roll Credits (Pixel Palace)
 * Fake end credits. Bossworth: the game's over, the stage door is locked, the crew took the key home.
 * The credits are a list of crew jobs; tapping one summons that crew member. The KEY GRIP grips a key:
 * tap that credit, then drag the key to the stage door. Boom operator: trap (bonk). Best boy, catering: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CREDITS = [
    { id: 'cDir', text: 'Directed by ………… Bossworth' },
    { id: 'cBoom', text: 'Boom Operator ………… Bernard' },
    { id: 'cBest', text: 'Best Boy ………… Kevin' },
    { id: 'cKey', text: 'Key Grip ………… Gerald' },
    { id: 'cFood', text: 'Catering ………… a sandwich' },
    { id: 'cStar', text: 'Starring ………… Bossworth' }
  ];

  OBEY.registerLevel({
    id: 'roll-credits',
    num: 131,
    title: 'Roll Credits',
    objective: 'Leave through the locked stage door.',
    intro: 'THE END! Roll credits! The game is over, go home. Oh, the stage door\'s locked and the crew took the key home with them. Every last one. Nothing to see here.',
    introMood: 'pleased',
    actions: ['tap', 'read', 'drag'],
    par: 2,
    hints: [
      'Film crew jobs have funny names. Read them literally.',
      'What would a KEY grip be holding?',
      'Tap the Key Grip credit, then drag the key onto the stage door.'
    ],
    wrong: ['The boom operator swings the boom mic into your head (trap).', 'The best boy and the catering just wave (nope).', 'The stage door stays locked without a key (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Thanks for watching. Please exit through the plot hole.',
    trick: 'The crew hadn\'t gone home: the credits listed a Key Grip, and a key grip, taken literally, grips a key.',

    init: function () { return { key: false }; },

    view: function (s) {
      var out = [
        O('end', 4, 3, 92, 11, { kind: 'static', text: 'THE END', label: 'The end', cls: 'display-card ready' })
      ];
      CREDITS.forEach(function (c, i) {
        var static_ = c.id === 'cDir' || c.id === 'cStar';
        out.push(O(c.id, 4, 17 + i * 9.5, 64, 8.5, static_
          ? { kind: 'static', text: c.text, label: 'Credit: ' + c.text, cls: 'tag-card' }
          : { text: c.text, label: 'Credit: ' + c.text.replace(/…+/g, ', '), cls: 'btn-card option' }));
      });
      out.push(O('stageDoor', 72, 18, 24, 50, { art: 'door', artOpts: { sign: 'STAGE', keyhole: true }, label: 'Locked stage door', zone: true }));
      if (s.key) out.push(O('key', 26, 78, 18, 12, { art: 'key', label: 'Key (drag it to the door)', drag: true }));
      out.push(O('foot', 4, 92, 92, 6, { kind: 'static', text: 'No hamsters, badgers or narrators were harmed. Some were annoyed.', label: '', cls: 'fine-print' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'key') {
        if (a.zone === 'stageDoor') {
          api.complete({ line: 'You unlocked the door with a key from the CREDITS. The credits are for READING. Respectfully. While I take a bow.', mood: 'defeated' });
        } else api.say('That\'s not a keyhole. The stage door has the keyhole. Not that you should use it.', 'neutral');
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'cKey':
          if (s.key) { api.say('Gerald has already handed over his key. He\'s gripping nothing now. He feels lost.', 'neutral'); return true; }
          s.key = true;
          api.defy('credits');
          api.say('Gerald the Key Grip pops up and hands you… the KEY he was gripping. That\'s not what key grip MEANS, Gerald!', 'panicked');
          return true;
        case 'cBoom':
          api.fail('BOOM. Bernard swings the boom mic straight into your head. Credits restart from the top.');
          return true;
        case 'cBest':
          api.nope('cBest');
          api.say('Kevin, the Best Boy, waves. He is the best. At waving. No key, though.', 'pleased');
          return true;
        case 'cFood':
          api.nope('cFood');
          api.say('The sandwich is in the credits. The sandwich has no key. The sandwich has ham.', 'pleased');
          return true;
        case 'stageDoor':
          api.nope('stageDoor');
          api.say('Locked. The crew went home. With the key. ALL of them. Credits don\'t lie.', 'pleased');
          return true;
        case 'key':
          api.say('Drag the key to a keyhole. Or just admire it. Admire it and go home.', 'neutral');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'cKey' }, { drop: ['key', 'stageDoor'] }],
    checks: [
      { name: 'the boom operator', steps: [{ tap: 'cBoom' }], expect: 'fail' },
      { name: 'the best boy', steps: [{ tap: 'cBest' }], expect: 'nope' },
      { name: 'the locked door', steps: [{ tap: 'stageDoor' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
