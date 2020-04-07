import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

import { DateString } from '../atoms'
import { SortButton } from '../molecules'
import { Field } from '../../../ui/molecules'
import { DEBOUNCE_DELAY } from '../../../constants/search'
import { Sort } from '../types'
import Loupe from '../../../assets/images/loupe-thin.svg'

type Props = {
  onChangeSearch: (query: string) => void
  onClickSort: (attr: void) => void
  sortIconRotated: Sort
  defaultValue: string
}

const SearchWrapper = styled.section`
  display: flex;

  @media only screen and (max-width: 552px) {
    width: 100%;
  }
`

export const Subline: React.FC<Props> = ({
  onChangeSearch,
  onClickSort,
  defaultValue,
  sortIconRotated,
}) => {
  const [debouncedCallback] = useDebouncedCallback(onChangeSearch, DEBOUNCE_DELAY)
  const handleChange = useCallback((e) => debouncedCallback(e.target.value), [])

  return (
    <>
      <DateString />
      <SearchWrapper>
        <Field
          id="search"
          onChange={handleChange}
          defaultValue={defaultValue}
          placeholder="Search"
          type="search"
          addon={<Loupe />}
          label="Search"
        />
        <SortButton iconRotated={sortIconRotated} onClick={onClickSort} />
      </SearchWrapper>
    </>
  )
}
