import { createStore, createEffect, guard, sample, combine, merge } from 'effector'
import camelcaseKeys from 'camelcase-keys'

import { ArticlesResponse, ArticlesParams, ArticlesData, Sort } from '../types'
import { getItems, updateQuery, toggleSort } from './fetching.events'
import { loadArticlesData } from '../api'
import { CancelError } from '../../../lib/errors'

// make request to the api
const fxGetArticlesData = createEffect({
  handler: (params: ArticlesParams) => {
    return loadArticlesData.request(params)
  },
})

// params stores
const $fq = createStore('source:document_type(article)')
const $fl = createStore(
  'multimedia,lead_paragraph,abstract,headline,pub_date,byline,word_count,_id,web_url',
)
export const $pageCount = createStore(10)
export const $sort = createStore<Sort>('newest')
export const $query = createStore('')
export const $page = createStore(0)
export const $isFailed = createStore(false)

// combination of param stores
const $params = combine({ fl: $fl, q: $query, fq: $fq, sort: $sort, page: $page })

export const filtersUpdated = merge([$sort.updates, $query.updates])

// preparing data from api
export const $normolizedArticlesData = fxGetArticlesData.done.map(
  ({ result }: { result: ArticlesResponse }): ArticlesData =>
    camelcaseKeys<ArticlesResponse, ArticlesData>(result, { deep: true }),
)

// if request was canceled make another one
fxGetArticlesData.fail.watch(({ error }) => {
  if (error instanceof CancelError) {
    getItems()
  }
})

// take articles from response
export const $preparedArticlesData = $normolizedArticlesData.map((result) =>
  result.response.docs.map((article) => ({
    ...article,
    id: article.id.substring(article.id.lastIndexOf('/') + 1),
  })),
)
export const $isPending = fxGetArticlesData.pending.map((pending) => pending)

// toggle sort
$sort.on(toggleSort, (sort) => (sort === 'newest' ? 'oldest' : 'newest'))

// update search query string
$query.on(updateQuery, (_, query) => query)

// increment current page when request is ok
$page.on(fxGetArticlesData.done, (state) => state + 1).reset(filtersUpdated)

// toggle isFailed store when request is failed
$isFailed.on(fxGetArticlesData.fail, () => true).reset(fxGetArticlesData)

// if filters were updated take data from api
sample({
  source: $isPending,
  clock: filtersUpdated,
  fn: (isPending) => {
    if (isPending) {
      loadArticlesData.cancel()
    } else {
      getItems()
    }
  },
})

// make a request only if there is another one is not executed
guard<ArticlesParams>({
  source: sample({
    source: combine({ params: $params }),
    clock: getItems,
    fn: ({ params }) => ({
      ...params,
    }),
  }),
  filter: $isPending.map((pending) => !pending),
  target: fxGetArticlesData,
})

getItems()
