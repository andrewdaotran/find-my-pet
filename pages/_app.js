import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ApolloProvider } from '@apollo/client'
import axios from 'axios'
import { useApollo } from '../apollo/apollo-client'
// import client from '../apollo/apollo-client'
import Navbar from '../components/Navbar'
import UserContext, { UserContextProvider } from '../context/userContext'
import { PetEditContextProvider } from '../context/petEditContext'
import { FormSubmissionContextProvider } from '../context/formSubmissionContext'
import { createContext, useEffect, useState } from 'react'

export const PetFinderContext = createContext()

function MyApp({ Component, pageProps }) {
	const client = useApollo(pageProps)
	const [accessToken, setAccessToken] = useState(null)

	useEffect(() => {
		const fetchAccessToken = async () => {
			const { data } = await axios.get('/api/pet-finder-oauth-token')
			setAccessToken(data)
		}
		fetchAccessToken()
	}, [])

	return (
		<ApolloProvider client={client}>
			<PetFinderContext.Provider value={{ accessToken, setAccessToken }}>
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
			</PetFinderContext.Provider>
		</ApolloProvider>
	)
}

export default MyApp
