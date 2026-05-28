// ------------------------------------------------------------
// Leyes de la Gestalt — p5.js (ES)
// ------------------------------------------------------------

// ============================================================
// VARIABLES GLOBALES
// ============================================================
var leyActual = 0;
var parametro = 0.5;
var desc = "";

// ============================================================
// UTILIDADES DE TEXTO — independientes de p5.js
// ============================================================
function escapeHTML(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setReadableText(element, rawText) {
  if (!element) return;
  const source = String(rawText || '').trim();
  if (!source) { element.textContent = ''; return; }
  const explicitParagraphs = source.split(/\n\s*\n/g).map(p => p.trim()).filter(Boolean);
  if (explicitParagraphs.length > 1) {
    element.innerHTML = explicitParagraphs.map(p => escapeHTML(p)).join('<br><br>');
    return;
  }
  const sentences = source.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [source];
  const cleanSentences = sentences.map(s => s.trim()).filter(Boolean);
  const blocks = [];
  for (let i = 0; i < cleanSentences.length; i += 2) {
    blocks.push(cleanSentences.slice(i, i + 2).join(' '));
  }
  element.innerHTML = blocks.map(b => escapeHTML(b)).join('<br><br>');
}

// ============================================================
// SETLEY — independiente de p5.js, funciona sin p5
// ============================================================
function setLey(n) {
  leyActual = n;

  const overlayIntro             = document.getElementById('intro-overlay');
  const overlayAgrup             = document.getElementById('agrupacion-overlay');
  const overlaySemejanzaPrevia   = document.getElementById('semejanza-previa-overlay');
  const overlayContinuidadPrevia = document.getElementById('continuidad-previa-overlay');
  const overlayCierrePrevia      = document.getElementById('cierre-previa-overlay');
  const overlaySimetriaPrevia    = document.getElementById('simetria-previa-overlay');
  const sketchDiv                = document.getElementById('sketch');
  const sliderWrap               = document.getElementById('ley-slider');

  // Ocultar todos los overlays
  [overlayIntro, overlayAgrup, overlaySemejanzaPrevia,
   overlayContinuidadPrevia, overlayCierrePrevia, overlaySimetriaPrevia]
    .forEach(function(el) { if (el) el.style.display = 'none'; });

  // Slider solo en pantallas de canvas
  if (sliderWrap) {
    sliderWrap.style.display = [2, 4, 6, 8, 10].includes(n) ? 'block' : 'none';
  }

  var overlayMap = {
    0: overlayIntro,
    1: overlayAgrup,
    3: overlaySemejanzaPrevia,
    5: overlayContinuidadPrevia,
    7: overlayCierrePrevia,
    9: overlaySimetriaPrevia,
  };

  if (n in overlayMap) {
    // Pantalla de texto
    if (overlayMap[n]) overlayMap[n].style.display = 'block';
    if (sketchDiv) sketchDiv.style.display = 'none';
  } else {
    // Pantalla de canvas
    if (sketchDiv) sketchDiv.style.display = '';
    if (typeof redraw === 'function') redraw();
  }
}

// ============================================================
// INICIALIZACIÓN DOM — SIN p5.js, corre apenas carga la página
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

  function set(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) setReadableText(el, value);
  }

  try {
    set('intro-titulo',           INTRO.titulo);
    set('intro-gestalt-titulo',   INTRO.gestalt.titulo);
    setText('intro-gestalt-texto',  INTRO.gestalt.texto);
    set('intro-arnheim-titulo',   INTRO.arnheim.titulo);
    setText('intro-arnheim-texto',  INTRO.arnheim.texto);
  } catch(e) { console.error('Error intro:', e); }

  try {
    set('agrupacion-titulo',    AGRUPACION.titulo);
    set('agrupacion-subtitulo', AGRUPACION.subtitulo);
    setText('agrupacion-texto', AGRUPACION.texto);
  } catch(e) { console.error('Error agrupacion:', e); }

  try {
    set('semejanza-previa-titulo',    SEMEJANZA_PREVIA.titulo);
    set('semejanza-previa-subtitulo', SEMEJANZA_PREVIA.subtitulo);
    setText('semejanza-previa-texto', SEMEJANZA_PREVIA.texto);
  } catch(e) { console.error('Error semejanza-previa:', e); }

  try {
    set('continuidad-previa-titulo',    CONTINUIDAD_PREVIA.titulo);
    set('continuidad-previa-subtitulo', CONTINUIDAD_PREVIA.subtitulo);
    setText('continuidad-previa-texto', CONTINUIDAD_PREVIA.texto);
  } catch(e) { console.error('Error continuidad-previa:', e); }

  try {
    set('cierre-previa-titulo',    CIERRE_PREVIA.titulo);
    set('cierre-previa-subtitulo', CIERRE_PREVIA.subtitulo);
    setText('cierre-previa-texto', CIERRE_PREVIA.texto);
  } catch(e) { console.error('Error cierre-previa:', e); }

  try {
    set('simetria-previa-titulo',    SIMETRIA_PREVIA.titulo);
    set('simetria-previa-subtitulo', SIMETRIA_PREVIA.subtitulo);
    setText('simetria-previa-texto', SIMETRIA_PREVIA.texto);
  } catch(e) { console.error('Error simetria-previa:', e); }

  // Slider
  var slider = document.getElementById('parametro-slider');
  if (slider) {
    slider.value = parametro;
    slider.addEventListener('input', function () {
      parametro = parseFloat(this.value);
      var pv = document.getElementById('parametro-value');
      if (pv) pv.textContent = parametro.toFixed(2);
      if (typeof redraw === 'function') redraw();
    });
  }

  // Mostrar pantalla intro al arrancar
  setLey(0);
});

