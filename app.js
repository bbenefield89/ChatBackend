const app = require('express')()
const cors = require('cors')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mysql = require('mysql')

const PORT = process.env.PORT || 3001
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'chat'
})

app.use(cors())

app.get('/', (req, res) => res.redirect('http://localhost:3000'))

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

http.listen(PORT, () => console.log(`\nServer listening at http://localhost:${ PORT }\n`))

// example of a very basic connect and query to the DB
// connection.connect()

// connection.query('SELECT * FROM Users', (err, rows, fields) => {
//   if (err)
//     throw err

//   console.log(rows)
// })
