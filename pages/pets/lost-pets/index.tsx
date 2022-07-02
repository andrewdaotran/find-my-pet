import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import React, { Fragment } from 'react'
import { PetData } from '../../../typings'
import PetQueryCard from '../../../components/PetQueryCard'
import { lostPetsQuery } from '../../../apollo/petQueries'
import { useQuery } from '@apollo/client'

interface Props {}

const LostPets = ({}: Props) => {
	const {
		data: { lostPets },
	} = useQuery(lostPetsQuery)
	// return <div>hello</div>
	return lostPets[0] ? (
		<div className='grid p-4  gap-6 mx-auto justify-items-center'>
			{lostPets.map((pet: PetData) => {
				return <PetQueryCard key={String(pet.id)} pet={pet} />
			})}
		</div>
	) : (
		<h2>There are no lost pets currently</h2>
	)
}

export default LostPets

export const getServerSideProps = async () => {
	const apolloClient = initializeApollo()
	await apolloClient.query({
		query: lostPetsQuery,
	})

	return addApolloState(apolloClient, {
		props: {},
	})
}
