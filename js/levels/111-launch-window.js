/* Level 111 — Launch Window
 * An orrery: Mars moves one dot clockwise per day; the rocket flies to the AIM ring and the
 * flight takes 2 days. Bossworth says to wait until Mars sits IN the ring, then launch — but by
 * the time the rocket arrives Mars has moved on (trap). Lead the target: launch when Mars is two
 * dots before the ring (Next day ×2 from the start, then LAUNCH).
 * Any other launch misses (trap). Tapping the rocket is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var START = 6, TARGET = 2, FLIGHT = 2, SLOTS = 8;

  OBEY.registerLevel({
    id: 'launch-window',
    num: 111,
    title: 'Launch Window',
    objective: 'Launch so the rocket meets Mars.',
    intro: 'Launch window! Wait until Mars is sitting right in the AIM ring, THEN launch. Point, shoot, arrive. Astronomy is just darts with extra steps.',
    introMood: 'panicked',
    actions: ['tap', 'counting', 'planning'],
    par: 3,
    hints: [
      'The flight plan says the trip is not instant. Where will Mars be when you arrive?',
      'Mars moves one dot per day and the flight takes two days. Launch when Mars is two dots before the ring.',
      'Press Next day twice (Mars reaches the top dot), then LAUNCH.'
    ],
    wrong: ['Launching while Mars is in the ring arrives two days late (trap).', 'Launching at any other time misses Mars (trap).', 'Tapping the rocket does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Rocket and Mars, arriving together. Romantic, in a gravitational way.',
    trick: 'Planets keep moving during the flight, so you launch early, aiming where Mars will be in two days rather than where it is now.',

    init: function () { return { mars: START, day: 0 }; },

    view: function (s) {
      var away = (TARGET - s.mars + SLOTS) % SLOTS;
      return [
        O('orrery', 2, 2, 62, 62, { kind: 'static', art: 'd-orrery', artOpts: { mars: s.mars, target: TARGET }, label: 'Orrery: Mars is ' + (away === 0 ? 'in the AIM ring' : away + ' dots before the AIM ring (it moves clockwise)') }),
        O('plan', 65, 2, 33, 44, { kind: 'static', text: 'FLIGHT PLAN\nFlight time: 2 days.\nMars moves 1 dot clockwise per day.', label: 'Flight plan: flight time 2 days. Mars moves 1 dot clockwise per day.', cls: 'book-card' }),
        O('day', 66, 47, 32, 11, { kind: 'static', text: 'Day ' + s.day, label: 'Day ' + s.day, cls: 'display-card' }),
        O('next', 66, 62, 32, 13, { text: 'Next day', label: 'Advance one day', cls: 'btn-card' }),
        O('launch', 66, 80, 32, 16, { text: 'LAUNCH', label: 'Launch the rocket', cls: 'btn-card big' }),
        O('rocket', 6, 68, 16, 28, { art: 'd-rocket', label: 'Rocket on the launch pad' }),
        O('note', 26, 70, 36, 24, { kind: 'static', text: 'The rocket flies along the dashed line to the AIM ring.', label: 'The rocket flies along the dashed line to the AIM ring.', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'next':
          s.day++;
          s.mars = (s.mars + 1) % SLOTS;
          if (s.mars === TARGET) api.say('THERE! Mars is in the ring! Launch NOW! Now now now!', 'panicked');
          else if ((TARGET - s.mars + SLOTS) % SLOTS === FLIGHT) api.say('Not yet. Mars isn\'t even IN the ring. Patience. Wait for the bullseye.', 'neutral');
          return true;
        case 'rocket':
          api.nope();
          api.say('It\'s fuelled, it\'s pointy, it\'s ready. It\'s waiting for you to press the actual button.', 'annoyed');
          return true;
        case 'launch':
          var arrive = (s.mars + FLIGHT) % SLOTS;
          if (arrive === TARGET) {
            api.defy('bullseye');
            api.complete({ line: 'You launched BEFORE Mars was there, and arrived exactly when it was. That\'s… leading the target. Darts players hate this.', mood: 'defeated' });
          } else if (s.mars === TARGET) {
            api.fail('Perfect aim! Two days later you reach the ring… and Mars left two days ago. Rocket recalled. Embarrassing. For the rocket.');
          } else {
            api.fail('The rocket reaches the AIM ring and finds… nothing. Mars is elsewhere, minding its business. Rocket recalled.');
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'next' }, { tap: 'next' }, { tap: 'launch' }],
    alternatives: { 'next-orbit': [{ tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'launch' }] },
    checks: [
      { name: 'launching on the bullseye is a trap', steps: [{ tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'next' }, { tap: 'launch' }], expect: 'fail' },
      { name: 'launching straight away is a trap', steps: [{ tap: 'launch' }], expect: 'fail' },
      { name: 'tapping the rocket is a nope', steps: [{ tap: 'rocket' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
