
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('accessibility-btn');
  const panel = document.getElementById('accessibility-panel');
  if (!btn || !panel) return;

  // Mostrar/ocultar panel con animación mejorada
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = panel.getAttribute('aria-hidden') === 'false';
    panel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    
    // Agregar clase para rotación del botón
    btn.classList.toggle('active', !isOpen);
  });
  
  // Cerrar panel al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!panel.contains(e.target) && e.target !== btn) {
      panel.setAttribute('aria-hidden', 'true');
      btn.classList.remove('active');
    }
  });

  // Cerrar panel con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panel.getAttribute('aria-hidden') === 'false') {
      panel.setAttribute('aria-hidden', 'true');
      btn.classList.remove('active');
      btn.focus();
    }
  });

  // Funciones para manejar estados activos
  function toggleButtonState(button, isActive) {
    button.classList.toggle('active', isActive);
  }

  // Tamaño de fuente mejorado
  let fontSize = 100;
  const fontIncBtn = panel.querySelector('.accessibility-font-inc');
  const fontDecBtn = panel.querySelector('.accessibility-font-dec');
  
  function setFont(size) {
    document.documentElement.classList.remove('font-small', 'font-large', 'font-xlarge');
    toggleButtonState(fontIncBtn, false);
    toggleButtonState(fontDecBtn, false);
    
    if (size <= 90) {
      document.documentElement.classList.add('font-small');
      toggleButtonState(fontDecBtn, true);
    } else if (size >= 140) {
      document.documentElement.classList.add('font-xlarge');
      toggleButtonState(fontIncBtn, true);
    } else if (size >= 120) {
      document.documentElement.classList.add('font-large');
      toggleButtonState(fontIncBtn, true);
    }
    fontSize = size;
    
    // Guardar preferencia
    localStorage.setItem('accessibility-font-size', size);
  }
  
  fontIncBtn.addEventListener('click', function() {
    if (fontSize < 140) setFont(fontSize + 20);
  });
  
  fontDecBtn.addEventListener('click', function() {
    if (fontSize > 90) setFont(fontSize - 10);
  });

  // Alto contraste mejorado
  const contrastBtn = panel.querySelector('.accessibility-contrast');
  contrastBtn.addEventListener('click', function() {
    const isActive = document.body.classList.toggle('high-contrast');
    toggleButtonState(contrastBtn, isActive);
    localStorage.setItem('accessibility-high-contrast', isActive);
  });

  // Escala de grises mejorada
  const grayscaleBtn = panel.querySelector('.accessibility-grayscale');
  grayscaleBtn.addEventListener('click', function() {
    const isActive = document.body.classList.toggle('grayscale');
    toggleButtonState(grayscaleBtn, isActive);
    localStorage.setItem('accessibility-grayscale', isActive);
  });

  // Subrayar enlaces mejorado
  const underlineBtn = panel.querySelector('.accessibility-underline-links');
  underlineBtn.addEventListener('click', function() {
    const isActive = document.body.classList.toggle('underline-links');
    toggleButtonState(underlineBtn, isActive);
    localStorage.setItem('accessibility-underline-links', isActive);
  });

  // Restaurar preferencias guardadas
  function loadAccessibilityPreferences() {
    // Restaurar tamaño de fuente
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    if (savedFontSize) {
      setFont(parseInt(savedFontSize));
    }

    // Restaurar alto contraste
    const savedContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    if (savedContrast) {
      document.body.classList.add('high-contrast');
      toggleButtonState(contrastBtn, true);
    }

    // Restaurar escala de grises
    const savedGrayscale = localStorage.getItem('accessibility-grayscale') === 'true';
    if (savedGrayscale) {
      document.body.classList.add('grayscale');
      toggleButtonState(grayscaleBtn, true);
    }

    // Restaurar subrayar enlaces
    const savedUnderline = localStorage.getItem('accessibility-underline-links') === 'true';
    if (savedUnderline) {
      document.body.classList.add('underline-links');
      toggleButtonState(underlineBtn, true);
    }
  }

  // Cargar preferencias al inicializar
  loadAccessibilityPreferences();

  // Botón reset para limpiar todas las preferencias
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Restablecer';
  resetBtn.className = 'accessibility-reset';
  resetBtn.setAttribute('aria-label', 'Restablecer todas las opciones de accesibilidad');
  resetBtn.addEventListener('click', function() {
    // Limpiar todas las clases
    document.documentElement.classList.remove('font-small', 'font-large', 'font-xlarge');
    document.body.classList.remove('high-contrast', 'grayscale', 'underline-links');
    
    // Resetear estados de botones
    panel.querySelectorAll('button:not(.accessibility-reset)').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Limpiar localStorage
    localStorage.removeItem('accessibility-font-size');
    localStorage.removeItem('accessibility-high-contrast');
    localStorage.removeItem('accessibility-grayscale');
    localStorage.removeItem('accessibility-underline-links');
    
    fontSize = 100;
  });
  
  panel.appendChild(resetBtn);
});
/**
 * Main JavaScript Module
 * Landing page for Universidad Nacional - Posgrados Section
 * 
 * Features:
 * - Sticky header with scroll detection
 * - Mobile menu toggle with focus trap
 * - Search toggle functionality
 * - Scroll animations with Intersection Observer
 * - Counter animations for stats
 * - Gallery modal with keyboard navigation
 * - Accessibility features and keyboard support
 */

