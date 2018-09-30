const Sequelize = require('sequelize')

const { DBNAME, DBUSER, DBPW } = process.env

const sequelize = new Sequelize(DBNAME, DBUSER, DBPW, {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
})

module.exports = sequelize