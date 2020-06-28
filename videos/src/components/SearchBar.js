import React, { Component } from 'react'

export class SearchBar extends Component {
	state = { term: '' }

	onInputChange = (e) => {
		this.setState({ term: e.target.value })
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		this.props.onSubmit(this.state.term)
	}

	render() {
		return (
			<div className="ui segment search-bar">
				<form className="ui form" onSubmit={this.onFormSubmit}>
					<div className="field">
						<label htmlFor="">Search video</label>
						<input
							type="text"
							value={this.state.term}
							onChange={this.onInputChange}
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default SearchBar
