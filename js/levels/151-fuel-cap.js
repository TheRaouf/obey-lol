/* Level 151 — Fuel Cap (Carpark Capers)
 * At the supermarket pump: the car's fuel cap says DIESEL ONLY. Bossworth: "Green means go!"
 * Take the D nozzle, hold the trigger for two seconds to fill, hang the nozzle up, then drive home.
 * Unleaded in a diesel car: trap. Trigger with no nozzle: nope. Ruin: drive off with the hose still in.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FILL_MS = 2000;
  var NOZ = { U: 'unleaded petrol', D: 'diesel' };

  OBEY.registerLevel({
    id: 'fuel-cap',
    num: 151,
    title: 'Fuel Cap',
    objective: 'Fill up Bossworth\'s car and drive home.',
    intro: 'Fill her up! Green nozzle. Green means GO. Everyone knows that. And don\'t bother hanging it back up after, we\'re in a hurry. Pumps like to come along.',
    introMood: 'pleased',
    actions: ['tap', 'hold', 'read', 'sequence'],
    par: 4,
    hints: [
      'The car itself tells you what it drinks. Read the fuel cap.',
      'Take the D nozzle, then press and hold the trigger until the tank is full.',
      'Diesel nozzle, hold the trigger, hang the nozzle back up, then drive home.'
    ],
    wrong: ['Unleaded petrol in a diesel car (trap).', 'Squeezing the trigger with no nozzle in the car (nope).', 'Driving off with the nozzle still in the car (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Full tank, right fuel, pump still attached to the ground.',
    trick: 'Green doesn\'t mean go at a pump: the fuel cap said DIESEL ONLY, so the D nozzle was right, and it had to go back on its hook before driving off.',

    init: function () { return { hand: null, filling: false, full: false, hung: false, t: null }; },

    view: function (s) {
      return [
        O('sign', 4, 3, 44, 10, { kind: 'static', text: 'PUMP 4', label: 'Sign: pump number four', cls: 'sign-card' }),
        O('cap', 50, 3, 46, 13, { kind: 'static', text: 'Fuel cap: DIESEL ONLY', label: 'The car\'s fuel cap reads: diesel only', cls: 'ticket-card' }),
        O('pump', 4, 31, 26, 42.7, { kind: 'static', art: 'f-pump', label: 'Fuel pump' }),
        O('nU', 33, 22, 16, 20.4, { art: 'f-nozzle', artOpts: { color: '#2bc46f', letter: 'U' }, label: 'Green nozzle marked U, unleaded petrol' + (s.hand === 'U' ? ' (in the car)' : ''), hidden: s.hand === 'U' && !s.hung }),
        O('tU', 50, 26, 20, 9, { kind: 'static', text: 'U: Unleaded', label: '', cls: 'tag-card' }),
        O('nD', 33, 46, 16, 20.4, { art: 'f-nozzle', artOpts: { color: '#4b4466', letter: 'D' }, label: 'Dark grey nozzle marked D, diesel' + (s.hand === 'D' ? ' (in the car)' : ''), hidden: s.hand === 'D' && !s.hung }),
        O('tD', 50, 50, 20, 9, { kind: 'static', text: 'D: Diesel', label: '', cls: 'tag-card' }),
        O('car', 56, 60, 40, 23.3, { kind: 'static', art: 'f-car', artOpts: { color: '#3a86ff', flap: true, nozzle: s.hand && !s.hung ? (s.hand === 'U' ? '#2bc46f' : '#4b4466') : null }, label: 'Bossworth\'s car, fuel flap open' + (s.hand && !s.hung ? ', ' + NOZ[s.hand] + ' nozzle in the tank' : '') }),
        O('hand', 32, 70, 22, 10, { kind: 'static', text: s.full ? (s.hung ? 'Tank full ✓' : 'Full! Nozzle in') : (s.hand ? 'Nozzle: ' + s.hand : 'Nozzle: none'), label: s.full ? 'Tank full' : (s.hand ? NOZ[s.hand] + ' nozzle in the car' : 'No nozzle in the car'), cls: 'tag-card' }),
        O('trigger', 4, 84, 40, 12, { text: s.full ? 'Tank full' : 'Squeeze (hold)', label: 'Squeeze the pump trigger (press and hold)', cls: 'hold-btn' + (s.filling ? ' charging' : '') + (s.full ? ' done' : ''), hold: true }),
        O('hang', 46, 86, 24, 10, { text: 'Hang it up', label: 'Hang the nozzle back on the pump', cls: 'btn-card' }),
        O('drive', 72, 86, 24, 10, { text: 'Drive home', label: 'Drive home', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'tap:nU': case 'tap:nD':
          if (s.full) { api.nope(a.target); api.say('The tank is full. It\'s not a buffet.', 'annoyed'); return true; }
          s.hand = a.target === 'nU' ? 'U' : 'D';
          s.hung = false;
          api.say(s.hand === 'U' ? 'Green! Lovely. Now squeeze. Squeeze like you mean it.' : 'The grey one? D for… Dull? Disappointing? Fine. Squeeze it, if you must.', s.hand === 'U' ? 'pleased' : 'suspicious');
          return true;
        case 'holdstart:trigger':
          if (s.full) return true;
          if (!s.hand) { api.nope('trigger'); api.say('You squeeze. Nothing happens. The nozzle is still on the pump. You\'re fuelling the air.', 'pleased'); return true; }
          s.filling = true;
          s.t = api.after(FILL_MS, function () {
            s.t = null; s.filling = false;
            if (s.hand === 'U') {
              api.fail('Glug glug… COUGH. Petrol in a diesel car. The car hiccups, sulks and refuses to start. A mechanic drains it, very slowly, while Bossworth whistles.');
              return;
            }
            s.full = true;
            api.say('Click. Full. Diesel. Fine. Now let\'s GO, never mind the hose, the hose can come too.', 'annoyed');
          });
          return true;
        case 'holdend:trigger':
          s.filling = false;
          if (s.t) { api.cancel(s.t); s.t = null; api.say('About four drops. That\'ll get us to the end of the forecourt. Keep squeezing.', 'pleased'); }
          return true;
        case 'tap:trigger':
          return true;
        case 'tap:hang':
          if (!s.hand || s.hung) { api.nope('hang'); api.say('Hang up what? The nozzles are already on the pump.', 'neutral'); return true; }
          s.hung = true;
          if (!s.full) s.hand = null;
          api.say(s.full ? 'Click. Back on its hook. So tidy. So slow.' : 'Back on the pump. The tank is still empty, mind.', 'annoyed');
          return true;
        case 'tap:drive':
          if (!s.full) { api.nope('drive'); api.say('The fuel light is on. The car is running on hope. Fill it first.', 'pleased'); return true; }
          if (!s.hung) {
            api.complete({ ruin: 'hose-and-go', line: 'BOINNNG! We drove off with the nozzle still in! The hose stretched across the whole forecourt and pinged us back like a catapult. Pump 4 is now in the car wash.', mood: 'panicked' });
          } else {
            api.complete({ line: 'Full tank, right fuel, nozzle on its hook. We\'re going home. You did that annoyingly well.', mood: 'defeated' });
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'nD' }, { hold: ['trigger', 2200] }, { tap: 'hang' }, { tap: 'drive' }],
    ruinPaths: { 'hose-and-go': [{ tap: 'nD' }, { hold: ['trigger', 2200] }, { tap: 'drive' }] },
    checks: [
      { name: 'Bossworth\'s green nozzle', steps: [{ tap: 'nU' }, { hold: ['trigger', 2200] }], expect: 'fail' },
      { name: 'squeezing with no nozzle', steps: [{ hold: ['trigger', 2200] }], expect: 'nope' },
      { name: 'driving on empty', steps: [{ tap: 'nD' }, { tap: 'drive' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
