/* Level 42 — Paper Jam
 * The printer's own display says JAM: TRAY 2. Bossworth says the jam is "always in the top lid" — opening
 * the lid is a trap (toner cloud). Fix: open tray 2, drag the crumpled sheet to recycling, close the tray,
 * press PRINT. Printing while jammed or with the tray open is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'paper-jam',
    num: 42,
    title: 'Paper Jam',
    objective: 'Print your exit pass.',
    intro: 'Printer\'s jammed again. The jam is ALWAYS in the top lid. Open the top lid and have a good rummage. Wear something black.',
    introMood: 'annoyed',
    actions: ['tap', 'drag', 'sequence', 'read'],
    par: 4,
    hints: [
      'The printer knows where its own jam is. It says so.',
      'The display says Tray 2. Open it and deal with what is inside.',
      'Open tray 2, drag the crumpled sheet into recycling, close the tray, press PRINT.'
    ],
    wrong: ['Opening the top lid covers you in toner (trap).', 'Printing while jammed does nothing (nope).', 'Printing with the tray open does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Exit pass printed. The printer and I are no longer on speaking terms.',
    trick: 'The printer\'s display named the real jam (Tray 2); Bossworth\'s "top lid" was a toner trap.',

    init: function () { return { open: false, jam: true }; },

    view: function (s) {
      var msg = s.jam ? 'JAM:\nTRAY 2' : (s.open ? 'CLOSE\nTRAY 2' : 'READY');
      return [
        O('stand', 8, 76, 58, 12, { kind: 'static', art: 'table' }),
        O('printer', 8, 30, 58, 48, { kind: 'static', art: 'a-printer', artOpts: { jam: s.jam }, label: 'Office printer' }),
        O('lid', 16, 18, 42, 10, { text: 'Top lid', label: 'Printer top lid', cls: 'btn-card ghost' }),
        O('tray', 16, 60, 42, 14, { art: 'a-tray', artOpts: { open: s.open }, label: 'Paper tray 2, ' + (s.open ? 'open' : 'closed') }),
        O('paper', 26, 78, 20, 16, { art: 'a-paper', label: 'Crumpled jammed sheet (drag it out)', drag: true, hidden: !(s.open && s.jam), cls: 'pop-in' }),
        O('display', 70, 8, 26, 18, { kind: 'static', text: msg, label: 'Printer display: ' + msg.replace('\n', ' '), cls: 'display-card' + (s.jam ? '' : ' ready') }),
        O('print', 70, 30, 26, 13, { text: 'PRINT', label: 'Print button', cls: 'btn-card big' }),
        O('bin', 76, 60, 16, 28, { art: 'bin', label: 'Paper recycling bin', zone: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'paper' && a.zone === 'bin') {
        s.jam = false;
        api.say('You… found the jam. In tray 2. Where the printer SAID it was. Show-off.', 'annoyed');
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'lid':
          api.fail('POOF! A cloud of toner. You now look like a chimney sweep. The jam was not in the lid. Have a wash and start again.');
          return true;
        case 'tray':
          s.open = !s.open;
          if (s.open && s.jam) api.say('Don\'t open THAT. That\'s tray 2. Nothing ever happens in tray 2.', 'panicked');
          else if (!s.open && !s.jam) api.say('Tray closed. The printer purrs. I hate it when it purrs.', 'suspicious');
          return true;
        case 'paper':
          api.say('Drag it out. Gently. Printers can smell fear.', 'neutral');
          return true;
        case 'print':
          if (s.jam) { api.nope('print'); api.say('PRINT. Nothing. PRINT. Nothing. Have you tried the lid? Try the lid.', 'pleased'); return true; }
          if (s.open) { api.nope('print'); api.say('It won\'t print with a tray hanging out. Even printers have standards.', 'neutral'); return true; }
          api.defy('tray');
          api.complete({ line: 'Whirr… EXIT PASS. One page. Warm. Smug. Just like you.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'tray' }, { drop: ['paper', 'bin'] }, { tap: 'tray' }, { tap: 'print' }],
    checks: [
      { name: 'rummage in the lid', steps: [{ tap: 'lid' }], expect: 'fail' },
      { name: 'print while jammed', steps: [{ tap: 'print' }], expect: 'nope' },
      { name: 'print with the tray open', steps: [{ tap: 'tray' }, { drop: ['paper', 'bin'] }, { tap: 'print' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
