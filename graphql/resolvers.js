/**
 * TODO: finish creating the 'userLeft' resolver
 */

require('dotenv').config()

import bcrypt     from 'bcrypt'
import { PubSub } from 'graphql-subscriptions'
import jwt        from 'jsonwebtoken'

import User    from '../database/models/User'
import Message from '../database/models/Message'

import userList from './mutations/usersList'

const pubsub = new PubSub();

const USER_CREATED    = 'userCreated'
const USER_LIST       = 'userList'
const MESSAGE_CREATED = 'messageCreated'

/**
 * TODO: move this class into its own file
 */
class Token {
  constructor(user) {
    this.user = user
    this.secret = process.env.SECRET
  }

  createToken = () => {
    const tokenData = {
      id: this.user.id,
      username: this.user.username,
      picture: this.user.picture
    }

    return jwt.sign(tokenData, this.secret, { expiresIn: '30d' })
  }

  validateToken = token => {
    return jwt.verify(token, this.secret)
  }
}

const resolvers = {
  Query: {
    user: async (root, { id }) => User.findById(id),
    users: async () => User.findAll(),
    userLogin: async (root, { username, password }) => {
      /**
       * TODO: fix the error messaging to be more general
       */
      if (!password)
        throw new Error('SUPPLY A VALID PASSWORD')

      const user = await User.findOne({
        where: { username}
      })

      if (!user)
        throw new Error('USER DOES NOT EXIST')

      const validPw = await bcrypt.compare(password, user.password)

      if (!validPw)
        throw new Error('PASSWORD DOES NOT MATCH')

      const token = new Token(user)
      const createToken = token.createToken()

      return { user, jwt: createToken }
    },
    authenticateUser: async (root, { token }) => {
      const verifyJwt = new Token()
      const validToken = await verifyJwt.validateToken(token)

      if (!validToken)
        throw new Error('INVALID TOKEN')

      const user = await User.findById(validToken.id)
      return user
    },
    
    messages: async () => Message.findAll({
      order: [
        [ 'createdAt', 'DESC' ]
      ]
    })
  },

  Mutation: {
    createUser: async (root, { username, password, picture }) => {
      // throw error if password is too short
      if (!password)
        throw new Error('Password length to short')
      
      try {
        const hashedPw = await bcrypt.hash(password, 10)
        const newUser = await User.create(
          {
            username,
            password: hashedPw,
            picture: picture ? picture : null
          }
        )

        const token = new Token(newUser)
        const createToken = token.createToken()
        
        pubsub.publish(USER_CREATED, { newUser })
        return { user: newUser, jwt: createToken }
      }
      catch (err) {
        throw new Error(err)
      }
    },
    userList: async (root, args) => userList(args, pubsub),
    
    createMessage: async (root, { username, message }) => {
      const newMessage = await Message.create({ username, message })
      pubsub.publish(MESSAGE_CREATED, { newMessage })
      return newMessage
    }
  },

  Subscription: {
    newUser: {
      subscribe: () => pubsub.asyncIterator(USER_CREATED)
    },
    
    newMessage: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED)
    },

    userList: {
      subscribe: () => pubsub.asyncIterator(USER_LIST)
    },
  }
};

export { resolvers }
