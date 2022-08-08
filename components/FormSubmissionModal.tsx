import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { PetData } from '../typings'
import { useWindowSize } from '../custom-hooks/useWindowSize'
import { XIcon } from '@heroicons/react/solid'

interface Props {
	isNewPet?: boolean
	isComment?: boolean
	petData?: PetData
	handleCloseModal?: () => void
}

const FormSubmissionModal = ({
	isNewPet,
	isComment,
	petData,
	handleCloseModal,
}: Props) => {
	const router = useRouter()
	const size = useWindowSize()

	const handleNavigate = () => {
		router.push(`/pets/${petData.lostOrFound.toLowerCase()}-pets/${petData.id}`)
	}
	return (
		<div className='border border-pastelPurple grid mx-auto mt-8 bg-pastelCream md:px-8 px-4 py-4 rounded-md  w-full md:max-w-3xl max-w-xl mb-8 text-center relative'>
			<h3>
				{isComment &&
					'Your Comment has been submitted! Please give it up to 2 mintuese to reflect on the app'}
				{isNewPet &&
					!isComment &&
					'Your pet post has been created! Please give it up to 2 minutes to reflect on the app.'}
				{!isNewPet &&
					!isComment &&
					'Your pet post has been edited. Please give it up to 2 minutes to reflect on the app.'}
			</h3>
			<div className='md:h-64 md:w-[32rem] h-64 w-80 relative mx-auto mt-8'>
				<Image
					src={size.width >= 768 ? '/Pets-in-a-line.png' : '/baby-pets.png'}
					layout='fill'
					className='object-cover'
				/>
			</div>
			{isNewPet && (
				<div className={` flex justify-center ${isNewPet && 'gap-10'}`}>
					{isNewPet && (
						<button
							onClick={handleCloseModal}
							className='border border-pastelLighterPurple mt-4 px-2 py-1 bg-pastelDarkerRed rounded-md hover:bg-pastelRed transition ease-in-out'
						>
							Create a New Post
						</button>
					)}

					<button
						onClick={handleNavigate}
						className='border border-pastelLighterPurple mt-4 px-2 py-1 bg-pastelSand rounded-md hover:bg-pastelLighterCream transition ease-in-out'
					>
						Go To Created Pet
					</button>
				</div>
			)}
		</div>
	)
}

export default FormSubmissionModal
