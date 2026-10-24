/* Level 15 — The Volume Knob
 * Bossworth wants to be LOUD. Turning the volume all the way down silences him, and in the
 * silence a whisper from the door explains how to leave (knock twice).
 * Wrong: turning it up past 5 blows the speaker (trap). Knocking before the whisper: nope.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, O = OBEY.obj;

  OBEY.registerLevel({
    id: 'volume-knob',
    num: 15,
    title: 'The Volume Knob',
    objective: 'Get out of the sound booth.',
    intro: 'Can you hear me? Turn the volume UP. All the way. My instructions deserve to be LOUD.',
    introMood: 'pleased',
    actions: ['tap', 'listen'],
    par: 5,
    hints: [
      'Sometimes the best instruction is the one you can barely hear.',
      'Turn the volume all the way down and read what appears.',
      'Press Quieter three times, then knock on the door twice.'
    ],
    wrong: ['Volume above 5 blows the speaker (trap).', 'Knocking before you hear the whisper does nothing.'],
    secrets: [],
    endingNote: 'None.',
    done: 'Silence: golden. Bossworth: muted.',

    init: function () { return { vol: 3, whisper: false, knocks: 0 }; },

    view: function (s) {
      return [
        O('speaker', 32, 4, 36, 34, { kind: 'static', art: 'speaker', artOpts: { vol: s.vol }, label: 'Speaker at volume ' + s.vol }),
        O('volume', 32, 38, 36, 8, { kind: 'static', text: 'Volume: ' + s.vol + ' / 5', label: 'Volume ' + s.vol + ' of 5', cls: 'tag-card' }),
        O('down', 6, 48, 40, 13, { text: '– Quieter', label: 'Turn the volume down', cls: 'btn-card big' }),
        O('up', 54, 48, 40, 13, { text: '+ Louder', label: 'Turn the volume up', cls: 'btn-card big' }),
        O('whisper', 4, 64, 54, 22, { kind: 'static', text: '(a tiny voice from the door) psst… knock twice.', label: 'A whisper from the door: knock twice', cls: 'speech-card', hidden: !s.whisper }),
        O('door', 66, 62, 26, 36, { art: 'door', artOpts: { sign: 'BOOTH' }, label: 'Sound booth door' + (s.knocks ? ' (knocked ' + s.knocks + ' time)' : '') })
      ];
    },

    on: function (a, s, api) {
      if (a.type !== 'tap') return false;
      switch (a.target) {
        case 'up':
          s.vol++;
          if (s.vol > 5) {
            api.fail('FWOOOOM! The speaker blew your hair into a brand new style. Volume reset. Maybe… the other way?');
          } else {
            api.say(['LOUDER!', 'YES! LOUDER!!', 'I CAN HEAR MYSELF THINK! I HATE IT! LOUDER!'][Math.min(2, s.vol - 3)] || 'LOUDER!', 'pleased');
          }
          return true;
        case 'down':
          if (s.vol === 0) { api.nope(); return true; }
          s.vol--;
          if (s.vol === 0) {
            s.whisper = true;
            api.defy('volume');
            api.say('(You turned Bossworth all the way down. His mouth is moving. Nothing comes out.)', 'annoyed');
          } else {
            api.say(s.vol === 1 ? 'what are you doing… speak up… i mean, turn me up…' : 'Hey! Wrong way! Up is the OTHER way!', 'annoyed');
          }
          return true;
        case 'door':
          if (!s.whisper) {
            api.nope();
            api.say('It is a door. Doors are for opening. Not this one. Not by you.', 'pleased');
            return true;
          }
          s.knocks++;
          if (s.knocks >= 2) api.complete({ line: '…did you just knock your way out while I was MUTED? That is the rudest polite thing ever.', mood: 'defeated' });
          else api.say('(*knock*) …the door seems to be waiting for one more.', 'suspicious');
          return true;
      }
      return false;
    },

    solution: [{ tap: 'down' }, { tap: 'down' }, { tap: 'down' }, { tap: 'door' }, { tap: 'door' }],
    secretPaths: {}
  });
})(typeof window !== 'undefined' ? window : globalThis);
