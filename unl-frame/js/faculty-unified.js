// FACULTY ANIMATIONS - UNIFIED MOBILE/DESKTOP
const FacultyAnimationsModule = {
  init() {
    console.log('🎨 Initializing Faculty Animations Module - Unified');
    this.setupUnifiedAnimations();
  },

  setupUnifiedAnimations() {
    const facultyBlocks = document.querySelectorAll('.offer__block--hover');
    
    if (facultyBlocks.length === 0) {
      console.warn('⚠️ No faculty blocks found');
      return;
    }

    console.log(`📱 Found ${facultyBlocks.length} faculty blocks`);

    // Verificar si estamos en móvil
    const isMobile = () => window.innerWidth <= 768;
    
    if (isMobile()) {
      this.setupMobileScrollAnimation(facultyBlocks);
    } else {
      // En desktop usar hover normal
      console.log('🖥️ Desktop mode: Using hover effects');
    }
    
    // Re-configurar en cambio de tamaño de ventana
    window.addEventListener('resize', () => {
      if (isMobile()) {
        this.setupMobileScrollAnimation(facultyBlocks);
      }
    });
  },

  setupMobileScrollAnimation(facultyBlocks) {
    console.log('📱 Setting up mobile scroll animations');
    
    // Observer para detectar qué facultad está en el viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remover clase active de todos
          facultyBlocks.forEach(block => {
            block.classList.remove('active');
          });
          
          // Agregar clase active al actual
          entry.target.classList.add('active');
          
          const index = Array.from(facultyBlocks).indexOf(entry.target);
          console.log(`✅ Faculty ${index + 1} activated`);
        }
      });
    }, {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Zona más amplia para activación
      threshold: 0.5 // Más sensible
    });

    // Observar todos los bloques
    facultyBlocks.forEach(block => {
      observer.observe(block);
    });
    
    // Activar el primero por defecto
    if (facultyBlocks.length > 0) {
      facultyBlocks[0].classList.add('active');
    }
  }
};

// Reemplazar el módulo existente
window.FacultyAnimationsModule = FacultyAnimationsModule;
