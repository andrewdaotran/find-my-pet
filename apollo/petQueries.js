import { gql } from '@apollo/client'

export const CREATE_PET = gql`
	mutation CreatePet($input: CreatePetInput!) {
		createPet(input: $input) {
			id
		}
	}
`

export const PET_QUERY = gql`
	query ($id: ID!) {
		pet(id: $id) {
			id
			name
			age
			gender
			species
			breed
			dateFound
			dateLost
			description
			image
			isReturned
			city
			state
			lostOrFound
			user
		}
	}
`

export const FoundPetsQuery = gql`
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

export const FoundPetsByItemQuery = gql`
	query ($item: String!, $searchTerm: String!) {
		foundPetsByItem(item: $item, searchTerm: $searchTerm) {
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

export const LostPetsQuery = gql`
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
export const LostPetsByItemQuery = gql`
	query ($item: String!, $searchTerm: String!) {
		lostPetsByItem(item: $item, searchTerm: $searchTerm) {
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
