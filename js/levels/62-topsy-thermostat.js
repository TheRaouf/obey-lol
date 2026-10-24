/* Level 62 — Topsy Thermostat
 * Bossworth installed the thermostat upside down. Its screen "says 81" (really 18, upside down) and its
 * arrows are flipped: the button at the top that looks like ▲ actually turns the heat DOWN.
 * Tells: THIS WAY UP is printed upside down, and the wall thermometer reads 18°.
 * Solve: press the bottom button (really UP) three times — or tap the thermostat to turn it the right way
 * up, then press ▲ three times. Wrong: obeying (top button) freezes the pipes at 15° (trap); flipping is fine.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var GOAL = 21, FREEZE = 15, SAUNA = 27;

  OBEY.registerLevel({
    id: 'topsy-thermostat',
    num: 62,
    title: 'Topsy Thermostat',
    objective: 'Warm the house to a comfy 21°.',
    intro: 'It says 81 degrees in here! A SAUNA! Press the top arrow to cool it down until it says 21. I installed that thermostat myself. Perfectly. Screens don\'t lie.',
    introMood: 'panicked',
    actions: ['tap', 'read', 'observe'],
    par: 3,
    hints: [
      'Read the small print on the thermostat. Which way up is it?',
      'It\'s upside down: the screen really says 18, and the top button really turns the heat down. Check the wall thermometer.',
      'Press the bottom button three times (or tap the thermostat to turn it the right way up, then press ▲ three times).'
    ],
    wrong: ['The top button turns the heat DOWN; reaching 15° freezes the pipes (trap).', 'Overheating to 27° turns the hall into a sauna (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'A toasty 21°. The thermostat is still upside down. So is Bossworth\'s confidence.',
    trick: 'The thermostat was mounted upside down: "81" was 18 and the arrows were swapped, so you read it the right way up.',

    init: function () { return { t: 18, flipped: true }; },

    view: function (s) {
      return [
        O('goal', 4, 8, 24, 18, { kind: 'static', text: 'Comfy = 21°', label: 'Note: comfy is 21 degrees', cls: 'sign-card' }),
        O('top', 38, 4, 24, 13, { text: '▲', label: s.flipped ? 'Button at the top, showing ▲' : 'Up button ▲ (warmer)', cls: 'btn-card big' }),
        O('stat', 30, 20, 40, 40, { art: 'b-thermostat', artOpts: { temp: s.t, flipped: s.flipped }, label: s.flipped ? 'Thermostat, mounted upside down: its screen reads ' + String(s.t).split('').reverse().join('') + ' when viewed as it hangs, and "THIS WAY UP" is upside down. Tap to turn it the right way up.' : 'Thermostat, the right way up, showing ' + s.t + '°. Tap to flip it.' }),
        O('bottom', 38, 63, 24, 13, { text: '▼', label: s.flipped ? 'Button at the bottom, showing ▼' : 'Down button ▼ (cooler)', cls: 'btn-card big' }),
        O('therm', 78, 8, 18, 56, { kind: 'static', art: 'b-thermometer', artOpts: { temp: s.t }, label: 'Wall thermometer reading ' + s.t + ' degrees' }),
        O('thermtag', 74, 66, 24, 10, { kind: 'static', text: 'Wall: ' + s.t + '°', label: '', cls: 'tag-card' }),
        O('fitter', 4, 82, 92, 12, { kind: 'static', text: 'Thermostat fitted by: B. Bossworth (expert, allegedly)', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var d = 0;
      if (a.target === 'stat') {
        s.flipped = !s.flipped;
        if (!s.flipped) { api.defy('flip'); api.say('You turned my thermostat the right way up? It was ARTISTIC. Fine. Now it says 18. Which is… what the thermometer says. Hm.', 'annoyed'); }
        else api.say('Back upside down. Thank you. That\'s how the professionals have it. Me. I\'m the professionals.', 'pleased');
        return true;
      }
      if (a.target === 'top') d = s.flipped ? -1 : 1;
      else if (a.target === 'bottom') d = s.flipped ? 1 : -1;
      else return false;
      s.t += d;
      if (s.t <= FREEZE) { api.fail('Brrr. 15 degrees. The pipes freeze, the goldfish is now a fish-cube and Bossworth\'s moustache has frost on it. Thawing out…'); return true; }
      if (s.t >= SAUNA) { api.fail('27 degrees! Now it really IS a sauna. Bossworth is wearing a towel and refuses to discuss it. Resetting…'); return true; }
      if (s.t === GOAL) {
        api.complete({ line: s.flipped ? 'It says "12"? And it\'s… warm? Cosy? You read my thermostat UPSIDE DOWN better than I read it the right way up.' : 'Twenty-one degrees, the right way up. The house sighs happily. I\'m sulking, but warmly.', mood: 'defeated' });
        return true;
      }
      if (d < 0) api.say(s.flipped ? 'See? It says ' + String(s.t).split('').reverse().join('') + ' now. Going down! Keep pressing!' : 'Cooler. Wait, why are you making it cooler? It was already cold. I mean… hot.', 'pleased');
      else api.say(s.flipped ? 'The screen says ' + String(s.t).split('').reverse().join('') + '?! You\'re ROASTING us! …Why do I feel cosier?' : 'Warmer. Fine. Whatever. It\'s your sauna.', 'suspicious');
      return true;
    },

    solution: [{ tap: 'bottom' }, { tap: 'bottom' }, { tap: 'bottom' }],
    alternatives: { flip: [{ tap: 'stat' }, { tap: 'top' }, { tap: 'top' }, { tap: 'top' }] },
    checks: [
      { name: 'obey: top arrow until frozen', steps: [{ tap: 'top' }, { tap: 'top' }, { tap: 'top' }], expect: 'fail' },
      { name: 'one press the wrong way', steps: [{ tap: 'top' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
