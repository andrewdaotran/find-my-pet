import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import { initializeApollo } from '../../../apollo/apollo-client'
import { PET_QUERY } from '../../../apollo/petQueries'
import PetForm from '../../../components/PetForm'
import UserContext from '../../../context/userContext'
import { PetData } from '../../../typings'

interface Props {
	pet: PetData
}

const FoundPet = ({ pet }: Props) => {
	const [isUserPost, setIsUserPost] = useState<boolean>(false)
	const { user } = useContext(UserContext)

	// const [petData, setPetData] = useState<PetData>({})

	useEffect(() => {
		if (user.id === pet.user) {
			setIsUserPost(true)
			// setPetData({})
		}
	}, [user])

	return (
		<div>
			<div>
				{/* <PetForm /> */}
				<h2>{pet.name}</h2>
				{isUserPost && <h3>whats up</h3>}
			</div>
		</div>
	)
}

export default FoundPet

export const getStaticPaths = async () => {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query({
		query: gql`
			query FoundPets {
				foundPets {
					id
				}
			}
		`,
	})

	const paths = data.foundPets.map((pet: PetData) => {
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
	console.log(params.petId)
	const { data } = await apolloClient.query({
		query: PET_QUERY,
		variables: { id: params.petId },
	})

	return {
		props: { pet: data.pet },
		revalidate: 120,
	}
}
