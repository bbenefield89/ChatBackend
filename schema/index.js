const graphql = require('graphql')

const {
  GraphQLID, GraphQLObjectType, GraphQLSchema
} = graphql

const Users = require('../database/models/users')

const UserType = require('./query/users/user')

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
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery })