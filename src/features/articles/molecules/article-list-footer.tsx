import React, { useCallback } from 'react'
import styled from 'styled-components'

import { LinkButton } from '../../../ui/atoms'

type Props = {
  isPending: boolean
  isFailed: boolean
  loadMore: Function
}

const Text = styled.span`
  text-align: center;
  font-size: 1.15rem;
`

export const ArticleListFooter: React.FC<Props> = ({ isPending, isFailed, loadMore }) => {
  const handleClick = useCallback(() => loadMore(), [])

  if (isPending) {
    return <Text>Loading, please wait</Text>
  }

  if (isFailed) {
    return (
      <Text>
        Something went wrong, please{' '}
        <LinkButton onClick={handleClick}>click to try again</LinkButton>
      </Text>
    )
  }

  return null
}
