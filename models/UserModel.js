import mongoose from 'mongoose'

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
	foundPets: [
		{
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
		},
	],
	lostPets: [
		{
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
		},
	],
})

const UserModel = mongoose.models['Users']
	? mongoose.model('Users')
	: mongoose.model('Users', UserSchema)

export default UserModel
