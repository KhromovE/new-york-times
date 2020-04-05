import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Logo from '../../../assets/logo.svg'

const Wrapper = styled.header`
  padding: 0 0.5rem;
`

const LogoWrapper = styled.div`
  max-width: 50rem;
  margin: auto;
  padding: 1.25rem 0.6rem 0.95rem;
`

const StyledLogo = styled(Logo)`
  fill: var(--primary);
`

export const Header: React.FC = () => (
  <Wrapper>
    <LogoWrapper>
      <Link to="/">
        <StyledLogo />
      </Link>
    </LogoWrapper>
  </Wrapper>
)
