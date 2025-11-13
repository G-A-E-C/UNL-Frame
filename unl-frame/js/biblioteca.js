// Biblioteca - script consolidado para manejar navegación, búsqueda y funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // === VARIABLES GLOBALES ===
    const menuToggle = document.getElementById('menu-toggle');
    const headerNav = document.getElementById('header-nav');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const header = document.getElementById('header');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('library-search');
    let menuOpen = false;

    // === MANEJO DEL MENÚ HAMBURGUESA ===
    if (menuToggle && headerNav && menuBackdrop) {
        menuToggle.addEventListener('click', () => {
            menuOpen = !menuOpen;
            headerNav.classList.toggle('active');
            menuBackdrop.classList.toggle('active');
            
            // Prevenir scroll cuando el menú está abierto
            document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
        });

        // Cerrar menú al hacer clic en el backdrop
        menuBackdrop.addEventListener('click', closeMobileMenu);

        // Cerrar menú al hacer clic en un enlace
        const navLinks = headerNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    function closeMobileMenu() {
        menuOpen = false;
        if (headerNav) headerNav.classList.remove('active');
        if (menuBackdrop) menuBackdrop.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    

    // === HEADER SCROLL EFFECT ===
    // Removido: el navbar ahora tiene fondo fijo siempre

    // === MANEJO DE NAVEGACIÓN ACTIVA ===
    function setActiveNavigation() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        // Navegación principal del header
        const headerLinks = document.querySelectorAll('.header-nav a');
        headerLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            if (href === currentPath || 
                (currentPath === '/' && href === './index.html') ||
                (href.startsWith('#') && href === currentHash)) {
                link.classList.add('active');
            }
        });

        // Navegación secundaria del hero
        const heroLinks = document.querySelectorAll('.library-menu a');
        heroLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            if (href === currentHash) {
                link.classList.add('active');
            }
        });

        // Manejar clics en enlaces de navegación
        const allNavLinks = document.querySelectorAll('.header-nav a, .library-menu a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    // Para enlaces de ancla, solo actualizar estado activo
                    allNavLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }

    // === MANEJO DE BÚSQUEDA ===
    function setupSearch() {
        if (searchBtn && searchInput) {
            // Buscar al hacer clic en el botón
            searchBtn.addEventListener('click', handleSearch);
            
            // Buscar al presionar Enter en el input
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSearch(e);
                }
            });
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        if (!query) {
            alert('Por favor escribe un término de búsqueda.');
            searchInput.focus();
            return;
        }
        
        // Redirigir a la página de recursos con el término de búsqueda
        const searchUrl = './recursos.html?q=' + encodeURIComponent(query);
        window.location.href = searchUrl;
    }

    // === CARRUSEL DE ACCESOS DIRECTOS ===
    function setupAccesosCarousel() {
        const accesosGrid = document.getElementById('accesosGrid');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (!accesosGrid || !prevBtn || !nextBtn) return;

        const scrollAmount = 240; // Cantidad de scroll por clic (ancho de tarjeta + gap)

        // Botón siguiente
        nextBtn.addEventListener('click', () => {
            accesosGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Botón anterior
        prevBtn.addEventListener('click', () => {
            accesosGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Ocultar/mostrar botones según la posición del scroll
        function updateNavButtons() {
            const isAtStart = accesosGrid.scrollLeft <= 10;
            const isAtEnd = accesosGrid.scrollLeft >= accesosGrid.scrollWidth - accesosGrid.clientWidth - 10;

            prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

            nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }

        // Actualizar botones al cargar y al hacer scroll
        updateNavButtons();
        accesosGrid.addEventListener('scroll', updateNavButtons);
        window.addEventListener('resize', updateNavButtons);
    }

    // === MAPA INTERACTIVO ===
    function setupMap() {
        const mapEl = document.getElementById('bibliotecaMap');
        if (!mapEl || typeof L === 'undefined') return;

        // Coordenadas de la Biblioteca Central UNL
        const BIBLIOTECA_COORDS = [-4.033010, -79.202497];
        
        // Inicializar mapa
        // En la función setupMap(), modifica así:
const map = L.map('bibliotecaMap', {
    scrollWheelZoom: false,  // ← CAMBIA A false PARA DESACTIVAR EL SCROLL ZOOM
    zoomControl: true        // ← ESTO MANTIENE LOS BOTONES + Y -
}).setView(BIBLIOTECA_COORDS, 17);

        // Capa base OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'map data © OpenStreetMap contributors under ODBL – <a href="#" onclick="return false;">Abrir leyenda</a> – Desarrollado por uMap'
        }).addTo(map);

        // Marcador de la Biblioteca Central
        const bibliotecaIcon = L.divIcon({
            className: 'biblioteca-marker',
            html: '<div class="marker-pin"></div>',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        const marker = L.marker(BIBLIOTECA_COORDS, { icon: bibliotecaIcon }).addTo(map);
        
        marker.bindPopup(`
            <div style="text-align: center; padding: 10px;">
                <strong style="font-size: 16px; color: #B71C1C;">Biblioteca Central UNL</strong><br>
                <span style="font-size: 14px; color: #666;">Av. Pio Jaramillo Alvarado</span><br>
                <span style="font-size: 14px; color: #666;">Loja, Ecuador</span>
            </div>
        `).openPopup();

        // Controles personalizados
        L.control.scale({
            position: 'bottomleft',
            metric: true,
            imperial: false
        }).addTo(map);
    }

    // === INICIALIZACIÓN ===
    function init() {
        setActiveNavigation();
        setupSearch();
        setupAccesosCarousel();
        setupMap();
        
        // Log de inicialización exitosa
        console.log('Biblioteca Virtual UNL - Script inicializado correctamente');
    }

    // Ejecutar inicialización
    init();
});