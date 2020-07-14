import React, { Component } from 'react'
import UserCreate from './UserCreate'
import { LanguageStore } from '../contexts/LanguageContext'
import ColorContext from '../contexts/ColorContext'
import LanguageSelector from './LanguageSelector'

export class App extends Component {
	state = { language: 'english' }

	render() {
		return (
			<div className="ui container">
				<LanguageStore>
					<LanguageSelector />
					<ColorContext.Provider value="primary">
						<UserCreate />
					</ColorContext.Provider>
				</LanguageStore>
			</div>
		)
	}
}

export default App
