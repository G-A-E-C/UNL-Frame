/* =========================================================
   NAVBAR FIJO
   - Ajusta --header-h con la altura real del header.
   - Agrega sombra cuando haces scroll.
   ========================================================= */
(function () {
  const root = document.documentElement;
  const header = document.querySelector('.header');
  if (!header) return;

  function setHeaderHeight() {
    const h = header.offsetHeight || 80;
    root.style.setProperty('--header-h', h + 'px'); // el CSS usa esta variable
  }

  function onScroll() {
    if (window.scrollY > 4) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }

  // Inicializa y re-calcula por si las fuentes cambian el alto
  setHeaderHeight();
  window.addEventListener('load', setHeaderHeight);
  window.addEventListener('resize', setHeaderHeight);
  window.addEventListener('scroll', onScroll, { passive: true });
  setTimeout(setHeaderHeight, 200);
  setTimeout(setHeaderHeight, 800);
})();

/* =========================================================
   SECCIÓN 3 — ÁMBITOS (Tabs izquierda + grilla 2×2)
   - Solo título (sin “Ver más”).
   - Orden fijo: Título | Imagen (el CSS lo respalda).
   ========================================================= */
(function () {
  const grid = document.getElementById('ambitosGrid');
  const btns = document.querySelectorAll('.vincu-tabs__btn');
  if (!grid || !btns.length) return;

  // Imágenes de demo
  const IMG1 = './assets/imgVinculacion/c1.png';
  const IMG  = './assets/imgVinculacion/2seccion.png';

  // 4 ítems por pestaña (texto + imagen)
  const DATA = {
    divulgacion: [
      {
        title: 'UNL Investiga',
        img: IMG1,
        style:
          'background-size:70% auto; background-repeat:no-repeat; background-position:center; background-color:#fff'
      },
      { title: 'Visitas Culturales',  img: IMG },
      { title: 'Foros Académicos',    img: IMG },
      { title: 'Ferias Científicas',  img: IMG }
    ],
    practicas : [
      { title: 'Prácticas en Comunidad',     img: IMG },
      { title: 'Vinculación Sector Público', img: IMG },
      { title: 'Convenios con Empresas',     img: IMG },
      { title: 'Proyectos Sociales',         img: IMG }
    ]
  };

  function featureHTML(item) {
    const extra = item.style ? '; ' + item.style : '';
    return `
      <article class="feature">
        <div class="feature__text">
          <h3 class="feature__title">${item.title}</h3>
        </div>
        <div class="feature__img" style="background-image:url('${item.img}')${extra}"></div>
      </article>
    `;
  }

  function render(key) {
    const items = DATA[key] || DATA.divulgacion;
    grid.innerHTML = items.map(featureHTML).join('');
  }

  // Accesibilidad: click/Enter/Espacio + flechas para moverse entre tabs
  function activate(btn) {
    btns.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');
    render(btn.dataset.key);
    btn.focus();
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => activate(btn));
    btn.addEventListener('keydown', (e) => {
      const i = Array.from(btns).indexOf(btn);
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(btn); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault(); activate(btns[(i + 1) % btns.length]);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); activate(btns[(i - 1 + btns.length) % btns.length]);
      }
    });
  });

  // Render inicial
  render('divulgacion');
})();

/* =========================================================
   SECCIÓN 4 — Mapa real con Leaflet
   ========================================================= */
(function () {
  const mapEl = document.getElementById('lojaMap');
  if (!mapEl || typeof L === 'undefined') return;

  // Lee una variable CSS como número (px)
  function cssPx(varName, fallback) {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : fallback;
  }

  // Tamaño de pin tomado del CSS (--map-pin-size)
  const PIN_SIZE = cssPx('--map-pin-size', 18);

  // Ícono rojo con pulso (divIcon)
  const pinIcon = L.divIcon({
    className: 'pin-icon',
    html: '<span class="pin-dot"></span>',
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_SIZE / 2, PIN_SIZE / 2],
    popupAnchor: [0, -PIN_SIZE * 0.9]
  });

  // Centro aprox. en Loja
  const CENTER = [-3.9931, -79.2042];
  const map = L.map(mapEl, { scrollWheelZoom: true }).setView(CENTER, 14);

  // Capa base (OSM)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // Facultades (coords de ejemplo; ajusta con tus puntos exactos)
  const FACULTADES = [
    { name: 'Facultad de la Salud Humana', desc: 'Medicina, Enfermería, etc.',                     lat: -3.9919, lng: -79.2057 },
    { name: 'Fac. Agropecuaria y de Recursos Naturales Renovables', desc: 'Desarrollo rural.',    lat: -3.9965, lng: -79.1990 },
    { name: 'Fac. Energía, Industrias y Recursos No Renovables', desc: 'Ingenierías y energía.',  lat: -3.9978, lng: -79.2075 },
    { name: 'Fac. Jurídica, Social y Administrativa', desc: 'Derecho, administración, sociales.', lat: -3.9942, lng: -79.2021 },
    { name: 'Fac. Educación, Arte y Comunicación', desc: 'Docencia, arte y comunicación.',        lat: -3.9905, lng: -79.1999 }
  ];

  // Pintar pines
  FACULTADES.forEach(f => {
    L.marker([f.lat, f.lng], { icon: pinIcon })
      .addTo(map)
      .bindPopup(`<strong>${f.name}</strong>${f.desc ? `<br>${f.desc}` : ''}`);
  });

  // Helper: clic en el mapa → imprime coords para ubicar pines exactos
  map.on('click', e => {
    console.log('Click en:', e.latlng.lat.toFixed(6), e.latlng.lng.toFixed(6));
  });
})();

