export default function NavMenu() {
  return (
    <>
        <details className="nav-group" id="nav-group-about">
          <summary className="nav-link" id="nav-link-about">About us</summary>
          <div className="nav-dropdown">
            <a href="about.html" className="nav-dropdown-link">Our Story</a>
            <a href="leadership.html" className="nav-dropdown-link">Leadership Team</a>
            <a href="about.html#team" className="nav-dropdown-link">Our Community</a>
            <a href="media.html" className="nav-dropdown-link">Media &amp; Publication</a>
            <a href="/#donations" className="nav-dropdown-link">Financials</a>
          </div>
        </details>
        <details className="nav-group" id="nav-group-services">
          <summary className="nav-link" id="nav-link-services">Services</summary>
          <div className="nav-dropdown">
            <a href="what-we-do.html" className="nav-dropdown-link">Our Services</a>
            <a href="what-we-do.html#service-family" className="nav-dropdown-link">Family Support</a>
            <a href="what-we-do.html#service-education" className="nav-dropdown-link">Education</a>
            <a href="what-we-do.html#service-therapy" className="nav-dropdown-link">Therapy</a>
          </div>
        </details>
        <details className="nav-group" id="nav-group-resources">
          <summary className="nav-link" id="nav-link-resources">Resources</summary>
          <div className="nav-dropdown">
            <a href="project-detail.html" className="nav-dropdown-link">Impact Stories</a>
            <a href="event-detail.html" className="nav-dropdown-link">Latest Updates</a>
            <a href="media.html" className="nav-dropdown-link">In Media</a>
          </div>
        </details>
        <details className="nav-group" id="nav-group-involved">
          <summary className="nav-link" id="nav-link-involved">Get Involved</summary>
          <div className="nav-dropdown">
            <a href="donate.html" className="nav-dropdown-link">Donate</a>
            <a href="contact.html" className="nav-dropdown-link">Volunteer</a>
          </div>
        </details>
    </>
  );
}
