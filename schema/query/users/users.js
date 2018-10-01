const graphql = require('graphql')

const Users = require('../../../database/models/users')

const {
  GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList
} = graphql

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
  })
})

module.exports = UsersType