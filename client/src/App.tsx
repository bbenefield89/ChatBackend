import React, { Component } from 'react'

import axios from 'axios'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import ChatUsersContainer from './components/ChatUsers/ChatUsersContainer'
import ChatWrapper from './components/ChatWrapper/ChatWrapper'
import Home from './components/Home/Home'
import Navigation from './components/Nav/Nav'
import SignUpModal from './components/SignUpModal/SignUpModal'

import './App.css'
// import logo from './logo.svg';

const AppStyled = styled.div`
  background-color: #fafafa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='496' height='496' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23dbd8cd' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23dbd8cd'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
  color: #fafafa;
`


interface Props {
  client: object
  url: string
  ws: string
}

class App extends Component<any, any> {
  constructor(props: Props) {
    super(props)
    
    this.state = {
      isLoggedIn: false,
      profile: {},
      showSignUpModal: 'none'
    }
  }

  public render() {
    return (
      <AppStyled className="App">
        <SignUpModal
          display={ this.state.showSignUpModal }
          setProfileData={ this.setProfileData }
          url={ this.props.url }
        />
      
        <Route
          path='/'
          render={ this.renderNavigation }
        />
      
        <Route
          exact={ true }
          path='/'
          render={ this.renderHome }
        />

        <Route
          path='/chat'
          render={ this.renderMainChat }
        />
      </AppStyled>
    );
  }

  protected handleLogout = (history: any) => {
    localStorage.clear()

    this.setState({
      isLoggedIn: false,
      profile: {}
    },
      () => history.push('/')
    )
  }

  protected handleShowSignUpModal = () => {
    const token = localStorage.getItem('token')

    if (token) {
      this.isUserAuthenticated()
    }
    else {
      const { showSignUpModal } = this.state
      
      if (showSignUpModal === 'block') {
        this.setState({ showSignUpModal: 'none' })
      }
      else {
        this.setState({ showSignUpModal: 'block' })
      }
    }
  }

  
  protected setProfileData = (token: string, user: object) => {
    localStorage.setItem('token', token)
    
    this.setState({
      isLoggedIn: true,
      profile: user,
      showSignUpModal: 'none'
    })
  }

  private isUserAuthenticated = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      return this.setState({ isLoggedIn: false })
    }

    const req = {
      data: {
        query: `
        query {
          authenticateUser (token: "${ token }")
        }
        `
      },
      method: 'POST',
      url: `${ this.props.url }/graphql`,
    }

    const { data } = await axios(req)
    const { authenticateUser } = data.data

    if (authenticateUser) {
      this.setState({ isLoggedIn: true })
    }
  }

  private renderHome = (props: object) => (
    <Home
      { ...props }
      isLoggedIn={ this.state.isLoggedIn }
    />
  )
  
  private renderMainChat = (props: object) => (
    <React.Fragment>
      <ChatWrapper
        { ...props }
        username={ this.state.profile.username }
        url={ this.props.url }
      />

      <ChatUsersContainer client={ this.props.client } profile={ this.state.profile } />
    </React.Fragment>
  )
  
  private renderNavigation = (props: object) => {
    return (
      <Navigation
        { ...props }
        handleShowSignUpModal={ this.handleShowSignUpModal }
        isLoggedIn={ this.state.isLoggedIn }
        handleLogout={ this.handleLogout }
      />
    )
  }
}

export default App
