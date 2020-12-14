import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Skills from './components/Skills/Skills'

let webHeight = document.querySelector('html').offsetHeight - document.querySelector('html').clientHeight;

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      fillPercentage: 0,
      scrollPos: window.scrollY,
      htmlHeight: webHeight,
      color: 'transparent'
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    webHeight = document.querySelector('html').offsetHeight - document.querySelector('html').clientHeight;
    this.setState({ htmlHeight: webHeight })
  }

  handleScroll = () => {
    webHeight = document.querySelector('html').offsetHeight - document.querySelector('html').clientHeight;

    this.setState({ 
      htmlHeight: webHeight,
      scrollPos: window.scrollY,
      fillPercentage: Math.round((window.scrollY / webHeight) * 100)
    })
    if (this.state.scrollPos > 400) {
      this.setState({ color: '#FFFFFF' })
    } else {
      this.setState({ color: 'transparent' })
    }
  }

  render() {
    return(
      <div className='container'>
        <Header fill={this.state.fillPercentage} background={this.state.color}/>
        <Skills />
      </div>
    );
  };
};

export default App;