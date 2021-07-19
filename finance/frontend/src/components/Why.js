import React from "react";

function Why() {
  return (
    <div className="why-container">
      <div className="about-container">
        <h2 className="why-heading">Why Choose SpeedStats?</h2>
        <p className="about">
          Our mission here at SpeedStats is to provide you with the most
          accurate information as possible while being as efficient as possible.
          We know how much of a pain it can be to look through all the
          technicals and fundamentals of a stock and how much time it can take
          up. Our goal is to make this a much quicker and easier process so you
          can focus your attention in areas where it is more important.
        </p>
        <div className="info-flex">
          <div className="col speed">
            <i className="fas fa-tachometer-alt"></i>
            <p className="reason">speed</p>
            <p className="description-small">
              Real time data feed at lightning speeds so you won't have to worry
              about missing any plays.
            </p>
          </div>
          <div className="col service">
            <i className="fas fa-users"></i>
            <p className="reason">service</p>
            <p className="description-small">
              Providing the best service is at the top of our priorities. Call,
              Email, or jump on the live chat with any questions you may have.
            </p>
          </div>
          <div className="col prices">
            <i className="fas fa-balance-scale"></i>
            <p className="reason">Simplicity</p>
            <p className="description-small">
              All of the information you need will be right in front of you. No
              need to flip through different websites to find what you're
              looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why;
