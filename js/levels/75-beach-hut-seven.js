/* Level 75 — Beach Hut Seven
 * Nine huts; most numbers have faded. The two that remain (1 on the far right, 8 second from the left)
 * show the huts are numbered from the RIGHT. Bossworth insists on counting from the left.
 * Solution: tap the third hut from the left (number 7). Wrong: Bossworth's hut (trap), any other hut (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var N = 9;
  var SHOWN = { 1: true, 8: true };
  var GAGS = {
    9: 'Hut 9: a man in a stripy swimsuit, eating a pickled egg. He does not look up.',
    8: 'Hut 8: four deckchairs, folded into a shape no human can undo.',
    6: 'Hut 6: a family of six and one very damp dog. Wrong hut, says the dog.',
    5: 'Hut 5: buckets. Only buckets. Floor to ceiling. Somebody has a problem.',
    4: 'Hut 4: a retired lifeguard doing the crossword. "Seven down is not here," he says.',
    2: 'Hut 2: just sand. Someone has been storing sand. At the beach.',
    1: 'Hut 1: an inflatable crocodile, fully inflated, staring at you.'
  };

  function hutNum(i) { return N - i; } // numbered from the right

  OBEY.registerLevel({
    id: 'beach-hut-seven',
    num: 75,
    title: 'Beach Hut Seven',
    objective: 'Find beach hut number 7 and open it.',
    intro: 'Your hut is number SEVEN! The numbers faded in a storm, but huts are always counted from the LEFT. Everybody knows that. Count seven from the left and in you pop.',
    introMood: 'pleased',
    actions: ['tap', 'count'],
    par: 1,
    hints: [
      'A couple of huts still have their numbers. Check which end number 1 is at.',
      'Hut 1 is on the far RIGHT, so the numbers count from the right.',
      'Count seven huts from the right: it is the third hut from the left.'
    ],
    wrong: ['Hut "seven from the left" is hut 3, full of inflatable flamingos (trap).', 'Any other wrong hut just has strangers in it (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Hut 7: one deckchair, one windbreak, zero strangers.',
    trick: 'The surviving numbers showed hut 1 on the right, so seven was counted from the right.',

    init: function () { return { open: null }; },

    view: function (s) {
      var objs = [
        O('sea', 0, 22, 100, 20, { kind: 'static', art: 'c-sea' }),
        O('sand', 0, 42, 100, 58, { kind: 'static', art: 'c-sand' }),
        O('key', 4, 4, 40, 12, { kind: 'static', text: 'Your key tag: HUT 7', label: 'Key tag: hut 7', cls: 'ticket-card' }),
        O('council', 50, 4, 46, 12, { kind: 'static', text: 'Beach huts: numbers repainted soon (ish)', label: 'Council sign: numbers will be repainted soon', cls: 'tag-card' })
      ];
      for (var i = 0; i < N; i++) {
        var n = hutNum(i), shown = SHOWN[n];
        objs.push(O('hut' + (i + 1), 2 + i * 10.8, 24, 10.4, 30, {
          art: 'c-beachhut', artOpts: { color: i, num: shown ? String(n) : '', open: s.open === i },
          label: 'Beach hut, ' + ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'][i] + ' from the left' + (shown ? ', number ' + n + ' painted on it' : ', number faded')
        }));
      }
      objs.push(O('arrow', 20, 78, 60, 10, { kind: 'static', text: s.open === null ? 'Tap a hut to try your key' : 'Tried: hut ' + (s.open + 1) + ' from the left', label: '', cls: 'tag-card' }));
      return objs;
    },

    on: function (a, s, api) {
      var m = a.type === 'tap' && /^hut(\d)$/.exec(a.target);
      if (!m) return false;
      var i = Number(m[1]) - 1, n = hutNum(i);
      s.open = i;
      if (n === 7) {
        api.defy('count');
        api.complete({ line: 'The key turns! You counted from the RIGHT. Who counts from the right? The council, apparently. I\'m writing to the council.', mood: 'defeated' });
      } else if (n === 3) {
        api.fail('Seven from the left! The door opens and forty inflatable flamingos burst out. Hut 3. It was hut 3. Back to the promenade.');
      } else {
        api.nope(a.target);
        api.say(GAGS[n] + ' Your key doesn\'t fit.', 'suspicious');
      }
      return true;
    },

    solution: [{ tap: 'hut3' }],
    checks: [
      { name: 'seven from the left', steps: [{ tap: 'hut7' }], expect: 'fail' },
      { name: 'random hut', steps: [{ tap: 'hut1' }], expect: 'nope' },
      { name: 'hut one', steps: [{ tap: 'hut9' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
