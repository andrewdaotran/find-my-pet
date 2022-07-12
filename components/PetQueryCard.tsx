import Image from 'next/image'
import Link from 'next/link'
import { XIcon } from '@heroicons/react/solid'
import React, { useContext } from 'react'

import { PetData } from '../typings'

interface Props {
	pet: PetData
	userPets?: boolean
	navigateTo: string
}

const PetQueryCard = ({ pet, userPets, navigateTo }: Props) => {
	return (
		<div className=' w-[21rem]'>
			<div className='border border-black shadow-md rounded-md'>
				<div className=' w-[21rem -1px] h-56 relative mb-4  '>
					<Link href={navigateTo}>
						<a>
							<Image
								src={pet.image}
								layout='fill'
								className='rounded-t-md object-cover'
							/>
						</a>
					</Link>

					<XIcon
						className='absolute text-red-500 right-2 top-2 h-10 w-10 cursor-pointer'
						onClick={() => console.log('ayyee')}
					/>
				</div>

				<div className='grid justify-items-center gap-2 mb-4 '>
					<Link href={navigateTo}>
						<a>
							<h3 className='text-2xl font-bold'>
								{pet.name ? pet.name : 'Unknown Name'}
							</h3>
						</a>
					</Link>
					<h3>
						{pet.lostOrFound === 'Found' ? (
							<>
								<span className='font-bold'>Date Found</span>:{' '}
								{pet.dateLostOrFound}
							</>
						) : (
							<>
								<span className='font-bold'>Date Lost</span>:{' '}
								{pet.dateLostOrFound}
							</>
						)}
					</h3>
					{pet.species && (
						<h3>
							<span className='font-bold'>Species</span>: {pet.species}
						</h3>
					)}
					{pet.breed && (
						<h3>
							<span className='font-bold'>Breed</span>: {pet.breed}
						</h3>
					)}
					{pet.gender && (
						<h3>
							<span className='font-bold'>Gender</span>: {pet.gender}
						</h3>
					)}
					{pet.age && (
						<h3>
							<span className='font-bold'>Age</span>: {String(pet.age)}
						</h3>
					)}
					<h3>
						<span className='font-bold'>Description</span>: {pet.description}
					</h3>
					{userPets && (
						<div className='flex gap-4'>
							<button
								className='border border-black px-4 py-1 rounded-md bg-yellow-500 text-white '
								onClick={() => console.log('whats up')}
							>
								Edit
							</button>

							<button className='border border-black px-4 py-1 rounded-md bg-blue-500 text-white'>
								Mark as Found
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PetQueryCard
