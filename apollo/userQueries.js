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

export const USER_FOUND_PETS_QUERY = gql`
	query User($sub: String!) {
		user(sub: $sub) {
			id
			foundPets {
				age
				breed
				species
				description
				dateLostOrFound
				lostOrFound
				image
				isReturned
				city
				state
				gender
				name
				id
			}
		}
	}
`

export const USER_LOST_PETS_QUERY = gql`
	query User($sub: String!) {
		user(sub: $sub) {
			id
			lostPets {
				age
				breed
				species
				description
				dateLostOrFound
				lostOrFound
				image
				isReturned
				city
				state
				gender
				name
				id
			}
		}
	}
`
