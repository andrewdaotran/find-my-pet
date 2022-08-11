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

export const postsPerPage = ['5', '10', '20', '50', '100']

// export const lostOrFoundList = [
// 	// 'Set Lost or Found',
// 	{ label: 'Lost', value: 'Lost' },
// 	{ label: 'Found', value: 'Found' },
// ]
// export const speciesList = [
// 	// 'Set Species',
// 	{ label: 'Dog', value: 'Dog' },
// 	{ label: 'Cat', value: 'Cat' },
// 	{ label: 'Bird', value: 'Bird' },
// 	{ label: 'Rabbit', value: 'Rabbit' },
// 	{ label: 'Reptile', value: 'Reptile' },
// 	{ label: 'Other', value: 'Other' },
// ]
// export const speciesQueryList = [
// 	{ label: 'All', value: 'All' },
// 	{ label: 'Dog', value: 'Dog' },
// 	{ label: 'Cat', value: 'Cat' },
// 	{ label: 'Bird', value: 'Bird' },
// 	{ label: 'Rabbit', value: 'Rabbit' },
// 	{ label: 'Reptile', value: 'Reptile' },
// 	{ label: 'Other', value: 'Other' },
// ]
// export const genderList = [
// 	{ label: '', value: 'NA' },
// 	{ label: 'Male', value: 'Male' },
// 	{ label: 'Female', value: 'Female' },
// ]

// export const statesList = [
// 	{ label: 'Alaska', value: 'Alaska' },
// 	{ label: 'Arizona', value: 'Arizona' },
// 	{ label: 'Arkansas', value: 'Arkansas' },
// 	{ label: 'California', value: 'California' },
// 	{ label: 'Colorado', value: 'Colorado' },
// 	{ label: 'Connecticut', value: 'Connecticut' },
// 	{ label: 'Delaware', value: 'Delaware' },
// 	{ label: 'District of Columbia', value: 'District of Columbia' },
// 	{ label: 'Florida', value: 'Florida' },
// 	{ label: 'Georgia', value: 'Georgia' },
// 	{ label: 'Hawaii', value: 'Hawaii' },
// 	{ label: 'Idaho', value: 'Idaho' },
// 	{ label: 'Illinois', value: 'Illinois' },
// 	{ label: 'Indiana', value: 'Indiana' },
// 	{ label: 'Iowa', value: 'Iowa' },
// 	{ label: 'Kansas', value: 'Kansas' },
// 	{ label: 'Kentucky', value: 'Kentucky' },
// 	{ label: 'Louisiana', value: 'Louisiana' },
// 	{ label: 'Maine', value: 'Maine' },
// 	{ label: 'Maryland', value: 'Maryland' },
// 	{ label: 'Massachusetts', value: 'Massachusetts' },
// 	{ label: 'Michigan', value: 'Michigan' },
// 	{ label: 'Minnesota', value: 'Minnesota' },
// 	{ label: 'Mississippi', value: 'Mississippi' },
// 	{ label: 'Missouri', value: 'Missouri' },
// 	{ label: 'Montana', value: 'Montana' },
// 	{ label: 'Nebraska', value: 'Nebraska' },
// 	{ label: 'Nevada', value: 'Nevada' },
// 	{ label: 'New Hampshire', value: 'New Hampshire' },
// 	{ label: 'New Jersey', value: 'New Jersey' },
// 	{ label: 'New Mexico', value: 'New Mexico' },
// 	{ label: 'New York', value: 'New York' },
// 	{ label: 'North Carolina', value: 'North Carolina' },
// 	{ label: 'North Dakota', value: 'North Dakota' },
// 	{ label: 'Ohio', value: 'Ohio' },
// 	{ label: 'Oklahoma', value: 'Oklahoma' },
// 	{ label: 'Oregon', value: 'Oregon' },
// 	{ label: 'Pennsylvania', value: 'Pennsylvania' },
// 	{ label: 'Rhode Island', value: 'Rhode Island' },
// 	{ label: 'South Carolina', value: 'South Carolina' },
// 	{ label: 'South Dakota', value: 'South Dakota' },
// 	{ label: 'Tennessee', value: 'Tennessee' },
// 	{ label: 'Texas', value: 'Texas' },
// 	{ label: 'Utah', value: 'Utah' },
// 	{ label: 'Vermont', value: 'Vermont' },
// 	{ label: 'Virginia', value: 'Virginia' },
// 	{ label: 'Washington', value: 'Washington' },
// 	{ label: 'West Virginia', value: 'West Virginia' },
// 	{ label: 'Wisconsin', value: 'Wisconsin' },
// 	{ label: 'Wyoming', value: 'Wyoming' },
// ]

// export const petFinderSpeciesList = [
// 	{ label: 'All', value: 'All' },
// 	{ label: 'Dog', value: 'Dog' },
// 	{ label: 'Cat', value: 'Cat' },
// 	{ label: 'Rabbit', value: 'Rabbit' },
// 	{ label: 'Horse', value: 'Horse' },
// 	{ label: 'Bird', value: 'Bird' },
// 	{ label: 'Barnyard', value: 'Barnyard' },
// ]

// export const petFinderGenderList = [
// 	{ label: 'All', value: 'All' },
// 	{ label: 'Male', value: 'Male' },
// 	{ label: 'Female', value: 'Female' },
// ]

// export const petFinderAgeList = [
// 	{ label: 'All', value: 'All' },
// 	{ label: 'Baby', value: 'Baby' },
// 	{ label: 'Young', value: 'Young' },
// 	{ label: 'Adult', value: 'Adult' },
// 	{ label: 'Senior', value: 'Senior' },
// ]

// export const petFinderSizeList = [
// 	{ label: 'All', value: 'All' },
// 	{ label: 'Small', value: 'Small' },
// 	{ label: 'Medium', value: 'Medium' },
// 	{ label: 'Large', value: 'Large' },
// 	{ label: 'Xlarge', value: 'Xlarge' },
// ]

// export const postsPerPage = [
// 	{ label: '5', value: '5' },
// 	{ label: '10', value: '10' },
// 	{ label: '20', value: '20' },
// 	{ label: '50', value: '50' },
// 	{ label: '100', value: '100' },
// ]
