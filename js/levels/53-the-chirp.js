/* Level 53 — The Chirp
 * 3 a.m. Something chirps every few seconds. Bossworth blames the budgie (cover its cage) and forbids
 * touching the smoke alarm. Watch: each CHIRP flashes the smoke alarm's light while the budgie sleeps.
 * The alarm is on the ceiling, so drag the step stool under it, then drag the fresh battery onto it.
 * Wrong: covering the budgie (nope, the chirps continue); the battery without the step stool (nope);
 * pulling the old battery out (trap: no alarm at all). Ruin: whack the alarm with the broom three times.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var EVERY = 2500, FLASH = 900;

  OBEY.registerLevel({
    id: 'the-chirp',
    num: 53,
    title: 'The Chirp',
    objective: 'Stop the 3 a.m. chirping — safely.',
    intro: 'Hear that CHIRP? It\'s the budgie. Classic budgie. Throw the towel over its cage and we can all sleep. And do NOT fiddle with the smoke alarm. It\'s sensitive.',
    introMood: 'annoyed',
    actions: ['wait', 'observe', 'drag'],
    par: 2,
    hints: [
      'Watch closely when the next CHIRP happens. What lights up? What is the budgie doing?',
      'The smoke alarm chirps when its battery is low. It\'s on the ceiling, so you need something to stand on.',
      'Drag the step stool under the smoke alarm, then drag the fresh battery onto the alarm.'
    ],
    wrong: ['Covering the sleeping budgie changes nothing (nope).', 'You can\'t reach the ceiling without the step stool (nope).', 'Pulling the old battery out leaves the house unprotected (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Silence. Safe, battery-powered silence.',
    trick: 'The chirp flashed the smoke alarm\'s light, not the budgie: a fresh battery stopped it without switching the alarm off.',

    init: function () { return { flash: false, covered: false, stool: false, pokes: 0, fixed: false }; },

    onStart: function (s, api) {
      var chirp = function () {
        if (s.fixed) return;
        s.flash = true;
        api.after(FLASH, function () { s.flash = false; });
      };
      api.after(600, chirp);
      api.every(EVERY, chirp);
    },

    view: function (s) {
      return [
        O('sticker', 4, 2, 32, 15, { kind: 'static', text: 'Smoke alarm: "Low battery? I chirp till you notice."', label: 'Sticker: the smoke alarm chirps until you notice its battery is low', cls: 'tag-card' }),
        O('alarm', 38, 2, 24, 13, { art: 'b-smoke', artOpts: { beeping: s.flash }, zone: true, label: 'Smoke alarm on the ceiling' + (s.flash ? ', light flashing' : '') + ' (tap to pull its battery out)' }),
        O('chirp', 64, 3, 18, 9, { kind: 'static', text: 'CHIRP!', label: 'Chirp from the smoke alarm', cls: 'speech-card', hidden: !s.flash }),
        O('cage', 4, 22, 30, 40, { art: 'b-budgie', artOpts: { covered: s.covered }, zone: true, free: true, label: s.covered ? 'Budgie cage under a towel' : 'Budgie cage. The budgie is fast asleep.' }),
        O('zzz', 24, 20, 12, 8, { kind: 'static', text: 'zzz', label: '', cls: 'tag-card', hidden: s.covered }),
        O('under', 38, 58, 26, 32, { kind: 'zone', zone: true, hidden: s.stool, label: 'Floor right under the smoke alarm' }),
        O('stoolPlaced', 40, 66, 22, 26, { kind: 'static', art: 'b-stool', hidden: !s.stool, label: 'Step stool under the smoke alarm' }),
        O('stool', 72, 68, 22, 26, { art: 'b-stool', drag: true, hidden: s.stool, label: 'Step stool (drag it)' }),
        O('battery', 76, 28, 14, 20, { art: 'battery', drag: true, label: 'Fresh 9-volt battery (drag it)' }),
        O('time', 66, 52, 30, 9, { kind: 'static', text: '3:07 a.m.', label: '', cls: 'tag-card' }),
        O('towel', 6, 68, 14, 26, { art: 'b-towel', artOpts: { color: '#ff77b4' }, drag: true, hidden: s.covered, label: 'Towel (drag it)' }),
        O('broom', 22, 64, 12, 32, { art: 'b-broom', label: 'Broom (tap to poke the ceiling)' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (a.target === 'towel') {
          if (a.zone !== 'cage') return true;
          s.covered = true;
          api.nope();
          api.say('There. Budgie covered. Sweet silen— CHIRP. …That was a very muffled budgie. Through a towel. While asleep.', 'suspicious');
          return true;
        }
        if (a.target === 'stool') {
          if (a.zone === 'under') { s.stool = true; api.say('A stool under MY smoke alarm? What are you planning up there? Nothing good. Nothing helpful.', 'suspicious'); }
          return true;
        }
        if (a.target === 'battery') {
          if (a.zone !== 'alarm') return true;
          if (!s.stool) { api.nope(); api.say('You can\'t reach the ceiling. You\'re not that tall. Nobody is that tall. Except giraffes, who don\'t do DIY.', 'pleased'); return true; }
          s.fixed = true; s.flash = false;
          api.defy('alarm');
          api.complete({ line: 'You changed the battery and the chirping… stopped. So it WASN\'T the budgie. I owe the budgie an apology. I won\'t give it one.', mood: 'defeated' });
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'alarm':
          api.fail('You yank the old battery out. Blissful quiet… until the toast you forgot about starts smoking and NOTHING beeps. Battery back in. Fix it properly!');
          return true;
        case 'cage':
          api.say('The budgie opens one eye, gives you a look, and goes back to sleep. Budgie\'s innocent. Probably. Budgies are shifty.', 'suspicious');
          return true;
        case 'broom':
          s.pokes++;
          if (s.pokes >= 3) {
            api.complete({ ruin: 'alarm-whacker', line: 'CRASH! The smoke alarm hits the floor and screams at FULL VOLUME. Forever. The budgie\'s awake. The street\'s awake. I am wide, wide awake. Thank you SO much.', mood: 'panicked' });
            return true;
          }
          api.nope();
          api.say(s.pokes === 1 ? 'Poke. The alarm chirps back, offended. Don\'t poke it again.' : 'Poke! It\'s making a sort of furious beep now. Stop. Poking. It.', 'panicked');
          return true;
      }
      return false;
    },

    solution: [{ drop: ['stool', 'under'] }, { drop: ['battery', 'alarm'] }],
    checks: [
      { name: 'cover the budgie', steps: [{ drop: ['towel', 'cage'] }], expect: 'nope' },
      { name: 'battery without the box', steps: [{ drop: ['battery', 'alarm'] }], expect: 'nope' },
      { name: 'pull the battery out', steps: [{ tap: 'alarm' }], expect: 'fail' },
      { name: 'just listen for a while', steps: [{ wait: 20000 }], expect: 'playing' }
    ],
    ruinPaths: { 'alarm-whacker': [{ tap: 'broom' }, { tap: 'broom' }, { tap: 'broom' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
