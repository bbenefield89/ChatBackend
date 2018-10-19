import React, { Component } from 'react'
import styled from 'styled-components'

import NavButton from './modules/NavButton'

import limbochat from '../static/limbochat.png'

const NavbarStyled = styled.nav`
  background: #647795;
  display: grid;
  grid-template: auto / 100%
  grid-row-gap: 20px;
  padding: 20px 0;

  @media (min-width: 524px) {
    grid-template: auto / repeat(2, 1fr);
  }
`

const NavbarBrandStyled = styled.a`
`

const ImgStyled = styled.img`
  width: 200px;
`

const NavStyled = styled.ul`
  list-style: none;
  margin: 0 auto 0 auto;
  padding: 0;
  width: 80%;

  @media (min-width: 524px) {
    display: flex;
    align-items: center;
  }
`

const NavItemStyled = styled.li`
  width: 100%;
`

class Navigation extends Component<any, any> {
  
  public render(): any {
    return (
      <NavbarStyled className='nav_wrapper'>
        <NavbarBrandStyled className='nav_wrapper__company_image'>
          <ImgStyled
            src={ limbochat }
          />
        </NavbarBrandStyled>

        <NavStyled className='nav_wrapper__links_list'>
          <NavItemStyled className='nav_wrapper__links_list__item'>
          { this.renderLogInLogOutBtn() }
          </NavItemStyled>
        </NavStyled>
      </NavbarStyled>
    )
  }

  private handleLogout = (): void => {
    this.props.handleLogout(this.props.history)
  }
  
  private renderLogInLogOutBtn = (): any => (
    this.props.isLoggedIn || this.props.location.pathname === '/chat'
    ?
      <NavButton
        className='nav_wrapper__links_list__item__logout_btn'
        onClick={ this.handleLogout }
      >
          Log out
      </NavButton>
    :
      <NavButton
        className='nav_wrapper__links_list__item__login_btn'
        onClick={ this.props.handleShowSignUpModal }
      >
          Enter Limbo
      </NavButton>
  )
}

export default Navigation