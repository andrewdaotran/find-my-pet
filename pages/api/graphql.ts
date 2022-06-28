const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-micro')
import typeDefs from '../../schema/typeDefs'
import resolvers from '../../schema/resolvers'

const server = new ApolloServer({ typeDefs, resolvers })

export const config = {
	api: {
		bodyParser: false,
	},
}

const startServer = server.start()

// --------------- Handler Function ------------------

const handler = async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	res.setHeader(
		'Access-Control-Allow-Origin',
		'https://studio.apollographql.com'
	)
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers'
	)
	res.setHeader(
		'Access-Control-Allow-Methods',
		'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD'
	)
	if (req.method === 'OPTIONS') {
		res.end()
		return false
	}
	// Do this step if you are connecting with MongoDB
	await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	await startServer
	await server.createHandler({ path: '/api/graphql' })(req, res)
}
export default handler
