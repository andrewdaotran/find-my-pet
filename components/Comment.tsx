import React, { useContext } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import UserContext from '../context/userContext'

interface Props {
	value: String
	timestamp: Date
	userName: String
	userId: String
}

const Comment = ({ value, timestamp, userName, userId }: Props) => {
	const { user } = useContext(UserContext)
	TimeAgo.setDefaultLocale(en.locale)
	TimeAgo.addLocale(en)
	const timeAgo = new TimeAgo('en-US')
	const dateAgo = timeAgo.format(new Date(timestamp), 'round-minute')
	return (
		<div className='bg-backgroundGrey p-4 border border-pastelPurple grid gap-2'>
			<h3 className=' font-bold'>{userName}</h3>
			<h3 className='text-gray-500 '>{value}</h3>
			<div className='flex gap-4'>
				<h3 className=''>{dateAgo}</h3>
				{user.id === userId && (
					<button className='border border-black rounded-md px-1 bg-red-300 transition-all ease-in hover:bg-red-400'>
						Delete
					</button>
				)}
			</div>
		</div>
	)
}

export default Comment
