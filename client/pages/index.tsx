// import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
const {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
} = require('@apollo/client')
// import {Link} from 'next/link'
const Link = require('next/link')
const { useUser } = require('@auth0/nextjs-auth0')

export default function Home() {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: 'http://localhost:5000/api/graphql',
	})

	const { user, isLoading, error } = useUser()
	console.log(user)
	return (
		<ApolloProvider client={client}>
			<div>
				<button key='/api/auth/login'>
					<Link href='/api/auth/login'>
						<a>Login</a>
					</Link>
				</button>
				<button key='/api/auth/logout'>
					<Link href='/api/auth/logout'>
						<a>Logout</a>
					</Link>
				</button>
			</div>
		</ApolloProvider>
	)
}

// export const getServerSideProps = async () => {}
