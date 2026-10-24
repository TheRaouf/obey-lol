/* OBEY? LOL. — art pack E: show business, games and the game itself.
 * Original code-drawn SVG in the house style (chunky outlines, flat fills, one highlight). */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY && OBEY.art;
  if (!A) return; // loaded before art.js (level lab preview): the later load registers the art
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;

  /* ------------------------------------------------------------- magic */
  A.addObject('e-tophat', function (o) {
    var peek = '';
    switch (o.peek) {
      case 'hanky': peek = '<path d="M86 78 Q100 30 116 78 Z" fill="#ff6f91" ' + SW3 + '/><path d="M96 70 Q100 50 106 70" fill="none" stroke="#fff" stroke-width="4"/>'; break;
      case 'dove': peek = '<path d="M74 80 Q78 44 104 46 Q122 30 140 44 Q124 50 126 80 Z" fill="#fff" ' + SW3 + '/><circle cx="112" cy="54" r="3" fill="' + INK + '"/>'; break;
      case 'rabbit': peek = '<path d="M84 80 Q72 18 90 16 Q102 20 98 80 Z" fill="#fff" ' + SW3 + '/><path d="M104 80 Q104 14 120 16 Q134 24 116 80 Z" fill="#fff" ' + SW3 + '/><path d="M88 70 Q86 36 91 28" fill="none" stroke="#ff9fb8" stroke-width="5"/><path d="M110 70 Q112 36 119 28" fill="none" stroke="#ff9fb8" stroke-width="5"/>'; break;
      case 'badger': peek = '<path d="M66 80 Q70 34 100 34 Q130 34 134 80 Z" fill="#2d2850" ' + SW3 + '/><path d="M92 36 L96 80 L104 80 L108 36 Z" fill="#fff"/><circle cx="84" cy="60" r="5" fill="#e5243b"/><circle cx="116" cy="60" r="5" fill="#e5243b"/><path d="M78 46 L92 52 M122 46 L108 52" ' + SW3 + '/>'; break;
    }
    return svg('0 0 200 200', peek +
      '<rect x="56" y="78" width="88" height="96" rx="6" fill="#2d2850" ' + SW + '/>' +
      '<rect x="56" y="140" width="88" height="16" fill="#e5243b" ' + SW3 + '/>' +
      '<ellipse cx="100" cy="176" rx="72" ry="14" fill="#2d2850" ' + SW + '/>' +
      '<ellipse cx="100" cy="80" rx="44" ry="10" fill="#1c1640" ' + SW3 + '/>' +
      '<path d="M66 96 L66 130" stroke="#6c63a8" stroke-width="6" stroke-linecap="round"/>');
  });

  A.addObject('e-wand', function () {
    return svg('0 0 200 200',
      '<g transform="rotate(-35 100 100)"><rect x="92" y="20" width="16" height="160" rx="6" fill="#1c1640" ' + SW + '/>' +
      '<rect x="92" y="20" width="16" height="30" rx="6" fill="#fff" ' + SW3 + '/><rect x="92" y="150" width="16" height="30" rx="6" fill="#fff" ' + SW3 + '/></g>' +
      '<path d="M40 30 l6 12 13 2 -10 9 3 13 -12 -7 -12 7 3 -13 -10 -9 13 -2z" fill="#ffd23f" ' + SW3 + '/>');
  });

  A.addObject('e-magicbox', function (o) {
    var col = o.color || '#9b5de5';
    return svg('0 0 200 200',
      '<rect x="24" y="44" width="152" height="136" rx="8" fill="' + col + '" ' + SW + '/>' +
      '<rect x="16" y="30" width="168" height="26" rx="6" fill="#2d2850" ' + SW + '/>' +
      '<path d="M60 92 l6 12 13 2 -10 9 3 13 -12 -7 -12 7 3 -13 -10 -9 13 -2z" fill="#ffd23f" ' + SW3 + '/>' +
      '<path d="M140 120 l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z" fill="#fff" ' + SW3 + '/>' +
      (o.peephole ? '<circle cx="100" cy="150" r="13" fill="#1c1640" ' + SW3 + '/>' : '') +
      '<path d="M36 64 L36 168" stroke="#fff" stroke-width="5" opacity=".4" stroke-linecap="round"/>');
  });

  A.addObject('e-padlock', function () {
    return svg('0 0 200 200', '<path d="M60 96 L60 64 Q60 24 100 24 Q140 24 140 64 L140 96" fill="none" stroke="' + INK + '" stroke-width="22"/>' +
      '<path d="M60 96 L60 64 Q60 24 100 24 Q140 24 140 64 L140 96" fill="none" stroke="#c3ccd8" stroke-width="12"/>' +
      '<rect x="36" y="90" width="128" height="96" rx="14" fill="#ffd23f" ' + SW + '/><circle cx="100" cy="130" r="12" fill="' + INK + '"/><path d="M100 136 L100 162" stroke="' + INK + '" stroke-width="10" stroke-linecap="round"/>');
  });

  A.addObject('e-watch', function (o) {
    var tilt = o.tilt || 0;
    return svg('0 0 200 200', '<g transform="rotate(' + tilt + ' 100 6)">' +
      '<path d="M100 6 L100 104" stroke="#f5b400" stroke-width="5" stroke-dasharray="8 5"/>' +
      '<circle cx="100" cy="140" r="46" fill="#ffd23f" ' + SW + '/><circle cx="100" cy="140" r="34" fill="#fffbe6" ' + SW3 + '/>' +
      '<path d="M100 140 L100 116 M100 140 L118 148" ' + SW + '/>' +
      '<path d="M76 118 Q86 108 98 108" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M86 162 Q100 172 114 162" fill="none" stroke="#f5b400" stroke-width="4" opacity=".6"/></g>');
  });

  A.addObject('e-tray', function (o) {
    var up = !!o.raised;
    return svg('0 0 200 200', up
      ? '<ellipse cx="100" cy="100" rx="58" ry="84" fill="#dfe6ee" ' + SW + '/><ellipse cx="100" cy="100" rx="44" ry="68" fill="#f5f9ff" ' + SW3 + '/>' +
        '<path d="M80 50 Q76 80 80 110" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>' +
        '<circle cx="104" cy="112" r="16" fill="#ffd23f" ' + SW3 + '/>'
      : '<ellipse cx="100" cy="150" rx="88" ry="26" fill="#dfe6ee" ' + SW + '/><ellipse cx="100" cy="146" rx="70" ry="16" fill="#f5f9ff" ' + SW3 + '/>' +
        '<path d="M50 140 Q70 134 96 134" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>');
  });

  /* ---------------------------------------------------------- film set */
  /* Bowler and chair are drawn small on stage (about 90 px), so they use an 8-unit outline (3.6 px rendered). */
  var SWB = 'stroke="' + INK + '" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"';

  A.addObject('e-coatrack', function () {
    return svg('50 16 100 182',
      '<rect x="94" y="30" width="12" height="150" rx="5" fill="#9a6b3f" ' + SW3 + '/>' +
      '<path d="M100 44 L66 30 M100 44 L134 30 M100 64 L70 56 M100 64 L130 56" ' + SW + '/>' +
      '<path d="M60 194 L100 172 L140 194" fill="none" ' + SW + '/><circle cx="100" cy="26" r="9" fill="#9a6b3f" ' + SW3 + '/>');
  });

  A.addObject('e-bowler', function () {
    return svg('0 0 200 200',
      '<path d="M50 130 Q50 54 100 54 Q150 54 150 130 Z" fill="#2d2850" ' + SWB + '/>' +
      '<path d="M54 116 L146 116" stroke="#e5243b" stroke-width="12"/>' +
      '<ellipse cx="100" cy="134" rx="78" ry="16" fill="#2d2850" ' + SWB + '/>' +
      '<path d="M74 80 Q80 68 94 64" fill="none" stroke="#6c6c80" stroke-width="7" stroke-linecap="round"/>');
  });

  A.addObject('e-chair', function (o) {
    if (A.hasObject('a-chair')) return A.object('a-chair', o);
    return svg('0 0 200 200',
      '<rect x="56" y="26" width="88" height="70" rx="6" fill="#c9a86a" ' + SWB + '/>' +
      '<rect x="44" y="98" width="112" height="22" rx="5" fill="#9a6b3f" ' + SWB + '/>' +
      '<path d="M54 120 L48 192 M146 120 L152 192 M66 26 L66 98 M134 26 L134 98" ' + SWB + '/>');
  });

  A.addObject('e-clapper', function (o) {
    var open = !!o.open;
    return svg('0 0 200 200',
      '<g transform="rotate(' + (open ? -24 : 0) + ' 20 70)"><rect x="20" y="46" width="164" height="26" fill="#fff" ' + SW + '/>' +
      '<path d="M44 46 L28 72 M80 46 L64 72 M116 46 L100 72 M152 46 L136 72" stroke="' + INK + '" stroke-width="12"/></g>' +
      '<rect x="20" y="72" width="164" height="100" rx="4" fill="#2d2850" ' + SW + '/>' +
      '<path d="M20 106 L184 106 M20 140 L184 140 M102 106 L102 172" stroke="#fff" stroke-width="3"/>');
  });

  A.addObject('e-camera', function () {
    return svg('0 0 200 200',
      '<circle cx="70" cy="44" r="26" fill="#2d2850" ' + SW + '/><circle cx="126" cy="44" r="26" fill="#2d2850" ' + SW + '/>' +
      '<rect x="40" y="70" width="110" height="64" rx="8" fill="#58607e" ' + SW + '/>' +
      '<path d="M150 88 L184 72 L184 132 L150 116 Z" fill="#2d2850" ' + SW + '/>' +
      '<circle cx="64" cy="102" r="7" fill="#e5243b"/><path d="M96 134 L76 194 M96 134 L116 194 M96 134 L96 194" ' + SW + '/>');
  });

  A.addObject('e-ghost', function () {
    return svg('0 0 200 200',
      '<path d="M40 190 L40 90 Q40 20 100 20 Q160 20 160 90 L160 190 L140 172 L120 190 L100 172 L80 190 L60 172 Z" fill="#fff" ' + SW + '/>' +
      '<ellipse cx="80" cy="86" rx="10" ry="14" fill="' + INK + '"/><ellipse cx="120" cy="86" rx="10" ry="14" fill="' + INK + '"/>' +
      '<ellipse cx="100" cy="124" rx="12" ry="9" fill="' + INK + '"/><path d="M56 70 Q60 46 80 38" fill="none" stroke="#dfe6ee" stroke-width="7" stroke-linecap="round"/>');
  });

  /* -------------------------------------------------------------- band */
  A.addObject('e-keys', function () {
    var keys = '';
    for (var i = 0; i < 7; i++) keys += '<rect x="' + (30 + i * 20) + '" y="70" width="20" height="58" fill="#fff" ' + SW3 + '/>';
    [0, 1, 3, 4, 5].forEach(function (i) { keys += '<rect x="' + (44 + i * 20) + '" y="70" width="12" height="34" fill="' + INK + '"/>'; });
    return svg('0 0 200 200', '<rect x="20" y="56" width="160" height="82" rx="8" fill="#e5243b" ' + SW + '/>' + keys +
      '<path d="M50 138 L40 192 M150 138 L160 192 M44 170 L156 170" ' + SW + '/>');
  });

  A.addObject('e-guitar', function () {
    return svg('0 0 200 200', '<g transform="rotate(30 100 100)">' +
      '<rect x="92" y="6" width="16" height="96" rx="4" fill="#9a6b3f" ' + SW3 + '/><rect x="86" y="0" width="28" height="18" rx="5" fill="#2d2850" ' + SW3 + '/>' +
      '<path d="M100 92 C60 92 56 128 72 140 C52 156 58 196 100 196 C142 196 148 156 128 140 C144 128 140 92 100 92 Z" fill="#ff8c1a" ' + SW + '/>' +
      '<circle cx="100" cy="150" r="12" fill="#2d2850"/><path d="M96 20 L96 180 M104 20 L104 180" stroke="#fff" stroke-width="2"/></g>');
  });

  A.addObject('e-buzzer', function (o) {
    var col = o.color || '#e5243b';
    return svg('0 0 200 200',
      '<rect x="30" y="120" width="140" height="56" rx="10" fill="#58607e" ' + SW + '/>' +
      '<path d="M44 124 Q44 54 100 54 Q156 54 156 124 Z" fill="' + col + '" ' + SW + '/>' +
      (o.lit ? '<path d="M100 10 L100 34 M40 30 L54 48 M160 30 L146 48" stroke="#ffd23f" stroke-width="8" stroke-linecap="round"/>' : '') +
      '<path d="M70 84 Q80 70 96 68" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>');
  });

  A.addObject('e-podium', function (o) {
    return svg('0 0 200 200',
      '<path d="M40 40 L160 40 L148 196 L52 196 Z" fill="' + (o.color || '#3ec1ff') + '" ' + SW + '/>' +
      '<rect x="30" y="26" width="140" height="24" rx="6" fill="#2d2850" ' + SW + '/>' +
      '<path d="M64 80 L136 80 M70 110 L130 110" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".6"/>');
  });

  A.addObject('e-jar', function () {
    var beans = [[66, 150, '#e5243b', -20], [96, 156, '#ffd23f', 15], [128, 150, '#2bc46f', -35], [78, 124, '#ff8c1a', 30],
      [110, 126, '#9b5de5', -10], [140, 120, '#ff6f91', 25], [70, 96, '#3ec1ff', -25], [136, 94, '#e5243b', 10], [96, 70, '#ffd23f', -40]];
    var b = beans.map(function (p) { return '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="13" ry="8" transform="rotate(' + p[3] + ' ' + p[0] + ' ' + p[1] + ')" fill="' + p[2] + '" ' + SW3 + '/>'; }).join('');
    var frog = '<ellipse cx="102" cy="100" rx="13" ry="9" fill="#7be37b" ' + SW3 + '/><circle cx="98" cy="91" r="4" fill="#fff" ' + SW3 + '/><circle cx="110" cy="91" r="4" fill="#fff" ' + SW3 + '/>' +
      '<circle cx="98" cy="91" r="1.5" fill="' + INK + '"/><circle cx="110" cy="91" r="1.5" fill="' + INK + '"/><path d="M98 103 Q104 107 110 103" fill="none" stroke="' + INK + '" stroke-width="2"/>';
    return svg('0 0 200 200',
      '<path d="M48 40 L152 40 L152 52 Q170 60 170 90 L170 168 Q170 190 148 190 L52 190 Q30 190 30 168 L30 90 Q30 60 48 52 Z" fill="#e6f7ff" ' + SW + '/>' +
      b + frog +
      '<rect x="44" y="22" width="112" height="22" rx="6" fill="#e5243b" ' + SW + '/>' +
      '<path d="M44 76 L44 160" stroke="#fff" stroke-width="8" stroke-linecap="round"/>');
  });

  /* ------------------------------------------------------- sports day */
  A.addObject('e-strongman', function (o) {
    var lean = o.fallen ? 'rotate(-70 100 196)' : 'rotate(-10 100 196)';
    return svg('0 0 200 200', '<g transform="' + lean + '">' +
      '<path d="M70 196 L76 160 M130 196 L124 160" ' + SW + '/>' +
      '<ellipse cx="100" cy="112" rx="62" ry="58" fill="' + (o.color || '#ffb347') + '" ' + SW + '/>' +
      '<rect x="46" y="64" width="108" height="16" rx="6" fill="#e5243b" ' + SW3 + '/>' +
      '<circle cx="80" cy="100" r="7" fill="' + INK + '"/><circle cx="120" cy="100" r="7" fill="' + INK + '"/>' +
      '<path d="M66 88 L92 94 M134 88 L108 94" ' + SW3 + '/>' +
      '<path d="M80 138 Q100 128 120 138" fill="none" ' + SW + '/>' +
      '<path d="M44 126 Q20 130 14 116" fill="none" ' + SW + '/><circle cx="14" cy="114" r="10" fill="' + (o.color || '#ffb347') + '" ' + SW3 + '/></g>');
  });

  A.addObject('e-rope', function () {
    return svg('0 0 400 40', '<path d="M0 20 L400 20" stroke="#c9a86a" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M0 20 L400 20" stroke="' + INK + '" stroke-width="3" stroke-dasharray="10 8"/>' +
      '<rect x="190" y="4" width="20" height="32" rx="3" fill="#e5243b" ' + SW3 + '/>', 'art fill-art');
  });

  A.addObject('e-mud', function () {
    return svg('0 0 200 100',
      '<path d="M10 60 Q20 24 70 28 Q110 6 150 26 Q196 30 190 64 Q186 94 120 90 Q70 98 30 88 Q4 80 10 60 Z" fill="#8a5a33" ' + SW + '/>' +
      '<ellipse cx="70" cy="56" rx="16" ry="6" fill="#a8744a"/><circle cx="130" cy="50" r="6" fill="#a8744a"/>');
  });

  A.addObject('e-runner', function (o) {
    var col = o.color || '#3ec1ff';
    return svg('0 0 200 200',
      '<circle cx="100" cy="40" r="26" fill="' + (o.skin || '#ffcf9e') + '" ' + SW + '/>' +
      (o.cape ? '<path d="M78 70 L40 180 L100 160 Z" fill="#e5243b" ' + SW3 + '/>' : '') +
      '<rect x="66" y="66" width="68" height="74" rx="14" fill="' + col + '" ' + SW + '/>' +
      '<rect x="78" y="80" width="44" height="34" rx="4" fill="#fff" ' + SW3 + '/>' +
      '<text x="100" y="106" text-anchor="middle" font-size="24" fill="' + INK + '">' + OBEY.util.escape(o.bib || '') + '</text>' +
      '<path d="M84 140 L70 194 M116 140 L134 194 M66 80 L40 120 M134 80 L160 120" ' + SW + '/>' +
      '<circle cx="92" cy="36" r="4" fill="' + INK + '"/><circle cx="110" cy="36" r="4" fill="' + INK + '"/>');
  });

  A.addObject('e-photo', function () {
    // Photo-finish strip: the finish line and three runners at different distances past it.
    function fig(x, y, bib, col) {
      return '<circle cx="' + x + '" cy="' + (y - 34) + '" r="12" fill="#ffcf9e" ' + SW3 + '/>' +
        '<rect x="' + (x - 16) + '" y="' + (y - 22) + '" width="32" height="34" rx="6" fill="' + col + '" ' + SW3 + '/>' +
        '<text x="' + x + '" y="' + (y + 2) + '" text-anchor="middle" font-size="16" fill="#fff" stroke="' + INK + '" stroke-width="1">' + bib + '</text>';
    }
    return svg('0 0 300 200',
      '<rect x="6" y="6" width="288" height="188" rx="8" fill="#f2efe6" ' + SW + '/>' +
      '<path d="M200 10 L200 190" stroke="#e5243b" stroke-width="6" stroke-dasharray="10 6"/>' +
      fig(222, 60, '12', '#2bc46f') + fig(170, 110, '7', '#3ec1ff') + fig(110, 160, '1', '#ff8c1a') +
      '<path d="M220 18 L270 18" stroke="' + INK + '" stroke-width="3"/><path d="M262 12 L270 18 L262 24" fill="none" stroke="' + INK + '" stroke-width="3"/>');
  });

  /* ------------------------------------------------------------- museum */
  A.addObject('e-vase', function (o) {
    return svg('0 0 200 200',
      '<path d="M76 20 L124 20 L118 44 Q168 80 150 140 Q140 184 100 186 Q60 184 50 140 Q32 80 82 44 Z" fill="' + (o.color || '#3ec1ff') + '" ' + SW + '/>' +
      '<path d="M58 110 Q100 130 142 110" fill="none" stroke="#fff" stroke-width="6"/><path d="M62 130 Q100 150 138 130" fill="none" stroke="#fff" stroke-width="4"/>' +
      '<path d="M70 70 Q66 90 70 104" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".6"/>');
  });

  A.addObject('e-egg', function () {
    return svg('0 0 200 200',
      '<path d="M100 18 C150 18 170 110 162 140 C154 176 130 188 100 188 C70 188 46 176 38 140 C30 110 50 18 100 18 Z" fill="#cfe8b0" ' + SW + '/>' +
      '<circle cx="80" cy="80" r="9" fill="#8fb36a"/><circle cx="124" cy="120" r="12" fill="#8fb36a"/><circle cx="90" cy="150" r="7" fill="#8fb36a"/>' +
      '<path d="M70 50 Q64 64 66 80" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>');
  });

  A.addObject('e-statue', function (o) {
    var arm = o.nodding ? '<path d="M128 96 L178 70" ' + SW + '/><circle cx="182" cy="68" r="10" fill="#fff8dd" ' + SW3 + '/>'
      : '<path d="M128 96 L176 112" ' + SW + '/><circle cx="182" cy="114" r="10" fill="#fff8dd" ' + SW3 + '/>';
    return svg('0 0 200 200',
      '<rect x="40" y="160" width="120" height="34" rx="4" fill="#c3ccd8" ' + SW + '/>' +
      '<path d="M70 160 L74 90 Q100 76 126 90 L130 160 Z" fill="#fff8dd" ' + SW + '/>' + arm +
      '<path d="M128 96 L176 112" stroke="#fff8dd" stroke-width="10" stroke-linecap="round" opacity="0"/>' +
      '<circle cx="100" cy="56" r="26" fill="#fff8dd" ' + SW + '/>' +
      (o.nodding ? '<path d="M88 52 Q92 46 96 52 M104 52 Q108 46 112 52" fill="none" ' + SW3 + '/><path d="M90 66 Q100 74 110 66" fill="none" ' + SW3 + '/>'
        : '<path d="M88 54 L96 54 M104 54 L112 54" ' + SW3 + '/><path d="M92 68 L108 68" ' + SW3 + '/>'));
  });

  var LOOK = { left: [-9, 2], right: [9, 2], up: [0, -8], down: [0, 9], 'down-left': [-8, 7], 'down-right': [8, 7], 'up-right': [8, -6], 'up-left': [-8, -6] };
  A.addObject('e-portrait', function (o) {
    var d = LOOK[o.look] || [0, 0];
    return svg('0 0 200 240',
      '<rect x="8" y="8" width="184" height="224" rx="6" fill="#f5b400" ' + SW + '/>' +
      '<rect x="28" y="28" width="144" height="184" fill="#7a5c99" ' + SW3 + '/>' +
      '<path d="M40 212 Q40 150 100 150 Q160 150 160 212 Z" fill="#2d2850" ' + SW3 + '/>' +
      '<ellipse cx="100" cy="104" rx="44" ry="52" fill="#ffcf9e" ' + SW + '/>' +
      '<path d="M58 74 Q100 30 142 74 Q120 60 100 64 Q80 60 58 74 Z" fill="#3a2a1a" ' + SW3 + '/>' +
      '<ellipse cx="80" cy="100" rx="17" ry="14" fill="#fff" ' + SW3 + '/><ellipse cx="120" cy="100" rx="17" ry="14" fill="#fff" ' + SW3 + '/>' +
      '<circle cx="' + (80 + d[0]) + '" cy="' + (100 + d[1] * 0.7) + '" r="6.5" fill="' + INK + '"/><circle cx="' + (120 + d[0]) + '" cy="' + (100 + d[1] * 0.7) + '" r="6.5" fill="' + INK + '"/>' +
      '<path d="M84 132 Q100 128 116 132" fill="none" ' + SW3 + '/><path d="M66 82 L94 86 M106 86 L134 82" ' + SW3 + '/>');
  });

  A.addObject('e-bookshelf', function (o) {
    var books = '', cols = ['#e5243b', '#3ec1ff', '#ffd23f', '#2bc46f', '#9b5de5', '#ff8c1a'];
    for (var r = 0; r < 2; r++) for (var i = 0; i < 6; i++) {
      var tilt = o.pulled && r === 0 && i === 2;
      books += '<rect x="' + (36 + i * 22) + '" y="' + (40 + r * 70) + '" width="18" height="56" fill="' + cols[(i + r * 2) % 6] + '" ' + SW3 + (tilt ? ' transform="rotate(-20 ' + (45 + i * 22) + ' ' + (96 + r * 70) + ')"' : '') + '/>';
    }
    return svg('0 0 200 200', '<rect x="24" y="24" width="152" height="164" rx="4" fill="#9a6b3f" ' + SW + '/>' +
      '<path d="M24 98 L176 98 M24 168 L176 168" ' + SW + '/>' + books);
  });

  A.addObject('e-velvet', function () {
    return svg('0 0 400 100',
      '<rect x="10" y="20" width="16" height="76" rx="5" fill="#f5b400" ' + SW3 + '/><rect x="374" y="20" width="16" height="76" rx="5" fill="#f5b400" ' + SW3 + '/>' +
      '<path d="M18 30 Q200 90 382 30" fill="none" stroke="#b3123a" stroke-width="12" stroke-linecap="round"/>', 'art fill-art');
  });

  /* -------------------------------------------------------- theme park */
  A.addObject('e-heightsign', function () {
    return svg('0 0 120 400',
      '<rect x="50" y="20" width="20" height="376" fill="#9a6b3f" ' + SW + '/>' +
      '<path d="M60 120 L118 120" stroke="#e5243b" stroke-width="8"/>' +
      '<rect x="4" y="12" width="112" height="70" rx="10" fill="#ffd23f" ' + SW + '/>' +
      '<path d="M30 36 L90 36 M30 58 L76 58" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>', 'art fill-art');
  });

  A.addObject('e-tallhat', function () {
    return svg('0 0 100 240',
      '<rect x="22" y="10" width="56" height="212" rx="6" fill="#2d2850" ' + SW + '/>' +
      '<rect x="22" y="180" width="56" height="18" fill="#9b5de5" ' + SW3 + '/>' +
      '<rect x="4" y="218" width="92" height="16" rx="8" fill="#2d2850" ' + SW + '/>' +
      '<path d="M34 24 L34 160" stroke="#6c63a8" stroke-width="6" stroke-linecap="round"/>');
  });

  A.addObject('e-stilts', function () {
    return svg('0 0 200 200',
      '<rect x="62" y="14" width="14" height="180" rx="5" fill="#ff8c1a" ' + SW3 + '/><rect x="124" y="14" width="14" height="180" rx="5" fill="#ff8c1a" ' + SW3 + '/>' +
      '<rect x="48" y="110" width="30" height="12" rx="3" fill="#58607e" ' + SW3 + '/><rect x="122" y="110" width="30" height="12" rx="3" fill="#58607e" ' + SW3 + '/>');
  });

  A.addObject('e-wheel', function () {
    var spokes = '';
    for (var i = 0; i < 6; i++) {
      var a = (i * 60 - 90) * Math.PI / 180;
      spokes += '<path d="M100 100 L' + (100 + 80 * Math.cos(a)).toFixed(1) + ' ' + (100 + 80 * Math.sin(a)).toFixed(1) + '" stroke="' + INK + '" stroke-width="4"/>';
    }
    return svg('0 0 200 200',
      '<path d="M100 100 L52 196 M100 100 L148 196" stroke="#58607e" stroke-width="10" stroke-linecap="round"/>' +
      '<circle cx="100" cy="100" r="80" fill="none" stroke="#e5243b" stroke-width="8"/>' +
      '<circle cx="100" cy="100" r="80" fill="none" stroke="' + INK + '" stroke-width="2"/>' + spokes +
      '<circle cx="100" cy="100" r="12" fill="#ffd23f" ' + SW3 + '/>');
  });

  A.addObject('e-gondola', function (o) {
    // Drawn at ~77 px, so outlines are 8 units (3 px rendered). Who rides is written in the window,
    // so "your car" never depends on telling yellow from orange.
    var col = o.mine ? '#ffd23f' : (o.boss ? '#ffb347' : '#3ec1ff');
    var W8 = 'stroke="' + INK + '" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"';
    var who = o.mine ? 'YOU' : (o.boss ? 'BOSS' : '');
    return svg('0 0 200 200',
      '<path d="M100 10 L100 48" ' + W8 + '/>' +
      '<path d="M30 60 Q100 40 170 60 L160 170 Q100 190 40 170 Z" fill="' + col + '" ' + W8 + '/>' +
      '<rect x="50" y="72" width="100" height="56" rx="8" fill="#e6f7ff" ' + W8 + '/>' +
      (who ? '<text x="100" y="114" text-anchor="middle" font-size="' + (o.mine ? 36 : 30) + '" font-weight="700" fill="' + INK + '">' + who + '</text>' : '') +
      (o.boss ? '<path d="M92 136 L108 136 L104 144 L110 162 L100 172 L90 162 L96 144Z" fill="#e5243b" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' : '') +
      (o.open ? '<path d="M44 130 L156 130" stroke="#2bc46f" stroke-width="8"/>' : ''));
  });

  /* ----------------------------------------------------------- meta */
  A.addObject('e-hamster', function (o) {
    var run = !!o.running;
    return svg('0 0 200 200',
      '<circle cx="100" cy="100" r="86" fill="#e6f7ff" ' + SW + '/><circle cx="100" cy="100" r="70" fill="none" stroke="#b5c4d8" stroke-width="6" stroke-dasharray="6 10"/>' +
      '<path d="M100 186 L80 198 M100 186 L120 198" ' + SW + '/>' +
      '<ellipse cx="100" cy="146" rx="38" ry="26" fill="#e0a96d" ' + SW + '/>' +
      '<circle cx="76" cy="124" r="10" fill="#e0a96d" ' + SW3 + '/><circle cx="124" cy="124" r="10" fill="#e0a96d" ' + SW3 + '/>' +
      (run ? '<circle cx="88" cy="142" r="5" fill="' + INK + '"/><circle cx="112" cy="142" r="5" fill="' + INK + '"/><path d="M40 120 L20 120 M44 140 L16 140" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>'
        : '<path d="M82 142 L94 142 M106 142 L118 142" ' + SW3 + '/>' + A.sleepZ([[138, 78, 16, A.SW], [158, 56, 12, A.SW3]])) +
      '<ellipse cx="100" cy="154" rx="6" ry="4" fill="#ff9fb8"/>');
  });

  A.addObject('e-seeds', function () {
    return svg('0 0 200 200',
      '<path d="M50 30 L150 30 L160 180 L40 180 Z" fill="#ffd23f" ' + SW + '/>' +
      '<circle cx="100" cy="100" r="34" fill="#ff8c1a" ' + SW3 + '/><circle cx="100" cy="100" r="16" fill="#9a6b3f" ' + SW3 + '/>' +
      '<path d="M50 30 Q100 50 150 30" fill="none" ' + SW3 + '/>');
  });

  A.addObject('e-avatar', function (o) {
    var col = o.color || '#3ec1ff';
    return svg('0 0 200 200',
      '<rect x="14" y="14" width="172" height="172" rx="30" fill="' + col + '" ' + SW + '/>' +
      (o.asleep ? '<path d="M62 88 Q76 102 90 88 M110 88 Q124 102 138 88" fill="none" ' + SW + '/>'
        : '<circle cx="76" cy="90" r="10" fill="' + INK + '"/><circle cx="124" cy="90" r="10" fill="' + INK + '"/>') +
      (o.moustache ? '<path d="M60 128 Q80 108 100 124 Q120 108 140 128 Q120 120 100 132 Q80 120 60 128 Z" fill="#3a2a1a" ' + SW3 + '/>' : '<path d="M76 128 Q100 144 124 128" fill="none" ' + SW + '/>') +
      (o.ears ? '<circle cx="46" cy="40" r="20" fill="' + col + '" ' + SW + '/><circle cx="154" cy="40" r="20" fill="' + col + '" ' + SW + '/>' : '') +
      (o.asleep ? A.sleepZ([[72, 46, 20, A.SW], [100, 26, 13, A.SW3]]) : ''));
  });

  A.addObject('e-curtain', function (o) {
    var folds = '';
    for (var i = 0; i < 5; i++) folds += '<path d="M' + (14 + i * 16) + ' 20 Q' + (8 + i * 16) + ' 110 ' + (18 + i * 16) + ' 196" fill="none" stroke="#7a0f26" stroke-width="5"/>';
    var g = '<path d="M0 0 L100 0 L100 20 Q60 120 92 200 L0 200 Z" fill="#b3123a" ' + SW + '/>' + folds +
      '<rect x="0" y="0" width="100" height="22" fill="#f5b400" ' + SW3 + '/>';
    return svg('0 0 100 200', o.flip ? '<g transform="translate(100 0) scale(-1 1)">' + g + '</g>' : g, 'art fill-art');
  });
})(typeof window !== 'undefined' ? window : globalThis);
