import { GetStaticProps } from 'next'
import { gql } from '@apollo/client'

import { initializeApollo } from '../../../apollo/apollo-client'
import { PET_QUERY } from '../../../apollo/petQueries'
import { PetData } from '../../../typings'
import LostOrFoundPetSinglePage from '../../../components/LostOrFoundPetSinglePage'

interface Props {
	pet: PetData
}

const LostPet = ({ pet }: Props) => {
	return (
		<>
			<LostOrFoundPetSinglePage pet={pet} />
		</>
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
