import axios from 'axios'
import { GetServerSideProps } from 'next'

import { SinglePetAdoptionData } from '../../../typings'
import PetAdoptionSinglePage from '../../../components/PetAdoptionSinglePage'

interface Props {
	pet: SinglePetAdoptionData
}

const AdoptionPet = ({ pet }: Props) => {
	return (
		<>
			<PetAdoptionSinglePage pet={pet} />
		</>
	)
}

export default AdoptionPet

export const getServerSideProps: GetServerSideProps = async (context) => {
	const host = context.req.headers.host
	const adoptionId = context.query.adoptionId
	const { data: accessToken } = await axios.get(
		// `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/pet-finder-oauth-token`
		// `${process.env.NEXT_PUBLIC_URL}/api/pet-finder-oauth-token`
		// `https://${process.env.VERCEL_URL}/api/pet-finder-oauth-token`
		// `http://${host}/api/pet-finder-oauth-token`

		// `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/pet-finder-oauth-token`
		`${process.env.NEXT_PUBLIC_URL}/api/pet-finder-oauth-token`
		// process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL
	)

	const petResult = await axios.get(
		`https://api.petfinder.com/v2/animals/${adoptionId}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken.access_token}`,
			},
		}
	)
	const petData = petResult.data.animal

	return {
		props: { pet: petData },
	}
}
