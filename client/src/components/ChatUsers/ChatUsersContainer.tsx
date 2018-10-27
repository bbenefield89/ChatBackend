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

const USER_LEFT = (id: string) => `
  mutation {
    userList (id: "${ id }") {
      id
      username
      picture
    }
  }
`

class ChatUsersContainer extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      profile: {},
      usersList: []
    }
  }
  
  public async componentDidMount() {
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
      url: `${ this.props.url }/graphql`
    }

    await axios(req)

    this.setState({
      profile: this.props.profile
    })
  }

  public render() {
    return (
      <Subscription
        subscription={ USER_LIST }
        onSubscriptionData={ this.handleSubScriptionData }
      >
        {({ loading, error, data }): any => {
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

  public async componentWillUnmount() {
    const req = {
      data: {
        query: USER_LEFT(this.state.profile.id)
      },
      method: 'POST',
      url: 'http://localhost:3001/graphql'
    }

    await axios(req)
  }

  private handleSubScriptionData = ({ subscriptionData }: { subscriptionData: any }): void => {
    this.updateUserList(subscriptionData)
  }

  private updateUserList = (data: any): any => {
    return this.setState({
      usersList: [ ...data.data.userList ]
    })
  }
}
 
export default ChatUsersContainer