/* =========================================================
   Toggle mostrar/ocultar overlay del mapa (flechita)
   ========================================================= */
(function () {
  const wrap   = document.querySelector('.map-wrap');
  const toggle = document.getElementById('mapToggle');
  if (!wrap || !toggle) return;

  // Click en la flecha
  toggle.addEventListener('click', () => {
    const collapsed = wrap.classList.toggle('is-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.title = collapsed ? 'Mostrar panel' : 'Ocultar panel';
  });

  // Esc para ocultar rápido el panel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !wrap.classList.contains('is-collapsed')) {
      wrap.classList.add('is-collapsed');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.title = 'Mostrar panel';
    }
  });
})();
/* =========================================================
   SECCIÓN 5 — HOVER ROJO POR LETRA
   Envuelve cada carácter (menos espacios) en <span class="char">
   para poder cambiar el color por letra con CSS.
   ========================================================= */
(function () {
  const targets = document.querySelectorAll('.hover-red');
  targets.forEach(el => {
    // Evita envolver dos veces si vuelves a llamar el script
    if (el.dataset.charsWrapped === '1') return;

    const txt = el.textContent;
    const frag = document.createDocumentFragment();
    for (const ch of txt) {
      if (ch === ' ' || ch === '\n') {
        frag.appendChild(document.createTextNode(ch));
      } else {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch;
        frag.appendChild(s);
      }
    }
    el.textContent = '';
    el.appendChild(frag);
    el.dataset.charsWrapped = '1';
  });
})();
/* =========================
   SECCIÓN 8 — CONVENIOS
   ========================= */
(function(){
  const track  = document.getElementById('ccTrack');
  if (!track) return;

  // Datos por logo (edítalos a tu gusto)
  const DATA = {
    municipio: {
      title: 'Municipio de Loja',
      rows: [
        ['Tipo', 'Convenio Marco'],
        ['Vigencia', '2024 – 2027'],
        ['Alcance', 'Prácticas, pasantías y proyectos sociales'],
        ['Contacto', 'Dirección de Vinculación'],
        ['Estado', 'Activo']
      ]
    },
    ecu: {
      title: 'ECU 911',
      rows: [
        ['Tipo', 'Convenio Específico'],
        ['Vigencia', '2025 – 2028'],
        ['Ámbito', 'Gestión de riesgos y atención ciudadana'],
        ['Participantes', 'Docencia y estudiantes'],
        ['Estado', 'Activo']
      ]
    },
    titanus: {
      title: 'Titanus',
      rows: [
        ['Tipo', 'Vinculación Empresa'],
        ['Vigencia', '2024 – 2026'],
        ['Áreas', 'Innovación y transferencia tecnológica'],
        ['Beneficio', 'Proyectos de I+D aplicados'],
        ['Estado', 'Activo']
      ]
    },
    active: {
      title: 'Active',
      rows: [
        ['Tipo', 'Convenio Interinstitucional'],
        ['Vigencia', '2024 – 2027'],
        ['Foco', 'Salud y deportes'],
        ['Actividades', 'Campañas y servicios comunitarios'],
        ['Estado', 'Activo']
      ]
    }
  };

  const slides = [...track.querySelectorAll('.cc-slide')];
  const title  = document.getElementById('cvTitle');
  const rowsEl = document.getElementById('cvRows');
  const prev   = track.parentElement.querySelector('.cc-arrow.prev');
  const next   = track.parentElement.querySelector('.cc-arrow.next');

  function renderDetail(key){
    const d = DATA[key] || {title:'', rows:[]};
    title.textContent = d.title || '';
    rowsEl.innerHTML = d.rows.map(([k,v]) =>
      `<div class="k">${k}</div><div class="v">${v}</div>`).join('');
    slides.forEach(li => li.classList.toggle('is-active', li.dataset.key === key));
  }

  // Centrar/ir a un slide
  function goToSlide(li){
    const offset = li.offsetLeft - (track.clientWidth/2 - li.clientWidth/2);
    track.scrollTo({ left: offset, behavior: 'smooth' });
    renderDetail(li.dataset.key);
  }

  // Observa el slide más visible para actualizar el panel al “scrollear”
  const io = new IntersectionObserver((entries)=>{
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) renderDetail(visible.target.dataset.key);
  }, { root: track, threshold: 0.6 });

  slides.forEach(li => {
    io.observe(li);
    li.addEventListener('click', () => goToSlide(li));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToSlide(li); }
    });
    li.setAttribute('tabindex','0');
  });

  // Flechas
  const step = () => Math.max(slides[0]?.clientWidth || 240, track.clientWidth * 0.6);
  prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));

  // Rueda del mouse → scroll horizontal
  track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }
  }, { passive: false });

  // Inicial
  renderDetail(slides[0]?.dataset.key || 'municipio');
})();
