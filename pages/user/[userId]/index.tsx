import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { addApolloState, initializeApollo } from '../../../apollo/apollo-client'
import { UserData } from '../../../typings'
import { userQuery } from '../../../apollo/userQueries'

interface Props {
	user: UserData
	userId: String
}

const User = ({ user, userId }: Props) => {
	console.log(user)
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
