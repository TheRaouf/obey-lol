/* Level 208 — Moving House (Coral Caverns)
 * Four hermit crabs, sizes 1–4. Crab 4 is squeezed into shell 3, crab 3 into shell 2, crab 2 into
 * shell 1, and crab 1 has no shell. A new size-4 shell washes up. Hermit crabs only move into a shell
 * exactly their size. Bossworth: give it to the homeless little one. Instead: new shell to crab 4,
 * its old shell 3 to crab 3, shell 2 to crab 2, shell 1 to crab 1 (a vacancy chain).
 * Wrong: any shell to the wrong-sized crab (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'moving-house',
    num: 208,
    title: 'Moving House',
    objective: 'Get every hermit crab a shell that fits.',
    intro: 'A lovely new shell! Give it to little Size 1, the poor thing has no home at all. Aww. Then everyone\'s happy. Probably. I didn\'t check.',
    introMood: 'pleased',
    actions: ['drag', 'logic', 'sequence'],
    par: 4,
    hints: [
      'A crab will only move into a shell that is exactly its size.',
      'The new shell is size 4. Who is size 4? And what does that crab leave behind?',
      'New shell to crab 4, then each freed shell to the next crab down: 3, 2, 1.'
    ],
    wrong: ['A shell that is too big or too small won\'t be taken (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Four crabs, four shells, zero squeezing. A whole street moved house in one afternoon.',
    trick: 'Each crab only fits its own size, so the new shell went to the biggest crab and every freed shell moved one crab down the line.',

    init: function () { return { wear: [0, 0, 1, 2, 3], free: 4 }; }, // wear[c] = shell size crab c wears

    view: function (s) {
      var out = [
        O('sea', 0, 0, 100, 100, { kind: 'static', art: 'i-sea', cls: 'backdrop' }),
        O('rule', 4, 2, 92, 14, { kind: 'static', text: 'Hermit crabs only take a shell EXACTLY their size.', label: 'Rule: hermit crabs only take a shell exactly their size.', cls: 'honest-card' }),
        O('rock', 4, 36, 30, 12, { kind: 'static', art: 'i-rock', label: '' }),
        O('shell', 9, 20, 20, 18, { art: 'i-conch', artOpts: { size: s.free }, label: 'Empty shell, size ' + s.free + ' (drag it to a crab)', drag: true, hidden: !s.free }),
        O('tip', 40, 22, 56, 10, { kind: 'static', text: s.free ? 'Free shell: size ' + s.free : 'Everyone has moved in', label: '', cls: 'tag-card' })
      ];
      for (var c = 1; c <= 4; c++) {
        var w = s.wear[c];
        out.push(O('size' + c, 4 + (c - 1) * 24, 80, 20, 9, { kind: 'static', text: 'Size ' + c, label: '', cls: 'tag-card' }));
        out.push(O('crab' + c, 4 + (c - 1) * 24, 54, 20, 22, {
          art: 'i-hermit', artOpts: { size: c, shell: w },
          label: 'Hermit crab, size ' + c + (w === c ? ', in a shell that fits' : (w ? ', squeezed into a size ' + w + ' shell' : ', with no shell')), zone: true
        }));
      }
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && /^crab[1-4]$/.test(a.target)) {
        api.say('The crab pulls its eyes in. Shy. Bring it a shell, not a finger.', 'neutral');
        return true;
      }
      if (a.type !== 'drop' || a.target !== 'shell') return false;
      var m = /^crab([1-4])$/.exec(a.zone || '');
      if (!m) { api.say('The shell rolls back to the rock. Shells are terrible at deciding.', 'neutral'); return true; }
      var c = Number(m[1]);
      if (s.wear[c] === c) { api.nope(); api.say('Crab ' + c + ' already has a shell that fits. It is not a collector.', 'neutral'); return true; }
      if (s.free !== c) {
        api.nope();
        api.say(s.free > c ? 'Crab ' + c + ' climbs in and rattles around like a pea in a bucket. Out it comes. Too big!' : 'Crab ' + c + ' tries to squeeze in. It can\'t. Too small!', 'annoyed');
        return true;
      }
      var old = s.wear[c];
      s.wear[c] = c; s.free = old;
      if (c === 4) api.defy('little-one');
      if (!old) {
        api.complete({ line: 'Every crab in a shell that fits, all thanks to ONE new shell. I said give it to the little one. And it did get one. Eventually. I\'ll take that.', mood: 'defeated' });
      } else {
        api.say('Crab ' + c + ' moved in and left a size ' + old + ' shell behind. Oh. Oh, I see what\'s happening.', 'surprised');
      }
      return true;
    },

    solution: [{ drop: ['shell', 'crab4'] }, { drop: ['shell', 'crab3'] }, { drop: ['shell', 'crab2'] }, { drop: ['shell', 'crab1'] }],
    checks: [
      { name: 'new shell to the little one is a nope', steps: [{ drop: ['shell', 'crab1'] }], expect: 'nope' },
      { name: 'shell 3 to crab 2 is a nope', steps: [{ drop: ['shell', 'crab4'] }, { drop: ['shell', 'crab2'] }], expect: 'nope' },
      { name: 'stopping halfway does not finish', steps: [{ drop: ['shell', 'crab4'] }, { drop: ['shell', 'crab3'] }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
