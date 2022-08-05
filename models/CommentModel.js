import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
	value: String,
	userId: String,
	pet: String,
	timestamp: Date,
	userName: String,
	sub: String,
})

const CommentModel = mongoose.models['Comment']
	? mongoose.model('Comment')
	: mongoose.model('Comment', CommentSchema)

export default CommentModel
