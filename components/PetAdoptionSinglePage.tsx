import React, { useContext, useEffect, useState } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import dayjs from 'dayjs'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { SinglePetAdoptionData } from '../typings'
import useWindowSize from '../custom-hooks/useWindowSize'
import CopiedPopup from './CopiedPopup'

interface Props {
	pet: SinglePetAdoptionData
}

interface Clipboard {
	value: string
	copied: boolean
}

const PetAdoptionSinglePage = ({ pet }: Props) => {
	const [clipboard, setClipboard] = useState<Clipboard>({
		value: pet.contact.email,
		copied: false,
	})

	const onCopy = () => {
		setClipboard({ ...clipboard, copied: true })
	}

	const clipboardCopiedMessage = () => {
		setTimeout(() => {
			setClipboard({ ...clipboard, copied: false })
		}, 2000)
	}

	const size = useWindowSize()

	return (
		<div className='relative'>
			<div
				className={`${
					size.width > 1800 ? 'flex gap-8 justify-center mb-8' : null
				} `}
			>
				{/* All Boxes */}
				<div className='grid gap-4 '>
					{/* Image */}
					<div
						className=' w-[21rem] h-56 relative  mx-auto border border-pastelPurple
			sm:w-[30rem] sm:h-[20rem]
			md:w-[42rem] md:h-[28rem] mt-8 bg-black'
					>
						<Image
							src={
								(pet.photos.length > 0 && pet.photos[0].full) ||
								'/No-image-available.png'
							}
							layout='fill'
							className='object-contain'
							alt={pet.name}
						/>
					</div>
					{/* Info Box */}
					<div className='border border-pastelPurple w-[21rem] sm:w-[30rem] md:w-[42rem] mx-auto bg-white p-4 grid justify-items-center gap-4 '>
						<h2 className='text-4xl '>{pet.name}</h2>
						<div className='flex gap-4'>
							<h3>
								{pet.breeds.primary ? pet.breeds.primary : 'Unknown Breed'}
								{pet.breeds.secondary
									? `, ${pet.breeds.secondary}`
									: ' (Mixed)'}
							</h3>
						</div>
						<div className='flex gap-4'>
							<h3>
								{pet.gender === 'Male' ? 'Neutered' : 'Spayed'}:{' '}
								{pet.contact.address.state ? 'Yes' : 'No'}
								{pet.attributes.spayed_neutered}
							</h3>
							<h3>{`${pet.contact.address.city}, ${pet.contact.address.state}`}</h3>
						</div>
						<div className='flex gap-4'>
							<h3>{pet.species}</h3>
							<h3>{pet.gender ? pet.gender : 'Unknown Gender'}</h3>
							<h3>{pet.age ? `${pet.age}` : 'Unknown Age'}</h3>
							<h3>{pet.size && `${pet.size} Sized`}</h3>
						</div>
						<div className='flex gap-4'>
							<h3>{pet.contact.phone}</h3>
							<div className='relative'>
								<CopyToClipboard text={clipboard.value} onCopy={onCopy}>
									<h3
										className={`text-gamboge && 
										} transition ease-in-out hover:cursor-pointer hover:text-lighterGamboge`}
										onClick={clipboardCopiedMessage}
									>
										{pet.contact.email}
									</h3>
								</CopyToClipboard>
								{clipboard.copied && <CopiedPopup />}
							</div>
						</div>
					</div>

					{/* Description Box */}
					<div className='border border-pastelPurple w-[21rem] sm:w-[30rem] md:w-[42rem] mx-auto bg-white p-4 grid justify-items-center gap-4 '>
						<h3 className='text-xl'>About</h3>
						<h3>
							{`Date Published: ${dayjs(pet.published_at).format(
								'MMM DD, YYYY'
							)}`}
						</h3>
						<h3 className='whitespace-pre-line bg-backgroundGrey border border-pastelPurple w-full p-4 '>
							{pet.description}{' '}
							<span>
								<a
									target='_blank'
									rel='noreferrer'
									href={pet.url}
									className='  w-fit inline-flex items-center justify-center text-gamboge hover:text-lighterGamboge transition ease-in-out'
								>
									More Info <ArrowSmRightIcon className='h-5 w-5' />
								</a>
							</span>
						</h3>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PetAdoptionSinglePage
