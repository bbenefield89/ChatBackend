import React, { PureComponent } from 'react'
import styled from 'styled-components'

import axios from 'axios'

const FormStyled = styled.form`
  display: flex;
  padding: 0 1rem 2rem 1rem;
`

const InputStyled = styled.input`
  flex: 1;
  font-size: 16px;
  padding: 0 10px;
`

class ChatInput extends PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      message: ''
    }
  }

  public render() {
    return (
      <FormStyled action='' onSubmit={ this.sendMessage }>
        <InputStyled
          autoComplete='off'
          name='message'
          onChange={ this.setMessageValue }
          value={ this.state.message }
        />
        <button>Send</button>
      </FormStyled>
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