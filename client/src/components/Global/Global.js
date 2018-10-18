import React, { createContext, Component } from 'react'
import ApolloClient from 'apollo-boost'
import Auth from '../../Auth/Auth'
import { ApolloProvider } from 'react-apollo'
import io from 'socket.io-client'

export const Store = createContext()

class Global extends Component {
  constructor(props) {
    super(props)

    this.state = {
      socketURL: 'http://localhost:3001'
    }

    this.auth = new Auth()

    this.client = new ApolloClient({
      uri: `${ this.state.socketURL }/graphql`
    })

    this.socket = io(this.state.socketURL)
  }
  

  setSocketURL = () => {
    const { NODE_ENV } = process.env

    if (NODE_ENV === 'production') {
      this.setState({
        socketURL: 'https://evening-headland-92725.herokuapp.com/'
      })
    }
  }

  componentDidMount() {
    this.setSocketURL()
  }

  render() {
    return (
      <Store.Provider
        value={{
          auth: this.auth,
          socket: this.socket,
          state: this.state
        }}
      >
        <ApolloProvider client={ this.client }>
          { this.props.children }
        </ApolloProvider>
      </Store.Provider>
    )
  }
}

export default Global