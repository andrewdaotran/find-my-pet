import { gql } from '@apollo/client'

export const userQuery = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			email
			name
			nickname
			picture
			sub
		}
	}
`
