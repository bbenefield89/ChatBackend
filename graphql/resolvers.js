import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub();
const HELLO_ADDED = 'helloAdded'
const USER_CREATED = 'userCreated'

const hellos = [{
  id: 1,
  message: 'Hello 1'
}]
let helloId = hellos.length

const users = [{ id: 1, username: 'user1', password: 'pass1', email: 'email1' }]
let userID = users.length

const resolvers = {
  Query: {
    hellos: () => hellos,
    
    hello: (root, { id }) => {
      return hellos.find(hello => hello.id == id)
    },

    users: () => users,
    user: (root, { id }) => users.find(user => user.id == id)
  },

  Mutation: {
    newHello: (root, args) => {
      const newHello = { id: String(++helloId), message: args.message }

      hellos.push(newHello)

      pubsub.publish(HELLO_ADDED, { helloAdded: newHello })
      return newHello
    },

    createUser: (root, { username, password, email }) => {
      const newUser = { id: ++userID, username, password, email }
      users.push(newUser)
      pubsub.publish(USER_CREATED, { userCreated: newUser })
      return newUser
    }
  },

  Subscription: {
    helloAdded: {
      subscribe: () => pubsub.asyncIterator(HELLO_ADDED)
    },

    userCreated: {
      subscribe: () => pubsub.asyncIterator(USER_CREATED)
    }
  }
};

export { resolvers }
