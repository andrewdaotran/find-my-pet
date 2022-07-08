import Compressor from 'compressorjs'

export const convertCase = (str) => {
	var lower = String(str).toLowerCase()
	return lower.replace(/(^| )(\w)/g, function (x) {
		return x.toUpperCase()
	})
}

export const compressImage = (image, setImage, setIsImageTooLarge) => {
	new Compressor(image, {
		quality: 0.4, // 0.6 can also be used, but its not recommended to go below.
		success: (compressedResult) => {
			if (compressedResult.size > 705000) {
				setIsImageTooLarge(true)
				setImage('')
				return
			}
			setIsImageTooLarge(false)
			imageToBase64(compressedResult, setImage)
		},
	})
}

export const imageToBase64 = (image, setImage) => {
	let reader = new FileReader()
	reader.readAsDataURL(image)
	reader.onload = () => {
		setImage(reader.result)
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
	lostAndFound: {
		title: 'Lost and Found',
		description:
			'Click here to see all pets that have been turned over to a lost and found',
		redirect: '/pets/lost-and-found',
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
}

export const userSearchCategory = ['all', 'name', 'gender', 'species']

export const lostOrFoundList = ['Set Lost or Found', 'Lost', 'Found']
export const speciesList = [
	'Set Species',
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

// export const statesList = [
// 	'ALABAMA',
// 	'ALASKA',
// 	'ARIZONA',
// 	'ARKANSAS',
// 	'CALIFORNIA',
// 	'COLORADO',
// 	'CONNECTICUT',
// 	'DELAWARE',
// 	'FLORIDA',
// 	'GEORGIA',
// 	'HAWAII',
// 	'IDAHO',
// 	'ILLINOIS',
// 	'INDIANA',
// 	'IOWA',
// 	'KANSAS',
// 	'KENTUCKY',
// 	'LOUISIANA',
// 	'MAINE',
// 	'MARYLAND',
// 	'MASSACHUSETTS',
// 	'MICHIGAN',
// 	'MINNESOTA',
// 	'MISSISSIPPI',
// 	'MISSOURI',
// 	'MONTANA',
// 	'NEBRASKA',
// 	'NEVADA',
// 	'NEW HAMPSHIRE',
// 	'NEW JERSEY',
// 	'NEW MEXICO',
// 	'NEW YORK',
// 	'NORTH CAROLINA',
// 	'NORTH DAKOTA',
// 	'OHIO',
// 	'OKLAHOMA',
// 	'OREGON',
// 	'PENNSYLVANIA',
// 	'RHODE ISLAND',
// 	'SOUTH CAROLINA',
// 	'SOUTH DAKOTA',
// 	'TENNESSEE',
// 	'TEXAS',
// 	'UTAH',
// 	'VERMONT',
// 	'VIRGINIA',
// 	'WASHINGTON',
// 	'WEST VIRGINIA',
// 	'WISCONSIN',
// 	'WYOMING',
// ]
