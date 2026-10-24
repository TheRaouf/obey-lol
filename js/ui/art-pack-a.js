/* OBEY? LOL. — art pack A: the office and bureaucracy (levels 33–52).
 * Original code-drawn SVG in the house style: chunky shapes, ink outlines, flat fills, one highlight. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY, A = OBEY.art;
  var svg = A.svg, INK = A.INK, SW = A.SW, SW3 = A.SW3;
  function esc(s) { return OBEY.util.escape(String(s)); }
  function T(x, y, size, fill, s, extra) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + size + '" fill="' + fill + '"' + (extra || '') + '>' + esc(s) + '</text>';
  }

  /* Rubber stamp: o.word, o.color ('red' | 'blue'). */
  A.addObject('a-stamp', function (o) {
    var c = o.color === 'blue' ? '#2f6fe4' : '#e5243b';
    return svg('0 0 200 200',
      '<ellipse cx="100" cy="36" rx="30" ry="24" fill="#9a6b3f" ' + SW + '/><ellipse cx="90" cy="28" rx="10" ry="5" fill="#fff" opacity=".45"/>' +
      '<rect x="86" y="56" width="28" height="44" fill="#9a6b3f" ' + SW + '/>' +
      '<rect x="22" y="98" width="156" height="58" rx="10" fill="' + c + '" ' + SW + '/>' +
      '<rect x="30" y="156" width="140" height="18" rx="4" fill="#2d2850" ' + SW3 + '/>' +
      T(100, 136, 24, '#fff', o.word || ''));
  });

  /* Stapler: o.color. */
  A.addObject('a-stapler', function (o) {
    var c = o.color || '#e5243b';
    return svg('0 0 200 110',
      '<rect x="14" y="76" width="172" height="22" rx="8" fill="#4b4466" ' + SW + '/>' +
      '<path d="M22 72 Q24 36 60 34 L178 40 Q190 44 186 58 L180 70 L28 78 Z" fill="' + c + '" ' + SW + '/>' +
      '<path d="M54 44 L150 46" stroke="#fff" stroke-opacity=".45" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="34" cy="74" r="7" fill="#c3ccd8" ' + SW3 + '/>');
  });

  /* A stapler suspended in green jelly (the classic office prank). */
  A.addObject('a-jelly', function () {
    return svg('0 0 200 170',
      '<ellipse cx="100" cy="150" rx="92" ry="14" fill="#c3ccd8" ' + SW + '/>' +
      '<path d="M26 146 L38 40 Q100 14 162 40 L174 146 Z" fill="#7be37b" ' + SW + '/>' +
      '<g opacity=".55"><rect x="58" y="104" width="86" height="12" rx="4" fill="#4b4466"/><path d="M62 102 Q64 82 82 82 L140 86 Q148 90 144 98 L64 104Z" fill="#e5243b"/></g>' +
      '<path d="M50 52 Q56 90 52 128" stroke="#fff" stroke-opacity=".55" stroke-width="8" fill="none" stroke-linecap="round"/>' +
      '<path d="M38 40 Q100 62 162 40" fill="none" ' + SW3 + '/>');
  });

  /* Hole punch (definitely not a stapler). */
  A.addObject('a-holepunch', function () {
    return svg('0 0 200 110',
      '<rect x="20" y="62" width="160" height="36" rx="10" fill="#8a86a8" ' + SW + '/>' +
      '<circle cx="70" cy="80" r="8" fill="#2d2850"/><circle cx="130" cy="80" r="8" fill="#2d2850"/>' +
      '<path d="M40 62 L48 30 L152 30 L160 62" fill="#c3ccd8" ' + SW + '/><rect x="60" y="22" width="80" height="14" rx="6" fill="#4b4466" ' + SW3 + '/>');
  });

  /* Swivel office chair. */
  /* The canonical chair (bible §15): `e-chair` and `j-chair` redirect here. `legs` = four legs and a
   * rail instead of the swivel base (a school or party chair), in a 150×200 box. */
  A.addObject('a-chair', function (o) {
    var seat = '<rect x="40" y="10" width="80" height="84" rx="20" fill="#3a86ff" ' + SW + '/><path d="M56 26 L56 70" stroke="#fff" stroke-opacity=".4" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="24" y="96" width="112" height="26" rx="12" fill="#2f6fe4" ' + SW + '/>';
    if (o && o.legs) return svg('5 0 150 200', '<path d="M36 122 L30 194 M124 122 L130 194 M34 160 L126 160" fill="none" ' + SW + '/>' + seat);
    return svg('0 0 160 200', seat +
      '<path d="M80 122 L80 160" ' + SW + '/><path d="M30 182 L80 160 L130 182 M80 160 L80 188" fill="none" ' + SW + '/>' +
      '<circle cx="30" cy="186" r="7" fill="#2d2850"/><circle cx="130" cy="186" r="7" fill="#2d2850"/><circle cx="80" cy="190" r="7" fill="#2d2850"/>');
  });

  /* Filing cabinet: o.n = number of folders filed (0–5) shown in the open top drawer. */
  A.addObject('a-cabinet', function (o) {
    var n = o.n || 0, tabs = '';
    for (var i = 0; i < n; i++) tabs += '<rect x="' + (28 + i * 18) + '" y="' + (14 - (i % 2) * 4) + '" width="16" height="22" rx="2" fill="' + ['#ffd23f', '#7fb2ff', '#ff77b4', '#7be37b', '#ff9f43'][i % 5] + '" ' + SW3 + '/>';
    var drawers = '';
    for (var d = 0; d < 3; d++) {
      var y = 40 + d * 58;
      drawers += '<rect x="14" y="' + y + '" width="112" height="50" rx="6" fill="#a8a3b8" ' + SW + '/><rect x="50" y="' + (y + 10) + '" width="40" height="12" rx="3" fill="#fffdf6" ' + SW3 + '/><rect x="56" y="' + (y + 30) + '" width="28" height="8" rx="4" fill="#4b4466"/>';
    }
    return svg('0 0 140 220', '<rect x="8" y="30" width="124" height="186" rx="8" fill="#8a86a8" ' + SW + '/>' + tabs +
      '<rect x="8" y="30" width="124" height="10" fill="#6d6690" ' + SW3 + '/>' + drawers);
  });

  /* Desk phone: o.off = handset lifted. */
  A.addObject('a-deskphone', function (o) {
    var keys = '';
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) keys += '<rect x="' + (66 + c * 24) + '" y="' + (104 + r * 16) + '" width="18" height="11" rx="3" fill="#fffdf6" ' + SW3 + '/>';
    var handset = o.off
      ? '<g transform="rotate(-24 100 50)"><path d="M30 60 Q30 30 60 30 L140 30 Q170 30 170 60 L150 64 Q146 46 130 46 L70 46 Q54 46 50 64 Z" fill="#4b4466" ' + SW + '/></g>' +
        '<path d="M52 56 Q20 90 40 120" fill="none" stroke="' + INK + '" stroke-width="4" stroke-dasharray="6 5"/>'
      : '<path d="M30 80 Q30 50 60 50 L140 50 Q170 50 170 80 L150 84 Q146 66 130 66 L70 66 Q54 66 50 84 Z" fill="#4b4466" ' + SW + '/>';
    return svg('0 0 200 160',
      '<path d="M20 150 L36 84 L164 84 L180 150 Z" fill="#6d6690" ' + SW + '/>' + keys + handset +
      '<circle cx="44" cy="134" r="6" fill="' + (o.off ? '#2bf07f' : '#e5243b') + '" ' + SW3 + '/>');
  });

  /* Wi-Fi router: o.on lights. */
  A.addObject('a-router', function (o) {
    var lc = o.on ? '#2bf07f' : '#5b5480';
    return svg('0 0 200 130',
      '<path d="M50 60 L36 6 M150 60 L164 6" ' + SW + '/><circle cx="36" cy="6" r="5" fill="' + INK + '"/><circle cx="164" cy="6" r="5" fill="' + INK + '"/>' +
      '<rect x="14" y="56" width="172" height="52" rx="12" fill="#2d2850" ' + SW + '/>' +
      '<circle cx="54" cy="82" r="7" fill="' + lc + '"/><circle cx="82" cy="82" r="7" fill="' + lc + '"/><circle cx="110" cy="82" r="7" fill="' + lc + '"/>' +
      '<path d="M140 74 L168 74 M140 90 L168 90" stroke="#58607e" stroke-width="5" stroke-linecap="round"/>' +
      (o.on ? '<path d="M78 40 Q100 22 122 40 M88 48 Q100 38 112 48" fill="none" stroke="#2bf07f" stroke-width="5" stroke-linecap="round"/>' : '') +
      '<path d="M100 108 L100 130" ' + SW + '/>');
  });

  /* Plug on a cable (the cable trails upwards out of frame). */
  /* The canonical mains plug (bible §15): `f-plug` redirects here with `lying` (on its side on a counter,
   * prongs left, cable right, 140×80). */
  A.addObject('a-plug', function (o) {
    if (o && o.lying) {
      return svg('0 0 140 80', '<path d="M60 40 Q100 40 134 60" fill="none" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/>' +
        '<rect x="14" y="12" width="52" height="56" rx="10" fill="#fffdf6" ' + SW + '/>' +
        '<rect x="0" y="22" width="16" height="9" rx="2" fill="#c3ccd8" ' + SW3 + '/><rect x="0" y="49" width="16" height="9" rx="2" fill="#c3ccd8" ' + SW3 + '/>' +
        '<path d="M28 24 L48 24" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>');
    }
    return svg('0 0 100 120',
      '<path d="M50 0 L50 40" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"/>' +
      '<rect x="22" y="40" width="56" height="50" rx="10" fill="#fffdf6" ' + SW + '/>' +
      '<rect x="34" y="90" width="9" height="22" rx="2" fill="#c3ccd8" ' + SW3 + '/><rect x="57" y="90" width="9" height="22" rx="2" fill="#c3ccd8" ' + SW3 + '/>' +
      '<path d="M34 54 L34 74" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>');
  });

  /* Lift doors with a floor indicator: o.floor text. */
  A.addObject('a-elevator', function (o) {
    return svg('0 0 200 240',
      '<rect x="10" y="40" width="180" height="196" rx="8" fill="#a8a3b8" ' + SW + '/>' +
      '<rect x="26" y="56" width="72" height="180" fill="#c3ccd8" ' + SW + '/><rect x="102" y="56" width="72" height="180" fill="#c3ccd8" ' + SW + '/>' +
      '<path d="M40 70 L40 220" stroke="#fff" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="54" y="2" width="92" height="36" rx="7" fill="#1c1640" ' + SW3 + '/>' + T(100, 30, 26, '#ffb020', o.floor || '▲', ' font-weight="700"'));
  });

  /* Photocopier: o.note = something lies on the glass; o.busy = light bar flashing. */
  A.addObject('a-copier', function (o) {
    return svg('0 0 220 200',
      '<rect x="20" y="70" width="180" height="122" rx="10" fill="#e9eef5" ' + SW + '/>' +
      '<rect x="14" y="44" width="192" height="30" rx="6" fill="#c3ccd8" ' + SW + '/>' +
      '<rect x="40" y="50" width="140" height="18" rx="3" fill="#8fd3ff" ' + SW3 + '/>' +
      (o.note ? '<path d="M96 48 L124 46 L126 66 L98 68 Z" fill="#fff8b8" ' + SW3 + '/>' : '') +
      (o.busy ? '<rect x="40" y="52" width="16" height="14" fill="#2bf07f"/>' : '') +
      '<rect x="40" y="96" width="140" height="34" rx="6" fill="#c3ccd8" ' + SW3 + '/><rect x="40" y="140" width="140" height="34" rx="6" fill="#c3ccd8" ' + SW3 + '/>' +
      '<path d="M96 113 L124 113 M96 157 L124 157" ' + SW3 + '/>' +
      '<path d="M200 90 L216 86 L216 120 L200 120" fill="#fffdf6" ' + SW3 + '/>' +
      '<path d="M32 80 L188 80" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>');
  });

  /* Office printer body (tray and lid are separate stage objects). o.jam shows a red error light. */
  A.addObject('a-printer', function (o) {
    return svg('0 0 220 180',
      '<rect x="14" y="40" width="192" height="134" rx="14" fill="#e9eef5" ' + SW + '/>' +
      '<rect x="30" y="16" width="160" height="32" rx="8" fill="#c3ccd8" ' + SW + '/>' +
      '<path d="M30 60 L190 60" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>' +
      '<circle cx="186" cy="80" r="8" fill="' + (o.jam ? '#e5243b' : '#2bf07f') + '" ' + SW3 + '/>');
  });

  /* Crumpled, jammed sheet of paper. */
  A.addObject('a-paper', function () {
    return svg('0 0 120 100',
      '<path d="M10 30 L30 8 L52 22 L74 4 L96 20 L112 12 L108 60 L114 92 L80 82 L56 96 L30 84 L6 94 L14 60 Z" fill="#fffdf6" ' + SW + '/>' +
      '<path d="M30 40 L60 50 L90 38 M26 66 L54 60 L86 70" fill="none" ' + SW3 + '/>');
  });

  /* Paper tray drawer: o.open. */
  A.addObject('a-tray', function (o) {
    return o.open
      ? svg('0 0 200 80', '<path d="M4 20 L196 20 L184 76 L16 76 Z" fill="#c3ccd8" ' + SW + '/><rect x="24" y="10" width="152" height="16" rx="2" fill="#fffdf6" ' + SW3 + '/><rect x="80" y="44" width="40" height="12" rx="6" fill="#4b4466"/>')
      : svg('0 0 200 80', '<rect x="10" y="14" width="180" height="56" rx="8" fill="#c3ccd8" ' + SW + '/><rect x="80" y="34" width="40" height="12" rx="6" fill="#4b4466"/>');
  });

  /* Shredder with a pile of paper strips. */
  A.addObject('a-shredder', function () {
    return svg('0 0 160 190',
      '<path d="M22 70 L138 70 L130 186 L30 186 Z" fill="#8a86a8" ' + SW + '/>' +
      '<rect x="10" y="40" width="140" height="34" rx="8" fill="#4b4466" ' + SW + '/><rect x="34" y="52" width="92" height="8" rx="3" fill="#1c1640"/>' +
      '<path d="M50 96 L46 170 M66 96 L70 168 M82 96 L78 172 M98 96 L102 166 M114 96 L110 170" stroke="#fffdf6" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="132" cy="57" r="5" fill="#2bf07f"/>');
  });

  /* Suggestion box, visibly wired into a shredder below it. */
  A.addObject('a-suggestbox', function () {
    return svg('0 0 160 230',
      '<rect x="16" y="20" width="128" height="96" rx="8" fill="#c98b4a" ' + SW + '/><rect x="46" y="34" width="68" height="10" rx="4" fill="#1c1640"/>' +
      '<path d="M28 60 L132 60" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/>' +
      T(80, 92, 15, '#fffdf6', 'IDEAS') +
      '<rect x="66" y="116" width="28" height="22" fill="#4b4466" ' + SW3 + '/>' +
      '<path d="M30 138 L130 138 L122 224 L38 224 Z" fill="#8a86a8" ' + SW + '/><rect x="42" y="146" width="76" height="8" rx="3" fill="#1c1640"/>' +
      '<path d="M54 166 L52 212 M70 166 L72 214 M86 166 L84 212 M102 166 L104 212" stroke="#fffdf6" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M144 100 Q158 140 120 150" fill="none" stroke="' + INK + '" stroke-width="5"/>');
  });

  /* Cork noticeboard. */
  A.addObject('a-noticeboard', function () {
    return svg('0 0 200 140',
      '<rect x="6" y="6" width="188" height="128" rx="8" fill="#c98b4a" ' + SW + '/><rect x="18" y="18" width="164" height="104" rx="4" fill="#e0b46a" ' + SW3 + '/>' +
      '<rect x="30" y="28" width="46" height="36" fill="#fffdf6" ' + SW3 + '/><rect x="116" y="70" width="50" height="40" fill="#fff8b8" ' + SW3 + '/>' +
      '<circle cx="53" cy="30" r="5" fill="#e5243b"/><circle cx="141" cy="72" r="5" fill="#3a86ff"/>');
  });

  /* Fire extinguisher: o.spraying. */
  A.addObject('a-extinguisher', function (o) {
    return svg('0 0 120 200',
      '<rect x="34" y="50" width="52" height="140" rx="20" fill="#e5243b" ' + SW + '/><path d="M46 70 L46 160" stroke="#fff" stroke-opacity=".45" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="44" y="30" width="32" height="24" rx="4" fill="#2d2850" ' + SW3 + '/><path d="M60 30 L60 18 L90 14" fill="none" ' + SW + '/>' +
      '<path d="M76 40 Q108 50 100 100" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="38" y="104" width="44" height="28" rx="4" fill="#fffdf6" ' + SW3 + '/>' +
      (o.spraying ? '<circle cx="100" cy="112" r="14" fill="#fff" ' + SW3 + '/><circle cx="110" cy="132" r="10" fill="#fff" ' + SW3 + '/>' : ''));
  });

  /* Fire alarm bell on the wall: o.ringing adds shake lines. */
  A.addObject('a-firebell', function (o) {
    return svg('0 0 120 120',
      '<circle cx="60" cy="60" r="44" fill="#e5243b" ' + SW + '/><circle cx="60" cy="60" r="16" fill="#c3ccd8" ' + SW3 + '/><ellipse cx="46" cy="40" rx="12" ry="6" fill="#fff" opacity=".45"/>' +
      (o.ringing ? '<path d="M6 30 Q0 60 6 90 M114 30 Q120 60 114 90" fill="none" ' + SW3 + '/>' : ''));
  });

  /* Coffee machine: o.pouring. */
  A.addObject('a-coffeemachine', function (o) {
    return svg('0 0 160 220',
      '<rect x="14" y="6" width="132" height="190" rx="14" fill="#4b4466" ' + SW + '/>' +
      '<rect x="30" y="22" width="100" height="40" rx="6" fill="#1c1640" ' + SW3 + '/><path d="M44 42 L116 42" stroke="#7dffb2" stroke-width="5" stroke-dasharray="8 6"/>' +
      '<rect x="30" y="80" width="100" height="100" rx="8" fill="#2d2850" ' + SW3 + '/>' +
      '<rect x="66" y="80" width="28" height="18" rx="3" fill="#8a86a8" ' + SW3 + '/>' +
      (o.pouring ? '<path d="M80 98 L80 176" stroke="#9a6b3f" stroke-width="8"/>' : '') +
      '<rect x="22" y="196" width="116" height="16" rx="4" fill="#8a86a8" ' + SW + '/>');
  });

  /* Mug with fill level o.fill (0–100+) and a MAX line at o.max (default 80). o.spill shows a puddle. */
  A.addObject('a-cup', function (o) {
    var f = Math.max(0, Math.min(100, o.fill || 0)), max = o.max || 80;
    var top = 34, bottom = 126, h = (bottom - top) * f / 100, ly = bottom - (bottom - top) * max / 100;
    return svg('0 0 140 150',
      (o.spill ? '<ellipse cx="70" cy="140" rx="66" ry="10" fill="#9a6b3f" ' + SW3 + '/>' : '') +
      '<path d="M104 52 Q134 52 132 80 Q130 104 104 102" fill="none" stroke="' + INK + '" stroke-width="12"/><path d="M104 52 Q134 52 132 80 Q130 104 104 102" fill="none" stroke="#fffdf6" stroke-width="5"/>' +
      '<rect x="20" y="' + top + '" width="88" height="' + (bottom - top) + '" rx="8" fill="#fffdf6"/>' +
      (f > 0 ? '<rect x="20" y="' + (bottom - h).toFixed(1) + '" width="88" height="' + h.toFixed(1) + '" fill="#9a6b3f"/>' : '') +
      '<path d="M20 ' + ly + ' L108 ' + ly + '" stroke="#e5243b" stroke-width="4" stroke-dasharray="7 5"/>' +
      '<rect x="20" y="' + top + '" width="88" height="' + (bottom - top) + '" rx="8" fill="none" ' + SW + '/>' +
      '<path d="M30 ' + (ly + 8) + ' L30 110" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>' +
      /* MAX on its own white tab just above the red dashed line (the line stays the tell). */
      '<rect x="24" y="' + (ly - 29) + '" width="80" height="25" rx="5" fill="#fffdf6" ' + SW3 + '/>' +
      T(64, ly - 9, 22, '#e5243b', 'MAX', ' font-weight="700"'));
  });

  /* Vending machine: o.dropped = A2 snack fell and knocked the keycard into the tray; o.taken = tray emptied. */
  A.addObject('a-vending', function (o) {
    var cols = [52, 100, 148], out = '';
    var snack = ['#ff9f43', '#e5243b', '#7be37b', '#3a86ff', null, '#ff77b4'];
    for (var r = 0; r < 2; r++) for (var c = 0; c < 3; c++) {
      var x = cols[c], y = 64 + r * 72, i = r * 3 + c;
      out += '<path d="M' + (x - 24) + ' ' + (y + 30) + ' L' + (x + 24) + ' ' + (y + 30) + '" stroke="#58607e" stroke-width="5"/>' +
        '<path d="M' + (x - 20) + ' ' + (y + 26) + ' q5 -8 10 0 t10 0 t10 0 t10 0" fill="none" stroke="#c3ccd8" stroke-width="3"/>';
      if (i === 1 && o.dropped) continue;
      if (i === 4) {
        if (!o.dropped) out += '<g transform="rotate(28 ' + x + ' ' + (y + 24) + ')"><rect x="' + (x - 14) + '" y="' + (y + 4) + '" width="28" height="40" rx="4" fill="#ffd23f" ' + SW3 + '/><rect x="' + (x - 8) + '" y="' + (y + 10) + '" width="16" height="6" fill="' + INK + '"/></g>';
        continue;
      }
      out += '<rect x="' + (x - 14) + '" y="' + (y + 2) + '" width="28" height="26" rx="5" fill="' + snack[i] + '" ' + SW3 + '/>';
    }
    var tray = o.dropped && !o.taken ? '<rect x="70" y="222" width="28" height="18" rx="4" fill="#e5243b" ' + SW3 + '/><rect x="104" y="216" width="22" height="26" rx="3" fill="#ffd23f" ' + SW3 + '/>' : '';
    return svg('0 0 200 260',
      '<rect x="6" y="6" width="188" height="248" rx="12" fill="#2f6fe4" ' + SW + '/>' +
      '<rect x="20" y="22" width="160" height="182" rx="6" fill="#cfefff" ' + SW3 + '/>' +
      '<path d="M30 30 L60 196" stroke="#fff" stroke-width="8" opacity=".5" stroke-linecap="round"/>' + out +
      T(52, 50, 16, INK, '1') + T(100, 50, 16, INK, '2') + T(148, 50, 16, INK, '3') + T(29, 84, 16, INK, 'A') + T(29, 156, 16, INK, 'B') +
      '<rect x="40" y="212" width="120" height="34" rx="6" fill="#1c1640" ' + SW3 + '/>' + tray);
  });

  /* Ceiling motion sensor: o.on = red light (it sees someone). */
  A.addObject('a-sensor', function (o) {
    return svg('0 0 120 90',
      '<rect x="20" y="4" width="80" height="14" rx="4" fill="#c3ccd8" ' + SW3 + '/>' +
      '<path d="M24 18 Q60 92 96 18 Z" fill="#fffdf6" ' + SW + '/>' +
      '<circle cx="60" cy="42" r="10" fill="' + (o.on ? '#e5243b' : '#5b5480') + '" ' + SW3 + '/>');
  });

  /* The sensor's field of view: a translucent wedge stretched over its box (apex top-right). */
  A.addObject('a-cone', function (o) {
    return svg('0 0 100 100', '<path d="M100 0 L0 100 L100 100 Z" fill="' + (o.on ? '#e5243b' : '#ffd23f') + '" opacity=".16"/><path d="M100 0 L0 100" stroke="' + (o.on ? '#e5243b' : '#f5b400') + '" stroke-width="1.2" stroke-dasharray="3 2" fill="none" vector-effect="non-scaling-stroke"/>', 'art fill-art');
  });

  /* Office desk with a dark gap underneath. */
  A.addObject('a-desk', function () {
    return svg('0 0 200 120',
      '<rect x="6" y="10" width="188" height="18" rx="4" fill="#a0784d" ' + SW + '/>' +
      '<rect x="14" y="28" width="56" height="88" fill="#c98b4a" ' + SW + '/><rect x="24" y="44" width="36" height="8" rx="3" fill="#6b5a3b"/><rect x="24" y="78" width="36" height="8" rx="3" fill="#6b5a3b"/>' +
      '<rect x="70" y="28" width="116" height="88" fill="#c3ccd8" ' + SW3 + '/><rect x="70" y="28" width="116" height="10" fill="#8a86a8" ' + SW3 + '/><path d="M186 28 L186 116" ' + SW + '/>');
  });

  /* Revolving door seen from above. o.turn = quarter turns pushed; you ride in the compartment that starts at the bottom. */
  A.addObject('a-revolving', function (o) {
    var t = (o.turn || 0) * 90;
    var a = (90 + t) * Math.PI / 180, hx = 100 + 52 * Math.cos(a), hy = 100 + 52 * Math.sin(a);
    return svg('0 0 200 200',
      '<path d="M32 52 A80 80 0 0 0 32 148" fill="none" stroke="#7fb2ff" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M32 52 A80 80 0 0 0 32 148" fill="none" ' + SW3 + '/>' +
      '<path d="M168 52 A80 80 0 0 1 168 148" fill="none" stroke="#7fb2ff" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M168 52 A80 80 0 0 1 168 148" fill="none" ' + SW3 + '/>' +
      '<g transform="rotate(' + t + ' 100 100)"><path d="M100 100 L156 44 M100 100 L44 44 M100 100 L44 156 M100 100 L156 156" stroke="' + INK + '" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M100 100 L156 44 M100 100 L44 44 M100 100 L44 156 M100 100 L156 156" stroke="#cfefff" stroke-width="4" stroke-linecap="round"/></g>' +
      '<circle cx="100" cy="100" r="10" fill="#4b4466" ' + SW3 + '/>' +
      '<circle cx="' + hx.toFixed(1) + '" cy="' + hy.toFixed(1) + '" r="16" fill="#ffd23f" ' + SW + '/>' +
      '<circle cx="' + (hx - 5).toFixed(1) + '" cy="' + (hy - 2).toFixed(1) + '" r="2.5" fill="' + INK + '"/><circle cx="' + (hx + 5).toFixed(1) + '" cy="' + (hy - 2).toFixed(1) + '" r="2.5" fill="' + INK + '"/>');
  });

  /* Desk photo frame: o.pet = 'fish' | 'cat'. */
  /* The canonical framed photo (bible §15): `b-frame` redirects here with `subject: 'person'` and
   * `tall` (a 120×140 portrait-format frame). `pet` = 'fish' (default) | 'cat'. */
  A.addObject('a-photo', function (o) {
    if (o.tall) {
      return svg('0 0 120 140', '<rect x="10" y="10" width="100" height="120" rx="6" fill="#d9a441" ' + SW + '/><rect x="24" y="24" width="72" height="92" fill="#cfefff" ' + SW3 + '/>' +
        '<circle cx="60" cy="60" r="16" fill="#ffb347" ' + SW3 + '/><path d="M36 116 Q60 80 84 116" fill="#ffb347" ' + SW3 + '/><path d="M52 58 L56 58 M64 58 L68 58 M54 66 Q60 70 66 66" ' + SW3 + '/>' +
        '<path d="M30 32 L30 50" stroke="#fff" stroke-opacity=".55" stroke-width="5" stroke-linecap="round"/>');
    }
    var pet = o.pet === 'cat'
      ? '<circle cx="70" cy="74" r="26" fill="#ff9f43" ' + SW3 + '/><path d="M48 60 L46 36 L64 52 Z M92 60 L94 36 L76 52 Z" fill="#ff9f43" ' + SW3 + '/><circle cx="61" cy="72" r="4" fill="' + INK + '"/><circle cx="79" cy="72" r="4" fill="' + INK + '"/>'
      : '<path d="M36 74 Q66 46 94 74 Q66 102 36 74Z" fill="#ff9f43" ' + SW3 + '/><path d="M92 74 L112 58 L112 90 Z" fill="#ff9f43" ' + SW3 + '/><circle cx="54" cy="70" r="4" fill="' + INK + '"/><circle cx="40" cy="44" r="5" fill="none" stroke="#3a86ff" stroke-width="3"/><circle cx="50" cy="32" r="3" fill="none" stroke="#3a86ff" stroke-width="3"/>';
    return svg('0 0 140 130',
      '<rect x="6" y="6" width="128" height="118" rx="8" fill="#d9a441" ' + SW + '/><rect x="18" y="18" width="104" height="94" fill="' + (o.pet === 'cat' ? '#ffe7a3' : '#8fd3ff') + '" ' + SW3 + '/>' + pet);
  });

  /* A mug on the desk with a slogan colour (no text: captions live on the stage). */
  A.addObject('a-bossmug', function (o) {
    return svg('0 0 120 110',
      '<path d="M86 34 Q112 34 110 56 Q108 76 86 74" fill="none" stroke="' + INK + '" stroke-width="10"/>' +
      '<rect x="14" y="14" width="74" height="86" rx="10" fill="' + (o.color || '#ffd23f') + '" ' + SW + '/>' +
      '<path d="M30 30 L30 84" stroke="#fff" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M50 40 l5 10 11 1 -8 7 3 11 -11 -6 -11 6 3 -11 -8 -7 11 -1z" fill="#fffdf6" ' + SW3 + '/>');
  });

  /* Time clock: o.mode = 'IN' | 'OUT'. */
  A.addObject('a-timeclock', function (o) {
    var ticks = '';
    for (var i = 0; i < 12; i++) ticks += '<path d="M80 34 L80 40" stroke="' + INK + '" stroke-width="3" transform="rotate(' + (i * 30) + ' 80 62)"/>';
    return svg('0 0 160 220',
      '<rect x="10" y="6" width="140" height="208" rx="14" fill="#7d5a9e" ' + SW + '/>' +
      '<circle cx="80" cy="62" r="34" fill="#fffdf6" ' + SW + '/>' + ticks +
      '<path d="M80 62 L80 40 M80 62 L96 70" ' + SW + '/>' +
      '<rect x="30" y="112" width="100" height="30" rx="6" fill="#1c1640" ' + SW3 + '/>' + T(80, 134, 20, o.mode === 'IN' ? '#7dffb2' : '#ffb020', o.mode || 'OUT') +
      '<rect x="44" y="160" width="72" height="12" rx="4" fill="#1c1640"/>' +
      '<path d="M60 186 L100 186" stroke="#fff" stroke-opacity=".4" stroke-width="6" stroke-linecap="round"/>');
  });

  /* Time card: o.inT / o.outT stamped times. */
  A.addObject('a-timecard', function (o) {
    return svg('0 0 110 150',
      '<rect x="8" y="6" width="94" height="138" rx="6" fill="#fff3c4" ' + SW + '/>' +
      '<path d="M18 30 L92 30 M18 80 L92 80" ' + SW3 + '/>' +
      T(32, 56, 16, INK, 'IN') + T(32, 108, 16, INK, 'OUT') +
      T(72, 56, 16, o.inT ? '#2f6fe4' : '#a8a3b8', o.inT || '—') + T(72, 108, 16, o.outT ? '#e5243b' : '#a8a3b8', o.outT || '—'));
  });

  /* Org-chart connector lines, drawn in stage percentages: o.lines = [[x1,y1,x2,y2], …]. */
  A.addObject('a-orglines', function (o) {
    var p = '';
    (o.lines || []).forEach(function (l) {
      p += '<path d="M' + l[0] + ' ' + l[1] + ' L' + l[2] + ' ' + l[3] + '" stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke"/>';
    });
    return svg('0 0 100 100', p, 'art fill-art');
  });

  /* Framed portrait of Bossworth himself (vanity, in oils). The canonical Bossworth portrait (bible §15):
   * `h-bossportrait` redirects here. `costume` (narrator costume, e.g. 'royal' = King Bossworth with his
   * crown), `bg` canvas colour, `frame` colour, `scorched` = sooted by dragon fire (L182). */
  A.addObject('a-portrait', function (o) {
    // 'royal' = King Bossworth: his own orange body (on-model next to the narrator) with the royal crown.
    var royal = o.costume === 'royal' || o.crown;
    var face = A.narrator(royal ? 'classic' : (o.costume || 'classic'), 'pleased').replace(/^<svg[^>]*>|<\/svg>$/g, '') +
      (royal ? '<path d="M58 44 L66 6 L84 30 L100 0 L116 30 L134 6 L142 44 Z" fill="#ffd23f" ' + SW + '/><circle cx="100" cy="30" r="6" fill="#e5243b"/><circle cx="74" cy="34" r="4" fill="#3ec1ff"/><circle cx="126" cy="34" r="4" fill="#3ec1ff"/>' : '');
    var soot = o.scorched
      ? '<rect x="18" y="18" width="104" height="114" fill="#2d2850" opacity=".55"/>' +
        '<path d="M44 40 Q52 28 48 20 M70 38 Q78 26 74 16 M96 40 Q104 28 100 20" fill="none" stroke="#8a86a8" stroke-width="5" stroke-linecap="round"/>'
      : '';
    return svg('0 0 140 150',
      '<rect x="6" y="6" width="128" height="138" rx="6" fill="' + (o.scorched ? '#2d2850' : (o.frame || '#d9a441')) + '" ' + SW + '/><rect x="18" y="18" width="104" height="114" fill="' + (o.bg || '#b48cff') + '" ' + SW3 + '/>' +
      '<g transform="translate(30 ' + (royal ? 40 : 32) + ') scale(.4)">' + face + '</g>' + soot +
      '<rect x="18" y="18" width="104" height="114" fill="none" ' + SW3 + '/>');
  });
})(typeof window !== 'undefined' ? window : globalThis);
