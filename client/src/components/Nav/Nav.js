import React from 'react'

const Nav = ({ auth, username }) => {
  return (
    <nav>
      <p>{ username }</p>
      <button onClick={ auth.logout }>Log out</button>
    </nav>
  )
}
 
export default Nav