import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PetData } from '../typings'

interface Props {
	pet: PetData
}

const PetQueryCard = ({ pet }: Props) => {
	return (
		<Link href={`/pets/found-pets/${pet.id}`}>
			<a>
				<div className=' w-96 '>
					<div className='border border-black shadow-md rounded-md'>
						<div className='w-[24rem - 1px] h-64 relative mb-4  '>
							<Image
								src={pet.image}
								layout='fill'
								className='rounded-t-md object-cover'
							/>
						</div>
						<div className='grid justify-items-center gap-2 mb-4 '>
							<h3 className='text-2xl font-bold'>
								{pet.name ? pet.name : 'Unknown Name'}
							</h3>
							<h3>
								{pet.lostOrFound === 'Found' ? (
									<>
										<span className='font-bold'>Date Found</span>:{' '}
										{pet.dateFound}
									</>
								) : (
									<>
										<span className='font-bold'>Date Lost</span>: {pet.dateLost}
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
								<span className='font-bold'>Description</span>:{' '}
								{pet.description}
							</h3>
						</div>
					</div>
				</div>
			</a>
		</Link>
	)
}

export default PetQueryCard
