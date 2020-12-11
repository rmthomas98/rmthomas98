import React from 'react';
import './App.css';
import Header from './components/Header';
import NasaPic from './components/NasaPic';
import News from './components/News';

let webHeight;

class App extends React.Component  {

  constructor() {
    super()
    this.state = { 
      articles: [],
      scrollPos: 0,
      htmlHeight: 0,
      fillPercentage: 0
    }
  }

  componentDidMount() {
    fetch('https://test.spaceflightnewsapi.net/api/v2/articles')
    .then(res => res.json())
    .then(result => this.setState({ articles: result }))
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    webHeight = document.querySelector('html').offsetHeight - document.querySelector('html').clientHeight;

    this.setState({ 
      scrollPos: window.scrollY,
      htmlHeight: webHeight,
      fillPercentage: Math.round((window.scrollY / webHeight) * 100)
    })

    if (this.state.scrollPos > 0) {
      document.querySelector('.fixed').style.backgroundColor = "#000000ee";
    } else {
      document.querySelector('.fixed').style.backgroundColor = "#000000a1";
    }
  }

  render() {

    return(
      <div className="page-container">
        <div name="top" className="front-page-container">
          <div className="app">
            <Header fill={ this.state.fillPercentage }/>
          </div>
        </div>
        <div className="news-container" name="news-container">
          <h2 className="news-header">Latest Spaceflight News</h2>
          <div className="article-container">
            { this.state.articles.map((article, index) => 
              <News
                key={ index }
                title={ article.title }
                url={ article.url }
                imageUrl={ article.imageUrl }
                summary={ article.summary }
              />
            )}
          </div>
        </div>
        <NasaPic />
      </div>
    );
  }
};

export default App;

