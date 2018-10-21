import { makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `
  type User {
    id: ID
    username: String
    picture: String
  }

  type UserPayload {
    user: User
    jwt: String
  }
  
  type Message {
    id: ID!
    message: String!
    username: String!
  }
  
  type Query {
    users: [ User ]!
    user(id: ID!): User
    userLogin(username: String!, password: String!): UserPayload
    authenticateUser(token: String): User!

    messages: [ Message ]!
    message: Message
  }

  type Mutation {
    createUser(username: String!, password: String!, picture: String): UserPayload
    createMessage(username: String!, message: String!): Message
    userList(token: String, id: ID): [ User ]
  }

  type Subscription {
    newUser: User
    userList: [ User ]
    newMessage: Message
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })

export {
  schema,
  typeDefs
}