export default function ServicesList() {
  return (
    <>
  <section className="section-padding services-section" id="services">
    <div className="container services-grid">
      <div className="services-left">
        <span className="section-subtitle" id="services-subtitle">WHAT WE DO</span>
        <h2 className="section-title" id="services-title">Some services we provide for our children</h2>
        <p>MOHOR offers standard, structured procedures for early identification, intervention, and vocational training for differently-abled children in Kolkata.</p>
        
        <div className="services-list">
          <div className="service-item" id="service-family">
            <div className="service-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <h3 className="service-title">Family support</h3>
              <p className="service-desc">Counselor-led guidance, behavior modification, and educational training to assist parents and families.</p>
            </div>
          </div>

          <div className="service-item" id="service-health">
            <div className="service-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div>
              <h3 className="service-title">Health benefits</h3>
              <p className="service-desc">Outpatient clinics covering ENT, Pediatrics, Dermatology, and Orthopedics to ensure holistic wellbeing.</p>
            </div>
          </div>

          <div className="service-item" id="service-scholarships">
            <div className="service-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
              </svg>
            </div>
            <div>
              <h3 className="service-title">Scholarships</h3>
              <p className="service-desc">Active sponsorship programs for underprivileged students and free distribution of critical aids and appliances.</p>
            </div>
          </div>

          <div className="service-item" id="service-therapy">
            <div className="service-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>
            <div>
              <h3 className="service-title">Therapy</h3>
              <p className="service-desc">Comprehensive speech, occupational, physical, and sensory therapy, alongside creative arts, crafts, and yoga.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="services-right" id="services-image-card">
        <img src="/images/saurav-ganguly/IMG_6816.JPG" alt="Saurav Ganguly distributing educational materials to students" loading="lazy" />
      </div>
    </div>
  </section>
    </>
  );
}
