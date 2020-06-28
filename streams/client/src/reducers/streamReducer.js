import {
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
} from '../actions/types'

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			const newState = action.payload.reduce(
				(map, item) => ({ ...map, [item.id]: item }),
				{}
			)
			return { ...state, ...newState }
		case FETCH_STREAM:
			return { ...state, [action.payload.id]: action.payload }
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload }
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload }
		case DELETE_STREAM:
			const deleteState = { ...state }
			return delete deleteState[action.payload]
		default:
			return state
	}
}
