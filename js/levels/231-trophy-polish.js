/* Level 231 — Trophy Polish (Podium Party)
 * The sports day cup is too grimy to read. Bossworth says it's engraved BOSSWORTH and wants it handed
 * over (trap). Press and hold the polishing cloth for two seconds: the plaque reads WINNER: YOU.
 * Then lift the trophy. Lifting it before you can read it: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var POLISH_MS = 2000;

  OBEY.registerLevel({
    id: 'trophy-polish',
    num: 231,
    title: 'Trophy Polish',
    objective: 'Give the sports day cup to its winner.',
    intro: 'The sports day cup! It\'s engraved BOSSWORTH. I read it myself. Just hand it over. And don\'t polish it: polish is for show-offs.',
    introMood: 'suspicious',
    actions: ['hold', 'tap', 'read'],
    par: 2,
    hints: [
      'Nobody can read that plaque. Including Bossworth.',
      'The polishing cloth can be pressed and held.',
      'Hold the cloth for two seconds to clean the plaque, read it, then lift the trophy.'
    ],
    wrong: ['Handing the cup to Bossworth is a trap.', 'Lifting the cup before you can read the plaque is refused (nope).', 'Letting go of the cloth too soon only half-cleans it.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Polished, read, lifted. Shiny side out.',
    trick: 'The grime hid the engraving, and a polish showed the cup was never Bossworth\'s: it said WINNER: YOU.',

    init: function () { return { clean: false, polishing: false, timer: null }; },

    view: function (s) {
      return [
        O('sign', 4, 3, 58, 14, { kind: 'static', text: 'SPORTS DAY CUP: engraved with the winner\'s name.', label: 'Sign: the sports day cup is engraved with the winner\'s name.', cls: 'sign-card' }),
        O('trophy', 22, 22, 40, 44, { kind: 'static', art: 'j-trophy', artOpts: { clean: s.clean }, label: s.clean ? 'The cup, gleaming' : 'The cup, covered in grime' }),
        O('table', 18, 66, 48, 9.6, { kind: 'static', art: 'table' }),
        O('plaque', 66, 26, 30, 30, { kind: 'static', text: s.clean ? 'Plaque:\nWINNER: YOU' : 'Plaque:\n(too grimy to read)', label: s.clean ? 'The plaque reads: winner, you.' : 'The plaque is too grimy to read.', cls: s.clean ? 'plaque-card' : 'tag-card' }),
        O('lift', 4, 80, 30, 14, { text: 'Lift the cup', label: 'Lift the cup', cls: 'btn-card big' }),
        O('give', 36, 80, 30, 14, { text: 'Hand it to Bossworth', label: 'Hand the cup to Bossworth', cls: 'btn-card accent' }),
        O('cloth', 70, 78, 24, 18, { art: 'j-cloth', label: 'Polishing cloth (press and hold to polish)', hold: true, cls: s.polishing ? 'charging' : '' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'holdstart:cloth':
          if (s.clean) { api.say('It\'s already gleaming. Any more and you\'ll polish the name off. Please do.', 'pleased'); return true; }
          s.polishing = true;
          api.say('Stop polishing! Polish is for show-offs! And people who want to read things!', 'panicked');
          s.timer = api.after(POLISH_MS, function () {
            s.timer = null; s.polishing = false; s.clean = true;
            api.defy('polish');
            api.say('It says… "WINNER: YOU". That\'s a typo. Engravers are terrible spellers. "YOU" is clearly how you spell Bossworth in… cursive.', 'panicked');
          });
          return true;
        case 'holdend:cloth':
          s.polishing = false;
          if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('A quick wipe. Still grimy. Good. Leave it like that.', 'suspicious'); }
          return true;
        case 'tap:cloth':
          api.say('You flick the cloth at it. Polishing needs a press and HOLD. Not that you should. Show-off.', 'neutral');
          return true;
        case 'tap:give':
          api.fail('You hand it over. Bossworth clutches it, sprints a lap of honour, trips, and the cup bounces back onto the table. Grimier. Try again.', 'laughing');
          return true;
        case 'tap:lift':
          if (!s.clean) {
            api.nope('lift');
            api.say('Lifting MY cup? It says BOSSWORTH. Probably. Under all that… grime.', 'annoyed');
          } else {
            api.complete({ line: 'You lift the cup. "WINNER: YOU". The crowd cheers. I cheer too, through my teeth. Very quietly. Like a kettle.', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ hold: ['cloth', 2200] }, { tap: 'lift' }],
    checks: [
      { name: 'hand it over', steps: [{ tap: 'give' }], expect: 'fail' },
      { name: 'lift it unread', steps: [{ tap: 'lift' }], expect: 'nope' },
      { name: 'a quick wipe', steps: [{ hold: ['cloth', 600] }, { tap: 'lift' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
