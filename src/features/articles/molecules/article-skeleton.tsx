import React from 'react'
import styled from 'styled-components'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { SkeletonArticle } from '../types'
import { ArticleHeading, ByLine } from '../atoms'
import { DURATION } from '../../../constants/skeleton'
import { P } from '../../../ui/atoms'

type Props = {
  data: SkeletonArticle
  style?: React.CSSProperties
}

const Wrapper = styled.section`
  padding: 1rem;
`

const PictureWrapper = styled.div`
  margin: 1rem 0;
`

export const ArticleSkeleton: React.FC<Props> = ({ data, style }) => {
  const newStyle = style

  if (newStyle && newStyle.left !== 0) {
    newStyle.borderLeft = '1px solid var(--primary)'
  }

  return (
    <SkeletonTheme color="var(--lighter-gray)" highlightColor="var(--lightest-gray)">
      <Wrapper style={style}>
        <ArticleHeading>
          <Skeleton count={data.titleLineCount} duration={DURATION} />
        </ArticleHeading>
        <ByLine>
          <Skeleton count={data.byLineCount} duration={DURATION} />
        </ByLine>
        {data.hasPicture && (
          <PictureWrapper>
            <Skeleton height={data.pictureSize} duration={DURATION} />
          </PictureWrapper>
        )}
        <P>
          <Skeleton count={data.textLineCount} duration={DURATION} />
        </P>
      </Wrapper>
    </SkeletonTheme>
  )
}
