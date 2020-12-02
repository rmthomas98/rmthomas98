import React from 'react';

const Project = (props) => {

  return(
    <div className="outer-card-space">
      <div className="card">
        <div className="front">
          <img src={ props.img } alt={ props.title } height="300px"/>
        </div>
        <div className="back">
          <p className="title">{ props.title }</p>
          <p className="desc">{ props.desc }</p>
          <div className="button-container">
            <a 
              href={ props.code }
              target="_blank" 
              rel="noreferrer"
              className="code-button">
                Code
            </a>
            <a 
              href={ props.preview } 
              target="_blank"
              rel="noreferrer"
              className="preview-button">
                Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project;