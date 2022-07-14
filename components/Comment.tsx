import dayjs from 'dayjs'
import React from 'react'

interface Props {
	value: String
	// pet: String
	// user: String
	timestamp: Date
}

const Comment = ({ value, timestamp }: Props) => {
	return (
		<div>
			<h3>{value}</h3>
			<h3>{dayjs(timestamp).format('MM-DD-YYYY')}</h3>
		</div>
	)
}

export default Comment
