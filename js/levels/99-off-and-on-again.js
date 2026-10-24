/* Level 99 — Off and On Again
 * The door-control computer is frozen. Bossworth says to click the frozen window harder.
 * Fix: press and HOLD the power button to force it off, tap power to boot, wait, tap Open Door.
 * Wrong: tapping the frozen window (nope; 6 times = ruin "screen-smasher"), Esc (nope),
 * a quick tap on power while frozen (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var HOLD_MS = 1800, BOOT_MS = 1500, SMASH = 6;
  var STATUS = { frozen: 'Door Control: (Not Responding)', off: 'Screen: off', boot: 'Booting… please wait', desktop: 'Desktop ready' };

  OBEY.registerLevel({
    id: 'off-and-on-again',
    num: 99,
    title: 'Off and On Again',
    objective: 'Unfreeze the computer and open the door.',
    intro: 'The door computer is frozen. Classic. Just click the frozen window harder. And faster. Computers respect aggression. Do NOT touch the power button.',
    introMood: 'annoyed',
    actions: ['hold', 'tap', 'wait'],
    par: 3,
    hints: [
      'The sticky note on the desk has the oldest IT advice in the world.',
      'A frozen computer ignores a quick tap on power. Press and hold it to force it off.',
      'Hold the power button for two seconds, tap it again, wait for the desktop, then tap Open Door.'
    ],
    wrong: ['Clicking the frozen window does nothing (nope); six clicks is a ruin.', 'Esc does not escape anything (nope).', 'A quick tap on power is ignored while frozen (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Turned off, turned on, turned out to be right.',
    trick: 'A frozen computer needs a forced restart: hold power to switch it off, then press it again to boot.',

    init: function () { return { mode: 'frozen', smashes: 0, holding: false }; },

    view: function (s) {
      return [
        O('window', 16, 4, 68, 54, { art: 'd-monitor', artOpts: { mode: s.mode }, label: s.mode === 'frozen' ? 'Monitor with a frozen Door Control window' : 'Monitor: ' + STATUS[s.mode], kind: s.mode === 'frozen' ? undefined : 'static' }),
        O('app', 34, 18, 32, 12, { text: 'Open Door', label: 'Open Door app on the desktop', cls: 'btn-card big', hidden: s.mode !== 'desktop' }),
        O('status', 10, 60, 80, 9, { kind: 'static', text: STATUS[s.mode], label: 'Status: ' + STATUS[s.mode], cls: 'tag-card' }),
        O('power', 6, 74, 20, 20, { art: 'd-power', artOpts: { on: s.mode !== 'off' }, label: 'Power button (press, or press and hold)', hold: true, cls: s.holding ? 'charging' : '' }),
        O('esc', 32, 78, 16, 14, { text: 'Esc', label: 'Escape key', cls: 'btn-card key' }),
        O('note', 56, 72, 40, 24, { kind: 'static', text: 'IT: "Have you tried turning it off and on again?"', label: 'Sticky note from IT: have you tried turning it off and on again?', cls: 'ticket-card' })
      ];
    },

    on: function (a, s, api) {
      switch (a.type + ':' + a.target) {
        case 'tap:window':
          if (s.mode !== 'frozen') return false;
          s.smashes++;
          if (s.smashes >= SMASH) {
            api.complete({ ruin: 'screen-smasher', line: 'You clicked it so hard the window fell off the SCREEN. The door opened out of sheer embarrassment. That is NOT how computers work. Apparently it is now.', mood: 'panicked' });
            return true;
          }
          api.nope();
          api.say(['Harder! It\'s working! (It isn\'t.)', 'Faster! I believe in you! (Why?)', 'The window has gone slightly more grey. Progress?', 'You\'re clicking it like it owes you money.', 'Careful… the screen is making a noise.'][s.smashes - 1], 'pleased');
          return true;
        case 'tap:esc':
          api.nope();
          api.say('Escape does nothing. Ironic, really.', 'pleased');
          return true;
        case 'holdstart:power':
          if (s.mode !== 'frozen') return true;
          s.holding = true;
          api.say('Hands OFF the power button! It\'s… it\'s doing something!', 'panicked');
          return true;
        case 'holdend:power':
          s.holding = false;
          if (s.mode === 'frozen') {
            if (a.ms >= HOLD_MS) {
              s.mode = 'off';
              api.defy('power');
              api.say('It\'s OFF. You killed it. Murderer. …Well, don\'t just stand there. Turn it back on.', 'surprised');
            } else api.say('A quick tap on a frozen computer is like whispering to a glacier.', 'pleased');
            return true;
          }
          if (s.mode === 'off') return boot(s, api);
          return true;
        case 'tap:power':
          if (s.mode === 'frozen') { api.nope(); api.say('Tap. Nothing. Frozen computers ignore polite requests.', 'pleased'); return true; }
          if (s.mode === 'off') return boot(s, api);
          api.say(s.mode === 'boot' ? 'It\'s booting. Patience. It\'s a computer, not a toaster.' : 'Leave it ON now, please. I\'ve had enough excitement.', 'neutral');
          return true;
        case 'tap:app':
          if (s.mode !== 'desktop') return false;
          api.complete({ line: 'Click. Door open. Off and on again. The oldest trick in the book, and I wrote the book. I just didn\'t READ it.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ hold: ['power', 2000] }, { tap: 'power' }, { wait: 1600 }, { tap: 'app' }],
    ruinPaths: { 'screen-smasher': [{ tap: 'window' }, { tap: 'window' }, { tap: 'window' }, { tap: 'window' }, { tap: 'window' }, { tap: 'window' }] },
    checks: [
      { name: 'clicking the frozen window is a nope', steps: [{ tap: 'window' }], expect: 'nope' },
      { name: 'Esc is a nope', steps: [{ tap: 'esc' }], expect: 'nope' },
      { name: 'quick power tap is a nope', steps: [{ tap: 'power' }], expect: 'nope' },
      { name: 'short hold leaves it frozen', steps: [{ hold: ['power', 600] }], expect: 'playing' }
    ],
    secretPaths: {}
  });

  function boot(s, api) {
    s.mode = 'boot';
    api.say('It\'s booting. Look at the little dots. They\'re trying their best.', 'neutral');
    api.after(BOOT_MS, function () {
      s.mode = 'desktop';
      api.say('The desktop is back. And everything works. I hate it when that happens.', 'annoyed');
    });
    return true;
  }
})(typeof window !== 'undefined' ? window : globalThis);
