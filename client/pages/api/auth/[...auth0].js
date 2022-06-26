// import { handleAuth } from '@auth0/nextjs-auth0'
const { handleAuth } = require('@auth0/nextjs-auth0')
console.log(process.env)

export default handleAuth()
