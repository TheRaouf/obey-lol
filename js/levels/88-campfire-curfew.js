/* Level 88 — Campfire Curfew
 * Bossworth: just blow it out like a birthday candle. Ranger sign: DROWN, STIR, FEEL.
 * Solution: drag the water bucket onto the fire, tap the stick to stir, hold your hand above the ashes.
 * Wrong: blowing on it (trap), feeling before drowning (trap), stirring flames (nope), skipping the stir (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FEEL_MS = 1500;

  OBEY.registerLevel({
    id: 'campfire-curfew',
    num: 88,
    title: 'Campfire Curfew',
    objective: 'Put the campfire out properly before bed.',
    intro: 'Lights out, campers! Just blow on the fire like a birthday candle. One big puff! And ignore the ranger\'s sign. Rangers love long words like "extinguish". Show-offs.',
    introMood: 'panicked',
    actions: ['drag', 'tap', 'hold', 'sequence'],
    par: 3,
    hints: [
      'The ranger\'s sign has three steps, in order.',
      'Drown it with the bucket first, then stir, then feel for heat.',
      'Drag the bucket onto the fire, tap the stick, then press and hold "Feel for heat".'
    ],
    wrong: ['Blowing on a fire makes it bigger (trap).', 'Feeling for heat before drowning it burns your hand (trap).', 'Stirring live flames just pokes the fire (nope).', 'Skipping the stir leaves hot embers underneath (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Cold, wet, stirred and checked. A passing ranger gives you a sticker.',
    trick: 'The ranger\'s three steps beat one big puff: drown, stir, then feel.',

    init: function () { return { drowned: false, stirred: false, feeling: false, timer: null }; },

    view: function (s) {
      var state = !s.drowned ? 'lit' : (s.stirred ? 'cold' : 'smoke');
      return [
        O('sign', 4, 3, 44, 26, { kind: 'static', text: 'RANGER SAYS:\n1. DROWN it\n2. STIR it\n3. FEEL for heat', label: 'Ranger sign: 1, drown it. 2, stir it. 3, feel for heat.', cls: 'plaque-card' }),
        O('tent', 70, 4, 26, 24, { kind: 'static', art: 'c-tent', label: 'Your tent' }),
        O('fire', 32, 32, 34, 34, { art: 'c-campfire', artOpts: { state: state }, label: !s.drowned ? 'Campfire, still burning (drop zone)' : (s.stirred ? 'Soggy, stirred ashes' : 'Drowned fire, still steaming'), zone: true, free: true }),
        O('blow', 70, 40, 26, 12, { text: 'Blow it out', label: 'Blow on the fire like a candle', cls: 'btn-card ghost' }),
        O('bucket', 6, 70, 16, 18, { art: 'bucket', label: 'Bucket of water (drag it)', drag: true, hidden: s.drowned }),
        O('stick', 26, 76, 24, 12, { art: 'c-stick', label: 'Stirring stick (tap to stir)' }),
        O('feel', 54, 78, 42, 14, { text: s.feeling ? 'Feeling…' : 'Feel for heat (hold)', label: 'Hold your hand above the fire to feel for heat (press and hold)', hold: true, cls: 'hold-btn' + (s.feeling ? ' charging' : '') })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'bucket') {
        if (a.zone === 'fire') {
          s.drowned = true;
          api.defy('drown');
          api.say('HISSSS. You DROWNED it? It was a candle-sized job! …Fine. Clouds of steam. Very dramatic.', 'annoyed');
        } else api.say('You set the bucket down. The fire crackles at it, unbothered.', 'neutral');
        return true;
      }
      if (a.type === 'tap' && a.target === 'fire') { api.say(s.drowned ? 'It hisses and grumbles like me on a Monday.' : 'Crackle, pop. Cosy. Dangerous. Cosy.', 'neutral'); return true; }
      if (a.type === 'tap' && a.target === 'blow') {
        if (!s.drowned) api.fail('PHWOOOO! The fire gets three times bigger and toasts every marshmallow in the county. Bossworth stamps it out in a panic. Start again.');
        else { api.nope('blow'); api.say('You blow on wet ash. Now your face is grey. Very distinguished.', 'laughing'); }
        return true;
      }
      if (a.type === 'tap' && a.target === 'stick') {
        if (!s.drowned) { api.nope('stick'); api.say('Stirring live flames? That\'s just poking a fire. Sparks everywhere. Water first, surely. Not that I\'m reading the sign.', 'panicked'); }
        else if (s.stirred) { api.nope('stick'); api.say('It\'s stirred. Any more and it\'s soup.', 'neutral'); }
        else { s.stirred = true; api.say('Stir, stir. Hidden embers fizzle out underneath. Fine. FINE.', 'annoyed'); }
        return true;
      }
      if (a.target !== 'feel') return false;
      if (a.type === 'tap') { api.nope('feel'); api.say('A quick wave doesn\'t tell you anything. Hold your hand there.', 'neutral'); return true; }
      if (a.type === 'holdstart') {
        if (!s.drowned) { api.fail('OUCH! It\'s a FIRE. Hands and flames: not friends. Run your hand under the bucket and start again.'); return true; }
        s.feeling = true;
        s.timer = api.after(FEEL_MS, function () {
          s.timer = null; s.feeling = false;
          if (!s.stirred) {
            api.nope('feel');
            api.say('Still warm underneath! Hot embers are hiding under the soggy bits. The sign said something about stirring, apparently.', 'suspicious');
          } else {
            api.complete({ line: 'Stone cold. Drowned, stirred, felt. The ranger would be proud. I am NOT, because I said BLOW, but the forest is quite pleased.', mood: 'defeated' });
          }
        });
        return true;
      }
      if (a.type === 'holdend') {
        s.feeling = false;
        if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('Hand back already? Hold it there a moment to really feel.', 'neutral'); }
        return true;
      }
      return false;
    },

    solution: [{ drop: ['bucket', 'fire'] }, { tap: 'stick' }, { hold: ['feel', 1700] }],
    checks: [
      { name: 'blow it out', steps: [{ tap: 'blow' }], expect: 'fail' },
      { name: 'feel the flames', steps: [{ hold: ['feel', 1700] }], expect: 'fail' },
      { name: 'stir the flames', steps: [{ tap: 'stick' }], expect: 'nope' },
      { name: 'skip the stir', steps: [{ drop: ['bucket', 'fire'] }, { hold: ['feel', 1700] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
