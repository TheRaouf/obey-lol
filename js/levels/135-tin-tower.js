/* Level 135 — Tin Tower (Aisle Antics)
 * A pyramid of six tins: the one SOUP is bottom-left, under the bean pyramid. A tin can only be
 * taken when nothing rests on it: top, then middle-left, then the soup.
 * Taking a supporting bean tin: trap (topple). Ruin: yank the soup straight out ("tablecloth trick").
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // id: [x, y, word, rests on]
  var TINS = {
    b1: [29, 63.4, 'SOUP', []], b2: [43, 63.4, 'BEANS', []], b3: [57, 63.4, 'BEANS', []],
    m1: [36, 47.1, 'BEANS', ['b1', 'b2']], m2: [50, 47.1, 'BEANS', ['b2', 'b3']],
    t: [43, 30.8, 'BEANS', ['m1', 'm2']]
  };
  var NAME = { b1: 'bottom row, left', b2: 'bottom row, middle', b3: 'bottom row, right', m1: 'middle row, left', m2: 'middle row, right', t: 'top' };
  function supports(s, id) { return Object.keys(TINS).filter(function (k) { return s.tins[k] && TINS[k][3].indexOf(id) >= 0; }); }

  OBEY.registerLevel({
    id: 'tin-tower',
    num: 135,
    title: 'Tin Tower',
    objective: 'Get the tin of soup without toppling the display.',
    intro: 'Soup! Bottom corner. Just whip it out really fast, like the tablecloth trick. The beans won\'t even notice. Beans are famously calm.',
    introMood: 'pleased',
    actions: ['tap', 'logic', 'sequence'],
    par: 3,
    hints: [
      'A tin with other tins resting on it is holding them up.',
      'Only take a tin when nothing is sitting on it. Start at the top.',
      'Take the top tin, then the middle-left tin, then the soup.'
    ],
    wrong: ['Pulling out a bean tin that holds others up topples them (trap).', 'Yanking the soup out from under the pile buries everything in beans (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One soup, zero avalanches.',
    trick: 'A tin holding others up can\'t be pulled out safely, so you unstacked from the top until nothing rested on the soup.',

    init: function () { return { tins: { b1: true, b2: true, b3: true, m1: true, m2: true, t: true }, taken: 0 }; },

    view: function (s) {
      var out = [
        O('offer', 4, 4, 56, 10, { kind: 'static', text: 'BEANS: 3 for 2!', label: 'Sign: beans, three for the price of two', cls: 'sign-card' }),
        O('aside', 64, 4, 32, 10, { kind: 'static', text: 'Taken: ' + s.taken, label: 'Tins taken off the display: ' + s.taken, cls: 'tag-card' }),
        O('pallet', 18, 78, 64, 12.8, { kind: 'static', art: 'f-pallet', label: '' })
      ];
      Object.keys(TINS).forEach(function (k) {
        var t = TINS[k], on = supports(s, k);
        out.push(O(k, t[0], t[1], 14, 16.3, {
          art: 'f-tin', artOpts: { word: t[2], color: t[2] === 'SOUP' ? '#2bc46f' : '#e5243b' },
          label: 'Tin of ' + t[2].toLowerCase() + ', ' + NAME[k] + (on.length ? ', with ' + on.length + ' tin' + (on.length > 1 ? 's' : '') + ' resting on it' : ', nothing resting on it'),
          hidden: !s.tins[k]
        }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap' || !TINS[a.target] || !s.tins[a.target]) return false;
      var k = a.target, on = supports(s, k);
      if (on.length) {
        if (k === 'b1') {
          api.complete({ ruin: 'bean-avalanche', line: 'WHOOSH— CLANG CLANG CLANG. The tablecloth trick does NOT work on beans. I am under forty tins. Someone fetch a can opener. For ME.', mood: 'panicked' });
        } else {
          api.fail('You tug a bean tin out from under ' + (on.length > 1 ? 'two others' : 'another') + '. RUMBLE… CLONK. Beans everywhere. A shelf-stacker sighs and rebuilds the pyramid.');
        }
        return true;
      }
      s.tins[k] = false;
      s.taken++;
      if (k === 'b1') {
        api.complete({ line: 'Soup acquired. Slowly. Carefully. From the top. Like a sensible person. I wanted a magic trick.', mood: 'defeated' });
      } else {
        api.say(['One down. This is very slow. The tablecloth trick takes half a second.', 'Still going? The soup is RIGHT THERE. Yank it!', 'You\'re dismantling the whole display. The beans are getting nervous.', 'More beans? We don\'t even need beans.'][Math.min(s.taken - 1, 3)], 'annoyed');
      }
      return true;
    },

    solution: [{ tap: 't' }, { tap: 'm1' }, { tap: 'b1' }],
    alternatives: { 'clear-the-lot': [{ tap: 't' }, { tap: 'm2' }, { tap: 'm1' }, { tap: 'b3' }, { tap: 'b1' }] },
    ruinPaths: { 'bean-avalanche': [{ tap: 'b1' }] },
    checks: [
      { name: 'a supporting bean tin', steps: [{ tap: 'm1' }], expect: 'fail' },
      { name: 'the middle bottom tin', steps: [{ tap: 't' }, { tap: 'b2' }], expect: 'fail' },
      { name: 'the right side first', steps: [{ tap: 't' }, { tap: 'm2' }, { tap: 'b3' }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
