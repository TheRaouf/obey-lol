/* Level 148 — Exit Doors (Scanner Scramble)
 * The automatic doors won't open: their sensor beam (a dotted cone) stops well above the short
 * intern's head. Hold something tall in the beam: drag the baguette into it, then walk out.
 * Knocking and dancing: nope; walking into shut doors: nope.
 * Ruin: the FIRE EXIT (alarm will sound).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'exit-doors',
    num: 148,
    title: 'Exit Doors',
    objective: 'Get out through the automatic doors.',
    intro: 'The doors aren\'t opening? They\'re SHY. Do a little dance. Doors love a dance. Whatever you do, don\'t wave bread at them. That\'s just rude.',
    introMood: 'surprised',
    actions: ['drag', 'observe'],
    par: 2,
    hints: [
      'Look at where the sensor\'s dotted beam reaches, and where your head is.',
      'The doors only notice things inside the beam. You\'re too short. Is anything in your shopping tall?',
      'Drag the baguette into the sensor beam above the doors, then walk through.'
    ],
    wrong: ['Knocking or dancing below the beam does nothing (nope).', 'Walking into shut doors (nope).', 'The fire exit sets off the alarm for the whole shop (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Out, thanks to a well-placed loaf.',
    trick: 'The door sensor only saw things inside its beam, which ended above your head, so waving the long baguette into it opened the doors.',

    init: function () { return { open: false }; },

    view: function (s) {
      return [
        O('sign', 26, 4, 48, 10, { kind: 'static', text: 'AUTOMATIC DOORS', label: 'Sign: automatic doors', cls: 'sign-card' }),
        O('doors', 30, 30, 40, 45, { art: 'f-autodoor', artOpts: { open: s.open }, label: s.open ? 'Automatic doors, wide open (walk through)' : 'Automatic doors, shut. The sensor above them shines a dotted beam that only reaches halfway down the doors, high above your head.' }),
        O('beam', 40, 36, 20, 16, { kind: 'zone', zone: true, label: 'The door sensor\'s beam, high above your head' }),
        O('hero', 45.5, 74, 9.3, 14, { kind: 'static', art: 'hero', label: 'You, the intern, standing in front of the doors, well below the beam' }),
        O('bag', 6, 58, 15, 17.8, { kind: 'static', art: 'f-carrier', artOpts: { full: true }, label: 'Your shopping bag' }),
        O('alarm', 74, 25, 24, 13, { kind: 'static', text: 'ALARM WILL SOUND', label: 'Sign: fire exit, alarm will sound', cls: 'tag-card' }),
        O('fire', 76, 41, 20, 33.3, { art: 'door', artOpts: { sign: 'FIRE EXIT' }, label: 'Fire exit door. Alarm will sound.' }),
        O('baguette', 4, 88, 32, 9.5, { art: 'f-baguette', label: 'A long baguette from your shopping (drag it)', drag: true, hidden: s.open }),
        O('knock', 58, 88, 18, 10, { text: 'Knock', label: 'Knock on the glass', cls: 'btn-card' }),
        O('dance', 78, 88, 18, 10, { text: 'Dance', label: 'Do a little dance', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'baguette') {
        if (a.zone !== 'beam') return false;
        s.open = true;
        api.defy('bread');
        api.say('You WAVED BREAD at the doors. And they… opened. They never open for my dancing. They open for bread.', 'surprised');
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'doors':
          if (s.open) {
            api.complete({ line: 'Fresh air! Out of the shop at last. The doors fell for a baguette. Honestly, so would I.', mood: 'defeated' });
          } else {
            api.nope('doors');
            api.say('BONK. Glass. The doors didn\'t see you. You\'re below the beam. Like most of my standards.', 'pleased');
          }
          return true;
        case 'knock':
          api.nope('knock');
          api.say('Knock knock. The doors don\'t do knock-knock jokes. Or knocks.', 'pleased');
          return true;
        case 'dance':
          api.nope('dance');
          api.say('A lovely dance. Shoulders! Elbows! The beam is up there, though. Your elbows are down here.', 'pleased');
          return true;
        case 'fire':
          api.complete({ ruin: 'alarm-bells', line: 'WAAAH-WAAAH-WAAAH! The FIRE EXIT? The whole shop is outside now. In the car park. Looking at ME. I\'m waving a baguette and apologising to everyone.', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ drop: ['baguette', 'beam'] }, { tap: 'doors' }],
    ruinPaths: { 'alarm-bells': [{ tap: 'fire' }] },
    checks: [
      { name: 'Bossworth\'s dance', steps: [{ tap: 'dance' }], expect: 'nope' },
      { name: 'walking into the glass', steps: [{ tap: 'doors' }], expect: 'nope' },
      { name: 'knocking', steps: [{ tap: 'knock' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
