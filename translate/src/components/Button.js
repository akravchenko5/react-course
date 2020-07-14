import React, { Component } from 'react'
import LanguageContext from '../contexts/LanguageContext'
import ColorContext from '../contexts/ColorContext'

export class Button extends Component {
	static contextType = LanguageContext // contextType special word
	render() {
		return (
			<ColorContext.Consumer>
				{(color) => (
					<button className={`ui button ${color}`}>
						<LanguageContext.Consumer>
							{({ language }) =>
								language === 'english' ? 'Submit' : 'Voorleggen'
							}
						</LanguageContext.Consumer>
					</button>
				)}
			</ColorContext.Consumer>
		)
	}
}

export default Button
