/* Level 216 — Relay Order (Hurdle Hollow)
 * Four runners: You, Kevin, Mimic the cat, Bossworth. The coach's notes:
 *   1. You run the LAST leg.  2. Mimic runs straight after Kevin.  3. Bossworth does NOT run first.
 * Only one order fits: Kevin, Mimic, Bossworth, You. Bossworth wants to run first.
 * Tap the runners in leg order; the relay starts after the fourth. Wrong order: trap.
 * Tapping a runner who already has a leg: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var RIGHT = ['kevin', 'mimic', 'boss', 'you'];
  var R = {
    you: { name: 'You', box: [7, 55, 14, 21], art: 'hero' },
    kevin: { name: 'Kevin', box: [29, 56, 20, 20], art: 'twin' },
    mimic: { name: 'Mimic', box: [53, 58.5, 20, 17.5], art: 'cat' },
    boss: { name: 'Bossworth', box: [76, 56, 20, 20], art: 'j-boss' }
  };
  var SLOT = { you: 4, kevin: 28, mimic: 52, boss: 76 };

  OBEY.registerLevel({
    id: 'relay-order',
    num: 216,
    title: 'Relay Order',
    objective: 'Put the relay team in the order the coach wrote.',
    intro: 'Relay time! I run first, obviously: I\'m the fastest thing in this field. After that, whoever. The coach left some notes. Coaches know nothing.',
    introMood: 'suspicious',
    actions: ['tap', 'logic', 'sequence'],
    par: 4,
    hints: [
      'Only the coach\'s three notes matter. Start with the one that fixes a leg outright.',
      'You are leg 4. Kevin and Mimic must be next to each other, Kevin first, and Bossworth can\'t be leg 1.',
      'Tap Kevin, Mimic, Bossworth, then You.'
    ],
    wrong: ['Any order that breaks a coach\'s note drops the baton (trap).', 'A runner who already has a leg can\'t take a second one (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Baton passed four times, dropped zero times. Coach is thrilled. Bossworth isn\'t.',
    trick: 'The notes left only one order: you last, Kevin then Mimic together, and Bossworth not first, so he ran third.',

    init: function () { return { order: [] }; },

    view: function (s) {
      var out = [
        O('grass', 0, 74, 100, 26, { kind: 'static', art: 'j-grass' }),
        O('notes', 4, 3, 92, 33, { kind: 'static', text: 'COACH\'S NOTES\n1. You run the LAST leg.\n2. Mimic runs straight after Kevin.\n3. Bossworth does NOT run first.', label: 'Coach\'s notes. 1: You run the last leg. 2: Mimic runs straight after Kevin. 3: Bossworth does not run first.', cls: 'book-card' })
      ];
      Object.keys(R).forEach(function (k) {
        var r = R[k], leg = s.order.indexOf(k) + 1, b = r.box;
        out.push(O('leg-' + k, SLOT[k] + 1, 42, 18, 9, { kind: 'static', text: leg ? 'Leg ' + leg : 'Leg ?', label: '', cls: 'tag-card' }));
        out.push(O(k, b[0], b[1], b[2], b[3], { art: r.art, label: r.name + (leg ? ', running leg ' + leg : ', no leg yet') }));
        out.push(O('name-' + k, SLOT[k] + 1, 78, 18, 8, { kind: 'static', text: r.name, label: '', cls: 'tag-card' }));
      });
      out.push(O('clear', 30, 89, 40, 9, { text: 'Clear the legs', label: 'Clear all legs and start again', cls: 'btn-card small', free: true, hidden: !s.order.length }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'clear') { s.order = []; api.say('Cleared. Start with me. Leg one. Like a champion.', 'pleased'); return true; }
      if (!R[a.target]) return false;
      if (s.order.indexOf(a.target) >= 0) {
        api.nope(a.target);
        api.say(R[a.target].name + ' is already running leg ' + (s.order.indexOf(a.target) + 1) + '. One leg each. Even me. Sadly.', 'annoyed');
        return true;
      }
      s.order.push(a.target);
      var n = s.order.length;
      if (n < 4) {
        api.say(n === 1 && a.target === 'boss' ? 'Me first! The coach will be thrilled. Probably.' : R[a.target].name + ' runs leg ' + n + '.', a.target === 'boss' ? 'pleased' : 'neutral');
        return true;
      }
      if (s.order.join() === RIGHT.join()) {
        api.defy('order');
        api.complete({ line: 'Kevin, Mimic, me, you… and we WON? With me on leg THREE? The coach knew something. I hate it when coaches know things.', mood: 'defeated' });
      } else {
        api.fail('The baton goes round… and gets dropped. The coach waves the notes at you. Somebody ran a leg they weren\'t allowed. Back to the start!');
      }
      return true;
    },

    solution: [{ tap: 'kevin' }, { tap: 'mimic' }, { tap: 'boss' }, { tap: 'you' }],
    checks: [
      { name: 'Bossworth first', steps: [{ tap: 'boss' }, { tap: 'kevin' }, { tap: 'mimic' }, { tap: 'you' }], expect: 'fail' },
      { name: 'Mimic before Kevin', steps: [{ tap: 'mimic' }, { tap: 'kevin' }, { tap: 'boss' }, { tap: 'you' }], expect: 'fail' },
      { name: 'same runner twice', steps: [{ tap: 'kevin' }, { tap: 'kevin' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
