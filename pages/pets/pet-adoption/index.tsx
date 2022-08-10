import { PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Dropdown from '../../../components/Dropdown'
import PetAdoptionQueryCard from '../../../components/PetAdoptionQueryCard'
import {
	petFinderAgeList,
	petFinderGenderList,
	petFinderSizeList,
	petFinderSpeciesList,
} from '../../../utils'
import { PetFinderContext } from '../../_app'
import useClickOutside from '../../../custom-hooks/useClickOutside'
import { PetAdoptionData } from '../../../typings'

const PetAdoptionListing = () => {
	const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
	const [resultsLoading, setResultsLoading] = useState<boolean>(true)
	const [results, setResults] = useState(null)

	const [speciesParameter, setSpeciesParameter] = useState<string>(
		petFinderSpeciesList[0]
	)
	const [breedParameter, setBreedParameter] = useState<string>('')
	const [breedList, setBreedList] = useState<{ name: string }[]>([])
	const [genderParameter, setGenderParameter] = useState<string>(
		petFinderGenderList[0]
	)
	const [ageParameter, setAgeParameter] = useState<string>(petFinderAgeList[0])
	const [sizeParameter, setSizeParameter] = useState<string>(
		petFinderSizeList[0]
	)
	const [locationParameter, setLocationParameter] = useState<string>('')
	const [nameParameter, setNameParameter] = useState<string>('')
	const [pageParameter, setPageParameter] = useState<number>(1)
	const [backOrNext, setBackOrNext] = useState<boolean>(false)
	const [limitParameter, setLimitParameter] = useState<number>(100)
	const { accessToken } = useContext(PetFinderContext)

	const fetchPets = async () => {
		setResultsLoading(true)

		const petResults = await axios.get(
			`https://api.petfinder.com/v2/animals?type=${
				speciesParameter === 'All' ? '' : speciesParameter
			}&breed=${breedParameter === 'All' ? '' : breedParameter}&gender=${
				genderParameter === 'All' ? '' : genderParameter
			}&age=${ageParameter === 'All' ? '' : ageParameter}&size=${
				sizeParameter === 'All' ? '' : sizeParameter
			}${locationParameter && `&location=${locationParameter}`}${
				nameParameter && `&name=${nameParameter}`
			}&page=${backOrNext ? pageParameter : 1}&limit=${limitParameter}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken.access_token}`,
				},
			}
		)
		const { animals } = petResults.data
		setResults(animals)
		setResultsLoading(false)
	}

	const fetchBreeds = async () => {
		const petResults = await axios.get(
			`https://api.petfinder.com/v2/types/${speciesParameter}/breeds`,
			{
				headers: {
					Authorization: `Bearer ${accessToken.access_token}`,
				},
			}
		)
		const breeds = petResults.data.breeds
		setBreedList([{ name: 'All' }, ...breeds])
	}

	// Fetch Pets on back or next button being clicked or filters selected
	useEffect(() => {
		if (accessToken === null) return
		fetchPets()
		fetchBreeds()
		if (!backOrNext) {
			setPageParameter(1)
		}
		setBackOrNext(false)
	}, [
		accessToken,
		speciesParameter,
		breedParameter,
		genderParameter,
		ageParameter,
		sizeParameter,
		locationParameter,
		nameParameter,
		pageParameter,
	])

	const handleBackOrNext = (str: string) => {
		if (str === 'back') {
			setPageParameter(pageParameter - 1)
		} else if (str === 'next') {
			setPageParameter(pageParameter + 1)
		}
		setBackOrNext(true)
	}

	const handleToggleFiltersMenu = () => {
		setIsFiltersOpen(!isFiltersOpen)
	}

	// Close Filters Menu on click outside
	let domNode = useClickOutside(() => {
		setIsFiltersOpen(false)
	})

	return (
		<>
			<div className='flex justify-center my-4 gap-4'>
				<h2 className='text-5xl text-center'>Pets Available for Adoption</h2>
			</div>

			{/* Filter Section */}
			<div className='relative w-fit mx-auto z-30 ' ref={domNode}>
				{/* Add Filters */}

				<button
					className=' flex border border-pastelPurple py-1 px-2 rounded-md transition-all ease-in-out bg-pastelCream hover:bg-pastelDarkerCream justify-center items-center text-xl gap-1 '
					onClick={handleToggleFiltersMenu}
				>
					<PlusIcon className=' h-6' />
					Add Filter
				</button>
				<button onClick={() => handleBackOrNext('back')}>back</button>
				<button onClick={() => handleBackOrNext('next')}>next</button>

				{isFiltersOpen && (
					<div className='w-60 left-[-3.5rem] mx-auto absolute  top-[100%]  p-4 shadow-md rounded-md grid gap-2 bg-pastelCream'>
						{/* Species */}
						<div className='grid gap-1'>
							<h3 className=''>Species:</h3>
							<Dropdown
								isForm={false}
								value={speciesParameter}
								setFunction={setSpeciesParameter}
								data={petFinderSpeciesList}
							/>
						</div>
						{/* Breed */}
						{speciesParameter !== 'All' && (
							<div className='gap-1'>
								<h3 className=''>Breed:</h3>
								<Dropdown
									isForm={false}
									value={breedParameter}
									setFunction={setBreedParameter}
									isBreedList={true}
									breedData={breedList}
								/>
							</div>
						)}

						{/* Gender */}
						<div className='gap-1'>
							<h3 className=''>Gender:</h3>
							<Dropdown
								isForm={false}
								value={genderParameter}
								setFunction={setGenderParameter}
								data={petFinderGenderList}
							/>
						</div>
						{/* Age */}
						<div className='gap-1'>
							<h3 className=''>Age:</h3>
							<Dropdown
								isForm={false}
								value={ageParameter}
								setFunction={setAgeParameter}
								data={petFinderAgeList}
							/>
						</div>
						{/* Size */}
						<div className=' grid gap-1'>
							<h3 className=''>Size:</h3>
							<Dropdown
								isForm={false}
								value={sizeParameter}
								setFunction={setSizeParameter}
								data={petFinderSizeList}
							/>
						</div>
						{/* Location */}
						<div className='grid gap-1'>
							<h3 className=''>Location:</h3>
							<input
								type='text'
								value={locationParameter}
								onChange={(e) => setLocationParameter(e.target.value)}
								className='border border-black rounded-md px-2 py-2 cursor-text  w-full focus:border-gamboge outline-none'
								placeholder='City, State, or Postal Code'
							/>
						</div>
						{/* Name */}
						<div className='grid gap-1'>
							<h3 className=''>Name:</h3>
							<input
								type='text'
								value={nameParameter}
								onChange={(e) => setNameParameter(e.target.value)}
								className='border border-black rounded-md px-2 py-2 cursor-text  w-full focus:border-gamboge outline-none'
								placeholder='e.g. Susie'
							/>
						</div>
					</div>
				)}
			</div>

			<div className='flex p-4 gap-6 mx-auto justify-center  lg:gap-24 flex-wrap'>
				{resultsLoading ? (
					<h2 className='text-center'>Loading...</h2>
				) : results && results.length > 1 ? (
					results.map((pet: PetAdoptionData) => {
						return (
							<PetAdoptionQueryCard
								key={String(pet.id)}
								pet={pet}
								navigateTo={`/pets/pet-adoption/${pet.id}`}
							/>
						)
					})
				) : (
					// If no pets that fit search term and category
					<h2 className='text-center'>
						There are no pets that fit these filters. Please broaden your
						search.
					</h2>
				)}
			</div>
		</>
	)
}

export default PetAdoptionListing
