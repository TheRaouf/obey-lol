/* Level 87 — Up the Creek
 * Bossworth: paddle on the LEFT only. Paddling one side turns a canoe; the heading sign shows it veering.
 * Two strokes on the same side in a row spin you round. Alternate sides to go straight.
 * Solution: left, right, left, right. Wrong: same side twice (nope), jump out and swim (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var GOAL = 4;

  OBEY.registerLevel({
    id: 'up-the-creek',
    num: 87,
    title: 'Up the Creek',
    objective: 'Paddle the canoe up to the jetty.',
    intro: 'Paddle on the LEFT. Only ever the left. Left is my good side and the canoe can tell. Right-side paddling is for amateurs and ducks. Off you go, straight up to the jetty!',
    introMood: 'pleased',
    actions: ['tap', 'sequence', 'observe'],
    par: 4,
    hints: [
      'Watch the heading sign after each stroke.',
      'A stroke on the left turns the canoe right. You need something to straighten it out.',
      'Alternate: left, right, left, right.'
    ],
    wrong: ['Two strokes on the same side spin the canoe in a circle (nope).', 'Jumping out to swim meets the very judgemental ducks (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Moored at the jetty. The ducks give you a slow clap.',
    trick: 'One side only turns a canoe in circles. Alternating sides went straight.',

    init: function () { return { prog: 0, last: null, angle: 0, spun: false }; },

    view: function (s) {
      var heading = s.spun ? 'Heading: SPINNING!' : s.angle > 0 ? 'Heading: veering RIGHT' : s.angle < 0 ? 'Heading: veering LEFT' : 'Heading: straight';
      return [
        O('bankL', 0, 0, 20, 100, { kind: 'static', art: 'bank' }),
        O('river', 20, 0, 60, 100, { kind: 'static', art: 'c-pond', label: 'A slow creek' }),
        O('bankR', 80, 0, 20, 100, { kind: 'static', art: 'bank' }),
        O('jetty', 30, 2, 40, 14, { kind: 'static', art: 'c-jetty', label: 'The jetty' }),
        O('canoe', 40, 66 - s.prog * 12, 20, 20, { kind: 'static', art: 'c-canoe', artOpts: { angle: s.spun ? 180 : s.angle }, label: 'Your canoe, ' + (GOAL - s.prog) + ' strokes from the jetty', cls: 'hero-sprite' }),
        O('heading', 62, 22, 36, 12, { kind: 'static', text: heading, label: heading, cls: 'panel-card' }),
        O('left', 2, 84, 32, 13, { text: 'Paddle LEFT', label: 'Paddle on the left side', cls: 'btn-card' }),
        O('swim', 38, 88, 24, 10, { text: 'Swim for it', label: 'Jump out and swim', cls: 'btn-card ghost' }),
        O('right', 66, 84, 32, 13, { text: 'Paddle RIGHT', label: 'Paddle on the right side', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'swim') {
        api.fail('SPLASH! Forty ducks surround you and quack judgementally until you climb back in at the start.');
        return true;
      }
      if (a.target !== 'left' && a.target !== 'right') return false;
      var side = a.target === 'left' ? 'L' : 'R';
      if (side === s.last) {
        s.spun = true; s.angle = 0;
        api.nope(a.target);
        api.say(side === 'L' ? 'Left again! Wheee, a full circle! See how much the canoe loves my good side? It\'s dancing!' : 'Right twice?! Now you\'re spinning the wrong way round. Serves you right.', side === 'L' ? 'pleased' : 'laughing');
        s.last = null;
        return true;
      }
      s.spun = false;
      s.last = side;
      s.prog++;
      s.angle = side === 'L' ? 22 : -22;
      if (side === 'R') api.defy('paddle');
      if (s.prog >= GOAL) {
        api.complete({ line: 'Bump. The jetty. You paddled on BOTH sides, like some sort of… balanced person. I have spent nine years paddling in circles.', mood: 'defeated' });
      } else {
        api.say(side === 'L' ? 'Lovely left stroke! Now another left. Ignore the slight veering. Veering is character.' : 'A RIGHT stroke? Disgusting. …You did go straighter, though. Suspiciously straighter.', side === 'L' ? 'pleased' : 'annoyed');
      }
      return true;
    },

    solution: [{ tap: 'left' }, { tap: 'right' }, { tap: 'left' }, { tap: 'right' }],
    alternatives: { rightFirst: [{ tap: 'right' }, { tap: 'left' }, { tap: 'right' }, { tap: 'left' }] },
    checks: [
      { name: 'left, left (as told)', steps: [{ tap: 'left' }, { tap: 'left' }], expect: 'nope' },
      { name: 'right, right', steps: [{ tap: 'right' }, { tap: 'right' }], expect: 'nope' },
      { name: 'swim for it', steps: [{ tap: 'swim' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
