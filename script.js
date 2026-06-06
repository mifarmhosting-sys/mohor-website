document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // HEADER SCROLL EFFECT
  // ==========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    // Toggle body scroll lock
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // ==========================================
  // DYNAMIC CHART INTERACTION
  // ==========================================
  const segments = [
    { class: '.segment-1', percent: '40%', label: 'Child Care', legendId: 'legend-care' },
    { class: '.segment-2', percent: '35%', label: 'Cleanliness', legendId: 'legend-cleanliness' },
    { class: '.segment-3', percent: '10%', label: 'Helping', legendId: 'legend-helping' },
    { class: '.segment-4', percent: '10%', label: 'Excursions', legendId: 'legend-excursions' },
    { class: '.segment-5', percent: '5%', label: 'Feeding Poor', legendId: 'legend-feeding' }
  ];

  const chartNum = document.getElementById('chart-percentage');
  const chartLabel = document.querySelector('.chart-inner-label');

  const updateChartCenter = (percent, label) => {
    if (chartNum && chartLabel) {
      chartNum.textContent = percent;
      chartLabel.textContent = label;
    }
  };

  segments.forEach(seg => {
    const el = document.querySelector(seg.class);
    const legendEl = document.getElementById(seg.legendId);

    if (el) {
      // Hover segment
      el.addEventListener('mouseenter', () => {
        updateChartCenter(seg.percent, seg.label);
        el.style.strokeWidth = '30';
        if (legendEl) legendEl.style.transform = 'scale(1.05)';
      });

      el.addEventListener('mouseleave', () => {
        updateChartCenter('100%', 'Allocated');
        el.style.strokeWidth = '';
        if (legendEl) legendEl.style.transform = '';
      });
    }

    if (legendEl) {
      // Hover legend item
      legendEl.addEventListener('mouseenter', () => {
        updateChartCenter(seg.percent, seg.label);
        legendEl.style.transition = 'transform 0.2s ease, color 0.2s ease';
        legendEl.style.transform = 'translateX(6px)';
        legendEl.style.color = '#FFFFFF';
        if (el) {
          el.style.strokeWidth = '30';
          el.style.filter = 'drop-shadow(0 0 12px rgba(255,255,255,0.25))';
        }
      });

      legendEl.addEventListener('mouseleave', () => {
        updateChartCenter('100%', 'Allocated');
        legendEl.style.transform = '';
        legendEl.style.color = '';
        if (el) {
          el.style.strokeWidth = '';
          el.style.filter = '';
        }
      });
    }
  });

  // ==========================================
  // ACTIVE NAVIGATION LINK ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section, footer');
  
  const options = {
    threshold: 0.2,
    rootMargin: '-80px 0px 0px 0px' // offset header height
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // ==========================================
  // MICRO-ANIMATIONS (SCROLL ENTRANCE REVEAL)
  // ==========================================
  const revealElements = document.querySelectorAll(
    '.service-item, .project-card, .event-card, .about-text, .about-media, ' +
    '.about-hero-title-box, .about-hero-desc, .about-hero-video, .mission-vision-col, .award-card, .journey-left, .journey-right, .team-card, ' +
    '.what-we-do-hero-text, .what-we-do-hero-img, .special-needs-title, ' +
    '.media-hero-left, .media-news-container, .news-card-mini, ' +
    '.contact-hero-left, .contact-info-block, .contact-form-container, .contact-map-section, ' +
    '.event-header-title, .event-meta-row, .event-body-container, ' +
    '.donate-hero-left, .donate-hero-right, .donate-contrib-left, .tabs-nav, .donate-use-grid, ' +
    '.project-header-container, .project-body-container, .stats-ribbon'
  );
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // ==========================================
  // DONATE TABS INTERACTION
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const pane = document.getElementById(targetId);

      if (pane) {
        // Deactivate other buttons
        const siblingBtns = btn.parentElement.querySelectorAll('.tab-btn');
        siblingBtns.forEach(sb => {
          sb.classList.remove('active');
          sb.setAttribute('aria-selected', 'false');
        });

        // Activate current button
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Deactivate other panes
        const contentContainer = pane.parentElement;
        const panes = contentContainer.querySelectorAll('.tab-pane');
        panes.forEach(p => p.classList.remove('active'));

        // Activate current pane
        pane.classList.add('active');
      }
    });
  });

  // ==========================================
  // DOCUMENT & GALLERY LIGHTBOX MODAL
  // ==========================================
  const docModal = document.getElementById('doc-modal');
  const docModalImage = document.getElementById('doc-modal-image');
  const docModalTitle = document.getElementById('doc-modal-title');
  const docModalClose = document.getElementById('doc-modal-close');
  const docModalOverlay = document.getElementById('doc-modal-overlay');

  let currentGalleryItems = [];
  let currentGalleryIndex = -1;
  let prevBtn = null;
  let nextBtn = null;

  const openDocModal = (imageSrc, docTitle) => {
    if (!docModal || !docModalImage || !docModalTitle) return;
    
    // Set content
    docModalImage.src = imageSrc;
    docModalImage.alt = docTitle;
    docModalTitle.textContent = docTitle;
    docModalImage.style.opacity = '1';
    
    // Show modal
    docModal.classList.add('active');
    docModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    
    // Accessibility: set focus on close button
    if (docModalClose) docModalClose.focus();
  };

  const closeDocModal = () => {
    if (!docModal) return;
    
    // Hide modal
    docModal.classList.remove('active');
    docModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    
    // Clear image src after transition to prevent flicker next time
    setTimeout(() => {
      if (docModalImage) {
        docModalImage.src = '';
        docModalImage.style.opacity = '0';
      }
    }, 400);
  };

  const navigateGallery = (direction) => {
    if (currentGalleryItems.length <= 1) return;
    
    currentGalleryIndex = (currentGalleryIndex + direction + currentGalleryItems.length) % currentGalleryItems.length;
    const nextItem = currentGalleryItems[currentGalleryIndex];
    
    let src = '';
    let title = '';
    
    if (nextItem.classList.contains('gallery-item')) {
      const img = nextItem.querySelector('img');
      src = img ? img.getAttribute('src') : '';
      title = nextItem.getAttribute('data-title') || (img ? img.getAttribute('alt') : 'Gallery Image');
    } else {
      src = nextItem.getAttribute('data-image');
      title = nextItem.getAttribute('data-title') || 'Document Preview';
    }
    
    if (docModalImage && docModalTitle) {
      docModalImage.style.opacity = '0';
      docModalImage.style.transition = 'opacity 0.15s ease-out';
      setTimeout(() => {
        docModalImage.src = src;
        docModalImage.alt = title;
        docModalTitle.textContent = title;
        docModalImage.style.opacity = '1';
      }, 150);
    }
  };

  const setupLightboxNavigation = () => {
    const container = document.querySelector('.doc-modal-container');
    if (container && (!prevBtn || !nextBtn)) {
      // Create Prev button
      prevBtn = document.createElement('button');
      prevBtn.id = 'lightbox-prev';
      prevBtn.className = 'lightbox-nav-btn prev';
      prevBtn.setAttribute('aria-label', 'Previous image');
      prevBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
      container.appendChild(prevBtn);

      // Create Next button
      nextBtn = document.createElement('button');
      nextBtn.id = 'lightbox-next';
      nextBtn.className = 'lightbox-nav-btn next';
      nextBtn.setAttribute('aria-label', 'Next image');
      nextBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
      container.appendChild(nextBtn);
      
      // Add event listeners
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(-1);
      });
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateGallery(1);
      });
    }
  };

  // Initialize triggers
  const initLightbox = () => {
    if (!docModal) return;
    
    setupLightboxNavigation();
    
    const triggers = Array.from(document.querySelectorAll('.doc-btn, .gallery-item'));
    
    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const isGallery = btn.classList.contains('gallery-item');
        
        if (isGallery) {
          currentGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));
          currentGalleryIndex = currentGalleryItems.indexOf(btn);
        } else {
          const docBtns = Array.from(document.querySelectorAll('.doc-btn'));
          if (docBtns.length > 1) {
            currentGalleryItems = docBtns;
            currentGalleryIndex = docBtns.indexOf(btn);
          } else {
            currentGalleryItems = [btn];
            currentGalleryIndex = 0;
          }
        }
        
        // Toggle navigation arrow visibility
        if (prevBtn && nextBtn) {
          const showArrows = currentGalleryItems.length > 1;
          prevBtn.style.display = showArrows ? 'flex' : 'none';
          nextBtn.style.display = showArrows ? 'flex' : 'none';
        }
        
        let src = '';
        let title = '';
        if (btn.classList.contains('gallery-item')) {
          const img = btn.querySelector('img');
          src = img ? img.getAttribute('src') : '';
          title = btn.getAttribute('data-title') || (img ? img.getAttribute('alt') : 'Gallery Image');
        } else {
          src = btn.getAttribute('data-image');
          title = btn.getAttribute('data-title') || 'Document Preview';
        }
        
        openDocModal(src, title);
      });
    });
  };

  // Call initialization
  initLightbox();

  // Close modal events
  if (docModalClose) {
    docModalClose.addEventListener('click', closeDocModal);
  }
  if (docModalOverlay) {
    docModalOverlay.addEventListener('click', closeDocModal);
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (docModal && docModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeDocModal();
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        navigateGallery(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        navigateGallery(-1);
      }
    }
  });
});


