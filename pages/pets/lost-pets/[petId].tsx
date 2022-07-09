import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import { initializeApollo } from '../../../apollo/apollo-client'
import { PET_QUERY } from '../../../apollo/petQueries'
import UserContext from '../../../context/userContext'
import { PetData } from '../../../typings'

interface Props {
	pet: PetData
}

const LostPet = ({ pet }: Props) => {
	const [isUserPost, setIsUserPost] = useState<boolean>(false)
	const { user } = useContext(UserContext)

	useEffect(() => {
		if (user.id === pet.user) {
			setIsUserPost(true)
		}
	}, [user])
	return (
		<div>
			<div>
				<h2>{pet.name}</h2>
				{isUserPost && <h3>whats up</h3>}
			</div>
		</div>
	)
}

export default LostPet

export const getStaticPaths = async () => {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query({
		query: gql`
			query LostPets {
				lostPets {
					id
				}
			}
		`,
	})

	const paths = data.lostPets.map((pet: PetData) => {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query({
		query: PET_QUERY,
		variables: { id: params.petId },
	})

	return {
		props: { pet: data.pet },
		revalidate: 120,
	}
}
