import React, { Component } from 'react'

class Nav extends Component {
  state = {}

  render() { 
    return (
      <nav>
        <button onClick={ this.props.auth.logout }>Log out</button>
      </nav>
    )
  }
}
 
export default Nav