import React from 'react'
import { ResponsiveMasory } from '../../../lib/responsive-masonry'

import { ArticleItem, ArticleSkeleton } from '../molecules'
import { Article, SkeletonArticle } from '../types'

type Props = {
  articles: Article[] | SkeletonArticle[]
  pageEnded: Function
  isPending?: boolean
  firstTimePending: boolean
}

export const ArticleList: React.FC<Props> = ({ articles, pageEnded, firstTimePending }) => (
  <ResponsiveMasory<Article | SkeletonArticle>
    items={articles}
    loadMore={pageEnded}
    render={({ style, data, width }): React.ReactNode => {
      if (firstTimePending) {
        return <ArticleSkeleton data={data as SkeletonArticle} style={style} />
      }
      return <ArticleItem data={data as Article} columnWidth={width} style={style} />
    }}
  />
)
