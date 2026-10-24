/* OBEY? LOL. — art pack H: castle and fairy tale (levels 173–192, King Bossworth's castle).
 * Original code-drawn SVG in the house style: chunky shapes, ink outlines, flat fills, one highlight.
 * No characters from existing stories: generic guards, a dragon, a statue, a talking door. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY && OBEY.art;
  if (!A || !A.addObject) return; // loaded before art.js (level lab double-load): skip quietly
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function add(k, f) { A.addObject(k, f); }
  function hi(d) { return '<path d="' + d + '" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>'; }
  function hair(d) { return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-opacity=".35" stroke-width="2"/>'; }
  var STONE = '#c3ccd8', STONE2 = '#8a86a8', WOOD = '#a0784d', WOOD2 = '#b88d5f', GOLD = '#ffd23f';

  /* ------------------------------------------------------------- moat and gate */
  add('h-gatehouse', function (o) {
    var mouth, D = 'M62 256 L62 170 Q100 128 138 170 L138 256 Z';
    if (o.open) mouth = '<path d="' + D + '" fill="#1c1640" ' + SW + '/><path d="M74 256 Q100 200 126 256 Z" fill="#fff6a8" opacity=".55"/>';
    else if (o.portcullis) {
      mouth = '<path d="' + D + '" fill="#1c1640" ' + SW + '/>';
      for (var i = 0; i < 4; i++) mouth += '<path d="M' + (74 + i * 17) + ' 150 L' + (74 + i * 17) + ' 256" stroke="#4b4466" stroke-width="7"/>';
      mouth += '<path d="M62 190 L138 190 M62 222 L138 222" stroke="#4b4466" stroke-width="7"/><path d="' + D + '" fill="none" ' + SW + '/>';
    } else {
      mouth = '<path d="' + D + '" fill="' + WOOD + '" ' + SW + '/>' + hair('M81 146 L81 256 M100 140 L100 256 M119 146 L119 256') +
        '<circle cx="124" cy="210" r="6" fill="' + GOLD + '" ' + SW3 + '/>';
    }
    return svg('0 0 200 260',
      '<rect x="20" y="40" width="160" height="216" fill="' + STONE + '" ' + SW + '/>' +
      '<path d="M20 40 L20 16 L44 16 L44 30 L68 30 L68 16 L92 16 L92 30 L108 30 L108 16 L132 16 L132 30 L156 30 L156 16 L180 16 L180 40" fill="' + STONE + '" ' + SW + '/>' +
      '<rect x="88" y="66" width="24" height="40" rx="12" fill="#1c1640" ' + SW3 + '/>' +
      hair('M20 76 L80 76 M120 76 L180 76 M20 120 L62 120 M138 120 L180 120 M20 164 L62 164 M138 164 L180 164 M20 208 L62 208 M138 208 L180 208 M40 40 L40 76 M160 76 L160 120 M44 120 L44 164 M156 164 L156 208 M40 208 L40 256') +
      mouth + hi('M30 50 L30 100'));
  });

  add('h-bridge', function (o) {
    var st = o.state || 'up';
    var deg = st === 'down' ? 0 : (st === 'half' ? 45 : 90);
    var tip = st === 'down' ? [6, 186] : (st === 'half' ? [61, 56] : [186, 6]);
    return svg('0 0 200 200', '<path d="M' + tip[0] + ' ' + tip[1] + ' L200 ' + (st === 'down' ? 120 : 0) + '" stroke="#4b4466" stroke-width="5" stroke-dasharray="7 4"/>' +
      '<g transform="rotate(' + deg + ' 190 190)"><rect x="4" y="176" width="192" height="20" rx="4" fill="' + WOOD + '" ' + SW + '/>' + hair('M44 176 L44 196 M84 176 L84 196 M124 176 L124 196 M164 176 L164 196') + hi('M14 182 L60 182') + '</g>');
  });

  add('h-basket', function (o) {
    var n = o.n || 0, rocks = '';
    var pos = [[70, 116], [112, 116], [150, 118], [50, 118], [92, 98], [130, 98]];
    for (var i = 0; i < Math.min(n, pos.length); i++) rocks += '<ellipse cx="' + pos[i][0] + '" cy="' + pos[i][1] + '" rx="22" ry="15" fill="' + STONE2 + '" ' + SW3 + '/>';
    return svg('0 0 200 200', '<path d="M100 0 L100 100" stroke="#4b4466" stroke-width="6" stroke-dasharray="8 4"/>' +
      '<path d="M100 100 L40 124 M100 100 L160 124" ' + SW3 + '/>' + rocks +
      '<path d="M36 124 L164 124 L150 190 L50 190 Z" fill="' + WOOD2 + '" ' + SW + '/>' + hair('M46 146 L154 146 M50 168 L150 168 M80 124 L84 190 M120 124 L116 190'));
  });

  add('h-rock', function () {
    return svg('0 0 100 80', '<path d="M12 64 Q4 30 34 18 Q60 6 82 24 Q98 40 88 64 Z" fill="' + STONE2 + '" ' + SW + '/>' + hi('M30 32 Q42 24 54 24'));
  });

  add('h-guard', function (o) {
    var flip = o.side === 'right' ? ' transform="translate(200 0) scale(-1 1)"' : '';
    var march = o.pose === 'march';
    var pike = march ? '<path d="M150 14 L150 196" stroke="' + WOOD + '" stroke-width="9"/><path d="M150 14 L150 196" fill="none" ' + SW3 + ' stroke-opacity=".6"/><path d="M140 30 L150 4 L160 30 Z" fill="' + STONE + '" ' + SW3 + '/>'
      : '<path d="M120 196 L196 40" stroke="' + WOOD + '" stroke-width="9"/><path d="M188 32 L204 18 L196 48 Z" fill="' + STONE + '" ' + SW3 + '/>';
    return svg('0 0 200 200', '<g' + flip + '>' + pike +
      '<rect x="62" y="78" width="76" height="96" rx="18" fill="#e5243b" ' + SW + '/>' +
      '<path d="M100 100 L112 122 L100 144 L88 122 Z" fill="' + GOLD + '" ' + SW3 + '/>' +
      '<path d="M76 174 L76 196 M124 174 L124 196" ' + SW + '/>' +
      '<circle cx="100" cy="56" r="26" fill="#ffe066" ' + SW + '/>' +
      '<path d="M72 50 Q100 14 128 50 Z" fill="' + STONE + '" ' + SW + '/>' +
      (o.asleep ? '<path d="M88 60 L96 60 M104 60 L112 60" ' + SW3 + '/>' : '<circle cx="92" cy="60" r="4" fill="' + INK + '"/><circle cx="110" cy="60" r="4" fill="' + INK + '"/>') +
      '<path d="M92 72 L110 72" ' + SW3 + '/>' + hi('M70 92 L70 130') + '</g>');
  });

  /* visitor (the player), with a hat slot and a tool slot */
  function hat(k) {
    switch (k) {
      case 'cap': return '<path d="M60 52 Q100 18 140 52 Z" fill="#3a86ff" ' + SW + '/><path d="M128 52 L168 56 L132 62 Z" fill="#2f6fe4" ' + SW3 + '/>';
      case 'chef': return '<rect x="66" y="40" width="68" height="20" rx="4" fill="#fffdf6" ' + SW + '/><path d="M66 42 Q50 8 80 14 Q96 -6 114 12 Q146 6 134 42 Z" fill="#fffdf6" ' + SW + '/>';
      case 'crown': return '<path d="M64 54 L64 22 L80 38 L100 14 L120 38 L136 22 L136 54 Z" fill="' + GOLD + '" ' + SW + '/><circle cx="100" cy="42" r="6" fill="#e5243b" ' + SW3 + '/>';
      case 'feather': return '<path d="M62 54 Q100 30 138 54 Z" fill="#9b5de5" ' + SW + '/><path d="M120 44 Q150 0 170 10 Q150 30 128 48" fill="#ff77b4" ' + SW3 + '/>';
    }
    return '<path d="M100 54 L100 34" ' + SW3 + '/><circle cx="100" cy="30" r="7" fill="#e5243b" ' + SW3 + '/>';
  }
  function tool(k) {
    switch (k) {
      case 'wrench': return '<path d="M150 150 L176 96" stroke="#8a86a8" stroke-width="12" stroke-linecap="round"/><path d="M168 82 Q186 76 190 96 L180 96 L176 106 Q160 98 168 82 Z" fill="' + STONE + '" ' + SW3 + '/>';
      case 'broom': return '<path d="M156 160 L172 40" stroke="' + WOOD + '" stroke-width="9" stroke-linecap="round"/><path d="M146 196 L152 156 L178 160 L180 196 Z" fill="#f5b400" ' + SW3 + '/>';
      case 'crown': return '<path d="M150 150 L150 124 L162 136 L174 118 L186 136 L196 124 L196 150 Z" fill="' + GOLD + '" ' + SW3 + '/>';
    }
    return '';
  }
  add('h-visitor', function (o) {
    if (o.kneel) {
      return svg('0 0 200 200', '<ellipse cx="100" cy="182" rx="74" ry="14" fill="#e5243b" ' + SW + '/>' +
        '<rect x="56" y="96" width="88" height="76" rx="26" fill="#ffd23f" ' + SW + '/>' +
        '<path d="M70 122 Q80 132 90 122 M110 122 Q120 132 130 122" fill="none" ' + SW3 + '/>' +
        (o.knighted ? '<path d="M86 96 L114 96 L110 84 L100 92 L90 84 Z" fill="#c3ccd8" ' + SW3 + '/>' : '<path d="M100 96 L100 78" ' + SW3 + '/><circle cx="100" cy="74" r="7" fill="#e5243b" ' + SW3 + '/>') +
        hi('M66 110 L66 140'));
    }
    return svg('0 0 200 200', (o.cushion ? '<ellipse cx="100" cy="184" rx="74" ry="12" fill="#e5243b" ' + SW + '/>' : '') + tool(o.tool) +
      '<rect x="56" y="52" width="88" height="110" rx="28" fill="#ffd23f" ' + SW + '/>' +
      '<circle cx="84" cy="92" r="7" fill="' + INK + '"/><circle cx="116" cy="92" r="7" fill="' + INK + '"/><path d="M86 120 Q100 130 114 120" fill="none" ' + SW3 + '/>' +
      '<path d="M80 162 L80 194 M120 162 L120 194" ' + SW + '/>' + hat(o.hat) + hi('M66 70 L66 110'));
  });

  add('h-cap', function () { return svg('0 0 200 120', '<path d="M30 90 Q100 0 170 90 Z" fill="#3a86ff" ' + SW + '/><path d="M150 88 L196 96 L150 104 Z" fill="#2f6fe4" ' + SW3 + '/><circle cx="100" cy="40" r="7" fill="#2f6fe4" ' + SW3 + '/>' + hi('M58 70 Q70 46 90 38')); });
  add('h-chefhat', function () { return svg('0 0 200 160', '<rect x="46" y="110" width="108" height="36" rx="6" fill="#fffdf6" ' + SW + '/><path d="M46 112 Q14 40 66 46 Q80 4 112 22 Q160 4 160 50 Q186 70 154 112 Z" fill="#fffdf6" ' + SW + '/>' + hair('M80 112 L80 146 M120 112 L120 146')); });
  add('h-crown', function (o) {
    return svg('0 0 200 140', '<path d="M30 124 L22 30 L66 76 L100 14 L134 76 L178 30 L170 124 Z" fill="' + (o.paper ? '#ffe066' : GOLD) + '" ' + SW + '/>' +
      '<rect x="30" y="104" width="140" height="22" rx="4" fill="#f5b400" ' + SW3 + '/>' +
      '<circle cx="100" cy="80" r="11" fill="#e5243b" ' + SW3 + '/><circle cx="60" cy="96" r="7" fill="#3a86ff" ' + SW3 + '/><circle cx="140" cy="96" r="7" fill="#2bc46f" ' + SW3 + '/>' + hi('M40 50 L46 96'));
  });

  add('h-bellrope', function (o) {
    var c = o.swing ? 44 : 30;
    return svg('0 0 60 300', '<path d="M30 0 Q' + c + ' 120 30 250" fill="none" stroke="#e5243b" stroke-width="10" stroke-linecap="round"/><path d="M30 0 Q' + c + ' 120 30 250" fill="none" ' + SW3 + ' stroke-opacity=".5"/>' +
      '<path d="M16 296 L22 252 L38 252 L44 296 Z" fill="' + GOLD + '" ' + SW3 + '/><circle cx="30" cy="252" r="9" fill="#f5b400" ' + SW3 + '/>');
  });

  add('h-bell', function (o) {
    return svg('0 0 200 200', '<rect x="20" y="10" width="160" height="16" rx="6" fill="' + WOOD + '" ' + SW + '/>' +
      '<g' + (o.ringing ? ' transform="rotate(-14 100 26)"' : '') + '><path d="M50 150 Q50 40 100 36 Q150 40 150 150 L164 166 L36 166 Z" fill="' + GOLD + '" ' + SW + '/><circle cx="100" cy="178" r="12" fill="#f5b400" ' + SW3 + '/>' + hi('M70 70 Q66 100 66 130') + '</g>' +
      (o.ringing ? '<path d="M18 120 L4 116 M18 140 L2 146 M182 120 L196 116 M182 140 L198 146" ' + SW + '/>' : ''));
  });

  add('h-coins', function () {
    return svg('0 0 200 120', '<path d="M30 110 Q20 40 100 30 Q180 40 170 110 Z" fill="#9b5de5" ' + SW + '/><path d="M70 36 Q100 10 130 36" fill="none" ' + SW3 + '/>' +
      '<ellipse cx="70" cy="34" rx="16" ry="8" fill="' + GOLD + '" ' + SW3 + '/><ellipse cx="128" cy="30" rx="16" ry="8" fill="' + GOLD + '" ' + SW3 + '/>' + hi('M46 70 Q48 54 60 46'));
  });

  /* ------------------------------------------------------------- catapult and post */
  function load(k) {
    switch (k) {
      case 'letter': return '<rect x="20" y="34" width="44" height="30" rx="3" fill="#fffdf6" ' + SW3 + '/><path d="M20 36 L42 52 L64 36" fill="none" ' + SW3 + '/>';
      case 'rock': return '<path d="M22 64 Q16 38 40 32 Q62 30 64 52 Q64 66 52 66 Z" fill="' + STONE2 + '" ' + SW3 + '/>';
      case 'you': return '<rect x="24" y="22" width="36" height="42" rx="12" fill="#ffd23f" ' + SW3 + '/><circle cx="36" cy="38" r="3" fill="' + INK + '"/><circle cx="48" cy="38" r="3" fill="' + INK + '"/>';
    }
    return '';
  }
  add('h-catapult', function (o) {
    return svg('0 0 200 200',
      '<path d="M30 70 L150 150" stroke="' + WOOD + '" stroke-width="12" stroke-linecap="round"/><path d="M30 70 L150 150" fill="none" ' + SW3 + ' stroke-opacity=".4"/>' +
      '<path d="M14 66 Q40 82 66 66 L60 52 L20 52 Z" fill="' + WOOD2 + '" ' + SW3 + '/>' + load(o.load) +
      '<path d="M100 170 L130 104 L160 170" fill="none" stroke="' + WOOD + '" stroke-width="12" stroke-linejoin="round"/><path d="M100 170 L130 104 L160 170" fill="none" ' + SW3 + ' stroke-opacity=".4"/>' +
      '<rect x="20" y="166" width="170" height="16" rx="6" fill="' + WOOD + '" ' + SW + '/>' +
      '<circle cx="48" cy="184" r="12" fill="#4b4466" ' + SW3 + '/><circle cx="162" cy="184" r="12" fill="#4b4466" ' + SW3 + '/><circle cx="130" cy="110" r="7" fill="' + STONE + '" ' + SW3 + '/>');
  });

  add('h-window', function (o) {
    var who = '';
    if (o.porter) who = '<circle cx="100" cy="118" r="30" fill="#ffe066" ' + SW + '/><path d="M70 104 Q100 70 130 104 Z" fill="#2fae84" ' + SW3 + '/>' +
      (o.porter === 'happy' ? '<path d="M86 118 Q90 112 94 118 M106 118 Q110 112 114 118" fill="none" ' + SW3 + '/><path d="M88 132 Q100 142 112 132" fill="none" ' + SW3 + '/>'
        : '<circle cx="90" cy="118" r="4" fill="' + INK + '"/><circle cx="110" cy="118" r="4" fill="' + INK + '"/><path d="M92 134 L108 134" ' + SW3 + '/>') +
      (o.letter ? '<rect x="112" y="128" width="36" height="24" rx="3" fill="#fffdf6" ' + SW3 + '/><path d="M112 130 L130 142 L148 130" fill="none" ' + SW3 + '/>' : '');
    return svg('0 0 200 200', '<rect x="16" y="16" width="168" height="176" fill="' + STONE + '" ' + SW + '/>' + hair('M16 60 L52 60 M148 60 L184 60 M16 110 L52 110 M148 110 L184 110 M16 160 L52 160 M148 160 L184 160') +
      '<path d="M54 170 L54 86 Q100 34 146 86 L146 170 Z" fill="#1c1640" ' + SW + '/>' + who +
      '<rect x="44" y="168" width="112" height="14" rx="4" fill="' + STONE2 + '" ' + SW3 + '/>');
  });

  add('h-letter', function () {
    return svg('0 0 200 140', '<rect x="16" y="20" width="168" height="104" rx="8" fill="#fffdf6" ' + SW + '/><path d="M16 26 L100 84 L184 26" fill="none" ' + SW + '/><circle cx="100" cy="84" r="14" fill="#e5243b" ' + SW3 + '/>' + hi('M30 110 L80 110'));
  });

  /* ------------------------------------------------------------- throne room */
  add('h-throne', function (o) {
    return svg('0 0 200 200', '<path d="M40 196 L40 40 Q100 -6 160 40 L160 196" fill="#e5243b" ' + SW + '/>' +
      '<path d="M60 40 L70 20 L84 34 L100 12 L116 34 L130 20 L140 40" fill="' + GOLD + '" ' + SW3 + '/>' +
      '<rect x="28" y="120" width="144" height="34" rx="10" fill="#9b5de5" ' + SW + '/>' +
      '<rect x="20" y="96" width="24" height="100" rx="8" fill="' + GOLD + '" ' + SW3 + '/><rect x="156" y="96" width="24" height="100" rx="8" fill="' + GOLD + '" ' + SW3 + '/>' +
      (o.crayon ? '<path d="M64 70 Q100 50 136 74" fill="none" stroke="#2f6fe4" stroke-width="6" stroke-linecap="round"/><path d="M70 92 L130 86" stroke="#2f6fe4" stroke-width="6" stroke-linecap="round"/>' : '') +
      hi('M54 56 L54 110'));
  });

  add('h-bossportrait', function (o) {
    // 2.4.1 SHOULD 7 (bible §15): redirect to the canonical drawing; the code below is the fallback.
    if (A.hasObject('a-portrait')) return A.object('a-portrait', { costume: 'royal', bg: '#7fb2ff', frame: '#f5b400', scorched: o.scorched });
    var face = o.scorched
      ? '<circle cx="100" cy="112" r="50" fill="#4b4466" ' + SW + '/><circle cx="82" cy="106" r="8" fill="#fffdf6" ' + SW3 + '/><circle cx="118" cy="106" r="8" fill="#fffdf6" ' + SW3 + '/><path d="M86 136 Q100 128 114 136" fill="none" stroke="#fffdf6" stroke-width="4"/><path d="M70 60 Q80 40 76 30 M100 58 Q110 40 104 26 M128 60 Q138 44 132 32" fill="none" stroke="#8a86a8" stroke-width="5" stroke-linecap="round"/>'
      : '<circle cx="100" cy="112" r="50" fill="#ff9f43" ' + SW + '/><circle cx="82" cy="106" r="7" fill="' + INK + '"/><circle cx="118" cy="106" r="7" fill="' + INK + '"/><path d="M70 94 L92 92 M108 92 L130 94" ' + SW + '/><path d="M86 134 Q100 144 114 134" fill="none" ' + SW3 + '/>' +
        '<path d="M66 70 L66 44 L82 58 L100 36 L118 58 L134 44 L134 70 Z" fill="' + GOLD + '" ' + SW3 + '/>';
    return svg('0 0 200 200', '<rect x="14" y="10" width="172" height="180" rx="10" fill="' + (o.scorched ? '#2d2850' : '#f5b400') + '" ' + SW + '/><rect x="30" y="26" width="140" height="148" rx="6" fill="' + (o.scorched ? '#4b4466' : '#7fb2ff') + '" ' + SW3 + '/>' + face);
  });

  add('h-seal', function (o) {
    var L = OBEY.util.escape(o.letter || 'B');
    var face = '<text x="100" y="156" text-anchor="middle" font-family="Bagel Fat One, Atkinson Hyperlegible, sans-serif" font-size="64" fill="' + INK + '">' + L + '</text>';
    if (o.mirror) face = '<g transform="translate(200 0) scale(-1 1)">' + face + '</g>';
    var seal = '<rect x="80" y="8" width="40" height="56" rx="16" fill="' + WOOD + '" ' + SW + '/><path d="M70 64 L130 64 L136 88 L64 88 Z" fill="#4b4466" ' + SW3 + '/>' +
      '<circle cx="100" cy="136" r="54" fill="#e5243b" ' + SW + '/><circle cx="100" cy="136" r="44" fill="#ff6f91" ' + SW3 + '/>' + face + hi('M88 16 L88 44');
    if (!o.cased) return svg('0 0 200 200', seal);
    // o.cased (2.4.1): a glass case on a wall shelf with brackets, for a seal on display (L178).
    return svg('0 0 200 200', '<rect x="28" y="4" width="144" height="170" rx="10" fill="#e3f7fc"/>' +
      '<g transform="translate(100 92) scale(.74) translate(-100 -100)">' + seal + '</g>' +
      '<rect x="28" y="4" width="144" height="170" rx="10" fill="none" ' + SW + '/>' + hi('M44 20 L44 60') +
      '<rect x="16" y="172" width="168" height="14" rx="5" fill="' + WOOD + '" ' + SW + '/><path d="M40 186 L40 198 L56 186 M160 186 L160 198 L144 186" fill="' + WOOD2 + '" ' + SW3 + '/>');
  });

  add('h-decree', function (o) {
    var mark = '';
    if (o.mark) {
      var t = '<text x="100" y="176" text-anchor="middle" font-family="Bagel Fat One, Atkinson Hyperlegible, sans-serif" font-size="40" fill="#fffdf6">' + OBEY.util.escape(o.mark) + '</text>';
      if (o.mirror) t = '<g transform="translate(200 0) scale(-1 1)">' + t + '</g>';
      mark = '<circle cx="100" cy="162" r="26" fill="#e5243b" ' + SW3 + '/>' + t;
    }
    // o.hung (default on): a cord from the rod to a wall nail, so the letter does not float mid-wall.
    var cord = o.hung === false ? '' : '<path d="M46 16 L100 -2 L154 16" fill="none" ' + SW3 + '/><circle cx="100" cy="-2" r="5" fill="#4b4466" ' + SW3 + '/>';
    return svg(o.hung === false ? '0 0 200 200' : '0 -9 200 209', cord + '<rect x="30" y="20" width="140" height="170" rx="6" fill="#fff8dd" ' + SW + '/><rect x="22" y="10" width="156" height="20" rx="10" fill="#ffe066" ' + SW3 + '/>' +
      hair('M50 52 L150 52 M50 72 L150 72 M50 92 L150 92 M50 112 L130 112') + mark);
  });

  add('h-armour', function (o) {
    var a = o.sword === 'left' ? -70 : (o.sword === 'right' ? 70 : 0);
    return svg('0 0 200 200', '<g transform="rotate(' + a + ' 100 96)"><rect x="94" y="0" width="12" height="90" rx="4" fill="' + STONE + '" ' + SW3 + '/><rect x="76" y="84" width="48" height="10" rx="4" fill="' + GOLD + '" ' + SW3 + '/><rect x="94" y="94" width="12" height="22" rx="4" fill="' + WOOD + '" ' + SW3 + '/></g>' +
      '<rect x="66" y="106" width="68" height="70" rx="16" fill="' + STONE + '" ' + SW + '/><path d="M80 176 L80 196 M120 176 L120 196" ' + SW + '/>' +
      '<path d="M76 108 L76 76 Q100 50 124 76 L124 108 Z" fill="' + STONE + '" ' + SW + '/><path d="M82 86 L118 86" ' + SW3 + '/><path d="M100 56 Q112 40 128 46 Q114 50 108 60" fill="#e5243b" ' + SW3 + '/>' + hi('M76 118 L76 150'));
  });

  add('h-bar', function (o) {
    if (o.eaten) return svg('0 0 60 200', '<path d="M10 192 L18 186 L24 192 L34 184 L42 192 L50 188" fill="none" stroke="#c98b4a" stroke-width="6" stroke-linecap="round"/>');
    if (o.type === 'bread') {
      return svg('0 0 60 200', '<rect x="16" y="4" width="28" height="192" rx="14" fill="#ffe066" ' + SW + '/>' +
        '<path d="M20 30 Q30 24 40 30 M20 70 Q30 64 40 70 M20 110 Q30 104 40 110 M20 150 Q30 144 40 150" fill="none" stroke="#c98b4a" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="26" cy="48" r="2.5" fill="' + INK + '"/><circle cx="36" cy="92" r="2.5" fill="' + INK + '"/><circle cx="27" cy="128" r="2.5" fill="' + INK + '"/><circle cx="35" cy="172" r="2.5" fill="' + INK + '"/>');
    }
    return svg('0 0 60 200', '<rect x="20" y="4" width="20" height="192" rx="4" fill="#4b4466" ' + SW + '/><circle cx="30" cy="40" r="4" fill="' + STONE2 + '"/><circle cx="30" cy="160" r="4" fill="' + STONE2 + '"/>' + hi('M26 60 L26 140'));
  });

  add('h-jar', function (o) {
    // 2.4.1 SHOULD 7 (bible §15): redirect to the canonical drawing; the code below is the fallback.
    if (A.hasObject('b-jar')) return A.object('b-jar', { fill: o.color || '#ff6f91', lid: '#fffdf6', label: true });
    var c = o.color || '#ff6f91';
    return svg('0 0 120 160', '<rect x="20" y="40" width="80" height="112" rx="14" fill="' + c + '" ' + SW + '/><rect x="26" y="20" width="68" height="24" rx="6" fill="#fffdf6" ' + SW3 + '/><rect x="36" y="80" width="48" height="34" rx="4" fill="#fffdf6" ' + SW3 + '/>' + hi('M34 56 L34 140'));
  });

  add('h-dragon', function (o) {
    var mood = o.mood || 'asleep', body = '#2fae84', belly = '#5fd98a';
    var eyes;
    if (mood === 'asleep') eyes = '<path d="M140 74 Q148 80 156 74" fill="none" ' + SW3 + '/>';
    else if (mood === 'grumpy') eyes = '<circle cx="148" cy="74" r="6" fill="' + INK + '"/><path d="M136 62 L158 70" ' + SW + '/>';
    else if (mood === 'droopy') eyes = '<path d="M138 70 L158 70" ' + SW + '/><path d="M140 72 Q148 80 156 72" fill="#fffdf6" ' + SW3 + '/><circle cx="148" cy="75" r="3" fill="' + INK + '"/>';
    else eyes = '<circle cx="148" cy="74" r="8" fill="#fffdf6" ' + SW3 + '/><circle cx="150" cy="75" r="4" fill="' + INK + '"/>';
    var extra = '';
    var zz = '';
    if (mood === 'asleep') { // 2.4.1: drawn as paths (was a Bagel <text>); placed after the flip so a left-facing dragon's z never mirrors
      var zx = function (x, s) { return o.face === 'left' ? 200 - x - s : x; };
      var z = function (x, y, s) { x = zx(x, s); return 'M' + x + ' ' + y + ' L' + (x + s) + ' ' + y + ' L' + x + ' ' + (y + s) + ' L' + (x + s) + ' ' + (y + s); };
      zz = '<path d="' + z(164, 26, 18) + ' ' + z(184, 6, 11) + '" fill="none" ' + SW + '/>';
    }
    if (mood === 'sneeze') extra = '<path d="M186 96 Q200 80 200 100 Q200 120 186 106 Z" fill="#ff9f43" ' + SW3 + '/><path d="M178 92 L196 76 M178 104 L198 116" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>';
    var inner = '<path d="M30 150 Q0 120 20 96 Q24 130 54 136" fill="' + body + '" ' + SW + '/>' +
      '<path d="M40 170 Q30 110 90 104 Q130 100 150 130 Q160 170 130 176 L60 176 Q42 176 40 170 Z" fill="' + body + '" ' + SW + '/>' +
      '<path d="M66 172 Q70 132 100 128 Q126 130 132 172" fill="' + belly + '" ' + SW3 + '/>' +
      '<path d="M76 104 L84 86 L94 102 L104 84 L112 102" fill="#e5243b" ' + SW3 + '/>' +
      '<path d="M120 116 Q118 72 140 58 Q170 48 184 74 Q192 96 170 100 Q150 102 140 120 Z" fill="' + body + '" ' + SW + '/>' +
      '<path d="M140 58 L136 40 L152 54" fill="' + belly + '" ' + SW3 + '/>' +
      '<circle cx="176" cy="84" r="3" fill="' + INK + '"/>' + eyes +
      '<path d="M60 176 L60 190 M120 176 L120 190" ' + SW + '/>' + hi('M70 116 Q60 130 58 150') + extra;
    if (o.face === 'left') inner = '<g transform="translate(200 0) scale(-1 1)">' + inner + '</g>';
    return svg('0 0 200 200', inner + zz);
  });

  add('h-oven', function (o) {
    var mouth = o.open
      ? '<path d="M56 186 L56 136 Q100 96 144 136 L144 186 Z" fill="#1c1640" ' + SW + '/>' + (o.lit ? '<path d="M70 186 Q74 150 88 160 Q92 128 102 150 Q110 124 118 156 Q128 146 130 186 Z" fill="#ff9f43" ' + SW3 + '/><path d="M86 186 Q92 168 100 174 Q108 164 114 186 Z" fill="#ffd23f"/>' : hair('M64 176 L136 176'))
      : '<path d="M56 186 L56 136 Q100 96 144 136 L144 186 Z" fill="' + WOOD + '" ' + SW + '/>' + hair('M78 120 L78 186 M100 112 L100 186 M122 120 L122 186') + '<circle cx="132" cy="160" r="6" fill="' + GOLD + '" ' + SW3 + '/>';
    return svg('0 0 200 200', '<path d="M14 190 L14 110 Q14 30 100 30 Q186 30 186 110 L186 190 Z" fill="' + STONE + '" ' + SW + '/>' +
      '<rect x="84" y="4" width="32" height="36" rx="4" fill="' + STONE2 + '" ' + SW3 + '/>' + hair('M30 90 L70 90 M130 90 L170 90 M24 130 L50 130 M150 130 L176 130') +
      mouth + hi('M34 80 Q40 60 56 50'));
  });

  add('h-pepper', function () {
    return svg('0 0 100 200', '<circle cx="50" cy="20" r="12" fill="#4b4466" ' + SW3 + '/><path d="M32 36 L68 36 L72 70 Q84 120 70 190 L30 190 Q16 120 28 70 Z" fill="#9a6b3f" ' + SW + '/>' +
      '<path d="M30 80 L70 80" ' + SW3 + '/>' + hi('M38 96 L36 160'));
  });

  add('h-cake', function (o) {
    var top = o.scorched ? '#4b4466' : '#ff77b4', mid = o.scorched ? '#2d2850' : '#fffdf6';
    return svg('0 0 200 200', '<rect x="20" y="130" width="160" height="56" rx="10" fill="' + mid + '" ' + SW + '/>' +
      '<rect x="44" y="84" width="112" height="50" rx="10" fill="' + top + '" ' + SW + '/>' +
      '<rect x="70" y="50" width="60" height="38" rx="8" fill="' + mid + '" ' + SW + '/>' +
      (o.scorched ? '<path d="M80 40 Q74 24 84 14 M110 40 Q116 22 106 10" fill="none" stroke="#8a86a8" stroke-width="5" stroke-linecap="round"/>' : '<rect x="96" y="28" width="8" height="22" fill="#3a86ff" ' + SW3 + '/><path d="M100 10 Q108 20 100 28 Q92 20 100 10 Z" fill="#ffd23f" ' + SW3 + '/>') +
      (o.scorched ? '' : hi('M32 144 L32 172')));
  });

  add('h-statue', function (o) {
    var m = o.mood || 'stern';
    var mouth = m === 'open' ? '<path d="M82 112 Q100 132 118 112 Z" fill="#4b4466" ' + SW3 + '/>' : (m === 'smile' ? '<path d="M82 110 Q100 126 118 110" fill="none" ' + SW + '/>' : '<path d="M84 114 L116 114" ' + SW + '/>');
    return svg('0 0 200 200', '<rect x="40" y="150" width="120" height="44" rx="6" fill="' + STONE2 + '" ' + SW + '/>' +
      '<path d="M50 150 Q50 128 100 126 Q150 128 150 150 Z" fill="' + STONE + '" ' + SW + '/>' +
      '<path d="M62 132 L62 60 Q62 18 100 18 Q138 18 138 60 L138 132 Z" fill="' + STONE + '" ' + SW + '/>' +
      '<path d="M70 70 L92 74 M108 74 L130 70" ' + SW + '/><circle cx="82" cy="84" r="6" fill="#4b4466"/><circle cx="118" cy="84" r="6" fill="#4b4466"/>' +
      '<path d="M100 84 L94 102 L104 102" fill="none" ' + SW3 + '/>' + mouth + hair('M66 40 Q74 50 70 62 M134 44 Q126 52 130 60') + hi('M74 30 Q70 40 70 52'));
  });

  add('h-talkdoor', function (o) {
    var m = o.mood || 'talk';
    if (m === 'open') return svg('0 0 160 200', '<path d="M12 196 L12 70 Q80 -6 148 70 L148 196 Z" fill="#1c1640" ' + SW + '/><path d="M24 190 Q50 150 80 160 Q110 150 136 190" fill="#fff6a8" opacity=".7"/>');
    var mouth = m === 'laugh' ? '<path d="M56 124 Q80 160 104 124 Z" fill="#7a1f3d" ' + SW3 + '/>' : (m === 'shut' ? '<path d="M60 128 L100 128" ' + SW + '/>' : '<ellipse cx="80" cy="128" rx="16" ry="11" fill="#7a1f3d" ' + SW3 + '/>');
    return svg('0 0 160 200', '<path d="M12 196 L12 70 Q80 -6 148 70 L148 196 Z" fill="' + WOOD + '" ' + SW + '/>' + hair('M46 40 L46 196 M80 30 L80 196 M114 40 L114 196') +
      '<circle cx="56" cy="92" r="12" fill="#fffdf6" ' + SW3 + '/><circle cx="104" cy="92" r="12" fill="#fffdf6" ' + SW3 + '/><circle cx="58" cy="94" r="5" fill="' + INK + '"/><circle cx="106" cy="94" r="5" fill="' + INK + '"/>' +
      mouth + '<circle cx="80" cy="166" r="12" fill="none" stroke="' + GOLD + '" stroke-width="6"/><circle cx="80" cy="166" r="12" fill="none" ' + SW3 + ' stroke-opacity=".6"/>');
  });

  // o.hook (default on): hangs by a cord from a wall peg (L185 "on a hook").
  add('h-horn', function (o) {
    var hook = o.hook === false ? '' : '<path d="M60 52 L84 9 L106 34" fill="none" ' + SW3 + '/>';
    var peg = o.hook === false ? '' : '<rect x="68" y="2" width="32" height="12" rx="5" fill="' + WOOD + '" ' + SW3 + '/><circle cx="84" cy="8" r="4" fill="#4b4466" ' + SW3 + '/>';
    return svg('0 0 200 120', hook + '<path d="M20 60 Q60 50 120 20 L140 30 L140 90 L120 100 Q60 70 20 66 Z" fill="' + GOLD + '" ' + SW + '/><ellipse cx="140" cy="60" rx="14" ry="32" fill="#f5b400" ' + SW + '/><rect x="8" y="54" width="16" height="16" rx="4" fill="#4b4466" ' + SW3 + '/>' + hi('M50 58 L100 38') + peg);
  });

  add('h-banner', function (o) {
    var c = o.color || '#9b5de5';
    return svg('0 0 100 200', '<rect x="4" y="6" width="92" height="10" rx="4" fill="' + WOOD + '" ' + SW3 + '/><path d="M14 16 L86 16 L86 186 L50 160 L14 186 Z" fill="' + c + '" ' + SW + '/>' +
      '<path d="M32 80 L32 54 L42 64 L50 46 L58 64 L68 54 L68 80 Z" fill="' + GOLD + '" ' + SW3 + '/>');
  });

  /* ------------------------------------------------------------- wizard's tower */
  add('h-hourglass', function (o) {
    if (o.broken) {
      return svg('0 0 140 200', '<rect x="14" y="174" width="112" height="16" rx="5" fill="' + WOOD + '" ' + SW + '/>' +
        '<path d="M10 172 Q70 140 130 172 Z" fill="#f3d998" ' + SW3 + '/><path d="M30 150 L40 136 L46 152 M88 146 L100 132 L104 150" fill="#cfefff" ' + SW3 + '/>');
    }
    var t = Math.max(0, Math.min(1, o.top || 0)), b = Math.max(0, Math.min(1, o.bottom || 0));
    var topY = 96 - t * 66; // sand surface in the top bulb (empty at 96)
    var botY = 168 - b * 62;
    return svg('0 0 140 200', '<defs><clipPath id="hgt"><path d="M30 24 L110 24 Q110 70 74 98 L66 98 Q30 70 30 24 Z"/></clipPath><clipPath id="hgb"><path d="M66 102 L74 102 Q110 130 110 172 L30 172 Q30 130 66 102 Z"/></clipPath></defs>' +
      (t > 0 ? '<rect x="20" y="' + topY + '" width="100" height="' + (100 - topY) + '" fill="#f3d998" clip-path="url(#hgt)"/>' : '') +
      (b > 0 ? '<rect x="20" y="' + botY + '" width="100" height="' + (176 - botY) + '" fill="#f3d998" clip-path="url(#hgb)"/>' : '') +
      (t > 0 ? '<path d="M70 98 L70 ' + Math.max(botY, 104) + '" stroke="#c98b4a" stroke-width="4"/>' : '') +
      '<path d="M30 24 L110 24 Q110 70 74 100 Q110 130 110 172 L30 172 Q30 130 66 100 Q30 70 30 24 Z" fill="#cfefff" fill-opacity=".35" ' + SW + '/>' +
      '<rect x="14" y="8" width="112" height="16" rx="5" fill="' + WOOD + '" ' + SW + '/><rect x="14" y="172" width="112" height="16" rx="5" fill="' + WOOD + '" ' + SW + '/>' +
      '<path d="M20 24 L20 172 M120 24 L120 172" stroke="' + WOOD + '" stroke-width="6"/>' + hi('M42 34 Q44 56 54 70'));
  });

  // o.hook (default on): a wall plate with a hook under the handle (L189 "on a hook").
  add('h-hammer', function (o) {
    // 2.4.1 SHOULD 7 (bible §15): redirect to the canonical drawing; the code below is the fallback.
    if (A.hasObject('hammer')) return A.object('hammer', { hook: o.hook !== false });
    var plate = o.hook === false ? '' : '<rect x="66" y="78" width="30" height="40" rx="7" fill="' + WOOD + '" ' + SW3 + '/>';
    var hook = o.hook === false ? '' : '<path d="M84 98 L108 112 Q118 116 120 104" fill="none" stroke="#4b4466" stroke-width="7" stroke-linecap="round"/><path d="M84 98 L108 112 Q118 116 120 104" fill="none" ' + SW3 + ' stroke-opacity=".6"/><circle cx="82" cy="98" r="5" fill="#4b4466" ' + SW3 + '/>';
    return svg('0 0 200 200', plate + '<path d="M60 180 L130 70" stroke="' + WOOD + '" stroke-width="16" stroke-linecap="round"/><path d="M60 180 L130 70" fill="none" ' + SW3 + ' stroke-opacity=".4"/>' +
      '<rect x="96" y="26" width="90" height="46" rx="8" fill="#8a86a8" transform="rotate(33 141 49)" ' + SW + '/>' + hi('M112 38 L150 62') + hook);
  });

  add('h-candle', function (o) {
    return svg('0 0 100 200', (o.lit ? '<path d="M50 14 Q66 36 58 52 Q50 60 42 52 Q34 36 50 14 Z" fill="#ff9f43" ' + SW3 + '/><path d="M50 30 Q56 40 53 48 Q50 52 47 48 Q44 40 50 30 Z" fill="#ffd23f"/>' : '<path d="M50 54 Q40 40 52 30 Q44 22 50 12" fill="none" stroke="#8a86a8" stroke-width="4" stroke-linecap="round"/>') +
      '<path d="M50 52 L50 66" ' + SW3 + '/><rect x="32" y="64" width="36" height="104" rx="6" fill="#fffdf6" ' + SW + '/><path d="M60 64 Q62 84 58 92" fill="none" stroke="#c3ccd8" stroke-width="5"/>' +
      '<path d="M12 184 Q12 166 50 166 Q88 166 88 184 Z" fill="' + GOLD + '" ' + SW + '/><rect x="10" y="182" width="80" height="10" rx="4" fill="#f5b400" ' + SW3 + '/>');
  });

  add('h-boot', function (o) {
    return svg('0 0 160 160', '<path d="M40 10 L96 10 L96 98 L140 112 Q156 120 150 146 L30 146 Q30 80 40 10 Z" fill="' + (o.color || '#9a6b3f') + '" ' + SW + '/>' +
      '<rect x="36" y="10" width="64" height="18" rx="5" fill="#4b4466" ' + SW3 + '/>' + (o.key ? '<circle cx="68" cy="10" r="9" fill="' + GOLD + '" ' + SW3 + '/>' : '') + hi('M50 36 L48 100'));
  });

  add('h-parchment', function (o) {
    var lines = o.revealed
      ? '<path d="M44 60 Q60 52 76 60 T108 60 T140 60 M44 86 Q60 78 76 86 T108 86" fill="none" stroke="#9a6b3f" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M104 110 L124 110 L124 136 L140 142 L140 152 L98 152 Z" fill="none" stroke="#9a6b3f" stroke-width="5" stroke-linejoin="round"/><path d="M60 140 L84 140 M76 132 L84 140 L76 148" fill="none" stroke="#9a6b3f" stroke-width="5" stroke-linecap="round"/>'
      : '';
    return svg('0 0 200 200', '<path d="M30 20 L170 20 L170 168 Q150 186 130 168 Q110 186 90 168 Q70 186 50 168 Q40 178 30 170 Z" fill="' + (o.revealed ? '#fff3c4' : '#fffdf6') + '" ' + SW + '/>' + lines + hi('M42 34 L90 34'));
  });

  add('h-spellbook', function (o) {
    return svg('0 0 200 140', '<path d="M100 30 Q60 10 14 22 L14 124 Q60 112 100 132 Q140 112 186 124 L186 22 Q140 10 100 30 Z" fill="#fff8dd" ' + SW + '/><path d="M100 30 L100 132" ' + SW3 + '/>' +
      hair('M30 44 Q60 38 86 48 M30 64 Q60 58 86 68 M30 84 Q60 78 86 88 M114 48 Q140 38 170 44 M114 68 Q140 58 170 64') +
      (o.glow ? '<path d="M140 80 l5 10 11 1 -8 7 2 11 -10 -6 -10 6 2 -11 -8 -7 11 -1z" fill="#ffd23f" ' + SW3 + '/>' : ''));
  });

  add('h-cauldron', function (o) {
    return svg('0 0 200 200', '<path d="M30 80 Q24 180 100 184 Q176 180 170 80 Z" fill="#2d2850" ' + SW + '/><ellipse cx="100" cy="80" rx="74" ry="18" fill="' + (o.color || '#5fd98a') + '" ' + SW + '/>' +
      '<circle cx="80" cy="60" r="10" fill="' + (o.color || '#5fd98a') + '" ' + SW3 + '/><circle cx="118" cy="50" r="7" fill="' + (o.color || '#5fd98a') + '" ' + SW3 + '/>' +
      '<path d="M54 184 L44 196 M146 184 L156 196" ' + SW + '/>' + hi('M48 104 Q50 140 66 160'));
  });

  add('h-owl', function (o) {
    return svg('0 0 160 200', '<rect x="10" y="176" width="140" height="14" rx="6" fill="' + WOOD + '" ' + SW3 + '/>' +
      '<path d="M40 176 Q20 120 40 70 L46 40 L64 60 L96 60 L114 40 L120 70 Q140 120 120 176 Z" fill="#9a6b3f" ' + SW + '/>' +
      '<path d="M56 176 Q50 130 80 120 Q110 130 104 176 Z" fill="#fff8dd" ' + SW3 + '/>' +
      (o.asleep ? '<path d="M50 88 Q62 96 74 88 M86 88 Q98 96 110 88" fill="none" ' + SW + '/>' : '<circle cx="62" cy="88" r="15" fill="#fffdf6" ' + SW3 + '/><circle cx="98" cy="88" r="15" fill="#fffdf6" ' + SW3 + '/><circle cx="62" cy="90" r="6" fill="' + INK + '"/><circle cx="98" cy="90" r="6" fill="' + INK + '"/>') +
      '<path d="M74 104 L80 116 L86 104 Z" fill="#f5b400" ' + SW3 + '/>');
  });

  // 2.4.1 follow-up (bible §15): one wall shelf in the game; the code below is the fallback.
  add('h-shelf', function () {
    if (A.hasObject('shelf')) return A.object('shelf', { deep: true });
    return svg('0 0 200 60', '<rect x="4" y="10" width="192" height="18" rx="5" fill="' + WOOD + '" ' + SW + '/><path d="M30 28 L44 52 M170 28 L156 52" ' + SW + '/>');
  });

  /* ------------------------------------------------------------- 2.4 batch H extras */
  add('h-flagstones', function () {
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#c3ccd8" fill-opacity=".45"/>' +
      '<path d="M0 25 L100 25 M0 50 L100 50 M0 75 L100 75 M20 0 L20 25 M60 0 L60 25 M40 25 L40 50 M85 25 L85 50 M15 50 L15 75 M55 50 L55 75 M35 75 L35 100 M75 75 L75 100" fill="none" stroke="' + INK + '" stroke-opacity=".25" stroke-width=".8"/>', 'art fill-art');
  });

  add('h-chesstile', function (o) {
    var occ = '';
    switch (o.occ) {
      case 'you': occ = '<rect x="32" y="26" width="36" height="46" rx="14" fill="#ffd23f" ' + SW3 + '/><circle cx="44" cy="44" r="4" fill="' + INK + '"/><circle cx="56" cy="44" r="4" fill="' + INK + '"/><path d="M50 26 L50 16" ' + SW3 + '/><circle cx="50" cy="14" r="4" fill="#e5243b"/>'; break;
      case 'guard': occ = '<path d="M26 80 L26 48 Q50 14 74 48 L74 80 Z" fill="' + STONE + '" ' + SW3 + '/><path d="M34 56 L66 56" ' + SW3 + '/>' + A.sleepZ([[64, 12, 14, SW3]]); break;
      case 'door': occ = '<path d="M28 86 L28 46 Q50 18 72 46 L72 86 Z" fill="' + WOOD + '" ' + SW3 + '/><circle cx="62" cy="62" r="4" fill="' + GOLD + '" ' + SW3 + '/>'; break;
    }
    return svg('0 0 100 100', '<rect x="3" y="3" width="94" height="94" rx="8" fill="' + (o.dark ? '#8a86a8' : '#fff8dd') + '" ' + SW3 + '/>' + occ);
  });

  add('h-cakecuts', function (o) {
    var v = o.v || 0, lines = '';
    var ang = [90, 0, 45, 135];
    for (var i = 0; i < Math.min(v, 4); i++) {
      var a = ang[i] * Math.PI / 180, dx = Math.cos(a) * 62, dy = Math.sin(a) * 62;
      lines += '<path d="M' + (100 - dx).toFixed(1) + ' ' + (72 - dy).toFixed(1) + ' L' + (100 + dx).toFixed(1) + ' ' + (72 + dy).toFixed(1) + '" ' + SW + '/>';
    }
    return svg('0 0 200 200', '<circle cx="100" cy="72" r="64" fill="#ff77b4" ' + SW + '/><circle cx="100" cy="72" r="50" fill="none" stroke="#fffdf6" stroke-width="6" stroke-dasharray="4 10"/>' + lines +
      '<rect x="36" y="148" width="128" height="44" rx="8" fill="#fffdf6" ' + SW + '/><rect x="36" y="148" width="128" height="14" rx="7" fill="#ff77b4" ' + SW3 + '/>' +
      '<path d="M40 176 L160 176" stroke="#ff6f91" stroke-width="6"/>' +
      (o.h ? '<path d="M28 176 L172 176" ' + SW + ' stroke-dasharray="10 6"/>' : ''));
  });

  add('h-matches', function () {
    return svg('0 0 200 120', '<rect x="20" y="40" width="160" height="70" rx="8" fill="#e5243b" ' + SW + '/><rect x="40" y="56" width="120" height="38" rx="4" fill="#fffdf6" ' + SW3 + '/>' +
      '<path d="M60 40 L60 14 M80 40 L80 10 M100 40 L100 16" stroke="#c98b4a" stroke-width="7" stroke-linecap="round"/><circle cx="60" cy="12" r="7" fill="#4b4466" ' + SW3 + '/><circle cx="80" cy="9" r="7" fill="#4b4466" ' + SW3 + '/><circle cx="100" cy="14" r="7" fill="#4b4466" ' + SW3 + '/>' +
      '<path d="M70 104 Q74 116 70 120 M130 104 Q134 118 130 120" fill="none" stroke="#3ec1ff" stroke-width="6" stroke-linecap="round"/>');
  });

  // 2.4.1 follow-up (bible §15): one postcard drawing; this is its picture side. Fallback below.
  add('h-postcard', function () {
    if (A.hasObject('b-postcard')) return A.object('b-postcard', { picture: true });
    return svg('0 0 200 140', '<rect x="8" y="10" width="184" height="120" rx="6" fill="#fffdf6" ' + SW + '/><rect x="18" y="20" width="90" height="100" rx="4" fill="#3ec1ff" ' + SW3 + '/>' +
      '<circle cx="80" cy="44" r="14" fill="#ffd23f" ' + SW3 + '/><path d="M18 92 Q40 82 63 92 T108 92 L108 120 L18 120 Z" fill="#f3d998" ' + SW3 + '/>' +
      hair('M120 50 L180 50 M120 70 L180 70 M120 90 L170 90') + '<rect x="156" y="18" width="26" height="22" rx="2" fill="#ff6f91" ' + SW3 + '/>');
  });

  // 2.4.1 follow-up (bible §15): one bin drawing; the castle's is the plain grey waste-paper `bin`. Fallback below.
  add('h-bin', function () {
    if (A.hasObject('bin')) return A.object('bin', { plain: true });
    return svg('0 0 120 160', '<path d="M14 30 L106 30 L96 152 L24 152 Z" fill="#8a86a8" ' + SW + '/><rect x="8" y="18" width="104" height="16" rx="5" fill="#4b4466" ' + SW3 + '/>' + hair('M40 46 L44 140 M60 46 L60 140 M80 46 L76 140'));
  });

  add('h-brush', function () {
    return svg('0 0 200 200', '<path d="M40 180 L150 40" stroke="' + WOOD + '" stroke-width="12" stroke-linecap="round"/><path d="M40 180 L150 40" fill="none" ' + SW3 + ' stroke-opacity=".4"/>' +
      '<g transform="rotate(38 150 40)"><rect x="110" y="6" width="80" height="30" rx="8" fill="#4b4466" ' + SW + '/><path d="M118 36 L114 60 M134 36 L132 62 M150 36 L150 64 M166 36 L168 62 M182 36 L186 60" ' + SW3 + '/></g>');
  });

  add('h-pancake', function (o) {
    var n = o.n || 1, w = 90 + n * 50, x = 150 - w / 2;
    return svg('0 0 300 50', '<rect x="' + x + '" y="6" width="' + w + '" height="40" rx="20" fill="#f5b400" ' + SW + '/><path d="M' + (x + 20) + ' 16 L' + (x + w - 20) + ' 16" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="150" cy="27" r="18" fill="#fffdf6" ' + SW3 + '/><text x="150" y="38" text-anchor="middle" font-family="Bagel Fat One, Atkinson Hyperlegible, sans-serif" font-size="30" fill="' + INK + '">' + n + '</text>');
  });

  add('h-plate', function () {
    return svg('0 0 200 30', '<ellipse cx="100" cy="15" rx="96" ry="12" fill="#fffdf6" ' + SW + '/><ellipse cx="100" cy="13" rx="70" ry="6" fill="none" stroke="#c3ccd8" stroke-width="4"/>');
  });
})(typeof window !== 'undefined' ? window : globalThis);
