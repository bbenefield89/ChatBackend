import React from 'react'

import Message from './Message'

const Messages = ({ messages }) => {
  return (
    messages.map(message => (
      <Message
        { ...message }
        key={ message.id }
      />
    ))
  )
}
 
export default Messages