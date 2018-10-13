import { PubSub } from 'graphql-subscriptions'

import Message from '../database/models/Message'

const pubsub       = new PubSub();
const MESSAGE_CREATED = 'messageCreated'

const resolvers = {
  Query: {
    messages: async () => Message.findAll()
  },

  Mutation: {
    createMessage: async (root, { username, message }) => {
      const newMessage = await Message.create({ username, message })
      pubsub.publish(MESSAGE_CREATED, { newMessage })
      return newMessage
    }
  },

  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(MESSAGE_CREATED)
    }
  }
};

export { resolvers }
