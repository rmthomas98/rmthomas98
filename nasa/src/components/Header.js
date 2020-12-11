import React from 'react';
import ShowMore from './ShowMore';
import { Link } from 'react-scroll';

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth,
      fill: 0,
      dropdownClass: '',
      line1: '',
      line2: '',
      line3: '',
      isRunning: false
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
    this.setState({ fill: `${this.props.fill}%` })
  }

  handleBurgerClick = () => {
    if (!this.state.isRunning) {
      this.setState({ 
        dropdownClass: 'active slide-in',
        line1: 'active-move1',
        line2: 'dissapear',
        line3: 'active-move2',
        isRunning: true
      })
    } else {
      this.setState({ 
        dropdownClass: '',
        line1: '',
        line2: '',
        line3: '',
        isRunning: false
      })
    }
  };

  render() {
    return(
      <div className="header-container">
        <header className="fixed" style={{ backgroundColor: this.props.color }}>
        <div className="holder">
          <div>
            <h1><Link 
            to={ 'top' }
            smooth={ true }
            duration={ 500 }>Space</Link></h1>
          </div>
          <div className="burger" onClick={ this.handleBurgerClick }>
            <span className={`line1 line ${this.state.line1}`}></span>
            <span className={`line2 line ${this.state.line2}`}></span>
            <span className={`line3 line ${this.state.line3}`}></span>
          </div>
          <div className="main-nav-container">
            <ul className={`main-nav ${this.state.dropdownClass}`}>
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
            <div className="filler" style={{width: this.state.fill }}></div>
          </div>
        <ShowMore offset={ this.state.windowWidth }/>
      </div>
    )
  }
}

export default Header;