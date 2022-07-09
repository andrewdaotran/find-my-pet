import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { USER_QUERY } from '../apollo/userQueries'
import { useQuery } from '@apollo/client'
import UserContext from '../context/userContext'

const Navbar = ({ children }) => {
	const { user: auth0User } = useUser()
	const { user, storeUser, clearUser, setUserId } = useContext(UserContext)

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

	useEffect(() => {
		if (userData) {
			setUserId(userData.user?.id)
		}
	}, [userData])

	return (
		<>
			<nav className=' bg-slate-600 '>
				<div className='mx-6'>
					<div className='flex justify-between max-w-6xl mx-auto py-4 '>
						<div className='flex gap-8'>
							<Link href={`/`}>
								<a>
									<h1 className=''>logo</h1>
								</a>
							</Link>
							{/* {userData && auth0User && !loading ? ( */}
							{user.id ? (
								<Link href={`/user/${user.id}`}>
									<a>{user.name}</a>
								</Link>
							) : null}
						</div>
						<div className='flex'>
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
