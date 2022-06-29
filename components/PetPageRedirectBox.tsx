interface Props {
	title: String
	description: String
	redirect: String
}

const PetPageRedirectBox = ({ title, description, redirect }: Props) => {
	const url = `http://localhost:3000/${redirect}`
	return (
		<div className='max-w-xs'>
			<div className='border border-black p-2 shadow-md rounded-md h-32'>
				<div className='grid justify-items-center gap-2'>
					<h1 className='text-xl font-bold'>{title}</h1>
					<h1>{description}</h1>
				</div>
			</div>
		</div>
	)
}

export default PetPageRedirectBox
