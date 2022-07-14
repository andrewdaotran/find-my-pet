import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { CREATE_COMMENT } from '../apollo/commentQueries'
import FormSubmissionContext from '../context/formSubmissionContext'

import UserContext from '../context/userContext'

interface InputError {
	isEmpty: boolean
	throwErrorMessage: boolean
}

interface Props {
	petId: string
}

const CommentInput = ({ petId }: Props) => {
	const { user } = useContext(UserContext)

	const { submitModalPopup } = useContext(FormSubmissionContext)
	const [commentValue, setCommentValue] = useState<string>('')
	const [commentError, setCommentError] = useState<InputError>({
		isEmpty: true,
		throwErrorMessage: false,
	})
	const [createComment, { data: commentData }] = useMutation(CREATE_COMMENT)

	useEffect(() => {
		if (commentValue !== '') {
			setCommentError({ ...commentError, isEmpty: false })
		} else {
			setCommentError({ ...commentError, isEmpty: true })
		}
	}, [commentValue])

	const handleCreateComment = (e) => {
		e.preventDefault()
		if (commentError.isEmpty) {
			setCommentError({ ...commentError, throwErrorMessage: true })
		} else {
			setCommentError({ ...commentError, throwErrorMessage: false })
		}
		if (commentError.isEmpty) {
			return
		}
		createComment({
			variables: {
				input: {
					value: commentValue,
					pet: petId,
					user: user.id,
				},
			},
		})
		setCommentValue('')
		setCommentError({ isEmpty: true, throwErrorMessage: false })
		submitModalPopup()
		console.log('comment submitted')
	}
	return (
		<form onSubmit={handleCreateComment}>
			<input
				type='text'
				value={commentValue}
				onChange={(e) => setCommentValue(e.target.value)}
			/>
			<button type='submit'>Submit Comment</button>
		</form>
	)
}

export default CommentInput
