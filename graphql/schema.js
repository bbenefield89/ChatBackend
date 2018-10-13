import {  makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `
  type User {
    id: ID!
    nickname: String!
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
    createMessage(username: String!, message: String!): Message
  }

  type Subscription {
      userCreated: User
      newMessage: Message
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers })

export {
  schema,
  typeDefs
}