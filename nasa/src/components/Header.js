import React from 'react';
import ShowMore from './ShowMore';
import { Link } from 'react-scroll';

const Header = () => {

  return(
    <div className="header-container">
      <header>
        <div>
          <h1>Space</h1>
        </div>
        <div className="main-nav-container">
          <ul className="main-nav">
            <li><Link 
            to={'nasa-pic-of-day'} 
            smooth={ true } 
            duration={500} 
            className="main-nav-item">
              Nasa APOD
                </Link>
            </li>
            <li><Link 
            className="main-nav-item"
            to={ 'news-container' }
            smooth={ true }
            duration={ 500 }>News</Link></li>
          </ul>
        </div>
      </header>
      <ShowMore />
    </div>
  )
}

export default Header;