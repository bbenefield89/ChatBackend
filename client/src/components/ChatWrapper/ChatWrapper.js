import React from 'react'

import ChatForm from './ChatForm'
import ChatMessagesList from './ChatMessagesList'

const ChatWrapper = ({ auth, socket, socketURL, username }) => {
  return (
    <React.Fragment>
      <ChatMessagesList
        auth={ auth }
        socket={ socket }
        socketURL={ socketURL }
      />

      <ChatForm
        auth={ auth }
        socket={ socket }
        username={ username }
      />
    </React.Fragment>
  )
}
 
export default ChatWrapper