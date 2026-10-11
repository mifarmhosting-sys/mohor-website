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

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  const desktopNavigation = window.matchMedia('(min-width: 992px) and (hover: hover)');
  const navGroups = navMenu.querySelectorAll('.nav-group');

  navGroups.forEach(group => {
    const summary = group.querySelector('summary');
    if (!summary) return;

    group.addEventListener('pointerenter', () => {
      if (desktopNavigation.matches) group.open = true;
    });

    group.addEventListener('pointerleave', () => {
      if (desktopNavigation.matches && !group.contains(document.activeElement)) {
        group.open = false;
      }
    });

    group.addEventListener('focusin', () => {
      if (desktopNavigation.matches) group.open = true;
    });

    group.addEventListener('focusout', event => {
      if (desktopNavigation.matches && !group.contains(event.relatedTarget)) {
        group.open = false;
      }
    });

    summary.addEventListener('click', event => {
      if (desktopNavigation.matches && event.detail > 0) {
        event.preventDefault();
      }
    });
  });

  const announcementBar = document.getElementById('announcement-bar');
  const announcementClose = document.getElementById('announcement-close');

  announcementClose?.addEventListener('click', () => {
    if (announcementBar) announcementBar.hidden = true;
  });

  // ==========================================
  // HOMEPAGE DONATION POPUP
  // ==========================================
  const homePopup = document.getElementById('home-popup');
  const homePopupDialog = homePopup?.querySelector('.home-popup-dialog');
  const homePopupClose = document.getElementById('home-popup-close');
  const homePopupOverlay = document.getElementById('home-popup-overlay');
  const donationStep = document.getElementById('home-popup-donation-step');
  const reminderStep = document.getElementById('home-popup-reminder-step');
  const homePopupTitle = document.getElementById('home-popup-title');
  const homePopupReminderTitle = document.getElementById('home-popup-reminder-title');
  const homePopupBack = document.getElementById('home-popup-back');
  const homePopupDismiss = document.getElementById('home-popup-dismiss');
  const homePopupReturnFocus = document.getElementById('header-logo');
  let isReminderStep = false;
  let popupCloseTimer;

  const homeDonationForm = document.getElementById('home-donation-form');
  const homeDonationAmount = document.getElementById('home-donation-amount');
  const donationCycleOptions = Array.from(document.querySelectorAll('[data-donation-cycle]'));
  const donationAmountOptions = Array.from(document.querySelectorAll('[data-donation-amount]'));
  let selectedDonationCycle = 'Monthly';

  if (homeDonationForm && homeDonationAmount) {
    donationCycleOptions.forEach(option => {
      option.addEventListener('click', () => {
        selectedDonationCycle = option.dataset.donationCycle;
        donationCycleOptions.forEach(cycleOption => {
          const isSelected = cycleOption === option;
          cycleOption.classList.toggle('is-selected', isSelected);
          cycleOption.setAttribute('aria-pressed', String(isSelected));
        });
      });
    });

    donationAmountOptions.forEach(option => {
      option.addEventListener('click', () => {
        homeDonationAmount.value = option.dataset.donationAmount;
        donationAmountOptions.forEach(amountOption => {
          const isSelected = amountOption === option;
          amountOption.classList.toggle('is-selected', isSelected);
          amountOption.setAttribute('aria-pressed', String(isSelected));
        });
      });
    });

    homeDonationAmount.addEventListener('input', () => {
      donationAmountOptions.forEach(option => {
        const isSelected = option.dataset.donationAmount === homeDonationAmount.value;
        option.classList.toggle('is-selected', isSelected);
        option.setAttribute('aria-pressed', String(isSelected));
      });
    });

    homeDonationForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!homeDonationForm.reportValidity()) return;

      const donationUrl = new URL('donate.html', window.location.href);
      donationUrl.searchParams.set('amount', homeDonationAmount.value);
      donationUrl.searchParams.set('cycle', selectedDonationCycle);
      donationUrl.hash = 'donate-contribute';
      window.location.assign(donationUrl.href);
    });
  }

  if (homePopup && homePopupDialog && homePopupClose && homePopupOverlay && donationStep && reminderStep && homePopupTitle && homePopupReminderTitle && homePopupDismiss) {
    const showReminderStep = () => {
      if (isReminderStep) {
        closeHomePopup();
        return;
      }

      isReminderStep = true;
      donationStep.hidden = true;
      reminderStep.hidden = false;
      homePopupDialog.setAttribute('aria-labelledby', homePopupReminderTitle.id);
      homePopupClose.setAttribute('aria-label', 'Close popup');
      homePopupDismiss.focus();
    };

    const closeHomePopup = () => {
      homePopup.classList.remove('active');
      homePopup.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      homePopupReturnFocus?.focus();
      window.clearTimeout(popupCloseTimer);
    };

    const dismissHomePopup = () => {
      if (isReminderStep) {
        closeHomePopup();
      } else {
        showReminderStep();
      }
    };

    homePopupClose.addEventListener('click', dismissHomePopup);
    homePopupOverlay.addEventListener('click', dismissHomePopup);
    homePopupDismiss?.addEventListener('click', closeHomePopup);
    homePopupBack?.addEventListener('click', () => {
      isReminderStep = false;
      reminderStep.hidden = true;
      donationStep.hidden = false;
      homePopupDialog.setAttribute('aria-labelledby', homePopupTitle.id);
      homePopupClose.setAttribute('aria-label', 'Show reminder before closing');
      homePopupClose.focus();
    });

    window.addEventListener('keydown', (event) => {
      if (!homePopup.classList.contains('active')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        dismissHomePopup();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = Array.from(homePopupDialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'))
          .filter(element => element.offsetParent !== null);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    });

    document.body.classList.add('modal-open');
    popupCloseTimer = window.setTimeout(() => {
      homePopup.classList.add('active');
      homePopup.setAttribute('aria-hidden', 'false');
      homePopupClose.focus();
    }, 450);
  }

  const donationRegistrationForm = document.getElementById('mohor-donate-form');
  if (donationRegistrationForm) {
    const donationParams = new URLSearchParams(window.location.search);
    const amountField = document.getElementById('amount-value');
    const cycleField = document.getElementById('payment-cycle');

    const amount = donationParams.get('amount');
    if (amount && amountField && Number.isFinite(Number(amount)) && Number(amount) >= 100) {
      amountField.value = amount;
    }

    const cycle = donationParams.get('cycle');
    if (cycle && cycleField && Array.from(cycleField.options).some(option => option.value === cycle)) {
      cycleField.value = cycle;
    }
  }

  // ==========================================
  // IMPACT STORIES
  // ==========================================
  const impactStoryImage = document.getElementById('impact-story-image');
  const impactStoryHeading = document.getElementById('impact-story-heading');
  const impactStoryDescription = document.getElementById('impact-story-description');
  const impactStoryLink = document.getElementById('impact-story-link');
  const impactStoryPagination = document.getElementById('impact-story-pagination');
  const impactStories = [
    {
      title: "Poetry and Purpose: Gayatri's Aspiring Future",
      description: 'Akshaya Patra supports Gayatri from Hami with daily meals, helping her stay focused on studies and dream of becoming a bank manager and poet.',
      image: 'images/saurav-ganguly/IMG_7652.JPG',
      imageAlt: 'A student and caregivers sharing a moment at a MOHOR community event',
      href: 'project-detail.html'
    }
  ];

  if (impactStoryImage && impactStoryHeading && impactStoryDescription && impactStoryLink && impactStoryPagination) {
    const showImpactStory = index => {
      const story = impactStories[index];
      if (!story) return;

      impactStoryImage.src = story.image;
      impactStoryImage.alt = story.imageAlt;
      impactStoryHeading.textContent = story.title;
      impactStoryDescription.textContent = story.description;
      impactStoryLink.href = story.href;

      impactStoryPagination.replaceChildren(...impactStories.map((item, itemIndex) => {
        const button = document.createElement('button');
        button.className = 'impact-story-dot';
        button.type = 'button';
        button.setAttribute('aria-label', `Show impact story ${itemIndex + 1}: ${item.title}`);
        button.setAttribute('aria-pressed', String(itemIndex === index));
        button.addEventListener('click', () => showImpactStory(itemIndex));
        return button;
      }));
    };

    showImpactStory(0);
  }

  // ==========================================
  // DYNAMIC CHART INTERACTION
  // ==========================================
  const segments = [
    { class: '.segment-1', percent: '40%', label: 'Child care home', legendId: 'legend-care' },
    { class: '.segment-2', percent: '35%', label: 'Cleanliness program', legendId: 'legend-cleanliness' },
    { class: '.segment-3', percent: '10%', label: 'Helping people', legendId: 'legend-helping' },
    { class: '.segment-4', percent: '10%', label: 'Excursions', legendId: 'legend-excursions' },
    { class: '.segment-5', percent: '5%', label: 'Feeding the poor', legendId: 'legend-feeding' }
  ];

  const chartNum = document.getElementById('chart-percentage');
  const chartLabel = document.querySelector('.chart-inner-label');

  const updateChartCenter = (percent, label) => {
    if (chartNum && chartLabel) {
      chartNum.textContent = percent;
      chartLabel.textContent = label;
    }
  };

  const setSegmentHighlight = (segment, element, legendElement, active) => {
    updateChartCenter(active ? segment.percent : '100%', active ? segment.label : 'Allocated');
    if (element) {
      element.style.strokeWidth = active ? '36' : '';
      element.style.filter = active ? 'drop-shadow(0 0 9px currentColor)' : '';
    }
    if (legendElement) {
      legendElement.classList.toggle('is-highlighted', active);
    }
  };

  segments.forEach(seg => {
    const el = document.querySelector(seg.class);
    const legendEl = document.getElementById(seg.legendId);

    if (el) {
      el.addEventListener('mouseenter', () => setSegmentHighlight(seg, el, legendEl, true));
      el.addEventListener('mouseleave', () => setSegmentHighlight(seg, el, legendEl, false));
      el.addEventListener('focus', () => setSegmentHighlight(seg, el, legendEl, true));
      el.addEventListener('blur', () => setSegmentHighlight(seg, el, legendEl, false));
    }

    if (legendEl) {
      legendEl.addEventListener('mouseenter', () => setSegmentHighlight(seg, el, legendEl, true));
      legendEl.addEventListener('mouseleave', () => setSegmentHighlight(seg, el, legendEl, false));
      legendEl.addEventListener('focus', () => setSegmentHighlight(seg, el, legendEl, true));
      legendEl.addEventListener('blur', () => setSegmentHighlight(seg, el, legendEl, false));
    }
  });

  // ==========================================
  // LATEST UPDATES CAROUSEL
  // ==========================================
  const updatesTrack = document.getElementById('latest-updates-track');
  const updatesPrevious = document.getElementById('latest-updates-prev');
  const updatesNext = document.getElementById('latest-updates-next');

  if (updatesTrack && updatesPrevious && updatesNext) {
    const updateCarouselControls = () => {
      const maxScroll = updatesTrack.scrollWidth - updatesTrack.clientWidth;
      updatesPrevious.disabled = updatesTrack.scrollLeft <= 1;
      updatesNext.disabled = updatesTrack.scrollLeft >= maxScroll - 1;
    };

    const scrollUpdates = direction => {
      const card = updatesTrack.querySelector('.latest-update-card');
      if (!card) return;
      const trackStyles = window.getComputedStyle(updatesTrack);
      const gap = parseFloat(trackStyles.columnGap) || parseFloat(trackStyles.gap) || 0;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      updatesTrack.scrollBy({
        left: direction * (card.getBoundingClientRect().width + gap),
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    };

    updatesPrevious.addEventListener('click', () => scrollUpdates(-1));
    updatesNext.addEventListener('click', () => scrollUpdates(1));
    updatesTrack.addEventListener('scroll', updateCarouselControls, { passive: true });
    window.addEventListener('resize', updateCarouselControls);
    updateCarouselControls();
  }

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
