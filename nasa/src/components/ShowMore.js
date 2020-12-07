import React from 'react';
import { Link } from 'react-scroll';

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
      <Link 
      className="show-me-button" 
      id="show-me"
      to={ 'news-container' }
      smooth={ true }
      duration={ 500 }>
        See More
      </Link>
    </div>
  )
};

export default ShowMore;