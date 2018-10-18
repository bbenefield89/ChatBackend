import React, { Component } from 'react'
import axios from 'axios'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

import ChatUsersList from './modules/ChatUsersList'

const USER_LIST = gql`
  subscription {
    userList {
      id
      username
      picture
    }
  }
`

const USER_LEFT = id => `
  mutation {
    userList (id: "${ id }") {
      id
      username
      picture
    }
  }
`

class ChatUsersContainer extends Component {
  state = {
    profile: {},
    usersList: []
  }
  
  updateUserList = ({ data }) => {
    return this.setState({
      usersList: [ ...data.userList ]
    })
  }
  
  async componentDidMount() {
    const token = localStorage.getItem('token')

    const req = {
      data: {
        query: `
          mutation {
            userList (token: "${ token }") {
              id
              username
              picture
            }
          }
        `
      },
      method: 'POST',
      url: 'http://localhost:3001/graphql'
    }

    await axios(req)

    this.setState({
      profile: this.props.profile
    })
  }

  async componentWillUnmount() {
    const req = {
      data: {
        query: USER_LEFT(this.state.profile.id)
      },
      method: 'POST',
      url: 'http://localhost:3001/graphql'
    }

    const { data } = await axios(req)
  }

  render() {
    return (
      <Subscription
        subscription={ USER_LIST }
        onSubscriptionData={({ subscriptionData }) => {
          this.updateUserList(subscriptionData)
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <h1 style={{color: 'green'}}>LOADING</h1>
          }
          
          if (error) {
            return <h1 style={{ color: 'red' }}>ERROR</h1>
          }

          if (data) {
            return <ChatUsersList usersList={ this.state.usersList } />
          }
        }}
      </Subscription>
    )
  }
}
 
export default ChatUsersContainer