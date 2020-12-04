import { getDefaultNormalizer } from '@testing-library/react';
import React from 'react';

const Header = () => {
  return(
    <div className="header-container">
      <header>
        <div>
          <h1>Space</h1>
        </div>
        <div className="main-nav-container">
          <ul className="main-nav">
            <li><a href="" className="main-nav-item">Link 1</a></li>
            <li><a href="" className="main-nav-item">Link 2</a></li>
            <li><a href="" className="main-nav-item">Link 3</a></li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header;