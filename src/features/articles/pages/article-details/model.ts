import { createEvent, createStore, sample } from 'effector'

import { $list } from '../../models'
import { Article } from '../../types'

export const pageLoaded = createEvent<string | undefined>()
export const pageClosed = createEvent()
export const updateArticle = createEvent<null | Article>()

export const $article = createStore<null | Article>(null)

$article.on(updateArticle, (_, article) => article).reset(pageClosed)

sample({
  source: $list,
  clock: pageLoaded,
  fn: (list, id) => {
    const article = list.find((item) => item.id === id) || null
    updateArticle(article)
  },
})
