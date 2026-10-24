/* Level 89 — Riding the Wind
 * Bossworth: go as HIGH as possible, higher is faster. The flags on the weather mast show the wind
 * at each height: low and high blow LEFT, only the middle layer blows RIGHT towards Postcard Hill.
 * Solution: burner, burner (to MID), ride the wind. Wrong: ride from HIGH (trap, out to sea),
 * ride from LOW (nope), ride from the ground (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var NAMES = ['GROUND', 'LOW', 'MID', 'HIGH'];
  var WIND = ['none', 'left', 'right', 'left'];

  OBEY.registerLevel({
    id: 'riding-the-wind',
    num: 89,
    title: 'Riding the Wind',
    objective: 'Float the balloon over to Postcard Hill (on the right).',
    intro: 'Hot-air ballooning! The rule is simple: go as HIGH as you possibly can. Higher is faster, and faster is… righter. Burn, burn, BURN, then ride the wind. I\'m a natural.',
    introMood: 'pleased',
    actions: ['tap', 'observe', 'logic'],
    par: 3,
    hints: [
      'Balloons can\'t steer. They go wherever the wind at their height is blowing.',
      'Check the flags on the mast: which height blows towards the hill?',
      'Use the burner twice to reach MID, then ride the wind.'
    ],
    wrong: ['Riding the HIGH wind blows you out to sea (trap).', 'The LOW wind drifts you back to the car park (nope).', 'There is no wind on the ground (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Touchdown on Postcard Hill. A cow signs your guestbook.',
    trick: 'Balloons can\'t steer, they pick a wind. The middle layer was the only one blowing towards the hill.',

    init: function () { return { a: 0 }; },

    view: function (s) {
      var objs = [O('mast', 4, 4, 2, 70, { kind: 'static', label: '', cls: 'keypad-bg' })];
      for (var h = 3; h >= 0; h--) {
        var y = 62 - h * 18;
        objs.push(O('flag' + h, 6, y, 20, 10, { kind: 'static', art: 'c-flag', artOpts: { dir: WIND[h] }, label: NAMES[h] + ' wind: ' + (WIND[h] === 'none' ? 'calm, flag hanging limp' : 'blowing ' + WIND[h].toUpperCase()) }));
        objs.push(O('tag' + h, 27, y + 1, 15, 8, { kind: 'static', text: NAMES[h], label: '', cls: 'tag-card' }));
      }
      objs.push(
        O('balloon', 47, 58 - s.a * 18, 16, 20, { kind: 'static', art: 'c-balloon', label: 'Your balloon, at ' + NAMES[s.a] + ' height', cls: 'hero-sprite' }),
        O('hill', 70, 52, 30, 24, { kind: 'static', art: 'c-hill', label: 'Postcard Hill, the landing spot, to the right' }),
        O('hilltag', 70, 44, 30, 7, { kind: 'static', text: 'Postcard Hill', label: '', cls: 'tag-card' }),
        O('up', 4, 82, 28, 13, { text: 'Burner ▲', label: 'Fire the burner to go up one level', cls: 'btn-card' }),
        O('down', 35, 82, 28, 13, { text: 'Vent ▼', label: 'Open the vent to go down one level', cls: 'btn-card' }),
        O('go', 66, 82, 30, 13, { text: 'Ride the wind', label: 'Let the wind carry the balloon', cls: 'btn-card big' })
      );
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'up':
          if (s.a >= 3) { api.nope('up'); api.say('That\'s the top. Any higher and you\'ll need a passport for space.', 'neutral'); return true; }
          s.a++;
          api.say(s.a === 3 ? 'WHOOSH! Maximum altitude! Now THIS is ballooning! Ride it! RIDE IT!' : 'Higher! Higher! Keep burning!', 'pleased');
          return true;
        case 'down':
          if (s.a <= 0) { api.nope('down'); api.say('You\'re on the ground. Venting more just makes the basket sad.', 'neutral'); return true; }
          s.a--;
          api.say('DOWN? Ballooning is about UP. It\'s in the name. Sort of.', 'annoyed');
          return true;
        case 'go':
          if (s.a === 0) { api.nope('go'); api.say('No wind down here. The balloon sits in the field like a giant, judgemental strawberry.', 'neutral'); }
          else if (s.a === 1) { api.nope('go'); api.say('The low wind wafts you gently LEFT… straight back to the car park. You pay for parking twice.', 'laughing'); }
          else if (s.a === 3) api.fail('The high wind blows hard LEFT — out over the sea! A puffin escorts you back to the launch field. Highest is not best.');
          else {
            api.defy('altitude');
            api.complete({ line: 'The middle wind carries you right onto Postcard Hill. You read the FLAGS? I just read my own enthusiasm. It rarely points anywhere useful.', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'up' }, { tap: 'up' }, { tap: 'go' }],
    checks: [
      { name: 'as high as possible', steps: [{ tap: 'up' }, { tap: 'up' }, { tap: 'up' }, { tap: 'go' }], expect: 'fail' },
      { name: 'low wind', steps: [{ tap: 'up' }, { tap: 'go' }], expect: 'nope' },
      { name: 'no wind on the ground', steps: [{ tap: 'go' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
