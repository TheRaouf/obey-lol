/* Level 134 — Use By (Aisle Antics)
 * Milk must last until Sunday the 20th. The front cartons are dated 14, 15 and 16; the newer stock
 * stands on the riser behind (17, 20, 18). Move a front carton aside to reach the 20 behind it.
 * Any carton that goes off before the 20th in the trolley: trap. Shuffling the back row aside: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FRONT = [14, 15, 16], BACK = [17, 20, 18], XS = [12, 40, 68], NEED = 20;

  OBEY.registerLevel({
    id: 'use-by',
    num: 134,
    title: 'Use By',
    objective: 'Put milk in the trolley that lasts until Sunday the 20th.',
    intro: 'Milk for the week! Grab the one at the front. They\'re all the same. Milk is milk. Nobody has ever read a date on a carton. Dates are for calendars.',
    introMood: 'neutral',
    actions: ['drag', 'read'],
    par: 2,
    hints: [
      'Read the dates on every carton, including the ones at the back.',
      'Shops put the newest stock behind the old stock. You can\'t reach the back without moving the front.',
      'Drag the middle front carton (15) aside, then drag the 20 behind it into the trolley.'
    ],
    wrong: ['A carton that goes off before the 20th spoils the week (trap).', 'Moving the back cartons aside does nothing useful (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Milk until Sunday. Breakfast is safe.',
    trick: 'Shops stack the newest stock at the back, so the carton dated the 20th was behind the old ones, not at the front where Bossworth grabbed.',

    init: function () { return { moved: [false, false, false], backAside: [false, false, false] }; },

    view: function (s) {
      var out = [
        O('today', 4, 3, 44, 10, { kind: 'static', text: 'Today: Monday 14th', label: 'Sign: today is Monday the 14th', cls: 'sign-card' }),
        O('list', 52, 3, 44, 10, { kind: 'static', text: 'List: milk to last till Sun 20th', label: 'Shopping list: milk that lasts until Sunday the 20th', cls: 'tag-card' }),
        O('fridge', 6, 16, 88, 59, { kind: 'static', art: 'f-fridge', label: 'Milk fridge. A raised back row stands behind the front row of cartons.' })
      ];
      for (var i = 0; i < 3; i++) {
        var reachable = s.moved[i] && !s.backAside[i];
        out.push(O('b' + i, XS[i] + 6, 33, 14, 23.8, { art: 'f-carton', artOpts: { date: BACK[i], color: '#2f6fe4' }, label: 'Back-row milk carton, use by the ' + BACK[i] + 'th' + (reachable ? '' : ' (behind the front carton, out of reach)'), kind: reachable ? undefined : 'static', drag: reachable, hidden: s.backAside[i] }));
        out.push(O('f' + i, XS[i], 46, 14, 23.8, { art: 'f-carton', artOpts: { date: FRONT[i] }, label: 'Front-row milk carton, use by the ' + FRONT[i] + 'th', drag: true, hidden: s.moved[i] }));
      }
      out.push(O('aside', 4, 79, 40, 17, { text: s.moved.some(Boolean) ? 'Moved aside: ' + s.moved.map(function (m, i) { return m ? FRONT[i] + 'th' : ''; }).filter(Boolean).join(', ') : 'Space to put things aside', label: 'Space on the floor to put cartons aside', zone: true, free: true, cls: 'tag-card' }));
      out.push(O('trolley', 64, 76, 28, 22.7, { art: 'f-trolley', label: 'Your trolley (drop milk here to buy it)', zone: true, free: true }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'drop') return false;
      var m = /^([fb])(\d)$/.exec(a.target);
      if (!m) return false;
      var i = Number(m[2]), front = m[1] === 'f', date = front ? FRONT[i] : BACK[i];
      if (a.zone === 'aside') {
        if (front) {
          s.moved[i] = true;
          api.say(i === 1 ? 'Why are you moving the milk? Put that back. There is nothing behind it. Especially not a 20.' : 'Shuffling milk about. Riveting. Is this what you do for fun?', 'suspicious');
        } else {
          api.nope(a.target);
          api.say('No need to rearrange the whole fridge. The shelf-stacker has feelings.', 'annoyed');
        }
        return true;
      }
      if (a.zone === 'trolley') {
        if (date >= NEED) {
          api.defy('date');
          api.complete({ line: 'The 20th. From the BACK. You reached past perfectly good milk for slightly better milk. Fine. It\'s very good milk.', mood: 'defeated' });
        } else {
          api.fail('The ' + date + 'th? It goes off on ' + ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date - 14] + '. By Sunday your cornflakes are swimming in yoghurt. Everything goes back on the shelf.');
        }
        return true;
      }
      return false;
    },

    solution: [{ drop: ['f1', 'aside'] }, { drop: ['b1', 'trolley'] }],
    checks: [
      { name: 'Bossworth\'s front carton', steps: [{ drop: ['f0', 'trolley'] }], expect: 'fail' },
      { name: 'the 17th from the back', steps: [{ drop: ['f0', 'aside'] }, { drop: ['b0', 'trolley'] }], expect: 'fail' },
      { name: 'clearing the back row', steps: [{ drop: ['f2', 'aside'] }, { drop: ['b2', 'aside'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
