require('dotenv').config()

import express                from 'express'
import { ApolloServer, gql }  from 'apollo-server-express'
import { execute, subscribe } from 'graphql'
import { createServer }       from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import { sequelize as db }  from './database/connection'
import { typeDefs, schema } from './graphql/schema'
import { resolvers }        from './graphql/resolvers'

const PORT         = process.env.PORT || 3001;
const app          = express();
const ws           = createServer(app);
const apolloServer = new ApolloServer({ typeDefs, resolvers })

// allows express to serve the '/graphql' endpoint/graphiql-playground
apolloServer.applyMiddleware({ app })

ws.listen(PORT, async () => {
  console.log(`WS listening at http://localhost:${ PORT }`)

  await db.authenticate()
  // try {
  //   console.log('\n\n=====\nDATABASE CONNECTED\n=====\n\n')
  // }
  // catch (err) {
  //   console.log(err)
  // }
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
