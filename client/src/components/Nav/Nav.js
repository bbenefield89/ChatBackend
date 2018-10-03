import React, { Component } from 'react'

import { Store } from '../Global/Global'

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