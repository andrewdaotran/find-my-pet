import PetPageRedirectBox from '../components/PetPageRedirectBox'

// import {Link} from 'next/link'
const Link = require('next/link')
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

	const boxData = {
		foundPets: {
			title: 'Found Pets',
			description: 'Click here to see all posts on pets that have been found',
			redirect: '/pets/found-pets',
		},
		lostPets: {
			title: 'Lost Pets',
			description: 'Click here to see all posts on pets that have been lost',
			redirect: '/pets/lost-pets',
		},
		lostAndFound: {
			title: 'Lost and Found',
			description:
				'Click here to see all pets that have been turned over to a lost and found',
			redirect: '/pets/lost-and-found',
		},
	}

	const userBoxData = {
		foundPets: {
			title: 'Your Found Pets',
			description: 'All your found pets posts',
			redirect: '/user/found-pets',
		},
		lostPets: {
			title: 'Your Lost Pets',
			description: 'All your lost pets posts',
			redirect: '/user/lost-pets',
		},
	}

	return (
		<div className=' mx-6 border-black border grid justify-items-center'>
			<h1 className='justify-center'>
				Welcome to the <span className='text-red-500'>Find My Pet</span> App
			</h1>
			<div className='grid p-2 grid-cols-3 gap-6'>
				<PetPageRedirectBox {...boxData.foundPets} />
				<PetPageRedirectBox {...boxData.lostPets} />
				<PetPageRedirectBox {...boxData.lostAndFound} />
			</div>
		</div>
	)
}

// export const getServerSideProps = async () => {}
