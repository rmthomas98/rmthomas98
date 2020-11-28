import React from 'react';
import SearchBar from './Components/SearchBar';
import CurrentDate from './Components/CurrentDate';
import Temperature from './Components/Temperature';
import Location from './Components/Location';

const api = {
  base1: "https://api.openweathermap.org/data/2.5/weather?q=",
  base2: "&appid=",
  key: "97003fd483199426e8eec17d046dc0d4",
}

class App extends React.Component {

  constructor() {
    super()
    this.state = { 
      temperature: '',
      condition: '',
      city: ''
    }
  }

  handleWeatherChange = (r) => {
    this.setState({
      temperature: Math.round(((parseFloat(r.main.temp)-273.15)*1.8)+32) + '\u00B0' + 'F',
      condition: r.weather[0].main,
      city: r.name
    })
  }

  handleApiCall = (city) => {
    fetch(api.base1 + city + api.base2 + api.key)
    .then(res => res.json())
    .then(result => this.handleWeatherChange(result))
    .catch(function() {
      console.log("Fetch Error")
    })
  }

  render() {
    return(
      <div className={ this.state.temperature.slice(0,2) >= 50 ? 'app' : 'app-cold' }>
        <div className="container">
          <SearchBar city={this.handleApiCall}/>
          <Location city={this.state.city === '' ? '' : this.state.city + ', US'} />
          {this.state.temperature === '' ? '' : <CurrentDate />}
          <Temperature 
            condition={this.state.conditon === '' ? '' : this.state.condition}
            temperature={this.state.temperature}
          />
        </div>
      </div>
    ) 
  }
}


export default App;