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
	dateLostOrFound: string
	description?: string
	image?: string
	isReturned?: boolean
	lostOrFound?: string
	city?: string
	state?: string
	user?: string
	comments: CommentData[]
	timestamp: Date
}

export interface PetAdoptionData {
	age: string
	attributes: {
		spayed_neutered: boolean
		house_trained: boolean
		declawed: boolean
		special_needs: boolean
		shots_current: boolean
	}
	breeds: {
		primary: string
		secondary: string
		mixed: boolean
		unknown: boolean
	}
	contact: {
		email: string
		phone: string
		address: {
			address1: string
			address2: string
			city: string
			state: string
			postcode: string
			country: string
		}
	}
	description: string
	gender: string
	id: number
	name: string
	organization_animal_id: string
	organization_id: string
	photos: Array
	published_at: string
	size: string
	species: string
	status: string
	status_changed_at: string
	primary_photo_cropped: {
		full: string
		large: string
		medium: string
		small: string
	}

	type: string
	url: string
}

export interface SinglePetAdoptionData {
	id: number
	organization_id: string
	url: string
	type: string
	species: string
	breeds: {
		primary: string
		secondary: string
		mixed: boolean
		unknown: boolean
	}
	colors: {
		primary: string
		secondary: string
		tertiary: stringstring
	}
	age: string
	gender: string
	size: string
	attributes: {
		spayed_neutered: boolean
		house_trained: boolean
		declawed: boolean
		special_needs: boolean
		shots_current: boolean
	}

	name: string
	description: string
	organization_animal_id: string
	photos: [[Object]]
	primary_photo_cropped: {
		small: string
		medium: string
		large: string
		full: string
	}

	status: string
	status_changed_at: string
	published_at: string
	contact: {
		email: string
		phone: string
		address: [Object]
	}
	_links: { self: [Object]; type: [Object]; organization: [Object] }
}

export interface CommentData {
	id: string
	value: string
	userId: string
	pet: string
	timestamp: Date
	userName: string
	sub: string
}

export interface InputForm {
	_id: string
	name: string
	age: string
	gender: string
	species: string
	breed: string
	dateLostOrFound: string
	description: string
	image: string
	lostOrFound: string
	city: string
	state: string
}
