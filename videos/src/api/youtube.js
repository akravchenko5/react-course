import axios from 'axios'

const KEY = 'AIzaSyAZf_WopAovX0x3qL7SM9YtET4r80Hk6P4'

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3',
	params: {
		part: 'snippet',
		type: 'video',
		maxResults: 5,
		key: KEY,
	},
})
