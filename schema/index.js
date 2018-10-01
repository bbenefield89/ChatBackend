const graphql = require('graphql')

const {
  GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList
} = graphql

const Users = require('../database/models/users')

const UserType  = require('./query/users/user')
const UsersType = require('./query/users/users')

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
      resolve: () => Users.findAll({})
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,

      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },

      resolve: (parent, args) => (
        Users.create({
          username: args.username,
          password: args.password
        })
      )
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })