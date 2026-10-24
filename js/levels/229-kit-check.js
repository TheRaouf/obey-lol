/* Level 229 — Kit Check (Podium Party)
 * Changing room. Bossworth's kit list runs backwards: boots, socks, shin pads, shirt. The kit tag says
 * shin pads go UNDER socks, and boots go over socks. Drag the kit onto yourself in a wearable order:
 * pads, socks, boots (shirt any time). Out-of-order items are refused (nope).
 * "Run out NOW!" before you're dressed is a trap.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ITEMS = { pads: 'shin pads', socks: 'socks', boots: 'boots', shirt: 'shirt' };
  var X = { boots: 4, socks: 20, pads: 36, shirt: 52 };

  OBEY.registerLevel({
    id: 'kit-check',
    num: 229,
    title: 'Kit Check',
    objective: 'Get changed for the final match.',
    intro: 'Final match! Get changed, quick: follow my kit list EXACTLY. Boots first, obviously, they\'re the most important. Then hurry out. No dawdling!',
    introMood: 'panicked',
    actions: ['drag', 'logic'],
    par: 4,
    hints: [
      'Think about what goes on top of what. Can you pull socks on over boots?',
      'The kit tag says shin pads go under socks. Boots go on last, over the socks.',
      'Drag on the shin pads, then the socks, then the boots, and the shirt whenever you like.'
    ],
    wrong: ['Boots before socks, or socks before shin pads, won\'t go on (nope).', 'Running out before you\'re dressed is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Fully kitted, in an order that works on actual legs.',
    trick: 'Kit goes on in layers, so Bossworth\'s list had to be done backwards: pads under socks, socks under boots.',

    init: function () { return { on: {} }; },

    view: function (s) {
      var on = s.on, worn = Object.keys(ITEMS).filter(function (k) { return on[k]; }).map(function (k) { return ITEMS[k]; });
      var out = [
        O('list', 4, 3, 40, 30, { kind: 'static', text: 'KIT LIST (B.)\n1. Boots\n2. Socks\n3. Shin pads\n4. Shirt', label: 'Bossworth\'s kit list: 1 boots, 2 socks, 3 shin pads, 4 shirt.', cls: 'book-card' }),
        O('tag', 4, 36, 40, 12, { kind: 'static', text: 'Kit tag: shin pads go UNDER socks.', label: 'Kit tag: shin pads go under socks.', cls: 'tag-card' }),
        O('worn', 4, 51, 40, 14, { kind: 'static', text: worn.length ? 'Wearing: ' + worn.join(', ') : 'Wearing: nothing yet', label: '', cls: 'tag-card' }),
        O('lockers', 71, 36.5, 25, 37.5, { kind: 'static', art: 'j-lockers', label: 'Lockers' }),
        O('you', 46, 29.2, 24, 44.8, { art: 'j-dummy', artOpts: { pads: on.pads, socks: on.socks, boots: on.boots, shirt: on.shirt }, label: 'You' + (worn.length ? ', wearing ' + worn.join(', ') : ', not dressed yet') + ' (drop kit here)', zone: true })
      ];
      Object.keys(X).forEach(function (k) {
        out.push(O(k, X[k], 79, 14, 12, { art: 'j-kit', artOpts: { item: k }, label: ITEMS[k].charAt(0).toUpperCase() + ITEMS[k].slice(1) + ' (drag onto yourself)', drag: true, hidden: !!on[k] }));
      });
      out.push(O('run', 70, 79, 26, 15, { text: 'Run out NOW!', label: 'Run out onto the pitch now', cls: 'btn-card accent' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'run') {
        api.fail('You sprint out onto the pitch in… whatever you had on. The crowd gasps. The referee (me) sends you back in. Get changed PROPERLY!', 'laughing');
        return true;
      }
      if (a.type === 'tap' && a.target === 'you') { api.say('Yes, that\'s you. Drag the kit onto yourself. Boots first!', 'neutral'); return true; }
      if (a.type !== 'drop' || !ITEMS[a.target]) return false;
      var k = a.target, on = s.on;
      if (a.zone !== 'you') { api.say('The ' + ITEMS[k] + ' land' + (k === 'shirt' ? 's' : '') + ' back on the floor. Wear them. On you.', 'annoyed'); return true; }
      if (k === 'boots' && !on.socks) {
        api.nope('boots');
        api.say('Boots on bare feet? Then where do the socks go, over the boots? …Fine. Maybe socks first. But only this once.', 'annoyed');
        return true;
      }
      if (k === 'socks' && !on.pads) {
        api.nope('socks');
        api.say('If the socks go on now, where do the shin pads go? On the outside, like armour? Read the tag. Not that I did.', 'suspicious');
        return true;
      }
      if (k === 'pads' && on.socks) { api.nope('pads'); api.say('Too late, socks are on.', 'annoyed'); return true; }
      on[k] = true;
      if (on.pads && on.socks && on.boots && on.shirt) {
        api.defy('order');
        api.complete({ line: 'Pads, socks, boots, shirt. My list, done in completely the wrong order, and you look… professional. I hate it when lists are wrong. Mine never are. Except that one.', mood: 'defeated' });
      } else {
        api.say({ pads: 'Shin pads first? That was number THREE on my list!', socks: 'Socks over the pads. Hmph. Neat.', boots: 'NOW the boots. Number one, done fourth. Or third. I\'ve lost count.', shirt: 'Shirt on. Number nine. Very sporty.' }[k], 'annoyed');
      }
      return true;
    },

    solution: [{ drop: ['pads', 'you'] }, { drop: ['socks', 'you'] }, { drop: ['boots', 'you'] }, { drop: ['shirt', 'you'] }],
    alternatives: { 'shirt-first': [{ drop: ['shirt', 'you'] }, { drop: ['pads', 'you'] }, { drop: ['socks', 'you'] }, { drop: ['boots', 'you'] }] },
    checks: [
      { name: 'boots first (his list)', steps: [{ drop: ['boots', 'you'] }], expect: 'nope' },
      { name: 'socks before pads', steps: [{ drop: ['socks', 'you'] }], expect: 'nope' },
      { name: 'run out undressed', steps: [{ tap: 'run' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
