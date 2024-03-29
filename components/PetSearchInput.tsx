import React from 'react'
import useWindowSize from '../custom-hooks/useWindowSize'
import { userSearchCategory } from '../utils'
import Dropdown from './Dropdown'

interface Props {
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
	category: string
	setCategory: React.Dispatch<React.SetStateAction<string>>
	fetchPets: () => void
}

const PetSearchInput = ({
	search,
	setSearch,
	category,
	setCategory,
	fetchPets,
}: Props) => {
	const size = useWindowSize()
	return (
		<div className=' px-4 py-2 gap-4 flex justify-center max-w-md mx-auto my-8'>
			<input
				type='text'
				placeholder={
					size.width >= 640 ? 'Type in a search term' : 'Search Term'
				}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className='border-b border-black outline-none px-2 bg-inherit w-36 sm:w-52'
			/>
			<Dropdown
				data={userSearchCategory}
				setFunction={setCategory}
				value={category}
				isForm={false}
			/>
			<button
				onClick={fetchPets}
				className=' px-2 py-1 rounded-md hover:bg-pastelDarkerCream transition ease-in-out bg-pastelCream border border-pastelPurple'
			>
				Search
			</button>
		</div>
	)
}

export default PetSearchInput
