const graphql = require('graphql')

const {
  GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLList
} = graphql

// DB models
const Users = require('../database/models/users')

// query types
const UserType  = require('./query/users/user')
const UsersType = require('./query/users/users')

// mutations
const createUser = require('./mutations/createUser')

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => (
        Users.find({
          where: { id: args.id }
        })
      )
    },

    users: {
      type: new GraphQLList(UsersType),
      resolve: () => Users.findAll()
    }
  }
})

// Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser
  }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })