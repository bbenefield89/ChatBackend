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
    const url = 'https://evening-headland-92725.herokuapp.com/api/messages'

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
            <li key={ message.id }>
              { message.message }
            </li>
          ))
        }
      </ul>
    )
  }
}
 
export default ChatMessagesList