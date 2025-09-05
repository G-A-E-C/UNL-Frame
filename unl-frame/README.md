# Universidad Nacional de Loja - Posgrados Landing Page

Landing page institucional para la sección de Posgrados de la Universidad Nacional de Loja (Ecuador), desarrollada con HTML, CSS y JavaScript vanilla. Diseño pixel-perfect, responsivo y accesible basado en las especificaciones del mockup institucional.

## 🚀 Inicio Rápido

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador web moderno
3. **¡Listo!** No requiere instalación ni build tools

```bash
# Opción 1: Servidor local simple con Python
python -m http.server 8000

# Opción 2: Servidor local con Node.js
npx serve .

# Opción 3: Abrir directamente
open index.html
```

## 📁 Estructura del Proyecto

```
unl-frame/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   └── main.js            # JavaScript funcional
├── assets/
│   ├── img/               # Imágenes del sitio
│   │   ├── hero-graduacion.jpg
│   │   ├── logo-universidad.png
│   │   ├── escudo-universidad.png
│   │   ├── video-doctorado.jpg
│   │   ├── estudiantes-laboratorio.jpg
│   │   ├── graduacion-ceremony.jpg
│   │   └── gallery-*.jpg  # Imágenes de galería
│   └── icons/             # Iconos SVG
└── README.md              # Este archivo
```

## 🎨 Características de Diseño

### Paleta de Colores Institucional
```css
--color-rojo: #B5121B        /* Principal institucional */
--color-blanco: #FFFFFF
--color-negro: #000000
--color-gris-900: #333333
--color-gris-700: #616161
--color-gris-300: #CCCCCC
--color-gris-100: #F5F5F5
--color-verde: #2E7D32
--color-azul: #1565C0
--color-amarillo: #F9A825
```

### Tipografía
- **Fuente principal**: Roboto (400, 500, 700)
- **Fallback**: system-ui, -apple-system, "Segoe UI", Arial, sans-serif
- **Títulos**: Mayúsculas y negrita
- **Interlineado**: 1.5 para párrafos, 1.2 para títulos

### Breakpoints Responsivos
- **Mobile**: 480px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1280px+

## 🧩 Componentes Principales

### Header (Barra Principal)
- **Navegación principal**: Logo, menú de navegación, buscador y acceso
- **Comportamiento**: Sticky con sombra al hacer scroll
- **Móvil**: Menú hamburguesa con focus trap
- **Eliminado**: Franja superior de utilidades para diseño más limpio

### Hero Section
- **Background**: Imagen con overlay rojo semitransparente
- **Contenido**: Título, subtítulo y CTA prominente
- **Animaciones**: Fade-up con delays escalonados

### Secciones de Contenido
1. **Noticias/Multimedia**: Grid con video destacado y tarjeta informativa
2. **Accesos Rápidos**: Botones circulares para servicios frecuentes
3. **Oferta Académica**: Bloques horizontales por áreas de conocimiento
4. **Conoce +**: Galería de imágenes con enlaces relacionados
5. **Accesos Institucionales**: Bloques negros para documentos oficiales
6. **Indicadores (KPIs)**: Estadísticas animadas con contadores
7. **Galería**: Mosaico con modal accesible
8. **Ubicación**: Mapa interactivo con datos de contacto de la UNL

### Footer
- **Información actualizada**: Datos específicos de la Universidad Nacional de Loja
- **Contacto**: Teléfonos, email y ubicación en Ecuador
- **Enlaces**: Incluye enlace directo al mapa de ubicación
- **Información legal**: Datos de contacto institucional
- **Enlaces**: Política de privacidad, términos, contacto, mapa
- **Marca de agua**: Escudo institucional con baja opacidad

## ⚡ Funcionalidades JavaScript

### Módulos Implementados

#### HeaderModule
- Menú móvil con navegación por teclado
- Buscador expandible (shortcut: tecla `/`)
- Header sticky con detección de scroll
- Focus trap en menú móvil

#### AnimationsModule
- Intersection Observer para animaciones al scroll
- Contadores animados para estadísticas
- Soporte para `data-animate` y `data-delay`
- Respeta `prefers-reduced-motion`

#### GalleryModule
- Modal accesible para imágenes
- Navegación con teclado (← → ESC)
- Focus management y trap
- Cierre con backdrop click

#### AccessibilityModule
- Focus-visible polyfill
- Skip links automáticos
- Mejoras de accesibilidad
- Detección de motion preferences

#### PerformanceModule
- Lazy loading de imágenes
- Preload de recursos críticos
- Optimización de recursos

