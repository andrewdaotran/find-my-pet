import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'

import { SinglePetAdoptionData } from '../../../typings'
import PetAdoptionSinglePage from '../../../components/PetAdoptionSinglePage'

interface Props {
	pet: SinglePetAdoptionData
}

const AdoptionPet = ({ pet }: Props) => {
	console.log(pet)

	return (
		<>
			<PetAdoptionSinglePage pet={pet} />
		</>
	)
}

export default AdoptionPet

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const adoptionId = query.adoptionId
	const { data: accessToken } = await axios.get(
		process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL
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
