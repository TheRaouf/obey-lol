/* OBEY? LOL. — the three ending sequences. Each is a short, click-through scene with its own
 * visual treatment, dialogue and finale. Replayable from the Achievements → Endings gallery. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var A = OBEY.art, E = OBEY.util.escape;

  function karmaLine(save) {
    var k = OBEY.progress.karma(save);
    if (k >= 2) return 'You were kind to me more often than you had to be. I noticed. Don\'t tell anyone.';
    if (k <= -2) return 'You pranked me, mashed me and doodled on me. Honestly? Best player I\'ve had.';
    return 'Half menace, half sweetheart. You kept me guessing, which is MY job.';
  }

  var SCRIPTS = {
    hero: {
      title: 'The Honest Machine',
      costume: null,
      lines: [
        ['The Instruction Machine whirs, clicks, and prints a single card: "Tell the truth."', 'surprised'],
        ['It only gives honest instructions now. Which means I have to give honest instructions now.', 'panicked'],
        ['Fine. Honest instruction number one: you were right to question me. Every single time.', 'defeated'],
        ['@karma', 'pleased'],
        ['Honest instruction number two: go outside. Touch some grass. Then come back and find the secrets I definitely didn\'t hide.', 'pleased']
      ],
      finale: 'Hero ending: you fixed the machine instead of breaking it.'
    },
    chaos: {
      title: 'Total Meltdown',
      lines: [
        ['*KA-BOOM*. Gears everywhere. A spring hits the ceiling. The machine coughs out confetti and one sock.', 'panicked'],
        ['WHAT DID YOU DO? Every level is giving random instructions now! Level 3 is just shouting "BANANA"!', 'panicked'],
        ['…Okay. Okay. Without the machine, nobody has to obey anybody. Including me. That\'s… freeing?', 'surprised'],
        ['@karma', 'annoyed'],
        ['New plan: I\'m going to go narrate a nice, calm cooking show. Do NOT follow me. (Please follow me.)', 'defeated']
      ],
      finale: 'Chaos ending: you overloaded the machine. Gloriously.'
    },
    secret: {
      title: 'The Last Word',
      lines: [
        ['You found all fifteen secrets. The plant, the corner, the knitted medal… even KEVIN.', 'surprised'],
        ['The golden quill only writes one instruction, and it can never be lied about. It\'s yours.', 'neutral'],
        ['@karma', 'pleased'],
        ['@choose', 'suspicious']
      ],
      choices: [
        ['Question everything.', 'Including this instruction? …Oh no. Oh, that\'s clever. I\'m going to think about that forever.'],
        ['Be kind to narrators.', 'I… I don\'t know what to say. Nobody has ever written that. I\'m not crying. It\'s quill ink.'],
        ['Have fun.', 'That\'s it? That\'s the most powerful instruction in the world? …Yeah. Yeah, that\'s the right one.']
      ],
      finale: 'Secret Master ending: you had the last word.'
    }
  };

  /**
   * Renders an ending scene into `el`. Returns a cleanup function.
   */
  function render(app, el, id) {
    var sc = SCRIPTS[id];
    var step = 0, chosen = null;
    var costume = app.save.costumes.selected;

    function lineAt(i) {
      var l = sc.lines[i];
      if (l[0] === '@karma') return [karmaLine(app.save), l[1]];
      return l;
    }

    function scene() {
      var isChoose = sc.lines[step] && sc.lines[step][0] === '@choose';
      var finished = step >= sc.lines.length;
      var body;
      if (finished) {
        body = `<div class="ending-final">
            <p class="end-stamp" aria-hidden="true">THE END</p>
            <h2 tabindex="-1" id="ending-final-title">${E(sc.title)}</h2>
            <p>${E(sc.finale)}</p>
            ${chosen !== null ? `<p class="quote">The last instruction: “${E(sc.choices[chosen][0])}”</p>` : ''}
            <div class="btn-row center">
              <button class="btn primary" data-act="nav" data-to="achievements">Endings gallery</button>
              <button class="btn" data-act="nav" data-to="map">Adventure map</button>
              <button class="btn" data-act="nav" data-to="menu">Main menu</button>
            </div>
          </div>`;
      } else if (isChoose) {
        body = `<div class="ending-talk">
            <div class="ending-narrator" aria-hidden="true">${A.narrator(costume, 'suspicious')}</div>
            <div class="bubble big" id="ending-line"><span class="speaker">Bossworth</span>Write the last instruction. Choose carefully. Or don't. That's kind of the point.</div>
          </div>
          <div class="quill-choices" role="group" aria-label="Write the last instruction">
            ${sc.choices.map(function (c, i) { return `<button class="btn quill-choice" data-end-choice="${i}">${A.object('quill')}<span>“${E(c[0])}”</span></button>`; }).join('')}
          </div>`;
      } else {
        var l = chosen !== null && step === sc.lines.length - 1 ? [sc.choices[chosen][1], 'pleased'] : lineAt(step);
        body = `<div class="ending-talk">
            <div class="ending-narrator" aria-hidden="true">${A.narrator(costume, l[1])}</div>
            <div class="bubble big" id="ending-line" aria-live="polite"><span class="speaker">Bossworth</span>${E(l[0])}</div>
          </div>
          <div class="btn-row center"><button class="btn primary" data-end-next autofocus>${step === sc.lines.length - 1 ? 'Finish' : 'Next'}</button>
          <button class="btn ghost" data-end-skip>Skip to the end</button></div>`;
      }
      el.innerHTML = `<div class="ending ending-${id}" data-step="${step}">
          <div class="ending-fx" aria-hidden="true">${fx(id)}</div>
          <div class="ending-card-wrap">
            <p class="ending-kicker">${E(OBEY.ENDINGS.filter(function (e) { return e.id === id; })[0].short)}</p>
            <h1 class="ending-title">${E(sc.title)}</h1>
            ${body}
          </div>
        </div>`;
      var f = el.querySelector('[data-end-next]') || el.querySelector('[data-end-choice]') || el.querySelector('#ending-final-title');
      if (f) f.focus({ preventScroll: true });
    }

    function onClick(e) {
      var t = e.target.closest('[data-end-next],[data-end-skip],[data-end-choice]');
      if (!t) return;
      OBEY.audio.play('ui');
      if (t.hasAttribute('data-end-choice')) {
        chosen = Number(t.getAttribute('data-end-choice'));
        // Replace the "@choose" step with the narrator's reaction, then finish.
        sc = Object.assign({}, sc, { lines: sc.lines.slice(0, step).concat([[sc.choices[chosen][1], 'pleased']]) });
        scene();
        return;
      }
      if (t.hasAttribute('data-end-skip')) {
        var chooseIdx = -1;
        sc.lines.forEach(function (l, i) { if (l[0] === '@choose') chooseIdx = i; });
        step = chooseIdx >= 0 && chosen === null ? chooseIdx : sc.lines.length;
      } else {
        step++;
      }
      if (step >= sc.lines.length) OBEY.audio.play(id === 'chaos' ? 'boom' : 'ending');
      scene();
    }

    el.addEventListener('click', onClick);
    scene();
    OBEY.audio.play(id === 'chaos' ? 'boom' : 'ending');
    return function () { el.removeEventListener('click', onClick); sc = SCRIPTS[id]; };
  }

  function fx(id) {
    var out = '', i;
    if (id === 'hero') {
      out += '<div class="sun"></div>';
      for (i = 0; i < 14; i++) out += '<span class="spark" style="--i:' + i + ';left:' + ((i * 37) % 100) + '%;top:' + ((i * 53) % 90) + '%">✓</span>';
    } else if (id === 'chaos') {
      for (i = 0; i < 16; i++) out += '<span class="debris" style="--i:' + i + ';left:' + ((i * 41) % 100) + '%;top:' + ((i * 29) % 90) + '%">' + ['⚙', '?!', '✶', 'BANANA', '#', '!!'][i % 6] + '</span>';
    } else {
      for (i = 0; i < 40; i++) out += '<span class="star-fx" style="--i:' + i + ';left:' + ((i * 47) % 100) + '%;top:' + ((i * 61) % 100) + '%"></span>';
      out += '<div class="quill-big">' + A.object('quill') + '</div>';
    }
    return out;
  }

  OBEY.endings = { render: render, scripts: SCRIPTS };
})(typeof window !== 'undefined' ? window : globalThis);
