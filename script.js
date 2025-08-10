// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileServicesBtn = document.querySelector('.mobile-services-btn');
const mobileServicesContent = document.querySelector('.mobile-services-content');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('translate-x-full');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking outside
mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
    }
});

// Mobile services dropdown
mobileServicesBtn.addEventListener('click', () => {
    mobileServicesContent.classList.toggle('hidden');
    const arrow = mobileServicesBtn.querySelector('svg');
    arrow.classList.toggle('rotate-180');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu-overlay a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking on mobile services dropdown
mobileServicesBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing when clicking dropdown button
});

// Close mobile menu when clicking on mobile services content
mobileServicesContent.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing when clicking dropdown content
});

// Header scroll effect with improved performance
const header = document.getElementById('header');
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Responsive hero section with improved animations
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroTitle = document.querySelector('.hero-title');
const heroDescription = document.querySelector('.hero-description');
const heroActions = document.querySelector('.hero-actions');
const trustedBy = document.querySelector('.trusted-by');

// Hero animations with responsive timing
function animateHeroElements() {
    const elements = [heroTitle, heroDescription, heroActions, trustedBy];
    
    elements.forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
    
    // Reset hero content opacity for scroll animations
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
}

// Smooth scroll-based animations (removed problematic parallax)
function updateScrollAnimations() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    if (hero && heroContent) {
        // Only apply subtle opacity changes, no transform to prevent jittering
        const opacity = Math.max(0.3, 1 - (scrolled / windowHeight) * 0.7);
        heroContent.style.opacity = opacity;
    }
}

// Throttled scroll handler for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
        updateScrollAnimations();
        scrollTimeout = null;
    }, 16); // ~60fps
});

// Responsive hero title sizing
function updateHeroTitleSize() {
    if (heroTitle) {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
            heroTitle.classList.remove('text-6xl', 'md:text-8xl');
            heroTitle.classList.add('text-4xl', 'md:text-6xl');
        } else if (screenWidth < 1024) {
            heroTitle.classList.remove('text-4xl', 'md:text-6xl');
            heroTitle.classList.add('text-6xl', 'md:text-8xl');
        } else {
            heroTitle.classList.remove('text-4xl', 'md:text-6xl');
            heroTitle.classList.add('text-6xl', 'md:text-8xl');
        }
    }
}

// Responsive hero description sizing
function updateHeroDescriptionSize() {
    if (heroDescription) {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
            heroDescription.classList.remove('text-xl', 'md:text-2xl');
            heroDescription.classList.add('text-lg', 'md:text-xl');
        } else {
            heroDescription.classList.remove('text-lg', 'md:text-xl');
            heroDescription.classList.add('text-xl', 'md:text-2xl');
        }
    }
}

// Responsive company logos
function updateCompanyLogos() {
    const companyLogos = document.querySelector('.company-logos');
    if (companyLogos) {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
            companyLogos.classList.remove('gap-8', 'md:gap-12');
            companyLogos.classList.add('gap-4', 'md:gap-6');
        } else {
            companyLogos.classList.remove('gap-4', 'md:gap-6');
            companyLogos.classList.add('gap-8', 'md:gap-12');
        }
    }
}

// Responsive hero actions
function updateHeroActions() {
    if (heroActions) {
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
            heroActions.classList.remove('flex-row');
            heroActions.classList.add('flex-col');
        } else {
            heroActions.classList.remove('flex-col');
            heroActions.classList.add('flex-row');
        }
    }
}

// Initialize responsive elements
function initializeResponsiveElements() {
    updateHeroTitleSize();
    updateHeroDescriptionSize();
    updateCompanyLogos();
    updateHeroActions();
    animateHeroElements();
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        updateHeroTitleSize();
        updateHeroDescriptionSize();
        updateCompanyLogos();
        updateHeroActions();
    }, 250);
});

// Enhanced touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - subtle feedback without conflicting animations
            if (heroContent) {
                heroContent.style.transition = 'transform 0.2s ease-out';
                heroContent.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    heroContent.style.transform = 'translateY(0)';
                }, 200);
            }
        }
    }
}

