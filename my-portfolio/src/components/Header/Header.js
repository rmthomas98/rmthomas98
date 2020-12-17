import React from 'react';
import './Header.css';
import resume from './assets/ryanthomas.pdf';
import Contact from './Contact/Contact';
import About from './About/About';
import { Link } from 'react-scroll';

let contactStyle = ['-1', 'transparent'];
let aboutStyle = ['-1', 'transparent'];

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
      liAnimation: '',
      contact: contactStyle,
      about: aboutStyle
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
    }
  }

  handleContactClick = () => {
    this.handleBurgerClick();
    this.contactClick();
  }

  handleAboutClick = () => {
    this.handleBurgerClick();
    this.aboutClick();
  }

  contactClick = () => {
    contactStyle = ['9999', '#000000e7'];
    this.setState({
      contact: contactStyle
    })
  }

  aboutClick = () => {
    aboutStyle = ['9998', '#000000e7'];
    this.setState({
      about: aboutStyle
    })
  } 

  xButtonClick = () => {
    contactStyle = ['-1', 'transparent'];
    aboutStyle = ['-1', 'transparent'];
    this.setState({
      contact: contactStyle,
      about: aboutStyle
    })
  }

  render() {
    return(
      <div className="header-container" name="top" style={{backgroundColor: this.state.background}}>
        <div className="bar">
          <div className="filler" style={{width: `${this.props.fill}%`}}></div>
        </div>
        <header style={{backgroundColor: this.props.background, boxShadow: this.props.shadow}}>
          <div className="name">
            <h1><Link to={'top'} duration={500} smooth={true}>Ryan Thomas</Link></h1>
          </div>
        </header>
        <div className={`front-end-dev ${this.state.frontEndButtons}`}>
          <h2 className="front-end-dev-h2">front end developer</h2>
          <div className="button-container">
            <Link to={'projects'} smooth={true} duration={500} offset={this.props.window > 450 ? -49 : -44} className="view-projects-button">View Projects</Link>
            <a href="https://github.com/rmthomas98" target="_blank" rel="noreferrer" className="view-projects-button">View Github</a>
          </div>
        </div>
        <div className="burger" onClick={this.handleBurgerClick}>
          <div className="line1 line" style={{animation: this.state.lineAnimation1 }}></div>
          <div className="line2 line" style={{opacity: this.state.lineAnimation2}}></div>
          <div className="line3 line" style={{animation: this.state.lineAnimation3}}></div>
        </div>
        <div className={`main-nav ${this.state.animatingClass}`}>
          <ul>
             <Link to={'projects'} smooth={true} duration={500} offset={this.props.window > 450 ? -49 : -44}><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Projects</li></Link>
             <Link to={'skills'} smooth={true} duration={500} offset={this.props.window > 450 ? -49 : -44}><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Skills</li></Link>
             <a href="https://github.com/rmthomas98" target="_blank" rel="noreferrer"><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Github</li></a>
             <a href={resume} target="_blank" rel="noreferrer"><li onClick={this.handleBurgerClick} className={this.state.liAnimation}>Resume</li></a>
             <li onClick={this.handleAboutClick} className={`about ${this.state.liAnimation}`}>About</li>
             <li onClick={this.handleContactClick} className={`contact ${this.state.liAnimation}`}>Contact</li>
          </ul>
        </div>
        <Contact show={this.state.contact} click={this.xButtonClick} />
        <About show={this.state.about} click={this.xButtonClick} />
      </div>
    );
  }
};

export default Header;