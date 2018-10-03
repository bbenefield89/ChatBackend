const graphql = require('graphql')

const Users = require('../../../database/models/users')

const {
  GraphQLID, GraphQLObjectType, GraphQLString
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    token: { type: GraphQLString }
  })
})

module.exports = UserType