'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export default function UpdatesCarousel({ subtitle, title, updates }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const refresh = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setAtStart(t.scrollLeft <= 1);
    setAtEnd(t.scrollLeft >= t.scrollWidth - t.clientWidth - 1);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener('resize', refresh);
    return () => window.removeEventListener('resize', refresh);
  }, [refresh, updates.length]);

  const scroll = (dir) => {
    const t = trackRef.current;
    const card = t?.querySelector('.latest-update-card');
    if (!card) return;
    const styles = getComputedStyle(t);
    const gap = parseFloat(styles.columnGap) || parseFloat(styles.gap) || 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section className="section-padding latest-updates-section" id="projects">
      <div className="container">
        <div className="latest-updates-header">
          <div className="latest-updates-heading">
            <span className="section-subtitle" id="projects-subtitle">{subtitle}</span>
            <h2 className="section-title" id="projects-title">{title}</h2>
          </div>
          <div className="latest-updates-controls" aria-label="Latest updates carousel controls">
            <button className="latest-updates-arrow" id="latest-updates-prev" type="button" aria-label="Scroll to previous updates" disabled={atStart} onClick={() => scroll(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>
            </button>
            <button className="latest-updates-arrow" id="latest-updates-next" type="button" aria-label="Scroll to more updates" disabled={atEnd} onClick={() => scroll(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
          </div>
        </div>

        <div className="latest-updates-track" id="latest-updates-track" role="region" aria-label="Latest updates from MOHOR" tabIndex={0} ref={trackRef} onScroll={refresh}>
          {updates.map((u) => (
            <article className="latest-update-card" key={u.id}>
              <div className="latest-update-image">
                <img src={u.image} alt={u.title} loading="lazy" />
              </div>
              <div className="latest-update-content">
                <p className="latest-update-date">{u.date_label}</p>
                <h3>{u.title}</h3>
                <p>{u.summary}</p>
                <a className="latest-update-link" href={u.link}>Read More <span aria-hidden="true">&rarr;</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
