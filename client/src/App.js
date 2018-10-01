import React, { Component } from 'react';
import io from 'socket.io-client'

import ChatWrapper from './components/ChatWrapper/ChatWrapper'

import './App.css'
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.socket = io('https://evening-headland-92725.herokuapp.com/')
    
    this.socket.on('RESP', data => console.log(data))
  }
  
  sendMessage = () => {
    this.socket.emit('SEND', 'SENDING MESSAGE')
  }
  
  render() {
    return (
      <div className="App">
        <ChatWrapper socket={ this.socket } />
      </div>
    );
  }
}

export default App
