import React, { Component } from 'react'

import ChatForm from './ChatForm'
import ChatMessagesList from './ChatMessagesList'

class ChatWrapper extends Component {
  render() {
    return (
      <React.Fragment>
        <ChatMessagesList
          url={ this.props.url }
        />
  
        <ChatForm
          url={ this.props.url }
          username={ this.props.username }
        />
      </React.Fragment>
    )
  }
}
 
export default ChatWrapper