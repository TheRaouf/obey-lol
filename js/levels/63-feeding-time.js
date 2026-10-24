/* Level 63 — Feeding Time
 * Three pets (cat, dog, tortoise), three bowls labelled only by NAME, three dinners. Bossworth "knows"
 * Biscuit is a cat because it sounds like a cat name. The pet-sitting notes say Biscuit is NOT the cat and
 * Pickle is the slowest pet. So Pickle = tortoise (lettuce), Biscuit = dog (bone), Noodle = cat (fish).
 * Wrong: a wrong dinner in a bowl (trap); a second dinner in a full bowl, or feeding Bossworth (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var BOWLS = [{ id: 'bBiscuit', name: 'Biscuit', want: 'bone', x: 4, color: '#3a86ff' }, { id: 'bNoodle', name: 'Noodle', want: 'fish', x: 36, color: '#ff77b4' }, { id: 'bPickle', name: 'Pickle', want: 'lettuce', x: 68, color: '#2bc46f' }];
  var FOODS = [{ id: 'fish', art: 'fish', x: 6, label: 'Fish dinner' }, { id: 'bone', art: 'b-bone', x: 38, label: 'A big bone' }, { id: 'lettuce', art: 'b-lettuce', x: 70, label: 'Lettuce leaves' }];
  var WHO = { Biscuit: 'the dog', Noodle: 'the cat', Pickle: 'the tortoise' };

  OBEY.registerLevel({
    id: 'feeding-time',
    num: 63,
    title: 'Feeding Time',
    objective: 'Put the right dinner in each named bowl.',
    intro: 'Feeding time! Biscuit is obviously the cat — Biscuit is a cat name — so fish goes in Biscuit\'s bowl. And Pickle loves a bone. I\'m great with pets. They adore me. From a distance.',
    introMood: 'pleased',
    actions: ['drag', 'logic', 'read'],
    par: 3,
    hints: [
      'The bowls only have names. Use the pet-sitting notes to work out which pet is which.',
      'Pickle is the slowest pet, so Pickle is the tortoise. Biscuit isn\'t the cat, so Biscuit is the dog.',
      'Bone in Biscuit\'s bowl, fish in Noodle\'s bowl, lettuce in Pickle\'s bowl.'
    ],
    wrong: ['A wrong dinner in a bowl causes a pet riot (trap).', 'A second dinner in a full bowl is refused (nope).', 'Bossworth won\'t eat pet food (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Three full pets, zero bitten narrators. A personal best.',
    trick: 'Names don\'t tell you species; the notes did — Pickle is the slow tortoise, so Biscuit (not the cat) is the dog.',
    narratorZone: true,

    init: function () { return { fed: {} }; },

    view: function (s) {
      var objs = [
        O('cat', 4, 3, 26, 22, { kind: 'static', art: 'cat', label: 'A cat, purring' }),
        O('dog', 37, 3, 26, 22, { kind: 'static', art: 'b-dog', label: 'A dog, wagging' }),
        O('tortoise', 70, 5, 26, 20, { kind: 'static', art: 'b-tortoise', label: 'A tortoise, taking its time' }),
        O('notes', 4, 27, 92, 18, { kind: 'static', text: 'Pet-sitting notes: Biscuit is NOT the cat. Pickle is the slowest pet in the house. Cats eat fish, dogs eat bones, tortoises eat lettuce.', label: 'Pet-sitting notes: Biscuit is not the cat. Pickle is the slowest pet. Cats eat fish, dogs bones, tortoises lettuce.', cls: 'honest-card' })
      ];
      BOWLS.forEach(function (b) {
        var f = s.fed[b.id];
        objs.push(O(b.id, b.x, 48, 28, 17, { art: 'b-bowl', artOpts: { food: f, color: b.color }, zone: true, free: true, label: b.name + '\'s bowl' + (f ? ', full of ' + f : ', empty') }));
        objs.push(O('tag' + b.name, b.x + 4, 66, 20, 8, { kind: 'static', text: b.name, label: '', cls: 'plaque-card' }));
      });
      FOODS.forEach(function (f) {
        var used = Object.keys(s.fed).some(function (k) { return s.fed[k] === f.id; });
        objs.push(O(f.id, f.x, 79, 24, 16, { art: f.art, drag: true, hidden: used, label: f.label + ' (drag it to a bowl)' }));
      });
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap' && /^b[A-Z]/.test(a.target)) { api.say('A bowl. With a name on it. Names are very informative. Biscuit: cat. Obviously.', 'pleased'); return true; }
      if (a.type !== 'drop') return false;
      var food = FOODS.filter(function (f) { return f.id === a.target; })[0];
      if (!food) return false;
      if (a.zone === 'narrator') { api.nope(); api.say('I am NOT a pet. I am a narrator. Narrators eat… also not that.', 'annoyed'); return true; }
      var bowl = BOWLS.filter(function (b) { return b.id === a.zone; })[0];
      if (!bowl) return true;
      if (s.fed[bowl.id]) { api.nope(); api.say(bowl.name + '\'s bowl is already full. Even pets have portion control. Some pets.', 'neutral'); return true; }
      if (bowl.want !== food.id) {
        api.fail('You put ' + food.label.toLowerCase() + ' in ' + bowl.name + '\'s bowl. ' + bowl.name + ' (' + WHO[bowl.name] + ') stares at you in betrayal. A pet riot ensues. Bowls emptied — read the notes!');
        return true;
      }
      s.fed[bowl.id] = food.id;
      if (Object.keys(s.fed).length === 3) {
        api.defy('biscuit');
        api.complete({ line: 'Biscuit is a DOG? With a name like that? This house is a lie. A well-fed, happy lie.', mood: 'defeated' });
      } else api.say(bowl.name + ' is… happy with that? Are you sure you read MY notes? I mean, THEIR notes.', 'suspicious');
      return true;
    },

    solution: [{ drop: ['lettuce', 'bPickle'] }, { drop: ['bone', 'bBiscuit'] }, { drop: ['fish', 'bNoodle'] }],
    checks: [
      { name: 'fish for Biscuit', steps: [{ drop: ['fish', 'bBiscuit'] }], expect: 'fail' },
      { name: 'bone for Pickle', steps: [{ drop: ['bone', 'bPickle'] }], expect: 'fail' },
      { name: 'feed Bossworth', steps: [{ drop: ['bone', 'narrator'] }], expect: 'nope' },
      { name: 'double dinner', steps: [{ drop: ['lettuce', 'bPickle'] }, { drop: ['fish', 'bPickle'] }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
