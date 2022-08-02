import React from 'react'
import { CommentData } from '../typings'
import Comment from './Comment'

interface Props {
	comments: CommentData[]
}

const CommentSection = ({ comments }: Props) => {
	return (
		<div>
			{comments.map((comment) => {
				return (
					<Comment
						value={comment.value}
						timestamp={comment.timestamp}
						key={comment.id}
					/>
				)
			})}
		</div>
	)
}

export default CommentSection
