import styled from 'styled-components'

export const ByLine = styled.span`
  font-weight: 700;
  font-size: 0.94rem;
  padding: 0 0 1.5rem;
  text-align: center;
  display: block;
  font-family: 'Playfair Display', serif;

  &:before,
  &:after {
    content: '';
    width: 70%;
    display: block;
    margin: 0 auto;
    border-color: #2f2f2f;
  }

  &:before {
    border-top: 1px solid;
    height: 0.45rem;
  }

  &:after {
    border-bottom: 1px solid;
    height: 0.625rem;
  }
`
