import { format } from 'date-fns'
import { createContext, useState } from 'react'

const PetEditContext = createContext()

export const PetEditContextProvider = ({ children }) => {
	const [pet, setPet] = useState({
		id: '',
		name: '',
		age: '',
		gender: 'NA',
		species: 'Set Species',
		breed: '',
		dateLostOrFound: format(new Date(), 'yyyy-MM-dd'),
		description: '',
		image: '',
		isReturned: false,
		lostOrFound: 'Set Lost or Found',
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
			species: 'Set Species',
			breed: '',
			dateLostOrFound: format(new Date(), 'yyyy-MM-dd'),
			// dateLost: format(new Date(), 'yyyy-MM-dd'),
			description: '',
			image: '',
			isReturned: '',
			lostOrFound: 'Set Lost or Found',
			city: '',
			state: '',
		})
	}

	return (
		<PetEditContext.Provider value={{ pet, storePet, clearPet, editPet }}>
			{children}
		</PetEditContext.Provider>
	)
}

export default PetEditContext
