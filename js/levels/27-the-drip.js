/* Level 27 — The Drip
 * A leak slowly floods the room (one step every 2 s; 1.5 s on Hard; the room floods at 10).
 * Put the bucket under the drip (this stops the flooding), then press and hold the valve
 * for 2 seconds to fix the pipe. The valve is out of reach while water sprays everywhere.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FIX_MS = 2000, FULL = 10;

  OBEY.registerLevel({
    id: 'the-drip',
    num: 27,
    title: 'The Drip',
    objective: 'Stop the leak before the room floods.',
    intro: 'There\'s a tiny leak. Ignore it. Leaks fix themselves. And do NOT touch that bucket. It is for my hat collection.',
    introMood: 'neutral',
    actions: ['drag', 'hold', 'timing'],
    par: 2,
    hints: [
      'The water level is rising. Catch the drip first.',
      'The bucket can go under the drip. Then the valve is reachable.',
      'Drag the bucket under the drip, then press and hold the valve for two seconds.'
    ],
    hardNote: 'On Hard the water rises every 1.5 seconds.',
    wrong: ['Letting the room flood is a trap.', 'The valve can\'t be reached until the drip is caught.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Leak fixed. The hat collection will have to wait.',

    init: function () { return { flood: 0, bucket: false, fixing: false, timer: null }; },

    onStart: function (s, api, ctx) {
      api.every(ctx.difficulty === 'hard' ? 1500 : 2000, function () {
        if (s.bucket) return;
        s.flood++;
        if (s.flood === 5) api.say('The water is at my… I don\'t have knees. It\'s at my everything.', 'panicked');
        if (s.flood >= FULL) api.fail('GLUG. The room is now a swimming pool. Bossworth is wearing floaties. Catch the drip sooner!');
      });
    },

    view: function (s) {
      return [
        O('water', 0, 100 - s.flood * 6, 100, s.flood * 6, { kind: 'static', art: 'water', label: s.flood ? 'Flood water, level ' + s.flood + ' of 10' : '' }),
        O('pipe', 30, 0, 40, 18, { kind: 'static', art: 'pipe', artOpts: { leaking: !s.bucket }, label: 'Leaking pipe' }),
        O('valve', 70, 6, 14, 14, { art: 'valve', label: 'Pipe valve (press and hold to tighten)', hold: true, cls: s.fixing ? 'charging' : '' }),
        O('under', 40, 58, 22, 28, { kind: 'zone', label: 'Floor under the drip', zone: true, hidden: s.bucket }),
        O('drip', 48, 20, 6, 30, { kind: 'static', art: 'drip', label: '', hidden: false }),
        O('bucket', s.bucket ? 40 : 6, s.bucket ? 60 : 64, 22, 26, { art: 'bucket', label: s.bucket ? 'Bucket under the drip' : 'Bucket', drag: !s.bucket, disabled: s.bucket }),
        O('meter', 74, 30, 22, 10, { kind: 'static', text: 'Water: ' + s.flood + '/10', label: 'Water level ' + s.flood + ' of 10', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'drop:bucket':
          if (a.zone === 'under') {
            s.bucket = true;
            api.defy('bucket');
            api.say('My hat bucket! Under the drip! …Well, it did stop the flooding. The hats will be damp.', 'annoyed');
          } else {
            api.nope('bucket');
            api.say('The bucket sits there, catching nothing. Like my hopes.', 'suspicious');
          }
          return true;
        case 'holdstart:valve':
          if (!s.bucket) { api.nope('valve'); api.say('Water sprays in your face! You can\'t grip the valve. Catch the drip first.', 'laughing'); return true; }
          s.fixing = true;
          s.timer = api.after(FIX_MS, function () {
            s.timer = null; s.fixing = false;
            api.complete({ line: 'Tight as a drum. You fixed my pipe. I was going to fix it. Eventually. In a few years.', mood: 'defeated' });
          });
          api.say('Turning, turning…', 'surprised');
          return true;
        case 'holdend:valve':
          s.fixing = false;
          if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('Not tight enough. Hold the valve longer.', 'suspicious'); }
          return true;
      }
      return false;
    },

    solution: [{ drop: ['bucket', 'under'] }, { hold: ['valve', 2200] }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
