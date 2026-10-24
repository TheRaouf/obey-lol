/* OBEY? LOL. — art pack C: outdoors and travel (levels 73–92).
 * Original code-drawn SVG in the house style: chunky shapes, ink outlines, flat fills. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY && OBEY.art;
  if (!A || !A.addObject) return; // art.js not loaded yet
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function add(k, f) { A.addObject(k, f); }
  function txt(x, y, size, s, fill) { return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" fill="' + (fill || INK) + '">' + OBEY.util.escape(s) + '</text>'; }

  /* ------------------------------------------------------------ weather + beach */
  add('c-umbrella', function (o) {
    if (o.open) {
      return svg('0 0 200 200', '<path d="M14 92 Q100 -6 186 92 Q164 78 142 92 Q120 78 100 92 Q78 78 58 92 Q36 78 14 92Z" fill="#e5243b" ' + SW + '/>' +
        '<path d="M100 92 Q86 40 100 14 Q114 40 100 92" fill="#ffd23f" ' + SW3 + '/><path d="M100 92 L100 172 Q100 188 84 188 Q70 188 70 174" fill="none" ' + SW + '/>');
    }
    // `stand` (2.4.1): stored tip-down with the hook up, as it sits in `c-umbrellastand`.
    return svg('0 0 200 200', (o.stand ? '<g transform="rotate(180 100 100)">' : '<g>') + '<path d="M100 10 L100 24" ' + SW + '/><path d="M100 24 Q74 90 88 150 L112 150 Q126 90 100 24Z" fill="#e5243b" ' + SW + '/>' +
      '<path d="M100 30 Q94 90 100 148" fill="none" stroke="#ffd23f" stroke-width="5"/><path d="M100 150 L100 172 Q100 190 82 190 Q68 190 68 176" fill="none" ' + SW + '/></g>');
  });

  /* 2.4.1 (bible §18, L73): an umbrella stand. A glazed blue pot with a dark mouth, a white wave band and
   * a foot ring, 100×150 (the `bin` box it replaces). Place it after the brolly in the object list: it is
   * static (no pointer events) and its front hides the lower half of a `c-umbrella` with `stand: true`. */
  add('c-umbrellastand', function () {
    return svg('0 0 100 150',
      '<path d="M18 30 L82 30 L76 138 Q75 144 69 144 L31 144 Q25 144 24 138 Z" fill="#3a86ff" ' + SW + '/>' +
      '<path d="M22 92 Q31 84 40 92 T58 92 T78 92 L77 106 Q68 98 59 106 T41 106 T23 106 Z" fill="#fffdf6" ' + SW3 + '/>' +
      '<rect x="10" y="18" width="80" height="16" rx="6" fill="#2f6fe4" ' + SW + '/><rect x="18" y="21" width="64" height="7" rx="3" fill="#1c1640"/>' +
      '<rect x="22" y="138" width="56" height="9" rx="3" fill="#2f6fe4" ' + SW3 + '/>' +
      '<path d="M31 42 L34 82 M35 116 L36 128" stroke="#fff" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>');
  });

  add('c-window', function (o) {
    var drops = '';
    if (o.rain) for (var i = 0; i < 14; i++) drops += '<path d="M' + (30 + (i * 37) % 140) + ' ' + (70 + (i * 23) % 100) + ' l-6 14" stroke="#3ec1ff" stroke-width="4" stroke-linecap="round"/>';
    var sky = o.rain ? '#8a93ad' : '#bfe8ff';
    var cloud = '<path d="M40 70 Q40 46 66 48 Q74 26 102 32 Q126 18 142 40 Q172 40 168 66 Q168 80 150 80 L56 80 Q40 80 40 70Z" fill="#5b6378" ' + SW3 + '/>';
    return svg('0 0 200 200', '<rect x="10" y="10" width="180" height="180" rx="10" fill="#c9a86a" ' + SW + '/><rect x="24" y="24" width="152" height="152" fill="' + sky + '" ' + SW3 + '/>' +
      (o.rain ? cloud + drops + '<rect x="24" y="150" width="152" height="26" fill="#3ec1ff" opacity=".45"/>' : '<circle cx="100" cy="90" r="28" fill="#ffd23f" ' + SW3 + '/>') +
      '<path d="M100 24 L100 176 M24 100 L176 100" ' + SW + '/>');
  });

  add('c-sunglasses', function () {
    return svg('0 0 200 100', '<path d="M12 30 L188 30" ' + SW + '/><path d="M18 30 L90 30 L84 70 Q54 86 26 70Z" fill="#1c1640" ' + SW + '/><path d="M110 30 L182 30 L174 70 Q146 86 116 70Z" fill="#1c1640" ' + SW + '/>' +
      '<path d="M34 42 L52 42 M126 42 L144 42" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>');
  });

  add('c-sand', function () {
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#f3d998"/><path d="M10 20 l3 0 M40 60 l3 0 M70 30 l3 0 M80 80 l3 0 M25 85 l3 0 M55 15 l3 0" stroke="#c9a86a" stroke-width="2" stroke-linecap="round"/>', 'art fill-art');
  });

  add('c-sea', function () {
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#3ec1ff"/><path d="M0 30 Q12 24 25 30 T50 30 T75 30 T100 30 M0 65 Q12 59 25 65 T50 65 T75 65 T100 65" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>', 'art fill-art');
  });

  add('c-seaweed', function () {
    var d = 'M0 20';
    for (var i = 0; i < 20; i++) d += ' Q' + (i * 20 + 10) + ' ' + (i % 2 ? 6 : 34) + ' ' + (i * 20 + 20) + ' 20';
    var shells = '';
    for (var k = 0; k < 6; k++) shells += '<circle cx="' + (30 + k * 68) + '" cy="' + (k % 2 ? 28 : 12) + '" r="5" fill="#fff8dd" ' + SW3 + '/>';
    return svg('0 0 400 40', '<path d="' + d + '" fill="none" stroke="#2fae84" stroke-width="6" stroke-linecap="round"/>' + shells, 'art fill-art');
  });

  add('c-sandcastle', function (o) {
    if (o.washed) return svg('0 0 200 200', '<path d="M30 170 Q100 130 170 170Z" fill="#e8c77a" ' + SW + '/>');
    return svg('0 0 200 200', '<rect x="40" y="90" width="120" height="84" fill="#e8c77a" ' + SW + '/>' +
      '<path d="M30 90 L30 60 L48 60 L48 72 L62 72 L62 60 L80 60 L80 90Z M120 90 L120 60 L138 60 L138 72 L152 72 L152 60 L170 60 L170 90Z" fill="#e8c77a" ' + SW + '/>' +
      '<path d="M84 136 Q100 116 116 136 L116 174 L84 174Z" fill="#9a6b3f" ' + SW3 + '/><path d="M100 60 L100 20 L130 30 L100 40" fill="#e5243b" ' + SW3 + '/>');
  });

  add('c-rockpool', function () {
    return svg('0 0 200 120', '<path d="M10 70 Q20 20 80 24 Q150 10 186 54 Q196 100 140 108 Q60 116 20 100Z" fill="#8a86a8" ' + SW + '/>' +
      '<ellipse cx="100" cy="66" rx="64" ry="28" fill="#3ec1ff" ' + SW3 + '/><path d="M80 66 l10 -8 l10 8 l10 -8" fill="none" stroke="#e5243b" stroke-width="5" stroke-linecap="round"/>');
  });

  var HUT = ['#e5243b', '#3ec1ff', '#ffd23f', '#2bc46f', '#ff8c1a', '#9b5de5', '#ff6f91'];
  add('c-beachhut', function (o) {
    var c = HUT[(o.color || 0) % HUT.length];
    var stripes = '';
    for (var i = 0; i < 5; i++) stripes += '<rect x="' + (26 + i * 32) + '" y="112" width="14" height="276" fill="#fff" opacity=".55"/>';
    // Huts render ~66 px wide (0.33 px per unit), so outlines are 10 units (3.3 px rendered), not SW.
    var W = 'stroke="' + INK + '" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"';
    var num = o.num ? '<circle cx="100" cy="176" r="46" fill="#fff" ' + W + '/>' + txt(100, 198, 64, o.num) : '<circle cx="100" cy="176" r="46" fill="#fff" opacity=".35" stroke="' + INK + '" stroke-width="8" stroke-dasharray="14 12"/>';
    return svg('0 0 200 400', '<rect x="20" y="104" width="160" height="286" fill="' + c + '" ' + W + '/>' + stripes +
      '<path d="M6 112 L100 14 L194 112Z" fill="#fff8dd" ' + W + '/>' + num +
      '<rect x="56" y="250" width="88" height="140" fill="' + (o.open ? '#1c1640' : c) + '" ' + W + '/>' + (o.open ? '' : '<circle cx="130" cy="320" r="7" fill="' + INK + '"/>'));
  });

  add('c-seagull', function (o) {
    return svg('0 0 200 200', '<rect x="86" y="150" width="28" height="46" fill="#9a6b3f" ' + SW3 + '/>' +
      '<path d="M40 110 Q60 70 110 76 Q150 80 170 120 Q140 150 80 146 Q44 142 40 110Z" fill="#fff" ' + SW + '/>' +
      '<path d="M120 90 Q150 60 140 40 Q120 30 106 46 Q96 64 100 82" fill="#fff" ' + SW + '/>' +
      '<path d="M138 46 L172 54 L140 60Z" fill="#ffb020" ' + SW3 + '/><circle cx="124" cy="48" r="5" fill="' + INK + '"/>' +
      '<path d="M114 40 L134 44" ' + SW + '/><path d="M60 110 Q90 96 130 116" fill="none" stroke="#a8a3b8" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M96 146 L96 156 M112 146 L112 156" stroke="#ffb020" stroke-width="6"/>' + (o.happy ? '' : ''));
  });

  add('c-chips', function () {
    var chips = '';
    for (var i = 0; i < 7; i++) chips += '<rect x="' + (52 + i * 14) + '" y="' + (26 + (i % 3) * 10) + '" width="12" height="60" rx="4" fill="#ffd23f" ' + SW3 + ' transform="rotate(' + (i * 7 - 20) + ' ' + (58 + i * 14) + ' 70)"/>';
    return svg('0 0 200 200', chips + '<path d="M40 70 L160 70 L134 186 L66 186Z" fill="#3ec1ff" ' + SW + '/><path d="M60 110 L140 110" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>');
  });

  add('c-parasol', function () {
    return svg('0 0 200 200', '<path d="M100 40 L100 196" ' + SW + '/><path d="M6 86 Q100 -10 194 86Z" fill="#ff8c1a" ' + SW + '/>' +
      '<path d="M100 86 Q80 40 100 14 Q120 40 100 86" fill="#fff8dd" ' + SW3 + '/><path d="M6 86 Q34 40 100 14 M194 86 Q166 40 100 14" fill="none" ' + SW3 + '/>' +
      '<ellipse cx="100" cy="190" rx="70" ry="8" fill="' + INK + '" opacity=".18"/>');
  });

  /* --------------------------------------------------------- streets + maps */
  add('c-road', function () {
    var z = '';
    for (var i = 0; i < 6; i++) z += '<rect x="' + (64 + i * 0) + '" y="' + (6 + i * 16) + '" width="72" height="9" fill="#fff"/>';
    return svg('0 0 200 100', '<rect width="200" height="100" fill="#58607e"/><path d="M0 50 L50 50 M150 50 L200 50" stroke="#ffd23f" stroke-width="3" stroke-dasharray="10 8"/>' + z, 'art fill-art');
  });

  add('c-trafficlight', function (o) {
    var p = o.phase || 'green';
    var r = p === 'red' || p === 'redamber' ? '#e5243b' : '#4a2030';
    var a = p === 'amber' || p === 'redamber' ? '#ffb020' : '#4a3a20';
    var g = p === 'green' ? '#2bf07f' : '#1f4030';
    return svg('0 0 100 260', '<rect x="44" y="196" width="12" height="62" fill="#4b4466" ' + SW3 + '/><rect x="14" y="6" width="72" height="196" rx="14" fill="#2d2850" ' + SW + '/>' +
      '<circle cx="50" cy="40" r="22" fill="' + r + '" ' + SW3 + '/><circle cx="50" cy="104" r="22" fill="' + a + '" ' + SW3 + '/><circle cx="50" cy="168" r="22" fill="' + g + '" ' + SW3 + '/>');
  });

  add('c-walklight', function (o) {
    var man = o.walk
      ? '<g fill="#2bf07f"><circle cx="54" cy="52" r="9"/><path d="M50 64 L42 92 L30 112 M48 80 L64 98 L66 114 M48 70 L34 82 M50 70 L66 74" stroke="#2bf07f" stroke-width="8" stroke-linecap="round" fill="none"/></g>'
      : '<g fill="#e5243b"><circle cx="50" cy="48" r="9"/><path d="M50 60 L50 92 M44 92 L44 116 M56 92 L56 116 M38 64 L38 88 M62 64 L62 88" stroke="#e5243b" stroke-width="8" stroke-linecap="round" fill="none"/></g>';
    return svg('0 0 100 140', '<rect x="8" y="8" width="84" height="124" rx="12" fill="#1c1640" ' + SW + '/>' + man);
  });

  add('c-compass', function (o) {
    var ang = { up: 0, right: 90, down: 180, left: 270 }[o.dir || 'up'];
    // The N sits upright on the north half of the needle, 32 units out from the pivot.
    var nx = Math.round(100 + 32 * Math.sin(ang * Math.PI / 180)), ny = Math.round(100 - 32 * Math.cos(ang * Math.PI / 180));
    return svg('0 0 200 200', '<circle cx="100" cy="100" r="90" fill="#d9a441" ' + SW + '/><circle cx="100" cy="100" r="72" fill="#fff8dd" ' + SW3 + '/>' +
      '<path d="M100 34 L100 44 M100 156 L100 166 M34 100 L44 100 M156 100 L166 100" ' + SW3 + '/>' +
      '<g transform="rotate(' + ang + ' 100 100)"><path d="M100 32 L124 100 L76 100Z" fill="#e5243b" ' + SW3 + '/><path d="M100 168 L124 100 L76 100Z" fill="#c3ccd8" ' + SW3 + '/>' +
      '</g><text x="' + nx + '" y="' + (ny + 10) + '" text-anchor="middle" font-size="28" font-weight="700" fill="' + INK + '">N</text>' +
      '<circle cx="100" cy="100" r="8" fill="' + INK + '"/>');
  });

  add('c-magnet', function () {
    return svg('0 0 200 200', '<path d="M40 30 L40 110 Q40 176 100 176 Q160 176 160 110 L160 30 L120 30 L120 110 Q120 136 100 136 Q80 136 80 110 L80 30Z" fill="#e5243b" ' + SW + '/>' +
      '<rect x="40" y="16" width="40" height="30" fill="#c3ccd8" ' + SW3 + '/><rect x="120" y="16" width="40" height="30" fill="#c3ccd8" ' + SW3 + '/>' +
      '<path d="M18 50 Q8 30 22 14 M182 50 Q192 30 178 14" fill="none" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/>');
  });

  add('c-oak', function () {
    return svg('0 0 200 200', '<path d="M84 196 L90 120 L110 120 L116 196Z" fill="#9a6b3f" ' + SW + '/>' +
      '<path d="M40 120 Q8 100 30 70 Q20 30 64 30 Q80 4 116 14 Q156 8 166 44 Q196 66 178 100 Q180 132 140 130 Q110 146 80 132 Q56 140 40 120Z" fill="#2fae84" ' + SW + '/>' +
      '<path d="M70 60 Q80 50 96 54" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>');
  });

  add('c-dig', function (o) {
    if (o.dug) return svg('0 0 200 140', '<ellipse cx="100" cy="80" rx="86" ry="46" fill="#9a6b3f" ' + SW + '/><ellipse cx="100" cy="84" rx="56" ry="26" fill="#3a2614"/>');
    return svg('0 0 200 140', '<ellipse cx="100" cy="80" rx="86" ry="46" fill="#a0784d" ' + SW + '/><path d="M70 64 Q100 50 130 64 M60 90 Q100 104 140 90" fill="none" stroke="' + INK + '" stroke-width="5" stroke-opacity=".35" stroke-linecap="round"/>');
  });

  add('c-backpack', function () {
    return svg('0 0 200 200', '<path d="M70 40 Q70 14 100 14 Q130 14 130 40" fill="none" ' + SW + '/><rect x="40" y="36" width="120" height="152" rx="34" fill="#2bc46f" ' + SW + '/>' +
      '<rect x="62" y="110" width="76" height="56" rx="12" fill="#1f9a57" ' + SW3 + '/><path d="M62 128 L138 128" ' + SW3 + '/><path d="M52 60 Q80 50 92 54" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>');
  });

  /** Fingerpost with four arms. labels = [up, right, down, left]. */
  add('c-signpost', function (o) {
    var L = o.labels || ['', '', '', ''];
    var arm = '#fff8dd';
    return svg('0 0 240 240', '<rect x="110" y="40" width="20" height="196" rx="5" fill="#9a6b3f" ' + SW + '/>' +
      '<path d="M70 50 L70 22 L120 4 L170 22 L170 50Z" fill="' + arm + '" ' + SW3 + '/>' + txt(120, 42, 19, L[0]) +
      '<path d="M134 74 L218 74 L234 94 L218 114 L134 114Z" fill="' + arm + '" ' + SW3 + '/>' + txt(182, 101, 19, L[1]) +
      '<path d="M70 138 L170 138 L170 166 L120 184 L70 166Z" fill="' + arm + '" ' + SW3 + '/>' + txt(120, 160, 19, L[2]) +
      '<path d="M106 74 L22 74 L6 94 L22 114 L106 114Z" fill="' + arm + '" ' + SW3 + '/>' + txt(58, 101, 19, L[3]));
  });

  add('c-footprints', function () {
    function shoe(x, y, r) { return '<g transform="rotate(' + r + ' ' + x + ' ' + y + ')"><ellipse cx="' + x + '" cy="' + y + '" rx="9" ry="15" fill="#9a6b3f" ' + SW3 + '/><ellipse cx="' + x + '" cy="' + (y + 22) + '" rx="7" ry="7" fill="#9a6b3f" ' + SW3 + '/></g>'; }
    return svg('0 0 100 200', shoe(36, 14, -8) + shoe(64, 60, 8) + shoe(36, 106, -8) + shoe(64, 152, 8));
  });

  add('c-town', function () {
    return svg('0 0 300 100', '<path d="M10 100 L10 50 L40 24 L70 50 L70 100Z" fill="#ff8c1a" ' + SW + '/><path d="M80 100 L80 40 L120 40 L120 100Z" fill="#7fb2ff" ' + SW + '/><path d="M74 42 L100 12 L126 42Z" fill="#e5243b" ' + SW3 + '/>' +
      '<path d="M140 100 L140 56 L200 56 L200 100Z" fill="#ffd23f" ' + SW + '/><path d="M134 58 L170 30 L206 58Z" fill="#9b5de5" ' + SW3 + '/><path d="M220 100 L220 30 L250 30 L250 100Z" fill="#c3ccd8" ' + SW + '/><path d="M214 32 L235 6 L256 32Z" fill="#2bc46f" ' + SW3 + '/>' +
      '<rect x="270" y="60" width="24" height="40" fill="#a8a3b8" ' + SW3 + '/>');
  });

  /** Seaside panorama, 500 units wide. c = view centre, z = zoom (1 or 2). card = postcard border. */
  add('c-panorama', function (o) {
    var z = o.z || 1, w = 200 / z, h = 140 / z, x = (o.c || 100) - w / 2, y = 140 - h;
    var scene = '<rect x="-20" y="0" width="540" height="90" fill="#bfe8ff"/><rect x="-20" y="86" width="540" height="60" fill="#3ec1ff"/>' +
      '<circle cx="40" cy="30" r="16" fill="#ffd23f" ' + SW3 + '/>' +
      // palm at 130
      '<path d="M128 140 Q124 100 132 66" fill="none" stroke="#9a6b3f" stroke-width="8"/><path d="M132 66 Q110 54 96 66 M132 66 Q150 50 168 62 M132 66 Q120 44 108 40 M132 66 Q148 42 160 40" fill="none" stroke="#2fae84" stroke-width="7" stroke-linecap="round"/>' +
      // lighthouse at 250
      '<path d="M236 140 L242 50 L258 50 L264 140Z" fill="#fff" ' + SW3 + '/><path d="M240 76 L260 76 L261 92 L239 92Z M238 108 L262 108 L263 124 L237 124Z" fill="#e5243b"/><rect x="238" y="36" width="24" height="16" fill="#ffd23f" ' + SW3 + '/><path d="M234 36 L250 22 L266 36Z" fill="#e5243b" ' + SW3 + '/>' +
      // boat at 292
      '<path d="M276 112 L310 112 L304 122 L282 122Z" fill="#9a6b3f" stroke="' + INK + '" stroke-width="2"/><path d="M292 110 L292 82 L308 108Z" fill="#fff" stroke="' + INK + '" stroke-width="2"/>' +
      // rock + kiosk
      '<path d="M360 140 Q370 104 400 108 Q426 112 430 140Z" fill="#8a86a8" ' + SW3 + '/><rect x="450" y="96" width="40" height="44" fill="#ff6f91" ' + SW3 + '/><path d="M446 98 L470 80 L494 98Z" fill="#fff" ' + SW3 + '/>' +
      '<rect x="-20" y="132" width="540" height="10" fill="#f3d998"/>';
    var frame = o.card ? '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="none" stroke="#fff" stroke-width="' + (8 / z) + '"/>' : '';
    return '<svg class="art" style="overflow:hidden" viewBox="' + x + ' ' + y + ' ' + w + ' ' + h + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + scene + frame +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="none" stroke="' + INK + '" stroke-width="' + (6 / z) + '"/></svg>';
  });

  /* ------------------------------------------------------------- travel */
  add('c-suitcase', function (o) {
    var body = o.color || '#2d2850';
    var ribbon = o.ribbon ? '<path d="M78 54 Q70 30 90 34 Q100 44 100 54 Q100 44 110 34 Q130 30 122 54" fill="' + o.ribbon + '" ' + SW3 + '/>' : '';
    var star = o.star ? '<path d="M140 100 l7 14 15 2 -11 10 3 15 -14 -7 -14 7 3 -15 -11 -10 15 -2z" fill="#ffd23f" ' + SW3 + '/>' : '';
    var stripe = o.stripe ? '<rect x="22" y="112" width="156" height="14" fill="' + o.stripe + '"/>' : '';
    return svg('0 0 200 200', '<path d="M76 56 L76 36 Q76 26 86 26 L114 26 Q124 26 124 36 L124 56" fill="none" ' + SW + '/>' +
      '<rect x="20" y="54" width="160" height="128" rx="18" fill="' + body + '" ' + SW + '/>' + stripe + '<path d="M60 60 L60 176 M140 60 L140 176" stroke="' + INK + '" stroke-width="3" stroke-opacity=".25"/>' + ribbon + star +
      '<circle cx="46" cy="188" r="8" fill="' + INK + '"/><circle cx="154" cy="188" r="8" fill="' + INK + '"/>');
  });

  add('c-belt', function () {
    var d = '';
    for (var i = 0; i < 12; i++) d += '<path d="M' + (i * 18) + ' 4 L' + (i * 18) + ' 36" stroke="#2d2850" stroke-width="2"/>';
    return svg('0 0 200 40', '<rect width="200" height="40" fill="#8a86a8"/>' + d + '<path d="M0 2 L200 2 M0 38 L200 38" stroke="#2d2850" stroke-width="4"/>', 'art fill-art');
  });

  add('c-openbag', function (o) {
    var n = Math.max(0, Math.min(12, o.fill === undefined ? 12 : o.fill));
    if (o.closed) {
      return svg('0 0 240 180', '<rect x="20" y="40" width="200" height="120" rx="20" fill="#3ec1ff" ' + SW + '/><path d="M20 98 L220 98" stroke="#ffd23f" stroke-width="6"/>' +
        '<path d="M96 40 L96 20 L144 20 L144 40" fill="none" ' + SW + '/><rect x="196" y="90" width="16" height="16" rx="3" fill="#c3ccd8" ' + SW3 + '/>');
    }
    var cols = ['#e5243b', '#ffd23f', '#2bc46f', '#ff6f91', '#9b5de5', '#ff8c1a'];
    var clothes = '';
    for (var i = 0; i < n; i++) clothes += '<rect x="' + (34 + (i % 4) * 44) + '" y="' + (86 - Math.floor(i / 4) * 22) + '" width="40" height="26" rx="8" fill="' + cols[i % cols.length] + '" ' + SW3 + ' transform="rotate(' + ((i * 37) % 30 - 15) + ' ' + (54 + (i % 4) * 44) + ' ' + (99 - Math.floor(i / 4) * 22) + ')"/>';
    return svg('0 0 240 180', '<path d="M20 100 L20 70 Q60 ' + (40 - n * 2) + ' 120 ' + (60 - n * 3) + ' Q180 ' + (40 - n * 2) + ' 220 70 L220 100" fill="#7fd6ff" ' + SW + '/>' + clothes +
      '<rect x="20" y="100" width="200" height="66" rx="16" fill="#3ec1ff" ' + SW + '/><path d="M20 104 L220 104" stroke="#ffd23f" stroke-width="6"/>');
  });

  add('c-plane', function () {
    return svg('0 0 200 120', '<path d="M10 64 Q20 50 60 50 L160 50 Q190 52 192 64 Q190 76 160 78 L60 78 Q20 78 10 64Z" fill="#fff" ' + SW + '/>' +
      '<path d="M90 52 L60 10 L80 10 L124 52Z M90 76 L60 112 L80 112 L124 76Z" fill="#c3ccd8" ' + SW3 + '/><path d="M24 54 L12 24 L28 24 L44 52" fill="#e5243b" ' + SW3 + '/>' +
      '<circle cx="150" cy="62" r="5" fill="#3ec1ff"/><circle cx="134" cy="62" r="5" fill="#3ec1ff"/><circle cx="118" cy="62" r="5" fill="#3ec1ff"/>');
  });

  add('c-train', function (o) {
    var c = o.color || '#2bc46f';
    var wins = '';
    for (var i = 0; i < 4; i++) wins += '<rect x="' + (40 + i * 52) + '" y="30" width="34" height="28" rx="6" fill="#cfefff" ' + SW3 + '/>';
    var foam = o.foam ? '<circle cx="60" cy="40" r="26" fill="#fff" ' + SW3 + '/><circle cx="120" cy="30" r="30" fill="#fff" ' + SW3 + '/><circle cx="190" cy="40" r="24" fill="#fff" ' + SW3 + '/>' : '';
    return svg('0 0 260 110', '<rect x="10" y="14" width="240" height="72" rx="20" fill="' + c + '" ' + SW + '/>' + wins + '<path d="M10 70 L250 70" stroke="#fff" stroke-width="6"/>' +
      '<circle cx="54" cy="94" r="12" fill="' + INK + '"/><circle cx="206" cy="94" r="12" fill="' + INK + '"/>' + foam);
  });

  /* ------------------------------------------------------------- camping */
  add('c-tent', function (o) {
    return svg('0 0 200 180', '<path d="M100 14 L190 170 L10 170Z" fill="#ff8c1a" ' + SW + '/><path d="M100 14 L100 170" ' + SW3 + '/>' +
      '<path d="M100 70 L74 170 L126 170Z" fill="' + (o.sleeping ? '#1c1640' : '#7a3c0c') + '" ' + SW3 + '/>' + (o.sleeping ? '<text x="140" y="50" font-size="26" fill="' + INK + '">z z</text>' : '') +
      '<path d="M100 14 L100 2" ' + SW + '/>');
  });

  add('c-bearbox', function (o) {
    var n = o.count || 0, dots = '';
    for (var i = 0; i < n; i++) dots += '<circle cx="' + (64 + i * 36) + '" cy="58" r="10" fill="#ffd23f" ' + SW3 + '/>';
    return svg('0 0 200 160', '<rect x="14" y="40" width="172" height="110" rx="10" fill="#58607e" ' + SW + '/><rect x="10" y="26" width="180" height="26" rx="6" fill="#4b4466" ' + SW + '/>' +
      '<rect x="80" y="84" width="40" height="30" rx="5" fill="#c3ccd8" ' + SW3 + '/><path d="M88 84 L88 74 Q100 62 112 74 L112 84" fill="none" ' + SW3 + '/>' + dots);
  });

  add('c-toothpaste', function () {
    return svg('0 0 200 120', '<path d="M30 30 L150 20 L150 100 L30 90 Q16 60 30 30Z" fill="#fff" ' + SW + '/><rect x="150" y="40" width="28" height="40" rx="5" fill="#3ec1ff" ' + SW3 + '/>' +
      '<path d="M50 50 L130 46 M50 70 L130 72" stroke="#e5243b" stroke-width="7" stroke-linecap="round"/>');
  });

  add('c-soap', function () {
    return svg('0 0 200 140', '<rect x="30" y="40" width="140" height="80" rx="30" fill="#ff9ecb" ' + SW + '/><circle cx="60" cy="30" r="12" fill="#fff" ' + SW3 + '/><circle cx="88" cy="18" r="8" fill="#fff" ' + SW3 + '/><circle cx="150" cy="26" r="10" fill="#fff" ' + SW3 + '/>' +
      '<path d="M54 64 Q90 52 130 62" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/>');
  });

  add('c-torch', function (o) {
    // 2.4.1: one torch in the game (bible §15); the camping torch keeps its yellow lens.
    if (A.hasObject('b-torch')) return A.object('b-torch', { on: o.on, lens: true });
    return svg('0 0 200 120', '<rect x="20" y="40" width="110" height="40" rx="10" fill="#2f6fe4" ' + SW + '/><path d="M130 30 L170 18 L170 102 L130 90Z" fill="#c3ccd8" ' + SW + '/><ellipse cx="170" cy="60" rx="8" ry="40" fill="#ffd23f" ' + SW3 + '/>' +
      '<rect x="60" y="50" width="20" height="20" rx="4" fill="#e5243b" ' + SW3 + '/>');
  });

  add('c-bear', function () {
    return svg('0 0 200 200', '<circle cx="56" cy="50" r="22" fill="#9a6b3f" ' + SW + '/><circle cx="144" cy="50" r="22" fill="#9a6b3f" ' + SW + '/>' +
      '<circle cx="100" cy="104" r="74" fill="#9a6b3f" ' + SW + '/><ellipse cx="100" cy="132" rx="36" ry="28" fill="#e0b98c" ' + SW3 + '/>' +
      '<circle cx="74" cy="92" r="8" fill="' + INK + '"/><circle cx="126" cy="92" r="8" fill="' + INK + '"/><ellipse cx="100" cy="120" rx="12" ry="8" fill="' + INK + '"/><path d="M88 144 Q100 152 112 144" fill="none" ' + SW3 + '/>');
  });

  add('c-bush', function () {
    return svg('0 0 200 140', '<path d="M10 136 Q0 90 40 84 Q40 40 84 46 Q100 10 136 38 Q186 34 180 84 Q200 100 190 136Z" fill="#2fae84" ' + SW + '/>');
  });

  add('c-pond', function () {
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#2f9acf"/><path d="M0 25 Q12 20 25 25 T50 25 T75 25 T100 25 M0 55 Q12 50 25 55 T50 55 T75 55 T100 55 M0 85 Q12 80 25 85 T50 85 T75 85 T100 85" fill="none" stroke="#fff" stroke-width="1.5" opacity=".55"/>', 'art fill-art');
  });

  add('c-canoe', function (o) {
    var a = o.angle || 0;
    return svg('0 0 200 200', '<g transform="rotate(' + a + ' 100 100)"><path d="M100 6 Q150 60 140 150 Q130 190 100 196 Q70 190 60 150 Q50 60 100 6Z" fill="#e5243b" ' + SW + '/>' +
      '<path d="M100 30 Q130 70 124 150 Q118 176 100 180 Q82 176 76 150 Q70 70 100 30Z" fill="#9a2a1a"/><rect x="72" y="96" width="56" height="10" fill="#c9a86a" ' + SW3 + '/>' +
      '<circle cx="100" cy="122" r="16" fill="#ffd23f" ' + SW3 + '/></g>');
  });

  add('c-jetty', function () {
    var p = '';
    for (var i = 0; i < 8; i++) p += '<path d="M' + (14 + i * 24) + ' 10 L' + (14 + i * 24) + ' 60" stroke="' + INK + '" stroke-width="3"/>';
    return svg('0 0 200 80', '<rect x="4" y="8" width="192" height="54" fill="#c9a86a" ' + SW + '/>' + p + '<rect x="16" y="60" width="12" height="18" fill="#9a6b3f" ' + SW3 + '/><rect x="172" y="60" width="12" height="18" fill="#9a6b3f" ' + SW3 + '/>');
  });

  add('c-campfire', function (o) {
    var st = o.state || 'lit';
    var logs = '<path d="M30 170 L170 130 M30 130 L170 170" stroke="#9a6b3f" stroke-width="22" stroke-linecap="round"/><path d="M30 170 L170 130 M30 130 L170 170" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" opacity=".5"/>';
    var stones = '';
    for (var i = 0; i < 7; i++) stones += '<ellipse cx="' + (20 + i * 27) + '" cy="182" rx="15" ry="10" fill="#a8a3b8" ' + SW3 + '/>';
    var top = '';
    if (st === 'lit' || st === 'big') {
      var s = st === 'big' ? 1.35 : 1;
      top = '<g transform="translate(100 150) scale(' + s + ') translate(-100 -150)"><path d="M100 20 Q150 80 140 120 Q134 150 100 152 Q66 150 60 120 Q50 80 100 20Z" fill="#ff8c1a" ' + SW + '/><path d="M100 70 Q126 104 120 126 Q114 144 100 144 Q86 144 80 126 Q76 104 100 70Z" fill="#ffd23f"/></g>';
    } else if (st === 'smoke') {
      top = '<path d="M100 120 Q80 100 100 80 Q120 60 100 40 Q84 24 100 8" fill="none" stroke="#a8a3b8" stroke-width="12" stroke-linecap="round"/><circle cx="80" cy="140" r="6" fill="#e5243b"/><circle cx="120" cy="136" r="5" fill="#ff8c1a"/>';
    } else if (st === 'cold') {
      top = '<path d="M60 150 Q100 136 140 150" fill="none" stroke="#58607e" stroke-width="10" stroke-linecap="round"/>';
    }
    return svg('0 0 200 200', logs + stones + top);
  });

  add('c-stick', function () {
    return svg('0 0 200 80', '<path d="M10 60 L190 20" stroke="#9a6b3f" stroke-width="14" stroke-linecap="round"/><path d="M120 36 L136 12" stroke="#9a6b3f" stroke-width="8" stroke-linecap="round"/><path d="M10 60 L190 20" ' + SW3 + ' opacity=".4"/>');
  });

  add('c-radio', function (o) {
    var notes = o.on ? '<path d="M150 30 L150 6 L166 2 L166 24" fill="none" ' + SW3 + '/><circle cx="145" cy="30" r="6" fill="' + INK + '"/><circle cx="161" cy="25" r="6" fill="' + INK + '"/>' +
      '<path d="M30 40 L30 16" ' + SW3 + '/><circle cx="25" cy="40" r="6" fill="' + INK + '"/>' : '';
    return svg('0 0 200 160', '<path d="M60 50 L120 14" ' + SW + '/><rect x="16" y="50" width="168" height="100" rx="18" fill="#ff8c1a" ' + SW + '/>' +
      '<circle cx="64" cy="100" r="30" fill="#4b4466" ' + SW3 + '/><circle cx="64" cy="100" r="10" fill="#c3ccd8"/>' +
      '<rect x="110" y="72" width="56" height="22" rx="4" fill="' + (o.on ? '#7dffb2' : '#2d2850') + '" ' + SW3 + '/><circle cx="124" cy="122" r="9" fill="#ffd23f" ' + SW3 + '/><circle cx="152" cy="122" r="9" fill="#ffd23f" ' + SW3 + '/>' + notes);
  });

  add('c-float', function (o) {
    if (o.under) {
      return svg('0 0 120 120', '<ellipse cx="60" cy="70" rx="50" ry="16" fill="none" stroke="#fff" stroke-width="5"/><ellipse cx="60" cy="70" rx="28" ry="8" fill="none" stroke="#fff" stroke-width="4"/>' +
        '<path d="M60 20 L60 60" stroke="' + INK + '" stroke-width="3"/><path d="M48 64 Q60 52 72 64" fill="none" stroke="#e5243b" stroke-width="5"/>');
    }
    return svg('0 0 120 120', '<path d="M60 4 L60 30" stroke="' + INK + '" stroke-width="3"/><path d="M60 26 Q84 50 60 74 Q36 50 60 26Z" fill="#e5243b" ' + SW3 + '/>' +
      '<path d="M60 74 Q76 92 60 108 Q44 92 60 74Z" fill="#fff" ' + SW3 + '/><ellipse cx="60" cy="88" rx="44" ry="10" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>');
  });

  add('c-snow', function () {
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#f5fbff"/><circle cx="12" cy="20" r="1.5" fill="#c3ccd8"/><circle cx="60" cy="10" r="1.5" fill="#c3ccd8"/><circle cx="85" cy="60" r="1.5" fill="#c3ccd8"/><circle cx="30" cy="80" r="1.5" fill="#c3ccd8"/><circle cx="50" cy="50" r="1.5" fill="#c3ccd8"/>', 'art fill-art');
  });

  add('c-lodge', function () {
    return svg('0 0 200 170', '<rect x="30" y="70" width="140" height="94" fill="#9a6b3f" ' + SW + '/><path d="M14 76 L100 10 L186 76Z" fill="#fff" ' + SW + '/>' +
      '<path d="M30 96 L170 96 M30 122 L170 122 M30 146 L170 146" stroke="' + INK + '" stroke-width="4" stroke-opacity=".35"/><rect x="86" y="112" width="30" height="52" fill="#4b4466" ' + SW3 + '/>' +
      '<rect x="44" y="104" width="28" height="24" fill="#ffd23f" ' + SW3 + '/><rect x="130" y="104" width="28" height="24" fill="#ffd23f" ' + SW3 + '/><rect x="134" y="20" width="18" height="40" fill="#a8a3b8" ' + SW3 + '/>');
  });

  add('c-kennel', function () {
    return svg('0 0 200 170', '<rect x="40" y="70" width="120" height="94" fill="#e5243b" ' + SW + '/><path d="M24 80 L100 14 L176 80Z" fill="#fff" ' + SW + '/>' +
      '<path d="M76 164 L76 120 Q100 92 124 120 L124 164Z" fill="#1c1640" ' + SW3 + '/><ellipse cx="100" cy="164" rx="40" ry="6" fill="#c3ccd8"/>');
  });

  add('c-icepond', function () {
    return svg('0 0 200 120', '<ellipse cx="100" cy="66" rx="92" ry="48" fill="#cfefff" ' + SW + '/><path d="M60 50 L90 70 L80 92 M90 70 L130 60 L150 80 M130 60 L140 40" fill="none" stroke="#2f6fe4" stroke-width="4" stroke-linecap="round"/>');
  });

  /** Three crossing trails of footprints. */
  add('c-tracks', function () {
    var big = 'M26 96 C 30 60, 150 74, 120 44 S 150 10, 158 0';
    var paw = 'M92 96 C 176 78, 6 56, 92 34 S 104 10, 92 0';
    var small = 'M158 96 C 120 70, 56 84, 70 52 S 8 30, 26 0';
    return svg('0 0 184 96',
      '<path d="' + big + '" fill="none" stroke="' + INK + '" stroke-width="9" stroke-dasharray="13 5" stroke-dashoffset="1"/>' +
      '<path d="' + big + '" fill="none" stroke="#7f8db0" stroke-width="7" stroke-dasharray="11 7"/>' +
      '<path d="' + paw + '" fill="none" stroke="' + INK + '" stroke-width="8" stroke-linecap="round" stroke-dasharray="0.1 9"/>' +
      '<path d="' + paw + '" fill="none" stroke="#b07a4a" stroke-width="6" stroke-linecap="round" stroke-dasharray="0.1 9"/>' +
      '<path d="' + small + '" fill="none" stroke="' + INK + '" stroke-width="5.5" stroke-dasharray="6 3" stroke-dashoffset="1"/>' +
      '<path d="' + small + '" fill="none" stroke="#4b4466" stroke-width="3.5" stroke-dasharray="4 5"/>', 'art fill-art');
  });

  /* ------------------------------------------------- balloons, gardens, post */
  add('c-balloon', function () {
    return svg('0 0 200 220', '<path d="M100 8 Q180 8 180 84 Q180 126 124 156 L76 156 Q20 126 20 84 Q20 8 100 8Z" fill="#e5243b" ' + SW + '/>' +
      '<path d="M100 8 Q140 60 124 156 M100 8 Q60 60 76 156" fill="none" stroke="#ffd23f" stroke-width="12"/><path d="M100 8 Q140 60 124 156 M100 8 Q60 60 76 156" fill="none" ' + SW3 + '/>' +
      '<path d="M78 156 L84 184 M122 156 L116 184" ' + SW3 + '/><rect x="76" y="182" width="48" height="32" rx="5" fill="#c9a86a" ' + SW + '/>');
  });

  /** Wind flag on a pole; dir 'left' | 'right' | 'none'. */
  add('c-flag', function (o) {
    var d = o.dir || 'none';
    var flag = d === 'right' ? '<path d="M20 20 Q60 10 100 24 Q140 36 180 26 L180 66 Q140 76 100 64 Q60 52 20 62Z" fill="#ffd23f" ' + SW + '/>'
      : d === 'left' ? '<path d="M180 20 Q140 10 100 24 Q60 36 20 26 L20 66 Q60 76 100 64 Q140 52 180 62Z" fill="#7fb2ff" ' + SW + '/>'
        : '<path d="M100 20 Q110 50 96 80 Q90 60 100 20Z" fill="#c3ccd8" ' + SW3 + '/>';
    var pole = d === 'left' ? '<path d="M182 10 L182 90" ' + SW + '/>' : '<path d="M18 10 L18 90" ' + SW + '/>';
    if (d === 'none') pole = '<path d="M100 10 L100 90" ' + SW + '/>';
    return svg('0 0 200 90', pole + flag);
  });

  add('c-hill', function () {
    return svg('0 0 200 120', '<path d="M0 120 Q30 40 100 30 Q170 40 200 120Z" fill="#2fae84" ' + SW + '/><path d="M100 30 L100 4 L126 12 L100 20" fill="#e5243b" ' + SW3 + '/>' +
      '<rect x="80" y="64" width="40" height="28" fill="#fff" ' + SW3 + '/><path d="M86 72 L114 72 M86 80 L106 80" stroke="' + INK + '" stroke-width="3"/>');
  });

  /** Snowman. hat: 'top'|'bobble', scarf: 'red'|'blue'|'stripes', nose: 'carrot'|'cone'. */
  add('c-snowman', function (o) {
    var hat = o.hat === 'top' ? '<rect x="78" y="14" width="44" height="40" fill="' + INK + '"/><rect x="66" y="50" width="68" height="10" rx="3" fill="' + INK + '"/>'
      : o.hat === 'bobble' ? '<path d="M72 58 Q72 22 100 22 Q128 22 128 58Z" fill="#2bc46f" ' + SW3 + '/><circle cx="100" cy="18" r="10" fill="#ffd23f" ' + SW3 + '/>' : '';
    var sc = o.scarf === 'red' ? '#e5243b' : o.scarf === 'blue' ? '#2f6fe4' : o.scarf === 'stripes' ? '#ff8c1a' : null;
    var scarf = sc ? '<rect x="66" y="94" width="68" height="14" rx="6" fill="' + sc + '" ' + SW3 + '/><rect x="112" y="100" width="14" height="40" rx="5" fill="' + sc + '" ' + SW3 + '/>' +
      (o.scarf === 'stripes' ? '<path d="M80 96 L80 106 M96 96 L96 106 M112 96 L112 106" stroke="#fff" stroke-width="5"/>' : '') : '';
    var nose = o.nose === 'carrot' ? '<path d="M100 72 L134 78 L100 84Z" fill="#ff8c1a" ' + SW3 + '/>' : o.nose === 'cone' ? '<ellipse cx="108" cy="78" rx="12" ry="8" fill="#9a6b3f" ' + SW3 + '/>' : '';
    return svg('0 0 200 200', '<circle cx="100" cy="148" r="44" fill="#fff" ' + SW + '/><circle cx="100" cy="76" r="30" fill="#fff" ' + SW + '/>' +
      '<circle cx="90" cy="70" r="4" fill="' + INK + '"/><circle cx="112" cy="70" r="4" fill="' + INK + '"/><circle cx="100" cy="136" r="4" fill="' + INK + '"/><circle cx="100" cy="156" r="4" fill="' + INK + '"/>' +
      hat + scarf + nose);
  });

  add('c-lonegate', function (o) {
    var bars = '';
    for (var i = 0; i < 6; i++) bars += '<rect x="' + (48 + i * 20) + '" y="50" width="10" height="120" rx="3" fill="#fff8dd" ' + SW3 + '/>';
    return svg('0 0 240 200', '<rect x="22" y="30" width="20" height="160" rx="4" fill="#9a6b3f" ' + SW + '/><rect x="198" y="30" width="20" height="160" rx="4" fill="#9a6b3f" ' + SW + '/>' +
      bars + '<rect x="44" y="64" width="152" height="12" fill="#fff8dd" ' + SW3 + '/><rect x="44" y="140" width="152" height="12" fill="#fff8dd" ' + SW3 + '/>' +
      '<rect x="166" y="94" width="26" height="26" rx="4" fill="#d9a441" ' + SW3 + '/><path d="M172 94 L172 84 Q179 74 186 84 L186 94" fill="none" ' + SW3 + '/>' +
      (o.climbing ? '' : ''));
  });

  add('c-gnome', function (o) {
    var c = o.color || '#e5243b';
    return svg('0 0 120 200', '<path d="M60 6 L94 80 L26 80Z" fill="' + c + '" ' + SW + '/><circle cx="60" cy="92" r="20" fill="#ffd9b8" ' + SW3 + '/>' +
      '<path d="M36 100 Q60 150 84 100 Q72 110 60 108 Q48 110 36 100Z" fill="#fff" ' + SW3 + '/><circle cx="60" cy="96" r="5" fill="#ff6f91"/>' +
      '<rect x="30" y="120" width="60" height="58" rx="14" fill="#2f6fe4" ' + SW + '/><rect x="32" y="176" width="22" height="14" rx="4" fill="#9a6b3f" ' + SW3 + '/><rect x="66" y="176" width="22" height="14" rx="4" fill="#9a6b3f" ' + SW3 + '/>' +
      (o.sign ? '<rect x="56" y="104" width="62" height="42" rx="5" fill="#fff8dd" ' + SW3 + '/>' + txt(87, 134, 24, 'HI!') : ''));
  });

  add('c-grass', function () {
    var t = '';
    for (var i = 0; i < 10; i++) t += '<path d="M' + (8 + i * 19) + ' 70 l6 -18 l6 18" fill="none" stroke="#2fae84" stroke-width="3" stroke-linecap="round"/>';
    return svg('0 0 200 80', '<rect x="0" y="40" width="200" height="40" rx="10" fill="#5fd98a" ' + SW3 + '/>' + t);
  });

  add('c-meadow', function () {
    return svg('0 0 100 40', '<rect width="100" height="40" fill="#5fd98a"/><path d="M0 1 L100 1" stroke="#2fae84" stroke-width="2"/><path d="M8 14 l2 -6 l2 6 M30 26 l2 -6 l2 6 M52 12 l2 -6 l2 6 M74 28 l2 -6 l2 6 M90 16 l2 -6 l2 6" fill="none" stroke="#2fae84" stroke-width="1.2"/>', 'art fill-art');
  });

  add('c-postcard', function (o) {
    var stamp = o.stamped ? '<rect x="160" y="14" width="42" height="48" fill="#ff6f91" ' + SW3 + '/><circle cx="181" cy="38" r="10" fill="#ffd23f"/>' : '<rect x="160" y="14" width="42" height="48" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="6 5"/>';
    return svg('0 0 220 140', '<rect x="6" y="6" width="208" height="128" rx="6" fill="#fff8dd" ' + SW + '/><path d="M110 18 L110 124" stroke="#c9a86a" stroke-width="3"/>' + stamp +
      '<path d="M20 34 L96 34 M20 54 L90 54 M20 74 L96 74" stroke="#9a6b3f" stroke-width="4" stroke-linecap="round"/>' +
      '<text x="120" y="84" font-size="14" fill="' + INK + '">Gran Olga</text><text x="120" y="102" font-size="14" fill="' + INK + '">Fjordvik</text><text x="120" y="122" font-size="16" fill="#e5243b">NORWAY</text>');
  });

  add('c-stamp', function () {
    // Perforated edge: walk the square clockwise; each 7-unit arc with sweep 0 bites inwards.
    var d = 'M10 10', k, c;
    for (k = 0; k < 6; k++) { c = 20 + k * 32; d += ' L' + (c - 7) + ' 10 A7 7 0 0 0 ' + (c + 7) + ' 10'; }
    d += ' L190 10';
    for (k = 0; k < 6; k++) { c = 20 + k * 32; d += ' L190 ' + (c - 7) + ' A7 7 0 0 0 190 ' + (c + 7); }
    d += ' L190 190';
    for (k = 5; k >= 0; k--) { c = 20 + k * 32; d += ' L' + (c + 7) + ' 190 A7 7 0 0 0 ' + (c - 7) + ' 190'; }
    d += ' L10 190';
    for (k = 5; k >= 0; k--) { c = 20 + k * 32; d += ' L10 ' + (c + 7) + ' A7 7 0 0 0 10 ' + (c - 7); }
    d += 'Z';
    return svg('0 0 200 200', '<path d="' + d + '" fill="#ff6f91" ' + SW3 + '/><rect x="32" y="32" width="136" height="136" rx="4" fill="#cfefff" ' + SW3 + '/>' +
      '<circle cx="100" cy="94" r="34" fill="#ffd23f" ' + SW3 + '/><path d="M32 134 Q50 122 66 134 T100 134 T134 134 T168 134 L168 168 L32 168Z" fill="#3ec1ff" ' + SW3 + '/>');
  });

  add('c-postbox', function () {
    return svg('0 0 200 240', '<rect x="30" y="40" width="140" height="190" rx="10" fill="#e5243b" ' + SW + '/><path d="M24 44 Q100 -14 176 44Z" fill="#e5243b" ' + SW + '/>' +
      '<rect x="56" y="150" width="88" height="56" rx="6" fill="#e5243b" ' + SW3 + '/><rect x="70" y="164" width="60" height="8" rx="3" fill="' + INK + '"/>');
  });
})(typeof window !== 'undefined' ? window : globalThis);
