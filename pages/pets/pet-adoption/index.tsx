import { convertNodeHttpToRequest } from 'apollo-server-core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Dropdown from '../../../components/Dropdown'
import PetAdoptionQueryCard from '../../../components/PetAdoptionQueryCard'
import {
	petFinderAgeList,
	petFinderGenderList,
	petFinderSizeList,
	petFinderSpeciesList,
} from '../../../utils'
import { PetFinderContext } from '../../_app'

const PetAdoptionListing = () => {
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
	const { accessToken } = useContext(PetFinderContext)

	useEffect(() => {
		if (accessToken === null) return
		const fetchPets = async () => {
			const petResults = await axios.get(
				`https://api.petfinder.com/v2/animals?type=${
					speciesParameter === 'All' ? '' : speciesParameter
				}&breed=${breedParameter === 'All' ? '' : breedParameter}&gender=${
					genderParameter === 'All' ? '' : genderParameter
				}&age=${ageParameter === 'All' ? '' : ageParameter}&size=${
					sizeParameter === 'All' ? '' : sizeParameter
				}`,
				// `https://api.petfinder.com/v2/animals?type=${speciesParameter}&breed=${breedParameter}&location=${locationParameter}&size=${sizeParameter}&age=${ageParameter}&gender=${genderParameter}&name=${nameParameter}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken.access_token}`,
					},
				}
			)
			const { animals } = petResults.data
			setResults(animals)
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
			console.log(breeds)
		}
		fetchPets()
		fetchBreeds()
	}, [
		accessToken,
		speciesParameter,
		breedParameter,
		genderParameter,
		ageParameter,
		sizeParameter,
		locationParameter,
		nameParameter,
	])

	if (results === null) return null

	return (
		<>
			<div className='flex justify-center my-4'>
				<h2 className='text-5xl'>Pets Available for Adoption</h2>
			</div>
			<div>
				<Dropdown
					isForm={false}
					value={speciesParameter}
					setFunction={setSpeciesParameter}
					data={petFinderSpeciesList}
				/>
				<Dropdown
					isForm={false}
					value={breedParameter}
					setFunction={setBreedParameter}
					isBreedList={true}
					breedData={breedList}
				/>
				<Dropdown
					isForm={false}
					value={genderParameter}
					setFunction={setGenderParameter}
					data={petFinderGenderList}
				/>
				<Dropdown
					isForm={false}
					value={ageParameter}
					setFunction={setAgeParameter}
					data={petFinderAgeList}
				/>
				<Dropdown
					isForm={false}
					value={sizeParameter}
					setFunction={setSizeParameter}
					data={petFinderSizeList}
				/>
			</div>

			{/* search by */}
			{/* species, type */}
			{/* breed */}
			{/* gender */}
			{/* age */}
			{/* size */}
			{/* location  x*/}
			{/* name x */}

			<div className='flex p-4 gap-6 mx-auto justify-center  lg:gap-24 flex-wrap'>
				{results ? (
					results.map((pet) => {
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
						There are no found pets currently with that search term and category
					</h2>
				)}
			</div>
		</>
	)
}

export default PetAdoptionListing
