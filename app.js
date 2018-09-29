const app  = require('express')()
const cors = require('cors')
const http = require('http').Server(app)
const io   = require('socket.io')(http)

const db   = require('./database/connection')
const Message = require('./database/models/messages')
const PORT = process.env.PORT || 3001

app.use(cors())

app.get('/', (req, res) => res.redirect('http://localhost:3000'))

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

  // SEND CHAT MESSAGE::RESP CHAT MESSAGE
  socket.on('SEND CHAT MESSAGE', data => {
    const message = Message.create({
      username: 'Brandon Benefield',
      message: data
    })
      .then(data => {
        console.log(data.message)
        io.emit('RESP CHAT MESSAGE', data)
      })
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

      Message.sync()
        // .then(() => {
        //   return Message.create({
        //     username: 'Brandon Benefield',
        //     message: 'My first message!'
        //   })
        // })
        // .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})