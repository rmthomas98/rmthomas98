import React from 'react';

class MoonWeight extends React.Component {

  constructor() {
    super()
    this.state = {
      value: '',
      weight: 0
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    if (e.keyCode === 13) {
      const weight = Number(this.state.value)
      const moonWeight = weight * 0.165
      const roundedWeight = moonWeight.toFixed(2);
      this.setState({ weight: roundedWeight })
    }
  }

  handleClickSubmit = () => {
    const weight = Number(this.state.value)
    const moonWeight = weight * 0.165
    const roundedWeight = moonWeight.toFixed(2);
    this.setState({ weight: roundedWeight })
  }

  render() {
    return(
      <div name="moon" className="moon-container">
        <h2>Your Weight on the moon</h2>
        <div className="calculation-container">
          <input value={ this.state.value } onKeyDown={ this.handleSubmit } onChange={ this.handleChange }type="number" placeholder="Enter Your Weight" className="earth-weight"></input>
          <button className="submit-button" onClick={ this.handleClickSubmit }>GO</button>
        </div>
        <div className="actual-moon-weight">
          <p className="small-text">You Would Weigh</p>
          <p className="weight-projection">{ this.state.weight } lbs</p>
          <p className="small-text">On the Moon!</p>
        </div>
      </div>
    )
  }
}

export default MoonWeight;