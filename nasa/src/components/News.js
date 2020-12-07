import React from 'react';

const News = (props) => {

  return(
    <div className="card">
    <a href={ props.url } target="_blank">
      <img src={ props.imageUrl } alt="article-img" className="article-pic"/>
        <p className="title">{ props.title }</p>
        <p className="summary">{ props.summary }</p>
        </a>
    </div>
  )
}

export default News;