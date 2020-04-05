import { createEvent, combine, forward } from 'effector'

import {
  getItems,
  updateQuery,
  toggleSort,
  $sort,
  $pageCount,
  $isPending,
  $list,
} from '../../models'
import { generateNumber } from '../../../../lib/utils'
import { SkeletonArticle } from '../../types'

export { $query } from '../../models'

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

export const pageEnded = createEvent()
export const searchFieldUpdated = createEvent<string>()
export const sortClicked = createEvent()

export const $sortIconRotated = $sort
export const $firstTimePending = combine({ list: $list, isPending: $isPending }).map(
  ({ list, isPending }) => list.length === 0 && isPending,
)
export const $articles = combine({
  list: $list,
  pageCount: $pageCount,
  isPending: $firstTimePending,
}).map(({ list, pageCount, isPending }) => {
  if (list.length === 0 && isPending) {
    return generateSkeletonArticleList(pageCount)
  }

  return list
})

forward({
  from: pageEnded,
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
