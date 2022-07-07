import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'
import FileBase from 'react-file-base64'

import { CREATE_PET } from '../apollo/petQueries'
import UserContext from '../context/userContext'
import {
	speciesList,
	lostOrFoundList,
	genderList,
	statesList,
	convertCase,
} from '../utils'
import Dropdown from './Dropdown'
import Image from 'next/image'

interface InputError {
	isEmpty: boolean
	throwErrorMessage: boolean
}

const PetForm = () => {
	const [species, setSpecies] = useState<string>('Set Species')
	const [speciesError, setSpeciesError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [breed, setBreed] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [age, setAge] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [descriptionError, setDescriptionError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [lostOrFound, setLostOrFound] = useState<string>('Set Lost or Found')
	const [lostOrFoundError, setLostOrFoundError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
	const [gender, setGender] = useState<string>('NA')
	const [state, setState] = useState<string>('')
	const [city, setCity] = useState<string>('')
	const [image, setImage] = useState<string>('')
	const [imageError, setImageError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})

	const { user } = useContext(UserContext)

	const [createPet, { data: petData, loading: petLoading, error: petError }] =
		useMutation(CREATE_PET)

	// changes state of input fields being empty to guard submitting without these fields
	useEffect(() => {
		if (lostOrFound !== 'Set Lost or Found') {
			setLostOrFoundError({ ...lostOrFoundError, isEmpty: false })
		} else {
			setLostOrFoundError({ ...lostOrFoundError, isEmpty: true })
		}
		if (description !== '') {
			setDescriptionError({ ...descriptionError, isEmpty: false })
		} else {
			setDescriptionError({ ...descriptionError, isEmpty: true })
		}
		if (species !== 'Set Species') {
			setSpeciesError({ ...speciesError, isEmpty: false })
		} else {
			setSpeciesError({ ...speciesError, isEmpty: true })
		}
		if (image !== '') {
			setImageError({ ...imageError, isEmpty: false })
		} else {
			setImageError({ ...imageError, isEmpty: true })
		}
	}, [lostOrFound, description, species, image])

	const handleSubmitPet = (e) => {
		e.preventDefault()
		if (lostOrFoundError.isEmpty) {
			setLostOrFoundError({ ...lostOrFoundError, throwErrorMessage: true })
		}
		if (descriptionError.isEmpty) {
			setDescriptionError({ ...descriptionError, throwErrorMessage: true })
		}

		if (speciesError.isEmpty) {
			setSpeciesError({ ...speciesError, throwErrorMessage: true })
		}
		if (imageError.isEmpty) {
			setImageError({ ...imageError, throwErrorMessage: true })
		}

		if (
			speciesError.isEmpty ||
			descriptionError.isEmpty ||
			lostOrFoundError.isEmpty ||
			imageError.isEmpty
		) {
			return
		}

		let whichDate = ''
		lostOrFound === 'Lost'
			? (whichDate = 'dateLost')
			: (whichDate = 'dateFound')
		createPet({
			variables: {
				input: {
					name: convertCase(name),
					age,
					gender,
					species,
					breed: convertCase(breed),
					[whichDate]: date,
					description,
					image,
					lostOrFound,
					city: convertCase(city),
					state,
					user: user.id,
				},
			},
		})
		setLostOrFoundError({ isEmpty: true, throwErrorMessage: false })
		setDescriptionError({ isEmpty: true, throwErrorMessage: false })
		setSpeciesError({ isEmpty: true, throwErrorMessage: false })
		setImageError({ isEmpty: true, throwErrorMessage: false })
		setSpecies('Set Species')
		setBreed('')
		setName('')
		setAge('')
		setDescription('')
		setLostOrFound('Set Lost or Found')
		setDate(format(new Date(), 'yyyy-MM-dd'))
		setGender('NA')
		setState('')
		setCity('')
		setImage('')
	}

	const handleImageChange = ({ base64 }) => setImage(base64)

	const handleRemoveImage = (e) => setImage('')

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
						{lostOrFound === 'Lost' || lostOrFound === 'Set Lost or Found'
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
					<h4>
						Description<span className='text-red-500'>*</span> :
					</h4>
					<textarea
						className='border border-black rounded-md resize-none h-32 w-80'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				{/* location */}
				<div className='flex gap-4 '>
					<h4>
						{lostOrFound === 'Lost' || lostOrFound === 'Set Lost or Found'
							? 'State Lost'
							: 'State Found'}
					</h4>
					<Dropdown data={statesList} setFunction={setState} value={state} />
				</div>

				<div className='flex gap-4'>
					<h4>
						{lostOrFound === 'Lost' || lostOrFound === 'Set Lost or Found'
							? 'City Lost'
							: 'City Found'}
					</h4>
					<input
						type='text'
						className='border border-black rounded-md'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>

				{/* image */}
				<div className='flex gap-4'>
					<h4>
						Image<span className='text-red-500'>*</span>:
					</h4>
					<FileBase type='file' multiple={false} onDone={handleImageChange} />
				</div>

				{image && (
					<div className=''>
						<div className='flex gap-4'>
							<h4>Image Preview:</h4>
							<div className='border border-black w-36 h-36 relative'>
								<Image src={image} layout='fill' className='object-cover' />
							</div>
						</div>
						<button onClick={handleRemoveImage} className=''>
							Remove Image
						</button>
					</div>
				)}

				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}

export default PetForm
