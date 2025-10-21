const fs = require('fs');
const path = require('path');

// Datos de los grupos de investigación
const grupos = [
    {
        codigo: 'GEBIOM',
        nombre: 'Genética y Biología Molecular UNL',
        descripcion: 'Investigación en biología molecular y enzimología para desarrollar soluciones innovadoras en salud, ambiente y producción.',
        imagen: 'GEBIOM.jpeg',
        archivo: 'grupo-gebiom.html'
    },
    {
        codigo: 'GIER',
        nombre: 'Energías Renovables UNL',
        descripcion: 'Investigación en energías solar, eólica e hidráulica para impulsar innovación científica y un futuro energético sostenible.',
        imagen: 'GIER.jpeg',
        archivo: 'grupo-gier.html'
    },
    {
        codigo: 'G-IPA',
        nombre: 'Producción Artística UNL',
        descripcion: 'Investigación y creación artística que impulsa formación, colaboración y difusión cultural a nivel local e internacional.',
        imagen: 'G-IPA.jpg',
        archivo: 'grupo-gipa.html'
    },
    {
        codigo: 'SMART',
        nombre: 'Control y Automatización UNL',
        descripcion: 'Investigación en biotecnología aplicada, medio ambiente y desarrollo sostenible.',
        imagen: 'SMART.jpg',
        archivo: 'grupo-smart.html'
    },
    {
        codigo: 'eX-MoVeT',
        nombre: 'Movilidad y Transporte UNL',
        descripcion: 'Investigación en movilidad, vehículos y transporte para soluciones sostenibles e innovación tecnológica en la sociedad y la industria.',
        imagen: 'eX-MoVeT.jpg',
        archivo: 'grupo-exmovet.html'
    },
    {
        codigo: 'GETES',
        nombre: 'Salud Pública UNL',
        descripcion: 'Investigación en salud pública y epidemiología usando datos temporo-espaciales para mejorar el bienestar y la educación en la zona 7 del Ecuador.',
        imagen: 'GETES.jpg',
        archivo: 'grupo-getes.html'
    },
    {
        codigo: 'GITED',
        nombre: 'Tecnología Educativa UNL',
        descripcion: 'Investigación en tecnología educativa para desarrollar soluciones innovadoras que mejoren la enseñanza y el aprendizaje en la región.',
        imagen: 'GITED.jpg',
        archivo: 'grupo-gited.html'
    },
    {
        codigo: 'GI-ES',
        nombre: 'Educación y Sociedad UNL',
        descripcion: 'Investigación en educación para fortalecer la formación docente, los procesos de enseñanza y la vinculación con la sociedad.',
        imagen: 'GI-ES.jpeg',
        archivo: 'grupo-gies.html'
    },
    {
        codigo: 'GIMARN',
        nombre: 'Medio Ambiente UNL',
        descripcion: 'Investigación en gestión ambiental y recursos naturales para promover sostenibilidad, conservación y adaptación al cambio climático.',
        imagen: 'GIMARN.jpg',
        archivo: 'grupo-gimarn.html'
    },
    {
        codigo: 'GIESDCOM',
        nombre: 'Educomunicación UNL',
        descripcion: 'Investigación en educomunicación y sociedad digital para comprender dinámicas sociales, tecnológicas y culturales en la comunicación contemporánea.',
        imagen: 'GIESDCO.jpg',
        archivo: 'grupo-giesdcom.html'
    },
    {
        codigo: 'GICIR',
        nombre: 'Ciencia Regional UNL',
        descripcion: 'Investigación en desarrollo territorial y ciencia regional para reducir desigualdades y promover planificación sostenible en la región.',
        imagen: 'GICIR.jpg',
        archivo: 'grupo-gicir.html'
    },
    {
        codigo: 'CLIIE',
        nombre: 'Innovación Educativa UNL',
        descripcion: 'Club estudiantil de investigación en informática y pedagogía que impulsa la formación científica y el desarrollo educativo en Ecuador.',
        imagen: 'CLIE.png',
        archivo: 'grupo-cliie.html'
    },
    {
        codigo: 'GITIC',
        nombre: 'Tecnologías de la Información UNL',
        descripcion: 'Investigación en tecnologías de la información y computación para fortalecer la formación académica, la innovación y la vinculación social.',
        imagen: 'GITIC.png',
        archivo: 'grupo-gitic.html'
    },
    {
        codigo: 'GINM',
        nombre: 'Nuevos Materiales UNL',
        descripcion: 'Investigación en ciencia e ingeniería de materiales para desarrollar soluciones sostenibles, formar investigadores y transferir tecnología al sector productivo.',
        imagen: 'GINM.png',
        archivo: 'grupo-ginm.html'
    }
];

