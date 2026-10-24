/* OBEY? LOL. — art pack B: home and kitchen props for levels 53–72 (Bossworth house-sits).
 * Original code-drawn SVG in the house style: chunky shapes, ink outlines, flat fills, one highlight. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY.art;
  if (!A || !A.addObject) return; // loaded before art.js (level lab double-load): skip quietly
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function add(k, f) { A.addObject(k, f); }
  function hi(d) { return '<path d="' + d + '" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>'; }

  /* ------------------------------------------------------------- kitchen */
  add('b-toaster', function (o) {
    var shade = ['#f6e2b3', '#f2d08a', '#d9963b', '#3b2a1a'][o.shade || 0];
    var up = o.down ? 52 : 22;
    return svg('0 0 200 200',
      '<rect x="56" y="' + up + '" width="40" height="44" rx="8" fill="' + shade + '" ' + SW3 + '/><rect x="104" y="' + up + '" width="40" height="44" rx="8" fill="' + shade + '" ' + SW3 + '/>' +
      '<rect x="24" y="56" width="152" height="120" rx="30" fill="#c3ccd8" ' + SW + '/>' + hi('M44 78 Q48 66 62 64') +
      '<rect x="52" y="52" width="44" height="10" rx="4" fill="#4b4466"/><rect x="104" y="52" width="44" height="10" rx="4" fill="#4b4466"/>' +
      '<rect x="176" y="' + (o.down ? 128 : 84) + '" width="18" height="14" rx="4" fill="#e5243b" ' + SW3 + '/><path d="M178 80 L178 150" stroke="' + INK + '" stroke-width="3"/>' +
      '<circle cx="100" cy="140" r="14" fill="#fffdf6" ' + SW3 + '/><path d="M100 140 L' + (o.down ? 110 : 94) + ' 131" ' + SW3 + '/>' +
      '<rect x="36" y="176" width="20" height="10" rx="3" fill="#4b4466"/><rect x="144" y="176" width="20" height="10" rx="3" fill="#4b4466"/>' +
      (o.down ? '<path d="M70 44 Q64 30 72 20 M100 44 Q94 28 102 16 M130 44 Q124 30 132 20" fill="none" stroke="' + (o.shade >= 3 ? '#4b4466' : '#8a86a8') + '" stroke-width="5" stroke-linecap="round" opacity=".7"/>' : ''));
  });

  add('b-smoke', function (o) {
    return svg('0 0 200 100', '<path d="M30 20 L170 20 Q170 70 100 76 Q30 70 30 20Z" fill="#fffdf6" ' + SW + '/><circle cx="100" cy="46" r="10" fill="' + (o.beeping ? '#e5243b' : '#8a86a8') + '" ' + SW3 + '/>' +
      '<path d="M60 38 L60 54 M140 38 L140 54" ' + SW3 + '/>' + (o.beeping ? '<path d="M18 60 L4 74 M182 60 L196 74 M100 84 L100 98" stroke="#e5243b" stroke-width="6" stroke-linecap="round"/>' : ''));
  });

  add('b-oven', function (o) {
    return svg('0 0 200 200',
      '<rect x="14" y="8" width="172" height="184" rx="14" fill="#fffdf6" ' + SW + '/><rect x="14" y="8" width="172" height="40" rx="14" fill="#c3ccd8" ' + SW + '/>' +
      '<circle cx="46" cy="28" r="10" fill="#4b4466" ' + SW3 + '/><circle cx="80" cy="28" r="10" fill="#4b4466" ' + SW3 + '/><rect x="110" y="18" width="62" height="20" rx="5" fill="#1c1640" ' + SW3 + '/>' +
      '<rect x="32" y="66" width="136" height="104" rx="12" fill="' + (o.on ? '#ff9f43' : '#2d2850') + '" ' + SW + '/>' +
      '<rect x="44" y="78" width="112" height="80" rx="8" fill="' + (o.on ? '#ffd23f' : '#4b4466') + '" opacity=".75"/>' +
      '<path d="M56 140 L144 140" stroke="#8a86a8" stroke-width="4"/>' +
      (o.cake ? '<path d="M70 140 L70 116 Q100 100 130 116 L130 140Z" fill="#f2c27b" ' + SW3 + '/>' : '') +
      '<rect x="40" y="54" width="120" height="8" rx="4" fill="#8a86a8" ' + SW3 + '/>' + hi('M48 84 L70 84'));
  });

  add('b-fridge', function (o) {
    var inside = o.open ? ('<rect x="38" y="20" width="124" height="166" rx="8" fill="' + (o.light ? '#fff6a8' : '#2d2850') + '" ' + SW3 + '/>' +
      '<path d="M38 72 L162 72 M38 124 L162 124" ' + SW3 + '/>' + (o.light ? '<circle cx="100" cy="32" r="8" fill="#ffe066" ' + SW3 + '/>' : '') +
      '<rect x="50" y="46" width="22" height="26" rx="4" fill="#e5243b" ' + SW3 + '/><ellipse cx="128" cy="112" rx="22" ry="12" fill="#ffd23f" ' + SW3 + '/><rect x="80" y="150" width="36" height="36" rx="6" fill="#7be37b" ' + SW3 + '/>' +
      '<path d="M162 14 L196 26 L196 194 L162 194Z" fill="#e9eef5" ' + SW + '/>') : '';
    var door = o.open ? '' : ('<rect x="30" y="10" width="140" height="182" rx="14" fill="#e9eef5" ' + SW + '/><path d="M30 70 L170 70" ' + SW + '/>' +
      '<rect x="146" y="30" width="10" height="28" rx="4" fill="#8a86a8" ' + SW3 + '/><rect x="146" y="88" width="10" height="44" rx="4" fill="#8a86a8" ' + SW3 + '/>' + hi('M46 90 L46 160') +
      '<circle cx="62" cy="34" r="7" fill="#e5243b" ' + SW3 + '/><rect x="88" y="26" width="16" height="16" rx="3" fill="#ffd23f" ' + SW3 + '/>');
    return svg('0 0 200 200', (o.open ? '<rect x="30" y="10" width="140" height="182" rx="14" fill="#c3ccd8" ' + SW + '/>' : '') + inside + door +
      (o.phone ? '<rect x="' + (o.open ? 112 : 112) + '" y="' + (o.open ? 136 : 140) + '" width="24" height="40" rx="5" fill="#2d2850" ' + SW3 + (o.open ? '' : ' opacity="0"') + '/>' : ''));
  });

  add('b-camphone', function (o) {
    var screen = o.photo === 'dark' ? '<rect x="38" y="36" width="64" height="104" rx="6" fill="#0e0b26"/>' :
      o.photo === 'bright' ? '<rect x="38" y="36" width="64" height="104" rx="6" fill="#fff6a8"/><circle cx="70" cy="62" r="8" fill="#ffe066" ' + SW3 + '/>' :
      '<rect x="38" y="36" width="64" height="104" rx="6" fill="#cfefff"/><circle cx="70" cy="80" r="16" fill="none" ' + SW3 + '/><circle cx="70" cy="80" r="6" fill="' + INK + '"/><path d="M58 112 L82 112" ' + SW3 + '/>';
    return svg('0 0 140 180', '<rect x="26" y="16" width="88" height="150" rx="16" fill="#2d2850" ' + SW + '/>' + screen + '<circle cx="70" cy="152" r="6" fill="#8a86a8"/>');
  });

  add('b-tub', function (o) {
    var fill = { soup: '#ff9f43', chilli: '#c2414d', mix: '#e0703f' }[o.content] || '#c3ccd8';
    var body = '<path d="M24 84 L176 84 L164 178 L36 178 Z" fill="#e9f6ff" fill-opacity="' + (o.open ? '.2' : '.9') + '" ' + SW + '/>';
    var food = o.open ? '<path d="M30 100 L170 100 L163 172 L37 172 Z" fill="' + fill + '"/>' + (o.content === 'chilli' || o.content === 'mix' ? '<circle cx="70" cy="128" r="7" fill="#7a1f3d"/><circle cx="118" cy="146" r="7" fill="#7a1f3d"/><circle cx="140" cy="118" r="6" fill="#7a1f3d"/>' : '') +
      (o.content === 'soup' || o.content === 'mix' ? '<path d="M56 112 Q76 104 96 112 M104 136 Q124 128 144 136" fill="none" stroke="#fff6a8" stroke-width="5" stroke-linecap="round"/>' : '') : '<path d="M30 100 L170 100 L163 172 L37 172 Z" fill="#c3ccd8" opacity=".75"/>';
    var lid = o.open ? '<g transform="rotate(-24 30 70)"><rect x="18" y="54" width="164" height="24" rx="8" fill="#7fb2ff" ' + SW + '/></g>' : '<rect x="16" y="64" width="168" height="24" rx="8" fill="#7fb2ff" ' + SW + '/>';
    return svg('0 0 200 200', food + body + lid + '<rect x="60" y="112" width="80" height="34" rx="4" fill="#fffdf6" ' + SW3 + ' opacity="' + (o.open ? 0 : 1) + '"/>');
  });

  add('b-microwave', function (o) {
    return svg('0 0 240 160', '<rect x="8" y="10" width="224" height="140" rx="14" fill="#c3ccd8" ' + SW + '/><rect x="24" y="26" width="148" height="108" rx="10" fill="' + (o.on ? '#ffe066' : '#2d2850') + '" ' + SW + '/>' +
      '<rect x="186" y="28" width="32" height="18" rx="4" fill="#1c1640" ' + SW3 + '/><circle cx="202" cy="70" r="9" fill="#fffdf6" ' + SW3 + '/><circle cx="202" cy="100" r="9" fill="#fffdf6" ' + SW3 + '/>' +
      '<path d="M36 120 L160 120" stroke="#8a86a8" stroke-width="4" opacity=".6"/>' + hi('M38 44 L62 44'));
  });

  /* ------------------------------------------------------------- laundry */
  add('b-washer', function (o) {
    var drum = o.sock ? '<path d="M78 112 Q100 96 122 112 Q126 136 100 140 Q74 136 78 112Z" fill="#fffdf6" ' + SW3 + '/><path d="M106 118 L126 118 L128 140 L114 146 L106 138Z" fill="#e5243b" ' + SW3 + '/>' :
      '<path d="M76 110 Q100 94 124 110 Q130 138 100 142 Q70 138 76 110Z" fill="#fffdf6" ' + SW3 + '/>';
    return svg('0 0 200 200', '<rect x="20" y="10" width="160" height="182" rx="14" fill="#fffdf6" ' + SW + '/><path d="M20 46 L180 46" ' + SW + '/>' +
      '<circle cx="146" cy="28" r="10" fill="#c3ccd8" ' + SW3 + '/><rect x="40" y="20" width="56" height="16" rx="4" fill="#7fb2ff" ' + SW3 + '/>' +
      '<circle cx="100" cy="122" r="56" fill="#c3ccd8" ' + SW + '/><circle cx="100" cy="122" r="42" fill="' + (o.pink ? '#ffb3d1' : '#cfefff') + '" ' + SW + '/>' +
      '<g class="' + (o.spinning ? 'spin' : '') + '" style="transform-origin:100px 122px">' + drum + '</g>' + hi('M74 98 Q82 88 94 86') +
      (o.open ? '<circle cx="36" cy="122" r="44" fill="#c3ccd8" ' + SW + ' opacity=".9"/>' : ''));
  });

  add('b-jumper', function (o) {
    var s = o.tiny ? ' transform="translate(60 60) scale(.4)"' : '';
    return svg('0 0 200 180', '<g' + s + '><path d="M60 20 Q100 40 140 20 L190 60 L166 92 L150 80 L150 168 L50 168 L50 80 L34 92 L10 60 Z" fill="#2fae84" ' + SW + '/>' +
      '<path d="M70 70 L130 70 M70 100 L130 100 M70 130 L130 130" stroke="#ffd23f" stroke-width="7" stroke-dasharray="10 8"/><path d="M80 24 Q100 44 120 24" fill="none" ' + SW3 + '/></g>');
  });

  add('b-sheet', function (o) {
    var n = o.balled || 0;
    if (!n) return svg('0 0 200 140', '<path d="M14 40 Q30 20 60 34 Q100 10 140 30 Q176 18 188 44 Q196 80 180 108 Q150 130 100 120 Q50 132 20 108 Q4 76 14 40Z" fill="#cfe9ff" ' + SW + '/>' +
      '<path d="M30 52 Q40 40 54 48 M150 46 Q162 40 172 52 M28 100 Q40 112 52 102 M150 104 Q164 114 176 98" fill="none" stroke="#7fb2ff" stroke-width="6" stroke-linecap="round"/>' + hi('M60 60 Q100 46 140 60'));
    var r = Math.max(34, 60 - n * 8);
    return svg('0 0 200 140', '<circle cx="100" cy="74" r="' + r + '" fill="#cfe9ff" ' + SW + '/><path d="M' + (100 - r / 2) + ' 60 Q100 ' + (74 + r / 3) + ' ' + (100 + r / 2) + ' 66 M84 90 Q100 70 118 96" fill="none" stroke="#7fb2ff" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M' + (100 + r - 6) + ' 54 L' + (100 + r + 14) + ' 40" ' + SW3 + '/>');
  });

  add('b-bed', function (o) {
    return svg('0 0 240 160', '<rect x="10" y="20" width="30" height="130" rx="8" fill="#a0784d" ' + SW + '/><rect x="200" y="60" width="30" height="90" rx="8" fill="#a0784d" ' + SW + '/>' +
      '<rect x="36" y="80" width="170" height="44" rx="10" fill="' + (o.sheet ? '#cfe9ff' : '#fffdf6') + '" ' + SW + '/>' +
      (o.sheet ? '' : '<path d="M60 92 L66 98 M90 92 L96 98 M120 92 L126 98 M150 92 L156 98 M180 92 L186 98 M75 110 L81 116 M105 110 L111 116 M135 110 L141 116 M165 110 L171 116" stroke="#b48cff" stroke-width="4" stroke-linecap="round"/>') +
      '<rect x="44" y="56" width="56" height="28" rx="12" fill="#fffdf6" ' + SW3 + '/>' +
      (o.blanket ? '<path d="M100 74 L206 74 L206 124 L100 124Z" fill="#ff77b4" ' + SW + '/>' : '') +
      '<path d="M36 124 L36 150 M206 124 L206 150" ' + SW + '/>');
  });

  add('b-sock', function (o) {
    var c = { blue: '#3a86ff', green: '#2bc46f', yellow: '#ffc31f', red: '#e5243b', purple: '#9b5de5' }[o.color] || '#fffdf6';
    var marks = '';
    if (o.dots) marks = '<circle cx="48" cy="24" r="6" fill="#fff"/><circle cx="64" cy="48" r="6" fill="#fff"/><circle cx="44" cy="72" r="6" fill="#fff"/><circle cx="84" cy="104" r="6" fill="#fff"/><circle cx="62" cy="96" r="6" fill="#fff"/>';
    for (var i = 0; i < (o.stripes || 0); i++) marks += '<rect x="30" y="' + (16 + i * 18) + '" width="44" height="9" fill="#fff"/>';
    return svg('0 0 140 140', '<path d="M30 6 L74 6 L74 74 L118 92 Q134 104 122 124 L60 126 Q28 122 30 96 Z" fill="' + c + '" ' + SW + '/>' + marks +
      '<path d="M30 6 L74 6 L74 74 L118 92 Q134 104 122 124 L60 126 Q28 122 30 96 Z" fill="none" ' + SW + '/>');
  });

  add('b-sofa', function () {
    return svg('0 0 240 120', '<rect x="20" y="14" width="200" height="56" rx="18" fill="#9b5de5" ' + SW + '/><rect x="6" y="44" width="40" height="52" rx="14" fill="#7d3fc6" ' + SW + '/><rect x="194" y="44" width="40" height="52" rx="14" fill="#7d3fc6" ' + SW + '/>' +
      '<rect x="40" y="56" width="160" height="34" rx="10" fill="#b48cff" ' + SW + '/><path d="M40 90 L40 112 M200 90 L200 112" ' + SW + '/>' + hi('M40 30 L90 30'));
  });

  add('b-bunny', function (o) {
    return svg('0 0 160 140', '<path d="M56 60 Q40 6 58 4 Q74 6 72 58 M92 58 Q96 6 112 6 Q126 12 106 62" fill="#c9c4d6" ' + SW + '/>' +
      '<ellipse cx="82" cy="100" rx="64" ry="36" fill="#c9c4d6" ' + SW + '/><path d="M30 92 Q20 80 30 70 M140 96 Q152 86 146 74" fill="none" stroke="#8a86a8" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="64" cy="90" r="5" fill="' + INK + '"/><circle cx="96" cy="90" r="5" fill="' + INK + '"/><ellipse cx="80" cy="104" rx="6" ry="4" fill="#ff77b4"' + (o.twitch ? ' class="laugh-shake"' : '') + '/>' +
      '<path d="M66 104 L44 98 M66 108 L44 112 M94 104 L116 98 M94 108 L116 112" stroke="' + INK + '" stroke-width="2"/>');
  });

  add('b-dust', function () {
    return svg('0 0 160 80', '<path d="M14 64 Q24 34 50 40 Q66 18 92 32 Q120 22 136 44 Q154 50 146 66 Z" fill="#8a86a8" ' + SW3 + '/><path d="M40 56 L46 50 M76 46 L84 52 M110 50 L118 44" stroke="#4b4466" stroke-width="3"/>');
  });

  add('b-carrot', function () {
    return svg('0 0 120 160', '<path d="M60 150 L30 50 Q60 34 90 50 Z" fill="#ff8c1a" ' + SW + '/><path d="M44 74 L58 74 M48 98 L62 96 M54 122 L64 120" ' + SW3 + '/>' +
      '<path d="M60 44 Q40 10 50 4 Q62 18 62 40 Q70 8 84 10 Q80 30 64 46" fill="#2bc46f" ' + SW3 + '/>');
  });

  add('b-hutch', function (o) {
    return svg('0 0 200 180', '<path d="M10 70 L100 14 L190 70 Z" fill="#c2414d" ' + SW + '/><rect x="24" y="68" width="152" height="96" rx="6" fill="#c98b4a" ' + SW + '/>' +
      '<rect x="44" y="86" width="64" height="64" rx="6" fill="#3b2a1a" ' + SW3 + '/>' +
      (o.bunny ? '<path d="M62 120 Q56 92 64 90 Q70 92 70 118 M82 118 Q84 92 92 92 Q98 96 88 120" fill="#c9c4d6" ' + SW3 + '/><ellipse cx="76" cy="136" rx="26" ry="14" fill="#c9c4d6" ' + SW3 + '/><circle cx="68" cy="132" r="3" fill="' + INK + '"/><circle cx="84" cy="132" r="3" fill="' + INK + '"/>' : '') +
      '<path d="M124 90 L124 150 M140 90 L140 150 M156 90 L156 150" stroke="#8a86a8" stroke-width="4"/><path d="M118 86 L162 86 L162 154 L118 154Z" fill="none" ' + SW3 + '/>');
  });

  add('b-vacuum', function (o) {
    return svg('0 0 160 200', '<path d="M100 20 Q130 20 130 50 L118 150" fill="none" stroke="#4b4466" stroke-width="10" stroke-linecap="round"/><path d="M100 20 Q130 20 130 50 L118 150" fill="none" ' + SW3 + ' opacity=".2"/>' +
      '<rect x="20" y="70" width="84" height="100" rx="26" fill="#e5243b" ' + SW + '/><circle cx="62" cy="120" r="20" fill="#ffd23f" ' + SW3 + '/>' +
      '<circle cx="36" cy="176" r="12" fill="#4b4466" ' + SW3 + '/><circle cx="90" cy="176" r="12" fill="#4b4466" ' + SW3 + '/>' +
      '<rect x="96" y="150" width="56" height="22" rx="6" fill="#4b4466" ' + SW + '/>' + hi('M34 90 L34 112') +
      (o.on ? '<path d="M152 140 L158 128 M150 182 L158 192" stroke="#8a86a8" stroke-width="5" stroke-linecap="round"/>' : ''));
  });

  /* ------------------------------------------------------------- hallway */
  add('b-thermostat', function (o) {
    var t = String(o.temp == null ? 18 : o.temp);
    var face = '<rect x="20" y="20" width="160" height="160" rx="30" fill="#fffdf6" ' + SW + '/><rect x="44" y="52" width="112" height="64" rx="10" fill="#1c1640" ' + SW3 + '/>' +
      '<text x="100" y="104" text-anchor="middle" font-size="46" fill="#7dffb2" font-family="monospace" font-weight="700">' + t + '°</text>' +
      '<text x="100" y="146" text-anchor="middle" font-size="18" fill="' + INK + '">THIS WAY UP</text><path d="M100 158 L100 172 M92 166 L100 158 L108 166" ' + SW3 + '/>' +
      '<circle cx="36" cy="36" r="5" fill="#8a86a8"/><circle cx="164" cy="164" r="5" fill="#8a86a8"/>';
    return svg('0 0 200 200', o.flipped ? '<g transform="rotate(180 100 100)">' + face + '</g>' : face);
  });

  add('b-thermometer', function (o) {
    var t = o.temp || 18, h = Math.max(10, Math.min(120, (t - 5) * 5));
    var ticks = '';
    for (var i = 10; i <= 30; i += 5) { var y = 150 - (i - 5) * 5; ticks += '<path d="M66 ' + y + ' L78 ' + y + '" ' + SW3 + '/><text x="84" y="' + (y + 6) + '" font-size="16" fill="' + INK + '">' + i + '</text>'; }
    return svg('0 0 120 200', '<rect x="30" y="10" width="28" height="160" rx="14" fill="#fffdf6" ' + SW + '/><rect x="38" y="' + (150 - h) + '" width="12" height="' + (h + 20) + '" rx="6" fill="#e5243b"/>' +
      '<circle cx="44" cy="174" r="20" fill="#e5243b" ' + SW + '/>' + ticks);
  });

  add('b-dog', function () {
    var c = '#d9a066';
    return svg('0 0 160 140', '<ellipse cx="96" cy="96" rx="54" ry="32" fill="' + c + '" ' + SW + '/><path d="M146 86 Q164 66 156 54" fill="none" stroke="' + c + '" stroke-width="10" stroke-linecap="round"/>' +
      '<circle cx="52" cy="64" r="34" fill="' + c + '" ' + SW + '/><path d="M24 50 Q8 70 22 92 Q34 80 32 54Z M80 50 Q96 70 82 92 Q70 80 72 54Z" fill="#8a5a2b" ' + SW3 + '/>' +
      '<circle cx="42" cy="60" r="5" fill="' + INK + '"/><circle cx="62" cy="60" r="5" fill="' + INK + '"/><ellipse cx="52" cy="76" rx="8" ry="6" fill="' + INK + '"/><path d="M52 82 Q52 96 60 96" fill="none" stroke="#e5243b" stroke-width="5" stroke-linecap="round"/>');
  });

  add('b-tortoise', function () {
    return svg('0 0 160 120', '<ellipse cx="40" cy="78" rx="22" ry="16" fill="#9fd36a" ' + SW + '/><circle cx="34" cy="74" r="4" fill="' + INK + '"/>' +
      '<path d="M54 98 L60 112 M120 98 L114 112" stroke="#9fd36a" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M50 96 Q52 30 100 28 Q148 30 150 96 Z" fill="#7d5a2b" ' + SW + '/><path d="M74 96 L80 60 L100 46 L120 60 L126 96 M80 60 L60 72 M120 60 L140 72 M100 46 L100 30" fill="none" stroke="#c98b4a" stroke-width="5"/>' +
      '<path d="M50 96 L150 96" ' + SW + '/>');
  });

  add('b-bowl', function (o) {
    var food = '';
    if (o.food === 'fish') food = '<path d="M50 50 Q80 26 110 50 Q80 74 50 50Z M108 50 L132 34 L132 66Z" fill="#7fb2ff" ' + SW3 + '/>';
    if (o.food === 'bone') food = '<path d="M56 48 L144 48" stroke="#fffdf6" stroke-width="18" stroke-linecap="round"/><circle cx="52" cy="40" r="10" fill="#fffdf6" ' + SW3 + '/><circle cx="52" cy="58" r="10" fill="#fffdf6" ' + SW3 + '/><circle cx="148" cy="40" r="10" fill="#fffdf6" ' + SW3 + '/><circle cx="148" cy="58" r="10" fill="#fffdf6" ' + SW3 + '/>';
    if (o.food === 'lettuce') food = '<path d="M60 58 Q56 26 84 30 Q100 12 120 30 Q146 28 140 58Z" fill="#7be37b" ' + SW3 + '/><path d="M100 56 L100 30 M84 50 L94 38 M116 50 L106 38" stroke="#2fae84" stroke-width="4"/>';
    return svg('0 0 200 120', food + '<path d="M16 60 L184 60 L164 112 L36 112 Z" fill="' + (o.color || '#3a86ff') + '" ' + SW + '/><path d="M16 60 L184 60" ' + SW + '/>' + hi('M40 76 L70 76'));
  });

  add('b-bone', function () {
    return svg('0 0 160 80', '<path d="M30 40 L130 40" stroke="' + INK + '" stroke-width="26" stroke-linecap="round"/><path d="M30 40 L130 40" stroke="#fffdf6" stroke-width="18" stroke-linecap="round"/>' +
      '<circle cx="24" cy="28" r="14" fill="#fffdf6" ' + SW3 + '/><circle cx="24" cy="52" r="14" fill="#fffdf6" ' + SW3 + '/><circle cx="136" cy="28" r="14" fill="#fffdf6" ' + SW3 + '/><circle cx="136" cy="52" r="14" fill="#fffdf6" ' + SW3 + '/>' +
      '<path d="M34 40 L126 40" stroke="#fffdf6" stroke-width="14"/>');
  });

  add('b-lettuce', function () {
    return svg('0 0 140 120', '<path d="M20 100 Q8 50 40 40 Q50 10 80 18 Q110 8 120 40 Q140 60 120 100 Z" fill="#7be37b" ' + SW + '/><path d="M70 100 L70 34 M70 70 L46 50 M70 60 L96 42 M70 86 L100 70" fill="none" stroke="#2fae84" stroke-width="5" stroke-linecap="round"/>');
  });

  add('b-houseplant', function (o) {
    var soil = o.soil === 'wet' ? '#3b2a1a' : '#c9a86a';
    var cracks = o.soil === 'dry' ? '<path d="M70 94 L80 100 L76 106 M118 96 L128 102 M98 98 L104 104" stroke="#8a5a2b" stroke-width="3" fill="none"/>' : '';
    var top = '';
    var droop = o.droopy;
    if (o.kind === 'cactus') top = '<path d="M84 92 L84 34 Q100 12 116 34 L116 92Z" fill="#2fae84" ' + SW + '/><path d="M84 64 L66 64 L66 44 Q72 36 76 44 L76 54 L84 54 M116 56 L132 56 L132 36 Q126 28 122 36 L122 46 L116 46" fill="#2fae84" ' + SW3 + '/>' +
      '<path d="M94 40 L90 36 M106 50 L110 46 M94 70 L90 66 M106 80 L110 76" ' + SW3 + '/><circle cx="100" cy="22" r="7" fill="#ff77b4" ' + SW3 + '/>';
    else if (o.kind === 'plastic') top = '<path d="M100 92 L100 40" ' + SW + '/><path d="M100 70 L70 52 L76 72Z M100 60 L130 42 L124 62Z M100 46 L84 22 L104 30Z M100 46 L120 22 L112 40Z" fill="#00d68f" ' + SW3 + '/>';
    else if (o.kind === 'lily') top = droop ? '<path d="M100 92 Q100 60 70 70 Q60 84 76 86 Q92 82 100 92 M100 92 Q102 56 134 66 Q142 82 126 84 Q110 80 100 92" fill="#3fbf6f" ' + SW3 + '/><path d="M100 92 Q96 50 82 56" fill="none" ' + SW3 + '/><path d="M82 56 Q72 64 76 72 Q86 66 82 56Z" fill="#fffdf6" ' + SW3 + '/>'
      : '<path d="M100 92 Q70 70 76 36 Q96 50 100 92 M100 92 Q130 70 124 36 Q104 50 100 92" fill="#3fbf6f" ' + SW3 + '/><path d="M100 92 L100 30" ' + SW3 + '/><path d="M100 14 Q116 26 100 40 Q84 26 100 14Z" fill="#fffdf6" ' + SW3 + '/>';
    else if (o.kind === 'basil') top = '<path d="M100 92 L100 40" ' + SW3 + '/><ellipse cx="80" cy="66" rx="18" ry="10" fill="#2bc46f" ' + SW3 + '/><ellipse cx="120" cy="60" rx="18" ry="10" fill="#2bc46f" ' + SW3 + '/><ellipse cx="86" cy="40" rx="15" ry="9" fill="#2bc46f" ' + SW3 + '/><ellipse cx="114" cy="34" rx="15" ry="9" fill="#2bc46f" ' + SW3 + '/>';
    else top = droop ? '<path d="M100 92 Q70 60 46 92 M100 92 Q130 60 154 92 M100 92 Q86 50 60 66 M100 92 Q114 50 140 66" fill="none" stroke="#5f9e3a" stroke-width="9" stroke-linecap="round"/>'
      : '<path d="M100 92 Q70 50 54 30 M100 92 Q130 50 146 30 M100 92 Q96 40 100 14 M100 92 Q80 60 50 60 M100 92 Q120 60 150 60" fill="none" stroke="#2ea35b" stroke-width="9" stroke-linecap="round"/>';
    var pot = '<path d="M56 90 L144 90 L132 176 L68 176 Z" fill="' + (o.kind === 'plastic' ? '#ff77b4' : '#e07a45') + '" ' + SW + '/><path d="M52 86 L148 86 L148 100 L52 100Z" fill="' + soil + '" ' + SW3 + '/>' + cracks;
    var drops = o.watered ? '<path d="M150 20 Q156 32 150 36 Q144 32 150 20Z M164 40 Q170 52 164 56 Q158 52 164 40Z" fill="#3ec1ff" ' + SW3 + '/>' : '';
    var tag = o.kind === 'plastic' ? '<rect x="120" y="120" width="40" height="22" rx="4" fill="#fffdf6" ' + SW3 + '/><text x="140" y="136" text-anchor="middle" font-size="13" fill="' + INK + '">£2.99</text>' : '';
    return svg('0 0 200 200', top + pot + tag + drops);
  });

  add('b-can', function () {
    return svg('0 0 200 160', '<path d="M60 60 L140 60 L132 146 L68 146 Z" fill="#3ec1ff" ' + SW + '/><path d="M136 80 L186 40" stroke="' + INK + '" stroke-width="16" stroke-linecap="round"/><path d="M136 80 L186 40" stroke="#3ec1ff" stroke-width="9" stroke-linecap="round"/>' +
      '<rect x="176" y="26" width="20" height="24" rx="4" fill="#2f6fe4" ' + SW3 + ' transform="rotate(-38 186 38)"/><path d="M70 60 Q100 6 130 60" fill="none" ' + SW + '/>' + hi('M76 80 L76 120'));
  });

  /* ------------------------------------------------------------ bathroom */
  add('b-bathtub', function (o) {
    var lvl = Math.max(0, Math.min(1, o.level || 0));
    var top = 132 - lvl * 72;
    return svg('0 0 300 200', '<path d="M20 60 L280 60 L264 162 Q260 180 236 180 L64 180 Q40 180 36 162 Z" fill="#fffdf6" ' + SW + '/>' +
      (lvl > 0 ? '<path d="M' + (28 + (132 - top) * 0.02) + ' ' + top + ' L' + (272 - (132 - top) * 0.02) + ' ' + top + ' L262 160 Q258 172 236 172 L64 172 Q42 172 38 160 Z" fill="#7fd3ff" opacity=".85"/>' : '') +
      '<path d="M30 60 L270 60" ' + SW + '/><path d="M40 84 L260 84" stroke="#e5243b" stroke-width="3" stroke-dasharray="10 8"/>' +
      '<circle cx="150" cy="166" r="8" fill="' + (o.plug ? '#4b4466' : '#1c1640') + '" ' + SW3 + '/>' +
      '<path d="M60 180 L50 196 M240 180 L250 196" ' + SW + '/>' + hi('M50 76 L70 140'));
  });

  add('b-plug', function () {
    return svg('0 0 120 120', '<path d="M14 14 Q30 40 46 50 Q60 58 70 64" fill="none" stroke="#8a86a8" stroke-width="6" stroke-dasharray="6 5"/><ellipse cx="80" cy="84" rx="30" ry="18" fill="#4b4466" ' + SW + '/><rect x="70" y="56" width="20" height="14" rx="4" fill="#c3ccd8" ' + SW3 + '/>');
  });

  add('b-taps', function (o) {
    return svg('0 0 200 160', '<rect x="40" y="70" width="120" height="26" rx="10" fill="#c3ccd8" ' + SW + '/><path d="M100 70 L100 40 Q100 20 130 20 L150 20 L150 44" fill="none" stroke="' + INK + '" stroke-width="18" stroke-linecap="round"/><path d="M100 70 L100 40 Q100 20 130 20 L150 20 L150 44" fill="none" stroke="#c3ccd8" stroke-width="10" stroke-linecap="round"/>' +
      '<rect x="44" y="46" width="30" height="24" rx="6" fill="' + (o.on ? '#e5243b' : '#ff8fa0') + '" ' + SW3 + '/><text x="59" y="64" text-anchor="middle" font-size="16" fill="#fff">H</text>' +
      (o.on ? '<path d="M150 50 L150 150" stroke="#3ec1ff" stroke-width="10" stroke-linecap="round" opacity=".8"/>' : ''));
  });

  add('b-duck', function () {
    return svg('0 0 140 120', '<path d="M20 70 Q20 106 70 106 Q120 106 124 74 Q126 60 108 64 L80 66 Q90 52 86 36 Q78 12 54 16 Q30 22 34 48 Q36 60 44 64 Q20 60 20 70Z" fill="#ffd23f" ' + SW + '/>' +
      '<path d="M30 40 L8 46 L30 52Z" fill="#ff8c1a" ' + SW3 + '/><circle cx="52" cy="36" r="5" fill="' + INK + '"/><path d="M60 80 Q80 92 100 78" fill="none" stroke="#f5b400" stroke-width="5" stroke-linecap="round"/>');
  });

  add('b-dish', function (o) {
    var g = o.grime || 0, spots = '';
    var SP = [[0, 0], [-18, 8], [16, -6], [4, 14], [-10, -12], [20, 12]];
    var cx = 100, cy = 100;
    var body;
    if (o.kind === 'glass') { body = '<path d="M64 30 L136 30 L126 170 L74 170 Z" fill="#e9f6ff" ' + SW + '/>' + hi('M80 50 L84 140'); cy = 110; }
    else if (o.kind === 'mug') { body = '<rect x="46" y="50" width="96" height="110" rx="12" fill="#ff77b4" ' + SW + '/><path d="M142 76 Q178 76 176 108 Q174 136 142 132" fill="none" ' + SW + '/>' + hi('M60 70 L60 120'); cx = 94; cy = 104; }
    else if (o.kind === 'pan') { body = '<ellipse cx="86" cy="104" rx="70" ry="54" fill="#4b4466" ' + SW + '/><ellipse cx="86" cy="104" rx="54" ry="40" fill="#8a86a8" ' + SW3 + '/><path d="M150 96 L196 82 L198 100 L154 114" fill="#2d2850" ' + SW + '/>'; cx = 86; cy = 104; }
    else { body = '<circle cx="100" cy="100" r="80" fill="#fffdf6" ' + SW + '/><circle cx="100" cy="100" r="54" fill="none" stroke="#7fb2ff" stroke-width="5"/>'; }
    var n = [0, 1, 3, 6][g] || 0;
    for (var i = 0; i < n; i++) spots += '<ellipse cx="' + (cx + SP[i][0]) + '" cy="' + (cy + SP[i][1]) + '" rx="' + (9 + (i % 2) * 4) + '" ry="7" fill="#8a5a2b" opacity=".85"/>';
    if (g >= 3) spots += '<path d="M' + (cx - 30) + ' ' + (cy + 22) + ' Q' + cx + ' ' + (cy + 4) + ' ' + (cx + 30) + ' ' + (cy + 24) + '" fill="none" stroke="#6b3e1a" stroke-width="8" stroke-linecap="round"/>';
    var sparkle = o.clean ? '<path d="M160 30 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill="#ffd23f" ' + SW3 + '/>' : '';
    return svg('0 0 200 200', body + (o.clean ? '' : spots) + sparkle);
  });

  add('b-sink', function (o) {
    var water = o.water === 'gravy' ? '#a0603a' : (o.water === 'foam' ? '#fffdf6' : '#7fd3ff');
    return svg('0 0 300 160', '<rect x="6" y="40" width="288" height="114" rx="12" fill="#c3ccd8" ' + SW + '/><rect x="36" y="56" width="228" height="84" rx="14" fill="#8a86a8" ' + SW + '/>' +
      '<path d="M40 76 L260 76 L260 126 Q260 136 250 136 L50 136 Q40 136 40 126Z" fill="' + water + '" opacity=".9"/>' +
      (o.water === 'foam' ? '<circle cx="80" cy="74" r="18" fill="#fffdf6" ' + SW3 + '/><circle cx="120" cy="64" r="22" fill="#fffdf6" ' + SW3 + '/><circle cx="170" cy="70" r="18" fill="#fffdf6" ' + SW3 + '/><circle cx="214" cy="64" r="20" fill="#fffdf6" ' + SW3 + '/>' :
        '<circle cx="90" cy="86" r="7" fill="#fffdf6" ' + SW3 + '/><circle cx="110" cy="80" r="5" fill="#fffdf6" ' + SW3 + '/><circle cx="200" cy="88" r="6" fill="#fffdf6" ' + SW3 + '/>') +
      '<path d="M150 40 L150 12 Q150 2 162 2 L182 2" fill="none" stroke="' + INK + '" stroke-width="14" stroke-linecap="round"/><path d="M150 40 L150 12 Q150 2 162 2 L182 2" fill="none" stroke="#c3ccd8" stroke-width="7" stroke-linecap="round"/>');
  });

  add('b-soap', function () {
    return svg('0 0 120 200', '<rect x="22" y="50" width="76" height="140" rx="20" fill="#7be37b" ' + SW + '/><rect x="44" y="20" width="32" height="34" rx="6" fill="#2fae84" ' + SW3 + '/><path d="M60 20 L60 6 L84 6" fill="none" ' + SW3 + '/>' +
      '<circle cx="60" cy="112" r="20" fill="#fffdf6" ' + SW3 + '/><circle cx="54" cy="106" r="5" fill="#cfefff"/>' + hi('M36 70 L36 160'));
  });

  add('b-tin', function (o) {
    return svg('0 0 140 180', '<rect x="20" y="24" width="100" height="140" rx="10" fill="#c3ccd8" ' + SW + '/><rect x="20" y="56" width="100" height="72" fill="#e5243b" ' + SW3 + '/>' +
      '<ellipse cx="70" cy="24" rx="50" ry="12" fill="' + (o.empty ? '#4b4466' : '#e9eef5') + '" ' + SW + '/><path d="M36 92 Q70 70 104 92" fill="none" stroke="#fffdf6" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M32 40 L108 40 M32 148 L108 148" stroke="#8a86a8" stroke-width="3"/>');
  });

  add('b-spoon', function (o) {
    return svg('0 0 80 200', (o.down ? '<g transform="rotate(180 40 100)">' : '<g>') + '<ellipse cx="40" cy="44" rx="26" ry="36" fill="#c3ccd8" ' + SW + '/><path d="M40 80 L40 190" stroke="' + INK + '" stroke-width="16" stroke-linecap="round"/><path d="M40 80 L40 190" stroke="#c3ccd8" stroke-width="9" stroke-linecap="round"/>' + hi('M28 30 L30 52') + '</g>');
  });

  add('b-soupmug', function (o) {
    return svg('0 40 200 140', '<rect x="36" y="50" width="110" height="120" rx="14" fill="#fffdf6" ' + SW + '/><path d="M146 76 Q190 76 186 112 Q182 144 146 140" fill="none" ' + SW + '/>' +
      (o.soup ? '<rect x="44" y="58" width="94" height="18" rx="6" fill="#e5243b"/><path d="M70 70 Q64 58 72 46 M108 70 Q102 58 110 46" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>' : '') +
      '<path d="M60 110 L120 110" stroke="#7fb2ff" stroke-width="6" stroke-linecap="round"/>');
  });

  add('b-cabinet', function (o) {
    return svg('0 0 200 200', '<rect x="10" y="10" width="180" height="180" rx="12" fill="#fffdf6" ' + SW + '/>' +
      (o.open ? '<rect x="22" y="22" width="156" height="156" rx="8" fill="#e9dcff" ' + SW3 + '/><path d="M22 100 L178 100" ' + SW3 + '/><rect x="40" y="60" width="26" height="40" rx="6" fill="#ff77b4" ' + SW3 + '/><rect x="80" y="70" width="40" height="30" rx="6" fill="#7fb2ff" ' + SW3 + '/><circle cx="148" cy="150" r="20" fill="#ffd23f" ' + SW3 + '/><text x="148" y="157" text-anchor="middle" font-size="20" fill="' + INK + '">★</text>'
        : '<rect x="22" y="22" width="156" height="156" rx="8" fill="#cfefff" ' + SW3 + '/>' + hi('M40 40 L80 80 M40 70 L60 90') + '<rect x="150" y="84" width="14" height="32" rx="4" fill="#8a86a8" ' + SW3 + '/>'));
  });

  add('b-toothcup', function (o) {
    var n = o.n || 2, brushes = '', cols = ['#e5243b', '#2bc46f', '#3a86ff', '#ffc31f'];
    for (var i = 0; i < n; i++) { var x = 70 + i * (60 / Math.max(1, n - 1)); brushes += '<path d="M' + x + ' 100 L' + (x + (i - (n - 1) / 2) * 10) + ' 20" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/><path d="M' + x + ' 100 L' + (x + (i - (n - 1) / 2) * 10) + ' 20" stroke="' + cols[i % 4] + '" stroke-width="6" stroke-linecap="round"/>' + '<rect x="' + (x + (i - (n - 1) / 2) * 10 - 6) + '" y="14" width="12" height="16" rx="3" fill="#fffdf6" ' + SW3 + '/>'; }
    return svg('0 0 200 200', brushes + '<path d="M52 90 L148 90 L138 186 L62 186 Z" fill="#7fb2ff" ' + SW + '/>' + hi('M70 110 L72 160'));
  });

  add('b-towel', function (o) {
    var c = o.color || '#ff77b4';
    return svg('0 0 120 200', '<path d="M10 20 L110 20" stroke="#8a86a8" stroke-width="10" stroke-linecap="round"/><path d="M22 14 L98 14 L98 186 L22 186 Z" fill="' + c + '" ' + SW + '/><path d="M22 150 L98 150 M22 164 L98 164" stroke="#fff" stroke-width="5" opacity=".7"/>');
  });

  /* ------------------------------------------------------------- bedroom */
  add('b-lunchbox', function (o) {
    var n = o.count || 0, dots = '';
    for (var i = 0; i < n; i++) dots += '<circle cx="' + (52 + i * 32) + '" cy="96" r="12" fill="' + ['#f2c27b', '#e5243b', '#ff8c1a', '#ffd23f', '#7be37b'][i % 5] + '" ' + SW3 + '/>';
    return svg('0 0 200 160', (o.closed ? '<rect x="14" y="40" width="172" height="40" rx="14" fill="#2bc46f" ' + SW + '/>' : '<path d="M20 60 L60 10 L184 10 L144 60Z" fill="#2bc46f" ' + SW + '/>') +
      '<rect x="14" y="60" width="172" height="90" rx="16" fill="#7be37b" ' + SW + '/>' + (o.closed ? '' : dots) + '<path d="M80 52 Q100 40 120 52" fill="none" ' + SW + '/>');
  });

  add('b-apple', function () {
    return svg('0 0 120 120', '<path d="M60 34 Q90 14 106 46 Q114 90 80 108 Q60 114 40 108 Q6 90 14 46 Q30 14 60 34Z" fill="#e5243b" ' + SW + '/><path d="M60 34 Q60 18 70 8" fill="none" ' + SW3 + '/><path d="M64 24 Q84 6 96 18 Q80 30 64 24Z" fill="#2bc46f" ' + SW3 + '/>' + hi('M34 50 Q36 40 44 36'));
  });

  add('b-cookie', function () {
    return svg('0 0 120 120', '<circle cx="60" cy="60" r="48" fill="#d9a066" ' + SW + '/><circle cx="44" cy="44" r="7" fill="#4b2a1a"/><circle cx="74" cy="40" r="6" fill="#4b2a1a"/><circle cx="56" cy="70" r="7" fill="#4b2a1a"/><circle cx="82" cy="74" r="6" fill="#4b2a1a"/><circle cx="38" cy="78" r="5" fill="#4b2a1a"/>');
  });

  add('b-cheese', function () {
    return svg('0 0 140 120', '<path d="M10 90 L130 90 L130 50 L10 90Z" fill="#ffd23f" ' + SW + '/><path d="M10 90 L130 50 L120 30 Z" fill="#ffe066" ' + SW + '/><path d="M10 90 L10 110 L130 110 L130 90" fill="#ffd23f" ' + SW + '/>' +
      '<circle cx="60" cy="100" r="5" fill="#f5b400"/><circle cx="100" cy="98" r="6" fill="#f5b400"/>');
  });

  add('b-banana', function () {
    return svg('0 0 160 120', '<path d="M20 30 Q40 100 140 84 Q150 80 146 72 Q60 80 34 24 Z" fill="#ffd23f" ' + SW + '/><path d="M20 30 L14 18 L28 16 L34 24" fill="#8a5a2b" ' + SW3 + '/>');
  });

  add('b-alarm', function (o) {
    return svg('0 0 200 200', '<path d="M30 46 Q30 14 62 22 M170 46 Q170 14 138 22" fill="#ffd23f" ' + SW + '/><path d="M60 170 L44 190 M140 170 L156 190" ' + SW + '/>' +
      '<circle cx="100" cy="110" r="74" fill="#ff8fa0" ' + SW + '/><rect x="46" y="86" width="108" height="50" rx="10" fill="#1c1640" ' + SW3 + '/>' +
      '<text x="100" y="121" text-anchor="middle" font-size="30" fill="#7dffb2" font-family="monospace" font-weight="700">' + OBEY.util.escape(o.time || '7:00') + '</text>' +
      (o.ringing ? '<path d="M12 60 L0 50 M188 60 L200 50 M18 96 L2 96 M182 96 L198 96" stroke="#e5243b" stroke-width="6" stroke-linecap="round"/>' : '') + hi('M54 66 Q64 54 80 50'));
  });

  add('b-monster', function (o) {
    var c = '#9b5de5';
    var face = o.asleep ? '<path d="M66 82 L82 82 M98 82 L114 82" ' + SW3 + '/><path d="M80 104 Q90 110 100 104" fill="none" ' + SW3 + '/>'
      : '<circle cx="74" cy="80" r="11" fill="#fff" ' + SW3 + '/><circle cx="106" cy="80" r="11" fill="#fff" ' + SW3 + '/><circle cx="74" cy="82" r="4" fill="' + INK + '"/><circle cx="106" cy="82" r="4" fill="' + INK + '"/>' +
        '<path d="M78 108 Q84 102 90 108 Q96 114 102 108" fill="none" ' + SW3 + '/><path d="M124 92 Q128 104 124 108 Q120 104 124 92Z" fill="#7cc8ff" ' + SW3 + '/>';
    return svg('0 0 180 140', '<path d="M30 130 Q20 60 54 40 L48 14 L70 34 Q90 26 110 34 L132 14 L126 40 Q160 60 150 130 Z" fill="' + c + '" ' + SW + '/>' + face +
      (o.hug ? '<rect x="120" y="96" width="34" height="34" rx="14" fill="#c98b4a" ' + SW3 + '/>' : '') +
      (o.light ? '<circle cx="34" cy="110" r="16" fill="#ffe066" ' + SW3 + '/>' : ''));
  });

  add('b-torch', function (o) {
    return svg('0 0 200 120', (o.on ? '<path d="M150 40 L200 10 L200 110 L150 80Z" fill="#fff6a8" opacity=".8"/>' : '') +
      '<rect x="20" y="44" width="110" height="32" rx="10" fill="#3a86ff" ' + SW + '/><path d="M130 36 L156 30 L156 90 L130 84Z" fill="#c3ccd8" ' + SW + '/><rect x="62" y="38" width="20" height="10" rx="3" fill="#e5243b" ' + SW3 + '/>');
  });

  add('b-nightlight', function (o) {
    return svg('0 0 120 160', '<circle cx="60" cy="70" r="48" fill="' + (o.on ? '#fff6a8' : 'none') + '" opacity=".6"/>' +
      '<path d="M60 26 Q96 30 96 70 Q96 104 60 110 Q84 92 84 70 Q84 44 60 26Z" fill="#ffd23f" ' + SW + '/><rect x="40" y="114" width="40" height="34" rx="8" fill="#fffdf6" ' + SW + '/><path d="M52 148 L52 158 M68 148 L68 158" ' + SW3 + '/>');
  });

  add('b-teddy', function () {
    var c = '#c98b4a';
    return svg('0 0 140 160', '<circle cx="36" cy="34" r="16" fill="' + c + '" ' + SW + '/><circle cx="104" cy="34" r="16" fill="' + c + '" ' + SW + '/><ellipse cx="70" cy="116" rx="44" ry="38" fill="' + c + '" ' + SW + '/>' +
      '<circle cx="70" cy="56" r="36" fill="' + c + '" ' + SW + '/><ellipse cx="70" cy="68" rx="14" ry="10" fill="#f2c27b" ' + SW3 + '/><circle cx="56" cy="50" r="4" fill="' + INK + '"/><circle cx="84" cy="50" r="4" fill="' + INK + '"/><circle cx="70" cy="64" r="4" fill="' + INK + '"/>');
  });

  add('b-switchplate', function (o) {
    return svg('0 0 100 140', '<rect x="10" y="10" width="80" height="120" rx="12" fill="#fffdf6" ' + SW + '/><rect x="34" y="34" width="32" height="72" rx="8" fill="#e9eef5" ' + SW3 + '/>' +
      '<rect x="38" y="' + (o.on ? 40 : 70) + '" width="24" height="30" rx="6" fill="#8a86a8" ' + SW3 + '/>');
  });

  /* ------------------------------------------------------------- finale */
  add('b-dustshelf', function (o) {
    var f = o.filled || {};
    var outline = 'fill="#fffdf6" stroke="#8a86a8" stroke-width="3" stroke-dasharray="6 5"';
    return svg('0 0 300 120', '<rect x="4" y="88" width="292" height="16" rx="4" fill="#a0784d" ' + SW3 + '/><path d="M30 104 L44 118 M270 104 L256 118" ' + SW3 + '/>' +
      '<rect x="4" y="74" width="292" height="16" fill="#d9d4c7" opacity=".7"/>' +
      (f.pot ? '' : '<path d="M34 88 L24 40 L96 40 L86 88 Z" ' + outline + '/>') +
      (f.mug ? '' : '<rect x="122" y="48" width="40" height="40" rx="6" ' + outline + '/><path d="M162 58 Q178 58 176 70 Q174 82 162 80" fill="none" stroke="#8a86a8" stroke-width="3" stroke-dasharray="6 5"/>') +
      (f.frame ? '' : '<rect x="214" y="20" width="56" height="68" rx="4" ' + outline + '/>'));
  });

  add('b-rug', function (o) {
    var n = o.lumps || 0, bumps = '';
    for (var i = 0; i < n; i++) { var x = [100, 58, 142][i]; var q = 'M' + (x - 26) + ' 36 Q' + x + ' ' + (-4 - i * 2) + ' ' + (x + 26) + ' 36'; bumps += '<path d="' + q + 'Z" fill="#c2414d"/><path d="' + q + '" fill="none" ' + SW + '/>'; }
    return svg('0 0 200 60', '<ellipse cx="100" cy="36" rx="94" ry="22" fill="#c2414d" ' + SW + '/>' + bumps + '<ellipse cx="100" cy="38" rx="68" ry="12" fill="none" stroke="#ffd23f" stroke-width="4"/>');
  });

  add('b-frame', function () {
    return svg('0 0 120 140', '<rect x="10" y="10" width="100" height="120" rx="6" fill="#d9a441" ' + SW + '/><rect x="24" y="24" width="72" height="92" fill="#cfefff" ' + SW3 + '/>' +
      '<circle cx="60" cy="60" r="16" fill="#ffb347" ' + SW3 + '/><path d="M36 116 Q60 80 84 116" fill="#ffb347" ' + SW3 + '/><path d="M52 58 L56 58 M64 58 L68 58 M54 66 Q60 70 66 66" ' + SW3 + '/>');
  });
})(typeof window !== 'undefined' ? window : globalThis);
