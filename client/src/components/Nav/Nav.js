import React, { PureComponent } from 'react'
import styled from 'styled-components'

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

const ButtonStyled = styled.button`
  background: #393D3F;
  border: 2px solid #393D3F;
  color: #fafafa;
  font-size: 1.6rem;
  letter-spacing: 4px;
  padding: 5px 0;
  max-width: 220px;
  width: 100%;
`

class Navigation extends PureComponent { /*({ auth, isLoggedIn, username }) => { */
  /**
   * TODO: this is the exact same logic for the 'login/signup' button in
   *       <Home /> make sure to make own component to reduce recreating same
   *       methods
   */

  state = {
    isOpen: true
  }
  
  signup = () => {
    this.props.auth.login()
  }

  toggleNavbar = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  
  render() {
    return (
      <NavbarStyled className='nav_wrapper'>
        <NavbarBrandStyled className='nav_wrapper__company_image'>
          <ImgStyled
            src={ limbochat }
          />
        </NavbarBrandStyled>

        <NavStyled className='nav_wrapper__links_list'>
          <NavItemStyled className='nav_wrapper__links_list__item'>
          {
            this.props.isLoggedIn
            ?
              <ButtonStyled
                className='nav_wrapper__links_list__item__logout_btn'
                onClick={ this.props.auth.logout }>
                  Log out
              </ButtonStyled>
            :
              <ButtonStyled
                className='nav_wrapper__links_list__item__login_btn'
                onClick={ this.signup }>
                  Enter Limbo
              </ButtonStyled>
          }
          </NavItemStyled>
        </NavStyled>
      </NavbarStyled>
    )
  }
}
 
export default Navigation