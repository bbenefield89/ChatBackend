import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }
  }

  // signUp
  signUp = () => {
    this.props.auth.login()
  }
  
  componentDidMount() {
    this.props.auth.getProfile((err, profile) => {
      if (err)
        console.log(err)

      console.log(profile)
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