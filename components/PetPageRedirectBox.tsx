import Link from 'next/link'

interface Props {
	title: String
	description: String
	redirect: String
	backgroundColor: string
}

const PetPageRedirectBox = ({
	title,
	description,
	redirect,
	backgroundColor,
}: Props) => {
	return (
		<Link href={`${redirect}`}>
			<a>
				<div className=''>
					<div
						className={`border border-black p-2 shadow-md rounded-md h-32 ${backgroundColor}`}
					>
						<div className='grid justify-items-center gap-2'>
							<h1 className='text-xl font-bold'>{title}</h1>
							<h1>{description}</h1>
						</div>
					</div>
				</div>
			</a>
		</Link>
	)
}

export default PetPageRedirectBox
