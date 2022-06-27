// import { gql } from 'apollo-server-micro'
const { gql } = require('apollo-server-micro')

const typeDefs = gql`
	type Query {
		pets: [Pet]
		pet(id: ID!): Pet
		foundPets: [Pet]
		lostPets: [Pet]
		user(id: ID!): User
	}

	type Mutation {
		createPet(input: CreatePetInput!): Pet
		updatePet(input: UpdatePetInput!): Pet
		createUser(input: CreateUserInput!): User
	}

	type User {
		id: ID!
		email: String
		family_name: String
		given_name: String
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
		family_name: String
		given_name: String
		name: String
		nickname: String
		picture: String
		sub: String
		updated_at: String
	}

	type Pet {
		id: ID!
		name: String
		age: Int
		gender: String
		species: String
		breed: String
		dateFound: String
		dateLost: String
		description: String!
		image: String
		isReturned: Boolean
		lostOrFound: String!
		city: String
		state: String
		user: String
	}

	input CreatePetInput {
		name: String
		age: Int
		gender: String
		species: String
		breed: String
		dateFound: String
		dateLost: String
		description: String!
		image: String
		isReturned: Boolean
		lostOrFound: String!
		city: String
		state: String
		user: String
	}

	input UpdatePetInput {
		id: String!
		name: String
		age: Int
		gender: String
		species: String
		breed: String
		dateFound: String
		dateLost: String
		description: String
		image: String
		isReturned: Boolean
		lostOrFound: String
		city: String
		state: String
		user: String
	}
`

export default typeDefs
