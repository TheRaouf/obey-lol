/* Level 230 — Medal Table (Podium Party)
 * Bossworth won 12 bronzes, Kevin 3 silvers, you 1 gold. "Most medals wins: me on top!"
 * The sign: ranked by GOLDS first, then silvers, then bronzes. So: You 1st, Kevin 2nd, Bossworth 3rd.
 * Tap the teams in podium order (1st, then 2nd; the last place fills itself).
 * Wrong: Bossworth on the top step (trap); Kevin on top, or Bossworth second (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var RIGHT = ['you', 'kevin', 'boss'];
  var T = {
    you: { name: 'Team You', medals: ['1', '0', '0'], art: 'hero' },
    kevin: { name: 'Team Kevin', medals: ['0', '3', '0'], art: 'twin' },
    boss: { name: 'Team Bossworth', medals: ['0', '0', '12'], art: 'j-boss' }
  };
  // Where each podium place stands (x of the figure, y of its top).
  var SPOT = [[45, 41], [31.5, 47.5], [58.5, 51.5]];

  OBEY.registerLevel({
    id: 'medal-table',
    num: 230,
    title: 'Medal Table',
    objective: 'Put the teams on the podium in the right order.',
    intro: 'Medal ceremony! I won TWELVE medals. Twelve! Kevin got three, you got one. So: me on the top step, obviously. Count them!',
    introMood: 'pleased',
    actions: ['tap', 'read', 'logic'],
    par: 2,
    hints: [
      'Read how the medal table is ranked. Is it the most medals?',
      'Golds count first. Only one team has a gold. Silvers come before bronzes.',
      'Tap Team You for first place, then Team Kevin for second.'
    ],
    wrong: ['Bossworth on the top step breaks the medal table rules (trap).', 'Kevin first, or Bossworth second, is sent back (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One gold beats twelve bronzes. Bossworth is "appealing to the committee". He is the committee.',
    trick: 'Medal tables rank by golds first, so your one gold beat Kevin\'s silvers and Bossworth\'s twelve bronzes.',

    init: function () { return { placed: [] }; },

    view: function (s) {
      var out = [];
      [['Team', 4, 33], ['Gold', 38, 18], ['Silver', 57, 19], ['Bronze', 77, 19]].forEach(function (h, i) {
        out.push(O('h' + i, h[1], 2, h[2], 6.5, { kind: 'static', text: h[0], label: '', cls: 'plaque-card' }));
      });
      ['boss', 'kevin', 'you'].forEach(function (k, r) {
        var y = 9.5 + r * 7.3, t = T[k];
        out.push(O('r-' + k, 4, y, 33, 6.5, { kind: 'static', text: t.name.replace('Team ', ''), label: t.name + ': ' + t.medals[0] + ' gold, ' + t.medals[1] + ' silver, ' + t.medals[2] + ' bronze', cls: 'tag-card' }));
        [38, 57, 77].forEach(function (x, c) { out.push(O('m-' + k + c, x, y, c ? 19 : 18, 6.5, { kind: 'static', text: t.medals[c], label: '', cls: 'tag-card' })); });
      });
      out.push(O('rule', 4, 31, 92, 10.5, { kind: 'static', text: 'Ranked by GOLDS first, then silvers, then bronzes.', label: 'Rule: ranked by golds first, then silvers, then bronzes.', cls: 'honest-card' }));
      out.push(O('podium', 22, 50, 56, 24, { kind: 'static', art: 'j-podium', label: 'Podium with steps 1, 2 and 3' }));
      s.placed.forEach(function (k, i) {
        out.push(O('on-' + k, SPOT[i][0], SPOT[i][1], 10, 12, { kind: 'static', art: T[k].art, label: T[k].name + ' on step ' + (i + 1) }));
      });
      ['you', 'kevin', 'boss'].forEach(function (k, i) {
        out.push(O(k, 4 + i * 31, 79, 30, 15, { text: T[k].name, label: T[k].name + (s.placed.indexOf(k) >= 0 ? ', on the podium' : ''), cls: k === 'boss' ? 'btn-card accent' : 'btn-card' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap' || !T[a.target]) return false;
      var k = a.target, n = s.placed.length;
      if (s.placed.indexOf(k) >= 0) { api.nope(k); api.say('They\'re already on the podium. One step each. Even for me.', 'annoyed'); return true; }
      if (k !== RIGHT[n]) {
        if (n === 0 && k === 'boss') {
          api.fail('Me! On top! Twelve medals! …The officials read the sign. Golds first. I have none. They lift me off the step. Gently. Humiliatingly. Again!', 'laughing');
          return true;
        }
        api.nope(k);
        api.say(n === 0 ? 'Kevin first? With zero golds? Even I know that\'s wrong. And I\'m wrong a lot.' : 'Me in second? Above Kevin\'s silvers? I like it, but the sign doesn\'t.', 'suspicious');
        return true;
      }
      s.placed.push(k);
      if (s.placed.length === 2) {
        s.placed.push('boss');
        api.defy('table');
        api.complete({ line: 'Third. With TWELVE medals. Twelve bronzes are worth… less than one gold. Who decided that? Everybody? Since forever? Fine.', mood: 'defeated' });
      } else {
        api.say('You. On the top step. With ONE medal. …It is a very shiny medal, I suppose.', 'annoyed');
      }
      return true;
    },

    solution: [{ tap: 'you' }, { tap: 'kevin' }],
    checks: [
      { name: 'most medals on top', steps: [{ tap: 'boss' }], expect: 'fail' },
      { name: 'Kevin first', steps: [{ tap: 'kevin' }], expect: 'nope' },
      { name: 'Bossworth second', steps: [{ tap: 'you' }, { tap: 'boss' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
