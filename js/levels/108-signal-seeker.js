/* Level 108 — Signal Seeker
 * Connect the laptop to the Wi-Fi to unlock the smart door. Bossworth swears the best signal
 * is on top of the microwave ("basically a big router"). Microwaves jam Wi-Fi (trap).
 * Hot/cold: drag the laptop between spots; its bars show the signal. The shelf right under the
 * router has full bars. Connect with weak signal = nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SPOTS = {
    desk: { name: 'Desk', x: 6, y: 58, bars: 1 },
    sofa: { name: 'Sofa', x: 38, y: 58, bars: 2 },
    shelf: { name: 'Shelf under the router', x: 72, y: 40, bars: 4 }
  };

  OBEY.registerLevel({
    id: 'signal-seeker',
    num: 108,
    title: 'Signal Seeker',
    objective: 'Get a strong Wi-Fi signal and connect.',
    intro: 'Connect to the Wi-Fi. The best signal in the lab is on top of the microwave. Microwaves are basically big routers with snacks. Science.',
    introMood: 'pleased',
    actions: ['drag', 'tap', 'explore'],
    par: 2,
    hints: [
      'Watch the bars on the laptop screen as you move it around.',
      'The signal comes from the router, not the microwave. Microwaves jam Wi-Fi.',
      'Drag the laptop to the shelf under the router, then press CONNECT.'
    ],
    wrong: ['Putting the laptop on the humming microwave jams it (trap).', 'Connecting with a weak signal fails (nope).'],
    secrets: [],
    endingNote: 'None.',
    done: 'Four bars. Zero popcorn. Full marks.',
    trick: 'Signal is strongest near the router, and a running microwave jams the same 2.4 GHz band Wi-Fi uses.',

    init: function () { return { at: 'desk' }; },

    view: function (s) {
      var here = SPOTS[s.at];
      var objs = [
        O('info', 4, 2, 92, 11, { kind: 'static', text: 'Fun fact: microwaves and Wi-Fi both hum at 2.4 GHz.', label: 'Fun fact: microwaves and Wi-Fi both hum at 2.4 gigahertz.', cls: 'tag-card' }),
        O('microwave', 4, 18, 28, 20, { art: 'd-microwave', label: 'Microwave, humming away', zone: true }),
        O('router', 72, 16, 24, 17, { kind: 'static', art: 'd-router', label: 'Wi-Fi router' }),
        O('connect', 36, 24, 30, 13, { text: 'CONNECT', label: 'Connect to the Wi-Fi', cls: 'btn-card accent big' }),
        O('bars', 36, 42, 30, 10, { kind: 'static', text: 'Signal: ' + here.bars + (here.bars === 1 ? ' bar' : ' bars'), label: 'Signal: ' + here.bars + ' of 4 bars', cls: 'panel-card' + (here.bars === 4 ? ' ok' : '') }),
        O('table', 4, 78, 28, 8, { kind: 'static', art: 'table', label: '' }),
        O('sofa', 36, 78, 28, 17, { kind: 'static', art: 'd-sofa', label: '' }),
        O('shelfboard', 70, 58, 28, 7, { kind: 'static', art: 'shelf', label: '' })
      ];
      Object.keys(SPOTS).forEach(function (k) {
        var p = SPOTS[k];
        objs.push(O('spot-' + k, p.x, p.y, 24, 18, { text: p.name, label: 'Spot: ' + p.name, cls: 'tag-card', zone: true, hidden: s.at === k }));
      });
      objs.push(O('laptop', here.x, here.y, 24, 18, { art: 'd-laptop', artOpts: { bars: here.bars }, label: 'Laptop on the ' + here.name.toLowerCase() + ', ' + here.bars + ' of 4 bars (drag it)', drag: true }));
      return objs;
    },

    on: function (a, s, api) {
      if (a.type === 'tap') {
        if (a.target === 'connect') {
          if (SPOTS[s.at].bars === 4) {
            api.defy('microwave');
            api.complete({ line: 'Connected! Four bars! Right next to the… router. The thing that makes Wi-Fi. Who could have guessed. (Everyone.)', mood: 'defeated' });
          } else { api.nope(); api.say('Connecting… connecting… "Signal too weak." Maybe try somewhere with snacks?', 'pleased'); }
          return true;
        }
        if (a.target === 'microwave') { api.nope(); api.say('Don\'t open it, the popcorn is at a delicate stage.', 'annoyed'); return true; }
        return false;
      }
      if (a.type !== 'drop' || a.target !== 'laptop') return false;
      if (a.zone === 'microwave') {
        api.fail('BZZZT. Laptop on a running microwave: zero bars and a strong smell of popcorn. Same 2.4 GHz, you see. I definitely knew that. Start again.');
        return true;
      }
      var m = /^spot-(\w+)$/.exec(a.zone || '');
      if (!m) { api.say('The laptop goes back where it was. It\'s shy.', 'neutral'); return true; }
      s.at = m[1];
      var b = SPOTS[s.at].bars;
      api.say(b === 4 ? 'Four bars?! Over THERE? By that… that toaster with antennas?' : (b === 2 ? 'Two bars. Warmer. The microwave is warmer still. Literally.' : 'One bar. Back at the desk. Like a true professional.'), b === 4 ? 'surprised' : 'pleased');
      return true;
    },

    solution: [{ drop: ['laptop', 'spot-shelf'] }, { tap: 'connect' }],
    checks: [
      { name: 'the microwave is a trap', steps: [{ drop: ['laptop', 'microwave'] }], expect: 'fail' },
      { name: 'connecting at the desk is a nope', steps: [{ tap: 'connect' }], expect: 'nope' },
      { name: 'the sofa is not enough', steps: [{ drop: ['laptop', 'spot-sofa'] }, { tap: 'connect' }], expect: 'nope' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
