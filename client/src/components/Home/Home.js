import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

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
        }
      }
    `
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
  signUp = (e, createNewUser) => {
    e.preventDefault()

    createNewUser({
      variables: {
        username: this.state.userInfo.username,
        password: this.state.userInfo.password
      }
    })
      .then(data => console.log({ data }))
      .catch(err => console.log({ err }))
  }
  
  // componentDidMount
  componentDidMount() {
    this.checkIfLoggedIn()
  }
  
  // render
  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <h1>Home</h1>

        <Mutation mutation={ this.createNewUser }>
          {(createNewUser, { loading, err, data }) => {
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