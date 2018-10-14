import React, { Component } from 'react'

import ChatForm from './ChatForm'
import ChatMessagesList from './ChatMessagesList'

class ChatWrapper extends Component {
  render() {
    return (
      <React.Fragment>
        <ChatMessagesList
          auth={ this.props.auth }
        />
  
        <ChatForm
          auth={ this.props.auth }
          username={ this.props.username }
        />
      </React.Fragment>
    )
  }
}
 
export default ChatWrapper