/* Level 194 — Blow the Tanks (Periscope Pier)
 * The sub sits at 30 m. Bossworth: flood the tanks to go UP ("water is heavy, it pushes us up"),
 * then pop the hatch. The control legend says AIR = rise, WATER = sink. Blow the tanks, wait to
 * surface, then open the hatch.
 * Wrong: hatch underwater (trap), flooding (nope: you sink to the seabed).
 * Ruin: the EMERGENCY BLOW button launches the sub out of the sea onto the fish market roof.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TICK = 700, BOTTOM = 40;

  OBEY.registerLevel({
    id: 'blow-the-tanks',
    num: 194,
    title: 'Blow the Tanks',
    objective: 'Surface and open the hatch.',
    intro: 'To go UP, we FLOOD the tanks. Water is heavy, so it pushes us up. Basic science. Then pop the hatch for some fresh air.',
    introMood: 'neutral',
    actions: ['tap', 'wait'],
    par: 2,
    hints: [
      'Read the legend on the control panel, not the captain.',
      'Air in the tanks makes the sub rise. Water makes it sink.',
      'Tap BLOW, wait until the depth says 0 m, then open the hatch.'
    ],
    wrong: ['Opening the hatch underwater floods the sub (trap).', 'Flooding the tanks sinks you to the seabed (nope).', 'The emergency blow launches the sub into the air (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Fresh air. Smells of fish. My favourite.',
    trick: 'Air is lighter than water, so blowing air into the tanks lifted the sub; flooding them only sank it.',

    init: function () { return { depth: 30, tanks: 'trim' }; },

    onStart: function (s, api) {
      api.every(TICK, function () {
        if (s.tanks === 'air' && s.depth > 0) {
          s.depth -= 10;
          if (s.depth === 0) api.say('We\'ve… surfaced. With AIR. That is not how I remember science.', 'surprised');
        } else if (s.tanks === 'water' && s.depth < BOTTOM) {
          s.depth += 10;
          if (s.depth === BOTTOM) api.say('Hmm. The sea floor seems to have come up to meet us. Rude of it.', 'annoyed');
        }
      });
    },

    view: function (s) {
      var subY = 4 + s.depth * 1.3;
      var tanks = { trim: 'half air, half water', air: 'full of AIR', water: 'full of WATER' }[s.tanks];
      return [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-sea', cls: 'backdrop' }),
        O('surface', 0, 0, 100, 12, { kind: 'static', art: 'i-surface', label: 'The surface' }),
        O('sub', 18, subY, 34, 22, { kind: 'static', art: 'i-sub', artOpts: { bubbles: s.tanks === 'air' && s.depth > 0, hatch: false }, label: 'Your very small submarine, ' + (s.depth ? s.depth + ' metres down' : 'at the surface') }),
        O('legend', 62, 14, 34, 20, { kind: 'static', text: 'AIR in tanks: rise\nWATER in tanks: sink', label: 'Control legend: air in the tanks makes you rise, water makes you sink', cls: 'honest-card' }),
        O('depth', 62, 37, 34, 11, { kind: 'static', text: 'Depth: ' + s.depth + ' m', label: 'Depth gauge: ' + s.depth + ' metres', cls: 'display-card' + (s.depth === 0 ? ' ready' : '') }),
        O('tanks', 62, 50, 34, 14, { kind: 'static', text: 'Tanks: ' + tanks, label: 'Tanks are ' + tanks, cls: 'panel-card' }),
        O('flood', 4, 79, 21, 14, { text: 'FLOOD', label: 'Flood the tanks with water', cls: 'btn-card big accent' }),
        O('blow', 27, 79, 21, 14, { text: 'BLOW', label: 'Blow air into the tanks', cls: 'btn-card big' }),
        O('hatch', 50, 79, 21, 14, { text: 'Open hatch', label: 'Open the hatch', cls: 'btn-card big' }),
        O('emergency', 75, 77, 21, 18, { text: 'EMERGENCY BLOW', label: 'Emergency blow (do not press)', cls: 'btn-card small accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'flood':
          api.nope();
          s.tanks = 'water';
          api.say('Flooding! Now we rise maje… we are going down. Why are we going down?', 'surprised');
          return true;
        case 'blow':
          s.tanks = 'air';
          api.defy('flood');
          api.say(s.depth ? 'You\'re putting AIR in? Air is nothing! Nothing can\'t lift a submarine!' : 'Blowing again? We\'re already bobbing like a rubber duck.', 'annoyed');
          return true;
        case 'hatch':
          if (s.depth > 0) {
            api.fail('You open the hatch ' + s.depth + ' metres underwater. The sea comes in to say hello. All of it. Back to the start, damp.');
          } else {
            api.complete({ line: 'Hatch open, sky above, seagull on my hat. We surfaced. Using air. I shall be writing to the sea about this.', mood: 'defeated' });
          }
          return true;
        case 'emergency':
          api.complete({ ruin: 'flying-submarine', line: 'EMERGENCY BLOW! The sub leaps out of the sea like a salmon and lands on the fish market roof. I am being bid on. Someone has offered three kippers!', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'blow' }, { wait: 2200 }, { tap: 'hatch' }],
    ruinPaths: { 'flying-submarine': [{ tap: 'emergency' }] },
    alternatives: { 'sink-first': [{ tap: 'flood' }, { wait: 1500 }, { tap: 'blow' }, { wait: 3000 }, { tap: 'hatch' }] },
    checks: [
      { name: 'hatch underwater is a trap', steps: [{ tap: 'hatch' }], expect: 'fail' },
      { name: 'flooding is a nope', steps: [{ tap: 'flood' }], expect: 'nope' },
      { name: 'flood then hatch is a trap', steps: [{ tap: 'flood' }, { wait: 2000 }, { tap: 'hatch' }], expect: 'fail' },
      { name: 'blowing alone does not finish', steps: [{ tap: 'blow' }, { wait: 5000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
