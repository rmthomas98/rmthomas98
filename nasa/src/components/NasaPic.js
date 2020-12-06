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
      isShowingInfo: false
    }
  }

  componentDidMount() {
    fetch(api.base + api.key)
    .then(res => res.json())
    .then(result => {
      apiInfo = result
      this.setState({ url: result.url })
      console.log(result)
    })
    document.getElementById('underline').style.display = "none";
  };

  handleButtonClick = (e) => {
    if (this.state.isShowingInfo) {
      this.setState({
        desc: '',
        title: '',
        isShowingInfo: false
      })
      e.target.innerHTML = "Show Picture Info";
      document.getElementById('underline').style.display = "none";
    } else {
      this.setState({
        desc: apiInfo.explanation,
        title: apiInfo.title,
        isShowingInfo: true
      })
      e.target.innerHTML = "Hide Picture Info"
      document.getElementById('underline').style.display = "block";
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
          className="nasa-pic" 
          height="800px"/>
        <div className="button-container">
          <Link 
          to={'info'}
          smooth={true}
          duration={400}
          className="view-info" 
          onClick={ this.handleButtonClick }>
            View Picture Info
          </Link>
        </div>
          <h3 id="underline">{ this.state.title }</h3>
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