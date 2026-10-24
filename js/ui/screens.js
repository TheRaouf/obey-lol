/* OBEY? LOL. — static-ish screens: menu, map, field notes, costumes, themes, achievements,
 * settings, credits. Each render function receives the App and returns nothing; controls use
 * data-act attributes handled by one delegated listener in app.js. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var A = OBEY.art, E = OBEY.util.escape, P = OBEY.progress;

  function backBar(title, id, extra) {
    return `<header class="topbar">
      <button class="chip-btn" data-act="nav" data-to="menu">${A.icon('back')}<span>Menu</span></button>
      <h1 class="screen-title" id="${id}">${E(title)}</h1>
      <div class="topbar-end">${extra || ''}</div>
    </header>`;
  }

  function statRow(s) {
    return `<ul class="stat-row" aria-label="Overall progress">
      <li><b>${s.completed.length}</b><span>of 16 levels</span></li>
      <li><b>${P.totalStars(s)}</b><span>of 48 stars</span></li>
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
        </div>
        <nav class="menu-nav" aria-label="Main menu">
          <button class="slip slip-primary" data-act="play">${A.icon('play')}<span>${E(playLabel)}</span></button>
          <button class="slip" data-act="new-game"><span>New game</span></button>
          <button class="slip" data-act="nav" data-to="map">${A.icon('map')}<span>Adventure map</span></button>
          <button class="slip" data-act="nav" data-to="secrets">${A.icon('eye')}<span>Secret field notes</span><em>${s.secrets.length}/15</em></button>
          <button class="slip" data-act="nav" data-to="costumes"><span>Narrator costumes</span><em>${s.costumes.unlocked.length}/8</em></button>
          <button class="slip" data-act="nav" data-to="themes"><span>Themes</span><em>${s.themes.unlocked.length}/4</em></button>
          <button class="slip" data-act="nav" data-to="achievements">${A.icon('star')}<span>Achievements</span><em>${Object.keys(s.achievements).length}/${OBEY.ACHIEVEMENTS.length}</em></button>
          <button class="slip" data-act="nav" data-to="settings">${A.icon('gear')}<span>Settings</span></button>
          <button class="slip" data-act="nav" data-to="credits"><span>Credits</span></button>
        </nav>
      </div>`;
  }

  /* -------------------------------------------------------------------- map */
  var REGIONS = [
    { name: 'Button Bay', from: 1, color: 'var(--region-1)' },
    { name: 'Mind Maze', from: 5, color: 'var(--region-2)' },
    { name: 'Trick Tower', from: 9, color: 'var(--region-3)' },
    { name: 'Final Factory', from: 13, color: 'var(--region-4)' }
  ];
  var MAP_W = 400, ROW = 100, TOP = 80;
  function nodePos(i) { return { x: 200 + 118 * Math.sin(i * 1.1 + 0.3), y: TOP + i * ROW }; }

  function map(app, el) {
    var s = app.save;
    var H = TOP * 2 + 15 * ROW;
    var pts = [];
    for (var i = 0; i < 16; i++) pts.push(nodePos(i));
    var d = 'M' + pts[0].x + ' ' + pts[0].y;
    for (i = 1; i < 16; i++) {
      var a = pts[i - 1], b = pts[i];
      d += ' C' + a.x + ' ' + (a.y + ROW * 0.5) + ' ' + b.x + ' ' + (b.y - ROW * 0.5) + ' ' + b.x + ' ' + b.y;
    }
    var done = 'M' + pts[0].x + ' ' + pts[0].y;
    var reach = Math.min(s.highestUnlocked, 16) - 1;
    for (i = 1; i <= reach; i++) {
      var a2 = pts[i - 1], b2 = pts[i];
      done += ' C' + a2.x + ' ' + (a2.y + ROW * 0.5) + ' ' + b2.x + ' ' + (b2.y - ROW * 0.5) + ' ' + b2.x + ' ' + b2.y;
    }
    var bands = REGIONS.map(function (r, k) {
      var y0 = k === 0 ? 0 : TOP + (r.from - 1) * ROW - ROW / 2, h = k === 0 ? TOP + ROW * 3.5 : (k === 3 ? H - y0 : ROW * 4);
      return `<rect x="0" y="${y0}" width="${MAP_W}" height="${h}" fill="${r.color}" />` +
        `<text class="region-label" x="${k % 2 ? 388 : 12}" y="${y0 + 26}" text-anchor="${k % 2 ? 'end' : 'start'}">${E(r.name)}</text>`;
    }).join('');
    var deco = '';
    for (i = 0; i < 16; i++) {
      var p = pts[i], side = p.x > 200 ? -1 : 1;
      deco += `<circle cx="${p.x + side * 120}" cy="${p.y + 20}" r="${6 + (i * 7) % 9}" class="map-dot"/>`;
    }
    var current = P.nextLevel(s);
    var nodes = pts.map(function (p, idx) {
      var n = idx + 1, def = OBEY.getLevel(n);
      var completed = P.isCompleted(s, n), unlocked = P.canPlay(s, n);
      var state = completed ? 'done' : (unlocked ? 'open' : 'locked');
      var isCur = n === current;
      var label = 'Level ' + n + ': ' + def.title + ' — ' + (completed ? 'completed, ' + s.bestStars[n] + ' of 3 stars' : (unlocked ? (isCur ? 'next up' : 'unlocked') : 'locked, finish level ' + (n - 1) + ' first'));
      return `<button class="map-node node-${state}${isCur ? ' is-current' : ''}" style="left:${(p.x / MAP_W * 100).toFixed(2)}%;top:${(p.y / H * 100).toFixed(3)}%"
          data-act="open-level" data-level="${n}" aria-label="${E(label)}" ${unlocked ? '' : 'aria-disabled="true"'}>
          <span class="node-disc">${state === 'locked' ? A.icon('lock') : n}</span>
          <span class="node-title">${E(def.title)}</span>
          <span class="node-stars">${completed ? A.stars(s.bestStars[n]) : (isCur ? '<span class="node-flag">Next</span>' : '')}</span>
        </button>`;
    }).join('');
    el.innerHTML = backBar('Adventure map', 'map-title', `<span class="pill">${P.totalStars(s)}/48 ${A.icon('star')}</span>`) + `
      <div class="map-layout">
        <aside class="map-side panel">
          ${statRow(s)}
          <p class="map-help">Tap any unlocked level to play or replay it. Replays can only improve your best stars.</p>
          ${current ? `<button class="slip slip-primary" data-act="open-level" data-level="${current}">${A.icon('play')}<span>Play Level ${current}</span></button>` : '<p class="map-help strong">All 16 levels complete.</p>'}
        </aside>
        <div class="map-scroll">
          <div class="map-world" style="aspect-ratio:${MAP_W}/${H}">
            <svg class="map-svg" viewBox="0 0 ${MAP_W} ${H}" preserveAspectRatio="none" aria-hidden="true">
              ${bands}${deco}
              <path d="${d}" class="map-path"/>
              <path d="${done}" class="map-path-done"/>
            </svg>
            ${nodes}
          </div>
        </div>
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
          <p>You have found <b>${s.secrets.length}</b> of 15 secrets.${s.secrets.length === 15 ? ' Something golden waits in Level 16.' : ' Find all 15 for a very special ending.'}</p>
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
      var pct = Math.min(100, pr[0] / pr[1] * 100);
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
    el.innerHTML = backBar('Achievements', 'achievements-title', `<span class="pill">${got}/${OBEY.ACHIEVEMENTS.length}</span>`) + `
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
  function settings(app, el) {
    var st = app.save.settings;
    var inLevel = app.lastLevel && P.canPlay(app.save, app.lastLevel);
    el.innerHTML = backBar('Settings', 'settings-title') + `
      <div class="page settings">
        <section class="panel setting">
          <h2>Sound effects</h2>
          <button class="switch" role="switch" aria-checked="${st.sound}" data-act="toggle-sound" aria-label="Sound effects"><span class="knob"></span><span class="switch-text">${st.sound ? 'On' : 'Off'}</span></button>
          <p class="small">Every puzzle can be solved with sound off. There is no music.</p>
        </section>
        <fieldset class="panel setting">
          <legend><h2>Motion</h2></legend>
          ${radio('motion', 'system', st.motion, 'Follow my device')}${radio('motion', 'reduce', st.motion, 'Reduce motion')}${radio('motion', 'full', st.motion, 'Full motion')}
        </fieldset>
        <fieldset class="panel setting">
          <legend><h2>Text size</h2></legend>
          ${radio('textSize', 'normal', st.textSize, 'Normal')}${radio('textSize', 'large', st.textSize, 'Large')}
        </fieldset>
        <section class="panel setting">
          <h2>Your save</h2>
          <p class="small">${app.store.persistent ? 'Progress saves automatically in this browser.' : 'This browser is blocking storage, so progress only lasts until you close this tab.'}${app.loadStatus === 'recovered' ? ' An unreadable save was found and replaced with a fresh one.' : ''}${app.loadStatus === 'migrated' ? ' Your save was upgraded to the latest format.' : ''}</p>
          <div class="btn-row">
            ${inLevel ? `<button class="btn" data-act="open-level" data-level="${app.lastLevel}">Back to Level ${app.lastLevel}</button>` : ''}
            <button class="btn" data-act="tutorial">Replay the tutorial</button>
            <button class="btn danger" data-act="reset-all">Reset all progress</button>
          </div>
        </section>
      </div>`;
  }

  /* ---------------------------------------------------------------- credits */
  function credits(app, el) {
    el.innerHTML = backBar('Credits', 'credits-title') + `
      <div class="page credits">
        <section class="panel">
          <h2>OBEY? LOL. <span class="small">version ${OBEY.VERSION}</span></h2>
          <p>Game design, writing, puzzles, code-drawn art and synthesised sound effects were created from scratch for this project. Bossworth is an original character.</p>
          <p>Fonts: <b>Bagel Fat One</b> (The Bagel Fat Project Authors) and <b>Atkinson Hyperlegible</b> (Braille Institute of America), both under the SIL Open Font License 1.1 and bundled locally.</p>
          <p>No accounts, ads, trackers or network requests. Your progress stays in this browser.</p>
          <p class="small">Thanks for playing. Bossworth would like you to know he does not want you to rate this game five stars. (He does.)</p>
        </section>
      </div>`;
  }

  OBEY.screens = { menu: menu, map: map, secrets: secrets, costumes: costumes, themes: themes, achievements: achievements, settings: settings, credits: credits };
})(typeof window !== 'undefined' ? window : globalThis);
