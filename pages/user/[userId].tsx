import { useQuery } from '@apollo/client'
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { addApolloState, initializeApollo } from '../../apollo/apollo-client'
import { USER_QUERY } from '../../apollo/userQueries'
import FormSubmissionModal from '../../components/FormSubmissionModal'
import PetForm from '../../components/PetForm'
import PetPageRedirectBox from '../../components/PetPageRedirectBox'
import FormSubmissionContext from '../../context/formSubmissionContext'
import PetEditContext from '../../context/petEditContext'
import { UserData } from '../../typings'
import { userBoxData } from '../../utils'

interface Props {
	user: UserData
	userIdParams: String
}

const User = ({ user, userIdParams }: Props) => {
	// const { isFormSubmitted } = useContext(FormSubmissionContext)
	const {
		data: { user: gqlUser },
	} = useQuery(USER_QUERY, { variables: { sub: user.sub } })

	const { clearPet } = useContext(PetEditContext)

	const router = useRouter()

	useEffect(() => {
		clearPet()

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
			<div className='grid md:p-4 sm:grid-cols-2 gap-6 max-w-2xl mx-auto  justify-center mt-8 sm:w-[40rem]'>
				<div className='w-[22rem] sm:w-full'>
					<PetPageRedirectBox
						{...userBoxData.foundPets}
						backgroundColor='bg-pastelLightGreen'
					/>
				</div>
				<div className='w-[22rem] sm:w-full'>
					<PetPageRedirectBox
						{...userBoxData.lostPets}
						backgroundColor='bg-pastelRed'
					/>
				</div>
			</div>

			<PetForm isNewPet={true} />
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
