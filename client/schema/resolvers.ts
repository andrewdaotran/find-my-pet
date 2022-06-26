const mongoose = require('mongoose')
// import PetModel from '../models/PetModel'

const PetModel = require('../models/PetModel.js')

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
						// ...existingPet,
						// petData,
						...petData,
					},
					{ new: true }
				)
				return updatedPet
			} catch (error) {
				console.log(error)
			}
		},
	},
}

export default resolvers
