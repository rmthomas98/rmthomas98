import React from 'react';

const Temperature = (props) => {

	return(
		<div className="weather-container">
			<div className={props.temperature === '' ? 'no-show' : "temperature"}>{ props.temperature }</div>
			<div className="condition">{ props.condition } </div>
		</div>
	)
}

export default Temperature;