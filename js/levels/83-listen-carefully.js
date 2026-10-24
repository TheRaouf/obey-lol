/* Level 83 — Listen Carefully
 * Bossworth shouts "Platform 2, run!" over the station announcement. The announcement keeps going:
 * that train is going to the train wash; Seaside passengers need Platform 5.
 * Solution: let the announcement finish, then go to Platform 5. Wrong: Platform 2 (trap), others (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var LINES = [
    'Ding-dong! The train at Platform 2 is the 10:15 to Seaside…',
    '…according to this morning\'s timetable.',
    'That train is now going to the train wash instead.',
    'Passengers for Seaside, please go to Platform 5. Ding-dong!'
  ];
  var STEP = 2000;

  OBEY.registerLevel({
    id: 'listen-carefully',
    num: 83,
    title: 'Listen Carefully',
    objective: 'Catch the train to Seaside.',
    intro: 'Seaside train, PLATFORM 2! Run! Don\'t wait for the announcement, announcers just ramble on about nothing. I already know everything. Platform 2! GO GO GO!',
    introMood: 'panicked',
    actions: ['wait', 'read', 'tap'],
    par: 1,
    hints: [
      'Bossworth stopped listening after the first sentence. Don\'t copy him.',
      'Let the announcement play right to the end before you move.',
      'Wait for the last line, then go to Platform 5.'
    ],
    wrong: ['Platform 2 takes you through the train wash (trap).', 'Platforms 1, 3 and 4 go elsewhere (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Seaside, here you come. Bossworth is still on Platform 2, getting rinsed.',
    trick: 'The announcement changed its mind halfway through. Only listening to the end got you Platform 5.',

    init: function () { return { n: 1 }; },

    onStart: function (s, api) {
      api.every(STEP, function () { if (s.n < LINES.length) s.n++; });
    },

    view: function (s) {
      var shown = LINES.slice(0, s.n).join('\n');
      var objs = [
        O('speaker', 4, 6, 14, 18, { kind: 'static', art: 'speaker', artOpts: { vol: 3 }, label: 'Station loudspeaker' }),
        O('pa', 20, 4, 76, 38, { kind: 'static', text: shown + (s.n < LINES.length ? '\n…' : ''), label: 'Announcement so far: ' + LINES.slice(0, s.n).join(' '), cls: 'speech-card' }),
        O('train', 6, 46, 50, 22, { kind: 'static', art: 'c-train', artOpts: { foam: s.n >= 3 }, label: s.n >= 3 ? 'The train at Platform 2, now covered in train-wash foam' : 'A train waiting at Platform 2' }),
        O('p2tag', 60, 54, 34, 8, { kind: 'static', text: '← Platform 2', label: '', cls: 'tag-card' })
      ];
      for (var p = 1; p <= 5; p++) {
        var row = p <= 3 ? 0 : 1, col = p <= 3 ? p - 1 : p - 4;
        objs.push(O('p' + p, (row ? 19 : 4) + col * 31, 72 + row * 14, 29, 12, { text: 'Platform ' + p, label: 'Go to platform ' + p, cls: 'btn-card' }));
      }
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^p([1-5])$/.exec(a.target);
      if (!m) return false;
      var p = Number(m[1]);
      if (p === 5) {
        api.defy('platform');
        api.complete({ line: 'Platform 5, Seaside express. You listened to the WHOLE announcement? All of it? Even the ding-dong? I usually leave during the ding.', mood: 'defeated' });
      } else if (p === 2) {
        api.fail('All aboard Platform 2… straight into the TRAIN WASH. Brushes, bubbles, a hot-air dry. You come out sparkling and back at the start.');
      } else {
        api.nope(a.target);
        api.say(['', 'Platform 1: the slow train to Muddlecombe. It stops at every cow.', '', 'Platform 3: no trains. Just a pigeon who thinks it\'s a train.', 'Platform 4: a goods train full of garden gnomes. Not for passengers. Or gnomes, technically.'][p], 'neutral');
      }
      return true;
    },

    solution: [{ wait: 6200 }, { tap: 'p5' }],
    checks: [
      { name: 'Bossworth\'s platform', steps: [{ tap: 'p2' }], expect: 'fail' },
      { name: 'platform 2 after the update', steps: [{ wait: 6200 }, { tap: 'p2' }], expect: 'fail' },
      { name: 'random platform', steps: [{ tap: 'p3' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
