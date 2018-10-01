import React from 'react'

import ChatForm from './ChatForm'
import ChatMessagesList from './ChatMessagesList'

const ChatWrapper = props => {
  return (
    <React.Fragment>
      <ChatMessagesList socket={ props.socket } />
      <ChatForm socket={ props.socket } />
    </React.Fragment>
  );
}
 
export default ChatWrapper