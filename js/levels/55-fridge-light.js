/* Level 55 — The Fridge Light
 * Bossworth insists the fridge light stays on when the door is shut, because it's always on when he looks.
 * You can't see inside a shut fridge — but a phone on a 3-second self-timer can. Open the fridge, put the
 * phone in, shut the door, wait for the click, open up and look at the photo: pitch black. Then rule.
 * Wrong: putting the phone in a shut fridge (nope), opening before the click (nope), ruling ON (trap).
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;
  var SHUTTER = 3000;

  OBEY.registerLevel({
    id: 'fridge-light',
    num: 55,
    title: 'The Fridge Light',
    objective: 'Find out whether the fridge light goes off when the door is shut.',
    intro: 'The fridge light stays ON when the door is shut. Always. Every time I open it — on. Ten thousand times. That\'s science. Case closed. Don\'t investigate.',
    introMood: 'suspicious',
    actions: ['tap', 'drag', 'wait', 'choice'],
    par: 5,
    hints: [
      'Every time anyone looks, the door is open. You need a witness that can stay inside.',
      'The phone has a camera on a 3-second self-timer. Phones fit in fridges.',
      'Open the fridge, drag the phone in, shut the door, wait for the click, open it again, then rule "Light goes OFF".'
    ],
    wrong: ['The phone can\'t go into a shut fridge (nope).', 'Opening the door before the click spoils the photo (nope).', 'Ruling "stays ON" against the evidence is a trap.'],
    secrets: [],
    endingNote: 'None.',
    done: 'The light goes off. Bossworth\'s whole worldview went off with it.',
    trick: 'Nobody can watch a shut fridge, so you sent in a phone on a self-timer and let the photo testify.',

    init: function () { return { open: false, phone: 'counter', photo: null, timer: null }; },

    view: function (s) {
      var evidence = s.photo === 'dark' && s.phone === 'counter';
      return [
        O('fridge', 4, 30, 46, 60, { art: 'b-fridge', artOpts: { open: s.open, light: s.open, phone: s.phone === 'fridge' }, zone: true,
          label: s.open ? 'Fridge, door open, light on' + (s.phone === 'fridge' ? ', your phone is on the shelf' : '') + ' (tap to shut)' : 'Fridge, door shut' + (s.phone === 'fridge' ? ' with your phone inside' : '') + ' (tap to open)' }),
        O('seal', 4, 88, 46, 9, { kind: 'static', text: 'Door seal: 100% light-proof', label: 'Sticker: door seal is 100 percent light-proof', cls: 'tag-card' }),
        O('caption', 56, 4, 40, 26, { kind: 'static', text: evidence ? 'Photo from inside the shut fridge: completely BLACK.' : (s.phone === 'fridge' ? (s.open ? 'Phone is in. Shut the door for the photo.' : (s.photo ? '*muffled click* Photo taken.' : 'Self-timer ticking…')) : 'Phone camera: 3-second self-timer, ready.'),
          label: evidence ? 'The photo from inside the shut fridge is completely black' : 'Phone status', cls: 'speech-card' }),
        O('phone', 64, 33, 22, 30, { art: 'b-camphone', artOpts: { photo: evidence ? 'dark' : null }, drag: true, hidden: s.phone !== 'counter', label: evidence ? 'Your phone, showing a completely black photo' : 'Phone with a 3-second self-timer camera (drag it)' }),
        O('v-off', 54, 68, 42, 12, { text: 'Light goes OFF', label: 'Rule: the light goes off when the door is shut', cls: 'btn-card', hidden: !evidence }),
        O('v-on', 54, 84, 42, 12, { text: 'Light stays ON', label: 'Rule: the light stays on when the door is shut', cls: 'btn-card', hidden: !evidence })
      ];
    },

    on: function (a, s, api) {
      if (a.type === 'drop' && a.target === 'phone') {
        if (a.zone !== 'fridge') return true;
        if (!s.open) { api.nope(); api.say('The door is shut. Phones are not that thin. Not yet.', 'pleased'); return true; }
        s.phone = 'fridge'; s.photo = null;
        api.say('You put a PHONE in the FRIDGE? It\'ll catch a cold. And for what? We KNOW the answer.', 'suspicious');
        return true;
      }
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'fridge':
          if (!s.open) {
            s.open = true;
            if (s.phone === 'fridge') {
              if (s.timer) {
                api.cancel(s.timer); s.timer = null; s.phone = 'counter';
                api.nope();
                api.say('You opened it before the click. Now the photo would just show… an open fridge. Light on. As predicted. By me.', 'pleased');
              } else if (s.photo) {
                s.phone = 'counter';
                api.say('W-why is the photo black? Did the phone blink? Phones don\'t blink. DO they?', 'surprised');
              }
            } else api.say('See? Light ON. Every single time. Case closed. Again.', 'pleased');
          } else {
            s.open = false;
            if (s.phone === 'fridge' && !s.photo) {
              s.timer = api.after(SHUTTER, function () { s.timer = null; s.photo = 'dark'; api.say('*muffled click* …That was the cheese. The cheese clicks sometimes.', 'suspicious'); });
            }
          }
          return true;
        case 'v-off':
          api.defy('fridge');
          api.complete({ line: 'It goes OFF? All these years I thought it was waiting up for me. I feel so… unwaited-for.', mood: 'defeated' });
          return true;
        case 'v-on':
          api.fail('"Stays on," you say, holding a photo of pure darkness. The fridge hums in disgust. Start the experiment again.');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'fridge' }, { drop: ['phone', 'fridge'] }, { tap: 'fridge' }, { wait: 3500 }, { tap: 'fridge' }, { tap: 'v-off' }],
    checks: [
      { name: 'phone into a shut fridge', steps: [{ drop: ['phone', 'fridge'] }], expect: 'nope' },
      { name: 'open before the click', steps: [{ tap: 'fridge' }, { drop: ['phone', 'fridge'] }, { tap: 'fridge' }, { wait: 1000 }, { tap: 'fridge' }], expect: 'nope' },
      { name: 'rule against the evidence', steps: [{ tap: 'fridge' }, { drop: ['phone', 'fridge'] }, { tap: 'fridge' }, { wait: 3500 }, { tap: 'fridge' }, { tap: 'v-on' }], expect: 'fail' }
    ],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
