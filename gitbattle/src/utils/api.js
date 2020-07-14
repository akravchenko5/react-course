function getErrorMessage(username, message) {
	if (message == 'Not Found') {
		return `${username} does not exist`
	}
	return message
}

function getProfile(username) {
	return fetch(`https://api.github.com/users/${username}`)
		.then((response) => response.json())
		.then((profile) => {
			if (profile.message) {
				throw new Error(getErrorMessage(username, profile.message))
			}
			return profile
		})
}

function getRepos(username) {
	return fetch(`https://api.github.com/users/${username}/repos?&per_page=100`)
		.then((response) => response.json())
		.then((repos) => {
			if (repos.message) {
				throw new Error(getErrorMessage(username, repos.message))
			}
			return repos
		})
}

function getStarCount(repos) {
	return repos.reduce(
		(count, { stargazers_count }) => count + stargazers_count,
		0
	)
}

function calcScore(followers, repos) {
	return followers * 3 + getStarCount(repos)
}

function getUserData(player) {
	return Promise.all([getProfile(player), getRepos(player)]).then(
		([profile, repos]) => ({
			profile,
			result: calcScore(profile.followers, repos),
		})
	)
}

function sortPlayer(players) {
	return players.sort((a, b) => b.score - a.score)
}

export function battle(players) {
	return Promise.all([
		getUserData(players[0]),
		getUserData(players[1]),
	]).then((results) => sortPlayer(results))
}

export function fetchPopularRepo(language) {
	const endpoint = window.encodeURI(
		`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
	)

	return fetch(endpoint)
		.then((res) => res.json())
		.then((data) => {
			if (!data.items) {
				throw new Error(data.message)
			}
			return data.items
		})
}
