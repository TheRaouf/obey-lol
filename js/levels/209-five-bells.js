/* Level 209 — Five Bells (Shipwreck Shoals)
 * The sunken ship's hold opens "for the right bells". The ship's clock says 2:30. The bell table:
 * one bell per half hour of the watch, 12:30 = 1, 1:00 = 2 … 4:00 = 8. So 2:30 = 5 bells.
 * Bossworth wants "two and a half" rings. Ring 5, then Done.
 * Wrong: any other count (trap), Done with no rings (nope). Start over resets the count (free).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var RIGHT = 5;

  OBEY.registerLevel({
    id: 'five-bells',
    num: 209,
    title: 'Five Bells',
    objective: 'Ring the right time on the ship\'s bell.',
    intro: 'The hold opens if you ring the time on the bell. The clock says half past two, so ring it two and a half times. Ding, ding, di—. Easy.',
    introMood: 'neutral',
    actions: ['tap', 'count', 'read'],
    par: 6,
    hints: [
      'Ships don\'t ring the hour like a church does. Read the bell table.',
      'One bell for every half hour since the watch began at 12:00.',
      '12:30 is 1, 1:00 is 2, 1:30 is 3, 2:00 is 4, 2:30 is 5. Ring 5 times, then tap Done.'
    ],
    wrong: ['Ringing any number but 5 keeps the hold shut (trap).', 'Tapping Done before ringing at all (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Five bells. The hold creaks open. A crab inside checks its watch and nods.',
    trick: 'Ship\'s bells count half hours of the watch, not hours, so half past two was five bells.',

    init: function () { return { rung: 0, ringing: false }; },

    view: function (s) {
      return [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-deep', cls: 'backdrop' }),
        O('deck', 0, 74, 100, 26, { kind: 'static', art: 'i-deck', label: 'The deck of the sunken ship' }),
        O('plaque', 4, 3, 52, 14, { kind: 'static', text: 'The hold opens for the right bells', label: 'Plaque: the hold opens for the right bells', cls: 'plaque-card' }),
        O('table', 4, 20, 52, 32, { kind: 'static', text: 'SHIP\'S BELLS\n12:30 = 1 bell · 1:00 = 2\n+1 bell every half hour\n4:00 = 8 bells', label: 'Ship\'s bells: 12:30 is 1 bell, 1:00 is 2, one more bell every half hour, up to 4:00 which is 8 bells.', cls: 'honest-card' }),
        O('clock', 62, 3, 34, 12, { kind: 'static', text: 'Clock: 2:30', label: 'Ship\'s clock: half past two', cls: 'display-card' }),
        O('bell', 62, 30, 34, 44, { art: 'i-shipbell', artOpts: { ringing: s.ringing, frame: true }, label: 'Ship\'s bell (tap to ring). Rung ' + s.rung + ' times' }),
        O('count', 62, 17, 34, 10, { kind: 'static', text: 'Rung: ' + s.rung, label: 'Rung ' + s.rung + ' times', cls: 'panel-card' }),
        O('done', 4, 80, 44, 14, { text: 'Done ringing', label: 'Done ringing', cls: 'btn-card big' }),
        O('reset', 52, 80, 44, 14, { text: 'Start over', label: 'Start counting again', cls: 'btn-card ghost', free: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'bell':
          s.rung++; s.ringing = !s.ringing;
          if (s.rung === 3) api.say('Three?! That\'s half a bell too many. Bell maths is very precise.', 'annoyed');
          return true;
        case 'reset':
          s.rung = 0;
          return true;
        case 'done':
          if (!s.rung) { api.nope(); api.say('Done? You haven\'t rung it. The hold is waiting. So is the crab inside.', 'neutral'); return true; }
          if (s.rung !== RIGHT) { api.fail(s.rung + ' bell' + (s.rung === 1 ? '' : 's') + '? The hold stays shut and a grumpy eel tells you the time properly. Read the bell table!'); return true; }
          api.defy('two-and-a-half');
          api.complete({ line: 'Five bells! The hold opens. Half past two is five bells? Who designed this, a pelican?', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'bell' }, { tap: 'bell' }, { tap: 'bell' }, { tap: 'bell' }, { tap: 'bell' }, { tap: 'done' }],
    checks: [
      { name: 'two bells is a trap', steps: [{ tap: 'bell' }, { tap: 'bell' }, { tap: 'done' }], expect: 'fail' },
      { name: 'three bells is a trap', steps: [{ tap: 'bell' }, { tap: 'bell' }, { tap: 'bell' }, { tap: 'done' }], expect: 'fail' },
      { name: 'done with no rings is a nope', steps: [{ tap: 'done' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
