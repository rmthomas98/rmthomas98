import React from 'react';
import { Link } from 'react-scroll';

const api = {
  base: 'https://api.nasa.gov/planetary/apod?api_key=',
  key: 'gWnbcSWjYvEtYcSHeFOCojVkmcjDUSvLo034yzAC'
};

let apiInfo;

class NasaPic extends React.Component {
  constructor() {
  super()
    this.state = {
      url: '',
      desc: '',
      title: '',
      isShowingInfo: false,
      windowWidth: window.innerWidth,
      display: 'none',
      infoButton: 'Show Picture Info'
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    fetch(api.base + api.key)
    .then(res => res.json())
    .then(result => {
      apiInfo = result
      this.setState({ url: result.url })
    })
  };

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth })
  };

  handleButtonClick = (e) => {
    if (this.state.isShowingInfo) {
      this.setState({
        desc: '',
        title: '',
        isShowingInfo: false,
        display: 'none',
        infoButton: 'Show Picture Info'
      })
    } else {
      this.setState({
        desc: apiInfo.explanation,
        title: apiInfo.title,
        isShowingInfo: true,
        display: 'block',
        infoButton: 'Hide Picture Info'
      })
    }
  }

  render() {

    return(
      <div 
      name="nasa-pic-of-day" 
      className="section-nasa-pic-container">
        <h2>Nasa Astronomy Picture of the Day</h2>
        <div className="nasa-pic-container">
          <img 
          src={ this.state.url } 
          alt="nasa-apod" 
          className="nasa-pic" />
        <div className="button-container">
          <Link 
          to={'info'}
          smooth={true}
          duration={400}
          offset={ this.state.windowWidth > 800 ? -76 : -117 }
          className="view-info" 
          onClick={ this.handleButtonClick }>
            {this.state.infoButton}
          </Link>
        </div>
          <h3 id="underline" style={{ display: this.state.display }}>{ this.state.title }</h3>
          <p
          id="info"
          name="info" 
          className="nasa-desc">
            { this.state.desc }
          </p>
        </div>
      </div>
    )
  }
}

export default NasaPic;