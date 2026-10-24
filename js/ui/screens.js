/* OBEY? LOL. — static-ish screens: menu, map, field notes, costumes, themes, achievements,
 * settings, credits. Each render function receives the App and returns nothing; controls use
 * data-act attributes handled by one delegated listener in app.js. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var A = OBEY.art, E = OBEY.util.escape, P = OBEY.progress;

  function backBar(title, id, extra, quipKey) {
    var q = quipKey && OBEY.extras.SCREEN_QUIPS[quipKey];
    return `<header class="topbar">
      <button class="chip-btn" data-act="nav" data-to="menu">${A.icon('back')}<span>Menu</span></button>
      <h1 class="screen-title" id="${id}">${E(title)}</h1>
      <div class="topbar-end">${extra || ''}</div>
    </header>` + (q ? `<p class="screen-quip"><span class="speaker">Bossworth:</span> ${E(q[Math.floor(Math.random() * q.length)])}</p>` : '');
  }
  OBEY.backBar = backBar;

  function statRow(s) {
    return `<ul class="stat-row" aria-label="Overall progress">
      <li><b>${s.completed.length}</b><span>of ${OBEY.LEVEL_COUNT} levels</span></li>
      <li><b>${P.totalStars(s)}</b><span>of ${OBEY.LEVEL_COUNT * 3} stars</span></li>
      <li><b>${s.secrets.length}</b><span>of 15 secrets</span></li>
    </ul>`;
  }

  var MENU_LINES = {
    fresh: ['Whatever you do, do NOT press Play.', 'pleased'],
    back: ['Oh. You\'re back. I was just… practising my honest face.', 'suspicious'],
    done: ['You finished everything. Show-off. There may still be secrets. Or not. (There are.)', 'annoyed'],
    allDone: ['Every level. Every secret. I have nothing left to hide. That\'s a lie. But a small one.', 'defeated']
  };

  /* ------------------------------------------------------------------- menu */
  function menu(app, el) {
    var s = app.save;
    var next = P.nextLevel(s);
    var has = P.hasProgress(s);
    var line = !has ? MENU_LINES.fresh : (next ? MENU_LINES.back : (s.secrets.length === 15 ? MENU_LINES.allDone : MENU_LINES.done));
    var playLabel = !has ? 'Play' : (next ? 'Continue: Level ' + next : 'Pick a level on the map');
    el.innerHTML = `
      <div class="menu-layout">
        <div class="menu-hero">
          <h1 class="logo" id="menu-title" aria-label="OBEY? LOL.">
            <span class="logo-obey">OBEY?</span><span class="logo-lol">LOL.</span>
          </h1>
          <p class="tagline">A puzzle game where the narrator gives the instructions. Some of them are even true.</p>
          <div class="menu-narrator">
            <div class="narrator-mini" aria-hidden="true">${A.narrator(s.costumes.selected, line[1])}</div>
            <p class="bubble bubble-left"><span class="speaker">Bossworth</span>${E(line[0])}</p>
          </div>
          ${statRow(s)}
          <p class="diff-line">Difficulty: <b>${E(app.diffName(s.difficulty))}</b> <button class="btn small-btn" data-act="difficulty">Change</button></p>
          ${goalLine(s)}
          ${whatsNew(s)}
          <p class="trust-line small">No ads · no tracking · works offline${s.profileName ? ' · playing as <b>' + E(s.profileName) + '</b>' : ''}</p>
        </div>
        <nav class="menu-nav" aria-label="Main menu">
          <button class="slip slip-primary" data-act="play">${A.icon('play')}<span>${E(playLabel)}</span></button>
          <button class="slip" data-act="new-game">${A.icon('plus')}<span>New game</span></button>
          <button class="slip" data-act="nav" data-to="map">${A.icon('map')}<span>Adventure map</span></button>
          <button class="slip" data-act="nav" data-to="daily">${A.icon('calendar')}<span>Daily Dare</span><em>${s.daily.done.indexOf(OBEY.extras.dateKey()) >= 0 ? 'done today' : 'streak ' + OBEY.extras.currentStreak(s, OBEY.extras.dateKey())}</em></button>
          <button class="slip" data-act="nav" data-to="sabotage">${A.icon('hammer')}<span>Sabotage file</span><em>${s.ruins.length}/${OBEY.extras.RUINS.length}</em></button>
          <button class="slip" data-act="nav" data-to="secrets">${A.icon('eye')}<span>Secret field notes</span><em>${s.secrets.length}/15</em></button>
          <button class="slip" data-act="nav" data-to="costumes">${A.icon('bowtie')}<span>Narrator costumes</span><em>${s.costumes.unlocked.length}/8</em></button>
          <button class="slip" data-act="nav" data-to="themes">${A.icon('palette')}<span>Themes</span><em>${s.themes.unlocked.length}/4</em></button>
          <button class="slip" data-act="nav" data-to="achievements">${A.icon('star')}<span>Achievements</span><em>${Object.keys(s.achievements).length}/${OBEY.ACHIEVEMENTS.length}</em></button>
          <button class="slip" data-act="nav" data-to="trophies">${A.icon('cup')}<span>Trophy room</span><em>${Object.keys(s.trophies).length}/${OBEY.TROPHIES.length}</em></button>
          <button class="slip" data-act="nav" data-to="stats">${A.icon('chart')}<span>Bossworth's file on you</span></button>
          <button class="slip" data-act="nav" data-to="settings">${A.icon('gear')}<span>Settings</span></button>
          <button class="slip" data-act="nav" data-to="credits">${A.icon('scroll')}<span>Credits</span></button>
        </nav>
      </div>`;
  }

  function goalLine(s) {
    var g = OBEY.extras.nextGoal(s);
    return g ? `<p class="goal-line small"><b>Next goal:</b> ${E(g)}</p>` : '';
  }
  function whatsNew(s) {
    if (s.seenVersion === OBEY.VERSION) return '';
    return `<section class="whats-new panel" aria-labelledby="wn-title">
      <h2 id="wn-title">New in ${E(OBEY.VERSION)}</h2>
      <ul>
        <li><b>Art polish:</b> every open item from our art director — props hang on hooks or stand on tables, long rule signs are easier to read, and the dark undersea rooms have a seabed so their buttons look pressable.</li>
        <li>Shared drawings for objects that appear in several chapters, bigger labels on tins and crates, and map labels that no longer sit on a level.</li>
        <li><b>Music is now on by default</b>, with every sound effect — switch it off in Settings any time.</li>
        <li>Still 236 levels (133–232 arrived in 2.4) — nothing about your progress changes.</li>
      </ul>
      <button class="btn small-btn" data-act="dismiss-whatsnew">Got it</button>
    </section>`;
  }

  /* -------------------------------------------------------------------- map */
  var MAP_W = 400, ROW = 100, TOP = 80;
  function nodePos(i) { return { x: 200 + 118 * Math.sin(i * 1.1 + 0.3), y: TOP + i * ROW }; }
  function curve(pts, upto) {
    var d = 'M' + pts[0].x + ' ' + pts[0].y;
    for (var i = 1; i <= upto; i++) {
      var a = pts[i - 1], b = pts[i];
      d += ' C' + a.x + ' ' + (a.y + ROW * 0.5) + ' ' + b.x + ' ' + (b.y - ROW * 0.5) + ' ' + b.x + ' ' + b.y;
    }
    return d;
  }

  /** Where a chapter's region label goes (2.4.1). Returns { right, y (baseline), fs (font units), lines }.
   * The label sits 24 units above a node's centre, level with the node disc, so it must clear the disc
   * sideways: the side's room runs from the label margin (36 / 364) to NODE_R from the node centre.
   * Bagel Fat One averages 0.5 em a glyph; 0.55 keeps slack. */
  var NODE_R = 44;
  function regionLabel(k, c, cup, pts) {
    var name = (k + 1) + '. ' + c.name, tier = cup ? '★ ' + OBEY.TROPHY_TIERS[cup] : '';
    var wid = function (t, fs) { return t.length * fs * 0.55; };
    var rows = Math.min(4, c.levels.length), best = null;
    for (var j = 0; j < rows; j++) {
      var q = pts[c.levels[j] - 1];
      if (!q) continue;
      var sides = [{ right: q.x < MAP_W / 2, room: 0 }, { right: q.x >= MAP_W / 2, room: 0 }];
      for (var i = 0; i < 2; i++) {
        var sd = sides[i], room = sd.right ? 364 - (q.x + NODE_R) : (q.x - NODE_R) - 36;
        var y = j === 0 && k === 0 ? 26 : q.y - 24;
        if (wid(tier ? name + ' ' + tier : name, 17) <= room) return { right: sd.right, y: y, fs: 17, lines: [tier ? name + ' ' + tier : name] };
        if (wid(name, 17) <= room) return { right: sd.right, y: y, fs: 17, lines: tier ? [name, tier] : [name] };
        if (!best || room > best.room) best = { right: sd.right, y: y, room: room };
      }
    }
    var fs = Math.max(14, Math.floor(17 * best.room / wid(name, 17)));
    return { right: best.right, y: best.y, fs: fs, lines: tier ? [name, tier] : [name] };
  }

  function map(app, el) {
    var s = app.save, L = OBEY.LEVEL_COUNT;
    var H = TOP * 2 + (L - 1) * ROW;
    var pts = [];
    for (var i = 0; i < L; i++) pts.push(nodePos(i));
    var bands = OBEY.CHAPTERS.map(function (c, k) {
      var first = c.levels[0];
      var y0 = k === 0 ? 0 : TOP + (first - 1) * ROW - ROW / 2;
      var h = k === OBEY.CHAPTERS.length - 1 ? H - y0 : (k === 0 ? TOP + ROW * 3.5 : ROW * 4);
      var cup = s.trophies['cup-' + c.id] || 0;
      // E54: each chapter family has a landmark icon: a small one on the label's outer edge and a
      // faint large watermark (12 %) in the region's emptiest corner.
      // 2.4.1 (bible §18): the label goes beside one of the chapter's own nodes, on the side with room, so it
      // never covers a node. Rows are tried top-down; the far side of each node first. A node disc with its
      // badges is at most NODE_R units wide each side at a 320 px phone (48 px disc on a 0.74 scale map).
      var lab = regionLabel(k, c, cup, pts), right = lab.right;
      var ic = A.chapterIcon(k);
      var mark = function (cls, x, y, size, op) {
        return `<svg class="${cls} region-icon-${ic}" x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" style="color:var(--ink)" opacity="${op}">${A.iconPaths(ic)}</svg>`;
      };
      // The watermark goes in whichever of the three free corners is furthest from the path's nodes.
      var wm = Math.min(48, h - 60), best = null;
      [[right ? 12 : MAP_W - 12 - wm, y0 + 40], [12, y0 + h - 12 - wm], [MAP_W - 12 - wm, y0 + h - 12 - wm]].forEach(function (c) {
        var cx = c[0] + wm / 2, cy = c[1] + wm / 2, d = Infinity;
        pts.forEach(function (q) { d = Math.min(d, Math.hypot((q.x - cx) * 0.8, q.y - cy)); });
        if (!best || d > best[2]) best = [c[0], c[1], d];
      });
      return `<rect x="0" y="${y0}" width="${MAP_W}" height="${h}" fill="var(--region-${(k % 4) + 1})" />` +
        (wm > 24 ? mark('region-watermark', best[0], best[1], wm, '.12') : '') +
        mark('region-icon', right ? 370 : 12, lab.y - 14, 18, '.7') +
        `<text class="region-label" x="${right ? 364 : 36}" y="${lab.y}" text-anchor="${right ? 'end' : 'start'}"${lab.fs !== 17 ? ` style="font-size:${lab.fs}px"` : ''}>` +
        lab.lines.map(function (t, i) { return i ? `<tspan x="${right ? 364 : 36}" dy="${Math.round(lab.fs * 1.05)}">${E(t)}</tspan>` : E(t); }).join('') + '</text>';
    }).join('');
    var deco = '';
    for (i = 0; i < L; i++) {
      var p = pts[i], side = p.x > 200 ? -1 : 1;
      deco += `<circle cx="${p.x + side * 120}" cy="${p.y + 20}" r="${6 + (i * 7) % 9}" class="map-dot"/>`;
    }
    var current = P.nextLevel(s);
    var nodes = pts.map(function (p, idx) {
      var n = idx + 1, def = OBEY.getLevel(n);
      var completed = P.isCompleted(s, n), unlocked = P.canPlay(s, n), skipped = P.isSkipped(s, n);
      var state = completed ? 'done' : (skipped ? 'skipped' : (unlocked ? 'open' : 'locked'));
      var ruined = OBEY.extras.ruinsFor(n).some(function (r) { return s.ruins.indexOf(r.id) >= 0; });
      var secretsLeft = unlocked && OBEY.SECRETS.some(function (x) { return x.level === n && s.secrets.indexOf(x.id) < 0; });
      var isCur = n === current;
      var bd = s.bestDifficulty[n];
      var label = 'Level ' + n + ': ' + def.title + ' — ' + (completed ? 'completed, ' + s.bestStars[n] + ' of 3 stars, best on ' + app.diffName(bd) : (skipped ? 'skipped, still to solve' : (unlocked ? (isCur ? 'next up' : 'unlocked') : 'locked, finish level ' + (n - 1) + ' first'))) +
        (ruined ? ', ruined' : '') + (secretsLeft ? ', secrets still hidden here' : '') + (s.bestActions[n] !== undefined ? ', best ' + s.bestActions[n] + ' actions' : '');
      return `<button class="map-node node-${state}${isCur ? ' is-current' : ''}" style="left:${(p.x / MAP_W * 100).toFixed(2)}%;top:${(p.y / H * 100).toFixed(3)}%"
          data-act="open-level" data-level="${n}" aria-label="${E(label)}" ${unlocked ? '' : 'aria-disabled="true"'}>
          <span class="node-disc">${state === 'locked' ? A.icon('lock') : n}${completed ? `<span class="node-medal medal-${bd}" aria-hidden="true">${bd[0].toUpperCase()}</span>` : ''}${secretsLeft ? `<span class="node-secret" aria-hidden="true">${A.icon('eye')}</span>` : ''}${ruined ? '<span class="node-ruined" aria-hidden="true">RUINED</span>' : ''}</span>
          <span class="node-title">${E(def.title)}</span>
          <span class="node-stars">${completed ? A.stars(s.bestStars[n]) : (skipped ? '<span class="node-flag skip-flag">Skipped</span>' : (isCur ? '<span class="node-flag">Next</span>' : ''))}</span>
        </button>`;
    }).join('');
    el.innerHTML = backBar('Adventure map', 'map-title', `<span class="pill">${P.totalStars(s)}/${L * 3} ${A.icon('star')}</span>`, 'map') + `
      <div class="map-layout">
        <aside class="map-side panel">
          ${statRow(s)}
          <p class="map-help">Difficulty: <b>${E(app.diffName(s.difficulty))}</b> <button class="btn small-btn" data-act="difficulty">Change</button></p>
          <p class="map-help">Tap any unlocked level to play or replay it. Replays can only improve your best stars. The letter on a finished level shows the hardest difficulty you beat it on.</p>
          ${current ? `<button class="slip slip-primary" data-act="open-level" data-level="${current}">${A.icon('play')}<span>Play Level ${current}</span></button>` : `<p class="map-help strong">All ${L} levels complete.</p>`}
          ${s.skipped.length ? `<p class="map-help">Skipped (still to solve): ${s.skipped.map(function (k) { return `<button class="btn small-btn" data-act="open-level" data-level="${k}">Level ${k}</button>`; }).join(' ')}</p>` : ''}
          <p class="map-help">${P.bonusUnlocked(s) ? `<button class="btn small-btn" data-act="nav" data-to="sabotage">${A.icon('hammer')} Sabotage Studio</button>` : 'The Sabotage Studio bonus pack opens after Level ' + P.BONUS_UNLOCK_LEVEL + '.'}</p>
          ${s.settings.timer && s.completed.length ? `<p class="map-help">Speedrun total (sum of best times): <b>${app.formatTime(s.completed.reduce(function (t, k) { return t + (s.bestTime[k] || 0); }, 0), true)}</b></p>` : ''}
          <p class="map-help small">Tip: use the arrow keys to move between levels. An eye marks levels with secrets left to find.</p>
        </aside>
        <div class="map-scroll">
          <div class="map-world" style="aspect-ratio:${MAP_W}/${H}">
            <svg class="map-svg" viewBox="0 0 ${MAP_W} ${H}" preserveAspectRatio="none" aria-hidden="true">
              ${bands}${deco}
              <path d="${curve(pts, L - 1)}" class="map-path"/>
              <path d="${curve(pts, Math.min(s.highestUnlocked, L) - 1)}" class="map-path-done"/>
            </svg>
            ${nodes}
          </div>
        </div>
      </div>`;
    var cur = el.querySelector('.map-node.is-current');
    if (cur && cur.scrollIntoView) setTimeout(function () { cur.scrollIntoView({ block: 'center', behavior: 'auto' }); }, 0);
  }

  /* --------------------------------------------------------------- trophies */
  function trophies(app, el) {
    var s = app.save;
    var won = OBEY.TROPHIES.filter(function (t) { return s.trophies[t.id]; }).length;
    var card = function (t) {
      var tier = s.trophies[t.id] || 0;
      var pr = P.trophyProgress(s, t);
      var tierTxt = tier ? OBEY.TROPHY_TIERS[tier] : 'Not won yet';
      return `<li class="trophy-card${tier ? ' won tier-' + tier : ''}">
        <div class="trophy-art" aria-hidden="true">${A.object('trophy', { tier: tier, special: t.kind === 'special', icon: t.kind === 'chapter' ? A.chapterIcon(t.chapter) : null })}</div>
        <h2>${E(t.name)}</h2>
        <p class="trophy-tier">${tier ? A.icon('star') : A.icon('lock')} ${E(tierTxt)}</p>
        ${t.kind === 'chapter' ? '' : `<p class="small">${E(t.desc)}</p>`}
        <div class="bar small" role="progressbar" aria-label="${E(t.name)} progress" aria-valuemin="0" aria-valuemax="${pr[1]}" aria-valuenow="${pr[0]}"><span style="width:${(pr[0] / pr[1] * 100).toFixed(1)}%"></span></div>
        <p class="small">${pr[0]} / ${pr[1]}</p>
      </li>`;
    };
    el.innerHTML = backBar('Trophy room', 'trophies-title', `<span class="pill">${won}/${OBEY.TROPHIES.length}</span>`, 'trophies') + `
      <div class="page">
        <p class="page-intro panel">Finish all four levels of a chapter to win its cup. Chapter cups come in Bronze (Easy), Silver (Medium) and Gold (Hard) — the lowest difficulty you used in that chapter decides the metal. Replay a level on a harder difficulty to upgrade its cup.</p>
        <h2 class="section-title">Chapter cups</h2>
        <ul class="trophy-grid">${OBEY.TROPHIES.filter(function (t) { return t.kind === 'chapter'; }).map(card).join('')}</ul>
        <h2 class="section-title">Special trophies</h2>
        <ul class="trophy-grid">${OBEY.TROPHIES.filter(function (t) { return t.kind === 'special'; }).map(card).join('')}</ul>
      </div>`;
  }

  /* ---------------------------------------------------------------- secrets */
  function secrets(app, el) {
    var s = app.save;
    var cards = OBEY.SECRETS.map(function (sec) {
      var found = s.secrets.indexOf(sec.id) >= 0;
      var reached = sec.level <= s.highestUnlocked;
      return found
        ? `<li class="note-card found"><span class="note-level">Level ${sec.level}</span><h2>${E(sec.name)}</h2><p>${E(sec.desc)}</p><span class="stamp-mini">${A.icon('check')}Found</span></li>`
        : `<li class="note-card"><span class="note-level">Level ${sec.level}</span><h2 aria-label="Undiscovered secret">? ? ?</h2><p>${reached ? 'Clue: ' + E(sec.hint) : 'Reach Level ' + sec.level + ' to unlock a clue.'}</p></li>`;
    }).join('');
    el.innerHTML = backBar('Secret field notes', 'secrets-title', `<span class="pill">${s.secrets.length}/15</span>`) + `
      <div class="page">
        <div class="progress-block panel">
          <p>You have found <b>${s.secrets.length}</b> of 15 secrets.${s.secrets.length === 15 ? ' Something golden waits in Level ' + OBEY.FINAL + '.' : ' Find all 15 for a very special ending.'}</p>
          <div class="bar" role="progressbar" aria-label="Secrets found" aria-valuemin="0" aria-valuemax="15" aria-valuenow="${s.secrets.length}"><span style="width:${(s.secrets.length / 15 * 100).toFixed(1)}%"></span></div>
        </div>
        <ul class="note-grid">${cards}</ul>
      </div>`;
  }

  /* --------------------------------------------------------------- costumes */
  function costumes(app, el) {
    var s = app.save;
    var cards = OBEY.COSTUMES.map(function (c) {
      var un = s.costumes.unlocked.indexOf(c.id) >= 0, sel = s.costumes.selected === c.id;
      var worn = s.costumes.worn.indexOf(c.id) >= 0;
      return `<li class="wardrobe-card${sel ? ' selected' : ''}${un ? '' : ' locked'}">
        <div class="wardrobe-art" aria-hidden="true">${un ? A.narrator(c.id, sel ? 'pleased' : 'neutral') : '<div class="silhouette">' + A.narrator(c.id, 'neutral') + '</div>'}</div>
        <h2>${E(c.name)}</h2>
        ${sel ? `<p class="status">${A.icon('check')} Wearing now</p>`
          : (un ? `<button class="btn" data-act="costume" data-id="${c.id}" aria-label="Wear the ${E(c.name)} costume">Wear</button>${worn ? '' : '<p class="status small">Not tried on yet</p>'}`
            : `<p class="status">${A.icon('lock')} ${E(OBEY.describeUnlock(c.unlock))}</p>`)}
      </li>`;
    }).join('');
    el.innerHTML = backBar('Narrator costumes', 'costumes-title', `<span class="pill">${s.costumes.unlocked.length}/8</span>`) + `
      <div class="page"><p class="page-intro panel">Costumes change how Bossworth looks and how he opens each level. They never change the puzzles.</p>
      <ul class="wardrobe-grid">${cards}</ul></div>`;
  }

  /* ----------------------------------------------------------------- themes */
  function themes(app, el) {
    var s = app.save;
    var cards = OBEY.THEMES.map(function (t) {
      var un = s.themes.unlocked.indexOf(t.id) >= 0, sel = s.themes.selected === t.id;
      return `<li class="theme-card${sel ? ' selected' : ''}${un ? '' : ' locked'}">
        <div class="theme-preview" data-theme="${t.id}" aria-hidden="true">
          <div class="tp-bar"></div><div class="tp-panel"><span class="tp-btn"></span><span class="tp-btn alt"></span></div><div class="tp-stage"><span></span></div>
        </div>
        <h2>${E(t.name)}</h2><p class="small">${E(t.blurb)}</p>
        ${sel ? `<p class="status">${A.icon('check')} In use</p>`
          : (un ? `<button class="btn" data-act="theme" data-id="${t.id}" aria-label="Use the ${E(t.name)} theme">Use theme</button>`
            : `<p class="status">${A.icon('lock')} ${E(OBEY.describeUnlock(t.unlock))}</p>`)}
      </li>`;
    }).join('');
    el.innerHTML = backBar('Themes', 'themes-title', `<span class="pill">${s.themes.unlocked.length}/4</span>`) + `
      <div class="page"><ul class="theme-grid">${cards}</ul></div>`;
  }

  /* ----------------------------------------------------------- achievements */
  function achievements(app, el) {
    var s = app.save;
    var list = OBEY.ACHIEVEMENTS.map(function (a) {
      var pr = a.progress(s, P), got = !!s.achievements[a.id];
      var pct = got ? 100 : Math.min(100, pr[0] / pr[1] * 100);
      return `<li class="ach${got ? ' got' : ''}">
        <span class="ach-badge" aria-hidden="true">${got ? A.icon('check') : A.icon('lock')}</span>
        <div class="ach-body"><h2>${E(a.name)}</h2><p>${E(a.desc)}</p>
          <div class="bar small" role="progressbar" aria-label="${E(a.name)} progress" aria-valuemin="0" aria-valuemax="${pr[1]}" aria-valuenow="${Math.min(pr[0], pr[1])}"><span style="width:${pct.toFixed(1)}%"></span></div>
        </div>
        <span class="ach-state">${got ? 'Unlocked' : Math.min(pr[0], pr[1]) + '/' + pr[1]}</span>
      </li>`;
    }).join('');
    var endings = OBEY.ENDINGS.map(function (en) {
      var seen = s.endings.seen.indexOf(en.id) >= 0;
      var times = s.endings.history.filter(function (h) { return h.id === en.id; }).length;
      return `<li class="ending-card gallery-${en.id}${seen ? ' seen' : ''}">
        <h3>${seen ? E(en.name) : 'Unknown ending'}</h3>
        <p class="small">${E(en.short)}${seen ? ' · reached ' + times + (times === 1 ? ' time' : ' times') : ''}</p>
        <p>${E(en.condition)}</p>
        ${seen ? `<button class="btn" data-act="replay-ending" data-id="${en.id}">Replay ending</button>` : `<p class="status">${A.icon('lock')} Not reached yet</p>`}
      </li>`;
    }).join('');
    var got = Object.keys(s.achievements).length;
    el.innerHTML = backBar('Achievements', 'achievements-title', `<span class="pill">${got}/${OBEY.ACHIEVEMENTS.length}</span>`, 'achievements') + `
      <div class="page">
        <ul class="ach-list">${list}</ul>
        <h2 class="section-title">Endings gallery</h2>
        <ul class="ending-grid">${endings}</ul>
      </div>`;
  }

  /* --------------------------------------------------------------- settings */
  function radio(name, value, current, label) {
    return `<label class="radio"><input type="radio" name="${name}" value="${value}" ${current === value ? 'checked' : ''} data-act="setting" data-key="${name}"><span>${E(label)}</span></label>`;
  }
  function sw(key, on, label, desc) {
    return `<div class="switch-row"><button class="switch" role="switch" aria-checked="${!!on}" data-act="toggle-setting" data-key="${key}" aria-label="${E(label)}"><span class="knob"></span><span class="switch-text">${E(label)}: ${on ? 'On' : 'Off'}</span></button>${desc ? `<p class="small">${E(desc)}</p>` : ''}</div>`;
  }
  function slider(key, value, label) {
    return `<label class="slider"><span>${E(label)}</span><input type="range" min="0" max="100" step="5" value="${value}" data-act="setting" data-key="${key}" aria-label="${E(label)}"><output>${value}%</output></label>`;
  }
  function settings(app, el) {
    var st = app.save.settings;
    var inLevel = app.lastLevel && P.canPlay(app.save, app.lastLevel);
    var profiles = [];
    for (var i = 1; i <= OBEY.save.PROFILES; i++) profiles.push(app.profileSummary(i));
    el.innerHTML = backBar('Settings', 'settings-title', '', 'settings') + `
      <div class="page settings">
        <section class="panel setting">
          <h2>Sound effects</h2>
          <button class="switch" role="switch" aria-checked="${st.sound}" data-act="toggle-sound" aria-label="Sound effects"><span class="knob"></span><span class="switch-text">${st.sound ? 'On' : 'Off'}</span></button>
          <p class="small">Every puzzle can be solved with sound off.</p>
          ${slider('sfxVol', st.sfxVol, 'Effects volume')}
          ${slider('voiceVol', st.voiceVol, 'Voice volume')}
          ${sw('music', st.music, 'Chapter music', 'A gentle tune per chapter while you play. Needs sound effects on.')}
          ${slider('musicVol', st.musicVol, 'Music volume')}
          ${sw('captions', st.captions, 'Sound captions', 'Shows every sound effect as text, e.g. [sad trombone].')}
          ${sw('haptics', st.haptics, 'Vibration', 'Short buzzes on traps and wrong moves, on devices that support it (not iPhone or iPad).')}
        </section>
        <fieldset class="panel setting">
          <legend><h2>Bossworth's voice</h2></legend>
          ${radio('voice', 'babble', st.voice, 'Babble (funny gibberish, works everywhere)')}${radio('voice', 'speech', st.voice, 'Real speech' + (OBEY.audio.speechAvailable() ? ' (your device\'s voice)' : ' (not available here; uses babble)'))}${radio('voice', 'off', st.voice, 'Silent')}
          <p class="small">The voice needs sound effects on. Every line is always shown as text.</p>
        </fieldset>
        <fieldset class="panel setting">
          <legend><h2>Difficulty</h2></legend>
          ${OBEY.DIFFICULTIES.map(function (d) { return radio('difficulty', d.id, app.save.difficulty, d.name + ': ' + d.blurb); }).join('')}
          <p class="small">Changes apply from your next attempt. Each level remembers the hardest difficulty you beat it on.</p>
        </fieldset>
        <fieldset class="panel setting">
          <legend><h2>Motion</h2></legend>
          ${radio('motion', 'system', st.motion, 'Follow my device')}${radio('motion', 'reduce', st.motion, 'Reduce motion')}${radio('motion', 'full', st.motion, 'Full motion')}
        </fieldset>
        <fieldset class="panel setting">
          <legend><h2>Text size</h2></legend>
          ${radio('textSize', 'normal', st.textSize, 'Normal')}${radio('textSize', 'large', st.textSize, 'Large')}${radio('textSize', 'xl', st.textSize, 'Extra large')}
        </fieldset>
        <fieldset class="panel setting">
          <legend><h2>Easier to see and use</h2></legend>
          ${radio('contrast', 'normal', st.contrast, 'Normal colours')}${radio('contrast', 'high', st.contrast, 'High contrast (colour-blind-safe accents, thicker outlines)')}
          ${radio('font', 'fun', st.font, 'Bubbly headings font')}${radio('font', 'plain', st.font, 'Plain font everywhere')}
          ${radio('hand', 'right', st.hand, 'Right-handed layout')}${radio('hand', 'left', st.hand, 'Left-handed layout (tools and narrator on the other side)')}
          ${sw('holdAssist', st.holdAssist, 'Hold assist', 'Press once to start a press-and-hold, press again to let go. No need to keep your finger down.')}
          ${sw('timer', st.timer, 'Speedrun timer', 'Shows a timer while you play. Personal best times are always recorded.')}
          <p><button class="btn" data-act="keys-help">${A.icon('keyboard')} Keyboard shortcuts</button></p>
        </fieldset>
        <section class="panel setting">
          <h2>Players on this device</h2>
          <p class="small">Up to ${OBEY.save.PROFILES} players, each with their own progress. Handy for a shared iPad.</p>
          <ul class="profile-list">${profiles.map(function (p) {
            var cur = p.slot === app.slot;
            return `<li class="profile${cur ? ' current' : ''}"><span><b>${E(p.name)}</b> <span class="small">${p.empty ? 'new player' : p.done + ' levels · ' + p.stars + ' stars'}</span></span>` +
              (cur ? '<span class="status">' + A.icon('check') + ' Playing now</span>' : `<button class="btn small-btn" data-act="switch-profile" data-slot="${p.slot}">Play as ${E(p.name)}</button>`) + '</li>';
          }).join('')}</ul>
          <label class="field">Your name <input id="profile-name" type="text" maxlength="20" value="${E(app.save.profileName)}" placeholder="Player ${app.slot}" autocomplete="nickname"></label>
        </section>
        <section class="panel setting">
          <h2>Move your save</h2>
          <p class="small">Copy a save code to move your progress to another browser or device, then paste it there.</p>
          <div class="btn-row"><button class="btn" data-act="copy-code">Copy my save code</button></div>
          <label class="field">Paste a save code <textarea id="import-code" rows="3" placeholder="OBEYLOL1.…" spellcheck="false" autocapitalize="off"></textarea></label>
          <div class="btn-row"><button class="btn" data-act="load-code">Load save code</button></div>
        </section>
        <section class="panel setting">
          <h2>Advanced Bossworth settings</h2>
          ${slider('honesty', st.honesty, 'Bossworth honesty')}
          ${sw('facade', st.facade, 'Cheerful façade', '')}
          <p class="small">Neither setting does anything. Bossworth insisted they exist.</p>
        </section>
        <section class="panel setting">
          <h2>Your save</h2>
          <p class="small">${app.store.persistent ? 'Progress saves automatically in this browser.' : 'This browser is blocking storage, so progress only lasts until you close this tab.'}${app.loadStatus === 'recovered' ? ' An unreadable save was found and replaced with a fresh one.' : ''}${app.loadStatus === 'migrated' ? ' Your save was upgraded to the latest format.' : ''}</p>
          <div class="btn-row">
            ${inLevel ? `<button class="btn" data-act="open-level" data-level="${app.lastLevel}">Back to ${OBEY.levelLabel(app.lastLevel)}</button>` : ''}
            <button class="btn" data-act="tutorial">Replay the tutorial</button>
            <button class="btn danger" data-act="reset-all">Reset all progress</button>
          </div>
        </section>
      </div>`;
  }

  /* ---------------------------------------------------------------- credits */
  /** E62: the cast — every costume at 64 px, in colour once unlocked, as a silhouette until then. */
  function castStrip(s) {
    return `<section class="panel cast-panel" aria-labelledby="cast-title">
          <h2 id="cast-title">The cast</h2>
          <ul class="cast-strip" style="display:flex;flex-wrap:wrap;justify-content:center;gap:14px;list-style:none;margin:0;padding:0">${OBEY.COSTUMES.map(function (c) {
            var un = s.costumes.unlocked.indexOf(c.id) >= 0;
            var art = A.narrator(c.id, un ? 'pleased' : 'neutral');
            return `<li class="cast-member${un ? '' : ' locked'}" style="display:flex;flex-direction:column;align-items:center;gap:4px;width:84px;text-align:center"><div class="cast-art" aria-hidden="true" style="width:64px;height:64px">${un ? art : '<div class="silhouette">' + art + '</div>'}</div><span class="cast-name">${E(c.name)}${un ? '' : ' <span class="visually-hidden">(locked)</span>'}</span></li>`;
          }).join('')}</ul>
        </section>`;
  }
  function credits(app, el) {
    el.innerHTML = backBar('Credits', 'credits-title') + `
      <div class="page credits">
        <section class="panel">
          <h2>OBEY? LOL. <span class="small">version ${OBEY.VERSION}</span></h2>
          <p>Game design, writing, puzzles, code-drawn art and synthesised sound effects were created from scratch for this project. Bossworth is an original character.</p>
          <p>Fonts: <b>Bagel Fat One</b> (The Bagel Fat Project Authors) and <b>Atkinson Hyperlegible</b> (Braille Institute of America), both under the SIL Open Font License 1.1 and bundled locally.</p>
          <p>No accounts, ads, trackers or network requests. Your progress stays in this browser.</p>
          <p>Version 2.1 was shaped by reviews of narrator and trick-puzzle games, and by <i>Dude, Stop</i> (Team HalfBeard), whose idea of rewarding deliberate failure inspired the ruins, U.N.D.O. and the Sabotage Studio. All characters, jokes and art here are original.</p>
          <p class="small">Thanks for playing. Bossworth would like you to know he does not want you to rate this game five stars. (He does.)</p>
        </section>
        ${castStrip(app.save)}
        <div class="credits-end" style="text-align:center"><p class="end-stamp credits-stamp" aria-hidden="true">THE END?</p></div>
      </div>`;
  }

  OBEY.screens = { menu: menu, map: map, secrets: secrets, costumes: costumes, themes: themes, achievements: achievements, trophies: trophies, settings: settings, credits: credits };
})(typeof window !== 'undefined' ? window : globalThis);
