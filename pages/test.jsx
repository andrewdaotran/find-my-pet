import React, { useState } from 'react'
import { useEffect } from 'react'

// import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
const {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
} = require('@apollo/client')
// import {Link} from 'next/link'
const Link = require('next/link')
const { useUser } = require('@auth0/nextjs-auth0')
const { useMutation, gql, useQuery } = require('@apollo/client')

const CREATE_USER_MUTATION = gql`
	mutation CreateUser($createOrFindUserInput2: CreateUserInput!) {
		createOrFindUser(input: $createOrFindUserInput2) {
			sub
			email
			name
			nickname
			picture
		}
	}
`

// mutation CreateOrFindUser($input: CreateUserInput!) {
// 	createOrFindUser(input: $input) {
// id
// email
// name
// nickname
// picture
// sub
// 	}
// }

const PET_QUERY = gql`
	query {
		pets {
			id
			name
		}
	}
`

const test = () => {
	const [userInfo, setUserInfo] = useState({})
	const me = 'yes'
	const [createOrFindUser] = useMutation(CREATE_USER_MUTATION)

	const { data, loading, error: petError, refetch } = useQuery(PET_QUERY)

	const { user, isLoading, error } = useUser()

	if (user) console.log(user.name)

	const obj = {
		email: 'andrewdaotran@gmail.com',
		email_verified: true,
		family_name: 'Tran',
		given_name: 'Andrew',
		locale: 'en',
		name: 'Andrew Tran',
		nickname: 'andrewdaotran',
		picture:
			'https://lh3.googleusercontent.com/a/AATXAJwZcGBuBx6-uy2JifftTIWk1HyWmSNeQF2LPMv6=s96-c',
		sub: 'g7',
		updated_at: '2022-06-27T02:44:15.250Z',
	}
	return user ? (
		<>
			<h1>hello</h1>

			<button
				onClick={() => {
					createOrFindUser({
						variables: {
							input: {
								name,
								email,
								birthday,
							},
						},
					})
				}}
			>
				Press me
			</button>
		</>
	) : (
		<h1>nothing</h1>
	)
}

export default test
