import React from 'react';

import { cleanup, render } from 'react-testing-library'

import { InMemoryCache }     from 'apollo-cache-inmemory'
import ApolloClient          from 'apollo-client'
import { split }             from 'apollo-link';
import { HttpLink }          from 'apollo-link-http';
import { WebSocketLink }     from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider }    from 'react-apollo'
import { BrowserRouter }     from 'react-router-dom'
import WebSocket from 'ws'

import App from './App'

import { url, ws } from './config'

const httpLink = new HttpLink({
  uri: `${ url }/graphql`
});

const wsLink = new WebSocketLink({
  options: {
    reconnect: true
  },
  uri: `${ ws }/graphql`,
  webSocketImpl: WebSocket
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)

    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

afterEach(cleanup)

describe('<App />', () => {
  it('renders without crashing', () => {
    const app = render(
      <ApolloProvider client={ client }>
        <BrowserRouter>
          <App url={ url } ws={ ws } client={ client } />
        </BrowserRouter>
      </ApolloProvider>
    )
  })
})
