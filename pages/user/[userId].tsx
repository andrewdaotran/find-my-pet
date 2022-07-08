import { useQuery } from '@apollo/client'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { addApolloState, initializeApollo } from '../../apollo/apollo-client'
import { USER_QUERY } from '../../apollo/userQueries'
import PetForm from '../../components/PetForm'
import PetPageRedirectBox from '../../components/PetPageRedirectBox'
import { UserData } from '../../typings'
import { userBoxData } from '../../utils'

interface Props {
	user: UserData
	userIdParams: String
}

const User = ({ user, userIdParams }: Props) => {
	const {
		data: { user: gqlUser },
	} = useQuery(USER_QUERY, { variables: { sub: user.sub } })

	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push(`/`)
			return
		}

		if (userIdParams !== gqlUser.id) {
			router.push(`/user/${gqlUser.id}`)
		}
	}, [])

	return (
		<div>
			<PetForm />
			<div className='grid p-4 sm:grid-cols-2 gap-6'>
				<PetPageRedirectBox {...userBoxData.foundPets} />
				<PetPageRedirectBox {...userBoxData.lostPets} />
			</div>
		</div>
	)
}

export default User

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		const apolloClient = initializeApollo()
		const userIdParams = context.params.userId
		const { user: auth0User } = getSession(context.req, context.res)
		await apolloClient.query({
			query: USER_QUERY,
			variables: {
				sub: auth0User.sub,
			},
		})

		return addApolloState(apolloClient, {
			props: { userIdParams },
		})
	},
})
