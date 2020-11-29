import React from 'react';

const Temperature = (props) => {

	const randConditions = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Dust", "Ash", "Squall", "Tornado"]

	let weatherIcon;

	if (props.condition === 'Clear') {
		weatherIcon = "fas fa-sun"
	} else if (props.condition === 'Rain' || props.condition === 'Drizzle') {
		weatherIcon = "fas fa-cloud-showers-heavy"
	} else if (props.condition === "Clouds"){
		weatherIcon = "fas fa-cloud"
	} else if (props.condition === "Thunderstorm") {
		weatherIcon = "fas fa-bolt"
	} else if (randConditions.includes(props.condition)) {
		weatherIcon = "fas fa-smog"
	}

	return(
		<div className="weather-container">
			<div className={props.temperature === '' ? 'no-show' : "temperature"}>{ props.temperature }</div>
			<div className="condition-container">
				<i className={ weatherIcon }></i>
				<div className="condition">{ props.condition } </div>
			</div>
		</div>
	)
}

export default Temperature;