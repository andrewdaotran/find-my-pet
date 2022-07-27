import React, { Dispatch, SetStateAction } from 'react'

interface Props {
	data: string[]
	setFunction: (
		data: string,
		title: string
	) => void | Dispatch<SetStateAction<string>>
	value: string
	title?: string
	isForm: boolean
}

const Dropdown = ({ data, setFunction, isForm, value, title }: Props) => {
	return (
		<select
			onChange={
				isForm
					? (e) => setFunction(e.target.value, title)
					: (e) => setFunction(e.target.value, null)
			}
			value={value}
			className='border border-black rounded-md px-2 py-2 cursor-pointer  w-full '
		>
			{data.map((category) => {
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