// Improved loading performance
document.addEventListener('DOMContentLoaded', () => {
    initializeResponsiveElements();
    
    // Preload critical images
    const criticalImages = [
        './images/logo.webp',
        './images/samsung-logo.svg',
        './images/stripe-logo.svg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    

    // Drag-to-scroll for services scroll container
    const servicesScroll = document.querySelector('.services-scroll');
    if (servicesScroll) {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let moved = false;
        const DRAG_THRESHOLD = 5; // pixels

        const onMouseDown = (e) => {
            // Prevent native link drag and selection
            e.preventDefault();
            if (window.getSelection) {
                const sel = window.getSelection();
                if (sel && sel.removeAllRanges) sel.removeAllRanges();
            }
            isDown = true;
            servicesScroll.classList.add('dragging');
            startX = e.pageX - servicesScroll.offsetLeft;
            scrollLeft = servicesScroll.scrollLeft;
            moved = false;
        };

        const onMouseLeave = () => {
            isDown = false;
            servicesScroll.classList.remove('dragging');
        };

        const onMouseUp = () => {
            isDown = false;
            servicesScroll.classList.remove('dragging');
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - servicesScroll.offsetLeft;
            const delta = x - startX;
            if (Math.abs(delta) > DRAG_THRESHOLD) moved = true;
            const walk = delta * 1; // scroll-fast factor
            servicesScroll.scrollLeft = scrollLeft - walk;
        };

        servicesScroll.addEventListener('mousedown', onMouseDown);
        servicesScroll.addEventListener('mouseleave', onMouseLeave);
        servicesScroll.addEventListener('mouseup', onMouseUp);
        servicesScroll.addEventListener('mousemove', onMouseMove);

        // Prevent native drag behavior (no-ghost cursor)
        servicesScroll.addEventListener('dragstart', (e) => e.preventDefault());
        servicesScroll.querySelectorAll('a').forEach(a => {
            a.addEventListener('dragstart', (e) => e.preventDefault());
        });

        // Prevent click on links when a drag occurred
        servicesScroll.addEventListener('click', (e) => {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        // Touch support
        let touchStartX = 0;
        let touchScrollLeft = 0;
        servicesScroll.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.pageX;
            touchScrollLeft = servicesScroll.scrollLeft;
            servicesScroll.classList.add('dragging');
            moved = false;
        }, { passive: true });

        servicesScroll.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const deltaX = touch.pageX - touchStartX;
            if (Math.abs(deltaX) > DRAG_THRESHOLD) moved = true;
            servicesScroll.scrollLeft = touchScrollLeft - deltaX;
        }, { passive: true });

        servicesScroll.addEventListener('touchend', () => {
            servicesScroll.classList.remove('dragging');
        });
    }
});

// Enhanced accessibility for mobile menu
mobileMenuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuBtn.click();
    }
});

mobileMenuClose.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuClose.click();
    }
});

// Focus management for mobile menu
mobileMenuBtn.addEventListener('click', () => {
    setTimeout(() => {
        const firstLink = mobileMenuOverlay.querySelector('a');
        if (firstLink) firstLink.focus();
    }, 300);
});

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenuOverlay.classList.contains('translate-x-full')) {
        mobileMenuClose.click();
    }
});

