import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Callback from './components/Callback/Callback'
import ChatWrapper from './components/ChatWrapper/ChatWrapper'
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav'

import Auth from './Auth/Auth'

import './App.css'
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      username: '',
    }

    this.auth = new Auth()
  }

  componentDidMount() {
    this.auth.getProfile((err, profile) => {
      if (err)
        throw new Error(err)
      
      this.setState({ username: profile.nickname })
    })
  }
  
  render() {
    return (
      <div className="App">
        <Nav
          auth={ this.auth }
          username={ this.state.username }
        />
      
        <Route
          exact path='/'
          render={props => (
            <Home
              { ...props }
              auth={ this.auth }
            />
          )}
        />

        <Route
          path='/auth'
          render={props => (
            <Callback
              { ...props }
              auth={ this.auth }
            />
          )}
        />

        <Route
          path='/chat'
          render={props => (
            <ChatWrapper
              { ...props }
              auth={ this.auth }
              username={ this.state.username }
            />
          )}
        />
      </div>
    );
  }
}

export default App
