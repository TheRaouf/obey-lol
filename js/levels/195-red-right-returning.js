/* Level 195 — Red Right Returning (Periscope Pier)
 * Seen from above: you sail up a channel into harbour past three buoys (nearest first). The harbour
 * rule says: coming in, keep RED cans on your RIGHT and GREEN cones on your LEFT. Bossworth says red
 * means danger, so keep red on your left. Buoys: 1 red can, 2 green cone, 3 red can.
 * Right answer: pass LEFT of 1, RIGHT of 2, LEFT of 3. Wrong side: trap (aground). Out of order: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BUOYS = [{ kind: 'can', pass: 'l' }, { kind: 'cone', pass: 'r' }, { kind: 'can', pass: 'l' }];
  var ROW_Y = [60, 40, 20]; // buoy 1 is nearest (bottom)

  OBEY.registerLevel({
    id: 'red-right-returning',
    num: 195,
    title: 'Red Right Returning',
    objective: 'Sail up the channel into harbour.',
    intro: 'Three buoys to pass. Red means DANGER, so keep the red ones on your LEFT, far from me. Green means GO, so keep green on your right. Obviously.',
    introMood: 'suspicious',
    actions: ['tap', 'sequence', 'read'],
    par: 3,
    hints: [
      'The harbour sign has its own opinion about red and green.',
      'Coming in, red cans go on your RIGHT. To keep a buoy on your right, you pass on its left side.',
      'Pass buoy 1 on the left (◀), buoy 2 on the right (▶), buoy 3 on the left (◀).'
    ],
    wrong: ['Passing a buoy on the wrong side runs you aground (trap).', 'Buoys must be passed in order, nearest first (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Into harbour without scraping a single barnacle. Mine, I mean. I have barnacles.',
    trick: 'The harbour rule was "red right returning": coming in, every red can belongs on your right, so you passed to the left of it.',

    init: function () { return { next: 0, sides: [] }; },

    view: function (s) {
      var out = [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-sea', artOpts: { nobed: true }, cls: 'backdrop' }),
        O('rulesign', 4, 2, 30, 17, { kind: 'static', text: 'HARBOUR RULE', label: 'Harbour rule sign', cls: 'sign-card' }),
        O('rule', 37, 2, 59, 17, { kind: 'static', text: 'Coming in: RED cans on your RIGHT, GREEN cones on your LEFT.', label: 'Harbour rule: coming in, keep red cans on your right and green cones on your left', cls: 'honest-card' })
      ];
      BUOYS.forEach(function (b, i) {
        var y = ROW_Y[i] + (i === 2 ? 2 : 0);
        out.push(O('buoy' + (i + 1), 42, y, 16, 17, { kind: 'static', art: 'i-buoy', artOpts: { kind: b.kind, n: i + 1 }, label: 'Buoy ' + (i + 1) + ': ' + (b.kind === 'can' ? 'red can, flat top' : 'green cone, pointed top') }));
        out.push(O('l' + (i + 1), 22, y + 3, 16, 12, { text: '◀', label: 'Pass buoy ' + (i + 1) + ' on its left side', cls: 'btn-card big' }));
        out.push(O('r' + (i + 1), 62, y + 3, 16, 12, { text: '▶', label: 'Pass buoy ' + (i + 1) + ' on its right side', cls: 'btn-card big' }));
      });
      var sx = 43, sy = 82;
      if (s.next > 0) { var last = s.sides[s.next - 1]; sx = last === 'l' ? 4 : 82; sy = ROW_Y[s.next - 1] + 4; }
      out.push(O('sub', sx, sy, 14, 10, { kind: 'static', art: 'i-sub', label: s.next ? 'Your submarine, past buoy ' + s.next : 'Your submarine, at the mouth of the channel' }));
      out.push(O('legend', 4, 84, 34, 10, { kind: 'static', text: '◀ ▶ = which side you pass', label: '', cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      var m = a.type === 'tap' && /^([lr])([1-3])$/.exec(a.target);
      if (!m) return false;
      var i = Number(m[2]) - 1, side = m[1];
      if (i !== s.next) {
        api.nope();
        api.say(i < s.next ? 'We\'ve passed that one. No going back, I get seasick in reverse.' : 'One buoy at a time! Nearest first. This is a channel, not a hopscotch.', 'annoyed');
        return true;
      }
      if (BUOYS[i].pass !== side) {
        api.fail('SCRUNCH! Wrong side of buoy ' + (i + 1) + '. That\'s the sandbank it was guarding. Towed back to the start by a disappointed tugboat.');
        return true;
      }
      s.sides.push(side); s.next++;
      api.defy('red-left');
      if (s.next === 3) api.complete({ line: 'Red on the right, every time. Into harbour. I may have had the colours backwards. Or the sea does.', mood: 'defeated' });
      else api.say(['You kept the red one on your RIGHT? Brave. Or lucky.', 'Green on your left now. You\'re just reading that sign, aren\'t you?'][i], 'suspicious');
      return true;
    },

    solution: [{ tap: 'l1' }, { tap: 'r2' }, { tap: 'l3' }],
    checks: [
      { name: 'red on the left (Bossworth) is a trap', steps: [{ tap: 'r1' }], expect: 'fail' },
      { name: 'green on the right is a trap', steps: [{ tap: 'l1' }, { tap: 'l2' }], expect: 'fail' },
      { name: 'skipping ahead is a nope', steps: [{ tap: 'l3' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
