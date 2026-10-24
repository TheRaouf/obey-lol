/* OBEY? LOL. — tiny Web Audio synthesiser for original sound effects.
 * No audio files. The AudioContext is only created after a user gesture, and sound is
 * never required to solve anything (all information is also shown as text). */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var ctx = null, enabled = true, unlocked = false;

  function ensure() {
    if (!enabled || !unlocked) return null;
    var AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return null;
    try {
      if (!ctx) ctx = new AC();
      if (ctx.state === 'suspended') ctx.resume();
    } catch (e) { ctx = null; }
    return ctx;
  }

  function tone(freq, start, dur, type, vol, slideTo) {
    var c = ensure();
    if (!c) return;
    var t0 = c.currentTime + start;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.08, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  var SFX = {
    tap: function () { tone(520, 0, 0.07, 'square', 0.04); },
    ui: function () { tone(700, 0, 0.05, 'triangle', 0.05); },
    pick: function () { tone(440, 0, 0.08, 'triangle', 0.06, 660); },
    drop: function () { tone(660, 0, 0.1, 'triangle', 0.06, 330); },
    fail: function () { tone(300, 0, 0.18, 'sawtooth', 0.05, 120); tone(180, 0.15, 0.25, 'sawtooth', 0.04, 90); },
    success: function () { [523, 659, 784, 1046].forEach(function (f, i) { tone(f, i * 0.09, 0.16, 'square', 0.05); }); },
    secret: function () { [880, 1175, 1568].forEach(function (f, i) { tone(f, i * 0.07, 0.22, 'sine', 0.07); }); },
    unlock: function () { [392, 523, 659].forEach(function (f, i) { tone(f, i * 0.06, 0.14, 'triangle', 0.07); }); },
    achievement: function () { [523, 784, 1046, 1568].forEach(function (f, i) { tone(f, i * 0.08, 0.2, 'triangle', 0.07); }); },
    narrator: function () { tone(240 + Math.random() * 60, 0, 0.06, 'square', 0.02); },
    stamp: function () { tone(110, 0, 0.18, 'square', 0.09, 60); },
    ending: function () { [262, 330, 392, 523, 659, 784].forEach(function (f, i) { tone(f, i * 0.12, 0.3, 'triangle', 0.06); }); },
    boom: function () { tone(160, 0, 0.6, 'sawtooth', 0.09, 30); tone(90, 0.1, 0.6, 'square', 0.06, 25); }
  };

  OBEY.audio = {
    setEnabled: function (on) { enabled = !!on; if (!enabled && ctx && ctx.state === 'running') { try { ctx.suspend(); } catch (e) { /* ignore */ } } },
    isEnabled: function () { return enabled; },
    /** Must be called from a user gesture handler (browser autoplay rules). */
    unlock: function () { unlocked = true; },
    play: function (name) {
      if (!enabled || !unlocked || !SFX[name]) return;
      try { SFX[name](); } catch (e) { /* audio is optional */ }
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
