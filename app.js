require('dotenv').config()

const PORT = process.env.PORT || 3001

const express     = require('express')
const app         = express()
const cors        = require('cors')
const graphqlHTTP = require('express-graphql')
const http        = require('http').Server(app)
const io          = require('socket.io')(http)

const api      = require('./routes/api')
const db       = require('./database/connection')
const socketio = require('./socketio/socketio')
const Message  = require('./database/models/messages')
const Users    = require('./database/models/users')
const schema   = require('./schema')

app.use(cors())
app.use('/api', api)
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// allows the frontend to be viewed from express instead of a separate port
app.use(express.static('client/build'))

/**
 * SERVE SERVER AT PORT AND CONNECT TO THE DB
 */
http.listen(PORT, async () => {
  console.log(`\nServer listening at http://localhost:${ PORT }\n`)

  // handles all of the socket-io emits/gets
  socketio(io)
  
  try {
    await db.authenticate()
    console.log('\n\n=====\nDATABASE CONNECTED\n=====\n\n')

    // synchronizes models with tables in DB
    // if the table does NOT exist, create a new one
    Message.sync()
    Users.sync()
  }
  catch (err) {
    console.log(err)
  }
})