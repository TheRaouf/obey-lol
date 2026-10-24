/* Level 197 — Flash Count (Lighthouse Lookout)
 * Night. A distant lighthouse flashes in groups, then goes dark, then repeats. The chart says Gull Rock
 * flashes 2, Home Point 3, Shark Reef 4. Bossworth is sure it's Home Point. It flashes 4: Shark Reef.
 * Radio the right name. Wrong names are traps; tapping the lighthouse is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TICK = 450, CYCLE = 20, LIT = [0, 2, 4, 6]; // four flashes, then dark

  OBEY.registerLevel({
    id: 'flash-count',
    num: 197,
    title: 'Flash Count',
    objective: 'Tell the harbour which lighthouse you can see.',
    intro: 'Ah, a lighthouse! That\'s Home Point, I\'d know it anywhere. Radio the harbour and say "Home Point" so they can guide us in.',
    introMood: 'pleased',
    actions: ['wait', 'observe', 'count', 'tap'],
    par: 1,
    hints: [
      'Every lighthouse on the chart flashes a different number of times.',
      'Watch one whole group of flashes before the dark gap, and count.',
      'It flashes four times, then goes dark: that is Shark Reef.'
    ],
    wrong: ['Saying Home Point sends you towards Shark Reef (trap).', 'Saying Gull Rock is just as wrong (trap).', 'The lighthouse is miles away; tapping it does nothing (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Shark Reef. Well spotted. I was squinting at a different lighthouse. In my head.',
    trick: 'Lighthouses are told apart by their flash pattern; counting four flashes before the dark gap matched Shark Reef on the chart.',

    init: function () { return { t: CYCLE - 1 }; },

    onStart: function (s, api) {
      api.every(TICK, function () { s.t = (s.t + 1) % CYCLE; });
    },

    view: function (s) {
      var on = LIT.indexOf(s.t) >= 0;
      return [
        O('sky', 0, 0, 100, 62, { kind: 'static', art: 'i-deep', artOpts: { nobed: true }, cls: 'backdrop' }),
        O('sea', 0, 56, 100, 44, { kind: 'static', art: 'i-sea', artOpts: { nobed: true } }),
        O('chart', 4, 4, 50, 32, { kind: 'static', text: 'CHART · flashes, then dark\nGull Rock: 2\nHome Point: 3\nShark Reef: 4', label: 'Chart of lights. Each flashes a group, then goes dark. Gull Rock flashes 2, Home Point 3, Shark Reef 4.', cls: 'honest-card' }),
        O('rock', 64, 50, 28, 10, { kind: 'static', art: 'i-rock', label: '' }),
        O('light', 70, 8, 16, 50, { art: 'i-lighthouse', artOpts: { lit: on }, label: on ? 'Distant lighthouse: FLASH' : 'Distant lighthouse: dark' }),
        O('sub', 8, 46, 30, 19, { kind: 'static', art: 'i-sub', label: 'Your submarine on the surface' }),
        O('ask', 4, 68, 92, 9, { kind: 'static', text: 'Radio the harbour: which light is that?', label: 'Radio the harbour: which light is that?', cls: 'tag-card' }),
        O('gull', 4, 80, 29, 14, { text: 'Gull Rock', label: 'Radio: Gull Rock', cls: 'btn-card big' }),
        O('home', 35.5, 80, 29, 14, { text: 'Home Point', label: 'Radio: Home Point', cls: 'btn-card big accent' }),
        O('shark', 67, 80, 29, 14, { text: 'Shark Reef', label: 'Radio: Shark Reef', cls: 'btn-card big' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'light':
          api.nope();
          api.say('You can\'t poke a lighthouse from here. It\'s three miles away. I\'ve tried.', 'neutral');
          return true;
        case 'home':
          api.fail('"Home Point!" The harbour guides you in… past four flashes… onto Shark Reef. A shark tuts at you. Count the flashes!');
          return true;
        case 'gull':
          api.fail('"Gull Rock!" The harbour sends you left. Gull Rock is behind you. You are now reversing into a seagull colony.');
          return true;
        case 'shark':
          api.defy('home-point');
          api.complete({ line: '"Shark Reef!" The harbour steers us round it and home. Four flashes. I counted three. One was a blink. Mine.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ wait: 9500 }, { tap: 'shark' }],
    checks: [
      { name: 'Home Point is a trap', steps: [{ tap: 'home' }], expect: 'fail' },
      { name: 'Gull Rock is a trap', steps: [{ wait: 3000 }, { tap: 'gull' }], expect: 'fail' },
      { name: 'tapping the lighthouse is a nope', steps: [{ tap: 'light' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