### Eventos de Teclado
- **/** - Abrir buscador
- **Escape** - Cerrar modales/menús
- **Tab/Shift+Tab** - Navegación con focus trap
- **Enter/Space** - Activar botones
- **← →** - Navegación en galería

## ♿ Accesibilidad (WCAG 2.1 AA)

### Características Implementadas
- ✅ **Navegación por teclado** completa
- ✅ **Roles ARIA** apropiados
- ✅ **Labels** descriptivos para elementos interactivos
- ✅ **Contraste AA** en todos los elementos
- ✅ **Focus visible** personalizado
- ✅ **Skip links** para navegación rápida
- ✅ **alt text** descriptivo en imágenes
- ✅ **aria-current** en navegación
- ✅ **Focus trap** en modales y menús
- ✅ **Landmarks** semánticos (header, nav, main, section, footer)

### Testing de Accesibilidad
```bash
# Herramientas recomendadas:
- axe DevTools (Chrome/Firefox)
- WAVE Web Accessibility Evaluator
- Lighthouse Accessibility Audit
- Screen reader testing (NVDA, JAWS, VoiceOver)
```

## 📱 Responsive Design

### Mobile First Approach
El diseño está optimizado para dispositivos móviles primero, con mejoras progresivas para pantallas más grandes.

### Grid Systems
- **CSS Grid** para layouts complejos
- **Flexbox** para alineación y distribución
- **Container queries** preparado para futuras implementaciones

### Touch-Friendly
- Mínimo 44px para elementos interactivos
- Espaciado adecuado entre elementos
- Hover states adaptados para touch

## 🔧 Personalización

### Cambiar Paleta de Colores
Editar las variables CSS en `styles.css`:
```css
:root {
  --color-rojo: #TU_COLOR_PRINCIPAL;
  --color-azul: #TU_COLOR_SECUNDARIO;
  /* ... otros colores */
}
```

### Modificar Tipografía
```css
:root {
  --font-family: "Tu-Fuente", system-ui, sans-serif;
}
```

### Ajustar Breakpoints
```css
:root {
  --bp-tablet: 768px;
  --bp-desktop: 1024px;
  /* ... */
}
```

### Animaciones Personalizadas
Agregar atributos `data-animate` a elementos:
```html
<div data-animate="fade-up" data-delay="200">Contenido</div>
```

Tipos disponibles:
- `fade-up` - Desvanecimiento hacia arriba
- `fade-in` - Desvanecimiento simple
- `slide-in` - Deslizamiento lateral
- `count` - Contador animado (para números)

## 🖼️ Gestión de Assets

### Imágenes Requeridas
Colocar en `/assets/img/`:
- `hero-graduacion.jpg` (1920x1080, formato JPG)
- `logo-universidad.png` (transparente, 40px altura)
- `escudo-universidad.png` (transparente, marca de agua)
- `video-doctorado.jpg` (16:9 aspect ratio)
- `estudiantes-laboratorio.jpg`
- `graduacion-ceremony.jpg`
- `gallery-*.jpg` (6 imágenes para galería)

### Iconos SVG
Los iconos están integrados inline para mejor rendimiento. Para agregar nuevos iconos:
1. Exportar como SVG optimizado
2. Colocar en `/assets/icons/`
3. Referenciar en HTML

### Optimización de Imágenes
```bash
# Herramientas recomendadas:
- ImageOptim (macOS)
- TinyPNG (web)
- Squoosh (web, de Google)
```

## 🚀 Despliegue

### Hosting Estático
Compatible con cualquier servidor web estático:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Apache/Nginx**

### Configuración de Servidor
```nginx
# nginx.conf
location / {
    try_files $uri $uri/ /index.html;
}

# Headers de seguridad
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
```

### Performance Optimizations
- Comprimir assets con gzip/brotli
- Configurar cache headers
- Implementar CDN si es necesario
- Considerar lazy loading de imágenes

## 🧪 Testing

### Checklist de QA
- [ ] **Validación HTML** (W3C Validator)
- [ ] **Validación CSS** (W3C CSS Validator)
- [ ] **JavaScript** sin errores en consola
- [ ] **Responsivo** en 360px, 768px, 1024px, 1280px+
- [ ] **Cross-browser** (Chrome, Firefox, Safari, Edge)
- [ ] **Accesibilidad** (axe, WAVE, Lighthouse)
- [ ] **Performance** (Lighthouse > 90)
- [ ] **SEO básico** (meta tags, sitemap)

### Browsers Soportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📈 Mejoras Futuras

### Puntos para Animación Avanzada
- Parallax en hero section
- Transiciones entre páginas
- Micro-interacciones en hover
- Loading animations
- Scroll-triggered animations con CSS @scroll-timeline

### Funcionalidades Adicionales
- [ ] **PWA** (Service Worker, manifest)
- [ ] **i18n** (Internacionalización)
- [ ] **Dark mode** toggle
- [ ] **Search** funcional con resultados
- [ ] **Blog/Noticias** dinámico
- [ ] **Forms** de contacto/aplicación
- [ ] **CMS** integration (Headless CMS)

### Optimizaciones Técnicas
- [ ] **Critical CSS** inlining
- [ ] **Web Fonts** optimization
- [ ] **Image** lazy loading nativo
- [ ] **Container queries** para componentes
- [ ] **CSS Subgrid** cuando tenga mejor soporte

## 📝 Créditos y Licencias

### Imágenes Placeholder
Las imágenes utilizadas son placeholders. En producción, reemplazar con:
- Fotografías institucionales oficiales
- Imágenes con licencia apropiada
- Créditos de fotógrafo/diseñador

### Fuentes
- **Roboto**: Licencia Apache 2.0 (Google Fonts)

### Iconos
- Iconos personalizados basados en Material Design
- SVG optimizados para web

### Código
- Desarrollado para Universidad Nacional
- Libre para uso institucional
- Documentación bajo CC BY 4.0

## 🐛 Reporte de Issues

Para reportar problemas o sugerir mejoras:
1. Verificar que el issue no exista ya
2. Incluir steps to reproduce
3. Especificar browser y versión
4. Adjuntar screenshots si es relevante

## 🤝 Contribución

### Guidelines
1. Fork del repositorio
2. Crear branch feature/descriptive-name
3. Commits descriptivos
4. Testing antes de PR
5. Documentación actualizada

### Code Style
- **HTML**: Semantic, indentación 2 espacios
- **CSS**: BEM methodology, mobile-first
- **JS**: ES6+, JSDoc comments, semicolons

---

**Universidad Nacional** | **Posgrados 2024**  
Desarrollado con ❤️ para la comunidad académica
