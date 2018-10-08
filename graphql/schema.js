import {  makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `
  type Hello {
    id: ID!
    message: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Message {
    id: ID!
    message: String!
    user: User!
  }
  
  type Query {
    hellos: [Hello]!
    hello(id: ID!): Hello
    users: [User]!
    user(id: ID!): User
    messages: [ Message ]!
    message: Message
  }

  type Mutation {
    newHello(message: String!): Hello
    createUser(username: String!, password: String!, email: String!): User
    createMessage(username: String!, message: String!): Message
  }

  type Subscription {
      helloAdded: Hello
      userCreated: User
      newMessage: Message
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })

export {
  schema,
  typeDefs
}