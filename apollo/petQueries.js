import { gql } from '@apollo/client'

export const CREATE_PET = gql`
	mutation CreatePet($input: CreatePetInput!) {
		createPet(input: $input) {
			id
		}
	}
`

export const UPDATE_PET = gql`
	mutation UpdatePet($input: UpdatePetInput!) {
		updatePet(input: $input) {
			id
			name
			age
			gender
			species
			breed
			dateLostOrFound
			description
			image
			isReturned
			city
			state
			lostOrFound
			user
			timestamp
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
			dateLostOrFound
			description
			image
			isReturned
			city
			state
			lostOrFound
			user
			timestamp
			comments {
				user
				pet
				timestamp
				value
				id
			}
		}
	}
`

export const FOUND_PETS_QUERY = gql`
	query FoundPets {
		foundPets {
			id
			name
			age
			gender
			species
			breed
			dateLostOrFound
			description
			image
			isReturned
			city
			state
			lostOrFound
			timestamp
			comments {
				user
				pet
				timestamp
				value
				id
			}
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
			dateLostOrFound
			description
			image
			isReturned
			city
			state
			lostOrFound
			timestamp
			comments {
				user
				pet
				timestamp
				value
				id
			}
		}
	}
`

export const FOUND_PETS_BY_USER_AND_ITEM_QUERY = gql`
	query ($item: String!, $searchTerm: String!, $id: String!) {
		foundPetsByUserAndItem(item: $item, searchTerm: $searchTerm, id: $id) {
			id
			name
			age
			gender
			species
			breed
			dateLostOrFound
			description
			image
			isReturned
			city
			state
			lostOrFound
			timestamp
			comments {
				user
				pet
				timestamp
				value
				id
			}
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
			dateLostOrFound
			description
			image
			isReturned
			city
			state
			timestamp
			lostOrFound
			comments {
				user
				pet
				timestamp
				value
				id
			}
		}
	}
`
export const LostPetsByItemQuery = gql`
	query ($item: String!, $searchTerm: String!) {
		lostPetsByUserAndItem(item: $item, searchTerm: $searchTerm) {
			id
			name
			age
			gender
			species
			breed
			dateLostOrFound
			description
			image
			isReturned
			city
			state
			lostOrFound
			timestamp
			comments {
				user
				pet
				timestamp
				value
				id
			}
		}
	}
`
export const LOST_PETS_BY_USER_AND_ITEM_QUERY = gql`
	query ($item: String!, $searchTerm: String!, $id: String!) {
		foundPetsByItem(item: $item, searchTerm: $searchTerm, id: $id) {
			id
			name
			age
			gender
			species
			breed
			dateLostOrFound
			description
			image
			isReturned
			city
			state
			lostOrFound
			timestamp
			comments {
				user
				pet
				timestamp
				value
				id
			}
		}
	}
`
