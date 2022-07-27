import React, { Dispatch, SetStateAction } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'
import { InputForm } from '../typings'

interface Props {
	data: string[]
	setFunction: (
		data: string,
		title: string
	) => void | Dispatch<SetStateAction<string>>
	value: string
	title?: string
	isForm: boolean
	// register?: UseFormRegister<FieldValues>
	// inputTitle?: string
	// isRequired?: boolean
}

const Dropdown = ({
	data,
	setFunction,
	isForm,
	value,
	title,
}: // inputTitle,
// register,
// isRequired,
Props) => {
	return (
		<select
			// {...register(inputTitle, { required: isRequired })}
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
