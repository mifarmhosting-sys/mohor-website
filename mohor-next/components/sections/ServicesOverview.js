export default function ServicesOverview() {
  return (
    <>
  <section className="section-padding services-overview" id="objectives">
    <div className="container">
      <div className="services-overview-header">
        <h2 className="section-title" id="services-overview-title">Our Services</h2>
        <p>We are dedicated to supporting children with special needs and developmental disabilities (including Autism, ADHD, Cerebral Palsy, Intellectual Disability, and Hearing Impairment).</p>
      </div>

      <div className="services-overview-grid">
        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 14 18 3-3 17-18-3zM36 14l17-3 3 18-17 3zM10 38l18-3 3 18-18 3zM37 37l18 3-3 17-18-3z"/>
              <path d="M17 22c-4-4-8 2-3 5l4 2 3-4c2-4-3-7-5-3ZM44 18c-4-3-8 3-3 6l4 2 3-4c2-4-2-7-4-4ZM18 44c-4-3-8 3-3 6l4 2 3-4c2-4-2-7-4-4ZM45 44c-4-3-8 3-3 6l4 2 3-4c2-4-2-7-4-4Z"/>
            </svg>
          </div>
          <h3>Early Identification &amp; Intervention</h3>
          <p>To promote activities for early detection and assessment of developmental delays in children (from 3 months to 18 years).</p>
          <a href="what-we-do.html#special-services">Read more</a>
        </article>

        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 17a17 17 0 0 1 34 0c0 7-4 11-8 15H24c-4-4-8-8-8-15Z"/>
              <path d="m32 31-10 12h8v13h8V43h8L32 31ZM51 14a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"/>
              <path d="M41 30h14l4 25h-8v8H39v-8h-7"/>
            </svg>
          </div>
          <h3>Therapeutic Rehabilitation</h3>
          <p>To provide specialized therapies—including Speech Therapy, Occupational Therapy, Language Training, and Behavioral Modification—to help children acquire functional life skills.</p>
          <a href="what-we-do.html#service-therapy">Read more</a>
        </article>

        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="currentColor">
              <path d="M31 7a25 25 0 0 0-16 44v10l23 4V47l14-1v-9l7-2-5-15A25 25 0 0 0 31 7Zm-1 4 9 1-8 17-17-8a21 21 0 0 1 16-10Zm-20 13 20 9-15 16a21 21 0 0 1-5-25Zm9 28 15-16 8 19-20 2-3-5Zm28 2-8-19 18-1-3 9 1 10-8 1Zm11-24-16 1 8-17a21 21 0 0 1 8 16Z"/>
            </svg>
          </div>
          <h3>Inclusive Education &amp; Skill Development</h3>
          <p>To offer tailored education, cognitive training, and basic vocational guidance aimed at mainstreaming differently-abled children into regular social and academic environments.</p>
          <a href="what-we-do.html#service-education">Read more</a>
        </article>

        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="currentColor">
              <path d="M6 27 32 5l26 22H6Zm5 3h42v26h5v4H6v-4h5V30Zm8 0v21h10V39a4 4 0 0 1 8 0v12h10V30H19Z"/>
            </svg>
          </div>
          <h3>Residential Facilities</h3>
          <p>To establish safe, nurturing residential and shelter facilities for children requiring long-term care and supervision.</p>
          <a href="what-we-do.html#service-amenities">Read more</a>
        </article>

        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="16" r="8"/>
              <path d="M5 52V41a13 13 0 0 1 26 0v11H5ZM46 6a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM34 31a13 13 0 0 1 24 7v14H35"/>
              <path d="M32 39c0-7 5-12 12-12s12 5 12 12"/>
            </svg>
          </div>
          <h3>Family &amp; Community Support</h3>
          <p>To guide parents through counseling, conduct awareness drives, train caregivers and special educators, and distribute assistive aids or scholarships to underprivileged families.</p>
          <a href="what-we-do.html#service-family">Read more</a>
        </article>

        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="currentColor">
              <path d="M32 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 44a18 18 0 1 1 0-36 18 18 0 0 1 0 36Zm0-4a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z"/>
              <path d="M30 17h4v14h-4zM30 34h4v4h-4z"/>
              <g fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="32" cy="32" r="28" strokeDasharray="3 5"/>
              </g>
            </svg>
          </div>
          <h3>Rights &amp; Advocacy</h3>
          <p>To promote equal opportunities, protect the rights of persons with disabilities, and help establish an inclusive, barrier-free society.</p>
          <a href="what-we-do.html#service-outreach">Read more</a>
        </article>

        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="27" width="54" height="28" rx="3"/>
              <path d="M12 27V16a13 13 0 0 1 26 0v11M17 27V16a8 8 0 0 1 16 0v11M42 33v17M48 33v17M54 33v17M9 34h3v8H9z"/>
              <circle cx="16" cy="41" r="4"/>
            </svg>
          </div>
          <h3>Oral &amp; Aural Training</h3>
          <p>To promote activities that support effective oral and aural communication for children with hearing impairments.</p>
          <a href="what-we-do.html#service-education">Read more</a>
        </article>

        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M32 5v8M32 51v8M5 32h8M51 32h8M13 13l6 6M45 45l6 6M51 13l-6 6M19 45l-6 6"/>
              <circle cx="32" cy="32" r="19"/>
              <circle cx="32" cy="32" r="10"/>
              <path d="m29 24 2-5h3l1 5 4 2 4-2 2 3-3 4v4l3 3-2 3-5-1-3 2-1 5h-4l-1-5-4-2-4 2-2-3 3-4v-4l-3-3 2-3 5 1z"/>
            </svg>
          </div>
          <h3>Knowledge Dissemination</h3>
          <p>To share knowledge and raise awareness about issues affecting persons with special needs.</p>
          <a href="what-we-do.html#special-services">Read more</a>
        </article>

        <article className="services-overview-card">
          <div className="services-overview-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 57 22 37a11 11 0 0 1 10-6h7a8 8 0 0 0 7-4l8-13a4 4 0 0 1 7 4L51 38a11 11 0 0 1-10 6H29"/>
              <circle cx="24" cy="17" r="10"/>
              <path d="M31 41h27a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5H34"/>
            </svg>
          </div>
          <h3>Training</h3>
          <p>To organize training for teachers, therapists, parents, and community workers.</p>
          <a href="what-we-do.html#service-outreach">Read more</a>
        </article>
      </div>
    </div>
  </section>
    </>
  );
}
