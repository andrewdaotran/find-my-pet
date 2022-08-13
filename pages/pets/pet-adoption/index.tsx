import { PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { animateScroll as scroll } from 'react-scroll'
import React, { useContext, useEffect, useState } from 'react'

import Dropdown from '../../../components/Dropdown'
import PetAdoptionQueryCard from '../../../components/PetAdoptionQueryCard'
import {
	petFinderAgeList,
	petFinderGenderList,
	petFinderSizeList,
	petFinderSpeciesList,
	postsPerPage,
} from '../../../utils'
import { PetFinderContext } from '../../_app'
import useClickOutside from '../../../custom-hooks/useClickOutside'
import { PetAdoptionData } from '../../../typings'
import BackAndNextButtons from '../../../components/BackAndNextButtons'

const PetAdoptionListing = () => {
	const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false)
	const [resultsLoading, setResultsLoading] = useState<boolean>(true)
	const [results, setResults] = useState(null)
	const [speciesParameter, setSpeciesParameter] = useState<string>(
		petFinderSpeciesList[0]
	)
	const [isChangeSpecies, setIsChangeSpecies] = useState<boolean>(false)
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
	const [limitParameter, setLimitParameter] = useState<string>('20')
	const [rightPointer, setRightPointer] = useState<number>(20)
	const [totalPosts, setTotalPosts] = useState<number>(0)
	const [backOrNext, setBackOrNext] = useState<boolean>(false)
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
			}&page=${pageParameter}&limit=${limitParameter}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken.access_token}`,
				},
			}
		)
		const { animals, pagination } = petResults.data
		setResults(animals)
		setTotalPosts(pagination.total_count)
		if (!backOrNext) {
			setPageParameter(1)
			setRightPointer(pagination.count_per_page)
		}
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

	useEffect(() => {
		if (accessToken === null) return
		if (isChangeSpecies) {
			setBreedParameter('All')
		}
		fetchPets()
		fetchBreeds()
		setIsChangeSpecies(false)
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
		limitParameter,
	])

	const handleBackOrNext = (str: string) => {
		if (str === 'back' && pageParameter !== 1) {
			setPageParameter(pageParameter - 1)
			setRightPointer(rightPointer - Number(limitParameter))
		} else if (str === 'next') {
			setPageParameter(pageParameter + 1)
			setRightPointer(rightPointer + Number(limitParameter))
		}
		scroll.scrollToTop()
		setBackOrNext(true)
	}

	const handleToggleFiltersMenu = () => {
		setIsFiltersOpen(!isFiltersOpen)
	}

	// Close Filters Menu on click outside
	let filtersButton = useClickOutside(() => {
		setIsFiltersOpen(false)
	})

	return (
		<>
			<div className='flex justify-center my-4 gap-4 mt-10'>
				<h2 className='sm:text-7xl text-5xl text-center'>
					Pets Available for Adoption
				</h2>
			</div>

			<div className='flex mx-auto w-fit gap-4 mt-10 '>
				{/* Filter Section */}
				<div className='relative w-fit z-30 ' ref={filtersButton}>
					{/* Add Filters */}
					<button
						className=' flex border border-pastelPurple py-1 px-2 rounded-md transition-all ease-in-out bg-pastelCream hover:bg-pastelDarkerCream justify-center items-center text-xl gap-1 focus:border-gamboge outline-none'
						onClick={handleToggleFiltersMenu}
					>
						<PlusIcon className=' h-6' />
						Add Filter
					</button>

					{isFiltersOpen && (
						<div className='w-60  mx-auto absolute  top-[100%]  p-4 shadow-md rounded-md grid gap-2 bg-pastelCream'>
							{/* Species */}
							<div className='grid gap-1'>
								<h3 className=''>Species:</h3>
								<Dropdown
									isForm={false}
									value={speciesParameter}
									setFunction={setSpeciesParameter}
									data={petFinderSpeciesList}
									isChangingSpecies={true}
									setIsChangeSpecies={setIsChangeSpecies}
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

				{/* Posts Per Page */}
				<div className=' flex gap-2 justify-center items-center'>
					<Dropdown
						data={postsPerPage}
						value={limitParameter}
						isForm={false}
						setFunction={setLimitParameter}
						backgroundColor={'bg-pastelCream'}
					/>
					<h3 className='text-xl'>posts</h3>
				</div>
			</div>

			{results && (
				<div className='mt-8'>
					<BackAndNextButtons
						leftPointer={pageParameter}
						rightPointer={rightPointer}
						handleBack={() => handleBackOrNext('back')}
						handleNext={() => handleBackOrNext('next')}
						amountOfValues={totalPosts}
						isLostAndFound={false}
						currentPage={pageParameter}
						resultsLoading={resultsLoading}
					/>
				</div>
			)}

			<div className='flex p-4 gap-6 mx-auto justify-center items-center lg:gap-24 flex-wrap mt-4 '>
				{resultsLoading ? (
					<h2 className='text-center text-3xl '>Loading...</h2>
				) : results && results.length > 1 ? (
					<div className='grid gap-8'>
						{/* Animal Results Displayed */}
						<div className='flex p-4 gap-6 mx-auto justify-center lg:gap-24 flex-wrap'>
							{results.map((pet: PetAdoptionData) => {
								return (
									<PetAdoptionQueryCard
										key={String(pet.id)}
										pet={pet}
										navigateTo={`/pets/pet-adoption/${pet.id}`}
									/>
								)
							})}
						</div>
						<div className='mb-8'>
							<BackAndNextButtons
								leftPointer={pageParameter}
								rightPointer={rightPointer}
								handleBack={() => handleBackOrNext('back')}
								handleNext={() => handleBackOrNext('next')}
								amountOfValues={totalPosts}
								isLostAndFound={false}
								currentPage={pageParameter}
								resultsLoading={resultsLoading}
							/>
						</div>
					</div>
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
