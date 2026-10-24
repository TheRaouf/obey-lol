/* Level 56 — Sugar or Salt
 * Shortbread needs sugar. Bossworth points at the jar labelled SUGAR and swears he did NOT swap any
 * labels with his label maker. A trail of ants marches from the ant hole straight to the jar labelled
 * SALT: ants want sugar. Drag that jar into the mixing bowl. (Or taste-test with the spoon first.)
 * Wrong: the SUGAR jar (salt, trap); the bath salts (trap); a second taste (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var JARS = [
    { id: 'jarA', label: 'SUGAR', inside: 'salt', x: 6, lid: '#e5243b' },
    { id: 'jarB', label: 'SALT', inside: 'sugar', x: 30, lid: '#3a86ff' },
    { id: 'jarC', label: 'BATH SALTS', inside: 'bath salts', x: 54, lid: '#9b5de5' }
  ];
  var TASTE = { salt: 'SALTY! Like the sea. Like tears. Like my last review.', sugar: 'Sweet! Lovely, sugary sweet. Suspiciously sweet.', 'bath salts': 'Lavender-flavoured soap. Please never do that again.' };

  OBEY.registerLevel({
    id: 'sugar-or-salt',
    num: 56,
    title: 'Sugar or Salt',
    objective: 'Put the sugar in the shortbread.',
    intro: 'Shortbread! One cup of sugar, from the jar labelled SUGAR. Obviously. I definitely did NOT swap any labels last week with my new label maker. That would be a prank.',
    introMood: 'pleased',
    actions: ['observe', 'drag', 'experiment'],
    par: 1,
    hints: [
      'Bossworth protested a bit too much about those labels. Who else in the kitchen knows sugar when they see it?',
      'Follow the line of ants from the hole in the skirting board. Ants go where the sugar is.',
      'Drag the jar the ants are marching to — the one labelled SALT — into the mixing bowl.'
    ],
    wrong: ['The jar labelled SUGAR is salt (trap).', 'Bath salts in the shortbread (trap).', 'Only one taste test is allowed (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Sweet shortbread, and a small army of satisfied ants.',
    trick: 'Bossworth had swapped the labels; the ant trail led straight to the real sugar.',

    init: function () { return { tasted: null }; },

    view: function (s) {
      var objs = [
        O('recipe', 4, 3, 44, 22, { kind: 'static', text: 'SHORTBREAD\nbutter, flour,\n1 cup of SUGAR', label: 'Recipe: shortbread needs butter, flour and one cup of sugar', cls: 'book-card' }),
        O('maker', 52, 3, 44, 22, { kind: 'static', text: 'Bossworth\'s label maker.\nLast printed: "SUGAR", "SALT".', label: 'Bossworth\'s label maker. Last printed: SUGAR and SALT.', cls: 'tag-card' })
      ];
      JARS.forEach(function (j) {
        var t = s.tasted === j.id;
        objs.push(O(j.id, j.x, 29, 20, 27, { art: 'b-jar', artOpts: { lid: j.lid }, drag: true, zone: true, label: 'Jar labelled ' + j.label + (t ? ' (you tasted it: ' + j.inside + ')' : '') + ' — drag it to the bowl' }));
        objs.push(O(j.id + 'tag', j.x - 1, 57, 22, 8, { kind: 'static', text: j.label, label: '', cls: 'tag-card' }));
      });
      objs.push(O('spoon', 80, 29, 12, 27, { art: 'b-spoon', drag: true, label: s.tasted ? 'Teaspoon (already used for one taste)' : 'Teaspoon for a taste test (drag it onto a jar)' }));
      objs.push(O('bowl', 4, 70, 34, 26, { art: 'b-mixbowl', zone: true, free: true, label: 'Mixing bowl with butter and flour' }));
      objs.push(O('ants', 38, 64, 46, 22, { kind: 'static', art: 'b-ants', artOpts: { flip: true }, label: 'A line of ants marching from the hole in the skirting board to the jar labelled SALT' }));
      objs.push(O('climb', 31, 42, 18, 14, { kind: 'static', art: 'b-ants', label: 'Ants climbing the SALT jar' }));
      objs.push(O('hole', 82, 74, 14, 14, { kind: 'static', art: 'mousehole', artOpts: {}, label: 'Small hole in the skirting board' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'bowl') { api.say('The bowl awaits its sugar. From the SUGAR jar. Which is sugar. Stop squinting at the ants.', 'pleased'); return true; }
      if (a.type !== 'drop') return false;
      var j = JARS.filter(function (x) { return x.id === a.zone; })[0];
      if (a.target === 'spoon') {
        if (!j) return true;
        if (s.tasted) { api.nope(); api.say('One taste only. This is a kitchen, not a buffet.', 'annoyed'); return true; }
        s.tasted = j.id;
        api.say('You taste the "' + j.label + '" jar: ' + TASTE[j.inside], j.inside === 'sugar' ? 'surprised' : 'laughing');
        return true;
      }
      var jar = JARS.filter(function (x) { return x.id === a.target; })[0];
      if (!jar || a.zone !== 'bowl') return true;
      if (jar.inside === 'sugar') {
        api.defy('labels');
        api.complete({ line: 'You put SALT in the shortbread?! …And it\'s sweet? So the labels were… swapped? By someone? With a label maker? No further questions.', mood: 'defeated' });
      } else if (jar.inside === 'salt') {
        api.fail('One cup of "sugar" later: the shortbread tastes like a seaside rock pool. Bossworth calls it "savoury innovation". Fresh bowl!');
      } else {
        api.fail('Bath salts?! The shortbread now smells of lavender and regret. Bossworth bites it anyway. Bubbles come out. Fresh bowl!');
      }
      return true;
    },

    solution: [{ drop: ['jarB', 'bowl'] }],
    alternatives: { taste: [{ drop: ['spoon', 'jarA'] }, { drop: ['jarB', 'bowl'] }] },
    checks: [
      { name: 'trust the SUGAR label', steps: [{ drop: ['jarA', 'bowl'] }], expect: 'fail' },
      { name: 'bath salts', steps: [{ drop: ['jarC', 'bowl'] }], expect: 'fail' },
      { name: 'second taste', steps: [{ drop: ['spoon', 'jarA'] }, { drop: ['spoon', 'jarB'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
