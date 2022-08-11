import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

interface Props {
	leftPointer: number
	rightPointer: number
	handleBack: () => void
	handleNext: () => void
	amountOfValues: number
	isLostAndFound: boolean
	currentPage?: number
	resultsLoading?: boolean
}

const BackAndNextButtons = ({
	leftPointer,
	rightPointer,
	handleBack,
	handleNext,
	amountOfValues,
	isLostAndFound,
	currentPage,
	resultsLoading,
}: Props) => {
	return (
		<div
			className={` w-fit mx-auto grid ${
				currentPage ? 'grid-cols-3' : 'grid-cols-2'
			}  gap-8 `}
		>
			<button
				className={`text-xl border border-pastelPurple py-1 px-1 transition-all ease-in-out rounded-md bg-pastelCream hover:bg-pastelDarkerCream disabled:hidden col-start-1 col-end-2 flex justify-center items-center pr-4 focus:border-gamboge outline-none`}
				onClick={handleBack}
				disabled={
					(isLostAndFound && leftPointer !== 0) ||
					(!isLostAndFound && leftPointer !== 1) ||
					resultsLoading
						? false
						: true
				}
			>
				<ChevronLeftIcon className='w-7 h-7' />
				Back
			</button>

			{currentPage && (
				<div className='border border-pastelPurple flex justify-center items-center bg-pastelCream rounded-md px-3 col-start-2 col-end-3 text-xl'>
					<h3>{String(currentPage)}</h3>
				</div>
			)}

			<button
				onClick={handleNext}
				className={`text-xl border border-pastelPurple py-1 px-1 transition-all ease-in-out rounded-md bg-pastelCream hover:bg-pastelDarkerCream disabled:hidden ${
					currentPage ? 'col-start-3 col-end-4' : 'col-start-2 col-end-3'
				}  flex justify-center items-center pl-4 focus:border-gamboge outline-none`}
				disabled={
					rightPointer < amountOfValues || resultsLoading ? false : true
				}
			>
				Next
				<ChevronRightIcon className='w-7 h-7' />
			</button>
		</div>
	)
}

export default BackAndNextButtons
