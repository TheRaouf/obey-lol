/* Level 178 — Seal of Approval (Royal Rumpus)
 * The gate decree needs a proper "B" seal mark. Bossworth recommends seal 1 (a B that "reads
 * properly"). On the wall: the old king's seal (its K carved backwards) next to a letter he sealed (a
 * normal K). Seals print mirror images, so the backwards-carved B is the one that prints a proper B.
 * Wrong: seal 1 prints a backwards B — forgery (trap); seal 3 prints a D (nope); gate before sealing (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  // carved face → printed mark (a print is the mirror image of the carving)
  var SEALS = {
    s1: { letter: 'B', mirror: false, desc: 'a B carved the right way round' },
    s2: { letter: 'B', mirror: true, desc: 'a B carved backwards' },
    s3: { letter: 'D', mirror: true, desc: 'a D carved backwards' }
  };

  OBEY.registerLevel({
    id: 'seal-of-approval',
    num: 178,
    title: 'Seal of Approval',
    objective: 'Seal the decree so the gate opens.',
    intro: 'My decree needs my royal B seal. Use seal one — the B that reads properly. The other two are obviously backwards. Honestly, who carves a backwards seal?',
    introMood: 'neutral',
    actions: ['tap', 'read', 'logic'],
    par: 2,
    hints: [
      'Compare the old king\'s seal with the letter he sealed. Is the print the same way round as the carving?',
      'A seal prints a mirror image of its face. A backwards carving makes a forwards print.',
      'Press seal 2 (the backwards B) onto the decree, then go through the gate.'
    ],
    wrong: ['Seal 1 prints a backwards B and the guard calls it a forgery (trap).', 'Seal 3 prints a D (nope).', 'The gate stays shut until the decree is sealed (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Sealed with a perfect B. Using the "wrong" seal. My whole life is a mirror image.',
    trick: 'A seal prints the mirror image of its face — the old king\'s backwards K made a proper K — so the backwards-carved B was the right one.',

    init: function () { return { mark: null }; },

    view: function (s) {
      var out = [
        O('oldseal', 4, 4, 18, 22, { kind: 'static', art: 'h-seal', artOpts: { letter: 'K', mirror: true }, label: 'The old king\'s seal in a glass case: its K is carved backwards' }),
        O('oldletter', 24, 4, 18, 22, { kind: 'static', art: 'h-decree', artOpts: { mark: 'K' }, label: 'A letter the old king sealed: the wax shows a normal K' }),
        O('oldtag', 4, 27, 40, 13, { kind: 'static', text: 'Old king\'s seal → his letter', label: 'Plaque: the old king\'s seal and a letter he sealed with it', cls: 'tag-card' }),
        O('decree', 50, 4, 22, 30, { kind: 'static', art: 'h-decree', artOpts: { mark: s.mark ? 'B' : null, mirror: false }, label: s.mark ? 'Decree: let the visitor out. Sealed with a proper B.' : 'Decree: let the visitor out. Needs a proper B seal.' }),
        O('dtag', 48, 35, 26, 10, { kind: 'static', text: s.mark ? 'Sealed: B ✓' : 'Needs: B seal', label: '', cls: 'tag-card' }),
        O('gate', 72, 42, 26, 34, { art: 'h-gatehouse', artOpts: { open: !!s.mark, portcullis: !s.mark }, label: s.mark ? 'Gate, open' : 'Gate, shut until the decree is sealed' }),
        O('table', 4, 66, 66, 12, { kind: 'static', art: 'table', label: '' })
      ];
      ['s1', 's2', 's3'].forEach(function (id, i) {
        var d = SEALS[id];
        out.push(O(id, 6 + i * 22, 47, 16, 20, { art: 'h-seal', artOpts: { letter: d.letter, mirror: d.mirror }, label: 'Seal ' + (i + 1) + ': ' + d.desc + ' (press onto the decree)' }));
        out.push(O(id + 'n', 6 + i * 22, 82, 16, 10, { kind: 'static', text: 'Seal ' + (i + 1), label: '', cls: 'tag-card' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 's1':
          api.fail('Thunk. The wax shows a BACKWARDS B. Guard: "Forgery! Nobody\'s initial looks like that!" The decree is torn up and you start again.');
          return true;
        case 's3':
          api.nope('s3');
          api.say('Thunk. The wax says D. The guard checks his list. "Who is D?" Nobody. Scrape it off and try again.', 'pleased');
          return true;
        case 's2':
          if (s.mark) { api.say('Already sealed. Twice-sealed is just showing off.', 'annoyed'); return true; }
          s.mark = 'B';
          api.defy('seal');
          api.say('Thunk. The wax shows a perfect, proper B. From the backwards seal. That should NOT work. (It always works.)', 'surprised');
          return true;
        case 'gate':
          if (!s.mark) { api.nope('gate'); api.say('No seal, no gate. Rules are rules. Mine, specifically.', 'pleased'); return true; }
          api.complete({ line: 'The guard salutes your perfect B. I am having all my seals re-carved the WRONG way round. Which is the right way. Apparently.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ tap: 's2' }, { tap: 'gate' }],
    checks: [
      { name: 'Bossworth\'s seal 1', steps: [{ tap: 's1' }], expect: 'fail' },
      { name: 'seal 3 prints a D', steps: [{ tap: 's3' }], expect: 'nope' },
      { name: 'gate before sealing', steps: [{ tap: 'gate' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
