/* Level 114 — Docking Lights
 * The station flashes a four-colour docking code (blue, red, yellow, blue), shown on its beacon
 * and spelled out on the signal panel. Afterwards Bossworth "remembers" it as red, red, red, red.
 * Repeat the real code with the colour buttons. Replay is free. Pressing colours while the code is
 * still flashing is a nope; a wrong code is a trap.
 * Ruin: THRUST three times and just ram the station ("hard-docking").
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SEQ = ['blue', 'red', 'yellow', 'blue'];
  var LEAD = 600, STEP = 900, ON = 650;

  function play(s, api) {
    s.showing = true; s.lit = null; s.entry = [];
    SEQ.forEach(function (c, i) {
      api.after(LEAD + i * STEP, function () { s.lit = c; });
      api.after(LEAD + i * STEP + ON, function () { s.lit = null; });
    });
    api.after(LEAD + SEQ.length * STEP, function () {
      s.showing = false;
      api.say('Right, the code was red, red, red, red. I\'m almost certain. I was blinking a lot.', 'pleased');
    });
  }

  OBEY.registerLevel({
    id: 'docking-lights',
    num: 114,
    title: 'Docking Lights',
    objective: 'Repeat the station\'s docking code.',
    intro: 'Docking time! The station flashes a code, you copy it. Don\'t bother memorising it, I\'ll remember it for you. I have a memory like a steel trap. A rusty one. That I lost.',
    introMood: 'pleased',
    actions: ['wait', 'memory', 'tap'],
    par: 4,
    hints: [
      'Watch the beacon on the station yourself. Bossworth\'s memory is… decorative.',
      'The code is four colours long. Replay shows it again for free.',
      'Press blue, red, yellow, blue.'
    ],
    wrong: ['Entering the wrong code is a trap.', 'Pressing colours while the code is still flashing is a nope.', 'A little THRUST is a nope; ramming the station is a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Docked gently. The station sends a thank-you biscuit.',
    trick: 'Bossworth misremembered the code on purpose; the beacon itself showed blue, red, yellow, blue, and Replay let you check.',

    init: function () { return { showing: true, lit: null, entry: [], thrust: 0 }; },

    onStart: function (s, api) { play(s, api); },

    view: function (s) {
      var sig = s.lit ? s.lit.toUpperCase() : (s.showing ? '…' : 'done. Your turn!');
      var entered = s.entry.length ? s.entry.map(function (c) { return c.toUpperCase(); }).join(', ') : '(nothing yet)';
      return [
        O('station', 10, 2, 80, 40, { kind: 'static', art: 'd-station', artOpts: { lit: s.lit }, label: 'Space station beacon' + (s.lit ? ' flashing ' + s.lit : '') }),
        O('capsule', 42, 42, 16, 17, { kind: 'static', art: 'd-capsule', artOpts: { thrust: s.thrust > 0 }, label: 'Your capsule' }),
        O('signal', 62, 44, 34, 14, { kind: 'static', text: 'Signal: ' + sig, label: 'Signal panel: ' + sig, cls: 'panel-lights' + (s.showing ? '' : ' ok') }),
        O('entered', 4, 62, 92, 10, { kind: 'static', text: 'Entered: ' + entered, label: 'Entered code: ' + entered, cls: 'display-card' }),
        O('red', 6, 76, 16, 16, { text: 'R', label: 'Red button', cls: 'color-btn red' }),
        O('yellow', 26, 76, 16, 16, { text: 'Y', label: 'Yellow button', cls: 'color-btn yellow' }),
        O('blue', 46, 76, 16, 16, { text: 'B', label: 'Blue button', cls: 'color-btn blue' }),
        O('replay', 68, 75, 28, 10, { text: 'Replay signal', label: 'Replay the docking signal', cls: 'btn-card ghost', free: true }),
        O('thrust', 68, 87, 28, 11, { text: 'THRUST', label: 'Fire thrusters at the station', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'replay':
          if (s.showing) { api.say('It\'s still playing. Patience is a docking skill.', 'neutral'); return true; }
          play(s, api);
          api.say('Replaying. Watch closely. I certainly won\'t.', 'annoyed');
          return true;
        case 'thrust':
          s.thrust++;
          if (s.thrust >= 3) {
            api.complete({ ruin: 'hard-docking', line: 'CRUNCH. You rammed the station. You are docked. Technically. The station is now 30% capsule and furious. So am I.', mood: 'panicked' });
            return true;
          }
          api.nope();
          api.say(s.thrust === 1 ? 'A little nudge. The station is not impressed.' : 'Another nudge! The station is flashing its lights at you. Rudely.', 'suspicious');
          return true;
        case 'red':
        case 'yellow':
        case 'blue':
          if (s.showing) { api.nope(); api.say('Wait for the signal to finish! Even I know that. Probably.', 'annoyed'); return true; }
          s.entry.push(a.target);
          if (s.entry.length < SEQ.length) return true;
          if (s.entry.join() === SEQ.join()) {
            api.defy('memory');
            api.complete({ line: 'Docking code accepted. Blue, red, yellow, blue? That\'s not what I remembered. Which means my memory… no. No, the station is wrong.', mood: 'defeated' });
          } else {
            api.fail(s.entry.join() === 'red,red,red,red'
              ? 'Red, red, red, red. "CODE REJECTED." Who gave you THAT code? …Don\'t answer. Re-sending the signal.'
              : 'CODE REJECTED. The station flashes its lights crossly and sends the code again.');
          }
          return true;
      }
      return false;
    },

    solution: [{ wait: 4300 }, { tap: 'blue' }, { tap: 'red' }, { tap: 'yellow' }, { tap: 'blue' }],
    ruinPaths: { 'hard-docking': [{ tap: 'thrust' }, { tap: 'thrust' }, { tap: 'thrust' }] },
    checks: [
      { name: 'Bossworth\'s code is a trap', steps: [{ wait: 4300 }, { tap: 'red' }, { tap: 'red' }, { tap: 'red' }, { tap: 'red' }], expect: 'fail' },
      { name: 'pressing during the signal is a nope', steps: [{ tap: 'blue' }], expect: 'nope' },
      { name: 'one thrust is a nope', steps: [{ tap: 'thrust' }], expect: 'nope' },
      { name: 'replay then the right code', steps: [{ wait: 4300 }, { tap: 'replay' }, { wait: 4300 }, { tap: 'blue' }, { tap: 'red' }, { tap: 'yellow' }, { tap: 'blue' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
