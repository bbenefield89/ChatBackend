import React, { PureComponent } from 'react'

import axios from 'axios'

class ChatInput extends PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      message: ''
    }
  }

  public render() {
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
  
  private sendMessage = (e: any): void => {
    e.preventDefault()
    
    const req = {
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
      },
      method: 'POST',
      url: `${ this.props.url }/graphql`
    }

    axios(req)
  }

  private setMessageValue = (e: any): void => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

}
 
export default ChatInput