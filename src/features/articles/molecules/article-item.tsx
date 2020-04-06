import React, { memo } from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

import { P, Link } from '../../../ui/atoms'
import { ArticlePicture, ArticleHeading, ByLine } from '../atoms'
import { Article } from '../types'

type Props = {
  data: Article
  columnWidth: number
  style?: React.CSSProperties
}

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 100ms ease-in-out;
  text-align: justify;
  hyphens: auto;
  padding: 1rem;
`

export const ArticleItem: React.FC<Props> = memo(({ data, columnWidth, style }) => {
  const newStyle = style
  const img = data.multimedia.find((image) => image.subtype === 'blog225')
  const imageWidth = columnWidth - 32

  if (newStyle && newStyle.left !== 0) {
    newStyle.borderLeft = '1px solid var(--primary)'
  }

  return (
    <Wrapper style={style}>
      <Link as={RouterLink} to={`/article/${data.id}`}>
        <ArticleHeading>{data.headline.main}</ArticleHeading>

        {data.byline.original && <ByLine>{data.byline.original}</ByLine>}
        {img && <ArticlePicture data={img} imageWidth={imageWidth} />}
        <P>{data.abstract}</P>
      </Link>
    </Wrapper>
  )
})
