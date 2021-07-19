import React from "react";

function NavBar() {
  return (
    <div className="navbar-container">
      <div className="nav-content-container">
        <div className="company-name">
          <a href="/" className="company-name">
            <p>SPEEDSTATS</p>
            <p className="sub-heading-company-name">Financial</p>
          </a>
        </div>
        <div className="main-nav">
          <a href="/about" className="nav-link">
            about
          </a>
          <a href="/contact" className="nav-link">
            contact
          </a>
          <a href="/pricing" className="nav-link">
            pricing
          </a>

          <a href="/features" className="nav-link">
            features
          </a>

          <a href="/login" className="nav-link">
            login
          </a>

          <a href="/signup" className="nav-link signup">
            sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
