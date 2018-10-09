import React from 'react'

import Message from './Message'

const Messages = ({ messages }) => {
  return (
    messages.map(message => (
      <Message key={ message.id } { ...message } />
    ))
  )
}
 
export default Messages