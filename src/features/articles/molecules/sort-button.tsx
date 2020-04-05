import React, { useCallback } from 'react'
import styled from 'styled-components'

import SortIcon from '../../../assets/sort-thin.svg'
import { Button } from '../../../ui/atoms'
import { Sort } from '../types'

type Props = {
  iconRotated: Sort
  onClick: (attr: void) => void
}

type SortProps = {
  rotated: Sort
}

const StyledButton = styled(Button)`
  border: 0;
  background: none;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`

const StyledSortIcon = styled(SortIcon)<SortProps>`
  height: calc(100% - 0.5rem);
  width: 1.4rem;
  transform: ${({ rotated }): string => `rotate(${rotated === 'oldest' && '180deg'}) scaleX(-1)`};
`

export const SortButton: React.FC<Props> = ({ onClick, iconRotated }) => {
  const handleClick = useCallback(() => onClick(), [])

  return (
    <StyledButton onClick={handleClick}>
      <StyledSortIcon rotated={iconRotated} />
    </StyledButton>
  )
}
