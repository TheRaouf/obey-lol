/* OBEY? LOL. — art pack F: the supermarket (levels 133–152, Bossworth's big weekly shop).
 * Original code-drawn SVG in the house style: chunky shapes, ink outlines, flat fills, one highlight. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY && OBEY.art;
  if (!A || !A.addObject) return; // loaded before art.js (level lab double-load): skip quietly
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function add(k, f) { A.addObject(k, f); }
  function hi(d) { return '<path d="' + d + '" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>'; }
  function txt(x, y, size, s, fill, extra) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" fill="' + (fill || INK) + '"' + (extra || '') + '>' + OBEY.util.escape(String(s)) + '</text>';
  }
  function rays(cx, cy, r, n, a0, a1) {
    var out = '';
    for (var i = 0; i < n; i++) {
      var a = (a0 + (a1 - a0) * (n === 1 ? 0.5 : i / (n - 1))) * Math.PI / 180;
      out += '<path d="M' + (cx + Math.cos(a) * r).toFixed(1) + ' ' + (cy + Math.sin(a) * r).toFixed(1) + ' L' + (cx + Math.cos(a) * (r + 16)).toFixed(1) + ' ' + (cy + Math.sin(a) * (r + 16)).toFixed(1) + '" ' + SW3 + '/>';
    }
    return out;
  }

  /* ------------------------------------------------------------- trolleys */
  function trolley(dx, shiny, lockSlot) {
    var g = '<g transform="translate(' + dx + ' 0)">';
    g += '<path d="M14 34 L160 34 L148 104 L34 104 Z" fill="#c3ccd8" ' + SW + '/>';
    g += '<path d="M40 48 L152 48 M44 64 L150 64 M48 80 L147 80 M52 96 L146 96 M50 34 L60 104 M86 34 L90 104 M122 34 L120 104" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>';
    g += '<path d="M160 34 L184 22" ' + SW + '/><rect x="176" y="12" width="18" height="16" rx="5" fill="#e5243b" ' + SW3 + '/>';
    g += '<rect x="150" y="18" width="20" height="18" rx="4" fill="#ffd23f" ' + SW3 + '/>' + (lockSlot ? '<path d="M156 27 L164 27" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' : '');
    g += '<path d="M40 104 L46 140 M146 104 L140 140 M44 128 L142 128" ' + SW + '/>';
    g += '<circle cx="48" cy="148" r="10" fill="#4b4466" ' + SW3 + '/><circle cx="138" cy="148" r="10" fill="#4b4466" ' + SW3 + '/>';
    if (shiny) g += '<path d="M30 20 l4 8 8 2 -8 3 -4 8 -4 -8 -8 -3 8 -2z" fill="#ffd23f" ' + SW3 + '/>' + hi('M32 42 L40 92');
    return g + '</g>';
  }
  add('f-trolley', function (o) {
    var bags = o.bags ? '<path d="M40 40 Q36 10 58 12 Q66 30 70 40 Z M84 40 Q84 4 108 6 Q118 24 116 40 Z" fill="#fffdf6" ' + SW3 + '/><path d="M120 40 Q122 16 140 18 Q146 30 146 40Z" fill="#5fd98a" ' + SW3 + '/>' : '';
    return svg('0 0 200 162', bags + trolley(0, false, false));
  });
  // A row of four trolleys pushed into each other: the shiny one at the front (left, against the wall),
  // the last one in (right) is the only one whose lock holds a chain key.
  add('f-trolleyrow', function () {
    var out = '<rect x="0" y="4" width="10" height="150" rx="4" fill="#8a86a8" ' + SW3 + '/>';
    for (var i = 0; i < 4; i++) out += trolley(12 + i * 62, i === 0, i === 3);
    for (var k = 1; k < 4; k++) {
      var x1 = 12 + (k - 1) * 62 + 170, x2 = 12 + k * 62 + 160;
      out += '<path d="M' + x1 + ' 36 Q' + ((x1 + x2) / 2) + ' 58 ' + x2 + ' 36" fill="none" stroke="' + INK + '" stroke-width="4" stroke-dasharray="6 5"/>';
    }
    return svg('0 0 400 162', out);
  });
  add('f-coin', function () {
    return svg('0 0 100 100', '<circle cx="50" cy="50" r="44" fill="#ffd23f" ' + SW + '/><circle cx="50" cy="50" r="33" fill="none" stroke="#f5b400" stroke-width="5"/>' +
      txt(50, 63, 36, '£1') + hi('M22 36 Q28 22 42 16'));
  });

  /* ---------------------------------------------------------------- aisles */
  add('f-tin', function (o) {
    var col = o.color || '#e5243b', w = String(o.word || 'BEANS');
    var fs = Math.min(28, Math.floor(130 / Math.max(3, w.length)));
    return svg('0 0 120 140', '<rect x="10" y="12" width="100" height="120" rx="10" fill="' + col + '" ' + SW + '/>' +
      '<path d="M10 24 L110 24 M10 120 L110 120" ' + SW3 + '/>' +
      '<rect x="10" y="46" width="100" height="48" fill="#fffdf6" ' + SW3 + '/>' + txt(60, 70 + fs * 0.36, fs, w) + hi('M22 32 L22 40'));
  });
  add('f-carton', function (o) {
    var d = o.date === undefined ? '' : String(o.date);
    return svg('0 0 100 170', '<path d="M14 54 L30 14 L70 14 L86 54 Z" fill="#fffdf6" ' + SW + '/><path d="M30 14 L50 54 L70 14" fill="none" ' + SW3 + '/>' +
      '<rect x="14" y="54" width="72" height="108" rx="6" fill="#fffdf6" ' + SW + '/><rect x="14" y="128" width="72" height="22" fill="' + (o.color || '#3a86ff') + '" ' + SW3 + '/>' +
      (d ? '<rect x="20" y="58" width="60" height="44" rx="8" fill="#fff8b8" ' + SW3 + '/>' + txt(50, 93, 34, d) : '') + hi('M22 110 L22 120'));
  });
  add('f-fridge', function () {
    return svg('0 0 300 230', '<rect x="6" y="6" width="288" height="218" rx="12" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="20" y="40" width="260" height="176" rx="6" fill="#fffdf6" ' + SW3 + '/>' +
      '<rect x="6" y="6" width="288" height="30" rx="12" fill="#3a86ff" ' + SW + '/>' +
      '<path d="M20 128 L280 128" stroke="#8a86a8" stroke-width="8"/><path d="M20 210 L280 210" stroke="#8a86a8" stroke-width="8"/>' +
      '<path d="M40 20 L60 20 M100 20 L120 20 M160 20 L180 20 M220 20 L240 20" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>');
  });
  add('f-cereal', function (o) {
    var col = o.color || '#ffd23f';
    return svg('0 0 120 170', '<rect x="12" y="10" width="96" height="152" rx="6" fill="' + col + '" ' + SW + '/>' +
      '<rect x="24" y="22" width="72" height="44" rx="8" fill="#fffdf6" ' + SW3 + '/>' + txt(60, 58, 34, o.letter || 'A') +
      '<path d="M28 110 Q60 148 92 110 Z" fill="#fffdf6" ' + SW3 + '/><circle cx="48" cy="104" r="6" fill="#c98b4a" ' + SW3 + '/><circle cx="62" cy="100" r="6" fill="#c98b4a" ' + SW3 + '/><circle cx="76" cy="105" r="6" fill="#c98b4a" ' + SW3 + '/>' +
      '<path d="M84 72 l6 10 11 2 -8 7 2 11 -11 -5 -10 5 2 -11 -8 -7 11 -2z" fill="#ff77b4" ' + SW3 + '/>' + hi('M20 24 L20 60'));
  });
  add('f-pallet', function () {
    return svg('0 0 300 60', '<rect x="6" y="8" width="288" height="22" rx="4" fill="#b88d5f" ' + SW + '/><rect x="16" y="30" width="30" height="24" fill="#9a6b3f" ' + SW3 + '/><rect x="135" y="30" width="30" height="24" fill="#9a6b3f" ' + SW3 + '/><rect x="254" y="30" width="30" height="24" fill="#9a6b3f" ' + SW3 + '/>');
  });

  /* -------------------------------------------------------------- produce */
  add('f-bagroll', function () {
    return svg('0 0 120 170', '<rect x="54" y="4" width="12" height="30" fill="#8a86a8" ' + SW3 + '/><rect x="18" y="26" width="84" height="36" rx="16" fill="#e3f7fc" ' + SW + '/>' +
      '<path d="M30 44 L90 44" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/><path d="M34 60 L34 156 L86 156 L86 60" fill="#e3f7fc" ' + SW3 + '/><path d="M40 120 L80 120" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3" stroke-dasharray="5 5"/>');
  });
  add('f-pbag', function (o) {
    if (!o.open) {
      return svg('0 0 120 160', '<path d="M24 20 L96 20 L96 146 L24 146 Z" fill="#e3f7fc" ' + SW + '/><path d="M24 20 Q40 30 60 20 Q80 30 96 20" fill="none" ' + SW3 + '/>' +
        '<path d="M60 32 L60 136" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>' + (o.rubbing ? '<path d="M8 22 L18 22 M8 34 L18 34 M102 22 L112 22 M102 34 L112 34" ' + SW3 + '/>' : ''));
    }
    var apples = '';
    for (var i = 0; i < (o.apples || 0); i++) apples += '<circle cx="' + (40 + (i % 3) * 20) + '" cy="' + (124 - Math.floor(i / 3) * 22) + '" r="12" fill="#e5243b" ' + SW3 + '/>';
    return svg('0 0 120 160', '<path d="M30 18 Q14 30 14 70 L18 140 Q60 156 102 140 L106 70 Q106 30 90 18 Z" fill="#e3f7fc" ' + SW + '/>' +
      '<ellipse cx="60" cy="20" rx="30" ry="9" fill="#fffdf6" ' + SW3 + '/>' + apples);
  });
  add('f-apples', function () {
    var a = '';
    [[40, 34], [70, 30], [100, 34], [130, 30], [160, 34], [55, 52], [85, 50], [115, 52], [145, 50]].forEach(function (p) {
      a += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="15" fill="#e5243b" ' + SW3 + '/><path d="M' + p[0] + ' ' + (p[1] - 14) + ' l2 -8" ' + SW3 + '/>';
    });
    return svg('0 0 200 130', a + '<rect x="14" y="56" width="172" height="66" rx="6" fill="#b88d5f" ' + SW + '/><path d="M14 78 L186 78 M14 100 L186 100" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>' + hi('M30 40 Q34 32 40 30'));
  });
  add('f-bananas', function () {
    return svg('0 0 160 100', '<path d="M18 30 Q40 92 120 84 Q140 80 146 70 Q90 78 52 30 Z" fill="#ffe066" ' + SW + '/>' +
      '<path d="M26 22 Q56 74 132 62 Q144 56 148 48 Q96 58 60 18 Z" fill="#ffd23f" ' + SW + '/><path d="M14 30 L30 16" stroke="#9a6b3f" stroke-width="8" stroke-linecap="round"/>');
  });
  add('f-prodscale', function (o) {
    return svg('0 0 200 170', '<rect x="30" y="64" width="140" height="98" rx="10" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="44" y="84" width="112" height="44" rx="6" fill="#1c1640" ' + SW3 + '/>' +
      '<path d="M14 50 L186 50 L176 64 L24 64 Z" fill="#fffdf6" ' + SW + '/>' +
      (o.bananas ? '<g transform="translate(40 -6) scale(.75)"><path d="M18 30 Q40 92 120 84 Q140 80 146 70 Q90 78 52 30 Z" fill="#ffe066" ' + SW + '/><path d="M26 22 Q56 74 132 62 Q144 56 148 48 Q96 58 60 18 Z" fill="#ffd23f" ' + SW + '/></g>' : '') +
      '<rect x="60" y="140" width="80" height="12" rx="4" fill="#4b4466"/>');
  });
  add('f-cake', function (o) {
    return svg('0 0 160 130', '<ellipse cx="80" cy="114" rx="70" ry="12" fill="#c3ccd8" ' + SW3 + '/>' +
      '<rect x="28" y="56" width="104" height="56" rx="10" fill="#f3d998" ' + SW + '/><path d="M28 70 Q42 84 54 70 Q68 84 80 70 Q94 84 106 70 Q120 84 132 70 L132 64 Q132 50 118 48 L42 48 Q28 50 28 64 Z" fill="#ff77b4" ' + SW3 + '/>' +
      '<circle cx="80" cy="38" r="10" fill="#e5243b" ' + SW3 + '/><path d="M80 28 Q84 16 92 12" fill="none" ' + SW3 + '/>' +
      (o.sticker ? '<circle cx="118" cy="92" r="20" fill="#ffd23f" ' + SW3 + '/>' + txt(118, 101, 24, '£1') : '') + hi('M38 90 L38 102'));
  });
  add('f-cheese', function (o) {
    var lines = '';
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4;
      lines += '<path d="M100 100 L' + (100 + Math.cos(a) * 80).toFixed(1) + ' ' + (100 + Math.sin(a) * 80).toFixed(1) + '" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3" stroke-dasharray="7 6"/>';
    }
    return svg('0 0 200 200', '<circle cx="100" cy="100" r="88" fill="#f5b400" ' + SW + '/><circle cx="100" cy="100" r="76" fill="#ffe066" ' + SW3 + '/>' + lines +
      '<circle cx="70" cy="128" r="7" fill="#f5b400"/><circle cx="132" cy="74" r="6" fill="#f5b400"/><circle cx="124" cy="136" r="5" fill="#f5b400"/>' + hi('M46 60 Q58 42 78 34'));
  });
  add('f-counter', function () {
    return svg('0 0 300 110', '<rect x="10" y="22" width="280" height="82" rx="8" fill="#a0784d" ' + SW + '/><rect x="4" y="8" width="292" height="20" rx="6" fill="#b88d5f" ' + SW + '/>' +
      '<path d="M40 50 L40 86 M110 50 L110 86 M190 50 L190 86 M260 50 L260 86" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>');
  });
  add('f-glasscase', function () {
    return svg('0 0 300 110', '<rect x="8" y="40" width="284" height="64" rx="8" fill="#fffdf6" ' + SW + '/><path d="M8 40 L40 6 L292 6 L292 40 Z" fill="#e3f7fc" fill-opacity=".8" ' + SW3 + '/>' +
      '<path d="M60 14 L44 32" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/><rect x="20" y="56" width="260" height="10" rx="4" fill="#c3ccd8"/>');
  });

  function croissant(x, y, k) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')"><path d="M6 40 Q2 20 22 14 Q40 6 58 14 Q78 20 74 40 Q64 30 54 34 Q40 22 26 34 Q16 30 6 40 Z" fill="#f5b400" ' + SW + '/>' +
      '<path d="M26 34 Q30 20 40 16 M54 34 Q50 20 40 16" fill="none" ' + SW3 + '/></g>';
  }
  add('f-croissant', function () {
    return svg('0 0 80 50', croissant(0, 2, 1));
  });
  add('f-tray', function () {
    var c = '';
    for (var i = 0; i < 4; i++) c += croissant(10 + i * 44, 2, 0.6);
    return svg('0 0 200 50', c + '<rect x="4" y="32" width="192" height="14" rx="5" fill="#c3ccd8" ' + SW + '/>');
  });
  add('f-oven', function (o) {
    var c = '';
    if (o.full !== false) for (var i = 0; i < 3; i++) c += croissant(48 + i * 36, 96, 0.45);
    return svg('0 0 200 200', '<rect x="10" y="8" width="180" height="186" rx="14" fill="#c3ccd8" ' + SW + '/><rect x="10" y="8" width="180" height="34" rx="14" fill="#4b4466" ' + SW + '/>' +
      '<circle cx="40" cy="25" r="8" fill="#ffd23f" ' + SW3 + '/><circle cx="66" cy="25" r="8" fill="#ffd23f" ' + SW3 + '/>' +
      '<rect x="34" y="62" width="132" height="84" rx="10" fill="#c98b4a" ' + SW + '/><rect x="44" y="72" width="112" height="64" rx="6" fill="#ffe066" ' + SW3 + '/>' + c +
      '<path d="M44 126 L156 126" stroke="#8a86a8" stroke-width="5"/><rect x="40" y="160" width="120" height="12" rx="6" fill="#4b4466" ' + SW3 + '/>' + hi('M52 80 L64 80'));
  });

  /* ------------------------------------------------------------- checkout */
  add('f-shopper', function (o) {
    var col = o.color || '#7fb2ff';
    var carry = '';
    if (o.carry === 'trolley') carry = '<path d="M64 112 L118 112 L112 156 L70 156 Z" fill="#c3ccd8" ' + SW3 + '/><path d="M70 112 Q70 84 84 92 Q90 72 100 90 Q110 78 114 112" fill="#ffd23f" ' + SW3 + '/><circle cx="74" cy="168" r="7" fill="#4b4466" ' + SW3 + '/><circle cx="108" cy="168" r="7" fill="#4b4466" ' + SW3 + '/>';
    else if (o.carry === 'basket') carry = '<path d="M70 124 L108 124 L104 148 L74 148 Z" fill="#e5243b" ' + SW3 + '/><path d="M76 124 Q89 104 102 124" fill="none" ' + SW3 + '/>';
    return svg('0 0 120 180', '<path d="M22 176 L22 96 Q22 66 52 66 Q82 66 82 96 L82 176 Z" fill="' + col + '" ' + SW + '/>' +
      '<circle cx="52" cy="40" r="26" fill="#ffd9b0" ' + SW + '/><circle cx="44" cy="38" r="4" fill="' + INK + '"/><circle cx="60" cy="38" r="4" fill="' + INK + '"/><path d="M44 50 Q52 56 60 50" fill="none" ' + SW3 + '/>' + carry);
  });
  add('f-belt', function () {
    var r = '';
    for (var x = 30; x < 400; x += 40) r += '<circle cx="' + x + '" cy="22" r="4" fill="#8a86a8"/>';
    return svg('0 0 400 70', '<rect x="4" y="30" width="392" height="36" rx="6" fill="#c3ccd8" ' + SW + '/><rect x="4" y="8" width="392" height="28" rx="14" fill="#2d2850" ' + SW + '/>' + r);
  });
  add('f-divider', function () {
    return svg('0 0 200 44', '<rect x="6" y="8" width="188" height="28" rx="12" fill="#ffd23f" ' + SW + '/>' +
      '<path d="M40 10 L28 34 M72 10 L60 34 M104 10 L92 34 M136 10 L124 34 M168 10 L156 34" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>');
  });
  add('f-gum', function () {
    return svg('0 0 120 90', '<rect x="10" y="16" width="100" height="62" rx="10" fill="#5fd98a" ' + SW + '/><rect x="10" y="36" width="100" height="22" fill="#fffdf6" ' + SW3 + '/>' +
      '<path d="M24 47 L96 47" stroke="#2fae84" stroke-width="6" stroke-linecap="round" stroke-dasharray="10 8"/>' + hi('M20 26 L34 26'));
  });
  add('f-milk', function () {
    return svg('0 0 100 130', '<path d="M30 8 L62 8 L62 26 Q86 34 86 58 L86 118 Q86 124 80 124 L22 124 Q16 124 16 118 L16 58 Q16 34 30 26 Z" fill="#fffdf6" ' + SW + '/>' +
      '<rect x="28" y="2" width="36" height="12" rx="4" fill="#3a86ff" ' + SW3 + '/><rect x="16" y="70" width="70" height="26" fill="#3a86ff" ' + SW3 + '/>' + hi('M26 50 L26 60'));
  });
  add('f-bread', function () {
    return svg('0 0 140 100', '<path d="M14 88 L14 46 Q14 14 70 14 Q126 14 126 46 L126 88 Z" fill="#c98b4a" ' + SW + '/>' +
      '<path d="M44 26 L52 46 M70 22 L76 44 M96 26 L100 46" ' + SW3 + '/>' + hi('M24 50 Q26 34 40 26'));
  });
  add('f-eggs', function () {
    var e = '';
    for (var i = 0; i < 3; i++) e += '<ellipse cx="' + (38 + i * 37) + '" cy="34" rx="14" ry="18" fill="#fffdf6" ' + SW3 + '/>';
    return svg('0 0 150 90', e + '<path d="M10 44 L140 44 L132 82 L18 82 Z" fill="#b88d5f" ' + SW + '/><path d="M52 44 L50 82 M98 44 L100 82" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>');
  });
  add('f-potatoes', function () {
    return svg('0 0 120 130', '<path d="M22 32 Q20 16 40 20 L80 20 Q100 16 98 32 L106 116 Q60 132 14 116 Z" fill="#c98b4a" ' + SW + '/>' +
      '<path d="M34 24 Q60 40 86 24" fill="none" ' + SW3 + '/><path d="M24 74 L96 74 M22 96 L98 96" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>' +
      '<ellipse cx="60" cy="14" rx="20" ry="10" fill="#b88d5f" ' + SW3 + '/>');
  });
  add('f-carrier', function (o) {
    var body = '<path d="M46 56 Q46 12 64 12 Q80 12 80 56" fill="none" ' + SW + '/><path d="M80 56 Q80 12 98 12 Q114 12 114 56" fill="none" ' + SW + '/>' +
      '<path d="M30 52 L130 52 L142 172 Q80 184 18 172 Z" fill="#fffdf6" ' + SW + '/><path d="M30 52 L22 64 M130 52 L138 64" ' + SW3 + '/>' +
      '<circle cx="80" cy="112" r="20" fill="#5fd98a" ' + SW3 + '/><path d="M70 112 Q80 124 90 112" fill="none" ' + SW3 + '/>';
    if (o.split) body += '<path d="M60 174 L70 150 L80 168 L90 146 L100 174" fill="var(--stage-floor)" ' + SW3 + '/>';
    if (o.full) body = '<path d="M36 56 Q40 30 58 34 Q70 18 88 32 Q106 24 124 56 Z" fill="#c98b4a" ' + SW3 + '/>' + body;
    return svg('0 0 160 190', body + hi('M36 80 L32 150'));
  });

  /* -------------------------------------------------------- self-service */
  add('f-selfcheck', function (o) {
    return svg('0 0 200 260', '<rect x="40" y="96" width="120" height="156" rx="10" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="20" y="10" width="160" height="96" rx="12" fill="#4b4466" ' + SW + '/><rect x="32" y="22" width="136" height="72" rx="6" fill="#1c1640" ' + SW3 + '/>' +
      '<rect x="30" y="112" width="140" height="22" rx="6" fill="#3ec1ff" ' + SW3 + '/><path d="M60 123 L140 123" stroke="#e5243b" stroke-width="3"/>' +
      '<rect x="128" y="150" width="24" height="40" rx="4" fill="#2d2850" ' + SW3 + '/>' + hi('M36 30 L36 50'));
  });
  add('f-bagarea', function () {
    return svg('0 0 300 120', '<rect x="10" y="80" width="280" height="34" rx="6" fill="#c3ccd8" ' + SW + '/><rect x="4" y="70" width="292" height="16" rx="6" fill="#8a86a8" ' + SW3 + '/>' +
      '<path d="M30 70 L30 8 M270 70 L270 8 M30 12 L270 12" ' + SW + '/>');
  });
  add('f-lunchbox', function () {
    return svg('0 0 140 110', '<path d="M50 30 Q50 8 70 8 Q90 8 90 30" fill="none" ' + SW + '/><rect x="12" y="28" width="116" height="74" rx="12" fill="#9b5de5" ' + SW + '/>' +
      '<rect x="12" y="28" width="116" height="20" rx="10" fill="#7fb2ff" ' + SW3 + '/>' + txt(70, 92, 36, 'B', '#fffdf6', ' stroke="' + INK + '" stroke-width="3" paint-order="stroke"') + hi('M24 58 L24 80'));
  });
  add('f-boxed', function (o) {
    var tag = o.tagged ? '<rect x="96" y="96" width="44" height="40" rx="10" fill="#8a86a8" ' + SW + '/><circle cx="118" cy="116" r="9" fill="#4b4466" ' + SW3 + '/>' : '';
    return svg('0 0 150 150', '<rect x="10" y="20" width="130" height="120" rx="8" fill="#ff77b4" ' + SW + '/><path d="M10 40 L140 40" ' + SW3 + '/>' +
      '<path d="M48 64 L98 64 L94 112 L52 112 Z" fill="#fffdf6" ' + SW3 + '/><path d="M98 74 Q114 82 98 100" fill="none" ' + SW3 + '/><path d="M60 64 L64 54 L82 54 L86 64" fill="#fffdf6" ' + SW3 + '/>' + tag + hi('M20 52 L20 70'));
  });
  add('f-detacher', function () {
    return svg('0 0 140 90', '<ellipse cx="70" cy="56" rx="62" ry="26" fill="#4b4466" ' + SW + '/><ellipse cx="70" cy="50" rx="44" ry="18" fill="#c3ccd8" ' + SW3 + '/>' +
      '<path d="M54 50 L86 50 M70 40 L70 60" stroke="#e5243b" stroke-width="5" stroke-linecap="round"/>');
  });
  add('f-gates', function (o) {
    var bar = function (x) { return '<rect x="' + x + '" y="10" width="40" height="200" rx="16" fill="#c3ccd8" ' + SW + '/><rect x="' + (x + 12) + '" y="30" width="16" height="140" rx="8" fill="' + (o.alarm ? '#e5243b' : '#fffdf6') + '" ' + SW3 + '/>'; };
    return svg('0 0 220 220', bar(10) + bar(170) + (o.alarm ? rays(30, 20, 26, 3, 200, 300) + rays(190, 20, 26, 3, 240, 340) : ''));
  });
  add('f-barcode', function (o) {
    var ws = [4, 2, 6, 2, 4, 2, 2, 6, 4, 2, 4, 6, 2, 4, 2], x0 = o.yellow ? 52 : 20, x1 = 104, tot = 0, bars = '';
    ws.forEach(function (w) { tot += w + 2.5; });
    var k = (x1 - x0) / tot, x = x0;
    ws.forEach(function (w, i) { if (i % 2 === 0) bars += '<rect x="' + x.toFixed(1) + '" y="14" width="' + (w * k).toFixed(1) + '" height="36" fill="' + INK + '"/>'; x += (w + 2.5) * k; });
    return svg('0 0 120 64', '<rect x="6" y="6" width="108" height="52" rx="6" fill="' + (o.yellow ? '#ffd23f' : '#fffdf6') + '" ' + SW3 + '/>' + bars +
      (o.yellow ? '<circle cx="29" cy="32" r="17" fill="#fffdf6" ' + SW3 + '/>' + txt(29, 40, 22, '!') : ''));
  });
  add('f-cakebox', function () {
    return svg('0 0 220 150', '<rect x="10" y="40" width="200" height="104" rx="10" fill="#fffdf6" ' + SW + '/><path d="M10 40 L30 10 L190 10 L210 40" fill="#e3f7fc" fill-opacity=".8" ' + SW3 + '/>' +
      '<rect x="60" y="20" width="100" height="22" rx="6" fill="#ff77b4" ' + SW3 + '/><circle cx="110" cy="14" r="6" fill="#e5243b" ' + SW3 + '/>' + hi('M24 54 L24 74'));
  });

  /* ----------------------------------------------------------------- exit */
  add('f-autodoor', function (o) {
    var off = o.open ? 44 : 0;
    var beam = '<path d="M120 46 L76 118 M120 46 L164 118" fill="none" stroke="#e5243b" stroke-width="3" stroke-dasharray="6 6"/><path d="M76 118 Q120 130 164 118" fill="none" stroke="#e5243b" stroke-width="3" stroke-dasharray="6 6"/>';
    return svg('0 0 240 270', '<rect x="8" y="10" width="224" height="256" rx="8" fill="#4b4466" ' + SW + '/><rect x="22" y="44" width="196" height="222" fill="#1c1640"/>' +
      '<rect x="' + (22 - off) + '" y="44" width="98" height="222" fill="#3ec1ff" fill-opacity=".45" ' + SW3 + '/><rect x="' + (120 + off) + '" y="44" width="98" height="222" fill="#3ec1ff" fill-opacity=".45" ' + SW3 + '/>' +
      '<rect x="8" y="10" width="224" height="34" rx="8" fill="#8a86a8" ' + SW + '/><rect x="100" y="20" width="40" height="22" rx="6" fill="#2d2850" ' + SW3 + '/><circle cx="120" cy="32" r="6" fill="#e5243b"/>' +
      beam + '<rect x="8" y="44" width="16" height="222" fill="#4b4466" ' + SW3 + '/><rect x="216" y="44" width="16" height="222" fill="#4b4466" ' + SW3 + '/>' +
      (o.open ? '' : hi('M40 70 L40 120') + hi('M138 70 L138 120')));
  });
  add('f-baguette', function () {
    return svg('0 0 200 50', '<path d="M14 30 Q14 10 40 10 L170 10 Q190 12 190 26 Q190 40 170 40 L40 40 Q14 42 14 30 Z" fill="#c98b4a" ' + SW + '/>' +
      '<path d="M50 16 L62 32 M84 16 L96 32 M118 16 L130 32 M152 16 L162 32" ' + SW3 + '/>');
  });

  /* ------------------------------------------------------------- car park */
  add('f-car', function (o) {
    var col = o.color || '#e5243b';
    var lit = o.lights ? '<circle cx="222" cy="72" r="9" fill="#ffd23f" ' + SW3 + '/><circle cx="18" cy="72" r="9" fill="#ffd23f" ' + SW3 + '/>' + rays(222, 72, 14, 3, -40, 40) + rays(18, 72, 14, 3, 140, 220) :
      '<circle cx="222" cy="72" r="7" fill="#fffdf6" ' + SW3 + '/><circle cx="18" cy="72" r="7" fill="#e5243b" ' + SW3 + '/>';
    var flap = o.flap ? '<rect x="30" y="58" width="22" height="20" rx="4" fill="#2d2850" ' + SW3 + '/>' : '';
    if (o.nozzle) flap += '<path d="M30 70 Q12 74 4 96" fill="none" stroke="' + INK + '" stroke-width="6"/><rect x="26" y="60" width="22" height="16" rx="5" fill="' + o.nozzle + '" ' + SW3 + '/>';
    return svg('0 0 240 140', '<path d="M14 100 L14 70 Q14 58 30 56 L62 52 L86 20 Q90 16 98 16 L160 16 Q168 16 172 22 L196 54 L216 58 Q228 62 228 74 L228 100 Z" fill="' + col + '" ' + SW + '/>' +
      '<path d="M94 26 L118 26 L118 52 L76 52 Z" fill="#e3f7fc" ' + SW3 + '/><path d="M128 26 L158 26 L180 52 L128 52 Z" fill="#e3f7fc" ' + SW3 + '/>' +
      lit + flap + '<circle cx="62" cy="104" r="20" fill="#2d2850" ' + SW + '/><circle cx="62" cy="104" r="8" fill="#c3ccd8"/><circle cx="182" cy="104" r="20" fill="#2d2850" ' + SW + '/><circle cx="182" cy="104" r="8" fill="#c3ccd8"/>' +
      hi('M100 32 L106 32'));
  });
  add('f-fob', function () {
    return svg('0 0 120 170', '<circle cx="60" cy="22" r="14" fill="none" stroke="#c3ccd8" stroke-width="7"/><circle cx="60" cy="22" r="14" fill="none" ' + SW3 + '/>' +
      '<rect x="22" y="36" width="76" height="126" rx="30" fill="#2d2850" ' + SW + '/>' +
      '<circle cx="60" cy="78" r="18" fill="#c3ccd8" ' + SW3 + '/><path d="M52 80 L52 72 Q52 64 60 64 Q68 64 68 72" fill="none" ' + SW3 + '/><rect x="50" y="78" width="20" height="14" rx="3" fill="' + INK + '"/>' +
      '<circle cx="60" cy="126" r="18" fill="#ffd23f" ' + SW3 + '/><path d="M50 126 L56 120 L62 126 L68 120 M50 132 L70 132" fill="none" ' + SW3 + '/>');
  });
  add('f-floorline', function () {
    return svg('0 0 100 100', '<path d="M46 2 L70 2 L54 98 L30 98 Z" fill="#ffd23f" ' + SW3 + '/>', 'art fill-art');
  });
  add('f-lamppost', function () {
    return svg('0 0 80 300', '<rect x="34" y="40" width="12" height="250" fill="#8a86a8" ' + SW3 + '/><path d="M40 40 Q40 14 66 14" fill="none" stroke="#8a86a8" stroke-width="10"/><rect x="56" y="12" width="20" height="12" rx="4" fill="#ffe066" ' + SW3 + '/><rect x="22" y="282" width="36" height="12" rx="4" fill="#4b4466" ' + SW3 + '/>');
  });
  add('f-pump', function () {
    return svg('0 0 140 230', '<rect x="20" y="10" width="100" height="210" rx="12" fill="#fffdf6" ' + SW + '/><rect x="20" y="10" width="100" height="36" rx="12" fill="#2bc46f" ' + SW + '/>' +
      '<rect x="34" y="58" width="72" height="40" rx="6" fill="#1c1640" ' + SW3 + '/><path d="M44 78 L96 78" stroke="#7dffb2" stroke-width="5" stroke-dasharray="8 6"/>' +
      '<path d="M120 120 Q140 150 128 200" fill="none" stroke="' + INK + '" stroke-width="6"/><rect x="10" y="214" width="120" height="12" rx="4" fill="#4b4466"/>');
  });
  add('f-nozzle', function (o) {
    var col = o.color || '#2bc46f';
    return svg('0 0 110 140', '<path d="M20 30 Q4 60 30 90" fill="none" stroke="' + INK + '" stroke-width="7"/>' +
      '<path d="M30 20 L80 20 Q96 20 96 36 L96 60 L70 60 L70 100 Q70 112 58 112 L44 112 Q32 112 32 100 L32 60 Z" fill="' + col + '" ' + SW + '/>' +
      '<path d="M96 30 L108 42 L104 48 L92 40" fill="#c3ccd8" ' + SW3 + '/><path d="M44 72 L58 72 L58 96" fill="none" ' + SW3 + '/>' +
      '<circle cx="62" cy="40" r="16" fill="#fffdf6" ' + SW3 + '/>' + txt(62, 48, 22, o.letter || 'U'));
  });

  /* ---------------------------------------------------------- returns desk */
  add('f-toaster', function (o) {
    var toast = o.toast ? '<rect x="52" y="6" width="34" height="40" rx="8" fill="#c98b4a" ' + SW3 + '/><rect x="96" y="2" width="34" height="44" rx="8" fill="#c98b4a" ' + SW3 + '/>' : '';
    var glow = o.on ? '<rect x="50" y="42" width="38" height="8" rx="3" fill="#ffd23f"/><rect x="94" y="42" width="38" height="8" rx="3" fill="#ffd23f"/>' + rays(92, 40, 30, 3, 220, 320) : '';
    return svg('0 0 180 140', toast + '<rect x="24" y="40" width="136" height="90" rx="22" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="48" y="38" width="42" height="12" rx="4" fill="#2d2850" ' + SW3 + '/><rect x="92" y="38" width="42" height="12" rx="4" fill="#2d2850" ' + SW3 + '/>' + glow +
      '<rect x="150" y="' + (o.down ? 96 : 66) + '" width="24" height="12" rx="4" fill="#e5243b" ' + SW3 + '/><path d="M150 60 L150 116" ' + SW3 + '/>' + hi('M38 64 L38 104'));
  });
  add('f-wsocket', function (o) {
    var plug = o.plugged ? '<rect x="20" y="30" width="56" height="52" rx="8" fill="#fffdf6" ' + SW + '/><path d="M48 82 L48 100" stroke="' + INK + '" stroke-width="7"/>' :
      '<rect x="36" y="38" width="8" height="18" rx="2" fill="' + INK + '"/><rect x="54" y="48" width="14" height="8" rx="2" fill="' + INK + '"/><rect x="26" y="48" width="14" height="8" rx="2" fill="' + INK + '" transform="translate(-6 0)"/>';
    return svg('0 0 150 110', '<rect x="8" y="10" width="134" height="90" rx="12" fill="#fffdf6" ' + SW + '/>' + plug +
      '<rect x="96" y="30" width="30" height="50" rx="6" fill="#c3ccd8" ' + SW3 + '/>' +
      (o.on ? '<rect x="100" y="34" width="22" height="22" rx="4" fill="#e5243b" ' + SW3 + '/>' : '<rect x="100" y="54" width="22" height="22" rx="4" fill="#4b4466" ' + SW3 + '/>'));
  });
  add('f-plug', function () {
    return svg('0 0 140 80', '<path d="M60 40 Q100 40 134 60" fill="none" stroke="' + INK + '" stroke-width="7"/>' +
      '<rect x="8" y="14" width="56" height="52" rx="8" fill="#fffdf6" ' + SW + '/><rect x="0" y="22" width="12" height="8" rx="2" fill="#c3ccd8" ' + SW3 + '/><rect x="0" y="50" width="12" height="8" rx="2" fill="#c3ccd8" ' + SW3 + '/><rect x="24" y="2" width="8" height="14" rx="2" fill="#c3ccd8" ' + SW3 + '/>');
  });
})(typeof window !== 'undefined' ? window : globalThis);
