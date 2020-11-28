import React from 'react';

const CurrentDate = () => {

	const time = new Date();
  const date = time.toString().slice(3,15);

  return(
  	<p className="date">{date}</p>
  )
}

export default CurrentDate;