import React from 'react'
import styled from 'styled-components'

import Message from './Message'

const DivStyled = styled.div`
  flex: 1;
  overflow: scroll;
`

interface Props {
  messages: any
}

const Messages = ({ messages }: Props) => {
  return (
    <DivStyled className='messages_container'>
      {messages.map((message: any) => (
        <Message
          { ...message }
          key={ message.id }
        />
      ))}
    </DivStyled>
  )
}
 
export default Messages