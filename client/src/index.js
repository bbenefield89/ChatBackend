import React                 from 'react';
import ReactDOM              from 'react-dom';
import { InMemoryCache }     from 'apollo-cache-inmemory'
import ApolloClient          from 'apollo-client'
import { split }             from 'apollo-link';
import { HttpLink }          from 'apollo-link-http';
import { WebSocketLink }     from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities';
import { BrowserRouter }     from 'react-router-dom'
import { ApolloProvider }    from 'react-apollo'

import App from './App';

import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

import { url, ws } from './config'

/**
 * TODO: set up env variables to pass the correct URI
 */
const httpLink = new HttpLink({
  uri: url + '/graphql'
});

const wsLink = new WebSocketLink({
  uri: `${ ws }/graphql`,
  options: {
    reconnect: true
  }
})

/** 
 * splits our protocol endpoints so 'query' and 'mutation' requests are made
 * using HTTP while 'subscription' requests are made over the websocket endpoint
 */
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)

    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={ client }>
    <BrowserRouter>
      <App url={ url } ws={ ws } client={ client } />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
