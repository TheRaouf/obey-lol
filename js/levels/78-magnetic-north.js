/* Level 78 — Magnetic North
 * The picnic is buried north of the oak. The compass needle points straight at Bossworth's
 * "lucky horseshoe" — a magnet. Move the magnet into the backpack and the needle swings to true north (left).
 * Solution: drag the magnet into the backpack, dig the left patch. Wrong: dig where the magnet-bent
 * needle points (trap), dig "up" because up must be north (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SPOTS = { digN: 'above', digE: 'right of', digS: 'below', digW: 'left of' };

  OBEY.registerLevel({
    id: 'magnetic-north',
    num: 78,
    title: 'Magnetic North',
    objective: 'Dig up the picnic buried NORTH of the old oak.',
    intro: 'Treasure hunt! The picnic is buried north of the oak. My trusty compass never lies. And keep your mitts off my lucky horseshoe. It\'s very attached to things. Emotionally.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'logic'],
    par: 2,
    hints: [
      'Look at what the compass needle is pointing at.',
      'That "lucky horseshoe" is a magnet, and it is dragging the needle towards itself.',
      'Drag the magnet into the backpack, then dig on the side the needle now points to (the left).'
    ],
    wrong: ['Digging where the magnet-bent needle points disturbs a very cross mole (trap).', 'Digging "up" because up looks like north finds nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Picnic found. The mole has been offered a sandwich as compensation.',
    trick: 'The horseshoe was a magnet bending the needle. Move it away and the compass tells the truth.',

    init: function () { return { magnet: true, dug: {} }; },

    view: function (s) {
      var objs = [O('meadow', 0, 0, 100, 100, { kind: 'static', art: 'c-meadow' }), O('oak', 38, 20, 24, 30, { kind: 'static', art: 'c-oak', label: 'The old oak tree' })];
      Object.keys(SPOTS).forEach(function (id) {
        var pos = { digN: [43, 3], digE: [68, 30], digS: [43, 52], digW: [18, 30] }[id];
        objs.push(O(id, pos[0], pos[1], 14, 12, { art: 'c-dig', artOpts: { dug: !!s.dug[id] }, label: 'Patch of soil ' + SPOTS[id] + ' the oak' + (s.dug[id] ? ' (already dug)' : '') }));
      });
      objs.push(
        O('compass', 4, 68, 22, 22, { kind: 'static', art: 'c-compass', artOpts: { dir: s.magnet ? 'right' : 'left' }, label: s.magnet ? 'Compass: the N needle points RIGHT, straight at the horseshoe' : 'Compass: the N needle points LEFT' }),
        O('magnet', 28, 73, 12, 12, { art: 'c-magnet', label: 'Bossworth\'s lucky horseshoe (a magnet), right next to the compass', drag: true, hidden: !s.magnet }),
        O('map', 43, 67, 39, 26, { kind: 'static', text: 'Picnic: one step NORTH of the oak.\nKeep magnets away from compasses!', label: 'Map note: picnic one step north of the oak. Keep magnets away from compass.', cls: 'tag-card' }),
        O('pack', 84, 70, 14, 18, { art: 'c-backpack', label: s.magnet ? 'Backpack (drop zone)' : 'Backpack (the horseshoe is inside)', zone: true, free: true })
      );
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'magnet') {
        if (a.zone === 'pack') {
          s.magnet = false;
          api.defy('horseshoe');
          api.say('My HORSESHOE! In a BACKPACK! …The needle just swung round. Coincidence. Compasses get bored.', 'surprised');
        } else {
          api.say('You shuffle the horseshoe about. The needle follows it like a puppy. Interesting. Not suspicious. Interesting.', 'suspicious');
        }
        return true;
      }
      if (a.type === 'tap' && a.target === 'pack') { api.say('A backpack. Roomy. Smells of old crisps.', 'neutral'); return true; }
      if (a.type !== 'tap' || !SPOTS[a.target]) return false;
      if (s.dug[a.target]) { api.nope(a.target); api.say('You already dug there. It is now a hole. Holes don\'t improve with practice.', 'annoyed'); return true; }
      s.dug[a.target] = true;
      if (a.target === 'digW') {
        api.complete({ line: 'A picnic hamper! True north was LEFT all along? My horseshoe has been lying to me for YEARS. We\'re not speaking.', mood: 'defeated' });
      } else if (a.target === 'digE') {
        api.fail('You dig where the needle points… and wake a mole. A very cross mole. It fills the hole back in, with you nearby.');
      } else if (a.target === 'digN') {
        api.nope(a.target);
        api.say('Up is north? Only on posters. You found a bottle cap and a worm with opinions.', 'laughing');
      } else {
        api.nope(a.target);
        api.say('Below the oak: one acorn, deeply unimpressed. No picnic.', 'neutral');
      }
      return true;
    },

    solution: [{ drop: ['magnet', 'pack'] }, { tap: 'digW' }],
    checks: [
      { name: 'follow the bent needle', steps: [{ tap: 'digE' }], expect: 'fail' },
      { name: 'up is north', steps: [{ tap: 'digN' }], expect: 'nope' },
      { name: 'even without magnet, east is wrong', steps: [{ drop: ['magnet', 'pack'] }, { tap: 'digE' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
