export default function Footer() {
  return (
    <>
  <footer className="footer" id="footer">
    <div className="container">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="/" className="logo" id="footer-logo">
            MOHOR<span>.</span>
          </a>
          <p>We provide inclusive care, therapy, and resources for children with special needs to reach their potential.</p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col" id="footer-col-home">
            <h4 className="footer-col-title">Home</h4>
            <ul className="footer-list">
              <li><a href="about.html" id="footer-link-about">About us</a></li>
              <li><a href="about.html#team" id="footer-link-team">Team</a></li>
              <li><a href="what-we-do.html" id="footer-link-what-we-do">What we do</a></li>
              <li><a href="contact.html" id="footer-link-contact-us">Contact</a></li>
              <li><a href="/images/Society%20Registration.jpg" target="_blank" rel="noopener" id="footer-link-society-registration">Society Registration</a></li>
              <li><a href="/images/Certificate%20of%20PWD.jpg" target="_blank" rel="noopener" id="footer-link-pwd-certificate">Certificate of PWD</a></li>
            </ul>
          </div>

          <div className="footer-col" id="footer-col-more">
            <h4 className="footer-col-title">More</h4>
            <ul className="footer-list">
              <li><a href="project-detail.html" id="footer-link-projects">Projects</a></li>
              <li><a href="event-detail.html" id="footer-link-events">Events</a></li>
              <li><a href="donate.html" id="footer-link-donate">Donate</a></li>
              <li><a href="media.html" id="footer-link-blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-col" id="footer-col-connect">
            <h4 className="footer-col-title">Connect</h4>
            <ul className="footer-list">
              <li><a href="#" id="footer-link-fb">Facebook</a></li>
              <li><a href="#" id="footer-link-insta">Instagram</a></li>
              <li><a href="#" id="footer-link-twitter">Twitter</a></li>
              <li><a href="#" id="footer-link-linkedin">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-visit">
          <h4 className="footer-col-title">Visit MOHOR</h4>
          <address className="footer-address">
            39/3, R.K. Chatterjee Road, Kasba,<br />
            Kolkata - 700042<br />
            (Recreation Club Premises)
          </address>
          <a className="footer-contact-link" href="contact.html#contact-info">Contact us <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p id="copyright-text">&copy; 2026 MOHOR. All rights reserved.</p>
        <p id="footer-terms"><a href="#">Privacy Policy</a> &nbsp;|&nbsp; <a href="#">Terms of Service</a></p>
      </div>
    </div>
  </footer>
    </>
  );
}
