import React, { useCallback } from 'react'
import styled from 'styled-components'

import SortIcon from '../../../assets/images/sort-thin.svg'
import { IconButton } from '../../../ui/atoms'
import { Sort } from '../types'

type Props = {
  iconRotated: Sort
  onClick: (attr: void) => void
}

type SortProps = {
  rotated: Sort
}

const StyledSortIcon = styled(SortIcon)<SortProps>`
  height: calc(100% - 0.5rem);
  width: 1.4rem;
  transform: ${({ rotated }): string => `rotate(${rotated === 'oldest' && '180deg'}) scaleX(-1)`};
`

export const SortButton: React.FC<Props> = ({ onClick, iconRotated }) => {
  const handleClick = useCallback(() => onClick(), [])

  return (
    <IconButton onClick={handleClick}>
      <StyledSortIcon rotated={iconRotated} />
    </IconButton>
  )
}
