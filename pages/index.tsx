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

// const CREATE_USER_MUTATION = gql`
// 	mutation CreateOrFindUser($input: CreateUserInput!) {
// 		createOrFindUser(input: $input) {
// 			id
// 			email
// 			name
// 			nickname
// 			picture
// 			sub
// 		}
// 	}
// `

export default function Home() {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: 'http://localhost:3000/api/graphql',
	})
	// const [
	// 	createOrFindUser,
	// 	{ data: userData, loading: userLoading, error: userError },
	// ] = useMutation(CREATE_USER_MUTATION)

	const { user, isLoading, error } = useUser()

	// if (user) {
	// 	createOrFindUser({
	// 		variables: {
	// 			input: {
	// 				...user,
	// 			},
	// 		},
	// 	})
	// }

	return (
		<div className='App'>
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
	)
}

// export const getServerSideProps = async () => {}
