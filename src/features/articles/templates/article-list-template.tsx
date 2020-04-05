import React from 'react'
import styled from 'styled-components'

type Props = {
  footer: React.ReactNode
}

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`

export const ArticleListTemplate: React.FC<Props> = ({ children, footer }) => (
  <div>
    {children}
    <FooterWrapper>{footer}</FooterWrapper>
  </div>
)
