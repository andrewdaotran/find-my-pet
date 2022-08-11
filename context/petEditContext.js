import { format } from 'date-fns'
import { createContext, useState } from 'react'

const PetEditContext = createContext()

export const PetEditContextProvider = ({ children }) => {
	const [pet, setPet] = useState({
		id: '',
		name: '',
		age: '',
		gender: 'NA',
		species: 'Dog',
		breed: '',
		dateLostOrFound: format(new Date(), 'yyyy-MM-dd'),
		description: '',
		image: '',
		isReturned: false,
		lostOrFound: 'Lost',
		city: '',
		state: 'Alabama',
	})

	const storePet = (petData) => {
		setPet({ ...pet, ...petData })
	}
	const editPet = (data, title) => {
		setPet({ ...pet, [title]: data })
	}
	const clearPet = () => {
		setPet({
			id: '',
			name: '',
			age: '',
			gender: 'NA',
			species: 'Dog',
			breed: '',
			dateLostOrFound: format(new Date(), 'yyyy-MM-dd'),
			description: '',
			image: '',
			isReturned: '',
			lostOrFound: 'Lost',
			city: '',
			state: 'Alabama',
		})
	}

	return (
		<PetEditContext.Provider value={{ pet, storePet, clearPet, editPet }}>
			{children}
		</PetEditContext.Provider>
	)
}

export default PetEditContext
