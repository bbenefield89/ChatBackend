const bcrypt  = require('bcrypt')
const graphql = require('graphql')
const jwt     = require('jsonwebtoken')

const Users    = require('../../database/models/users')
const UserType = require('../query/users/user')

const { GraphQLString } = graphql

const createUser = {
  type: UserType,

  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  },

  resolve: (parent, { username, password }) => {
    const user = () => (
      new Promise((res, rej) => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err)
            return err
          
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err)
              return err
            
            try {
              const newUser = await Users.create({
                username,
                password: hash
              })

              const payload = {
                sub: {
                  id: newUser.id,
                  username: newUser.username
                }
              }

              const token = jwt.sign(payload, process.env.SECRET)

              res({
                token,
                username: newUser.username,
                id: newUser.id
              })
            }
            catch(err) {
              rej(err)
            }
          })
        })
      })
    )

    return user()
  }
}

module.exports = createUser