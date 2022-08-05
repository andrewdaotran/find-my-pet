import React, { useState } from 'react'

import { CommentData } from '../typings'
import Comment from './Comment'

interface Props {
	comments: CommentData[]
}

const CommentSection = ({ comments }: Props) => {
	const [leftPointer, setLeftPointer] = useState<number>(0)
	const [rightPointer, setRightPointer] = useState<number>(4)
	const newCommentsArr = [...comments]
	const reversedCommentsArr = newCommentsArr.reverse()
	const paginatedCommentsArr = reversedCommentsArr.slice(
		leftPointer,
		rightPointer + 1
	)
	const [amountOfComments, setAmountOfComments] = useState<number>(
		newCommentsArr.length - 1
	)

	const handleBack = () => {
		setLeftPointer(leftPointer - 5)
		setRightPointer(rightPointer - 5)
	}
	const handleNext = () => {
		setLeftPointer(leftPointer + 5)
		setRightPointer(rightPointer + 5)
	}

	return (
		<div className='grid gap-4'>
			{paginatedCommentsArr.map((comment) => {
				return (
					<Comment
						value={comment.value}
						timestamp={comment.timestamp}
						key={comment.id}
						userName={comment.userName}
						userId={comment.userId}
						commentId={comment.id}
					/>
				)
			})}
			<div className=' w-fit mx-auto flex gap-16'>
				{leftPointer !== 0 && (
					<button
						className='border border-pastelPurple py-1 px-2 transition-all ease-in-out rounded-md bg-pastelSand hover:bg-gray-200'
						onClick={handleBack}
					>
						Back
					</button>
				)}
				{rightPointer < amountOfComments && (
					<button
						onClick={handleNext}
						className='border border-pastelPurple py-1 px-2 transition-all ease-in-out rounded-md bg-pastelSand hover:bg-gray-200'
					>
						Next
					</button>
				)}
			</div>
		</div>
	)
}

export default CommentSection