// Template base para las páginas
const templateBase = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{CODIGO}} - {{NOMBRE}} - Universidad Nacional de Loja</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="./css/investigacion.css">
    <link rel="stylesheet" href="./css/grupo-investigacion.css">
</head>
<body>
    <!-- Header -->
    <header class="header" role="banner">
        <div class="header__main">
            <div class="container">
                <div class="header__main-content">
                    <a href="./index.html" class="header__logo" aria-label="Inicio - Universidad Nacional">
                        <img src="./assets/img/logogris_0.png" alt="Logo Universidad Nacional" width="40" height="40">
                    </a>
        
                    <nav class="header__nav" aria-label="Navegación principal">
                        <ul class="header__nav-list">
                            <li class="header__nav-item"><a href="./index.html" class="header__nav-link">INICIO</a></li>
                            <li class="header__nav-item"><a href="./docencia.html" class="header__nav-link">DOCENCIA</a></li>
                            <li class="header__nav-item">
                                <a href="./investigacion.html" class="header__nav-link">INVESTIGACIÓN</a>
                            </li>
                            <li class="header__nav-item"><a href="#" class="header__nav-link">NOTICIAS</a></li>
                            <li class="header__nav-item"><a href="#" class="header__nav-link">SERVICIOS</a></li>
                            <li class="header__nav-item"><a href="./vinculacion.html" class="header__nav-link">VINCULACIÓN</a></li>
                            <li class="header__nav-item"><a href="#" class="header__nav-link">CONTACTO</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero hero--grupo">
        <div class="hero__background">
            <img src="assets/img/imgInvestigacion/{{IMAGEN}}" alt="{{CODIGO}} - {{NOMBRE}}" class="hero__bg-image">
            <div class="hero__overlay hero__overlay--gradient"></div>
        </div>
        <div class="hero__container">
            <div class="hero__content">
                <div class="breadcrumb-hero">Investigación / Grupos de Investigación</div>
                <h1 class="hero__title">{{CODIGO}} - {{NOMBRE}}</h1>
                <p class="hero__subtitle">{{DESCRIPCION}}</p>
            </div>
        </div>
    </section>

    <!-- Navigation Tabs -->
    <section class="grupo-nav">
        <div class="grupo-nav__container">
            <nav class="grupo-nav__tabs">
                <button class="grupo-nav__tab grupo-nav__tab--active" data-tab="conocenos">
                    <i class="fas fa-info-circle"></i>
                    Conócenos
                </button>
                <button class="grupo-nav__tab" data-tab="equipo">
                    <i class="fas fa-users"></i>
                    Equipo de Investigadores
                </button>
                <button class="grupo-nav__tab" data-tab="proyectos">
                    <i class="fas fa-project-diagram"></i>
                    Proyectos de Investigación
                </button>
                <button class="grupo-nav__tab" data-tab="produccion">
                    <i class="fas fa-file-alt"></i>
                    Producción Científica
                </button>
            </nav>
        </div>
    </section>

    <!-- Content Sections -->
    <main class="grupo-content">
        <!-- Conócenos Section -->
        <section class="content-section" id="conocenos">
            <div class="content-container">
                <div class="section-header">
                    <h2 class="section-title">Conócenos</h2>
                    <div class="section-divider"></div>
                </div>
                
                <div class="objetivos-grid">
                    <div class="objetivo-card">
                        <div class="objetivo-icon">
                            <i class="fas fa-bullseye"></i>
                        </div>
                        <h3>Objetivo General</h3>
                        <p>{{DESCRIPCION}}</p>
                    </div>
                    
                    <div class="objetivos-especificos">
                        <h3>Objetivos Específicos</h3>
                        <ul class="objetivos-list">
                            <li>
                                <i class="fas fa-search"></i>
                                Desarrollar investigación científica de alta calidad en el área de especialización
                            </li>
                            <li>
                                <i class="fas fa-users"></i>
                                Formar recursos humanos especializados a nivel de pregrado y posgrado
                            </li>
                            <li>
                                <i class="fas fa-handshake"></i>
                                Establecer colaboraciones nacionales e internacionales
                            </li>
                            <li>
                                <i class="fas fa-share-alt"></i>
                                Transferir conocimiento y tecnología a la sociedad
                            </li>
                            <li>
                                <i class="fas fa-graduation-cap"></i>
                                Contribuir al desarrollo regional y nacional mediante la investigación aplicada
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Equipo Section -->
        <section class="content-section" id="equipo" style="display: none;">
            <div class="content-container">
                <div class="section-header">
                    <h2 class="section-title">Equipo de Investigadores</h2>
                    <div class="section-divider"></div>
                </div>
                
                <div class="equipo-grid">
                    <div class="investigador-card">
                        <div class="investigador-photo">
                            <img src="assets/img/placeholder-researcher.jpg" alt="Director del Grupo">
                        </div>
                        <div class="investigador-info">
                            <h3>Dr. Director Investigación</h3>
                            <p class="cargo">Director del Grupo</p>
                            <p class="especialidad">Especialista en el área de investigación del grupo</p>
                            <div class="contacto">
                                <p><i class="fas fa-envelope"></i> director@unl.edu.ec</p>
                                <p><i class="fas fa-phone"></i> +593 7 254-8000 ext. 1000</p>
                                <p><i class="fas fa-map-marker-alt"></i> Campus Universitario "La Argelia"</p>
                            </div>
                        </div>
                    </div>

                    <div class="investigador-card">
                        <div class="investigador-photo">
                            <img src="assets/img/placeholder-researcher.jpg" alt="Co-investigador">
                        </div>
                        <div class="investigador-info">
                            <h3>Dra. Co-investigadora Principal</h3>
                            <p class="cargo">Co-investigadora</p>
                            <p class="especialidad">Área de especialización complementaria</p>
                            <div class="contacto">
                                <p><i class="fas fa-envelope"></i> coinvestigadora@unl.edu.ec</p>
                                <p><i class="fas fa-phone"></i> +593 7 254-8000 ext. 1001</p>
                                <p><i class="fas fa-map-marker-alt"></i> Campus Universitario "La Argelia"</p>
                            </div>
                        </div>
                    </div>

                    <div class="investigador-card">
                        <div class="investigador-photo">
                            <img src="assets/img/placeholder-researcher.jpg" alt="Investigador Asociado">
                        </div>
                        <div class="investigador-info">
                            <h3>MSc. Investigador Asociado</h3>
                            <p class="cargo">Investigador Asociado</p>
                            <p class="especialidad">Especialista en metodología y técnicas avanzadas</p>
                            <div class="contacto">
                                <p><i class="fas fa-envelope"></i> investigador@unl.edu.ec</p>
                                <p><i class="fas fa-phone"></i> +593 7 254-8000 ext. 1002</p>
                                <p><i class="fas fa-map-marker-alt"></i> Campus Universitario "La Argelia"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Proyectos Section -->
        <section class="content-section" id="proyectos" style="display: none;">
            <div class="content-container">
                <div class="section-header">
                    <h2 class="section-title">Proyectos de Investigación</h2>
                    <div class="section-divider"></div>
                </div>
                
                <div class="proyectos-grid">
                    <div class="proyecto-card">
                        <div class="proyecto-status activo">Activo</div>
                        <h3>Proyecto de Investigación Principal</h3>
                        <p class="proyecto-descripcion">Descripción detallada del proyecto principal del grupo de investigación, sus objetivos y metodología aplicada.</p>
                        <div class="proyecto-meta">
                            <p><i class="fas fa-calendar"></i> <strong>Duración:</strong> 2024 - 2026</p>
                            <p><i class="fas fa-dollar-sign"></i> <strong>Financiamiento:</strong> SENESCYT</p>
                            <p><i class="fas fa-user"></i> <strong>Investigador Principal:</strong> Dr. Director Investigación</p>
                        </div>
                        <div class="proyecto-tags">
                            <span class="tag">Investigación Aplicada</span>
                            <span class="tag">Innovación</span>
                            <span class="tag">Desarrollo Regional</span>
                        </div>
                    </div>

                    <div class="proyecto-card">
                        <div class="proyecto-status activo">Activo</div>
                        <h3>Proyecto Colaborativo Internacional</h3>
                        <p class="proyecto-descripcion">Proyecto desarrollado en colaboración con instituciones internacionales para el intercambio de conocimientos y tecnología.</p>
                        <div class="proyecto-meta">
                            <p><i class="fas fa-calendar"></i> <strong>Duración:</strong> 2023 - 2025</p>
                            <p><i class="fas fa-dollar-sign"></i> <strong>Financiamiento:</strong> Programa Internacional</p>
                            <p><i class="fas fa-user"></i> <strong>Investigador Principal:</strong> Dra. Co-investigadora Principal</p>
                        </div>
                        <div class="proyecto-tags">
                            <span class="tag">Colaboración Internacional</span>
                            <span class="tag">Transferencia Tecnológica</span>
                            <span class="tag">Capacitación</span>
                        </div>
                    </div>

                    <div class="proyecto-card">
                        <div class="proyecto-status finalizado">Finalizado</div>
                        <h3>Proyecto de Desarrollo Comunitario</h3>
                        <p class="proyecto-descripcion">Proyecto enfocado en la aplicación práctica de los conocimientos generados para el beneficio directo de las comunidades locales.</p>
                        <div class="proyecto-meta">
                            <p><i class="fas fa-calendar"></i> <strong>Duración:</strong> 2021 - 2023</p>
                            <p><i class="fas fa-dollar-sign"></i> <strong>Financiamiento:</strong> UNL - GAD Local</p>
                            <p><i class="fas fa-user"></i> <strong>Investigador Principal:</strong> MSc. Investigador Asociado</p>
                        </div>
                        <div class="proyecto-tags">
                            <span class="tag">Desarrollo Comunitario</span>
                            <span class="tag">Vinculación Social</span>
                            <span class="tag">Aplicación Práctica</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Producción Científica Section -->
        <section class="content-section" id="produccion" style="display: none;">
            <div class="content-container">
                <div class="section-header">
                    <h2 class="section-title">Producción Científica</h2>
                    <div class="section-divider"></div>
                </div>
                
                <div class="produccion-tabs">
                    <button class="produccion-tab produccion-tab--active" data-tipo="articulos">
                        <i class="fas fa-file-alt"></i>
                        Artículos Científicos
                    </button>
                    <button class="produccion-tab" data-tipo="libros">
                        <i class="fas fa-book"></i>
                        Libros y Capítulos
                    </button>
                    <button class="produccion-tab" data-tipo="tesis">
                        <i class="fas fa-graduation-cap"></i>
                        Tesis Dirigidas
                    </button>
                    <button class="produccion-tab" data-tipo="eventos">
                        <i class="fas fa-calendar-alt"></i>
                        Participación en Eventos
                    </button>
                </div>

                <div class="produccion-content">
                    <div class="produccion-list" id="articulos">
                        <div class="publicacion-item">
                            <div class="publicacion-año">2024</div>
                            <div class="publicacion-info">
                                <h4>Título del artículo científico más reciente del grupo</h4>
                                <p class="autores">Investigador Principal, Co-investigadora, Investigador Asociado</p>
                                <p class="revista"><em>Revista Científica Internacional</em>, 25(3): 123-145</p>
                                <div class="publicacion-links">
                                    <a href="#" class="btn-link"><i class="fas fa-external-link-alt"></i> DOI</a>
                                    <a href="#" class="btn-link"><i class="fas fa-download"></i> PDF</a>
                                </div>
                            </div>
                        </div>

                        <div class="publicacion-item">
                            <div class="publicacion-año">2024</div>
                            <div class="publicacion-info">
                                <h4>Segundo artículo científico relevante del periodo</h4>
                                <p class="autores">Co-investigadora, Investigador Principal</p>
                                <p class="revista"><em>Journal of Applied Research</em>, 18(2): 67-89</p>
                                <div class="publicacion-links">
                                    <a href="#" class="btn-link"><i class="fas fa-external-link-alt"></i> DOI</a>
                                    <a href="#" class="btn-link"><i class="fas fa-download"></i> PDF</a>
                                </div>
                            </div>
                        </div>

                        <div class="publicacion-item">
                            <div class="publicacion-año">2023</div>
                            <div class="publicacion-info">
                                <h4>Investigación colaborativa con impacto regional</h4>
                                <p class="autores">Investigador Asociado, Investigador Principal, Co-investigadora</p>
                                <p class="revista"><em>Regional Development Studies</em>, 12(4): 234-256</p>
                                <div class="publicacion-links">
                                    <a href="#" class="btn-link"><i class="fas fa-external-link-alt"></i> DOI</a>
                                    <a href="#" class="btn-link"><i class="fas fa-download"></i> PDF</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="produccion-list" id="libros" style="display: none;">
                        <div class="publicacion-item">
                            <div class="publicacion-año">2024</div>
                            <div class="publicacion-info">
                                <h4>Manual Especializado en el Área de Investigación</h4>
                                <p class="autores">Investigador Principal (Editor Principal)</p>
                                <p class="revista">Editorial Universidad Nacional de Loja, 456 pp.</p>
                                <div class="publicacion-links">
                                    <a href="#" class="btn-link"><i class="fas fa-book"></i> Ver Libro</a>
                                </div>
                            </div>
                        </div>

                        <div class="publicacion-item">
                            <div class="publicacion-año">2023</div>
                            <div class="publicacion-info">
                                <h4>Capítulo: Avances en la Investigación Regional</h4>
                                <p class="autores">Co-investigadora, Investigador Principal</p>
                                <p class="revista">En: Compendio de Investigaciones Contemporáneas. Ed. Académica, pp. 189-221</p>
                                <div class="publicacion-links">
                                    <a href="#" class="btn-link"><i class="fas fa-external-link-alt"></i> Ver Capítulo</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="produccion-list" id="tesis" style="display: none;">
                        <div class="publicacion-item">
                            <div class="publicacion-año">2024</div>
                            <div class="publicacion-info">
                                <h4>Tesis de maestría en el área de especialización</h4>
                                <p class="autores">Estudiante: María Estudiante</p>
                                <p class="revista">Tesis de Maestría - Programa de Posgrado</p>
                                <p class="director">Director: Dr. Director Investigación</p>
                            </div>
                        </div>

                        <div class="publicacion-item">
                            <div class="publicacion-año">2023</div>
                            <div class="publicacion-info">
                                <h4>Trabajo de integración curricular relacionado con la investigación</h4>
                                <p class="autores">Estudiante: Juan Graduando</p>
                                <p class="revista">Tesis de Pregrado - Carrera Relacionada</p>
                                <p class="director">Director: Dra. Co-investigadora Principal</p>
                            </div>
                        </div>
                    </div>

                    <div class="produccion-list" id="eventos" style="display: none;">
                        <div class="publicacion-item">
                            <div class="publicacion-año">2024</div>
                            <div class="publicacion-info">
                                <h4>Congreso Internacional del Área de Investigación</h4>
                                <p class="autores">Investigador Principal (Ponencia Magistral)</p>
                                <p class="revista">Ciudad Sede, País</p>
                                <p class="titulo-presentacion">"Avances en la investigación del grupo"</p>
                            </div>
                        </div>

                        <div class="publicacion-item">
                            <div class="publicacion-año">2024</div>
                            <div class="publicacion-info">
                                <h4>Simposio Latinoamericano Especializado</h4>
                                <p class="autores">Co-investigadora (Presentación Oral)</p>
                                <p class="revista">Ciudad Sede, País</p>
                                <p class="titulo-presentacion">"Metodologías innovadoras en la investigación aplicada"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer-red" role="contentinfo">
        <div class="footer-red__video-bg" aria-hidden="true">
            <video autoplay loop muted playsinline>
                <source src="./assets/video/UNL.mp4" type="video/mp4">
            </video>
        </div>
        <div class="footer-red__overlay" aria-hidden="true"></div>
        <div class="footer-red__content">
            <div class="container">
                <p>&copy; 2025 Universidad Nacional de Loja. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script>
        // Tab functionality
        document.addEventListener('DOMContentLoaded', function() {
            const navTabs = document.querySelectorAll('.grupo-nav__tab');
            const contentSections = document.querySelectorAll('.content-section');
            const produccionTabs = document.querySelectorAll('.produccion-tab');
            const produccionLists = document.querySelectorAll('.produccion-list');

            // Navigation tabs
            navTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const targetTab = this.dataset.tab;
                    
                    // Remove active class from all tabs and sections
                    navTabs.forEach(t => t.classList.remove('grupo-nav__tab--active'));
                    contentSections.forEach(s => s.style.display = 'none');
                    
                    // Add active class to clicked tab and show corresponding section
                    this.classList.add('grupo-nav__tab--active');
                    document.getElementById(targetTab).style.display = 'block';
                });
            });

            // Producción científica tabs
            produccionTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const targetType = this.dataset.tipo;
                    
                    // Remove active class from all tabs and hide all lists
                    produccionTabs.forEach(t => t.classList.remove('produccion-tab--active'));
                    produccionLists.forEach(l => l.style.display = 'none');
                    
                    // Add active class to clicked tab and show corresponding list
                    this.classList.add('produccion-tab--active');
                    document.getElementById(targetType).style.display = 'block';
                });
            });

            // Smooth scrolling for internal links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });
    </script>
</body>
</html>`;

// Función para generar las páginas
function generarPaginas() {
    grupos.forEach(grupo => {
        let contenido = templateBase
            .replace(/{{CODIGO}}/g, grupo.codigo)
            .replace(/{{NOMBRE}}/g, grupo.nombre)
            .replace(/{{DESCRIPCION}}/g, grupo.descripcion)
            .replace(/{{IMAGEN}}/g, grupo.imagen);

        console.log(`Generando ${grupo.archivo}...`);
        // En un entorno real, aquí escribirías el archivo
        // fs.writeFileSync(grupo.archivo, contenido, 'utf8');
    });
}

// Ejecutar la generación
generarPaginas();

console.log('¡Páginas generadas exitosamente!');