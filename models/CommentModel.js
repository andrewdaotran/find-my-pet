import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
	value: String,
	user: String,
	pet: String,
	timestamp: Date,
})

const CommentModel = mongoose.models['Comment']
	? mongoose.model('Comment')
	: mongoose.model('Comment', CommentSchema)

export default CommentModel
