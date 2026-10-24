/* OBEY? LOL. — art pack J: sports day and games (levels 213–232).
 * Original code-drawn SVG in the house style: chunky shapes, ink outlines, flat fills, one highlight. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY && OBEY.art;
  if (!A || !A.addObject) return; // loaded before art.js (level lab preview): the later load registers the art
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function add(k, f) { A.addObject(k, f); }
  function txt(x, y, size, s, fill, extra) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" fill="' + (fill || INK) + '"' + (extra || '') + '>' + OBEY.util.escape(String(s)) + '</text>';
  }
  var HI = 'fill="none" stroke="#fff" stroke-linecap="round" opacity=".5"';
  var EGG = function (cx, cy, r) {
    // An ostrich-sized egg, drawn around (cx, cy) with half-height r.
    var w = r * 0.8;
    return '<path d="M' + cx + ' ' + (cy - r) + ' C' + (cx + w) + ' ' + (cy - r) + ' ' + (cx + w * 1.05) + ' ' + (cy + r * 0.55) + ' ' + cx + ' ' + (cy + r) +
      ' C' + (cx - w * 1.05) + ' ' + (cy + r * 0.55) + ' ' + (cx - w) + ' ' + (cy - r) + ' ' + cx + ' ' + (cy - r) + 'Z" fill="#fffdf6" ' + SW + '/>' +
      '<circle cx="' + (cx + w * 0.3) + '" cy="' + (cy + r * 0.15) + '" r="' + (r * 0.09) + '" fill="#c3ccd8"/><circle cx="' + (cx - w * 0.35) + '" cy="' + (cy + r * 0.45) + '" r="' + (r * 0.07) + '" fill="#c3ccd8"/>' +
      '<circle cx="' + (cx + w * 0.1) + '" cy="' + (cy + r * 0.6) + '" r="' + (r * 0.06) + '" fill="#c3ccd8"/>' +
      '<path d="M' + (cx - w * 0.5) + ' ' + (cy - r * 0.35) + ' Q' + (cx - w * 0.45) + ' ' + (cy - r * 0.7) + ' ' + (cx - w * 0.15) + ' ' + (cy - r * 0.8) + '" ' + HI + ' stroke-width="' + Math.max(4, r * 0.12).toFixed(1) + '"/>';
  };

  /* ---------------------------------------------------------- track and field */
  // Sports-field grass for the floor band (or a whole top-down pitch): stretches to fill.
  // Sports-field grass: the floor band by default, or a whole top-down field with { full: true }. Stretches to fill.
  add('j-grass', function (o) {
    if (o.full) {
      return svg('0 0 100 100', '<rect width="100" height="100" fill="#5fd98a"/>' +
        '<path d="M8 14 l1 -2 l1 2 M30 36 l1 -2 l1 2 M52 12 l1 -2 l1 2 M74 28 l1 -2 l1 2 M90 56 l1 -2 l1 2 M20 74 l1 -2 l1 2 M64 86 l1 -2 l1 2 M44 60 l1 -2 l1 2 M86 92 l1 -2 l1 2 M6 50 l1 -2 l1 2" fill="none" stroke="#2fae84" stroke-width=".8"/>', 'art fill-art');
    }
    return svg('0 0 100 40', '<rect width="100" height="40" fill="#5fd98a"/><path d="M0 1 L100 1" stroke="#2fae84" stroke-width="2"/>' +
      '<path d="M8 14 l1 -3 l1 3 M30 26 l1 -3 l1 3 M52 12 l1 -3 l1 3 M74 28 l1 -3 l1 3 M90 16 l1 -3 l1 3 M20 34 l1 -3 l1 3 M64 36 l1 -3 l1 3" fill="none" stroke="#2fae84" stroke-width="1"/>', 'art fill-art');
  });

  add('j-egg', function () { return svg('0 0 160 200', EGG(80, 100, 86)); });

  add('j-crate', function (o) {
    return svg('0 0 200 170',
      '<rect x="8" y="8" width="184" height="154" rx="8" fill="#c98b4a" ' + SW + '/>' +
      '<path d="M8 8 L192 162 M192 8 L8 162" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>' +
      (o.stamp ? '<rect x="22" y="58" width="156" height="54" rx="6" fill="#fffdf6" ' + SW3 + '/>' + txt(100, 95, 28, o.stamp) : '') +
      '<path d="M20 20 L20 50" ' + HI + ' stroke-width="6"/>');
  });

  add('j-spoon', function (o) {
    var k = o.kind || 'tea', s = '';
    if (k === 'tea') {
      s = '<path d="M70 128 L188 112" stroke="#c3ccd8" stroke-width="10" stroke-linecap="round"/><path d="M70 128 L188 112" fill="none" ' + SW3 + '/>' +
        '<ellipse cx="48" cy="130" rx="24" ry="9" fill="#c3ccd8" ' + SW + '/>';
    } else if (k === 'ladle') {
      s = '<path d="M98 98 Q140 40 184 20" fill="none" stroke="#8a86a8" stroke-width="12" stroke-linecap="round"/><path d="M98 98 Q140 40 184 20" fill="none" ' + SW3 + '/>' +
        '<path d="M10 92 L106 92 Q104 136 58 136 Q12 136 10 92Z" fill="#c3ccd8" ' + SW + '/><path d="M24 104 Q34 124 54 126" ' + HI + ' stroke-width="6"/>';
    } else {
      s = '<path d="M84 118 L188 108" stroke="#c3ccd8" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M28 106 L86 104 L86 128 L28 130" fill="none" stroke="#c3ccd8" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M28 106 L86 106 M28 117 L86 116 M28 129 L86 126 M86 104 L86 128" fill="none" ' + SW3 + '/>';
    }
    return svg('0 0 200 140', s);
  });

  add('j-flag', function () {
    var c = '';
    for (var r = 0; r < 4; r++) for (var q = 0; q < 5; q++) if ((r + q) % 2 === 0) c += '<rect x="' + (24 + q * 14) + '" y="' + (14 + r * 14) + '" width="14" height="14" fill="#2d2850"/>';
    return svg('0 0 100 200',
      '<rect x="14" y="8" width="8" height="186" rx="4" fill="#8a86a8" ' + SW3 + '/>' +
      '<rect x="24" y="14" width="70" height="56" fill="#fffdf6"/>' + c + '<rect x="24" y="14" width="70" height="56" fill="none" ' + SW + '/>' +
      '<ellipse cx="18" cy="194" rx="16" ry="5" fill="#4b4466" ' + SW3 + '/>');
  });

  add('j-sack', function (o) {
    return svg('0 0 100 140',
      '<path d="M50 14 L50 4" ' + SW3 + '/><circle cx="50" cy="4" r="4" fill="#e5243b"/>' +
      '<rect x="24" y="14" width="52" height="46" rx="16" fill="#ffd23f" ' + SW + '/>' +
      '<circle cx="40" cy="34" r="4" fill="' + INK + '"/><circle cx="60" cy="34" r="4" fill="' + INK + '"/>' +
      (o.fallen ? '<path d="M40 48 Q50 42 60 48" fill="none" ' + SW3 + '/>' : '<path d="M40 46 Q50 52 60 46" fill="none" ' + SW3 + '/>') +
      '<path d="M14 54 Q50 44 86 54 L92 128 Q50 140 8 128 Z" fill="#c98b4a" ' + SW + '/>' +
      '<path d="M20 58 Q50 50 80 58" fill="none" ' + SW3 + '/><path d="M34 76 L40 110 M64 74 L58 112" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>');
  });

  add('j-tile', function (o) {
    var s = '<rect x="4" y="4" width="92" height="92" rx="8" fill="' + (o.finish ? '#fffdf6' : '#f3d998') + '" ' + SW3 + '/>';
    if (o.finish) for (var r = 0; r < 4; r++) for (var q = 0; q < 4; q++) if ((r + q) % 2 === 0) s += '<rect x="' + (10 + q * 20) + '" y="' + (10 + r * 20) + '" width="20" height="20" fill="#2d2850" opacity=".85"/>';
    if (o.puddle) s += '<path d="M18 60 Q14 40 36 40 Q46 26 66 34 Q88 34 84 56 Q90 76 66 80 Q44 88 30 78 Q12 76 18 60Z" fill="#7fb2ff" ' + SW3 + '/><path d="M34 56 Q44 50 56 54" ' + HI + ' stroke-width="5"/>';
    if (o.start) s += txt(50, 60, 24, 'GO');
    else s += '<circle cx="' + (o.puddle ? 26 : 50) + '" cy="' + (o.puddle ? 26 : 50) + '" r="' + (o.puddle ? 17 : 26) + '" fill="#fffdf6" ' + SW3 + '/>' + txt(o.puddle ? 26 : 50, o.puddle ? 35 : 62, o.puddle ? 24 : 34, o.n);
    return svg('0 0 100 100', s);
  });

  add('j-sandpit', function () {
    return svg('0 0 460 220',
      '<rect x="4" y="4" width="452" height="212" rx="14" fill="#f3d998" ' + SW + '/>' +
      '<rect x="40" y="4" width="16" height="212" fill="#fffdf6" ' + SW3 + '/>' +
      '<path d="M90 40 l6 0 M180 170 l6 0 M300 60 l6 0 M380 190 l6 0 M240 120 l6 0" stroke="#c98b4a" stroke-width="4" stroke-linecap="round"/>');
  });

  add('j-print', function (o) {
    var c = 'fill="#c98b4a" stroke="' + INK + '" stroke-width="3" stroke-opacity=".6"';
    var s = '';
    if (o.type === 'heels') {
      s = '<ellipse cx="32" cy="50" rx="18" ry="30" ' + c + '/><ellipse cx="68" cy="96" rx="18" ry="30" ' + c + '/>';
    } else if (o.type === 'hands') {
      var hand = function (x, y) {
        return '<ellipse cx="' + x + '" cy="' + y + '" rx="18" ry="15" ' + c + '/>' +
          [-14, -5, 5, 14].map(function (dx, i) { return '<ellipse cx="' + (x + dx) + '" cy="' + (y - 22 + Math.abs(i - 1.5) * 3) + '" rx="4.5" ry="9" ' + c + '/>'; }).join('') +
          '<ellipse cx="' + (x + 22) + '" cy="' + (y + 3) + '" rx="9" ry="4.5" ' + c + '/>';
      };
      s = hand(34, 46) + hand(62, 108);
    } else {
      s = '<path d="M50 44 Q10 22 8 66 Q6 116 50 118 Q94 116 92 66 Q90 22 50 44Z" ' + c + '/><path d="M50 50 L50 112" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3"/>';
    }
    return svg('0 0 100 150', s);
  });

  add('j-mflag', function () {
    return svg('0 0 100 100',
      '<path d="M30 92 L30 10" stroke="#8a86a8" stroke-width="8" stroke-linecap="round"/><path d="M30 92 L30 10" ' + SW3 + '/>' +
      '<path d="M32 12 L86 26 L32 44 Z" fill="#e5243b" ' + SW + '/><path d="M40 22 L60 27" ' + HI + ' stroke-width="4"/>' +
      '<path d="M22 92 L38 92" ' + SW + '/>');
  });

  /* Mini Bossworth for on-stage cameos (blob, red tie), optional cape, whistle, keeper kit. */
  function bossBody(o) {
    var s = (o.cape ? '<path d="M40 70 L14 190 L186 190 L160 70 Z" fill="#e5243b" ' + SW + '/>' : '') +
      '<path d="M100 24 C152 24 178 62 178 110 C178 160 146 186 100 186 C54 186 22 160 22 110 C22 62 48 24 100 24Z" fill="#ffb347" ' + SW + '/>';
    if (o.kit) {
      // goalkeeper jersey over the lower body
      s += '<path d="M26 128 Q100 146 174 128 Q170 166 140 180 Q100 192 60 180 Q30 166 26 128Z" fill="#2bc46f" ' + SW3 + '/>' + txt(100, 174, 26, '1', '#fffdf6', ' stroke="' + INK + '" stroke-width="1.5"');
    } else {
      s += '<path d="M92 140 L108 140 L112 176 L100 184 L88 176 Z" fill="#e5243b" ' + SW3 + '/>';
    }
    s += '<circle cx="75" cy="98" r="12" fill="#fff" ' + SW3 + '/><circle cx="125" cy="98" r="12" fill="#fff" ' + SW3 + '/>' +
      '<circle cx="77" cy="98" r="5" fill="' + INK + '"/><circle cx="127" cy="98" r="5" fill="' + INK + '"/>' +
      '<path d="M86 124 Q100 132 114 124" fill="none" ' + SW + '/>' +
      (o.kit ? '' : '<path d="M64 160 Q100 178 136 160" fill="none" stroke="#fff" stroke-width="8" opacity=".35"/>');
    if (o.whistle) s += '<path d="M128 112 Q134 150 124 160" fill="none" stroke="#e5243b" stroke-width="4" stroke-linecap="round"/><rect x="112" y="156" width="26" height="13" rx="5" fill="#c3ccd8" ' + SW3 + '/>';
    return s;
  }
  add('j-boss', function (o) { return svg('0 0 200 200', bossBody(o)); });

  /* --------------------------------------------------------------- referee */
  add('j-coin', function (o) {
    var face = o.side === 'tails'
      ? '<path d="M70 120 Q60 70 100 70 Q140 70 130 104 Q122 128 100 118 Q86 110 96 96" fill="none" stroke="#9a6b3f" stroke-width="10" stroke-linecap="round"/>'
      : '<circle cx="100" cy="92" r="28" fill="#f5b400" ' + SW3 + '/><circle cx="90" cy="88" r="4" fill="' + INK + '"/><circle cx="110" cy="88" r="4" fill="' + INK + '"/><path d="M88 102 Q100 110 112 102" fill="none" ' + SW3 + '/><path d="M64 140 Q100 120 136 140" fill="none" ' + SW3 + '/>';
    return svg('0 0 200 200',
      '<circle cx="100" cy="100" r="86" fill="#ffd23f" ' + SW + '/><circle cx="100" cy="100" r="70" fill="none" stroke="#c98b4a" stroke-width="4"/>' + face +
      '<path d="M48 70 Q56 46 80 36" ' + HI + ' stroke-width="9"/>');
  });

  add('j-whistle', function () {
    return svg('0 0 200 140',
      '<path d="M140 64 Q186 20 150 8 Q116 0 120 40" fill="none" stroke="#e5243b" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M20 62 L110 62 L110 52 L140 52 L140 74 Q140 124 92 124 Q50 124 50 92 L20 92 Z" fill="#c3ccd8" ' + SW + '/>' +
      '<circle cx="94" cy="92" r="12" fill="#4b4466" ' + SW3 + '/><path d="M28 70 L100 70" ' + HI + ' stroke-width="5"/>' +
      '<circle cx="140" cy="63" r="6" fill="#c3ccd8" ' + SW3 + '/>');
  });

  add('j-refcard', function () {
    return svg('0 0 100 140',
      '<rect x="18" y="10" width="64" height="104" rx="8" transform="rotate(8 50 62)" fill="#e5243b" ' + SW + '/>' +
      '<path d="M34 30 L36 70" transform="rotate(8 50 62)" ' + HI + ' stroke-width="6"/>');
  });

  add('j-ball', function () {
    return svg('0 0 100 100',
      '<circle cx="50" cy="50" r="44" fill="#fffdf6" ' + SW + '/>' +
      '<path d="M50 34 L64 44 L59 61 L41 61 L36 44 Z" fill="#2d2850"/>' +
      '<path d="M50 34 L50 8 M64 44 L88 36 M59 61 L74 82 M41 61 L26 82 M36 44 L12 36" ' + SW3 + '/>' +
      '<path d="M18 34 Q24 20 36 14" ' + HI + ' stroke-width="6"/>');
  });

  add('j-goal', function () {
    var net = '';
    for (var x = 30; x < 290; x += 20) net += '<path d="M' + x + ' 22 L' + x + ' 146" stroke="' + INK + '" stroke-opacity=".25" stroke-width="2"/>';
    for (var y = 36; y < 146; y += 18) net += '<path d="M16 ' + y + ' L284 ' + y + '" stroke="' + INK + '" stroke-opacity=".25" stroke-width="2"/>';
    return svg('0 0 300 150', '<rect x="16" y="20" width="268" height="128" fill="#fffdf6" opacity=".5"/>' + net +
      '<path d="M14 148 L14 16 L286 16 L286 148" fill="none" stroke="#fffdf6" stroke-width="12" stroke-linejoin="round"/>' +
      '<path d="M8 148 L8 10 L292 10 L292 148 M20 148 L20 22 L280 22 L280 148" fill="none" ' + SW + '/>');
  });

  add('j-keeper', function (o) {
    var glove = function (x, y, letter) {
      return '<circle cx="' + x + '" cy="' + y + '" r="22" fill="#ffd23f" ' + SW + '/>' + txt(x, y + 10, 28, letter);
    };
    var arms = '<path d="M34 104 L6 56 M166 104 L194 56" ' + SW + '/>';
    var inner = bossBody({ kit: true }) + arms + glove(16, 44, 'R') + glove(184, 44, 'L');
    var t = o.dive === 'right' ? 'translate(30 30) rotate(55 100 120)' : (o.dive === 'left' ? 'translate(-30 30) rotate(-55 100 120)' : '');
    return svg('-10 0 220 200', '<g transform="' + t + '">' + inner + '</g>');
  });

  /* ------------------------------------------------------------ alley & golf */
  add('j-alley', function (o) {
    var pins = '';
    var rows = [[100], [88, 112], [76, 100, 124], [64, 88, 112, 136]];
    rows.forEach(function (r, i) {
      r.forEach(function (x) {
        var down = o.down === 'all' || (o.down === 'edge' && x === 136);
        pins += down ? '<ellipse cx="' + x + '" cy="' + (86 - i * 16) + '" rx="10" ry="5" fill="#fffdf6" ' + SW3 + '/>'
          : '<path d="M' + (x - 6) + ' ' + (88 - i * 16) + ' Q' + (x - 9) + ' ' + (72 - i * 16) + ' ' + x + ' ' + (66 - i * 16) + ' Q' + (x + 9) + ' ' + (72 - i * 16) + ' ' + (x + 6) + ' ' + (88 - i * 16) + ' Z" fill="#fffdf6" ' + SW3 + '/><path d="M' + (x - 6) + ' ' + (76 - i * 16) + ' L' + (x + 6) + ' ' + (76 - i * 16) + '" stroke="#e5243b" stroke-width="3"/>';
      });
    });
    var path = '';
    var P = { middle: 'M100 290 L100 96', edge: 'M118 290 L136 96', gutter: 'M100 290 Q104 220 168 150 L168 40' };
    if (o.shot && P[o.shot]) path = '<path d="' + P[o.shot] + '" fill="none" stroke="#e5243b" stroke-width="5" stroke-dasharray="10 9"/>';
    return svg('0 0 200 300',
      '<path d="M40 296 L64 12 L136 12 L160 296 Z" fill="#c98b4a" ' + SW + '/>' +
      '<path d="M26 296 L54 12 L64 12 L40 296 Z M174 296 L146 12 L136 12 L160 296 Z" fill="#4b4466" ' + SW3 + '/>' +
      '<path d="M84 296 L92 120 M116 296 L108 120" stroke="' + INK + '" stroke-opacity=".25" stroke-width="2"/>' +
      '<path d="M88 250 L92 240 L96 250 M104 250 L108 240 L112 250" fill="#ffd23f" ' + SW3 + '/>' +
      pins + path +
      (o.ball ? '<circle cx="' + (o.ball === 'gutter' ? 168 : o.ball === 'edge' ? 134 : 100) + '" cy="' + (o.ball === 'gutter' ? 40 : 106) + '" r="12" fill="#3a86ff" ' + SW3 + '/>' : '<circle cx="100" cy="280" r="14" fill="#3a86ff" ' + SW3 + '/>'));
  });

  add('j-golf', function (o) {
    var s = '<rect x="6" y="6" width="188" height="128" rx="12" fill="#a0784d" ' + SW + '/>' +
      '<rect x="16" y="16" width="168" height="108" rx="6" fill="#5fd98a" ' + SW3 + '/>' +
      // pond (bottom right)
      '<path d="M150 98 Q146 82 164 84 Q182 82 180 100 Q182 118 164 118 Q148 118 150 98Z" fill="#3ec1ff" ' + SW3 + '/><path d="M158 94 Q164 90 172 94" ' + HI + ' stroke-width="4"/>' +
      // angled bumper (top left corner)
      '<path d="M19 48 L48 19" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/><path d="M19 48 L48 19" fill="none" ' + SW3 + '/>' +
      // hole + flag (top right)
      '<circle cx="164" cy="34" r="8" fill="#1c1640" ' + SW3 + '/><path d="M164 34 L164 8" ' + SW3 + '/><path d="M165 9 L184 15 L165 21 Z" fill="#e5243b" ' + SW3 + '/>' +
      // tee (bottom left)
      '<rect x="22" y="104" width="22" height="16" rx="4" fill="#2fae84" ' + SW3 + '/><circle cx="33" cy="112" r="5" fill="#fffdf6" ' + SW3 + '/>';
    // windmill block in the middle (drawn 12 units lower than its design origin)
    s += '<g transform="translate(0 12)">';
    if (o.broken) {
      s += '<rect x="80" y="84" width="40" height="14" rx="3" fill="#ff6f91" ' + SW3 + '/><path d="M70 96 L132 72 M84 70 L118 100" stroke="#fffdf6" stroke-width="7" stroke-linecap="round"/><path d="M70 96 L132 72 M84 70 L118 100" ' + SW3 + '/>';
    } else {
      s += '<path d="M84 96 L88 52 L112 52 L116 96 Z" fill="#ff6f91" ' + SW3 + '/><rect x="94" y="80" width="12" height="16" rx="3" fill="#1c1640"/>' +
        '<g><path d="M100 54 L72 30 M100 54 L128 30 M100 54 L76 80 M100 54 L124 80" stroke="#fffdf6" stroke-width="8" stroke-linecap="round"/><path d="M100 54 L72 30 M100 54 L128 30 M100 54 L76 80 M100 54 L124 80" ' + SW3 + '/></g>' +
        '<circle cx="100" cy="54" r="5" fill="' + INK + '"/>';
    }
    s += '</g>';
    var P = { up: 'M33 108 L33 34 L160 34', right: 'M37 112 L156 104', diag: 'M37 108 L84 76 L52 98' };
    if (o.shot && P[o.shot]) s += '<path d="' + P[o.shot] + '" fill="none" stroke="#fffdf6" stroke-width="4" stroke-dasharray="7 6" stroke-linecap="round"/>';
    if (o.shot === 'thru') s += '<path d="M37 108 L160 36" fill="none" stroke="#fffdf6" stroke-width="4" stroke-dasharray="7 6"/>';
    return svg('0 0 200 140', s);
  });

  add('j-domino', function (o) {
    var pips = function (x, y, w, n) {
      var P = { 1: [[0.5, 0.5]], 2: [[0.3, 0.3], [0.7, 0.7]], 3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]], 4: [[0.3, 0.3], [0.7, 0.3], [0.3, 0.7], [0.7, 0.7]], 5: [[0.28, 0.28], [0.72, 0.28], [0.5, 0.5], [0.28, 0.72], [0.72, 0.72]], 6: [[0.3, 0.22], [0.7, 0.22], [0.3, 0.5], [0.7, 0.5], [0.3, 0.78], [0.7, 0.78]] };
      return (P[n] || []).map(function (p) { return '<circle cx="' + (x + p[0] * w) + '" cy="' + (y + p[1] * w) + '" r="' + (w * 0.09) + '" fill="#2d2850"/>'; }).join('');
    };
    if (o.flat) {
      return svg('0 0 120 60', '<rect x="6" y="10" width="108" height="44" rx="8" fill="#fffdf6" ' + SW + '/><path d="M60 14 L60 50" ' + SW3 + '/>' + pips(14, 12, 40, 3) + pips(66, 12, 40, 4));
    }
    var d = '<rect x="8" y="6" width="44" height="108" rx="8" fill="#fffdf6" ' + SW + '/><path d="M12 60 L48 60" ' + SW3 + '/>' + pips(10, 10, 40, o.top || 2) + pips(10, 64, 40, o.bottom || 5) + '<path d="M16 20 L16 44" ' + HI + ' stroke-width="4"/>';
    if (o.fallen) d = '<g transform="rotate(72 52 114)">' + d + '</g>';
    return svg('0 0 60 120', d);
  });

  add('j-boombox', function (o) {
    var notes = o.playing ? '<path d="M150 30 L150 8 L170 4 L170 26" fill="none" ' + SW3 + '/><circle cx="146" cy="30" r="5" fill="' + INK + '"/><circle cx="166" cy="26" r="5" fill="' + INK + '"/>' +
      '<path d="M34 24 L34 4" ' + SW3 + '/><circle cx="30" cy="24" r="5" fill="' + INK + '"/>' : '';
    return svg('0 0 200 140', notes +
      '<path d="M60 40 Q60 22 80 22 L120 22 Q140 22 140 40" fill="none" ' + SW + '/>' +
      '<rect x="10" y="40" width="180" height="94" rx="14" fill="#9b5de5" ' + SW + '/>' +
      '<circle cx="52" cy="88" r="28" fill="#2d2850" ' + SW3 + '/><circle cx="52" cy="88" r="10" fill="#8a86a8"/>' +
      '<circle cx="148" cy="88" r="28" fill="#2d2850" ' + SW3 + '/><circle cx="148" cy="88" r="10" fill="#8a86a8"/>' +
      '<rect x="86" y="56" width="28" height="18" rx="3" fill="#1c1640" ' + SW3 + '/>' +
      '<rect x="86" y="84" width="12" height="10" rx="2" fill="#e5243b" ' + SW3 + '/><rect x="102" y="84" width="12" height="10" rx="2" fill="#2bc46f" ' + SW3 + '/>' +
      '<path d="M22 56 Q26 48 36 46" ' + HI + ' stroke-width="5"/>');
  });

  add('j-chair', function () {
    return svg('0 0 120 160',
      '<rect x="22" y="10" width="76" height="66" rx="12" fill="#3a86ff" ' + SW + '/>' +
      '<rect x="14" y="74" width="92" height="20" rx="8" fill="#2f6fe4" ' + SW + '/>' +
      '<path d="M24 94 L20 154 M96 94 L100 154 M30 128 L90 128" ' + SW + '/>' +
      '<path d="M34 22 L34 58" ' + HI + ' stroke-width="6"/>');
  });

  /* ------------------------------------------------------------- games room */
  // Green card-table felt for a whole top-down table. Stretches to fill.
  add('j-baize', function () {
    return svg('0 0 100 100', '<rect width="100" height="100" fill="#2fae84"/><rect x="2" y="2" width="96" height="96" rx="3" fill="none" stroke="#fffdf6" stroke-width=".8" opacity=".5"/>', 'art fill-art');
  });

  add('j-chessboard', function () {
    var sq = '';
    for (var r = 0; r < 4; r++) for (var c = 0; c < 6; c++) sq += '<rect x="' + (20 + c * 27) + '" y="' + (20 + r * 22) + '" width="27" height="22" fill="' + ((r + c) % 2 ? '#a0784d' : '#fffdf6') + '"/>';
    var queen = function (x, y) {
      return '<path d="M' + (x - 9) + ' ' + y + ' L' + (x - 11) + ' ' + (y - 16) + ' L' + (x - 4) + ' ' + (y - 9) + ' L' + x + ' ' + (y - 19) + ' L' + (x + 4) + ' ' + (y - 9) + ' L' + (x + 11) + ' ' + (y - 16) + ' L' + (x + 9) + ' ' + y + ' Z" fill="#2d2850" ' + SW3 + '/>';
    };
    var qs = '';
    [[34, 38], [61, 38], [88, 38], [115, 38], [142, 38], [169, 38], [48, 60], [102, 60], [156, 60]].forEach(function (p) { qs += queen(p[0], p[1]); });
    return svg('0 0 200 130', '<rect x="12" y="12" width="178" height="104" rx="6" fill="#9a6b3f" ' + SW + '/>' + sq +
      '<rect x="20" y="20" width="162" height="88" fill="none" ' + SW3 + '/>' + qs +
      '<circle cx="128" cy="92" r="6" fill="#fffdf6" ' + SW3 + '/><path d="M121 106 Q128 96 135 106 Z" fill="#fffdf6" ' + SW3 + '/>');
  });

  add('j-chessclock', function (o) {
    var left = o.turn === 'boss' ? 20 : 30, right = o.turn === 'boss' ? 30 : 20;
    return svg('0 0 200 120',
      '<rect x="46" y="' + (34 - left) + '" width="24" height="' + (left + 4) + '" rx="4" fill="#e5243b" ' + SW3 + '/>' +
      '<rect x="130" y="' + (34 - right) + '" width="24" height="' + (right + 4) + '" rx="4" fill="#e5243b" ' + SW3 + '/>' +
      '<path d="M14 112 L30 34 L170 34 L186 112 Z" fill="#a0784d" ' + SW + '/>' +
      '<circle cx="62" cy="74" r="26" fill="#fffdf6" ' + SW3 + '/><circle cx="138" cy="74" r="26" fill="#fffdf6" ' + SW3 + '/>' +
      '<path d="M62 74 L62 56 M62 74 L74 80 M138 74 L138 52 M138 74 L150 70" ' + SW3 + '/>');
  });

  add('j-hand', function (o) {
    var sk = '#ffd23f', s = '';
    if (o.shape === 'paper') {
      s = '<rect x="50" y="70" width="100" height="90" rx="30" fill="' + sk + '" ' + SW + '/>' +
        [62, 86, 110, 134].map(function (x, i) { return '<rect x="' + (x - 10) + '" y="' + (18 + Math.abs(i - 1.5) * 8) + '" width="22" height="80" rx="11" fill="' + sk + '" ' + SW + '/>'; }).join('') +
        '<rect x="20" y="100" width="56" height="22" rx="11" transform="rotate(-30 48 111)" fill="' + sk + '" ' + SW + '/>';
    } else if (o.shape === 'scissors') {
      s = '<rect x="76" y="18" width="22" height="90" rx="11" transform="rotate(-14 87 100)" fill="' + sk + '" ' + SW + '/>' +
        '<rect x="104" y="18" width="22" height="90" rx="11" transform="rotate(14 115 100)" fill="' + sk + '" ' + SW + '/>' +
        '<rect x="52" y="86" width="96" height="80" rx="32" fill="' + sk + '" ' + SW + '/>' +
        '<path d="M64 112 Q100 104 136 112 M66 136 Q100 128 134 136" fill="none" ' + SW3 + '/>';
    } else {
      s = '<rect x="44" y="56" width="112" height="104" rx="40" fill="' + sk + '" ' + SW + '/>' +
        '<path d="M66 76 Q100 66 134 76 M62 102 Q100 92 138 102 M64 128 Q100 118 136 128" fill="none" ' + SW3 + '/>';
    }
    return svg('0 0 200 180', s);
  });

  var SUITS = {
    hearts: function (x, y, k) { return '<path d="M' + x + ' ' + (y + 22 * k) + ' C' + (x - 30 * k) + ' ' + y + ' ' + (x - 20 * k) + ' ' + (y - 22 * k) + ' ' + x + ' ' + (y - 10 * k) + ' C' + (x + 20 * k) + ' ' + (y - 22 * k) + ' ' + (x + 30 * k) + ' ' + y + ' ' + x + ' ' + (y + 22 * k) + 'Z" fill="#e5243b" ' + SW3 + '/>'; },
    diamonds: function (x, y, k) { return '<path d="M' + x + ' ' + (y - 24 * k) + ' L' + (x + 18 * k) + ' ' + y + ' L' + x + ' ' + (y + 24 * k) + ' L' + (x - 18 * k) + ' ' + y + ' Z" fill="#e5243b" ' + SW3 + '/>'; },
    clubs: function (x, y, k) { return '<circle cx="' + x + '" cy="' + (y - 11 * k) + '" r="' + (10 * k) + '" fill="#2d2850" ' + SW3 + '/><circle cx="' + (x - 12 * k) + '" cy="' + (y + 5 * k) + '" r="' + (10 * k) + '" fill="#2d2850" ' + SW3 + '/><circle cx="' + (x + 12 * k) + '" cy="' + (y + 5 * k) + '" r="' + (10 * k) + '" fill="#2d2850" ' + SW3 + '/><path d="M' + x + ' ' + y + ' L' + (x - 6 * k) + ' ' + (y + 24 * k) + ' L' + (x + 6 * k) + ' ' + (y + 24 * k) + ' Z" fill="#2d2850" ' + SW3 + '/>'; },
    spades: function (x, y, k) { return '<path d="M' + x + ' ' + (y - 24 * k) + ' C' + (x + 34 * k) + ' ' + (y + 2 * k) + ' ' + (x + 16 * k) + ' ' + (y + 22 * k) + ' ' + x + ' ' + (y + 8 * k) + ' C' + (x - 16 * k) + ' ' + (y + 22 * k) + ' ' + (x - 34 * k) + ' ' + (y + 2 * k) + ' ' + x + ' ' + (y - 24 * k) + 'Z" fill="#2d2850" ' + SW3 + '/><path d="M' + x + ' ' + y + ' L' + (x - 6 * k) + ' ' + (y + 26 * k) + ' L' + (x + 6 * k) + ' ' + (y + 26 * k) + ' Z" fill="#2d2850" ' + SW3 + '/>'; }
  };
  add('j-pcard', function (o) {
    var red = o.suit === 'hearts' || o.suit === 'diamonds';
    var f = SUITS[o.suit] || SUITS.spades;
    return svg('0 0 100 140',
      '<rect x="6" y="6" width="88" height="128" rx="10" fill="#fffdf6" ' + SW + '/>' +
      txt(30, 40, 30, o.n, red ? '#e5243b' : '#2d2850') + f(58, 92, 1.1));
  });

  /* ---------------------------------------------------------- changing room */
  add('j-kit', function (o) {
    var s = '';
    switch (o.item) {
      case 'pads':
        s = '<path d="M30 20 Q54 14 70 22 L64 120 Q48 130 34 120 Z" fill="#3a86ff" ' + SW + '/><path d="M110 20 Q134 14 150 22 L144 120 Q128 130 114 120 Z" fill="#3a86ff" ' + SW + '/>' +
          '<path d="M38 40 L60 40 M118 40 L140 40" ' + SW3 + '/><path d="M40 56 L44 100" ' + HI + ' stroke-width="5"/>'; break;
      case 'socks':
        s = '<path d="M34 10 L66 10 L66 104 Q66 126 44 126 L18 126 Q8 112 22 106 L34 102 Z" fill="#e5243b" ' + SW + '/><path d="M112 10 L144 10 L144 104 Q144 126 122 126 L96 126 Q86 112 100 106 L112 102 Z" fill="#e5243b" ' + SW + '/>' +
          '<path d="M34 28 L66 28 M34 40 L66 40 M112 28 L144 28 M112 40 L144 40" stroke="#fffdf6" stroke-width="6"/>'; break;
      case 'boots':
        s = '<path d="M24 40 L58 40 L60 96 L86 104 Q92 122 76 122 L22 122 Z" fill="#2d2850" ' + SW + '/><path d="M104 40 L138 40 L140 96 L166 104 Q172 122 156 122 L102 122 Z" fill="#2d2850" ' + SW + '/>' +
          '<path d="M30 128 l0 6 M50 128 l0 6 M70 128 l0 6 M110 128 l0 6 M130 128 l0 6 M150 128 l0 6" ' + SW + '/><path d="M30 56 L52 56 M30 68 L52 68 M110 56 L132 56 M110 68 L132 68" stroke="#fffdf6" stroke-width="3"/>'; break;
      default:
        s = '<path d="M60 14 L84 8 Q90 22 100 22 Q110 22 116 8 L140 14 L176 46 L156 70 L142 58 L142 126 L58 126 L58 58 L44 70 L24 46 Z" fill="#2bc46f" ' + SW + '/>' +
          txt(100, 96, 40, '9', '#fffdf6', ' stroke="' + INK + '" stroke-width="2"');
    }
    return svg('0 0 180 140', s);
  });

  add('j-dummy', function (o) {
    // The player, standing to be kitted out. Layers: legs, shin pads, socks, boots, body, shirt, face.
    var s = '<rect x="34" y="120" width="18" height="84" rx="8" fill="#ffd23f" ' + SW + '/><rect x="68" y="120" width="18" height="84" rx="8" fill="#ffd23f" ' + SW + '/>';
    if (o.pads && !o.socks) s += '<rect x="32" y="148" width="22" height="34" rx="6" fill="#3a86ff" ' + SW3 + '/><rect x="66" y="148" width="22" height="34" rx="6" fill="#3a86ff" ' + SW3 + '/>';
    if (o.socks) {
      var w = o.pads ? 26 : 22;
      s += '<rect x="' + (43 - w / 2) + '" y="144" width="' + w + '" height="62" rx="8" fill="#e5243b" ' + SW3 + '/><rect x="' + (77 - w / 2) + '" y="144" width="' + w + '" height="62" rx="8" fill="#e5243b" ' + SW3 + '/>' +
        '<path d="M32 154 L54 154 M66 154 L88 154" stroke="#fffdf6" stroke-width="5"/>';
    }
    if (o.boots) s += '<path d="M28 196 L56 196 L58 206 L70 210 Q72 218 62 218 L26 218 Z" fill="#2d2850" ' + SW3 + '/><path d="M64 196 L92 196 L94 206 L106 210 Q108 218 98 218 L62 218 Z" fill="#2d2850" ' + SW3 + '/>';
    else s += '<ellipse cx="42" cy="210" rx="12" ry="7" fill="#ffd23f" ' + SW3 + '/><ellipse cx="78" cy="210" rx="12" ry="7" fill="#ffd23f" ' + SW3 + '/>';
    s += '<path d="M60 22 L60 8" ' + SW3 + '/><circle cx="60" cy="6" r="6" fill="#e5243b"/>' +
      '<rect x="20" y="22" width="80" height="104" rx="26" fill="#ffd23f" ' + SW + '/>';
    if (o.shirt) s += '<path d="M22 74 L40 66 Q60 74 80 66 L98 74 L98 104 Q98 126 76 126 L44 126 Q22 126 22 104 Z" fill="#2bc46f" ' + SW3 + '/>' + txt(60, 114, 26, '9', '#fffdf6', ' stroke="' + INK + '" stroke-width="1.5"');
    s += '<circle cx="46" cy="46" r="5" fill="' + INK + '"/><circle cx="74" cy="46" r="5" fill="' + INK + '"/><path d="M48 58 Q60 66 72 58" fill="none" ' + SW3 + '/>';
    return svg('0 0 120 224', s);
  });

  add('j-lockers', function () {
    var s = '';
    for (var i = 0; i < 3; i++) {
      var x = 6 + i * 64;
      s += '<rect x="' + x + '" y="6" width="60" height="288" rx="6" fill="#7fb2ff" ' + SW + '/>' +
        '<path d="M' + (x + 14) + ' 26 L' + (x + 46) + ' 26 M' + (x + 14) + ' 38 L' + (x + 46) + ' 38 M' + (x + 14) + ' 50 L' + (x + 46) + ' 50" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>' +
        '<rect x="' + (x + 44) + '" y="140" width="8" height="28" rx="3" fill="#4b4466"/>';
    }
    return svg('0 0 200 300', s + '<path d="M16 70 L16 120" ' + HI + ' stroke-width="6"/>');
  });

  /* --------------------------------------------------------------- ceremony */
  add('j-podium', function () {
    return svg('0 0 300 150',
      '<rect x="10" y="60" width="94" height="86" rx="6" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="102" y="20" width="96" height="126" rx="6" fill="#ffd23f" ' + SW + '/>' +
      '<rect x="196" y="84" width="94" height="62" rx="6" fill="#c98b4a" ' + SW + '/>' +
      txt(57, 118, 40, '2') + txt(150, 92, 48, '1') + txt(243, 130, 36, '3') +
      '<path d="M114 34 L114 70" ' + HI + ' stroke-width="7"/>');
  });

  add('j-trophy', function (o) {
    var grime = o.clean ? '<path d="M70 44 Q60 60 66 80" ' + HI + ' stroke-width="9"/><path d="M150 30 L158 22 M162 46 L172 44 M44 30 L36 22" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/>' :
      '<path d="M62 52 Q80 40 96 58 Q110 44 128 60 Q140 70 124 82 Q100 94 80 84 Q58 76 62 52Z" fill="#9a6b3f" opacity=".55"/><circle cx="132" cy="40" r="9" fill="#9a6b3f" opacity=".55"/>';
    return svg('0 0 200 220',
      '<path d="M48 34 Q8 34 14 66 Q20 94 58 96" fill="none" stroke="#f5b400" stroke-width="12"/><path d="M48 34 Q8 34 14 66 Q20 94 58 96" fill="none" ' + SW3 + '/>' +
      '<path d="M152 34 Q192 34 186 66 Q180 94 142 96" fill="none" stroke="#f5b400" stroke-width="12"/><path d="M152 34 Q192 34 186 66 Q180 94 142 96" fill="none" ' + SW3 + '/>' +
      '<path d="M44 20 L156 20 Q156 112 100 118 Q44 112 44 20Z" fill="#ffd23f" ' + SW + '/>' +
      '<rect x="88" y="118" width="24" height="30" fill="#f5b400" ' + SW3 + '/>' +
      '<rect x="36" y="146" width="128" height="68" rx="8" fill="#4b4466" ' + SW + '/>' +
      '<rect x="48" y="158" width="104" height="44" rx="4" fill="' + (o.clean ? '#ffe066' : '#8a86a8') + '" ' + SW3 + '/>' + grime);
  });

  add('j-cloth', function () {
    return svg('0 0 160 120',
      '<path d="M14 70 Q20 30 64 26 Q110 20 140 40 Q156 70 128 92 Q90 112 50 104 Q12 98 14 70Z" fill="#3ec1ff" ' + SW + '/>' +
      '<path d="M40 60 Q70 46 112 56 M44 80 Q80 70 120 78" fill="none" stroke="' + INK + '" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M34 54 Q44 40 60 38" ' + HI + ' stroke-width="6"/>');
  });

  add('j-hurdle', function (o) {
    var bar = '';
    for (var i = 0; i < 6; i++) bar += '<rect x="' + (24 + i * 26) + '" y="20" width="26" height="30" fill="' + (i % 2 ? '#fffdf6' : '#e5243b') + '"/>';
    var up = '<path d="M36 50 L36 192 M164 50 L164 192" stroke="#8a86a8" stroke-width="12" stroke-linecap="round"/><path d="M36 50 L36 192 M164 50 L164 192" fill="none" ' + SW3 + '/>' +
      '<path d="M16 192 L56 192 M144 192 L184 192" ' + SW + '/>' + bar + '<rect x="24" y="20" width="156" height="30" fill="none" ' + SW + '/>';
    if (o.fallen) {
      var flat = '';
      for (var j = 0; j < 6; j++) flat += '<rect x="' + (24 + j * 26) + '" y="166" width="26" height="22" fill="' + (j % 2 ? '#fffdf6' : '#e5243b') + '"/>';
      return svg('0 0 200 200', '<path d="M30 188 L170 188" stroke="#8a86a8" stroke-width="10" stroke-linecap="round"/>' + flat + '<rect x="24" y="166" width="156" height="22" fill="none" ' + SW + '/>' +
        '<path d="M60 150 L70 160 M100 140 L100 156 M140 150 L130 160" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>');
    }
    return svg('0 0 200 200', up);
  });
})(typeof window !== 'undefined' ? window : globalThis);
