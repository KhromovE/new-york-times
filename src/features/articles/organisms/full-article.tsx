import React from 'react'

import { FullArticleTemplate } from '../templates'
import { H1, Image } from '../../../ui/atoms'
import { Article } from '../types'
import { useScrollToTop } from '../../../lib/hooks'

type Props = {
  article: Article
}

export const FullArticle: React.FC<Props> = ({ article }) => {
  useScrollToTop()
  const image = article.multimedia.find(
    (multimedia) => multimedia.subtype === 'largeHorizontalJumbo',
  )
  return (
    <FullArticleTemplate
      header={<H1>{article.headline.main}</H1>}
      image={
        image && (
          <Image
            src={`${process.env.CONTENT_URL}/${image.url}`}
            alt="article image"
            loading="lazy"
          />
        )
      }
    >
      <p>{article.leadParagraph}</p>
    </FullArticleTemplate>
  )
}
