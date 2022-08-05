import React from 'react'

import { CommentData } from '../typings'
import Comment from './Comment'

interface Props {
	comments: CommentData[]
}

const CommentSection = ({ comments }: Props) => {
	const newCommentsArr = [...comments]

	return (
		<div className='grid gap-4'>
			{newCommentsArr.reverse().map((comment) => {
				return (
					<Comment
						value={comment.value}
						timestamp={comment.timestamp}
						key={comment.id}
						userName={comment.userName}
						userId={comment.userId}
					/>
				)
			})}
		</div>
	)
}

export default CommentSection
