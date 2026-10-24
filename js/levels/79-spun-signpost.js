/* Level 79 — The Spun Signpost
 * A fingerpost at a crossroads has been spun round. You know where you came from (TOWN, down the
 * footprints), so turn the sign until TOWN points back down your path; then every arm is right.
 * Solution: turn the sign twice, take the right-hand path to the BEACH.
 * Wrong: follow the BEACH arm as it stands (left, into the bog: trap); castle/town paths (nope).
 * Ruin: spin the sign 8 times in one attempt — it unscrews and helicopters away.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // True destinations, indexed [up, right, down, left].
  var TRUE = ['CASTLE', 'BEACH', 'TOWN', 'BOG'];
  var DIRS = ['up', 'right', 'down', 'left'];

  OBEY.registerLevel({
    id: 'spun-signpost',
    num: 79,
    title: 'The Spun Signpost',
    objective: 'Find the path to the beach.',
    intro: 'Lost? Never! Signposts know everything. Just follow the arm that says BEACH. Some rascals were spinning signs round here last week, but this one looks honest. It has an honest face.',
    introMood: 'pleased',
    actions: ['tap', 'logic'],
    par: 3,
    hints: [
      'You know for certain where one of these paths goes: the one you walked in on.',
      'Your footprints come from TOWN, below. Turn the sign until TOWN points back down that path.',
      'Turn the sign twice, then take the path on the right.'
    ],
    wrong: ['Following the BEACH arm as it stands leads into the bog (trap).', 'The castle path and the path back to town are not the beach (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Sand between your toes. Bossworth has bog between his.',
    trick: 'You knew where you came from, so pointing TOWN back down your path fixed every other arm.',

    init: function () { return { r: 2, spins: 0 }; },

    view: function (s) {
      var labels = DIRS.map(function (d, i) { return TRUE[(i + s.r) % 4]; });
      return [
        O('post', 32, 14, 36, 36, { kind: 'static', art: 'c-signpost', artOpts: { labels: labels }, label: 'Signpost. Arms read: up ' + labels[0] + ', right ' + labels[1] + ', down ' + labels[2] + ', left ' + labels[3] }),
        O('pathN', 40, 1, 20, 11, { text: 'path ↑', label: 'Take the path going up', cls: 'btn-card ghost' }),
        O('pathW', 4, 26, 22, 11, { text: '← path', label: 'Take the path going left', cls: 'btn-card ghost' }),
        O('pathE', 74, 26, 22, 11, { text: 'path →', label: 'Take the path going right', cls: 'btn-card ghost' }),
        O('fp', 45, 51, 10, 20, { kind: 'static', art: 'c-footprints', label: 'Your footprints, leading up from town' }),
        O('pathS', 26, 72, 18, 10, { text: 'path ↓', label: 'Take the path going down, back the way you came', cls: 'btn-card ghost' }),
        O('town', 30, 84, 40, 15, { kind: 'static', art: 'c-town', label: 'The town you walked here from' }),
        O('came', 72, 76, 26, 12, { kind: 'static', text: 'You walked here from TOWN', label: 'Note: you walked here from town, up the bottom path', cls: 'tag-card' }),
        O('spin', 4, 82, 22, 12, { text: 'Turn sign ↻', label: 'Turn the signpost a quarter turn clockwise', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'spin') {
        s.r = (s.r + 3) % 4;
        s.spins++;
        if (s.spins >= 8) {
          api.complete({ ruin: 'spin-doctor', line: 'You spun it so hard it UNSCREWED. It helicoptered over the dunes, and you followed it to the beach. Now nobody in this county knows where anything is. NOBODY.', mood: 'panicked' });
          return true;
        }
        if (s.r === 0) { api.defy('spin'); api.say('You\'re fiddling with public property! …Hm. TOWN now points back at town. That\'s… annoyingly sensible.', 'suspicious'); }
        else api.say(['Stop twiddling my signpost!', 'Round and round. Are you a signpost or a merry-go-round?', 'Spinning it will not make it MORE honest.'][s.spins % 3], 'annoyed');
        return true;
      }
      var d = { pathN: 0, pathE: 1, pathS: 2, pathW: 3 }[a.target];
      if (d === undefined) return false;
      var dest = TRUE[d];
      if (dest === 'BEACH') {
        api.complete({ line: 'Waves! Sand! The actual beach! You trusted where you\'d BEEN over what the sign SAID. I find that deeply un-touristy.', mood: 'defeated' });
      } else if (dest === 'BOG') {
        api.fail('SQUELCH. That path leads to Bottomless Bog (it has a bottom, it\'s just far away). A friendly frog walks you back.');
      } else if (dest === 'TOWN') {
        api.nope(a.target);
        api.say('Back to town? That\'s where we STARTED. You can\'t go home, the gift shop will see you.', 'annoyed');
      } else {
        api.nope(a.target);
        api.say('Castle Path: a ruined castle with a closed tea room. Lovely. Not a beach.', 'neutral');
      }
      return true;
    },

    solution: [{ tap: 'spin' }, { tap: 'spin' }, { tap: 'pathE' }],
    alternatives: { reasoned: [{ tap: 'pathE' }] },
    checks: [
      { name: 'follow the BEACH arm as it stands', steps: [{ tap: 'pathW' }], expect: 'fail' },
      { name: 'castle path', steps: [{ tap: 'pathN' }], expect: 'nope' },
      { name: 'back to town', steps: [{ tap: 'pathS' }], expect: 'nope' }
    ],
    ruinPaths: { 'spin-doctor': [{ tap: 'spin' }, { tap: 'spin' }, { tap: 'spin' }, { tap: 'spin' }, { tap: 'spin' }, { tap: 'spin' }, { tap: 'spin' }, { tap: 'spin' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
