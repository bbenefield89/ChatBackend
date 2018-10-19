import React from 'react'

import Message from './Message'

interface Props {
  messages: any
}

const Messages = ({ messages }: Props) => {
  return (
    messages.map((message: any) => (
      <Message
        { ...message }
        key={ message.id }
      />
    ))
  )
}
 
export default Messages