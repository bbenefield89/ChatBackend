import React, { Component } from 'react'

class SignUpModalHomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      picture: ''
    }
  }

  handleInputVal = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  
  render() { 
    return (
      <form onSubmit={ e => this.props.onSubmit(e, this.state) }>
        <label htmlFor='username' />
        <input
          type='text'
          value={ this.state.username }
          name='username'
          onChange={ this.handleInputVal }
        />

        <label htmlFor='password' />
        <input
          type='password'
          value={ this.state.password }
          name='password'
          onChange={ this.handleInputVal }
        />

        <input type='submit' value={ this.props.submitValue } />
      </form>
    )
  }
}
 
export default SignUpModalHomeForm