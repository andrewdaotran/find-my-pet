import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apollo-client'
// import client from '../apollo/apollo-client'
import Navbar from '../components/Navbar'
import { UserContextProvider } from '../context/userContext'
import { PetEditContextProvider } from '../context/petEditContext'
import { FormSubmissionContextProvider } from '../context/formSubmissionContext'

function MyApp({ Component, pageProps }) {
	const client = useApollo(pageProps)
	return (
		<ApolloProvider client={client}>
			<UserProvider>
				<PetEditContextProvider>
					<UserContextProvider>
						<FormSubmissionContextProvider>
							<Navbar>
								{/* This instead? */}
								<Component {...pageProps} />
							</Navbar>
						</FormSubmissionContextProvider>
					</UserContextProvider>
				</PetEditContextProvider>
			</UserProvider>
		</ApolloProvider>
	)
}

export default MyApp
