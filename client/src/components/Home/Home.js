import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      userInfo: {
        username: '',
        password: ''
      }
    }
  }

  // checkIfLoggedIn
  checkIfLoggedIn = () => {
    const token = localStorage.getItem('token')
    if (token)
      this.setState({ isLoggedIn: true })
  }

  // setInputVal
  setInputVal = e => {
    const { name, value } = e.target
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [name]: value 
      }
    })
  }

  // signUp
  signUp = e => {
    e.preventDefault()
    
    const req = {
      method: 'POST',
      url: `${ this.props.context.state.socketURL }/api/users/new`,
      data: this.state.userInfo
    }
  }
  
  // componentDidMount
  componentDidMount() {
    this.checkIfLoggedIn()
  }
  
  // render
  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <h1>Home</h1>

        <form onSubmit={ this.signUp }>
          <label htmlFor='username' />
          <input
            name='username'
            onChange={ this.setInputVal }
            type='text'
            value={ this.state.userInfo.username }
          />

          <label htmlFor='password' />
          <input
            name='password'
            onChange={ this.setInputVal }
            type='text'
            value={ this.state.userInfo.password }
          />

          <input
            type='submit'
            value='Sign up'
          />
        </form>
      </React.Fragment>
    )
  }
}

export default Home