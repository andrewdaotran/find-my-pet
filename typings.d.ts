export interface UserData {
	id: !ID
	email: string
	email_verified?: boolean
	family_name?: string
	given_name?: string
	locale?: string
	name: string
	nickname?: string
	picture?: string
	sub: string
	updated_at?: string
	foundPets?: PetData[]
	lostPets?: PetData[]
}

export interface PetData {
	id: string
	name?: string
	age?: number
	gender?: string
	species?: string
	breed?: string
	dateFound?: string
	dateLost?: string
	description?: string
	image?: string
	isReturned?: boolean
	lostOrFound?: string
	city?: string
	state?: string
	user?: string
}
