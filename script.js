"use strict";
/* =====================================================================
   PERSONA 5 ROYAL WIKI · script.js
   1 Ajustes · 2 Arcanos · 3 DATOS (aquí añades contenido) · 4 Utilidades
   5 Catálogos · 6 Modal · 7 Palacios · 8 Música · 9 Interfaz general
   ===================================================================== */

/* ===== 1. AJUSTES ===== */
const AJUSTES = { duracionTransicion: 600 }; // milisegundos de la cortina roja

/* ===== 2. ARCANOS (nombre en español y número romano) ===== */
const ARCANOS = {
  Fool:{es:"El Loco",n:"0"}, Magician:{es:"El Mago",n:"I"}, Priestess:{es:"La Sacerdotisa",n:"II"},
  Empress:{es:"La Emperatriz",n:"III"}, Emperor:{es:"El Emperador",n:"IV"}, Lovers:{es:"Los Enamorados",n:"VI"},
  Chariot:{es:"El Carro",n:"VII"}, Justice:{es:"La Justicia",n:"VIII"}, Hermit:{es:"El Ermitaño",n:"IX"}, Faith:{es:"La Fe",n:"—"}
};

/* ===== 3. DATOS =====
   Para añadir algo: copia un bloque { ... }, pega debajo (con coma) y cambia los datos.
   OBLIGATORIOS: id, codigo, real, arcano, persona, personalidad, rol.
   OPCIONALES: alias, edad, color, estilo, spoiler, imagen (ruta en assets/), alt. */
