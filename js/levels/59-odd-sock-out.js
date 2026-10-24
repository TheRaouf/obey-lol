/* Level 59 — Odd Sock Out
 * Seven socks: three identical pairs and one loner. Bossworth says the loner is "obviously" a polka-dot
 * sock — but there are two matching polka-dot socks. The real loner is the blue sock with THREE stripes
 * (the other blues have two; the other three-stripers are green). Drag it into the odd-socks box.
 * Wrong: boxing a sock that has a twin (trap); handing a sock to Bossworth (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SOCKS = [
    { id: 's1', color: 'blue', stripes: 2 }, { id: 's2', color: 'green', stripes: 3 }, { id: 's3', color: 'yellow', dots: true },
    { id: 's4', color: 'blue', stripes: 3 }, { id: 's5', color: 'yellow', dots: true }, { id: 's6', color: 'green', stripes: 3 },
    { id: 's7', color: 'blue', stripes: 2 }
  ];
  var POS = [[4, 22], [28, 22], [52, 22], [76, 22], [16, 48], [40, 48], [64, 48]];
  function desc(k) { return k.color + ' sock, ' + (k.dots ? 'polka dots' : k.stripes + ' white stripes'); }

  OBEY.registerLevel({
    id: 'odd-sock-out',
    num: 59,
    title: 'Odd Sock Out',
    objective: 'Put the one sock without a twin into the odd-socks box.',
    intro: 'Seven socks, three pairs, one loner. The loner is OBVIOUSLY a polka-dot one. Polka dots never have friends. Into the box with it! Chop chop!',
    introMood: 'pleased',
    actions: ['drag', 'observe', 'count'],
    par: 1,
    hints: [
      'Match every sock to its twin by colour AND pattern. Count the stripes.',
      'The two polka-dot socks are a pair. Look hard at the blue socks.',
      'The blue sock with three stripes has no twin. Drag it into the box.'
    ],
    wrong: ['Boxing a sock that has a twin leaves its partner lonely (trap).', 'Handing Bossworth a sock is refused (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three happy pairs and one sock with a bright future in puppetry.',
    trick: 'Both polka-dot socks matched; counting stripes showed the lone blue three-striper.',
    narratorZone: true,

    init: function () { return { boxed: null }; },

    view: function (s) {
      var objs = [
        O('rule', 4, 3, 92, 14, { kind: 'static', text: 'Every sock here has an identical twin (same colour, same pattern) — except one.', label: 'Sign: every sock has an identical twin except one', cls: 'honest-card' })
      ];
      SOCKS.forEach(function (k, i) {
        objs.push(O(k.id, POS[i][0], POS[i][1], 20, 22, { art: 'b-sock', artOpts: { color: k.color, stripes: k.stripes, dots: k.dots }, drag: true, hidden: s.boxed === k.id, label: 'A ' + desc(k) + ' (drag it)' }));
      });
      objs.push(O('box', 34, 74, 32, 24, { art: 'basket', zone: true, free: true, label: 'The odd-socks box' }));
      objs.push(O('boxtag', 70, 80, 26, 10, { kind: 'static', text: 'ODD SOCKS', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'box') { api.say('The odd-socks box. Where socks go to think about what they\'ve done.', 'neutral'); return true; }
      if (a.type !== 'drop') return false;
      var k = SOCKS.filter(function (x) { return x.id === a.target; })[0];
      if (!k) return false;
      if (a.zone === 'narrator') { api.nope(); api.say('Do NOT hand me socks. I am a narrator, not a drawer.', 'annoyed'); return true; }
      if (a.zone !== 'box') return true;
      if (k.id === 's4') {
        s.boxed = 's4';
        api.defy('dots');
        api.complete({ line: 'The blue three-striper? But the polka dots… there were TWO polka dots. They had each other all along. I need a moment.', mood: 'defeated' });
      } else {
        api.fail('Into the box goes a ' + desc(k) + '… and somewhere its identical twin starts sobbing. Socks back on the line. Count again!');
      }
      return true;
    },

    solution: [{ drop: ['s4', 'box'] }],
    checks: [
      { name: 'box a polka-dot sock', steps: [{ drop: ['s3', 'box'] }], expect: 'fail' },
      { name: 'box a green sock', steps: [{ drop: ['s6', 'box'] }], expect: 'fail' },
      { name: 'give Bossworth a sock', steps: [{ drop: ['s1', 'narrator'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
