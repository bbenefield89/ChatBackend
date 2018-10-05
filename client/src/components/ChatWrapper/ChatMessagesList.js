import React, { Component } from 'react'
import axios from 'axios'

class ChatMessagesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
    
    this.props.socket.on('RESP CHAT MESSAGE', messageData => {
      console.log(messageData)
      this.setState({
        messages: [
          ...this.state.messages,
          messageData
        ]
      })
    })
  }
  
  setMessagesState = messagesData => {
    this.setState({
      messages: [
        ...this.state.messages,
        ...messagesData
      ]
    })
  }
  
  componentDidMount() {
    const url = `${ this.props.socketURL }/api/messages`
    
    axios(url)
      .then(({ data }) => {
        this.setMessagesState(data)
      })
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <ul>
        {
          this.state.messages.map((message, index) => (
            <li key={ message.id } style={{marginBottom: '3rem'}}>
              <p>{ message.username } <small>{ message.updatedAt }</small></p>
              <p>{ message.message }</p>
            </li>
          ))
        }
      </ul>
    )
  }
}
 
export default ChatMessagesList