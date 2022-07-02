import React from 'react'
import Link from 'next/link'

const Navbar = ({ children }) => {
	return (
		<>
			<nav className=' bg-slate-600 '>
				<div className='mx-6'>
					<div className='flex justify-between max-w-6xl mx-auto py-4 '>
						<Link href={`/`}>
							<a>
								<h1 className=''>logo</h1>
							</a>
						</Link>
						<div className='flex gap-8'>
							<Link href='/api/auth/login'>
								<a>Login</a>
							</Link>
							<Link href='/api/auth/logout'>
								<a>Logout</a>
							</Link>
						</div>
					</div>
				</div>
			</nav>
			{children}
		</>
	)
}

export default Navbar
