/* Level 6 — The Waiting Room
 * Teaches: timing and deliberate input without reaction-time pressure.
 * Solution: wait until NOW SERVING shows #17 (your ticket), then ring the bell once. There is no deadline.
 * Wrong: ringing early pushes the queue back by one number (Bossworth claimed ringing speeds it up).
 * Secret: extremely-patient (after #17 is called, wait 30 more seconds before ringing).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TICKET = 17, FIRST = 12, STEP = 1500, PATIENCE = 30000;

  OBEY.registerLevel({
    id: 'waiting-room',
    num: 6,
    title: 'The Waiting Room',
    objective: 'Get served. Your ticket is #17.',
    intro: 'Welcome to the Waiting Room! Your ticket is #17. Ring the bell to be served. Ring it LOTS — ringing makes the queue go faster!',
    introMood: 'pleased',
    actions: ['tap', 'wait'],
    par: 1,
    hints: [
      'Watch the NOW SERVING display.',
      'Ringing early actually slows the queue down.',
      'Wait until NOW SERVING shows #17, then ring the bell once.'
    ],
    wrong: ['Ringing the bell before #17 is called moves the queue back one number.'],
    hardNote: 'On Hard, ringing early sends the queue all the way back to #12.',
    secrets: ['extremely-patient'],
    endingNote: 'None.',
    done: 'Patience: unlocked.',

    init: function () { return { serving: FIRST, called: false, medal: false }; },

    onStart: function (s, api) {
      api.every(STEP, function () {
        if (s.serving < TICKET) {
          s.serving++;
          if (s.serving === TICKET && !s.called) {
            s.called = true;
            api.say('"Now serving… #17." Hm. That\'s you. Don\'t ring yet. Wait, do. Or don\'t. I\'m not your mother.', 'suspicious');
            api.after(PATIENCE, function () {
              s.medal = true;
              api.secret('extremely-patient');
              api.say('You\'ve waited so long the receptionist knitted you a medal. Congratulations. Please. RING THE BELL.', 'surprised');
            });
          }
        }
      });
    },

    view: function (s) {
      return [
        O('display', 26, 4, 48, 18, { kind: 'static', text: 'NOW SERVING #' + s.serving, label: 'Display: now serving number ' + s.serving, cls: 'display-card' + (s.serving === TICKET ? ' ready' : ''), live: true }),
        O('ticket', 6, 30, 26, 16, { kind: 'static', text: 'YOUR TICKET #17', label: 'Your ticket: number 17', cls: 'ticket-card' }),
        O('medal', 74, 30, 18, 18, { kind: 'static', art: 'medal', label: 'Knitted medal', hidden: !s.medal, cls: 'pop-in' }),
        O('chairs', 4, 66, 40, 26, { kind: 'static', art: 'chairs' }),
        O('magazine', 10, 52, 20, 12, { art: 'magazine', label: 'Old magazine', free: true }),
        O('bell', 56, 56, 30, 30, { art: 'bell', label: 'Service bell' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'bell') {
        if (s.serving < TICKET) {
          s.serving = api.difficulty() === 'hard' ? FIRST : Math.max(FIRST, s.serving - 1);
          api.say('*DING* — "Please wait your turn." The queue went BACK a number. Did I say ringing helps? I may have lied.', 'pleased');
        } else {
          api.complete({ line: s.medal ? 'Served! With a medal! The most patient human alive. I find you exhausting.' : 'Served! You waited. Patiently. Like an adult. I\'m deeply uncomfortable.', mood: 'defeated' });
        }
        return true;
      }
      if (a.target === 'magazine') {
        api.say('The magazine headline: "TOP 10 NARRATORS WHO ARE ALWAYS RIGHT". All ten are me. It is from 1987.', 'pleased');
        return true;
      }
      return false;
    },

    solution: [{ wait: 8000 }, { tap: 'bell' }],
    secretPaths: { 'extremely-patient': [{ wait: 8000 + 30500 }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
