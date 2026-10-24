/* Level 46 — Coffee Run
 * "Fill my mug to the very BRIM." Hold BREW to pour; the mug fills at 25% a second. The mug has a MAX line
 * and Facilities' notice says brimming mugs spill on the boss's laptop: at 100% it overflows (trap).
 * Stop anywhere from 65% (you can top up with more short holds), then Serve. Serving short is a nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var STEP = 2.5, TICK = 100, ENOUGH = 65, MAX = 80;

  OBEY.registerLevel({
    id: 'coffee-run',
    num: 46,
    title: 'Coffee Run',
    objective: 'Make Bossworth\'s coffee without a disaster.',
    intro: 'Make me a coffee. Hold the button and fill my mug to the very brim. The BRIM. I like my coffee like my ego: overflowing.',
    introMood: 'pleased',
    actions: ['hold', 'tap', 'read'],
    par: 2,
    hints: [
      'The mug and Facilities both disagree with Bossworth about "the brim".',
      'Hold BREW and watch the fill level. Let go around the MAX line — short holds can top it up.',
      'Hold BREW for about three seconds (roughly 75%), let go, then press Serve.'
    ],
    wrong: ['Filling to the brim overflows onto the laptop (trap).', 'Serving a half-empty mug is refused (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Filled to the line. Not the brim. My ego remains un-overflowed.',
    trick: '"To the brim" meant an overflow; the MAX line on the mug was the real instruction.',

    init: function () { return { fill: 0, pouring: false, iv: null }; },

    view: function (s) {
      var f = Math.round(s.fill);
      return [
        O('machine', 30, 4, 30, 44, { kind: 'static', art: 'a-coffeemachine', artOpts: { pouring: s.pouring }, label: 'Coffee machine' }),
        O('cup', 37, 25, 16, 17, { kind: 'static', art: 'a-cup', artOpts: { fill: s.fill, max: MAX }, label: 'Bossworth\'s mug, ' + f + '% full, MAX line at ' + MAX + '%' }),
        O('brew', 64, 8, 32, 14, { text: s.pouring ? 'Pouring…' : 'BREW (hold)', label: 'Brew button (press and hold to pour)', hold: true, cls: 'hold-btn' + (s.pouring ? ' charging' : '') }),
        O('meter', 64, 26, 32, 11, { kind: 'static', text: 'Fill: ' + f + '%', label: 'Fill level ' + f + ' percent', cls: 'display-card' + (f >= ENOUGH ? ' ready' : '') }),
        O('serve', 64, 41, 32, 12, { text: 'Serve ☕', label: 'Serve the coffee to Bossworth', cls: 'btn-card accent' }),
        O('notice', 4, 56, 56, 26, { kind: 'static', text: 'FACILITIES NOTICE\nFill mugs to the MAX line only. Brimming mugs spill on the boss\'s laptop. AGAIN.', label: 'Facilities notice: fill mugs to the max line only, brimming mugs spill on the boss\'s laptop, again', cls: 'book-card' }),
        O('plant', 80, 66, 14, 30, { art: 'plant', label: 'Office plant', free: true })
      ];
    },

    on: function (a, s, api) {
      function stop() { if (s.iv !== null) { api.cancel(s.iv); s.iv = null; } s.pouring = false; }
      switch (a.type + ':' + a.target) {
        case 'holdstart:brew':
          s.pouring = true;
          if (s.iv === null) {
            s.iv = api.every(TICK, function () {
              s.fill += STEP;
              if (s.fill >= 100) {
                stop();
                api.fail('SPLOOSH. To the brim and beyond — straight onto my laptop. My unsaved novel! Mop up and start again.');
              }
            });
          }
          if (s.fill === 0) api.say('Pour! Pour! Don\'t you DARE stop at that silly little line.', 'pleased');
          return true;
        case 'holdend:brew':
          stop();
          if (s.fill > 0 && s.fill < ENOUGH) api.say('Only ' + Math.round(s.fill) + '%? That\'s not a coffee, that\'s a rumour. More!', 'annoyed');
          else if (s.fill >= ENOUGH) api.say(Math.round(s.fill) + '%. You stopped at the line. Coward. Responsible coward.', 'suspicious');
          return true;
        case 'tap:brew':
          api.say('You have to HOLD it. Coffee doesn\'t pour itself. Well, it does, but only while you hold it.', 'neutral');
          return true;
        case 'tap:serve':
          if (s.fill < ENOUGH) {
            api.nope('serve');
            api.say(s.fill ? 'Half a coffee? I can see the bottom of the mug. I can see my REFLECTION.' : 'An empty mug. Very conceptual. No.', 'annoyed');
            return true;
          }
          api.defy('line');
          api.complete({ line: 'Sip. …It\'s perfect. And my laptop is dry. I hate it when the rules are right.', mood: 'defeated' });
          return true;
        case 'tap:plant':
          api.say('The plant drinks decaf. We don\'t talk about it.', 'neutral');
          return true;
      }
      return false;
    },

    solution: [{ hold: ['brew', 3000] }, { tap: 'serve' }],
    alternatives: { topUp: [{ hold: ['brew', 1500] }, { hold: ['brew', 1500] }, { tap: 'serve' }] },
    checks: [
      { name: 'fill to the brim', steps: [{ hold: ['brew', 4500] }], expect: 'fail' },
      { name: 'serve it empty', steps: [{ tap: 'serve' }], expect: 'nope' },
      { name: 'serve half a coffee', steps: [{ hold: ['brew', 1200] }, { tap: 'serve' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
