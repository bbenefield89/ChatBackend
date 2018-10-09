/**
 * TODO: Look into whether or not there is a better way to render the list of
 *       messages. As it is right now, every time a new message is created the
 *       entire <Messages /> or perhaps even this component is forced to
 *       re-render. Need to find a way to only render the newest message being
 *       received from the <Subscription /> component 
 */

import React, { Component } from 'react'
import axios from 'axios'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

import Messages from './Messages'

const MESSAGES = `
  query {
    messages {
      id
      message
      username
    }
  }
`

const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      id
      message
      username
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

  async componentDidMount() {
    const req = {
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      data: { query: MESSAGES }
    }

    try {
      const { data } = await axios(req)
      this.setMessagesState(data.data.messages)
    }
    catch(err) {
      console.log(err)
    }
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