import React from 'react';

const ShowMore = () => {

  const stopAnimation = () => {
    document.getElementById('show-me').style.animation = 'none';
    document.getElementById('show-me').style.boxShadow = '0px 5px 10px #000';
  }

  const startAnimation = () => {
    document.getElementById('show-me').style.animation = 'Bounce 2s ease-in-out infinite';
  }

  return(
    <div className="show-me" onMouseEnter={stopAnimation} onMouseLeave={startAnimation}>
      <a href="#" className="show-me-button" id="show-me">See More</a>
    </div>
  )
};

export default ShowMore;