(function() {
  'use strict';

  // ==========================================================================
  // CONFIGURATION AND UTILITIES
  // ==========================================================================

  const CONFIG = {
    selectors: {
      header: '.header',
      mobileToggle: '.header__mobile-toggle',
      mobileNav: '.header__mobile-nav',
      searchToggle: '.header__search-toggle',
      searchForm: '.header__search-form',
      searchInput: '.header__search-input',
      animatedElements: '[data-animate]',
      counterElements: '[data-animate="count"]',
      galleryItems: '[data-gallery-item]',
      galleryModal: '.gallery-modal',
      galleryModalClose: '.gallery-modal__close',
      galleryModalBackdrop: '.gallery-modal__backdrop',
      galleryModalImage: '.gallery-modal__image',
      galleryModalTitle: '.gallery-modal__title',
      currentYear: '#current-year'
    },
    classes: {
      isScrolled: 'is-scrolled',
      isOpen: 'is-open',
      isVisible: 'is-visible',
      focusVisible: 'focus-visible'
    },
    breakpoints: {
      mobile: 768
    },
    timing: {
      scrollThrottle: 16,
      animationDelay: 100,
      counterDuration: 2000
    }
  };

  // Utility functions
  const utils = {
    /**
     * Throttle function execution
     */
    throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, offset = 0) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= offset
      );
    },

    /**
     * Get focusable elements within container
     */
    getFocusableElements(container) {
      return container.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
    },

    /**
     * Trap focus within container
     */
    trapFocus(container) {
      const focusableElements = this.getFocusableElements(container);
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      container.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
    },

    /**
     * Animate number from 0 to target
     */
    animateCounter(element, target, duration = 2000) {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
      }, 16);
    },

    /**
     * Set current year
     */
    setCurrentYear() {
      const yearElement = document.querySelector(CONFIG.selectors.currentYear);
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }
    }
  };

  // ==========================================================================
  // HEADER MODULE
  // ==========================================================================

  const HeaderModule = {
    init() {
      this.header = document.querySelector(CONFIG.selectors.header);
      this.mobileToggle = document.querySelector(CONFIG.selectors.mobileToggle);
      this.mobileNav = document.querySelector(CONFIG.selectors.mobileNav);
      // Search toggle and form
      this.searchToggle = document.querySelector(CONFIG.selectors.searchToggle);
      this.searchForm = document.querySelector(CONFIG.selectors.searchForm);
      this.searchInput = document.querySelector(CONFIG.selectors.searchInput);
      
      if (this.header) {
        this.bindEvents();
        this.initStickyHeader();
      }
    },

    bindEvents() {
      // Mobile menu toggle
      if (this.mobileToggle && this.mobileNav) {
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
      }

      // Search toggle
      if (this.searchToggle && this.searchForm) {
        this.searchToggle.addEventListener('click', () => this.toggleSearch());
      }

      // Search form submission
      if (this.searchForm && this.searchInput) {
        const form = this.searchForm.querySelector('form');
        if (form) {
          form.addEventListener('submit', (e) => this.handleSearch(e));
        }
      }

      // Close mobile menu and search on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
          this.closeSearch();
        }
      });

      // Close mobile menu and search on outside click
      document.addEventListener('click', (e) => {
        if (!this.header.contains(e.target)) {
          this.closeMobileMenu();
          this.closeSearch();
        }
      });

      // Global search shortcut (/)
      document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
          if (document.activeElement.tagName !== 'INPUT' && 
              document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            this.openSearch();
          }
        }
      });
    },

    initStickyHeader() {
      const scrollHandler = utils.throttle(() => {
        const scrolled = window.scrollY > 10;
        this.header.classList.toggle(CONFIG.classes.isScrolled, scrolled);
      }, CONFIG.timing.scrollThrottle);

      window.addEventListener('scroll', scrollHandler);
    },

    toggleMobileMenu() {
      const isOpen = this.mobileNav.classList.contains(CONFIG.classes.isOpen);
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    },

    openMobileMenu() {
      this.mobileNav.classList.add(CONFIG.classes.isOpen);
      this.mobileNav.setAttribute('aria-hidden', 'false');
      this.mobileToggle.setAttribute('aria-expanded', 'true');
      
      // Focus first menu item
      const firstLink = this.mobileNav.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }

      // Trap focus within mobile menu
      utils.trapFocus(this.mobileNav);
    },

    closeMobileMenu() {
      this.mobileNav.classList.remove(CONFIG.classes.isOpen);
      this.mobileNav.setAttribute('aria-hidden', 'true');
      this.mobileToggle.setAttribute('aria-expanded', 'false');
    },

    toggleSearch() {
      const isOpen = this.searchForm.classList.contains(CONFIG.classes.isOpen);
      
      if (isOpen) {
        this.closeSearch();
      } else {
        this.openSearch();
      }
    },

    openSearch() {
      this.searchForm.classList.add(CONFIG.classes.isOpen);
      this.searchForm.setAttribute('aria-hidden', 'false');
      this.searchInput.focus();
    },

    closeSearch() {
      this.searchForm.classList.remove(CONFIG.classes.isOpen);
      this.searchForm.setAttribute('aria-hidden', 'true');
    },

    handleSearch(e) {
      e.preventDefault();
      const searchTerm = this.searchInput.value.trim();
      
      if (searchTerm) {
        // Aquí puedes implementar la lógica de búsqueda
        console.log('Searching for:', searchTerm);
        
        // Ejemplo: redirigir a una página de resultados
        // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        
        // O mostrar resultados en tiempo real
        this.performSearch(searchTerm);
        
        // Cerrar la búsqueda después de buscar
        this.closeSearch();
      }
    },

    performSearch(searchTerm) {
      // Implementar la lógica de búsqueda aquí
      // Por ejemplo, filtrar contenido de la página o hacer una petición AJAX
      console.log('Performing search for:', searchTerm);
    }
  };

  // ==========================================================================
  // SCROLL VIDEO MODULE
  // ==========================================================================

  const ScrollVideoModule = {
    init() {
      this.video = document.getElementById('conocenos-video');
      this.section = document.querySelector('.news');
      this.hasPlayedOnce = false;
      
      if (this.video && this.section) {
        this.setupIntersectionObserver();
        this.setupVideoEvents();
      }
    },

    setupVideoEvents() {
      // Evento cuando el video termina de reproducirse
      this.video.addEventListener('ended', () => {
        console.log('Video Conócenos finished playing');
      });

      // Evento cuando el video se pausa manualmente
      this.video.addEventListener('pause', () => {
        if (!this.video.ended) {
          console.log('Video Conócenos paused by user');
        }
      });
    },

    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '-10% 0px -10% 0px', // Se activa cuando está más centrado en la pantalla
        threshold: [0.3, 0.7] // Múltiples thresholds para mejor control
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // La sección está visible
            if (entry.intersectionRatio >= 0.5) {
              this.playVideo();
            }
          } else {
            // La sección no está visible, pausar si está reproduciéndose
            if (this.video && !this.video.paused && !this.video.ended) {
              this.pauseVideo();
            }
          }
        });
      }, options);

      this.observer.observe(this.section);
    },

    playVideo() {
      if (this.video && this.video.paused) {
        // Si es la primera vez o si el usuario no ha interactuado manualmente
        this.video.currentTime = 0;
        const playPromise = this.video.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('Video Conócenos playing on scroll intersection');
            this.hasPlayedOnce = true;
          }).catch((error) => {
            console.log('Auto-play prevented by browser for Conócenos video:', error);
            // Si auto-play falla, mostrar controles para que el usuario pueda reproducir manualmente
            this.video.controls = true;
          });
        }
      }
    },

    pauseVideo() {
      if (this.video && !this.video.paused) {
        this.video.pause();
        console.log('Video Conócenos paused - section out of view');
      }
    }
  };

  // ==========================================================================
  // CAROUSEL MODULE
  // ==========================================================================

  const CarouselModule = {
    init() {
      this.carousel = document.querySelector('[data-carousel]');
      this.slides = document.querySelectorAll('.hero__slide');
      this.prevBtn = document.querySelector('[data-carousel-prev]');
      this.nextBtn = document.querySelector('[data-carousel-next]');
      this.indicators = document.querySelectorAll('.hero__indicator');
      this.videos = document.querySelectorAll('.hero__bg-video');
      
      this.currentSlide = 0;
      this.isAutoPlaying = true;
      this.autoPlayInterval = null;
      this.hasPageLoaded = false;
      
      if (this.carousel && this.slides.length > 0) {
        this.setupVideos();
        this.bindEvents();
        this.startAutoPlay();
        // Play only the first video on page load
        setTimeout(() => {
          this.playInitialVideo();
          this.hasPageLoaded = true;
        }, 1000);
      }
    },

    setupVideos() {
      this.videos.forEach((video, index) => {
        // Ensure video is ready to play
        video.addEventListener('loadeddata', () => {
          // Only auto-play first video on page load, others only when manually navigated
          if (index === 0 && !this.hasPageLoaded) {
            this.playVideoSafely(video, index);
          }
        });

        video.addEventListener('canplay', () => {
          // Only auto-play first video on page load, others only when manually navigated
          if (index === 0 && !this.hasPageLoaded) {
            this.playVideoSafely(video, index);
          }
        });
      });
    },

    playInitialVideo() {
      // Only play the first video (index 0) on page load
      const firstVideo = this.videos[0];
      if (firstVideo && this.currentSlide === 0) {
        this.playVideoSafely(firstVideo, 0);
      }
    },

    playVideoSafely(video, slideIndex) {
      if (video && this.currentSlide === slideIndex) {
        video.currentTime = 0;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log(`Video ${slideIndex} playing successfully`);
          }).catch((error) => {
            console.log(`Auto-play prevented by browser for video ${slideIndex}:`, error);
            // Show video controls to allow manual play
            video.controls = true;
          });
        }
      }
    },

    bindEvents() {
      // Navigation buttons
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
      }
      
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
      }

      // Indicators
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => this.goToSlide(index));
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.target.closest('.hero')) {
          switch (e.key) {
            case 'ArrowLeft':
              e.preventDefault();
              this.previousSlide();
              break;
            case 'ArrowRight':
              e.preventDefault();
              this.nextSlide();
              break;
          }
        }
      });

      // Pause auto-play on hover
      this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
      this.carousel.addEventListener('mouseleave', () => this.resumeAutoPlay());

      // Pause auto-play on focus
      this.carousel.addEventListener('focusin', () => this.pauseAutoPlay());
      this.carousel.addEventListener('focusout', () => this.resumeAutoPlay());

      // Touch/swipe support
      this.setupTouchEvents();
    },

    setupTouchEvents() {
      let startX = 0;
      let endX = 0;

      this.carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      this.carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        this.handleSwipe(startX, endX);
      }, { passive: true });
    },

    handleSwipe(startX, endX) {
      const threshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    },

    goToSlide(index) {
      if (index === this.currentSlide) return;

      this.pauseAutoPlay();
      
      // Remove active states
      this.slides[this.currentSlide].classList.remove('hero__slide--active');
      this.indicators[this.currentSlide].classList.remove('hero__indicator--active');
      this.indicators[this.currentSlide].setAttribute('aria-selected', 'false');

      // Determine direction for animation
      const direction = index > this.currentSlide ? 'next' : 'prev';
      
      // Add transition classes
      if (direction === 'next') {
        this.slides[this.currentSlide].classList.add('hero__slide--prev');
      }

      this.currentSlide = index;

      // Add active states
      this.slides[this.currentSlide].classList.add('hero__slide--active');
      this.indicators[this.currentSlide].classList.add('hero__indicator--active');
      this.indicators[this.currentSlide].setAttribute('aria-selected', 'true');

      // Clean up transition classes after animation
      setTimeout(() => {
        this.slides.forEach(slide => {
          slide.classList.remove('hero__slide--prev');
        });
      }, 800);

      // Handle video for current slide - slight delay to ensure slide is active
      setTimeout(() => {
        this.handleVideoSlide();
      }, 100);
      
      this.resumeAutoPlay();
    },

    nextSlide() {
      const nextIndex = (this.currentSlide + 1) % this.slides.length;
      this.goToSlide(nextIndex);
    },

    previousSlide() {
      const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prevIndex);
    },

    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        if (this.isAutoPlaying) {
          // If current slide has video and it's playing, wait a bit longer
          const currentVideo = this.videos[this.currentSlide];
          if (currentVideo && !currentVideo.paused) {
            return; // Skip this interval, let video play
          }
          this.nextSlide();
        }
      }, 5000); // 5 seconds
    },

    pauseAutoPlay() {
      this.isAutoPlaying = false;
    },

    resumeAutoPlay() {
      this.isAutoPlaying = true;
    },

    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
      this.isAutoPlaying = false;
    },

    handleVideoSlide() {
      // Pause all videos first
      this.videos.forEach((video) => {
        video.pause();
        video.controls = false;
      });

      // Only play video if page has loaded and user is navigating manually
      if (this.hasPageLoaded) {
        const currentVideo = this.videos[this.currentSlide];
        if (currentVideo) {
          this.playVideoSafely(currentVideo, this.currentSlide);
        }
      }
    }
  };

  // ==========================================================================
  // ANIMATIONS MODULE
  // ==========================================================================

  const AnimationsModule = {
    init() {
      this.animatedElements = document.querySelectorAll(CONFIG.selectors.animatedElements);
      this.counterElements = document.querySelectorAll(CONFIG.selectors.counterElements);
      this.processedCounters = new Set();
      
      if (this.animatedElements.length > 0) {
        this.initIntersectionObserver();
      }
    },

    initIntersectionObserver() {
      const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
          }
        });
      }, options);

      this.animatedElements.forEach(element => {
        this.observer.observe(element);
      });
    },

    animateElement(element) {
      // Apply delay if specified
      const delay = element.dataset.delay || 0;
      
      setTimeout(() => {
        element.classList.add(CONFIG.classes.isVisible);
        
        // If it's a counter element, animate the number
        if (element.hasAttribute('data-animate') && 
            element.getAttribute('data-animate') === 'count' &&
            !this.processedCounters.has(element)) {
          this.animateCounter(element);
          this.processedCounters.add(element);
        }
      }, delay);

      // Stop observing this element
      this.observer.unobserve(element);
    },

    animateCounter(container) {
      const numberElement = container.querySelector('.stats__number');
      if (!numberElement) return;

      const target = parseInt(numberElement.dataset.target);
      if (isNaN(target)) return;

      utils.animateCounter(numberElement, target, CONFIG.timing.counterDuration);
    }
  };

  // ==========================================================================
  // GALLERY MODULE
  // ==========================================================================

  const GalleryModule = {
    init() {
      this.galleryItems = document.querySelectorAll(CONFIG.selectors.galleryItems);
      this.modal = document.querySelector(CONFIG.selectors.galleryModal);
      this.modalClose = document.querySelector(CONFIG.selectors.galleryModalClose);
      this.modalBackdrop = document.querySelector(CONFIG.selectors.galleryModalBackdrop);
      this.modalImage = document.querySelector(CONFIG.selectors.galleryModalImage);
      this.modalTitle = document.querySelector(CONFIG.selectors.galleryModalTitle);
      
      if (this.galleryItems.length > 0 && this.modal) {
        this.bindEvents();
      }
    },

    bindEvents() {
      // Gallery item clicks
      this.galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => this.openModal(index));
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.openModal(index);
          }
        });
      });

      // Modal close events
      if (this.modalClose) {
        this.modalClose.addEventListener('click', () => this.closeModal());
      }

      if (this.modalBackdrop) {
        this.modalBackdrop.addEventListener('click', () => this.closeModal());
      }

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (this.modal.classList.contains(CONFIG.classes.isOpen)) {
          switch (e.key) {
            case 'Escape':
              this.closeModal();
              break;
            case 'ArrowLeft':
              this.previousImage();
              break;
            case 'ArrowRight':
              this.nextImage();
              break;
          }
        }
      });
    },

    openModal(index) {
      this.currentIndex = index;
      this.showImage(index);
      
      this.modal.classList.add(CONFIG.classes.isOpen);
      this.modal.setAttribute('aria-hidden', 'false');
      
      // Focus the close button
      if (this.modalClose) {
        this.modalClose.focus();
      }
      
      // Trap focus within modal
      utils.trapFocus(this.modal);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      this.modal.classList.remove(CONFIG.classes.isOpen);
      this.modal.setAttribute('aria-hidden', 'true');
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Return focus to the gallery item that opened the modal
      if (this.galleryItems[this.currentIndex]) {
        this.galleryItems[this.currentIndex].focus();
      }
    },

    showImage(index) {
      const item = this.galleryItems[index];
      if (!item) return;

      const img = item.querySelector('img');
      if (!img) return;

      this.modalImage.src = img.src;
      this.modalImage.alt = img.alt;
      
      if (this.modalTitle) {
        this.modalTitle.textContent = img.alt;
      }
    },

    previousImage() {
      this.currentIndex = this.currentIndex > 0 ? 
        this.currentIndex - 1 : 
        this.galleryItems.length - 1;
      this.showImage(this.currentIndex);
    },

    nextImage() {
      this.currentIndex = this.currentIndex < this.galleryItems.length - 1 ? 
        this.currentIndex + 1 : 
        0;
      this.showImage(this.currentIndex);
    }
  };

  // ==========================================================================
  // ACCESSIBILITY MODULE
  // ==========================================================================

  const AccessibilityModule = {
    init() {
      this.setupFocusVisible();
      this.setupSkipLinks();
      this.setupReducedMotion();
      this.improveButtonAccessibility();
    },

    setupFocusVisible() {
      // Add focus-visible polyfill behavior
      let hadKeyboardEvent = true;
      
      const keyboardThrottledUpdateActiveElement = utils.throttle(() => {
        hadKeyboardEvent = true;
      }, 100);

      document.addEventListener('keydown', keyboardThrottledUpdateActiveElement);
      document.addEventListener('mousedown', () => {
        hadKeyboardEvent = false;
      });

      document.addEventListener('focusin', (e) => {
        if (hadKeyboardEvent) {
          e.target.classList.add(CONFIG.classes.focusVisible);
        }
      });

      document.addEventListener('focusout', (e) => {
        e.target.classList.remove(CONFIG.classes.focusVisible);
      });
    },

    setupSkipLinks() {
      // Create skip link if it doesn't exist
      if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link visually-hidden';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.style.cssText = `
          position: absolute;
          top: -40px;
          left: 6px;
          background: var(--color-rojo);
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 10000;
          transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
          skipLink.style.top = '6px';
          skipLink.classList.remove('visually-hidden');
        });

        skipLink.addEventListener('blur', () => {
          skipLink.style.top = '-40px';
          skipLink.classList.add('visually-hidden');
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
      }
    },

    setupReducedMotion() {
      // Respect user's motion preferences
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0.01ms');
        document.documentElement.style.setProperty('--transition-medium', '0.01ms');
      }
    },

    improveButtonAccessibility() {
      // Ensure all interactive elements have proper ARIA labels
      const interactiveElements = document.querySelectorAll('button, [role="button"], a');
      
      interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && 
            !element.getAttribute('aria-labelledby') &&
            !element.textContent.trim()) {
          console.warn('Interactive element without accessible name:', element);
        }
      });
    }
  };

  // ==========================================================================
  // PERFORMANCE MODULE
  // ==========================================================================

  const PerformanceModule = {
    init() {
      this.lazyLoadImages();
      this.preloadCriticalResources();
    },

    lazyLoadImages() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    },

    preloadCriticalResources() {
      // Preload hero image
      const heroImage = document.querySelector('.hero__bg-image');
      if (heroImage && heroImage.src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = heroImage.src;
        document.head.appendChild(link);
      }
    }
  };

  // ==========================================================================
  // VIDEO MODULE (for news section)
  // ==========================================================================

  const VideoModule = {
    init() {
      this.playButtons = document.querySelectorAll('.news__play-btn');
      this.bindEvents();
    },

    bindEvents() {
      this.playButtons.forEach(button => {
        button.addEventListener('click', this.handleVideoPlay.bind(this));
        button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleVideoPlay(e);
          }
        });
      });
    },

    handleVideoPlay(e) {
      // Placeholder for video functionality
      // In a real implementation, this would open a video modal or navigate to video page
      console.log('Video play requested');
      
      // Add visual feedback
      const button = e.currentTarget;
      button.style.transform = 'translate(-50%, -50%) scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'translate(-50%, -50%) scale(1.1)';
      }, 150);
    }
  };

  // ==========================================================================
  // MAIN APPLICATION
  // ==========================================================================

  const App = {
    init() {
      // Wait for DOM to be fully loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.start());
      } else {
        this.start();
      }
    },

    start() {
      try {
        // Initialize all modules
        HeaderModule.init();
        CarouselModule.init();
        ScrollVideoModule.init();
        AnimationsModule.init();
        GalleryModule.init();
        AccessibilityModule.init();
        PerformanceModule.init();
        VideoModule.init();
        
        // Set current year
        utils.setCurrentYear();
        
        // Log successful initialization
        console.log('✅ Universidad Nacional - Posgrados website initialized successfully');
        
      } catch (error) {
        console.error('❌ Error initializing website:', error);
      }
    }
  };

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================

  // Start the application
  App.init();

  // Expose modules for debugging (only in development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.UniversidadApp = {
      HeaderModule,
      AnimationsModule,
      GalleryModule,
      AccessibilityModule,
      PerformanceModule,
      VideoModule,
      utils,
      CONFIG
    };
  }

})();

