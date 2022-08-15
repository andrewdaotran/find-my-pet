import { GetStaticProps } from 'next'
import { gql } from '@apollo/client'

import { revalidate } from '../../../utils'
import { initializeApollo } from '../../../apollo/apollo-client'
import { PET_QUERY } from '../../../apollo/petQueries'
import { PetData } from '../../../typings'
import LostOrFoundPetSinglePage from '../../../components/LostOrFoundPetSinglePage'

interface Props {
	pet: PetData
}

const FoundPet = ({ pet }: Props) => {
	return (
		<>
			<LostOrFoundPetSinglePage pet={pet} />
		</>
	)
}

export default FoundPet

export const getStaticPaths = async () => {
	// console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
	console.log(process.env.VERCEL_URL)
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
	const { data } = await apolloClient.query({
		query: PET_QUERY,
		variables: { id: params.petId },
	})

	return {
		props: { pet: data.pet },
		revalidate,
	}
}
