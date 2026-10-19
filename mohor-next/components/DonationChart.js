'use client';

import { useState } from 'react';

const R = 108;
const C = 2 * Math.PI * R;
const fmtPct = (n) => `${Number(n.toFixed(1))}%`;

export default function DonationChart({ title, description, items }) {
  const [active, setActive] = useState(null);

  const total = items.reduce((s, i) => s + i.percent, 0) || 1;
  let cumulative = 0;
  const slices = items.map((item, index) => {
    const pct = (item.percent / total) * 100;
    const len = (pct / 100) * C;
    const slice = { ...item, pct, len, offset: -cumulative, color: `var(--color-chart-${(index % 5) + 1})` };
    cumulative += len;
    return slice;
  });
  const current = active !== null ? slices[active] : null;
  const summary = slices.map((s) => `${fmtPct(s.pct)} ${s.label}`).join(', ');

  const hover = (i) => ({
    onMouseEnter: () => setActive(i),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(i),
    onBlur: () => setActive(null),
  });

  return (
    <section className="section-padding donation-section" id="donations">
      <div className="container donation-grid">
        <div className="donation-left">
          <h2 className="section-title" id="donations-title">{title}</h2>
          <p className="donation-desc">{description}</p>

          <div className="donation-legend" id="donation-legend-list">
            {slices.map((s, i) => (
              <button
                key={s.id}
                className={`legend-item${active === i ? ' is-highlighted' : ''}`}
                type="button"
                aria-label={`${fmtPct(s.pct)} allocated to ${s.label}`}
                {...hover(i)}
              >
                <span className="legend-color-box" aria-hidden="true" style={{ backgroundColor: s.color }}></span>
                <span className="legend-percent">{fmtPct(s.pct)}</span>
                <span className="legend-label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="donation-right chart-container" id="donation-chart-container">
          <div className="chart-panel-heading">
            <span className="chart-panel-kicker">Your impact</span>
            <span className="chart-panel-caption">Every contribution has a purpose</span>
          </div>
          <div className="chart-visual">
            <svg className="chart-svg" viewBox="0 0 320 320" role="img" aria-labelledby="donation-chart-title donation-chart-description">
              <title id="donation-chart-title">Donation allocation</title>
              <desc id="donation-chart-description">{summary}.</desc>
              <circle className="chart-track" cx="160" cy="160" r={R}></circle>
              {slices.map((s, i) => (
                <circle
                  key={s.id}
                  className="chart-segment"
                  cx="160"
                  cy="160"
                  r={R}
                  tabIndex={0}
                  stroke={s.color}
                  strokeDasharray={`${s.len.toFixed(1)} ${C.toFixed(1)}`}
                  strokeDashoffset={s.offset.toFixed(1)}
                  style={{ stroke: s.color, color: s.color, ...(active === i ? { strokeWidth: 36, filter: 'drop-shadow(0 0 9px currentColor)' } : {}) }}
                  {...hover(i)}
                ></circle>
              ))}
            </svg>
            <div className="chart-inner-text" aria-live="polite">
              <span className="chart-inner-eyebrow">Giving</span>
              <span className="chart-inner-num" id="chart-percentage">{current ? fmtPct(current.pct) : '100%'}</span>
              <span className="chart-inner-label">{current ? current.label : 'Allocated'}</span>
            </div>
          </div>
          <p className="chart-panel-footer"><span aria-hidden="true">✦</span> Carefully directed where it matters most</p>
        </div>
      </div>
    </section>
  );
}
