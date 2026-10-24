/* Level 77 — The Green Man
 * Bossworth says to cross when the big traffic light goes green. That light is for the CARS.
 * The pedestrian signal (red man / green man) is yours. Lights cycle every 10.5 s, forever.
 * Solution: wait for the green walking man, then cross. Wrong: cross on car-green or amber (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // Half-second ticks: 0–7 cars green, 8–10 amber, 11–18 cars red + green man, 19–20 red-amber.
  var CYCLE = 21;
  function phase(t) {
    var k = t % CYCLE;
    if (k < 8) return 'green';
    if (k < 11) return 'amber';
    if (k < 19) return 'red';
    return 'redamber';
  }
  var CARS = { green: 'GREEN', amber: 'AMBER', red: 'RED', redamber: 'RED + AMBER' };

  OBEY.registerLevel({
    id: 'green-man',
    num: 77,
    title: 'The Green Man',
    objective: 'Cross the road safely.',
    intro: 'Crossing time! Watch the BIG traffic light. The moment it turns green, march straight across. Green means go. That\'s the law. Or a law. It\'s definitely law-shaped.',
    introMood: 'pleased',
    actions: ['wait', 'observe', 'tap'],
    par: 1,
    hints: [
      'There are two sets of lights here. Who is each one talking to?',
      'The big light faces the cars. The little man on your side is your signal.',
      'Wait until the little man turns green (the cars\' light is red), then cross.'
    ],
    wrong: ['Crossing while the cars have a green light gets you honked back to the kerb (trap).', 'Crossing on amber is no better (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Safely across. A pigeon gave you a nod of respect.',
    trick: 'The big green light was for the cars. The little green man was yours.',

    init: function () { return { t: 0, begged: false }; },

    onStart: function (s, api) {
      api.every(500, function () { s.t++; });
    },

    view: function (s) {
      var p = phase(s.t), walk = p === 'red';
      return [
        O('walk', 6, 6, 14, 22, { kind: 'static', art: 'c-walklight', artOpts: { walk: walk }, label: walk ? 'Pedestrian signal: GREEN walking man' : 'Pedestrian signal: RED standing man' }),
        O('plaque', 22, 8, 36, 14, { kind: 'static', text: 'Pedestrians: cross on the GREEN MAN', label: 'Plaque: pedestrians cross on the green man', cls: 'plaque-card' }),
        O('press', 5, 31, 16, 9, { text: s.begged ? 'WAIT' : 'Press', label: 'Crossing request button', cls: 'btn-card', free: true }),
        O('cars', 82, 2, 12, 34, { kind: 'static', art: 'c-trafficlight', artOpts: { phase: p }, label: 'Big traffic light facing the cars: ' + CARS[p] }),
        O('carsign', 58, 28, 22, 8, { kind: 'static', text: 'for cars', label: '', cls: 'tag-card' }),
        O('road', 0, 40, 100, 32, { kind: 'static', art: 'c-road', label: 'A busy road with a crossing' }),
        O('traffic', 26, 50, 48, 10, { kind: 'static', text: p === 'red' ? 'Cars: stopped' : (p === 'green' ? 'Cars: ZOOMING past' : 'Cars: slowing… or not'), label: p === 'red' ? 'The cars have stopped' : 'Cars are driving past', cls: 'panel-card' }),
        O('hero', 10, 76, 10, 15, { kind: 'static', art: 'hero', label: 'You, waiting at the kerb' }),
        O('cross', 56, 82, 38, 12, { text: 'Cross the road', label: 'Cross the road', cls: 'btn-card accent' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'press') {
        s.begged = true;
        api.say('Mash it! Mash it more! Mashing makes it go faster! (It does not. Nothing does. But it feels nice.)', 'laughing');
        return true;
      }
      if (a.target !== 'cross') return false;
      var p = phase(s.t);
      if (p === 'red') {
        api.defy('lights');
        api.complete({ line: 'You crossed on a RED light? …Oh. The red was for the cars. The little man was… for you. Who designed this? Little men?', mood: 'defeated' });
      } else if (p === 'green') {
        api.fail('HOOOONK! The big light was green — for the CARS. A taxi politely reverses you back to the kerb.');
      } else {
        api.fail('Amber! Half a step out and every horn in town plays a chord. Back to the kerb.');
      }
      return true;
    },

    solution: [{ wait: 6000 }, { tap: 'cross' }],
    checks: [
      { name: 'go on car green', steps: [{ tap: 'cross' }], expect: 'fail' },
      { name: 'go on amber', steps: [{ wait: 4500 }, { tap: 'cross' }], expect: 'fail' },
      { name: 'beg button is decoration', steps: [{ tap: 'press' }, { tap: 'press' }], expect: 'playing' },
      { name: 'a long wait still works', steps: [{ wait: 16500 }, { tap: 'cross' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
