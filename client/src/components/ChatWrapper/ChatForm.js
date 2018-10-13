import React, { PureComponent } from 'react'
// import axios from 'axios'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const CREATE_MESSAGE = gql`
  mutation ($username: String!, $message: String!) {
    createMessage (username: $username, message: $message) {
      id
      username
      message
    }
  }
`

class ChatInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  sendMessage = (e, mutation) => {
    e.preventDefault()
    mutation()
  }

  setMessageValue = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <Mutation
        mutation={ CREATE_MESSAGE }
        variables={{ username: this.props.username, message: this.state.message }}
      >
        {(createMessage, { loading, error, data }) => {
          return <form action='' onSubmit={ e => this.sendMessage(e, createMessage) }>
            <input
              autoComplete='off'
              name='message'
              onChange={ this.setMessageValue }
              value={ this.state.message }
            />
            <button>Send</button>
              {
                error ? 'ERROR' : null
              }
          </form>
        }}
      
      </Mutation>
    )
  }
}
 
export default ChatInput