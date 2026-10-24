/* Level 128 — Ferris Wheel (Museum Midway)
 * You start at the top of the wheel. Bossworth: "Hop off whenever you like! Now's good!"
 * The wheel moves one car every 1.5 s; when your car reaches the platform the doors open and the
 * wheel pauses for 4.5 s. Step off then. Stepping off anywhere else: trap. Waiting longer is fine: it comes round again.
 * Ruin: pull the emergency stop, climb down the ladder, and leave Bossworth stuck in his car.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var TICK = 1500, PAUSE = 3, CX = 34, CY = 36, R = 25;
  var BOTTOM = 3;

  function pos(s, car) { return (car + s.r) % 6; }
  function atPlatform(s) { return pos(s, 0) === BOTTOM; }

  OBEY.registerLevel({
    id: 'ferris-wheel',
    num: 128,
    title: 'Ferris Wheel',
    objective: 'Get off the Ferris wheel safely.',
    intro: 'Lovely view! Hop off whenever you like. Now\'s good. Right now! The higher you hop, the better the view on the way down. Don\'t touch the emergency stop.',
    introMood: 'pleased',
    actions: ['wait', 'tap'],
    par: 1,
    hints: [
      'Watch your yellow car and the status board.',
      'The doors only open at the platform at the bottom.',
      'Wait until your car is at the platform and the board says DOORS OPEN, then step off.'
    ],
    wrong: ['Stepping off anywhere but the platform is a trap.', 'The emergency stop strands Bossworth at the top (ruin).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Feet on the ground. Narrator in the sky.',
    trick: 'The wheel always brings your car back down to the platform, so waiting for the doors beat hopping off at the top.',

    init: function () { return { r: 0, pause: 0 }; },

    onStart: function (s, api) {
      api.every(TICK, function () {
        if (s.pause > 0) { s.pause--; return; }
        s.r = (s.r + 1) % 6;
        if (atPlatform(s)) { s.pause = PAUSE; api.say('Doors open! …Boring. Stay on! One more go! Or hop off at the TOP next time, much more exciting.', 'annoyed'); }
      });
    },

    view: function (s) {
      var open = atPlatform(s);
      var p = pos(s, 0);
      var where = open ? 'DOORS OPEN!' : (p === 0 ? 'Your car: at the top' : (p < BOTTOM ? 'Your car: going down' : 'Your car: going up'));
      var out = [
        O('wheel', CX - 30, CY - 30, 60, 60, { kind: 'static', art: 'e-wheel', label: '' }),
        O('platform', CX - 12, 68, 24, 6, { kind: 'static', text: 'PLATFORM', label: 'Exit platform at the bottom of the wheel', cls: 'tag-card' })
      ];
      for (var c = 0; c < 6; c++) {
        var a = (pos(s, c) * 60 - 90) * Math.PI / 180;
        var mine = c === 0, boss = c === 3;
        out.push(O('car' + c, +(CX + R * Math.cos(a) - 6).toFixed(2), +(CY + R * Math.sin(a) - 5).toFixed(2), 12, 11, {
          kind: 'static', art: 'e-gondola', artOpts: { mine: mine, boss: boss, open: mine && open },
          label: mine ? 'Your car (yellow)' : (boss ? 'Bossworth\'s car' : '')
        }));
      }
      out.push(O('status', 68, 4, 28, 18, { kind: 'static', text: where, label: where.replace('\n', ', '), cls: 'display-card' + (open ? ' ready' : '') }));
      out.push(O('estop', 72, 28, 20, 26, { art: 'lever', label: 'Emergency stop lever' }));
      out.push(O('estopTag', 68, 55, 28, 12, { kind: 'static', text: 'EMERGENCY\nSTOP', label: '', cls: 'tag-card' }));
      out.push(O('stepoff', 66, 78, 30, 14, { text: 'Step off', label: 'Step off the Ferris wheel', cls: 'btn-card accent big' }));
      out.push(O('legend', 4, 80, 58, 12, { kind: 'static', text: 'Yellow car = you. Orange car = Bossworth.', label: '', cls: 'tag-card' }));
      return out;
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'stepoff') {
        if (atPlatform(s)) {
          api.complete({ line: 'You stepped off at the platform. Like a sensible person. Where\'s the drama? Where\'s the DANGER? …Hello? Can someone stop the wheel? I\'d like off too.', mood: 'defeated' });
        } else {
          api.fail('You step out of the car… nowhere near the platform. Cartoon physics: you hover, look down, and land back in the queue.');
        }
        return true;
      }
      if (a.target === 'estop') {
        api.complete({ ruin: 'stuck-at-the-top', line: 'EMERGENCY STOP! You climb down the service ladder and stroll off. The wheel is frozen. I am at the TOP. With a pigeon. Who is SMUG.', mood: 'panicked' });
        return true;
      }
      return false;
    },

    solution: [{ wait: 5000 }, { tap: 'stepoff' }],
    alternatives: { 'second-lap': [{ wait: 18500 }, { tap: 'stepoff' }] },
    ruinPaths: { 'stuck-at-the-top': [{ tap: 'estop' }] },
    checks: [
      { name: 'hop off at the top', steps: [{ tap: 'stepoff' }], expect: 'fail' },
      { name: 'hop off on the way down', steps: [{ wait: 3200 }, { tap: 'stepoff' }], expect: 'fail' },
      { name: 'emergency stop is a ruin', steps: [{ tap: 'estop' }], expect: 'complete' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
