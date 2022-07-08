import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import React, { useState } from 'react'

import { PetData } from '../../../typings'
import PetQueryCard from '../../../components/PetQueryCard'
import {
	FoundPetsByItemQuery,
	FoundPetsQuery,
} from '../../../apollo/petQueries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { userSearchCategory } from '../../../utils'
import Dropdown from '../../../components/Dropdown'

interface Props {}

const FoundPets = ({}: Props) => {
	const [search, setSearch] = useState<string>('')
	const [category, setCategory] = useState<string>('all')

	const {
		data: { foundPets },
	} = useQuery(FoundPetsQuery)

	const [fetchPetsByItem, { data: foundPetsByItem, error, refetch, called }] =
		useLazyQuery(FoundPetsByItemQuery)

	const fetchPets = () => {
		fetchPetsByItem({
			variables: {
				item: category,
				searchTerm: search,
			},
		})
		setSearch('')
	}

	// return <div>hello</div>
	return (
		<>
			<div className='flex justify-center my-4'>
				<h2 className='text-5xl'>Found Pets</h2>
			</div>
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
				<button onClick={fetchPets}>Press me</button>
			</div>

			{foundPetsByItem ? (
				<div className='grid p-4  gap-6 mx-auto justify-items-center'>
					{foundPetsByItem.foundPetsByItem[0] ? (
						foundPetsByItem.foundPetsByItem.map((pet: PetData) => {
							return <PetQueryCard key={String(pet.id)} pet={pet} />
						})
					) : (
						// If no pets that fit search term and category
						<h2>
							There are no found pets currently with that search term and
							category
						</h2>
					)}
				</div>
			) : // If useLazyQuery has not been called, display all found pets
			foundPets[0] ? (
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
		query: FoundPetsQuery,
	})

	return addApolloState(apolloClient, {
		props: {},
	})
}
