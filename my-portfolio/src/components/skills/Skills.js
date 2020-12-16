import React from 'react';
import './Skills.css';

class Skills extends React.Component {

  constructor() {
    super()
    this.state = {
      defaultSkill: 'block',
      defaultSummary: 'block',
      html: '',
      css: '',
      js: '',
      react: '',
      animation: 'fade-in',
      htmlTransform: '',
      cssTransfrom: '',
      jsTransform: '',
      reactTransform: ''
    }
  }

  handleHover = (e) => {
    const current = e.target.getAttribute('name');
    switch(current) {
      case 'HTML':
        this.setState({
          defaultSkill: 'none',
          defaultSummary: 'none',
          html: 'block',
          css: 'none',
          js: 'none',
          react: 'none',
          animation: 'fade-in',
          htmlTransform: 'html-transform html-color',
          cssTransfrom: '',
          jsTransform: '',
          reactTransform: ''
        })
        break;
      case 'CSS':
        this.setState({
          defaultSkill: 'none',
          defaultSummary: 'none',          
          html: 'none',
          css: 'block',
          js: 'none',
          react: 'none',
          animation: 'fade-in',
          htmlTransform: '',
          cssTransfrom: 'css-transform css-color',
          jsTransform: '',
          reactTransform: ''
        })
        break;
      case 'Javascript':
        this.setState({
          defaultSkill: 'none',
          defaultSummary: 'none',          
          html: 'none',
          css: 'none',
          js: 'block',
          react: 'none',
          animation: 'fade-in',
          htmlTransform: '',
          cssTransfrom: '',
          jsTransform: 'js-transform js-color',
          reactTransform: ''
        })
        break;
      case 'React':
        this.setState({
          defaultSkill: 'none',
          defaultSummary: 'none',          
          html: 'none',
          css: 'none',
          js: 'none',
          react: 'block',
          animation: 'fade-in',
          htmlTransform: '',
          cssTransfrom: '',
          jsTransform: '',
          reactTransform: 'react-transform react-color'
        })
        break;
      default:
        return 'error';
    }
  }

  handleMouseEnterSkills = () => {
    this.setState({ animation: 'fade-in' })
  }

  render() {
    return(
      <div className="skills-container" name="skills">
        <div className="skills-header">
          <h2 className="skills-h2">Skills</h2>
        </div>
        <div className="skills">
          <div className="icons">
            <i 
            className={`fab fa-html5 html ${this.state.htmlTransform}`} 
            name="HTML" 
            onMouseEnter={this.handleHover} 
            onClick={this.handleHover}></i>
            <i 
            className={`fab fa-css3-alt css ${this.state.cssTransfrom}`} 
            name="CSS" 
            onMouseEnter={this.handleHover} 
            onClick={this.handleHover}></i>
            <i 
            className={`fab fa-js js ${this.state.jsTransform}`} 
            name="Javascript" 
            onMouseEnter={this.handleHover} 
            onClick={this.handleHover}></i>
            <i 
            className={`fab fa-react react ${this.state.reactTransform}`} 
            name="React" 
            onMouseEnter={this.handleHover} 
            onClick={this.handleHover}></i>
          </div>
          <div className="skill">
            <p style={{display: this.state.defaultSkill}}>Select an Icon Above to See More Info</p>
            <p className={`skill-html ${this.state.animation}`} style={{display: this.state.html}}>HTML</p>
            <p className={`skill-css ${this.state.animation}`} style={{display: this.state.css}}>CSS</p>
            <p className={`skill-js ${this.state.animation}`} style={{display: this.state.js}}>Javascript</p>
            <p className={`skill-react ${this.state.animation}`} style={{display: this.state.react}}>React</p>
          </div>
          <div className="skills-summary">
            <p style={{display: this.state.defaultSummary}}>This is my current skillset. I am continuing to improve my knowledge on each of these daily.</p>
            <p className={`html-summary ${this.state.animation}`} style={{display: this.state.html}}>Experience writing well thought out, semantic HTML. Also have experience with FlexBox as well as FlexGrid.</p>
            <p className={`css-summary ${this.state.animation}`} style={{display: this.state.css}}>Very confident in my abilities to achieve the best look and design within a webisite using CSS. Have experience using pseudo class transitions as well as keyframe animations.</p>
            <p className={`js-summary ${this.state.animation}`} style={{display: this.state.js}}>Ability to write clean, easily understood, ES6 Javscript code. </p>
            <p className={`react-summary ${this.state.animation}`} style={{display: this.state.react}}>Solid understaning of React. Ability to create dynamic web pages. Create well thought out, reusable components while keeping a good flow of data using state management as well as props.</p>
          </div>
        </div>
      </div>
    );
  }
}


export default Skills;