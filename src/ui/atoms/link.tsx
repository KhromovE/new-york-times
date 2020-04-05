import styled from 'styled-components'

type Props = {
  textDecorator: string,
}

export const Link = styled.a<Props>`
  color: inherit;
  text-decoration: ${({textDecorator}) => textDecorator || 'none'};

  &:hover {
    color: var(--darkest-gray);
  }
`
