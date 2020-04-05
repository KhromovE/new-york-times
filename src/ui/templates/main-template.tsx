import React from 'react'
import styled from 'styled-components'

import { Container } from './container'

type Props = {
  header?: React.ReactNode
  subline?: React.ReactNode
}

const Content = styled.main`
  margin-top: 1.25rem;
  height: 100%;
`

const Subline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid;
  border-bottom: 2px solid;
  border-color: var(--primary);
  height: 2.9rem;
`

export const MainTemplate: React.FC<Props> = ({ children, header, subline }) => (
  <Container>
    {header}
    {subline && <Subline>{subline}</Subline>}
    <Content>{children}</Content>
  </Container>
)