/**
 * Additional utility functions for future enhancements
 */

// Service Worker registration (future PWA support)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment when service worker is implemented
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered:', registration))
    //   .catch(registrationError => console.log('SW registration failed:', registrationError));
        });
    }

    // Carrusel de sitios de interés con navegación individual por tarjeta
    function initInterestSitesCarousel() {
        const carousel = document.querySelector('[data-carousel="interest-sites"]');
        if (!carousel) return;

        const track = carousel.querySelector('.interest-sites__track');
        const cards = track.querySelectorAll('.interest-sites__card');
        const dots = document.querySelectorAll('.interest-sites__dot');
        const prevBtn = document.querySelector('[data-carousel-prev="interest-sites"]');
        const nextBtn = document.querySelector('[data-carousel-next="interest-sites"]');

        const cardsPerView = 3;
        const totalCards = cards.length;
        const originalCards = 8; // Las primeras 8 tarjetas son originales
        let currentIndex = 0; // Índice de la tarjeta que está en la posición izquierda
        let isTransitioning = false;

        console.log('Carrusel inicializado:', { totalCards, originalCards, cardsPerView });

        // Configurar el ancho de las tarjetas dinámicamente
        function setupCardWidths() {
            const containerWidth = carousel.offsetWidth;
            const cardWidth = (containerWidth - (1.5 * 16 * 2)) / cardsPerView; // Restar gaps
            
            cards.forEach(card => {
                card.style.minWidth = `${cardWidth}px`;
                card.style.flex = `0 0 ${cardWidth}px`;
                card.style.width = `${cardWidth}px`;
            });
        }

        function updateCarousel(animate = true) {
            if (animate) {
                track.style.transition = 'transform 0.5s ease-in-out';
            } else {
                track.style.transition = 'none';
            }
            
            // Calcular el desplazamiento basado en el ancho real de las tarjetas + gap
            const cardWidth = cards[0].offsetWidth;
            const gap = 24; // 1.5rem = 24px
            const slideWidth = cardWidth + gap;
            const translateX = -(currentIndex * slideWidth);
            
            track.style.transform = `translateX(${translateX}px)`;

            // Actualizar dots: cada dot representa una tarjeta individual
            // El dot activo corresponde a la tarjeta que está en la posición izquierda
            const activeDotIndex = currentIndex % originalCards;
            dots.forEach((dot, index) => {
                dot.classList.toggle('interest-sites__dot--active', index === activeDotIndex);
            });

            console.log('Carrusel actualizado:', { 
                currentIndex, 
                translateX: `${translateX}px`, 
                activeDotIndex,
                cardWidth,
                slideWidth
            });
        }

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex++;
            updateCarousel(true);

            // Loop infinito: saltar al inicio cuando llegamos al final
            if (currentIndex >= totalCards - cardsPerView + 1) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateCarousel(false);
                    setTimeout(() => {
                        isTransitioning = false;
                    }, 50);
                }, 500);
            } else {
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;

            if (currentIndex <= 0) {
                // Saltar al final
                currentIndex = totalCards - cardsPerView;
                updateCarousel(false);
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            } else {
                currentIndex--;
                updateCarousel(true);
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        }

        function goToSlide(targetDotIndex) {
            if (isTransitioning) return;
            isTransitioning = true;

            // Cada dot representa una tarjeta específica
            // Encontrar la mejor posición para mostrar esa tarjeta en el lado izquierdo
            let targetIndex = targetDotIndex;
            
            // Si la tarjeta objetivo está cerca del final y no se puede mostrar 3 completas,
            // usar la versión duplicada al inicio
            if (targetIndex > originalCards - cardsPerView) {
                // Buscar la tarjeta equivalente en las duplicadas
                const equivalentIndex = targetIndex - originalCards;
                if (equivalentIndex >= 0) {
                    targetIndex = originalCards + equivalentIndex;
                }
            }
            
            currentIndex = targetIndex;
            updateCarousel(true);
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        // Navegación con dots - cada dot representa una tarjeta individual
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        });

        // Inicializar
        setupCardWidths();
        updateCarousel(false);

        // Recalcular en resize
        window.addEventListener('resize', () => {
            setupCardWidths();
            updateCarousel(false);
        });

        // Auto-play opcional (descomenta para activar)
        /*
        let autoplayInterval = setInterval(nextSlide, 4000);
        
        // Pausar autoplay en hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 4000);
        });
        */
    }

    // Inicializar carrusel
    initInterestSitesCarousel();// Analytics placeholder (Google Analytics, etc.)
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Error tracking
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // Send to error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Send to error tracking service
});

