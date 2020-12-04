import './App.css';
import React from 'react';
import Header from './components/Header.js';

const api = {
  base: 'https://api.nasa.gov/planetary/apod?api_key=',
  key: 'gWnbcSWjYvEtYcSHeFOCojVkmcjDUSvLo034yzAC'
};

class App extends React.Component {

  constructor() {
    super()
      this.state = {
      background: ''
    }
  }

  backgroundPic = () => {
    fetch(api.base + api.key)
    .then(res => res.json())
    .then(result => {
    console.log(result.hdurl)
    this.setState({ background: result.hdurl })
    })
  }

  render() {
    const backgroundImg = {backgroundImage: `url(${this.state.background})`}
    window.onload = () => { this.backgroundPic() }

    return (
      <>
      <div className="app" style={ backgroundImg }>
        <Header />
      </div>
      </>
    );
  }
}

export default App;
