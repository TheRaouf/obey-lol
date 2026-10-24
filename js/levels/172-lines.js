/* Level 172 — Lines (Detention Dunes)
 * Detention: write 20 lines. Bossworth: by hand, ONE at a time, no tricks. Scratched into the desk: four
 * pencils + a band = four lines at once. Strap the pencils with the rubber band (drag), write five times
 * (4 lines each), then leave. Writing one at a time also works, it just takes twenty taps.
 * Wrong: leaving before 20 lines (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var NEED = 20;

  OBEY.registerLevel({
    id: 'lines',
    num: 172,
    title: 'Lines',
    objective: 'Write your 20 lines, then leave detention.',
    intro: 'Detention! Twenty lines. By hand. ONE at a time. No tricks. I invented every detention trick there is, and none of them work. I checked.',
    introMood: 'annoyed',
    actions: ['drag', 'tap', 'count'],
    par: 7,
    hints: [
      'Someone left a tip scratched into the desk.',
      'The rubber band can strap all four pencils together.',
      'Drag the band onto the pencils, tap them five times, then open the door.'
    ],
    wrong: ['Trying to leave before 20 lines are written is a nope.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Twenty lines in five strokes. Detention: outsmarted.',
    trick: 'Four pencils strapped together write four lines per stroke, so twenty lines took five strokes instead of twenty.',

    init: function () { return { lines: 0, banded: false }; },

    view: function (s) {
      var done = s.lines >= NEED;
      return [
        O('slip', 4, 3, 50, 25, { kind: 'static', text: 'DETENTION\nWrite 20 lines:\n"I will not argue with the substitute."', label: 'Detention slip: write 20 lines, I will not argue with the substitute', cls: 'book-card' }),
        O('count', 58, 4, 38, 13, { kind: 'static', text: 'Lines: ' + Math.min(s.lines, NEED) + ' / ' + NEED, label: 'Lines written: ' + Math.min(s.lines, NEED) + ' of ' + NEED, cls: 'display-card' + (done ? ' ready' : '') }),
        O('door', 76, 24, 20, 72, { art: 'door', artOpts: { sign: 'EXIT' }, label: done ? 'Exit door (you may go)' : 'Exit door' }),
        O('desk', 2, 70, 70, 26, { kind: 'static', art: 'g-desk' }),
        O('tip', 8, 79, 58, 10, { kind: 'static', text: 'Scratched in the desk: 4 pencils + band = 4 lines at once', label: 'Scratched into the desk: four pencils and a band write four lines at once', cls: 'tag-card' }),
        O('paper', 46, 45, 22, 28, { kind: 'static', art: 'g-lines', artOpts: { n: s.lines }, label: 'Lined paper, ' + Math.min(s.lines, NEED) + ' lines written' }),
        O('pencils', 6, 46, 24, 26, { art: 'g-pencils', artOpts: { banded: s.banded }, label: s.banded ? 'Four pencils strapped together (tap to write four lines)' : 'Four pencils (tap to write a line)', zone: !s.banded }),
        O('band', 31, 60, 13, 11, { art: 'g-band', label: 'Rubber band (drag it)', drag: true, hidden: s.banded })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'band') {
        if (a.zone === 'pencils') {
          s.banded = true;
          api.defy('band');
          api.say('You strapped them TOGETHER? That\'s… that\'s the trick. The one trick. The one I said doesn\'t work. It\'s about to work, isn\'t it?', 'panicked');
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'pencils') {
        if (s.lines >= NEED) { api.say('Twenty already. Writing more is just showing off. Go home.', 'annoyed'); return true; }
        s.lines = Math.min(NEED, s.lines + (s.banded ? 4 : 1));
        if (s.lines >= NEED) api.say('Twenty lines. Every one says "I will not argue with the substitute". I can\'t argue with that.', 'defeated');
        else if (!s.banded && s.lines === 1) api.say('One line. Nineteen to go. Slowly. Like I said.', 'pleased');
        return true;
      }
      if (a.target === 'door') {
        if (s.lines < NEED) { api.nope('door'); api.say('Only ' + s.lines + ' lines? The door is locked until twenty. I locked it. With my mind.', 'pleased'); return true; }
        api.complete({ line: 'Twenty lines and out you go. In under a minute. I spent my WHOLE childhood doing them one at a time.', mood: 'defeated' });
        return true;
      }
      return false;
    },

    solution: [{ drop: ['band', 'pencils'] }, { tap: 'pencils' }, { tap: 'pencils' }, { tap: 'pencils' }, { tap: 'pencils' }, { tap: 'pencils' }, { tap: 'door' }],
    alternatives: { byHand: Array.apply(null, Array(20)).map(function () { return { tap: 'pencils' }; }).concat([{ tap: 'door' }]) },
    checks: [
      { name: 'leave early', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'five lines by hand then leave', steps: [{ tap: 'pencils' }, { tap: 'pencils' }, { tap: 'pencils' }, { tap: 'pencils' }, { tap: 'pencils' }, { tap: 'door' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
