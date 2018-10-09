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
      isLoggedIn: false
    }

    this.auth = new Auth()
  }

  isAuthenticated = () => {
    const isAuthenticated = this.auth.isAuthenticated()

    console.log(isAuthenticated)
    if (isAuthenticated) {
      this.auth.getProfile((err, profile) => {
        if (err)
          throw new Error('ERROR GETTING PROFILE')

        if (profile) {
          console.log(profile)
          
          return this.setState({
            username: profile.nickname,
            isLoggedIn: true
          })
        }
      })
    }
    else {
      return false
    }
  }

  render() {
    return (
      <div className="App">
        <Nav
          auth={ this.auth }
          isLoggedIn={ this.state.isLoggedIn }
          username={ this.state.username }
        />
      
        <Route
          exact path='/'
          render={props => (
            <Home
              { ...props }
              auth={ this.auth }
              isAuthenticated={ this.isAuthenticated }
              isLoggedIn={ this.state.isLoggedIn }
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
              isAuthenticated={ this.isAuthenticated }
              username={ this.state.username }
            />
          )}
        />
      </div>
    );
  }
}

export default App
