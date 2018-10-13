import React, { PureComponent } from 'react'

class Callback extends PureComponent {
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