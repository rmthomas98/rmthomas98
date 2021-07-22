import React from "react";

function FrontMessage() {
  return (
    <div className="front-message-container">
      <div className="animate-scaleIn">
        <h1>SpeedStats</h1>
        <h1 className="main-heading-h1">Stock Research Simplified</h1>
        <p className="description">
          Search through technicals and fundamentals all at lightning speeds.
          Charts, SEC filings, financials, as well as other stats such as market
          cap, float, and much more are available at your fingertips.
        </p>
        <div className="free-trial-front-message-btn">
          <a href="/signup" className="free-trial-btn">
            Start Free Trial
          </a>
        </div>
      </div>
    </div>
  );
}

export default FrontMessage;
