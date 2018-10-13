import React, { PureComponent } from 'react'

import ChatForm from './ChatForm'
import ChatMessagesList from './ChatMessagesList'

class ChatWrapper extends PureComponent {
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
      /**
       * need to use the native 'window.location' for now
       * for whatever reason using 'props.history.push' isnt working correctly
       * my guess is that its because its being called from within cDM()
       */
      window.location = '/'
      // this.props.history.push('/')
  }
  
  componentDidMount() {
    this.verifyLogin()
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