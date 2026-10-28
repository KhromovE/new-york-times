import { createRequest } from '../../lib/request'
import { ArticlesParams, ArticlesResponse, Multimedia } from './types'

const api = createRequest<ArticlesResponse>('GET', 'articlesearch.json')

export const loadArticlesData = {
  ...api,
  request: async (params: ArticlesParams): Promise<ArticlesResponse> => {
    const data = await api.request(params)

    return {
      ...data,
      response: {
        ...data.response,
        docs: data.response.docs.map((doc) => {
          if (Array.isArray(doc.multimedia)) return doc

          // Convert the current API format to the shape expected by the original app.
          const media = doc.multimedia as {
            default?: Omit<Multimedia, 'subtype'>
            thumbnail?: Omit<Multimedia, 'subtype'>
          } | null
          const image = media?.default || media?.thumbnail

          return {
            ...doc,
            lead_paragraph: doc.lead_paragraph ?? doc.abstract,
            multimedia:
              image?.url && image.width && image.height
                ? ['blog225', 'largeHorizontalJumbo'].map((subtype) => ({
                    ...image,
                    subtype,
                    url: image.url.replace(`${process.env.CONTENT_URL}/`, ''),
                  }))
                : [],
          }
        }),
      },
    }
  },
}
