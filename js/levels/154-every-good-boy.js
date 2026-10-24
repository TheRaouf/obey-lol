/* Level 154 — Every Good Boy (Chalkboard Chasm)
 * Music lesson: play the three notes on the stave. Bossworth reads the lines from the TOP (E, G, B, D,
 * F going down). The poster: lines go E G B D F from the BOTTOM up ("Every Good Boy Deserves Football").
 * The notes sit on lines 3, 1 and 4: B, E, D. It spells BED.
 * Wrong: any other three notes (trap; Bossworth's reading gives B, F, G). "Start again" is free.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var NOTES = ['E', 'G', 'B', 'D', 'F'];
  var TUNE = 'BED';

  OBEY.registerLevel({
    id: 'every-good-boy',
    num: 154,
    title: 'Every Good Boy',
    objective: 'Play the three notes written on the board.',
    intro: 'Music lesson! Play the tune on the board. Easy: the TOP line is E, E for Excellent, then G, B, D, F going down. Off you toot!',
    introMood: 'neutral',
    actions: ['tap', 'read', 'sequence'],
    par: 3,
    hints: [
      'The poster counts the lines from a different end than Bossworth.',
      'From the bottom line up: E, G, B, D, F. Count each note\'s line from the bottom.',
      'The notes are on lines 3, 1 and 4 from the bottom: play B, E, D.'
    ],
    wrong: ['Playing any other three notes is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'B, E, D. The tune was called "Bed". Bossworth would like one.',
    trick: 'The stave\'s lines are E G B D F from the BOTTOM up, so the notes on lines 3, 1 and 4 were B, E, D, not Bossworth\'s top-down B, F, G.',

    init: function () { return { played: [] }; },

    view: function (s) {
      var shown = s.played.concat(['_', '_', '_']).slice(0, 3).join(' ');
      var out = [
        O('stave', 4, 4, 58, 22, { kind: 'static', art: 'g-stave', artOpts: { notes: [3, 1, 4] }, label: 'Stave on the whiteboard: three notes, on the 3rd, 1st and 4th lines counting from the bottom' }),
        O('poster', 65, 3, 31, 34, { kind: 'static', text: 'LINES, from the bottom up:\nE G B D F\nEvery Good Boy Deserves Football', label: 'Poster: the lines from the bottom up are E, G, B, D, F. Every Good Boy Deserves Football.', cls: 'honest-card' }),
        O('played', 4, 29, 58, 11, { kind: 'static', text: 'You played: ' + shown, label: 'You have played: ' + (s.played.join(', ') || 'nothing yet'), cls: 'display-card' }),
        O('again', 4, 44, 26, 10, { text: 'Start again', label: 'Start the tune again', cls: 'btn-card ghost', free: true }),
        O('kid', 82, 62, 14, 34, { kind: 'static', art: 'g-kid', artOpts: { color: '#5fd98a', hair: '#9a6b3f' }, label: '' }),
        O('keysTag', 4, 64, 46, 8, { kind: 'static', text: 'Recorder notes:', label: '', cls: 'tag-card' })
      ];
      NOTES.forEach(function (n, i) {
        out.push(O('n' + n, 4 + i * 15.5, 76, 14, 18, { text: n, label: 'Play note ' + n, cls: 'btn-card key' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'again') { s.played = []; return true; }
      var m = /^n([A-G])$/.exec(a.target);
      if (!m) return false;
      s.played.push(m[1]);
      if (s.played.length < 3) return true;
      var tune = s.played.join('');
      if (tune === TUNE) {
        api.defy('bed');
        api.complete({ line: 'B, E, D. "Bed." The class claps. I counted from the top because the top is where the important things live. Like my head.', mood: 'defeated' });
      } else if (tune === 'BFG') {
        api.fail('B, F, G? That\'s not a tune, that\'s a very big friendly giant. The poster counts from the BOTTOM line. Again!');
      } else {
        api.fail('"' + s.played.join(' ') + '"? The recorder squeaks, the class winces, the hamster hides. Read the lines again!');
      }
      return true;
    },

    solution: [{ tap: 'nB' }, { tap: 'nE' }, { tap: 'nD' }],
    checks: [
      { name: 'Bossworth\'s top-down reading', steps: [{ tap: 'nB' }, { tap: 'nF' }, { tap: 'nG' }], expect: 'fail' },
      { name: 'right notes, wrong order', steps: [{ tap: 'nE' }, { tap: 'nB' }, { tap: 'nD' }], expect: 'fail' },
      { name: 'start again is free', steps: [{ tap: 'nB' }, { tap: 'again' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
