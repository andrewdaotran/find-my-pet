const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	email: String,
	email_verified: Boolean,
	family_name: String,
	given_name: String,
	locale: String,
	name: String,
	nickname: String,
	picture: String,
	sub: String,
	updated_at: String,
	foundPets: [String],
	lostPets: [String],
})

const UserModel = mongoose.models['Users']
	? mongoose.model('Users')
	: mongoose.model('Users', UserSchema)

module.exports = UserModel
