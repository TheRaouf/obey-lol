/* Level 21 — Nap Time
 * "Set the clock to any time EXCEPT three o'clock." The poster reveals 3:00 is Bossworth's nap time;
 * while he sleeps he can't guard the door. Solution: set the clock to 3 (three hour-forward presses
 * from 12), then open the door. Wrong: the door while he is awake (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'nap-time',
    num: 21,
    title: 'Nap Time',
    objective: 'Get through the door Bossworth is guarding.',
    intro: 'Set the clock to any time you like. ANY time. Except three o\'clock. Three o\'clock is… private.',
    introMood: 'suspicious',
    actions: ['tap', 'read'],
    par: 4,
    hints: [
      'Read the poster on the wall.',
      'What happens to a guard at nap time?',
      'Press "Hour forward" three times to reach 3:00, then open the door.'
    ],
    wrong: ['The door will not open while Bossworth is awake and watching.'],
    secrets: [],
    endingNote: 'None.',
    done: 'You waited for the guard to nap. Classic heist.',

    init: function () { return { hour: 12 }; },

    view: function (s) {
      var asleep = s.hour === 3;
      return [
        O('clock', 32, 3, 36, 36, { kind: 'static', art: 'clock', artOpts: { hour: s.hour }, label: 'Clock showing ' + s.hour + " o'clock" }),
        O('back', 6, 42, 42, 12, { text: '◀ Hour back', label: 'Move the clock back one hour', cls: 'btn-card' }),
        O('fwd', 52, 42, 42, 12, { text: 'Hour forward ▶', label: 'Move the clock forward one hour', cls: 'btn-card' }),
        O('poster', 6, 60, 50, 28, { kind: 'static', text: 'Bossworth\'s nap time:\n3 o\'clock sharp.\nDO NOT DISTURB.', label: 'Poster: Bossworth\'s nap time is 3 o\'clock sharp. Do not disturb.', cls: 'ticket-card' }),
        O('door', 64, 58, 28, 38, { art: 'door', artOpts: { sign: asleep ? 'zzz' : 'GUARDED' }, label: asleep ? 'Door (the guard is asleep)' : 'Guarded door' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'fwd' || a.target === 'back') {
        var was = s.hour === 3;
        s.hour = a.target === 'fwd' ? (s.hour % 12) + 1 : ((s.hour + 10) % 12) + 1;
        if (s.hour === 3) {
          api.defy('three');
          api.overlay('sleep');
          api.say('Is it three already? *yaaawn* I\'ll just rest my eyes for… one… zzzz…', 'defeated');
        } else {
          api.overlay(null);
          api.say(was ? 'WHA— I\'m awake! I was not asleep! I was… resting my instructions.' : 'It is now ' + s.hour + " o'clock. Lovely time. Perfectly ordinary time.", 'suspicious');
        }
        return true;
      }
      if (a.target === 'door') {
        if (s.hour === 3) {
          api.overlay(null);
          api.complete({ line: '*snort* Huh? Where did… you went through while I NAPPED? That\'s against the nap rules!', mood: 'surprised' });
        } else {
          api.nope();
          api.say('Locked. I\'m guarding it. I am an EXCELLENT guard. I never sleep. Except at— never mind.', 'pleased');
        }
        return true;
      }
      return false;
    },

    solution: [{ tap: 'fwd' }, { tap: 'fwd' }, { tap: 'fwd' }, { tap: 'door' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
