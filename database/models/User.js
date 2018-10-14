import { Sequelize } from 'sequelize'

import { sequelize as db } from '../connection'

const User = db.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [ 1, 25 ],
        notEmpty: true,
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [ 1, 256 ],
        notEmpty: true,
      }
    },
    
    picture: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: [ 'username' ]
      }
    ]
  }
)

export default User