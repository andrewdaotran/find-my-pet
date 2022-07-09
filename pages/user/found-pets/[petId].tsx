import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import React from 'react'
import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import { PetData } from '../../../typings'

interface Props {
	pet: PetData
}

const UserSingleFoundPet = ({ pet }: Props) => {
	return (
		<div>
			<div>
				<h4>{pet.name}</h4>
			</div>
		</div>
	)
}

export default UserSingleFoundPet

export const getStaticPaths = async () => {
	const apolloClient = initializeApollo()
	const foundPets = await apolloClient.query({
		query: gql`
			query FoundPets {
				foundPets {
					id
				}
			}
		`,
	})
	console.log(foundPets)

	const paths = foundPets.map((pet: PetData) => {
		return {
			params: {
				petId: pet.id,
			},
		}
	})

	return {
		fallback: false,
		paths,
	}
}

export const getStaticProps: GetStaticProps = ({ params }) => {
	return {
		props: {},
		revalidate: 120,
	}
}
