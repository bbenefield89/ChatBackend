const app  = require('express')()
const cors = require('cors')
const http = require('http').Server(app)
const io   = require('socket.io')(http)

const db   = require('./database/connection')
const PORT = process.env.PORT || 3001

app.use(cors())

app.get('/', (req, res) => res.redirect('http://localhost:3000'))

/**
 * WEBSOCKET CONNECT, EMITTERS, AND RECEIVERS
 */
io.on('connection', socket => {
  console.log('User Connected')
  
  // SEND::RESP
  socket.on('SEND', data => {
    console.log(`\n\n${ data }\n\n`)
    io.emit('RESP', data)
  })

  // SEND CHAT MESSAGE::RESP CHAT MESSAGE
  socket.on('SEND CHAT MESSAGE', data => {
    console.log(`\n${ data }\n`)
    io.emit('RESP CHAT MESSAGE', data)
  })
})

/**
 * SERVE SERVER AT PORT AND CONNECT TO THE DB
 */
http.listen(PORT, () => {
  console.log(`\nServer listening at http://localhost:${ PORT }\n`)

  db.authenticate()
    .then(() => {
      console.log('DATABASE CONNECTED')
    })
    .catch(err => console.log(`ERR Connecting to DB`))
})