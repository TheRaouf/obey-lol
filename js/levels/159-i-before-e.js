/* Level 159 — I Before E (Bookworm Bog)
 * Bossworth "filled in" a spelling test with I-E every time: it's ALWAYS i before e. The poster says
 * "i before e, except after c". Tap a word to swap its I and E. RECIEVE and CIELING need fixing;
 * BELIEVE and FIELD are already right.
 * Wrong: handing in any misspelling (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var WORDS = [
    { id: 'w1', ie: 'RECIEVE', ei: 'RECEIVE', want: 'ei' },
    { id: 'w2', ie: 'BELIEVE', ei: 'BELEIVE', want: 'ie' },
    { id: 'w3', ie: 'CIELING', ei: 'CEILING', want: 'ei' },
    { id: 'w4', ie: 'FIELD', ei: 'FEILD', want: 'ie' }
  ];

  OBEY.registerLevel({
    id: 'i-before-e',
    num: 159,
    title: 'I Before E',
    objective: 'Fix the spelling test, then hand it in.',
    intro: 'Spelling test! I\'ve filled it in for you. It\'s ALWAYS i before e, so I wrote I-E every single time. Hand it in and we can all go to lunch.',
    introMood: 'neutral',
    actions: ['tap', 'read'],
    par: 3,
    hints: [
      'The poster has more words on it than Bossworth quoted.',
      '"Except after c": look at the letter just before each I-E.',
      'Swap RECIEVE and CIELING to E-I, leave the other two, hand it in.'
    ],
    wrong: ['Handing in a misspelt word is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Four out of four. The c\'s got their e\'s back.',
    trick: 'The rule has a second half: i before e EXCEPT after c, so RECEIVE and CEILING take E-I.',

    init: function () { return { flip: {} }; },

    view: function (s) {
      var out = [
        O('poster', 6, 3, 88, 13, { kind: 'static', text: 'i before e, except after c', label: 'Poster: i before e, except after c', cls: 'sign-card' }),
        O('head', 6, 19, 56, 7, { kind: 'static', text: 'Tap a word to swap its I and E', label: '', cls: 'tag-card' })
      ];
      WORDS.forEach(function (w, i) {
        var cur = s.flip[w.id] ? w.ei : w.ie;
        out.push(O(w.id, 6, 28 + i * 12, 56, 10.5, { text: (i + 1) + '. ' + cur, label: 'Word ' + (i + 1) + ': ' + cur.split('').join(' ') + ' (tap to swap I and E)', cls: 'btn-card big' }));
      });
      out.push(O('handin', 68, 52, 26, 22, { text: 'Hand in', label: 'Hand in the spelling test', cls: 'btn-card big' }));
      out.push(O('desk', 22, 80, 44, 17, { kind: 'static', art: 'g-desk' }));
      out.push(O('kid', 74, 66, 14, 30, { kind: 'static', art: 'g-kid', artOpts: { color: '#ff6f91', hair: '#2d2850' }, label: '' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var w = WORDS.filter(function (x) { return x.id === a.target; })[0];
      if (w) {
        s.flip[w.id] = !s.flip[w.id];
        var cur = s.flip[w.id] ? w.ei : w.ie;
        if (s.flip[w.id] && w.want === 'ei') { api.defy(w.id); api.say(cur + '? You changed my I-E! After a C? …The poster does say something about C. In smaller letters. Which I skip.', 'annoyed'); }
        return true;
      }
      if (a.target === 'handin') {
        var bad = WORDS.filter(function (x) { return (s.flip[x.id] ? 'ei' : 'ie') !== x.want; });
        if (!bad.length) api.complete({ line: 'Four out of four. RECEIVE, BELIEVE, CEILING, FIELD. I knew about the C. I was testing the test.', mood: 'defeated' });
        else api.fail('Red pen everywhere. "' + (s.flip[bad[0].id] ? bad[0].ei : bad[0].ie) + '" is wrong. The poster had a second half. New test!');
        return true;
      }
      return false;
    },

    solution: [{ tap: 'w1' }, { tap: 'w3' }, { tap: 'handin' }],
    checks: [
      { name: 'hand in Bossworth\'s answers', steps: [{ tap: 'handin' }], expect: 'fail' },
      { name: 'swap every word', steps: [{ tap: 'w1' }, { tap: 'w2' }, { tap: 'w3' }, { tap: 'w4' }, { tap: 'handin' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
