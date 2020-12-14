import React from 'react';
import './Header.css';
import resume from './assets/ryanthomas.pdf';
import { Link } from 'react-scroll';

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowing: false,
      animatingClass: '',
      background: '',
      lineAnimation1: '',
      lineAnimation2: '',
      lineAnimation3: '',
      frontEndButtons: '',
      liAnimation: ''
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
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
        lineAnimation3: 'line3in 0.3s linear forwards',
        liAnimation: 'button-slide-in'
      }) 
    } else {
      this.setState({
        isShowing: false,
        animatingClass: 'slide-out-animation',
        background: '',
        lineAnimation1: 'line1out 0.3s ease-in forwards',
        lineAnimation2: '1',
        lineAnimation3: 'line3out 0.3s linear forwards',
        liAnimation: ''
      })
    };
  };

  render() {
    return(
      <div className="header-container" name="top" style={{backgroundColor: this.state.background}}>
        <div className="bar">
          <div className="filler" style={{width: `${this.props.fill}%`}}></div>
        </div>
        <header style={{backgroundColor: this.props.background}}>
          <div className="name">
            <h1><Link to={'top'} duration={500} smooth={true}>Ryan Thomas</Link></h1>
          </div>
        </header>
        <div className={`front-end-dev ${this.state.frontEndButtons}`}>
          <h2 className="front-end-dev-h2">front end developer</h2>
          <div className="button-container">
            <a href="#" className="view-projects-button">View Projects</a>
            <a href="https://github.com/rmthomas98" target="_blank" className="view-projects-button">View Github</a>
          </div>
        </div>
        <div className="burger" onClick={this.handleBurgerClick}>
          <div className="line1 line" style={{animation: this.state.lineAnimation1 }}></div>
          <div className="line2 line" style={{opacity: this.state.lineAnimation2}}></div>
          <div className="line3 line" style={{animation: this.state.lineAnimation3}}></div>
        </div>
        <div className={`main-nav ${this.state.animatingClass}`}>
          <ul>
             <a href=""><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Projects</li></a>
             <Link to={'skills'} smooth={true} duration={500} offset={-49}><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Skills</li></Link>
             <a href="https://github.com/rmthomas98" target="_blank"><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Github</li></a>
             <a href={resume} target="_blank"><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Resume</li></a>
             <a href="#"><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>About</li></a>
             <a href="#"><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Contact</li></a>
          </ul>
        </div>
      </div>
    );
  }
};

export default Header;