import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import React, { useState } from 'react'

import { PetData } from '../../../typings'
import PetQueryCard from '../../../components/PetQueryCard'
import { foundPetsQuery } from '../../../apollo/petQueries'
import { useQuery } from '@apollo/client'
import { userSearchCategory } from '../../../utils'
import Dropdown from '../../../components/Dropdown'

interface Props {}

const FoundPets = ({}: Props) => {
	const [search, setSearch] = useState<string>('')
	const [category, setCategory] = useState<string>('all')

	const {
		data: { foundPets },
	} = useQuery(foundPetsQuery)

	// return <div>hello</div>
	return (
		<>
			<div>
				<input
					type='text'
					placeholder='search'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Dropdown
					data={userSearchCategory}
					setFunction={setCategory}
					value={category}
				/>
			</div>
			{foundPets[0] ? (
				<div className='grid p-4  gap-6 mx-auto justify-items-center'>
					{foundPets.map((pet: PetData) => {
						return <PetQueryCard key={String(pet.id)} pet={pet} />
					})}
				</div>
			) : (
				<h2>There are no found pets currently</h2>
			)}
		</>
	)
}

export default FoundPets

export const getServerSideProps = async () => {
	const apolloClient = initializeApollo()
	await apolloClient.query({
		query: foundPetsQuery,
	})

	return addApolloState(apolloClient, {
		props: {},
	})
}
