import React, { Component } from 'react'
import styled from 'styled-components'

const DivStyled = styled.div`
  position: absolute;
  right: -108px;
`

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
    return (
      <DivStyled className='chat_users_list_container'>
        {this.props.usersList.map(({ id, username, picture }: User, ind: number) => {
          return <p key={ ind } style={{ color: 'red' }}>{ username }</p>
        })}
      </DivStyled>
    )
  }
}
 
export default ChatUsersList