import React from 'react'
import styled from 'styled-components'

type Props = {
  value?: string
  placeholder?: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
  addon?: React.ReactNode
}

const Wrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  line-height: 1.5;
  border: none;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: var(--primary);
  padding-left: 0.6rem;
  background-color: inherit;
  color: inherit;
`

const Addon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  max-width: 100%;
  height: 100%;
  right: 0.5rem;
  top: 0;
  overflow: hidden;

  & > svg {
    height: calc(100% - 0.5rem);
  }
`

export const Field: React.FC<Props> = ({ value, placeholder, onChange, defaultValue, addon }) => {
  return (
    <Wrapper>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {addon && <Addon>{addon}</Addon>}
    </Wrapper>
  )
}
