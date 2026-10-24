/* Level 167 — Lunchbox Swap (Lunchbox Lane)
 * Get the last chocolate pudding. Pat has it but only swaps for an apple. Kim swaps an apple for crisps;
 * Lee swaps crisps for a sandwich. Bossworth: shove your sandwich at Pat. Chain: sandwich → Lee (crisps),
 * crisps → Kim (apple), apple → Pat (pudding).
 * Wrong: offering anyone something they don't want (nope). Ruin: swap at the Mystery Stew hatch.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var KIDS = [
    { id: 'pat', name: 'Pat', has: 'pudding', wants: 'apple', color: '#ff77b4', hair: '#2d2850' },
    { id: 'kim', name: 'Kim', has: 'apple', wants: 'crisps', color: '#5fd98a', hair: '#9a6b3f' },
    { id: 'lee', name: 'Lee', has: 'crisps', wants: 'sandwich', color: '#7fb2ff', hair: '#e5243b' }
  ];
  var ART = { sandwich: 'sandwich', crisps: 'g-crisps', apple: 'g-apple', pudding: 'g-pudding' };
  var WORD = { sandwich: 'a cheese sandwich', crisps: 'crisps', apple: 'an apple', pudding: 'chocolate pudding' };

  OBEY.registerLevel({
    id: 'lunchbox-swap',
    num: 167,
    title: 'Lunchbox Swap',
    objective: 'Swap your way to the last chocolate pudding.',
    intro: 'The last chocolate pudding! Pat has it. Shove your sandwich at Pat. Nobody says no to a cheese sandwich. NOBODY.',
    introMood: 'pleased',
    actions: ['drag', 'logic'],
    par: 3,
    hints: [
      'Read what each pupil wants. Pat doesn\'t want a sandwich.',
      'Work backwards: Pat wants an apple. Who has an apple, and what do they want?',
      'Sandwich to Lee, crisps to Kim, apple to Pat.'
    ],
    wrong: ['Offering someone a swap they don\'t want is a nope.', 'Swapping at the Mystery Stew hatch is a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Sandwich, crisps, apple, pudding. A trade empire in three moves.',
    trick: 'Pat only wanted an apple, so you worked backwards along the swaps: sandwich for crisps, crisps for an apple, apple for the pudding.',

    init: function () { return { have: 'sandwich', has: { pat: 'pudding', kim: 'apple', lee: 'crisps' }, done: {} }; },

    view: function (s) {
      var out = [];
      KIDS.forEach(function (k, i) {
        var x = 3 + i * 33;
        out.push(O('say-' + k.id, x, 3, 28, 22, { kind: 'static', text: s.done[k.id] ? k.name.toUpperCase() + '\nHappy with ' + s.has[k.id] + '!' : k.name.toUpperCase() + '\nHas: ' + k.has + '\nWants: ' + k.wants, label: s.done[k.id] ? k.name + ' has swapped and is happy' : k.name + ' has ' + WORD[k.has] + ' and wants ' + WORD[k.wants], cls: 'speech-card' }));
        out.push(O(k.id, x + 5, 28, 18, 34, { art: 'g-kid', artOpts: { color: k.color, hair: k.hair }, label: k.name + ', who has ' + WORD[s.has[k.id]] + (s.done[k.id] ? '' : ' and wants ' + WORD[k.wants]) + ' (drop your lunch here to swap)', zone: true, free: true }));
        out.push(O('item-' + k.id, x + 8, 52.6, 12, 9, { kind: 'static', art: ART[s.has[k.id]], label: '' }));
      });
      out.push(O('table', 2, 60, 96, 16, { kind: 'static', art: 'table' }));
      out.push(O('youTag', 4, 82, 26, 12, { kind: 'static', text: 'You have:', label: 'You have ' + WORD[s.have], cls: 'tag-card' }));
      out.push(O('lunch', 33, 79, 18, 17, { art: ART[s.have], label: 'Your ' + s.have + ' (drag it to someone to swap)', drag: true }));
      out.push(O('stew', 56, 79, 40, 17, { text: 'MYSTERY STEW\nswaps for anything!', label: 'Dinner hatch: Mystery Stew, swaps for anything (drop zone)', cls: 'btn-card ghost', zone: true, free: true }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'tap') {
        var t = KIDS.filter(function (x) { return x.id === a.target; })[0];
        if (t) { api.say(s.done[t.id] ? t.name + ' is busy enjoying ' + s.has[t.id] + '.' : t.name + ': "' + WORD[t.wants].replace(/^(a|an) /, '').replace(/^./, function (c) { return c.toUpperCase(); }) + ', please. Then we can talk."', 'neutral'); return true; }
        if (a.target === 'stew') { api.say('Mystery Stew. Nobody knows what\'s in it. Not even the stew.', 'suspicious'); return true; }
        return false;
      }
      if (a.type !== 'drop' || a.target !== 'lunch') return false;
      if (a.zone === 'stew') {
        api.complete({ ruin: 'mystery-stew', line: 'You swapped ' + WORD[s.have] + ' for MYSTERY STEW? It\'s grey. It\'s lumpy. It just winked at me. Lunch is over and so is my appetite.', mood: 'panicked' });
        return true;
      }
      var k = KIDS.filter(function (x) { return x.id === a.zone; })[0];
      if (!k) return true;
      if (s.done[k.id] || k.wants !== s.have) {
        api.nope('lunch');
        api.say(s.done[k.id] ? k.name + ' has already swapped. No take-backs.' : k.name + ' looks at ' + WORD[s.have] + ' and shakes their head. "I want ' + WORD[k.wants] + '." Rude! It\'s CHEESE!', 'annoyed');
        return true;
      }
      var got = s.has[k.id];
      s.has[k.id] = s.have; s.have = got; s.done[k.id] = true;
      if (got === 'pudding') {
        api.complete({ line: 'The chocolate pudding! Via crisps AND an apple? That\'s not lunch, that\'s a business. I offered the sandwich straight to Pat. That\'s called confidence.', mood: 'defeated' });
      } else {
        api.defy('swap-' + k.id);
        api.say('You swapped for ' + WORD[got] + '? I said PAT. Pat has the pudding. Pat!', 'annoyed');
      }
      return true;
    },

    solution: [{ drop: ['lunch', 'lee'] }, { drop: ['lunch', 'kim'] }, { drop: ['lunch', 'pat'] }],
    ruinPaths: { 'mystery-stew': [{ drop: ['lunch', 'stew'] }] },
    checks: [
      { name: 'sandwich straight to Pat', steps: [{ drop: ['lunch', 'pat'] }], expect: 'nope' },
      { name: 'crisps to Pat', steps: [{ drop: ['lunch', 'lee'] }, { drop: ['lunch', 'pat'] }], expect: 'nope' },
      { name: 'mystery stew is a ruin', steps: [{ drop: ['lunch', 'stew'] }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