const PERSONAJES = [
  { id:"joker", codigo:"Joker", real:"Ren Amamiya", edad:"16–17", arcano:"Fool", color:"#e60012", persona:"Arsène",
    personalidad:"Callado, observador y astuto: una rebeldía serena.",
    rol:"Líder de los Phantom Thieves y el único capaz de usar varias Personas (Wild Card).", estilo:"Cambia de Persona según la situación.", imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkcW1DL0VQ0RUcP4yDOflu7Yv0cYWdb8vO2xBZRZlPMrwKzSGuqdTOZUqb&s=10" },
  { id:"skull", codigo:"Skull", real:"Ryuji Sakamoto", edad:"16", arcano:"Chariot", color:"#f2c200", persona:"Captain Kidd",
    personalidad:"Impulsivo, leal y de lengua rápida.", rol:"Primer aliado de Joker en Shujin; antiguo atleta de atletismo.", estilo:"Magia eléctrica y golpes contundentes.", imagen:"https://i.pinimg.com/736x/a3/e2/af/a3e2af9569c87be61cebb76d20a512f7.jpg" },
  { id:"panther", codigo:"Panther", real:"Ann Takamaki", edad:"16–17", arcano:"Lovers", color:"#e8336d", persona:"Carmen",
    personalidad:"Sincera, carismática y valiente; trabaja como modelo.", rol:"Se une al equipo en el primer Palacio.", estilo:"Magia de fuego.", imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_GhBfck8NC-ofMcomCH1UwCdS0YaXuOWaKP0indd0Lg_jC7g_VqKAmHb6&s=10" },
  { id:"mona", codigo:"Mona", real:"Morgana", arcano:"Magician", color:"#3b82f6", persona:"Zorro",
    personalidad:"Orgulloso y presumido; afirma ser humano.", rol:"Guía del Metaverso y gran conocedor de los Palacios; parece un gato.", estilo:"Magia de viento y curación.", imagen:"https://i.pinimg.com/736x/aa/8e/f2/aa8ef23013b2124b0bc6bb5e68ef0868.jpg" },
  { id:"fox", codigo:"Fox", real:"Yusuke Kitagawa", edad:"16–17", arcano:"Emperor", color:"#38bdf8", persona:"Goemon",
    personalidad:"Excéntrico, directo y entregado al arte.", rol:"Estudiante de arte de Kosei; aporta criterio estético y valor.", estilo:"Magia de hielo; katana.", imagen:"https://i.pinimg.com/736x/3f/c4/0c/3fc40c840baa19165e1a3d759e7be339.jpg" },
  { id:"queen", codigo:"Queen", real:"Makoto Niijima", edad:"17–18", arcano:"Priestess", color:"#d1d5db", persona:"Johanna",
    personalidad:"Analítica, disciplinada y responsable; preside el consejo estudiantil.", rol:"Estratega del equipo; su hermana mayor es fiscal.", estilo:"Magia nuclear.", imagen:"https://i.pinimg.com/474x/88/f1/97/88f1976bfc3f2b09a9f80b9d49ee4caa.jpg" },
  { id:"navi", codigo:"Navi", real:"Futaba Sakura", alias:"Oracle en la versión inglesa", arcano:"Hermit", color:"#fb923c", persona:"Necronomicon",
    personalidad:"Genio informático, ingeniosa y muy reservada.", rol:"Apoyo y análisis desde la Nav; no combate en primera línea.", estilo:"Apoyo y análisis.",
    spoiler:"Su pasado y su relación con Sojiro Sakura son el centro de su arco; su Palacio es una pirámide.", imagen:"https://i.pinimg.com/736x/45/ce/97/45ce97b4c9205e12363b22e7d6d4db92.jpg" },
  { id:"noir", codigo:"Noir", real:"Haru Okumura", arcano:"Empress", color:"#f472b6", persona:"Milady",
    personalidad:"Amable y serena, con determinación firme; le encanta la jardinería.", rol:"Estudiante de último año e hija del presidente de Okumura Foods.", estilo:"Combate con hacha.",
    spoiler:"Su llegada al equipo está ligada al Palacio de su propio padre.", imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-DzVntcwU75_j1aekjNBATmwj12k--t_kP1x-7FLz0pW6xpWHtIMkbfv5&s=10" },
  { id:"crow", codigo:"Crow", real:"Goro Akechi", edad:"17–18", arcano:"Justice", color:"#991b1b", persona:"Robin Hood",
    personalidad:"Educado y brillante; los medios lo llaman el «Príncipe Detective».", rol:"Detective estudiante que investiga el caso de los Phantom Thieves.", estilo:"Espada láser y pistola de rayos.",
    spoiler:"Su verdadero papel y su segunda Persona, Loki, forman uno de los grandes giros; en Royal gana más protagonismo.", imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIsig7rc7A0uMFfJUSyA9q8_fbzGO5hwOFRu7HtMQ9OLsI71RGJmQr4U&s=10" },
  { id:"violet", codigo:"Violet", real:"Kasumi Yoshizawa", edad:"15–16", arcano:"Faith", color:"#a78bfa", persona:"Cendrillon",
    personalidad:"Optimista, esforzada y cálida; practica gimnasia rítmica.", rol:"Estudiante transferida; personaje nuevo de Royal.", estilo:"Estoque y pistola; magia sagrada.",
    spoiler:"Su historia es uno de los mayores secretos de Royal.", imagen:"https://i.pinimg.com/236x/01/c2/c1/01c2c18e54669066089149cb2f0380a6.jpg" }
];

/* Persona: usuario = id de un personaje. oculta:true → nombre oculto hasta activar spoilers. */
const PERSONAS = [
  { id:"arsene", nombre:"Arsène", usuario:"joker", arcano:"Fool", color:"#e60012",
    identidad:"Arsène Lupin, el ladrón caballero creado por Maurice Leblanc.",
    simbolismo:"El Loco es el comienzo sin ataduras: encaja con un protagonista capaz de cambiar de Persona. Un ladrón elegante que desafía el orden.", imagen:"https://i.pinimg.com/474x/94/59/c2/9459c21355773a1ada7f4c17b847e4af.jpg" },
  { id:"kidd", nombre:"Captain Kidd", usuario:"skull", arcano:"Chariot", color:"#f2c200", 
    identidad:"William Kidd, corsario escocés del siglo XVII ejecutado como pirata.",
    simbolismo:"El Carro es empuje y avance; refleja el ímpetu y la rebeldía directa de Ryuji.", imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdAzFMtz3pV2WD6mUUAEMkGLOlCm9PubEp5_HEitQu1IKcGHXxZvBOd6w&s=10" },
  { id:"carmen", nombre:"Carmen", usuario:"panther", arcano:"Lovers", color:"#e8336d",
    identidad:"La heroína libre y apasionada de la ópera Carmen, de Bizet.",
    simbolismo:"Los Enamorados hablan de vínculos y pasión; Carmen encarna la libertad de elegir.", imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIIvprzb7d2mhl5fQrnVuLG0cZuFSg7TmWIFomNlupztZqHrEWYOhYXtul&s=10" },
  { id:"zorro", nombre:"Zorro", usuario:"mona", arcano:"Magician", color:"#3b82f6",
    identidad:"El justiciero enmascarado de la ficción popular.",
    simbolismo:"El Mago es ingenio y destreza: Morgana, guía y ladrón de corazones con aire de héroe.", imagen:"https://i.pinimg.com/474x/88/3a/bd/883abd95a28a4dfb3c98c3216a5c279b.jpg" },
  { id:"goemon", nombre:"Goemon", usuario:"fox", arcano:"Emperor", color:"#38bdf8", 
    identidad:"Ishikawa Goemon, legendario bandido japonés que robaba a los poderosos.",
    simbolismo:"El Emperador es autoridad y disciplina; Goemon une tradición japonesa y rebeldía, como el arte de Yusuke.", imagen:"https://static0.hardcoregamerimages.com/wordpress/wp-content/uploads/2025/07/goemon-persona-in-persona-5-the-phantom-x.jpg?q=49&fit=crop&w=825&dpr=2" },
  { id:"johanna", nombre:"Johanna", usuario:"queen", arcano:"Priestess", color:"#d1d5db",
    identidad:"Inspirada en la leyenda de la Papisa Juana.",
    simbolismo:"La Sacerdotisa es conocimiento e intuición, el equilibrio entre norma y verdad que busca Makoto.", imagen:"https://cdna.artstation.com/p/assets/images/images/023/919/542/large/adam-boucherba-johanna-render-1.jpg?1580765079"},
  { id:"necro", nombre:"Necronomicon", usuario:"navi", arcano:"Hermit", color:"#fb923c",
    identidad:"El grimorio ficticio del universo de H. P. Lovecraft.",
    simbolismo:"El Ermitaño es saber y aislamiento: un libro de conocimiento prohibido.", imagen:"https://static0.hardcoregamerimages.com/wordpress/wp-content/uploads/2025/11/necronomicon-persona-in-persona-5-the-phantom-x.jpg?q=49&fit=crop&w=825&dpr=2"},
  { id:"milady", nombre:"Milady", usuario:"noir", arcano:"Empress", color:"#f472b6",
    identidad:"Milady de Winter, de Los tres mosqueteros, de Alexandre Dumas.",
    simbolismo:"La Emperatriz es fuerza femenina y abundancia; Milady, un carácter indomable.", imagen:"https://www.siliconera.com/wp-content/uploads/2016/05/Persona5Artwork3.jpg" },
  { id:"robin", nombre:"Robin Hood", usuario:"crow", arcano:"Justice", color:"#991b1b",
    identidad:"El forajido de la leyenda inglesa que robaba a los ricos.",
    simbolismo:"La Justicia es equilibrio y deber: un «héroe de la justicia» acorde con la imagen pública de Crow.", imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSb-BAMENdocnwf1V2iRe_EhCuNrpgJNVPIGTATv_lqQ&s=10" },
  { id:"loki", nombre:"Loki", usuario:"crow", arcano:"Justice", color:"#991b1b", oculta:true,
    identidad:"El dios tramposo de la mitología nórdica.",
    simbolismo:"Segunda forma de la Persona de Crow, ligada a lo que oculta su historia.", imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFZ0sfxPIrPMXGn8R6vrM-49V_gI--I1A-v2ntpRiMaSMOpq8XcbapJ0JH&s=10"},
  { id:"cendrillon", nombre:"Cendrillon", usuario:"violet", arcano:"Faith", color:"#a78bfa",
    identidad:"Cenicienta en su versión de la ópera francesa Cendrillon.",
    simbolismo:"La Fe es esperanza y entrega; un cuento de transformación para una chica que persigue un sueño.", imagen:"https://pbs.twimg.com/media/GWu_eOkWcAEOwfe?format=webp&name=large" }
];

/* Palacio: ocultar = "nada" | "detalles" (spoiler en recuadro) | "todo" (nombre oculto). arte = clave de ARTE_PALACIOS. */
const PALACIOS = [
  { numero:1, nombre:"Kamoshida", titulo:"Castillo de la lujuria", responsable:"Suguru Kamoshida, profesor y entrenador de voleibol de Shujin", tema:"Lujuria", color:"#e60012", arte:"castillo", ocultar:"nada",
    ambiente:"Un castillo europeo donde él se ve como rey y los alumnos como súbditos.", objetivo:"Robar su Tesoro para detener sus abusos.", imagen: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/03/persona-5-kamoshida-castle.jpg?w=1600&h=900&fit=crop" },
  { numero:2, nombre:"Madarame", titulo:"Museo de la vanidad", responsable:"Ichiryusai Madarame, artista célebre y mentor de Yusuke", tema:"Vanidad", color:"#38bdf8", arte:"museo", ocultar:"detalles",
    ambiente:"Una galería enorme dedicada a su propio ego.", objetivo:"Destapar lo que se esconde tras su fama.", spoiler:"Su prestigio se apoya en obras que no le pertenecen.", imagen: "https://i.redd.it/l0so11p45l2e1.jpeg" },
  { numero:3, nombre:"Kaneshiro", titulo:"Banco de la gula", responsable:"Junya Kaneshiro, criminal que explota a estudiantes", tema:"Gula", color:"#f2c200", arte:"banco", ocultar:"nada",
    ambiente:"Un banco gigantesco donde las personas son dinero.", objetivo:"Obligarlo a confesar sus abusos." , imagen: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/03/persona-5-royal-kaneshiro-palace.jpg?w=1600&h=900&fit=crop"},
  { numero:4, nombre:"Futaba", titulo:"Pirámide de la ira", responsable:"Futaba Sakura", tema:"Ira", color:"#fb923c", arte:"piramide", ocultar:"detalles",
    ambiente:"Una pirámide enorme nacida del rencor.", objetivo:"Ayudarla a enfrentarse a sí misma.", spoiler:"El rencor de este Palacio se dirige sobre todo contra ella misma.", imagen: "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2020/04/persona-5-futabas-pyramid-e1588132138526.jpg" },
  { numero:5, nombre:"Okumura", titulo:"Base espacial de la codicia", responsable:"Kunikazu Okumura, ejecutivo de Okumura Foods", tema:"Codicia", color:"#f472b6", arte:"espacio", ocultar:"nada",
    ambiente:"Una estación espacial que simula una empresa sin límites.", objetivo:"Frenar su explotación laboral.", imagen:"https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/03/persona-5-royal-okumura-palace.jpg"},
  { numero:6, nombre:"Sae Niijima", titulo:"Casino de la envidia", responsable:"Sae Niijima, fiscal y hermana de Makoto", tema:"Envidia", color:"#d1d5db", arte:"casino", ocultar:"detalles",
    ambiente:"Un casino ruidoso donde todo es una apuesta.", objetivo:"Hacerle ver la verdad del caso.", spoiler:"Aquí la historia da un giro importante sobre quién maneja los hilos.", imagen: "https://i.ytimg.com/vi/thpkak5utLk/mqdefault.jpg" },
  { numero:7, nombre:"Shido", titulo:"Crucero del orgullo", responsable:"Masayoshi Shido, político con aspiraciones nacionales", tema:"Orgullo", color:"#991b1b", arte:"barco", ocultar:"detalles",
    ambiente:"Un crucero de lujo lleno de invitados distinguidos.", objetivo:"Alcanzar la meta final del primer gran arco.", spoiler:"Es el objetivo que da sentido a casi todo el año del juego.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx9loHK5ZdnnaMtf4GrozN8PCdo8ZmKbGE3sN17vLEXg&s=10" },
  { numero:8, nombre:"Mementos", titulo:"El Palacio de todos", responsable:"El subconsciente colectivo de la gente", tema:"Deformación colectiva", color:"#a78bfa", arte:"tunel", ocultar:"nada",
    ambiente:"Una red de túneles accesible desde el mundo real con la Nav.", objetivo:"Resolver peticiones de gente corriente y reunir recursos.", imagen: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/04/persona-5-royal-mementos-depths.jpg?w=1600&h=900&fit=crop"},
  { numero:9, nombre:"Profundidades de Mementos", titulo:"Prisión de la pereza", responsable:"Información oculta", tema:"Pereza", color:"#94a3b8", arte:"tunel", ocultar:"todo",
    ambiente:"El fondo de Mementos, donde se concentra la apatía.", objetivo:"Enfrentarse a lo que sostiene la apatía colectiva.", imagen: "" },
  { numero:10, nombre:"Maruki", titulo:"Centro de la melancolía", responsable:"Takuto Maruki", tema:"Melancolía", color:"#4ade80", arte:"laboratorio", ocultar:"todo",
    ambiente:"Un laboratorio inmaculado; el Palacio nuevo de Royal.", objetivo:"Decidir qué hacer con una realidad que parece perfecta.", imagen:"https://64.media.tumblr.com/48f23985643b3820318c44a3135022cf/3cab951d4bda1a20-5e/s1280x1920/31447e0ad5da5d0053cc5840d7f116587c711d1e.png" }
];

/* Canción: audio = ruta local opcional (ej. "assets/audio/last-surprise.mp3"). Si está vacío, solo enlaces. */
const CANCIONES = [
  { titulo:"Last Surprise", contexto:"El tema de combate más reconocible del juego, presente en las batallas del Metaverso.", color:"#e60012", audio:"" },
  { titulo:"Life Will Change", contexto:"Tema principal de Persona 5; acompaña la energía de las infiltraciones en los Palacios.", color:"#f2c200", audio:"" },
  { titulo:"i belive", contexto:"Tema del descenlance final", color:"#38bdf8", audio:"" },
  { titulo:"Beneath the Mask", contexto:"Tema jazz y melancólico; su versión «rain» acompaña momentos tranquilos del juego.", color:"#a78bfa", audio:"" },
  { titulo:"Take Over", contexto:"Tema vocal de combate añadido en Royal.", color:"#f472b6", audio:"" }
];

/* Dibujos de los Palacios (trazos SVG). Cámbialos o usa el campo "imagen". */
const ARTE_PALACIOS = {
  castillo:'<path d="M30 100V55h12v-9h10v9h10V30h36v25h10v-9h10v9h12v45z"/><path d="M85 100V80a15 15 0 0 1 30 0v20"/>',
  museo:'<path d="M25 45 100 15l75 30z"/><path d="M40 55v40M70 55v40M100 55v40M130 55v40M160 55v40M25 100h150"/>',
  banco:'<circle cx="100" cy="58" r="38"/><circle cx="100" cy="58" r="20"/><path d="M100 38v40M80 58h40M30 100h140"/>',
  piramide:'<path d="M20 100 100 15l80 85z"/><path d="M70 100l30-40 30 40"/><circle cx="100" cy="82" r="6"/>',
  espacio:'<circle cx="100" cy="55" r="28"/><ellipse cx="100" cy="55" rx="62" ry="12"/><path d="M30 20h2M170 25h2M160 90h2M40 85h2"/>',
  casino:'<path d="M100 15 160 55 100 95 40 55z"/><path d="M100 35l30 20-30 20-30-20z"/><circle cx="100" cy="55" r="5"/>',
  barco:'<path d="M20 70h160l-25 28H45z"/><path d="M60 70V45h80v25M85 45V28h30v17"/><path d="M10 105q20-8 40 0t40 0 40 0 40 0"/>',
  tunel:'<path d="M30 100V60a70 45 0 0 1 140 0v40"/><path d="M55 100V68a45 30 0 0 1 90 0v32"/><path d="M80 100V76a20 15 0 0 1 40 0v24"/>',
  laboratorio:'<path d="M100 15l35 20v40l-35 20-35-20V35z"/><path d="M100 40l15 9v18l-15 9-15-9V49z"/><path d="M135 35l30-10M65 35 35 25M100 95v15"/>'
};

/* ===== 4. UTILIDADES ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm = t => String(t ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const spoilersOn = () => document.body.classList.contains("spoilers-on");
const reducirMov = matchMedia("(prefers-reduced-motion: reduce)").matches;
const spoiler = html => `<div class="spoiler" role="button" tabindex="0" aria-label="Spoiler: pulsa para mostrar"><span class="spoiler__tag">SPOILER</span><div class="spoiler__body">${html}</div></div>`;
const fila = (et, v) => v ? `<div><dt>${esc(et)}</dt><dd>${v}</dd></div>` : "";
const arc = k => ARCANOS[k] || { es: k || "", n: "" };

/* Avisa en la consola (F12) si falta un campo obligatorio */
function validar(nombre, lista, req) {
  lista.forEach((it, i) => req.forEach(c => { if (!it[c]) console.warn(`[Wiki] ${nombre} nº${i + 1} (${it.id || it.nombre || it.titulo || "sin id"}): falta el campo "${c}".`); }));
}

/* Retrato: dibujo generado + imagen real encima (si existe y carga) */
function retrato(it, extra = "") {
  const nom = it.codigo || it.nombre || "?";
  const img = it.imagen ? `<img src="${esc(it.imagen)}" alt="${esc(it.alt || "Imagen de " + nom)}" loading="lazy" data-fb>` : "";
  return `<div class="retrato ${extra}" style="--acento:${esc(it.color || "#e60012")}"><div class="retrato__gen"><b>${esc(nom.trim()[0])}</b><i>${esc(nom)}</i></div>${img}</div>`;
}
document.addEventListener("error", e => {
  if (e.target.matches && e.target.matches("img[data-fb]")) { console.warn("[Wiki] Imagen no encontrada:", e.target.getAttribute("src")); e.target.remove(); }
}, true);

/* ===== 5. CATÁLOGOS (búsqueda + filtros + tarjetas + ficha) ===== */
function catalogo(c) {
  const grid = $(`#${c.id}Grid`), q = $(`#${c.id}Buscar`), chips = $(`#${c.id}Chips`), vacio = $(`#${c.id}Vacio`), cuenta = $(`#${c.id}Cuenta`);
  let filtro = "todos", visibles = [];
  const usados = Object.keys(ARCANOS).filter(k => c.lista.some(it => it.arcano === k));
  chips.innerHTML = [["todos", "Todos"], ...usados.map(k => [k, ARCANOS[k].es])]
    .map(([k, t]) => `<button type="button" class="chip" data-arc="${k}" aria-pressed="${k === "todos"}">${esc(t)}</button>`).join("");
  function pintar() {
    const t = norm(q.value.trim());
    visibles = c.lista.filter(it => (filtro === "todos" || it.arcano === filtro) && (!t || norm(c.busca(it)).includes(t)));
    grid.innerHTML = visibles.map(c.tarjeta).join("");
    vacio.hidden = visibles.length > 0;
    cuenta.textContent = `${visibles.length} de ${c.lista.length}`;
  }
  q.addEventListener("input", pintar);
  chips.addEventListener("click", e => {
    const b = e.target.closest("[data-arc]"); if (!b) return;
    filtro = b.dataset.arc; $$(".chip", chips).forEach(x => x.setAttribute("aria-pressed", x === b)); pintar();
  });
  grid.addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) abrirModal(visibles, +b.dataset.i, c.detalle); });
  $(`[data-reset="${c.id}"]`).addEventListener("click", () => { q.value = ""; filtro = "todos"; $$(".chip", chips).forEach((x, i) => x.setAttribute("aria-pressed", i === 0)); pintar(); });
  document.addEventListener("spoilers", pintar);
  pintar();
}

const tarjetaPersonaje = (p, i) => `<button type="button" class="card reveal vis" data-i="${i}" style="--acento:${esc(p.color || "#e60012")}" aria-label="${esc(p.codigo)}, ${esc(p.real)}">
  <span class="card__n">${String(i + 1).padStart(2, "0")}</span>${retrato(p)}
  <span class="card__label"><b>${esc(p.codigo)}</b><span>${esc(p.real)}</span></span></button>`;

const detallePersonaje = p => `<div class="det">${retrato(p)}<div class="det__info">
  <p class="tag">${esc(arc(p.arcano).n)} · ${esc(arc(p.arcano).es)}</p><h3 id="modalTitle">${esc(p.codigo)}</h3>
  <p class="det__real">${esc(p.real)}${p.alias ? ` <small>(${esc(p.alias)})</small>` : ""}</p>
  <dl>${fila("Edad durante la historia", esc(p.edad))}${fila("Personalidad", esc(p.personalidad))}${fila("Papel en el equipo", esc(p.rol))}
  ${fila("Persona inicial", esc(p.persona))}${fila("Estilo de combate", esc(p.estilo))}</dl>${p.spoiler ? spoiler(esc(p.spoiler)) : ""}</div></div>`;

const usuario = id => PERSONAJES.find(x => x.id === id);
const tarjetaPersona = (p, i) => {
  const oc = p.oculta && !spoilersOn(), u = usuario(p.usuario);
  return `<button type="button" class="tarot reveal vis" data-i="${i}" style="--acento:${esc(p.color || "#3b73ff")}" aria-label="${oc ? "Persona oculta (spoiler)" : esc(p.nombre)}">
  <span class="tarot__num">${esc(arc(p.arcano).n)}</span>${retrato({ nombre: oc ? "?" : p.nombre, color: p.color, imagen: oc ? "" : p.imagen })}
  <span class="tarot__name">${oc ? "???" : esc(p.nombre)}</span><span class="tarot__user">${esc(u ? u.codigo : "")}</span></button>`;
};
const detallePersona = p => {
  const u = usuario(p.usuario);
  const cuerpo = `<dl>${fila("Usuario", esc(u ? `${u.codigo} — ${u.real}` : ""))}${fila("Identidad", esc(p.identidad))}${fila("Simbolismo", esc(p.simbolismo))}</dl>`;
  return `<div class="det">${retrato({ nombre: p.nombre, color: p.color, imagen: p.imagen })}<div class="det__info">
  <p class="tag">${esc(arc(p.arcano).n)} · ${esc(arc(p.arcano).es)}</p><h3 id="modalTitle">${p.oculta && !spoilersOn() ? "???" : esc(p.nombre)}</h3>
  ${p.oculta && !spoilersOn() ? spoiler(`<strong>${esc(p.nombre)}</strong>${cuerpo}`) : cuerpo}</div></div>`;
};

/* ===== 6. MODAL ===== */
const modal = $("#modal"), cuerpoModal = $("#modalBody");
let M = { items: [], i: 0, det: null, foco: null };
function mostrarModal() { cuerpoModal.innerHTML = M.det(M.items[M.i]); $("#modalPos").textContent = `${M.i + 1} / ${M.items.length}`; }
function abrirModal(items, i, det) { M = { items, i, det, foco: document.activeElement }; mostrarModal(); if (!modal.open) modal.showModal(); }
function pasoModal(d) { M.i = (M.i + d + M.items.length) % M.items.length; mostrarModal(); }
modal.addEventListener("click", e => {
  if (e.target === modal || e.target.closest("[data-close]")) modal.close();
  const s = e.target.closest("[data-step]"); if (s) pasoModal(+s.dataset.step);
});
modal.addEventListener("keydown", e => { if (e.key === "ArrowLeft") pasoModal(-1); if (e.key === "ArrowRight") pasoModal(1); });
modal.addEventListener("close", () => M.foco && M.foco.focus());

/* ===== 7. PALACIOS ===== */
function palacios() {
  const lista = $("#palaciosLista"), panel = $("#palaciosPanel"); let sel = 0;
  const oculto = p => p.ocultar === "todo" && !spoilersOn();
  function pintar() {
    lista.innerHTML = PALACIOS.map((p, i) => `<button type="button" class="pal-btn" data-i="${i}" aria-current="${i === sel}" style="--acento:${esc(p.color)}"><b>${String(p.numero).padStart(2, "0")}</b><span>${oculto(p) ? "ÁREA CLASIFICADA" : esc(p.nombre)}</span></button>`).join("");
    const p = PALACIOS[sel];
    const datos = `<dl class="facts">${fila("Responsable", esc(p.responsable))}${fila("Ambiente", esc(p.ambiente))}${fila("Objetivo de los Thieves", esc(p.objetivo))}</dl>${p.ocultar === "detalles" && p.spoiler ? spoiler(esc(p.spoiler)) : ""}`;
    panel.style.setProperty("--acento", p.color);
    panel.innerHTML = `<div class="pal__art"><svg viewBox="0 0 200 110" aria-hidden="true">${ARTE_PALACIOS[p.arte] || ARTE_PALACIOS.tunel}</svg>${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.alt || "Imagen del Palacio de " + p.nombre)}" loading="lazy" data-fb>` : ""}<span class="pal__big" aria-hidden="true">${String(p.numero).padStart(2, "0")}</span></div>
    <div class="pal__body"><p class="tag">Expediente nº ${String(p.numero).padStart(2, "0")}</p>
    <h3>${oculto(p) ? "Área clasificada" : esc(p.titulo)}</h3>${oculto(p) ? "" : `<span class="pal__sin">${esc(p.tema)}</span>`}
    ${oculto(p) ? spoiler(`<strong>${esc(p.titulo)}</strong> · ${esc(p.tema)}${datos}`) : datos}</div>`;
  }
  lista.addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) { sel = +b.dataset.i; pintar(); $(`[data-i="${sel}"]`, lista).focus(); } });
  document.addEventListener("spoilers", pintar);
  pintar();
}

/* ===== 8. MÚSICA ===== */
function canciones() {
  const g = $("#cancionesGrid"), audio = new Audio(); let actual = null;
  const enlace = (u, t) => `<a class="btn btn--ghost" href="${u}" target="_blank" rel="noopener noreferrer">${t}<svg class="ico"><use href="#i-ext"/></svg></a>`;
  g.innerHTML = CANCIONES.map((c, i) => {
    const q = encodeURIComponent("Persona 5 Royal " + c.titulo);
    return `<article class="track reveal vis" style="--acento:${esc(c.color)}"><span class="track__n" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
    <h3>${esc(c.titulo)}</h3><p>${esc(c.contexto)}</p>
    <div class="track__act">${c.audio ? `<button class="btn btn--red" data-play="${i}" aria-pressed="false"><svg class="ico"><use href="#i-play"/></svg><span>Reproducir</span></button>` : ""}
    ${enlace(c.youtube || ("https://www.youtube.com/results?search_query=" + q), "YouTube")}${enlace("https://open.spotify.com/search/" + q, "Spotify")}
    <span class="eq" aria-hidden="true"><i></i><i></i><i></i></span></div><p class="track__msg" role="status"></p></article>`;
  }).join("");
  const msg = (i, t) => { const n = $$(".track__msg", g)[i]; if (n) n.textContent = t; };
  function sync() {
    $$(".track", g).forEach((t, i) => {
      const on = i === actual && !audio.paused; t.classList.toggle("playing", on);
      const b = $("[data-play]", t); if (b) { b.setAttribute("aria-pressed", on); $("span", b).textContent = on ? "Pausar" : "Reproducir"; }
    });
  }
  g.addEventListener("click", e => {
    const b = e.target.closest("[data-play]"); if (!b) return; const i = +b.dataset.play;
    if (actual === i && !audio.paused) { audio.pause(); return; }
    if (actual !== i) { audio.src = CANCIONES[i].audio; actual = i; }
    msg(i, ""); audio.play().catch(() => msg(i, "No se pudo reproducir: revisa la ruta «audio» de esta canción."));
  });
  ["play", "pause", "ended"].forEach(ev => audio.addEventListener(ev, sync));
  audio.addEventListener("error", () => { if (actual !== null) msg(actual, "No se encontró el archivo de audio. Revisa la ruta en CANCIONES."); });
}

/* ===== 9. INTERFAZ GENERAL ===== */
function interfaz() {
  const tg = $("#spoilerToggle");
  tg.addEventListener("click", () => {
    const on = document.body.classList.toggle("spoilers-on");
    tg.setAttribute("aria-pressed", on); $("span", tg).textContent = on ? "Spoilers: SÍ" : "Spoilers: NO";
    document.dispatchEvent(new Event("spoilers"));
  });
  const revelar = e => { const s = e.target.closest(".spoiler"); if (s) s.classList.add("revealed"); };
  document.addEventListener("click", revelar);
  document.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { const s = e.target.closest && e.target.closest(".spoiler"); if (s) { e.preventDefault(); s.classList.add("revealed"); } } });

  const menu = $("#menuToggle");
  const cerrarMenu = () => { document.body.classList.remove("menu-open"); menu.setAttribute("aria-expanded", "false"); };
  menu.addEventListener("click", () => { const a = document.body.classList.toggle("menu-open"); menu.setAttribute("aria-expanded", a); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarMenu(); });

  const wipe = $("#wipe");
  $$("a[data-nav]").forEach(a => a.addEventListener("click", e => {
    const dest = $(a.getAttribute("href")); if (!dest) return;
    e.preventDefault(); cerrarMenu();
    const ir = () => { dest.scrollIntoView({ behavior: "instant" }); history.replaceState(null, "", a.getAttribute("href")); };
    if (reducirMov) return ir();
    wipe.className = "wipe on";
    setTimeout(() => { ir(); wipe.className = "wipe off"; setTimeout(() => (wipe.className = "wipe"), AJUSTES.duracionTransicion / 2); }, AJUSTES.duracionTransicion / 2);
  }));

  const enlaces = $$("#navLinks a");
  const obs = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) enlaces.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => obs.observe(s));

  const top = $("#toTop");
  addEventListener("scroll", () => top.classList.toggle("show", scrollY > 600), { passive: true });
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: reducirMov ? "auto" : "smooth" }));

  const rev = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("vis"); rev.unobserve(en.target); } }), { threshold: .12 });
  $$(".reveal:not(.vis)").forEach(el => reducirMov ? el.classList.add("vis") : rev.observe(el));
}

/* ===== ARRANQUE ===== */
validar("PERSONAJES", PERSONAJES, ["id", "codigo", "real", "arcano", "persona", "personalidad", "rol"]);
validar("PERSONAS", PERSONAS, ["id", "nombre", "usuario", "arcano"]);
validar("PALACIOS", PALACIOS, ["numero", "nombre", "titulo", "tema", "color"]);
validar("CANCIONES", CANCIONES, ["titulo", "contexto"]);
catalogo({ id: "personajes", lista: PERSONAJES, busca: p => `${p.codigo} ${p.real} ${p.alias || ""} ${p.persona}`, tarjeta: tarjetaPersonaje, detalle: detallePersonaje });
catalogo({ id: "personas", lista: PERSONAS, busca: p => `${p.nombre} ${usuario(p.usuario)?.codigo || ""} ${usuario(p.usuario)?.real || ""}`, tarjeta: tarjetaPersona, detalle: detallePersona });
palacios(); canciones(); interfaz();
