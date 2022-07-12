import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { CREATE_PET, UPDATE_PET } from '../apollo/petQueries'
import UserContext from '../context/userContext'
import PetEditContext from '../context/petEditContext'
import {
	speciesList,
	lostOrFoundList,
	genderList,
	statesList,
	convertCase,
	compressImage,
} from '../utils'
import Dropdown from './Dropdown'
import Image from 'next/image'
import InputEmptyError from './InputEmptyError'

interface InputError {
	isEmpty: boolean
	throwErrorMessage: boolean
}

interface Props {
	isNewPet: boolean
}

const PetForm = ({ isNewPet }: Props) => {
	const { user } = useContext(UserContext)
	const { pet, clearPet, editPet } = useContext(PetEditContext)
	console.log(pet)

	const [createPet, { data: petData, loading: petLoading, error: petError }] =
		useMutation(CREATE_PET)
	const [updatePet, { data: updatedPetData }] = useMutation(UPDATE_PET)

	const [dateError, setDateError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [speciesError, setSpeciesError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [descriptionError, setDescriptionError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [lostOrFoundError, setLostOrFoundError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [imageError, setImageError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [cityError, setCityError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [stateError, setStateError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [isImageTooLarge, setIsImageTooLarge] = useState<boolean>(false)

	// changes state of input fields being empty to guard submitting without these fields
	useEffect(() => {
		if (pet.dateLostOrFound !== '') {
			setDateError({ ...dateError, isEmpty: false })
		} else {
			setDateError({ ...dateError, isEmpty: true })
		}
		if (pet.lostOrFound !== 'Set Lost or Found') {
			setLostOrFoundError({ ...lostOrFoundError, isEmpty: false })
		} else {
			setLostOrFoundError({ ...lostOrFoundError, isEmpty: true })
		}
		if (pet.description !== '') {
			setDescriptionError({ ...descriptionError, isEmpty: false })
		} else {
			setDescriptionError({ ...descriptionError, isEmpty: true })
		}
		if (pet.species !== 'Set Species') {
			setSpeciesError({ ...speciesError, isEmpty: false })
		} else {
			setSpeciesError({ ...speciesError, isEmpty: true })
		}
		if (pet.image !== '') {
			setImageError({ ...imageError, isEmpty: false })
		} else {
			setImageError({ ...imageError, isEmpty: true })
		}
		if (pet.city !== '') {
			setCityError({ ...imageError, isEmpty: false })
		} else {
			setCityError({ ...imageError, isEmpty: true })
		}
		if (pet.state !== '') {
			setStateError({ ...imageError, isEmpty: false })
		} else {
			setStateError({ ...imageError, isEmpty: true })
		}
	}, [
		pet.lostOrFound,
		pet.description,
		pet.species,
		pet.image,
		pet.state,
		pet.city,
	])

	const handleCreateOrEditPet = (e) => {
		e.preventDefault()
		if (dateError.isEmpty) {
			setDateError({ ...lostOrFoundError, throwErrorMessage: true })
		}
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
		if (cityError.isEmpty) {
			setCityError({ ...imageError, throwErrorMessage: true })
		}
		if (stateError.isEmpty) {
			setStateError({ ...imageError, throwErrorMessage: true })
		}

		if (
			speciesError.isEmpty ||
			descriptionError.isEmpty ||
			lostOrFoundError.isEmpty ||
			imageError.isEmpty ||
			cityError.isEmpty ||
			stateError.isEmpty
		) {
			return
		}

		if (isNewPet) {
			createPet({
				variables: {
					input: {
						name: convertCase(pet.name) || 'Uknown Name',
						age: pet.age,
						gender: pet.gender,
						species: pet.species,
						breed: convertCase(pet.breed),
						dateLostOrFound: pet.dateLostOrFound,
						description: pet.description,
						image: pet.image,
						lostOrFound: pet.lostOrFound,
						city: convertCase(pet.city),
						state: pet.state,
						user: user.id,
					},
				},
			})
		} else {
			updatePet({
				variables: {
					input: {
						name: convertCase(pet.name) || 'Uknown Name',
						age: pet.age,
						gender: pet.gender,
						species: pet.species,
						breed: convertCase(pet.breed),
						dateLostOrFound: pet.dateLostOrFound,
						description: pet.description,
						image: pet.image,
						lostOrFound: pet.lostOrFound,
						city: convertCase(pet.city),
						state: pet.state,
						user: user.id,
					},
				},
			})
			console.log('pet edited!')
		}
		setLostOrFoundError({ isEmpty: true, throwErrorMessage: false })
		setDescriptionError({ isEmpty: true, throwErrorMessage: false })
		setSpeciesError({ isEmpty: true, throwErrorMessage: false })
		setImageError({ isEmpty: true, throwErrorMessage: false })
		setCityError({ isEmpty: true, throwErrorMessage: false })
		setStateError({ isEmpty: true, throwErrorMessage: false })
		clearPet()
	}

	const handleImageChange = (e) => {
		const image = e.target.files[0]

		compressImage(image, editPet, 'image', setIsImageTooLarge)
	}

	const handleRemoveImage = (e) => editPet('', 'image')

	return (
		<div>
			<form onSubmit={handleCreateOrEditPet}>
				<div className='flex gap-4'>
					<h4>
						<span className='font-bold'>Lost or Found</span>
						<span className='text-red-500'>*</span>:
					</h4>
					<Dropdown
						data={lostOrFoundList}
						setFunction={editPet}
						value={pet.lostOrFound}
						title='lostOrFound'
						isForm={true}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>
						{pet.lostOrFound === 'Lost' ||
						pet.lostOrFound === 'Set Lost or Found' ? (
							<>
								<span className='font-bold'>Date Lost</span>
								<span className='text-red-500'>*</span> :
							</>
						) : (
							<>
								<span className='font-bold'>Date Found</span>
								<span className='text-red-500'>*</span> :
							</>
						)}
					</h4>

					<input
						type='date'
						value={pet.dateLostOrFound}
						onChange={(e) => editPet(e.target.value, 'dateLostOrFound')}
					/>
					{lostOrFoundError.throwErrorMessage && (
						<InputEmptyError message='Please specify lost or found' />
					)}
				</div>

				<div className='flex gap-4'>
					<h4>
						<span className='font-bold'>Species</span>
						<span className='text-red-500'>*</span>:
					</h4>
					<Dropdown
						data={speciesList}
						setFunction={editPet}
						value={pet.species}
						title='species'
						isForm={true}
					/>
					{speciesError.throwErrorMessage && (
						<InputEmptyError message='Please enter a species' />
					)}
				</div>

				<div className='flex gap-4'>
					<h4>
						<span className='font-bold'>Breed</span>:
					</h4>
					<input
						type='text'
						className='border border-black rounded-md'
						value={pet.breed}
						onChange={(e) => editPet(e.target.value, 'breed')}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>
						<span className='font-bold'>Name</span>:
					</h4>
					<input
						type='text'
						className='border border-black rounded-md'
						value={pet.name}
						onChange={(e) => editPet(e.target.value, 'name')}
					/>
				</div>

				<div className='flex gap-4 '>
					<h4>
						<span className='font-bold'>Gender</span>:
					</h4>
					<Dropdown
						data={genderList}
						setFunction={editPet}
						value={pet.gender}
						title='gender'
						isForm={true}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>
						<span className='font-bold'>Age</span>:
					</h4>
					<input
						type='text'
						className='border border-black rounded-md'
						value={pet.age}
						onChange={(e) => editPet(e.target.value, 'age')}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>
						<span className='font-bold'>Description</span>
						<span className='text-red-500'>*</span> :
					</h4>
					<textarea
						className='border border-black rounded-md resize-none h-32 w-80'
						value={pet.description}
						onChange={(e) => editPet(e.target.value, 'description')}
					/>
					{descriptionError.throwErrorMessage && (
						<InputEmptyError message='Please enter a pet description' />
					)}
				</div>

				{/* location */}
				<div className='flex gap-4 '>
					<h4>
						{pet.lostOrFound === 'Lost' ||
						pet.lostOrFound === 'Set Lost or Found' ? (
							<>
								<span className='font-bold'>State Lost</span>
								<span className='text-red-500'>*</span> :
							</>
						) : (
							<>
								<span className='font-bold'>State Found</span>
								<span className='text-red-500'>*</span> :
							</>
						)}
					</h4>
					<Dropdown
						data={statesList}
						setFunction={editPet}
						value={pet.state}
						title='state'
						isForm={true}
					/>
				</div>

				<div className='flex gap-4'>
					<h4>
						{pet.lostOrFound === 'Lost' ||
						pet.lostOrFound === 'Set Lost or Found' ? (
							<>
								<span className='font-bold'>City Lost</span>
								<span className='text-red-500'>*</span> :
							</>
						) : (
							<>
								<span className='font-bold'>City Found</span>:
							</>
						)}
					</h4>
					<input
						type='text'
						className='border border-black rounded-md'
						value={pet.city}
						onChange={(e) => editPet(e.target.value, 'city')}
					/>
				</div>

				{/* image */}
				<div className='flex gap-4'>
					<h4>
						<span className='font-bold'>Image</span>
						<span className='text-red-500'>*</span>:
					</h4>
					<input
						type='file'
						accept='image/png, image/jpeg'
						onChange={handleImageChange}
					/>
					<h4>
						Only <span className='text-blue-500'>jpeg</span> and
						<span className='text-blue-500'> png</span> files are accepted
					</h4>
					{imageError.throwErrorMessage && (
						<InputEmptyError message='Please select an image' />
					)}
				</div>

				{pet.image && (
					<div className=''>
						<div className='flex gap-4'>
							<h4>Image Preview:</h4>
							<div className='border border-black w-36 h-36 relative'>
								<Image src={pet.image} layout='fill' className='object-cover' />
							</div>
						</div>
						<button onClick={handleRemoveImage} className=''>
							Remove Image
						</button>
					</div>
				)}

				{isImageTooLarge && (
					<InputEmptyError message='Unfortunately your image is too large' />
				)}

				<button type='submit'>Submit</button>
			</form>
		</div>
	)
}

export default PetForm
