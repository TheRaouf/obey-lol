/* Level 163 — Fair Test (Paintpot Pass)
 * Science fair question: does ramp HEIGHT change how far a car rolls? Bossworth's two ramps differ in
 * height, car AND floor. The poster: change ONE thing, keep the rest the same. Make the cars and floors
 * match (heights still different), then Run.
 * Wrong: running an unfair test (trap); running two identical ramps (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var OPT = { h: ['LOW', 'HIGH'], car: ['SMALL', 'BIG'], floor: ['CARPET', 'WOOD'] };
  var NAME = { h: 'height', car: 'car', floor: 'floor' };

  OBEY.registerLevel({
    id: 'fair-test',
    num: 163,
    title: 'Fair Test',
    objective: 'Set up a fair test of ramp height, then run it.',
    intro: 'Science fair! Judging in five minutes. I set up the ramps: one is different in EVERY way, which makes it extra scientific. Press Run and write down whatever happens.',
    introMood: 'annoyed',
    actions: ['tap', 'logic'],
    par: 3,
    hints: [
      'Read the poster. How many things are different between the ramps?',
      'The question is about height, so height is the only thing allowed to differ.',
      'Make both cars the same and both floors the same (keep the heights different), then Run.'
    ],
    wrong: ['Running a test where more than height differs is a trap.', 'Running two identical ramps is a nope.'],
    secrets: [],
    endingNote: 'None.',
    done: 'One change, one answer. The judges gave it a rosette.',
    trick: 'A fair test changes only the thing you are testing, so the cars and floors had to match while the heights stayed different.',

    init: function () { return { A: { h: 0, car: 0, floor: 0 }, B: { h: 1, car: 1, floor: 1 } }; },

    view: function (s) {
      var out = [
        O('poster', 4, 3, 92, 9, { kind: 'static', text: 'FAIR TEST: change ONE thing. Keep the rest the same.', label: 'Poster: fair test, change one thing, keep the rest the same', cls: 'honest-card' }),
        O('q', 4, 13, 92, 8, { kind: 'static', text: 'Question: does ramp HEIGHT change how far a car rolls?', label: 'Question: does ramp height change how far a car rolls?', cls: 'tag-card' })
      ];
      ['A', 'B'].forEach(function (r, j) {
        var st = s[r], x = 4 + j * 48;
        ['h', 'car', 'floor'].forEach(function (k, i) {
          out.push(O('t' + r + k, x, 24 + i * 10.5, 44, 9, { text: r + ' ' + NAME[k] + ': ' + OPT[k][st[k]], label: 'Ramp ' + r + ' ' + NAME[k] + ': ' + OPT[k][st[k]].toLowerCase() + ' (tap to change)', cls: 'btn-card' }));
        });
        out.push(O('ramp' + r, x, 68, 44, 28, { kind: 'static', art: 'g-ramp', artOpts: { high: st.h === 1, big: st.car === 1, floor: st.floor === 0 ? 'carpet' : 'wood' }, label: 'Ramp ' + r + ': ' + OPT.h[st.h].toLowerCase() + ', ' + OPT.car[st.car].toLowerCase() + ' car, ' + OPT.floor[st.floor].toLowerCase() + ' floor' }));
        out.push(O('name' + r, x + 30, 69, 12, 7, { kind: 'static', text: r, label: '', cls: 'tag-card' }));
      });
      out.push(O('run', 30, 56, 40, 10, { text: 'Run the test', label: 'Run the test', cls: 'btn-card big' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var m = /^t([AB])(h|car|floor)$/.exec(a.target);
      if (m) {
        var st = s[m[1]];
        st[m[2]] = 1 - st[m[2]];
        if (m[2] !== 'h') api.say('You\'re making them MORE alike? Where\'s the drama? Science needs drama!', 'annoyed');
        return true;
      }
      if (a.target !== 'run') return false;
      var diff = ['h', 'car', 'floor'].filter(function (k) { return s.A[k] !== s.B[k]; });
      if (!diff.length) { api.nope('run'); api.say('Two identical ramps. Two identical results. Riveting. You\'re testing nothing at all.', 'suspicious'); return true; }
      if (diff.length === 1 && diff[0] === 'h') {
        api.defy('fair');
        api.complete({ line: 'Same car, same floor, different heights. The high one rolls further and EVERYONE knows why. A rosette! For boring science! I\'m stunned.', mood: 'defeated' });
        return true;
      }
      api.fail('Zoom, zoom. A judge squints: "So was it the ' + diff.map(function (k) { return NAME[k]; }).join(', the ') + '?" Nobody knows. The judge writes "unfair" and walks off. Reset the ramps.');
      return true;
    },

    solution: [{ tap: 'tBcar' }, { tap: 'tBfloor' }, { tap: 'run' }],
    alternatives: { matchA: [{ tap: 'tAcar' }, { tap: 'tAfloor' }, { tap: 'run' }] },
    checks: [
      { name: 'Bossworth\'s ramps', steps: [{ tap: 'run' }], expect: 'fail' },
      { name: 'wrong thing changed', steps: [{ tap: 'tBh' }, { tap: 'tBcar' }, { tap: 'run' }], expect: 'fail' },
      { name: 'identical ramps', steps: [{ tap: 'tBh' }, { tap: 'tBcar' }, { tap: 'tBfloor' }, { tap: 'run' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
