const { STRING } = require('sequelize')
const db = require('../connection')

const Messages = db.define('messages', {
  username: {
    type: STRING
  },
  message: {
    type: STRING
  }
})

module.exports = Messages