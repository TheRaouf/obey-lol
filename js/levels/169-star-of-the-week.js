/* Level 169 — Star of the Week (Detention Dunes)
 * Give the star sticker to the pupil with the most merit marks. Bossworth counts only the straight
 * lines ("the slanty ones are crossings-out"), which makes Ben (10 loose marks) the winner. The chart's
 * key: four lines with a line through = 5. Ava has 5 + 5 + 1 = 11, Ben 10, Cal 8.
 * Wrong: the star to Ben or Cal (trap). Ruin: sticking the star on yourself.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var ROWS = [
    { id: 'ava', name: 'Ava', n: 11, loose: false, said: 'two bundles of five and one more' },
    { id: 'ben', name: 'Ben', n: 10, loose: true, said: 'ten single marks' },
    { id: 'cal', name: 'Cal', n: 8, loose: false, said: 'one bundle of five and three more' }
  ];

  OBEY.registerLevel({
    id: 'star-of-the-week',
    num: 169,
    title: 'Star of the Week',
    objective: 'Give the star to the pupil with the most merit marks.',
    intro: 'Star of the Week! Most merit marks wins. Only count the STRAIGHT lines; the slanty ones are crossings-out. Ben wins. Stick it on Ben.',
    introMood: 'neutral',
    actions: ['drag', 'count'],
    par: 1,
    hints: [
      'Read the key at the top of the chart.',
      'A slanty line through four marks makes a bundle of FIVE, not a crossing-out.',
      'Ava has 5 + 5 + 1 = 11. Drag the star onto Ava.'
    ],
    wrong: ['Giving the star to Ben or Cal is a trap.', 'Sticking it on yourself is a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Eleven merits, one star, zero crossings-out.',
    trick: 'The slanty line ties four marks into a bundle of five, so Ava\'s 11 beat Ben\'s 10 loose marks.',

    init: function () { return {}; },

    view: function () {
      var out = [
        O('title', 4, 3, 92, 10, { kind: 'static', text: 'MERIT CHART. Key: four lines + a line through = 5', label: 'Merit chart. Key: four lines with a line through them make 5', cls: 'honest-card' }),
        O('board', 2, 15, 96, 51, { kind: 'static', text: '', label: '', cls: 'tag-card' })
      ];
      ROWS.forEach(function (r, i) {
        var y = 17 + i * 17;
        out.push(O('name-' + r.id, 5, y, 22, 15, { text: r.name, label: r.name + '\'s row on the merit chart (drop the star here)', cls: 'btn-card big', zone: true, free: true }));
        out.push(O('tally-' + r.id, 30, y, 64, 15, { kind: 'static', art: 'g-tally', artOpts: { n: r.n, loose: r.loose }, label: r.name + '\'s merit marks: ' + r.said }));
      });
      out.push(O('desk', 4, 82, 70, 14, { kind: 'static', art: 'table' }));
      out.push(O('star', 32, 70, 14, 13, { art: 'g-star', label: 'Gold star sticker (drag it onto a name)', drag: true }));
      out.push(O('you', 80, 70, 16, 26, { art: 'g-kid', artOpts: { color: '#ffd23f', hair: '#9a6b3f' }, label: 'You (not on the chart)', zone: true, free: true }));
      out.push(O('youTag', 79, 66, 18, 5.5, { kind: 'static', text: 'YOU', label: '', cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && /^name-/.test(a.target)) {
        api.say('That\'s a name. On a chart. It wants a star. Ben\'s wants it most.', 'pleased');
        return true;
      }
      if (a.type === 'tap' && a.target === 'you') { api.say('You. Not on the chart. Not in the running. Unlike Ben.', 'pleased'); return true; }
      if (a.type !== 'drop' || a.target !== 'star') return false;
      if (a.zone === 'you') {
        api.complete({ ruin: 'self-starter', line: 'You gave Star of the Week to YOURSELF? With no merit marks? In front of everyone? …That\'s what I was going to do with it. For ME. You stole my crime!', mood: 'panicked' });
        return true;
      }
      var r = ROWS.filter(function (x) { return 'name-' + x.id === a.zone; })[0];
      if (!r) return true;
      if (r.id === 'ava') {
        api.defy('ava');
        api.complete({ line: 'Ava? With NINE straight lines? …Eleven, you say. The slanty ones are BUNDLES. Who designed this chart? A fence-builder?', mood: 'defeated' });
      } else {
        api.fail('Ava counts her marks out loud: "Five, ten, eleven." The class does the maths. ' + r.name + ' hands the star back, a bit embarrassed. Count again!');
      }
      return true;
    },

    solution: [{ drop: ['star', 'name-ava'] }],
    ruinPaths: { 'self-starter': [{ drop: ['star', 'you'] }] },
    checks: [
      { name: 'Bossworth\'s Ben', steps: [{ drop: ['star', 'name-ben'] }], expect: 'fail' },
      { name: 'Cal', steps: [{ drop: ['star', 'name-cal'] }], expect: 'fail' },
      { name: 'star on yourself is a ruin', steps: [{ drop: ['star', 'you'] }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
