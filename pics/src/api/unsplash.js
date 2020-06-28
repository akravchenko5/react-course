import axios from 'axios'

export default axios.create({
	baseURL: 'https://api.unsplash.com',
	headers: {
		Authorization: 'Client-ID T1AhJNBTthpwLEjaOaulyp7JFK6w7UQ7tj3l3D64qIM',
	},
})
