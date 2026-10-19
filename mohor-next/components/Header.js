'use client';

import { useEffect, useRef, useState } from 'react';
import NavMenu from './sections/NavMenu';

export default function Header({ announcementText, announcementEnabled }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [announceHidden, setAnnounceHidden] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Desktop: open dropdown groups on hover / keyboard focus (mirrors original script.js)
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const desktop = window.matchMedia('(min-width: 992px) and (hover: hover)');
    const cleanups = [];
    menu.querySelectorAll('.nav-group').forEach((group) => {
      const summary = group.querySelector('summary');
      const on = (type, fn) => {
        group.addEventListener(type, fn);
        cleanups.push(() => group.removeEventListener(type, fn));
      };
      on('pointerenter', () => desktop.matches && (group.open = true));
      on('pointerleave', () => desktop.matches && !group.contains(document.activeElement) && (group.open = false));
      on('focusin', () => desktop.matches && (group.open = true));
      on('focusout', (e) => desktop.matches && !group.contains(e.relatedTarget) && (group.open = false));
      const onClick = (e) => desktop.matches && e.detail > 0 && e.preventDefault();
      summary?.addEventListener('click', onClick);
      cleanups.push(() => summary?.removeEventListener('click', onClick));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="container nav-container">
          <a href="/" className="logo" id="header-logo">
            MOHOR<span>.</span>
          </a>

          <nav
            className={`nav-menu${open ? ' open' : ''}`}
            id="nav-menu"
            aria-label="Main navigation"
            ref={menuRef}
            onClick={(e) => open && e.target.closest('a') && setOpen(false)}
          >
            <NavMenu />
            <a href="/donate.html" className="btn btn-dark mobile-only" id="nav-btn-donate-mobile">
              Donate
            </a>
          </nav>

          <div className="header-actions">
            <a href="/donate.html" className="btn btn-dark" id="nav-btn-donate">
              Donate
            </a>
          </div>

          <button
            className={`nav-toggle${open ? ' open' : ''}`}
            id="nav-toggle"
            aria-label="Toggle Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {announcementEnabled && (
        <aside className="announcement-bar" id="announcement-bar" aria-label="MOHOR latest updates" hidden={announceHidden}>
          <span className="announcement-badge">MOHOR UPDATES</span>
          <p>{announcementText}</p>
          <a href="/media.html" className="announcement-link">
            Explore updates <span aria-hidden="true">&rarr;</span>
          </a>
          <button
            className="announcement-close"
            id="announcement-close"
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setAnnounceHidden(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m18 6-12 12M6 6l12 12"></path>
            </svg>
          </button>
        </aside>
      )}
    </>
  );
}
