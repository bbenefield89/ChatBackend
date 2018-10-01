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
    this.props.socket.emit('SEND CHAT MESSAGE', this.state.message)
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