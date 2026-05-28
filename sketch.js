// ------------------------------------------------------------
// Leyes de la Gestalt — p5.js (ES)
// Teclas: 1–5 cambian de ley | [ y ] ajustan parámetro
// ------------------------------------------------------------
let leyActual = 0;     // 0 = intro, 1 = agrupación, 2 = ley 1, 3 = antes de 2, 4 = ley 2, 5 = antes de 3, 6..8 = leyes 3..5
let parametro = 0.5;   // 0..1 para modular cada ejemplo
let desc = "";

function setup() {
  const w = windowWidth;
  const h = windowHeight;
  const cnv = createCanvas(w, h);
  cnv.parent("sketch");
  textFont('Arial, sans-serif');
  textWrap(WORD);
  rectMode(CENTER);
  noLoop();

  // Poblar el overlay de intro con los textos del contenido.js
  document.getElementById('intro-titulo').textContent        = INTRO.titulo;
  document.getElementById('intro-gestalt-titulo').textContent = INTRO.gestalt.titulo;
  setReadableText(document.getElementById('intro-gestalt-texto'), INTRO.gestalt.texto);
  document.getElementById('intro-arnheim-titulo').textContent  = INTRO.arnheim.titulo;
  setReadableText(document.getElementById('intro-arnheim-texto'), INTRO.arnheim.texto);

  // Set up slider and buttons
  const slider = document.getElementById('parametro-slider');
  if (slider) {
    slider.value = parametro;
    slider.addEventListener('input', function() {
      parametro = parseFloat(this.value);
      document.getElementById('parametro-value').textContent = parametro.toFixed(2);
      redraw();
    });
  }
  // Mostrar intro al inicio
  setLey(0);

  // Poblar el overlay de agrupación
  const agrupTitulo = document.getElementById('agrupacion-titulo');
  const agrupSub = document.getElementById('agrupacion-subtitulo');
  const agrupTexto = document.getElementById('agrupacion-texto');
  if (agrupTitulo && agrupSub && agrupTexto) {
    agrupTitulo.textContent = AGRUPACION.titulo;
    agrupSub.textContent = AGRUPACION.subtitulo;
    setReadableText(agrupTexto, AGRUPACION.texto);
  }

  // Poblar el overlay de semejanza previa
  const semejPrevTitulo = document.getElementById('semejanza-previa-titulo');
  const semejPrevSub = document.getElementById('semejanza-previa-subtitulo');
  const semejPrevTexto = document.getElementById('semejanza-previa-texto');
  if (semejPrevTitulo && semejPrevSub && semejPrevTexto) {
    semejPrevTitulo.textContent = SEMEJANZA_PREVIA.titulo;
    semejPrevSub.textContent = SEMEJANZA_PREVIA.subtitulo;
    setReadableText(semejPrevTexto, SEMEJANZA_PREVIA.texto);
  }

  // Poblar el overlay de continuidad previa
  const contPrevTitulo = document.getElementById('continuidad-previa-titulo');
  const contPrevSub = document.getElementById('continuidad-previa-subtitulo');
  const contPrevTexto = document.getElementById('continuidad-previa-texto');
  if (contPrevTitulo && contPrevSub && contPrevTexto) {
    contPrevTitulo.textContent = CONTINUIDAD_PREVIA.titulo;
    contPrevSub.textContent = CONTINUIDAD_PREVIA.subtitulo;
    setReadableText(contPrevTexto, CONTINUIDAD_PREVIA.texto);
  }
}

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
  if (!source) {
    element.textContent = '';
    return;
  }

  const explicitParagraphs = source
    .split(/\n\s*\n/g)
    .map(p => p.trim())
    .filter(Boolean);

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

