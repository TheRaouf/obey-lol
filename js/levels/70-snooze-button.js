/* Level 70 — Snooze Button
 * Arithmetic. The alarm rings at 7:00. Bossworth: "each snooze is one tiny minute, snooze forever".
 * The sign: snooze = +9 minutes, getting ready takes 12 minutes, the bus leaves at 7:30.
 * Latest safe wake-up is 7:18 = exactly two snoozes. Snooze, snooze, GET UP.
 * Wrong: getting up early wastes sleep (nope); a third snooze makes you miss the bus (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SNOOZE = 9, READY = 12, BUS = 30;

  function clock(t) { return '7:' + (t < 10 ? '0' : '') + t; }

  OBEY.registerLevel({
    id: 'snooze-button',
    num: 70,
    title: 'Snooze Button',
    objective: 'Sleep as long as possible and still catch the 7:30 bus.',
    intro: 'BRRRING! Hit snooze! Each snooze is one tiny minute. Snooze forever! The bus waits for nobody, but it\'ll make an exception for me. I\'m charming.',
    introMood: 'pleased',
    actions: ['tap', 'count', 'logic'],
    par: 3,
    hints: [
      'Read the sign by the bed: a snooze is not one minute.',
      'You need 12 minutes to get ready before the 7:30 bus, so you must be up by 7:18. Each snooze adds 9 minutes.',
      'Press SNOOZE twice (7:18), then GET UP.'
    ],
    wrong: ['Getting up before 7:18 wastes good sleep (nope).', 'Snoozing past 7:18 means missing the bus (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Up at 7:18, out at 7:30, bus caught by a whisker. Maximum snooze, zero lateness.',
    trick: 'A snooze is nine minutes, not one: two snoozes plus twelve minutes of getting ready lands exactly on the 7:30 bus.',

    init: function () { return { t: 0 }; },

    view: function (s) {
      return [
        O('alarm', 30, 2, 40, 40, { kind: 'static', art: 'b-alarm', artOpts: { time: clock(s.t), ringing: true }, label: 'Alarm clock showing ' + clock(s.t) + ', ringing' }),
        O('sign', 4, 45, 92, 17, { kind: 'static', text: 'SNOOZE adds 9 minutes. Getting ready takes 12 minutes. The bus leaves at 7:30 SHARP.', label: 'Sign by the bed: snooze adds 9 minutes, getting ready takes 12 minutes, the bus leaves at 7:30 sharp', cls: 'honest-card' }),
        O('snooze', 6, 66, 42, 16, { text: 'SNOOZE', label: 'Snooze button', cls: 'btn-card big' }),
        O('up', 52, 66, 42, 16, { text: 'GET UP', label: 'Get up and get ready', cls: 'btn-card accent big' }),
        O('slept', 6, 86, 88, 10, { kind: 'static', text: 'Extra sleep so far: ' + s.t + ' min', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'snooze') {
        s.t += SNOOZE;
        if (s.t + READY > BUS) {
          api.fail('Snooze… it\'s ' + clock(s.t) + '. You sprint out half-dressed just as the bus pulls away. Bossworth waves from the window. Back to 7:00!');
          return true;
        }
        api.say(s.t === SNOOZE ? 'Ahh. One tiny minute. Well, it SAYS 7:09, but those are small minutes.' : 'Bliss. ' + clock(s.t) + '. Keep going! Snooze is self-care!', 'pleased');
        return true;
      }
      if (a.target === 'up') {
        if (s.t + READY + SNOOZE <= BUS) {
          api.nope();
          api.say('Up at ' + clock(s.t) + '? You could have had another snooze and STILL caught the bus! Back under the duvet. That\'s an order.', 'annoyed');
          return true;
        }
        api.defy('snooze');
        api.complete({ line: 'Up at 7:18, ready at 7:30, bus caught exactly. You did MATHS before breakfast? That\'s not natural.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ tap: 'snooze' }, { tap: 'snooze' }, { tap: 'up' }],
    checks: [
      { name: 'get up at 7:00', steps: [{ tap: 'up' }], expect: 'nope' },
      { name: 'snooze three times', steps: [{ tap: 'snooze' }, { tap: 'snooze' }, { tap: 'snooze' }], expect: 'fail' },
      { name: 'get up at 7:09', steps: [{ tap: 'snooze' }, { tap: 'up' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
