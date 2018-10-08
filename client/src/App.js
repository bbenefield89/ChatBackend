import React, { Component } from 'react'
import gql from 'graphql-tag'
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
      loggedIn: false
    }

    this.auth = new Auth()
  }

  componentDidMount() {
    const loggedIn = this.auth.isAuthenticated()

    if (loggedIn)
      this.setState({ loggedIn })

      this.auth.getProfile((err, profile) => {
        if (err)
          throw new Error(err)
        
        if (profile) {
          this.setState({ username: profile.nickname })
        }
      })
  }
  
  render() {
    return (
      <div className="App">
        <Nav
          auth={ this.auth }
          loggedIn={ this.state.loggedIn }
          username={ this.state.username }
        />
      
        <Route
          exact path='/'
          render={props => (
            <Home
              auth={ this.auth }
              loggedIn={ this.state.loggedIn }
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
