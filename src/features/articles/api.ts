import { createRequest } from '../../lib/request'
import { ArticlesResponse } from './types'

export const loadArticlesData = createRequest<ArticlesResponse>('GET', 'articlesearch.json')
