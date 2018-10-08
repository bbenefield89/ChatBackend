import React from 'react'

import ChatForm from './ChatForm'
import ChatMessagesList from './ChatMessagesList'

const ChatWrapper = ({ auth, username }) => {
  return (
    <React.Fragment>
      <ChatMessagesList
        auth={ auth }
      />

      <ChatForm
        auth={ auth }
        username={ username }
      />
    </React.Fragment>
  )
}
 
export default ChatWrapper