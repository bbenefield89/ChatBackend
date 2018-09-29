const router = require('express').Router()

const Messages = require('../../database/models/messages')

router
  .get('/messages', (req, res) => (
    Messages.findAll()
      .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => console.log(err))
  ))

module.exports = router