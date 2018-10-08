import React, { Component } from 'react'
import axios from 'axios'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

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
        messagesData
      ]
    })
  }

  render() {
    return (
      <Subscription
        subscription={gql`
          subscription {
            helloAdded {
              id
              message
            }
          }
        `}
        onSubscriptionData={({ subscriptionData }) => this.setState({
          messages: [ ...this.state.messages, subscriptionData.data.helloAdded ]
        })}
      >
        {({loading, error, data}) => {
          if (loading) return <h1>Loading</h1>

          if (error) {
            // console.log(error)
            return <h1>Error</h1>
          }
          
          if (data) {
            return (
              this.state.messages.map(({ id, message }) => (
                <div key={ id }>
                  <p>{ message }</p>
                </div>
              ))
            )
          }
        }}
      </Subscription>
      
      // <ul>
      //   {
      //     this.state.messages.map((message, index) => (
      //       <li key={ message.id } style={{marginBottom: '3rem'}}>
      //         <p>{ message.username } <small>{ message.updatedAt }</small></p>
      //         <p>{ message.message }</p>
      //       </li>
      //     ))
      //   }
      // </ul>
    )
  }
}
 
export default ChatMessagesList