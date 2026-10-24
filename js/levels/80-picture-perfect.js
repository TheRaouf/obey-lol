/* Level 80 — Picture Perfect
 * Recreate the postcard: the lighthouse is dead centre and close up, the sailboat to its right.
 * Bossworth insists postcards are "all about the palm tree". Pan and zoom the camera to match, then snap.
 * Solution: pan right three times, zoom in, snap. Wrong: snapping any other view (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TARGET = { c: 250, z: 2 };
  var THINGS = [[40, 'the sun'], [130, 'a palm tree'], [250, 'the lighthouse'], [292, 'a sailboat'], [395, 'a big rock'], [470, 'an ice-cream kiosk']];

  function describe(c, z) {
    var half = 100 / z, seen = [];
    THINGS.forEach(function (t) {
      if (t[0] >= c - half && t[0] <= c + half) {
        var rel = (t[0] - c) / half;
        seen.push(t[1] + (Math.abs(rel) < 0.2 ? ' (centre)' : rel < 0 ? ' (left)' : ' (right)'));
      }
    });
    return (z === 2 ? 'Zoomed in: ' : 'Wide: ') + (seen.join(', ') || 'just sea and sky');
  }

  OBEY.registerLevel({
    id: 'picture-perfect',
    num: 80,
    title: 'Picture Perfect',
    objective: 'Take exactly the same photo as the postcard.',
    intro: 'Photo stop! Recreate this famous postcard EXACTLY. Professional tip: aim at the palm tree. Postcards are ALL about palm trees. And keep it wide, so there\'s room for me to photobomb.',
    introMood: 'suspicious',
    actions: ['tap', 'compare'],
    par: 5,
    hints: [
      'Ignore the palm-tree advice. Compare your camera with the postcard itself.',
      'On the postcard the lighthouse is in the middle and close up, with a boat on its right.',
      'Pan right three times, zoom in once, then press SNAP.'
    ],
    wrong: ['Snapping Bossworth\'s wide palm-tree shot doesn\'t match the postcard (nope).', 'Any other framing that doesn\'t match is a holiday snap nobody wants (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A perfect copy. The postcard company would like a word about copyright.',
    trick: 'Matching meant framing it like the card: lighthouse centred and zoomed in, not a wide palm-tree shot.',

    init: function () { return { c: 100, z: 1, snaps: 0 }; },

    view: function (s) {
      return [
        O('card', 4, 5, 42, 30, { kind: 'static', art: 'c-panorama', artOpts: { c: TARGET.c, z: TARGET.z, card: true }, label: 'The postcard. ' + describe(TARGET.c, TARGET.z) }),
        O('cardtag', 10, 36, 30, 7, { kind: 'static', text: 'the postcard', label: '', cls: 'tag-card' }),
        O('cam', 52, 5, 44, 30, { kind: 'static', art: 'c-panorama', artOpts: { c: s.c, z: s.z }, label: 'Your camera view. ' + describe(s.c, s.z) }),
        O('camtag', 59, 36, 30, 7, { kind: 'static', text: 'your camera', label: '', cls: 'tag-card' }),
        O('left', 4, 50, 21, 12, { text: '◀ Pan', label: 'Pan the camera left', cls: 'btn-card' }),
        O('right', 27, 50, 21, 12, { text: 'Pan ▶', label: 'Pan the camera right', cls: 'btn-card' }),
        O('zin', 52, 50, 21, 12, { text: 'Zoom +', label: 'Zoom in', cls: 'btn-card' }),
        O('zout', 75, 50, 21, 12, { text: 'Zoom −', label: 'Zoom out', cls: 'btn-card' }),
        O('snap', 30, 72, 40, 15, { text: 'SNAP!', label: 'Take the photo', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var lo = s.z === 1 ? 100 : 50, hi = s.z === 1 ? 400 : 450;
      switch (a.target) {
        case 'left': case 'right':
          var c = s.c + (a.target === 'left' ? -50 : 50);
          if (c < lo || c > hi) { api.nope(a.target); api.say('That\'s the edge of the world. Well, of the bay.', 'neutral'); return true; }
          s.c = c;
          return true;
        case 'zin':
          if (s.z === 2) { api.nope(a.target); api.say('Fully zoomed. Any closer and you\'ll photograph the lighthouse keeper\'s breakfast.', 'neutral'); return true; }
          s.z = 2; s.c = Math.max(50, Math.min(450, s.c));
          return true;
        case 'zout':
          if (s.z === 1) { api.nope(a.target); api.say('That\'s as wide as it goes. It\'s a camera, not a satellite.', 'neutral'); return true; }
          s.z = 1; s.c = Math.max(100, Math.min(400, s.c));
          return true;
        case 'snap':
          s.snaps++;
          if (s.c === TARGET.c && s.z === TARGET.z) {
            api.defy('photo');
            api.complete({ line: 'Click! Identical to the postcard. Lighthouse, close up, not a single palm frond. And no room for me. Tourism is DEAD.', mood: 'defeated' });
          } else {
            api.nope('snap');
            api.say(s.c === 100 && s.z === 1
              ? 'Click! A gorgeous wide palm tree, just as I advised. And yet… it looks nothing like the postcard. Suspicious postcard.'
              : 'Click! A lovely photo of ' + describe(s.c, s.z).replace(/^[^:]*: /, '') + '. Not the postcard, though.', 'suspicious');
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'right' }, { tap: 'right' }, { tap: 'right' }, { tap: 'zin' }, { tap: 'snap' }],
    checks: [
      { name: 'Bossworth\'s palm-tree shot', steps: [{ tap: 'snap' }], expect: 'nope' },
      { name: 'lighthouse but too wide', steps: [{ tap: 'right' }, { tap: 'right' }, { tap: 'right' }, { tap: 'snap' }], expect: 'nope' },
      { name: 'zoomed but off-centre', steps: [{ tap: 'zin' }, { tap: 'snap' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
