import React, { useState } from 'react'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useLazyQuery, useQuery } from '@apollo/client'

import { addApolloState, initializeApollo } from '../../apollo/apollo-client'
import { USER_FOUND_PETS_QUERY } from '../../apollo/userQueries'
import { PetData, UserData } from '../../typings'
import PetQueryCard from '../../components/PetQueryCard'
import { convertCase } from '../../utils'
import { FOUND_PETS_BY_USER_AND_ITEM_QUERY } from '../../apollo/petQueries'
import PetSearchInput from '../../components/PetSearchInput'

interface Props {
	user: UserData
}

const UserFoundPets = ({ user }: Props) => {
	const [search, setSearch] = useState<string>('')
	const [category, setCategory] = useState<string>('all')
	const { data: userQueryData } = useQuery(USER_FOUND_PETS_QUERY, {
		variables: { sub: user.sub },
	})
	const [fetchPetsByUserAndItem, { data: foundPetsByUserAndItem }] =
		useLazyQuery(FOUND_PETS_BY_USER_AND_ITEM_QUERY)

	const fetchPets = () => {
		fetchPetsByUserAndItem({
			variables: {
				item: category,
				searchTerm: convertCase(search),
				id: userQueryData.user.id,
			},
		})
		setSearch('')
	}

	return (
		<div className=''>
			<h2 className='sm:text-7xl text-5xl text-center mt-6 mb-2 lg:mb-6'>
				Your Found Pets
			</h2>
			<PetSearchInput
				search={search}
				setSearch={setSearch}
				category={category}
				setCategory={setCategory}
				fetchPets={fetchPets}
			/>

			{foundPetsByUserAndItem ? (
				<div className='flex p-4 gap-6 mx-auto justify-center  lg:gap-24 flex-wrap'>
					{foundPetsByUserAndItem.foundPetsByUserAndItem[0] ? (
						foundPetsByUserAndItem.foundPetsByUserAndItem.map(
							(pet: PetData) => {
								return (
									<PetQueryCard
										key={String(pet.id)}
										pet={pet}
										navigateTo={`/pet/found-pets/${pet.id}`}
									/>
								)
							}
						)
					) : (
						// If no pets that fit search term and category
						<h2 className='text-center'>
							There are no found pets currently with that search term and
							category
						</h2>
					)}
				</div>
			) : userQueryData.user.foundPets[0] ? (
				<div className='flex p-4 gap-6 mx-auto justify-center  lg:gap-24 flex-wrap'>
					{userQueryData.user.foundPets.map((pet: PetData) => {
						return (
							<PetQueryCard
								pet={pet}
								key={String(pet.id)}
								navigateTo={`/pets/found-pets/${pet.id}`}
							/>
						)
					})}
				</div>
			) : (
				<h2 className='text-center'>You have no found pets currently</h2>
			)}
		</div>
	)
}

export default UserFoundPets

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		const apolloClient = initializeApollo()
		const { user: auth0User } = getSession(context.req, context.res)

		await apolloClient.query({
			query: USER_FOUND_PETS_QUERY,
			variables: { sub: auth0User.sub },
		})

		return addApolloState(apolloClient, {
			props: {},
		})
	},
})
