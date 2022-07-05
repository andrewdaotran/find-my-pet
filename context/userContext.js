import { createContext, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({
		email: '',
		name: '',
		nickname: '',
		picture: '',
		sub: '',
		id: '',
	})

	const storeUser = (email, name, nickname, picture, sub) => {
		setUser({
			...user,
			email,
			name,
			nickname,
			picture,
			sub,
		})
	}
	const setUserId = (id) => {
		setUser({
			...user,
			id,
		})
	}
	const clearUser = () => {
		setUser({
			email: '',
			name: '',
			nickname: '',
			picture: '',
			sub: '',
			id: '',
		})
	}
	return (
		<UserContext.Provider value={{ user, storeUser, clearUser, setUserId }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
