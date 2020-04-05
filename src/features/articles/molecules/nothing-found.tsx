import React from 'react'
import styled from 'styled-components'

import { H1 } from '../../../ui/atoms'

type Props = {
  isFailed: boolean
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const StyledHeading = styled(H1)`
  text-align: center;
`

export const NothingFound: React.FC<Props> = ({ isFailed }) => {
  return (
    <Wrapper>
      <StyledHeading>{isFailed ? 'Oooops' : 'Sorry, we didn’t find anything'}</StyledHeading>
    </Wrapper>
  )
}
