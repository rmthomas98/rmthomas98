import React from "react";

function NavBar() {
  return (
    <div className="navbar-container">
      <div className="nav-content-container">
        <div className="main-nav">
          <a href="/" className="nav-link">
            home
          </a>
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
            log in
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
