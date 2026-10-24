/* Level 94 — Fire Formula
 * A bin fire. Bossworth says to throw OXYGEN on it (fire loves oxygen: trap). The recipe card on
 * the wall says WATER = H + H + O. Drop two hydrogens and one oxygen into the flask, then pour the
 * finished water on the fire. Sodium or carbon in the flask fizzles (nope, flask tips out).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var JARS = [
    { id: 'H', name: 'Hydrogen', color: '#bde8ff' },
    { id: 'O', name: 'Oxygen', color: '#ff9ec4' },
    { id: 'Na', name: 'Sodium', color: '#e9e6f0' },
    { id: 'C', name: 'Carbon', color: '#58607e' }
  ];

  OBEY.registerLevel({
    id: 'fire-formula',
    num: 94,
    title: 'Fire Formula',
    objective: 'Put out the bin fire.',
    intro: 'Small fire in the lab. Totally under control. Throw the OXYGEN on it. Oxygen is basically fresh air, and fresh air calms everybody down.',
    introMood: 'panicked',
    actions: ['drag', 'recipe'],
    par: 4,
    hints: [
      'Fire needs oxygen to burn. What puts fires out?',
      'The recipe card tells you how to make water from the jars.',
      'Drag Hydrogen, Hydrogen and Oxygen into the flask, then drag the water onto the fire.'
    ],
    wrong: ['Oxygen or hydrogen thrown on the fire makes it worse (trap).', 'Sodium or carbon in the flask fizzles and the flask is tipped out (nope).', 'Too much of an element spoils the mix (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Fire out. Lab damp. Narrator damper.',
    trick: 'Oxygen feeds fires; the recipe card showed how to build water from two hydrogens and one oxygen instead.',

    init: function () { return { H: 0, O: 0, water: false }; },

    view: function (s) {
      var mix = s.water ? 'Flask: WATER (H₂O)' : (s.H || s.O ? 'Flask: ' + (s.H ? s.H + '×H ' : '') + (s.O ? s.O + '×O' : '') : 'Flask: empty');
      var objs = [
        O('bench', 4, 54, 92, 21, { kind: 'static', art: 'table', artOpts: { tall: true }, label: 'Lab bench' }),
        O('recipe', 4, 4, 52, 14, { kind: 'static', text: 'WATER = H + H + O', label: 'Recipe card: water equals hydrogen plus hydrogen plus oxygen', cls: 'sign-card' }),
        O('fire', 66, 23, 30, 40, { art: 'd-fire', label: 'Bin fire', zone: true }),
        O('flask', 22, 25, 30, 36, { art: 'd-flask', artOpts: { empty: !s.water && !s.H && !s.O, color: s.water ? '#3ec1ff' : '#e9e6f0', bubbling: !s.water && (s.H + s.O) > 0 }, label: s.water ? 'Flask full of water (drag it)' : 'Mixing flask (drop elements in)', zone: !s.water, drag: s.water, cls: s.water ? 'pop-in' : '' }),
        O('mix', 14, 62, 46, 9, { kind: 'static', text: mix, label: mix, cls: 'tag-card' })
      ];
      JARS.forEach(function (j, i) {
        objs.push(O('jar' + j.id, 4 + i * 24, 76, 20, 20, { art: 'd-jar', artOpts: { sym: j.id, color: j.color }, label: j.name + ' jar (' + j.id + ')', drag: true }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && a.target === 'fire') {
        api.nope();
        api.say('Don\'t pat it. It\'s a fire, not a puppy.', 'annoyed');
        return true;
      }
      if (a.type !== 'drop') return false;
      if (a.target === 'flask') {
        if (a.zone === 'fire') {
          api.defy('oxygen');
          api.complete({ line: 'Psssshhh. Out. With WATER. Made from the recipe. On the wall. That I put there. Ugh.', mood: 'defeated' });
        } else api.say('You set the water down. The fire carries on, unbothered.', 'neutral');
        return true;
      }
      var m = /^jar(H|O|Na|C)$/.exec(a.target);
      if (!m) return false;
      var el = m[1];
      if (a.zone === 'fire') {
        if (el === 'O') api.fail('WHOOMPH! Fire LOVES oxygen. It\'s now a much bigger, much happier fire. Sprinklers on. Start again.');
        else if (el === 'H') api.fail('BANG! Hydrogen is flammable. Very. My eyebrows are on the ceiling. Start again.');
        else if (el === 'Na') api.fail('Sodium on a fire: sparkly, crackly, terrible. The sprinklers win. Start again.');
        else { api.nope(); api.say('Carbon. You fed the fire a charcoal snack. It says thank you.', 'pleased'); }
        return true;
      }
      if (a.zone !== 'flask' || s.water) { api.say('The jar goes back on the bench.', 'neutral'); return true; }
      if (el === 'Na' || el === 'C') {
        s.H = 0; s.O = 0;
        api.nope();
        api.say(el === 'Na' ? 'Sodium in the mix? FIZZ. You tip the flask out, quickly.' : 'Carbon? That\'s not in the recipe. Grey sludge. Tipped out.', 'suspicious');
        return true;
      }
      if ((el === 'H' && s.H >= 2) || (el === 'O' && s.O >= 1)) {
        s.H = 0; s.O = 0;
        api.nope();
        api.say('Too much ' + (el === 'H' ? 'hydrogen' : 'oxygen') + '! The recipe was very specific. Flask tipped out.', 'pleased');
        return true;
      }
      s[el]++;
      if (s.H === 2 && s.O === 1) {
        s.water = true;
        api.say('It made WATER? From the jars? That recipe was decorative!', 'surprised');
      } else api.say(el === 'O' ? 'Oxygen in a flask? Wasteful. The fire wanted that.' : 'Hydrogen. Flighty little thing.', 'suspicious');
      return true;
    },

    solution: [{ drop: ['jarH', 'flask'] }, { drop: ['jarH', 'flask'] }, { drop: ['jarO', 'flask'] }, { drop: ['flask', 'fire'] }],
    checks: [
      { name: 'oxygen on the fire is a trap', steps: [{ drop: ['jarO', 'fire'] }], expect: 'fail' },
      { name: 'sodium in the flask is a nope', steps: [{ drop: ['jarNa', 'flask'] }], expect: 'nope' },
      { name: 'three hydrogens is a nope', steps: [{ drop: ['jarH', 'flask'] }, { drop: ['jarH', 'flask'] }, { drop: ['jarH', 'flask'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