// Smooth scroll behavior enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('#header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS for enhanced mobile experience
const mobileCSS = `
@media (max-width: 768px) {
    .hero-title {
        line-height: 1.1;
    }
    
    .hero-description {
        line-height: 1.6;
    }
    
    .mobile-menu-overlay {
        backdrop-filter: blur(20px);
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 60 !important;
    }
    
    .hero {
        padding-top: 5rem;
    }
}

@media (max-width: 640px) {
    .hero-title {
        font-size: 2.5rem;
        line-height: 1.2;
    }
    
    .hero-description {
        font-size: 1.125rem;
        line-height: 1.7;
    }
    
    .hero-actions {
        gap: 1rem;
    }
    
    .hero-actions a {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }
    
    .hero {
        padding-top: 4rem;
    }
}

.scrolled {
    background-color: rgba(0, 0, 0, 0.98) !important;
    backdrop-filter: blur(25px) !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.mobile-menu-overlay {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 60 !important;
}

.mobile-services-content {
    transition: all 0.3s ease-in-out;
}

.mobile-services-content.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.mobile-services-content.hide {
    display: none;
    opacity: 0;
    transform: translateY(-10px);
}

/* Ensure hero content doesn't go under header */
.hero {
    padding-top: 4rem;
}

@media (min-width: 768px) {
    .hero {
        padding-top: 5rem;
    }
}

/* Footer link hover effects */
.footer-link {
    display: inline-block;
    position: relative;
}

.footer-link-underline {
    transition: width 0.3s ease-in-out;
}

.footer-link-arrow {
    transition: all 0.3s ease-in-out;
}

.footer-link:hover .footer-link-underline {
    width: 100%;
}

.footer-link:hover .footer-link-arrow {
    opacity: 1;
    transform: translate(-50%, -50%) translateX(2px);
}
`;

const mobileStyle = document.createElement('style');
mobileStyle.textContent = mobileCSS;
document.head.appendChild(mobileStyle);


// Gradient spotlight effect for testimonial cards (hover + cursor tracking)
const testimonialsHoverCSS = `
.testimonial-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.testimonial-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  pointer-events: none;
  /* layered gradient: subtle spotlight + colorful wash */
  background:
    radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.14), rgba(255,255,255,0.08) 22%, rgba(0,0,0,0) 60%),
    linear-gradient(135deg, rgba(34,197,94,0.18), rgba(59,130,246,0.18), rgba(168,85,247,0.18), rgba(236,72,153,0.18), rgba(234,179,8,0.18));
  opacity: 0;
  transition: opacity 220ms ease;
}

.testimonial-card:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-card::before { transition: opacity 120ms ease; }
}
`;

const testimonialsStyle = document.createElement('style');
testimonialsStyle.textContent = testimonialsHoverCSS;
document.head.appendChild(testimonialsStyle);

// Cursor-tracking spotlight for testimonials
(() => {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    let rafId = null;
    let targetX = 0;
    let targetY = 0;

    const update = (x, y) => {
      // Smooth the updates with rAF to avoid layout thrash
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    };

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      // Support mouse and touch
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      targetX = clientX - rect.left;
      targetY = clientY - rect.top;
      update(targetX, targetY);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('touchstart', onMove, { passive: true });
    card.addEventListener('touchmove', onMove, { passive: true });
    card.addEventListener('mouseleave', () => {
      // Reset to center when leaving
      update(card.clientWidth * 0.5, card.clientHeight * 0.5);
    });
  });
})();

