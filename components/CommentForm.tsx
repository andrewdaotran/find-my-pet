import { useMutation } from '@apollo/client'
import { FieldValues, useForm } from 'react-hook-form'
import React, { useContext, useState } from 'react'

import InputEmptyError from './InputEmptyError'
import { CREATE_COMMENT } from '../apollo/commentQueries'
import UserContext from '../context/userContext'

interface Props {
	petId: string
}

const CommentInput = ({ petId }: Props) => {
	const { user } = useContext(UserContext)
	const [isCommentSubmitted, setIsCommentSubmitted] = useState<boolean>(false)
	const [commentValue, setCommentValue] = useState<string>('')
	const [createComment, { loading: commentLoading }] = useMutation(
		CREATE_COMMENT,
		{
			onCompleted: () => handleCommentSubmissionMessage(),
		}
	)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>()

	const handleCommentSubmissionMessage = () => {
		setIsCommentSubmitted(true)
		setTimeout(() => {
			setIsCommentSubmitted(false)
		}, 3000)
	}

	const handleCreateComment = () => {
		createComment({
			variables: {
				input: {
					value: commentValue,
					pet: petId,
					userId: user.id,
					sub: user.sub,
					userName: user.name,
				},
			},
		})
		setCommentValue('')
	}
	return (
		<div>
			{isCommentSubmitted && !commentLoading && (
				<div className='mx-auto w-fit'>
					<h3 className='mb-2 border border-gamboge rounded-md p-2 text-sm text-red-700 w-[18rem] sm:w-[26rem] md:w-[36rem]  '>
						Your comment has been submitted! Please give it up to 2 minutes to
						reflect on the app
					</h3>
				</div>
			)}
			<form
				onSubmit={handleSubmit(handleCreateComment)}
				className='grid w-fit mx-auto  justify-items-center'
			>
				<textarea
					{...register('comment', { required: true })}
					disabled={commentLoading && true}
					placeholder='Write your comment here...'
					value={commentValue}
					onChange={(e) => setCommentValue(e.target.value)}
					className='border border-pastelPurple rounded-md w-[18rem] sm:w-[26rem] md:w-[36rem] pl-2 pt-2 h-[8rem]  resize-none outline-gamboge'
				/>

				{errors.comment && (
					<InputEmptyError
						message={'Please write your comment before submitting'}
					/>
				)}

				{/* Loading Message */}
				{commentLoading && (
					<div className='mt-4 text-center  col-span-2 '>
						<h2>Processing request...</h2>
					</div>
				)}

				{commentLoading || (
					<button
						type='submit'
						className='mt-2 bg-pastelLightGreen hover:bg-pastelDarkerLightGreen border border-pastelPurple  px-2 py-1  rounded-md transition-all ease-in-out'
					>
						Submit
					</button>
				)}
			</form>
		</div>
	)
}

export default CommentInput
