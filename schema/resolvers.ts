const mongoose = require('mongoose')
import PetModel from '../models/PetModel'
import UserModel from '../models/UserModel'
import CommentModel from '../models/CommentModel'
import { GraphQLScalarType, Kind } from 'graphql'
import dayjs from 'dayjs'

const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	serialize(value: Date) {
		return dayjs(value)
	},
	parseValue(value: Date) {
		return dayjs(value)
	},
	// parseLiteral(ast) {
	// 	if (ast.kind === Kind.INT) {
	// 		return new Date(parseInt(ast.value, 10))
	// 	}
	// 	return null
	// },
})

const resolvers = {
	Date: dateScalar,
	Query: {
		dateNow: (parent, { date }) => {
			console.log('date', date)
			return date
		},
		pets: async () => {
			try {
				const pets = await PetModel.find()
				return pets
			} catch (error) {
				console.log(error)
			}
		},
		pet: async (parent, args) => {
			const petId = args.id
			try {
				const pet = await PetModel.findById(petId)
				return pet
			} catch (error) {
				console.log(error)
			}
		},
		foundPets: async () => {
			try {
				const pets = await PetModel.find({
					lostOrFound: 'Found',
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
		foundPetsByItem: async (parent, args) => {
			const category = args.item
			const searchTerm = args.searchTerm
			try {
				const pets = await PetModel.find({
					lostOrFound: 'Found',
					[category]: searchTerm,
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
		foundPetsByUserAndItem: async (parent, args) => {
			const user = args.id
			const category = args.item
			const searchTerm = args.searchTerm
			try {
				const pets = await PetModel.find({
					user,
					lostOrFound: 'Found',
					[category]: searchTerm,
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
		lostPets: async () => {
			try {
				const pets = await PetModel.find({
					lostOrFound: 'Lost',
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
		lostPetsByItem: async (parent, args) => {
			const category = args.item
			const searchTerm = args.searchTerm
			try {
				const pets = await PetModel.find({
					lostOrFound: 'Lost',
					[category]: searchTerm,
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
		lostPetsByUserAndItem: async (parent, args) => {
			const user = args.id
			const category = args.item
			const searchTerm = args.searchTerm
			try {
				const pets = await PetModel.find({
					user,
					lostOrFound: 'Lost',
					[category]: searchTerm,
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
		user: async (parent, args) => {
			const userSub = args.sub
			// const userId = args.id

			try {
				const user = await UserModel.findOne({ sub: userSub })
				// const user = await UserModel.findById(userId)
				return user
			} catch (error) {
				console.log(error)
			}
		},
		users: async () => {
			try {
				const users = await UserModel.find()
				return users
			} catch (error) {
				console.log(error)
			}
		},
	},
	Mutation: {
		createPet: async (parent, args) => {
			const petData = args.input
			const newPet = new PetModel({ ...petData, timestamp: dayjs(new Date()) })
			console.log(newPet)
			try {
				await newPet.save()
				console.log(newPet)
				return newPet
			} catch (error) {
				console.log(error)
			}
		},
		updatePet: async (parent, args) => {
			const id = args.input.id
			const petData = args.input
			if (!mongoose.Types.ObjectId.isValid(id)) return 'no pet with that id'
			try {
				// const existingPet = await PetModel.findById(id)
				const updatedPet = await PetModel.findByIdAndUpdate(
					id,
					{
						...petData,
					},
					{ new: true }
				)
				return updatedPet
			} catch (error) {
				console.log(error)
			}
		},
		createOrFindUser: async (parent, args) => {
			const userData = args.input
			try {
				// check if user alraedy exists
				const user = await UserModel.findOne({ sub: userData.sub })
				if (user) {
					return user
				}
				const newUser = new UserModel({ userData })
				await newUser.save()

				return newUser
			} catch (error) {
				console.log(error)
			}
		},
		createComment: async (parent, args) => {
			const commentData = args.input
			console.log(commentData)
			try {
				const comment = new CommentModel({
					...commentData,
					timestamp: dayjs(new Date()),
					// timestamp: new Date(),
				})
				console.log(comment)
				await comment.save()
				return comment
			} catch (error) {
				console.log(error)
			}
		},
	},
	Pet: {
		comments: async (parent, args) => {
			const petId = String(parent.id)
			try {
				const comments = await CommentModel.find({
					pet: petId,
				})
				return comments
			} catch (error) {
				console.log(error)
			}
		},
	},
	User: {
		foundPets: async (parent, args) => {
			const user = parent.id
			try {
				const pets = await PetModel.find({
					lostOrFound: 'Found',
					user,
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
		lostPets: async (parent, args) => {
			const user = parent.id
			try {
				const pets = await PetModel.find({
					lostOrFound: 'Lost',
					user,
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
	},
	// Comment: {
	// 	user: async (parent, args) => {
	// 		const userId = parent.user
	// 		try {
	// 			const user = await UserModel.findById(userId)
	// 			console.log('lalalalalal', user)
	// 			return user
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	},
	// },
}

export default resolvers
