import { gql } from '@apollo/client'

export const USER_QUERY = gql`
	query User($sub: String!) {
		user(sub: $sub) {
			id
			email
			name
			nickname
			picture
			sub
		}
	}
`
