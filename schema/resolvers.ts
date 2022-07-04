const mongoose = require('mongoose')
// import PetModel from '../models/PetModel'
// import UserModel from '../models/UserModel

const PetModel = require('../models/PetModel.js')
const UserModel = require('../models/UserModel.js')

const resolvers = {
	Query: {
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
					lostOrFound: 'found',
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
				// if (category === 'all') {
				// 	const pets = await PetModel.find({
				// 		lostOrFound: 'found',
				// 	})
				// 	console.log('whats up')
				// 	return pets
				// }
				// currently not querying for 'all' because it is being taken from the cache
				const pets = await PetModel.find({
					lostOrFound: 'found',
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
					lostOrFound: 'lost',
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
				// if (category === 'all') {
				// 	const pets = await PetModel.find({
				// 		lostOrFound: 'found',
				// 	})
				// 	console.log('whats up')
				// 	return pets
				// }
				// currently not querying for 'all' because it is being taken from the cache
				const pets = await PetModel.find({
					lostOrFound: 'lost',
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
				const user = await UserModel.find({ sub: userSub })
				// const user = await UserModel.findById(userId)
				console.log(user)
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
			const newPet = new PetModel(petData)
			try {
				await newPet.save()
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
				console.log(user)
				if (user) {
					return user
				}
				const newUser = new UserModel(userData)
				await newUser.save()
				return newUser
			} catch (error) {
				console.log(error)
			}
		},
	},
	Pet: {
		user: async (parent, args) => {
			const userId = args.id
			try {
				const user = await UserModel.findById(userId)
				return user
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
					lostOrFound: 'found',
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
					lostOrFound: 'lost',
					user,
				})
				return pets
			} catch (error) {
				console.log(error)
			}
		},
	},
}

export default resolvers
