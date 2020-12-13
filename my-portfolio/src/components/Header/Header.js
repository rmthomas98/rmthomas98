import React from 'react';
import './Header.css';
import resume from './assets/ryanthomas.pdf';

class Header extends React.Component {

  constructor() {
    super()
    this.state = {
      isShowing: false,
      animatingClass: '',
      background: '',
      lineAnimation1: '',
      lineAnimation2: '',
      lineAnimation3: '',
      frontEndButtons: ''
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY > 0) {
      this.setState({ frontEndButtons: 'hide' })
    } else {
      this.setState({ frontEndButtons: 'show' })
    }
  }

  handleBurgerClick = () => {
    if (!this.state.isShowing) {
      this.setState({
        isShowing: true,
        animatingClass: 'slide-in-animation',
        background: '#00000069',
        lineAnimation1: 'line1in 0.3s ease-in forwards',
        lineAnimation2: '0',
        lineAnimation3: 'line3in 0.3s linear forwards'
      }) 
    } else {
      this.setState({
        isShowing: false,
        animatingClass: 'slide-out-animation',
        background: '',
        lineAnimation1: 'line1out 0.3s ease-in forwards',
        lineAnimation2: '1',
        lineAnimation3: 'line3out 0.3s linear forwards'
      })
    };
  };

  render() {
    return(
      <div className="header-container" style={{backgroundColor: this.state.background}}>
        <header>
          <div className="name">
            <h1>Ryan Thomas</h1>
          </div>
          <div className="burger" onClick={this.handleBurgerClick}>
            <div className="line1 line" style={{animation: this.state.lineAnimation1 }}></div>
            <div className="line2 line" style={{opacity: this.state.lineAnimation2}}></div>
            <div className="line3 line" style={{animation: this.state.lineAnimation3}}></div>
          </div>
        </header>
        <div className={`front-end-dev ${this.state.frontEndButtons}`}>
          <h2>front end developer</h2>
          <div className="button-container">
            <a href="#" className="view-projects-button">View Projects</a>
            <a href="https://github.com/rmthomas98" target="_blank" className="view-projects-button">View Github</a>
          </div>
        </div>
        <div className={`main-nav ${this.state.animatingClass}`}>
          <ul>
             <a href=""><li onClick={this.handleBurgerClick}>Projects</li></a>
             <a href="#"><li onClick={this.handleBurgerClick}>Skills</li></a>
             <a href="https://github.com/rmthomas98" target="_blank"><li onClick={this.handleBurgerClick}>Github</li></a>
             <a href={resume}><li onClick={this.handleBurgerClick}>Resume</li></a>
             <a href="#"><li onClick={this.handleBurgerClick}>About</li></a>
             <a href="#"><li onClick={this.handleBurgerClick}>Contact</li></a>
          </ul>
        </div>
      </div>
    );
  }
};

export default Header;