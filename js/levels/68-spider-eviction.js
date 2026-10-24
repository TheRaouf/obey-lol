/* Level 68 — Spider Eviction
 * A spider in the bath. Bossworth wants something dramatic: blast it down the plughole with the taps.
 * The owners' house rule: "We don't squash. We relocate." The tools are on the shelf: a glass and a
 * postcard. Glass over the spider, card under the glass, then carry it to the open window.
 * Wrong: running the taps (trap: it climbs out and up Bossworth); swatting it (nope: too fast);
 * card before glass (nope); offering the spider to Bossworth (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'spider-eviction',
    num: 68,
    title: 'Spider Eviction',
    objective: 'Get the spider out of the bath.',
    intro: 'A SPIDER! In the BATH! Turn the taps on full and wash it down the plughole! Or squash it! Do something DRAMATIC! I\'ll be over here. Standing on a chair. Inside my own head.',
    introMood: 'panicked',
    actions: ['drag', 'sequence', 'choice'],
    par: 3,
    hints: [
      'Read the owners\' house rule. What could you carry a spider in?',
      'A glass can go over the spider, and the postcard can slide underneath to make a lid.',
      'Drag the glass onto the spider, then the postcard onto the glass, then carry it to the open window.'
    ],
    wrong: ['Running the taps is a trap (the spider climbs out, onto Bossworth).', 'Swatting at it misses (nope).', 'The postcard alone doesn\'t trap anything (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One spider relocated to the garden, alive and mildly offended.',
    trick: 'Glass, then card, then window: you relocated the spider instead of doing anything "dramatic".',
    narratorZone: true,

    init: function () { return { glass: false, card: false }; },

    view: function (s) {
      var trapped = s.glass && s.card;
      return [
        O('rule', 4, 3, 60, 14, { kind: 'static', text: 'House rule: we don\'t squash. We relocate.', label: 'House rule: we don\'t squash, we relocate', cls: 'honest-card' }),
        O('tub', 7, 51.5, 56, 30, { kind: 'static', art: 'b-bathtub', artOpts: { level: 0, plug: false }, label: 'Bathtub' }),
        // 2.4.1: taps after the tub, so the tightened bath drawing never hides them.
        O('taps', 6, 41.5, 16, 11, { art: 'b-taps', artOpts: { on: false }, label: 'Bath taps (tap to run them full blast)' }),
        O('spider', 24, 54, 22, 20, { art: 'b-spider', artOpts: { glass: s.glass, card: s.card }, zone: !trapped, drag: trapped,
          label: trapped ? 'Spider safely trapped under a glass with a postcard lid (drag it)' : (s.glass ? 'Spider under an upside-down glass' : 'Large spider in the bath') }),
        O('shelf', 68, 26, 28, 4, { kind: 'static', art: 'shelf', label: '' }),
        O('glass', 70, 6, 12, 20, { art: 'b-dish', artOpts: { kind: 'glass', grime: 0 }, drag: true, hidden: s.glass, label: 'Empty glass (drag it)' }),
        O('card', 82, 10, 14, 14, { art: 'b-postcard', drag: true, hidden: s.card, label: 'Stiff postcard (drag it)' }),
        O('window', 68, 46, 28, 32, { art: 'b-window', artOpts: { open: true }, zone: true, free: true, label: 'Open window to the garden' }),
        O('garden', 68, 80, 28, 9, { kind: 'static', text: 'garden →', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        if (a.zone === 'narrator') { api.nope(); api.say('DO NOT GIVE ME THE SPIDER. I will narrate from the ceiling. I live there now.', 'panicked'); return true; }
        if (a.target === 'glass' && a.zone === 'spider') { s.glass = true; api.say('You… covered it? With a glass? It\'s in a little room now. A spider room. Is that allowed?', 'surprised'); return true; }
        if (a.target === 'card' && a.zone === 'spider') {
          if (!s.glass) { api.nope(); api.say('The spider strolls across the postcard, reads it, and walks off. It found that very relaxing.', 'annoyed'); return true; }
          s.card = true;
          api.say('Card under the glass. A spider in a box. A spider TO GO. Now take it far, far away.', 'neutral');
          return true;
        }
        if (a.target === 'spider') {
          if (a.zone === 'window') {
            api.defy('dramatic');
            api.complete({ line: 'Out the window, into the garden, unharmed. That was the LEAST dramatic option. I\'m strangely calm. Is this what calm feels like?', mood: 'defeated' });
          }
          return true;
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'taps') {
        api.fail('WHOOSH! The spider surfs the wave, climbs out, scuttles up the wall and lands on Bossworth\'s head. He has left his body. Calmly, start again.');
        return true;
      }
      if (a.target === 'spider') {
        api.nope();
        api.say(s.glass ? 'Tap tap on the glass. The spider taps back. Rude. Get it a lid.' : 'You swat — it\'s not there. It\'s two inches to the left, looking at you. All eight eyes. Judging.', 'panicked');
        return true;
      }
      if (a.target === 'window') { api.say('The window is open. Fresh air. Escape routes. For ME, ideally.', 'neutral'); return true; }
      return false;
    },

    solution: [{ drop: ['glass', 'spider'] }, { drop: ['card', 'spider'] }, { drop: ['spider', 'window'] }],
    checks: [
      { name: 'run the taps', steps: [{ tap: 'taps' }], expect: 'fail' },
      { name: 'swat it', steps: [{ tap: 'spider' }], expect: 'nope' },
      { name: 'card first', steps: [{ drop: ['card', 'spider'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
