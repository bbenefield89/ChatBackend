import React, { Component } from 'react'

class ChatInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  sendMessage = e => {
    e.preventDefault()

    const messageData = {
      message: this.state.message,
      username: this.props.username
    }
    
    this.props.socket.emit('SEND CHAT MESSAGE', messageData)
  }

  setMessageValue = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <form action='' onSubmit={ this.sendMessage }>
        <input
          autoComplete='off'
          name='message'
          onChange={ this.setMessageValue }
          value={ this.state.message }
        />
        <button>Send</button>
      </form>
    )
  }
}
 
export default ChatInput