// ==============================
// Footer language toggle (EN/ES) – footer-only text swap
// ==============================
(() => {
  const select = document.querySelector('.footer-lang-select');
  if (!select) return;

  const STRINGS = {
    es: {
      servicios: 'Servicios', empresa: 'Empresa', legal: 'Legal',
      inicio: 'Inicio', analizar: 'Analizar mi score', perfil: 'Orientación para mi perfil', ventajas: 'Ventajas',
      sobre: 'Sobre nosotros', contacto: 'Contacto',
      avisoPriv: 'Aviso de privacidad', terminos: 'Términos y condiciones', avisoLegal: 'Aviso legal', cookies: 'Política de cookies', reembolsos: 'Política de reembolsos',
      pref: 'Preferencias de cookies'
    },
    en: {
      servicios: 'Services', empresa: 'Company', legal: 'Legal',
      inicio: 'Home', analizar: 'Check my score', perfil: 'Profile guidance', ventajas: 'Advantages',
      sobre: 'About us', contacto: 'Contact',
      avisoPriv: 'Privacy Notice', terminos: 'Terms & Conditions', avisoLegal: 'Legal Notice', cookies: 'Cookie Policy', reembolsos: 'Refund Policy',
      pref: 'Cookie preferences'
    }
  };

  const map = {
    '.footer-section:nth-child(1) h4': ['servicios'],
    '.footer-section:nth-child(2) h4': ['empresa'],
    '.footer-section:nth-child(3) h4': ['legal'],
    '.footer-section:nth-child(1) li:nth-child(1) a': ['inicio'],
    '.footer-section:nth-child(1) li:nth-child(2) a': ['analizar'],
    '.footer-section:nth-child(1) li:nth-child(3) a': ['perfil'],
    '.footer-section:nth-child(1) li:nth-child(4) a': ['ventajas'],
    '.footer-section:nth-child(2) li:nth-child(1) a': ['sobre'],
    '.footer-section:nth-child(2) li:nth-child(2) a': ['contacto'],
    '.footer-section:nth-child(3) li:nth-child(1) a': ['avisoPriv'],
    '.footer-section:nth-child(3) li:nth-child(2) a': ['terminos'],
    '.footer-section:nth-child(3) li:nth-child(3) a': ['avisoLegal'],
    '.footer-section:nth-child(3) li:nth-child(4) a': ['cookies'],
    '.footer-section:nth-child(3) li:nth-child(5) a': ['reembolsos'],
    '.open-cookie-settings': ['pref']
  };

  const apply = (lang) => {
    const dict = STRINGS[lang] || STRINGS.es;
    Object.entries(map).forEach(([selector, keys]) => {
      const el = document.querySelector(selector);
      if (el && dict[keys[0]]) el.textContent = dict[keys[0]];
    });
  };

  // Initialize from saved preference
  const LS_KEY = 'scoremx.footerLang';
  const saved = localStorage.getItem(LS_KEY) || 'es';
  select.value = saved;
  apply(saved);

  select.addEventListener('change', () => {
    const lang = select.value;
    localStorage.setItem(LS_KEY, lang);
    apply(lang);
  });
})();

// ==============================
// Cookie banner + preferences
// ==============================
(() => {
  const STORAGE_KEY = 'scoremx.cookieConsent.v1';
  const getState = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
  };
  const saveState = (s) => localStorage.setItem(STORAGE_KEY, JSON.stringify(s));

  const banner = document.getElementById('cookie-banner');
  const modal = document.getElementById('cookie-modal');

  if (!banner || !modal) return;

  const openBanner = () => banner.classList.remove('hidden');
  const closeBanner = () => banner.classList.add('hidden');
  const openModal = () => modal.classList.remove('hidden');
  const closeModal = () => modal.classList.add('hidden');

  // Footer open button
  const footerBtn = document.querySelector('.open-cookie-settings');
  if (footerBtn) footerBtn.addEventListener('click', openModal);

  // Banner buttons
  banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    saveState({ necessary: true, preferences: true, analytics: true, marketing: true, ts: Date.now() });
    closeBanner();
  });
  banner.querySelector('.cookie-reject')?.addEventListener('click', () => {
    saveState({ necessary: true, preferences: false, analytics: false, marketing: false, ts: Date.now() });
    closeBanner();
  });
  banner.querySelector('.cookie-settings')?.addEventListener('click', () => {
    closeBanner();
    openModal();
  });

  // Modal controls
  const cbPrefs = document.getElementById('cc-preferences');
  const cbAnalytics = document.getElementById('cc-analytics');
  const cbMarketing = document.getElementById('cc-marketing');

  modal.querySelector('.cookie-modal-close')?.addEventListener('click', () => {
    closeModal();
    if (!getState()) openBanner();
  });
  modal.querySelector('.cookie-modal-accept')?.addEventListener('click', () => {
    saveState({ necessary: true, preferences: true, analytics: true, marketing: true, ts: Date.now() });
    closeModal();
  });
  modal.querySelector('.cookie-modal-reject')?.addEventListener('click', () => {
    saveState({ necessary: true, preferences: false, analytics: false, marketing: false, ts: Date.now() });
    closeModal();
  });
  modal.querySelector('.cookie-modal-save')?.addEventListener('click', () => {
    saveState({
      necessary: true,
      preferences: !!cbPrefs?.checked,
      analytics: !!cbAnalytics?.checked,
      marketing: !!cbMarketing?.checked,
      ts: Date.now(),
    });
    closeModal();
  });

  // Initial state
  const state = getState();
  if (!state) {
    openBanner();
  } else {
    // hydrate modal controls with saved prefs
    if (cbPrefs) cbPrefs.checked = !!state.preferences;
    if (cbAnalytics) cbAnalytics.checked = !!state.analytics;
    if (cbMarketing) cbMarketing.checked = !!state.marketing;
  }
})();

