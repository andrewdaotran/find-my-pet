import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apollo-client'
// import client from '../apollo/apollo-client'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
	const client = useApollo(pageProps)
	return (
		<ApolloProvider client={client}>
			<UserProvider>
				<Navbar>
					<Component {...pageProps} />
				</Navbar>
			</UserProvider>
		</ApolloProvider>
	)
}

export default MyApp
