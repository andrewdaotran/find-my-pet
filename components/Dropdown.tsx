import React, { Dispatch, SetStateAction } from 'react'

interface Props {
	data: string[]
	setFunction: Dispatch<SetStateAction<string>>
	value: string
}

const Dropdown = ({ data, setFunction, value }: Props) => {
	return (
		<select onChange={(e) => setFunction(e.target.value)} value={value}>
			{data.map((category) => {
				return <option value={category}>{category}</option>
			})}
		</select>
	)
}

export default Dropdown
