import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import Auth from '../../Auth/Auth'

// const auth = new Auth()

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      userInfo: {
        username: '',
        password: ''
      }
    }

    this.createNewUser = gql`
      mutation ($username: String!, $password: String!) {
        createUser(username: $username, password: $password) {
          id
          username
          token
        }
      }
    `

    this.auth = new Auth()
  }

  // checkIfLoggedIn
  checkIfLoggedIn = () => {
    const token = localStorage.getItem('token')
    if (token)
      this.setState({ isLoggedIn: true })
  }

  // setInputVal
  setInputVal = e => {
    const { name, value } = e.target
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [name]: value 
      }
    })
  }

  // signUp
  signUp = async (e, createNewUser) => {
    e.preventDefault()

    this.auth.login()
    
    // try {
    //   const { username, password } = this.state.userInfo
    //   const { data } = await createNewUser({
    //     variables: { username, password }
    //   })

    //   localStorage.setItem('token', data.createUser.token)
    //   localStorage.setItem('id', data.createUser.id)
    //   localStorage.setItem('username', data.createUser.username)
    // }
    // catch(err) {
    //   console.log('Something went horribly.. HORRIBLY WRONG!')
    //   console.log(err)
    // }
  }
  
  // componentDidMount
  componentDidMount() {
    // this.checkIfLoggedIn()
    if (/acces_token|id_token|error/.test(this.props.location.hash))
      this.auth.handleAuthentication()
  }
  
  // render
  render() {
    return (
      <React.Fragment>
        <h1>Home</h1>

        <Mutation mutation={ this.createNewUser }>
          {(createNewUser, { loading, err, data }) => {
            /**
             * TODO: add handling for loading, err, and data
             * 
             * TODO: split this form into smaller components
             */

            if (data)
              return this.props.history.push('/chat')

            return <form onSubmit={ e => this.signUp(e, createNewUser) }>
              <label htmlFor='username' />
              <input
                name='username'
                onChange={ this.setInputVal }
                type='text'
                value={ this.state.userInfo.username }
              />

              <label htmlFor='password' />
              <input
                name='password'
                onChange={ this.setInputVal }
                type='text'
                value={ this.state.userInfo.password }
              />

              <input
                type='submit'
                value='Sign up'
              />
            </form>
          }}
        
        </Mutation>
      </React.Fragment>
    )
  }
}

export default Home