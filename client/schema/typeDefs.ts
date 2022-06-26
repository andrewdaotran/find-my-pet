// import { gql } from 'apollo-server-micro'
const { gql } = require('apollo-server-micro')

const typeDefs = gql`
	type Query {
		pets: [Pet]
		foundPets: [Pet]
		lostPets: [Pet]
	}

	type Mutation {
		createPet(input: CreatePetInput!): Pet
		updatePet(input: UpdatePetInput!): Pet
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
	}
`

export default typeDefs
