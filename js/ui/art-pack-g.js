/* OBEY? LOL. — art pack G: school (levels 153–172).
 * Original code-drawn SVG in the house style: chunky shapes, ink outlines, flat fills, one highlight. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY.art;
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function esc(s) { return OBEY.util.escape(String(s)); }
  function T(x, y, size, fill, s, extra) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" fill="' + fill + '"' + (extra || '') + '>' + esc(s) + '</text>';
  }
  var HI = 'fill="#fff" opacity=".5"';

  /* A pupil (a cheerful blob, like the hero). o.color, o.hair, o.hand ('up'), o.bib (number), o.sad, o.seated (no legs). */
  A.addObject('g-kid', function (o) {
    var c = o.color || '#ffd23f', hair = o.hair || '#4b4466';
    var arms = o.hand === 'up'
      ? '<path d="M24 104 L10 136" ' + SW + '/><path d="M96 98 L110 34" ' + SW + '/><circle cx="111" cy="26" r="10" fill="' + c + '" ' + SW3 + '/>'
      : '<path d="M24 104 L10 138 M96 104 L110 138" ' + SW + '/>';
    var bib = o.bib !== undefined
      ? '<rect x="32" y="108" width="56" height="38" rx="5" fill="#fffdf6" ' + SW3 + '/>' + T(60, 138, 30, INK, o.bib)
      : '';
    var mouth = o.sad ? '<path d="M48 104 Q60 96 72 104" fill="none" ' + SW3 + '/>' : '<path d="M48 98 Q60 108 72 98" fill="none" ' + SW3 + '/>';
    var legs = o.seated ? '' : '<path d="M44 150 L42 190 M76 150 L78 190" ' + SW + '/>' +
      '<ellipse cx="38" cy="192" rx="10" ry="5" fill="#2d2850" ' + SW3 + '/><ellipse cx="82" cy="192" rx="10" ry="5" fill="#2d2850" ' + SW3 + '/>';
    return svg('0 0 120 200', arms + legs +
      '<rect x="20" y="40" width="80" height="112" rx="36" fill="' + c + '" ' + SW + '/>' +
      '<path d="M40 46 Q46 18 60 38 Q70 14 82 46 Z" fill="' + hair + '" ' + SW3 + '/>' +
      '<ellipse cx="38" cy="64" rx="8" ry="5" ' + HI + '/>' +
      '<circle cx="47" cy="80" r="5" fill="' + INK + '"/><circle cx="73" cy="80" r="5" fill="' + INK + '"/>' + mouth + bib);
  });


  /* School desk (front view, with a modesty panel that hides a seated pupil's lap). */
  A.addObject('g-desk', function () {
    return svg('0 0 200 110',
      '<rect x="22" y="28" width="12" height="78" rx="4" fill="#8a86a8" ' + SW3 + '/><rect x="166" y="28" width="12" height="78" rx="4" fill="#8a86a8" ' + SW3 + '/>' +
      '<path d="M28 82 L172 82" ' + SW3 + '/>' +
      '<rect x="30" y="28" width="140" height="44" rx="4" fill="#b88d5f" ' + SW3 + '/>' +
      '<rect x="6" y="10" width="188" height="22" rx="6" fill="#c98b4a" ' + SW + '/>' +
      '<path d="M20 17 L120 17" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Rolling library ladder. o.locked shows red wheel locks. */
  A.addObject('g-ladder', function (o) {
    var rungs = '';
    for (var i = 0; i < 6; i++) { var y = 40 + i * 28, d = (y - 12) * 0.065; rungs += '<path d="M' + (32 - d).toFixed(1) + ' ' + y + ' L' + (88 + d).toFixed(1) + ' ' + y + '" ' + SW + '/>'; }
    return svg('0 0 120 224',
      '<path d="M34 12 L20 196 M86 12 L100 196" stroke="' + INK + '" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M34 12 L20 196 M86 12 L100 196" stroke="#b88d5f" stroke-width="7" stroke-linecap="round"/>' + rungs +
      '<path d="M34 12 Q60 -2 86 12" fill="none" ' + SW + '/>' +
      '<circle cx="20" cy="208" r="11" fill="#4b4466" ' + SW3 + '/><circle cx="100" cy="208" r="11" fill="#4b4466" ' + SW3 + '/>' +
      (o.locked ? '<path d="M4 214 L14 196 L26 196 L36 214 Z" fill="#e5243b" ' + SW3 + '/><path d="M84 214 L94 196 L106 196 L116 214 Z" fill="#e5243b" ' + SW3 + '/>' : ''));
  });

  /* Tall library bookcase; o.gap leaves the top-right slot empty. */
  A.addObject('g-bookcase', function (o) {
    var cols = ['#e5243b', '#3a86ff', '#ffd23f', '#2bc46f', '#9b5de5', '#ff77b4', '#3ec1ff'];
    var books = '';
    for (var r = 0; r < 4; r++) {
      for (var i = 0; i < 7; i++) {
        if (r === 0 && i >= 5 && o.gap) continue;
        var h = 40 + ((i * 7 + r * 3) % 3) * 4;
        books += '<rect x="' + (18 + i * 24) + '" y="' + (66 + r * 62 - h) + '" width="20" height="' + h + '" rx="2" fill="' + cols[(i + r * 3) % 7] + '" ' + SW3 + '/>';
      }
    }
    return svg('0 0 200 270',
      '<rect x="6" y="4" width="188" height="262" rx="6" fill="#9a6b3f" ' + SW + '/>' +
      '<rect x="14" y="12" width="172" height="244" rx="3" fill="#b88d5f" ' + SW3 + '/>' + books +
      '<path d="M14 68 L186 68 M14 130 L186 130 M14 192 L186 192" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>');
  });

  /* A big atlas with a globe on the cover. */
  A.addObject('g-atlas', function () {
    return svg('0 0 110 140',
      '<rect x="12" y="6" width="86" height="128" rx="6" fill="#2f6fe4" ' + SW + '/><rect x="12" y="6" width="16" height="128" rx="4" fill="#3a86ff" ' + SW3 + '/>' +
      '<circle cx="64" cy="66" r="24" fill="#7fb2ff" ' + SW3 + '/><path d="M50 56 Q60 50 66 58 Q72 66 64 74 M70 46 Q78 52 76 60" fill="none" stroke="#2bc46f" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M40 16 L40 120" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>');
  });

  /* A pile of three fat encyclopedias. */
  A.addObject('g-encyclopedias', function () {
    var b = function (y, x, w, c) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="32" rx="5" fill="' + c + '" ' + SW + '/><path d="M' + (x + w - 14) + ' ' + (y + 6) + ' L' + (x + w - 14) + ' ' + (y + 26) + '" ' + SW3 + '/><rect x="' + (x + w - 12) + '" y="' + (y + 4) + '" width="8" height="24" fill="#fffdf6"/>'; };
    return svg('0 0 200 110', b(74, 14, 172, '#9b5de5') + b(42, 26, 150, '#e5243b') + b(10, 20, 160, '#2fae84') +
      '<path d="M32 18 L120 18" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Paint pot: o.color fill, o.glyph ('tri' | 'circle' | 'square' | 'diamond') as a second channel. */
  A.addObject('g-pot', function (o) {
    var c = o.color || '#e5243b', g = '';
    if (o.glyph === 'tri') g = '<path d="M60 66 L78 98 L42 98 Z" fill="' + c + '" ' + SW3 + '/>';
    else if (o.glyph === 'circle') g = '<circle cx="60" cy="84" r="17" fill="' + c + '" ' + SW3 + '/>';
    else if (o.glyph === 'square') g = '<rect x="44" y="68" width="32" height="32" rx="3" fill="' + c + '" ' + SW3 + '/>';
    else g = '<path d="M60 64 L80 84 L60 104 L40 84 Z" fill="' + c + '" ' + SW3 + '/>';
    return svg('0 0 120 124',
      '<rect x="14" y="30" width="92" height="88" rx="14" fill="#fffdf6" ' + SW + '/>' +
      '<ellipse cx="60" cy="32" rx="46" ry="12" fill="' + c + '" ' + SW + '/>' +
      '<path d="M88 38 Q92 52 88 60" stroke="' + c + '" stroke-width="8" stroke-linecap="round" fill="none"/>' + g +
      '<path d="M26 46 L26 100" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Mixing palette. o.mix colour in the well (or empty), o.dots: colours already added. */
  A.addObject('g-palette', function (o) {
    var dots = '', d = o.dots || [];
    d.forEach(function (c, i) { dots += '<circle cx="' + (52 + i * 30) + '" cy="40" r="11" fill="' + c + '" ' + SW3 + '/>'; });
    return svg('0 0 200 140',
      '<path d="M20 74 Q14 24 82 16 Q170 8 186 60 Q196 104 150 124 Q118 136 108 116 Q100 98 78 110 Q30 132 20 74 Z" fill="#c98b4a" ' + SW + '/>' +
      '<ellipse cx="54" cy="86" rx="12" ry="9" fill="var(--stage)" ' + SW3 + '/>' +
      '<ellipse cx="124" cy="78" rx="34" ry="22" fill="' + (o.mix || '#fffdf6') + '" ' + SW3 + (o.mix ? '' : ' stroke-dasharray="6 6"') + '/>' + dots +
      '<path d="M40 50 Q50 30 72 26" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="6" stroke-linecap="round"/>');
  });

  /* Easel with a frog outline waiting to be painted; o.fill paints the frog. */
  A.addObject('g-easel', function (o) {
    var f = o.fill || '#fffdf6';
    return svg('0 0 160 220',
      '<path d="M44 120 L22 214 M116 120 L138 214 M80 120 L80 204" ' + SW + '/>' +
      '<rect x="14" y="10" width="132" height="118" rx="4" fill="#fffdf6" ' + SW + '/>' +
      '<rect x="8" y="124" width="144" height="12" rx="4" fill="#9a6b3f" ' + SW3 + '/>' +
      '<ellipse cx="80" cy="84" rx="44" ry="28" fill="' + f + '" ' + SW3 + (o.fill ? '' : ' stroke-dasharray="7 6"') + '/>' +
      '<circle cx="60" cy="54" r="13" fill="' + f + '" ' + SW3 + '/><circle cx="100" cy="54" r="13" fill="' + f + '" ' + SW3 + '/>' +
      '<circle cx="60" cy="54" r="5" fill="' + INK + '"/><circle cx="100" cy="54" r="5" fill="' + INK + '"/>' +
      '<path d="M66 90 Q80 100 94 90" fill="none" ' + SW3 + '/>');
  });

  /* Folded paper. The FOLD is the left edge (thick dashed). o.cut: 'whole' | 'fold' | 'open' template. */
  var HEART_R = 'M14 62 C14 38 46 30 60 48 C74 66 50 100 14 128';
  var HEART_L = 'M126 62 C126 38 94 30 80 48 C66 66 90 100 126 128';
  A.addObject('g-fold', function (o) {
    var t = '';
    if (o.cut === 'whole') t = '<path d="M70 64 C70 46 92 42 98 58 C104 42 126 46 120 70 C116 88 98 104 96 118 C92 104 74 90 70 64 Z" fill="none" stroke="#e5243b" stroke-width="5" stroke-dasharray="8 6" stroke-linejoin="round" transform="translate(-26 0)"/>';
    if (o.cut === 'fold') t = '<path d="' + HEART_R + '" fill="none" stroke="#e5243b" stroke-width="5" stroke-dasharray="8 6" stroke-linecap="round"/>';
    if (o.cut === 'open') t = '<path d="' + HEART_L + '" fill="none" stroke="#e5243b" stroke-width="5" stroke-dasharray="8 6" stroke-linecap="round"/>';
    return svg('0 0 140 160',
      '<rect x="14" y="10" width="112" height="140" rx="3" fill="#fffdf6" ' + SW + '/>' +
      '<path d="M14 10 L14 150" stroke="' + INK + '" stroke-width="9" stroke-dasharray="12 8"/>' +
      '<path d="M30 20 L110 20" stroke="#c3ccd8" stroke-width="4" stroke-linecap="round"/>' + t);
  });

  /* A worked example: half a diamond on the fold opens into one whole diamond. */
  A.addObject('g-sample', function () {
    return svg('0 0 240 110',
      '<rect x="10" y="10" width="64" height="90" rx="3" fill="#fffdf6" ' + SW + '/><path d="M10 10 L10 100" stroke="' + INK + '" stroke-width="8" stroke-dasharray="10 7"/>' +
      '<path d="M10 26 L50 55 L10 84" fill="none" stroke="#2f6fe4" stroke-width="5" stroke-dasharray="8 6" stroke-linecap="round"/>' +
      '<path d="M88 55 L130 55 M118 43 L132 55 L118 67" fill="none" ' + SW + '/>' +
      '<rect x="146" y="10" width="84" height="90" rx="3" fill="#fffdf6" ' + SW + '/><path d="M188 10 L188 100" stroke="#c3ccd8" stroke-width="3" stroke-dasharray="6 6"/>' +
      '<path d="M188 26 L218 55 L188 84 L158 55 Z" fill="#7fb2ff" ' + SW3 + '/>');
  });

  /* Ramp with a toy car. o.high, o.big (car), o.floor ('carpet' | 'wood'). */
  A.addObject('g-ramp', function (o) {
    var top = o.high ? 30 : 84;
    var ang = Math.atan2(120 - top, 130) * 180 / Math.PI;
    var cw = o.big ? 46 : 28, ch = o.big ? 22 : 14;
    var floor = o.floor === 'carpet'
      ? '<rect x="130" y="120" width="66" height="14" rx="3" fill="#ff77b4" ' + SW3 + '/><path d="M138 127 h4 M150 127 h4 M162 127 h4 M174 127 h4 M186 127 h4" ' + SW3 + '/>'
      : '<rect x="130" y="120" width="66" height="14" rx="3" fill="#c98b4a" ' + SW3 + '/><path d="M152 120 L152 134 M174 120 L174 134" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>';
    return svg('0 0 200 140',
      '<path d="M4 ' + top + ' L134 120 L4 120 Z" fill="#b88d5f" ' + SW + '/>' + floor +
      '<g transform="rotate(' + ang.toFixed(1) + ' 20 ' + top + ') translate(14 ' + (top - ch - 10) + ')">' +
      '<rect x="0" y="0" width="' + cw + '" height="' + ch + '" rx="6" fill="#e5243b" ' + SW3 + '/>' +
      '<circle cx="' + (cw * 0.25) + '" cy="' + (ch + 3) + '" r="' + (o.big ? 7 : 5) + '" fill="#2d2850" ' + SW3 + '/><circle cx="' + (cw * 0.75) + '" cy="' + (ch + 3) + '" r="' + (o.big ? 7 : 5) + '" fill="#2d2850" ' + SW3 + '/></g>');
  });

  /* Bean plant in a pot. o.lean: -2 … 2 (negative leans left). */
  A.addObject('g-bean', function (o) {
    var l = o.lean || 0, tx = 60 + l * 22, cx = 60 + l * 4;
    var leaf = function (x, y, s) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="13" ry="7" fill="#5fd98a" ' + SW3 + ' transform="rotate(' + s + ' ' + x + ' ' + y + ')"/>'; };
    var mx = (60 + cx + tx) / 3;
    return svg('0 0 120 200',
      '<path d="M60 150 Q' + cx + ' 90 ' + tx + ' 26" fill="none" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M60 150 Q' + cx + ' 90 ' + tx + ' 26" fill="none" stroke="#3fbf6f" stroke-width="6" stroke-linecap="round"/>' +
      leaf(mx - 12, 110, -30) + leaf(mx + 14, 86, 30) + leaf(tx - 8 + l * 2, 40, l * 20 - 20) +
      '<path d="M30 148 L90 148 L82 196 L38 196 Z" fill="#c98b4a" ' + SW + '/><rect x="26" y="140" width="68" height="14" rx="4" fill="#b88d5f" ' + SW3 + '/>' +
      '<path d="M44 162 L44 186" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Prize rosette. */
  A.addObject('g-rosette', function () {
    var petals = '';
    for (var i = 0; i < 10; i++) { var a = i * 36 * Math.PI / 180; petals += '<circle cx="' + (50 + Math.cos(a) * 26).toFixed(1) + '" cy="' + (46 + Math.sin(a) * 26).toFixed(1) + '" r="13" fill="#3a86ff" ' + SW3 + '/>'; }
    return svg('0 0 100 140',
      '<path d="M36 64 L24 132 L38 122 L46 134 L50 70 Z M64 64 L76 132 L62 122 L54 134 L50 70 Z" fill="#2f6fe4" ' + SW3 + '/>' + petals +
      '<circle cx="50" cy="46" r="22" fill="#ffd23f" ' + SW + '/><path d="M40 38 Q44 32 52 30" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Bottle of "plant food". */
  A.addObject('g-gro', function () {
    return svg('0 0 80 150',
      '<rect x="30" y="6" width="20" height="22" rx="4" fill="#e5243b" ' + SW3 + '/>' +
      '<path d="M26 28 L54 28 L66 52 L66 140 L14 140 L14 52 Z" fill="#9b5de5" ' + SW + '/>' +
      '<rect x="20" y="70" width="40" height="44" rx="5" fill="#fffdf6" ' + SW3 + '/>' +
      '<path d="M44 76 L34 94 L44 94 L36 110" fill="none" stroke="#f5b400" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="M22 58 L22 130" stroke="#fff" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Pedestal sink with a tap. o.running water, o.soapy bubbles. */
  A.addObject('g-sink', function (o) {
    return svg('0 0 200 200',
      '<rect x="84" y="140" width="32" height="56" rx="6" fill="#fffdf6" ' + SW + '/>' +
      (o.running ? '<rect x="124" y="58" width="10" height="56" rx="4" fill="#7fb2ff" ' + SW3 + '/>' : '') +
      '<path d="M18 96 L182 96 Q178 146 100 148 Q22 146 18 96 Z" fill="#fffdf6" ' + SW + '/>' +
      '<path d="M40 110 Q70 130 110 128" fill="none" stroke="#c3ccd8" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M100 96 L100 44 Q100 34 112 34 L128 34 Q136 34 136 44 L136 56" fill="none" stroke="' + INK + '" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M100 96 L100 44 Q100 34 112 34 L128 34 Q136 34 136 44 L136 56" fill="none" stroke="#c3ccd8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<rect x="88" y="62" width="24" height="10" rx="4" fill="#3a86ff" ' + SW3 + '/>' +
      (o.soapy ? '<circle cx="62" cy="88" r="12" fill="#fff" ' + SW3 + '/><circle cx="80" cy="80" r="8" fill="#fff" ' + SW3 + '/><circle cx="150" cy="86" r="10" fill="#fff" ' + SW3 + '/>' : ''));
  });

  /* Soap pump bottle. */
  A.addObject('g-soap', function () {
    return svg('0 0 90 150',
      '<path d="M40 30 L40 14 L70 14" fill="none" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M40 30 L40 14 L70 14" fill="none" stroke="#fffdf6" stroke-width="5" stroke-linecap="round"/>' +
      '<rect x="30" y="28" width="20" height="16" rx="3" fill="#c3ccd8" ' + SW3 + '/>' +
      '<rect x="14" y="42" width="52" height="102" rx="14" fill="#ff77b4" ' + SW + '/>' +
      '<rect x="22" y="72" width="36" height="34" rx="5" fill="#fffdf6" ' + SW3 + '/><circle cx="34" cy="86" r="5" fill="#7fb2ff"/><circle cx="46" cy="94" r="4" fill="#7fb2ff"/>' +
      '<path d="M24 54 L24 132" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Dinner till on its own little counter leg-less body. */
  A.addObject('g-till', function () {
    return svg('0 0 200 150',
      '<path d="M30 60 L170 60 L186 140 L14 140 Z" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="46" y="10" width="108" height="42" rx="6" fill="#1c1640" ' + SW + '/>' +
      '<rect x="88" y="52" width="24" height="10" fill="#8a86a8" ' + SW3 + '/>' +
      '<rect x="40" y="76" width="16" height="12" rx="3" fill="#fffdf6" ' + SW3 + '/><rect x="64" y="76" width="16" height="12" rx="3" fill="#fffdf6" ' + SW3 + '/><rect x="88" y="76" width="16" height="12" rx="3" fill="#fffdf6" ' + SW3 + '/>' +
      '<rect x="36" y="110" width="128" height="18" rx="4" fill="#8a86a8" ' + SW3 + '/>' +
      '<path d="M40 66 L160 66" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Payment dish; o.n coins in it. */
  A.addObject('g-dish', function (o) {
    var n = Math.min(o.n || 0, 7), coins = '';
    for (var i = 0; i < n; i++) coins += '<ellipse cx="' + (58 + (i % 4) * 28) + '" cy="' + (52 - Math.floor(i / 4) * 12) + '" rx="13" ry="6" fill="#f5b400" ' + SW3 + '/>';
    return svg('0 0 200 90',
      '<ellipse cx="100" cy="56" rx="90" ry="26" fill="#8a86a8" ' + SW + '/><ellipse cx="100" cy="52" rx="72" ry="16" fill="#c3ccd8" ' + SW3 + '/>' + coins);
  });


  A.addObject('g-apple', function () {
    return svg('0 0 100 100',
      '<path d="M50 30 C30 18 10 32 14 58 C18 84 38 96 50 88 C62 96 82 84 86 58 C90 32 70 18 50 30 Z" fill="#e5243b" ' + SW + '/>' +
      '<path d="M50 30 L54 10" ' + SW + '/><path d="M56 18 Q72 6 82 16 Q70 28 56 18 Z" fill="#3fbf6f" ' + SW3 + '/>' +
      '<ellipse cx="32" cy="46" rx="6" ry="10" ' + HI + '/>');
  });

  A.addObject('g-crisps', function () {
    return svg('0 0 100 110',
      '<path d="M18 12 L26 18 L34 12 L42 18 L50 12 L58 18 L66 12 L74 18 L82 12 L78 98 L70 92 L62 98 L54 92 L46 98 L38 92 L30 98 L22 92 Z" fill="#ffd23f" ' + SW + '/>' +
      '<ellipse cx="50" cy="56" rx="18" ry="14" fill="#f5b400" ' + SW3 + '/>' +
      '<path d="M30 28 L28 80" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });

  A.addObject('g-pudding', function () {
    return svg('0 0 100 100',
      '<path d="M14 54 L86 54 L76 92 L24 92 Z" fill="#fffdf6" ' + SW + '/>' +
      '<path d="M18 56 Q20 24 50 22 Q80 24 82 56 Z" fill="#9a6b3f" ' + SW + '/>' +
      '<circle cx="50" cy="16" r="9" fill="#e5243b" ' + SW3 + '/><path d="M50 8 Q54 2 60 2" fill="none" ' + SW3 + '/>' +
      '<path d="M30 42 Q34 32 44 30" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Bus window with the view outside. o.view: 'market' | 'park' | 'school' | 'depot'. */
  A.addObject('g-buswindow', function (o) {
    var v = o.view, scene = '';
    if (v === 'market') scene = '<rect x="30" y="56" width="60" height="50" fill="#fffdf6" ' + SW3 + '/><path d="M26 56 L94 56 L88 40 L32 40 Z" fill="#e5243b" ' + SW3 + '/><rect x="110" y="56" width="60" height="50" fill="#fffdf6" ' + SW3 + '/><path d="M106 56 L174 56 L168 40 L112 40 Z" fill="#3a86ff" ' + SW3 + '/>';
    else if (v === 'park') scene = '<circle cx="56" cy="56" r="24" fill="#3fbf6f" ' + SW3 + '/><rect x="52" y="78" width="8" height="28" fill="#9a6b3f" ' + SW3 + '/><circle cx="140" cy="62" r="20" fill="#5fd98a" ' + SW3 + '/><rect x="136" y="80" width="8" height="26" fill="#9a6b3f" ' + SW3 + '/>';
    else if (v === 'school') scene = '<rect x="40" y="50" width="120" height="56" fill="#ff6f91" ' + SW3 + '/><path d="M86 50 L86 30 L114 30 L114 50" fill="#ff6f91" ' + SW3 + '/><circle cx="100" cy="40" r="6" fill="#ffd23f" ' + SW3 + '/><rect x="88" y="78" width="24" height="28" fill="#4b4466" ' + SW3 + '/><rect x="52" y="64" width="22" height="16" fill="#7fb2ff" ' + SW3 + '/><rect x="126" y="64" width="22" height="16" fill="#7fb2ff" ' + SW3 + '/><path d="M114 30 L114 12 L132 18 L114 24" fill="#ffd23f" ' + SW3 + '/>';
    else scene = '<path d="M30 106 L30 56 L100 34 L170 56 L170 106 Z" fill="#8a86a8" ' + SW3 + '/><rect x="52" y="70" width="96" height="36" fill="#4b4466" ' + SW3 + '/>';
    return svg('0 0 200 130',
      '<rect x="6" y="6" width="188" height="118" rx="14" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="18" y="16" width="164" height="98" rx="8" fill="#7fb2ff" ' + SW3 + '/>' +
      '<rect x="18" y="104" width="164" height="10" fill="#5fd98a"/>' + scene +
      '<path d="M30 26 L60 26" stroke="#fff" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>');
  });

  /* Bus STOP button on a yellow pole. o.lit after pressing. */
  A.addObject('g-stoppole', function (o) {
    return svg('0 0 100 220',
      '<rect x="42" y="4" width="16" height="212" rx="6" fill="#ffd23f" ' + SW3 + '/>' +
      '<rect x="12" y="60" width="76" height="58" rx="10" fill="#e5243b" ' + SW + '/>' +
      '<circle cx="50" cy="89" r="20" fill="' + (o.lit ? '#ffe066' : '#fffdf6') + '" ' + SW3 + '/>' +
      (o.lit ? '<path d="M50 52 L50 44 M84 64 L92 58 M16 64 L8 58" ' + SW3 + '/>' : '') +
      '<path d="M22 70 L40 70" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Folding bus doors. o.open. */
  A.addObject('g-busdoor', function (o) {
    var panels = o.open
      ? '<rect x="10" y="10" width="22" height="196" rx="4" fill="#c3ccd8" ' + SW + '/><rect x="88" y="10" width="22" height="196" rx="4" fill="#c3ccd8" ' + SW + '/><rect x="34" y="10" width="52" height="196" fill="#2d2850" ' + SW3 + '/>'
      : '<rect x="10" y="10" width="50" height="196" rx="4" fill="#c3ccd8" ' + SW + '/><rect x="60" y="10" width="50" height="196" rx="4" fill="#c3ccd8" ' + SW + '/>' +
        '<rect x="20" y="24" width="30" height="80" rx="4" fill="#7fb2ff" ' + SW3 + '/><rect x="70" y="24" width="30" height="80" rx="4" fill="#7fb2ff" ' + SW3 + '/>' +
        '<path d="M26 34 L26 70" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>';
    return svg('0 0 120 216', '<rect x="4" y="4" width="112" height="208" rx="8" fill="#ffd23f" ' + SW + '/>' + panels);
  });

  /* Tally marks: o.n marks, grouped in fives unless o.loose. */
  A.addObject('g-tally', function (o) {
    var n = o.n || 0, out = '', x = 10;
    if (o.loose) {
      for (var i = 0; i < n; i++) { out += '<path d="M' + x + ' 10 L' + x + ' 50" ' + SW + '/>'; x += 14; }
    } else {
      var groups = Math.floor(n / 5), rest = n % 5;
      for (var g = 0; g < groups; g++) {
        for (var k = 0; k < 4; k++) out += '<path d="M' + (x + k * 12) + ' 10 L' + (x + k * 12) + ' 50" ' + SW + '/>';
        out += '<path d="M' + (x - 6) + ' 44 L' + (x + 42) + ' 16" ' + SW + '/>';
        x += 64;
      }
      for (var r = 0; r < rest; r++) { out += '<path d="M' + x + ' 10 L' + x + ' 50" ' + SW + '/>'; x += 12; }
    }
    return svg('0 0 200 60', out);
  });

  /* Gold star sticker. */
  A.addObject('g-star', function () {
    return svg('0 0 100 100',
      '<path d="M50 6 L62 36 L94 38 L69 58 L78 90 L50 72 L22 90 L31 58 L6 38 L38 36 Z" fill="#ffd23f" ' + SW + '/>' +
      '<path d="M38 44 L46 30" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>');
  });




  /* Four pencils; o.banded straps them to a ruler with a red band. */
  A.addObject('g-pencils', function (o) {
    var p = function (x, y, r) {
      return '<g transform="rotate(' + r + ' ' + x + ' ' + y + ')"><rect x="' + (x - 7) + '" y="' + y + '" width="14" height="78" rx="2" fill="#ffd23f" ' + SW3 + '/>' +
        '<path d="M' + (x - 7) + ' ' + (y + 78) + ' L' + x + ' ' + (y + 98) + ' L' + (x + 7) + ' ' + (y + 78) + ' Z" fill="#f3d998" ' + SW3 + '/>' +
        '<rect x="' + (x - 7) + '" y="' + (y - 10) + '" width="14" height="12" rx="3" fill="#ff77b4" ' + SW3 + '/></g>';
    };
    if (o.banded) {
      return svg('0 0 160 140',
        '<rect x="26" y="66" width="108" height="20" rx="3" fill="#fff8b8" ' + SW3 + '/>' +
        p(44, 40, 0) + p(68, 40, 0) + p(92, 40, 0) + p(116, 40, 0) +
        '<rect x="30" y="62" width="100" height="14" rx="5" fill="#e5243b" ' + SW3 + '/>');
    }
    return svg('0 0 160 140',
      '<rect x="12" y="118" width="136" height="18" rx="3" fill="#fff8b8" ' + SW3 + '/><path d="M30 118 L30 126 M50 118 L50 126 M70 118 L70 126 M90 118 L90 126 M110 118 L110 126 M130 118 L130 126" ' + SW3 + '/>' +
      p(34, 10, -8) + p(64, 14, 4) + p(96, 8, -4) + p(126, 14, 8));
  });

  /* A big rubber band. */
  A.addObject('g-band', function () {
    return svg('0 0 100 70',
      '<ellipse cx="50" cy="35" rx="40" ry="24" fill="none" stroke="' + INK + '" stroke-width="16"/>' +
      '<ellipse cx="50" cy="35" rx="40" ry="24" fill="none" stroke="#e5243b" stroke-width="8"/>');
  });

  /* Lined paper with o.n lines written on it (up to 20). */
  A.addObject('g-lines', function (o) {
    var n = Math.min(o.n || 0, 20), out = '';
    for (var i = 0; i < 20; i++) {
      var y = 22 + i * 8.6;
      out += '<path d="M24 ' + y.toFixed(1) + ' L136 ' + y.toFixed(1) + '" stroke="' + INK + '" stroke-opacity=".25" stroke-width="2"/>';
      if (i < n) out += '<path d="M40 ' + (y - 2).toFixed(1) + ' q6 -4 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#2f6fe4" stroke-width="3"/>';
    }
    return svg('0 0 160 200', '<rect x="14" y="8" width="132" height="186" rx="4" fill="#fffdf6" ' + SW + '/><path d="M36 8 L36 194" stroke="#ff6f91" stroke-width="2"/>' + out);
  });

  /* A music stave on the whiteboard. o.notes: list of line numbers (1 = bottom line … 5 = top). */
  A.addObject('g-stave', function (o) {
    var lines = '', notes = '';
    for (var i = 1; i <= 5; i++) { var y = 140 - i * 20; lines += '<path d="M40 ' + y + ' L380 ' + y + '" stroke="' + INK + '" stroke-width="3"/>'; }
    (o.notes || []).forEach(function (n, i) {
      var x = 150 + i * 80, y = 140 - n * 20;
      notes += '<ellipse cx="' + x + '" cy="' + y + '" rx="15" ry="10" fill="' + INK + '" transform="rotate(-20 ' + x + ' ' + y + ')"/>' +
        '<path d="M' + (x + 13) + ' ' + (y - 3) + ' L' + (x + 13) + ' ' + (y - 46) + '" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>';
    });
    return svg('0 0 420 160',
      '<rect x="6" y="6" width="408" height="148" rx="10" fill="#fffdf6" ' + SW + '/>' + lines +
      '<path d="M40 40 L40 120 M380 40 L380 120" stroke="' + INK + '" stroke-width="4"/>' +
      '<path d="M78 128 Q60 112 74 90 Q92 66 80 44 Q72 30 66 46 Q60 70 86 96 Q100 116 82 122 Q66 124 70 108" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>' + notes);
  });

  /* A snapped ruler (its first mark is 2) with a pencil lying from the 2 mark to the 9 mark. */
  A.addObject('g-measure', function () {
    var x = function (cm) { return 40 + (cm - 2) * 38; };
    var ticks = '';
    for (var cm = 2; cm <= 12; cm++) {
      ticks += '<path d="M' + x(cm) + ' 74 L' + x(cm) + ' 96" ' + SW3 + '/>' + T(x(cm), 124, 24, INK, cm);
      if (cm < 12) ticks += '<path d="M' + (x(cm) + 19) + ' 74 L' + (x(cm) + 19) + ' 86" stroke="' + INK + '" stroke-width="2"/>';
    }
    return svg('0 0 460 150',
      '<path d="M26 72 L440 72 L440 136 L26 136 L34 124 L22 112 L32 100 L20 88 L30 80 Z" fill="#fff8b8" ' + SW + '/>' + ticks +
      '<path d="M' + x(2) + ' 60 L' + x(2) + ' 72 M' + x(9) + ' 60 L' + x(9) + ' 72" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3" stroke-dasharray="4 4"/>' +
      '<rect x="' + x(2) + '" y="30" width="18" height="28" rx="4" fill="#ff77b4" ' + SW3 + '/>' +
      '<rect x="' + (x(2) + 18) + '" y="30" width="' + (x(9) - x(2) - 48) + '" height="28" fill="#ffd23f" ' + SW3 + '/>' +
      '<path d="M' + (x(9) - 30) + ' 30 L' + x(9) + ' 44 L' + (x(9) - 30) + ' 58 Z" fill="#f3d998" ' + SW3 + '/>' +
      '<path d="M' + (x(9) - 8) + ' 40 L' + x(9) + ' 44 L' + (x(9) - 8) + ' 48 Z" fill="' + INK + '"/>' +
      '<path d="M' + (x(2) + 30) + ' 38 L' + (x(9) - 50) + ' 38" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });



  /* Maths equaliser balance: beam with pegs 1–4 each side. o.broken (right peg number snapped off), o.tilt degrees. */
  A.addObject('g-equaliser', function (o) {
    var pegs = '';
    for (var d = 1; d <= 4; d++) {
      [-1, 1].forEach(function (side) {
        var px = 200 + side * d * 42;
        if (side === 1 && o.broken === d) pegs += '<path d="M' + (px - 6) + ' 84 L' + (px - 2) + ' 92 L' + (px + 2) + ' 86 L' + (px + 6) + ' 92" fill="none" ' + SW3 + '/>';
        else pegs += '<rect x="' + (px - 5) + '" y="80" width="10" height="14" rx="3" fill="#4b4466" ' + SW3 + '/>';
        pegs += T(px, 56, 26, INK, d);
      });
    }
    return svg('0 0 400 220',
      '<path d="M200 74 L150 214 L250 214 Z" fill="#8a86a8" ' + SW + '/>' +
      '<g transform="rotate(' + (o.tilt || 0) + ' 200 70)">' +
      '<rect x="14" y="62" width="372" height="20" rx="6" fill="#c98b4a" ' + SW + '/>' + pegs +
      '<path d="M30 68 L170 68" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/></g>' +
      '<circle cx="200" cy="72" r="10" fill="#ffd23f" ' + SW3 + '/>');
  });

  /* A hanging maths weight with a hook. */
  A.addObject('g-weight', function () {
    return svg('0 0 60 100',
      '<path d="M30 2 L30 26" ' + SW3 + '/><path d="M30 2 Q40 2 40 10" fill="none" ' + SW3 + '/>' +
      '<rect x="10" y="24" width="40" height="66" rx="8" fill="#8a86a8" ' + SW + '/>' +
      '<path d="M20 34 L20 76" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>');
  });

  /* Chalk tray for under a board card. */
  A.addObject('g-chalktray', function () {
    return svg('0 0 200 24',
      '<rect x="4" y="4" width="192" height="12" rx="4" fill="#a0784d" ' + SW3 + '/><rect x="30" y="0" width="22" height="7" rx="3" fill="#fffdf6" ' + SW3 + '/><rect x="140" y="0" width="16" height="7" rx="3" fill="#ffe066" ' + SW3 + '/>');
  });
})(typeof window !== 'undefined' ? window : globalThis);
