import { combineReducers } from 'redux'

const songReducer = () => {
	return [
		{ title: 'No scrubs', duration: '5:05' },
		{ title: 'Macarena', duration: '2:05' },
		{ title: 'All star', duration: '3:07' },
		{ title: 'I want', duration: '4:07' },
	]
}

const selectedSongReducer = (selectedSong = null, action) => {
	if (action.type === 'SONG_SELECTED') {
		return action.payload
	}
	return selectedSong
}

export default combineReducers({
	songs: songReducer,
	selectedSong: selectedSongReducer,
})
