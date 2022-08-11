interface Props {
	leftPointer: number
	rightPointer: number
	handleBack: () => void
	handleNext: () => void
	amountOfValues: number
	isLostAndFound: boolean
}

const BackAndNextButtons = ({
	leftPointer,
	rightPointer,
	handleBack,
	handleNext,
	amountOfValues,
	isLostAndFound,
}: Props) => {
	return (
		<div className=' w-fit mx-auto flex gap-16'>
			{(isLostAndFound && leftPointer !== 0) ||
			(!isLostAndFound && leftPointer !== 1) ? (
				<button
					className='text-xl border border-pastelPurple py-2 px-3 transition-all ease-in-out rounded-md bg-pastelCream hover:bg-gray-200'
					onClick={handleBack}
				>
					Back
				</button>
			) : null}
			{rightPointer < amountOfValues && (
				<button
					onClick={handleNext}
					className='text-xl border border-pastelPurple py-2 px-3 transition-all ease-in-out rounded-md bg-pastelCream hover:bg-gray-200'
				>
					Next
				</button>
			)}
		</div>
	)
}

export default BackAndNextButtons
