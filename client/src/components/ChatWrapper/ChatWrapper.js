import React, { Component } from 'react'

import ChatForm from './ChatForm'
import ChatMessagesList from './ChatMessagesList'

class ChatWrapper extends Component {
  state = {}
  
  verifyLogin = async () => {
    const authOisAuthenticated = () => (
      new Promise((res, rej) => {
        res(this.props.auth.isAuthenticated())
      }
    ))

    const data = await authOisAuthenticated()

    if (data)
      this.props.isAuthenticated()
    else
      this.props.history.push('/')
  }
  
  componentDidMount() {
    // this.verifyLogin()
  }
  
  render() {
    return (
      <React.Fragment>
        <ChatMessagesList
          auth={ this.props.auth }
        />
  
        <ChatForm
          auth={ this.props.auth }
          username={ this.props.username }
        />
      </React.Fragment>
    )
  }
}
 
export default ChatWrapper