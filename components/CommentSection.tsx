import React, { useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'

import { CommentData } from '../typings'
import BackAndNextButtonsLostAndFound from './BackAndNextButtons'
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
		scroll.scrollToBottom()
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
			<BackAndNextButtonsLostAndFound
				leftPointer={leftPointer}
				rightPointer={rightPointer}
				handleBack={handleBack}
				handleNext={handleNext}
				amountOfValues={amountOfComments}
				isLostAndFound={true}
			/>
		</div>
	)
}

export default CommentSection
