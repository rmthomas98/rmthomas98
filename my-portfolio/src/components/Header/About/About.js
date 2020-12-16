import React from 'react';
import './About.css';
import headshot from './assets/headshot.png';

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xColor: '#fff'
    }
  }

  handleHover = () => {
    this.setState({ xColor: '#000' })
  }

  handleMouseLeave = () => {
    this.setState({ xColor: '#fff' })
  }
  
  render() {
    return(
      <div className="about-container" style={{zIndex: this.props.show[0], backgroundColor: this.props.show[1]}}>
        <div className="about-head-flex">
          <h2 className="about-h2">About Me</h2>
          <div className="x-about" onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave} onClick={this.props.click}>
            <div className="line-x-about line1-x-about" style={{backgroundColor: this.state.xColor}}></div>
            <div className="line-x-about line2-x-about" style={{backgroundColor: this.state.xColor}}></div>
          </div>
        </div>
        <div className="bio-container">
          <div className="headshot">
            <img src={headshot} alt="ryan thomas" className="headshot-pic" />
          </div>
          <div className="bio">
            <p className="bio-text">I was hooked whenever I found the front end development part of coding. Something about it just really interested me. Everything I have learned has been self taught. I am a simple guy that loves to sit down and code for hours upon hours. I really have a passion for it and want to continue to become the best I can be one day at a time.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default About;