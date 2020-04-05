import styled from 'styled-components'

export const Button = styled.button`
  border: 0;
  background: none;
  padding: 0;
  cursor: pointer;
`

export const LinkButton = styled(Button)`
  text-decoration: underline;
`

export const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`
