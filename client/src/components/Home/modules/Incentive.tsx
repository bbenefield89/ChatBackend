import React from 'react'
import styled from 'styled-components'

const DivStyled = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
`

const IncentiveContainerStyled = styled.div`
  background: #8B8C9A;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #FAFAFA;
  display: flex;
  flex-direction: column-reverse;
  max-height: 376px;
  margin: 0 auto;
  width: 300px;
`

const IncentiveHeaderContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0 3rem 5rem 3rem;
  width: 300px;
`

const IncentiveHeaderStyled = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 33px;
  text-align: left;

  @media (min-width: 694px) {
  }
`

const SvgContainerStyled = styled.div`
  border-radius: 5px;
  height: 230px;
  margin: 0 auto 2rem auto;
  position: relative;
  top: -20px;
  width: 250px;
`

const SvgStyled = styled.img`
  margin: 0 auto;
  position: absolute;
  top: -30px;
  left: -25px;
  width: 300px;

  @media (min-width: 694px) {
    margin: 0 auto;
  }
`

interface IncentiveData {
  incentiveHeaderText: string
  incentiveImg: string
}

const Incentive = ({ incentiveHeaderText, incentiveImg }: IncentiveData) => {
  return (
    <DivStyled>
      <IncentiveContainerStyled className='home_container__row__column'>
        <IncentiveHeaderContainerStyled>
          <IncentiveHeaderStyled>
            { incentiveHeaderText }
          </IncentiveHeaderStyled>
        </IncentiveHeaderContainerStyled>
        
        <SvgContainerStyled
          className='home_container__row__column__svg_container'
        >
          <SvgStyled src={ incentiveImg } />
        </SvgContainerStyled>
      </IncentiveContainerStyled>
    </DivStyled>
  )
}
 
export default Incentive