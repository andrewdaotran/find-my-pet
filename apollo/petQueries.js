import { gql } from '@apollo/client'

export const foundPetsQuery = gql`
	query FoundPets {
		foundPets {
			id
			name
			age
			gender
			species
			breed
			dateFound
			description
			image
			isReturned
			city
			state
			lostOrFound
		}
	}
`

export const lostPetsQuery = gql`
	query LostPets {
		lostPets {
			id
			name
			age
			gender
			species
			breed
			dateLost
			description
			image
			isReturned
			city
			state
			lostOrFound
		}
	}
`