/**
 * Browser compatibility checks
 */
function checkBrowserSupport() {
  const unsupported = [];
  
  if (!window.IntersectionObserver) {
    unsupported.push('IntersectionObserver');
  }
  
  if (!window.fetch) {
    unsupported.push('Fetch API');
  }
  
  if (!window.Promise) {
    unsupported.push('Promises');
  }
  
  if (unsupported.length > 0) {
    console.warn('Unsupported features detected:', unsupported.join(', '));
    // Load polyfills or show fallback content
  }
}

  // ==========================================================================
  // DISCOVER MODULE (Conoce +)
  // ==========================================================================
  
  /**
   * Discover Module - Maneja la funcionalidad de la sección UNL Conoce +
   */
  const DiscoverModule = {
    init() {
      this.setupVideoControls();
      this.setupNewsInteractions();
      this.setupInterestSitesInteractions();
      this.setupCarouselIndicators();
    },

    /**
     * Configura los controles del video
     */
    setupVideoControls() {
      const video = document.querySelector('.discover__video');
      const playBtn = document.querySelector('.discover__play-btn');
      const overlay = document.querySelector('.discover__video-overlay');
      
      if (!video || !playBtn || !overlay) return;

      // Configurar video
      video.addEventListener('loadedmetadata', () => {
        video.muted = true;
        // No autoplay automático, solo cuando el usuario haga clic
      });

      // Control del botón de play
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleVideo(video, overlay);
      });

      // Click en el video para pausar/reproducir
      video.addEventListener('click', () => {
        this.toggleVideo(video, overlay);
      });

      // Eventos del video para mostrar/ocultar overlay
      video.addEventListener('play', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      });

      video.addEventListener('pause', () => {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
      });

      video.addEventListener('ended', () => {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
      });

      // Efectos de hover en el contenedor
      const container = document.querySelector('.discover__video-container');
      if (container) {
        container.addEventListener('mouseenter', () => {
          if (video.paused) {
            overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)';
          }
        });

        container.addEventListener('mouseleave', () => {
          if (video.paused) {
            overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)';
          }
        });
      }
    },

    /**
     * Alterna entre play y pause del video
     */
    toggleVideo(video, overlay) {
      if (video.paused) {
        video.play().catch(console.log);
      } else {
        video.pause();
      }
    },

    /**
     * Configura las interacciones de las noticias
     */
    setupNewsInteractions() {
      const newsItems = document.querySelectorAll('.discover__news-item');
      
      newsItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          const title = item.querySelector('.discover__news-title')?.textContent;
          const category = item.querySelector('.discover__news-badge')?.textContent;
          
          console.log(`Navegando a noticia: ${category} - ${title}`);
          this.showNewsModal(title, category, index);
        });

        // Efectos de hover mejorados
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateY(-3px)';
        });

        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0)';
        });
      });
    },

    /**
     * Configura las interacciones de los sitios de interés
     */
    setupInterestSitesInteractions() {
      const siteCards = document.querySelectorAll('.interest-sites__link');
      
      siteCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          
          const cardElement = card.closest('.interest-sites__card');
          const names = cardElement.querySelectorAll('.interest-sites__name');
          const title = Array.from(names).map(name => name.textContent).join(' ');
          
          console.log(`Accediendo a sitio de interés: ${title}`);
          this.showInterestSiteModal(title);
        });

        // Efectos de hover para las tarjetas
        const cardElement = card.closest('.interest-sites__card');
        const arrow = cardElement.querySelector('.interest-sites__arrow');
        
        cardElement.addEventListener('mouseenter', () => {
          if (arrow) {
            arrow.style.transform = 'scale(1.1)';
          }
        });

        cardElement.addEventListener('mouseleave', () => {
          if (arrow) {
            arrow.style.transform = 'scale(1)';
          }
        });
      });
    },

    /**
     * Configura los indicadores del carrusel
     */
    setupCarouselIndicators() {
      const dots = document.querySelectorAll('.interest-sites__dot');
      const cards = document.querySelectorAll('.interest-sites__card');
      const prevButton = document.querySelector('.interest-sites__nav-arrow--prev');
      const nextButton = document.querySelector('.interest-sites__nav-arrow--next');
      
      let currentIndex = 0;

      // Función para mostrar una tarjeta específica
      const showCard = (index) => {
        cards.forEach((card, i) => {
          card.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
          dot.classList.toggle('interest-sites__dot--active', i === index);
        });
        
        currentIndex = index;
        console.log(`Navegando a slide ${index + 1}`);
      };

      // Función para navegar a la siguiente tarjeta
      const nextCard = () => {
        const nextIndex = (currentIndex + 1) % cards.length;
        showCard(nextIndex);
      };

      // Función para navegar a la tarjeta anterior
      const prevCard = () => {
        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(prevIndex);
      };

      // Event listeners para los dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showCard(index);
        });
      });

      // Event listeners para las flechas de navegación
      if (prevButton) {
        prevButton.addEventListener('click', prevCard);
      }

      if (nextButton) {
        nextButton.addEventListener('click', nextCard);
      }

      // Mostrar la primera tarjeta por defecto
      if (cards.length > 0) {
        showCard(0);
      }
    },

    /**
     * Muestra un modal para una noticia
     */
    showNewsModal(title, category, index) {
      const modal = document.createElement('div');
      modal.className = 'discover-modal';
      modal.innerHTML = `
        <div class="discover-modal__content">
          <div class="discover-modal__header">
            <span class="discover-modal__category">${category}</span>
            <button class="discover-modal__close" aria-label="Cerrar modal">&times;</button>
          </div>
          <h2 class="discover-modal__title">${title}</h2>
          <p class="discover-modal__text">
            Esta funcionalidad permitiría ver el contenido completo de la noticia. 
            En el sistema real, aquí se mostraría el artículo completo con imágenes, 
            videos y contenido multimedia relacionado.
          </p>
          <div class="discover-modal__actions">
            <button class="discover-modal__btn discover-modal__btn--primary">Leer completo</button>
            <button class="discover-modal__btn discover-modal__btn--secondary">Compartir</button>
          </div>
        </div>
      `;

      this.showModal(modal);
    },

    /**
     * Muestra un modal para un sitio de interés
     */
    showInterestSiteModal(title) {
      const modal = document.createElement('div');
      modal.className = 'discover-modal';
      modal.innerHTML = `
        <div class="discover-modal__content">
          <div class="discover-modal__header">
            <span class="discover-modal__category">Sitio de Interés</span>
            <button class="discover-modal__close" aria-label="Cerrar modal">&times;</button>
          </div>
          <h2 class="discover-modal__title">${title}</h2>
          <p class="discover-modal__text">
            Estás a punto de acceder al sitio oficial de ${title} de la Universidad Nacional de Loja.
          </p>
          <p class="discover-modal__text">
            En el sistema real, este enlace te redirigiría directamente al portal correspondiente.
          </p>
          <div class="discover-modal__actions">
            <button class="discover-modal__btn discover-modal__btn--primary">Ir al sitio</button>
            <button class="discover-modal__btn discover-modal__btn--secondary">Más información</button>
          </div>
        </div>
      `;

      this.showModal(modal);
    },

    /**
     * Función genérica para mostrar modales
     */
    showModal(modal) {
      // Estilos del modal
      const style = document.createElement('style');
      style.textContent = `
        .discover-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
          animation: discoverModalFadeIn 0.3s ease;
        }
        .discover-modal__content {
          background: white;
          max-width: 600px;
          width: 100%;
          padding: 2.5rem;
          border-radius: 12px;
          position: relative;
          animation: discoverModalSlideUp 0.3s ease;
        }
        .discover-modal__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .discover-modal__category {
          background: var(--color-rojo);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .discover-modal__close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .discover-modal__close:hover {
          background: var(--color-gris-100);
        }
        .discover-modal__title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--color-gris-900);
          line-height: 1.3;
        }
        .discover-modal__text {
          color: var(--color-gris-700);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .discover-modal__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .discover-modal__btn {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        .discover-modal__btn--primary {
          background: var(--color-rojo);
          color: white;
        }
        .discover-modal__btn--primary:hover {
          background: #a01018;
          transform: translateY(-1px);
        }
        .discover-modal__btn--secondary {
          background: var(--color-gris-100);
          color: var(--color-gris-700);
          border: 1px solid var(--color-gris-300);
        }
        .discover-modal__btn--secondary:hover {
          background: var(--color-gris-200);
        }
        @keyframes discoverModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes discoverModalSlideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 480px) {
          .discover-modal {
            padding: 1rem;
          }
          .discover-modal__content {
            padding: 2rem;
          }
          .discover-modal__actions {
            flex-direction: column;
          }
          .discover-modal__btn {
            width: 100%;
          }
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(modal);

      // Cerrar modal
      const closeBtn = modal.querySelector('.discover-modal__close');
      const closeModal = () => {
        modal.style.animation = 'discoverModalFadeIn 0.3s ease reverse';
        setTimeout(() => {
          if (document.body.contains(modal)) {
            document.body.removeChild(modal);
          }
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        }, 300);
      };

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      // Cerrar con ESC
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEsc);
        }
      };
      document.addEventListener('keydown', handleEsc);
    }
  };

/**
 * ==========================================================================
 * OFFER MODULE - Manejo de las animaciones de Oferta Académica
 * ==========================================================================
 */
const OfferModule = {
  init() {
    this.setupHoverAnimations();
    this.setupModalAnimations();
  },

  /**
   * Configura las animaciones hover (crecimiento de imagen)
   */
  setupHoverAnimations() {
    const hoverBlocks = document.querySelectorAll('.offer__block--hover');
    
    hoverBlocks.forEach(block => {
      block.addEventListener('mouseenter', () => {
        // Resetear otros bloques que puedan estar expandidos
        this.resetAllHoverBlocks();
        
        // Expandir el bloque actual
        block.classList.add('expanded');
      });

      block.addEventListener('mouseleave', () => {
        // Contraer el bloque
        block.classList.remove('expanded');
      });

      // Manejar clic para dispositivos táctiles
      block.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.innerWidth <= 768) {
          // En móviles, toggle del estado expandido
          if (block.classList.contains('expanded')) {
            block.classList.remove('expanded');
          } else {
            this.resetAllHoverBlocks();
            block.classList.add('expanded');
          }
        }
      });
    });

    // Cerrar al hacer clic fuera en móviles
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.offer__block--hover') && window.innerWidth <= 768) {
        this.resetAllHoverBlocks();
      }
    });
  },

  /**
   * Resetea todos los bloques hover expandidos
   */
  resetAllHoverBlocks() {
    const expandedBlocks = document.querySelectorAll('.offer__block--hover.expanded');
    expandedBlocks.forEach(block => {
      block.classList.remove('expanded');
    });
  },

  /**
   * Configura las animaciones de modal (click)
   */
  setupModalAnimations() {
    const clickableBlocks = document.querySelectorAll('.offer__block--clickable');
    
    clickableBlocks.forEach(block => {
      block.addEventListener('click', () => {
        const modalType = block.dataset.modal;
        this.showModal(modalType);
      });
    });
  },

  /**
   * Muestra el modal con información específica
   */
  showModal(type) {
    const modalData = this.getModalData(type);
    if (!modalData) return;

    // Crear el modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <img src="${modalData.image}" alt="${modalData.title}">
          <button class="modal-close" aria-label="Cerrar modal">×</button>
        </div>
        <div class="modal-body">
          <h3 class="modal-title">${modalData.title}</h3>
          <p class="modal-description">${modalData.description}</p>
          <div class="modal-details">
            <h4>Carreras disponibles:</h4>
            <p>${modalData.careers}</p>
          </div>
        </div>
      </div>
    `;

    // Agregar al DOM
    document.body.appendChild(modalOverlay);
    
    // Animar entrada
    setTimeout(() => {
      modalOverlay.classList.add('active');
    }, 10);

    // Event listeners para cerrar
    const closeBtn = modalOverlay.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => this.closeModal(modalOverlay));
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        this.closeModal(modalOverlay);
      }
    });

    // Cerrar con ESC
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        this.closeModal(modalOverlay);
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  },

  /**
   * Cierra el modal con animación
   */
  closeModal(modalOverlay) {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      if (modalOverlay.parentNode) {
        modalOverlay.parentNode.removeChild(modalOverlay);
      }
    }, 300);
  },

  /**
   * Obtiene los datos del modal según el tipo
   */
  getModalData(type) {
    const modalData = {
      agropecuaria: {
        title: 'Área Agropecuaria y de Recursos Naturales Renovables',
        image: './assets/img/agropecuaria.webp',
        description: 'Formación integral en ciencias agropecuarias y manejo sostenible de recursos naturales renovables. Nuestros programas están diseñados para formar profesionales comprometidos con el desarrollo rural y la producción sustentable.',
        careers: 'Ingeniería Agronómica, Medicina Veterinaria y Zootecnia, Ingeniería Forestal, Ingeniería en Manejo y Conservación del Medio Ambiente'
      },
      salud: {
        title: 'Área de la Salud Humana',
        image: './assets/img/salud.webp',
        description: 'Programas académicos dedicados a la formación de profesionales de la salud con excelencia científica, ética médica y compromiso social para mejorar la calidad de vida de la población.',
        careers: 'Medicina Humana, Enfermería, Odontología, Laboratorio Clínico, Psicología Clínica'
      },
      energia: {
        title: 'Área de la Energía, las Industrias y los Recursos Naturales no Renovables',
        image: './assets/img/energianorenovable.webp',
        description: 'Carreras orientadas al desarrollo energético, industrial y manejo responsable de recursos naturales no renovables para el progreso tecnológico y económico del país.',
        careers: 'Ingeniería en Sistemas, Ingeniería Civil, Ingeniería Industrial, Ingeniería Electrónica, Ingeniería en Computación'
      },
      arte: {
        title: 'Área de la Educación, el Arte y la Comunicación',
        image: './assets/img/arte.webp',
        description: 'Formación en educación, artes y comunicación para el desarrollo cultural, educativo y comunicacional de la sociedad, promoviendo la creatividad y el pensamiento crítico.',
        careers: 'Comunicación Social, Artes Plásticas, Educación Inicial, Educación Básica, Pedagogía de los Idiomas Nacionales y Extranjeros'
      },
      juridica: {
        title: 'Área Jurídica, Social y Administrativa',
        image: './assets/img/juridica.webp',
        description: 'Carreras enfocadas en ciencias jurídicas, sociales y administrativas para formar profesionales íntegros que contribuyan al desarrollo institucional y la justicia social.',
        careers: 'Derecho, Administración de Empresas, Economía, Contabilidad y Auditoría, Finanzas, Trabajo Social'
      },
      distancia: {
        title: 'Modalidad de Estudios a Distancia',
        image: './assets/img/distancia.webp',
        description: 'Modalidad educativa flexible que permite estudiar desde cualquier lugar manteniendo la calidad académica de la UNL, con metodologías innovadoras y tecnología de vanguardia.',
        careers: 'Administración de Empresas, Contabilidad y Auditoría, Derecho, Psicología, Educación Básica'
      }
    };

  return modalData[type] || null;
}
};

