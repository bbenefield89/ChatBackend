import React from 'react'

interface Props {
  username: string
  message: any
}

const Message = ({ message, username }: Props) => {
  return (
    <React.Fragment>
      <p style={{color: 'blue'}}>{ username }</p>
      <p style={{color: 'red', marginBottom: '5rem'}}>{ message }</p>
    </React.Fragment>
  )
}
 
export default Message