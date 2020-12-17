import React from 'react';
import './Projects.css';

class Projects extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="projects-main-container" name="projects">
        <h2 className="projects-h2" style={{animation: this.props.animation}}>Projects</h2>
        <div className="projects-container">
          <div className="project" style={{animation: this.props.animation}}>
            <i className="fas fa-rocket"></i>
            <p className="project-title">Space Website</p>
            <p className="project-description">You can find all of the latest spaceflight news here. You can also find Nasa's Astronomy Picture of the Day. You can also play around with a feature that calculates what you would weigh on the moon!</p>
            <div className="project-buttons">
              <a href="https://github.com/rmthomas98/rmthomas98/tree/master/nasa" target="_blank" rel="noreferrer">View Code</a>
              <a href="https://space-station.netlify.app/" target="_blank" rel="noreferrer">Visit Site</a>
            </div>
          </div>
          <div className="project" style={{animation: this.props.animation}}>
            <i className="fas fa-mug-hot"></i>
            <p className="project-title">Coffee Shop Website</p>
            <p className="project-description">Learn more about your local coffee shop! Get to know the baristas, the whole coffee shop menu, look at what peopleare saying about it, and much more!</p>
            <div className="project-buttons">
              <a href="https://github.com/rmthomas98/rmthomas98/tree/master/coffee" target="_blank" rel="noreferrer">View Code</a>
              <a href="https://rmthomas98.github.io/" target="_blank" rel="noreferrer">Visit Site</a>
            </div>
          </div>
          <div className="project" style={{animation: this.props.animation}}>
            <i className="fas fa-cloud"></i>
            <p className="project-title">Weather App</p>
            <p className="project-description">Look up the weather in any City inside of the United States! All weather data retrieved through OpenWeatherMap Api</p>
            <div className="project-buttons">
              <a href="https://github.com/rmthomas98/rmthomas98/tree/master/weather-react" target="_blank" rel="noreferrer">View Code</a>
              <a href="https://youthful-babbage-f24b3c.netlify.app/" target="_blank" rel="noreferrer">Visit Site</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Projects;