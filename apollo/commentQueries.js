import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CreateCommentInput!) {
		createComment(input: $input) {
			value
			pet
			userId
			timestamp
			id
			userName
		}
	}
`
