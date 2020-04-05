import { createStore, createEffect, guard, sample, merge, combine } from 'effector'
import camelcaseKeys from 'camelcase-keys'

import { getItems, updateQuery, toggleSort } from './list.events'
import { Article, ArticlesData, ArticlesDataParams, PreparedArticlesData, Sort } from '../types'

import { loadArticlesData } from '../api'

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

/* Effects */

const fxGetArticlesData = createEffect({
  handler: loadArticlesData,
})

/* Stores */

const $fq = createStore('source:document_type(article)')
const $fl = createStore(
  'multimedia,lead_paragraph,abstract,headline,pub_date,byline,word_count,_id,web_url',
)
export const $pageCount = createStore(10)
export const $sort = createStore<Sort>('newest')
export const $query = createStore('')
export const $list = createStore<Article[]>([])

/* Computed stores */

const $params = combine({ fl: $fl, q: $query, fq: $fq, sort: $sort })
export const $normolizedArticlesData = fxGetArticlesData.done.map(
  ({ result }: { result: ArticlesData }): PreparedArticlesData =>
    camelcaseKeys<ArticlesData, PreparedArticlesData>(result, { deep: true }), // eslint-disable-line @typescript-eslint/no-explicit-any
)
const $preparedArticlesData = $normolizedArticlesData.map((result) =>
  result.response.docs.map((article) => ({
    ...article,
    id: article.id.substring(article.id.lastIndexOf('/') + 1),
  })),
)
export const $isPending = fxGetArticlesData.pending.map((pending) => pending)

$sort.on(toggleSort, (sort) => (sort === 'newest' ? 'oldest' : 'newest'))
$query.on(updateQuery, (_, query) => query)

const filtersUpdated = merge([$sort.updates, $query.updates])

$list
  .on($preparedArticlesData, (store, payload: Article[]) => topUpList(store, payload))
  .reset(filtersUpdated)

filtersUpdated.watch(() => {
  getItems()
})

guard<ArticlesDataParams>({
  source: sample({
    source: combine({ pageCount: $pageCount, list: $list, params: $params }),
    clock: getItems,
    fn: ({ pageCount, list, params }) => ({
      page: Math.floor(list.length / pageCount),
      ...params,
    }),
  }),
  filter: $isPending.map((pending) => !pending),
  target: fxGetArticlesData,
})

getItems()
