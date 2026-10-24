/* Level 48 — Motion Sensor
 * After hours, Bossworth says keep moving or the doors lock. The security notice says the opposite: doors
 * UNLOCK once the sensor sees an empty office. Drag yourself out of the sensor's view (under the desk), wait
 * a moment, then leave. Waving shows yourself again (nope); the plant is see-through (nope).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var EMPTY_MS = 3000;

  OBEY.registerLevel({
    id: 'motion-sensor',
    num: 48,
    title: 'Motion Sensor',
    objective: 'Get out of the office after hours.',
    intro: 'After hours the doors LOCK if the sensor thinks the office is empty. So keep moving! Wave! Swivel! Stay where it can see you!',
    introMood: 'panicked',
    actions: ['drag', 'wait', 'read'],
    par: 2,
    hints: [
      'Read what Security says the sensor actually does.',
      'The doors open for an EMPTY office. Get out of the sensor\'s shaded zone.',
      'Drag yourself under the desk, wait a few seconds, then open the door.'
    ],
    wrong: ['Waving at the sensor only proves you\'re there (nope).', 'Hiding behind the plant fails: it\'s see-through (nope).', 'The door stays locked while the sensor sees you (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'The office thought it was empty, so it let you out. Rude office.',
    trick: 'The doors unlocked for an empty office, so hiding from the sensor was the key.',

    init: function () { return { hidden: false, unlocked: false, timer: null }; },

    view: function (s) {
      var status = s.unlocked ? 'UNLOCKED' : (s.hidden ? 'empty…?' : 'SEES YOU');
      return [
        O('door', 4, 6, 20, 46, { art: 'door', artOpts: { sign: s.unlocked ? 'OPEN' : 'LOCKED', small: true }, label: s.unlocked ? 'Door, unlocked' : 'Door, locked' }),
        O('notice', 27, 6, 34, 30, { kind: 'static', text: 'SECURITY: after hours, doors UNLOCK once the sensor sees an empty office.', label: 'Security notice: after hours, doors unlock once the sensor sees an empty office', cls: 'book-card' }),
        O('status', 27, 40, 34, 10, { kind: 'static', text: status, label: 'Sensor status: ' + status, cls: 'display-card' + (s.unlocked ? ' ready' : '') }),
        O('cone', 44, 10, 54, 90, { kind: 'static', art: 'a-cone', artOpts: { on: !s.hidden }, label: 'The sensor\'s field of view covers the right side of the room' }),
        O('sensor', 84, 2, 14, 10, { kind: 'static', art: 'a-sensor', artOpts: { on: !s.hidden }, label: 'Ceiling motion sensor' }),
        O('desk', 4, 58, 40, 26, { kind: 'static', art: 'a-desk', label: 'Desk with a dark space underneath' }),
        O('under', 18, 64, 24, 20, { kind: 'zone', label: 'Under the desk, out of the sensor\'s view', zone: true }),
        O('plant', 76, 50, 14, 32, { art: 'plant', label: 'Tall plant inside the sensor\'s view', zone: true }),
        O('hero', s.hidden ? 26 : 82, s.hidden ? 68 : 32, 10, 15, { art: 'hero', label: s.hidden ? 'You, hiding under the desk' : 'You, in plain view of the sensor (drag yourself somewhere)', drag: !s.hidden, disabled: s.hidden, cls: 'hero-sprite' }),
        O('wave', 50, 86, 30, 11, { text: 'Wave 👋', label: 'Wave at the sensor', cls: 'btn-card' })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'hero') {
        if (a.zone === 'under') {
          s.hidden = true;
          api.say('Where did you go? Hello? HELLO? The sensor can\'t see you! Come out before it… does the thing!', 'panicked');
          s.timer = api.after(EMPTY_MS, function () {
            s.timer = null; s.unlocked = true;
            api.say('Click. "Office empty. Doors unlocked." …It\'s not empty! I\'M here! Am I not a person to you, sensor?', 'annoyed');
          });
          return true;
        }
        if (a.zone === 'plant') {
          api.nope('hero');
          api.say('Behind the plant? It\'s a fern. The sensor can see straight through it. So can I. Hi.', 'pleased');
          return true;
        }
        return false;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'wave':
          api.nope('wave');
          if (s.hidden && !s.unlocked) {
            s.hidden = false;
            if (s.timer) { api.cancel(s.timer); s.timer = null; }
            api.say('You waved! The sensor sees you! Good! Stay visible! Forever!', 'pleased');
          } else api.say(s.unlocked ? 'Waving goodbye? It\'s already unlocked. Don\'t rub it in.' : 'Lovely wave. The sensor waves back. Metaphorically. Keep it up!', 'pleased');
          return true;
        case 'door':
          if (s.unlocked) {
            api.defy('hide');
            api.complete({ line: 'You hid from a sensor and the building just… let you go. I\'ve been waving at that thing for twelve years.', mood: 'defeated' });
          } else {
            api.nope('door');
            api.say('Locked. The sensor can see someone in the office. You. Keep moving!', 'pleased');
          }
          return true;
        case 'hero':
          api.say('Drag yourself somewhere. Ideally right in front of the sensor. Doing star jumps.', 'neutral');
          return true;
        case 'plant':
          api.say('A fern. Very leafy. Very see-through.', 'neutral');
          return true;
      }
      return false;
    },

    solution: [{ drop: ['hero', 'under'] }, { wait: 3500 }, { tap: 'door' }],
    checks: [
      { name: 'wave at the sensor', steps: [{ tap: 'wave' }], expect: 'nope' },
      { name: 'hide behind the plant', steps: [{ drop: ['hero', 'plant'] }], expect: 'nope' },
      { name: 'door while seen', steps: [{ tap: 'door' }], expect: 'nope' },
      { name: 'keep standing there', steps: [{ wait: 20000 }], expect: 'playing' },
      { name: 'peek out too soon', steps: [{ drop: ['hero', 'under'] }, { wait: 1000 }, { tap: 'door' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
