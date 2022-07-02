export interface UserData {
	id: !ID
	email: String
	email_verified?: Boolean
	family_name?: String
	given_name?: String
	locale?: String
	name: String
	nickname?: String
	picture?: String
	sub: String
	updated_at?: String
	foundPets?: PetData[]
	lostPets?: PetData[]
}

export interface PetData {
	id: String
	name?: String
	age?: Number
	gender?: String
	species?: String
	breed?: String
	dateFound?: String
	dateLost?: String
	description?: String
	image?: String
	isReturned?: Boolean
	lostOrFound?: String
	city?: String
	state?: String
	user?: String
}
