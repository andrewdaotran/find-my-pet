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
						<div className='w-96 h-64 relative mb-4 '>
							<Image
								src={pet.image}
								layout='fill'
								className='rounded-t-md object-fill'
							/>
						</div>
						<div className='grid justify-items-center gap-2 mb-4 '>
							<h3 className='text-xl font-bold'>{pet.name}</h3>
							<h3>
								{pet.lostOrFound === 'Found'
									? `Date Found: ${pet.dateFound}`
									: `Date Lost: ${pet.dateLost}`}
							</h3>
							{pet.species && <h3>Species: {pet.species}</h3>}
							{pet.breed && <h3>Breed: {pet.species}</h3>}
							{pet.gender && <h3>Gender: {pet.gender}</h3>}
							{pet.age && <h3>Age: {String(pet.age)}</h3>}
							<h3>Description: {pet.description}</h3>
						</div>
					</div>
				</div>
			</a>
		</Link>
	)
}

export default PetQueryCard
