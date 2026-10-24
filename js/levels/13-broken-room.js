/* Level 13 — The Broken Room
 * Environmental rule change: the controls are swapped. ◀ moves you RIGHT, ▶ moves you LEFT,
 * and DUCK makes you jump two tiles. Bossworth announces the breakage after your first move,
 * so the change is surprising but immediately understandable.
 * Floor: tiles 0..4, gap at 2, door at 4. Solution: ◀ (to 1), DUCK (jump to 3), ◀ (to 4 = door).
 * Wrong: walking into the gap drops you back to tile 0 (no full reset).
 * Secret: long-memory — open the wall panel and enter the glowing code from Level 4 (4-2-7).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var GAP = 2, DOOR = 4, CODE = '427';

  OBEY.registerLevel({
    id: 'broken-room',
    num: 13,
    title: 'The Broken Room',
    objective: 'Walk to the door on the right.',
    intro: 'Use the arrows to walk to the door. Everything works perfectly. Nothing is broken. Don\'t press DUCK — ducking is for cowards.',
    introMood: 'pleased',
    actions: ['tap', 'experiment'],
    par: 3,
    hints: [
      'The room is broken: try each button once and watch what really happens.',
      '◀ moves you right, and DUCK makes you jump over one tile.',
      'Press ◀, then DUCK over the gap, then ◀ again.'
    ],
    wrong: ['▶ walks you away from the door.', 'Stepping into the gap returns you to the start tile.'],
    secrets: ['long-memory'],
    endingNote: 'None.',
    done: 'You adapted to a broken world. Bossworth is filing a repair ticket.',

    init: function () { return { pos: 0, announced: false, panel: false, code: '', codeMsg: '', unlocked: false }; },

    view: function (s) {
      var objs = [
        O('panel', 4, 2, 27, 14, { text: s.panel ? (s.unlocked ? 'Panel: OPEN' : (s.codeMsg || ('Code: ' + (s.code || '_ _ _')))) : 'Loose wall panel', label: s.panel ? 'Wall keypad display: ' + (s.unlocked ? 'open' : (s.codeMsg || ('entered ' + (s.code.split('').join(' ') || 'nothing')))) : 'Loose wall panel', free: true, cls: 'panel-card' + (s.unlocked ? ' ok' : ''), disabled: s.panel, live: s.panel })
      ];
      for (var t = 0; t <= DOOR; t++) {
        objs.push(O('tile' + t, 2 + t * 19.2, 62, 18.6, 10, { kind: 'static', art: t === GAP ? 'gap' : 'tile', label: t === GAP ? 'Gap in the floor' : '' }));
      }
      objs.push(O('door', 2 + DOOR * 19.2 + 2, 26, 15, 36, { kind: 'static', art: 'door', artOpts: { sign: 'EXIT', open: s.pos === DOOR }, label: 'Exit door at the far right' }));
      objs.push(O('hero', 2 + s.pos * 19.2 + 3, 44, 12.6, 18, { kind: 'static', art: 'hero', label: 'You are on tile ' + (s.pos + 1) + ' of 5', live: true, cls: 'hero-sprite' }));
      // The keypad is drawn above the room (it is an overlay panel).
      if (s.panel && !s.unlocked) {
        objs.push(O('kbg', 2, 16, 58, 43, { kind: 'static', cls: 'keypad-bg' }));
        for (var d = 0; d <= 9; d++) {
          var col = d === 0 ? 1 : (d - 1) % 3, row = d === 0 ? 3 : Math.floor((d - 1) / 3);
          objs.push(O('k' + d, 4 + col * 18, 18 + row * 10, 17, 9, { text: String(d), label: 'Keypad ' + d, free: true, cls: 'btn-card key' }));
        }
        objs.push(O('kclose', 40, 48, 17, 9, { text: 'Close', label: 'Close the wall panel', free: true, cls: 'btn-card key ghost' }));
      }
      objs.push(O('left', 6, 78, 26, 16, { text: '◀ LEFT', label: 'Left arrow button' + (s.announced ? ' (actually moves right)' : ''), cls: 'btn-card big' }));
      objs.push(O('duck', 37, 78, 26, 16, { text: 'DUCK', label: 'Duck button' + (s.announced ? ' (actually jumps)' : ''), cls: 'btn-card big' }));
      objs.push(O('right', 68, 78, 26, 16, { text: 'RIGHT ▶', label: 'Right arrow button' + (s.announced ? ' (actually moves left)' : ''), cls: 'btn-card big' }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      var moved = null;
      if (a.target === 'left') moved = 1;
      if (a.target === 'right') moved = -1;
      if (a.target === 'duck') { moved = 2; api.defy('duck'); }
      if (moved !== null) {
        var target = s.pos + moved;
        var first = !s.announced;
        s.announced = true;
        if (target < 0) {
          s.pos = 0;
          api.nope();
          api.say(first ? 'You bumped the wall. Wait — you pressed RIGHT and went LEFT? Oh no. The room is BROKEN. Everything is backwards!' : 'Bonk. That\'s a wall.', 'surprised');
          return true;
        }
        target = Math.min(target, DOOR);
        if (target === GAP) {
          api.fail('Whoops — straight into the gap! *distant splash* Back to the start. Mind the hole.');
          return true;
        }
        s.pos = target;
        if (s.pos === DOOR) {
          api.complete({ line: 'You walked a broken room like it was nothing. Left is right, duck is jump, and I need a lie-down.', mood: 'defeated' });
          return true;
        }
        if (first) api.say(moved === 2 ? 'You DUCKED and… jumped?! The room is broken! Left is right, right is left, duck is jump!' : (moved === 1 ? 'You pressed LEFT and went RIGHT?! The room is broken! Everything is backwards!' : 'Huh?'), 'panicked');
        else api.say(['Steady…', 'Mind the gap!', 'Closer…'][s.pos % 3], 'suspicious');
        return true;
      }
      if (a.target === 'kclose') {
        s.panel = false;
        s.code = '';
        s.codeMsg = '';
        return true;
      }
      if (a.target === 'panel') {
        s.panel = true;
        api.say('That panel is for maintenance. You don\'t know the code. Nobody knows the code. Especially not from a dark room.', 'suspicious');
        return true;
      }
      var k = /^k(\d)$/.exec(a.target);
      if (k) {
        s.codeMsg = '';
        s.code += k[1];
        if (s.code.length === 3) {
          if (s.code === CODE) {
            s.unlocked = true;
            api.secret('long-memory');
            api.say('ACCESS GRANTED?! Behind the panel: a framed photo of me looking heroic. Put it back. Gently.', 'panicked');
          } else {
            s.codeMsg = 'DENIED';
            api.say('Access denied. Nice try. You\'d need a code you saw somewhere… dark.', 'pleased');
          }
          s.code = '';
        }
        return true;
      }
      return false;
    },

    solution: [{ tap: 'left' }, { tap: 'duck' }, { tap: 'left' }],
    secretPaths: { 'long-memory': [{ tap: 'panel' }, { tap: 'k4' }, { tap: 'k2' }, { tap: 'k7' }] }
  });
})(typeof window !== 'undefined' ? window : globalThis);
