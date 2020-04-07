import React from 'react'
import styled from 'styled-components'

import { Input } from '../atoms'

type Props = {
  id: string
  value?: string
  placeholder?: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
  addon?: React.ReactNode
  label: string
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
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

const Label = styled.label`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
`

export const Field: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  defaultValue,
  addon,
  label,
  id,
}) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {addon && <Addon>{addon}</Addon>}
    </Wrapper>
  )
}
