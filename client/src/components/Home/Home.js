import React, { Component } from 'react'

class Home extends Component {
  state = {
    isLoggedIn: false
  }

  // signUp
  signUp = () => {
    this.props.auth.login()
  }
  
  // componentDidMount
  componentDidMount() {
    this.props.auth.getProfile((err, profile) => {
      if (err)
        console.log(err)

      if (profile)
        this.props.history.push('/chat')
    })
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