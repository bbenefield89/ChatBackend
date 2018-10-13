import { Sequelize } from 'sequelize'

import { sequelize as db } from '../connection'

const User = db.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [ 1, 25 ],
        notEmpty: true,
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [ 1, 256 ],
        notEmpty: true,
      }
    },
    
    picture: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
  }
)

export default User