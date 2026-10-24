/* Level 108 — Signal Delay
 * Drive the Mars rover two squares to the rock sample and drill it. Every command takes 3 s to
 * reach Mars; the "in transit" panel lists what is on its way. Bossworth says it isn't
 * responding and to mash FORWARD. Three forwards drive it into the crater (trap).
 * Correct: FORWARD, FORWARD, DRILL, then wait. Drilling plain dirt is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DELAY = 3000, SAMPLE = 2, CRATER = 3;
  var CELLS = ['START', '', 'SAMPLE', 'CRATER', ''];

  OBEY.registerLevel({
    id: 'signal-delay',
    num: 108,
    title: 'Signal Delay',
    objective: 'Drill the rock sample on Mars.',
    intro: 'The rover isn\'t responding! Press FORWARD. Then again. And again! Mash it! Mashing is how scientists communicate with machines.',
    introMood: 'panicked',
    actions: ['tap', 'wait', 'planning'],
    par: 3,
    hints: [
      'Mars is far away. Read the banner: commands take a while to arrive.',
      'Every press is queued in the "in transit" panel and will all happen. Count the squares to the sample.',
      'Press FORWARD twice and DRILL once, then wait for them to arrive.'
    ],
    wrong: ['Too many FORWARDs drive the rover into the crater (trap).', 'Drilling before reaching the sample just drills dirt (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Sample drilled, rover intact, patience rewarded. Gross.',
    trick: 'Commands to Mars arrive late but all arrive, so mashing queues extra moves; you plan the whole route once and wait.',

    init: function () { return { pos: 0, transit: [] }; },

    view: function (s) {
      var objs = [
        O('banner', 4, 2, 92, 11, { kind: 'static', text: 'Earth → Mars: every command takes 3 seconds to arrive.', label: 'Banner: Earth to Mars, every command takes 3 seconds to arrive.', cls: 'tag-card' })
      ];
      CELLS.forEach(function (c, i) {
        var x = 4 + i * 19;
        objs.push(O('cell' + i, x, 18, 17, 34, { kind: 'static', text: '', label: '', cls: 'tag-card' }));
        if (c) objs.push(O('name' + i, x, 54, 17, 8, { kind: 'static', text: c, label: '', cls: 'tag-card' }));
      });
      objs.push(O('sample', 4 + SAMPLE * 19 + 2, 38, 13, 12, { kind: 'static', art: 'stone', label: 'Rock sample, square 3' }));
      objs.push(O('crater', 4 + CRATER * 19 + 1, 36, 15, 12, { kind: 'static', art: 'd-crater', label: 'Crater, square 4' }));
      objs.push(O('rover', 4 + s.pos * 19 + 1, 22, 15, 13, { kind: 'static', art: 'd-rover', label: 'Rover on square ' + (s.pos + 1), cls: 'hero-sprite' }));
      var t = s.transit.length ? s.transit.join(', ') : 'nothing';
      objs.push(O('transit', 4, 64, 92, 12, { kind: 'static', text: 'In transit: ' + t, label: 'Commands in transit: ' + t, cls: 'display-card' }));
      objs.push(O('fwd', 8, 80, 38, 15, { text: 'FORWARD', label: 'Send FORWARD', cls: 'btn-card accent big' }));
      objs.push(O('drill', 54, 80, 38, 15, { text: 'DRILL', label: 'Send DRILL', cls: 'btn-card big' }));
      return objs;
    },


    on: function (a, s, api) {
      if (a.type !== 'tap' || (a.target !== 'fwd' && a.target !== 'drill')) return false;
      var cmd = a.target === 'fwd' ? 'FORWARD' : 'DRILL';
      s.transit.push(cmd);
      if (s.transit.length === 1) api.say('Nothing! See? It\'s ignoring you. Press it again! HARDER!', 'panicked');
      else if (s.transit.length >= 3 && cmd === 'FORWARD') api.say('That\'s the spirit! More forward! Forward is the best direction!', 'pleased');
      api.after(DELAY, function () {
        s.transit.shift();
        if (cmd === 'FORWARD') {
          s.pos++;
          if (s.pos === CRATER) {
            api.fail('…and the third FORWARD arrives. The rover rolls happily into the crater. All your presses were delivered. Every single one. Restarting the mission.');
          }
          return;
        }
        if (s.pos === SAMPLE) {
          api.defy('mash');
          api.complete({ line: 'Drill, whirr, sample collected. You pressed things ONCE and waited. Who taught you patience? Not me. Clearly not me.', mood: 'defeated' });
        } else {
          api.nope();
          api.say('Whirrr. The rover drilled… dirt. Premium Mars dirt, but dirt.', 'pleased');
        }
      });
      return true;
    },

    solution: [{ tap: 'fwd' }, { tap: 'fwd' }, { tap: 'drill' }, { wait: 3500 }],
    alternatives: { 'one-at-a-time': [{ tap: 'fwd' }, { wait: 3500 }, { tap: 'fwd' }, { wait: 3500 }, { tap: 'drill' }, { wait: 3500 }] },
    checks: [
      { name: 'mashing forward is a trap', steps: [{ tap: 'fwd' }, { tap: 'fwd' }, { tap: 'fwd' }, { wait: 3500 }], expect: 'fail' },
      { name: 'drilling at the start is a nope', steps: [{ tap: 'drill' }, { wait: 3500 }], expect: 'nope' },
      { name: 'nothing happens before the delay', steps: [{ tap: 'fwd' }, { tap: 'fwd' }, { tap: 'drill' }, { wait: 1000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
