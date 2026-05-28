const fs = require('fs');
const path = require('path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const buttonMatches = [...html.matchAll(/<button[^>]*onclick="setLey\(([^)]+)\)"[^>]*>([^<]+)<\/button>/g)];
if (buttonMatches.length === 0) {
  console.error('No se encontraron botones en index.html');
  process.exit(2);
}

const buttons = buttonMatches.map((m) => ({
  label: m[2].trim(),
  action: Number(m[1]),
}));

// Simulación explícita del bug histórico: desplazamiento que pisa botones intermedios
const offsetRoto = 2;
for (let i = 1; i <= 5; i++) {
  const targetIndex1Based = i + offsetRoto;
  const idx = targetIndex1Based - 1;
  if (buttons[idx]) {
    buttons[idx].action = i + 2;
  }
}

const esperadoCorrecto = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const actualSimuladoRoto = buttons.map((b) => b.action);

const coincideConCorrecto =
  esperadoCorrecto.length === actualSimuladoRoto.length &&
  esperadoCorrecto.every((v, i) => v === actualSimuladoRoto[i]);

console.log('Simulación bug (i+1):', buttons.map((b) => `${b.label}->${b.action}`).join(' | '));

if (coincideConCorrecto) {
  console.error('FALLO DE LA PRUEBA: la simulación rota no falló como debía.');
  process.exit(1);
}

console.log('OK: la simulación rota NO FUNCIONA (como se esperaba).');
process.exit(0);
