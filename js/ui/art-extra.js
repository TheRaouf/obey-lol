/* OBEY? LOL. — 2.1 art: Sabotage Studio objects, jigsaw pieces, the U.N.D.O. sidekick and new icons.
 * Original code-drawn SVG, coloured through the theme tokens like everything else. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY.art;
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;

  A.addObject('phone', function (o) {
    var pct = Math.max(0, Math.min(100, o.pct || 0));
    var h = Math.round(pct * 1.1);
    var col = pct >= 100 ? '#2bc46f' : (pct === 99 ? '#ffb020' : '#7dd3ea');
    return svg('0 0 140 240',
      '<rect x="14" y="6" width="112" height="200" rx="18" fill="#2d2850" ' + SW + '/>' +
      '<rect x="24" y="22" width="92" height="166" rx="8" fill="#f5feff"/>' +
      '<rect x="52" y="44" width="36" height="120" rx="6" fill="none" ' + SW3 + '/><rect x="62" y="36" width="16" height="8" rx="2" fill="' + INK + '"/>' +
      '<rect x="56" y="' + (160 - h) + '" width="28" height="' + h + '" rx="3" fill="' + col + '"/>' +
      '<text x="70" y="182" text-anchor="middle" font-size="18" fill="' + INK + '">' + pct + '%</text>' +
      (o.plugged ? '<path d="M70 206 L70 236" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/><rect x="60" y="206" width="20" height="12" rx="3" fill="#c3ccd8" ' + SW3 + '/>' : ''));
  });

  A.addObject('peg', function () {
    return svg('0 0 100 220', '<rect x="10" y="196" width="80" height="18" rx="6" fill="#c9a86a" ' + SW + '/><rect x="44" y="30" width="12" height="170" rx="5" fill="#9a6b3f" ' + SW3 + '/>');
  });

  A.addObject('tree', function (o) {
    var rot = o.dir === 'up' ? 0 : (o.dir === 'down' ? 180 : 90);
    return svg('0 0 200 200', '<g transform="rotate(' + rot + ' 100 100)">' +
      '<path d="M100 14 L148 80 L124 80 L160 130 L128 130 L166 176 L34 176 L72 130 L40 130 L76 80 L52 80 Z" fill="#2fae84" ' + SW + '/>' +
      '<rect x="88" y="176" width="24" height="20" fill="#9a6b3f" ' + SW3 + '/>' +
      '<path d="M100 2 l5 10 11 1 -8 7 3 11 -11 -6 -11 6 3 -11 -8 -7 11 -1z" fill="#ffd23f" ' + SW3 + '/>' +
      '<circle cx="88" cy="104" r="6" fill="#e5243b"/><circle cx="116" cy="148" r="6" fill="#3ec1ff"/><circle cx="78" cy="156" r="6" fill="#ffd23f"/></g>');
  });

  A.addObject('treestand', function () {
    return svg('0 0 200 120', '<path d="M30 110 L60 40 L140 40 L170 110 Z" fill="#e5243b" ' + SW + '/><rect x="70" y="20" width="60" height="24" rx="6" fill="#4b4466" ' + SW + '/>');
  });

  /** Jigsaw piece n (1–9) in a distinctive colour. */
  var PIECE = ['#ff8c1a', '#3ec1ff', '#9b5de5', '#2bc46f', '#e5243b', '#ffd23f', '#ff6f91', '#7be37b', '#58607e'];
  A.addObject('jigsaw', function (o) {
    var c = PIECE[((o.n || 1) - 1) % 9];
    return svg('0 0 100 100', '<path d="M14 26 H38 Q34 8 50 8 Q66 8 62 26 H86 V50 Q100 46 100 60 Q100 74 86 70 V90 H14 V70 Q2 74 2 60 Q2 46 14 50 Z" fill="' + c + '" ' + SW + '/>');
  });

  /** The 3×3 picture the jigsaw assembles: Bossworth on holiday. `have` = array of piece numbers found. */
  A.jigsawPicture = function (have) {
    var cells = '';
    for (var i = 0; i < 9; i++) {
      var x = (i % 3) * 100, y = Math.floor(i / 3) * 100;
      cells += have.indexOf(i + 1) >= 0 ? '' : '<rect x="' + x + '" y="' + y + '" width="100" height="100" fill="var(--paper-2)" stroke="' + INK + '" stroke-width="3" stroke-dasharray="8 6"/><text x="' + (x + 50) + '" y="' + (y + 62) + '" text-anchor="middle" font-size="36" fill="var(--muted)">' + (i + 1) + '</text>';
    }
    var scene = '<rect width="300" height="300" fill="#8fd3ff"/><rect y="190" width="300" height="110" fill="#ffe7a3"/>' +
      '<circle cx="240" cy="60" r="34" fill="#ffd23f" ' + SW3 + '/><path d="M0 190 Q75 170 150 190 T300 190" fill="#3ec1ff" ' + SW3 + '/>' +
      '<g transform="translate(70 120) scale(.62)">' + A.narrator('classic', 'pleased').replace(/^<svg[^>]*>|<\/svg>$/g, '') + '</g>' +
      '<path d="M190 260 L250 140" stroke="#9a6b3f" stroke-width="6"/><path d="M200 150 Q250 100 300 150 Z" fill="#e5243b" ' + SW3 + '/>' +
      '<rect x="40" y="250" width="70" height="20" rx="6" fill="#ff6f91" ' + SW3 + '/>';
    return '<svg class="jigsaw-picture" viewBox="0 0 300 300" role="img" aria-label="Jigsaw picture: Bossworth on holiday at the beach, ' + have.length + ' of 9 pieces found">' + scene + cells +
      '<rect x="1.5" y="1.5" width="297" height="297" fill="none" stroke="' + INK + '" stroke-width="3"/></svg>';
  };

  /** U.N.D.O., the glitchy sidekick program: a floppy disk with a face.
   * E16: `o.small` (the default, for the 30 px chat head) drops the shutter detail, enlarges the label
   * window to 60 % of the body and draws bigger eyes and a thicker smirk. Pass { small: false } for
   * the full drawing at large sizes. */
  A.undoBot = function (glitch, o) {
    var small = !(o && o.small === false);
    var head = '<svg class="undo-bot' + (small ? ' undo-bot-small' : '') + (glitch ? ' glitching' : '') + '" viewBox="0 0 100 100" aria-hidden="true" focusable="false">';
    if (small) {
      return head + '<rect x="8" y="8" width="84" height="84" rx="8" fill="#2d2850" ' + SW + '/><rect x="30" y="8" width="40" height="12" fill="#c3ccd8" ' + SW3 + '/>' +
        '<rect x="17" y="30" width="66" height="54" rx="6" fill="#f5feff" ' + SW3 + '/><circle cx="36" cy="52" r="7" fill="' + INK + '"/><circle cx="64" cy="52" r="7" fill="' + INK + '"/>' +
        '<path d="M38 70 Q50 76 62 70" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/><path d="M60 38 L74 33" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/></svg>';
    }
    return head +
      '<rect x="8" y="8" width="84" height="84" rx="8" fill="#2d2850" ' + SW + '/><rect x="26" y="8" width="48" height="26" fill="#c3ccd8" ' + SW3 + '/><rect x="58" y="12" width="10" height="18" fill="#2d2850"/>' +
      '<rect x="20" y="46" width="60" height="38" rx="4" fill="#f5feff" ' + SW3 + '/><circle cx="38" cy="62" r="5" fill="' + INK + '"/><circle cx="62" cy="62" r="5" fill="' + INK + '"/>' +
      '<path d="M40 74 Q50 80 60 74" fill="none" ' + SW3 + '/><path d="M64 54 L72 50" ' + SW3 + '/></svg>';
  };

  A.addIcon('share', '<path d="M12 3 v12 M7 8 l5 -5 5 5 M5 13 v6 h14 v-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>');
  A.addIcon('calendar', '<rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M3 10 h18 M8 3 v4 M16 3 v4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>');
  A.addIcon('chart', '<path d="M4 20 V10 M10 20 V4 M16 20 V13 M22 20 H2" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>');
  A.addIcon('hammer', '<path d="M14 4 l6 6 -3 3 -6 -6z M12 9 L4 17 a1.5 1.5 0 0 0 3 3 L15 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>');
  A.addIcon('skip', '<path d="M5 5 l9 7 -9 7z M17 5 v14" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>');
  A.addIcon('keyboard', '<rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 10 h1 M10 10 h1 M14 10 h1 M18 10 h1 M7 14 h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>');
  A.addIcon('timer', '<circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 13 V9 M9 2 h6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>');
  A.addIcon('piece', '<path d="M4 7 h5 a3 3 0 1 1 6 0 h5 v5 a3 3 0 1 0 0 6 v3 H4 v-3 a3 3 0 1 0 0 -6z" fill="currentColor"/>');

  /* 2.3 E2: menu icons. 24-unit viewBox, currentColor, stroke 2.2, round caps. */
  var ST = 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  A.addIcon('plus', '<path d="M12 5 V19 M5 12 H19" ' + ST + '/>');
  A.addIcon('bowtie', '<path d="M3.5 7 L10 10.2 V13.8 L3.5 17 Z M20.5 7 L14 10.2 V13.8 L20.5 17 Z" ' + ST + '/><rect x="10" y="9.8" width="4" height="4.4" rx="1.2" fill="currentColor"/>');
  A.addIcon('palette', '<path d="M12 3.2 C6.8 3.2 3 7 3 12 C3 16.9 6.9 20.8 11.6 20.8 C13 20.8 13.6 20 13.4 18.9 C13.2 17.7 12.4 17.2 12.6 16 C12.8 14.9 13.8 14.4 15 14.4 H16.6 C19.2 14.4 21 12.7 21 10.2 C21 6.2 17 3.2 12 3.2 Z" ' + ST + '/><circle cx="7.6" cy="11.2" r="1.5" fill="currentColor"/><circle cx="9.8" cy="7.2" r="1.5" fill="currentColor"/><circle cx="14.6" cy="6.8" r="1.5" fill="currentColor"/>');
  A.addIcon('scroll', '<path d="M7 17 V6 A2 2 0 0 1 9 4 H19 A2 2 0 0 1 19 8 H17 V18 A2 2 0 0 1 15 20 H5 A2 2 0 0 1 5 16 H15 V18 M17 8 V6" ' + ST + '/><path d="M10 9 H14 M10 12.5 H14" ' + ST + '/>');
  A.addIcon('cup', '<path d="M7 4 H17 V8.5 A5 5 0 0 1 7 8.5 Z" ' + ST + '/><path d="M7 5.5 H4.5 A2.6 2.6 0 0 0 7.4 10.4 M17 5.5 H19.5 A2.6 2.6 0 0 1 16.6 10.4 M12 13.5 V17 M8 20 H16 M9.5 17 H14.5" ' + ST + '/>');

  /* 2.3 E54: one landmark icon per chapter family (map regions, trophy cups, chapter cards). */
  A.addIcon('button', '<path d="M3.5 15 V17 A8.5 3 0 0 0 20.5 17 V15" ' + ST + '/><ellipse cx="12" cy="15" rx="8.5" ry="3" ' + ST + '/><path d="M6.5 14 V10.5 A5.5 3.5 0 0 1 17.5 10.5 V14" ' + ST + '/>');
  A.addIcon('stapler', '<path d="M3 16 H21 V19.5 H3 Z" ' + ST + '/><path d="M4 13.5 C7 9.5 14 8 20.5 8.8 V12.2 L5 13.8" ' + ST + '/><circle cx="5" cy="14.6" r="1.3" fill="currentColor"/>');
  A.addIcon('sock', '<path d="M8 3 H14 V11.5 L18.6 14 A2.8 2.8 0 0 1 16.4 19.2 L10 18.2 A3.4 3.4 0 0 1 7.6 14.8 Z" ' + ST + '/><path d="M8 6.5 H14" ' + ST + '/>');
  A.addIcon('palm', '<path d="M12.5 20.5 C12.6 16 11.6 12.4 12 9 M7 20.5 H18" ' + ST + '/><path d="M12 9 C9.6 5.6 5.6 5.8 3.2 8.2 M12 9 C14.4 5.6 18.4 5.8 20.8 8.2 M12 9 C9.2 8.2 6.6 10 6 13 M12 9 C14.8 8.2 17.4 10 18 13 M12 9 C11.2 6.2 12 4 13.6 3" ' + ST + '/>');
  A.addIcon('flask', '<path d="M9 3 H15 M10 3 V9.2 L4.8 18.2 A1.9 1.9 0 0 0 6.5 21 H17.5 A1.9 1.9 0 0 0 19.2 18.2 L14 9.2 V3" ' + ST + '/><path d="M7.4 15 H16.6" ' + ST + '/>');
  A.addIcon('rocket', '<path d="M12 2.6 C15.6 5.2 16.6 10.2 14.8 16 H9.2 C7.4 10.2 8.4 5.2 12 2.6 Z M9.4 12.4 L6.2 16.6 L9.2 16 M14.6 12.4 L17.8 16.6 L14.8 16 M10.8 19 L12 21.6 L13.2 19" ' + ST + '/><circle cx="12" cy="9" r="1.8" fill="currentColor"/>');
  A.addIcon('curtain', '<path d="M3 3.8 H21 M4.5 3.8 V19.5 C6.8 20.2 8.6 18.8 9.6 16.6 C8.6 12.4 8.6 8 10 3.8 M19.5 3.8 V19.5 C17.2 20.2 15.4 18.8 14.4 16.6 C15.4 12.4 15.4 8 14 3.8" ' + ST + '/>');

  /** Landmark icon for a chapter (0-based index or chapter id): 0–7 core, 8–12 office, 13–17 home,
   * 18–22 outdoors, 23–25 science, 26–27 space, 28–32 show, 33 final. */
  A.chapterIcon = function (c) {
    var k = typeof c === 'number' ? c : OBEY.CHAPTERS.map(function (x) { return x.id; }).indexOf(c);
    if (k < 0) return 'button';
    if (k <= 7) return 'button';
    if (k <= 12) return 'stapler';
    if (k <= 17) return 'sock';
    if (k <= 22) return 'palm';
    if (k <= 25) return 'flask';
    if (k <= 27) return 'rocket';
    if (k <= 32) return 'curtain';
    return 'gear';
  };
})(typeof window !== 'undefined' ? window : globalThis);