// ============================================================
// P5.JS — solo canvas
// ============================================================
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("sketch");
  textFont('Arial, sans-serif');
  textWrap(WORD);
  rectMode(CENTER);
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function keyPressed() { /* navegación por teclas deshabilitada */ }

function draw() {
  background(250);
  var espacioSuperior = 170;
  push();
  var mW = width * 0.05;
  translate(mW, espacioSuperior);
  var gw = width - mW * 2;
  var gh = height - espacioSuperior - mW - 90;

  switch (leyActual) {
    case 2:  drawProximidad(gw, gh);  break;
    case 4:  drawSemejanza(gw, gh);   break;
    case 6:  drawContinuidad(gw, gh); break;
    case 8:  drawCierre(gw, gh);      break;
    case 10: drawSimetria(gw, gh);    break;
    default: break;
  }
  pop();

  if ([2, 4, 6, 8, 10].includes(leyActual)) {
    titulo(getTituloLey(leyActual));
  }
}

function getTituloLey(n) {
  switch (n) {
    case 2:  return "1) Proximidad";
    case 4:  return "2) Semejanza";
    case 6:  return "3) Continuidad";
    case 8:  return "4) Cierre (Triángulo de Kanizsa)";
    case 10: return "5) Simetría / Pregnancia";
    default: return "";
  }
}

// ============================================================
// DIBUJOS
// ============================================================

function drawProximidad(w, h) {
  desc = "Los elementos más próximos entre sí tienden a ser vistos como formando unidades.";
  setLeyDescHTML(desc);
  var filas = 5, porFila = 10;
  var radio = min(w, h) / 120;
  var gapIntra = radio * 2.5;
  var gapInter = map(parametro, 0, 1, radio * 4, radio * 16);
  var top  = (h - (filas - 1) * gapIntra * 2) / 2;
  var left = (w - (porFila - 1) * gapIntra - gapInter) / 2;
  noStroke();
  fill(30);
  for (var r = 0; r < filas; r++) {
    for (var c = 0; c < porFila; c++) {
      var x = left + c * gapIntra;
      if (c >= porFila / 2) x += gapInter;
      var y = top + r * (gapIntra * 2);
      circle(x, y, radio * 2);
    }
  }
}

function drawSemejanza(w, h) {
  desc = "Los elementos semejantes en forma, tamaño o color se agrupan perceptivamente, aun cuando estén separados por cierta distancia.";
  setLeyDescHTML(desc);
  var cols = 10, rows = 6;
  var cellW = w / cols, cellH = h / rows;
  var r = min(cellW, cellH) * 0.28;
  var limiteCols = floor(cols * parametro);
  noStroke();
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var cx = x * cellW + cellW / 2;
      var cy = y * cellH + cellH / 2;
      fill((x < limiteCols) ? 20 : 180);
      if (y % 2 === 0) circle(cx, cy, r * 2);
      else rect(cx, cy, r * 2, r * 2, 4);
    }
  }
}

