import { gql } from 'apollo-server-micro'

const typeDefs = gql`
	scalar Date

	type Query {
		dateNow(date: Date!): Date
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
		deletePet(id: ID!): Pet
		createOrFindUser(input: CreateUserInput!): User
		createComment(input: CreateCommentInput!): Comment
		deleteComment(id: ID!): Comment
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
		comments: [Comment]
		timestamp: Date
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
		timestamp: Date
	}

	input UpdatePetInput {
		id: String!
		name: String
		age: String
		gender: String
		species: String
		breed: String
		dateLostOrFound: String
		description: String
		image: String
		isReturned: Boolean
		lostOrFound: String
		city: String
		state: String
	}

	type Comment {
		id: ID!
		value: String!
		userId: String!
		pet: String!
		timestamp: Date
		sub: String!
		userName: String!
	}

	input CreateCommentInput {
		value: String!
		userId: String!
		pet: String!
		userName: String!
		sub: String!
	}
`

export default typeDefs
