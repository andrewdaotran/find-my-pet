interface Props {
	message: string
}

const InputEmptyError = ({ message }: Props) => {
	return (
		<div className=''>
			<h4 className='text-red-500'>{message}</h4>
		</div>
	)
}

export default InputEmptyError
