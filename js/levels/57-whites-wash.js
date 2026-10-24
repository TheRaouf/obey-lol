/* Level 57 — Whites Wash
 * "The machine's loaded, I checked, just press START." The porthole shows a flash of red among the
 * white sheets. Open the door (the red sock flops out), then START. Bossworth also wants his wool jumper
 * in on HOT — its label says hand wash cold.
 * Wrong: START with the sock inside turns everything pink (trap); putting the sock back in (nope).
 * Ruin: wash the wool jumper on HOT (shrunken-jumper).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'whites-wash',
    num: 57,
    title: 'Whites Wash',
    objective: 'Wash the white sheets. Keep them white.',
    intro: 'Whites wash! The machine\'s all loaded — I checked inside personally. Just press START. Oh, and pop my lucky wool jumper in too. It LOVES a hot wash.',
    introMood: 'pleased',
    actions: ['tap', 'observe', 'drag'],
    par: 2,
    hints: [
      'Look closely through the round window of the washing machine.',
      'There is something red in with the whites. Open the door.',
      'Tap the machine to open it (the red sock falls out), then press START. Leave the jumper alone.'
    ],
    wrong: ['Washing with the red sock inside turns everything pink (trap).', 'Putting the red sock back in is refused (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Whiter than Bossworth\'s excuses.',
    trick: 'Bossworth "checked" the load, but the porthole showed a red sock — opening the door first saved the whites.',

    init: function () { return { open: false, sock: 'in', jumper: false, washed: false }; },

    view: function (s) {
      return [
        O('prog', 54, 4, 42, 11, { kind: 'static', text: 'HOT WHITES 90°', label: 'Programme: hot whites, 90 degrees', cls: 'display-card' }),
        O('start', 54, 18, 42, 12, { text: 'START', label: 'Start the wash', cls: 'btn-card accent' }),
        O('washer', 4, 6, 44, 64, { art: 'b-washer', artOpts: { sock: s.sock === 'in', open: s.open, spinning: s.washed }, zone: true,
          label: s.open ? 'Washing machine, door open (tap to close)' : 'Washing machine, door shut. Through the window: white sheets' + (s.sock === 'in' ? ' and a flash of red' : '') + ' (tap to open)' }),
        O('sock', 14, 76, 16, 16, { art: 'b-sock', artOpts: { color: 'red' }, drag: true, hidden: s.sock !== 'floor', label: 'Red sock on the floor (drag it to the basket)', cls: 'pop-in' }),
        O('basket', 34, 74, 22, 22, { art: 'basket', zone: true, free: true, label: 'Laundry basket for coloureds' + (s.sock === 'basket' ? ', with a red sock in it' : '') }),
        O('care', 60, 38, 36, 12, { kind: 'static', text: 'Jumper label: 100% WOOL. Hand wash COLD.', label: 'Care label on the jumper: 100 percent wool, hand wash cold', cls: 'tag-card' }),
        O('jumper', 66, 54, 26, 24, { art: 'b-jumper', drag: true, hidden: s.jumper, label: 'Bossworth\'s lucky wool jumper (drag it somewhere)' }),
        O('floor', 60, 84, 36, 10, { kind: 'static', text: s.jumper ? 'Jumper: in the machine. Uh-oh.' : 'Jumper: safely on the chair.', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (a.target === 'sock') {
          if (a.zone === 'basket') { s.sock = 'basket'; api.say('Into the coloureds. Fine. Very tidy. I hate it.', 'annoyed'); }
          else if (a.zone === 'washer') { api.nope(); api.say('You want to put the red sock BACK? …Actually, yes, do that. No? The sock won\'t go? Even the sock knows.', 'suspicious'); }
          return true;
        }
        if (a.target === 'jumper') {
          if (a.zone === 'washer') { s.jumper = true; api.say('YES. In it goes. Hot water makes wool feel loved. That\'s a fact I just decided.', 'pleased'); }
          else if (a.zone === 'basket') api.say('Not in the basket! It wants the HOT wash! It told me!', 'annoyed');
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'washer':
          s.open = !s.open;
          if (s.open && s.sock === 'in') { s.sock = 'floor'; api.say('Why is there a red sock in there? Who put that there? …Don\'t answer that.', 'surprised'); }
          return true;
        case 'basket':
          api.say('The coloureds basket. Not for whites. Not for jumpers. For… colour. Like my personality.', 'neutral');
          return true;
        case 'start':
          s.open = false; s.washed = true;
          if (s.jumper) {
            api.complete({ ruin: 'shrunken-jumper', line: 'My lucky jumper… it\'s TINY. It fits a hamster. A small, lucky hamster. You did exactly what I said and I have never been so betrayed!', mood: 'panicked' });
          } else if (s.sock === 'in') {
            api.fail('Whirr… slosh… PINK. Every sheet is pink. The red sock looks very pleased with itself. Re-loading the whites…');
          } else {
            api.defy('checked');
            api.complete({ line: 'Sparkling white sheets. So you DIDN\'T trust my inspection. Correctly. Rudely, but correctly.', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'washer' }, { tap: 'start' }],
    alternatives: { tidy: [{ tap: 'washer' }, { drop: ['sock', 'basket'] }, { tap: 'start' }] },
    checks: [
      { name: 'trust the inspection', steps: [{ tap: 'start' }], expect: 'fail' },
      { name: 'sock back in', steps: [{ tap: 'washer' }, { drop: ['sock', 'washer'] }], expect: 'nope' }
    ],
    ruinPaths: { 'shrunken-jumper': [{ drop: ['jumper', 'washer'] }, { tap: 'washer' }, { tap: 'start' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
