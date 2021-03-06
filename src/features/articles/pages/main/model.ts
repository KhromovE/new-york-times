import { createEvent, combine, forward } from 'effector'

import {
  getItems,
  updateQuery,
  toggleSort,
  $pageCount,
  $list,
  $isPending,
  $isFailed,
  $query,
  $sort,
} from '../../models'
import { generateNumber } from '../../../../lib/utils'
import { SkeletonArticle } from '../../types'

/**
 * @param count count of list
 * @returns skeleton list
 */
const generateSkeletonArticleList = (count: number): SkeletonArticle[] =>
  Array(count)
    .fill(0)
    .map(() => ({
      titleLineCount: generateNumber(1, 3),
      byLineCount: generateNumber(1, 1),
      textLineCount: generateNumber(7, 15),
      hasPicture: generateNumber(0, 1) === 0,
      pictureSize: generateNumber(100, 120),
    }))

export const loadMore = createEvent()
export const searchFieldUpdated = createEvent<string>()
export const sortClicked = createEvent()

// true if data loading first time
const $firstTimePending = combine({ list: $list, isPending: $isPending }).map(
  ({ list, isPending }) => list.length === 0 && isPending,
)

/**
 * if list is empty and request is pending return generated skeleton list
 * otherwise returns the articles
 */
const $articles = combine({
  list: $list,
  pageCount: $pageCount,
  isPending: $firstTimePending,
}).map(({ list, pageCount, isPending }) => {
  if (list.length === 0 && isPending) {
    return generateSkeletonArticleList(pageCount)
  }

  return list
})

// the combined store for the page
export const $store = combine({
  isFailed: $isFailed,
  isPending: $isPending,
  query: $query,
  sort: $sort,
  firstTimePending: $firstTimePending,
  articles: $articles,
})

/* forward events to the model */

forward({
  from: loadMore,
  to: getItems,
})

forward({
  from: searchFieldUpdated,
  to: updateQuery,
})

forward({
  from: sortClicked,
  to: toggleSort,
})
