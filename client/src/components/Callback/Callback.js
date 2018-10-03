import React, { Component } from 'react'

import Auth from '../../Auth/Auth'

const auth = new Auth()

class Callback extends Component {
  state = {}

  componentDidMount() {
    auth.handleAuthentication()
  }
  
  render() { 
    return (
      <h1>One moment please...</h1>
    )
  }
}
 
export default Callback