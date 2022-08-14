import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { useQuery } from '@apollo/client'
import { MenuIcon } from '@heroicons/react/solid'

import { USER_QUERY } from '../apollo/userQueries'
import UserContext from '../context/userContext'
import useWindowSize from '../custom-hooks/useWindowSize'
import Sidebar from './Sidebar'

const Navbar = ({ children }) => {
	const { user: auth0User } = useUser()
	const { user, storeUser, clearUser, setUserId } = useContext(UserContext)
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

	const windowSize = useWindowSize()

	const navbarLinks = [
		// { title: user.name, link: `/user/${user.id}` },
		{ title: 'Lost Pets', link: `/pets/lost-pets` },
		{ title: 'Found Pets', link: `/pets/found-pets` },
		{ title: 'Pet Adoption', link: `/pets/pet-adoption` },
	]

	useEffect(() => {
		if (auth0User) {
			storeUser(
				auth0User.email,
				auth0User.name,
				auth0User.nickname,
				auth0User.picture,
				auth0User.sub
			)
		} else {
			clearUser()
		}
	}, [auth0User])

	const { data: userData } = useQuery(USER_QUERY, {
		variables: { sub: user.sub },
	})

	const handleSidebarOpen = () => {
		setIsSidebarOpen(true)
	}

	const handleSidebarClose = () => {
		setIsSidebarOpen(false)
	}

	useEffect(() => {
		if (userData) {
			setUserId(userData.user?.id)
		}
	}, [userData])

	return (
		<>
			<nav className=' bg-pastelCream border-b border-pastelPurple relative'>
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					handleSidebarClose={handleSidebarClose}
				/>
				<div className='mx-6'>
					<div className='flex justify-between max-w-6xl mx-auto py-4 '>
						{/* Left Side of Nav */}
						<div
							className={`flex ${
								windowSize.width < 768
									? 'gap-4'
									: windowSize.width >= 1000
									? 'gap-20'
									: 'gap-8'
							}`}
						>
							{windowSize.width < 768 && (
								<>
									<div
										className='flex  rounded-md py-2 px-3 transition-colors ease-in-out hover:bg-pastelDarkerCream cursor-pointer border border-pastelPurple md:border-none'
										onClick={handleSidebarOpen}
									>
										<MenuIcon className='w-5 h-5' />
									</div>
								</>
							)}
							<div className='flex  rounded-md py-2 px-3 transition-colors ease-in-out hover:bg-pastelDarkerCream cursor-pointer  border border-pastelPurple md:border-none'>
								<Link href={`/`}>
									<a>
										<h1 className=''>Home</h1>
									</a>
								</Link>
							</div>
							{windowSize.width >= 768 && (
								<>
									{user.id ? (
										<div className='flex  rounded-md py-2 px-3 transition-colors ease-in-out hover:bg-pastelDarkerCream cursor-pointer'>
											<Link href={`/user/${user.id}`}>
												<a>{user.name}</a>
											</Link>
										</div>
									) : null}
									{navbarLinks.map((link) => {
										return (
											<div
												className='flex  rounded-md py-2 px-3 transition-colors ease-in-out hover:bg-pastelDarkerCream cursor-pointer'
												key={link.title}
											>
												<Link href={link.link}>
													<a>
														<h1 className=''>{link.title}</h1>
													</a>
												</Link>
											</div>
										)
									})}
								</>
							)}
						</div>

						<div className='flex  rounded-md py-2 px-3 transition-colors ease-in-out hover:bg-pastelDarkerCream cursor-pointer  border border-pastelPurple md:border-none'>
							{!auth0User ? (
								<Link href='/api/auth/login'>
									<a>Login</a>
								</Link>
							) : (
								<Link href='/api/auth/logout'>
									<a>Logout</a>
								</Link>
							)}
						</div>
					</div>
				</div>
			</nav>
			{children}
		</>
	)
}

export default Navbar
