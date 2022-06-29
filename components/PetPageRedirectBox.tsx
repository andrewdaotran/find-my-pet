import Link from 'next/link'
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
				<Link href={redirect}>
					<a className='grid justify-items-center gap-2'>
						<h1 className=''>{title}</h1>
						<h1>{description}</h1>
					</a>
				</Link>
			</div>
		</div>
	)
}

export default PetPageRedirectBox
