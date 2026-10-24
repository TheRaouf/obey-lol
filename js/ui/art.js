/* OBEY? LOL. — original code-drawn art: narrator (8 costumes × 7 moods), level objects, icons.
 * Everything is inline SVG using CSS custom properties, so themes recolour it automatically. */
(function (root) {
  'use strict';
  var OBEY = root.OBEY;
  var INK = 'var(--ink)';
  var SW = 'stroke="' + INK + '" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"';
  var SW3 = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';

  function svg(vb, inner, cls) {
    return '<svg class="' + (cls || 'art') + '" viewBox="' + vb + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + inner + '</svg>';
  }
  function esc(s) { return OBEY.util.escape(s); }

  /* ------------------------------------------------------------- narrator */
  var BODY = {
    classic: '#ffb347', royal: '#b48cff', alien: '#7be37b', detective: '#e0b98c',
    wizard: '#8fb8ff', robot: '#c3ccd8', dino: '#4fd1a5', ninja: '#58607e'
  };
  var BLOB = 'M100 24 C152 24 178 62 178 110 C178 160 146 186 100 186 C54 186 22 160 22 110 C22 62 48 24 100 24Z';

  function eyes(mood, dark) {
    var w = dark ? '#fff' : '#fff';
    var p = INK;
    switch (mood) {
      case 'pleased':
        return '<path d="M62 100 Q75 84 88 100" fill="none" ' + SW + '/><path d="M112 100 Q125 84 138 100" fill="none" ' + SW + '/>' +
          '<ellipse cx="64" cy="122" rx="9" ry="5" fill="#ff6f91" opacity=".55"/><ellipse cx="136" cy="122" rx="9" ry="5" fill="#ff6f91" opacity=".55"/>';
      case 'suspicious':
        return '<circle cx="75" cy="98" r="12" fill="' + w + '" ' + SW3 + '/><circle cx="125" cy="98" r="12" fill="' + w + '" ' + SW3 + '/>' +
          '<circle cx="80" cy="100" r="5" fill="' + p + '"/><circle cx="130" cy="100" r="5" fill="' + p + '"/>' +
          '<path d="M61 92 L89 92" ' + SW + '/><path d="M111 90 L139 94" ' + SW + '/>' +
          '<path d="M62 86 L88 92" ' + SW3 + ' fill="none"/><path d="M112 80 L138 76" ' + SW3 + ' fill="none"/>';
      case 'annoyed':
        return '<circle cx="75" cy="100" r="11" fill="' + w + '" ' + SW3 + '/><circle cx="125" cy="100" r="11" fill="' + w + '" ' + SW3 + '/>' +
          '<circle cx="76" cy="102" r="5" fill="' + p + '"/><circle cx="124" cy="102" r="5" fill="' + p + '"/>' +
          '<path d="M60 80 L90 90" ' + SW + '/><path d="M140 80 L110 90" ' + SW + '/>';
      case 'surprised':
        return '<circle cx="75" cy="96" r="15" fill="' + w + '" ' + SW3 + '/><circle cx="125" cy="96" r="15" fill="' + w + '" ' + SW3 + '/>' +
          '<circle cx="75" cy="96" r="4" fill="' + p + '"/><circle cx="125" cy="96" r="4" fill="' + p + '"/>' +
          '<path d="M60 70 Q75 60 90 70" fill="none" ' + SW + '/><path d="M110 70 Q125 60 140 70" fill="none" ' + SW + '/>';
      case 'panicked':
        return '<circle cx="75" cy="96" r="14" fill="' + w + '" ' + SW3 + '/><circle cx="125" cy="96" r="14" fill="' + w + '" ' + SW3 + '/>' +
          '<circle cx="75" cy="96" r="2.6" fill="' + p + '"/><circle cx="125" cy="96" r="2.6" fill="' + p + '"/>' +
          '<path d="M60 74 L88 68" ' + SW + '/><path d="M140 74 L112 68" ' + SW + '/>' +
          '<path d="M156 66 Q164 80 156 86 Q148 80 156 66Z" fill="#7cc8ff" ' + SW3 + '/>';
      case 'defeated':
        return '<path d="M62 102 Q75 110 88 102" fill="none" ' + SW + '/><path d="M112 102 Q125 110 138 102" fill="none" ' + SW + '/>' +
          '<path d="M62 88 L88 82" ' + SW3 + '/><path d="M138 88 L112 82" ' + SW3 + '/>';
      default:
        return '<circle cx="75" cy="98" r="12" fill="' + w + '" ' + SW3 + '/><circle cx="125" cy="98" r="12" fill="' + w + '" ' + SW3 + '/>' +
          '<circle cx="77" cy="99" r="5" fill="' + p + '"/><circle cx="127" cy="99" r="5" fill="' + p + '"/>' +
          '<path d="M63 80 L87 80" ' + SW3 + '/><path d="M113 80 L137 80" ' + SW3 + '/>';
    }
  }

  function mouth(mood) {
    switch (mood) {
      case 'pleased': return '<path d="M74 128 Q100 156 126 128 Z" fill="#7a1f3d" ' + SW3 + '/>';
      case 'suspicious': return '<path d="M84 140 Q100 136 118 132" fill="none" ' + SW + '/>';
      case 'annoyed': return '<path d="M80 144 Q100 128 120 144" fill="none" ' + SW + '/>';
      case 'surprised': return '<ellipse cx="100" cy="140" rx="11" ry="14" fill="#7a1f3d" ' + SW3 + '/>';
      case 'panicked': return '<path d="M76 140 Q82 132 88 140 Q94 148 100 140 Q106 132 112 140 Q118 148 124 140" fill="none" ' + SW + '/>';
      case 'defeated': return '<path d="M84 146 Q100 136 116 146" fill="none" ' + SW + '/>';
      default: return '<path d="M84 138 L116 138" ' + SW + '/>';
    }
  }

  function accessoryBack(c) {
    switch (c) {
      case 'alien': return '<path d="M76 34 L62 6" ' + SW + '/><circle cx="60" cy="6" r="7" fill="#d6ff4a" ' + SW3 + '/><path d="M124 34 L138 6" ' + SW + '/><circle cx="140" cy="6" r="7" fill="#d6ff4a" ' + SW3 + '/>';
      case 'robot': return '<path d="M100 26 L100 4" ' + SW + '/><circle cx="100" cy="6" r="7" fill="#ff4f6d" ' + SW3 + '/>';
      case 'dino': return '<path d="M52 44 L60 16 L76 34 L92 8 L108 30 L124 10 L136 34 L152 18 L152 48" fill="#2fae84" ' + SW + '/>';
      case 'ninja': return '<path d="M168 92 Q190 84 196 64" fill="none" stroke="#e5243b" stroke-width="7" stroke-linecap="round"/><path d="M168 100 Q192 104 198 88" fill="none" stroke="#e5243b" stroke-width="7" stroke-linecap="round"/>';
      default: return '';
    }
  }

  function accessoryFront(c) {
    switch (c) {
      case 'classic': return '<path d="M92 168 L108 168 L104 178 L112 200 L100 206 L88 200 L96 178 Z" fill="#e5243b" ' + SW3 + '/>';
      case 'royal': return '<path d="M58 44 L66 6 L84 30 L100 0 L116 30 L134 6 L142 44 Z" fill="#ffd23f" ' + SW + '/><circle cx="100" cy="30" r="6" fill="#e5243b"/><circle cx="74" cy="34" r="4" fill="#3ec1ff"/><circle cx="126" cy="34" r="4" fill="#3ec1ff"/>';
      case 'alien': return '<circle cx="100" cy="62" r="9" fill="#fff" ' + SW3 + '/><circle cx="100" cy="62" r="4" fill="' + INK + '"/>';
      case 'detective': return '<path d="M40 52 Q100 -4 160 52 Z" fill="#9a6b3f" ' + SW + '/><path d="M48 48 L152 48" ' + SW + '/><path d="M150 50 L178 58" stroke="#9a6b3f" stroke-width="8" stroke-linecap="round"/>' +
        '<circle cx="168" cy="150" r="16" fill="#cfefff" fill-opacity=".6" ' + SW + '/><path d="M180 162 L196 182" ' + SW + '/>';
      case 'wizard': return '<path d="M48 50 L104 -6 L152 50 Z" fill="#4a3fd1" ' + SW + '/><path d="M40 50 L160 50" ' + SW + '/><path d="M104 14 l4 9 10 1 -8 6 3 10 -9 -5 -9 5 3 -10 -8 -6 10 -1z" fill="#ffd23f"/>' +
        '<path d="M66 152 Q100 214 134 152 Q120 168 100 166 Q80 168 66 152Z" fill="#fff" ' + SW3 + '/>';
      case 'robot': return '<circle cx="40" cy="80" r="5" fill="' + INK + '"/><circle cx="160" cy="80" r="5" fill="' + INK + '"/><path d="M60 118 L140 118" stroke="' + INK + '" stroke-width="2" stroke-dasharray="4 4"/>';
      case 'dino': return '<path d="M86 132 L90 140 L94 132 M106 132 L110 140 L114 132" fill="#fff" ' + SW3 + '/>';
      case 'ninja': return '';
      default: return '';
    }
  }

  /**
   * Narrator portrait. costume: COSTUMES id; mood: NARRATOR.moods; overlay: null|'gag'|'potato'.
   */
  function narrator(costume, mood, overlay) {
    costume = BODY[costume] ? costume : 'classic';
    var fill = BODY[costume];
    var body;
    if (overlay === 'potato') {
      body = '<path d="M60 40 C110 14 168 40 174 96 C182 150 150 186 98 184 C46 182 18 150 26 104 C30 70 40 50 60 40Z" fill="#c8995c" ' + SW + '/>' +
        '<circle cx="60" cy="70" r="5" fill="#8a6234"/><circle cx="150" cy="132" r="6" fill="#8a6234"/><circle cx="58" cy="150" r="4" fill="#8a6234"/>';
    } else if (costume === 'robot') {
      body = '<rect x="30" y="30" width="140" height="150" rx="24" fill="' + fill + '" ' + SW + '/><rect x="48" y="78" width="104" height="44" rx="10" fill="#e9eef5" ' + SW3 + '/>';
    } else {
      body = '<path d="' + BLOB + '" fill="' + fill + '" ' + SW + '/><path d="M64 160 Q100 178 136 160" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="8" stroke-linecap="round"/>';
    }
    var mask = costume === 'ninja' && overlay !== 'potato' ? '<rect x="26" y="78" width="148" height="40" rx="12" fill="#1f2033" ' + SW3 + '/>' : '';
    var face = eyes(mood, costume === 'ninja') + (overlay === 'gag' ? '' : mouth(mood));
    var gag = overlay === 'gag' ? '<g transform="rotate(-8 100 140)"><rect x="70" y="128" width="60" height="20" rx="4" fill="#d9d4c7" ' + SW3 + '/></g><g transform="rotate(10 100 140)"><rect x="72" y="130" width="56" height="18" rx="4" fill="#ebe6da" ' + SW3 + '/></g>' : '';
    var tilt = mood === 'defeated' ? ' transform="rotate(-7 100 110) translate(0 6)"' : (mood === 'surprised' ? ' transform="translate(0 -4)"' : '');
    var acc = overlay === 'potato' ? '' : accessoryFront(costume);
    var back = overlay === 'potato' ? '' : accessoryBack(costume);
    return svg('-6 -10 212 222', '<g' + tilt + '>' + back + body + mask + face + gag + acc + '</g>', 'narrator-svg mood-' + mood + ' costume-' + costume);
  }

  /* ---------------------------------------------------------------- objects */
  var OBJECTS = {
    bigbutton: function (o) {
      var c = { red: '#e5243b', green: '#2bc46f', blue: '#3a86ff' }[o.color] || '#e5243b';
      var squash = o.squashed;
      return svg('0 0 200 200',
        '<ellipse cx="100" cy="150" rx="86" ry="34" fill="#4b4466" ' + SW + '/>' +
        '<rect x="14" y="128" width="172" height="22" fill="#4b4466"/><ellipse cx="100" cy="128" rx="86" ry="34" fill="#6d6690" ' + SW + '/>' +
        (squash ? '<ellipse cx="100" cy="122" rx="62" ry="16" fill="' + c + '" ' + SW + '/><path d="M60 118 Q80 108 96 120 Q116 110 140 120" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="5"/>'
          : '<path d="M38 124 L38 92 Q100 60 162 92 L162 124 Q100 156 38 124Z" fill="' + c + '" ' + SW + '/><ellipse cx="100" cy="92" rx="62" ry="28" fill="' + c + '" ' + SW + '/><ellipse cx="80" cy="84" rx="18" ry="7" fill="#fff" opacity=".45"/>') +
        (o.text && !squash ? '<text x="100" y="99" text-anchor="middle" font-size="22" fill="#fff">' + esc(o.text) + '</text>' : ''));
    },
    smallbutton: function (o) {
      var c = { blue: '#3a86ff', red: '#e5243b' }[o.color] || '#3a86ff';
      return svg('0 0 100 100', '<circle cx="50" cy="58" r="40" fill="#4b4466" ' + SW + '/><circle cx="50" cy="48" r="34" fill="' + c + '" ' + SW + '/><ellipse cx="40" cy="38" rx="10" ry="5" fill="#fff" opacity=".5"/>');
    },
    plant: function () {
      return svg('0 0 100 200', '<path d="M50 120 C20 90 10 50 30 20 C40 60 48 80 50 120Z" fill="#3fbf6f" ' + SW3 + '/><path d="M50 120 C80 90 92 60 74 26 C62 60 54 86 50 120Z" fill="#2ea35b" ' + SW3 + '/><path d="M50 120 C44 80 50 50 58 10 C66 50 60 90 50 120Z" fill="#5fd98a" ' + SW3 + '/>' +
        '<path d="M18 120 L82 120 L72 192 L28 192 Z" fill="#e07a45" ' + SW + '/><path d="M14 112 L86 112 L86 126 L14 126Z" fill="#f19763" ' + SW3 + '/>');
    },
    note: function () {
      return svg('0 0 100 90', '<path d="M8 14 L86 6 L92 78 L14 86 Z" fill="#fff8b8" ' + SW + '/><path d="M24 30 L74 26 M26 46 L70 42 M28 62 L56 60" ' + SW3 + '/>');
    },
    cobweb: function () {
      return svg('0 0 100 80', '<path d="M100 0 L40 40 M100 0 L60 70 M100 0 L96 78 M100 0 L20 6" stroke="' + INK + '" stroke-opacity=".35" stroke-width="2"/><path d="M80 14 Q72 28 78 40 Q88 46 96 42 M64 24 Q56 46 68 60 Q84 66 97 60" fill="none" stroke="' + INK + '" stroke-opacity=".35" stroke-width="2"/>');
    },
    door: function (o) {
      var sign = o.sign ? '<rect x="22" y="' + (o.small ? 26 : 22) + '" width="76" height="' + (o.small ? 30 : 22) + '" rx="5" fill="#fffdf6" ' + SW3 + '/><text x="60" y="' + (o.small ? 39 : 38) + '" text-anchor="middle" font-size="' + (o.sign.length > 12 ? 8 : (o.sign.length > 8 ? 10 : 15)) + '" fill="' + INK + '">' + (o.small && o.sign.indexOf(' ') > 0 ? '<tspan x="60" dy="0">' + esc(o.sign.split(' ').slice(0, 2).join(' ')) + '</tspan><tspan x="60" dy="12">' + esc(o.sign.split(' ').slice(2).join(' ')) + '</tspan>' : esc(o.sign)) + '</text>' : '';
      if (o.hiddenBehind) return svg('0 0 120 200', '<rect x="8" y="6" width="104" height="190" rx="10" fill="#7d5a9e" ' + SW + ' opacity=".5"/>');
      if (o.open) {
        return svg('0 0 120 200', '<rect x="8" y="6" width="104" height="190" rx="10" fill="#1c1640" ' + SW + '/><path d="M20 20 L110 30 L110 196 L20 196 Z" fill="#fff6a8" opacity=".85"/><path d="M8 6 L-10 18 L-10 196 L8 196Z" fill="#a0784d" ' + SW + '/>');
      }
      var bricks = '';
      if (o.bricked) {
        for (var r = 0; r < 9; r++) for (var c = 0; c < 4; c++) {
          bricks += '<rect x="' + (14 + c * 24 + (r % 2 ? 12 : 0) - (r % 2 && c === 3 ? 12 : 0)) + '" y="' + (12 + r * 20) + '" width="' + (r % 2 && c === 3 ? 12 : 22) + '" height="18" rx="2" fill="#c8553d" stroke="' + INK + '" stroke-width="2"/>';
        }
        return svg('0 0 120 200', '<rect x="8" y="6" width="104" height="190" rx="10" fill="#7a3528" ' + SW + '/>' + bricks + '<rect x="8" y="6" width="104" height="190" rx="10" fill="none" ' + SW + '/>' + sign);
      }
      return svg('0 0 120 200', '<rect x="8" y="6" width="104" height="190" rx="10" fill="#a0784d" ' + SW + '/><rect x="20" y="' + (o.small ? 64 : 54) + '" width="80" height="60" rx="6" fill="#b88d5f" ' + SW3 + '/><rect x="20" y="126" width="80" height="56" rx="6" fill="#b88d5f" ' + SW3 + '/>' +
        '<circle cx="94" cy="118" r="7" fill="#ffd23f" ' + SW3 + '/>' + (o.keyhole ? '<path d="M94 128 l-4 12 h8 z" fill="' + INK + '"/>' : '') + sign);
    },
    mat: function (o) {
      return o.lifted ? svg('0 0 200 60', '<path d="M10 50 L190 50 L176 20 L24 20 Z" fill="#6b5a3b" ' + SW + '/><path d="M24 20 Q100 -10 176 20" fill="#8f7a52" ' + SW3 + '/>')
        : svg('0 0 200 60', '<rect x="6" y="10" width="188" height="44" rx="8" fill="#c9a86a" ' + SW + '/><text x="100" y="41" text-anchor="middle" font-size="22" fill="#6b5a3b">WELCOME</text><path d="M60 54 Q70 46 80 54" fill="none" ' + SW3 + '/>');
    },
    key: function () {
      return svg('0 0 120 70', '<circle cx="30" cy="35" r="20" fill="#ffd23f" ' + SW + '/><circle cx="30" cy="35" r="7" fill="var(--stage)" ' + SW3 + '/><path d="M50 35 L110 35 L110 52 M94 35 L94 48" fill="none" stroke="#ffd23f" stroke-width="12" stroke-linecap="round"/><path d="M50 35 L110 35 L110 52 M94 35 L94 48" fill="none" ' + SW3 + '/>');
    },
    darkness: function (o) {
      return o.on ? svg('0 0 100 100', '<rect width="100" height="100" fill="#0e0b26" opacity=".86"/>') : '';
    },
    rug: function (o) {
      if (o && o.lifted) return svg('0 0 200 60', '<path d="M6 54 L194 54 L194 40 Q100 -10 6 40Z" fill="#c2414d" ' + SW + '/>');
      return svg('0 0 200 60', '<ellipse cx="100" cy="32" rx="94" ry="24" fill="#c2414d" ' + SW + '/><ellipse cx="100" cy="32" rx="68" ry="14" fill="none" stroke="#ffd23f" stroke-width="4"/>' + (o && o.lumpy !== false ? '' : ''));
    },
    lamp: function (o) {
      return svg('0 0 100 300', (o.on ? '<path d="M18 70 L82 70 L100 300 L0 300Z" fill="#fff6a8" opacity=".45"/>' : '') +
        '<path d="M20 16 L80 16 L94 70 L6 70Z" fill="' + (o.on ? '#ffe066' : '#8a86a8') + '" ' + SW + '/><path d="M50 70 L50 270" ' + SW + '/><ellipse cx="50" cy="278" rx="34" ry="10" fill="#4b4466" ' + SW + '/>' +
        '<path d="M66 70 L66 120" ' + SW3 + '/><circle cx="66" cy="124" r="6" fill="#e5243b" ' + SW3 + '/>');
    },
    painting: function (o) {
      return svg('0 0 140 140', '<rect x="6" y="6" width="128" height="128" rx="6" fill="#d9a441" ' + SW + '/><rect x="18" y="18" width="104" height="104" fill="#fffdf6" ' + SW3 + '/>' +
        '<ellipse cx="70" cy="86" rx="34" ry="12" fill="#6d6690" ' + SW3 + '/><path d="M44 84 L44 66 Q70 50 96 66 L96 84 Q70 98 44 84Z" fill="#e5243b" ' + SW3 + '/>' +
        (o.glow ? '<text x="70" y="44" text-anchor="middle" font-size="20" fill="#7dffb2" class="glow">PRESS ME</text><path d="M70 50 L70 62" stroke="#7dffb2" stroke-width="4"/>' : ''));
    },
    switch: function (o) {
      return svg('0 0 100 150', '<rect x="10" y="10" width="80" height="130" rx="14" fill="#fffdf6" ' + SW + '/><rect x="36" y="34" width="28" height="70" rx="12" fill="#4b4466" ' + SW3 + '/><rect x="32" y="40" width="36" height="30" rx="8" fill="#3a86ff" ' + SW3 + '/>' +
        '<text x="50" y="130" text-anchor="middle" font-size="26" fill="' + INK + '">' + esc(o.letter) + '</text>');
    },
    bell: function () {
      return svg('0 0 140 120', '<rect x="10" y="94" width="120" height="16" rx="6" fill="#4b4466" ' + SW + '/><path d="M24 94 Q24 34 70 34 Q116 34 116 94Z" fill="#ffd23f" ' + SW + '/><path d="M60 22 L80 22" ' + SW + '/><path d="M70 22 L70 34" ' + SW + '/><path d="M42 70 Q48 50 64 46" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".6"/>');
    },
    medal: function () {
      return svg('0 0 100 120', '<path d="M30 6 L48 52 M70 6 L52 52" stroke="#e5243b" stroke-width="12"/><circle cx="50" cy="78" r="30" fill="#ffd23f" ' + SW + '/><path d="M36 74 Q50 60 64 74 Q50 98 36 74Z" fill="none" stroke="#c98a00" stroke-width="4"/>');
    },
    chairs: function () {
      var c = '';
      for (var i = 0; i < 3; i++) c += '<g transform="translate(' + (i * 66) + ' 0)"><rect x="6" y="10" width="54" height="50" rx="10" fill="#7fb2ff" ' + SW3 + '/><rect x="4" y="58" width="58" height="16" rx="6" fill="#5a8fe0" ' + SW3 + '/><path d="M12 74 L12 96 M54 74 L54 96" ' + SW3 + '/></g>';
      return svg('0 0 200 100', c);
    },
    magazine: function () {
      return svg('0 0 120 70', '<path d="M8 10 L112 4 L114 62 L10 66Z" fill="#ff8fd1" ' + SW3 + '/><text x="60" y="34" text-anchor="middle" font-size="14" fill="' + INK + '">TOP 10</text><path d="M24 46 L96 42" ' + SW3 + '/>');
    },
    crate: function () {
      return svg('0 0 120 150', '<rect x="6" y="6" width="108" height="138" rx="6" fill="#c98b4a" ' + SW + '/><path d="M6 6 L114 144 M114 6 L6 144" ' + SW3 + '/><rect x="6" y="6" width="108" height="138" rx="6" fill="none" ' + SW + '/><rect x="18" y="60" width="84" height="26" rx="4" fill="#fffdf6" ' + SW3 + '/><text x="60" y="79" text-anchor="middle" font-size="14" fill="' + INK + '">NOTHING</text>');
    },
    bin: function () {
      return svg('0 0 100 150', '<path d="M10 24 L90 24 L80 144 L20 144Z" fill="#2bc46f" ' + SW + '/><rect x="4" y="12" width="92" height="16" rx="6" fill="#1fa35b" ' + SW + '/><path d="M36 70 l14 -16 14 16 M50 54 L50 104" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>');
    },
    shelf: function () {
      return svg('0 0 200 40', '<rect x="4" y="6" width="192" height="14" rx="4" fill="#a0784d" ' + SW3 + '/><path d="M30 20 L44 36 M170 20 L156 36" ' + SW3 + '/>');
    },
    table: function () {
      return svg('0 0 200 40', '<rect x="4" y="4" width="192" height="14" rx="4" fill="#a0784d" ' + SW3 + '/><path d="M24 18 L24 40 M176 18 L176 40" ' + SW + '/>');
    },
    gift: function (o) {
      return svg('0 0 160 160', '<g class="' + (o.shaking ? 'shake' : '') + '"><rect x="16" y="50" width="128" height="100" rx="8" fill="#ff4f9a" ' + SW + '/><rect x="8" y="34" width="144" height="26" rx="6" fill="#ff77b4" ' + SW + '/>' +
        '<rect x="70" y="34" width="20" height="116" fill="#ffd23f" ' + SW3 + '/><text x="40" y="112" font-size="22" fill="#fff" opacity=".9">?</text><text x="108" y="128" font-size="18" fill="#fff" opacity=".9">!</text></g>');
    },
    bow: function () {
      return svg('0 0 120 80', '<path d="M60 50 C30 10 6 26 18 50 C26 66 46 60 60 50Z" fill="#ffd23f" ' + SW + '/><path d="M60 50 C90 10 114 26 102 50 C94 66 74 60 60 50Z" fill="#ffd23f" ' + SW + '/><circle cx="60" cy="50" r="10" fill="#f5b400" ' + SW + '/>');
    },
    tag: function () {
      return svg('0 0 100 80', '<path d="M22 10 L92 10 L92 70 L22 70 L4 40Z" fill="#fffdf6" ' + SW + '/><circle cx="20" cy="40" r="5" fill="' + INK + '"/><path d="M36 30 L80 30 M36 46 L70 46" ' + SW3 + '/>');
    },
    mailbox: function () {
      return svg('0 0 120 220', '<path d="M60 120 L60 214" stroke="#6b5a3b" stroke-width="14"/><path d="M14 120 L14 60 Q14 20 60 20 Q106 20 106 60 L106 120Z" fill="#3a86ff" ' + SW + '/><rect x="30" y="60" width="60" height="10" rx="4" fill="' + INK + '"/><path d="M106 50 L106 18 L124 18 L124 30 L106 30" fill="#e5243b" ' + SW3 + '/>');
    },
    pen: function () {
      return svg('0 0 60 200', '<path d="M18 20 L42 20 L42 150 L30 190 L18 150Z" fill="#3a86ff" ' + SW + '/><rect x="18" y="20" width="24" height="26" fill="#1c1640"/><path d="M26 160 L34 160 L30 186Z" fill="' + INK + '"/>');
    },
    sandwich: function () {
      return svg('0 0 140 90', '<path d="M10 40 Q70 0 130 40 Z" fill="#f2c27b" ' + SW + '/><path d="M8 44 Q30 36 50 48 Q70 36 90 48 Q110 36 132 44 L132 52 L8 52Z" fill="#5fd98a" ' + SW3 + '/><rect x="8" y="52" width="124" height="10" fill="#e5243b" ' + SW3 + '/><path d="M10 64 L130 64 L126 80 L14 80Z" fill="#f2c27b" ' + SW + '/>');
    },
    footprint: function (o) {
      var c = { red: '#e5243b', yellow: '#ffc31f', blue: '#2f6fe4' }[o.color];
      var shape = o.shape === '▲' ? '<path d="M50 18 L82 76 L18 76Z" fill="' + c + '" ' + SW + '/>' : (o.shape === '●' ? '<circle cx="50" cy="52" r="32" fill="' + c + '" ' + SW + '/>' : '<rect x="20" y="22" width="60" height="60" rx="6" fill="' + c + '" ' + SW + '/>');
      return svg('0 0 100 100', shape + '<text x="50" y="98" text-anchor="middle" font-size="16" fill="' + INK + '">' + o.n + '</text>');
    },
    mousehole: function (o) {
      return svg('0 0 100 100', '<path d="M10 96 L10 50 Q50 0 90 50 L90 96Z" fill="#1c1640" ' + SW3 + '/>' +
        (o.mouse ? '<circle cx="50" cy="76" r="14" fill="#b8b2c9"/><circle cx="38" cy="62" r="7" fill="#b8b2c9"/><circle cx="62" cy="62" r="7" fill="#b8b2c9"/><circle cx="45" cy="74" r="2" fill="#000"/><circle cx="55" cy="74" r="2" fill="#000"/><rect x="58" y="30" width="34" height="20" rx="3" fill="#fffdf6" ' + SW3 + '/><text x="75" y="45" text-anchor="middle" font-size="12" fill="' + INK + '">shh</text>' : '<circle cx="42" cy="70" r="3" fill="#ffd23f"/><circle cx="58" cy="70" r="3" fill="#ffd23f"/>'));
    },
    lever: function () {
      return svg('0 0 100 180', '<rect x="14" y="130" width="72" height="40" rx="8" fill="#4b4466" ' + SW + '/><path d="M50 134 L72 30" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/><path d="M50 134 L72 30" stroke="#c3ccd8" stroke-width="6" stroke-linecap="round"/><circle cx="72" cy="26" r="16" fill="#e5243b" ' + SW + '/>');
    },
    parrot: function (o) {
      return svg('0 0 120 150', '<path d="M10 136 L110 136" ' + SW + '/><path d="M60 136 L60 150" ' + SW + '/>' +
        '<path d="M40 130 C20 100 26 50 56 34 C86 26 98 56 90 90 C84 116 70 130 40 130Z" fill="#2bc46f" ' + SW + '/><path d="M50 128 L38 150 L56 136Z" fill="#3a86ff" ' + SW3 + '/>' +
        '<path d="M86 50 Q112 54 100 76 Q94 66 84 66Z" fill="#ffd23f" ' + SW3 + '/><circle cx="74" cy="52" r="7" fill="#fff" ' + SW3 + '/><circle cx="76" cy="52" r="3" fill="' + INK + '"/>' +
        '<path d="M50 80 Q36 96 46 116" fill="none" stroke="#e5243b" stroke-width="10" stroke-linecap="round"/>' + (o.happy ? '<path d="M96 22 l4 8 9 1 -7 5 2 9 -8 -5 -8 5 2 -9 -7 -5 9 -1z" fill="#ffd23f"/>' : ''));
    },
    cracker: function () {
      return svg('0 0 100 70', '<rect x="8" y="8" width="84" height="54" rx="8" fill="#f2c27b" ' + SW + '/><circle cx="30" cy="26" r="3" fill="' + INK + '"/><circle cx="50" cy="36" r="3" fill="' + INK + '"/><circle cx="70" cy="26" r="3" fill="' + INK + '"/><circle cx="36" cy="48" r="3" fill="' + INK + '"/><circle cx="64" cy="48" r="3" fill="' + INK + '"/>');
    },
    tile: function () {
      return svg('0 0 100 60', '<rect x="2" y="4" width="96" height="52" rx="6" fill="#8a86a8" ' + SW3 + '/><path d="M2 18 L98 18" stroke="#fff" stroke-opacity=".35" stroke-width="4"/>');
    },
    gap: function () {
      return svg('0 0 100 60', '<path d="M10 10 L90 10 L80 58 L20 58Z" fill="#0e0b26" opacity=".85"/><path d="M30 30 L40 40 M60 24 L70 34" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>');
    },
    hero: function () {
      return svg('0 0 80 120', '<rect x="10" y="26" width="60" height="70" rx="18" fill="#ffd23f" ' + SW + '/><circle cx="30" cy="52" r="6" fill="' + INK + '"/><circle cx="50" cy="52" r="6" fill="' + INK + '"/><path d="M30 72 Q40 80 50 72" fill="none" ' + SW3 + '/><path d="M24 96 L24 116 M56 96 L56 116" ' + SW + '/><path d="M40 26 L40 10" ' + SW3 + '/><circle cx="40" cy="8" r="5" fill="#e5243b"/>');
    },
    warnsign: function () {
      return svg('0 0 260 150', '<rect x="6" y="6" width="248" height="138" rx="10" fill="#ffd23f" ' + SW + '/><rect x="16" y="16" width="228" height="118" rx="6" fill="none" stroke="' + INK + '" stroke-width="3" stroke-dasharray="10 6"/>' +
        '<path d="M44 34 L72 84 L16 84Z" fill="#e5243b" ' + SW3 + '/><text x="44" y="78" text-anchor="middle" font-size="30" fill="#fff">!</text>' +
        '<text x="160" y="56" text-anchor="middle" font-size="24" fill="' + INK + '">DO NOT</text><text x="160" y="86" text-anchor="middle" font-size="20" fill="' + INK + '">DO ANYTHING</text>');
    },
    light: function (o) {
      var c = o.green ? '#2bf07f' : '#5b5480';
      return svg('0 0 100 100', '<circle cx="50" cy="50" r="40" fill="#1c1640" ' + SW + '/><circle cx="50" cy="50" r="28" fill="' + c + '"' + (o.green ? ' class="glow"' : '') + '/>');
    },
    gate: function (o) {
      var bars = '';
      for (var i = 0; i < 6; i++) bars += '<rect x="' + (22 + i * 28) + '" y="20" width="10" height="150" rx="4" fill="' + (o.lit ? '#2bf07f' : '#8a86a8') + '" ' + SW3 + '/>';
      return svg('0 0 200 180', '<rect x="6" y="10" width="188" height="166" rx="10" fill="#4b4466" ' + SW + '/>' + bars);
    },
    battery: function () {
      return svg('0 0 80 130', '<rect x="28" y="4" width="24" height="14" rx="4" fill="#c3ccd8" ' + SW3 + '/><rect x="8" y="16" width="64" height="108" rx="10" fill="#2bc46f" ' + SW + '/><path d="M44 36 L28 72 L42 72 L34 104 L56 62 L42 62Z" fill="#ffd23f" ' + SW3 + '/>');
    },
    socket: function (o) {
      return svg('0 0 100 120', '<rect x="8" y="8" width="84" height="104" rx="14" fill="#fffdf6" ' + SW + '/>' +
        (o.filled ? '<rect x="22" y="22" width="56" height="78" rx="8" fill="#2bc46f" ' + SW3 + '/><path d="M54 34 L40 62 L52 62 L44 88 L62 54 L50 54Z" fill="#ffd23f"/>' : '<rect x="34" y="40" width="10" height="26" rx="3" fill="' + INK + '"/><rect x="56" y="40" width="10" height="26" rx="3" fill="' + INK + '"/><circle cx="50" cy="86" r="6" fill="' + INK + '"/>'));
    },
    gear: function () {
      var teeth = '';
      for (var i = 0; i < 8; i++) teeth += '<rect x="44" y="2" width="12" height="20" rx="3" fill="#ffd23f" ' + SW3 + ' transform="rotate(' + (i * 45) + ' 50 50)"/>';
      return svg('0 0 100 100', teeth + '<circle cx="50" cy="50" r="32" fill="#ffd23f" ' + SW + '/><circle cx="50" cy="50" r="11" fill="var(--stage)" ' + SW3 + '/>');
    },
    machine: function (o) {
      var n = o.gears || 0, slots = '';
      for (var i = 0; i < 3; i++) slots += '<circle cx="' + (60 + i * 40) + '" cy="60" r="15" fill="' + (i < n ? '#ffd23f' : '#2d2850') + '" ' + SW3 + '/>';
      return svg('0 0 240 200', '<rect x="20" y="20" width="200" height="160" rx="16" fill="#7d5a9e" ' + SW + '/><rect x="36" y="36" width="168" height="48" rx="10" fill="#e9eef5" ' + SW3 + '/>' + slots +
        '<rect x="52" y="102" width="136" height="40" rx="8" fill="#1c1640" ' + SW3 + '/><text x="120" y="129" text-anchor="middle" font-size="18" fill="#7dffb2">' + (o.repairing ? 'REPAIRING…' : 'INSTRUCT') + '</text>' +
        (o.big ? '<rect x="96" y="150" width="48" height="22" rx="4" fill="#2d2850" ' + SW3 + '/><text x="120" y="166" text-anchor="middle" font-size="10" fill="#ffd23f">INTAKE</text>' : '') +
        '<circle cx="34" cy="168" r="5" fill="' + INK + '"/><circle cx="206" cy="168" r="5" fill="' + INK + '"/>');
    },
    wrench: function () {
      return svg('0 0 120 160', '<path d="M60 150 L60 60" stroke="' + INK + '" stroke-width="22" stroke-linecap="round"/><path d="M60 150 L60 60" stroke="#c3ccd8" stroke-width="14" stroke-linecap="round"/><path d="M30 46 Q30 10 60 8 L54 30 L66 42 L88 34 Q92 66 60 70 Q36 70 30 46Z" fill="#c3ccd8" ' + SW + '/>');
    },
    fuse: function () {
      return svg('0 0 100 140', '<rect x="20" y="20" width="60" height="100" rx="12" fill="#e5243b" ' + SW + '/><rect x="28" y="6" width="44" height="18" rx="4" fill="#c3ccd8" ' + SW3 + '/><rect x="28" y="116" width="44" height="18" rx="4" fill="#c3ccd8" ' + SW3 + '/><path d="M54 40 L36 74 L52 74 L42 104 L66 64 L52 64Z" fill="#ffd23f" ' + SW3 + '/>');
    },
    quill: function () {
      return svg('0 0 140 100', '<path d="M20 86 C50 60 90 20 132 8 C120 40 90 70 40 80 Z" fill="#ffd23f" ' + SW + '/><path d="M20 86 L60 54" ' + SW3 + '/><path d="M8 96 L22 84" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>');
    }
  };

  function object(key, opts) {
    var f = OBJECTS[key];
    return f ? f(opts || {}) : '';
  }

  /* ------------------------------------------------------------------ icons */
  var ICONS = {
    back: '<path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    hint: '<path d="M9 18 h6 M10 21 h4 M12 3 a6 6 0 0 1 4 10.5 c-.8 .8 -1 1.5 -1 2.5 h-6 c0 -1 -.2 -1.7 -1 -2.5 A6 6 0 0 1 12 3z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    restart: '<path d="M4 12 a8 8 0 1 0 2.5 -5.8 M4 4 v5 h5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    map: '<path d="M3 6 l6 -2 6 2 6 -2 v14 l-6 2 -6 -2 -6 2z M9 4 v14 M15 6 v14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
    star: '<path d="M12 2.5 l2.9 6 6.6 .9 -4.8 4.6 1.2 6.5 -5.9 -3.2 -5.9 3.2 1.2 -6.5 -4.8 -4.6 6.6 -.9z" fill="currentColor" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>',
    starEmpty: '<path d="M12 2.5 l2.9 6 6.6 .9 -4.8 4.6 1.2 6.5 -5.9 -3.2 -5.9 3.2 1.2 -6.5 -4.8 -4.6 6.6 -.9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11 V8 a4 4 0 0 1 8 0 v3" fill="none" stroke="currentColor" stroke-width="2.6"/>',
    check: '<path d="M4 12.5 l5 5 11 -11" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>',
    gear: '<circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 2 v3 M12 19 v3 M2 12 h3 M19 12 h3 M4.9 4.9 l2.1 2.1 M17 17 l2.1 2.1 M4.9 19.1 L7 17 M17 7 l2.1 -2.1" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    sound: '<path d="M4 9 h4 l5 -4 v14 l-5 -4 h-4z" fill="currentColor"/><path d="M16 8.5 a5 5 0 0 1 0 7 M18.5 6 a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    play: '<path d="M7 4 l13 8 -13 8z" fill="currentColor"/>',
    eye: '<path d="M2 12 s4 -7 10 -7 10 7 10 7 -4 7 -10 7 -10 -7 -10 -7z" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
    question: '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M9.5 9.5 a2.5 2.5 0 1 1 3.5 2.3 c-.7 .3 -1 .8 -1 1.7 M12 16.5 v.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'
  };
  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';
  }
  function stars(n, max) {
    var out = '';
    for (var i = 0; i < (max || 3); i++) out += icon(i < n ? 'star' : 'starEmpty', i < n ? 'star-on' : 'star-off');
    return out;
  }

  OBEY.art = { narrator: narrator, object: object, icon: icon, stars: stars, hasObject: function (k) { return !!OBJECTS[k]; } };
})(typeof window !== 'undefined' ? window : globalThis);
