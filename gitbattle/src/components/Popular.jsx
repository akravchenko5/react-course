import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepo } from '../utils/api'
import {
	FaUser,
	FaStar,
	FaCodeBranch,
	FaExclamationTriangle,
} from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import ToolTip from './ToolTip'

function LanguagesNav({ selected, onUpdateLanguage }) {
	const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python']
	return (
		<ul className="flex-center">
			{languages.map((language) => (
				<li key={language}>
					<button
						className="btn-clear nav-link"
						type="button"
						onClick={() => onUpdateLanguage(language)}
						style={language === selected ? { color: 'rgb(186, 47, 31)' } : null}
					>
						{language}
					</button>
				</li>
			))}
		</ul>
	)
}

LanguagesNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired,
}

function ReposGrid({ repos }) {
	return (
		<ul className="grid space-around">
			{repos.map((repo, index) => {
				const { owner, html_url, stargazers_count, forks, open_issues } = repo
				const { login, avatar_url } = owner
				return (
					<li key={html_url}>
						<Card
							header={`#${index + 1}`}
							avatar={avatar_url}
							href={html_url}
							name={login}
						>
							<ul className="card-list">
								<li>
									<ToolTip text="Github user name">
										<FaUser color="rgb(255, 191, 116)" size={22} />
										<a href={`https://github.com/${login}`}>{login}</a>
									</ToolTip>
								</li>
								<li>
									<FaStar color="rgb(255, 15, 0)" size={22} />
									{stargazers_count.toLocaleString()} stars
								</li>
								<li>
									<FaCodeBranch color="rgb(129, 195, 245)" size={22} />
									{forks.toLocaleString()} forks
								</li>
								<li>
									<FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
									{open_issues.toLocaleString()} open issues
								</li>
							</ul>
						</Card>
					</li>
				)
			})}
		</ul>
	)
}

ReposGrid.propTypes = {
	repos: PropTypes.array.isRequired,
}

export default class Popular extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedLanguage: 'All',
			repos: {},
			error: null,
		}
		this.onLanguageChange = this.onLanguageChange.bind(this)
		this.isLoading = this.isLoading.bind(this)
	}

	componentDidMount() {
		this.onLanguageChange(this.state.selectedLanguage)
	}

	onLanguageChange(selectedLanguage) {
		this.setState({
			selectedLanguage,
			error: null,
		})
		if (!this.state.repos[selectedLanguage]) {
			fetchPopularRepo(selectedLanguage)
				.then((data) => {
					this.setState(({ repos }) => ({
						repos: {
							...repos,
							[selectedLanguage]: data,
						},
					}))
				})
				.catch((error) => {
					console.log('Error: fetching repo', error)
					this.setState({
						error: 'There was an error while fetching repositories.',
					})
				})
		}
	}

	isLoading() {
		const { selectedLanguage, repos, error } = this.state
		return !repos[selectedLanguage] && error === null
	}

	render() {
		const { selectedLanguage, repos, error } = this.state
		return (
			<>
				<LanguagesNav
					selected={selectedLanguage}
					onUpdateLanguage={this.onLanguageChange}
				/>
				{this.isLoading() && (
					<p>
						<Loading speed={300} text="Fetching data" />
					</p>
				)}
				{error && <p className="center-text error">{error}</p>}
				{repos[selectedLanguage] && (
					<ReposGrid repos={repos[selectedLanguage]} />
				)}
			</>
		)
	}
}
