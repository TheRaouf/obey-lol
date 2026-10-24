/* Level 214 — Sack Race (Hurdle Hollow)
 * Hop along a lane of 8 tiles to the finish. Small hop = 2 tiles, BIG hop = 3. Puddles sit on
 * tiles 3 and 6; land on one and you fall over. Bossworth: "BIG hops only!" (3 = puddle).
 * Solution: small, big, big (2, 5, 8). Also: small, small, big, small (2, 4, 7, past 8).
 * Wrong: any landing on 3 or 6 (trap); climbing out of the sack (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var PUDDLES = [3, 6], FINISH = 8;
  function tx(i) { return 3 + i * 10.4; }

  OBEY.registerLevel({
    id: 'sack-race',
    num: 214,
    title: 'Sack Race',
    objective: 'Hop to the finish without falling over.',
    intro: 'Sack race! BIG hops only. Small hops are for small people. And no climbing out of the sack: the referee is watching your feet.',
    introMood: 'neutral',
    actions: ['tap', 'count', 'sequence'],
    par: 3,
    hints: [
      'Count where each hop lands before you jump. Puddles are on tiles 3 and 6.',
      'A BIG hop from the start lands on tile 3. Start small.',
      'Small hop (tile 2), BIG hop (tile 5), BIG hop (tile 8).'
    ],
    wrong: ['Landing on tile 3 or 6 puts you in a puddle (trap).', 'Climbing out of the sack is against the rules (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Dry sack, dry feet, damp referee.',
    trick: 'Bossworth\'s "BIG hops only" landed on tile 3; mixing hop sizes was the only way to step over both puddles.',

    init: function () { return { pos: 0, hops: 0 }; },

    view: function (s) {
      var out = [
        O('grass', 0, 0, 100, 100, { kind: 'static', art: 'j-grass', artOpts: { full: true } }),
        O('rules', 4, 3, 92, 15, { kind: 'static', text: 'SACK RACE: hop to tile 8. Land in a puddle and you fall over.', label: 'Sack race rules: hop to tile 8. Land in a puddle and you fall over.', cls: 'book-card' })
      ];
      for (var i = 0; i <= FINISH; i++) {
        var p = PUDDLES.indexOf(i) >= 0;
        out.push(O('t' + i, tx(i), 40, 9.8, 10, { kind: 'static', art: 'j-tile', artOpts: { n: i, puddle: p, start: i === 0, finish: i === FINISH }, label: i === 0 ? 'Start tile' : 'Tile ' + i + (p ? ', with a puddle' : '') + (i === FINISH ? ', the finish' : '') }));
      }
      var at = Math.min(s.pos, FINISH);
      out.push(O('you', tx(at) - 0.4, 24, 10.6, 16, { kind: 'static', art: 'j-sack', label: 'You, in a sack, on ' + (at ? 'tile ' + at : 'the start'), cls: 'hero-sprite' }));
      out.push(O('pos', 4, 54, 92, 8, { kind: 'static', text: 'You: ' + (at ? 'tile ' + at : 'start') + '. Puddles: tiles 3 and 6.', label: '', cls: 'tag-card' }));
      out.push(O('small', 4, 66, 44, 13, { text: 'Small hop (+2)', label: 'Small hop: two tiles', cls: 'btn-card big' }));
      out.push(O('big', 52, 66, 44, 13, { text: 'BIG hop (+3)', label: 'Big hop: three tiles', cls: 'btn-card accent big' }));
      out.push(O('run', 20, 84, 60, 11, { text: 'Climb out and run', label: 'Climb out of the sack and run', cls: 'btn-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'run') {
        api.nope('run');
        api.say('FEET IN THE SACK. It\'s a SACK race. Without the sack it\'s just a race, and I didn\'t bring a whistle for that.', 'annoyed');
        return true;
      }
      if (a.target !== 'small' && a.target !== 'big') return false;
      s.pos += a.target === 'small' ? 2 : 3;
      s.hops++;
      if (PUDDLES.indexOf(s.pos) >= 0) {
        api.fail('SPLOSH! Tile ' + s.pos + ' was a puddle. You topple over like a sad sack of potatoes. Back to the start!');
        return true;
      }
      if (s.pos >= FINISH) {
        api.complete({ line: 'Over the line and not a drop on you. You did SMALL hops. On purpose. Small people win now? Is that the world we live in?', mood: 'defeated' });
        return true;
      }
      if (a.target === 'small') api.say('A small hop. Tile ' + s.pos + '. How very modest. Go BIG next!', 'annoyed');
      else { api.defy('mix'); api.say('BIG hop! Tile ' + s.pos + '! See? Big is beautiful. Keep going big!', 'pleased'); }
      return true;
    },

    solution: [{ tap: 'small' }, { tap: 'big' }, { tap: 'big' }],
    alternatives: { 'four-hops': [{ tap: 'small' }, { tap: 'small' }, { tap: 'big' }, { tap: 'small' }] },
    checks: [
      { name: 'big hops only', steps: [{ tap: 'big' }], expect: 'fail' },
      { name: 'small hops only', steps: [{ tap: 'small' }, { tap: 'small' }, { tap: 'small' }], expect: 'fail' },
      { name: 'climb out', steps: [{ tap: 'run' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
