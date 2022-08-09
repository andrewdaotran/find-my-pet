import Compressor from 'compressorjs'

export const convertCase = (str) => {
	var lower = String(str).toLowerCase()
	return lower.replace(/(^| )(\w)/g, function (x) {
		return x.toUpperCase()
	})
}

export const compressImage = (image, editPet, title, setIsImageTooLarge) => {
	new Compressor(image, {
		quality: 0.3, // 0.6 can also be used, but its not recommended to go below.
		success: (compressedResult) => {
			if (compressedResult.size > 705000) {
				setIsImageTooLarge(true)
				editPet('', title)
				return
			}
			setIsImageTooLarge(false)
			imageToBase64(compressedResult, editPet)
		},
	})
}

export const imageToBase64 = (image, editPet) => {
	let reader = new FileReader()
	reader.readAsDataURL(image)
	reader.onload = () => {
		// setImage( reader.result )
		editPet(reader.result, 'image')
	}
	reader.onerror = function (error) {
		console.log('Error: ', error)
	}
}

export const boxData = {
	foundPets: {
		title: 'Found Pets',
		description: 'Click here to see all posts on pets that have been found',
		redirect: '/pets/found-pets',
	},
	lostPets: {
		title: 'Lost Pets',
		description: 'Click here to see all posts on pets that have been lost',
		redirect: '/pets/lost-pets',
	},
	petAdoption: {
		title: 'Pet Adoption Listing',
		description: 'Click here to find a pet to adopt',
		redirect: '/pets/pet-adoption',
	},
}

export const userBoxData = {
	foundPets: {
		title: 'Your Found Pets',
		description: 'All your found pets posts',
		redirect: '/user/found-pets',
	},
	lostPets: {
		title: 'Your Lost Pets',
		description: 'All your lost pets posts',
		redirect: '/user/lost-pets',
	},
	homePage: {
		title: 'Your Home Page',
		description: 'Create your own lost or found pet post',
	},
}

export const userSearchCategory = ['all', 'name', 'gender', 'species']

export const lostOrFoundList = [
	// 'Set Lost or Found',
	'Lost',
	'Found',
]
export const speciesList = [
	// 'Set Species',
	'Dog',
	'Cat',
	'Bird',
	'Rabbit',
	'Reptile',
	'Other',
]
export const speciesQueryList = [
	'All',
	'Dog',
	'Cat',
	'Bird',
	'Rabbit',
	'Reptile',
	'Other',
]
export const genderList = ['NA', 'Male', 'Female']

export const statesList = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'District of Columbia',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
]

export const petFinderSpeciesList = [
	'All',
	'Dog',
	'Cat',
	'Rabbit',
	'Horse',
	'Bird',
	'Barnyard',
]

export const petFinderGenderList = ['All', 'Male', 'Female']

export const petFinderAgeList = ['All', 'Baby', 'Young', 'Adult', 'Senior']

export const petFinderSizeList = ['All', 'Small', 'Medium', 'Large', 'Xlarge']
