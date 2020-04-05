import React from 'react'
import { useStore } from 'effector-react'

import { MainTemplate } from '../../../../ui/templates'
import {
  $query,
  $sortIconRotated,
  $firstTimePending,
  pageEnded,
  searchFieldUpdated,
  $articles,
  sortClicked,
} from './model'
import { ArticleList, Subline } from '../../organisms'
import { Header } from '../../molecules'

export const Articles: React.FC = () => {
  const articles = useStore($articles)
  const searchValue = useStore($query)
  const sortIconRotated = useStore($sortIconRotated)
  const firstTimePending = useStore($firstTimePending)

  return (
    <MainTemplate
      header={<Header />}
      subline={
        <Subline
          onChangeSearch={searchFieldUpdated}
          onClickSort={sortClicked}
          sortIconRotated={sortIconRotated}
          defaultValue={searchValue}
        />
      }
    >
      <ArticleList
        articles={articles}
        firstTimePending={firstTimePending}
        pageEnded={pageEnded}
        // isPending={isPending}
      />
    </MainTemplate>
  )
}
