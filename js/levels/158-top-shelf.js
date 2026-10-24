/* Level 158 — Top Shelf (Bookworm Bog)
 * The atlas is on the top shelf. Bossworth: hop on the rolling ladder, wheel locks are for cowards.
 * The library sign: lock the wheels before you climb. Solution: roll the ladder to the bookcase, lock the
 * wheels, climb. Wrong: climbing an unlocked ladder (trap); grabbing the atlas from the floor (nope).
 * Ruin: pile the encyclopedias up and stand on them.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'top-shelf',
    num: 158,
    title: 'Top Shelf',
    objective: 'Fetch the atlas from the top shelf.',
    intro: 'The atlas is on the top shelf. Roll the ladder over and climb! Wheel locks are for cowards. Wheee! Libraries are for SPEED.',
    introMood: 'neutral',
    actions: ['drag', 'tap', 'sequence'],
    par: 3,
    hints: [
      'Read the sign above the bookcase before you climb anything.',
      'Move the ladder first. Then the wheel lock, then climb.',
      'Drag the ladder to the bookcase, tap the wheel lock, then tap Climb.'
    ],
    wrong: ['Climbing a ladder with unlocked wheels is a trap.', 'Reaching for the atlas from the floor is a nope.', 'Standing on the encyclopedias is a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Atlas fetched, ladder parked, wheels locked. The world is in your hands.',
    trick: 'The sign said lock the wheels before you climb, so the ladder had to be moved first and locked second.',

    init: function () { return { at: 'home', locked: false }; },

    view: function (s) {
      var home = s.at === 'home';
      return [
        O('sign', 40, 3, 56, 14, { kind: 'static', text: 'Lock the wheels\nbefore you climb!', label: 'Library sign: lock the wheels before you climb', cls: 'sign-card' }),
        O('case', 40, 20, 56, 76, { kind: 'static', art: 'g-bookcase', artOpts: { gap: true }, label: 'Tall bookcase' }),
        O('atlas', 79, 25, 12, 13.5, { art: 'g-atlas', label: 'Atlas on the top shelf' }),
        O('brake', 4, 3, 32, 10, { text: 'Wheel lock: ' + (s.locked ? 'ON' : 'OFF'), label: 'Ladder wheel lock, now ' + (s.locked ? 'on' : 'off') + ' (tap to switch)', cls: 'btn-card' + (s.locked ? ' big' : '') }),
        O('climb', 4, 15, 32, 10, { text: 'Climb', label: 'Climb the ladder', cls: 'btn-card big' }),
        O('spot', 70, 40, 26, 56, { kind: 'zone', label: 'Floor in front of the bookcase', zone: true }),
        O('ladder', home ? 7 : 72, home ? 34 : 40, home ? 24 : 24, home ? 48 : 56, { art: 'g-ladder', artOpts: { locked: s.locked }, label: 'Rolling ladder' + (home ? '' : ' at the bookcase') + (s.locked ? ', wheels locked' : ' (drag it)'), drag: !s.locked, disabled: s.locked }),
        O('pile', 4, 84, 30, 13, { art: 'g-encyclopedias', label: 'Pile of encyclopedias (drag them)', drag: true })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (a.target === 'ladder') {
          if (a.zone === 'spot') { s.at = 'shelf'; api.say('Lovely. Now hop on and give it a good push off. Wheee!', 'pleased'); }
          return true;
        }
        if (a.target === 'pile') {
          if (a.zone === 'spot') {
            api.complete({ ruin: 'encyclopedia-stairs', line: 'You STOOD on the ENCYCLOPEDIAS. A to Z, under your shoes. You have the atlas and the librarian has fainted. That is not a staircase, that is KNOWLEDGE.', mood: 'panicked' });
          }
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'brake':
          s.locked = !s.locked;
          if (s.locked) { api.defy('lock'); api.say(s.at === 'home' ? 'Locked. Where it is. Next to nothing. Splendid.' : 'Locked? Boring! Where is the thrill? Where is the SPEED?', 'annoyed'); }
          return true;
        case 'climb':
          if (s.at === 'home') { api.nope('climb'); api.say('You climb the ladder in the corner. Up here: dust, a sock, no atlas. Back down.', 'pleased'); return true; }
          if (!s.locked) {
            api.fail('You climb. The ladder rolls. Past Poetry, past Pets, past the librarian\'s desk at quite a lick. Wheel locks, apparently, are for people who arrive.');
            return true;
          }
          api.complete({ line: 'Up, atlas, down. Not one wobble. I wanted a wobble. I was promised SPEED.', mood: 'defeated' });
          return true;
        case 'atlas':
          api.nope('atlas');
          api.say('You stretch. You stretch more. The atlas is two metres up. You are not.', 'pleased');
          return true;
      }
      return false;
    },

    solution: [{ drop: ['ladder', 'spot'] }, { tap: 'brake' }, { tap: 'climb' }],
    ruinPaths: { 'encyclopedia-stairs': [{ drop: ['pile', 'spot'] }] },
    checks: [
      { name: 'climb with wheels unlocked', steps: [{ drop: ['ladder', 'spot'] }, { tap: 'climb' }], expect: 'fail' },
      { name: 'grab from the floor', steps: [{ tap: 'atlas' }], expect: 'nope' },
      { name: 'climb in the corner', steps: [{ tap: 'climb' }], expect: 'nope' },
      { name: 'encyclopedia stairs', steps: [{ drop: ['pile', 'spot'] }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