function setLey(n) {
  leyActual = n;
  const overlayIntro = document.getElementById('intro-overlay');
  const overlayAgrup = document.getElementById('agrupacion-overlay');
  const overlaySemejanzaPrevia = document.getElementById('semejanza-previa-overlay');
  const overlayContinuidadPrevia = document.getElementById('continuidad-previa-overlay');
  const sketchCanvas = document.querySelector('#sketch canvas');
  const sliderWrap = document.getElementById('ley-slider');
  if (sliderWrap) {
    sliderWrap.style.display = ([2, 4, 6, 7, 8].includes(n)) ? 'block' : 'none';
  }
  if (n === 0) {
    overlayIntro.style.display = 'block';
    overlayAgrup.style.display = 'none';
    if (overlaySemejanzaPrevia) overlaySemejanzaPrevia.style.display = 'none';
    if (overlayContinuidadPrevia) overlayContinuidadPrevia.style.display = 'none';
    if (sketchCanvas) sketchCanvas.style.display = 'none';
  } else if (n === 1) {
    overlayIntro.style.display = 'none';
    overlayAgrup.style.display = 'block';
    if (overlaySemejanzaPrevia) overlaySemejanzaPrevia.style.display = 'none';
    if (overlayContinuidadPrevia) overlayContinuidadPrevia.style.display = 'none';
    if (sketchCanvas) sketchCanvas.style.display = 'none';
  } else if (n === 3) {
    overlayIntro.style.display = 'none';
    overlayAgrup.style.display = 'none';
    if (overlaySemejanzaPrevia) overlaySemejanzaPrevia.style.display = 'block';
    if (overlayContinuidadPrevia) overlayContinuidadPrevia.style.display = 'none';
    if (sketchCanvas) sketchCanvas.style.display = 'none';
  } else if (n === 5) {
    overlayIntro.style.display = 'none';
    overlayAgrup.style.display = 'none';
    if (overlaySemejanzaPrevia) overlaySemejanzaPrevia.style.display = 'none';
    if (overlayContinuidadPrevia) overlayContinuidadPrevia.style.display = 'block';
    if (sketchCanvas) sketchCanvas.style.display = 'none';
  } else {
    overlayIntro.style.display = 'none';
    overlayAgrup.style.display = 'none';
    if (overlaySemejanzaPrevia) overlaySemejanzaPrevia.style.display = 'none';
    if (overlayContinuidadPrevia) overlayContinuidadPrevia.style.display = 'none';
    if (sketchCanvas) sketchCanvas.style.display = '';
    redraw();
  }
}

function windowResized() {
  const w = windowWidth;
  const h = windowHeight;
  resizeCanvas(w, h);
  redraw();
}

// Deshabilitado: navegación por teclas
function keyPressed() {
  /*
  if (key >= '1' && key <= '5') {
    leyActual = int(key);
    redraw();
  }
  if (key === '[') { parametro = constrain(parametro - 0.05, 0, 1); redraw(); }
  if (key === ']') { parametro = constrain(parametro + 0.05, 0, 1); redraw(); }
  */
}

function draw() {
  background(250);
  // Espacio reservado para título y texto explicativo
  const espacioSuperior = 170; // reducido para que el ejemplo quede más arriba
  push();
  // Margen dinámico lateral: 5% del ancho
  const mW = width * 0.05;
  translate(mW, espacioSuperior);
  const gw = width - mW*2;
  const gh = height - espacioSuperior - mW - 90; // deja espacio para footer

  // Selector de ley
  switch (leyActual) {
    case 0: drawIntro(gw, gh); break;
    case 2: drawProximidad(gw, gh); break;
    case 4: drawSemejanza(gw, gh); break;
    case 6: drawContinuidad(gw, gh); break;
    case 7: drawCierre(gw, gh); break;
    case 8: drawSimetria(gw, gh); break;
    default: drawProximidad(gw, gh); break;
  }
  pop();

  // Título y texto explicativo siempre arriba (no en intro)
  if (leyActual !== 0) titulo(getTituloLey(leyActual));
}

function getTituloLey(n) {
  switch(n) {
    case 0: return "Introducción";
    case 1: return "Agrupación";
    case 2: return "1) Proximidad";
    case 3: return "Más allá de la distancia: La Semejanza";
    case 4: return "2) Semejanza";
    case 5: return "El fluir de la percepción: La Continuidad";
    case 6: return "3) Continuidad";
    case 7: return "4) Cierre (Triángulo de Kanizsa)";
    case 8: return "5) Simetría / Pregnancia";
    default: return "";
  }
}

// ---------------------- INTRO --------------------------------
function drawIntro(w, h) {
  desc = "";
  setLeyDescHTML("");
  // La intro se renderiza como HTML; sólo limpiamos el canvas
  background(250);

}

