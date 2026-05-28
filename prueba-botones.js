const fs = require('fs');
const path = require('path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sketch = fs.readFileSync(path.join(root, 'sketch.js'), 'utf8');

const buttonMatches = [...html.matchAll(/<button[^>]*onclick="setLey\(([^)]+)\)"[^>]*>([^<]+)<\/button>/g)];
if (buttonMatches.length === 0) {
  console.error('No se encontraron botones en index.html');
  process.exit(2);
}

const buttons = buttonMatches.map((m) => ({
  label: m[2].trim(),
  action: Number(m[1]),
}));

const expected = [0, 1, 2, 3, 4, 5, 6, 7];
const actual = buttons.map((b) => b.action);

const ok = expected.length === actual.length && expected.every((v, i) => v === actual[i]);

console.log('Botones detectados:', buttons.map((b) => `${b.label}->${b.action}`).join(' | '));

if (!ok) {
  console.error('NO FUNCIONA: el mapeo final de botones es incorrecto.');
  console.error('Esperado:', expected.join(', '));
  console.error('Actual:  ', actual.join(', '));
  process.exit(1);
}

console.log('FUNCIONA: el mapeo final de botones es correcto.');
process.exit(0);
