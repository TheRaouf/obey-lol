/* OBEY? LOL. — sound effects and Bossworth's voice, all synthesised with the Web Audio API
 * (no audio files). Nothing is played before a user gesture, and sound is never required:
 * every line is also on screen.
 *
 * Voice modes: 'babble' — expressive gibberish syllables (works everywhere, offline);
 *              'speech' — the browser's text-to-speech, if available (falls back to babble);
 *              'off'.
 */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var ctx = null, master = null, noiseBuf = null, sfxBus = null, voiceBus = null, musicBus = null;
  var enabled = true, unlocked = false, voiceMode = 'babble';
  var vols = { sfx: 0.8, voice: 0.8, music: 0.4 };
  var voiceNodes = [];
  var onPlay = null;
  var routeTo = null; // which bus tone()/noise() connect to while a sound is being built

  function ensure() {
    if (!enabled || !unlocked) return null;
    var AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return null;
    try {
      if (!ctx) {
        ctx = new AC();
        var comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -18; comp.ratio.value = 4;
        master = ctx.createGain();
        master.gain.value = 0.9;
        master.connect(comp); comp.connect(ctx.destination);
        sfxBus = ctx.createGain(); voiceBus = ctx.createGain(); musicBus = ctx.createGain();
        sfxBus.gain.value = vols.sfx; voiceBus.gain.value = vols.voice; musicBus.gain.value = vols.music;
        sfxBus.connect(master); voiceBus.connect(master); musicBus.connect(master);
        noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        var d = noiseBuf.getChannelData(0);
        for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === 'suspended') ctx.resume();
    } catch (e) { ctx = null; }
    return ctx;
  }

  /** One enveloped oscillator note. opts: type, vol, slide (end freq), vib (Hz depth), filter, attack, track */
  function tone(freq, start, dur, opts) {
    var c = ensure();
    if (!c) return;
    opts = opts || {};
    var t0 = c.currentTime + start, vol = opts.vol || 0.08;
    var o = c.createOscillator(), g = c.createGain(), out = g;
    o.type = opts.type || 'square';
    o.frequency.setValueAtTime(freq, t0);
    if (opts.slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, opts.slide), t0 + dur);
    if (opts.vib) {
      var lfo = c.createOscillator(), lg = c.createGain();
      lfo.frequency.value = opts.vibRate || 6; lg.gain.value = opts.vib;
      lfo.connect(lg); lg.connect(o.frequency); lfo.start(t0); lfo.stop(t0 + dur + 0.05);
    }
    if (opts.filter) {
      var f = c.createBiquadFilter();
      f.type = opts.filterType || 'lowpass'; f.frequency.value = opts.filter; f.Q.value = opts.q || 1;
      o.connect(f); f.connect(g);
    } else o.connect(g);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + (opts.attack || 0.012));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    out.connect(opts.track ? voiceBus : (routeTo || sfxBus));
    o.start(t0); o.stop(t0 + dur + 0.05);
    if (opts.track) voiceNodes.push(o);
  }

  /** Filtered noise burst (splats, whooshes, cymbals). */
  function noise(start, dur, opts) {
    var c = ensure();
    if (!c) return;
    opts = opts || {};
    var t0 = c.currentTime + start;
    var src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = noiseBuf; src.loop = true;
    f.type = opts.filterType || 'bandpass';
    f.frequency.setValueAtTime(opts.from || 1200, t0);
    if (opts.to) f.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    f.Q.value = opts.q || 1.2;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(opts.vol || 0.12, t0 + (opts.attack || 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(routeTo || sfxBus);
    src.start(t0); src.stop(t0 + dur + 0.05);
  }

  function chord(freqs, start, dur, type, vol) { freqs.forEach(function (f) { tone(f, start, dur, { type: type || 'triangle', vol: vol || 0.04 }); }); }

  var SFX = {
    tap: function () { tone(660, 0, 0.05, { type: 'triangle', vol: 0.05 }); noise(0, 0.03, { from: 3000, vol: 0.03 }); },
    ui: function () { tone(880, 0, 0.04, { type: 'sine', vol: 0.05 }); },
    pick: function () { tone(300, 0, 0.14, { type: 'sine', vol: 0.07, slide: 700 }); },
    drop: function () { tone(500, 0, 0.12, { type: 'sine', vol: 0.07, slide: 160 }); noise(0.05, 0.08, { from: 400, vol: 0.06, filterType: 'lowpass' }); },
    nope: function () { tone(180, 0, 0.11, { type: 'square', vol: 0.05, filter: 900 }); tone(150, 0.13, 0.16, { type: 'square', vol: 0.05, filter: 900 }); },
    hold: function () { tone(220, 0, 0.5, { type: 'triangle', vol: 0.03, slide: 440 }); },
    // Wrong-answer gags
    pie: function () { tone(1200, 0, 0.35, { type: 'sine', vol: 0.06, slide: 300 }); noise(0.3, 0.35, { from: 900, to: 200, vol: 0.2, filterType: 'lowpass' }); },
    chicken: function () { tone(700, 0, 0.12, { type: 'sawtooth', vol: 0.06, slide: 1100, filter: 2000 }); tone(900, 0.16, 0.28, { type: 'sawtooth', vol: 0.07, slide: 500, vib: 40, vibRate: 18, filter: 2200 }); },
    trombone: function () { [392, 370, 349, 330].forEach(function (f, i) { tone(f, i * 0.32, i === 3 ? 0.9 : 0.3, { type: 'sawtooth', vol: 0.06, filter: 900, vib: i === 3 ? 8 : 0, vibRate: 5, slide: i === 3 ? 290 : 0 }); }); },
    zap: function () { tone(120, 0, 0.45, { type: 'sawtooth', vol: 0.06, vib: 60, vibRate: 40 }); noise(0, 0.45, { from: 3000, vol: 0.07, q: 4 }); },
    splash: function () { noise(0, 0.6, { from: 3000, to: 300, vol: 0.2 }); tone(500, 0.05, 0.3, { type: 'sine', vol: 0.05, slide: 120 }); },
    fail: function () { SFX.trombone(); },
    laugh: function () { [0, 0.14, 0.28, 0.42].forEach(function (t, i) { tone(340 - i * 18, t, 0.1, { type: 'square', vol: 0.035, filter: 1400, slide: 280 - i * 18 }); }); },
    // Rewards
    success: function () { [523, 659, 784].forEach(function (f, i) { tone(f, i * 0.08, 0.14, { type: 'square', vol: 0.04, filter: 3000 }); }); chord([523, 659, 784, 1046], 0.26, 0.6, 'triangle', 0.04); noise(0.26, 0.4, { from: 6000, vol: 0.03, filterType: 'highpass' }); },
    secret: function () { [1318, 1568, 1976, 2637].forEach(function (f, i) { tone(f, i * 0.07, 0.4, { type: 'sine', vol: 0.05 }); }); },
    unlock: function () { [392, 523, 659, 784].forEach(function (f, i) { tone(f, i * 0.06, 0.16, { type: 'triangle', vol: 0.06 }); }); },
    achievement: function () { [523, 784, 1046, 1568].forEach(function (f, i) { tone(f, i * 0.08, 0.24, { type: 'triangle', vol: 0.06 }); }); },
    trophy: function () { chord([523, 659, 784], 0, 0.3, 'square', 0.03); chord([587, 740, 880], 0.3, 0.3, 'square', 0.03); chord([659, 831, 988, 1318], 0.6, 0.9, 'triangle', 0.045); noise(0.6, 0.9, { from: 7000, vol: 0.04, filterType: 'highpass' }); },
    narrator: function () { /* replaced by the voice */ },
    // 2.1
    glitch: function () { [0, 0.05, 0.1, 0.18].forEach(function (t, i) { tone(200 + i * 330, t, 0.04, { type: 'square', vol: 0.04, filter: 3000 }); }); noise(0, 0.25, { from: 5000, vol: 0.06, q: 6 }); },
    phone: function () { [0, 0.25, 0.9, 1.15].forEach(function (t) { tone(1320, t, 0.18, { type: 'sine', vol: 0.04, vib: 30, vibRate: 22 }); }); },
    ruin: function () { [523, 440, 349, 262, 196].forEach(function (f, i) { tone(f, i * 0.09, 0.2, { type: 'sawtooth', vol: 0.05, filter: 1600 }); }); noise(0.4, 0.9, { from: 900, to: 80, vol: 0.25, filterType: 'lowpass' }); },
    gameover: function () { [392, 330, 262, 196].forEach(function (f, i) { tone(f, i * 0.28, 0.32, { type: 'square', vol: 0.05, filter: 1200 }); }); },
    chapter: function () { [392, 523, 659, 784, 1046].forEach(function (f, i) { tone(f, i * 0.07, 0.2, { type: 'triangle', vol: 0.05 }); }); chord([523, 659, 784], 0.4, 0.7, 'triangle', 0.04); },
    warmer: function () { tone(1568, 0, 0.09, { type: 'sine', vol: 0.03 }); tone(2093, 0.06, 0.12, { type: 'sine', vol: 0.025 }); },
    stamp: function () { tone(110, 0, 0.18, { type: 'square', vol: 0.09, slide: 55 }); noise(0, 0.12, { from: 300, vol: 0.12, filterType: 'lowpass' }); },
    ending: function () { [262, 330, 392, 523, 659, 784].forEach(function (f, i) { tone(f, i * 0.12, 0.34, { type: 'triangle', vol: 0.06 }); }); chord([523, 659, 784, 1046], 0.75, 1.2, 'sine', 0.04); },
    boom: function () { noise(0, 1.2, { from: 800, to: 60, vol: 0.3, filterType: 'lowpass' }); tone(90, 0, 0.9, { type: 'sawtooth', vol: 0.08, slide: 25 }); }
  };

  /* ------------------------------------------------------------------ voice */
  var VOICES = {
    classic: { base: 190, type: 'square', speed: 1 },
    royal: { base: 150, type: 'sawtooth', speed: 0.85 },
    alien: { base: 420, type: 'sine', speed: 1.25, vib: 30 },
    detective: { base: 140, type: 'triangle', speed: 0.9 },
    wizard: { base: 130, type: 'sawtooth', speed: 0.8, vib: 12 },
    robot: { base: 200, type: 'square', speed: 1.1, mono: true },
    dino: { base: 85, type: 'sawtooth', speed: 0.85, vib: 6 },
    ninja: { base: 240, type: 'triangle', speed: 1.4, quiet: true }
  };
  var MOOD_PITCH = { neutral: 1, pleased: 1.08, suspicious: 0.94, annoyed: 0.9, surprised: 1.25, panicked: 1.35, defeated: 0.82, laughing: 1.15 };

  function cleanLine(text) {
    return String(text || '').replace(/\*[^*]*\*/g, ' ').replace(/\([^)]*\)/g, ' ').replace(/[“”"]/g, '').replace(/\s+/g, ' ').trim();
  }

  /** Estimated speaking time for the mouth animation (ms), even when the voice is off. */
  function talkTime(text) {
    var words = cleanLine(text).split(' ').filter(Boolean).length;
    return Math.min(3200, Math.max(500, words * 150));
  }

  function babble(text, costume, mood) {
    var c = ensure();
    if (!c) return;
    var v = VOICES[costume] || VOICES.classic;
    var words = cleanLine(text).split(' ').filter(Boolean).slice(0, 14);
    var pitch = v.base * (MOOD_PITCH[mood] || 1);
    var step = 0.105 / v.speed, t = 0;
    words.forEach(function (w, wi) {
      var syl = Math.min(3, Math.max(1, Math.round(w.replace(/[^a-z]/gi, '').length / 3)));
      for (var k = 0; k < syl; k++) {
        var code = w.charCodeAt(k % w.length) || 97;
        var f = v.mono ? pitch : pitch * (0.85 + ((code * 7 + wi * 13 + k * 5) % 40) / 100);
        if (/[?!]$/.test(w) && k === syl - 1) f *= 1.25;
        tone(f, t, step * 0.9, { type: v.type, vol: v.quiet ? 0.025 : 0.04, filter: 1100 + (code % 5) * 220, filterType: 'bandpass', q: 2.5, vib: v.vib || 0, vibRate: 9, slide: f * (mood === 'defeated' ? 0.85 : 1.05), track: true });
        t += step;
      }
      t += step * 0.4;
    });
    if (mood === 'laughing') SFX.laugh();
  }

  function stopVoice() {
    voiceNodes.forEach(function (o) { try { o.stop(); } catch (e) { /* already stopped */ } });
    voiceNodes = [];
    if (root.speechSynthesis) { try { root.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
  }

  function speechAvailable() { return !!(root.speechSynthesis && root.SpeechSynthesisUtterance); }

  function speak(text, costume, mood) {
    var ms = talkTime(text);
    if (!enabled || !unlocked || voiceMode === 'off') return ms;
    stopVoice();
    var line = cleanLine(text);
    if (!line || line === '…') return ms;
    if (voiceMode === 'speech' && speechAvailable()) {
      try {
        var u = new root.SpeechSynthesisUtterance(line);
        var v = VOICES[costume] || VOICES.classic;
        u.pitch = Math.max(0.1, Math.min(2, (v.base / 190) * (MOOD_PITCH[mood] || 1)));
        u.rate = Math.max(0.6, Math.min(1.6, v.speed * (mood === 'panicked' ? 1.25 : 1)));
        u.volume = Math.max(0, Math.min(1, vols.voice));
        root.speechSynthesis.speak(u);
        return Math.max(ms, line.length * 60);
      } catch (e) { /* fall back to babble */ }
    }
    babble(text, costume, mood);
    return ms;
  }

  /* ------------------------------------------------------------------ music */
  // A gentle generative loop per chapter: a pentatonic arpeggio over a soft bass note.
  var SCALES = [[0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 5, 7, 9], [0, 2, 4, 7, 11], [0, 3, 5, 8, 10], [0, 2, 3, 7, 9], [0, 4, 5, 7, 11], [0, 2, 4, 6, 9], [0, 3, 7, 8, 10]];
  var ROOTS = [262, 247, 277, 233, 294, 220, 262, 247, 196];
  var music = { on: false, chapter: 0, timer: null, step: 0 };
  function musicTick() {
    var c = ensure();
    if (!c || !music.on) return;
    var sc = SCALES[music.chapter % SCALES.length], base = ROOTS[music.chapter % ROOTS.length];
    var prev = routeTo; routeTo = musicBus;
    var deg = sc[(music.step * 2 + Math.floor(music.step / 4)) % sc.length];
    tone(base * Math.pow(2, deg / 12) * (music.step % 8 < 4 ? 1 : 2), 0, 0.5, { type: 'triangle', vol: 0.05, filter: 1800 });
    if (music.step % 8 === 0) tone(base / 2, 0, 1.6, { type: 'sine', vol: 0.06 });
    routeTo = prev;
    music.step++;
  }
  function startMusic(chapter) {
    music.chapter = chapter || 0;
    if (music.on) return;
    music.on = true; music.step = 0;
    music.timer = root.setInterval(musicTick, 420);
  }
  function stopMusic() { music.on = false; if (music.timer) root.clearInterval(music.timer); music.timer = null; }

  OBEY.audio = {
    setEnabled: function (on) {
      enabled = !!on;
      if (!enabled) { stopVoice(); if (ctx && ctx.state === 'running') { try { ctx.suspend(); } catch (e) { /* ignore */ } } }
    },
    isEnabled: function () { return enabled; },
    setVoice: function (mode) { voiceMode = ['babble', 'speech', 'off'].indexOf(mode) >= 0 ? mode : 'babble'; if (voiceMode === 'off') stopVoice(); },
    voiceMode: function () { return voiceMode; },
    speechAvailable: speechAvailable,
    /** Must be called from a user gesture handler (browser autoplay rules). */
    unlock: function () { unlocked = true; },
    play: function (name) {
      if (onPlay) { try { onPlay(name); } catch (e) { /* captions are optional */ } }
      if (!enabled || !unlocked || !SFX[name]) return;
      try { SFX[name](); } catch (e) { /* audio is optional */ }
    },
    /** Called for every requested sound, even when sound is off (used for captions). */
    setOnPlay: function (f) { onPlay = f; },
    /** Volumes 0–100 for 'sfx', 'voice' and 'music'. */
    setVolume: function (kind, v) {
      vols[kind] = Math.max(0, Math.min(1, (Number(v) || 0) / 100));
      var bus = { sfx: sfxBus, voice: voiceBus, music: musicBus }[kind];
      if (bus) bus.gain.value = vols[kind];
    },
    volume: function (kind) { return Math.round(vols[kind] * 100); },
    /** iOS/iPadOS only allow audio that starts inside a touch/click: create and resume the context there. */
    prime: function prime() {
      unlocked = true;
      var c = ensure();
      if (c) {
        try { var b = c.createBuffer(1, 1, 22050), src = c.createBufferSource(); src.buffer = b; src.connect(c.destination); src.start(0); } catch (e) { /* ignore */ }
      }
      // iOS only lets speech start from a gesture: prime it with a silent utterance once.
      if (voiceMode === 'speech' && speechAvailable() && !prime.speechDone) {
        try { var u = new root.SpeechSynthesisUtterance(' '); u.volume = 0; root.speechSynthesis.speak(u); prime.speechDone = true; } catch (e) { /* ignore */ }
      }
    },
    /** True once the audio context is actually running (iOS may need several gestures). */
    running: function () { return !!(ctx && ctx.state === 'running'); },
    resume: function () { if (ctx && ctx.state !== 'running' && enabled) { try { ctx.resume(); } catch (e) { /* ignore */ } } },
    suspend: function () { if (ctx && ctx.state === 'running') { try { ctx.suspend(); } catch (e) { /* ignore */ } } },
    startMusic: startMusic,
    stopMusic: stopMusic,
    musicOn: function () { return music.on; },
    musicChapter: function () { return music.on ? music.chapter : null; },
    speak: speak,
    stopVoice: stopVoice,
    talkTime: talkTime,
    names: function () { return Object.keys(SFX); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
