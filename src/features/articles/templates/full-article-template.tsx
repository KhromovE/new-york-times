import React from 'react'
import styled from 'styled-components'

type Props = {
  header: React.ReactNode
  image?: React.ReactNode
}

const Wrapper = styled.div``

const ContentWrapper = styled.section`
  max-width: 40rem;
  margin: auto;
  font-size: 1.5rem;
`

const ImageWrapper = styled.section`
  margin-bottom: 1rem;
`

export const FullArticleTemplate: React.FC<Props> = ({ children, header, image }) => (
  <Wrapper>
    {header}
    <ImageWrapper>{image}</ImageWrapper>
    <ContentWrapper>{children}</ContentWrapper>
  </Wrapper>
)
