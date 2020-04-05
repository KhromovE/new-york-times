import React from 'react'
import { useStore } from 'effector-react'

import { MainTemplate } from '../../../../ui/templates'
import { $store, loadMore, searchFieldUpdated, sortClicked } from './model'
import { ArticleList, Subline } from '../../organisms'
import { Header } from '../../molecules'

export const Main: React.FC = () => {
  const { articles, query, sort, firstTimePending, isPending, isFailed } = useStore($store)

  return (
    <MainTemplate
      header={<Header />}
      subline={
        <Subline
          onChangeSearch={searchFieldUpdated}
          onClickSort={sortClicked}
          sortIconRotated={sort}
          defaultValue={query}
        />
      }
    >
      <ArticleList
        articles={articles}
        firstTimePending={firstTimePending}
        loadMore={loadMore}
        isPending={isPending}
        isFailed={isFailed}
      />
    </MainTemplate>
  )
}
