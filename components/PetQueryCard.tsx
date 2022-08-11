import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import { PetData } from '../typings'

interface Props {
	pet: PetData
	navigateTo: string
}

const PetQueryCard = ({ pet, navigateTo }: Props) => {
	return (
		<div className=' w-[21rem] bg-white border border-pastelPurple shadow-md rounded-md'>
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
							{dayjs(pet.dateLostOrFound).format('MMM DD, YYYY')}
						</>
					) : (
						<>
							<span className='font-bold'>Date Lost</span>:{' '}
							{dayjs(pet.dateLostOrFound).format('MMM DD, YYYY')}
						</>
					)}
				</h3>

				<h3>
					<span className='font-bold'>Species</span>: {pet.species}
				</h3>
				<h3>
					<span className='font-bold'>Breed</span>: {pet.breed || 'Unknown'}
				</h3>
				<h3>
					<span className='font-bold'>
						Location {pet.lostOrFound === 'Found' ? 'Found' : 'Lost'}
					</span>
					: {`${pet.city}, ${pet.state}`}
				</h3>
			</div>
		</div>
	)
}

export default PetQueryCard
