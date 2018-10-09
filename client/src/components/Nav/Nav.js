import React from 'react'

const Nav = ({ auth, isLoggedIn, username }) => {
  /**
   * TODO: this is the exact same logic for the 'login/signup' button in
   *       <Home /> make sure to make own component to reduce recreating same
   *       methods
   */
  const signup = () => {
    auth.login()
  }
  
  return (
    <nav>
      <p>{ username }</p>

      {
        isLoggedIn
        ?
          <button onClick={ auth.logout }>Log out</button>
        :
          <React.Fragment>
            <button onClick={ signup }>Sign Up</button>
            <button onClick={ signup }>Log In</button>
          </React.Fragment>
      }
    </nav>
  )
}
 
export default Nav