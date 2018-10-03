import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Callback from './components/Callback/Callback'
import ChatWrapper from './components/ChatWrapper/ChatWrapper'
import { Store } from './components/Global/Global'
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav'

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
        <Store.Consumer>
          {({ auth }) => (
            <Nav { ...auth } />
          )}
        </Store.Consumer>
        
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

        <Route
          path='/auth'
          render={props => (
            <Store.Consumer>
              {context => (
                <Callback { ...props } { ...context } />
              )}
            </Store.Consumer>
          )}
        />

        <Route
          path='/chat'
          render={props => (
            <Store.Consumer>
              {context => (
                <ChatWrapper { ...props } { ...context } />
              )}
            </Store.Consumer>
          )}
        />
      </div>
    );
  }
}

export default App
