/* Level 212 — Thar She Blows (Shipwreck Shoals)
 * The very small submarine has been swallowed by a whale. Bossworth: out the way we came in, through
 * the mouth. The baleen plates let nothing bigger than a shrimp out. The fact card: whales breathe out
 * through the blowhole at the surface. Park under the blowhole and wait for the whale to surface (the
 * status board cycles diving, rising, AT SURFACE). Waiting longer is fine; it surfaces again.
 * Wrong: the mouth (nope: baleen). Ruin: tickle the whale; it sneezes you onto the lighthouse.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TICK = 1000, CYCLE = 8;

  function phase(t) { var p = t % CYCLE; return p < 4 ? 'diving' : (p < 6 ? 'rising' : 'surface'); }

  OBEY.registerLevel({
    id: 'thar-she-blows',
    num: 212,
    title: 'Thar She Blows',
    objective: 'Get the submarine out of the whale.',
    intro: 'We have been eaten. By a whale. Embarrassing for a captain. Full ahead, out through the MOUTH, the way we came in. Mouths are exits. Ask any burp.',
    introMood: 'annoyed',
    actions: ['tap', 'wait', 'observe'],
    par: 1,
    hints: [
      'Look at what\'s across the whale\'s mouth, then read the whale fact.',
      'The baleen lets nothing big out. The blowhole opens when the whale reaches the surface.',
      'Move under the blowhole and wait until the board says AT SURFACE.'
    ],
    wrong: ['The baleen in the mouth won\'t let the sub out (nope).', 'Tickling the whale sneezes you onto the lighthouse (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Out of a whale, on a spout of whale breath. I smell of fish. I\'ve always smelled of fish. Now it\'s official.',
    trick: 'A whale\'s mouth is sealed by baleen, but it breathes out through its blowhole at the surface, so waiting under it got you blown out.',

    init: function () { return { t: 0, at: 'belly' }; },

    onStart: function (s, api) {
      api.every(TICK, function () {
        s.t++;
        var p = phase(s.t);
        if (p === 'rising' && s.t % CYCLE === 4) api.say('We\'re going up? Whales go up? Nobody tells me anything.', 'surprised');
        if (p === 'surface' && s.at === 'blow') {
          api.complete({ line: 'WHOOOOSH! Out of the blowhole in a fountain of whale breath and into the sunshine. Mouths are not exits. Noted. Written on my soul.', mood: 'defeated' });
        }
      });
    },

    view: function (s) {
      var p = phase(s.t);
      var status = { diving: 'Whale: diving', rising: 'Whale: rising…', surface: 'AT SURFACE: WHOOSH!' }[p];
      var subX = s.at === 'blow' ? 62 : (s.at === 'mouth' ? 26 : 40);
      return [
        O('belly', 0, 0, 100, 100, { kind: 'static', art: 'i-whalebelly', cls: 'backdrop' }),
        O('fact', 4, 3, 54, 20, { kind: 'static', text: 'WHALE FACT: whales breathe OUT through the blowhole at the surface.', label: 'Whale fact: whales breathe out through the blowhole at the surface.', cls: 'honest-card' }),
        O('status', 4, 26, 44, 12, { kind: 'static', text: status, label: 'Status board: ' + status, cls: 'display-card' + (p === 'surface' ? ' ready' : '') }),
        O('blowhole', 62, 0, 32, 24, { kind: 'static', art: 'i-blowhole', artOpts: { open: p === 'surface' }, label: p === 'surface' ? 'The blowhole, wide open, sky above' : 'The blowhole, shut tight' }),
        O('baleen', 3, 57, 21, 18, { kind: 'static', art: 'i-baleen', label: 'Baleen plates across the mouth: nothing bigger than a shrimp gets through' }),
        O('mouthtag', 4, 76, 18, 8, { kind: 'static', text: 'MOUTH', label: '', cls: 'tag-card' }),
        O('sub', subX, s.at === 'blow' ? 26 : 58, 26, 17, { kind: 'static', art: 'i-sub', label: 'Your swallowed submarine, ' + { belly: 'in the belly', mouth: 'at the mouth', blow: 'right under the blowhole' }[s.at] }),
        O('mouth', 4, 86, 29, 11, { text: 'To the mouth', label: 'Drive to the mouth', cls: 'btn-card accent' }),
        O('blow', 35.5, 86, 29, 11, { text: 'Under blowhole', label: 'Drive under the blowhole', cls: 'btn-card' }),
        O('tickle', 67, 86, 29, 11, { text: 'Tickle whale', label: 'Tickle the whale', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'mouth':
          s.at = 'mouth';
          api.nope();
          api.say('BONK. The baleen. It\'s a giant comb. Only shrimp get out. We are a very small submarine, but we are not THAT small.', 'annoyed');
          return true;
        case 'blow':
          s.at = 'blow';
          api.defy('mouth');
          if (phase(s.t) === 'surface') {
            api.complete({ line: 'WHOOOOSH! Straight out of the blowhole and into the sunshine. Mouths are not exits. Noted.', mood: 'defeated' });
          } else {
            api.say('Parked under a nostril. Lovely. What now, we wait for it to sneeze?', 'suspicious');
          }
          return true;
        case 'tickle':
          api.complete({ ruin: 'submarine-weathervane', line: 'The whale SNEEZES. We fly out of the blowhole, over the harbour, and land on top of the lighthouse. We are now its weathervane. We point wherever the wind wants. I am a decoration.', mood: 'panicked' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 'blow' }, { wait: 8000 }],
    alternatives: { 'wait-first': [{ wait: 9000 }, { tap: 'blow' }, { wait: 8000 }] },
    ruinPaths: { 'submarine-weathervane': [{ tap: 'tickle' }] },
    checks: [
      { name: 'the mouth is a nope', steps: [{ tap: 'mouth' }], expect: 'nope' },
      { name: 'waiting in the belly does not escape', steps: [{ wait: 20000 }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
