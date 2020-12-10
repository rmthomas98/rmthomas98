import React from 'react';
import ShowMore from './ShowMore';
import { Link } from 'react-scroll';

class Header extends React.Component {

    constructor() {
      super()
      this.state = {
        windowWidth: window.innerWidth
      }
    }

    handleResize = () => {
      this.setState({ windowWidth: window.innerWidth })
      console.log(this.state.windowWidth)
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
      window.addEventListener('resize', this.handleResize)
    }

  handleBurgerClick = () => {
    document.querySelector('.main-nav').classList.toggle('active');
    document.querySelector('.line1').classList.toggle('active-move1')
    document.querySelector('.line2').classList.toggle('dissapear')
    document.querySelector('.line3').classList.toggle('active-move2')
  };

  render() {
    return(
      <div className="header-container">
        <header>
        <div className="holder">
          <div>
            <h1><Link 
            to={ 'top' }
            smooth={ true }
            duration={ 500 }>Space</Link></h1>
          </div>
          <div className="burger" onClick={ this.handleBurgerClick }>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
          <div className="main-nav-container">
            <ul className="main-nav">
              <li><Link 
              to={'nasa-pic-of-day'} 
              smooth={ true } 
              duration={ 500 }
              offset={ this.state.windowWidth > 800 ? -76 : -173 }
              className="main-nav-item">
                Nasa APOD
                  </Link>
              </li>
              <li><Link 
              className="main-nav-item"
              to={ 'news-container' }
              smooth={ true }
              offset={ this.state.windowWidth > 800 ? -76 : -173 }
              duration={ 500 }>News</Link></li>
            </ul>
          </div>
          </div>
        </header>
        <ShowMore offset={ this.state.windowWidth }/>
      </div>
    )
  }
}

export default Header;