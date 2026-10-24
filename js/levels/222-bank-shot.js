/* Level 222 — Bank Shot (Gutter Gulch)
 * Mini golf, seen from above. The windmill sits between the tee and the hole; straight "at the hole"
 * bounces off it (nope). Aiming right rolls into the pond (trap). Aiming up hits the angled bumper in
 * the top-left corner, which turns the ball right along the top edge into the hole.
 * Ruin: windmill-wrecker — hit the windmill three times in one attempt and it collapses.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'bank-shot',
    num: 222,
    title: 'Bank Shot',
    objective: 'Get a hole in one.',
    intro: 'Mini golf! The secret is simple: aim straight at the hole. Straight lines are the fastest. Ignore the windmill. Windmills are scenery.',
    introMood: 'neutral',
    actions: ['tap', 'observe', 'logic'],
    par: 1,
    hints: [
      'Trace each aim with your finger before you putt. What is in the way?',
      'The yellow bumper in the top-left corner turns a ball rolling up so that it rolls right.',
      'Aim up: the bumper sends the ball along the top edge into the hole.'
    ],
    wrong: ['Aiming at the hole hits the windmill and bounces back (nope).', 'Aiming right rolls into the pond (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Hole in one. Off a bumper. Golf is geometry with a flag.',
    trick: 'The straight line was blocked, but the angled bumper turned an "upwards" putt into a line straight along the top to the hole.',

    init: function () { return { shot: null, hits: 0 }; },

    view: function (s) {
      return [
        O('grass', 0, 0, 100, 100, { kind: 'static', art: 'j-grass', artOpts: { full: true } }),
        O('course', 4, 3, 92, 64, { kind: 'static', art: 'j-golf', artOpts: { shot: s.shot, broken: s.shot === 'thru' }, label: 'Mini golf hole seen from above. Tee bottom left, hole top right, windmill in the middle, pond bottom right, an angled yellow bumper in the top-left corner.' + (s.hits ? ' The windmill has been hit ' + s.hits + ' time' + (s.hits > 1 ? 's.' : '.') : '') }),
        O('tip', 4, 69, 92, 9, { kind: 'static', text: 'Tee: bottom left. Hole: top right.', label: '', cls: 'tag-card' }),
        O('up', 4, 81, 30, 15, { text: 'Putt ↑ up', label: 'Putt straight up', cls: 'btn-card' }),
        O('diag', 35, 81, 30, 15, { text: 'Putt ↗ at the hole', label: 'Putt straight at the hole', cls: 'btn-card accent' }),
        O('right', 66, 81, 30, 15, { text: 'Putt → right', label: 'Putt straight right', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'diag':
          s.hits++;
          if (s.hits >= 3) {
            s.shot = 'thru';
            api.complete({ ruin: 'windmill-wrecker', line: 'CRUNCH. Third hit and the windmill falls over. The ball rolls through the rubble and in. A hole in one! Through a LISTED WINDMILL. I\'ll be hearing from the council.', mood: 'panicked' });
            return true;
          }
          s.shot = 'diag';
          api.nope('diag');
          api.say(s.hits === 1 ? '*BONK* Off the windmill and back to your feet. The windmill was… slightly in the way. Again! Straighter!' : '*BONK* It\'s wobbling now. The windmill. Not me. Try straighter.', 'annoyed');
          return true;
        case 'right':
          api.fail('The ball rolls right… right… right into the pond. *plop*. A duck looks at you. Fresh ball, back to the tee.');
          return true;
        case 'up':
          s.shot = 'up';
          api.defy('bank');
          api.complete({ line: 'You putted AWAY from the hole and it went… off the bumper… along the top… IN. That\'s not golf, that\'s snooker. With a windmill.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'up' }],
    checks: [
      { name: 'straight at the hole', steps: [{ tap: 'diag' }], expect: 'nope' },
      { name: 'into the pond', steps: [{ tap: 'right' }], expect: 'fail' }
    ],
    ruinPaths: { 'windmill-wrecker': [{ tap: 'diag' }, { tap: 'diag' }, { tap: 'diag' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
