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

interface SubScriptionData {
  subscriptionData: any
}

class ChatMessagesList extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      messages: []
    }
  }
  
  public async componentDidMount() {
    const req = {
      data: { query: MESSAGES },
      method: 'POST',
      url: `${ this.props.url }/graphql`
    }

    try {
      const { data } = await axios(req)
      this.setMessagesState(data.data.messages)
    }
    catch(err) {
      throw new Error(err)
    }
  }

  public render() {
    return (
      <Subscription
        subscription={ NEW_MESSAGE }
        onSubscriptionData={ this.handleSubscriptionData }
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

  private handleSubscriptionData = ({ subscriptionData }: SubScriptionData): void => {
    this.newMessageReturned(subscriptionData)
  }
  
  private setMessagesState = (messagesData: any): void => {
    this.setState({
      messages: [
        ...this.state.messages,
        ...messagesData
      ]
    })
  }

  private newMessageReturned = (messageData: any): void => {
    const { newMessage } = messageData.data
    
    this.setState({
      messages: [
        ...this.state.messages,
        newMessage
      ]
    })
  }
}
 
export default ChatMessagesList