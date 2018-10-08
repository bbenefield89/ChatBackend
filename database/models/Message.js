import { Sequelize } from 'sequelize'

import { sequelize as db } from '../connection'

const Message = db.define(
  'message',
  {
    username: { type: Sequelize.STRING },
    message: { type: Sequelize.TEXT }
  }
)

export default Message