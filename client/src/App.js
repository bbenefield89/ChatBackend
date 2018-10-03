import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Callback from './components/Callback/Callback'
import ChatWrapper from './components/ChatWrapper/ChatWrapper'
import Home from './components/Home/Home'
// import Nav from './components/Nav/Nav'
import { Store } from './components/Global/Global'

import './App.css'
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    return (
      <div className="App">
        <Route
          exact path='/'
          render={props => (
            <Store.Consumer>
              {context => (
                <Home
                  { ...props }
                  { ...context }
                />
              )}
            </Store.Consumer>
          )}
        />

        <Route path='/auth' component={ Callback } />

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
