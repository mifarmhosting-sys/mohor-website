import { getDb, getSettings } from '@/lib/db';
import Header from '@/components/Header';
import DonationPopup from '@/components/DonationPopup';
import ImpactStories from '@/components/ImpactStories';
import UpdatesCarousel from '@/components/UpdatesCarousel';
import DonationChart from '@/components/DonationChart';
import RevealOnScroll from '@/components/RevealOnScroll';
import Supporters from '@/components/sections/Supporters';
import ServicesOverview from '@/components/sections/ServicesOverview';
import ServicesList from '@/components/sections/ServicesList';
import Footer from '@/components/sections/Footer';

export const dynamic = 'force-dynamic';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function splitDate(iso) {
  const [, m, d] = String(iso).split('-').map(Number);
  return { day: d ? String(d) : '', month: MONTHS[(m || 1) - 1] };
}

function PlayIcon({ size = [14, 16] }) {
  return (
    <svg width={size[0]} height={size[1]} viewBox="0 0 14 16" fill="currentColor">
      <path d="M13.25 7.134a1 1 0 010 1.732L2.75 14.928A1 1 0 011.25 14.06V1.938A1 1 0 012.75 1.07l10.5 6.064z" />
    </svg>
  );
}

export default function HomePage() {
  const s = getSettings();
  const db = getDb();
  const updates = db.prepare('SELECT * FROM updates WHERE published = 1 ORDER BY sort_order ASC, id DESC').all();
  const events = db.prepare('SELECT * FROM events WHERE published = 1 ORDER BY event_date ASC').all();
  const stories = db.prepare('SELECT * FROM stories WHERE published = 1 ORDER BY sort_order ASC, id ASC').all();
  const allocations = db.prepare('SELECT * FROM allocations WHERE percent > 0 ORDER BY sort_order ASC, id ASC').all();

  return (
    <>
      <Header announcementText={s.announcement_text} announcementEnabled={s.announcement_enabled === '1'} />

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src={s.hero_image} alt="Children and volunteers during a visit to MOHOR" loading="eager" />
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" id="hero-heading">{s.hero_title}</h1>
            <div className="hero-buttons">
              <a href="#services" className="btn btn-white" id="hero-btn-work">What we do</a>
              <a href="#" className="btn-video" id="hero-btn-video" aria-label="Play video intro">
                <span className="play-icon-wrapper"><PlayIcon /></span>
                Play Video
              </a>
            </div>
          </div>
          <div className="hero-stats">
            {s.hero_stat_1 && (
              <div className="stat-item" id="stat-children"><span className="stat-dot"></span>{s.hero_stat_1}</div>
            )}
            {s.hero_stat_2 && (
              <div className="stat-item" id="stat-donors"><span className="stat-dot"></span>{s.hero_stat_2}</div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-padding" id="about">
        <div className="container about-grid">
          <div className="about-text">
            <span className="section-subtitle" id="about-subtitle">{s.about_subtitle}</span>
            <h2 className="section-title" id="about-title">{s.about_title}</h2>
            <p>{s.about_p1}</p>
            <p>{s.about_p2}</p>
            <a href="/about.html" className="btn btn-primary" id="about-btn-learn">Learn more</a>
          </div>
          <div className="about-media" id="about-video-card">
            <img src={s.about_image} alt="MOHOR children and staff at the care home" loading="lazy" />
            <div className="media-play-overlay">
              <button className="play-btn-large" id="about-play-btn" aria-label="Play video about our space">
                <PlayIcon size={[22, 26]} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECRETARY */}
      <section className="section-padding secretary-section" id="secretary-desk" style={{ backgroundColor: 'var(--color-bg-cream)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container secretary-grid">
          <div className="secretary-letter">
            <span className="section-subtitle" id="secretary-subtitle">LEADERSHIP MESSAGE</span>
            <h2 className="section-title" id="secretary-title">From the Desk of the Secretary</h2>
            <div className="letter-content">
              <p className="letter-lead">{s.secretary_lead}</p>
              <p>{s.secretary_p1}</p>
              <p>{s.secretary_p2}</p>
              <p>{s.secretary_p3}</p>
            </div>
            <div className="secretary-signature">
              <div className="signature-line"></div>
              <h4>{s.secretary_name}</h4>
              <span className="signature-role">{s.secretary_role}</span>
            </div>
          </div>
          <div className="secretary-portrait">
            <img src={s.secretary_image} alt={s.secretary_name} />
          </div>
        </div>
      </section>

      <Supporters />
      <ServicesOverview />
      <ServicesList />

      <ImpactStories stories={stories} />

      {updates.length > 0 && <UpdatesCarousel subtitle={s.updates_subtitle} title={s.updates_title} updates={updates} />}

      {allocations.length > 0 && (
        <DonationChart title={s.donations_title} description={s.donations_desc} items={allocations} />
      )}

      {/* CTA */}
      <section className="section-padding" id="cta">
        <div className="container">
          <div className="cta-banner" id="cta-banner-container">
            <div className="cta-banner-bg">
              <img src="/images/saurav-ganguly/IMG_7884.JPG" alt="Group of happy children and volunteers welcoming guests" loading="lazy" />
            </div>
            <div className="cta-content">
              <h2 className="cta-title" id="cta-heading">{s.cta_title}</h2>
              <div className="cta-buttons">
                <a href="/contact.html" className="btn btn-primary" id="cta-btn-volunteer">Join as a volunteer</a>
                <a href="/donate.html" className="btn btn-white" id="cta-btn-donate">Donate</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      {events.length > 0 && (
        <section className="section-padding" id="events" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="events-header">
              <h2 className="section-title" id="events-title">{s.events_title}</h2>
            </div>
            <div className="events-grid">
              {events.map((e) => {
                const { day, month } = splitDate(e.event_date);
                return (
                  <div className="event-card" key={e.id} id={`event-card-${e.id}`}>
                    <div className="event-date-box">
                      <span className="event-day">{day}</span>
                      <span className="event-month">{month}</span>
                    </div>
                    <div className="event-info">
                      <span className="event-badge">{e.badge}</span>
                      <h3 className="event-title">{e.title}</h3>
                    </div>
                    <a href={e.link} className="event-btn" aria-label={`View details of ${e.title}`} id={`event-btn-${e.id}`}>
                      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="1" y1="7" x2="17" y2="7"></line>
                        <polyline points="11 1 17 7 11 13"></polyline>
                      </svg>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <DonationPopup />
      <RevealOnScroll />
    </>
  );
}
