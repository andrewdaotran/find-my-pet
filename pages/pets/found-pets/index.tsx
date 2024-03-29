import React, { useState } from 'react'

import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import { PetData } from '../../../typings'
import PetQueryCard from '../../../components/PetQueryCard'
import {
	FoundPetsByItemQuery,
	FOUND_PETS_QUERY,
} from '../../../apollo/petQueries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { convertCase } from '../../../utils'
import PetSearchInput from '../../../components/PetSearchInput'

interface Props {}

const FoundPets = ({}: Props) => {
	const [search, setSearch] = useState<string>('')
	const [category, setCategory] = useState<string>('all')

	const {
		data: { foundPets },
	} = useQuery(FOUND_PETS_QUERY)

	const [fetchPetsByItem, { data: foundPetsByItem }] =
		useLazyQuery(FoundPetsByItemQuery)

	const fetchPets = () => {
		fetchPetsByItem({
			variables: {
				item: category,
				searchTerm: convertCase(search),
			},
		})
		setSearch('')
	}

	return (
		<>
			<div className='flex justify-center my-4'>
				<h2 className='sm:text-7xl text-5xl text-center'>Found Pets</h2>
			</div>
			<PetSearchInput
				search={search}
				setSearch={setSearch}
				category={category}
				setCategory={setCategory}
				fetchPets={fetchPets}
			/>

			{foundPetsByItem ? (
				<div className='flex p-4 gap-6 mx-auto justify-center  lg:gap-24 flex-wrap '>
					{foundPetsByItem.foundPetsByItem[0] ? (
						foundPetsByItem.foundPetsByItem.map((pet: PetData) => {
							return (
								<PetQueryCard
									key={String(pet.id)}
									pet={pet}
									navigateTo={`/pets/found-pets/${pet.id}`}
								/>
							)
						})
					) : (
						// If no pets that fit search term and category
						<h2 className='text-center'>
							There are no found pets currently with that search term and
							category
						</h2>
					)}
				</div>
			) : // If useLazyQuery has not been called, display all found pets
			foundPets[0] ? (
				<div className='flex p-4 gap-6 mx-auto justify-center  lg:gap-24 flex-wrap'>
					{foundPets.map((pet: PetData) => {
						return (
							<PetQueryCard
								key={String(pet.id)}
								pet={pet}
								navigateTo={`/pets/found-pets/${pet.id}`}
							/>
						)
					})}
				</div>
			) : (
				<h2 className='text-center'>There are no found pets currently</h2>
			)}
		</>
	)
}

export default FoundPets

export const getServerSideProps = async () => {
	const apolloClient = initializeApollo()
	await apolloClient.query({
		query: FOUND_PETS_QUERY,
	})

	return addApolloState(apolloClient, {
		props: {},
	})
}
