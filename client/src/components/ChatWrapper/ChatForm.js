import React, { Component } from 'react'
import axios from 'axios'

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
      username: 'bsquared18'
    }

    axios({
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      data: {
        query: `{
          hellos {
            id,
            message
          }
        }`
      }
    })
      .then(data => console.log(data))
      .catch(err => console.log(err))
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