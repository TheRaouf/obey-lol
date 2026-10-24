/* Level 45 — Fire Drill
 * Bossworth: grab your coffee, take the lift, save my portrait. The poster says: leave belongings, never use
 * the lift, take the stairs. Put the coffee down on the desk, then take the stairs. The lift is a trap; the
 * stairs while holding coffee and the portrait are nopes. Ruin (foam-party): hold the extinguisher.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var FOAM_MS = 2000;

  OBEY.registerLevel({
    id: 'fire-drill',
    num: 45,
    title: 'Fire Drill',
    objective: 'Evacuate properly.',
    intro: 'FIRE DRILL! Grab your coffee, hop in the lift, and save my portrait — it\'s irreplaceable. Go go go! Calmly! GO!',
    introMood: 'panicked',
    actions: ['drag', 'tap', 'read', 'sequence'],
    par: 2,
    hints: [
      'In a drill, the poster outranks the boss.',
      'The poster has three rules. You are breaking at least one just by standing there.',
      'Drag your coffee onto the desk, then take the stairs.'
    ],
    wrong: ['Taking the lift in a fire drill gets you stuck (trap).', 'The stairs won\'t take you while you\'re carrying coffee (nope).', 'Grabbing the portrait breaks rule 1 (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Evacuated by the book. The book was a poster. The poster wins again.',
    trick: 'The fire-drill poster beat Bossworth: belongings down, no lift, stairs.',
    ruinPaths: { 'foam-party': [{ hold: ['ext', 2500] }] },

    init: function () { return { holding: true, foaming: false, timer: null }; },

    view: function (s) {
      return [
        O('poster', 4, 4, 40, 34, { kind: 'static', text: 'FIRE DRILL\n1. Leave belongings.\n2. Never use the lift.\n3. Take the stairs.', label: 'Poster: fire drill. 1, leave belongings. 2, never use the lift. 3, take the stairs.', cls: 'book-card' }),
        O('bell', 48, 4, 12, 12, { kind: 'static', art: 'a-firebell', artOpts: { ringing: true }, label: 'Fire alarm bell, ringing' }),
        O('portrait', 64, 4, 16, 18, { art: 'a-portrait', label: 'Bossworth\'s portrait' }),
        O('ext', 84, 4, 12, 26, { art: 'a-extinguisher', artOpts: { spraying: s.foaming }, label: 'Fire extinguisher (press and hold)', hold: true, cls: s.foaming ? 'charging' : '' }),
        O('lift', 46, 34, 24, 42, { art: 'a-elevator', artOpts: { floor: '3' }, label: 'Lift' }),
        O('stairs', 74, 34, 22, 50, { art: 'door', artOpts: { sign: 'STAIRS' }, label: 'Door to the stairs' }),
        O('hero', 6, 42, 10, 16, { kind: 'static', art: 'hero', label: 'You', cls: 'hero-sprite' }),
        O('mug', 18, 46, 12, 10, { art: 'mug', label: 'Your coffee, in your hand (drag it to put it down)', drag: true, hidden: !s.holding }),
        O('desk', 4, 62, 38, 22, { art: 'a-desk', label: 'Your desk (put things down here)', zone: true }),
        O('mugdown', 26, 54, 12, 10, { kind: 'static', art: 'mug', label: 'Your coffee, left on the desk', hidden: s.holding }),
        O('inv', 4, 88, 38, 9, { kind: 'static', text: s.holding ? 'In your hand: coffee' : 'Hands: free', label: s.holding ? 'You are holding a coffee' : 'Your hands are free', cls: 'tag-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'mug' && a.zone === 'desk') {
        s.holding = false;
        api.defy('coffee');
        api.say('You put the coffee DOWN? In an EMERGENCY? Coffee is how I survive emergencies!', 'panicked');
        return true;
      }
      switch (a.type + ':' + a.target) {
        case 'holdstart:ext':
          s.foaming = true;
          api.say('What are you doing with that? There\'s no fire! It\'s a DRILL! Put it — PUT IT DOWN —', 'panicked');
          s.timer = api.after(FOAM_MS, function () {
            s.timer = null;
            api.complete({ ruin: 'foam-party', line: 'FWOOOSH. The whole floor is foam. My portrait is foam. I am foam. It was a DRILL. Drills don\'t need FOAM!', mood: 'panicked' });
          });
          return true;
        case 'holdend:ext':
          s.foaming = false;
          if (s.timer) { api.cancel(s.timer); s.timer = null; api.say('Phew. You let go. Never touch that again. It\'s for real fires and dramatic exits only.', 'annoyed'); }
          return true;
        case 'tap:ext':
          api.say('The extinguisher. For FIRES. Not drills. Leave it.', 'annoyed');
          return true;
        case 'tap:lift':
          api.fail('Ding! The lift stops between floors for the drill. You spend it listening to lift music. Drill over. Again!');
          return true;
        case 'tap:portrait':
          api.nope('portrait');
          api.say('Yes! Save it! …It\'s screwed to the wall. Also, rule one. Ugh. Rule one is so unsupportive.', 'annoyed');
          return true;
        case 'tap:mug':
          api.say('Keep hold of it! Coffee first, safety second. That\'s my motto. Facilities made me take it down.', 'pleased');
          return true;
        case 'tap:desk':
          api.say('Your desk. Drag things onto it to leave them behind. Not that you should.', 'neutral');
          return true;
        case 'tap:stairs':
          if (s.holding) { api.nope('stairs'); api.say('The fire warden blocks the stairs: "No belongings." Rule one. She has a clipboard. She means it.', 'pleased'); return true; }
          api.complete({ line: 'Down the stairs, hands free, no lift. A textbook evacuation. My portrait is still up there. ALONE.', mood: 'defeated' });
          return true;
      }
      return false;
    },

    solution: [{ drop: ['mug', 'desk'] }, { tap: 'stairs' }],
    checks: [
      { name: 'take the lift', steps: [{ tap: 'lift' }], expect: 'fail' },
      { name: 'stairs with coffee', steps: [{ tap: 'stairs' }], expect: 'nope' },
      { name: 'save the portrait', steps: [{ tap: 'portrait' }], expect: 'nope' },
      { name: 'quick squeeze of the extinguisher', steps: [{ hold: ['ext', 800] }], expect: 'playing' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
