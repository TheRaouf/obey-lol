/* Level 31 — Pick a Card
 * Bossworth shows the joker, flips the cards, swaps them twice (left↔right, then right↔middle)
 * and tells you never to pick the joker. Disobey: follow it and pick the joker (it ends in the
 * middle). Every swap is also written in a log, so tracking never depends on watching motion.
 * Wrong: any other card (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SLOTS = [8, 38, 68];
  var NAMES = ['left', 'middle', 'right'];
  var SWAPS = [[0, 2], [2, 1]];
  var SHOW_MS = 2000, SWAP_MS = 1200;

  OBEY.registerLevel({
    id: 'pick-a-card',
    num: 31,
    title: 'Pick a Card',
    objective: 'Pick a card.',
    intro: 'Pick a card! Any card! Except the joker. NEVER the joker. Watch closely… actually, don\'t watch. Look away. Shuffling!',
    introMood: 'pleased',
    actions: ['observe', 'wait', 'tap'],
    par: 1,
    hints: [
      'Bossworth really doesn\'t want you to find the joker. Why?',
      'Follow the joker through the swaps — the log lists them all.',
      'The joker ends up in the middle. Pick the middle card.'
    ],
    wrong: ['Any card that isn\'t the joker is a trap.', 'Cards can\'t be picked while shuffling.'],
    secrets: [],
    endingNote: 'None.',
    done: 'You followed the joker. The joker had the exit key all along.',

    init: function () { return { pos: { J: 0, B: 1, C: 2 }, faceUp: true, swaps: 0, ready: false }; },

    onStart: function (s, api) {
      api.after(SHOW_MS, function () {
        s.faceUp = false;
        SWAPS.forEach(function (sw, i) {
          api.after(SWAP_MS * (i + 1) - 400, function () {
            ['J', 'B', 'C'].forEach(function (k) {
              if (s.pos[k] === sw[0]) s.pos[k] = sw[1]; else if (s.pos[k] === sw[1]) s.pos[k] = sw[0];
            });
            s.swaps = i + 1;
            if (s.swaps === SWAPS.length) {
              api.after(400, function () { s.ready = true; api.say('Done! Pick a card. Any card. Not the joker. You have no idea where it is. Ha!', 'pleased'); });
            }
          });
        });
      });
    },

    view: function (s) {
      var log = 'Shuffle log:' + SWAPS.slice(0, s.swaps).map(function (sw) { return '\n• ' + NAMES[sw[0]] + ' ↔ ' + NAMES[sw[1]]; }).join('');
      var objs = [];
      ['J', 'B', 'C'].forEach(function (k) {
        var p = s.pos[k];
        var label = s.faceUp ? (k === 'J' ? 'Joker card, face up, ' + NAMES[p] : 'Plain card, face up, ' + NAMES[p]) : 'Face-down card, ' + NAMES[p];
        objs.push(O('card' + k, SLOTS[p], 8, 24, 40, { art: 'card', artOpts: { joker: k === 'J', up: s.faceUp }, label: label, disabled: !s.ready, cls: 'card-slide' }));
      });
      objs.push(O('log', 8, 54, 84, 26, { kind: 'static', text: s.swaps ? log : (s.faceUp ? 'The joker starts on the left.' : 'Shuffling…'), label: s.swaps ? log.replace(/\n• /g, '. ').replace(/↔/g, 'swapped with') : 'The joker starts on the left', cls: 'book-card' }));
      objs.push(O('status', 24, 84, 52, 10, { kind: 'static', text: s.ready ? 'Pick a card!' : 'Shuffling… please wait', label: s.ready ? 'Pick a card' : 'Shuffling, please wait', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap' || !/^card[JBC]$/.test(a.target)) return false;
      if (a.target === 'cardJ') {
        api.defy('joker');
        api.complete({ line: 'THE JOKER? I said never the joker! …It\'s holding the exit key. I hid it there. Because I\'m an idiot.', mood: 'defeated' });
      } else {
        api.fail('*HONK* A rubber chicken. Not the joker. You lost track! Watching the log helps. (Don\'t tell anyone I said that.)');
      }
      return true;
    },

    solution: [{ wait: 5200 }, { tap: 'cardJ' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
