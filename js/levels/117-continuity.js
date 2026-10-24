/* Level 117 — Continuity (Curtain Call)
 * Film set, take two. The continuity photo from take one lists how the set must look:
 * lamp ON, hat on the coat rack, mug on the table. Bossworth "remembers" the opposite and says
 * nobody notices continuity. Fix the lamp and the hat, then shout ACTION.
 * Shouting ACTION with errors: trap. Drinking the prop mug: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'continuity',
    num: 117,
    title: 'Continuity Error',
    objective: 'Shoot take two without a continuity error.',
    intro: 'Take two! The lamp was OFF and the hat was on the CHAIR. I remember perfectly. Besides, nobody notices continuity. Nobody. Just shout ACTION.',
    introMood: 'pleased',
    actions: ['tap', 'drag', 'compare'],
    par: 3,
    hints: [
      'Compare the set with the continuity photo from take one.',
      'Two things don\'t match the photo: the lamp and the hat.',
      'Switch the lamp on, drag the hat onto the coat rack, then shout ACTION.'
    ],
    wrong: ['Shouting ACTION while the set doesn\'t match the photo is a trap.', 'Drinking from the prop mug is a nope.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Seamless. The internet will find nothing. (It will find something.)',
    trick: 'The continuity photo, not Bossworth\'s memory, showed how take one looked: lamp on and hat on the rack.',

    init: function () { return { lamp: false, hat: 'chair' }; },

    view: function (s) {
      var hatOnRack = s.hat === 'rack';
      return [
        O('photo', 4, 4, 44, 36, { kind: 'static', text: 'CONTINUITY PHOTO, TAKE 1\n• Lamp: ON\n• Hat: on the coat rack\n• Mug: on the table', label: 'Continuity photo from take one: lamp on, hat on the coat rack, mug on the table', cls: 'book-card' }),
        O('lamp', 35, 38, 12, 38, { art: 'lamp', artOpts: { on: s.lamp }, label: s.lamp ? 'Lamp (on)' : 'Lamp (off)' }),
        O('rack', 64, 38, 20, 38, { art: 'e-coatrack', label: hatOnRack ? 'Coat rack with the hat on it' : 'Coat rack (empty)', zone: true }),
        O('chair', 84, 62, 14, 14, { art: 'e-chair', label: s.hat === 'chair' ? 'Chair (the hat is on it)' : 'Chair', zone: true }),
        O('hat', hatOnRack ? 67 : 84, hatOnRack ? 32 : 59, 14, 12, { art: 'e-bowler', label: 'Bowler hat (drag it)', drag: true }),
        O('table', 47, 70, 16, 5, { kind: 'static', art: 'table', label: '' }),
        O('mug', 49.5, 60, 11, 11, { art: 'mug', label: 'Prop mug on the table' }),
        O('camera', 4, 42, 30, 32, { kind: 'static', art: 'e-camera', label: 'Film camera' }),
        O('clapper', 6, 78, 16, 16, { kind: 'static', art: 'e-clapper', label: '' }),
        O('action', 62, 80, 34, 13, { text: 'ACTION!', label: 'Shout ACTION and start filming', cls: 'btn-card accent big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'hat') {
        if (a.zone === 'rack') { s.hat = 'rack'; api.defy('hat'); api.say('The hat? On the RACK? It was on the chair. I\'m almost sure. Fine.', 'suspicious'); }
        else if (a.zone === 'chair') { s.hat = 'chair'; api.say('Back on the chair. Where I remember it. Correctly. Probably.', 'pleased'); }
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'lamp':
          s.lamp = !s.lamp;
          if (s.lamp) api.defy('lamp');
          api.say(s.lamp ? 'Lamp on. Wasteful. Accurate, apparently. Whatever.' : 'Lamp off. Moody. Like I remember.', 'annoyed');
          return true;
        case 'mug':
          api.nope('mug');
          api.say('Don\'t drink the prop! It\'s cold tea from 2009. It\'s practically a cast member.', 'panicked');
          return true;
        case 'hat':
          api.say('Drag the hat somewhere. Or leave it on the chair. Where it was. Definitely.', 'neutral');
          return true;
        case 'action': {
          var errs = [];
          if (!s.lamp) errs.push('the lamp switched itself off');
          if (s.hat !== 'rack') errs.push('the hat teleported onto a chair');
          if (!errs.length) {
            api.complete({ line: 'And… CUT! Perfect match with take one. …Okay, maybe I didn\'t remember perfectly. Maybe the photo did.', mood: 'defeated' });
          } else {
            api.fail('CUT! Viewers noticed ' + errs.join(' and ') + '. There\'s a forum thread. Reset the set!');
          }
          return true;
        }
      }
      return false;
    },

    solution: [{ tap: 'lamp' }, { drop: ['hat', 'rack'] }, { tap: 'action' }],
    checks: [
      { name: 'shout ACTION straight away', steps: [{ tap: 'action' }], expect: 'fail' },
      { name: 'fix only the lamp', steps: [{ tap: 'lamp' }, { tap: 'action' }], expect: 'fail' },
      { name: 'drink the prop mug', steps: [{ tap: 'mug' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
