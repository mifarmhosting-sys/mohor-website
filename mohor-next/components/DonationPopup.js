'use client';

import { useEffect, useRef, useState } from 'react';

const AMOUNTS = [2000, 3000, 5000, 10000, 12000, 15000];
const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function DonationPopup() {
  const [active, setActive] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [cycle, setCycle] = useState('Monthly');
  const [amount, setAmount] = useState('4000');
  const [saving, setSaving] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const dismissRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('modal-open', active);
    if (active) closeRef.current?.focus();
    return () => document.body.classList.remove('modal-open');
  }, [active]);

  const close = () => {
    setActive(false);
    document.getElementById('header-logo')?.focus();
  };
  const dismiss = () => (reminder ? close() : (setReminder(true), setTimeout(() => dismissRef.current?.focus(), 0)));

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
      } else if (e.key === 'Tab' && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])')].filter(
          (el) => el.offsetParent !== null
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const submit = async (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 100) return e.currentTarget.reportValidity();
    setSaving(true);
    try {
      // Record the pledge for the dashboard; never block the visitor if this fails.
      await fetch('/api/pledges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value, cycle }),
        keepalive: true,
      });
    } catch {}
    const url = new URL('/donate.html', window.location.href);
    url.searchParams.set('amount', String(value));
    url.searchParams.set('cycle', cycle);
    url.hash = 'donate-contribute';
    window.location.assign(url.href);
  };

  return (
    <div className={`home-popup${active ? ' active' : ''}`} id="home-popup" aria-hidden={!active}>
      <div className="home-popup-overlay" id="home-popup-overlay" onClick={dismiss}></div>
      <section
        className="home-popup-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={reminder ? 'home-popup-reminder-title' : 'home-popup-title'}
        ref={dialogRef}
      >
        <button
          className="home-popup-close"
          id="home-popup-close"
          type="button"
          aria-label={reminder ? 'Close popup' : 'Show reminder before closing'}
          onClick={dismiss}
          ref={closeRef}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"></path>
          </svg>
        </button>

        <div className="home-popup-story">
          <img className="home-popup-image" src="/images/saurav-ganguly/IMG_6779.JPG" alt="Children and volunteers smiling together at MOHOR" />
          <div className="home-popup-story-content">
            <a className="home-popup-logo" href="/" aria-label="MOHOR home">
              MOHOR<span>.</span>
            </a>
            <p className="home-popup-story-copy">Your support helps children with special needs access the care, education, and therapy they deserve.</p>
            <a className="home-popup-story-link" href="/what-we-do.html">
              Discover what we do <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div className="home-popup-panel">
          <div className="home-popup-step" id="home-popup-donation-step" hidden={reminder}>
            <span className="home-popup-eyebrow">YOUR SUPPORT MATTERS</span>
            <h2 className="home-popup-title" id="home-popup-title">Choose your donation</h2>
            <form className="home-donation-form" id="home-donation-form" onSubmit={submit}>
              <fieldset className="home-donation-frequency">
                <legend>Donation frequency</legend>
                <div className="home-donation-frequency-options">
                  {['One-time', 'Monthly'].map((c) => (
                    <button
                      key={c}
                      className={`home-donation-choice${cycle === c ? ' is-selected' : ''}`}
                      type="button"
                      aria-pressed={cycle === c}
                      onClick={() => setCycle(c)}
                    >
                      {c === 'Monthly' ? (
                        <>
                          <span aria-hidden="true">♥</span> Monthly
                        </>
                      ) : (
                        'Give once'
                      )}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="home-donation-amounts">
                <legend>Choose an amount</legend>
                <div className="home-donation-amount-options">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      className={`home-donation-choice${String(a) === amount ? ' is-selected' : ''}`}
                      type="button"
                      aria-pressed={String(a) === amount}
                      onClick={() => setAmount(String(a))}
                    >
                      {fmt(a)}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="home-donation-custom-label" htmlFor="home-donation-amount">Enter an amount</label>
              <div className="home-donation-custom">
                <span aria-hidden="true">₹</span>
                <input
                  id="home-donation-amount"
                  name="amount"
                  type="number"
                  min="100"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  inputMode="numeric"
                  aria-describedby="home-donation-help"
                />
                <span className="home-donation-currency">INR</span>
              </div>
              <p className="home-donation-help" id="home-donation-help">Minimum donation: ₹100</p>
              <button className="btn btn-primary home-popup-primary" type="submit" disabled={saving}>
                Continue to registration
              </button>
              <p className="home-popup-note">
                Online payments are not set up here. Your amount and frequency will be carried to the MOHOR Friends registration form.
              </p>
            </form>
          </div>

          <div className="home-popup-step" id="home-popup-reminder-step" hidden={!reminder}>
            <span className="home-popup-reminder-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <path d="M12 34h24l-3.5-5V20a8.5 8.5 0 0 0-17 0v9L12 34Z"></path>
                <path d="M20 38a4 4 0 0 0 8 0"></path>
                <path d="m34 13 2 2 4-4"></path>
              </svg>
            </span>
            <h2 className="home-popup-title" id="home-popup-reminder-title">Maybe next time?</h2>
            <p className="home-popup-description">
              Thank you for considering MOHOR. You can come back anytime to learn about our work or support the children we serve.
            </p>
            <button className="btn btn-primary home-popup-primary" id="home-popup-back" type="button" onClick={() => setReminder(false)}>
              Back to donation options
            </button>
            <button className="home-popup-dismiss" id="home-popup-dismiss" type="button" onClick={close} ref={dismissRef}>
              No, thanks
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
