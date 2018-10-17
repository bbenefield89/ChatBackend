import React, { Component } from 'react'

class ChatUsersList extends Component {
  state = {
    usersData: []
  }

  render() { 
    // console.log(this.props)
    return (
      this.props.usersList.map(({ id, username, picture }, ind) => {
        return <p key={ ind } style={{ color: 'red' }}>{ username }</p>
      })
    )
  }
}
 
export default ChatUsersList