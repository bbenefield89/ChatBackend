import React, { Component } from 'react'

import Incentive from './modules/Incentive'
import { CTABtnStyled, HomeContainerStyled } from './styled'

import incentiveData from './incentiveData'

interface IncentiveData {
  incentiveHeaderText: string
  incentiveImg: string
}

class Home extends Component<any, any> {
  public componentDidUpdate(): void {
    if (this.props.isLoggedIn) {
      this.props.history.push('/chat')
    }
  }
  
  // render
  public render(): any {
    return (
      <HomeContainerStyled className='home_container'>
        { incentiveData.map(this.handleIncentiveDataMap) }
  
        <CTABtnStyled>
          Get Your Limbo On!
        </CTABtnStyled>
      </HomeContainerStyled>
    )
  }

  // this method looks wonky but it takes two params
  // the names get a bit lengthy so its just drop each param to a new line
  private handleIncentiveDataMap = (
    { incentiveHeaderText, incentiveImg }: IncentiveData,
    ind: number
  ): any => (
    <Incentive
      key={ ind }
      incentiveHeaderText={ incentiveHeaderText }
      incentiveImg={ incentiveImg }
    />
  )
}

export default Home