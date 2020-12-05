import React from 'react';

const api = {
  base: 'https://api.nasa.gov/planetary/apod?api_key=',
  key: 'gWnbcSWjYvEtYcSHeFOCojVkmcjDUSvLo034yzAC'
};

class NasaPic extends React.Component {
  constructor() {
  super()
  this.state = { url: '' }
  }

  fetchPicture = () => {
    fetch(api.base + api.key)
    .then(res => res.json())
    .then(result => 
      this.setState({ url: result.hdurl })
    )
  };


  render() {

    const picture = this.state.url;

    return(
      <div className="nasa-picture-container">
        <h2>NASA Astronomy Picture of the Day</h2>
        <button className="mybutton" onClick={ this.fetchPicture }>hello</button>
        <div>
          <img src={ picture } height="500px"/>
        </div>
      </div>
    )
  }
}

export default NasaPic;