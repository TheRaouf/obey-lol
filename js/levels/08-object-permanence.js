/* Level 8 — Object Permanence
 * Teaches: dragging/repositioning objects (tap-to-pick-up + tap-to-place works too, incl. keyboard).
 * Solution: drag the crate off the door, then drag the key onto the revealed door.
 * Wrong: dropping the key anywhere else (it returns to the shelf); key onto a covered door.
 * Secret: tidy-up (drag the crate into the recycling bin instead of the floor).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'object-permanence',
    num: 8,
    title: 'Object Permanence',
    objective: 'Unlock the exit.',
    intro: 'Leave that crate EXACTLY where it is. There is nothing behind it. Also, that key is purely decorative.',
    introMood: 'suspicious',
    actions: ['drag', 'tap'],
    par: 2,
    hints: [
      'That crate is hiding something.',
      'Drag the crate away (or tap it, then tap an empty spot), then deal with the key.',
      'Move the crate off the door, then drag the key onto the door.'
    ],
    wrong: ['The key returns to the shelf if dropped anywhere but an uncovered door.'],
    secrets: ['tidy-up'],
    endingNote: 'None.',
    done: 'Things exist even when you can\'t see them. Terrifying.',

    init: function () { return { crate: 'door', revealed: false }; },

    view: function (s) {
      var crateBox = s.crate === 'door' ? [58, 34, 32, 48] : [26, 60, 26, 30];
      return [
        O('shelf', 4, 22, 26, 6, { kind: 'static', art: 'shelf' }),
        O('key', 10, 12, 12, 10, { art: 'key', label: 'Brass key on the shelf', drag: true }),
        O('bin', 4, 64, 18, 28, { art: 'bin', label: 'Recycling bin', zone: true, free: true }),
        O('floor', 26, 60, 26, 30, { kind: 'zone', label: 'Empty floor space', zone: true, hidden: s.crate !== 'door' }),
        O('door', 60, 30, 28, 56, { art: 'door', artOpts: { keyhole: true, hiddenBehind: !s.revealed }, label: s.revealed ? 'Locked door with a keyhole' : 'Something behind the crate', zone: true }),
        O('crate', crateBox[0], crateBox[1], crateBox[2], crateBox[3], { art: 'crate', label: 'Heavy wooden crate', drag: true, hidden: s.crate === 'bin' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'crate') {
        if (a.zone === 'bin') {
          s.crate = 'bin';
          s.revealed = true;
          api.defy('crate');
          api.secret('tidy-up');
          api.say('You threw away my crate?! That was a perfectly good… nothing. It was nothing. And now there\'s a door. Great.', 'annoyed');
        } else if (s.crate === 'door' && a.zone !== 'door') {
          s.crate = 'floor';
          s.revealed = true;
          api.defy('crate');
          api.say('You moved it! And there\'s a… door. Behind the crate. Which I said wasn\'t there. Object permanence is a MYTH.', 'surprised');
        } else {
          api.say('The crate scrapes around and settles back. Try dragging it somewhere else.', 'pleased');
        }
        return true;
      }
      if (a.type === 'drop' && a.target === 'key') {
        if (a.zone === 'door' && s.revealed) {
          api.complete({ line: 'Click. The "decorative" key fits the "nonexistent" door. I\'m going to lie down.', mood: 'defeated' });
        } else if (a.zone === 'door') {
          api.say('There\'s a big crate in the way. Of nothing. In the way of nothing.', 'pleased');
        } else {
          api.say('You put the key down. It slinks back to its shelf. Keys are like that.', 'neutral');
        }
        return true;
      }
      if (a.type === 'tap' && a.target === 'door') {
        api.say(s.revealed ? 'It\'s locked. If only there were a key. A decorative one, say.' : 'That\'s a crate. Definitely just a crate.', 'suspicious');
        return true;
      }
      if (a.type === 'tap' && a.target === 'bin') {
        api.say('A recycling bin. Big enough for a crate. Not that you should.', 'neutral');
        return true;
      }
      return false;
    },

    solution: [{ drop: ['crate', 'floor'] }, { drop: ['key', 'door'] }],
    secretPaths: { 'tidy-up': [{ drop: ['crate', 'bin'] }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
