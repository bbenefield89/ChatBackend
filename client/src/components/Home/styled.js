import styled from 'styled-components'

export const HomeContainerStyled = styled.div`
  display: grid;
  grid-row-gap: 15rem;
  padding: 8rem 1rem;

  @media (min-width: 1246px) {
    grid-template: auto / repeat(3, 1fr);
    padding: 20rem 1rem;
  }
`

export const CTABtnStyled = styled.button`
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