import React from 'react'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import { USER_FOUND_PETS_QUERY, USER_QUERY } from '../../../apollo/userQueries'
import { useQuery } from '@apollo/client'

import { UserData } from '../../../typings'
import PetQueryCard from '../../../components/PetQueryCard'

interface Props {
	user: UserData
}

const UserFoundPets = ({ user }) => {
	const { data: userQueryData } = useQuery(USER_FOUND_PETS_QUERY, {
		variables: { sub: user.sub },
	})

	return (
		<div>
			{userQueryData.user.foundPets.map((pet) => {
				return <PetQueryCard pet={pet} />
			})}
		</div>
	)
}

export default UserFoundPets

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
			query: USER_FOUND_PETS_QUERY,
			variables: { sub: auth0User.sub },
		})

		return addApolloState(apolloClient, {
			props: {},
		})
	},
})
