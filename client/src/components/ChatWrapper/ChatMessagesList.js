import React, { Component } from 'react'
import axios from 'axios'
import gql from 'graphql-tag'
import { Query, Subscription } from 'react-apollo'

import Messages from './Messages'

const MESSAGES = `
  query {
    messages {
      id
      message
    }
  }
`

const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      id
      message
    }
  }
`

class ChatMessagesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  
  setMessagesState = messagesData => {
    this.setState({
      messages: [
        ...this.state.messages,
        ...messagesData
      ]
    })
  }

  newMessageReturned = messageData => {
    const { newMessage } = messageData.data
    
    this.setState({
      messages: [
        ...this.state.messages,
        newMessage
      ]
    })
  }

  componentDidMount() {
    const req = {
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      data: { query: MESSAGES }
    }

    axios(req)
      .then(({ data }) => {
        this.setMessagesState(data.data.messages)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Subscription
        subscription={ NEW_MESSAGE }
        onSubscriptionData={({ subscriptionData }) => (
          this.newMessageReturned(subscriptionData) 
        )}
      >
        {({loading, error, data}) => {
          return (
              loading
            ?
                <Messages messages={ this.state.messages } />
            : 
              error
            ?
                <h1>Error</h1>
            :
              data
            ?
                <Messages messages={ this.state.messages } />
            :
                null
          )
        }}
      </Subscription>
    )
  }
}
 
export default ChatMessagesList