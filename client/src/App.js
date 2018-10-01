import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// import io from 'socket.io-client'

import ChatWrapper from './components/ChatWrapper/ChatWrapper'
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav'
import { Store } from './components/Global/Global'

import './App.css'
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.socket = io('https://evening-headland-92725.herokuapp.com/')
  }
  
  render() {
    return (
      <div className="App">
        <Nav />

        <Route
          exact path='/'
          render={props => (
            <Store.Consumer>
              {context => <Home { ...props } context={ context } /> }
            </Store.Consumer>
          )}
        />

        <Route
          path='/chat'
          render={props => (
            <ChatWrapper { ...props } socket={ this.socket } />
          )}
        />
      </div>
    );
  }
}

export default App
