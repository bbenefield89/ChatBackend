import React from 'react'

const Message = ({ message, username }) => {
  return (
    <React.Fragment>
      <p>{ username }</p>
      <p>{ message }</p>
    </React.Fragment>
  )
}
 
export default Message