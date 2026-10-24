/* Level 93 — Absolutely Zero
 * The freezer dial is in KELVIN. Bossworth says "set it to zero, zero is cold". 0 K is absolute
 * zero (ruin: everything freezes solid, forever). The cheat sheet shows water freezes at 273 K,
 * so 255 K keeps the ice cream frozen. 373 K boils it (trap); 300 K is where it already is (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var OPTS = [0, 255, 300, 373];

  OBEY.registerLevel({
    id: 'absolutely-zero',
    num: 93,
    title: 'Absolutely Zero',
    objective: 'Keep the ice cream frozen.',
    intro: 'The ice cream is melting! Set the freezer to ZERO. Zero is the coldest number, so it\'s the coldest setting. That\'s just maths. And science. Mostly maths.',
    introMood: 'panicked',
    actions: ['tap', 'reading'],
    par: 1,
    hints: [
      'Look at the unit on the freezer dial. It isn\'t Celsius.',
      'The cheat sheet says water freezes at 273 K. Ice cream wants a bit below that — but not the end of physics.',
      'Set the freezer to 255 K.'
    ],
    wrong: ['373 K boils the ice cream (trap).', '300 K is the current, melting setting (nope).', 'Opening the freezer door just lets the cold out (nope).', '0 K is absolute zero: a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Frozen, not fossilised. The ice cream thanks you. I do not.',
    trick: 'The dial was in Kelvin, where zero is absolute zero; anything a bit under 273 K freezes ice cream without stopping the universe.',

    init: function () { return { temp: 300 }; },

    view: function (s) {
      var objs = [
        O('freezer', 4, 30, 44, 56, { art: 'd-freezer', artOpts: { state: s.temp === 373 ? 'boiled' : (s.temp === 300 ? 'melted' : 'ok') }, label: 'Freezer with a tub of ice cream, ' + (s.temp === 300 ? 'melting' : 'cold') }),
        O('dial', 4, 4, 44, 12, { kind: 'static', text: 'Dial: ' + s.temp + ' K', label: 'Freezer dial reads ' + s.temp + ' kelvin', cls: 'display-card' }),
        O('sheet', 54, 4, 42, 64, { kind: 'static', text: 'KELVIN CHEAT SHEET\n\n0 K: absolute zero (all motion stops)\n273 K: water freezes\n300 K: a nice warm room\n373 K: water boils', label: 'Kelvin cheat sheet: 0 K absolute zero, all motion stops. 273 K water freezes. 300 K a warm room. 373 K water boils.', cls: 'book-card' }),
        O('unit', 4, 17, 44, 10, { kind: 'static', text: 'Unit: KELVIN (K)', label: 'The dial unit is kelvin', cls: 'tag-card' })
      ];
      OPTS.forEach(function (t, i) {
        objs.push(O('set' + t, 54 + (i % 2) * 22, 70 + Math.floor(i / 2) * 14, 20, 12, { text: t + ' K', label: 'Set the freezer to ' + t + ' kelvin', cls: 'btn-card big' + (t === 0 ? ' accent' : '') }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'freezer':
          api.nope();
          api.say('Don\'t open it! You\'ll let the cold out. Cold is shy.', 'annoyed');
          return true;
        case 'set300':
          api.nope();
          api.say('It\'s ALREADY at 300 K. That\'s room temperature. Hence: soup.', 'annoyed');
          return true;
        case 'set373':
          api.fail('373 K? That\'s BOILING. You made hot ice cream. It\'s a crime in four countries. Fresh tub, try again.', 'laughing');
          return true;
        case 'set0':
          api.complete({ ruin: 'absolute-zero', line: 'ZERO KELVIN. The ice cream is preserved forever. So is the freezer. And the lab. And my left eyebrow. Level complete. Technically. I hate technically.', mood: 'panicked' });
          return true;
        case 'set255':
          s.temp = 255;
          api.defy('zero');
          api.complete({ line: '255 K. Cold, firm, scoopable. You read the unit. Who reads the UNIT?', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'set255' }],
    ruinPaths: { 'absolute-zero': [{ tap: 'set0' }] },
    checks: [
      { name: 'boiling is a trap', steps: [{ tap: 'set373' }], expect: 'fail' },
      { name: 'current setting is a nope', steps: [{ tap: 'set300' }], expect: 'nope' },
      { name: 'opening the freezer is a nope', steps: [{ tap: 'freezer' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
