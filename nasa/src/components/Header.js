import React from 'react';
import ShowMore from './ShowMore';
import { Link } from 'react-scroll';

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScrollBar)
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  handleScrollBar = () => {
    document.querySelector('.filler').style.width = `${this.props.fill}%`;
  }

  handleBurgerClick = () => {
    document.querySelector('.main-nav').classList.toggle('active');
    document.querySelector('.line1').classList.toggle('active-move1')
    document.querySelector('.line2').classList.toggle('dissapear')
    document.querySelector('.line3').classList.toggle('active-move2')
    document.querySelector('.main-nav').classList.toggle('slide-in')
  };

  render() {
    return(
      <div className="header-container">
        <header className="fixed">
        <div className="holder">
          <div>
            <h1><Link 
            to={ 'top' }
            smooth={ true }
            duration={ 500 }>Space</Link></h1>
          </div>
          <div className="burger" onClick={ this.handleBurgerClick }>
            <span className="line1 line"></span>
            <span className="line2 line"></span>
            <span className="line3 line"></span>
          </div>
          <div className="main-nav-container">
            <ul className="main-nav">
              <li>
                <Link 
                to={'nasa-pic-of-day'} 
                smooth={ true } 
                duration={ 500 }
                offset={ this.state.windowWidth > 800 ? -76 : -157 }
                className="main-nav-item">Nasa APOD</Link>
              </li>
              <li><Link
                to={'moon'}
                smooth={true}
                duration={500}
                offset={this.state.windowWidth > 800 ? -76 : -157}
                className="main-nav-item">Moon Weight</Link>
              </li>
              <li><Link 
                className="main-nav-item last"
                to={ 'news-container' }
                smooth={ true }
                offset={ this.state.windowWidth > 800 ? -76 : -157 }
                duration={ 500 }>News</Link>
              </li>
            </ul>
          </div>
          </div>
        </header>
          <div className="scroll-bar-animation">
            <div className="filler"></div>
          </div>
        <ShowMore offset={ this.state.windowWidth }/>
      </div>
    )
  }
}

export default Header;