/* Level 106 — Airlock Etiquette
 * Get from the ship to the spacewalk through a two-door airlock. Bossworth: open both doors at
 * once, it's faster. Opening one door while the other is open vents the ship (trap).
 * Procedure: open inner, step in, close inner, open outer, step out.
 * Stepping into a closed door is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var POS = { ship: 6, lock: 44, space: 80 };

  OBEY.registerLevel({
    id: 'airlock-etiquette',
    num: 106,
    title: 'Airlock Etiquette',
    objective: 'Get out for your spacewalk.',
    intro: 'Spacewalk time! Open BOTH airlock doors at once. Saves time. Air is overrated. I\'ve never needed it. Well. Constantly. But it\'s overrated.',
    introMood: 'pleased',
    actions: ['tap', 'sequence', 'procedure'],
    par: 5,
    hints: [
      'The sign above the airlock has the only rule that matters.',
      'Only one door may be open at a time. Use the chamber in the middle as a waiting room.',
      'Open the inner door, step forward, close the inner door, open the outer door, step forward.'
    ],
    wrong: ['Opening a door while the other is open vents the ship (trap).', 'Walking into a closed door just bonks you (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One door at a time. Space is big, but manners are bigger.',
    trick: 'An airlock only works if one door is always shut, so you cycle through the middle chamber instead of opening both.',

    init: function () { return { inner: false, outer: false, at: 'ship' }; },

    view: function (s) {
      return [
        O('sign', 14, 2, 72, 12, { kind: 'static', text: 'ONE DOOR AT A TIME', label: 'Airlock sign: one door at a time, never open both doors at once', cls: 'sign-card' }),
        O('shipTag', 2, 16, 22, 8, { kind: 'static', text: 'SHIP', label: '', cls: 'tag-card' }),
        O('lockTag', 41, 16, 18, 8, { kind: 'static', text: 'AIRLOCK', label: '', cls: 'tag-card' }),
        O('spaceTag', 76, 16, 22, 8, { kind: 'static', text: 'SPACE', label: '', cls: 'tag-card' }),
        O('innerDoor', 26, 18, 14, 52, { kind: 'static', art: 'd-airdoor', artOpts: { open: s.inner }, label: 'Inner door, ' + (s.inner ? 'open' : 'closed') }),
        O('outerDoor', 60, 18, 14, 52, { kind: 'static', art: 'd-airdoor', artOpts: { open: s.outer }, label: 'Outer door, ' + (s.outer ? 'open' : 'closed') }),
        O('hero', POS[s.at], 40, 14, 22, { kind: 'static', art: 'hero', label: 'You, ' + (s.at === 'ship' ? 'inside the ship' : (s.at === 'lock' ? 'in the airlock chamber' : 'out in space')), cls: 'hero-sprite' }),
        O('inner', 4, 78, 28, 16, { text: 'Inner door:\n' + (s.inner ? 'OPEN' : 'CLOSED'), label: 'Inner door switch, ' + (s.inner ? 'open' : 'closed'), cls: 'btn-card' + (s.inner ? ' accent' : '') }),
        O('step', 36, 78, 28, 16, { text: 'Step forward', label: 'Step forward', cls: 'btn-card big' }),
        O('outer', 68, 78, 28, 16, { text: 'Outer door:\n' + (s.outer ? 'OPEN' : 'CLOSED'), label: 'Outer door switch, ' + (s.outer ? 'open' : 'closed'), cls: 'btn-card' + (s.outer ? ' accent' : '') })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var vent = 'WHOOOSH. Both doors open: everything not bolted down (you, my mug, three spoons) is now outside. Rescue drone deployed. Back to the start.';
      switch (a.target) {
        case 'inner':
          if (!s.inner && s.outer) { api.fail(vent); return true; }
          s.inner = !s.inner;
          if (!s.inner && s.at === 'lock') api.say('You shut yourself in the airlock. Cosy. Claustrophobic. Correct, annoyingly.', 'suspicious');
          return true;
        case 'outer':
          if (!s.outer && s.inner) { api.fail(vent); return true; }
          s.outer = !s.outer;
          if (s.outer && s.at === 'ship') api.say('The outer door is open, and you\'re still in the ship. Ambitious long-distance spacewalk.', 'pleased');
          return true;
        case 'step':
          if (s.at === 'ship') {
            if (!s.inner) { api.nope(); api.say('BONK. That\'s a closed door. Doors are better open. Both of them. Just saying.', 'pleased'); return true; }
            s.at = 'lock';
            api.say('In the airlock. Now open the outer door! Leave the inner one open. Live a little!', 'pleased');
            return true;
          }
          if (s.at === 'lock') {
            if (!s.outer) { api.nope(); api.say('BONK. Outer door\'s shut. Open it! Don\'t bother closing the other one…', 'pleased'); return true; }
            s.at = 'space';
            api.defy('both-doors');
            api.complete({ line: 'You\'re outside, the ship still has air, and my mug is safe. That\'s… that\'s the boring way. The ALIVE way. Fine.', mood: 'defeated' });
            return true;
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'inner' }, { tap: 'step' }, { tap: 'inner' }, { tap: 'outer' }, { tap: 'step' }],
    checks: [
      { name: 'opening both doors is a trap', steps: [{ tap: 'inner' }, { tap: 'outer' }], expect: 'fail' },
      { name: 'walking into a closed door is a nope', steps: [{ tap: 'step' }], expect: 'nope' },
      { name: 'stepping in then opening outer with inner open is a trap', steps: [{ tap: 'inner' }, { tap: 'step' }, { tap: 'outer' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
