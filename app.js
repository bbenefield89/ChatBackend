const cors = require('cors')
const mysql = require('mysql')

const app = require('express')()
const PORT = process.env.PORT || 3001
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'chat'
})

app.use(cors())

app.listen(PORT, () => console.log(`\nServer listening at http://localhost:${ PORT }\n`))

connection.connect()

connection.query('SELECT * FROM Users', (err, rows, fields) => {
  if (err)
    throw err

  console.log(rows)
})
