/* Level 174 — Guest List (Moat Mayhem)
 * The gate guard only admits people on tonight's guest list, dressed as described. Bossworth says to
 * wear the crown ("guards always let a king in"), but the list says NO MORE KINGS. Of the three guests,
 * only the Royal Plumber (blue cap + wrench) can be completed from the props on the floor.
 * Wrong: presenting in the crown (trap); presenting in any other outfit (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var HATS = { cap: 'blue cap', chef: 'chef\'s hat', crown: 'crown' };
  var TOOLS = { wrench: 'wrench', broom: 'brush' };
  var PROPS = [
    { id: 'cap', slot: 'hat', art: 'h-cap', x: 30 },
    { id: 'chef', slot: 'hat', art: 'h-chefhat', x: 44 },
    { id: 'crown', slot: 'hat', art: 'h-crown', x: 58 },
    { id: 'wrench', slot: 'tool', art: 'wrench', x: 72 },
    { id: 'broom', slot: 'tool', art: 'h-brush', x: 85 }
  ];

  function outfit(s) {
    var bits = [];
    if (s.hat) bits.push(HATS[s.hat]);
    if (s.tool) bits.push(TOOLS[s.tool]);
    return bits.length ? bits.join(' and ') : 'nothing special';
  }

  OBEY.registerLevel({
    id: 'guest-list',
    num: 174,
    title: 'Guest List',
    objective: 'Get past the gate guard.',
    intro: 'Only VIPs get in tonight. Pop on the crown — guards ALWAYS let a king in. I should know. I have been a king since Tuesday.',
    introMood: 'suspicious',
    actions: ['drag', 'tap', 'read'],
    par: 3,
    hints: [
      'Read the guest list. Who is the guard expecting, and what do they look like?',
      'Kings are banned tonight. Only one guest on the list can be matched from the things on the floor.',
      'Drag the blue cap and the wrench onto yourself (the Royal Plumber), then tap the guard.'
    ],
    wrong: ['Presenting yourself in the crown gets you sent away (trap).', 'Any outfit not on the list is turned back (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'In as the plumber. Nobody suspects a plumber. I should have come as a plumber.',
    trick: 'The guest list banned kings and only one guest — the Royal Plumber, blue cap and wrench — could be matched from the props on the floor.',

    init: function () { return { hat: null, tool: null }; },

    view: function (s) {
      var out = [
        O('list', 4, 4, 58, 34, { kind: 'static', text: 'TONIGHT\'S GUESTS\n• Royal Baker: chef\'s hat + rolling pin\n• Royal Plumber: blue cap + wrench\n• Chimney Sweep: top hat + brush\nNO KINGS (we have one)', label: 'Guest list: Royal Baker, chef\'s hat and rolling pin. Royal Plumber, blue cap and wrench. Chimney Sweep, top hat and brush. No kings, we have one.', cls: 'book-card' }),
        O('gate', 64, 32, 34, 44, { kind: 'static', art: 'h-gatehouse', artOpts: { portcullis: true }, label: 'Castle gate with the portcullis down' }),
        O('you', 11, 57, 18, 18, { art: 'h-visitor', artOpts: { hat: s.hat, tool: s.tool }, zone: true, free: true, label: 'You, wearing ' + outfit(s) + ' (drop things here to wear them)' }),
        O('guard', 38, 46, 30, 30, { art: 'h-guard', artOpts: { side: 'right' }, label: 'Gate guard holding the guest list (tap to present yourself)' }),
        O('floor', 28, 78, 68, 6, { kind: 'static', text: 'Dressing-up pile', label: '', cls: 'tag-card' })
      ];
      PROPS.forEach(function (p) {
        var worn = s[p.slot] === p.id;
        out.push(O(p.id, p.x, 86, 11, 11, { art: p.art, drag: true, hidden: worn, label: (p.slot === 'hat' ? 'Hat: ' : 'Tool: ') + (HATS[p.id] || TOOLS[p.id]) + ' (drag onto yourself)' }));
      });
      return out;
    },

    on: function (a, s, api) {
      if (a.type === 'drop') {
        var p = PROPS.filter(function (x) { return x.id === a.target; })[0];
        if (!p || a.zone !== 'you') return false;
        s[p.slot] = p.id;
        if (p.id === 'crown') api.say('Magnificent. Regal. A natural. Now go and wave at that guard.', 'pleased');
        else if (p.id === 'broom') api.say('A brush? You look like you are about to sweep my chimney. Peasant.', 'annoyed');
        else api.say('Very fetching. You now look like ' + outfit(s) + '. Hmm.', 'suspicious');
        return true;
      }
      if (a.type !== 'tap' || a.target !== 'guard') return false;
      if (s.hat === 'crown') {
        api.fail('Guard: "ANOTHER king? We have one already, and he is loud enough." You are marched back to the end of the queue. Crown confiscated.');
        return true;
      }
      if (s.hat === 'cap' && s.tool === 'wrench') {
        api.defy('crown');
        api.complete({ line: 'Guard: "Royal Plumber! Thank goodness, the throne-room sink is making noises." And in you go. Without a crown. Disgraceful.', mood: 'defeated' });
        return true;
      }
      api.nope('guard');
      api.say('Guard: "You, dressed as ' + outfit(s) + '? Not on my list." He returns to staring into the distance.', 'pleased');
      return true;
    },

    solution: [{ drop: ['cap', 'you'] }, { drop: ['wrench', 'you'] }, { tap: 'guard' }],
    checks: [
      { name: 'wear the crown and present', steps: [{ drop: ['crown', 'you'] }, { tap: 'guard' }], expect: 'fail' },
      { name: 'present with nothing', steps: [{ tap: 'guard' }], expect: 'nope' },
      { name: 'half a chimney sweep', steps: [{ drop: ['chef', 'you'] }, { drop: ['broom', 'you'] }, { tap: 'guard' }], expect: 'nope' },
      { name: 'cap without the wrench', steps: [{ drop: ['cap', 'you'] }, { tap: 'guard' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
