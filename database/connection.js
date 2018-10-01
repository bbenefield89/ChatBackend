const Sequelize = require('sequelize')

const { DBNAME, DBUSER, DBPW, DBHOST } = process.env

const sequelize = new Sequelize(DBNAME, DBUSER, DBPW, {
  host: DBHOST,
  dialect: 'postgresql'
})

module.exports = sequelize