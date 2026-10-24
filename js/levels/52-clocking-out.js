/* Level 52 — Clocking Out
 * "Clock out and go home — it's already set to OUT." Payroll's rule: no OUT without an IN. You never clocked
 * in, so stamping OUT first is a trap. Switch to IN, stamp, switch to OUT, stamp. Stamping IN twice and the
 * door before clocking out are nopes.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'clocking-out',
    num: 52,
    title: 'Clocking Out',
    objective: 'Clock out and go home.',
    intro: 'Last job of the day: clock out and go home. The machine\'s already set to OUT. Just pop your card in. Easy. Nothing weird about it at all.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'sequence', 'read'],
    par: 4,
    hints: [
      'Check your time card. What is missing from it?',
      'Payroll won\'t let you leave a place you never arrived at.',
      'Switch to IN, drag the card in, switch to OUT, drag the card in again.'
    ],
    wrong: ['Stamping OUT without an IN gets you marked as a ghost (trap).', 'Stamping IN twice is refused (nope).', 'The door won\'t open until you clock out (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'In at nine, out at five. A full day\'s work in four actions. I\'m reporting you for efficiency.',
    trick: 'You can\'t clock out without clocking in — the OUT setting was a shortcut to a payroll trap.',

    init: function () { return { mode: 'OUT', inT: null, outT: null }; },

    view: function (s) {
      return [
        O('card', 6, 18, 20, 28, { art: 'a-timecard', artOpts: { inT: s.inT, outT: s.outT }, label: 'Your time card. IN: ' + (s.inT || 'blank') + '. OUT: ' + (s.outT || 'blank') + '. (Drag it into the clock.)', drag: true }),
        O('rack', 2, 48, 28, 9, { kind: 'static', text: 'Card rack', label: '', cls: 'tag-card' }),
        O('clock', 34, 4, 30, 42, { art: 'a-timeclock', artOpts: { mode: s.mode }, label: 'Time clock, set to ' + s.mode + ' (drop your card here)', zone: true }),
        O('mode', 34, 50, 30, 11, { text: 'Switch to ' + (s.mode === 'IN' ? 'OUT' : 'IN'), label: 'Switch the time clock to ' + (s.mode === 'IN' ? 'OUT' : 'IN'), cls: 'btn-card' }),
        O('rule', 67, 4, 31, 32, { kind: 'static', text: 'PAYROLL RULE\nNo OUT without an IN.', label: 'Payroll rule: no out without an in', cls: 'book-card' }),
        O('door', 70, 44, 24, 52, { art: 'door', artOpts: { sign: 'HOME', small: true }, label: 'Door marked HOME' }),
        O('plant', 6, 66, 14, 30, { art: 'plant', label: 'Office plant', free: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'card' && a.zone === 'clock') {
        if (s.mode === 'IN') {
          if (s.inT) { api.nope('card'); api.say('You\'re already clocked in. Clocking in twice doesn\'t make you twice as here.', 'annoyed'); return true; }
          s.inT = '9:00';
          api.say('Clocked IN? Now? On the last level? That\'s… keen. Suspiciously keen.', 'suspicious');
          return true;
        }
        if (!s.inT) {
          api.fail('ERROR: CANNOT LEAVE A PLACE YOU NEVER ARRIVED. Payroll marks you as a ghost. Woooo. Fresh card, start again.');
          return true;
        }
        s.outT = '17:00';
        api.defy('in');
        api.complete({ line: 'Ka-chunk. IN at nine, OUT at five. Perfectly legal. I hate perfectly legal. Off you go, then. Home. See you… tomorrow?', mood: 'defeated' });
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'mode':
          s.mode = s.mode === 'IN' ? 'OUT' : 'IN';
          api.say(s.mode === 'IN' ? 'IN? Why IN? We\'re going OUT. Out is the direction of home.' : 'OUT. Yes. Good. The correct direction.', s.mode === 'IN' ? 'suspicious' : 'pleased');
          return true;
        case 'card':
          api.say('Drag it into the clock. It\'s set to OUT already. I did that for you. You\'re welcome.', 'pleased');
          return true;
        case 'clock':
          api.say('Tick. Tock. Drop your card in.', 'neutral');
          return true;
        case 'door':
          api.nope('door');
          api.say(s.inT ? 'You\'re clocked in. Leaving now is called "skiving". Clock out first.' : 'Leaving without clocking out? That\'s how you end up in my spreadsheet.', 'pleased');
          return true;
        case 'plant':
          api.say('The plant never clocks out. It photosynthesises overtime.', 'neutral');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'mode' }, { drop: ['card', 'clock'] }, { tap: 'mode' }, { drop: ['card', 'clock'] }],
    checks: [
      { name: 'clock out straight away', steps: [{ drop: ['card', 'clock'] }], expect: 'fail' },
      { name: 'clock in twice', steps: [{ tap: 'mode' }, { drop: ['card', 'clock'] }, { drop: ['card', 'clock'] }], expect: 'nope' },
      { name: 'walk out early', steps: [{ tap: 'door' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
