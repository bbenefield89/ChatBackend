import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }
  }

  // checkIfLoggedIn
  checkIfLoggedIn = () => {
    const token = localStorage.getItem('token')
    if (token)
      this.setState({ isLoggedIn: true })
  }

  // signUp
  signUp = () => {
    this.props.auth.login()
  }
  
  // componentDidMount
  componentDidMount() {
    if (/acces_token|id_token|error/.test(this.props.location.hash))
      this.props.auth.handleAuthentication()
  }
  
  // render
  render() {
    return (
      <React.Fragment>
        <h1>Home</h1>

        <button onClick={ this.signUp }>
          Sign up
        </button>
      </React.Fragment>
    )
  }
}

export default Home