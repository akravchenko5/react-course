import React, { Component } from 'react'
import { battle } from '../utils/api'
import {
	FaCompass,
	FaBriefcase,
	FaUsers,
	FaUserFriends,
	FaUser,
} from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import ToolTip from './ToolTip'

function ProfileList({ profile }) {
	return (
		<ul className="card-list">
			<li>
				<FaUser color="rgb(239, 115, 115)" size={22} />
				{profile.name}
			</li>
			{profile.location && (
				<li>
					<ToolTip text="User's location">
						<FaCompass color="rgb(114, 115, 255)" size={22} />
						{profile.location}
					</ToolTip>
				</li>
			)}
			{profile.company && (
				<li>
					<ToolTip text="User's company">
						<FaBriefcase color="#795548" size={22} />
						{profile.company}
					</ToolTip>
				</li>
			)}
			<li>
				<FaUsers color="rgb(129, 195, 245)" size={22} />
				{profile.followers.toLocaleString()} followers
			</li>
			<li>
				<FaUserFriends color="rgb(64, 183, 95)" size={22} />
				{profile.following.toLocaleString()} following
			</li>
		</ul>
	)
}

ProfileList.propTypes = {
	profile: PropTypes.object.isRequired,
}

export default class Result extends Component {
	constructor(props) {
		super(props)

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true,
		}
	}

	componentDidMount() {
		const { playerOne, playerTwo } = this.props
		battle([playerOne, playerTwo])
			.then((players) =>
				this.setState({
					winner: players[0],
					loser: players[1],
					error: null,
					loading: false,
				})
			)
			.catch(({ message }) => {
				this.setState({
					error: message,
					loading: false,
				})
			})
	}
	render() {
		const { winner, loser, error, loading } = this.state

		if (loading) {
			return <Loading speed={300} text="Loading, please wait" />
		}
		if (error) {
			return <p className="center-text error">{error}</p>
		}
		return (
			<>
				<div className="grid space-around container-sm">
					<Card
						header={winner.result === loser.result ? 'Tie' : 'Winner'}
						subHeader={`Score: ${winner.result.toLocaleString()}`}
						avatar={winner.profile.avatar_url}
						href={winner.profile.html_url}
						name={winner.profile.login}
					>
						<ProfileList profile={winner.profile} />
					</Card>
					<Card
						header={winner.result === loser.result ? 'Tie' : 'Winner'}
						subHeader={`Score: ${loser.result.toLocaleString()}`}
						avatar={loser.profile.avatar_url}
						href={loser.profile.html_url}
						name={loser.profile.login}
					>
						<ProfileList profile={loser.profile} />
					</Card>
				</div>
				<button className="btn btn-dark btn-space" onClick={this.props.onReset}>
					Reset
				</button>
			</>
		)
	}
}

Result.propTypes = {
	playerOne: PropTypes.string.isRequired,
	playerTwo: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
}
