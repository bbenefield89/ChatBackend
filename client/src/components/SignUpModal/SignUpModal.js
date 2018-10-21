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
  
  handleUserLogin = async (e, { username, password }) => {
    e.preventDefault()
    
    const req = {
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
      },
      method: 'POST',
      url: `${ this.props.url }/graphql`
    }

    const { data } = await axios(req)
    const { jwt, user } = data.data.userLogin

    this.props.setProfileData(user, jwt)
  }

  handleUserSignup = async (e, { username, password, picture }) => {
    e.preventDefault()
    
    const req = {
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
      },
      method: 'POST',
      url: `${ this.props.url }/graphql`
    }

    const { data } = await axios(req)
    const { jwt, user } = data.data.createUser

    this.props.setProfileData(jwt, user)
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