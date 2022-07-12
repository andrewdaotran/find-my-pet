const mongoose = require('mongoose')

const PetSchema = mongoose.Schema({
	name: String,
	age: Number,
	gender: String,
	species: String,
	breed: String,
	dateLostOrFound: String,
	description: String,
	image: String,
	isReturned: Boolean,
	lostOrFound: String,
	city: String,
	state: String,
	user: String,
	// 	comments: {
	//    type: Schema.Types.ObjectId,
	//    ref: 'users'
	//  }
})

const PetModel = mongoose.models['Pets']
	? mongoose.model('Pets')
	: mongoose.model('Pets', PetSchema)

module.exports = PetModel
