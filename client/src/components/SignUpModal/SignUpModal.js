import React, { PureComponent } from 'react'
import axios from 'axios'

import SignUpModalHomeForm from './modules/SignUpModalHomeForm'

class SignUpModal extends PureComponent {
  state = {
    showSignupForm: true,
  }
  
  handleShowSignupForm = () => {
    this.setState({ showSignupForm: !this.state.showSignupForm })
  }
  
  submitSignUpForm = async (e, mutation) => {
    e.preventDefault()

    try {
      const { data: { createUser } } = await mutation()

      localStorage.setItem('token', createUser.jwt)
      this.props.setProfileData(createUser.user)
    }
    catch(err) {
      console.log(err)
    }
  }

  handleUserLogin = async (e, { username, password }) => {
    e.preventDefault()
    
    const req = {
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      data: {
        query: `
        query {
          userLogin (username: "${ username }", password: "${ password }") {
            user {
              id
              username
              picture
            }

            jwt
          }
        }
        `
      }
    }

    const { data } = await axios(req)
    const { jwt, user } = data.data.userLogin

    this.props.setProfileData(jwt, user)
  }

  handleUserSignup = async (e, { username, password, picture }) => {
    e.preventDefault()
    
    const req = {
      method: 'POST',
      url: 'http://localhost:3001/graphql',
      data: {
        query: `
        mutation {
          createUser (username: "${ username }", password: "${ password }", picture: "${ picture }") {
            user {
              id
              username
              picture
            }
            
            jwt
          }
        }
        `
      }
    }

    const data = await axios(req)

    console.log(data)
  }

  componentWillUnmount() {
    console.log('WillUnMount -- SignupModal')
  }

  render() {
    return (
      <div style={{ display: this.props.display }}>
        {
          this.state.showSignupForm
            ?
              <SignUpModalHomeForm
                onSubmit={ this.handleUserSignup }
                submitValue='Sign up'
              />
            :
              <SignUpModalHomeForm
                onSubmit={ this.handleUserLogin }
                submitValue='Log in'
              />
            
              // <Query
              //   query={ USER_LOGIN }
              //   variables={{ username: this.state.username, password: this.state.password }}
              // >
              //   {({ loading, error, data }) => {
              //     if (loading) console.log(loading)
              //     if (error) console.log(error)
              //     if (data) console.log(data)

              //     return <button>LOG IN FORM</button>
              //   }}
              // </Query>
        }
      
        <button
          onClick={ this.handleShowSignupForm }
          style={{color: 'black'}}
        >
          {
            this.state.showSignupForm
              ?
                'Log in'
              :
                'Sign up'
          }
        </button>
      </div>
    )
  }
}

export default SignUpModal