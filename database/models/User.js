import { Sequelize } from 'sequelize'

import { sequelize as db } from '../connection'

const User = db.define(
  'user',
  {
    name: { type: Sequelize.STRING },
    nickname: { type: Sequelize.STRING },
    picture: { type: Sequelize.STRING },
  }
)

export default User