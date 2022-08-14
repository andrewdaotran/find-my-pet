import axios from 'axios'
export default async (req, res) => {
	const params = new URLSearchParams()
	params.append('grant_type', 'client_credentials')
	params.append('client_id', process.env.PET_FINDER_API_KEY)
	params.append('client_secret', process.env.PET_FINDER_SECRET)

	const petFinderRes = await axios.post(
		'https://api.petfinder.com/v2/oauth2/token',
		params
	)
	const data = petFinderRes.data
	res.send(data)
}
