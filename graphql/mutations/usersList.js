import Token from '../../helpers/Token'
import User from '../../database/models/User'

const USER_LIST = 'userList'

const currentUsers = []

// addUser
const addUser = async (token, pubsub) => {
  const newToken = new Token()
  const validToken = await newToken.validateToken(token)
  
  if (!validToken)
    throw new Error('INVALID TOKEN')
  
  const user = await User.findById(validToken.id)
  
  if (!user)
    throw new Error('USER NOT FOUND')
  
  currentUsers.push(user)
  pubsub.publish(USER_LIST, { userList: currentUsers })
  return currentUsers
}

// removeUser
const removeUser = async (id, pubsub) => {
  for (let i = 0; i < currentUsers.length; i++) {
    if (currentUsers[ i ].id == id) {
      currentUsers.splice(i, 1)
      pubsub.publish(USER_LIST, { userList: currentUsers })
      return currentUsers
    }
  }
}

// userList
const userList = async ({ token, id }, pubsub) => {
  if (token) {
    return addUser(token, pubsub)
  }
  else if (id) {
    return removeUser(id, pubsub)
  }
}

export default userList
