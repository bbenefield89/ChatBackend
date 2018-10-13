import bcrypt     from 'bcrypt'
import { PubSub } from 'graphql-subscriptions'

import User    from '../database/models/User'
import Message from '../database/models/Message'

const pubsub          = new PubSub();
const USER_CREATED    = 'userCreated'
const MESSAGE_CREATED = 'messageCreated'

const resolvers = {
  Query: {
    user: async (root, { id }) => User.findById(id),
    users: async () => User.findAll(),
    
    messages: async () => Message.findAll()
  },

  Mutation: {
    createUser: async (root, { username, password, picture }) => {
      // throw error if password is too short
      if (!password)
        throw new Error('Password length to short')
      
      const hashedPw = await bcrypt.hash(password, 10)
      const newUser  = await User.create({ username, password: hashedPw, picture })

      pubsub.publish(USER_CREATED, { newUser })
      return newUser
    },
    
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
    }
  }
};

export { resolvers }
