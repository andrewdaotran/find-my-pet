import { gql } from '@apollo/client'
import { GetStaticProps } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import { initializeApollo } from '../../../apollo/apollo-client'
import { PET_QUERY } from '../../../apollo/petQueries'
import PetForm from '../../../components/PetForm'
import PetEditContext from '../../../context/petEditContext'
import UserContext from '../../../context/userContext'
import FormSubmissionContext from '../../../context/formSubmissionContext'
import { PetData } from '../../../typings'
import FormSubmissionModal from '../../../components/FormSubmissionModal'

interface Props {
	pet: PetData
}

const FoundPet = ({ pet }: Props) => {
	const [isUserPost, setIsUserPost] = useState<boolean>(false)
	const [isEditingPet, setIsEditingPet] = useState<boolean>(false)
	const { user } = useContext(UserContext)
	const { pet: petContext, clearPet, storePet } = useContext(PetEditContext)
	const { isFormSubmitted } = useContext(FormSubmissionContext)

	useEffect(() => {
		clearPet()
	}, [])

	useEffect(() => {
		if (user.id === pet.user) {
			setIsUserPost(true)
		}
	}, [user])

	const handleEdit = () => {
		storePet(pet)
		setIsEditingPet(true)
	}

	return (
		<div>
			<div>
				{isUserPost && isEditingPet ? (
					<PetForm isNewPet={false} setIsEditingPet={setIsEditingPet} />
				) : null}
				{isFormSubmitted && <FormSubmissionModal isNewPet={false} />}
				<h2>{pet.name}</h2>
				{isUserPost && <h3>whats up</h3>}
				{isUserPost && <button onClick={handleEdit}>Edit</button>}
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
