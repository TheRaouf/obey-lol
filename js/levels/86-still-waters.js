/* Level 86 — Still Waters
 * Bossworth says fish love noise: ring the bell, keep the radio on, he'll chat to them.
 * The anglers' sign says fish only bite in SILENCE. Two noise sources: the radio and Bossworth himself.
 * Solution: switch the radio off, drag the QUIET PLEASE sign onto Bossworth, wait for the float to dip, reel in.
 * Wrong: reel with no bite (nope), ring the bell (nope, scares the fish). Ruin: ring the bell five times.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var QUIET_TICKS = 3;
  var CHATTER = [
    'HELLO, FISH! Lovely day! Who\'s hungry? Come up and say hi!',
    'Did I ever tell the fish about my holiday in Brollington? I\'ll start from the beginning.',
    'Fishies! I\'m doing a little song for you! La la LAAA!',
    'Fish love a chat. It\'s well known. In my house.'
  ];

  OBEY.registerLevel({
    id: 'still-waters',
    num: 86,
    title: 'Still Waters',
    objective: 'Catch a fish.',
    intro: 'Fishing! Fish LOVE noise. Keep the radio blaring, ring my dinner bell, and I\'ll chat to them nonstop. They\'ll come flocking. Schooling. Whatever fish do. HELLO, FISH!',
    introMood: 'pleased',
    actions: ['tap', 'drag', 'wait'],
    par: 3,
    hints: [
      'Read the anglers\' sign, then check the noise meter.',
      'Two things are making noise: the radio and Bossworth. Both need to stop.',
      'Switch the radio off, drag the QUIET PLEASE sign onto Bossworth, wait for the float to dip, then reel in.'
    ],
    wrong: ['Reeling in before a bite catches nothing (nope).', 'Ringing the bell scares every fish away (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One fish, admired in total silence and gently released.',
    trick: 'Fish bite in silence. You switched off the radio and the loudest thing in the park: Bossworth.',
    narratorZone: true,

    init: function () { return { radio: true, shushed: false, quiet: 0, bite: false, bells: 0, chat: 0 }; },

    onStart: function (s, api) {
      api.every(1000, function () {
        if (!s.radio && s.shushed) { s.quiet++; if (s.quiet >= QUIET_TICKS && !s.bite) { s.bite = true; api.say('(…the float just bobbed under. I am being very quiet about it.)', 'sleep'); } }
        else s.quiet = 0;
      });
      api.every(3000, function () {
        if (s.shushed) return;
        api.say(CHATTER[s.chat % CHATTER.length], 'pleased');
        s.chat++;
      });
    },

    view: function (s) {
      var noise = s.radio && !s.shushed ? 'Noise: LOUD (radio + Bossworth)' : s.radio ? 'Noise: radio' : !s.shushed ? 'Noise: Bossworth' : 'Silence…';
      return [
        O('sign', 4, 3, 54, 16, { kind: 'static', text: 'ANGLERS: fish only bite in SILENCE', label: 'Anglers\' sign: fish only bite in silence', cls: 'sign-card' }),
        O('noise', 62, 4, 34, 14, { kind: 'static', text: noise, label: noise, cls: 'panel-card' + (!s.radio && s.shushed ? ' ok' : '') }),
        O('pond', 0, 24, 100, 46, { kind: 'static', art: 'c-pond', label: 'A calm pond' }),
        O('float', 44, 38, 12, 16, { kind: 'static', art: 'c-float', artOpts: { under: s.bite }, label: s.bite ? 'Your float has dipped under the water: a bite!' : 'Your float, bobbing on the surface' }),
        O('bell', 4, 74, 14, 16, { art: 'bell', label: 'Bossworth\'s dinner bell' }),
        O('quiet', 21, 76, 28, 14, { text: 'QUIET PLEASE', label: 'A QUIET PLEASE sign (drag it to someone noisy)', drag: true, cls: 'btn-card big', hidden: s.shushed }),
        O('reel', 52, 76, 22, 14, { text: 'Reel in', label: 'Reel in the line', cls: 'btn-card big' }),
        O('radio', 77, 72, 20, 18, { art: 'c-radio', artOpts: { on: s.radio }, label: s.radio ? 'Radio blaring polka music (tap to switch off)' : 'Radio, switched off (tap to switch on)' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'quiet') {
        if (a.zone === 'narrator') {
          s.shushed = true; s.quiet = 0;
          api.defy('shush');
          api.say('…A QUIET sign? For ME? I am the narrator. Narrating is noise. …Fine. (whispering) I will be quiet. Very, very quiet.', 'sleep');
        } else api.say('You prop the sign up for nobody. The fish can\'t read. Somebody NOISY might, though.', 'suspicious');
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'radio':
          s.radio = !s.radio; s.quiet = 0;
          if (!s.radio) api.say(s.shushed ? '(…the polka stopped. I miss it.)' : 'You switched off the POLKA? The fish were dancing! Fine, I\'ll just talk louder. FIIISH!', s.shushed ? 'sleep' : 'annoyed');
          else api.say('Polka! Yes! Fish adore an accordion.', 'pleased');
          return true;
        case 'bell':
          s.bells++; s.quiet = 0; s.bite = false;
          if (s.bells >= 5) {
            api.complete({ ruin: 'dinner-bell', line: 'DING DING DING DING DING! An enormous carp leaps out, grabs the rod and pulls ME into the pond. Technically, something was caught. It was me. I\'m wet.', mood: 'panicked' });
            return true;
          }
          api.nope('bell');
          api.say('DING DING! Dinner time, fish! …Every ripple vanishes. That\'s them coming to the table. Probably.', 'pleased');
          return true;
        case 'reel':
          if (s.bite) {
            api.complete({ line: 'A fish! A real one! In SILENCE? You made me be QUIET to catch it. I\'ve never been so effective by doing so little.', mood: 'defeated' });
          } else {
            api.nope('reel');
            api.say(s.shushed ? '(…empty hook. Too soon. Wait for the float to go under.)' : 'An empty hook and some pondweed! The fish are coming, I can hear them. Or is that me?', s.shushed ? 'sleep' : 'laughing');
          }
          return true;
      }
      return false;
    },

    solution: [{ tap: 'radio' }, { drop: ['quiet', 'narrator'] }, { wait: 3500 }, { tap: 'reel' }],
    checks: [
      { name: 'reel straight away', steps: [{ tap: 'reel' }], expect: 'nope' },
      { name: 'radio off but Bossworth chatting', steps: [{ tap: 'radio' }, { wait: 6000 }, { tap: 'reel' }], expect: 'nope' },
      { name: 'ring the bell', steps: [{ tap: 'bell' }], expect: 'nope' },
      { name: 'shushed but radio on', steps: [{ drop: ['quiet', 'narrator'] }, { wait: 6000 }, { tap: 'reel' }], expect: 'nope' },
      { name: 'waiting longer is fine', steps: [{ tap: 'radio' }, { drop: ['quiet', 'narrator'] }, { wait: 20000 }, { tap: 'reel' }], expect: 'complete' }
    ],
    ruinPaths: { 'dinner-bell': [{ tap: 'bell' }, { tap: 'bell' }, { tap: 'bell' }, { tap: 'bell' }, { tap: 'bell' }] },
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
