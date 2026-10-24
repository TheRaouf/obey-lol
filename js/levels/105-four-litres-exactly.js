/* Level 105 — Four Litres Exactly
 * The rocket needs exactly 4 L. You have a 5 L and a 3 L tank, a pump (fills a tank to the top)
 * and a drain (empties it). Pour tank into tank by dragging. Classic solution:
 * fill 5, 5→3, empty 3, 5→3, fill 5, 5→3 (the 5 now holds 4), load the 5 into the rocket.
 * Wrong: loading any other amount (trap), draining an empty tank (nope).
 * Ruin: drag the pump hose straight onto the rocket ("overfueled").
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var CAP = { t5: 5, t3: 3 };
  var NEED = 4;

  OBEY.registerLevel({
    id: 'four-litres-exactly',
    num: 105,
    title: 'Four Litres Exactly',
    objective: 'Load exactly 4 litres of fuel into the rocket.',
    intro: 'The rocket needs EXACTLY 4 litres. I only own a 5-litre and a 3-litre tank, so it\'s impossible. Just fill the 5 and pour in "four-ish". Ish is a unit.',
    introMood: 'neutral',
    actions: ['drag', 'logic'],
    par: 7,
    hints: [
      'Pouring one tank into the other stops when the receiving tank is full. Use that.',
      'Fill the 5 and pour it into the 3: 2 litres stay behind. Keep that 2 in the 3-litre tank and top up again.',
      'Fill 5, pour 5→3, drain 3, pour 5→3, fill 5, pour 5→3. The 5 now holds 4: drag it onto the rocket.'
    ],
    wrong: ['Loading any amount other than 4 litres makes the rocket sputter (trap).', 'Draining an empty tank does nothing (nope).', 'Hosing the pump straight into the rocket is a ruin.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Four litres on the dot. Ish has been abolished.',
    trick: 'Pouring the 5 into the 3 measures out exact remainders, so a few careful pours leave exactly 4 litres in the big tank.',

    init: function () { return { t5: 0, t3: 0 }; },

    view: function (s) {
      return [
        O('pump', 4, 4, 18, 24, { art: 'd-pump', label: 'Fuel pump: fills a tank to the top', zone: true }),
        O('hose', 26, 8, 18, 15, { art: 'd-hose', label: 'Pump hose (drag it)', drag: true }),
        O('rocket', 70, 2, 26, 40, { art: 'd-rocket', artOpts: { fuel: 0 }, label: 'Rocket, fuel tank empty', zone: true }),
        O('need', 68, 45, 30, 14, { kind: 'static', text: 'Needs 4 L\nEXACTLY', label: 'The rocket needs exactly 4 litres', cls: 'panel-card' }),
        O('t5', 26, 30, 16, 28, { art: 'd-tank', artOpts: { cap: 5, level: s.t5 }, label: '5 litre tank holding ' + s.t5 + ' litres (drag it)', drag: true, zone: true }),
        O('t5tag', 18, 61, 25, 9, { kind: 'static', text: '5 L tank: ' + s.t5 + ' L', label: '', cls: 'tag-card' }),
        O('t3', 46, 30, 16, 28, { art: 'd-tank', artOpts: { cap: 3, level: s.t3 }, label: '3 litre tank holding ' + s.t3 + ' litres (drag it)', drag: true, zone: true }),
        O('t3tag', 45, 61, 25, 9, { kind: 'static', text: '3 L tank: ' + s.t3 + ' L', label: '', cls: 'tag-card' }),
        O('drain', 4, 76, 26, 18, { art: 'd-drain', label: 'Drain: empties a tank', zone: true }),
        O('how', 34, 76, 62, 20, { kind: 'static', text: 'Drag a tank onto the pump to fill it, onto the drain to empty it, or onto the other tank to pour.', label: 'How to: drag a tank onto the pump to fill it, onto the drain to empty it, or onto the other tank to pour.', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'tap') {
        if (a.target === 'rocket') { api.nope(); api.say('Tapping it won\'t fuel it. Believe me, I\'ve tried.', 'annoyed'); return true; }
        return false;
      }
      if (a.type !== 'drop') return false;
      if (a.target === 'hose') {
        if (a.zone === 'rocket') {
          api.complete({ ruin: 'overfueled', line: 'You hosed in the ENTIRE pump. The rocket launched itself through the roof, taking the door with it. The exit is now "everywhere". I am furious.', mood: 'panicked' });
        } else { api.nope('hose'); api.say('The hose flops back onto the pump. It\'s had a long day.', 'neutral'); }
        return true;
      }
      var t = a.target;
      if (!CAP[t]) return false;
      var other = t === 't5' ? 't3' : 't5';
      switch (a.zone) {
        case 'pump':
          s[t] = CAP[t];
          api.say(t === 't5' ? 'Five litres! Now pour four-ish. Squint a bit.' : 'Three litres. That\'s… less than four. Bold strategy.', 'neutral');
          return true;
        case 'drain':
          if (!s[t]) { api.nope(t); api.say('You drained an empty tank. Very thorough. Very pointless.', 'pleased'); return true; }
          s[t] = 0;
          api.say('Glug glug. Fuel down the drain! Wasteful. Unless it\'s clever. Is it clever?', 'suspicious');
          return true;
        case other:
          var move = Math.min(s[t], CAP[other] - s[other]);
          if (!move) { api.nope(t); api.say(s[t] ? 'It\'s full. It cannot get fuller. That\'s what full means.' : 'Pouring nothing into something. Philosophical.', 'pleased'); return true; }
          s[t] -= move; s[other] += move;
          api.say('Pour, pour… ' + s.t5 + ' in the big one, ' + s.t3 + ' in the small one. Are you doing MATHS?', 'suspicious');
          return true;
        case 'rocket':
          if (s[t] === NEED) {
            api.defy('fourish');
            api.complete({ line: 'Exactly four litres. With a five and a three. That\'s… impossible. I said so. Out loud. Ugh.', mood: 'defeated' });
          } else if (!s[t]) {
            api.nope(t);
            api.say('An empty tank. The rocket is not impressed.', 'pleased');
          } else {
            api.fail(s[t] + ' litres? The rocket coughs, sputters and does a sad little hop. EXACTLY four, please. Start again.');
          }
          return true;
      }
      api.say('You set the tank down. Nothing spills. Yet.', 'neutral');
      return true;
    },

    solution: [{ drop: ['t5', 'pump'] }, { drop: ['t5', 't3'] }, { drop: ['t3', 'drain'] }, { drop: ['t5', 't3'] }, { drop: ['t5', 'pump'] }, { drop: ['t5', 't3'] }, { drop: ['t5', 'rocket'] }],
    alternatives: {
      'small-tank-route': [{ drop: ['t3', 'pump'] }, { drop: ['t3', 't5'] }, { drop: ['t3', 'pump'] }, { drop: ['t3', 't5'] }, { drop: ['t5', 'drain'] }, { drop: ['t3', 't5'] }, { drop: ['t3', 'pump'] }, { drop: ['t3', 't5'] }, { drop: ['t5', 'rocket'] }]
    },
    ruinPaths: { overfueled: [{ drop: ['hose', 'rocket'] }] },
    checks: [
      { name: 'five-ish is a trap', steps: [{ drop: ['t5', 'pump'] }, { drop: ['t5', 'rocket'] }], expect: 'fail' },
      { name: 'draining an empty tank is a nope', steps: [{ drop: ['t3', 'drain'] }], expect: 'nope' },
      { name: 'hose elsewhere is a nope', steps: [{ drop: ['hose', 'drain'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
