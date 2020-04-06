import { createStore } from 'effector'

import { $preparedArticlesData, filtersUpdated } from './fetching.model'
import { Article } from '../types'

/**
 * update current list with a new prepared data
 * @param list old list of data
 * @param payload new data
 * @returns merged list
 */
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

// list of the prepared articles
export const $list = createStore<Article[]>([])

$list
  .on($preparedArticlesData, (store, payload: Article[]) => topUpList(store, payload))
  .reset(filtersUpdated)
