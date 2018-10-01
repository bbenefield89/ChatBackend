const Sequelize = require('sequelize')

let sequelize

if (process.env.NODE_ENV === 'development') {
  const { DBNAME, DBUSER, DBPW, DBHOST } = process.env

  sequelize = new Sequelize(DBNAME, DBUSER, DBPW, {
    host: DBHOST,
    dialect: 'postgresql'
  })
}
else
  sequelize = new Sequelize(process.env.DATABASE_URL)

module.exports = sequelize