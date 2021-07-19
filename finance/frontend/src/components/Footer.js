import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="company-name">
          <a href="/" className="company-name">
            <p>SPEEDSTATS</p>
            <p className="sub-heading-company-name">Financial</p>
          </a>
        </div>
        <div className="footer-nav-container">
          <div className="footer-nav">
            <p className="header-footer">CONTACT</p>
            <a href="#" className="phone-footer">
              <i className="fas fa-phone"></i> (937)-321-8714
            </a>
            <a href="#" className="email-footer">
              <i className="fas fa-envelope"></i> ryanmthomas01@gmail.com
            </a>
          </div>
          <div className="footer-nav">
            <p className="header-footer">DISCLOSURES</p>
            <a href="#" className="disclosure-link">
              Terms of use
            </a>
            <a href="#" className="disclosure-link">
              Privacy Policy
            </a>
            <a href="#" className="disclosure-link">
              Legal
            </a>
            <a href="#" className="disclosure-link">
              Payments
            </a>
          </div>
          <div className="footer-nav">
            <p className="header-footer">SOCIALS</p>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
              Instagram
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
              Twitter
            </a>
          </div>
          <div className="footer-nav">
            <p className="header-footer">OTHER LINKS</p>
            <a href="#" className="other-link">
              About
            </a>
            <a href="#" className="other-link">
              Contact
            </a>
            <a href="#" className="other-link">
              Pricing
            </a>
            <a href="#" className="other-link">
              Features
            </a>
            <a href="#" className="other-link">
              Login
            </a>
            <a href="#" className="other-link">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
