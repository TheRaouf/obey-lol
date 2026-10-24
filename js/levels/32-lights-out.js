/* Level 32 — Lights Out
 * Five bulbs; pressing one toggles it and its neighbours. Bossworth demands all lights ON, but the
 * door sign says the exit only opens in the dark. Start: on on off on on. Solution: press bulb 1
 * (→ off off off on on) then bulb 5 (→ all off). Turning every light on is a trap.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var START = [1, 1, 0, 1, 1];

  OBEY.registerLevel({
    id: 'lights-out',
    num: 32,
    title: 'Lights Out',
    objective: 'Open the exit.',
    intro: 'Turn ALL the lights ON. All of them. Brightness is happiness. Don\'t read the sign on the door.',
    introMood: 'suspicious',
    actions: ['tap', 'logic', 'read'],
    par: 2,
    hints: [
      'Read the sign on the door.',
      'Each bulb flips itself and its neighbours. You want them all OFF.',
      'Press bulb 1, then bulb 5.'
    ],
    wrong: ['Turning every bulb on is a trap (sunglasses meltdown).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Darkness achieved. Bossworth is afraid of the dark (he says he isn\'t).',

    init: function () { return { b: START.slice() }; },

    view: function (s) {
      var objs = [
        O('sign', 6, 4, 56, 14, { kind: 'static', text: 'EXIT opens when the room is DARK.', label: 'Door sign: the exit opens when the room is dark', cls: 'plaque-card' }),
        O('door', 70, 2, 24, 40, { kind: 'static', art: 'door', artOpts: { sign: 'EXIT' }, label: 'Exit door' }),
        O('rule', 6, 22, 56, 14, { kind: 'static', text: 'Each bulb flips itself and its neighbours.', label: 'Rule: each bulb flips itself and its neighbours', cls: 'tag-card' })
      ];
      s.b.forEach(function (on, i) {
        objs.push(O('b' + (i + 1), 4 + i * 19, 52, 16, 30, { art: 'bulb', artOpts: { on: !!on }, label: 'Bulb ' + (i + 1) + ' (' + (on ? 'on' : 'off') + ')' }));
      });
      objs.push(O('count', 30, 86, 40, 9, { kind: 'static', text: s.b.filter(Boolean).length + ' of 5 bulbs on', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      var m = a.type === 'tap' && /^b([1-5])$/.exec(a.target);
      if (!m) return false;
      var i = Number(m[1]) - 1;
      [i - 1, i, i + 1].forEach(function (j) { if (j >= 0 && j < 5) s.b[j] = s.b[j] ? 0 : 1; });
      var on = s.b.filter(Boolean).length;
      if (on === 0) {
        api.defy('dark');
        api.complete({ line: 'It\'s DARK. Who turned off— you. You did. The door opened. I\'m not scared. I\'m… lounging.', mood: 'panicked' });
      } else if (on === 5) {
        api.fail('ALL LIGHTS ON! So bright! My sunglasses MELTED! …The door stays shut. It wanted darkness. Starting over.');
      } else {
        api.say(on > 2 ? 'More light! More!' : 'Hey, it\'s getting dim in here. I don\'t like dim.', on > 2 ? 'pleased' : 'suspicious');
      }
      return true;
    },

    solution: [{ tap: 'b1' }, { tap: 'b5' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
