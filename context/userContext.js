import { createContext, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState({
		email: '',
		name: '',
		nickname: '',
		picture: '',
		sub: '',
	})

	const storeUser = (email, name, nickname, picture, sub) => {
		setUser({
			email,
			name,
			nickname,
			picture,
			sub,
		})
	}
	const clearUser = () => {
		setUser({
			email: '',
			name: '',
			nickname: '',
			picture: '',
			sub: '',
		})
	}
	return (
		<UserContext.Provider value={{ user, storeUser, clearUser }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
