import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import React, { useContext } from 'react'

import { PetAdoptionData } from '../typings'

interface Props {
	pet: PetAdoptionData
	userPets?: boolean
	navigateTo: string
}

const PetQueryCard = ({ pet, userPets, navigateTo }: Props) => {
	// console.log(pet)
	return (
		<div className=' w-[300px]  bg-white rounded-md border border-pastelPurple shadow-md '>
			{/* <div className=''> */}
			<div className=' w-[298px] h-[350px] relative mb-4 '>
				<Link href={navigateTo}>
					<a>
						<Image
							src={
								(pet.primary_photo_cropped !== null &&
									pet.primary_photo_cropped.full) ||
								'/No-image-available.png'
							}
							layout='fill'
							className='rounded-t-md object-cover '
						/>
					</a>
				</Link>
			</div>
			<div className=' grid justify-items-center gap-2 mb-4'>
				<Link href={`/pets/pet-adoption/${pet.id}`}>
					<a>
						<h3 className='text-2xl font-bold'>{pet.name}</h3>
					</a>
				</Link>
				<h3>
					<span className='font-bold'>Species</span>: {pet.species}
				</h3>
				<h3>
					<span className='font-bold'>Breed</span>:{' '}
					{pet.breeds.primary || 'Unknown'}
				</h3>
				<h3>
					<span className='font-bold'>Gender</span>: {pet.gender}
				</h3>
				<h3>
					<span className='font-bold'>Age</span>: {pet.age}
				</h3>
				<h3>
					<span className='font-bold'>Size</span>: {pet.size}
				</h3>
				<h3>
					<span className='font-bold'>
						{pet.gender === 'Male' ? 'Neutered' : 'Spayed'}
					</span>
					: {pet.attributes.spayed_neutered ? 'Yes' : 'No'}
				</h3>
			</div>
			{/* </div> */}
		</div>
	)
}

export default PetQueryCard
