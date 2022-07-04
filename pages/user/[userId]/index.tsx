import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import { UserData } from '../../../typings'

interface Props {
	user: UserData
	userId: String
}

const User = ({ user, userId }: Props) => {
	console.log(user)
	const router = useRouter()
	console.log(router.query.userId)

	// useEffect(() => {

	// }, [])

	return (
		<div>
			<h1>hello</h1>
		</div>
	)
}

export default User

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(context) {
		const apolloClient = initializeApollo()
		const userId = context.params.userId
		getSession(context.req, context.res)

		return addApolloState(apolloClient, {
			props: { userId },
		})
	},
})
