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
      sols: []
    }
  }

  componentDidMount() {
    fetch('https://test.spaceflightnewsapi.net/api/v2/articles')
    .then(res => res.json())
    .then(result => this.setState({ articles: result }))
  }

  render() {

    return(
      <>
        <div className="front-page-container">
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

