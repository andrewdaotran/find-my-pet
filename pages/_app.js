import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }) {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: 'http://localhost:3000/api/graphql',
	})
	return (
		<ApolloProvider client={client}>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</ApolloProvider>
	)
}

export default MyApp
