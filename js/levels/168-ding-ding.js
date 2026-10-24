/* Level 168 — Ding Ding (Lunchbox Lane)
 * The school bus loops Market → Park Road → School → Depot, one stop every 3 s. Bossworth: press STOP
 * when you SEE the school, and press it lots. The sticker: press STOP once, BEFORE your stop. Press it
 * while the display says NEXT STOP: School, then get off when the doors open.
 * Wrong: pressing at the wrong time stops the bus somewhere else (trap); pressing twice (nope);
 * the door while the bus is moving (nope). Missing the stop is harmless: the bus comes round again.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var STOPS = ['Market', 'Park Road', 'School', 'Depot'];
  var VIEW = ['market', 'park', 'school', 'depot'];
  var TICK = 3000, SCHOOL = 2;
  var WHERE = {
    0: 'The bus stops at the Market. You get off between a cabbage stall and a man selling socks. School is two stops away.',
    1: 'The bus stops at Park Road. You get off next to a duck pond. The ducks are not going to school.',
    3: 'The bus stops at the Depot and switches off. Everybody off; the buses are going to sleep. School was the stop BEFORE.'
  };

  OBEY.registerLevel({
    id: 'ding-ding',
    num: 168,
    title: 'Ding Ding',
    objective: 'Get off the bus at the School stop.',
    intro: 'All aboard the school bus! When you can SEE the school out of the window, press STOP. Then press it again. And again. Bus drivers LOVE that.',
    introMood: 'neutral',
    actions: ['tap', 'wait', 'timing'],
    par: 2,
    hints: [
      'Read the sticker on the pole: it says when to press.',
      'Pressing STOP stops the bus at the NEXT stop, so press it one stop early.',
      'Wait until the display says NEXT STOP: School, press STOP once, then tap the doors when they open.'
    ],
    wrong: ['Pressing STOP at the wrong moment stops the bus at the wrong stop (trap).', 'Pressing STOP twice is a nope.', 'The doors don\'t open while the bus is moving (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'One ding, one stop, one pupil on time.',
    trick: 'STOP means stop at the NEXT stop, so pressing it while the display said "Next stop: School" got you off at school.',

    init: function () { return { at: 0, req: null, stopped: false }; },

    onStart: function (s, api) {
      api.every(TICK, function () {
        if (s.stopped) return;
        s.at = (s.at + 1) % STOPS.length;
        if (s.req === s.at) {
          s.req = null;
          if (s.at === SCHOOL) { s.stopped = true; api.say('The bus pulls in at School. The doors hiss open. …Already? I was going to press it lots.', 'surprised'); }
          else api.fail(WHERE[s.at]);
        }
      });
    },

    view: function (s) {
      var next = (s.at + 1) % STOPS.length;
      return [
        O('route', 4, 3, 92, 9, { kind: 'static', text: 'Route: Market → Park Road → School → Depot → Market…', label: 'Route: Market, Park Road, School, Depot, then back to Market', cls: 'tag-card' }),
        O('display', 4, 14, 58, 11, { kind: 'static', text: s.stopped ? 'NOW: School' : 'NEXT STOP: ' + STOPS[next], label: s.stopped ? 'Display: now at School' : 'Display: next stop ' + STOPS[next], cls: 'display-card' + (s.stopped ? ' ready' : '') }),
        O('sticker', 66, 14, 30, 18, { kind: 'static', text: 'Press STOP once, BEFORE your stop.', label: 'Sticker: press STOP once, before your stop', cls: 'tag-card' }),
        O('window', 4, 28, 44, 29, { kind: 'static', art: 'g-buswindow', artOpts: { view: VIEW[s.at] }, label: 'Bus window: outside is ' + STOPS[s.at] }),
        O('seats', 4, 74, 44, 22, { kind: 'static', art: 'chairs' }),
        O('pole', 48, 34, 26, 62, { art: 'g-stoppole', artOpts: { lit: s.req !== null }, label: 'STOP button on a pole' + (s.req !== null ? ' (pressed, light on)' : '') }),
        O('doors', 74, 46, 24, 50, { art: 'g-busdoor', artOpts: { open: s.stopped }, label: s.stopped ? 'Bus doors, open' : 'Bus doors, closed' })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      if (a.target === 'pole') {
        if (s.stopped) { api.say('We\'ve stopped already. Off you get.', 'neutral'); return true; }
        if (s.req !== null) { api.nope('pole'); api.say('DING DING. The driver sighs into the mirror. Once is enough; the light is already on.', 'pleased'); return true; }
        s.req = (s.at + 1) % STOPS.length;
        if (s.req === SCHOOL) api.say('Ding! But you can\'t SEE the school yet! Too early! …Unless that\'s how buses work.', 'suspicious');
        else api.say('Ding! The driver will stop at ' + STOPS[s.req] + '. Is that… where you wanted?', 'suspicious');
        return true;
      }
      if (a.target === 'doors') {
        if (s.stopped) { api.defy('early'); api.complete({ line: 'Off at School, right on time. One ding. ONE. The driver waved at you. He never waves at me. I press it eleven times.', mood: 'defeated' }); }
        else { api.nope('doors'); api.say('You push the doors. The bus is moving. The doors push back.', 'pleased'); }
        return true;
      }
      return false;
    },

    solution: [{ wait: 3100 }, { tap: 'pole' }, { wait: 3000 }, { tap: 'doors' }],
    alternatives: { secondLap: [{ wait: 15100 }, { tap: 'pole' }, { wait: 3000 }, { tap: 'doors' }] },
    checks: [
      { name: 'press when the school is in the window', steps: [{ wait: 6100 }, { tap: 'pole' }, { wait: 3000 }], expect: 'fail' },
      { name: 'press twice', steps: [{ wait: 3100 }, { tap: 'pole' }, { tap: 'pole' }], expect: 'nope' },
      { name: 'doors while moving', steps: [{ tap: 'doors' }], expect: 'nope' },
      { name: 'press at the start', steps: [{ tap: 'pole' }, { wait: 3000 }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
