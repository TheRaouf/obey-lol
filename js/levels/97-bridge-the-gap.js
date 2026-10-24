/* Level 97 — Bridge the Gap
 * A circuit with a gap. Bossworth recommends the rubber duck. Only metal conducts: drop the
 * paperclip in the gap, then flip the switch. The bulb lights and the door opens.
 * Wrong: duck / wooden spoon in the gap (nope, insulators), tea in the gap (trap: fuse blows),
 * switch with an open circuit (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ITEMS = [
    { id: 'duck', art: 'd-duck', name: 'Rubber duck' },
    { id: 'spoon', art: 'd-spoon', name: 'Wooden spoon' },
    { id: 'clip', art: 'd-clip', name: 'Metal paperclip' },
    { id: 'tea', art: 'mug', name: 'Mug of tea' }
  ];

  OBEY.registerLevel({
    id: 'bridge-the-gap',
    num: 97,
    title: 'Bridge the Gap',
    objective: 'Light the bulb to open the door.',
    intro: 'To open the door, close the circuit. Bridge the gap with the rubber duck. Ducks are famously excellent conductors. Of choirs. Same thing.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'classify'],
    par: 2,
    hints: [
      'Electricity only travels through some materials. The chart says which.',
      'Rubber and wood are insulators. You need something metal.',
      'Drag the paperclip into the gap, then flip the switch.'
    ],
    wrong: ['Rubber duck or wooden spoon in the gap: nothing flows (nope).', 'Pouring tea into the circuit blows the fuse (trap).', 'Flipping the switch with a gap does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Bright bulb, open door, unemployed duck.',
    trick: 'Only conductors carry current, and of everything on the bench only the metal paperclip conducts.',

    init: function () { return { bridged: false }; },

    view: function (s) {
      var objs = [
        O('battery', 2, 8, 12, 22, { kind: 'static', art: 'battery', label: 'Battery' }),
        O('wire', 14, 12, 64, 16, { kind: 'static', art: 'd-wire-h', artOpts: { bridge: s.bridged }, label: s.bridged ? 'Wire, bridged by a paperclip' : 'Wire with a gap in the middle' }),
        O('gap', 39, 8, 14, 22, { text: 'GAP', label: 'The gap in the wire (drop something here)', cls: 'tag-card', zone: true, hidden: s.bridged }),
        O('bulb', 80, 4, 14, 24, { kind: 'static', art: 'bulb', label: 'Bulb, off. It is wired to the door lock.' }),
        O('switch', 4, 38, 24, 14, { text: 'Flip switch', label: 'Circuit switch', cls: 'btn-card accent' }),
        O('chart', 32, 36, 38, 26, { kind: 'static', text: 'CONDUCTORS: metals\nINSULATORS: rubber, wood\nLIQUIDS: never near wires!', label: 'Chart: conductors are metals. Insulators are rubber and wood. Liquids must never go near wires.', cls: 'honest-card' }),
        O('door', 74, 34, 22, 40, { art: 'door', artOpts: { sign: 'BULB LOCK', small: true }, label: 'Door that opens when the bulb lights' })
      ];
      ITEMS.forEach(function (it, i) {
        objs.push(O(it.id, 4 + i * 24, 78, 20, 18, { art: it.art, label: it.name, drag: true, hidden: it.id === 'clip' && s.bridged }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap') {
        if (a.target === 'switch') {
          if (s.bridged) {
            api.defy('duck');
            api.complete({ line: 'Click. Ping! The bulb is on and the door is open. The duck is devastated. I\'m devastated FOR the duck.', mood: 'defeated' });
          } else { api.nope(); api.say('Click. Nothing. The electrons got to the gap and just… stood there.', 'pleased'); }
          return true;
        }
        if (a.target === 'door') { api.nope(); api.say('It\'s a bulb lock. No light, no door. Very modern. Very annoying.', 'pleased'); return true; }
        return false;
      }
      if (a.type !== 'drop') return false;
      if (a.zone !== 'gap') { api.say('You put it back on the bench. The gap remains gappy.', 'neutral'); return true; }
      switch (a.target) {
        case 'clip':
          s.bridged = true;
          api.say('A paperclip? Paperclips are for paper! …And, apparently, for electricity. Who knew. (Everyone.)', 'surprised');
          return true;
        case 'duck':
          api.nope(a.target);
          api.say('The duck sits in the gap. It squeaks. No current flows. Clearly it needs encouragement.', 'pleased');
          return true;
        case 'spoon':
          api.nope(a.target);
          api.say('Wood. Lovely for soup. Useless for electrons.', 'neutral');
          return true;
        case 'tea':
          api.fail('You poured tea into the circuit. FZZT-POP. Fuse blown, tea ruined, lab dark. Fuse replaced; start again.');
          return true;
      }
      return false;
    },

    solution: [{ drop: ['clip', 'gap'] }, { tap: 'switch' }],
    checks: [
      { name: 'rubber duck is a nope', steps: [{ drop: ['duck', 'gap'] }], expect: 'nope' },
      { name: 'tea in the circuit is a trap', steps: [{ drop: ['tea', 'gap'] }], expect: 'fail' },
      { name: 'switch with a gap is a nope', steps: [{ tap: 'switch' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
