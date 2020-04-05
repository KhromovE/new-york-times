import React from 'react'
import { ResponsiveMasory } from '../../../lib/responsive-masonry'

import { ArticleItem, ArticleSkeleton, ArticleListFooter, NothingFound } from '../molecules'
import { ArticleListTemplate } from '../templates'
import { Article, SkeletonArticle } from '../types'

type Props = {
  articles: Article[] | SkeletonArticle[]
  loadMore: Function
  firstTimePending: boolean
  isPending: boolean
  isFailed: boolean
}

export const ArticleList: React.FC<Props> = ({
  articles,
  loadMore,
  firstTimePending,
  isPending,
  isFailed,
}) => (
  <ArticleListTemplate
    footer={<ArticleListFooter isFailed={isFailed} isPending={isPending} loadMore={loadMore} />}
  >
    {!isPending && articles.length === 0 ? (
      <NothingFound isFailed={isFailed} />
    ) : (
      <ResponsiveMasory<Article | SkeletonArticle>
        items={articles}
        loadMore={loadMore}
        render={({ style, data, width }): React.ReactNode => {
          if (firstTimePending) {
            return <ArticleSkeleton data={data as SkeletonArticle} style={style} />
          }
          return <ArticleItem data={data as Article} columnWidth={width} style={style} />
        }}
      />
    )}
  </ArticleListTemplate>
)
