/* Level 40 — The Org Chart
 * "Hand your report to your manager — me." Follow YOUR line on the org chart: it crosses the others and
 * leads up to Pat, not Bossworth. CEO is a trap (skip-level meeting); anyone else is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var LINES = [
    [50, 17, 17, 30], [50, 17, 50, 30], [50, 17, 83, 30],
    [17, 56, 83, 44], [50, 56, 17, 44], [83, 56, 50, 44]
  ];
  var PEOPLE = {
    ceo: 'Dame Ledger, CEO', boss: 'Bossworth, Head of Vibes', pat: 'Pat, Head of Paper', doris: 'Doris, Stationery Boss', kev: 'Kev, Facilities', mo: 'Mo, Post Room'
  };

  OBEY.registerLevel({
    id: 'org-chart',
    num: 40,
    title: 'The Org Chart',
    objective: 'Hand your report to your actual manager.',
    intro: 'Hand your report to your manager. That\'s me. I manage everybody. Check the org chart if you must, but it\'ll just say me. In big letters.',
    introMood: 'pleased',
    actions: ['drag', 'observe'],
    par: 1,
    hints: [
      'An org chart is a map. Start from YOU and follow your line upwards.',
      'Lines cross. The person directly above you is not necessarily your manager.',
      'Your line leads to Pat. Drag the report onto Pat.'
    ],
    wrong: ['Going straight to the CEO is a skip-level disaster (trap).', 'Bossworth is not your manager (nope).', 'Doris is only above you on the page (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Pat says thanks. Pat! I didn\'t even know we HAD a Pat.',
    trick: 'Your line crossed the chart to Pat — Bossworth only manages the post room.',

    init: function () { return {}; },

    view: function () {
      var Z = function (id, x, y, w, h, text) {
        return O(id, x, y, w, h, { text: text, label: PEOPLE[id] + ' (drop your report here)', cls: 'btn-card', zone: true });
      };
      return [
        O('lines', 0, 0, 100, 100, { kind: 'static', art: 'a-orglines', artOpts: { lines: LINES } }),
        Z('ceo', 34, 4, 32, 13, 'Dame Ledger\nCEO'),
        Z('boss', 2, 30, 30, 14, 'Bossworth\nHead of Vibes'),
        Z('pat', 35, 30, 30, 14, 'Pat\nHead of Paper'),
        Z('doris', 68, 30, 30, 14, 'Doris\nStationery'),
        Z('kev', 2, 56, 30, 13, 'Kev\nFacilities'),
        Z('mo', 35, 56, 30, 13, 'Mo\nPost Room'),
        O('you', 68, 56, 30, 13, { kind: 'static', text: 'YOU\nIntern', label: 'You, the intern. Your line goes up from here.', cls: 'btn-card accent' }),
        O('report', 4, 78, 24, 16, { text: 'Your report', label: 'Your report (drag it to your manager)', cls: 'ticket-card', drag: true }),
        O('legend', 34, 80, 62, 13, { kind: 'static', text: 'Each line leads up to that person\'s manager.', label: 'Legend: each line leads up to that person\'s manager', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'report') {
        switch (a.zone) {
          case 'pat':
            api.defy('pat');
            api.complete({ line: 'Pat?! PAT is your manager? Then who do I manage? …The post room. I manage Mo. Hi, Mo.', mood: 'defeated' });
            return true;
          case 'ceo':
            api.fail('A skip-level meeting! Dame Ledger returns your report with 40 corrections and a frown. Back to the bottom of the chart.');
            return true;
          case 'boss':
            api.nope('report');
            api.say('For me? How thoughtful! …Wait, the chart says you\'re not mine. Who drew this chart? Who ALLOWED the chart?', 'surprised');
            return true;
          case 'doris':
            api.nope('report');
            api.say('Doris is directly above you on the PAGE. She is not above you in LIFE. Follow the line.', 'suspicious');
            return true;
          case 'kev':
          case 'mo':
            api.nope('report');
            api.say((a.zone === 'kev' ? 'Kev' : 'Mo') + ' is on your level. Handing reports sideways is called "delegating". I invented it.', 'pleased');
            return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      if (PEOPLE[a.target]) { api.say(PEOPLE[a.target] + '. Drag your report onto them if you think they\'re the one. (It\'s me.)', 'neutral'); return true; }
      if (a.target === 'report') { api.say('Drag the report to your manager. Me. The big letters.', 'pleased'); return true; }
      return false;
    },

    solution: [{ drop: ['report', 'pat'] }],
    checks: [
      { name: 'straight to the CEO', steps: [{ drop: ['report', 'ceo'] }], expect: 'fail' },
      { name: 'give it to Bossworth', steps: [{ drop: ['report', 'boss'] }], expect: 'nope' },
      { name: 'whoever is directly above', steps: [{ drop: ['report', 'doris'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
