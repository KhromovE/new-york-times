import { createStore } from 'effector'

import { $preparedArticlesData, filtersUpdated } from './fetching.model'
import { Article } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const topUpList = <T extends Record<string, any>>(list: T[], payload: T[]): T[] =>
  payload.reduce(
    (acc, payloadItem) => {
      const isDuplcate = acc.find((storeItem) => payloadItem.id === storeItem.id)

      if (isDuplcate === undefined) {
        acc.push(payloadItem)
      }

      return acc
    },
    [...list],
  )

export const $list = createStore<Article[]>([])

$list
  .on($preparedArticlesData, (store, payload: Article[]) => topUpList(store, payload))
  .reset(filtersUpdated)
