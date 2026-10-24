/* Level 58 — The Fitted Sheet
 * "Fold the fitted sheet into a perfect square." Nobody can. Every fold makes a bigger ball; the third
 * attempt swallows you (trap). The third option: a fitted sheet fits a bed — and the bed is bare.
 * Drag the sheet onto the bed. (Stuffing it in the linen drawer, like every human ever, also works.)
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FOLDS = [
    'Corners in… now it\'s a ball. A slightly angrier ball. Again!',
    'It\'s rounder. How is it ROUNDER? Fold harder! With your soul!'
  ];

  OBEY.registerLevel({
    id: 'fitted-sheet',
    num: 58,
    title: 'The Fitted Sheet',
    objective: 'Deal with the fitted sheet.',
    intro: 'Fold this fitted sheet into a perfect square. It\'s easy. I\'ve done it thousands of times. With my eyes closed. In a dream. Once.',
    introMood: 'pleased',
    actions: ['tap', 'drag', 'choice'],
    par: 1,
    hints: [
      'Nobody in history has folded one of these. Ask what a fitted sheet is FOR.',
      'Look at the bed. Its mattress is bare.',
      'Drag the sheet onto the bed. (The linen drawer works too, if you\'re honest about your folding.)'
    ],
    wrong: ['Folding only makes a bigger ball (nope).', 'The third fold attempt swallows you whole (trap).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Fitted. Not folded. Fitted. As nature intended.',
    trick: 'Nobody can fold a fitted sheet — but it fits a bed perfectly, so you skipped the folding.',

    init: function () { return { folds: 0, where: 'floor' }; },

    view: function (s) {
      return [
        O('poster', 4, 4, 42, 34, { kind: 'static', text: 'HOW TO FOLD A FITTED SHEET\nStep 1 of 97: Weep.\nStep 2: Weep squarely.', label: 'Poster: how to fold a fitted sheet. Step 1 of 97: weep.', cls: 'book-card' }),
        O('sheet', 6, 42, 38, 26, { art: 'b-sheet', artOpts: { balled: s.folds }, drag: true, hidden: s.where !== 'floor', label: s.folds ? 'Fitted sheet, now a ball (drag it)' : 'Fitted sheet with elastic corners (drag it)' }),
        O('fold', 6, 74, 38, 12, { text: 'FOLD (corners in)', label: 'Try to fold the fitted sheet', cls: 'btn-card' }),
        O('bedtag', 52, 4, 44, 14, { kind: 'static', text: 'Mattress: bare.\nShivering slightly.', label: 'Note on the bed: the mattress is bare', cls: 'tag-card' }),
        O('bed', 50, 22, 46, 34, { art: 'b-bed', artOpts: { sheet: s.where === 'bed' }, zone: true, free: true, label: s.where === 'bed' ? 'Bed with a fitted sheet on it' : 'Bed with a bare mattress' }),
        O('drawer', 54, 66, 38, 18, { art: 'drawer', artOpts: { n: '' }, zone: true, free: true, label: 'Linen drawer' }),
        O('drawertag', 54, 87, 38, 9, { kind: 'static', text: 'Linen (just shove it in)', label: '', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'sheet') {
        if (a.zone === 'bed') {
          s.where = 'bed';
          api.defy('fold');
          api.complete({ line: 'You put it ON THE BED? Where it… fits. Because it\'s FITTED. Who told you that? Was it the sheet? Did the sheet talk?', mood: 'defeated' });
        } else if (a.zone === 'drawer') {
          s.where = 'drawer';
          api.complete({ line: 'Balled up and shoved in the drawer. The ancient human tradition. I respect it. I\'m disgusted, but I respect it.', mood: 'annoyed' });
        }
        return true;
      }
      if (a.type !== 'tap') return false;
      if (a.target === 'fold') {
        if (s.where !== 'floor') return true;
        s.folds++;
        if (s.folds >= 3) {
          api.fail('FWUMP. The sheet wraps itself round you like a burrito made of regret. Bossworth unrolls you, eventually. Fresh sheet!');
          return true;
        }
        api.nope();
        api.say(FOLDS[s.folds - 1], s.folds === 1 ? 'pleased' : 'annoyed');
        return true;
      }
      if (a.target === 'bed') { api.say('A bed. For sleeping. Not relevant to folding. Stop looking at it.', 'suspicious'); return true; }
      if (a.target === 'drawer') { api.say('The linen drawer. It is full of shame and balled-up sheets. Not mine. Some… other sheets.', 'neutral'); return true; }
      return false;
    },

    solution: [{ drop: ['sheet', 'bed'] }],
    alternatives: { shove: [{ drop: ['sheet', 'drawer'] }] },
    checks: [
      { name: 'try to fold', steps: [{ tap: 'fold' }], expect: 'nope' },
      { name: 'fold three times', steps: [{ tap: 'fold' }, { tap: 'fold' }, { tap: 'fold' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
