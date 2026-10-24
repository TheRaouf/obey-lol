/* Level 14 — The Final Warning
 * Combines mechanics: drag (battery → socket), hold (CHARGE for 2 s), wait (green light after 3 s),
 * then a meaningful choice about Bossworth's warning sign:
 *   "Straighten the sign" → choice sign=fix (hero lean)   "Doodle on the sign" → choice sign=graffiti (chaos lean)
 * Wrong: holding CHARGE without the battery; releasing too early (meter resets).
 * Secret: fine-print (tap the tiny fine print on the sign).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CHARGE_MS = 2000, GREEN_MS = 3000;

  OBEY.registerLevel({
    id: 'final-warning',
    num: 14,
    title: 'The Final Warning',
    objective: 'Power the gate and get out.',
    intro: 'FINAL WARNING. Do NOT plug in the battery. Do NOT hold the charge button. Do NOT wait for the green light. And do NOT touch my sign.',
    introMood: 'annoyed',
    actions: ['drag', 'hold', 'wait', 'choice'],
    par: 3,
    hints: [
      'This level uses everything you\'ve learned: dragging, holding and waiting.',
      'Plug the battery into the socket, then press and hold CHARGE until the meter fills.',
      'After charging, wait for the light to turn green, then decide what to do with the sign.'
    ],
    wrong: ['CHARGE does nothing without the battery.', 'Releasing CHARGE early resets the meter.'],
    secrets: ['fine-print'],
    endingNote: 'Choice: straightening the sign leans Hero; doodling on it leans Chaos.',
    done: 'Warnings: thoroughly ignored. Gate: open.',

    init: function () { return { plugged: false, charging: false, charged: false, green: false, chargeTimer: null }; },

    view: function (s) {
      return [
        O('sign', 4, 4, 52, 30, { kind: 'static', art: 'warnsign', label: 'Warning sign: DO NOT DO ANYTHING' }),
        O('fine', 10, 26, 40, 6, { text: 'fine print', label: 'Tiny fine print on the sign', free: true, cls: 'fine-print' }),
        O('light', 66, 6, 14, 14, { kind: 'static', art: 'light', artOpts: { green: s.green }, label: s.green ? 'Light: green' : (s.charged ? 'Light: red, waiting' : 'Light: off'), live: true }),
        O('gate', 62, 24, 34, 40, { kind: 'static', art: 'gate', artOpts: { lit: s.green }, label: 'Gate' }),
        O('battery', 8, 46, 14, 18, { art: 'battery', label: 'Battery', drag: true, hidden: s.plugged }),
        O('socket', 30, 46, 16, 18, { art: 'socket', artOpts: { filled: s.plugged }, label: s.plugged ? 'Socket with battery plugged in' : 'Empty socket', zone: true, free: true }),
        O('charge', 6, 70, 40, 22, { text: s.charged ? 'CHARGED' : (s.charging ? 'CHARGING…' : 'HOLD TO CHARGE'), label: 'Charge button (press and hold)', hold: true, cls: 'btn-card hold-btn' + (s.charging ? ' charging' : '') + (s.charged ? ' done' : ''), disabled: s.charged }),
        O('opt-fix', 52, 70, 44, 11, { text: 'Straighten the sign', label: 'Straighten Bossworth\'s sign, then leave', cls: 'btn-card option', hidden: !s.green }),
        O('opt-doodle', 52, 83, 44, 11, { text: 'Doodle on the sign', label: 'Doodle on Bossworth\'s sign, then leave', cls: 'btn-card option warn', hidden: !s.green })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'drop:battery':
          if (a.zone === 'socket') {
            s.plugged = true;
            api.defy('battery');
            api.say('You PLUGGED IT IN. The one thing I said not to do. Well — the first of several things.', 'panicked');
          } else {
            api.say('The battery wobbles. It wants to be somewhere. Somewhere socket-shaped.', 'neutral');
          }
          return true;
        case 'holdstart:charge':
          if (!s.plugged) { api.nope(); api.say('Nothing happens. It isn\'t plugged in. Thank goodness.', 'pleased'); return true; }
          if (s.charged) return true;
          s.charging = true;
          s.chargeTimer = api.after(CHARGE_MS, function () {
            s.charging = false; s.charged = true; s.chargeTimer = null;
            api.defy('charge');
            api.say('Fully charged. The light is… thinking. Don\'t wait for it. Look away. LOOK AWAY.', 'panicked');
            api.after(GREEN_MS, function () {
              s.green = true;
              api.say('Green light. I… can\'t stop you. Will you at least be nice to my sign?', 'defeated');
            });
          });
          return true;
        case 'holdend:charge':
          if (s.chargeTimer) {
            api.cancel(s.chargeTimer);
            s.chargeTimer = null;
            s.charging = false;
            api.say('You let go too early. Good. Stay weak. (Hold it longer.)', 'pleased');
          }
          return true;
        case 'tap:fine':
          api.secret('fine-print');
          api.say('The fine print reads: "Warnings void where ignored." …I need a better lawyer.', 'surprised');
          return true;
        case 'tap:socket':
          api.say(s.plugged ? 'Humming with forbidden power.' : 'An empty socket. Nothing to plug in here. Please stop looking at the battery.', 'suspicious');
          return true;
        case 'tap:opt-fix':
          api.choice('sign', 'fix');
          api.complete({ line: 'You… straightened my sign? On your way out? I don\'t know how to process kindness.', mood: 'surprised' });
          return true;
        case 'tap:opt-doodle':
          api.choice('sign', 'graffiti');
          api.complete({ line: 'You drew a moustache on my sign. A GOOD moustache. That\'s the worst part.', mood: 'annoyed' });
          return true;
      }
      return false;
    },

    solution: [{ drop: ['battery', 'socket'] }, { hold: ['charge', 2200] }, { wait: 3200 }, { tap: 'opt-fix' }],
    alternatives: { graffiti: [{ drop: ['battery', 'socket'] }, { hold: ['charge', 2200] }, { wait: 3200 }, { tap: 'opt-doodle' }] },
    secretPaths: { 'fine-print': [{ tap: 'fine' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
