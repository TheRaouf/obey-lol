/* Level 74 — Sandcastle Shore
 * "Build right at the water's edge!" The line of dried seaweed marks high tide.
 * Solution: drag the bucket of sand to the dry sand above the seaweed line, then wait for the tide.
 * Wrong: build on the wet sand (washed away after a few seconds, trap); the rock pool (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TIDE_MS = 3000;

  OBEY.registerLevel({
    id: 'sandcastle-shore',
    num: 74,
    title: 'Sandcastle Shore',
    objective: 'Build a sandcastle that survives the tide.',
    intro: 'Prime beachfront property! Build your sandcastle right at the water\'s edge, where the sand is lovely and wet. The tide never comes in this far. I checked. Once.',
    introMood: 'pleased',
    actions: ['drag', 'observe', 'wait'],
    par: 1,
    hints: [
      'The beach keeps a record of how far the sea came last time.',
      'That wiggly line of seaweed and shells is where the high tide stopped.',
      'Drag the bucket to the dry sand above the seaweed line, then wait.'
    ],
    wrong: ['A castle on the wet sand is washed away by the tide (trap).', 'The rock pool belongs to a crab (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One castle, fully dry, legally unimpressed by the sea.',
    trick: 'The seaweed line showed where high tide reaches. Building above it kept the castle safe.',

    init: function () { return { built: null, tide: false }; },

    view: function (s) {
      var seaH = s.tide ? 40 : 22;
      var objs = [
        O('sand', 0, 0, 100, 100, { kind: 'static', art: 'c-sand', cls: 'backdrop' }),
        O('sea', 0, 0, 100, seaH, { kind: 'static', art: 'c-sea', label: s.tide ? 'The sea, now at high tide' : 'The sea, tide coming in' }),
        O('tidesign', 72, 2, 26, 9, { kind: 'static', text: 'TIDE: coming in', label: 'Sign: tide coming in', cls: 'tag-card' }),
        O('seaweed', 0, 44, 100, 7, { kind: 'static', art: 'c-seaweed', label: 'A wiggly line of dried seaweed and shells across the beach' }),
        O('wetzone', 6, 25, 34, 16, { text: 'wet sand', label: 'Wet sand at the water\'s edge (building spot)', zone: true, cls: 'tag-card', hidden: !!s.built }),
        O('dryzone', 56, 60, 36, 16, { text: 'dry sand', label: 'Dry sand above the seaweed line (building spot)', zone: true, cls: 'tag-card', hidden: !!s.built }),
        O('pool', 6, 56, 30, 18, { art: 'c-rockpool', label: 'Rock pool with a crab (drop zone)', zone: true, free: true }),
        O('bucket', 42, 82, 14, 14, { art: 'bucket', label: 'Bucket of sand (drag it to a building spot)', drag: true, hidden: !!s.built })
      ];
      if (s.built === 'wet') objs.push(O('castle', 12, 22, 22, 20, { kind: 'static', art: 'c-sandcastle', label: 'Your sandcastle on the wet sand' }));
      if (s.built === 'dry') objs.push(O('castle', 62, 56, 24, 22, { kind: 'static', art: 'c-sandcastle', label: 'Your sandcastle on the dry sand' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'pool') {
        api.say('A crab waves a claw at you. It is either hello or a legal threat.', 'suspicious');
        return true;
      }
      if (a.type !== 'drop' || a.target !== 'bucket') return false;
      if (a.zone === 'pool') {
        api.nope('bucket');
        api.say('You tipped sand on the crab. The crab has filed a complaint. Build somewhere else.', 'annoyed');
        return true;
      }
      if (a.zone === 'wetzone' || a.zone === 'dryzone') {
        s.built = a.zone === 'wetzone' ? 'wet' : 'dry';
        if (s.built === 'wet') api.say('PERFECT. Waterfront views. Now we just relax and watch the tide definitely not come in.', 'pleased');
        else { api.defy('dry'); api.say('Up THERE? Behind the smelly seaweed? You can barely see the sea. Philistine.', 'annoyed'); }
        api.after(TIDE_MS, function () {
          s.tide = true;
          if (s.built === 'wet') api.fail('WHOOSH. The tide came in exactly as far as the seaweed line. Your castle is now a beach. Again.');
          else api.complete({ line: 'The tide rolled in… and stopped precisely at the seaweed line. Your castle didn\'t even get its toes wet. The seaweed KNEW?', mood: 'surprised' });
        });
        return true;
      }
      api.say('You put the bucket down on plain old sand. It\'s not a castle yet. Pick a spot.', 'neutral');
      return true;
    },

    solution: [{ drop: ['bucket', 'dryzone'] }, { wait: 3200 }],
    checks: [
      { name: 'build by the water', steps: [{ drop: ['bucket', 'wetzone'] }, { wait: 3200 }], expect: 'fail' },
      { name: 'crab pool', steps: [{ drop: ['bucket', 'pool'] }], expect: 'nope' },
      { name: 'castle waits for the tide', steps: [{ drop: ['bucket', 'dryzone'] }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
