/* Level 149 — Key Fob (Carpark Capers)
 * "It's the red one." All three cars are red. Press the key fob's unlock button: the car in bay 3
 * flashes its lights (and they stay on). Tap that car.
 * Trying a stranger's car: trap (alarm). Trying every door: trap. Pressing the fob again: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var MINE = 3;

  OBEY.registerLevel({
    id: 'key-fob',
    num: 149,
    title: 'Key Fob',
    objective: 'Find Bossworth\'s car.',
    intro: 'My car? It\'s the red one. Obviously. Just try the doors until one opens. Cars love being tried. That button on the key? Decorative.',
    introMood: 'neutral',
    actions: ['tap', 'observe'],
    par: 2,
    hints: [
      'All three cars are red, so "the red one" won\'t help. What else did Bossworth give you?',
      'The key fob has an unlock button. Cars answer their own key.',
      'Press the fob, see which car flashes its lights, then tap that car.'
    ],
    wrong: ['Opening a stranger\'s car sets off its alarm (trap).', 'Trying every door is a very bad look (trap).', 'Pressing the fob again changes nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Found it. The red one. (Bay 3.)',
    trick: 'All the cars were red, but only one answered the key: pressing unlock made Bossworth\'s car flash its lights.',

    init: function () { return { flash: false }; },

    view: function (s) {
      var out = [
        O('sign', 4, 3, 50, 10, { kind: 'static', text: 'CAR PARK · LEVEL 2', label: 'Sign: car park, level 2', cls: 'sign-card' }),
        O('fobTag', 58, 7, 20, 10, { kind: 'static', text: 'Key fob', label: '', cls: 'tag-card' }),
        O('fob', 80, 5, 14, 19.8, { art: 'f-fob', label: 'Bossworth\'s key fob (press the unlock button)' }),
        O('tryall', 4, 18, 44, 11, { text: 'Try every door', label: 'Try the doors of every red car', cls: 'btn-card accent' }),
        O('pSign', 40, 36, 20, 16, { kind: 'static', text: 'P', label: 'Parking sign', cls: 'sign-card' })
      ];
      for (var i = 1; i <= 3; i++) {
        var lit = s.flash && i === MINE;
        out.push(O('car' + i, 4 + (i - 1) * 31.5, 71, 29, 16.9, { art: 'f-car', artOpts: { lights: lit }, label: 'Red car in bay ' + i + (lit ? ', lights flashing' : '') }));
        out.push(O('bay' + i, 4 + (i - 1) * 31.5, 90, 29, 8, { kind: 'static', text: 'Bay ' + i + (lit ? ' · lights on!' : ''), label: '', cls: 'tag-card' }));
      }
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'fob') {
        if (s.flash) {
          api.nope('fob');
          api.say('Bay 3 is already flashing at you like an excited puppy. Pressing harder won\'t make it bark.', 'annoyed');
        } else {
          s.flash = true;
          api.say('BLEEP-BLEEP. Bay 3 just lit up. That was… a coincidence. Cars blink all the time. Like owls.', 'surprised');
        }
        return true;
      }
      if (a.target === 'tryall') {
        api.fail('You rattle the first door. WEE-OO WEE-OO! A man with a baguette stares at you. Bossworth hides behind a pillar. Start again, less burglar-y.');
        return true;
      }
      var m = /^car(\d)$/.exec(a.target);
      if (!m) return false;
      if (Number(m[1]) === MINE) {
        if (s.flash) api.defy('fob');
        api.complete({ line: s.flash ? 'My car! I knew it was the red one. Bay 3. The flashy one. I let the BUTTON help. Once.' : 'My car! First try! …That was luck. Pure, glorious, red luck.', mood: s.flash ? 'defeated' : 'surprised' });
      } else {
        api.fail('You tug the door of the car in bay ' + m[1] + '. WEE-OO WEE-OO! Not Bossworth\'s. Its owner arrives with a very large bag of carrots. Back to the lift.');
      }
      return true;
    },

    solution: [{ tap: 'fob' }, { tap: 'car3' }],
    checks: [
      { name: 'a stranger\'s red car', steps: [{ tap: 'car1' }], expect: 'fail' },
      { name: 'trying every door', steps: [{ tap: 'tryall' }], expect: 'fail' },
      { name: 'pressing the fob twice', steps: [{ tap: 'fob' }, { tap: 'fob' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
