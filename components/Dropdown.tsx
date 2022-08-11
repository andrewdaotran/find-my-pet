import React, { Dispatch, SetStateAction } from 'react'

interface Props {
	data?: string[]
	setFunction: (
		data: string,
		title: string
	) => void | Dispatch<SetStateAction<string>>
	value: string
	title?: string
	isForm: boolean
	isBreedList?: boolean
	breedData?: { name: string }[]
	backgroundColor?: string
	isChangingSpecies?: boolean
	setIsChangeSpecies?: Dispatch<React.SetStateAction<boolean>>
}

const Dropdown = ({
	data,
	setFunction,
	isForm,
	value,
	title,
	isBreedList,
	breedData,
	backgroundColor,
	isChangingSpecies,
	setIsChangeSpecies,
}: Props) => {
	return (
		<select
			onChange={
				isForm
					? (e) => setFunction(e.target.value, title)
					: isChangingSpecies
					? (e) => {
							setIsChangeSpecies(true)
							setFunction(e.target.value, null)
					  }
					: (e) => setFunction(e.target.value, null)
			}
			value={value}
			className={`${
				backgroundColor && backgroundColor
			} border border-black rounded-md px-2 py-2 cursor-pointer  w-full focus:border-gamboge outline-none`}
		>
			{isBreedList
				? breedData.map((category) => {
						return (
							<option key={category.name} value={category.name}>
								{category.name}
							</option>
						)
				  })
				: data.map((category) => {
						return (
							<option key={category} value={category}>
								{category}
							</option>
						)
				  })}
		</select>
	)
}

export default Dropdown
