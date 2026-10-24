/* Level 215 — Long Jump (Hurdle Hollow)
 * Bossworth landed on his heels at 6.5 m, sat down at 5 m and put his hands down at 4 m.
 * The rule: measure to the mark nearest the board. Your jump: 4.5 m.
 * Solution: drag the measuring flag onto the handprints (4 m): you win.
 * Wrong: the heels or the seat print (trap: Bossworth "wins"); empty sand (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  function mx(m) { return 13.6 + m * 11.5; }
  var MARKS = {
    hands: { m: 4, label: 'Two handprints at 4 metres' },
    seat: { m: 5, label: 'A sit-down print at 5 metres' },
    heels: { m: 6.5, label: 'Two heel prints at 6.5 metres' }
  };

  OBEY.registerLevel({
    id: 'long-jump',
    num: 215,
    title: 'Long Jump',
    objective: 'Measure Bossworth\'s jump by the rules.',
    intro: 'Long jump! I flew SIX AND A HALF metres. Plant the flag at my heels. Ignore the other marks. I sat down on purpose. For style.',
    introMood: 'pleased',
    actions: ['drag', 'read'],
    par: 1,
    hints: [
      'Read the rule on the sign, then look at every mark Bossworth left in the sand.',
      'He landed, then fell backwards. Which of his marks is nearest the board?',
      'Drag the measuring flag onto the handprints at 4 metres.'
    ],
    wrong: ['Measuring at the heels or the seat print gives Bossworth the win (trap).', 'Empty sand is not a mark (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Four metres. Of which three were falling over.',
    trick: 'A jump is measured to the mark nearest the board, and Bossworth fell back onto his hands at 4 metres.',

    init: function () { return { at: null }; },

    view: function (s) {
      var out = [
        O('grass', 0, 0, 100, 100, { kind: 'static', art: 'j-grass', artOpts: { full: true } }),
        O('rules', 4, 3, 92, 13, { kind: 'static', text: 'LONG JUMP: measure to the mark NEAREST the board.', label: 'Long jump rule: measure to the mark nearest the board.', cls: 'sign-card' })
      ];
      for (var m = 1; m <= 7; m++) out.push(O('m' + m, mx(m) - 4, 18, 8, 7, { kind: 'static', text: m + 'm', label: m + ' metres', cls: 'tag-card' }));
      out.push(O('pit', 4, 27, 92, 44, { kind: 'static', art: 'j-sandpit', label: 'Sand pit. The take-off board is at the left edge.' }));
      out.push(O('sand', 18, 30, 30, 38, { label: 'Smooth sand, 1 to 3 metres', zone: true, free: true, cls: 'subtle' }));
      Object.keys(MARKS).forEach(function (k) {
        var mk = MARKS[k];
        out.push(O(k, mx(mk.m) - 5.5, 34, 11, 30, { art: 'j-print', artOpts: { type: k }, label: mk.label + (s.at === k ? ' (flag here)' : ''), zone: true }));
      });
      out.push(O('peg', 6, 76, 16, 20, { art: 'j-mflag', label: 'Measuring flag (drag it onto a mark)', drag: true, hidden: !!s.at }));
      out.push(O('you', 28, 76, 68, 9, { kind: 'static', text: 'Your jump: 4.5 m (measured)', label: 'Your jump: four and a half metres', cls: 'plaque-card' }));
      if (s.at) out.push(O('planted', mx(MARKS[s.at].m) - 5, 26, 10, 12, { kind: 'static', art: 'j-mflag', label: 'Measuring flag at ' + MARKS[s.at].m + ' metres' }));
      out.push(O('boss', 28, 87, 68, 9, { kind: 'static', text: s.at ? 'Bossworth: ' + MARKS[s.at].m + ' m' : 'Bossworth: not measured yet', label: s.at ? 'Bossworth: ' + MARKS[s.at].m + ' metres' : 'Bossworth: not measured yet', cls: 'plaque-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'sand') { api.say('Lovely smooth sand. Nobody landed there. Least of all me.', 'neutral'); return true; }
      if (a.type === 'tap' && MARKS[a.target]) {
        api.say({ hands: 'Handprints? Somebody else\'s. A passing gymnast.', seat: 'That is a… sitting mark. A deliberate artistic sit.', heels: 'My heels! Six and a half metres of pure glory. Flag goes HERE.' }[a.target], a.target === 'heels' ? 'pleased' : 'suspicious');
        return true;
      }
      if (a.type !== 'drop' || a.target !== 'peg') return false;
      if (a.zone === 'hands') {
        s.at = 'hands';
        api.defy('hands');
        api.complete({ line: 'FOUR metres?! Nearest the board… my HANDS. You lose by… no. I lose. By half a metre. To my own palms.', mood: 'defeated' });
      } else if (a.zone === 'seat' || a.zone === 'heels') {
        api.fail(a.zone === 'heels'
          ? 'Six and a half metres! Gold for me! …Then the judges read the sign. The nearest mark counts, not the furthest. Flag back in the bag!'
          : 'Five metres, beating your 4.5! …But was the seat the nearest mark? The judges say no. Try again.');
      } else {
        api.nope('peg');
        api.say('Nobody landed there. Put the flag on one of my marks. Preferably the glorious one.', 'annoyed');
      }
      return true;
    },

    solution: [{ drop: ['peg', 'hands'] }],
    checks: [
      { name: 'at his heels', steps: [{ drop: ['peg', 'heels'] }], expect: 'fail' },
      { name: 'at the seat', steps: [{ drop: ['peg', 'seat'] }], expect: 'fail' },
      { name: 'empty sand', steps: [{ drop: ['peg', 'sand'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
