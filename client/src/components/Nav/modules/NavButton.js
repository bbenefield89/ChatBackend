import React from 'react'
import styled from 'styled-components'

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

const NavButton = props => {
  return (
    <ButtonStyled
      className={ props.className }
      onClick={ props.onClick }
    >
      { props.children }
    </ButtonStyled>
  )
}
 
export default NavButton