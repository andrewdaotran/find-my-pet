import React from 'react'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import { USER_LOST_PETS_QUERY, USER_QUERY } from '../../../apollo/userQueries'
import { useQuery } from '@apollo/client'

import { UserData } from '../../../typings'
import PetQueryCard from '../../../components/PetQueryCard'

interface Props {
	user: UserData
}

const UserLostPets = ({ user }: Props) => {
	const { data: userQueryData } = useQuery(USER_LOST_PETS_QUERY, {
		variables: { sub: user.sub },
	})
	return (
		<div className=''>
			<h2 className='sm:text-7xl text-4xl text-center mt-6 mb-2 lg:mb-6'>
				Your Lost Pets
			</h2>
			<div className='grid p-4 gap-6 mx-auto justify-items-center md:grid-cols-2 lg:flex lg:justify-center lg:gap-24'>
				{userQueryData.user.lostPets.map((pet) => {
					return (
						<PetQueryCard
							pet={pet}
							key={String(pet.id)}
							userPets={true}
							navigateTo={`/pets/lost-pets/${pet.id}`}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default UserLostPets

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		const apolloClient = initializeApollo()
		const { user: auth0User } = getSession(context.req, context.res)
		// const user = await apolloClient.query({
		// 	query: USER_QUERY,
		// 	variables: {
		// 		sub: auth0User.sub,
		// 	},
		// })

		const userFoundPets = await apolloClient.query({
			query: USER_LOST_PETS_QUERY,
			variables: { sub: auth0User.sub },
		})

		return addApolloState(apolloClient, {
			props: {},
		})
	},
})
