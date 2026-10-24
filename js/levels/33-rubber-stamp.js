/* Level 33 — Rubber Stamp
 * Bossworth wants the form stamped APPROVED without being read. The form is an application to stay in
 * this room forever. Stamping it DENIED rejects the application, so you leave.
 * Wrong: APPROVED on the form (trap), the door before the form is processed (nope), stamping the in-tray (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'rubber-stamp',
    num: 33,
    title: 'Rubber Stamp',
    objective: 'Process the form so you can leave.',
    intro: 'Paperwork! Stamp this form APPROVED and you\'re free to go. I filled it in for you. Don\'t read it. It\'s very boring. Riveting, actually. But boring.',
    introMood: 'neutral',
    actions: ['drag', 'read'],
    par: 1,
    hints: [
      'Before you approve something, it helps to know what it is.',
      'Read the form. Do you actually want what it asks for?',
      'Drag the DENIED stamp onto the form.'
    ],
    wrong: ['Stamping APPROVED keeps you here forever (trap).', 'The door stays locked until the form is processed (nope).', 'Stamping the in-tray achieves nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Request denied. You\'re free. I hate forms now.',
    trick: 'The form was an application to stay forever, so the helpful stamp was DENIED.',

    init: function () { return { stamped: null }; },

    view: function (s) {
      return [
        O('desk', 2, 62, 76, 15, { kind: 'static', art: 'table' }),
        O('form', 4, 4, 52, 57, {
          text: 'FORM 27-B\n\nApplication to stay in this room FOREVER and fetch Bossworth\'s coffee.\n\nSigned: you (by Bossworth)' + (s.stamped ? '\n\n[' + s.stamped + ']' : ''),
          label: 'Form 27-B: application to stay in this room forever and fetch Bossworth\'s coffee. Drop a stamp here.',
          cls: 'book-card', zone: true
        }),
        O('approved', 57, 48, 14, 14, { art: 'a-stamp', artOpts: { word: 'APPROVED', color: 'red' }, label: 'Red rubber stamp: APPROVED (drag it)', drag: true }),
        O('denied', 71, 48, 14, 14, { art: 'a-stamp', artOpts: { word: 'DENIED', color: 'blue' }, label: 'Blue rubber stamp: DENIED (drag it)', drag: true }),
        O('tray', 6, 78, 30, 16, { text: 'IN-TRAY\n(pending)', label: 'In-tray marked pending', cls: 'tag-card', zone: true }),
        O('door', 80, 62, 16, 32, { art: 'door', artOpts: { sign: 'EXIT', small: true }, label: 'Exit door, locked until the form is processed' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && (a.target === 'approved' || a.target === 'denied')) {
        if (a.zone === 'form') {
          if (a.target === 'approved') {
            api.fail('KA-CHUNK. APPROVED! Welcome to forever. Your desk is the beige one. Coffee is at nine. …Kidding. Mostly. Try again.');
          } else {
            api.defy('denied');
            api.complete({ line: 'DENIED?! Your request to stay forever is… rejected. Which means you… leave. Who designed this form? I designed this form.', mood: 'defeated' });
          }
          return true;
        }
        if (a.zone === 'tray') {
          api.nope(a.target);
          api.say('You stamped the in-tray. It is now ' + (a.target === 'approved' ? 'approved' : 'denied') + '. It does not care.', 'suspicious');
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'approved':
        case 'denied':
          api.say('Stamps go ON things. Drag it onto the form. The APPROVED one. The nice red one.', 'neutral');
          return true;
        case 'form':
          api.say('Don\'t read it! Reading is how paperwork gets you.', 'panicked');
          return true;
        case 'tray':
          api.say('The in-tray. Where hope goes to wait.', 'neutral');
          return true;
        case 'door':
          api.nope('door');
          api.say('Locked until the form is processed. Rules are rules. I made them, so they\'re excellent.', 'pleased');
          return true;
      }
      return false;
    },

    solution: [{ drop: ['denied', 'form'] }],
    checks: [
      { name: 'approve the form', steps: [{ drop: ['approved', 'form'] }], expect: 'fail' },
      { name: 'door before processing', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'stamp the in-tray', steps: [{ drop: ['denied', 'tray'] }], expect: 'nope' },
      { name: 'recover after approving', steps: [{ drop: ['approved', 'form'] }, { drop: ['denied', 'form'] }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
