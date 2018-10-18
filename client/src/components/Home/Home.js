import React, { Component } from 'react'
import styled from 'styled-components'

import Incentive from './modules/Incentive'

import incentiveData from './incentiveData'

const HomeContainerStyled = styled.div`
  display: grid;
  grid-row-gap: 15rem;
  padding: 8rem 1rem;

  @media (min-width: 1246px) {
    grid-template: auto / repeat(3, 1fr);
    padding: 20rem 1rem;
  }
`

const CTABtnStyled = styled.button`
  background: ${({ bgColor='#647795' }) => bgColor};
  border: ${({ bgColor='#647795' }) => `2px solid ${ bgColor }`};
  color: #ebeadf;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0 auto;
  padding: 1rem 0;
  width: 300px;

  @media (min-width: 1246px) {
    grid-area: 2 / 2
  }
`

class Home extends Component {

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/chat')
    }
  }
  
  // render
  render() {
    return (
      <HomeContainerStyled className='home_container'>
        {incentiveData.map(({ incentiveHeaderText, incentiveImg }, ind) => (
          <Incentive
            key={ ind }
            incentiveHeaderText={ incentiveHeaderText }
            incentiveImg={ incentiveImg }
          />
        ))}
  
        <CTABtnStyled>
          Get Your Limbo On!
        </CTABtnStyled>
      </HomeContainerStyled>
    )
  }
}

export default Home