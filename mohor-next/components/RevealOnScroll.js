'use client';

import { useEffect } from 'react';

const SELECTOR = '.service-item, .event-card, .about-text, .about-media';

/** Scroll-entrance reveal, ported from the original script.js. */
export default function RevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll(SELECTOR);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
