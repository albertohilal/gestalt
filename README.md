# Gestalt — Leyes de la percepción visual

Proyecto interactivo en **p5.js** para explorar principios de la teoría de la Gestalt (proximidad, semejanza, continuidad, cierre y simetría), con pantallas introductorias y control de parámetro en escenas interactivas.

## Estructura

- `index.html`: interfaz principal y navegación entre pantallas.
- `sketch.js`: lógica de escenas, renderizado en canvas y control de overlays.
- `contenido.js`: textos de introducción y pantallas explicativas.
- `style.css`: estilos globales y tipografía.
- `libraries/`: librerías p5 locales.

## Ejecutar en local

### Opción 1: Python

```bash
cd /home/beto/Documentos/Github/Gestalt
python3 -m http.server 5500
```

Abrir en navegador:

- http://127.0.0.1:5500/index.html

### Opción 2: Live Server (VS Code)

- Abrir la carpeta del proyecto en VS Code.
- Usar la extensión **Live Server** sobre `index.html`.

## Navegación de pantallas

- Intro
- Agrupación
- 1) Proximidad
- Semejanza (pantalla explicativa previa)
- 2) Semejanza
- 3) Continuidad
- 4) Cierre
- 5) Simetría / Pregnancia

## Pruebas rápidas

```bash
node prueba-botones.js
node prueba-botones-negativa.js
```

## Estado del repositorio

Repositorio remoto:

- https://github.com/albertohilal/gestalt
