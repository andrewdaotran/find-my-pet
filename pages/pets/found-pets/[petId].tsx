import React, { useContext, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { gql, useMutation } from '@apollo/client'
import dayjs from 'dayjs'

import { initializeApollo } from '../../../apollo/apollo-client'
import { PET_QUERY, DELETE_PET } from '../../../apollo/petQueries'
import PetForm from '../../../components/PetForm'
import PetEditContext from '../../../context/petEditContext'
import UserContext from '../../../context/userContext'
import FormSubmissionContext from '../../../context/formSubmissionContext'
import { PetData } from '../../../typings'
import FormSubmissionModal from '../../../components/FormSubmissionModal'
import CommentSection from '../../../components/CommentSection'
import CommentForm from '../../../components/CommentForm'
import useWindowSize from '../../../custom-hooks/useWindowSize'
import DeletePetModal from '../../../components/DeletePetModal'

interface Props {
	pet: PetData
}

interface RemovePetPopup {
	value: boolean
	type: string
}

const FoundPet = ({ pet }: Props) => {
	const [isUserPost, setIsUserPost] = useState<boolean>(false)
	const [isEditingPet, setIsEditingPet] = useState<boolean>(false)
	const [isLargeWindow, setIsLargeWindow] = useState<boolean>(false)
	const [isMarkedButtonPressed, setIsMarkedButtonPressed] =
		useState<boolean>(false)
	const [removePetPopup, setRemovePetPopup] = useState<RemovePetPopup>({
		value: false,
		type: '',
	})
	const { user } = useContext(UserContext)
	const { clearPet, storePet } = useContext(PetEditContext)
	const { isFormSubmitted } = useContext(FormSubmissionContext)
	const size = useWindowSize()

	const [deletePet] = useMutation(DELETE_PET, { variables: { id: pet.id } })

	useEffect(() => {
		clearPet()
		storePet(pet)
	}, [])

	useEffect(() => {
		if (size.width > 1800) {
			setIsLargeWindow(true)
		} else {
			setIsLargeWindow(false)
		}
	}, [size])

	useEffect(() => {
		if (user.id === pet.user) {
			setIsUserPost(true)
		}
	}, [user])

	const handleEdit = () => {
		setIsEditingPet(true)
	}

	const handleDeletePet = (type: string) => {
		setRemovePetPopup({ type, value: true })
		setIsMarkedButtonPressed(true)
	}

	return (
		<div className='relative'>
			{removePetPopup.value && (
				<DeletePetModal
					isMarkedReturned={removePetPopup.type === 'returned' ? true : false}
					petName={pet.name}
					setRemovePetPopup={setRemovePetPopup}
					deletePet={deletePet}
					setIsMarkedButtonPressed={setIsMarkedButtonPressed}
					removePetPopup={removePetPopup}
					userId={user.id}
				/>
			)}

			<div
				className={`${size.width > 1800 ? 'flex gap-8 justify-center' : null} `}
			>
				{/* All Boxes */}
				<div className='grid gap-4 '>
					{/* Image */}
					<div
						className=' w-[21rem] h-56 relative  mx-auto border border-pastelPurple 
			sm:w-[30rem] sm:h-[20rem]
			md:w-[42rem] md:h-[28rem] mt-8 '
					>
						<Image src={pet.image} layout='fill' className='object-cover' />
					</div>
					{/* Info Box */}
					<div className='border border-pastelPurple w-[21rem] sm:w-[30rem] md:w-[42rem] mx-auto bg-white p-4 grid justify-items-center gap-4 '>
						<h2 className='text-4xl '>{pet.name}</h2>
						<div className='flex gap-4'>
							<h3>{pet.breed ? pet.breed : 'Unknown Breed'}</h3>
							<h3>{`${pet.city}, ${pet.state}`}</h3>
						</div>
						<div className='flex gap-4'>
							<h3>{pet.species}</h3>
							<h3>{pet.gender ? pet.gender : 'Unknown Gender'}</h3>
							<h3>{pet.age ? `${pet.age} years old ` : 'Unknown Age'}</h3>
						</div>
						<div className='flex gap-4'>
							{isUserPost && (
								<>
									{size.width <= 1800 && !isEditingPet && (
										<button
											onClick={handleEdit}
											className='border border-pastelPurple px-2 py-1 rounded-md bg-pastelLighterPurple hover:bg-pastelPurple transition-all ease-in-out'
										>
											Edit
										</button>
									)}
									{!isMarkedButtonPressed && (
										<button
											onClick={() => handleDeletePet('returned')}
											className={`border border-pastelPurple rounded-md px-2 py-1 bg-pastelLightGreen hover:bg-pastelDarkerLightGreen transition-all ease-in-out`}
										>
											Mark As Returned
										</button>
									)}
								</>
							)}
						</div>
					</div>

					{/* Pet Form Below */}
					{isUserPost && isEditingPet && size.width <= 1800 ? (
						<PetForm isNewPet={false} setIsEditingPet={setIsEditingPet} />
					) : null}

					{/* Description Box */}
					<div className='border border-pastelPurple w-[21rem] sm:w-[30rem] md:w-[42rem] mx-auto bg-white p-4 grid justify-items-center gap-4 '>
						<h3 className='text-xl'>About</h3>
						<h3>
							{`Date Found: ${dayjs(pet.dateLostOrFound).format(
								'MMM DD, YYYY'
							)}`}
						</h3>
						<h3 className='whitespace-pre-line bg-backgroundGrey border border-pastelPurple w-full p-4'>
							{pet.description}
						</h3>
						{!isMarkedButtonPressed && (
							<button
								className='border border-pastelPurple transition ease-in-out bg-pastelRed hover:bg-red-300 py-1 px-2 rounded-md'
								onClick={() => handleDeletePet('delete')}
							>
								Delete Post
							</button>
						)}
					</div>

					{/* Form Submit Modal */}
					{isFormSubmitted && <FormSubmissionModal isNewPet={false} />}

					{/* Comment Form */}
					<div className='w-[21rem] 6	sm:w-[30rem] 	md:w-[42rem]  border border-pastelPurple mx-auto p-4 bg-white '>
						<h3 className='text-center text-xl mb-4'>Submit a Comment</h3>
						<CommentForm petId={pet.id} />
						{isFormSubmitted && (
							<FormSubmissionModal isNewPet={false} isComment={true} />
						)}
					</div>
					{/* Comment Section */}
					<div className='w-[21rem] 6	sm:w-[30rem] 	md:w-[42rem]  border border-pastelPurple mx-auto p-4 bg-white '>
						<h3 className='text-center text-xl mb-4'>Comments</h3>
						<CommentSection comments={pet.comments} />
					</div>
				</div>
				<div className=' mt-8 w-[42rem]'>
					{/* Pet Form on Side */}
					{isUserPost && size.width > 1800 ? (
						<PetForm
							isNewPet={false}
							setIsEditingPet={setIsEditingPet}
							isLargeWindow={isLargeWindow}
						/>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default FoundPet

export const getStaticPaths = async () => {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query({
		query: gql`
			query FoundPets {
				foundPets {
					id
				}
			}
		`,
	})

	const paths = data.foundPets.map((pet: PetData) => {
		return {
			params: {
				petId: pet.id,
			},
		}
	})

	return {
		fallback: false,
		paths,
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query({
		query: PET_QUERY,
		variables: { id: params.petId },
	})

	return {
		props: { pet: data.pet },
		revalidate: 120,
	}
}
