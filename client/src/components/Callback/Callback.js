import React, { Component } from 'react'

class Callback extends Component {
  componentDidMount() {
    this.props.auth.handleAuthentication()
  }
  
  render() { 
    return (
      <h1>One moment please...</h1>
    )
  }
}
 
export default Callback