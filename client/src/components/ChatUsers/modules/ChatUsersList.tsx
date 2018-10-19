import React, { Component } from 'react'

interface User {
  id: string
  picture: string
  username: string
}

class ChatUsersList extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      usersData: []
    }
  }

  public render() { 
    // console.log(this.props)
    return (
      this.props.usersList.map(({ id, username, picture }: User, ind: number) => {
        return <p key={ ind } style={{ color: 'red' }}>{ username }</p>
      })
    )
  }
}
 
export default ChatUsersList