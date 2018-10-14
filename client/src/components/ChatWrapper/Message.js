import React from 'react'

const Message = ({ message, username }) => {
  return (
    <React.Fragment>
      <p style={{color: 'blue'}}>{ username }</p>
      <p style={{color: 'red', marginBottom: '5rem'}}>{ message }</p>
    </React.Fragment>
  )
}
 
export default Message