const router = require('express').Router()
const Messages = require('../database/models/messages')

/**
 * TODO: check for headers to ensure this request is coming from a browser
 * NOTE: look into how this will affect the mobile app version
 */
router.get('/messages', async (req, res) => {
  const messages = await Messages.findAll()
  res.send(messages)
})

module.exports = router