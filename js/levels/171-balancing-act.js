/* Level 171 — Balancing Act (Detention Dunes)
 * Maths equaliser: one weight hangs on peg 4 of the left arm. Your two weights go on the right arm,
 * whose peg 4 has snapped off. Bossworth: hang both on peg 3, "far is fair". The rule card: each weight
 * counts as its peg number, and both sides must add up the same. 4 = 2 + 2 or 1 + 3. Then let go.
 * Wrong: letting go when the sides don't match (trap); letting go before both weights are hung (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var LEFT = 4, BROKEN = 4;
  function pegX(d) { return 50 + d * 9.66; }

  OBEY.registerLevel({
    id: 'balancing-act',
    num: 171,
    title: 'Balancing Act',
    objective: 'Hang both weights so the beam balances, then let go.',
    intro: 'Balance the beam! My weight is on peg 4. Your peg 4 snapped off, so hang BOTH your weights on peg 3, right out near the end. Far is fair!',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'logic'],
    par: 3,
    hints: [
      'Read the rule card: a weight counts as its peg number.',
      'The left side counts 4. Your two weights must add up to 4 as well.',
      'Hang both weights on peg 2 (or one on peg 1 and one on peg 3), then let go.'
    ],
    wrong: ['Letting go when the sides don\'t add up the same is a trap.', 'Letting go before both weights are hung is a nope.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Two on peg two. Perfectly level, like a good argument.',
    trick: 'On a balance a weight counts as far as its peg is from the middle, so two weights on peg 2 (or pegs 1 and 3) matched one weight on peg 4.',

    init: function () { return { at: { w1: 0, w2: 0 } }; },

    view: function (s) {
      var out = [
        O('rule', 4, 3, 92, 12, { kind: 'static', text: 'Rule: each weight counts as its peg number. Both sides must add up the same.', label: 'Rule card: each weight counts as its peg number, and both sides must add up the same', cls: 'honest-card' }),
        O('beam', 4, 26, 92, 50.6, { kind: 'static', art: 'g-equaliser', artOpts: { broken: BROKEN }, label: 'Balance beam with pegs 1 to 4 on each side; peg 4 on the right has snapped off. It is held level until you let go.' }),
        O('leftW', pegX(-LEFT) - 4.5, 46, 9, 13, { kind: 'static', art: 'g-weight', label: 'Bossworth\'s weight on left peg 4' })
      ];
      for (var d = 1; d <= 3; d++) out.push(O('peg' + d, pegX(d) - 4.8, 42, 9.6, 32, { kind: 'zone', label: 'Right peg ' + d, zone: true }));
      var count = {};
      ['w1', 'w2'].forEach(function (w, i) {
        var p = s.at[w];
        var x, y;
        if (p) { count[p] = (count[p] || 0) + 1; x = pegX(p) - 4.5; y = 46 + (count[p] - 1) * 13; }
        else { x = 61 + i * 14; y = 81; }
        out.push(O(w, x, y, 9, 13, { art: 'g-weight', label: 'Your weight ' + (i + 1) + (p ? ', on right peg ' + p : ', in the tray') + ' (drag it)', drag: true }));
      });
      out.push(O('tray', 56, 94, 32, 4, { kind: 'static', text: '', label: '', cls: 'tag-card' }));
      out.push(O('letgo', 4, 84, 40, 13, { text: 'Let go of the beam', label: 'Let go of the beam', cls: 'btn-card big' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && s.at[a.target] !== undefined) {
        var m = /^peg(\d)$/.exec(a.zone || '');
        if (m) s.at[a.target] = Number(m[1]);
        return true;
      }
      if (a.type !== 'tap' || a.target !== 'letgo') return false;
      if (!s.at.w1 || !s.at.w2) { api.nope('letgo'); api.say('Both weights on the beam first. I\'m not holding this thing for fun. (I am a bit.)', 'annoyed'); return true; }
      var right = s.at.w1 + s.at.w2;
      if (right === LEFT) {
        api.defy('level');
        api.complete({ line: 'It\'s… level. Two little weights on peg ' + (s.at.w1 === s.at.w2 ? '2' : s.at.w1 + ' and ' + s.at.w2) + ' beat my big important peg 4? Near the middle? Maths is so UNFAIR.', mood: 'defeated' });
      } else {
        api.fail('You let go. CLONK. The beam tips to the ' + (right > LEFT ? 'right' : 'left') + ' (' + right + ' against ' + LEFT + ') and both weights roll under the radiator. Back to the tray!');
      }
      return true;
    },

    solution: [{ drop: ['w1', 'peg2'] }, { drop: ['w2', 'peg2'] }, { tap: 'letgo' }],
    alternatives: { oneAndThree: [{ drop: ['w1', 'peg1'] }, { drop: ['w2', 'peg3'] }, { tap: 'letgo' }] },
    checks: [
      { name: 'Bossworth\'s far is fair', steps: [{ drop: ['w1', 'peg3'] }, { drop: ['w2', 'peg3'] }, { tap: 'letgo' }], expect: 'fail' },
      { name: 'one weight only', steps: [{ drop: ['w1', 'peg3'] }, { tap: 'letgo' }], expect: 'nope' },
      { name: 'too light', steps: [{ drop: ['w1', 'peg1'] }, { drop: ['w2', 'peg1'] }, { tap: 'letgo' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
