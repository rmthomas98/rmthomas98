import React from 'react';

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
      copyright: '',
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
  };

  handleButtonClick = (e) => {
    if (this.state.isShowingInfo) {
      this.setState({
        copyright: '',
        desc: '',
        title: '',
        isShowingInfo: false
      })
      e.target.innerHTML = "Show Picture Info";
      document.getElementById('apod').style.backgroundColor = "transparent";
      document.getElementById('nasa-a').style.display = "none"
    } else {
      this.setState({
        copyright: apiInfo.copyright,
        desc: apiInfo.explanation,
        title: apiInfo.title,
        isShowingInfo: true
      })
      e.target.innerHTML = "Hide Picture Info"
      document.getElementById('apod').style.backgroundColor = "#000000ce";
      document.getElementById('nasa-a').style.display = "block"
    }
  }

  render() {

      let infoTitle = this.state.title === '' ? '' : 'Title: '+ this.state.title;
      let infoAuthor = this.state.copyright === '' ? '' : 'Author: '+ this.state.copyright;
      let nasaImage = { backgroundImage: `url(${this.state.url})` }

    return(
      <div>hello</div>
    )
  }
}

export default NasaPic;