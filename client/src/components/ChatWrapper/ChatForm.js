import React, { PureComponent } from 'react'
import axios from 'axios'

class ChatInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  sendMessage = e => {
    e.preventDefault()
    
    const req = {
      method: 'POST',
      url: `${ this.props.url }/graphql`,
      data: {
        query: `
        mutation {
          createMessage (message: "${ this.state.message }", username:"${ this.props.username }") {
            id
            message
            username
          }
        }
        `
      }
    }

    axios(req)
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