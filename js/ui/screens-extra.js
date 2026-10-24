/* OBEY? LOL. — 2.1 screens: Daily Dare, Bossworth's file on you (stats), and the Sabotage file
 * (ruins, jigsaw pieces and the Sabotage Studio bonus pack). */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var A = OBEY.art, E = OBEY.util.escape, P = OBEY.progress, X = OBEY.extras;

  /* ------------------------------------------------------------- Daily Dare */
  function daily(app, el) {
    var s = app.save, key = X.dateKey(), dare = X.dareFor(s, key), n = dare.n, def = OBEY.getLevel(n);
    var doneToday = s.daily.done.indexOf(key) >= 0;
    var streak = X.currentStreak(s, key);
    // Last 14 days strip.
    var days = '';
    for (var i = 13; i >= 0; i--) {
      var d = new Date(); d.setDate(d.getDate() - i);
      var k = X.dateKey(d), hit = s.daily.done.indexOf(k) >= 0;
      days += `<li class="day${hit ? ' hit' : ''}${i === 0 ? ' today' : ''}" aria-label="${k}: ${hit ? 'dare done' : 'no dare'}"><span>${d.getDate()}</span></li>`;
    }
    el.innerHTML = OBEY.backBar('Daily Dare', 'daily-title', `<span class="pill">${A.icon('calendar')} ${streak}-day streak</span>`, 'daily') + `
      <div class="page">
        <section class="panel dare-card">
          <p class="small">${E(key)} · ${dare.practice ? 'today\'s shared dare is Level ' + dare.global + ', which you haven\'t reached yet — here is a practice dare instead (it still counts for your streak)' : 'the same dare for every player today'}</p>
          <h2>${dare.practice ? 'Practice: ' : ''}${E(OBEY.levelLabel(n))}: ${E(def.title)}</h2>
          <p><b>The dare:</b> finish it at par — ${def.par} ${def.par === 1 ? 'action' : 'actions'} or fewer — with no hints, no traps and no walkthrough.</p>
          ${doneToday ? `<p class="status">${A.icon('check')} Done today. Come back tomorrow for a new one.</p>` : ''}
          <div class="btn-row"><button class="btn primary" data-act="daily-play">${A.icon('play')} ${doneToday ? 'Play it again' : 'Take the dare'}</button></div>
        </section>
        <section class="panel">
          <h2>Your streak</h2>
          <p>Current streak: <b>${streak}</b> ${streak === 1 ? 'day' : 'days'} · best: <b>${s.daily.best}</b>. Missing one day is forgiven; missing two resets the streak.</p>
          <ol class="day-strip" aria-label="The last 14 days">${days}</ol>
          <h3>Badges</h3>
          <ul class="badge-row">${X.DARE_BADGES.map(function (b) { var got = s.daily.badges.indexOf(b) >= 0; return `<li class="badge${got ? ' got' : ''}">${got ? A.icon('star') : A.icon('lock')} ${b}-day streak</li>`; }).join('')}</ul>
        </section>
      </div>`;
  }

  /* ------------------------------------------------------------------ stats */
  function stats(app, el) {
    var s = app.save, c = s.counters;
    var rv = X.review(s), comp = X.composure(s);
    var worn = {};
    var fav = OBEY.COSTUMES.filter(function (x) { return x.id === s.costumes.selected; })[0];
    void worn;
    var rows = [
      ['Intern number', '#' + (s.intern || 17)],
      ['Levels finished', s.completed.length + ' of ' + OBEY.LEVEL_COUNT + (s.skipped.length ? ' (' + s.skipped.length + ' skipped)' : '')],
      ['Stars', P.totalStars(s) + ' of ' + OBEY.LEVEL_COUNT * 3],
      ['Secrets', s.secrets.length + ' of 15'],
      ['Levels ruined on purpose', s.ruins.length + ' of ' + X.RUINS.length],
      ['Jigsaw pieces', s.jigsaw.length + ' of 9'],
      ['Traps fallen for', s.stats.fails],
      ['Instructions defied', s.stats.defiance],
      ['Hints used', s.stats.hintsUsed],
      ['Times Bossworth was poked', c.pokes],
      ['Phone calls he took instead of helping', c.phoneCalls],
      ['Time spent finishing levels', app.formatTime(c.playMs)],
      ['Speedrun: sum of best times (campaign' + (s.completed.length && s.completed.length < OBEY.LEVEL_COUNT ? ', ' + s.completed.length + ' levels' : '') + ')', s.completed.length ? app.formatTime(s.completed.reduce(function (t, n) { return t + (s.bestTime[n] || 0); }, 0), true) : '—'], // 2.3 E60: note in the dt
      ['Daily Dare best streak', s.daily.best],
      ['Current costume', fav ? fav.name : 'Classic']
    ];
    el.innerHTML = OBEY.backBar('Bossworth\'s file on you', 'stats-title', '', 'stats') + `
      <div class="page">
        <section class="panel review-card">
          <h2>Bossworth's review of you</h2>
          <p class="review-stars" role="img" aria-label="${rv.stars} out of 5 stars">${'★'.repeat(rv.stars)}${'☆'.repeat(5 - rv.stars)}</p>
          <p>“${E(rv.text)}”</p>
          <p class="small">Stars from his point of view: obeying earns them, defying and ruining things loses them.</p>
        </section>
        <section class="panel">
          <h2>Composure</h2>
          <p>Bossworth's composure is <b>${E(P.isCompleted(s, OBEY.LEVEL_COUNT) ? 'recovering' : X.composureTier(comp))}</b> (${comp}/100).</p>
          <div class="bar comp-${X.composureTier(comp)}" role="progressbar" aria-label="Bossworth's composure" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${comp}"><span style="width:${comp}%"></span></div>
        </section>
        <section class="panel">
          <h2>The file</h2>
          <dl class="stat-table">${rows.map(function (r) { return `<div><dt>${E(r[0])}</dt><dd>${E(String(r[1]))}</dd></div>`; }).join('')}</dl>
        </section>
      </div>`;
  }

  /* ---------------------------------------------------------- Sabotage file */
  function sabotage(app, el) {
    var s = app.save, open = P.bonusUnlocked(s);
    var ruins = X.RUINS.map(function (r) {
      var got = s.ruins.indexOf(r.id) >= 0;
      var reached = OBEY.isBonus(r.level) ? open : r.level <= s.highestUnlocked;
      return `<li class="note-card${got ? ' found ruined' : ''}"><span class="note-level">${E(OBEY.levelLabel(r.level))}</span>` +
        (got ? `<h2>${E(r.name)}</h2><p>Ruined. Bossworth is still upset.</p><span class="stamp-mini ruin-mini">RUINED</span>`
          : `<h2 aria-label="Undiscovered ruin">? ? ?</h2><p>${reached ? 'U.N.D.O.\'s tip: ' + E(r.clue) : 'Reach ' + E(OBEY.levelLabel(r.level)) + ' first.'}</p>`) + '</li>';
    }).join('');
    var have = s.jigsaw.map(function (id) { return X.JIGSAW_IDS.indexOf(id) + 1; });
    var bonus = '';
    for (var b = 1; b <= OBEY.BONUS_COUNT; b++) {
      var n = OBEY.BONUS_BASE + b, def = OBEY.getLevel(n), done = s.bonus.completed.indexOf(n) >= 0;
      bonus += `<li><button class="slip" data-act="open-level" data-level="${n}" ${open ? '' : 'aria-disabled="true"'} aria-label="Bonus ${b}: ${E(def.title)}${done ? ', completed, ' + s.bonus.bestStars[n] + ' of 3 stars' : ''}${open ? '' : ', locked'}">` +
        `${open ? A.icon('play') : A.icon('lock')}<span>Bonus ${b}: ${E(def.title)}</span>${done ? '<em>' + A.stars(s.bonus.bestStars[n]) + '</em>' : ''}</button></li>`;
    }
    el.innerHTML = OBEY.backBar('Sabotage file', 'sabotage-title', `<span class="pill">${A.icon('hammer')} ${s.ruins.length}/${X.RUINS.length}</span>`, 'sabotage') + `
      <div class="page">
        <section class="panel">
          <h2>Sabotage Studio</h2>
          <p>${open ? 'Four bonus microgames. Each one can be done properly… or ruined beautifully.' : 'Opens after you finish Level ' + P.BONUS_UNLOCK_LEVEL + '.'}</p>
          <ul class="bonus-list">${bonus}</ul>
        </section>
        <h2 class="section-title">Ruined levels</h2>
        <p class="page-intro panel">A ruin is a deliberately terrible way to finish a level. It still counts as finished. Bossworth hates every single one.</p>
        <ul class="note-grid">${ruins}</ul>
        <h2 class="section-title">Jigsaw (${have.length}/9)</h2>
        <div class="panel jigsaw-panel">
          <div class="jigsaw-frame">${A.jigsawPicture(have)}</div>
          <p>One piece hides in one level of every chapter, but only when you <b>replay</b> a level you've already finished. Look in the corners.</p>
        </div>
      </div>`;
  }

  OBEY.screens.daily = daily;
  OBEY.screens.stats = stats;
  OBEY.screens.sabotage = sabotage;
})(typeof window !== 'undefined' ? window : globalThis);
