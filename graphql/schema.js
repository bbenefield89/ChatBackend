import {  makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `
  type User {
    id: ID!
    username: String!
    picture: String!
  }

  type Message {
    id: ID!
    message: String!
    username: String!
  }
  
  type Query {
    users: [ User ]!
    user(id: ID!): User
    messages: [ Message ]!
    message: Message
  }

  type Mutation {
    createUser(username: String!, password: String!, picture: String!): User
    createMessage(username: String!, message: String!): Message
  }

  type Subscription {
      newUser: User
      newMessage: Message
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })

export {
  schema,
  typeDefs
}