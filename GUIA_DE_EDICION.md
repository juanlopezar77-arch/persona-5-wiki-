# Guía de edición · Persona 5 Royal Wiki

Proyecto: `index.html` (estructura y textos fijos), `styles.css` (diseño), `script.js` (datos y funciones), carpeta `assets/` (imágenes y audio).

## Consejos para experimentar sin miedo
- **Copia de seguridad:** copia la carpeta completa antes de cambios grandes (clic derecho → Copiar → Pegar).
- **Guardar:** `Ctrl + S` en VS Code (activa *File → Auto Save* para no olvidarlo).
- **Recargar:** `F5` o `Ctrl + R` en el navegador (`Ctrl + F5` si no ves el cambio).
- **Errores:** `F12` → pestaña **Consola**. Los avisos `[Wiki]` te dicen qué campo o imagen falla.
- **Deshacer:** `Ctrl + Z`; en VS Code, *File → Revert File* vuelve a la última versión guardada.
- **Formato:** clic derecho → *Format Document* (`Shift + Alt + F`).

## 1. Abrir y ejecutar
1. Descomprime/copia la carpeta `persona5-royal-wiki` en tu PC.
2. Abre VS Code → *File → Open Folder* → elige esa carpeta.
3. Doble clic en `index.html` en el explorador de archivos (se abre en Chrome, Edge o Firefox). No necesitas instalar nada.
4. Opcional: extensión **Live Server** (clic derecho en `index.html` → *Open with Live Server*): recarga sola al guardar.

## 2. Cambiar el título principal
`index.html` → busca `<h1 class="hero__title">`. Cambia `PERSONA`, `5` o `ROYAL`. También `<title>` arriba. Recarga: verás el nuevo título en la portada.

## 3. Modificar una descripción
- Personajes/Personas/Palacios/Canciones: `script.js` → busca el objeto (ej. `id:"skull"`) y edita `personalidad`, `rol`, `identidad`, `simbolismo`, `ambiente`, `objetivo` o `contexto`. Mantén las comillas `"..."` y la coma final.
- Sinopsis: `index.html` → `<ol class="syn__list">`, edita el `<p>` de cada `<li>`.

## 4. Agregar un personaje
`script.js` → `const PERSONAJES = [`. Copia un bloque `{ ... },` y pégalo al final (antes de `];`). Ejemplo:
```js
{ id:"nuevo", codigo:"Código", real:"Nombre Real", arcano:"Fool", color:"#ff0000",
  persona:"Persona inicial", personalidad:"...", rol:"...", imagen:"" },
```
**Obligatorios:** `id` (único, sin espacios), `codigo`, `real`, `arcano`, `persona`, `personalidad`, `rol`. **Opcionales:** `edad`, `alias`, `color`, `estilo`, `spoiler`, `imagen`, `alt`. `arcano` debe ser una clave de `ARCANOS`: Fool, Magician, Priestess, Empress, Emperor, Lovers, Chariot, Justice, Hermit, Faith. La tarjeta, el buscador, el filtro y la ficha se crean solos.

## 5. Cambiar el retrato de un personaje
1. Guarda la imagen en `assets/personajes/` (ej. `joker.jpg`, formato vertical 3:4 recomendado).
2. En su objeto de `PERSONAJES` pon: `imagen:"assets/personajes/joker.jpg"`.
3. Recarga. Si la ruta falla se muestra el dibujo generado y la consola avisa. Mayúsculas y extensión deben coincidir exactamente.
Para cambiarla por otra: sustituye el archivo con el mismo nombre o cambia la ruta. Usa solo imágenes que tengas derecho a usar.

## 6. Añadir una Persona
`script.js` → `const PERSONAS = [`. Copia un bloque y cambia: `id`, `nombre`, `usuario` (el `id` de un personaje, ej. `"joker"`), `arcano`, `color`, `identidad`, `simbolismo`. Opcionales: `imagen`, `oculta:true` (oculta el nombre hasta activar spoilers).

