import React, { Component } from 'react'

class SignUpModalHomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      picture: '',
      username: ''
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
          placeholder={ this.props.usernamePlaceholder }
        />

        <label htmlFor='password' />
        <input
          type='password'
          value={ this.state.password }
          name='password'
          onChange={ this.handleInputVal }
          placeholder={ this.props.passwordPlaceholder }
        />

        <input type='submit' value={ this.props.submitValue } />
      </form>
    )
  }
}

SignUpModalHomeForm.defaultProps = {
  passwordPlaceholder: 'Password',
  usernamePlaceholder: 'Username'
}
 
export default SignUpModalHomeForm