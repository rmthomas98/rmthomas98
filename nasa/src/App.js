import React from 'react';
import './App.css';
import Header from './components/Header';
import NasaPic from './components/NasaPic';
import News from './components/News';

class App extends React.Component  {

  constructor() {
    super()
    this.state = { 
      articles: [],
      sols: [],
      scrollPos: 0
    }
  }

  handleScroll = () => {
    this.setState({ scrollPos: window.scrollY })
    console.log(this.state.scrollPos)
    if (this.state.scrollPos > 500) {
      document.querySelector('header').classList.add('fixed');
    } else {
      document.querySelector('header').classList.remove('fixed');
    }
  }

  componentDidMount() {
    fetch('https://test.spaceflightnewsapi.net/api/v2/articles')
    .then(res => res.json())
    .then(result => this.setState({ articles: result }))
    window.addEventListener('scroll', this.handleScroll)
  }

  render() {

    return(
      <>
        <div name="top" className="front-page-container">
          <div className="app">
            <Header />
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
      </>
    );
  }
};

export default App;

