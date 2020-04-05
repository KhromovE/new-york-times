import React from 'react'

import { FullArticleTemplate } from '../templates'
import { H1, Image, Link } from '../../../ui/atoms'
import { Article } from '../types'
import { CONTENT_URI } from '../../../constants/uri'

type Props = {
  article: Article
}

export const FullArticle: React.FC<Props> = ({ article }) => {
  const image = article.multimedia.find(
    (multimedia) => multimedia.subtype === 'largeHorizontalJumbo',
  )

  return (
    <FullArticleTemplate
      header={<H1>{article.headline.main}</H1>}
      image={
        image && <Image src={`${CONTENT_URI}/${image.url}`} alt="article image" loading="lazy" />
      }
    >
      <p>{article.leadParagraph}</p>
      <p>
        To read more click <Link href={article.webUrl}>here</Link>
      </p>
    </FullArticleTemplate>
  )
}
