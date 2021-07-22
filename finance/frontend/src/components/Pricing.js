import React from "react";

function Pricing() {
  return (
    <div className="pricing-container">
      <h2 className="pricing-header">Pricing</h2>
      <div className="pricing-flex-container">
        <div className="card">
          <div className="main-plan">
            <p className="plan">Free trial</p>
            <p className="price">$0.00</p>
          </div>
          <p className="features">Features</p>
          <p className="feature">
            <span>✓</span>Charting
          </p>
          <p className="feature">
            <span>✓</span>Top Movers
          </p>
          <p className="feature">
            <span>✓</span>News & Press Releases
          </p>
          <p className="feature">
            <span>✓</span>Financial Info
          </p>
          <p className="feature">
            <span>✓</span>Stock Statistics
          </p>
          <p className="feature">
            <span>✓</span>SEC Filings
          </p>
          <div className="select-plan">
            <a href="/signup" className="select-plan-btn">
              Select Plan<i className="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
        </div>
        <div className="card">
          <div className="main-plan">
            <p className="plan">monthly</p>
            <p className="price">$29.99</p>
          </div>
          <p className="features">Features</p>
          <p className="feature">
            <span>✓</span>Charting
          </p>
          <p className="feature">
            <span>✓</span>Top Movers
          </p>
          <p className="feature">
            <span>✓</span>News & Press Releases
          </p>
          <p className="feature">
            <span>✓</span>Financial Info
          </p>
          <p className="feature">
            <span>✓</span>Stock Statistics
          </p>
          <p className="feature">
            <span>✓</span>SEC Filings
          </p>
          <div className="select-plan">
            <a href="/signup" className="select-plan-btn">
              Select Plan<i className="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
        </div>
        <div className="card">
          <div className="main-plan">
            <p className="plan">Annual</p>
            <p className="price">$299.99</p>
          </div>
          <p className="features">Features</p>
          <p className="feature">
            <span>✓</span>Charting
          </p>
          <p className="feature">
            <span>✓</span>Top Movers
          </p>
          <p className="feature">
            <span>✓</span>News & Press Releases
          </p>
          <p className="feature">
            <span>✓</span>Financial Info
          </p>
          <p className="feature">
            <span>✓</span>Stock Statistics
          </p>
          <p className="feature">
            <span>✓</span>SEC Filings
          </p>
          <div className="select-plan">
            <a href="/signup" className="select-plan-btn">
              Select Plan
              <i className="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