## 7. Incorporar un Palacio
`script.js` → `const PALACIOS = [`. Copia un bloque. Campos: `numero`, `nombre`, `titulo`, `responsable`, `tema`, `color`, `ambiente`, `objetivo` y `arte` (`castillo, museo, banco, piramide, espacio, casino, barco, tunel, laboratorio`). `ocultar:"nada"` (todo visible), `"detalles"` (usa `spoiler:"texto"` en recuadro) o `"todo"` (nombre y datos ocultos). Opcional: `imagen`.

## 8. Añadir una canción o cambiar su enlace
`script.js` → `const CANCIONES = [`. Copia un bloque con `titulo`, `contexto`, `color`. Los enlaces de YouTube y Spotify se generan buscando `Persona 5 Royal + titulo`. Para reproducir audio propio: copia el archivo a `assets/audio/` y pon `audio:"assets/audio/last-surprise.mp3"`; aparecerá el botón *Reproducir*. Sin `audio` no hay botón (no hay botones falsos).

## 9. Modificar la paleta de colores
`styles.css` → bloque `:root` al principio. Cambia `--rojo` (rojo principal; ej. `#c00010`), `--negro`, `--carbon`, `--velvet` (azul de Personas). Guarda y recarga: cambia en toda la web.

## 10. Cambiar fuente o tamaño de títulos
- Fuentes: variables `--f-titulo`, `--f-ui`, `--f-texto` en `:root`. Si usas otra de Google Fonts, cambia también el enlace `<link href="https://fonts.googleapis.com/...">` en `index.html`.
- Tamaños: `.sec-head h2{font:clamp(2rem,5vw,4rem)...}` (títulos de sección) y `.hero__title{font:clamp(4rem,14vw,12rem)...}` (portada).

## 11. Añadir una sección nueva
1. `index.html`: antes de `</main>` pega:
```html
<section id="confidants" class="sec">
  <div class="wrap">
    <header class="sec-head reveal"><span class="sec-head__n">06</span><h2>Confidants</h2></header>
    <p>Contenido…</p>
  </div>
</section>
```
2. En `<nav id="navLinks">` añade `<a href="#confidants" data-nav><i>06</i>Confidants</a>`. El `href` debe coincidir con el `id`. El indicador de sección activa funciona solo.

## 12. Cambiar el orden de las secciones
En `index.html`, mueve el bloque `<section>` completo (comentarios incluidos) y reordena las líneas del `<nav>` igual. Si usas `sec--dark`, alterna fondos para que no se junten.

## 13. Modificar las animaciones
`styles.css`: velocidad general `--t:.3s` en `:root`; cinta de la portada `animation:cinta 40s` (más segundos = más lenta); flotación de la tarjeta `flotar 5s`; cortina roja: `AJUSTES.duracionTransicion` en `script.js`. Si el sistema pide «reducir movimiento», se desactivan solas.

## 14. Imágenes que no cargan
Comprueba: (1) la ruta empieza por `assets/` y está entre comillas; (2) el nombre coincide con mayúsculas/minúsculas y extensión; (3) el archivo está en esa carpeta; (4) `F12` → Consola: `[Wiki] Imagen no encontrada: ...` indica la ruta exacta. Mientras tanto se ve un retrato generado.

## 15. Errores frecuentes de JavaScript
- *Unexpected token / Unexpected identifier:* falta una coma `,` entre objetos o una comilla sin cerrar. Mira la línea indicada en la consola.
- Si toda la web de datos desaparece, un error de sintaxis detuvo `script.js`: revisa el último bloque que editaste.
- `[Wiki] ... falta el campo "..."`: rellena ese campo obligatorio.
- Un `arcano` mal escrito (ej. `"fool"`) no aparece en filtros: usa exactamente las claves de `ARCANOS`.

## 16. Comprobar que los cambios se guardaron
El nombre del archivo en la pestaña de VS Code no debe tener un punto ● (sin guardar). Recarga con `Ctrl + F5`. Si sigue igual, confirma que editas la carpeta que abre el navegador.
