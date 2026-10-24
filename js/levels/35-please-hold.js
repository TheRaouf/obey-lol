/* Level 35 — Please Hold
 * The door keypad is frozen. Bossworth says IT never answers and you should jab the keypad. Pressing and
 * HOLDING the desk phone (staying on hold) gets IT, who say: turn it off and on again, switch under the desk.
 * Then power off, power on, open the door. Jabbing the keypad and tapping (hanging up) the phone are nopes.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var HOLD_MS = 2500;
  var MUSIC = ['♪ Your call is important to us ♪', '♪ Doo-doo-dee, please hold-ee ♪', '♪ You are caller number… one. Still. ♪'];

  OBEY.registerLevel({
    id: 'please-hold',
    num: 35,
    title: 'Please Hold',
    objective: 'Get the frozen door keypad working.',
    intro: 'The door keypad froze. Don\'t bother calling IT, nobody ever answers. Just jab the buttons harder. Technology respects confidence.',
    introMood: 'annoyed',
    actions: ['hold', 'tap', 'sequence'],
    par: 4,
    hints: [
      'IT do answer. Eventually. You just have to stay on the line.',
      'Press and HOLD the desk phone until someone picks up, then do what they say.',
      'Hold the phone, then flip the power switch off, then on, then open the door.'
    ],
    wrong: ['Jabbing the frozen keypad does nothing (nope).', 'Tapping the phone hangs up straight away (nope).', 'The door is locked while the keypad is frozen (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Off and on again. The oldest spell in the book.',
    trick: 'Staying on hold got real advice, and turning it off and on again fixed the "unfixable" keypad.',

    init: function () { return { called: false, holding: false, timer: null, power: true, rebooted: false, music: 0 }; },

    view: function (s) {
      var key = !s.power ? '(dark)' : (s.rebooted ? 'READY\n✔' : 'ERROR\nkeypad sad');
      return [
        O('keypad', 64, 6, 30, 20, { text: key, label: 'Door keypad: ' + key.replace('\n', ' '), cls: 'display-card' + (s.rebooted ? ' ready' : '') }),
        O('door', 66, 30, 26, 52, { art: 'door', artOpts: { sign: s.rebooted ? 'OPEN' : 'LOCKED', open: false, keyhole: false }, label: s.rebooted ? 'Door, keypad working' : 'Door, locked (keypad frozen)' }),
        O('desk', 2, 52, 58, 30, { kind: 'static', art: 'a-desk' }),
        O('phone', 8, 30, 30, 22, { art: 'a-deskphone', artOpts: { off: s.holding || s.called }, label: s.called ? 'Desk phone (IT already helped)' : 'Desk phone to IT (press and hold to stay on hold)', hold: true, cls: s.holding ? 'charging' : '' }),
        O('ittag', 4, 6, 40, 10, { kind: 'static', text: 'IT helpdesk: please hold.', label: 'Sticker: IT helpdesk, please hold', cls: 'tag-card' }),
        O('switch', 34, 62, 14, 18, { art: 'switch', artOpts: { letter: s.power ? 'ON' : 'OFF' }, label: 'Keypad power switch under the desk, ' + (s.power ? 'on' : 'off'), hidden: !s.called, cls: 'pop-in' }),
        O('plant', 82, 84, 12, 14, { art: 'plant', label: 'Office plant', free: true })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'holdstart:phone':
          if (s.called) { api.say('IT already told you: off and on again. They won\'t say it twice. They\'ll say it forty times.', 'annoyed'); return true; }
          s.holding = true;
          api.say(MUSIC[s.music++ % MUSIC.length], 'suspicious');
          s.timer = api.after(HOLD_MS, function () {
            s.timer = null; s.holding = false; s.called = true;
            api.defy('it');
            api.say('IT: "Hi! Have you tried turning it off and on again? The switch is under your desk." …They ANSWERED? They never answer ME.', 'surprised');
          });
          return true;
        case 'holdend:phone':
          s.holding = false;
          if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('You hung up during the hold music. Rookie mistake. Or genius. Mostly rookie.', 'pleased'); }
          return true;
        case 'tap:phone':
          if (s.called) { api.say('IT has spoken. Go flip the switch.', 'annoyed'); return true; }
          api.nope('phone');
          api.say('Ring, click, gone. You have to STAY on hold. Press and hold. Not that you should. Jab the keypad!', 'pleased');
          return true;
        case 'tap:switch':
          s.power = !s.power;
          if (!s.power) api.say('You turned it OFF? It was barely working! …It was not working at all, but still.', 'panicked');
          else { s.rebooted = true; api.say('Beep. Boop. READY. That\'s… that\'s not fair. I jabbed it for an hour.', 'annoyed'); }
          return true;
        case 'tap:keypad':
          api.nope('keypad');
          api.say(s.rebooted ? 'It\'s ready. It doesn\'t need jabbing now. Go on, the door.' : (s.power ? 'Jab jab jab. ERROR. Harder! …Still ERROR.' : 'It\'s off. You can\'t jab a thing into working while it\'s off. I\'ve tried.'), 'annoyed');
          return true;
        case 'tap:door':
          if (s.rebooted && s.power) api.complete({ line: 'The door opens. Off, then on. If that\'s all it takes, why do we even HAVE an IT department? …Don\'t answer that, they might hear.', mood: 'defeated' });
          else { api.nope('door'); api.say('Locked. The keypad is ' + (s.power ? 'sulking' : 'off') + '.', 'pleased'); }
          return true;
        case 'tap:plant':
          api.say('The plant has been on hold since 2019. It has made peace with it.', 'neutral');
          return true;
      }
      return false;
    },

    solution: [{ hold: ['phone', 3000] }, { tap: 'switch' }, { tap: 'switch' }, { tap: 'door' }],
    checks: [
      { name: 'jab the keypad', steps: [{ tap: 'keypad' }], expect: 'nope' },
      { name: 'hang up the phone', steps: [{ tap: 'phone' }], expect: 'nope' },
      { name: 'door while frozen', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'let go too early', steps: [{ hold: ['phone', 1000] }], expect: 'playing' },
      { name: 'switched off only', steps: [{ hold: ['phone', 3000] }, { tap: 'switch' }, { tap: 'door' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