function drawContinuidad(w, h) {
  desc = "Las formas son percibidas como continuas y unificadas en la dirección más simple y fluida posible.";
  setLeyDescHTML(desc);
  noFill();
  stroke(20);
  strokeWeight(3);
  var margin = 40;
  var cx = w / 2, cy = h / 2;
  var amp = map(parametro, 0, 1, 120, 40);
  beginShape();
  for (var x = margin; x <= w - margin; x += 16) {
    curveVertex(x, cy + sin(map(x, margin, w - margin, -PI, PI)) * amp);
  }
  endShape();
  push();
  translate(cx, cy);
  rotate(HALF_PI);
  beginShape();
  for (var x2 = -w / 2 + margin; x2 <= w / 2 - margin; x2 += 16) {
    curveVertex(x2, sin(map(x2, -w / 2 + margin, w / 2 - margin, -PI, PI)) * amp);
  }
  endShape();
  pop();
  stroke(0, 30);
  strokeWeight(1);
  line(margin, cy, w - margin, cy);
  line(cx, margin, cx, h - margin);
}

function drawCierre(w, h) {
  desc = "Las configuraciones tienden a ser vistas completas, aun cuando falten algunos de sus elementos constitutivos.";
  setLeyDescHTML(desc);
  background(252);
  var size = min(w, h) * 0.55;
  var cx = w / 2, cy = h / 2 + 10;
  var p1 = createVector(cx, cy - size * 0.58);
  var p2 = createVector(cx - size * 0.5, cy + size * 0.29);
  var p3 = createVector(cx + size * 0.5, cy + size * 0.29);
  var r   = size * 0.26;
  var gap = map(parametro, 0, 1, PI / 8, PI / 2.2);
  noStroke();
  fill(20);
  function pacman(px, py, tx, ty) {
    var ang = atan2(ty - py, tx - px);
    arc(px, py, r * 2, r * 2, ang + gap, ang - gap, PIE);
  }
  pacman(p1.x, p1.y, cx, cy);
  pacman(p2.x, p2.y, cx, cy);
  pacman(p3.x, p3.y, cx, cy);
  fill(255);
  noStroke();
  triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  noFill();
  stroke(0, 40);
  strokeWeight(1);
  triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

function drawSimetria(w, h) {
  desc = "Las estructuras visuales tienden a organizarse en las formas más regulares, simétricas y estables que las condiciones permitan.";
  setLeyDescHTML(desc);
  background(250);
  var pares  = floor(map(parametro, 0, 1, 3, 12));
  var cx     = w / 2;
  var top    = 24, bottom = h - 24;
  stroke(0, 40);
  strokeWeight(1.5);
  line(cx, top, cx, bottom);
  noStroke();
  for (var i = 0; i < pares; i++) {
    var y  = map(i, 0, pares - 1, top + 20, bottom - 20);
    var mw = map(i, 0, pares - 1, 16, 48);
    var mh = mw * 0.66;
    fill(30);
    rect(cx - 40 - mw / 2, y, mw, mh, 4);
    rect(cx + 40 + mw / 2, y, mw, mh, 4);
    if (i % 3 === 0) {
      fill(180);
      circle(cx - 40 - mw / 2, y, mh);
      circle(cx + 40 + mw / 2, y, mh);
    }
  }
  fill(120, 90);
  for (var k = 0; k < 30; k++) {
    var rx = random(w * 0.08, w * 0.92);
    if (abs(rx - cx) < 12) continue;
    circle(rx, random(top, bottom), 4);
  }
}

// ============================================================
// UTILIDADES UI
// ============================================================
function titulo(t) {
  var aire       = 40;
  var topTitulo  = 32;
  var topDesc    = topTitulo + 36;
  var altoDesc   = 200;
  var anchoTexto = width - aire * 2;
  noStroke();
  fill(0);
  textSize(22);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(t, aire, topTitulo);
  textSize(18);
  textLeading(27);
  textStyle(NORMAL);
  fill(40);
  textAlign(LEFT, TOP);
  text(desc, aire, topDesc, anchoTexto, altoDesc);
}

function setLeyDescHTML(txt) {
  var el = document.getElementById('ley-desc');
  if (el) el.textContent = txt;
}
