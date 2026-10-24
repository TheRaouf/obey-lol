/* OBEY? LOL. — art pack I: under the sea and the harbour (levels 193–212).
 * Original code-drawn SVG in the house style: chunky shapes, ink outlines, flat fills, one highlight. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY && OBEY.art;
  if (!A || !A.addObject) return; // art.js not loaded yet
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function add(k, f) { A.addObject(k, f); }
  function txt(x, y, size, s, fill) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" fill="' + (fill || INK) + '">' + OBEY.util.escape(String(s)) + '</text>'; }
  var HI = 'fill="#fff" opacity=".5"';

  /* ------------------------------------------------------------ water and terrain */
  // Shallow water with a sandy seabed from 76 % down (terrain backdrop, stretches to fill).
  // 2.4.1 (review S9): the bed is plain sand (the old sand dashes peeked out between control-row cards) and
  // the four water glints sit where the 2.4 rooms keep them clear of, or fully under, cards (y ≤ 34).
  add('i-sea', function (o) {
    var bed = o.nobed ? '' : '<rect y="76" width="100" height="24" fill="#f3d998"/><path d="M0 76 L100 76" stroke="' + INK + '" stroke-width=".8"/>';
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#7fb2ff"/>' +
      '<path d="M12 10 l6 0 M58 10 l6 0 M84 30 l6 0 M26 34 l6 0" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>' + bed, 'art fill-art');
  });

  // Deep, dark water (terrain backdrop) with a few specks of drifting silt.
  // 2.4.1 (review S1): a rock-grey seabed band from 74 % down (o.bed: its top in %, o.nobed: none) sits behind
  // the control row, so ink press shadows and card borders read (ink on #8a86a8 ≈ 4.9:1; on #2d2850 ≈ 1.2:1).
  // The silt stays above the bed; nothing is drawn inside it.
  add('i-deep', function (o) {
    var top = o.nobed ? 100 : (typeof o.bed === 'number' ? o.bed : 74), specks = '';
    for (var i = 0; i < 14; i++) {
      var cy = (i * 53) % 100;
      if (cy < top - 4) specks += '<circle cx="' + ((i * 37) % 100) + '" cy="' + cy + '" r=".6" fill="#8a86a8" opacity=".55"/>';
    }
    var edge = 'M0 ' + (top + 0.6) + ' Q25 ' + (top - 1.4) + ' 50 ' + (top + 0.6) + ' T100 ' + (top + 0.6);
    var bed = top < 100 ? '<path d="' + edge + ' L100 100 L0 100Z" fill="#8a86a8"/><path d="' + edge + '" fill="none" stroke="' + INK + '" stroke-width=".8"/>' : '';
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#2d2850"/>' + specks + bed, 'art fill-art');
  });

  // Sky and the wavy sea surface (drawn over i-sea at the top of a room).
  add('i-surface', function () {
    return svg('0 0 400 60', '<rect width="400" height="60" fill="#bfe8ff"/><path d="M0 40 Q25 30 50 40 T100 40 T150 40 T200 40 T250 40 T300 40 T350 40 T400 40 L400 60 L0 60Z" fill="#7fb2ff"/>' +
      '<path d="M0 40 Q25 30 50 40 T100 40 T150 40 T200 40 T250 40 T300 40 T350 40 T400 40" fill="none" stroke="' + INK + '" stroke-width="3"/>', 'art fill-art');
  });

  // Inside a whale: soft pink walls with deeper pink ribs (terrain backdrop).
  // 2.4.1 (review P9): the wall is #ff77b4 at .45 over the theme's --stage (it was solid #ff77b4, the loudest
  // room in the game); ribs are solid #ff6f91, the same pink as the tongue band, so the room stays one family.
  add('i-whalebelly', function () {
    var ribs = '';
    for (var i = 0; i < 6; i++) ribs += '<path d="M' + (8 + i * 17) + ' 6 Q' + (2 + i * 17) + ' 40 ' + (8 + i * 17) + ' 72" fill="none" stroke="#ff6f91" stroke-width="2.4" stroke-linecap="round"/>';
    return svg('0 0 100 100', '<rect width="100" height="100" fill="var(--stage)"/><rect width="100" height="100" fill="#ff77b4" opacity=".45"/>' + ribs +
      '<rect y="76" width="100" height="24" fill="#ff6f91"/><path d="M0 76 L100 76" stroke="' + INK + '" stroke-width=".8"/>', 'art fill-art');
  });

  add('i-rock', function () {
    return svg('0 0 200 120', '<path d="M10 116 Q14 50 60 36 Q90 8 128 30 Q176 34 190 116Z" fill="#8a86a8" ' + SW + '/><path d="M54 60 Q70 46 88 50" fill="none" ' + HI + ' stroke="#fff" stroke-width="6" stroke-linecap="round"/>');
  });

  // A wide flat rock to play games on.
  add('i-slab', function () {
    return svg('0 0 300 70', '<path d="M8 66 Q6 22 40 16 L262 12 Q294 18 292 66Z" fill="#8a86a8" ' + SW + '/><path d="M40 28 L120 24" stroke="#fff" stroke-width="6" opacity=".45" stroke-linecap="round"/>');
  });

  // Wreck deck planks (terrain band, stretches to fill).
  add('i-deck', function () {
    return svg('0 0 100 30', '<rect width="100" height="30" fill="#9a6b3f"/><path d="M0 0 L100 0" stroke="' + INK + '" stroke-width="1.2"/><path d="M0 10 L100 10 M0 20 L100 20 M30 0 L30 10 M70 10 L70 20 M45 20 L45 30" stroke="' + INK + '" stroke-opacity=".35" stroke-width=".8"/>', 'art fill-art');
  });

  // A tube of even or tapering width along quadratic segments [[x0,y0, cx,cy, x1,y1], …], with a round cap at
  // the far end; the near end is left square (it hides under a rock or the stage edge). Used so coral and weed
  // are colour fills with a house SW outline (2.4.1, review P4: they were 18- and 13-unit ink strokes).
  function tube(segs, r0, r1) {
    var pts = [];
    segs.forEach(function (q, si) {
      for (var k = si ? 1 : 0; k <= 10; k++) {
        var t = k / 10, u = 1 - t;
        pts.push([u * u * q[0] + 2 * u * t * q[2] + t * t * q[4], u * u * q[1] + 2 * u * t * q[3] + t * t * q[5]]);
      }
    });
    var n = pts.length, L = [], R = [], r = r0;
    for (var i = 0; i < n; i++) {
      var a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], tx = b[0] - a[0], ty = b[1] - a[1], d = Math.sqrt(tx * tx + ty * ty) || 1;
      r = r0 + (r1 - r0) * i / (n - 1);
      L.push((pts[i][0] - ty / d * r).toFixed(1) + ' ' + (pts[i][1] + tx / d * r).toFixed(1));
      R.push((pts[i][0] + ty / d * r).toFixed(1) + ' ' + (pts[i][1] - tx / d * r).toFixed(1));
    }
    return 'M' + L.join(' L') + ' A' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 0 0 ' + R[n - 1] + ' L' + R.slice(0, n - 1).reverse().join(' L') + 'Z';
  }
  var CORAL = [
    [[18, 90, 6, 80, 8, 64]], [[100, 100, 114, 92, 112, 76]], // side twigs (drawn first, behind the fingers)
    [[32, 150, 18, 104, 20, 56]], [[52, 150, 44, 92, 46, 30]], [[70, 150, 80, 88, 76, 20]], [[90, 150, 104, 106, 100, 54]]
  ].map(function (s, i) { return tube(s, i < 2 ? 6 : 10, i < 2 ? 5 : 8); });
  add('i-coral', function (o) {
    var c = o.color || '#ff77b4';
    return svg('0 0 120 160', CORAL.map(function (d) { return '<path d="' + d + '" fill="' + c + '" ' + SW + '/>'; }).join('') +
      '<path d="M10 158 Q14 126 60 124 Q106 126 110 158Z" fill="#8a86a8" ' + SW + '/>' +
      '<path d="M72 46 Q71 36 72 30" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>');
  });

  var WEED = tube([[30, 160, 12, 120, 30, 90], [30, 90, 48, 60, 30, 30], [30, 30, 22, 16, 30, 6]], 7, 4);
  add('i-weed', function () {
    return svg('0 0 60 160', '<path d="' + WEED + '" fill="#2fae84" ' + SW + '/>');
  });

  /* ------------------------------------------------------------ Bossworth's very small submarine */
  add('i-sub', function (o) {
    var hatch = o.hatch ? '<path d="M96 22 L120 6" ' + SW + '/><ellipse cx="108" cy="26" rx="14" ry="5" fill="#1c1640" ' + SW3 + '/>' : '<path d="M94 24 L122 24" ' + SW + '/>';
    var bubbles = o.bubbles ? '<circle cx="40" cy="20" r="6" fill="#fff" opacity=".55" ' + SW3 + '/><circle cx="58" cy="8" r="4" fill="#fff" opacity=".55" ' + SW3 + '/>' : '';
    return svg('0 0 200 130', bubbles + '<path d="M136 26 L136 4 L156 4" fill="none" ' + SW + '/>' +
      '<rect x="88" y="24" width="52" height="30" rx="8" fill="#f5b400" ' + SW + '/>' + hatch +
      '<path d="M20 86 Q20 50 70 50 L150 50 Q186 50 186 86 Q186 122 150 122 L70 122 Q20 122 20 86Z" fill="#ffd23f" ' + SW + '/>' +
      '<path d="M20 86 L4 70 L4 102Z" fill="#f5b400" ' + SW3 + '/>' +
      '<circle cx="80" cy="86" r="14" fill="#7fb2ff" ' + SW3 + '/><circle cx="124" cy="86" r="14" fill="#7fb2ff" ' + SW3 + '/>' +
      '<path d="M54 62 Q90 54 130 58" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".5"/>');
  });

  // Sonar scope. o.echo = { left, ahead, right } each 'pong' | 'none' | undefined.
  add('i-sonar', function (o) {
    var e = o.echo || {}, g = '#7dffb2', out = '';
    function blip(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="13" fill="' + g + '" ' + SW3 + '/>'; }
    function nothing(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="12" fill="none" stroke="' + g + '" stroke-width="3" stroke-dasharray="5 6"/>'; }
    var at = { left: [42, 100], ahead: [100, 42], right: [158, 100] };
    Object.keys(at).forEach(function (k) { if (e[k] === 'pong') out += blip(at[k][0], at[k][1]); else if (e[k] === 'none') out += nothing(at[k][0], at[k][1]); });
    return svg('0 0 200 200', '<rect x="4" y="4" width="192" height="192" rx="28" fill="#4b4466" ' + SW + '/><circle cx="100" cy="100" r="80" fill="#1c1640" ' + SW + '/>' +
      '<circle cx="100" cy="100" r="54" fill="none" stroke="' + g + '" stroke-width="2" opacity=".5"/><circle cx="100" cy="100" r="28" fill="none" stroke="' + g + '" stroke-width="2" opacity=".5"/>' +
      '<path d="M100 22 L100 178 M22 100 L178 100" stroke="' + g + '" stroke-width="2" opacity=".35"/>' +
      '<path d="M92 108 L100 88 L108 108Z" fill="#ffd23f" ' + SW3 + '/>' + out);
  });

  add('i-periscope', function () {
    return svg('0 0 100 200', '<rect x="38" y="40" width="24" height="156" fill="#8a86a8" ' + SW + '/><path d="M30 10 L70 10 L70 52 L30 52Z" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="12" y="20" width="22" height="24" rx="6" fill="#1c1640" ' + SW3 + '/><path d="M44 60 L44 180" stroke="#fff" stroke-width="5" opacity=".45" stroke-linecap="round"/>' +
      '<rect x="20" y="120" width="60" height="14" rx="6" fill="#4b4466" ' + SW3 + '/>');
  });

  // Channel buoy: a flat-topped red CAN or a pointed green CONE (shape tells them apart), numbered.
  add('i-buoy', function (o) {
    var top = o.kind === 'cone'
      ? '<path d="M60 20 L96 110 L24 110Z" fill="#2bc46f" ' + SW + '/>'
      : '<rect x="26" y="24" width="68" height="86" rx="4" fill="#e5243b" ' + SW + '/><path d="M26 24 L94 24" ' + SW + '/>';
    return svg('0 0 120 180', top + '<path d="M14 110 L106 110 L96 146 L24 146Z" fill="#fffdf6" ' + SW + '/>' +
      '<circle cx="60" cy="78" r="26" fill="#fff" ' + SW3 + '/>' + txt(60, 91, 36, o.n || '') +
      '<path d="M0 150 Q15 140 30 150 T60 150 T90 150 T120 150" fill="none" stroke="#fff" stroke-width="5" opacity=".55"/>');
  });

  add('i-pier', function () {
    return svg('0 0 200 120', '<rect x="4" y="10" width="192" height="22" rx="4" fill="#b88d5f" ' + SW + '/><path d="M50 10 L50 32 M100 10 L100 32 M150 10 L150 32" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>' +
      '<rect x="20" y="32" width="18" height="84" fill="#9a6b3f" ' + SW3 + '/><rect x="162" y="32" width="18" height="84" fill="#9a6b3f" ' + SW3 + '/><rect x="92" y="32" width="18" height="84" fill="#9a6b3f" ' + SW3 + '/>');
  });

  /* ------------------------------------------------------------ lighthouse */
  add('i-lighthouse', function (o) {
    var lit = o.lit ? '<circle cx="60" cy="40" r="34" fill="#fff6a8" opacity=".55"/><path d="M60 0 L60 -12 M18 40 L4 40 M102 40 L116 40 M28 10 L18 0 M92 10 L102 0" fill="none" ' + SW3 + '/>' : '';
    return svg('0 -16 120 296', lit + '<path d="M36 60 L84 60 L100 270 L20 270Z" fill="#fffdf6" ' + SW + '/>' +
      '<path d="M33 100 L87 100 L90 140 L30 140Z M27 180 L93 180 L96 220 L24 220Z" fill="#e5243b" ' + SW3 + '/>' +
      '<rect x="40" y="26" width="40" height="34" rx="4" fill="' + (o.lit ? '#ffe066' : '#4b4466') + '" ' + SW + '/><path d="M34 26 L60 8 L86 26Z" fill="#2d2850" ' + SW + '/>' +
      '<path d="M30 60 L90 60" ' + SW + '/><rect x="52" y="234" width="16" height="36" rx="6" fill="#9a6b3f" ' + SW3 + '/>');
  });

  add('i-shipmodel', function (o) {
    var masts = o.masts === 'down'
      ? '<path d="M70 70 L150 58 M110 70 L176 62" ' + SW + '/><path d="M80 62 L140 54 L140 62Z" fill="#fffdf6" ' + SW3 + '/>'
      : '<path d="M80 72 L80 10 M130 72 L130 22" ' + SW + '/><path d="M80 16 L80 60 L116 60Z M130 28 L130 62 L158 62Z" fill="#fffdf6" ' + SW3 + '/><path d="M80 10 L90 14 L80 18" fill="#e5243b" ' + SW3 + '/>';
    var string = o.string === false ? '' : '<path d="M150 80 Q176 84 186 104 L196 108" fill="none" stroke="#e5243b" stroke-width="4" stroke-linecap="round"/>';
    return svg('0 0 200 120', masts + '<path d="M20 72 L180 72 L160 104 L40 104Z" fill="#a0784d" ' + SW + '/>' + string +
      '<path d="M44 82 L150 82" stroke="#fff" stroke-width="5" opacity=".45" stroke-linecap="round"/>');
  });

  add('i-bottle', function (o) {
    var inside = '';
    if (o.ship === 'down') inside = '<path d="M48 82 L160 82 L148 98 L60 98Z" fill="#a0784d" ' + SW3 + '/><path d="M80 80 L150 70" ' + SW3 + '/>';
    if (o.ship === 'up') inside = '<path d="M48 82 L160 82 L148 98 L60 98Z" fill="#a0784d" ' + SW3 + '/><path d="M84 82 L84 34 M128 82 L128 42" ' + SW3 + '/><path d="M84 38 L84 74 L112 74Z M128 46 L128 76 L150 76Z" fill="#fffdf6" ' + SW3 + '/>';
    if (o.smashed) {
      return svg('0 0 240 120', '<path d="M30 108 L60 88 L76 108Z M96 110 L110 84 L130 110Z M150 108 L176 92 L188 110Z M200 110 L214 96 L226 110Z" fill="#cfefff" ' + SW3 + '/>' +
        '<rect x="196" y="40" width="30" height="22" rx="4" fill="#9a6b3f" ' + SW3 + '/>');
    }
    return svg('0 0 240 120', '<path d="M24 50 Q24 22 52 22 L160 22 Q176 22 186 38 L206 46 L206 76 L186 84 Q176 102 160 102 L52 102 Q24 102 24 74Z" fill="#cfefff" fill-opacity=".6" ' + SW + '/>' +
      inside + '<rect x="206" y="44" width="22" height="34" rx="5" fill="#9a6b3f" ' + SW3 + '/><path d="M46 34 L150 34" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".55"/>');
  });

  // 2.4.1 (review S7): redirects to the canonical `hammer` lying flat (same 160 × 120 box); local fallback below.
  add('i-hammer', function () {
    if (A.hasObject('hammer')) return A.object('hammer', { lying: true });
    return svg('0 0 160 120', '<rect x="62" y="44" width="90" height="18" rx="8" fill="#a0784d" ' + SW + '/><rect x="16" y="20" width="52" height="66" rx="8" fill="#8a86a8" ' + SW + '/><path d="M24 30 L24 60" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>');
  });

  add('i-lifering', function () {
    var seg = '';
    for (var i = 0; i < 4; i++) {
      var a = i * 90 + 20, b = a + 50;
      var r = function (deg, rad) { var t = deg * Math.PI / 180; return (50 + rad * Math.cos(t)).toFixed(1) + ' ' + (50 + rad * Math.sin(t)).toFixed(1); };
      seg += '<path d="M' + r(a, 44) + ' A44 44 0 0 1 ' + r(b, 44) + ' L' + r(b, 24) + ' A24 24 0 0 0 ' + r(a, 24) + 'Z" fill="#e5243b"/>';
    }
    return svg('0 0 100 100', '<circle cx="50" cy="50" r="44" fill="#fffdf6" ' + SW + '/>' + seg + '<circle cx="50" cy="50" r="44" fill="none" ' + SW + '/><circle cx="50" cy="50" r="24" fill="var(--stage)" ' + SW + '/>');
  });

  // Bossworth bobbing in the sea, captain's hat and all. o.ring: he's holding the lifebuoy.
  add('i-swimmer', function (o) {
    var ring = o.ring ? '<circle cx="100" cy="112" r="40" fill="none" stroke="#e5243b" stroke-width="16"/><circle cx="100" cy="112" r="40" fill="none" stroke="' + INK + '" stroke-width="3"/>' : '';
    return svg('0 0 200 160', '<path d="M46 60 L24 26 M154 60 L176 26" ' + SW + '/><circle cx="22" cy="22" r="10" fill="#ffb347" ' + SW3 + '/><circle cx="178" cy="22" r="10" fill="#ffb347" ' + SW3 + '/>' +
      '<path d="M40 110 C40 60 66 40 100 40 C134 40 160 60 160 110Z" fill="#ffb347" ' + SW + '/>' +
      '<path d="M62 46 Q100 18 138 46 L134 56 L66 56Z" fill="#2d2850" ' + SW + '/><path d="M58 56 L142 56" ' + SW + '/><circle cx="100" cy="40" r="6" fill="#ffd23f" ' + SW3 + '/>' +
      '<circle cx="82" cy="80" r="7" fill="' + INK + '"/><circle cx="118" cy="80" r="7" fill="' + INK + '"/><ellipse cx="100" cy="98" rx="10" ry="7" fill="' + INK + '"/>' +
      ring + '<path d="M0 112 Q25 100 50 112 T100 112 T150 112 T200 112 L200 160 L0 160Z" fill="#7fb2ff"/><path d="M0 112 Q25 100 50 112 T100 112 T150 112 T200 112" fill="none" ' + SW3 + '/>');
  });

  add('i-rowboat', function () {
    return svg('0 0 200 90', '<path d="M8 30 L192 30 L166 82 L34 82Z" fill="#c98b4a" ' + SW + '/><path d="M8 30 L192 30" ' + SW + '/><path d="M30 46 L170 46" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>' +
      '<path d="M150 8 L118 74" ' + SW + '/><ellipse cx="114" cy="80" rx="8" ry="12" fill="#b88d5f" ' + SW3 + '/>');
  });

  add('i-seal', function (o) {
    var eyes = o.asleep ? '<path d="M120 54 L132 54" ' + SW3 + '/>' : '<circle cx="126" cy="54" r="6" fill="' + INK + '"/>';
    return svg('0 0 200 140', '<path d="M18 120 Q30 70 90 66 Q110 30 140 34 Q178 40 172 72 Q168 96 140 100 Q120 132 40 132 Q18 132 18 120Z" fill="#8a86a8" ' + SW + '/>' +
      eyes + '<circle cx="168" cy="66" r="7" fill="' + INK + '"/><path d="M150 76 L180 72 M150 82 L180 84" ' + SW3 + '/>' +
      '<path d="M70 118 Q80 136 100 132" fill="#4b4466" ' + SW3 + '/><path d="M110 46 Q124 38 140 42" fill="none" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>');
  });

  add('i-worms', function () {
    return svg('0 0 140 120', '<path d="M40 40 Q30 10 50 14 M70 40 Q80 6 92 18 M96 42 Q112 18 118 30" fill="none" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/>' +
      '<path d="M40 40 Q30 10 50 14 M70 40 Q80 6 92 18 M96 42 Q112 18 118 30" fill="none" stroke="#ff77b4" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="20" y="40" width="100" height="72" rx="8" fill="#c3ccd8" ' + SW + '/><path d="M20 56 L120 56" ' + SW3 + '/><path d="M32 66 L32 98" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>');
  });

  add('i-island', function () {
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#8a86a8"/><path d="M0 0 L100 0" stroke="' + INK + '" stroke-width="3"/><path d="M14 30 l10 0 M60 54 l12 0 M30 80 l8 0" stroke="' + INK + '" stroke-opacity=".35" stroke-width="2"/>', 'art fill-art');
  });

  /* ------------------------------------------------------------ fish market */
  add('i-stall', function () {
    var s = '';
    for (var i = 0; i < 6; i++) s += '<path d="M' + (10 + i * 30) + ' 20 L' + (40 + i * 30) + ' 20 L' + (40 + i * 30) + ' 56 Q' + (25 + i * 30) + ' 70 ' + (10 + i * 30) + ' 56Z" fill="' + (i % 2 ? '#fffdf6' : '#3a86ff') + '" ' + SW3 + '/>';
    return svg('0 0 200 200', '<rect x="20" y="56" width="10" height="140" fill="#9a6b3f" ' + SW3 + '/><rect x="170" y="56" width="10" height="140" fill="#9a6b3f" ' + SW3 + '/>' + s +
      '<rect x="10" y="130" width="180" height="66" rx="6" fill="#b88d5f" ' + SW + '/><path d="M24 150 L176 150" stroke="#fff" stroke-width="5" opacity=".45" stroke-linecap="round"/>');
  });

  add('i-trawler', function () {
    return svg('0 0 260 170', '<rect x="140" y="34" width="70" height="60" rx="6" fill="#fffdf6" ' + SW + '/><rect x="152" y="46" width="20" height="18" fill="#7fb2ff" ' + SW3 + '/><rect x="180" y="46" width="20" height="18" fill="#7fb2ff" ' + SW3 + '/>' +
      '<path d="M60 94 L60 10 M60 20 L120 90" ' + SW + '/><path d="M10 94 L250 94 L222 150 L36 150Z" fill="#3a86ff" ' + SW + '/><path d="M24 112 L236 112" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>' +
      '<path d="M0 154 Q20 144 40 154 T80 154 T120 154 T160 154 T200 154 T240 154 T260 154" fill="none" stroke="#fff" stroke-width="5" opacity=".55"/>');
  });

  // Coin with a value, or a crimped bottle cap pretending to be one (shape, not colour, tells them apart).
  // 2.4.1 (review S7): redirects to the canonical `coin` (art-extra.js), which is this drawing with the same
  // `v`/`cap` options; the local drawing is only the fallback when art-extra.js is not loaded.
  add('i-coin', function (o) {
    if (A.hasObject('coin')) return A.object('coin', o);
    if (o.cap) {
      var d = '';
      for (var i = 0; i < 16; i++) { var t = i * Math.PI / 8, r = i % 2 ? 40 : 46; d += (i ? 'L' : 'M') + (50 + r * Math.cos(t)).toFixed(1) + ' ' + (50 + r * Math.sin(t)).toFixed(1) + ' '; }
      return svg('0 0 100 100', '<path d="' + d + 'Z" fill="#c3ccd8" ' + SW + '/><circle cx="50" cy="50" r="26" fill="#e5243b" ' + SW3 + '/><path d="M36 40 Q44 30 56 32" fill="none" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>');
    }
    return svg('0 0 100 100', '<circle cx="50" cy="50" r="44" fill="#ffd23f" ' + SW + '/><circle cx="50" cy="50" r="34" fill="none" stroke="#f5b400" stroke-width="5"/>' + txt(50, 62, 34, o.v || '1') +
      '<path d="M24 34 Q32 20 48 18" fill="none" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>');
  });

  // A sardine seen from above. Fat head with an eye, thin forked tail. o.down: head at the bottom.
  add('i-sardine', function (o) {
    var body = '<path d="M30 6 Q54 14 52 44 Q48 80 34 104 L30 108 L26 104 Q12 80 8 44 Q6 14 30 6Z" fill="#c3ccd8" ' + SW + '/>' +
      '<path d="M30 104 L16 126 L30 118 L44 126Z" fill="#c3ccd8" ' + SW3 + '/><path d="M14 40 Q30 50 46 40" fill="none" ' + SW3 + '/>' +
      '<circle cx="22" cy="24" r="4" fill="' + INK + '"/><circle cx="38" cy="24" r="4" fill="' + INK + '"/><path d="M22 56 L22 84" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>';
    return svg('0 0 60 130', o.down ? '<g transform="rotate(180 30 65)">' + body + '</g>' : body);
  });

  add('i-tin', function () {
    return svg('0 0 300 120', '<rect x="6" y="6" width="288" height="108" rx="26" fill="#c3ccd8" ' + SW + '/><rect x="20" y="18" width="260" height="84" rx="16" fill="#8a86a8" ' + SW3 + '/>' +
      '<path d="M30 14 L120 14" stroke="#fff" stroke-width="5" opacity=".5" stroke-linecap="round"/>');
  });

  // The tin's label: a little picture of how the sardines go in (head, tail, head, tail).
  add('i-tinlabel', function () {
    var f = '';
    for (var i = 0; i < 4; i++) {
      var x = 34 + i * 34, up = i % 2 === 0;
      f += '<g transform="translate(' + x + ' 60)' + (up ? '' : ' rotate(180)') + '"><path d="M0 -30 Q12 -26 11 -6 Q9 14 0 26 Q-9 14 -11 -6 Q-12 -26 0 -30Z" fill="#c3ccd8" ' + SW3 + '/><circle cx="-4" cy="-18" r="3" fill="' + INK + '"/><circle cx="4" cy="-18" r="3" fill="' + INK + '"/><path d="M0 26 L-8 36 L8 36Z" fill="#c3ccd8" ' + SW3 + '/></g>';
    }
    return svg('0 0 200 120', '<rect x="6" y="6" width="188" height="108" rx="24" fill="#ffd23f" ' + SW + '/>' + f);
  });

  add('i-anchor', function () {
    return svg('0 0 160 200', '<circle cx="80" cy="26" r="16" fill="none" stroke="' + INK + '" stroke-width="16"/><circle cx="80" cy="26" r="16" fill="none" stroke="#8a86a8" stroke-width="9"/>' +
      '<path d="M80 42 L80 176 M48 70 L112 70 M24 130 Q30 180 80 182 Q130 180 136 130" fill="none" stroke="' + INK + '" stroke-width="18" stroke-linecap="round"/>' +
      '<path d="M80 42 L80 176 M48 70 L112 70 M24 130 Q30 180 80 182 Q130 180 136 130" fill="none" stroke="#8a86a8" stroke-width="10" stroke-linecap="round"/>');
  });

  /* ------------------------------------------------------------ reef */
  // Dive buddy. o.signal: 'ok' | 'stop' | 'up' | 'ask'
  add('i-diver', function (o) {
    var hand = '';
    if (o.signal === 'stop') hand = '<rect x="140" y="34" width="34" height="44" rx="10" fill="#ffd23f" ' + SW + '/><path d="M150 34 L150 22 M160 34 L160 18 M170 34 L170 22" ' + SW3 + '/>';
    else if (o.signal === 'up') hand = '<rect x="140" y="50" width="34" height="30" rx="10" fill="#ffd23f" ' + SW + '/><rect x="150" y="18" width="12" height="34" rx="6" fill="#ffd23f" ' + SW + '/>';
    else hand = '<circle cx="156" cy="48" r="16" fill="none" stroke="' + INK + '" stroke-width="14"/><circle cx="156" cy="48" r="16" fill="none" stroke="#ffd23f" stroke-width="7"/><path d="M168 36 L176 16 M174 42 L188 26" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/><path d="M168 36 L176 16 M174 42 L188 26" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>';
    return svg('0 0 200 200', '<rect x="54" y="78" width="72" height="96" rx="26" fill="#2d2850" ' + SW + '/><rect x="30" y="86" width="22" height="60" rx="8" fill="#ffd23f" ' + SW3 + '/>' +
      '<circle cx="90" cy="54" r="34" fill="#ffb347" ' + SW + '/><rect x="66" y="40" width="50" height="26" rx="10" fill="#7fb2ff" ' + SW + '/><path d="M74 46 L86 46" stroke="#fff" stroke-width="5" opacity=".55" stroke-linecap="round"/>' +
      '<path d="M120 100 L148 72" stroke="' + INK + '" stroke-width="18" stroke-linecap="round"/><path d="M120 100 L148 72" stroke="#2d2850" stroke-width="11" stroke-linecap="round"/>' + hand +
      '<path d="M62 174 L50 196 L82 196 Z M118 174 L130 196 L98 196Z" fill="#2bc46f" ' + SW3 + '/>');
  });

  add('i-jelly', function (o) {
    var glow = o.glow ? '<circle cx="60" cy="50" r="52" fill="#fff6a8" opacity=".45"/>' : '';
    return svg('0 0 120 160', glow + '<path d="M14 60 Q14 10 60 10 Q106 10 106 60 Q84 52 60 60 Q36 52 14 60Z" fill="#ff77b4" ' + SW + '/>' +
      '<path d="M30 62 Q22 96 34 130 M52 62 Q46 106 56 150 M72 62 Q80 104 70 146 M92 62 Q100 92 88 124" fill="none" ' + SW3 + '/><path d="M34 34 Q46 22 62 22" fill="none" stroke="#fff" stroke-width="6" opacity=".55" stroke-linecap="round"/>');
  });

  // The octopus. o.curl: one arm is curled up around a pearl. o.inky: covered in its own ink.
  add('i-octopus', function (o) {
    var arms = '', pts = [[30, 150], [52, 176], [80, 186], [110, 188], [140, 186], [168, 176], [192, 152]];
    pts.forEach(function (p, i) {
      arms += '<path d="M' + (82 + i * 13) + ' 116 Q' + ((82 + i * 13 + p[0]) / 2) + ' ' + (p[1] - 6) + ' ' + p[0] + ' ' + p[1] + '" fill="none" stroke="' + INK + '" stroke-width="20" stroke-linecap="round"/>' +
        '<path d="M' + (82 + i * 13) + ' 116 Q' + ((82 + i * 13 + p[0]) / 2) + ' ' + (p[1] - 6) + ' ' + p[0] + ' ' + p[1] + '" fill="none" stroke="#9b5de5" stroke-width="13" stroke-linecap="round"/>';
    });
    var eighth = o.seven ? '' : o.curl
      ? '<path d="M200 110 Q236 104 232 72 Q226 50 206 58" fill="none" stroke="' + INK + '" stroke-width="20" stroke-linecap="round"/><path d="M200 110 Q236 104 232 72 Q226 50 206 58" fill="none" stroke="#9b5de5" stroke-width="13" stroke-linecap="round"/>' +
        '<circle cx="214" cy="80" r="13" fill="#fffdf6" ' + SW3 + '/><circle cx="210" cy="76" r="4" fill="#fff"/>'
      : '<path d="M200 110 Q236 120 238 150" fill="none" stroke="' + INK + '" stroke-width="20" stroke-linecap="round"/><path d="M200 110 Q236 120 238 150" fill="none" stroke="#9b5de5" stroke-width="13" stroke-linecap="round"/>';
    var ink = o.inky ? '<circle cx="80" cy="60" r="30" fill="#1c1640" opacity=".55"/><circle cx="170" cy="40" r="22" fill="#1c1640" opacity=".55"/>' : '';
    return svg('0 0 250 200', arms + eighth + '<path d="M70 120 Q60 20 128 18 Q196 20 186 120Z" fill="#9b5de5" ' + SW + '/>' +
      '<circle cx="108" cy="80" r="12" fill="#fff" ' + SW3 + '/><circle cx="148" cy="80" r="12" fill="#fff" ' + SW3 + '/><circle cx="110" cy="82" r="5" fill="' + INK + '"/><circle cx="146" cy="82" r="5" fill="' + INK + '"/>' +
      '<path d="M116 104 Q128 112 140 104" fill="none" ' + SW3 + '/><path d="M96 44 Q112 30 132 30" fill="none" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round"/>' + ink);
  });

  // The octopus's eighth arm, curled up around a pearl (o.open: uncurled, pearl on show).
  add('i-tentacle', function (o) {
    var d = o.open ? 'M8 120 Q50 116 70 96 Q86 80 92 60' : 'M8 120 Q70 116 84 76 Q92 40 62 34 Q40 34 44 58';
    var pearl = o.open ? '<circle cx="80" cy="34" r="16" fill="#fffdf6" ' + SW3 + '/><circle cx="75" cy="29" r="5" fill="#fff"/>' : '<circle cx="62" cy="62" r="15" fill="#fffdf6" ' + SW3 + '/><circle cx="57" cy="57" r="5" fill="#fff"/>';
    return svg('0 0 100 130', (o.open ? '' : pearl) + '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="22" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="#9b5de5" stroke-width="14" stroke-linecap="round"/>' + (o.open ? pearl : ''));
  });

  // A cockle shell for the shell game. o.up: lifted (shows the sand underneath).
  add('i-shell', function (o) {
    var lift = o.up ? -26 : 0;
    var ribs = '';
    for (var i = 0; i < 5; i++) ribs += '<path d="M60 ' + (20 + lift) + ' L' + (22 + i * 19) + ' ' + (88 + lift) + '" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>';
    return svg('0 -30 120 130', (o.up ? '<ellipse cx="60" cy="90" rx="44" ry="8" fill="#c98b4a" opacity=".6"/>' : '') +
      '<path d="M10 ' + (88 + lift) + ' Q14 ' + (16 + lift) + ' 60 ' + (14 + lift) + ' Q106 ' + (16 + lift) + ' 110 ' + (88 + lift) + 'Z" fill="#ff6f91" ' + SW + '/>' + ribs +
      '<path d="M30 ' + (40 + lift) + ' Q40 ' + (26 + lift) + ' 56 ' + (24 + lift) + '" fill="none" stroke="#fff" stroke-width="6" opacity=".5" stroke-linecap="round"/>');
  });

  // Numbered treasure chest. o.open, o.key (a key glints inside).
  add('i-chest', function (o) {
    var lid = o.open ? '<path d="M14 64 L22 18 L138 18 L146 64" fill="#9a6b3f" ' + SW + '/>' : '<path d="M14 64 Q14 26 80 26 Q146 26 146 64Z" fill="#a0784d" ' + SW + '/>';
    var key = o.key ? '<circle cx="62" cy="58" r="10" fill="#ffd23f" ' + SW3 + '/><path d="M72 58 L102 58" stroke="#ffd23f" stroke-width="8" stroke-linecap="round"/>' : '';
    return svg('0 0 160 150', lid + key + '<rect x="14" y="64" width="132" height="78" rx="6" fill="#c98b4a" ' + SW + '/><path d="M14 64 L146 64" ' + SW + '/>' +
      '<circle cx="80" cy="102" r="24" fill="#fff" ' + SW3 + '/>' + txt(80, 114, 32, o.n || ''));
  });

  // Hermit crab. o.size 1–4 sets the crab; o.shell 0–4 the shell it wears (0 = none).
  add('i-hermit', function (o) {
    var s = o.size || 1, sh = o.shell || 0, k = 0.55 + s * 0.15;
    var crab = '<g transform="translate(100 150) scale(' + k.toFixed(2) + ')">' +
      '<path d="M-40 -6 L-64 -40 M40 -6 L64 -40" ' + SW + '/><circle cx="-66" cy="-48" r="14" fill="#e5243b" ' + SW + '/><circle cx="66" cy="-48" r="14" fill="#e5243b" ' + SW + '/>' +
      '<ellipse cx="0" cy="0" rx="44" ry="22" fill="#e5243b" ' + SW + '/><path d="M-12 -20 L-16 -44 M12 -20 L16 -44" ' + SW3 + '/><circle cx="-16" cy="-48" r="6" fill="' + INK + '"/><circle cx="16" cy="-48" r="6" fill="' + INK + '"/>' +
      '<path d="M-30 20 L-40 40 M-10 22 L-14 42 M10 22 L14 42 M30 20 L40 40" ' + SW3 + '/></g>';
    var shell = '';
    if (sh) {
      var r = 22 + sh * 12, cy = 150 - k * 10 - r * 0.7;
      shell = '<path d="M' + (100 - r) + ' ' + (cy + r * 0.6) + ' Q' + (100 - r) + ' ' + (cy - r) + ' 100 ' + (cy - r) + ' Q' + (100 + r * 1.1) + ' ' + (cy - r) + ' ' + (100 + r) + ' ' + (cy + r * 0.6) + 'Z" fill="#fff8dd" ' + SW + '/>' +
        '<path d="M100 ' + (cy - r * 0.4) + ' m-' + (r * 0.4).toFixed(1) + ' 0 a' + (r * 0.4).toFixed(1) + ' ' + (r * 0.4).toFixed(1) + ' 0 1 1 ' + (r * 0.8).toFixed(1) + ' 0" fill="none" ' + SW3 + '/>';
    }
    return svg('0 0 200 200', shell + crab);
  });

  // An empty spiral shell, sized 1–4.
  add('i-conch', function (o) {
    var sh = o.size || 1, r = 22 + sh * 12;
    return svg('0 0 200 200', '<path d="M' + (100 - r) + ' 170 Q' + (100 - r) + ' ' + (170 - 2 * r) + ' 100 ' + (170 - 2 * r) + ' Q' + (100 + r * 1.1) + ' ' + (170 - 2 * r) + ' ' + (100 + r) + ' 170Z" fill="#fff8dd" ' + SW + '/>' +
      '<path d="M100 ' + (170 - r * 1.1).toFixed(1) + ' m-' + (r * 0.45).toFixed(1) + ' 0 a' + (r * 0.45).toFixed(1) + ' ' + (r * 0.45).toFixed(1) + ' 0 1 1 ' + (r * 0.9).toFixed(1) + ' 0" fill="none" ' + SW3 + '/>' +
      '<path d="M' + (100 - r * 0.6).toFixed(1) + ' ' + (170 - r * 1.2).toFixed(1) + ' q8 -14 22 -18" fill="none" stroke="#fff" stroke-width="6" opacity=".55" stroke-linecap="round"/>');
  });

  /* ------------------------------------------------------------ the deep and the wreck */
  add('i-shipbell', function (o) {
    var swing = o.ringing ? ' transform="rotate(-14 100 30)"' : '';
    var frame = o.frame ? '<path d="M30 196 L30 16 L170 16 L170 196" fill="none" stroke="' + INK + '" stroke-width="14" stroke-linejoin="round"/><path d="M30 196 L30 16 L170 16 L170 196" fill="none" stroke="#9a6b3f" stroke-width="7" stroke-linejoin="round"/><path d="M14 196 L46 196 M154 196 L186 196" ' + SW + '/>' : '<path d="M40 22 L160 22" ' + SW + '/>';
    return svg('0 0 200 200', frame + '<path d="M100 18 L100 40" ' + SW + '/>' +
      '<g' + swing + '><path d="M54 140 Q58 50 100 44 Q142 50 146 140 L156 156 L44 156Z" fill="#f5b400" ' + SW + '/><circle cx="100" cy="168" r="12" fill="#8a86a8" ' + SW3 + '/>' +
      '<path d="M100 156 L100 158" ' + SW3 + '/><path d="M74 70 Q84 56 100 54" fill="none" stroke="#fff" stroke-width="7" opacity=".5" stroke-linecap="round"/></g>' +
      '<path d="M140 150 Q152 168 146 188" fill="none" stroke="#fffdf6" stroke-width="9" stroke-linecap="round"/><path d="M140 150 Q152 168 146 188" fill="none" ' + SW3 + ' stroke-dasharray="2 8"/>');
  });

  // A glowing light in the dark. o.on toggles the glow; the core always shows faintly.
  add('i-glow', function (o) {
    return svg('-10 -10 120 120', (o.on ? '<circle cx="50" cy="50" r="48" fill="#fff6a8" opacity=".45"/><path d="M50 -2 L50 -8 M50 102 L50 108 M-2 50 L-8 50 M102 50 L108 50" ' + SW3 + '/>' : '') +
      '<circle cx="50" cy="50" r="22" fill="' + (o.on ? '#ffe066' : '#4b4466') + '" ' + SW + '/>' + (o.on ? '<circle cx="43" cy="43" r="6" ' + HI + '/>' : ''));
  });

  // Glowing plankton outlines. o.shape: 'hatch' | 'clam'. o.on: glowing.
  add('i-plankton', function (o) {
    if (!o.on) return svg('0 0 200 140', '');
    var dots = '', g = '#7dffb2';
    if (o.shape === 'clam') {
      for (var i = 0; i <= 16; i++) { var t = Math.PI + i * Math.PI / 16; dots += '<circle cx="' + (100 + 84 * Math.cos(t)).toFixed(1) + '" cy="' + (100 + 60 * Math.sin(t)).toFixed(1) + '" r="5" fill="' + g + '" ' + SW3 + '/>'; }
      for (var j = 0; j < 7; j++) dots += '<path d="M' + (40 + j * 20) + ' 100 l10 -16 l10 16" fill="none" stroke="' + g + '" stroke-width="5" stroke-linejoin="round"/>';
      return svg('0 0 200 140', dots + '<path d="M16 100 L184 100" stroke="' + g + '" stroke-width="5"/>');
    }
    for (var k = 0; k < 20; k++) { var a = k * Math.PI / 10; dots += '<circle cx="' + (100 + 56 * Math.cos(a)).toFixed(1) + '" cy="' + (70 + 56 * Math.sin(a)).toFixed(1) + '" r="5" fill="' + g + '" ' + SW3 + '/>'; }
    return svg('0 0 200 140', dots + '<path d="M60 70 L140 70 M100 30 L100 110" stroke="' + g + '" stroke-width="6" stroke-linecap="round"/><circle cx="100" cy="70" r="12" fill="none" stroke="' + g + '" stroke-width="5"/>');
  });

  // The blowhole seen from inside the whale: a tube in the ceiling. o.open: sky and spray.
  add('i-blowhole', function (o) {
    var inside = o.open ? '<path d="M70 0 L130 0 L118 96 L82 96Z" fill="#bfe8ff"/><circle cx="100" cy="24" r="14" fill="#ffd23f" ' + SW3 + '/>' +
      '<path d="M86 104 L74 140 M100 108 L100 146 M114 104 L126 140" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".55"/>' : '<path d="M76 0 L124 0 L114 96 L86 96Z" fill="#1c1640"/>';
    return svg('0 0 200 150', '<path d="M40 0 L160 0 L132 100 L68 100Z" fill="#ff6f91" ' + SW + '/>' + inside +
      '<ellipse cx="100" cy="98" rx="' + (o.open ? 22 : 18) + '" ry="' + (o.open ? 9 : 4) + '" fill="' + (o.open ? '#bfe8ff' : '#1c1640') + '" ' + SW + '/>');
  });

  add('i-baleen', function () {
    var plates = '';
    for (var i = 0; i < 9; i++) plates += '<rect x="' + (12 + i * 20) + '" y="10" width="12" height="150" rx="5" fill="#fff8dd" ' + SW3 + '/>';
    return svg('0 0 200 170', '<rect x="4" y="4" width="192" height="12" rx="6" fill="#ff6f91" ' + SW3 + '/>' + plates);
  });
})(typeof window !== 'undefined' ? window : globalThis);
