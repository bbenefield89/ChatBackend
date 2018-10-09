import React, { Component } from 'react'

class Home extends Component {
  state = {}
  
  // signUp
  signUp = () => {
    this.props.auth.login()
  }
  
  componentDidMount() {
    this.props.isAuthenticated()
  }
  
  // render
  render() {
    return (
      <React.Fragment>
        <h1>Home</h1>

        <button onClick={ this.signUp }>
          Get Started
        </button>
      </React.Fragment>
    )
  }
}

export default Home