// ==========================================================================
// FACULTY ANIMATIONS MODULE - VIDEO STYLE ANIMATION
// ==========================================================================
const FacultyAnimationsModule = {
  lastScrollY: 0,
  isScrollingDown: false,
  animationStarted: false,
  
  init() {
    console.log('🎨 Initializing Faculty Animations Module - Video Style');
    this.setupScrollDetection();
    this.setupMobileAnimations();
  },

  setupScrollDetection() {
    // Detectar dirección del scroll
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      this.isScrollingDown = currentScrollY > this.lastScrollY;
      this.lastScrollY = currentScrollY;
    }, { passive: true });
  },

  setupMobileAnimations() {
    // Verificar si estamos en una pantalla móvil
    const isMobile = () => window.innerWidth <= 768;
    
    if (!isMobile()) return;

    const facultyBlocks = document.querySelectorAll('.offer__block--hover');
    
    if (facultyBlocks.length === 0) {
      console.warn('⚠️ No faculty blocks found');
      return;
    }

    // Configurar Intersection Observer para toda la sección
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && 
            this.isScrollingDown && 
            !this.animationStarted) {
          
          console.log('🎬 Starting video-style faculty animation sequence');
          this.animationStarted = true;
          this.startSequentialAnimation(facultyBlocks);
          
          // Dejar de observar la sección
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.3
    });

    // Observar la sección completa
    const facultySection = document.querySelector('.offer--hover');
    if (facultySection) {
      sectionObserver.observe(facultySection);
    }

    // Re-configurar en cambio de tamaño de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!isMobile()) {
          console.log('🖥️ Desktop mode: Faculty animations maintained');
        } else {
          console.log('📱 Mobile mode: Video-style animations active');
        }
      }, 100);
    });

    console.log(`� Video-style faculty animations initialized for ${facultyBlocks.length} blocks`);
  },

  startSequentialAnimation(facultyBlocks) {
    // Animación secuencial como en el video
    facultyBlocks.forEach((block, index) => {
      const facultyName = this.getFacultyName(block);
      
      // Fase 1: Bloque aparece desde abajo
      setTimeout(() => {
        block.classList.add('animate-in');
        block.setAttribute('data-animated', 'true');
        console.log(`🎯 Phase 1 - Block slides up: ${facultyName} (${index + 1}/${facultyBlocks.length})`);
        
        // Fase 2: Imagen aparece (automática con CSS delay)
        setTimeout(() => {
          console.log(`�️ Phase 2 - Image appears: ${facultyName}`);
          
          // Fase 3: Título aparece (automática con CSS delay)
          setTimeout(() => {
            console.log(`� Phase 3 - Title appears: ${facultyName}`);
          }, 600); // Después de que aparece la imagen
          
        }, 300); // Delay de la imagen en CSS
        
      }, index * 250); // 250ms entre cada bloque
    });

    // Log cuando toda la secuencia termine
    const totalDuration = (facultyBlocks.length * 250) + 1500; // 1500ms para la última animación completa
    setTimeout(() => {
      console.log('✅ Video-style animation sequence completed - All faculty blocks are now PERMANENT');
    }, totalDuration);
  },

  getFacultyName(block) {
    // Extraer el nombre de la facultad desde las clases CSS
    const classList = block.className;
    if (classList.includes('agropecuaria')) return 'Agropecuaria';
    if (classList.includes('salud')) return 'Salud';
    if (classList.includes('energia')) return 'Energía';
    if (classList.includes('arte')) return 'Arte y Comunicación';
    if (classList.includes('juridica')) return 'Jurídica';
    if (classList.includes('distancia')) return 'Educación a Distancia';
    return 'Desconocida';
  }
};

