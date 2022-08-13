import React, { Dispatch, useContext, useEffect } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import UserContext from '../context/userContext'
import Link from 'next/link'

import useClickOutside from '../custom-hooks/useClickOutside'

interface Props {
	handleSidebarClose: () => void
	isSidebarOpen: boolean
}

const Sidebar = ({ handleSidebarClose, isSidebarOpen }: Props) => {
	const { user } = useContext(UserContext)

	const userNavLinks = [
		{ title: `${user.name}'s Page`, link: `/user/${user.id}` },
		{ title: 'Your Found Pets', link: `/user/found-pets` },
		{ title: 'Your Lost Pets', link: `/user/lost-pets` },
	]

	const otherNavLinks = [
		{ title: 'All Found Pets', link: `/pets/found-pets` },
		{ title: 'All Lost Pets', link: `/pets/lost-pets` },
		{ title: 'Pet Adoption', link: `/pets/pet-adoption` },
	]

	let sidebarNav = useClickOutside(() => {
		handleSidebarClose()
	})

	return (
		isSidebarOpen && (
			<div
				className='fixed w-[15rem] bg-pastelCream border-r border-pastelPurple h-screen grid z-[99]'
				ref={sidebarNav}
			>
				<div className=''>
					<div
						className='hover:bg-pastelDarkerCream transition-colors ease-in-out   cursor-pointer'
						onClick={handleSidebarClose}
					>
						<h3 className='  p-4 border-b border-black flex justify-end pr-8'>
							<ChevronLeftIcon className='h-5 w-5 ' />
						</h3>
					</div>
					{user.name && (
						<>
							{userNavLinks.map((link) => {
								return (
									<Link href={link.link} key={link.title}>
										<a onClick={handleSidebarClose}>
											<div className='hover:bg-pastelDarkerCream transition-colors ease-in-out cursor-pointer '>
												<h3 className='p-4 border-b border-black '>
													{link.title}
												</h3>
											</div>
										</a>
									</Link>
								)
							})}
						</>
					)}
					<>
						{otherNavLinks.map((link) => {
							return (
								<Link href={link.link} key={link.title}>
									<a onClick={handleSidebarClose}>
										<div className='hover:bg-pastelDarkerCream transition-colors ease-in-out cursor-pointer '>
											<h3 className='p-4 border-b border-black '>
												{link.title}
											</h3>
										</div>
									</a>
								</Link>
							)
						})}
					</>
				</div>
			</div>
		)
	)
}

export default Sidebar
