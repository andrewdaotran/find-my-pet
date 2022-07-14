import React from 'react'

interface Props {
	isNewPet?: boolean
	isComment?: boolean
}

const FormSubmissionModal = ({ isNewPet, isComment }: Props) => {
	return (
		<div>
			<h3>
				{isComment &&
					'Your Comment has been submitted! Please give it up to 2 mintuese to reflect on the app'}
				{isNewPet &&
					!isComment &&
					'Your pet post has been created! Please give it up to 2 minutes to reflect on the app.'}
				{!isNewPet &&
					!isComment &&
					'Your pet post has been edited. Please give it up to 2 minutes to reflect on the app.'}
			</h3>
		</div>
	)
}

export default FormSubmissionModal
