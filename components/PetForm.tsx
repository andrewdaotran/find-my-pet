import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { CREATE_PET, UPDATE_PET } from '../apollo/petQueries'
import UserContext from '../context/userContext'
import PetEditContext from '../context/petEditContext'
import FormSubmissionContext from '../context/formSubmissionContext'
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
import FormSubmissionModal from './FormSubmissionModal'

interface InputError {
	isEmpty: boolean
	throwErrorMessage: boolean
}

interface Props {
	isNewPet: boolean
	setIsEditingPet?: React.Dispatch<React.SetStateAction<boolean>>
}

const PetForm = ({ isNewPet, setIsEditingPet }: Props) => {
	const { user } = useContext(UserContext)
	const { pet, clearPet, editPet } = useContext(PetEditContext)
	const { submitModalPopup } = useContext(FormSubmissionContext)
	// console.log(pet)

	const [
		createPet,
		{
			data: petData,
			loading: petLoading,
			error: petError,
			called: petCalled,
			reset: petReset,
		},
	] = useMutation(CREATE_PET)
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
		} else {
			setDateError({ ...lostOrFoundError, throwErrorMessage: false })
		}
		if (lostOrFoundError.isEmpty) {
			setLostOrFoundError({ ...lostOrFoundError, throwErrorMessage: true })
		} else {
			setLostOrFoundError({ ...lostOrFoundError, throwErrorMessage: false })
		}
		if (descriptionError.isEmpty) {
			setDescriptionError({ ...descriptionError, throwErrorMessage: true })
		} else {
			setDescriptionError({
				...descriptionError,
				throwErrorMessage: false,
			})
		}
		if (speciesError.isEmpty) {
			setSpeciesError({ ...speciesError, throwErrorMessage: true })
		} else {
			setSpeciesError({ ...speciesError, throwErrorMessage: false })
		}
		if (imageError.isEmpty) {
			setImageError({ ...imageError, throwErrorMessage: true })
		} else {
			setImageError({ ...imageError, throwErrorMessage: false })
		}
		if (cityError.isEmpty) {
			setCityError({ ...imageError, throwErrorMessage: true })
		} else {
			setCityError({ ...imageError, throwErrorMessage: false })
		}
		if (stateError.isEmpty) {
			setStateError({ ...imageError, throwErrorMessage: true })
		} else {
			setStateError({ ...imageError, throwErrorMessage: false })
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
						name: convertCase(pet.name) || 'Unknown Name',
						age: pet.age || '',
						gender: pet.gender || 'NA',
						species: pet.species,
						breed: convertCase(pet.breed) || '',
						dateLostOrFound: pet.dateLostOrFound,
						description: pet.description,
						image: pet.image,
						lostOrFound: pet.lostOrFound,
						city: convertCase(pet.city),
						state: pet.state,
						user: user.id,
						isReturned: false,
					},
				},
			})
		} else {
			updatePet({
				variables: {
					input: {
						id: pet.id,
						name: convertCase(pet.name) || 'Unknown Name',
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
						// user: user.id,
					},
				},
			})
			setIsEditingPet(false)
		}

		setLostOrFoundError({ isEmpty: true, throwErrorMessage: false })
		setDescriptionError({ isEmpty: true, throwErrorMessage: false })
		setSpeciesError({ isEmpty: true, throwErrorMessage: false })
		setImageError({ isEmpty: true, throwErrorMessage: false })
		setCityError({ isEmpty: true, throwErrorMessage: false })
		setStateError({ isEmpty: true, throwErrorMessage: false })
		clearPet()

		// submitModalPopup()
	}

	const handleCancelEditPet = () => {
		setIsEditingPet(false)
		clearPet()
	}

	const handleImageChange = (e) => {
		const image = e.target.files[0]

		compressImage(image, editPet, 'image', setIsImageTooLarge)
	}

	const handleRemoveImage = (e) => editPet('', 'image')

	const handleCloseModal = () => {
		petReset()
	}

	return petLoading && !petCalled ? (
		<div className='border border-pastelPurple grid md:mx-auto mt-8 bg-pastelCream md:px-8 px-4 py-4 rounded-md  w-full md:max-w-3xl sm:mx-2 mb-8'>
			<h3 className='text-center text-lg font-bold mb-8'>
				Make a Lost or Found Pet Post
			</h3>
			<form
				onSubmit={handleCreateOrEditPet}
				className='md:grid md:grid-cols-2 flex-col md:gap-8'
			>
				{/* Left Div */}
				<div className='grid gap-2 mb-2 md:mb-0'>
					{/* Lost or Found */}
					<div className='grid gap-1'>
						<h4 className=''>
							<span className='font-bold'>Lost or Found</span>
							<span className='text-red-500'>*</span>:
						</h4>
						<div className='col-span-2'>
							<Dropdown
								data={lostOrFoundList}
								setFunction={editPet}
								value={pet.lostOrFound}
								title='lostOrFound'
								isForm={true}
							/>
						</div>
						{lostOrFoundError.throwErrorMessage && (
							<InputEmptyError message='Please specify lost or found' />
						)}
					</div>

					{/* Date */}
					<div className='grid gap-1 '>
						<h4 className=''>
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
							disabled={petLoading && true}
							type='date'
							value={pet.dateLostOrFound}
							onChange={(e) => editPet(e.target.value, 'dateLostOrFound')}
							className='cursor-pointer  border border-black rounded-md px-2 py-1  w-full '
						/>
						{dateError.throwErrorMessage && (
							<InputEmptyError
								message={
									pet.lostOrFound === 'Lost'
										? 'Please specify date lost'
										: 'Please specify date found'
								}
							/>
						)}
					</div>

					{/* Species */}
					<div className='gap-1 grid '>
						<h4 className=''>
							<span className='font-bold'>Species</span>
							<span className='text-red-500'>*</span>:
						</h4>
						<div className=' w-full'>
							<Dropdown
								data={speciesList}
								setFunction={editPet}
								value={pet.species}
								title='species'
								isForm={true}
							/>
						</div>
						{speciesError.throwErrorMessage && (
							<InputEmptyError message='Please enter a species' />
						)}
					</div>
					{/* Breed */}
					<div className=' grid  gap-1'>
						<h4 className=''>
							<span className='font-bold'>Breed</span>:
						</h4>
						<input
							disabled={petLoading && true}
							type='text'
							className='border border-black rounded-md  px-2 py-1 outline-none  w-full'
							value={pet.breed}
							onChange={(e) => editPet(e.target.value, 'breed')}
						/>
					</div>
					{/* Name */}
					<div className='grid  gap-1'>
						<h4 className=''>
							<span className='font-bold'>Name</span>:
						</h4>
						<input
							disabled={petLoading && true}
							type='text'
							className='border border-black rounded-md  px-2 py-1 outline-none  w-full'
							value={pet.name}
							onChange={(e) => editPet(e.target.value, 'name')}
						/>
					</div>
					{/* Gender */}
					<div className='grid  gap-1 '>
						<h4 className=''>
							<span className='font-bold'>Gender</span>:
						</h4>
						<div className=' w-full'>
							<Dropdown
								data={genderList}
								setFunction={editPet}
								value={pet.gender}
								title='gender'
								isForm={true}
							/>
						</div>
					</div>
					{/* Age */}
					<div className='grid  gap-1'>
						<h4 className=''>
							<span className='font-bold'>Age</span>:
						</h4>
						<input
							disabled={petLoading && true}
							type='text'
							className='border border-black rounded-md  px-2 py-1 outline-none  w-full '
							value={pet.age}
							onChange={(e) => editPet(e.target.value, 'age')}
						/>
					</div>
				</div>
				{/* Right Div */}
				<div className='grid gap-2'>
					{/* Description */}
					<div className='grid  gap-1'>
						<h4 className=''>
							<span className='font-bold'>Description</span>
							<span className='text-red-500'>*</span> :
						</h4>
						<textarea
							disabled={petLoading && true}
							className='border border-black rounded-md resize-none h-32 w-full  px-2 py-1 outline-none '
							value={pet.description}
							onChange={(e) => editPet(e.target.value, 'description')}
						/>
						{descriptionError.throwErrorMessage && (
							<InputEmptyError message='Please enter a pet description' />
						)}
					</div>

					{/* State */}
					<div className='grid  gap-1 '>
						<h4 className=''>
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
						<div className=' w-full'>
							<Dropdown
								data={statesList}
								setFunction={editPet}
								value={pet.state}
								title='state'
								isForm={true}
							/>
						</div>
						{stateError.throwErrorMessage && (
							<InputEmptyError
								message={
									pet.lostOrFound === 'Lost'
										? 'Please select the state the pet was lost'
										: 'Please select the state the pet was found'
								}
							/>
						)}
					</div>
					{/* City */}
					<div className='grid  gap-1'>
						<h4 className=''>
							{pet.lostOrFound === 'Lost' ||
							pet.lostOrFound === 'Set Lost or Found' ? (
								<>
									<span className='font-bold'>City Lost</span>
									<span className='text-red-500'>*</span> :
								</>
							) : (
								<>
									<span className='font-bold'>City Found</span>:
									<span className='text-red-500'>*</span>
								</>
							)}
						</h4>
						<input
							disabled={petLoading && true}
							type='text'
							className='border border-black rounded-md  px-2 py-1 outline-none  w-full'
							value={pet.city}
							onChange={(e) => editPet(e.target.value, 'city')}
						/>
						{cityError.throwErrorMessage && (
							<InputEmptyError
								message={
									pet.lostOrFound === 'Lost'
										? 'Please specify the city the pet was lost'
										: 'Please specify the city the pet was found'
								}
							/>
						)}
					</div>

					{/* Image */}
					<div className='grid  gap-1'>
						<h4 className=''>
							<span className='font-bold'>Image</span>
							<span className='text-red-500'>*</span>:
						</h4>
						<input
							disabled={petLoading && true}
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
					{/* Image Preview */}
					{pet.image && (
						<div className=' '>
							<div className='grid gap-1'>
								<h4 className='font-bold'>Image Preview:</h4>
								<div className='border border-pastelPurple w-[21rem] h-56 relative'>
									<Image
										src={pet.image}
										layout='fill'
										className='object-cover'
									/>
								</div>
							</div>
							<button
								disabled={petLoading && true}
								onClick={handleRemoveImage}
								className='border border-pastelLighterPurple mt-4 px-2 py-1 bg-pastelSand rounded-md'
							>
								Remove Image
							</button>
						</div>
					)}

					{/* Image too large popup */}
					{isImageTooLarge && (
						<div className=''>
							<InputEmptyError message='Unfortunately your image is too large' />
						</div>
					)}
				</div>
				{/* Loading Message */}
				{petLoading && (
					<div className='mt-4 text-center  col-span-2 '>
						<h2>Processing request...</h2>
					</div>
				)}

				{petLoading || (
					<div className=' flex gap-10  col-span-2  justify-center '>
						<button
							type='submit'
							className='border border-pastelPurple py-1 px-2 rounded-md bg-pastelLightGreen hover:bg-pastelDarkerLightGreen transition ease-in-out'
						>
							Submit
						</button>
						<button
							onClick={handleCancelEditPet}
							className='py-1 px-2 rounded-md border border-pastelPurple bg-pastelRed hover:bg-pastelDarkerRed transition ease-in-out'
						>
							Cancel Edit
						</button>
					</div>
				)}
			</form>
		</div>
	) : (
		<div>
			{petLoading ? null : (
				<FormSubmissionModal
					handleCloseModal={handleCloseModal}
					isNewPet={true}
					petData={petData && petData.createPet}
				/>
			)}
		</div>
	)
}

export default PetForm
