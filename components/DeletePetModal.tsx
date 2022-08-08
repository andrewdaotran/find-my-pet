import { useRouter } from 'next/router'
import React, { Dispatch, useState } from 'react'

interface Props {
	isMarkedReturned: boolean
	petName?: string
	setRemovePetPopup: Dispatch<React.SetStateAction<RemovePetPopup>>
	setIsMarkedButtonPressed: Dispatch<React.SetStateAction<boolean>>
	removePetPopup: RemovePetPopup
	deletePet: () => {}
	userId: string
}

interface RemovePetPopup {
	value: boolean
	type: string
}

const DeletePetModal = ({
	isMarkedReturned,
	petName,
	setRemovePetPopup,
	deletePet,
	setIsMarkedButtonPressed,
	removePetPopup,
	userId,
}: Props) => {
	console.log(userId)
	const [agree, setAgree] = useState<boolean>(false)
	const router = useRouter()

	const handleConfirm = () => {
		setAgree(true)
		// deletePet()
	}

	const handleCancel = () => {
		setRemovePetPopup({ ...removePetPopup, value: false })
		setIsMarkedButtonPressed(false)
	}

	const handleCloseModal = () => {
		setRemovePetPopup({ ...removePetPopup, value: false })
		router.push(`/user/${userId}`)
	}

	return (
		<div className='  bg-slate-400/50 z-20 fixed h-screen w-screen mt-[-57px] '>
			<div className='relative h-screen w-screen '>
				<div className='border border-black bg-white z-30 w-fit opacity-100 absolute left-0 right-0 mx-auto top-1/3 p-10 max-w-2xl grid justify-items-center gap-4'>
					{!agree ? (
						<>
							<h3 className='text-center'>
								{isMarkedReturned
									? `We want to confirm if ${
											petName ? petName : 'the pet'
									  } has been returned. Confirming will remove the post, are you sure you would like to proceed?`
									: `This will remove ${
											petName ? `${petName}'s post` : 'the pet post'
									  }, are you sure you would like to
								proceed?`}
							</h3>
							<div className=' flex w-fit gap-8 mx-auto  '>
								<button
									className='border border-pastelPurple py-1 px-2 rounded-md bg-pastelLightGreen hover:bg-pastelDarkerLightGreen transition-all ease-in-out'
									onClick={handleConfirm}
								>
									Confirm
								</button>
								<button
									className='border border-pastelPurple py-1 px-2 rounded-md hover:bg-red-300 transition ease-in-out'
									onClick={handleCancel}
								>
									Cancel
								</button>
							</div>
						</>
					) : (
						<>
							<h3 className='text-center'>
								{isMarkedReturned
									? `So glad to hear ${
											petName || 'the pet'
									  } has been returned! `
									: ''}
								The post will now be removed, allow up to 2 minutes for it to
								reflect on the app.
							</h3>
							<button
								onClick={handleCloseModal}
								className='border border-pastelPurple py-1 px-2 rounded-md w-fit bg-pastelLightGreen hover:bg-pastelDarkerLightGreen transition-all ease-in-out'
							>
								Close
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default DeletePetModal
