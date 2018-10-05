const socketio = io => (
  io.on('connection', socket => {
    console.log('\n\n=====\nUser Connected\n=====\n\n')

    // SEND CHAT MESSAGE::RESP CHAT MESSAGE
    socket.on('SEND CHAT MESSAGE', async data => {
      try {
        const message = await Message.create({
          username: data.username,
          message: data.message
        })

        io.emit('RESP CHAT MESSAGE', message)
      }
      catch(err) {
        io.emit('RESP CHAT MESSAGE', err)
      }
    })
  })
)

module.exports = socketio