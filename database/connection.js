require('dotenv').config()

import { Sequelize } from 'sequelize'

let sequelize

if (process.env.NODE_ENV === 'development') {
  const { DBNAME, DBUSER, DBPW, DBHOST, DBPORT, DATABASE } = process.env
  sequelize = new Sequelize(
    `${ DATABASE }://${ DBUSER }:${ DBPW }@${ DBHOST }:${ DBPORT }/${ DBNAME }`
  )
}
else
  sequelize = new Sequelize(process.env.DATABASE_URL)

export { sequelize }