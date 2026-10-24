/* Level 43 — Print Queue
 * Your one-page exit pass is stuck behind Bossworth's 400-page portraits, and he keeps adding more ahead of
 * you, so waiting never works. Cancelling his job is a trap; "move my job up" is a nope. Doris's note says
 * the basement printer is never busy: switch the printer, then print.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PRINTERS = ['3rd Floor (busy)', 'Basement (idle)'];
  var ADD_MS = 3000;

  OBEY.registerLevel({
    id: 'print-queue',
    num: 43,
    title: 'Print Queue',
    objective: 'Get your exit pass printed.',
    intro: 'Your exit pass is in the print queue. Behind my portrait. Four hundred pages, full colour, life size. Wait your turn. Patiently. Forever.',
    introMood: 'neutral',
    actions: ['tap', 'choice', 'read'],
    par: 2,
    hints: [
      'Watch the queue for a while. Is your turn ever going to come?',
      'You can\'t beat this queue. Is there another printer?',
      'Switch the printer to Basement, then press Print.'
    ],
    wrong: ['Cancelling Bossworth\'s job makes him resend it twice as big (trap).', 'Only admins can reorder the queue (nope).', 'Printing to the busy printer just joins the queue (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Printed in the basement. I\'m installing a portrait down there too.',
    trick: 'The queue was rigged to never reach you, so you skipped it by printing on the forgotten basement printer.',

    init: function () { return { ahead: 1, page: 3, printer: 0 }; },

    onStart: function (s, api) {
      api.every(ADD_MS, function () {
        s.ahead++;
        s.page = Math.min(399, s.page + 2);
        if (s.ahead % 2 === 0) api.say(['Oh, I just sent another portrait. Side profile. You don\'t mind.', 'Another one! Me, but moody. In black and white.', 'Just squeezing in "Bossworth at Sunset". Four hundred pages. Short one.'][(s.ahead / 2 - 1) % 3], 'pleased');
      });
    },

    view: function (s) {
      var q = 'QUEUE — ' + PRINTERS[0] + '\n1. Portrait_v1.pdf (400p) printing ' + s.page + '/400\n' +
        (s.ahead > 1 ? '2–' + s.ahead + '. More portraits (400p each)\n' : '') + (s.ahead + 1) + '. Exit_Pass.pdf (1p) — YOU';
      return [
        O('queue', 4, 4, 62, 42, { kind: 'static', text: q, label: 'Print queue on the 3rd floor: ' + s.ahead + ' Bossworth portrait jobs, then your exit pass at position ' + (s.ahead + 1), cls: 'panel-card' }),
        O('printer', 4, 50, 62, 12, { text: 'Printer: ' + PRINTERS[s.printer] + ' ▾', label: 'Printer choice: ' + PRINTERS[s.printer] + ' (tap to change)', cls: 'btn-card option' }),
        O('cancel', 4, 66, 30, 12, { text: 'Cancel his job', label: 'Cancel Bossworth\'s print job', cls: 'btn-card accent' }),
        O('bump', 36, 66, 30, 12, { text: 'Move mine up', label: 'Move my job up the queue', cls: 'btn-card' }),
        O('print', 4, 82, 62, 13, { text: 'Print exit pass', label: 'Print exit pass to the chosen printer', cls: 'btn-card big' }),
        O('mfdtable', 66, 66, 24, 8, { kind: 'static', art: 'table' }),
        O('mfd', 68, 48, 22, 20, { kind: 'static', art: 'a-printer', label: '3rd floor printer, busy printing a giant portrait' }),
        O('doris', 68, 4, 28, 37, { kind: 'static', text: 'Psst! The basement printer is never busy. Nobody knows it exists.\n— Doris', label: 'Sticky note from Doris: the basement printer is never busy, nobody knows it exists', cls: 'ticket-card' }),
        O('plant', 82, 72, 12, 24, { art: 'plant', label: 'Office plant', free: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'printer':
          s.printer = (s.printer + 1) % PRINTERS.length;
          api.say(s.printer ? 'The BASEMENT printer? We have a basement? Since when do we have a basement?' : 'Back to the 3rd floor. Good. Where you can admire my portraits.', s.printer ? 'surprised' : 'pleased');
          return true;
        case 'cancel':
          api.fail('You cancelled my portrait?! I\'ve resent it. At 800 pages. And you\'re back at the end of the queue.');
          return true;
        case 'bump':
          api.nope('bump');
          api.say('Only admins can reorder the queue. You are not an admin. I am the admin. Of the queue. And of my heart.', 'pleased');
          return true;
        case 'print':
          if (!s.printer) {
            api.nope('print');
            api.say('Sent! To the 3rd floor. Where it joins the queue. Behind ' + s.ahead + ' portrait' + (s.ahead === 1 ? '' : 's') + ' of me. Enjoy.', 'laughing');
            return true;
          }
          api.defy('basement');
          api.complete({ line: 'Printed. In the basement. In one second. Why does the basement get a fast printer? Who\'s down there? DORIS?', mood: 'defeated' });
          return true;
        case 'plant':
          api.say('The plant has been waiting for a print since March. It has grown roots. Literally.', 'neutral');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'printer' }, { tap: 'print' }],
    checks: [
      { name: 'cancel his job', steps: [{ tap: 'cancel' }], expect: 'fail' },
      { name: 'jump the queue', steps: [{ tap: 'bump' }], expect: 'nope' },
      { name: 'print to the busy printer', steps: [{ tap: 'print' }], expect: 'nope' },
      { name: 'wait patiently', steps: [{ wait: 30000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
