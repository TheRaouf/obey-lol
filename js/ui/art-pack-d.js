/* OBEY? LOL. — art pack D: science, technology and space objects.
 * Original code-drawn SVG in the house style (chunky shapes, ink outlines, flat fills). */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY && OBEY.art;
  if (!A || !A.addObject) return; // loaded before the base art: nothing to extend yet
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function esc(s) { return OBEY.util.escape(String(s)); }

  /* ------------------------------------------------------------ chemistry */
  A.addObject('d-flask', function (o) {
    var c = o.color || '#7dd3ea';
    var liquid = o.empty ? '' : '<path d="M60 118 L140 118 L167 174 Q167 181 160 181 L40 181 Q33 181 33 174Z" fill="' + c + '"/>' +
      (o.bubbling ? '<circle cx="84" cy="150" r="7" fill="#fff" opacity=".7"/><circle cx="112" cy="138" r="5" fill="#fff" opacity=".7"/><circle cx="100" cy="100" r="6" fill="#fff" opacity=".6"/>' : '');
    return svg('0 0 200 200', liquid +
      '<path d="M80 18 L120 18 L120 80 L170 174 Q171 186 160 186 L40 186 Q29 186 30 174 L80 80Z" fill="#e8f7ff" fill-opacity=".35" ' + SW + '/>' +
      '<rect x="72" y="10" width="56" height="12" rx="5" fill="#fffdf6" ' + SW3 + '/><path d="M92 34 L92 74" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>');
  });

  A.addObject('d-jar', function (o) {
    var c = o.color || '#c3ccd8';
    return svg('0 0 200 200', '<rect x="40" y="48" width="120" height="140" rx="18" fill="' + c + '" ' + SW + '/>' +
      '<rect x="50" y="22" width="100" height="30" rx="8" fill="#4b4466" ' + SW + '/>' +
      '<rect x="56" y="82" width="88" height="76" rx="10" fill="#fffdf6" ' + SW3 + '/>' +
      '<text x="100" y="138" text-anchor="middle" font-size="' + (String(o.sym || '').length > 1 ? 46 : 54) + '" font-weight="700" fill="' + INK + '">' + esc(o.sym || '?') + '</text>' +
      '<path d="M146 62 L146 80" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>');
  });

  A.addObject('d-fire', function (o) {
    var bin = '<path d="M46 118 L154 118 L144 192 L56 192Z" fill="#8a86a8" ' + SW + '/><path d="M70 132 L74 178 M100 132 L100 178 M130 132 L126 178" ' + SW3 + '/>';
    if (o.out) return svg('0 0 200 200', bin + '<circle cx="86" cy="96" r="16" fill="#d9d4c7" ' + SW3 + '/><circle cx="110" cy="76" r="20" fill="#e9e6f0" ' + SW3 + '/><circle cx="96" cy="48" r="14" fill="#f4f2f8" ' + SW3 + '/>');
    var big = o.big;
    return svg('0 0 200 200', (big ? '<path d="M100 2 C130 40 176 60 164 122 L36 122 C20 70 70 50 100 2Z" fill="#ff8c1a" ' + SW + '/>' : '<path d="M100 26 C126 56 160 74 150 122 L50 122 C40 80 80 66 100 26Z" fill="#ff8c1a" ' + SW + '/>') +
      '<path d="M100 66 C114 84 134 96 126 122 L74 122 C68 100 90 90 100 66Z" fill="#ffd23f" ' + SW3 + '/>' + bin);
  });

  A.addObject('d-bottle', function (o) {
    var c = o.color || '#7dd3ea';
    return svg('0 0 120 200', '<rect x="44" y="8" width="32" height="16" rx="4" fill="#4b4466" ' + SW3 + '/>' +
      '<path d="M48 24 L72 24 L72 52 Q104 62 104 92 L104 180 Q104 192 92 192 L28 192 Q16 192 16 180 L16 92 Q16 62 48 52Z" fill="#f4fbff" ' + SW + '/>' +
      '<path d="M20 104 L100 104 L100 180 Q100 188 92 188 L28 188 Q20 188 20 180Z" fill="' + c + '"/>' +
      '<path d="M48 24 L72 24 L72 52 Q104 62 104 92 L104 180 Q104 192 92 192 L28 192 Q16 192 16 180 L16 92 Q16 62 48 52Z" fill="none" ' + SW + '/>' +
      '<path d="M30 76 L30 96" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>');
  });

  /** Tall measuring column filled from the bottom with `layers` (colours, bottom first). */
  A.addObject('d-column', function (o) {
    var layers = o.layers || [], out = '';
    layers.forEach(function (c, i) { out += '<rect x="64" y="' + (156 - i * 36) + '" width="72" height="36" fill="' + c + '"/>'; });
    if (o.murky) out = '<rect x="64" y="' + (192 - 36 * Math.max(1, layers.length)) + '" width="72" height="' + (36 * Math.max(1, layers.length)) + '" fill="#a08a5c"/>';
    var ticks = '';
    for (var i = 0; i < 5; i++) ticks += '<path d="M64 ' + (48 + i * 36) + ' L80 ' + (48 + i * 36) + '" ' + SW3 + '/>';
    return svg('0 0 200 220', out + '<path d="M60 10 L60 192 Q60 200 68 200 L132 200 Q140 200 140 192 L140 10" fill="none" ' + SW + '/>' + ticks +
      '<rect x="40" y="200" width="120" height="14" rx="5" fill="#8a86a8" ' + SW3 + '/><path d="M126 24 L126 70" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>');
  });

  A.addObject('d-freezer', function (o) {
    var st = o.state || 'ok';
    var inside = '<rect x="58" y="104" width="84" height="56" rx="8" fill="#ff9ec4" ' + SW3 + '/><path d="M64 104 Q80 80 100 96 Q120 74 136 104Z" fill="#fff3e0" ' + SW3 + '/>';
    if (st === 'melted') inside = '<path d="M40 168 Q70 150 100 162 Q130 150 160 168Z" fill="#ff9ec4" ' + SW3 + '/><rect x="64" y="122" width="72" height="40" rx="8" fill="#ffd0e2" ' + SW3 + '/>';
    if (st === 'boiled') inside = '<rect x="64" y="122" width="72" height="40" rx="8" fill="#ffd0e2" ' + SW3 + '/><path d="M80 110 Q72 96 82 84 M100 110 Q92 92 104 78 M120 110 Q112 96 122 84" fill="none" ' + SW3 + '/>';
    var frost = st === 'frozen' ? '<rect x="36" y="44" width="128" height="128" rx="10" fill="#bde8ff" opacity=".85"/><path d="M60 60 l20 20 m0 -20 l-20 20 M130 120 l20 20 m0 -20 l-20 20 M120 64 l14 14 m0 -14 l-14 14" ' + SW3 + '/>' : '';
    return svg('0 0 200 200', '<rect x="20" y="10" width="160" height="182" rx="16" fill="#f4f2f8" ' + SW + '/><rect x="36" y="44" width="128" height="128" rx="10" fill="#dff3ff" ' + SW3 + '/>' + inside + frost +
      '<rect x="36" y="20" width="60" height="14" rx="6" fill="#c3ccd8" ' + SW3 + '/><circle cx="150" cy="27" r="7" fill="' + (st === 'ok' ? '#2bc46f' : (st === 'frozen' ? '#3ec1ff' : '#e5243b')) + '" ' + SW3 + '/>');
  });

  A.addObject('d-balloon', function (o) {
    var sparks = o.charged ? '<path d="M28 40 L44 52 L34 58 L50 72" fill="none" stroke="#ffb020" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M172 46 L156 58 L166 64 L150 78" fill="none" stroke="#ffb020" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M60 14 L70 28 M140 14 L130 28" stroke="#ffb020" stroke-width="5" stroke-linecap="round"/>' : '';
    return svg('0 0 200 200', sparks + '<path d="M100 132 Q92 160 104 176 Q114 190 100 198" fill="none" ' + SW3 + '/>' +
      '<ellipse cx="100" cy="76" rx="50" ry="60" fill="#e5243b" ' + SW + '/><path d="M92 136 L108 136 L104 128 L96 128Z" fill="#e5243b" ' + SW3 + '/>' +
      '<path d="M74 52 Q80 38 94 34" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".75"/>');
  });

  A.addObject('d-keycard', function (o) {
    return svg('0 0 160 110', '<g transform="rotate(' + (o.tilt || -6) + ' 80 55)"><rect x="12" y="14" width="136" height="84" rx="10" fill="#fffdf6" ' + SW + '/>' +
      '<rect x="12" y="30" width="136" height="16" fill="#3ec1ff"/><rect x="12" y="14" width="136" height="84" rx="10" fill="none" ' + SW + '/>' +
      '<rect x="26" y="58" width="28" height="22" rx="4" fill="#ffd23f" ' + SW3 + '/><path d="M68 64 L130 64 M68 78 L112 78" ' + SW3 + '/></g>');
  });

  A.addObject('d-stool', function () {
    return svg('0 0 160 200', '<g transform="rotate(-7 80 100)"><rect x="18" y="40" width="124" height="22" rx="8" fill="#c9a86a" ' + SW + '/>' +
      '<path d="M34 62 L22 188 M126 62 L140 188 M80 62 L84 150" ' + SW + '/><path d="M28 132 L132 128" ' + SW3 + '/></g>' +
      '<path d="M84 150 L90 166 L80 172" fill="none" ' + SW3 + '/>');
  });

  /* ---------------------------------------------------------- electricity */
  A.addObject('d-clip', function () {
    return svg('0 0 200 120', '<path d="M40 40 L150 40 Q176 40 176 62 Q176 84 150 84 L56 84 Q38 84 38 68 Q38 54 56 54 L140 54 Q150 54 150 64 Q150 72 140 72 L70 72" fill="none" stroke="#8a86a8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M40 40 L150 40 Q176 40 176 62 Q176 84 150 84 L56 84 Q38 84 38 68 Q38 54 56 54 L140 54 Q150 54 150 64 Q150 72 140 72 L70 72" fill="none" stroke="#e9eef5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>');
  });

  A.addObject('d-duck', function () {
    return svg('0 0 200 160', '<path d="M30 92 Q30 146 96 146 Q164 146 170 100 Q150 110 128 100 Q140 80 132 60 Q120 32 92 36 Q60 42 64 76 Q40 70 30 92Z" fill="#ffd23f" ' + SW + '/>' +
      '<path d="M60 64 L30 70 L58 80Z" fill="#ff8c1a" ' + SW3 + '/><circle cx="86" cy="58" r="6" fill="' + INK + '"/><path d="M88 108 Q112 124 140 106" fill="none" ' + SW3 + '/>');
  });

  A.addObject('d-spoon', function () {
    return svg('0 0 200 120', '<path d="M20 64 L120 56" stroke="#9a6b3f" stroke-width="16" stroke-linecap="round"/>' +
      '<ellipse cx="150" cy="54" rx="36" ry="24" fill="#c9a86a" ' + SW + '/><ellipse cx="150" cy="54" rx="22" ry="12" fill="#b88d5f"/><path d="M14 58 L118 50 M22 72 L122 64" ' + SW3 + '/>');
  });

  /** Horizontal wire with a gap in the middle; `bridge` shows the paperclip across it. */
  A.addObject('d-wire-h', function (o) {
    var c = o.live ? '#ffb020' : '#58607e';
    return svg('0 0 400 100', '<path d="M4 50 L150 50 M250 50 L396 50" stroke="' + INK + '" stroke-width="14" stroke-linecap="round"/><path d="M4 50 L150 50 M250 50 L396 50" stroke="' + c + '" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="150" cy="50" r="10" fill="#c3ccd8" ' + SW3 + '/><circle cx="250" cy="50" r="10" fill="#c3ccd8" ' + SW3 + '/>' +
      (o.bridge ? '<path d="M150 50 L250 50" stroke="#8a86a8" stroke-width="10" stroke-linecap="round"/><path d="M150 50 L250 50" stroke="#e9eef5" stroke-width="4" stroke-linecap="round"/>' : ''));
  });

  /** Big power button (circle with the universal power glyph). */
  A.addObject('d-power', function (o) {
    return svg('0 0 200 200', '<circle cx="100" cy="100" r="80" fill="' + (o.on ? '#2bc46f' : '#58607e') + '" ' + SW + '/>' +
      '<path d="M70 70 A44 44 0 1 0 130 70" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/><path d="M100 46 L100 100" stroke="#fff" stroke-width="14" stroke-linecap="round"/>');
  });

  A.addObject('d-monitor', function (o) {
    var m = o.mode || 'frozen', screen;
    if (m === 'off') screen = '<rect x="22" y="20" width="156" height="104" rx="6" fill="#1c1640"/>';
    else if (m === 'boot') screen = '<rect x="22" y="20" width="156" height="104" rx="6" fill="#1c1640"/><circle cx="84" cy="72" r="7" fill="#7dffb2"/><circle cx="100" cy="72" r="7" fill="#7dffb2" opacity=".6"/><circle cx="116" cy="72" r="7" fill="#7dffb2" opacity=".3"/>';
    else if (m === 'desktop') screen = '<rect x="22" y="20" width="156" height="104" rx="6" fill="#7dd3ea"/><path d="M22 104 Q70 80 120 98 T178 90 L178 124 L22 124Z" fill="#2fae84"/>';
    else if (m === 'cracked') screen = '<rect x="22" y="20" width="156" height="104" rx="6" fill="#d9d4c7"/><path d="M100 70 L60 30 M100 70 L160 40 M100 70 L70 120 M100 70 L150 116 M100 70 L30 84" ' + SW3 + '/>';
    else screen = '<rect x="22" y="20" width="156" height="104" rx="6" fill="#7dd3ea"/><rect x="40" y="34" width="120" height="76" rx="6" fill="#e9e6f0" ' + SW3 + '/><rect x="40" y="34" width="120" height="16" rx="6" fill="#8a86a8" ' + SW3 + '/>' +
      '<path d="M88 62 L112 62 L100 78 L112 94 L88 94 L100 78Z" fill="#ffd23f" ' + SW3 + '/>' +
      '<rect x="40" y="34" width="120" height="76" fill="#fff" opacity=".35"/>';
    return svg('0 0 200 180', '<rect x="10" y="8" width="180" height="128" rx="12" fill="#2d2850" ' + SW + '/>' + screen +
      '<path d="M84 136 L78 162 L122 162 L116 136Z" fill="#58607e" ' + SW3 + '/><rect x="54" y="160" width="92" height="14" rx="5" fill="#58607e" ' + SW3 + '/>');
  });

  /** Bar magnet, N (red) on the left unless `flip`. */
  A.addObject('d-magnet', function (o) {
    var L = o.flip ? 'S' : 'N', R = o.flip ? 'N' : 'S';
    var col = function (p) { return p === 'N' ? '#e5243b' : '#3e7bff'; };
    return svg('0 0 200 100', '<rect x="8" y="22" width="92" height="58" fill="' + col(L) + '"/><rect x="100" y="22" width="92" height="58" fill="' + col(R) + '"/>' +
      '<rect x="8" y="22" width="184" height="58" rx="8" fill="none" ' + SW + '/><path d="M100 22 L100 80" ' + SW3 + '/>' +
      '<text x="54" y="66" text-anchor="middle" font-size="38" font-weight="700" fill="#fff">' + L + '</text><text x="146" y="66" text-anchor="middle" font-size="38" font-weight="700" fill="#fff">' + R + '</text>');
  });

  /** Little rail cart with a magnet (N facing left) carrying a key. */
  A.addObject('d-cart', function () {
    return svg('0 0 160 120', '<rect x="30" y="48" width="112" height="44" rx="8" fill="#ffd23f" ' + SW + '/>' +
      '<rect x="4" y="50" width="30" height="40" rx="5" fill="#e5243b" ' + SW3 + '/><text x="19" y="80" text-anchor="middle" font-size="24" font-weight="700" fill="#fff">N</text>' +
      '<circle cx="58" cy="100" r="12" fill="#58607e" ' + SW3 + '/><circle cx="118" cy="100" r="12" fill="#58607e" ' + SW3 + '/>' +
      '<circle cx="70" cy="30" r="14" fill="none" stroke="#e5a800" stroke-width="8"/><path d="M84 30 L130 30 M116 30 L116 44 M126 30 L126 40" stroke="#e5a800" stroke-width="8" stroke-linecap="round"/>');
  });

  A.addObject('d-tube', function () {
    return svg('0 0 400 100', '<rect x="6" y="14" width="388" height="72" rx="30" fill="#e8f7ff" fill-opacity=".45" ' + SW + '/><path d="M30 84 L370 84" stroke="#8a86a8" stroke-width="6"/>' +
      '<path d="M40 28 L120 28" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>');
  });

  /* ------------------------------------------------------------ computers */
  A.addObject('d-laptop', function (o) {
    var bars = '', n = o.bars || 0;
    for (var i = 0; i < 4; i++) bars += '<rect x="' + (72 + i * 16) + '" y="' + (86 - i * 14) + '" width="10" height="' + (18 + i * 14) + '" rx="2" fill="' + (i < n ? '#2bc46f' : '#c3ccd8') + '" ' + SW3 + '/>';
    return svg('0 0 200 160', '<rect x="30" y="16" width="140" height="96" rx="10" fill="#2d2850" ' + SW + '/><rect x="42" y="28" width="116" height="74" rx="4" fill="#f5feff"/>' + bars +
      '<path d="M10 116 L190 116 L176 142 L24 142Z" fill="#c3ccd8" ' + SW + '/><rect x="80" y="122" width="40" height="8" rx="3" fill="#8a86a8"/>');
  });

  A.addObject('d-router', function () {
    return svg('0 0 200 140', '<path d="M50 70 L36 10 M150 70 L164 10" ' + SW + '/><circle cx="36" cy="10" r="6" fill="' + INK + '"/><circle cx="164" cy="10" r="6" fill="' + INK + '"/>' +
      '<path d="M84 40 Q100 26 116 40 M74 30 Q100 8 126 30" fill="none" stroke="#2bc46f" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="20" y="66" width="160" height="56" rx="14" fill="#fffdf6" ' + SW + '/><circle cx="54" cy="94" r="7" fill="#2bc46f"/><circle cx="80" cy="94" r="7" fill="#2bc46f"/><circle cx="106" cy="94" r="7" fill="#ffd23f"/><circle cx="132" cy="94" r="7" fill="#2bc46f"/>');
  });

  A.addObject('d-microwave', function () {
    return svg('0 0 200 140', '<rect x="10" y="14" width="180" height="116" rx="12" fill="#e9e6f0" ' + SW + '/><rect x="26" y="30" width="112" height="84" rx="8" fill="#fff3a8" ' + SW3 + '/>' +
      '<circle cx="82" cy="74" r="16" fill="#ffd23f" ' + SW3 + '/><rect x="150" y="34" width="26" height="14" rx="3" fill="#1c1640"/><circle cx="156" cy="70" r="6" fill="#8a86a8"/><circle cx="170" cy="70" r="6" fill="#8a86a8"/><circle cx="156" cy="88" r="6" fill="#8a86a8"/><circle cx="170" cy="88" r="6" fill="#8a86a8"/>');
  });

  A.addObject('d-sofa', function () {
    return svg('0 0 200 120', '<rect x="30" y="20" width="140" height="56" rx="16" fill="#9b5de5" ' + SW + '/><rect x="10" y="50" width="40" height="56" rx="12" fill="#b48cff" ' + SW + '/><rect x="150" y="50" width="40" height="56" rx="12" fill="#b48cff" ' + SW + '/>' +
      '<rect x="44" y="66" width="112" height="40" rx="8" fill="#b48cff" ' + SW + '/><path d="M24 106 L24 116 M176 106 L176 116" ' + SW + '/>');
  });

  /** A captcha tile showing one slice of the scene. */
  A.addObject('d-tile', function (o) {
    var p = o.part, g = '';
    var body = '#e9eef5', nose = '#e5243b', fin = '#e5243b';
    if (p === 'nose') g = '<path d="M100 30 Q140 70 136 200 L64 200 Q60 70 100 30Z" fill="' + body + '" ' + SW + '/><path d="M100 30 Q124 52 130 86 L70 86 Q76 52 100 30Z" fill="' + nose + '" ' + SW3 + '/>';
    else if (p === 'body') g = '<rect x="64" y="-10" width="72" height="220" fill="' + body + '" ' + SW + '/><circle cx="100" cy="80" r="22" fill="#7dd3ea" ' + SW + '/><path d="M64 150 L136 150" ' + SW3 + '/>';
    else if (p === 'fins') g = '<path d="M64 60 L-4 120 L-4 182 L64 130Z" fill="' + fin + '" ' + SW + '/><path d="M136 60 L204 120 L204 182 L136 130Z" fill="' + fin + '" ' + SW + '/><rect x="64" y="-10" width="72" height="140" fill="' + body + '" ' + SW + '/>' +
      '<path d="M76 130 Q100 210 124 130Z" fill="#ffb020" ' + SW3 + '/><path d="M90 130 Q100 170 110 130Z" fill="#ffd23f"/>';
    else if (p === 'finL') g = '<path d="M204 120 L150 162 L150 190 L204 182Z" fill="' + fin + '" ' + SW + '/>';
    else if (p === 'finR') g = '<path d="M-4 120 L50 162 L50 190 L-4 182Z" fill="' + fin + '" ' + SW + '/>';
    else if (p === 'planet') g = '<circle cx="100" cy="100" r="46" fill="#ff8c1a" ' + SW + '/><ellipse cx="100" cy="104" rx="80" ry="18" fill="none" ' + SW + '/><path d="M70 84 Q100 74 128 86" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/>';
    else if (p === 'moon') g = '<circle cx="100" cy="100" r="50" fill="#e9e6f0" ' + SW + '/><circle cx="84" cy="86" r="10" fill="#c3ccd8" ' + SW3 + '/><circle cx="118" cy="118" r="8" fill="#c3ccd8" ' + SW3 + '/>';
    else if (p === 'satellite') g = '<rect x="80" y="80" width="40" height="40" rx="6" fill="#c3ccd8" ' + SW + '/><rect x="20" y="88" width="52" height="24" fill="#3e7bff" ' + SW3 + '/><rect x="128" y="88" width="52" height="24" fill="#3e7bff" ' + SW3 + '/><path d="M100 80 L100 56" ' + SW3 + '/><circle cx="100" cy="52" r="6" fill="#ffd23f" ' + SW3 + '/>';
    else if (p === 'comet') g = '<path d="M40 50 L130 120" stroke="#7dd3ea" stroke-width="22" stroke-linecap="round" opacity=".7"/><circle cx="136" cy="126" r="22" fill="#e9eef5" ' + SW + '/>';
    else g = '<path d="M100 60 l10 26 28 2 -22 18 8 28 -24 -16 -24 16 8 -28 -22 -18 28 -2z" fill="#ffd23f" ' + SW3 + '/>';
    var stars = '<circle cx="30" cy="30" r="3" fill="#fff"/><circle cx="170" cy="40" r="3" fill="#fff"/><circle cx="40" cy="168" r="2.5" fill="#fff"/><circle cx="160" cy="170" r="2.5" fill="#fff"/>';
    var sel = o.sel ? '<rect x="6" y="6" width="188" height="188" rx="10" fill="#2bc46f" opacity=".28"/><circle cx="168" cy="32" r="20" fill="#2bc46f" ' + SW3 + '/><path d="M158 32 L166 40 L180 24" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' : '';
    return svg('0 0 200 200', '<rect x="0" y="0" width="200" height="200" fill="#1c1640"/>' + stars + g + sel + '<rect x="2" y="2" width="196" height="196" fill="none" ' + SW + '/>');
  });

  /* -------------------------------------------------------------- rockets */
  /** A fuel tank showing `level` of `cap` litres. */
  A.addObject('d-tank', function (o) {
    var cap = o.cap || 5, lvl = Math.max(0, Math.min(cap, o.level || 0));
    var top = 30, bot = 186, h = bot - top, unit = h / cap, ticks = '';
    for (var i = 1; i < cap; i++) ticks += '<path d="M30 ' + (bot - i * unit) + ' L48 ' + (bot - i * unit) + '" ' + SW3 + '/>';
    return svg('0 0 120 200', '<rect x="26" y="' + (bot - lvl * unit) + '" width="68" height="' + (lvl * unit) + '" fill="#ff8c1a"/>' +
      '<rect x="26" y="' + top + '" width="68" height="' + h + '" rx="8" fill="none" ' + SW + '/>' + ticks +
      '<rect x="44" y="12" width="32" height="18" rx="4" fill="#58607e" ' + SW3 + '/><path d="M80 44 L80 80" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>');
  });

  A.addObject('d-pump', function () {
    return svg('0 0 160 200', '<rect x="20" y="30" width="90" height="160" rx="12" fill="#e5243b" ' + SW + '/><rect x="36" y="50" width="58" height="40" rx="6" fill="#1c1640" ' + SW3 + '/>' +
      '<path d="M50 62 L80 62 M50 76 L72 76" stroke="#7dffb2" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M110 110 Q146 110 146 150 L146 170" fill="none" ' + SW + '/><rect x="134" y="166" width="24" height="24" rx="4" fill="#58607e" ' + SW3 + '/>');
  });

  A.addObject('d-drain', function () {
    return svg('0 0 200 120', '<ellipse cx="100" cy="66" rx="86" ry="44" fill="#58607e" ' + SW + '/><ellipse cx="100" cy="66" rx="60" ry="28" fill="#1c1640" ' + SW3 + '/>' +
      '<path d="M60 50 L60 82 M80 42 L80 92 M100 40 L100 94 M120 42 L120 92 M140 50 L140 82" stroke="#8a86a8" stroke-width="6"/>');
  });

  A.addObject('d-hose', function () {
    return svg('0 0 200 160', '<path d="M30 120 Q30 40 100 40 Q170 40 170 100 Q170 140 120 140 Q70 140 70 100 Q70 76 100 76 Q130 76 130 100" fill="none" stroke="' + INK + '" stroke-width="20" stroke-linecap="round"/>' +
      '<path d="M30 120 Q30 40 100 40 Q170 40 170 100 Q170 140 120 140 Q70 140 70 100 Q70 76 100 76 Q130 76 130 100" fill="none" stroke="#2bc46f" stroke-width="12" stroke-linecap="round"/>' +
      '<rect x="14" y="116" width="32" height="34" rx="6" fill="#ffd23f" ' + SW + '/>');
  });

  A.addObject('d-rocket', function (o) {
    var flame = o.flame ? '<path d="M78 186 Q100 250 122 186Z" fill="#ff8c1a" ' + SW3 + '/>' : '';
    var gauge = o.fuel !== undefined ? '<rect x="84" y="118" width="32" height="44" rx="4" fill="#1c1640" ' + SW3 + '/><rect x="88" y="' + (158 - Math.round(36 * Math.min(1, o.fuel))) + '" width="24" height="' + Math.round(36 * Math.min(1, o.fuel)) + '" fill="#ff8c1a"/>' : '';
    return svg('0 0 200 240', flame + '<path d="M60 130 L24 190 L66 180Z" fill="#e5243b" ' + SW + '/><path d="M140 130 L176 190 L134 180Z" fill="#e5243b" ' + SW + '/>' +
      '<path d="M100 10 Q150 60 140 186 L60 186 Q50 60 100 10Z" fill="#e9eef5" ' + SW + '/><path d="M100 10 Q126 32 134 62 L66 62 Q74 32 100 10Z" fill="#e5243b" ' + SW3 + '/>' +
      '<circle cx="100" cy="92" r="16" fill="#7dd3ea" ' + SW + '/>' + gauge);
  });

  A.addObject('d-airdoor', function (o) {
    if (o.open) return svg('0 0 120 200', '<rect x="6" y="6" width="108" height="188" rx="12" fill="#1c1640" ' + SW + '/><rect x="6" y="6" width="18" height="188" fill="#c3ccd8" ' + SW3 + '/><rect x="96" y="6" width="18" height="188" fill="#c3ccd8" ' + SW3 + '/>' +
      '<circle cx="40" cy="40" r="2.5" fill="#fff"/><circle cx="76" cy="90" r="3" fill="#fff"/><circle cx="50" cy="150" r="2.5" fill="#fff"/>');
    var stripes = '';
    for (var i = 0; i < 5; i++) stripes += '<path d="M' + (14 + i * 22) + ' 186 L' + (30 + i * 22) + ' 168" stroke="#1c1640" stroke-width="8"/>';
    return svg('0 0 120 200', '<rect x="6" y="6" width="108" height="188" rx="12" fill="#c3ccd8" ' + SW + '/><rect x="12" y="164" width="96" height="26" fill="#ffd23f"/>' + stripes +
      '<rect x="12" y="164" width="96" height="26" fill="none" ' + SW3 + '/><circle cx="60" cy="70" r="26" fill="#7dd3ea" ' + SW + '/><circle cx="60" cy="70" r="26" fill="none" stroke="#58607e" stroke-width="8" opacity=".5"/><rect x="88" y="104" width="14" height="30" rx="4" fill="#58607e" ' + SW3 + '/>');
  });

  A.addObject('d-rover', function () {
    return svg('0 0 200 160', '<rect x="40" y="56" width="120" height="50" rx="10" fill="#ffd23f" ' + SW + '/><path d="M100 56 L100 26" ' + SW + '/><rect x="80" y="10" width="40" height="22" rx="6" fill="#c3ccd8" ' + SW3 + '/><circle cx="92" cy="21" r="5" fill="' + INK + '"/><circle cx="108" cy="21" r="5" fill="' + INK + '"/>' +
      '<rect x="56" y="68" width="60" height="16" fill="#3e7bff" ' + SW3 + '/><circle cx="56" cy="126" r="20" fill="#58607e" ' + SW + '/><circle cx="100" cy="126" r="20" fill="#58607e" ' + SW + '/><circle cx="144" cy="126" r="20" fill="#58607e" ' + SW + '/>' +
      '<path d="M160 82 L182 100 L182 128" fill="none" ' + SW + '/>');
  });

  A.addObject('d-crater', function () {
    return svg('0 0 200 120', '<ellipse cx="100" cy="70" rx="92" ry="40" fill="#b6532f" ' + SW + '/><ellipse cx="100" cy="76" rx="64" ry="24" fill="#5a2414" ' + SW3 + '/>');
  });

  A.addObject('d-dish', function (o) {
    return svg('0 0 200 200', '<path d="M100 120 L70 190 L130 190Z" fill="#8a86a8" ' + SW + '/><path d="M30 40 Q40 150 160 140 Z" fill="#e9eef5" ' + SW + '/><path d="M95 92 L140 50" ' + SW + '/><circle cx="144" cy="46" r="10" fill="' + (o.lit ? '#ffd23f' : '#c3ccd8') + '" ' + SW3 + '/>' +
      (o.lit ? '<path d="M160 26 Q172 36 166 52 M172 14 Q192 34 180 60" fill="none" stroke="#ffb020" stroke-width="5" stroke-linecap="round"/>' : ''));
  });

  /* ----------------------------------------------------------------- space */
  A.addObject('d-chamber', function (o) {
    var down = o.dropped;
    var ballY = down ? 172 : 52, featherY = down ? 172 : 52;
    var air = o.air ? '' : '';
    return svg('0 0 200 220', air + '<rect x="30" y="20" width="140" height="180" rx="16" fill="#e8f7ff" fill-opacity=".45" ' + SW + '/><rect x="20" y="196" width="160" height="18" rx="6" fill="#58607e" ' + SW3 + '/><rect x="20" y="8" width="160" height="18" rx="6" fill="#58607e" ' + SW3 + '/>' +
      '<circle cx="74" cy="' + ballY + '" r="18" fill="#2d2850" ' + SW + '/><path d="M66 ' + (ballY - 8) + ' Q72 ' + (ballY - 12) + ' 78 ' + (ballY - 10) + '" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>' +
      '<g transform="translate(130 ' + featherY + ') rotate(' + (down ? 80 : 20) + ')"><path d="M0 -26 Q16 -6 0 26 Q-16 -6 0 -26Z" fill="#fffdf6" ' + SW3 + '/><path d="M0 -20 L0 30" ' + SW3 + '/></g>' +
      '<path d="M44 40 L44 90" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>');
  });

  A.addObject('d-station', function (o) {
    var lit = o.lit || null;
    var col = { red: '#e5243b', blue: '#3e7bff', yellow: '#ffc31f' };
    return svg('0 0 300 160', '<rect x="10" y="50" width="70" height="40" fill="#3e7bff" ' + SW3 + '/><rect x="220" y="50" width="70" height="40" fill="#3e7bff" ' + SW3 + '/>' +
      '<path d="M10 70 L80 70 M220 70 L290 70 M45 50 L45 90 M255 50 L255 90" stroke="#9ec0ff" stroke-width="3"/>' +
      '<rect x="80" y="30" width="140" height="80" rx="20" fill="#e9eef5" ' + SW + '/><rect x="130" y="110" width="40" height="30" fill="#c3ccd8" ' + SW + '/>' +
      '<circle cx="150" cy="70" r="26" fill="' + (lit ? col[lit] : '#58607e') + '" ' + SW + '/>' + (lit ? '<circle cx="150" cy="70" r="38" fill="none" stroke="' + col[lit] + '" stroke-width="6" opacity=".55"/>' : '') +
      '<circle cx="100" cy="50" r="5" fill="#58607e"/><circle cx="200" cy="50" r="5" fill="#58607e"/>');
  });

  A.addObject('d-capsule', function (o) {
    return svg('0 0 160 160', (o.thrust ? '<path d="M60 140 Q80 200 100 140Z" fill="#ff8c1a" ' + SW3 + '/>' : '') +
      '<path d="M80 12 L124 60 L124 140 L36 140 L36 60Z" fill="#e9eef5" ' + SW + '/><rect x="66" y="4" width="28" height="18" rx="4" fill="#c3ccd8" ' + SW3 + '/><circle cx="80" cy="86" r="16" fill="#7dd3ea" ' + SW + '/>' +
      '<rect x="36" y="118" width="88" height="22" fill="#e5243b" ' + SW3 + '/>');
  });

  /** Orrery: the sun, an orbit with 8 slots, Mars at slot `mars`, a target flag at slot `target`. */
  A.addObject('d-orrery', function (o) {
    var cx = 160, cy = 160, r = 112;
    var pt = function (i, rr) { var a = (-90 + 45 * i) * Math.PI / 180; return [cx + (rr || r) * Math.cos(a), cy + (rr || r) * Math.sin(a)]; };
    var slots = '';
    for (var i = 0; i < 8; i++) { var p = pt(i); slots += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="7" fill="#58607e"/>'; }
    var t = pt(o.target || 0), m = pt(o.mars || 0);
    var path = '<path d="M' + cx + ' ' + cy + ' L' + t[0].toFixed(1) + ' ' + t[1].toFixed(1) + '" stroke="#ffd23f" stroke-width="5" stroke-dasharray="10 10" fill="none"/>';
    return svg('0 0 320 320', '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#9ec0ff" stroke-width="4" stroke-dasharray="4 10"/>' + slots + path +
      '<circle cx="' + t[0].toFixed(1) + '" cy="' + t[1].toFixed(1) + '" r="24" fill="none" stroke="#ffd23f" stroke-width="5"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="#ffd23f" ' + SW + '/><path d="M' + (cx - 14) + ' ' + (cy - 6) + ' q14 -10 28 0" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>' +
      '<circle cx="' + m[0].toFixed(1) + '" cy="' + m[1].toFixed(1) + '" r="20" fill="#e2552c" ' + SW + '/><circle cx="' + (m[0] - 6).toFixed(1) + '" cy="' + (m[1] - 4).toFixed(1) + '" r="5" fill="#b6532f"/>' +
      '<text x="' + t[0].toFixed(1) + '" y="' + (t[1] - 32).toFixed(1) + '" text-anchor="middle" font-size="18" font-weight="700" fill="#e5a800">AIM</text>');
  });

  /** A vertical wire of `color`, optionally snipped in the middle. */
  A.addObject('d-wire', function (o) {
    var c = o.color || '#e5243b';
    var line = function (y1, y2) { return '<path d="M30 ' + y1 + ' L30 ' + y2 + '" stroke="' + INK + '" stroke-width="22" stroke-linecap="round"/><path d="M30 ' + y1 + ' L30 ' + y2 + '" stroke="' + c + '" stroke-width="13" stroke-linecap="round"/>'; };
    return svg('0 0 60 200', (o.cut ? line(12, 84) + line(118, 188) : line(12, 188)) + '<rect x="14" y="2" width="32" height="14" rx="4" fill="#c3ccd8" ' + SW3 + '/><rect x="14" y="184" width="32" height="14" rx="4" fill="#c3ccd8" ' + SW3 + '/>');
  });

  A.addObject('d-cannon', function (o) {
    var confetti = o.fired ? '<rect x="40" y="20" width="10" height="16" fill="#e5243b" transform="rotate(20 45 28)"/><rect x="90" y="8" width="10" height="16" fill="#3e7bff"/><rect x="140" y="26" width="10" height="16" fill="#ffd23f" transform="rotate(-30 145 34)"/><rect x="70" y="40" width="8" height="12" fill="#2bc46f"/>' : '';
    return svg('0 0 200 160', confetti + '<path d="M40 120 L130 60 L156 98 L66 158Z" fill="#9b5de5" ' + SW + '/><ellipse cx="143" cy="79" rx="14" ry="24" transform="rotate(-34 143 79)" fill="#1c1640" ' + SW3 + '/>' +
      '<circle cx="52" cy="138" r="18" fill="#58607e" ' + SW + '/><path d="M80 116 L118 90" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>');
  });
})(typeof window !== 'undefined' ? window : globalThis);