checkBrowserSupport();// Initialize all modules
document.addEventListener('DOMContentLoaded', function() {
  try {
    HeaderModule.init();
    ScrollVideoModule.init();
    AnimationsModule.init();
    GalleryModule.init();
    AccessibilityModule.init();
    PerformanceModule.init();
    VideoModule.init();
    CarouselModule.init();
    DiscoverModule.init(); // Initialize discover module
    OfferModule.init(); // Initialize offer module
    FacultyAnimationsModule.init(); // Initialize faculty animations module
    TopsModule.init(); // Initialize tops module
    console.log('🚀 All modules initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing modules:', error);
  }
});

// =================================================================
// MÓDULO DE TOPS - NUEVAS PROPUESTAS
// =================================================================

const TopsModule = {
  init() {
    this.initVerticalIntegrated();
    console.log('📊 Tops Module initialized');
  },

  initVerticalIntegrated() {
    // Inicializar el primer item como activo
    const firstItem = document.querySelector('.top-item[data-top="top1"]');
    if (firstItem) {
      firstItem.classList.add('active');
    }
  }
};

// Datos de contenido para cada top
const topContents = {
  top1: {
    title: "TOP 10",
    subtitle: "Mejores Universidades del Ecuador",
    description: "La Universidad Nacional de Loja se posiciona orgullosamente entre las 10 mejores instituciones de educación superior del Ecuador. Este reconocimiento refleja nuestro compromiso continuo con la excelencia académica, la innovación en la enseñanza y la calidad de nuestros programas educativos.",
    highlights: [
      { icon: "fas fa-graduation-cap", text: "Excelencia Académica" },
      { icon: "fas fa-trophy", text: "Reconocimiento Nacional" },
      { icon: "fas fa-users", text: "Comunidad Estudiantil" }
    ],
    stats: [
      { number: "165+", label: "Años de Historia" },
      { number: "50,000+", label: "Graduados" },
      { number: "15,000+", label: "Estudiantes Actuales" }
    ]
  },
  top2: {
    title: "TOP 2",
    subtitle: "Producción Científica Individual",
    description: "Ocupamos el segundo lugar nacional en producción científica individual, destacando por la calidad y cantidad de investigaciones publicadas en revistas indexadas. Nuestros docentes investigadores contribuyen significativamente al avance del conocimiento en diversas áreas del saber.",
    highlights: [
      { icon: "fas fa-microscope", text: "Investigación Avanzada" },
      { icon: "fas fa-book", text: "Publicaciones Científicas" },
      { icon: "fas fa-award", text: "Reconocimiento Académico" }
    ],
    stats: [
      { number: "500+", label: "Publicaciones Anuales" },
      { number: "200+", label: "Proyectos de Investigación" },
      { number: "150+", label: "Investigadores Activos" }
    ]
  },
  top3: {
    title: "TOP 3",
    subtitle: "Diversificación de Oferta Académica",
    description: "Tercer lugar en diversificación de oferta académica a nivel nacional, con programas innovadores que responden a las necesidades del mercado laboral y el desarrollo social. Ofrecemos una amplia gama de carreras en diferentes modalidades de estudio.",
    highlights: [
      { icon: "fas fa-university", text: "Variedad de Programas" },
      { icon: "fas fa-laptop", text: "Modalidades Flexibles" },
      { icon: "fas fa-globe", text: "Alcance Nacional" }
    ],
    stats: [
      { number: "60+", label: "Carreras de Grado" },
      { number: "40+", label: "Programas de Posgrado" },
      { number: "8", label: "Áreas de Conocimiento" }
    ]
  },
  top4: {
    title: "TOP 4",
    subtitle: "Universidad Pública de Excelencia",
    description: "Cuarta universidad pública de excelencia del Ecuador, comprometida con la educación de calidad y accesible para todos. Mantenemos altos estándares académicos mientras garantizamos el acceso equitativo a la educación superior de calidad.",
    highlights: [
      { icon: "fas fa-balance-scale", text: "Educación Equitativa" },
      { icon: "fas fa-heart", text: "Compromiso Social" },
      { icon: "fas fa-star", text: "Calidad Garantizada" }
    ],
    stats: [
      { number: "100%", label: "Gratuidad" },
      { number: "85%", label: "Empleabilidad" },
      { number: "95%", label: "Satisfacción Estudiantil" }
    ]
  }
};

