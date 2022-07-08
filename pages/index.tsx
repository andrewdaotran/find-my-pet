import PetPageRedirectBox from '../components/PetPageRedirectBox'

import Link from 'next/link'
import { boxData, userBoxData } from '../utils'

const { useUser } = require('@auth0/nextjs-auth0')

const {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	// useMutation,
	// gql,
} = require('@apollo/client')

export default function Home() {
	const { user, isLoading, error } = useUser()

	return (
		<div className=' mx-6  grid justify-items-center mt-12 md:mt-32'>
			<h1 className='justify-center text-3xl mb-12'>
				Welcome to the <span className='text-red-500'>Find My Pet</span> App
			</h1>
			<div className='grid p-4 sm:grid-cols-2 gap-6 md:grid-cols-3'>
				<PetPageRedirectBox {...boxData.foundPets} />
				<PetPageRedirectBox {...boxData.lostPets} />
				<PetPageRedirectBox {...boxData.lostAndFound} />
			</div>

			{/* render out user boxes if user is logged in */}
			{user ? (
				<div className='grid p-4 sm:grid-cols-2 gap-6'>
					<PetPageRedirectBox {...userBoxData.foundPets} />
					<PetPageRedirectBox {...userBoxData.lostPets} />
				</div>
			) : null}
		</div>
	)
}

// export const getServerSideProps = async () => {}