// ==============================
// Mobile Horizontal Slider (Testimonials, Column 1)
// ==============================
(() => {
  const MOBILE_MEDIA = window.matchMedia('(max-width: 767px)');

  const sliderCSS = `
  @media (max-width: 767px) {
    /* hide 2nd and 3rd columns */
    .testimonials .grid > .testimonials-marquee-col:nth-child(2),
    .testimonials .grid > .testimonials-marquee-col:nth-child(3) { display: none !important; }

    /* original vertical track hidden when slider is active */
    .testimonial-col1-original[aria-hidden="true"] { display: none !important; }

    .testimonial-slider { position: relative; overflow: hidden; }
    .testimonial-slider-track {
      display: flex; flex-wrap: nowrap; align-items: stretch; gap: 16px;
      will-change: transform; transform: translateX(0);
      transition: transform 360ms cubic-bezier(.22,.61,.36,1);
      touch-action: pan-x; cursor: grab;
    }
    .testimonial-slider-track.dragging { cursor: grabbing; transition: none; }
    .testimonial-slider .testimonial-card { 
      flex: 0 0 280px; width: 280px; min-width: 280px; 
      display: flex; flex-direction: column; 
    }
    .testimonial-slider .testimonial-card .testimonial-content { flex: 1 1 auto; }
    .testimonial-slider .testimonial-card .author { margin-top: auto; padding-top: 8px; }
    .testimonial-dots { display: flex; justify-content: center; gap: 8px; margin-top: 14px; }
    .testimonial-dot { width: 8px; height: 8px; border-radius: 9999px; background: #334155; opacity: .8; transition: transform .2s, background .2s; }
    .testimonial-dot[aria-current="true"] { background: #a78bfa; transform: scale(1.25); }
  }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = sliderCSS;
  document.head.appendChild(styleEl);

  const getTestimonialSection = () => document.querySelector('.testimonials');

  let teardown = null;

  function buildMobileSlider() {
    const section = getTestimonialSection();
    if (!section) return;
    const grid = section.querySelector('.grid');
    if (!grid) return;

    const col1 = grid.querySelector('.testimonials-marquee-col');
    if (!col1) return;

    // original track (vertical marquee) -> hide when slider active
    const originalTrack = col1.querySelector('.testimonials-marquee-track');
    if (!originalTrack) return;

    // Mark original for toggling visibility
    originalTrack.classList.add('testimonial-col1-original');
    originalTrack.setAttribute('aria-hidden', 'true');

    // Extract 5 unique cards from the first group
    const firstGroup = originalTrack.querySelectorAll(':scope > .space-y-8')[0];
    if (!firstGroup) return;
    const cards = Array.from(firstGroup.querySelectorAll('.testimonial-card'));
    if (cards.length === 0) return;

    // Build slider DOM just once
    let slider = col1.querySelector('.testimonial-slider');
    if (!slider) {
      slider = document.createElement('div');
      slider.className = 'testimonial-slider';
      const track = document.createElement('div');
      track.className = 'testimonial-slider-track';
      slider.appendChild(track);
      const dots = document.createElement('div');
      dots.className = 'testimonial-dots';
      slider.appendChild(dots);
      col1.appendChild(slider);
    }

    const track = slider.querySelector('.testimonial-slider-track');
    const dots = slider.querySelector('.testimonial-dots');

    // Reset content
    track.innerHTML = '';
    dots.innerHTML = '';

    // Create slides with clones for infinite loop: [cloneLast] [1..n] [cloneFirst]
    const createSlide = (node) => {
      const wrap = document.createElement('div');
      wrap.className = 'testimonial-card bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 card-hover';
      // Use deep clone of inner to preserve content & hover effect
      wrap.innerHTML = node.innerHTML;
      return wrap;
    };

    const slides = cards.map(createSlide);
    const firstClone = createSlide(cards[0]);
    const lastClone = createSlide(cards[cards.length - 1]);

    track.appendChild(lastClone);
    slides.forEach(s => track.appendChild(s));
    track.appendChild(firstClone);

    // Build dots
    const total = slides.length; // expected 5
    for (let i = 0; i < total; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
      if (i === 0) dot.setAttribute('aria-current', 'true');
      dots.appendChild(dot);
    }

    // Slider logic
    const GAP = 16; // must match CSS gap
    let current = 1; // index in [1..total], considering leading clone
    let unit = 0; // slide width + gap
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let baseTranslate = 0;

    const firstRealSlide = track.children[1];
    const measure = () => {
      const width = firstRealSlide.offsetWidth; // fixed 280px but measure anyway
      unit = width + GAP;
      setTranslate(-current * unit, false);
    };

    const setTranslate = (x, animate = true) => {
      if (!animate) track.style.transition = 'none';
      else track.style.transition = '';
      track.style.transform = `translateX(${x}px)`;
    };

    const updateDots = () => {
      dots.querySelectorAll('.testimonial-dot').forEach((d, i) => {
        if (i === current - 1) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    };

    const snapToCurrent = () => {
      setTranslate(-current * unit, true);
    };

    const goTo = (index) => {
      current = index; snapToCurrent();
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    track.addEventListener('transitionend', () => {
      // wrap-around handling
      if (current === total + 1) {
        current = 1;
        setTranslate(-current * unit, false);
      } else if (current === 0) {
        current = total;
        setTranslate(-current * unit, false);
      }
      updateDots();
    });

    const onPointerDown = (e) => {
      isDragging = true;
      track.classList.add('dragging');
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      const matrix = new WebKitCSSMatrix(getComputedStyle(track).transform);
      baseTranslate = matrix.m41;
    };
    const onPointerMove = (e) => {
      if (!isDragging) return;
      currentX = (e.touches ? e.touches[0].clientX : e.clientX);
      const delta = currentX - startX;
      setTranslate(baseTranslate + delta, false);
    };
    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('dragging');
      const matrix = new WebKitCSSMatrix(getComputedStyle(track).transform);
      const moved = matrix.m41 - (-current * unit);
      const THRESHOLD = unit * 0.25;
      if (moved < -THRESHOLD) next();
      else if (moved > THRESHOLD) prev();
      else snapToCurrent();
    };

    // Attach events (mouse + touch)
    track.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    track.addEventListener('touchstart', onPointerDown, { passive: true });
    track.addEventListener('touchmove', onPointerMove, { passive: true });
    track.addEventListener('touchend', onPointerUp);

    // Dots navigation
    dots.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i + 1));
    });

    // Init measurements and position
    measure();
    updateDots();
    window.addEventListener('resize', measure);

    teardown = () => {
      window.removeEventListener('resize', measure);
      track.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      track.removeEventListener('touchstart', onPointerDown);
      track.removeEventListener('touchmove', onPointerMove);
      track.removeEventListener('touchend', onPointerUp);
      originalTrack.setAttribute('aria-hidden', 'false');
      slider.remove();
      teardown = null;
    };
  }

  function ensureMode() {
    if (MOBILE_MEDIA.matches) {
      if (!teardown) buildMobileSlider();
    } else {
      if (teardown) teardown();
    }
  }

  // Run now and on change
  ensureMode();
  MOBILE_MEDIA.addEventListener('change', ensureMode);
})();
