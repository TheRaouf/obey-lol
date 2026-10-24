/* Level 173 — The Drawbridge (Moat Mayhem)
 * King Bossworth's castle. The drawbridge is held UP by a counterweight basket of rocks.
 * Bossworth says to add MORE rocks. The plaque and tags say the basket holds the bridge up and the
 * bridge weighs 3 rocks, so taking rocks OUT (tap the basket twice: 4 → 2) lets it come down.
 * Wrong: swimming the moat (trap); dropping a rock into the basket (nope, bridge rises); bridge while up (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BRIDGE = 3;

  function state(n) { return n < BRIDGE ? 'down' : (n === BRIDGE ? 'half' : 'up'); }

  OBEY.registerLevel({
    id: 'the-drawbridge',
    num: 173,
    title: 'The Drawbridge',
    objective: 'Get across the moat into the castle.',
    intro: 'Welcome to the castle of KING Bossworth. Yes, king. To lower the drawbridge, pile MORE rocks in that basket. Heavier is better. Trust your king.',
    introMood: 'pleased',
    actions: ['tap', 'drag', 'count'],
    par: 3,
    hints: [
      'Read the plaque: what is the basket actually doing to the bridge?',
      'The basket keeps the bridge UP. A lighter basket lets the bridge come down. The bridge weighs 3 rocks.',
      'Tap the basket twice to lift two rocks out (4 → 2), then walk across the bridge.'
    ],
    wrong: ['Swimming the moat sends you back soggy (trap).', 'Adding a rock to the basket only lifts the bridge higher (nope).', 'The bridge cannot be crossed while it is up (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'You took rocks OUT. Of my basket. And it worked. Physics is a traitor.',
    trick: 'A counterweight holds a drawbridge up, so taking rocks out of the basket until it weighed less than the bridge let it come down.',

    init: function () { return { n: 4 }; },

    view: function (s) {
      var st = state(s.n);
      return [
        O('plaque', 4, 4, 42, 18, { kind: 'static', text: 'Counterweight basket: keeps the bridge UP', label: 'Plaque: counterweight basket, keeps the bridge up', cls: 'plaque-card' }),
        O('basket', 6, 24, 22, 32, { art: 'h-basket', artOpts: { n: s.n }, zone: true, label: 'Counterweight basket holding ' + s.n + ' rocks (tap to lift one out)' }),
        O('btag', 30, 30, 22, 13, { kind: 'static', text: 'Basket:\n' + s.n + ' rocks', label: 'Basket tag: ' + s.n + ' rocks', cls: 'tag-card' }),
        O('wtag', 50, 4, 30, 13, { kind: 'static', text: 'Bridge weighs 3 rocks', label: 'Bridge weighs 3 rocks', cls: 'tag-card' }),
        O('gate', 64, 32, 34, 44, { kind: 'static', art: 'h-gatehouse', artOpts: { open: st === 'down' }, label: st === 'down' ? 'Castle gatehouse, doors open' : 'Castle gatehouse' }),
        O('bridge', 40, 42, 34, 34, { art: 'h-bridge', artOpts: { state: st }, label: st === 'down' ? 'Drawbridge, down across the moat (tap to cross)' : (st === 'half' ? 'Drawbridge, hovering halfway' : 'Drawbridge, raised') }),
        O('moat', 40, 77, 34, 17, { art: 'water', artOpts: { edge: true }, label: 'The moat (swim across?)' }),
        O('pile', 10, 82, 16, 13, { art: 'h-rock', drag: true, label: 'A spare rock (drag it somewhere)' }),
        O('you', 24, 60, 10, 16, { kind: 'static', art: 'hero', label: 'You, on the near bank' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'pile') {
        if (a.zone !== 'basket') return false;
        if (s.n >= 6) { api.nope('basket'); api.say('The basket is full. Even I can see that.', 'annoyed'); return true; }
        s.n++;
        api.nope('basket');
        api.say(s.n > BRIDGE ? 'The chain groans and the bridge lifts even HIGHER. That is… not what I promised. Add another?' : 'Bridge… wobbles. Hmm.', 'surprised');
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'basket':
          if (s.n === 0) { api.say('The basket is empty. You can stop robbing it now.', 'annoyed'); return true; }
          s.n--;
          api.defy('rocks');
          if (s.n === BRIDGE) api.say('Basket and bridge weigh the same. It is just… hovering. Stop taking my rocks!', 'panicked');
          else if (s.n < BRIDGE) api.say('Clank… clank… THUD. The bridge is down. You took rocks OUT? That is backwards! (It is not backwards.)', 'annoyed');
          else api.say('You took a rock OUT? The basket is lighter. The bridge… creaked a bit lower. Coincidence.', 'suspicious');
          return true;
        case 'bridge':
          if (state(s.n) !== 'down') {
            api.nope(a.target);
            api.say(state(s.n) === 'half' ? 'It is hovering at a jaunty angle. You would slide straight into the moat.' : 'The bridge is UP. Walking into a wall is not a plan.', 'pleased');
            return true;
          }
          api.complete({ line: 'Across the moat and into my castle. With fewer rocks. I demand a recount of physics.', mood: 'defeated' });
          return true;
        case 'moat':
          api.fail('SPLOSH. You doggy-paddle halfway, meet a very judgemental duck, and squelch back to the start.');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'basket' }, { tap: 'basket' }, { tap: 'bridge' }],
    checks: [
      { name: 'swim the moat', steps: [{ tap: 'moat' }], expect: 'fail' },
      { name: 'add a rock like Bossworth says', steps: [{ drop: ['pile', 'basket'] }], expect: 'nope' },
      { name: 'try the raised bridge', steps: [{ tap: 'bridge' }], expect: 'nope' },
      { name: 'one rock out only balances it', steps: [{ tap: 'basket' }, { tap: 'bridge' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
