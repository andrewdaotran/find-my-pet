import React from 'react'

interface Props {
	isNewPet: boolean
}

const FormSubmissionModal = ({ isNewPet }: Props) => {
	return (
		<div>
			<h3>
				{isNewPet
					? 'Your pet post has been created! Please give it up to 2 minutes to reflect on the app.'
					: 'Your pet post has been edited. Please give it up to 2 minutes to reflect on the app.'}
			</h3>
		</div>
	)
}

export default FormSubmissionModal
