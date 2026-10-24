/* Level 152 — Faulty Toaster (Carpark Capers)
 * Back at the returns desk: Bossworth wants a refund for his "broken" toaster. The plug is lying on
 * the counter and the wall socket's switch is OFF. Plug it in, switch it on, press the lever: toast.
 * Demanding a refund: trap (the clerk proves it works). Pressing the lever with no power: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'faulty-toaster',
    num: 152,
    title: 'Faulty Toaster',
    objective: 'Get some toast out of Bossworth\'s "broken" toaster.',
    intro: 'This toaster is BROKEN. I pressed the lever forty times. Demand a refund! Don\'t touch the plug, it\'s fragile, and that switch is just for decoration.',
    introMood: 'annoyed',
    actions: ['tap', 'sequence', 'observe'],
    par: 3,
    hints: [
      'Before calling it broken, check that it has any power at all.',
      'The plug is lying on the counter, and the socket\'s switch is off.',
      'Plug it in, switch the socket on, then press the toaster\'s lever.'
    ],
    wrong: ['Demanding a refund: the clerk plugs it in and it works (trap).', 'Pressing the lever with no power (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Toast. From the broken toaster.',
    trick: 'The toaster was never broken: it was unplugged and the socket was switched off, so power, not a refund, made the toast.',

    init: function () { return { plugged: false, on: false }; },

    view: function (s) {
      return [
        O('sign', 4, 3, 46, 10, { kind: 'static', text: 'RETURNS', label: 'Sign: returns desk', cls: 'sign-card' }),
        O('policy', 52, 3, 44, 12, { kind: 'static', text: 'Refunds: faulty items only', label: 'Returns policy: refunds for faulty items only', cls: 'tag-card' }),
        O('socket', 66, 22, 28, 20.5, { art: 'f-wsocket', artOpts: { plugged: s.plugged, on: s.on }, label: 'Wall socket, switch ' + (s.on ? 'ON' : 'OFF') + (s.plugged ? ', toaster plugged in' : ', nothing plugged in') + ' (tap to flip the switch)' }),
        O('switchTag', 66, 44, 28, 9, { kind: 'static', text: 'Switch: ' + (s.on ? 'ON' : 'OFF'), label: '', cls: 'tag-card' }),
        O('counter', 4, 56, 92, 33.7, { kind: 'static', art: 'f-counter', label: '' }),
        O('toaster', 30, 35.5, 30, 23.3, { art: 'f-toaster', artOpts: { toast: !!s.toast, on: !!s.toast }, label: 'Bossworth\'s toaster with two slices of bread in it (tap to press the lever)' }),
        O('plug', 6, 46.5, 20, 11.4, { art: 'f-plug', label: 'The toaster\'s plug, lying on the counter (tap to plug it in)', hidden: s.plugged }),
        O('clerk', 52, 66, 42, 15, { kind: 'static', text: 'Clerk: show me the fault?', label: 'The clerk says: show me the fault, please', cls: 'speech-card' }),
        O('refund', 8, 68, 40, 11, { text: 'Demand a refund', label: 'Demand a refund', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'plug':
          s.plugged = true;
          api.say('You plugged it in. Pointless. It\'s broken. Broken things don\'t care about plugs.', 'suspicious');
          return true;
        case 'socket':
          s.on = !s.on;
          api.say(s.on ? (s.plugged ? 'Click. A switch. On a socket. Who designs these things? …Don\'t press the lever.' : 'Switched on. Nothing\'s plugged in, but the socket is very proud of itself.') : 'Off again. Make your mind up.', s.on && s.plugged ? 'panicked' : 'neutral');
          return true;
        case 'toaster':
          if (s.plugged && s.on) {
            s.toast = true;
            api.defy('power');
            api.complete({ line: 'POP! Two golden slices. It… works. It always worked. I owe this toaster an apology. And a refund of all my shouting.', mood: 'defeated' });
          } else {
            api.nope('toaster');
            api.say('Nothing! See? BROKEN! Forty-one presses. I rest my case.', 'pleased');
          }
          return true;
        case 'refund':
          api.fail('The clerk plugs it in, flicks the switch, presses the lever. POP: perfect toast. "Not faulty, sir." She eats the toast. Bossworth is speechless for nearly a second.');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'plug' }, { tap: 'socket' }, { tap: 'toaster' }],
    alternatives: { 'switch-first': [{ tap: 'socket' }, { tap: 'plug' }, { tap: 'toaster' }] },
    checks: [
      { name: 'Bossworth\'s refund', steps: [{ tap: 'refund' }], expect: 'fail' },
      { name: 'the lever with no power', steps: [{ tap: 'toaster' }], expect: 'nope' },
      { name: 'plugged in but switched off', steps: [{ tap: 'plug' }, { tap: 'toaster' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
