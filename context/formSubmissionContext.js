import { createContext, useState } from 'react'

const FormSubmissionContext = createContext()

export const FormSubmissionContextProvider = ({ children }) => {
	const [isFormSubmitted, setIsFormSubmitted] = useState(false)

	const submitModalPopup = () => {
		setIsFormSubmitted(true)
		setTimeout(() => {
			setIsFormSubmitted(false)
		}, 3000)
	}
	return (
		<FormSubmissionContext.Provider
			value={{ isFormSubmitted, submitModalPopup }}
		>
			{children}
		</FormSubmissionContext.Provider>
	)
}

export default FormSubmissionContext
