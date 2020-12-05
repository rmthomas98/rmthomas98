import React from 'react';
import ShowMore from './ShowMore';

const Header = () => {

  return(
    <div className="header-container">
      <header>
        <div>
          <h1>Space</h1>
        </div>
        <div className="main-nav-container">
          <ul className="main-nav">
            <li><a href="" className="main-nav-item">Nasa APOD</a></li>
            <li><a href="" className="main-nav-item">News</a></li>
            <li><a href="" className="main-nav-item">Planets</a></li>
          </ul>
        </div>
      </header>
      <ShowMore />
    </div>
  )
}

export default Header;