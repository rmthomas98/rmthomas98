import React from 'react';
import { Link } from 'react-scroll';

class ShowMore extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      animation: 'Bounce 2s ease-in-out infinite',
      boxShadow: '',
      isAnimating: true
    }
  }

  animating = () => {
    if (this.state.isAnimating) {
      this.setState({
        animation: 'none',
        boxShadow: '0px 5px 10px #000',
        isAnimating: false
      })
    } else {
      this.setState({
        animation: 'Bounce 2s ease-in-out infinite',
        boxShadow: 'none',
        isAnimating: true
      })
    }
  }

  render() {
    return(
      <div className="show-me" onMouseEnter={this.animating} onMouseLeave={this.animating}>
        <Link 
        className="show-me-button" 
        id="show-me"
        style={{ animation: `${this.state.animation}`, boxShadow: `${this.state.boxShadow}`}}
        to={ 'news-container' }
        smooth={ true }
        duration={ 500 }
        offset={ this.props.offset > 800 ? -76 : -37 }>
          See More
        </Link>
      </div>
    )
  }
};

export default ShowMore;