// Función para seleccionar un top y cambiar el contenido
function selectTop(topId) {
  // Remover clase active de todos los items
  document.querySelectorAll('.top-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Agregar clase active al item seleccionado
  const selectedItem = document.querySelector(`[data-top="${topId}"]`);
  if (selectedItem) {
    selectedItem.classList.add('active');
  }
  
  // Actualizar el contenido
  const content = topContents[topId];
  if (content) {
    updateContent(content);
  }
}

// Función para actualizar el contenido dinámicamente
function updateContent(content) {
  // Agregar animación de salida
  const contentArea = document.querySelector('.tops-content');
  if (contentArea) {
    contentArea.style.opacity = '0';
    contentArea.style.transform = 'translateX(30px)';
    
    setTimeout(() => {
      // Actualizar título y contenido
      const titleElement = document.getElementById('content-title');
      const bodyElement = document.getElementById('content-body');
      
      if (titleElement) titleElement.textContent = content.title;
      
      if (bodyElement) {
        bodyElement.innerHTML = `
          <h3 class="content-animate" data-animate="fade-up">${content.subtitle}</h3>
          <p class="content-animate" data-animate="fade-up" data-delay="100">${content.description}</p>
          
          <div class="content-highlights content-animate" data-animate="fade-up" data-delay="200">
            ${content.highlights.map(highlight => `
              <div class="highlight-item">
                <i class="${highlight.icon}"></i>
                <span>${highlight.text}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="content-stats content-animate" data-animate="fade-up" data-delay="300">
            ${content.stats.map(stat => `
              <div class="stat-item">
                <span class="stat-number">${stat.number}</span>
                <span class="stat-label">${stat.label}</span>
              </div>
            `).join('')}
          </div>
        `;
      }
      
      // Agregar animación de entrada al contenedor
      contentArea.style.opacity = '1';
      contentArea.style.transform = 'translateX(0)';
      
      // Animar los elementos del contenido con delay
      setTimeout(() => {
        animateContentElements();
      }, 100);
    }, 300);
  }
}

// Función para animar los elementos del contenido
function animateContentElements() {
  const contentElements = document.querySelectorAll('.content-animate');
  contentElements.forEach((element, index) => {
    const delay = element.dataset.delay ? parseInt(element.dataset.delay) : index * 100;
    
    setTimeout(() => {
      element.classList.add('animate-in');
    }, delay);
  });
}

// Función para alternar la información de los tops (otras propuestas)
function toggleTopInfo(topId) {
  const infoElement = document.getElementById(topId);
  if (infoElement) {
    const isActive = infoElement.classList.contains('active');
    
    // Cerrar todos los demás elementos activos en la misma sección
    const section = infoElement.closest('.tops-section, .tops-vertical-panel');
    if (section) {
      const allInfoElements = section.querySelectorAll('.top-card__info, .top-hexagon__info, .top-diamond__info, .tops-vertical__info');
      allInfoElements.forEach(el => el.classList.remove('active'));
    }
    
    // Alternar el elemento actual
    if (!isActive) {
      infoElement.classList.add('active');
    }
  }
}

// Función para alternar información vertical específica (versión anterior)
function toggleVerticalInfo(verticalId) {
  const infoElement = document.getElementById(verticalId);
  if (infoElement) {
    const isActive = infoElement.classList.contains('active');
    
    // Cerrar todos los demás elementos activos en el panel vertical
    const panel = document.querySelector('.tops-vertical-panel');
    if (panel) {
      const allInfoElements = panel.querySelectorAll('.tops-vertical__info');
      allInfoElements.forEach(el => el.classList.remove('active'));
    }
    
    // Alternar el elemento actual
    if (!isActive) {
      infoElement.classList.add('active');
    }
  }
}

// Función para alternar el panel vertical completo (versión anterior)
function toggleVerticalPanel() {
  const panel = document.querySelector('.tops-vertical-panel');
  if (panel) {
    const isActive = panel.classList.contains('active');
    panel.classList.toggle('active', !isActive);
    
    // Guardar estado en localStorage
    localStorage.setItem('verticalPanelOpen', !isActive);
    
    // Rotar el icono del botón
    const icon = panel.querySelector('.tops-vertical__toggle i');
    if (icon) {
      icon.style.transform = !isActive ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  }
}

// Cargar estado del panel vertical al inicializar (versión anterior)
document.addEventListener('DOMContentLoaded', function() {
  const panel = document.querySelector('.tops-vertical-panel');
  const savedState = localStorage.getItem('verticalPanelOpen');
  
  if (panel && savedState === 'true') {
    panel.classList.add('active');
    const icon = panel.querySelector('.tops-vertical__toggle i');
    if (icon) {
      icon.style.transform = 'rotate(180deg)';
    }
  }
});

// Efectos de animación al hacer scroll para las nuevas secciones de tops
function observeTopsElements() {
  const topsElements = document.querySelectorAll('.top-card--circular, .top-hexagon, .top-diamond, .top-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  topsElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// Inicializar observador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', observeTopsElements);
