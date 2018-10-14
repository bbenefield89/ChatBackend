require('dotenv').config()

import express                from 'express'
import { ApolloServer }       from 'apollo-server-express'
import cors                   from 'cors'
import { execute, subscribe } from 'graphql'
import { createServer }       from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import { sequelize as db }  from './database/connection'
import Message              from './database/models/Message'
import User                 from './database/models/User'
import { schema, typeDefs } from './graphql/schema'
import { resolvers }        from './graphql/resolvers'

const PORT = process.env.PORT || 3001
const app  = express()

/**
 * TODO: use an env variable to decide the correct
 *       'Access-Control-Allow-Origin' for this, 'ws', and for 'app.use(cors())'
 * 
 * the callback function pretty much open cors up for everyone
 */
const ws = createServer(app, (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${ PORT }`)
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', '*')
})

const apolloServer = new ApolloServer({ typeDefs, resolvers })

// middleware
app.use(cors())
app.use(express.static('./client/build'))

// allows express to serve the '/graphql' endpoint/graphiql-playground
apolloServer.applyMiddleware({ app })

app.get('*', (req, res) => (
  res.sendFile('index.html', { root: __dirname + '/client/build' }))
)

/**
 * this portion is pretty special
 * in a normal express app we would typically see 'app.listen(...)' but here we
 * are using the 'ws' variable, which points to the 'createServer(app)'
 * function. Effectively what we have done here is created two separate
 * servers where one, our express app (app), is being served over HTTP at port
 * 3001, 'http://localhost:3001', and we are also serving up another server (ws),
 * thanks to 'SubscriptionServer.create(...)', on the same port, '3001', but over
 * a different protocol, 'ws' or WebSocket. We can connect our subscriptions from
 * the client to this server at 'ws://localhost:3001/graphql'
 */
ws.listen(PORT, async () => {
  console.log(`WS listening at http://localhost:${ PORT }`)

  try {
    await db.authenticate()
    console.log('\n\n=====\nDATABASE CONNECTED\n=====\n\n')

    await Message.sync()
    await User.sync()
  }
  catch (err) {
    console.log(err)
  }
});

SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: ws,
    path: '/graphql'
  }
)
