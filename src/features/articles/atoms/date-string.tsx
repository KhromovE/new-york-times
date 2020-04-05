import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import { getWeekDay, getMonth } from '../../../lib/date'

type Props = {
  noMobile?: 'true'
}

const Wrapper = styled.section<Props>`
  font-style: italic;

  ${({ noMobile }): FlattenSimpleInterpolation | false =>
    noMobile !== 'true' &&
    css`
      @media only screen and (max-width: 552px) {
        display: none;
      }
    `};
`

export const DateString: React.FC<Props> = ({ noMobile }) => {
  const date = new Date()
  const weekDay = getWeekDay(date)
  const month = getMonth(date)
  const day = date.getDate()
  const year = date.getFullYear()
  const dateString = `new york, ${weekDay}, ${month} ${day}, ${year}`.toUpperCase()

  return <Wrapper noMobile={noMobile}>{dateString}</Wrapper>
}
