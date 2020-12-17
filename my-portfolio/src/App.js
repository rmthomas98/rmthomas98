import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'

let webHeight = document.querySelector('html').offsetHeight - document.querySelector('html').clientHeight;
const skillsStyle = ['fadeIn 1s ease forwards', 'iconTranslate 1s ease forwards', 'skillsDesc 1s ease forwards']
let windowWidth = window.innerWidth;

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      fillPercentage: 0,
      scrollPos: window.scrollY,
      htmlHeight: webHeight,
      windowWidth: windowWidth,
      color: 'transparent',
      shadow: '',
      skills: ''
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    webHeight = document.querySelector('html').offsetHeight - document.querySelector('html').clientHeight;
    windowWidth = window.innerWidth;
    this.setState({ 
      htmlHeight: webHeight,
      windowWidth: windowWidth
    })
  }

  handleScroll = () => {
    webHeight = document.querySelector('html').offsetHeight - document.querySelector('html').clientHeight;

    this.setState({ 
      htmlHeight: webHeight,
      scrollPos: window.scrollY,
      fillPercentage: Math.round((window.scrollY / webHeight) * 100)
    })
    if (this.state.scrollPos > 400) {
      this.setState({ 
        color: '#FFFFFF',
        shadow: '0px 0px 5px #555',
        skills: skillsStyle
      })
    } else {
      this.setState({ 
        color: 'transparent',
        shadow: ''
      })
    }
  }

  render() {
    return(
      <div className='container'>
        <Header fill={this.state.fillPercentage} background={this.state.color} shadow={this.state.shadow} window={this.state.windowWidth}/>
        <Skills background={this.state.color} skills={this.state.skills}/>
        <Projects />
      </div>
    );
  };
};

export default App;