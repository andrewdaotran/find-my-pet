import { useContext } from 'react'

import PetPageRedirectBox from '../components/PetPageRedirectBox'
import { boxData, userBoxData } from '../utils'
import UserContext from '../context/userContext'

import { useUser } from '@auth0/nextjs-auth0'

export default function Home() {
	const { user } = useUser()
	const { user: userData } = useContext(UserContext)

	return (
		<div className=' mx-6  grid justify-items-center mt-12 md:mt-32 '>
			<h1 className='justify-center text-3xl mb-12'>
				Welcome to the <span className='text-red-500'>Find My Pet</span> App
			</h1>
			<div className='grid p-4 sm:grid-cols-2 gap-6 md:grid-cols-3'>
				<PetPageRedirectBox
					{...boxData.foundPets}
					backgroundColor='bg-pastelRed'
				/>
				<PetPageRedirectBox
					{...boxData.lostPets}
					backgroundColor='bg-pastelCream'
				/>
				<PetPageRedirectBox
					{...boxData.petAdoption}
					backgroundColor='bg-pastelSand'
				/>
			</div>

			{/* render out user boxes if user is logged in */}
			{user ? (
				<div className='grid p-4 sm:grid-cols-3 gap-6'>
					<PetPageRedirectBox
						{...userBoxData.foundPets}
						backgroundColor='bg-pastelLightGreen'
					/>
					<PetPageRedirectBox
						{...userBoxData.lostPets}
						backgroundColor='bg-pastelGreen'
					/>
					<PetPageRedirectBox
						{...userBoxData.homePage}
						redirect={`/user/${userData.id}`}
						backgroundColor='bg-pastelPurple'
					/>
				</div>
			) : null}
		</div>
	)
}