// ---------------------- PROXIMIDAD --------------------------
// Parámetro: separa los grupos (más alto = grupos más aislados)
function drawProximidad(w, h) {
  desc = "Los elementos más próximos entre sí tienden a ser vistos como formando unidades.";
  setLeyDescHTML(desc);
  console.log('drawProximidad desc:', desc);
  const filas = 5;
  const porFila = 10;
  const radio = min(w, h)/120;
  const gapIntra = radio * 2.5;
  const gapInter = map(parametro, 0, 1, radio*4, radio*16);

  const top = (h - (filas-1)*gapIntra*2)/2;
  const left = (w - (porFila-1)*gapIntra - gapInter)/2;

  noStroke();
  fill(30);
  for (let r = 0; r < filas; r++) {
    for (let c = 0; c < porFila; c++) {
      // Dos grupos: a la mitad agregamos un hueco extra
      let x = left + c*gapIntra;
      if (c >= porFila/2) x += gapInter;
      const y = top + r*(gapIntra*2);
      circle(x, y, radio*2);
    }
  }
}

// ---------------------- SEMEJANZA ---------------------------
// Parámetro: porcentaje de celdas "semejantes" en color/forma
function drawSemejanza(w, h) {
  desc = "Los elementos semejantes en forma, tamaño o color se agrupan perceptivamente, aun cuando estén separados por cierta distancia.";
  setLeyDescHTML(desc);
  console.log('drawSemejanza desc:', desc);
  const cols = 10;
  const rows = 6;
  const cellW = w/cols;
  const cellH = h/rows;
  const r = min(cellW, cellH) * 0.28;

  noStroke();
  textSize(12);

  // Regla de semejanza: por columnas (color) + por forma (círculo/rect)
  const porcentaje = parametro; // 0..1
  const limiteCols = floor(cols * porcentaje);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cx = x*cellW + cellW/2;
      const cy = y*cellH + cellH/2;

      // Color por semejanza de columna
      const similar = (x < limiteCols);
      fill(similar ? 20 : 180);

      // Forma por semejanza de fila (pares = círculo, impares = rect)
      const useCircle = (y % 2 === 0);
      if (useCircle) circle(cx, cy, r*2);
      else rect(cx, cy, r*2, r*2, 4);
    }
  }
}

// ---------------------- CONTINUIDAD -------------------------
// Parámetro: curva más suave o más quebrada (fluidez de trayectoria)
function drawContinuidad(w, h) {
  desc = "Las formas son percibidas como continuas y unificadas en la dirección más simple y fluida posible.";
  setLeyDescHTML(desc);
  console.log('drawContinuidad desc:', desc);
  noFill();
  stroke(20);
  strokeWeight(3);

  // Dos trayectorias que se cruzan
  const margin = 40;
  const cx = w/2, cy = h/2;
  const amp = map(parametro, 0, 1, 120, 40); // menor amp = más suave

  // Curva 1 (izq->der)
  beginShape();
  for (let x = margin; x <= w - margin; x += 16) {
    const t = map(x, margin, w - margin, -PI, PI);
    const y = cy + sin(t) * amp;
    curveVertex(x, y);
  }
  endShape();

  // Curva 2 (arriba->abajo), rotada 90°
  push();
  translate(cx, cy);
  rotate(HALF_PI);
  beginShape();
  for (let x = -w/2 + margin; x <= w/2 - margin; x += 16) {
    const t = map(x, -w/2 + margin, w/2 - margin, -PI, PI);
    const y = 0 + sin(t) * amp;
    curveVertex(x, y);
  }
  endShape();
  pop();

  // Puntos guía sutiles
  stroke(0, 30);
  strokeWeight(1);
  line(margin, cy, w - margin, cy);
  line(cx, margin, cx, h - margin);
}

