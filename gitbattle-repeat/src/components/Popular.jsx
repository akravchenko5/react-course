import React, { Component } from 'react'
import { fetchFavoriteRepos } from '../utils/api'

function NavLanguage({ selected, onUpdateLanguage }) {
	const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python']
	return (
		<ul className="flex-center">
			{languages.map((language) => {
				return (
					<li key={language}>
						<button
							className="btn-clear nav-link"
							style={
								selected === language ? { color: 'rgb(186, 47, 31)' } : null
							}
							onClick={() => onUpdateLanguage(language)}
						>
							{language}
						</button>
					</li>
				)
			})}
		</ul>
	)
}

export default class Popular extends Component {
	constructor(props) {
		super(props)

		this.state = {
			language: 'All',
			repositories: null,
			error: null,
		}
		this.onLanguageChange = this.onLanguageChange.bind(this)
		this.isLoading = this.isLoading.bind(this)
	}

	componentDidMount() {
		this.onLanguageChange(this.state.language)
	}

	onLanguageChange(language) {
		this.setState({
			language,
			repositories: null,
			error: null,
		})
		fetchFavoriteRepos(language)
			.then((repositories) => {
				this.setState({
					repositories,
				})
			})
			.catch((error) => {
				console.log('Error:', error)
				this.setState({
					error: 'Error while fetching data',
				})
			})
	}
	isLoading() {
		return this.state.repositories === null && this.state.error === null
	}
	render() {
		const { language, repositories, error } = this.state
		return (
			<>
				<NavLanguage
					selected={language}
					onUpdateLanguage={this.onLanguageChange}
				/>
				{this.isLoading() && <p>Loading...</p>}
				{error && <p>{error}</p>}
				{repositories && <pre>{JSON.stringify(repositories, null, 2)}</pre>}
			</>
		)
	}
}
