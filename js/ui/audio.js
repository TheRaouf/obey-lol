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
  var holdVoice = null; // the running hold hum, so a release can cut it short (2.3 E78)
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

  /** One enveloped oscillator note. opts: type, vol, slide (end freq), vib (Hz depth), filter, attack, track.
   *  Returns { o, g } (the oscillator and its envelope gain) so a caller can cut it early. */
  function tone(freq, start, dur, opts) {
    var c = ensure();
    if (!c) return null;
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
    return { o: o, g: g };
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
    // 2.3 E78: the hum lasts the whole 2 s hold; OBEY.audio.stopHold() cuts it on an early release.
    hold: function () { stopHold(); holdVoice = tone(220, 0, 2.0, { type: 'triangle', vol: 0.03, slide: 660 }); },
    charged: function () { stopHold(); tone(659, 0, 0.12, { type: 'sine', vol: 0.04 }); tone(988, 0, 0.12, { type: 'sine', vol: 0.04 }); },
    // Wrong-answer gags
    pie: function () { tone(1200, 0, 0.35, { type: 'sine', vol: 0.06, slide: 300 }); noise(0.3, 0.35, { from: 900, to: 200, vol: 0.2, filterType: 'lowpass' }); },
    chicken: function () { tone(700, 0, 0.12, { type: 'sawtooth', vol: 0.06, slide: 1100, filter: 2000 }); tone(900, 0.16, 0.28, { type: 'sawtooth', vol: 0.07, slide: 500, vib: 40, vibRate: 18, filter: 2200 }); },
    trombone: function () { [392, 370, 349, 330].forEach(function (f, i) { tone(f, i * 0.32, i === 3 ? 0.9 : 0.3, { type: 'sawtooth', vol: 0.06, filter: 900, vib: i === 3 ? 8 : 0, vibRate: 5, slide: i === 3 ? 290 : 0 }); }); },
    zap: function () { tone(120, 0, 0.45, { type: 'sawtooth', vol: 0.06, vib: 60, vibRate: 40 }); noise(0, 0.45, { from: 3000, vol: 0.07, q: 4 }); },
    splash: function () { noise(0, 0.6, { from: 3000, to: 300, vol: 0.2 }); tone(500, 0.05, 0.3, { type: 'sine', vol: 0.05, slide: 120 }); },
    fail: function () { SFX.trombone(); },
    // 2.3 E83: the laugh follows the costume voice (dino low, alien high); 190 Hz (classic) gives the old 340 Hz.
    laugh: function (o) {
      var base = (o && o.base) || 190, f0 = Math.max(160, Math.min(520, 340 * base / 190)), k = f0 / 340;
      [0, 0.14, 0.28, 0.42].forEach(function (t, i) { tone(f0 - i * 18 * k, t, 0.1, { type: 'square', vol: 0.035, filter: 1400, slide: (280 - i * 18) * k }); });
    },
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
    boom: function () { noise(0, 1.2, { from: 800, to: 60, vol: 0.3, filterType: 'lowpass' }); tone(90, 0, 0.9, { type: 'sawtooth', vol: 0.08, slide: 25 }); },
    // 2.3 E80: one chime per earned star (C6, E6, G6), timed by the app to the staggered star pop.
    star1: function () { starChime(1047); },
    star2: function () { starChime(1319); },
    star3: function () { starChime(1568); },
    // 2.3 E84: U.N.D.O.'s voice — three filtered square bleeps.
    undo: function () { [1400, 1750, 1180].forEach(function (f, i) { tone(f, i * 0.08, 0.035, { type: 'square', vol: 0.03, filter: 2000, filterType: 'bandpass', q: 3, attack: 0.004 }); }); },
    // 2.3 E85: meta-screen actions.
    toggle: function (o) { var on = !(o && o.off); tone(on ? 660 : 990, 0, 0.06, { type: 'sine', vol: 0.04, slide: on ? 990 : 660, attack: 0.006 }); },
    wear: function () { noise(0, 0.18, { from: 2000, to: 6000, vol: 0.05, filterType: 'highpass' }); tone(784, 0.04, 0.12, { type: 'triangle', vol: 0.04 }); },
    paint: function () { noise(0, 0.25, { from: 800, to: 3000, vol: 0.06, filterType: 'bandpass', q: 1.4 }); },
    locked: function () { tone(110, 0, 0.07, { type: 'square', vol: 0.05, filter: 500, attack: 0.004 }); },
    boing: function () { tone(300, 0, 0.09, { type: 'sine', vol: 0.06, slide: 600, vib: 20, vibRate: 12 }); tone(600, 0.09, 0.16, { type: 'sine', vol: 0.06, slide: 250, vib: 20, vibRate: 12 }); }
  };

  function starChime(f) {
    tone(f, 0, 0.09, { type: 'triangle', vol: 0.05, attack: 0.005 });
    noise(0, 0.04, { from: 6000, vol: 0.02, filterType: 'highpass', attack: 0.003 });
  }

  /** Cuts the hold hum short (the player let go before the hold finished). */
  function stopHold() {
    var h = holdVoice;
    holdVoice = null;
    if (!h || !ctx) return;
    try {
      var now = ctx.currentTime;
      h.g.gain.cancelScheduledValues(now);
      h.g.gain.setValueAtTime(Math.max(0.0001, h.g.gain.value), now);
      h.g.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      h.o.stop(now + 0.06);
    } catch (e) { /* already stopped */ }
  }

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
      // 2.3 E82: phrase like speech — pause after commas, full stops and ellipses.
      if (/(…|\.\.\.)$/.test(w)) t += step * 3;
      else if (/\.$/.test(w)) t += step * 2;
      else if (/[,;:]$/.test(w)) t += step * 1.2;
    });
    if (mood === 'laughing') SFX.laugh({ base: v.base });
    return t;
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
        duckMusic(Math.max(ms, line.length * 60));
        return Math.max(ms, line.length * 60);
      } catch (e) { /* fall back to babble */ }
    }
    var dur = babble(text, costume, mood);
    duckMusic(Math.max(ms, (dur || 0) * 1000));
    return ms;
  }

  /** 2.3 E77: music dips to 45 % under the voice and comes back when the line ends (bible §9.4). */
  function duckMusic(ms) {
    if (!music.on || !musicBus || !ctx) return;
    try {
      var now = ctx.currentTime, g = musicBus.gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.setTargetAtTime(vols.music * 0.45, now, 0.05);
      g.setTargetAtTime(vols.music, now + ms / 1000, 0.2);
    } catch (e) { /* ignore */ }
  }

  /* ------------------------------------------------------------------ music */
  // A gentle generative loop per chapter: a pentatonic arpeggio over a soft bass note.
  // Chapters 0–7 keep their 2.1 loops. From 2.3 (E76) the later chapters get a family timbre
  // (office, home, outdoors, science, show, final) on top of their own scale and root, and the
  // Sabotage Studio bonus pack (chapter -1) has its own whole-tone "studio" family.
  // 2.4.1 follow-up: the 2.4 packs get their own families (supermarket, school, castle, sea, sports). A family may
  // also set `scale` (its own mode instead of SCALES[ch % 9]), `tempo` (step length × STEP_S), `dur`
  // (arpeggio note length, s), `bassDur`, `drone` (a soft fifth under the bass) and one quiet colour
  // event every 16 steps (`chime`, `chirp`, `swell`). Tonal voices stay ≤ .05, colour events ≤ .02.
  var SCALES = [[0, 2, 4, 7, 9], [0, 3, 5, 7, 10], [0, 2, 5, 7, 9], [0, 2, 4, 7, 11], [0, 3, 5, 8, 10], [0, 2, 3, 7, 9], [0, 4, 5, 7, 11], [0, 2, 4, 6, 9], [0, 3, 7, 8, 10]];
  var ROOTS = [262, 247, 277, 233, 294, 220, 262, 247, 196];
  var WHOLE_TONE = [0, 2, 4, 6, 8, 10];
  var FAMILIES = {
    core: { wave: 'triangle', filter: 1800, vol: 0.05 },
    office: { wave: 'square', filter: 1400, vol: 0.035, swing: 0.58 },
    home: { wave: 'triangle', filter: 1800, vol: 0.05 },
    outdoors: { wave: 'sine', vol: 0.05, chirp: true },
    science: { wave: 'sawtooth', filter: 900, q: 4, vol: 0.04 },
    show: { wave: 'square', vol: 0.03, vib: 4, vibRate: 5 },
    final: { wave: 'triangle', vol: 0.05, bassEvery: 4 },
    studio: { wave: 'triangle', filter: 2200, vol: 0.045 },
    // Supermarket muzak: soft sines, major-sixth pentatonic, a shop-PA "ding-dong" every 16 steps.
    supermarket: { wave: 'sine', vol: 0.045, scale: [0, 2, 4, 7, 9], dur: 0.6, chime: true },
    // School recorder: breathy triangle with a slow wobble, a little quicker than the core loop.
    school: { wave: 'triangle', filter: 2400, vol: 0.045, vib: 3, vibRate: 5.5, scale: [0, 2, 4, 5, 7, 9], tempo: 0.9 },
    // Castle lute: plucked, filtered saw in a minor (dorian) pentatonic, stately, over a root-and-fifth drone.
    castle: { wave: 'sawtooth', filter: 1200, vol: 0.035, scale: [0, 2, 3, 7, 9], tempo: 1.15, dur: 0.28, drone: true },
    // Under the sea: rolling sines with a wide slow vibrato and a low-passed wave swell every 16 steps.
    sea: { wave: 'sine', vol: 0.045, vib: 6, vibRate: 1.5, scale: [0, 2, 5, 7, 10], tempo: 1.2, dur: 0.7, swell: true },
    // Sports day brass band: short filtered squares, march tempo, oom-pah bass every 2 steps (no drums).
    sports: { wave: 'square', filter: 1600, vol: 0.035, scale: [0, 4, 7, 9, 12], tempo: 0.85, dur: 0.24, bassEvery: 2, bassDur: 0.4, bassVol: 0.045 }
  };
  // [first chapter id of the pack, family]; the Final Factory is found by id (else the last chapter).
  var PACKS = [['button-bay', 'core'], ['stapler-steppes', 'office'], ['kitchen-kerfuffle', 'home'], ['brolly-beach', 'outdoors'],
    ['beaker-basin', 'science'], ['magic-matinee', 'show'], ['aisle-antics', 'supermarket'], ['chalkboard-chasm', 'school'],
    ['moat-mayhem', 'castle'], ['periscope-pier', 'sea'], ['hurdle-hollow', 'sports']];
  /** The music family of a chapter index (0-based; -1 = the bonus pack). 2.4.1 follow-up: mapped by pack, so new
   * chapters can never fall through to `final` (the 2.4 bug: every index >= 33 played the finale). */
  function musicFamily(ch) {
    if (ch < 0) return 'studio';
    var ids = (OBEY.CHAPTERS || []).map(function (x) { return x.id; });
    var f = ids.indexOf('final-factory');
    if (f < 0) f = ids.length - 1;
    if (ch === f) return 'final';
    var best = 'core', at = -1;
    PACKS.forEach(function (e) { var s = ids.indexOf(e[0]); if (s >= 0 && s <= ch && s > at) { at = s; best = e[1]; } });
    return best;
  }
  var STEP_S = 0.42;
  var music = { on: false, chapter: 0, timer: null, step: 0, stepS: STEP_S };
  function stepFor(ch) { return STEP_S * (FAMILIES[musicFamily(ch)].tempo || 1); }
  function musicTick() {
    var c = ensure();
    if (!c || !music.on) return;
    var ch = music.chapter, fam = FAMILIES[musicFamily(ch)], st = music.stepS;
    var sc = ch < 0 ? WHOLE_TONE : (fam.scale || SCALES[ch % SCALES.length]), base = ch < 0 ? 233 : ROOTS[ch % ROOTS.length];
    var prev = routeTo; routeTo = musicBus;
    var deg = sc[(music.step * 2 + Math.floor(music.step / 4)) % sc.length];
    // Swing pushes every off-beat 8th later: at 0.58 the pair splits 58 / 42.
    var at = fam.swing && music.step % 2 ? (fam.swing - 0.5) * 2 * st : 0;
    tone(base * Math.pow(2, deg / 12) * (music.step % 8 < 4 ? 1 : 2), at, fam.dur || 0.5, { type: fam.wave, vol: Math.min(0.05, fam.vol), filter: fam.filter, q: fam.q, vib: fam.vib || 0, vibRate: fam.vibRate });
    if (music.step % (fam.bassEvery || 8) === 0) {
      tone(base / 2, 0, fam.bassDur || 1.6, { type: 'sine', vol: Math.min(0.06, fam.bassVol || 0.06) });
      if (fam.drone) tone(base * 0.75, 0, fam.bassDur || 1.6, { type: 'sine', vol: 0.03 });
    }
    var bar = music.step % 16 === 15;
    if (fam.chirp && bar) tone(2600, 0.1, 0.12, { type: 'sine', vol: 0.015, slide: 3200 });
    if (fam.chime && bar) { tone(1319, 0.05, 0.3, { type: 'sine', vol: 0.015 }); tone(1047, 0.3, 0.45, { type: 'sine', vol: 0.015 }); }
    if (fam.swell && bar) noise(0, 1.6, { from: 400, to: 900, vol: 0.02, filterType: 'lowpass', attack: 0.6 });
    routeTo = prev;
    music.step++;
  }
  function startMusic(chapter) {
    music.chapter = typeof chapter === 'number' && isFinite(chapter) ? chapter : 0;
    var st = stepFor(music.chapter);
    if (music.on) {
      // A new family may have its own tempo: restart the clock only when the step length changes.
      if (st !== music.stepS) { root.clearInterval(music.timer); music.stepS = st; music.timer = root.setInterval(musicTick, st * 1000); }
      return;
    }
    music.on = true; music.step = 0; music.stepS = st;
    music.timer = root.setInterval(musicTick, st * 1000);
  }
  function stopMusic() { music.on = false; if (music.timer) root.clearInterval(music.timer); music.timer = null; }

  OBEY.audio = {
    setEnabled: function (on) {
      enabled = !!on;
      if (!enabled) { stopVoice(); stopHold(); if (ctx && ctx.state === 'running') { try { ctx.suspend(); } catch (e) { /* ignore */ } } }
    },
    isEnabled: function () { return enabled; },
    setVoice: function (mode) { voiceMode = ['babble', 'speech', 'off'].indexOf(mode) >= 0 ? mode : 'babble'; if (voiceMode === 'off') stopVoice(); },
    voiceMode: function () { return voiceMode; },
    speechAvailable: speechAvailable,
    /** Must be called from a user gesture handler (browser autoplay rules). */
    unlock: function () { unlocked = true; },
    /**
     * Plays a sound. opts (optional): { delay: ms } starts it later (the caption appears with it);
     * other fields are passed to the recipe (e.g. { off: true } for `toggle`, { base } for `laugh`).
     */
    play: function (name, opts) {
      var fire = function () {
        if (onPlay) { try { onPlay(name); } catch (e) { /* captions are optional */ } }
        if (!enabled || !unlocked || !SFX[name]) return;
        try { SFX[name](opts); } catch (e) { /* audio is optional */ }
      };
      if (opts && opts.delay > 0) root.setTimeout(fire, opts.delay); else fire();
    },
    /** Cuts the hold hum (2.3 E78), e.g. when the player lets go early. */
    stopHold: stopHold,
    /** Called for every requested sound, even when sound is off (used for captions). */
    setOnPlay: function (f) { onPlay = f; },
    /** Volumes 0–100 for 'sfx', 'voice' and 'music'. */
    setVolume: function (kind, v) {
      vols[kind] = Math.max(0, Math.min(1, (Number(v) || 0) / 100));
      var bus = { sfx: sfxBus, voice: voiceBus, music: musicBus }[kind];
      if (bus) {
        // Cancel any ducking automation first, or the new value could be ignored.
        try { bus.gain.cancelScheduledValues(ctx.currentTime); bus.gain.setValueAtTime(vols[kind], ctx.currentTime); } catch (e) { /* ignore */ }
        bus.gain.value = vols[kind];
      }
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
    musicFamily: musicFamily,
    names: function () { return Object.keys(SFX); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