// ------------------------ CIERRE ----------------------------
// Parámetro: tamaño de las “mordidas” (mayor = más incompleto)
function drawCierre(w, h) {
  desc = "Las configuraciones tienden a ser vistas completas, aun cuando falten algunos de sus elementos constitutivos.";
  setLeyDescHTML(desc);
  console.log('drawCierre desc:', desc);
  background(252);

  // Triángulo de Kanizsa
  const size = min(w, h)*0.55;
  const cx = w/2;
  const cy = h/2 + 10;

  // Vértices del triángulo equilátero
  const p1 = createVector(cx, cy - size*0.58);
  const p2 = createVector(cx - size*0.5, cy + size*0.29);
  const p3 = createVector(cx + size*0.5, cy + size*0.29);

  // “Pacman” en cada vértice (círculos con mordida hacia el centro)
  const r = size*0.26;
  const gap = map(parametro, 0, 1, PI/8, PI/2.2); // ángulo de mordida

  noStroke();
  fill(20);

  function pacman(px, py, targetX, targetY) {
    const ang = atan2(targetY - py, targetX - px);
    arc(px, py, r*2, r*2, ang + gap, ang - gap, PIE);
  }

  pacman(p1.x, p1.y, cx, cy);
  pacman(p2.x, p2.y, cx, cy);
  pacman(p3.x, p3.y, cx, cy);

  // Vértices sugeridos del triángulo blanco ilusorio
  fill(255);
  noStroke();
  triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

  // Borde muy tenue para el fondo, refuerza la ilusión
  noFill();
  stroke(0, 40);
  strokeWeight(1);
  triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
}

// ----------------- SIMETRÍA / PREGNANCIA -------------------
// Parámetro: “fuerza” de la simetría (número de pares espejados)
function drawSimetria(w, h) {
  desc = "Las estructuras visuales tienden a organizarse en las formas más regulares, simétricas y estables que las condiciones permitan.";
  setLeyDescHTML(desc);
  console.log('drawSimetria desc:', desc);
  background(250);

  const pares = floor(map(parametro, 0, 1, 3, 12));
  const cx = w/2;
  const top = 24;
  const bottom = h - 24;

  // Eje de simetría
  stroke(0, 40);
  strokeWeight(1.5);
  line(cx, top, cx, bottom);

  // Pares espejo
  noStroke();
  for (let i = 0; i < pares; i++) {
    const y = map(i, 0, pares-1, top+20, bottom-20);

    const mw = map(i, 0, pares-1, 16, 48);
    const mh = mw * 0.66;

    // izquierda
    fill(30);
    rect(cx - 40 - mw/2, y, mw, mh, 4);

    // derecha (espejo)
    fill(30);
    rect(cx + 40 + mw/2, y, mw, mh, 4);

    if (i % 3 === 0) {
      fill(180);
      circle(cx - 40 - mw/2, y, mh);
      circle(cx + 40 + mw/2, y, mh);
    }
  }

  // Ruido no simétrico (contraste)
  fill(120, 90);
  for (let k = 0; k < 30; k++) {
    const rx = random(w*0.08, w*0.92);
    if (abs(rx - cx) < 12) continue;
    const ry = random(top, bottom);
    circle(rx, ry, 4);
  }
}

// -------------------- UTILIDADES UI ------------------------
function titulo(t) {
  // Aire lateral para textos
  const aire = 40;
  const topTitulo = 32;
  const topDesc = topTitulo + 36;
  const altoDesc = 200; // más alto para textos largos
  const anchoTexto = width - aire*2;

  // Etiqueta superior
  noStroke();
  fill(0);
  textSize(22);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  console.log('Título:', t, 'x:', aire, 'y:', topTitulo);
  text(t, aire, topTitulo);

  // Texto explicativo de la ley (desc)
  textSize(18);
  textLeading(27);
  textStyle(NORMAL);
  fill(40);
  textAlign(LEFT, TOP);
  console.log('Desc:', desc, 'x:', aire, 'y:', topDesc, 'w:', anchoTexto, 'h:', altoDesc);
  text(desc, aire, topDesc, anchoTexto, altoDesc); // alto mucho mayor

  // Parámetro visible
  textSize(13);
  textStyle(NORMAL);
  fill(60);
  textAlign(LEFT, TOP);
  console.log('Parámetro:', "Parámetro: " + nf(parametro, 1, 2), 'x:', aire, 'y:', topDesc + altoDesc + 12);
  text("Parámetro: " + nf(parametro, 1, 2) + "  (ajusta con [ y ])", aire, topDesc + altoDesc + 12);
}

function drawEtiquetas() {
  // Eliminado: ya no se muestran indicaciones de navegación
}

function setLeyDescHTML(text) {
  const descDiv = document.getElementById('ley-desc');
  if (descDiv) descDiv.textContent = text;
}
