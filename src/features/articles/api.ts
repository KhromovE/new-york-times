import { request } from '../../lib/request'
import { ArticlesDataParams, ArticlesData } from './types'

export const loadArticlesData = (params: ArticlesDataParams): Promise<ArticlesData> =>
  request<ArticlesData>('GET', 'articlesearch.json', params)
