import React from 'react'
import './SeasonDisplay.css'

const seasonConfig = {
	summer: {
		text: "Let's hit some beach",
		icon: 'sun',
	},
	winter: {
		text: 'Brr, it is chilly',
		icon: 'snowflake',
	},
}

const getSeason = (lat, month) => {
	if (month > 2 && month < 9) {
		return lat > 0 ? 'summer' : 'winter'
	} else {
		return lat > 0 ? 'winter' : 'summer'
	}
}

const SeasonDisplay = (params) => {
	const season = getSeason(params.lat, new Date().getMonth())
	const { text, icon } = seasonConfig[season]
	return (
		<div className={`season-display ${season}`}>
			<i className={`${icon} icon massive icon-left`} />
			<h1>{text}</h1>
			<i className={`${icon} icon massive icon-right`} />
		</div>
	)
}

export default SeasonDisplay
