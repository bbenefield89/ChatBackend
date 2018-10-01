require('dotenv').config()

const PORT = process.env.PORT || 3001

const express = require('express')
const app     = express()
const cors    = require('cors')
const http    = require('http').Server(app)
const io      = require('socket.io')(http)

const REST    = require('./routes/rest')
const db      = require('./database/connection')
const Message = require('./database/models/messages')
const Users   = require('./database/models/users')

app.use(cors())
app.use('/api', REST)

// allows the frontend to be viewed from express instead of a separate port
app.use(express.static('client/build'))

/**
 * WEBSOCKET CONNECT, EMITTERS, AND RECEIVERS
 */
io.on('connection', socket => {
  console.log('\n\n=====\nUser Connected\n=====\n\n')
  
  // SEND::RESP
  socket.on('SEND', data => {
    console.log(`\n\n${ data }\n\n`)
    io.emit('RESP', data)
  })

  // SEND USER SIGNUP::RESP USER SIGNUP
  socket.on('SEND USER SIGNUP', data => {
    io.emit('RESP USER SIGNUP', data)
  })

  // SEND CHAT MESSAGE::RESP CHAT MESSAGE
  socket.on('SEND CHAT MESSAGE', data => {
    Message.create({
      username: 'Brandon Benefield',
      message: data
    })
      .then(data => {
        console.log(data.message)
        io.emit('RESP CHAT MESSAGE', data)
      })
      .catch(err => console.log(err))
  })
})

/**
 * SERVE SERVER AT PORT AND CONNECT TO THE DB
 */
http.listen(PORT, () => {
  console.log(`\nServer listening at http://localhost:${ PORT }\n`)

  db.authenticate()
    .then(() => {
      console.log('\n\n=====\nDATABASE CONNECTED\n=====\n\n')
      // synchronizes models with tables in DB
      // if the table does NOT exist, create a new one
      Message.sync()
      Users.sync()
    })
    .catch(err => console.log(err))
})