import { createRequest } from '../../lib/request'
import { ArticlesData } from './types'

export const loadArticlesData = createRequest<ArticlesData>('GET', 'articlesearch.json')
