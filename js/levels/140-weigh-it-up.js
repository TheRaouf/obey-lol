/* Level 140 — Weigh It Up (Deli Dilemma)
 * The produce scale reads 0.30 kg with nothing on it. Bossworth: "that's just the weight of the air".
 * ZERO it first, then put the bananas on (1.20 kg), then PRINT. Printing 1.50 kg: trap (paying for
 * nothing). Zeroing with the bananas on prints 0.00 kg: trap. Printing an empty scale: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var DRIFT = 30, BANANAS = 120; // hundredths of a kilo

  function kg(n) { return (n / 100).toFixed(2) + ' kg'; }

  OBEY.registerLevel({
    id: 'weigh-it-up',
    num: 140,
    title: 'Weigh It Up',
    objective: 'Print a price label for just the bananas.',
    intro: 'Bananas on the scale, print the label, done. Don\'t touch ZERO. ZERO deletes bananas. That 0.30 is just the weight of the air. Air is heavy here.',
    introMood: 'neutral',
    actions: ['tap', 'sequence', 'observe'],
    par: 3,
    hints: [
      'Look at the scale\'s display before you put anything on it.',
      'An empty scale should read 0.00. This one doesn\'t, and there\'s a button for that.',
      'Press ZERO first, then put the bananas on, then print.'
    ],
    wrong: ['Printing with the scale still reading 0.30 charges for 300 g of nothing (trap).', 'Zeroing with the bananas already on makes a 0.00 kg label (trap).', 'Printing a label with nothing on the scale (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One point two kilos of honest bananas.',
    trick: 'An empty scale showing 0.30 kg would have charged you for 300 grams of nothing, so you zeroed it before the bananas went on.',

    init: function () { return { tare: 0, on: false, label: null }; },

    view: function (s) {
      var reading = DRIFT + (s.on ? BANANAS : 0) - s.tare;
      return [
        O('sign', 4, 3, 50, 11, { kind: 'static', text: 'Weigh fruit here', label: 'Sign: weigh your fruit here', cls: 'sign-card' }),
        O('price', 56, 3, 40, 11, { kind: 'static', text: 'Bananas: £1 per kg', label: 'Bananas cost one pound per kilogram', cls: 'tag-card' }),
        O('scale', 26, 34, 48, 40.8, { kind: 'static', art: 'f-prodscale', artOpts: { bananas: s.on }, label: 'Produce scale' + (s.on ? ' with the bananas on it' : ', nothing on it') }),
        O('display', 37.5, 54.5, 25, 9.5, { kind: 'static', text: kg(reading), label: 'Scale display: ' + kg(reading), cls: 'display-card' }),
        O('bananas', 4, 76, 20, 12.5, { art: 'f-bananas', label: 'Bunch of bananas (tap to put them on the scale)', hidden: s.on }),
        O('stand', 2, 89, 24, 4.8, { kind: 'static', art: 'f-pallet', label: '' }),
        O('zero', 78, 36, 18, 13, { text: 'ZERO', label: 'ZERO button: sets the scale back to 0.00', cls: 'btn-card big' }),
        O('print', 78, 53, 18, 13, { text: 'PRINT', label: 'Print the price label', cls: 'btn-card big' }),
        O('label', 30, 82, 66, 13, { kind: 'static', text: s.label === null ? 'Label: not printed yet' : 'Label: ' + kg(s.label), label: s.label === null ? 'No label printed yet' : 'Printed label: ' + kg(s.label), cls: 'ticket-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var reading = DRIFT + (s.on ? BANANAS : 0) - s.tare;
      switch (a.target) {
        case 'zero':
          s.tare += reading;
          api.say(s.on ? 'You zeroed it WITH the bananas on. Now they weigh nothing. Free bananas! …Is that allowed?' : 'NO! You zeroed it! Now the air weighs nothing! …The bananas are still there. Huh.', s.on ? 'pleased' : 'surprised');
          return true;
        case 'bananas':
          s.on = true;
          api.say('Bananas on. Print it! Quick, before the scale changes its mind.', 'pleased');
          return true;
        case 'print':
          if (!s.on) {
            api.nope('print');
            api.say('A label for nothing? The scale is not a sticker machine. Well, it is. But not for that.', 'annoyed');
            return true;
          }
          s.label = reading;
          if (reading === BANANAS) {
            api.defy('zero');
            api.complete({ line: '1.20 kg. Exactly the bananas. So the 0.30 wasn\'t the air. Fine. The air is very light. I\'ll tell it.', mood: 'defeated' });
          } else if (reading > BANANAS) {
            api.fail('A label for ' + kg(reading) + '. You just paid for 300 grams of NOTHING. The till lady peels it off. "Zero the scale first, love."');
          } else {
            api.fail('A label for ' + kg(reading) + ' of bananas. Free bananas! The checkout lady weighs them again and raises one eyebrow. Back to the scale.');
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'zero' }, { tap: 'bananas' }, { tap: 'print' }],
    checks: [
      { name: 'Bossworth\'s way', steps: [{ tap: 'bananas' }, { tap: 'print' }], expect: 'fail' },
      { name: 'zeroing with bananas on', steps: [{ tap: 'bananas' }, { tap: 'zero' }, { tap: 'print' }], expect: 'fail' },
      { name: 'printing an empty scale', steps: [{ tap: 'print' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
