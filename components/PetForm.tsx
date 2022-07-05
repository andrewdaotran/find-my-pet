import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'

import { CREATE_PET } from '../apollo/petQueries'
import UserContext from '../context/userContext'
import { speciesList, lostOrFoundList, genderList } from '../utils'
import Dropdown from './Dropdown'
import { format } from 'date-fns'

const PetForm = () => {
	const [species, setSpecies] = useState<string>('Set Species')
	const [breed, setBreed] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [age, setAge] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [lostOrFound, setLostOrFound] = useState<string>('Set Lost or Found')
	const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
	const [gender, setGender] = useState<string>('NA')
	const [location, setLocation] = useState<string>('')
	const [image, setImage] = useState<string>('')

	const { user } = useContext(UserContext)

	const [createPet, { data: petData, loading: petLoading, error: petError }] =
		useMutation(CREATE_PET)

	const handleSubmitPet = () => {
		let whichDate = ''
		lostOrFound === 'LOST'
			? (whichDate = 'dateLost')
			: (whichDate = 'dateFound')
		createPet({
			variables: {
				input: {
					name,
					age,
					gender,
					species,
					breed,
					[whichDate]: date,
					description,
					image,
					lostOrFound,
					location,
					user: user.id,
				},
			},
		})
	}
	return (
		<div>
			<form onSubmit={handleSubmitPet}>
				<div className='flex gap-4'>
					<h4>
						Lost or Found<span className='text-red-500'>*</span>:
					</h4>
					<Dropdown
						data={lostOrFoundList}
						setFunction={setLostOrFound}
						value={lostOrFound}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>
						{lostOrFound === 'LOST' || lostOrFound === 'Set Lost or Found'
							? 'Date Lost'
							: 'Date Found'}
					</h4>

					<input
						type='date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>
						Species<span className='text-red-500'>*</span>:
					</h4>
					<Dropdown
						data={speciesList}
						setFunction={setSpecies}
						value={species}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>Breed:</h4>
					<input
						type='text'
						className='border border-black rounded-md'
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>Name:</h4>
					<input
						type='text'
						className='border border-black rounded-md'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>

				<div className='flex gap-4 '>
					<h4>Gender:</h4>
					<Dropdown data={genderList} setFunction={setGender} value={gender} />
				</div>

				<div className='flex gap-4'>
					<h4>Age:</h4>
					<input
						type='text'
						className='border border-black rounded-md'
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>Description:</h4>
					<textarea
						className='border border-black rounded-md resize-none h-32 w-80'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				{/* location */}
				{/* image */}
				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}

export default PetForm
