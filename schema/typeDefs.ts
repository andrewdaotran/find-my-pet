// import { gql } from 'apollo-server-micro'
const { gql } = require('apollo-server-micro')

const typeDefs = gql`
	type Query {
		pets: [Pet]
		pet(id: ID!): Pet
		foundPets: [Pet]
		foundPetsByItem(item: String!, searchTerm: String!): [Pet]
		foundPetsByUserAndItem(
			id: String!
			item: String!
			searchTerm: String!
		): [Pet]
		lostPets: [Pet]
		lostPetsByItem(item: String!, searchTerm: String!): [Pet]
		lostPetsByUserAndItem(
			id: String!
			item: String!
			searchTerm: String!
		): [Pet]
		user(sub: String!): User
		users: [User]
	}

	type Mutation {
		createPet(input: CreatePetInput!): Pet
		updatePet(input: UpdatePetInput!): Pet
		createOrFindUser(input: CreateUserInput!): User
	}

	type User {
		id: ID!
		email: String
		email_verified: Boolean
		family_name: String
		given_name: String
		locale: String
		name: String
		nickname: String
		picture: String
		sub: String
		updated_at: String
		foundPets: [Pet]
		lostPets: [Pet]
	}

	input CreateUserInput {
		email: String
		email_verified: Boolean
		family_name: String
		given_name: String
		locale: String
		name: String
		nickname: String
		picture: String
		sub: String
		updated_at: String
	}

	type Pet {
		id: ID!
		name: String
		age: String
		gender: String
		species: String!
		breed: String
		dateLostOrFound: String!
		description: String!
		image: String!
		isReturned: Boolean
		lostOrFound: String!
		city: String!
		state: String!
		user: String
	}

	input CreatePetInput {
		name: String
		age: String
		gender: String
		species: String!
		breed: String
		dateLostOrFound: String!
		description: String!
		image: String!
		isReturned: Boolean
		lostOrFound: String!
		city: String!
		state: String!
		user: String
	}

	input UpdatePetInput {
		id: String!
		name: String
		age: String
		gender: String
		species: String!
		breed: String
		dateLostOrFound: String!
		description: String!
		image: String!
		isReturned: Boolean
		lostOrFound: String!
		city: String!
		state: String!
	}
`

export default typeDefs
