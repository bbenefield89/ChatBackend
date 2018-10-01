const { STRING } = require('sequelize')
const db = require('../connection')

const Users = db.define('users', {
  username: {
    type: STRING
  },
  password: {
    type: STRING
  }
})

module.exports = Users