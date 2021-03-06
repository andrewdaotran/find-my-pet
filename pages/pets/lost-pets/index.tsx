import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import React, { useState } from 'react'
import { PetData } from '../../../typings'
import PetQueryCard from '../../../components/PetQueryCard'
import { LostPetsByItemQuery, LostPetsQuery } from '../../../apollo/petQueries'
import { useLazyQuery, useQuery } from '@apollo/client'
import Dropdown from '../../../components/Dropdown'
import { convertCase, userSearchCategory } from '../../../utils'
import PetSearchInput from '../../../components/PetSearchInput'

interface Props {}

const LostPets = ({}: Props) => {
	const [search, setSearch] = useState<string>('')
	const [category, setCategory] = useState<string>('all')
	const {
		data: { lostPets },
	} = useQuery(LostPetsQuery)

	const [fetchPetsByItem, { data: lostPetsByItem, error, refetch, called }] =
		useLazyQuery(LostPetsByItemQuery)

	const fetchPets = () => {
		fetchPetsByItem({
			variables: {
				item: category,
				searchTerm: convertCase(search),
			},
		})
		setSearch('')
	}
	// return <div>hello</div>
	return (
		<>
			<div className='flex justify-center my-4'>
				<h2 className='text-5xl'>Lost Pets</h2>
			</div>

			<PetSearchInput
				search={search}
				setSearch={setSearch}
				category={category}
				setCategory={setCategory}
				fetchPets={fetchPets}
			/>

			{lostPetsByItem ? (
				<div className='grid p-4  gap-6 mx-auto justify-items-center'>
					{lostPetsByItem.lostPetsByItem[0] ? (
						lostPetsByItem.lostPetsByItem.map((pet: PetData) => {
							return (
								<PetQueryCard
									key={String(pet.id)}
									pet={pet}
									navigateTo={`/pets/lost-pets/${pet.id}`}
								/>
							)
						})
					) : (
						// If no pets that fit search term and category
						<h2>
							There are no lost pets currently with that search term and
							category
						</h2>
					)}
				</div>
			) : // If useLazyQuery has not been called, display all lost pets
			lostPets[0] ? (
				<div className='grid p-4  gap-6 mx-auto justify-items-center'>
					{lostPets.map((pet: PetData) => {
						return (
							<PetQueryCard
								key={String(pet.id)}
								pet={pet}
								navigateTo={`/pets/lost-pets/${pet.id}`}
							/>
						)
					})}
				</div>
			) : (
				<h2>There are no lost pets currently</h2>
			)}
		</>
	)
}

export default LostPets

export const getServerSideProps = async () => {
	const apolloClient = initializeApollo()
	await apolloClient.query({
		query: LostPetsQuery,
	})

	return addApolloState(apolloClient, {
		props: {},
	})
}
